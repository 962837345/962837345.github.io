import traceback
from typing import List
from . import state
from .state import State, push_state, pop_state
from ..watcher import FunctionWatcher, push_watcher, pop_watcher
# import unreal_engine as ue
from weakref import ref as _weakref
import logging
logger = logging.getLogger(__name__)

class StateDeclaration(State, FunctionWatcher):
    __slots__ = (  # pylint: disable=redefined-slots-in-subclass
        'state_id', 'is_paused', 'sub_states',  # define slots for SubState which is forced empty slots
        'is_manager',
    )

    def __init__(self, function, auto_attach, state_id=None):
        self.is_manager : bool = False
        State.__init__(self, auto_attach, state_id)
        FunctionWatcher.__init__(self, function)

    def update(self, dependency):
        if self.is_manager:
            # Only update all sub_states when manager update
            for state in self.sub_states:
                state.update(dependency)
        else:
            FunctionWatcher.update(self, dependency)
        pass

    def force_update(self):
        if self.is_manager:
            # Only update all sub_states when manager update
            for state in self.sub_states:
                state.force_update()
        else:
            FunctionWatcher.force_update(self)
        pass
    
    def set_paused(self, is_paused):
        FunctionWatcher.set_paused(self, is_paused)
        for state in self.sub_states:
            state.set_paused(is_paused)

    def execute(self):
        if self.running or self.is_paused:
            return
        self.running = True
        while self.dirty_dep_ids:
            self.cleanup_sub_states() # SubStates should be clean first
            push_state(self)
            push_watcher(self)
            try:
                self.function()
            except Exception as e:
                traceback.print_exc()
            pop_watcher()
            pop_state()
            self.cleanup_dependencies()
        self.running = False
    
    def destruct(self):
        State.destruct(self)
        FunctionWatcher.destruct(self)

weakref_delaration_list: List[_weakref[StateDeclaration]] = []
# track_declare = ue.has_commandline_param('trackdeclare')
track_declare = False

def log_delaration():
    if track_declare == False:  # "-trackdeclare" 命令行参数下生效
        return
    global weakref_delaration_list
    logger.info(f'weakref_delaration_list iterate begin')
    item_num = 0
    for weak_declaration in weakref_delaration_list:
        delaration = weak_declaration()
        if delaration is None:
            continue
        state_info = f'delaration '
        if hasattr(delaration, 'function'):
            state_info += f'function: {delaration.function}'
        property_info = f''
        if len(delaration.deps) > 0:
            proptery_name_list = []
            for dep in delaration.deps.values():
                proptery_name_list.append(dep.property_name)
            property_info = f' property: {", ".join(proptery_name_list)}'
        logger.info(f'{state_info} {property_info}')
        item_num += 1
    logger.info(f'weakref_delaration_list iterate end - list num({item_num})')

def add_declaration(declaration: StateDeclaration):
    if track_declare == False:  # "-trackdeclare" 命令行参数下生效
        return
    global weakref_delaration_list
    weak_declaration = _weakref(declaration)
    weakref_delaration_list = list(filter(lambda x: x() is not None, weakref_delaration_list))
    if weak_declaration not in weakref_delaration_list:
        weakref_delaration_list.append(weak_declaration)
    logger.info(f'add_declaration - list num({len(weakref_delaration_list)})')

def declare(function, auto_attach=True, name=None):
    active_state = state.active_state
    if auto_attach and name and active_state:
        exist_state = active_state.sub_states.get(name, None)
        if exist_state:
            # Using the existing state
            active_state.add_sub_state(exist_state)
            return exist_state
    state_declaration = StateDeclaration(function, auto_attach, name)
    add_declaration(state_declaration)
    return state_declaration

def declare_fast(function, auto_attach=True, name=None):
    declaration = declare(function, auto_attach, name)
    declaration.set_dynamic(False)
    return declaration

def declare_manager(function, auto_attach=True, name=None):
    # declare_manager can only be used if it is sure that sub states don't need to re-declare!
    # because when manager force update, only sub states will update. manager itself won't update
    declaration = declare(function, auto_attach, name)
    declaration.is_manager = True
    return declaration

run = lambda func: StateDeclaration(func, False)
autorun = lambda func: StateDeclaration(func, True)
