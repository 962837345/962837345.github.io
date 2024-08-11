from typing import Set
from weakref import ref as _weakref
from collections import defaultdict

from .watcher import add_dependency_to_active_watcher, Watcher


dependency_cnt = 0
def get_uid() -> int:
    global dependency_cnt
    dependency_cnt = (dependency_cnt + 1) % 99999999
    return dependency_cnt


class Dependency(object):
    __slots__ = (
        'id', 'property_name', 'subscribers', 'is_notifying', '_pending_actions',
        '__weakref__',
    )

    def __init__(self, property_name=''):
        self.id = get_uid()
        self.property_name = property_name
        self.subscribers: list[_weakref[Watcher]] = []
        self.is_notifying: bool = False
        self._pending_actions: list[tuple[Watcher | _weakref[Watcher], bool]] = []

    def add_subscriber(self, subscriber: Watcher):
        if self.is_notifying:
            assert _weakref(subscriber)
            self._pending_actions.append((subscriber, True))
        else:
            weak_sub = _weakref(subscriber)
            if weak_sub not in self.subscribers:
                self.subscribers.append(weak_sub)

    def remove_subscriber(self, subscriber: Watcher):
        weak_sub = _weakref(subscriber)
        if self.is_notifying:
            self._pending_actions.append((weak_sub, False))
        else:
            try:
                self.subscribers.remove(weak_sub)
            except ValueError:
                pass

    def _handle_pending_actions(self):
        for sub, is_add in self._pending_actions:
            if is_add:
                weak_sub = _weakref(sub)  # additions is always strong reference
                if weak_sub not in self.subscribers:
                    self.subscribers.append(weak_sub)
            else:
                weak_sub = sub  # removals is always weak reference
                try:
                    self.subscribers.remove(weak_sub)
                except ValueError:
                    pass
        self._pending_actions.clear()

    def shrink_subscribers(self):
        if self.is_notifying:
            return
        self._pending_actions.extend((weak_sub, False) for weak_sub in self.subscribers if weak_sub() is None)
        self._handle_pending_actions()

    def depend(self):
        add_dependency_to_active_watcher(self)

    def notify(self, *args):
        self.is_notifying = True
        for weak_sub in self.subscribers:
            sub = weak_sub()
            if sub is None:
                self._pending_actions.append((weak_sub, False))
                continue
            sub.notify_change(self, *args)
        self.is_notifying = False
        # deal with the pending list
        if self._pending_actions:
            self._handle_pending_actions()

    def notify_dynamically(self, *args):
        for weak_sub in self.subscribers.copy():
            sub = weak_sub()
            if sub is None:
                self._pending_actions.append((weak_sub, False))
                continue
            # set watcher to dynamic and change it back after execution.
            cached_is_dynamic = sub.is_dynamic
            sub.set_dynamic(True)
            sub.notify_change(self, *args)
            sub.set_dynamic(cached_is_dynamic)
        # deal with the pending list
        if self._pending_actions:
            self._handle_pending_actions()

class DefaultDict_Dependency(defaultdict):
    """ Allow lazy creation of Dependency """
    __slots__ = ()

    def __missing__(self, key):
        new_dependency = Dependency(key)
        self.__setitem__(key, new_dependency)
        return new_dependency
