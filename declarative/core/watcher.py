from typing import Dict, List, Set, Tuple, Deque
from weakref import WeakValueDictionary
from collections import deque
import time


watcher_stack : List['Watcher'] = []
active_watcher: 'Watcher' = None

def push_watcher(watcher: 'Watcher'):
    watcher_stack.append(watcher)
    global active_watcher
    active_watcher = watcher

def pop_watcher():
    if watcher_stack:
        watcher_stack.pop()
    global active_watcher
    active_watcher = watcher_stack[-1] if watcher_stack else None

def add_dependency_to_active_watcher(dependency: 'Dependency'):
    if active_watcher:
        active_watcher.add_dependency(dependency)

def should_access_dynamically():
    return active_watcher and active_watcher.is_dynamic

"""
Pause watchers' update:
    This is a mechanism aimed for efficiency that can be used when
u change a lot of reactive properties and want the minimal
number of update() get called.
    Just pause_watcher_update() before your writting to reactive properties,
and when u are done with reactive properties, call flush_watcher_update().
"""
watcher_update_paused = False
watcher_update_queue: Deque[Tuple['Watcher', List]] = deque() # [(watcher, args...),] Strong References!!!

def pause_watcher_update():
    global watcher_update_paused
    watcher_update_paused = True

def enqueue_watcher_update(watcher, *args):
    """ Called by watchers to store their update requests """
    watcher_update_queue.append((watcher, args))

def flush_watcher_update():
    global watcher_update_paused
    watcher_update_paused = False
    while watcher_update_queue:
        watcher, args = watcher_update_queue.popleft()
        watcher.update(*args)


class Watcher(object):
    """ Collects dependencies and gets notified when dependency changed """
    __slots__ = (
        'deps', 'cur_deps', 'new_deps', 'dirty_dep_ids', 'last_time_clean', 'is_paused', 'is_dynamic', 'pending_cleanup',
        '__weakref__',
    )

    def __init__(self):
        self.deps = WeakValueDictionary()
        # self.new_deps = WeakValueDictionary()
        self.cur_deps = set()
        self.new_deps = set()
        self.dirty_dep_ids = set()
        self.last_time_clean = time.time()
        # Watcher can be paused
        self.is_paused = False
        # non-dynamic watcher only collect dependency in the first time or force a pending cleanup
        self.is_dynamic = True
        self.pending_cleanup = False

    def set_dynamic(self, is_dynamic):
        if not self.is_dynamic and is_dynamic:
            # when switch a non-dynamic watcher to a dynamic watcher, need to cleanup once
            self.pending_cleanup = True
        self.is_dynamic = is_dynamic
    
    def set_paused(self, is_paused):
        if self.is_paused and not is_paused:
            self.is_paused = is_paused
            self.force_update()
        self.is_paused = is_paused

    def notify_change(self, dependency, *args):
        """ Called by a changed dependecy """
        self.dirty_dep_ids.add(dependency.id)
        if watcher_update_paused:
            enqueue_watcher_update(self, dependency, *args)
        else:
            self.update(dependency, *args)

    def update(self, dependency, *args):
        """ To be override """
        pass

    def force_update(self):
        """ To be override """
        pass

    def add_dependency(self, dep):
        """ Called when a dependency's get() gets called """
        dep_id = dep.id
        self.dirty_dep_ids.discard(dep_id) # We have acknowledged the latest value
        if dep_id in self.new_deps:
            # Already added
            return
        # self.new_deps[dep_id] = dep
        self.new_deps.add(dep_id)
        if dep_id not in self.cur_deps:
            # A new dependency add currently
            dep.add_subscriber(self)
        else:
            # if cur_deps contains id, deps must contains this key-value. so just return
            return

        if dep_id not in self.deps:
            # A fresh new dependency never encountered before
            self.deps[dep_id] = dep

    def cleanup_dependencies(self):
        if not self.is_dynamic:
            # non-dynamic watcher don't cleanup
            self.dirty_dep_ids.clear()
            return
        """ Cleanup unused dependencies after finishing collecting """
        for dep_id in self.cur_deps - self.new_deps:
            # dependency may be dead, need to varify the index first
            if dep_id in self.deps:
                # This dependency has been discarded
                self.deps[dep_id].remove_subscriber(self)
        # self.deps, self.new_deps = self.new_deps, WeakValueDictionary()
        self.cur_deps, self.new_deps = self.new_deps, set()
        self.dirty_dep_ids = self.dirty_dep_ids.intersection(self.cur_deps)

    def destruct(self):
        for dep in self.deps.values():
            dep.remove_subscriber(self)
        self.deps.clear()
        self.cur_deps.clear()
        self.new_deps.clear()
        self.dirty_dep_ids.clear()

    def __del__(self):
        self.destruct()


class FunctionWatcher(Watcher):
    """ Executes a function when its' dependencies changed """
    __slots__ = ('function', 'running')

    def __init__(self, function):
        Watcher.__init__(self)
        self.function = function
        # self.function_args = function_args if function_args else []
        self.running = False
        self.force_update()

    def update(self, dependency):
        """ Called upon dependency changed """
        self.execute()

    def force_update(self):
        # ensure a dynamic update while calling force update
        cached_is_dynamic = self.is_dynamic
        self.set_dynamic(True)
        self.dirty_dep_ids.add(-1)
        self.update(None)
        self.set_dynamic(cached_is_dynamic)

    def execute(self):
        """ Execute function until no dirty dependency """
        if self.running:
            # Prevent self-recursion
            return
        self.running = True
        while self.dirty_dep_ids:
            push_watcher(self)
            try:
                self.function() # TODO: Catch exceptions
            except Exception as e:
                import traceback
                print(traceback.format_exc())
                print(e)
            pop_watcher()
            self.cleanup_dependencies()
        self.running = False

# autorun = FunctionWatcher


class ExpressionWatcher(FunctionWatcher):
    """ Bound to an expression """
    __slots__ = ('lazy', '_value', 'has_set_value')

    def __init__(self, expression, lazy=True):
        self.lazy = True # Lazy ExpressionWatcher only executes when evaluate() gets called
        self._value = None
        self.has_set_value = False
        FunctionWatcher.__init__(self, expression)
    
    def update(self, dependency):
        if not self.lazy:
            self.execute()

    @property
    def value(self):
        return self._value
    
    @value.setter
    def value(self, value):
        self._value = value
        self.has_set_value = True

    def execute(self):
        if self.running:
            return
        self.running = True
        self.has_set_value = True
        new_value = self._value
        while self.dirty_dep_ids:
            push_watcher(self)
            try:
                new_value = self.function() # TODO: Catch exceptions
            except Exception as e:
                import traceback
                print(traceback.format_exc())
                print(e)
            pop_watcher()
            self.cleanup_dependencies()
        self.running = False
        if new_value != self._value: # Maybe we should check every loop?
            self._value, old_value = new_value, self._value
            self.on_value_changed(new_value, old_value)

    def evaluate(self):
        """ Called manually """
        if self.dirty_dep_ids:
            self.execute()
        return self._value

    def on_value_changed(self, new_value, old_value):
        pass
