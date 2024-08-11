from collections import deque
from typing import List

active_state: 'State' = None
state_stack: List['State'] = []

def push_state(state):
    state_stack.append(state)
    global active_state
    active_state = state

def pop_state():
    if state_stack:
        state_stack.pop()
    global active_state
    active_state = state_stack[-1] if state_stack else None

state_cnt = 0
def get_default_state_id():
    global state_cnt
    state_cnt += 1
    return state_cnt


class SubState(object):
    __slots__ = ()  # force empty to enable multiple inheritance, should define slots in subclass
    # ('state_id', 'is_paused')

    def __init__(self, attach=True, state_id=None):
        self.state_id = state_id if state_id else get_default_state_id()
        if attach and active_state:
            active_state.add_sub_state(self)
        self.is_paused = False

    def set_paused(self, is_paused):
        # override in watcher
        pass
    
    def update(self, dep=None):
        # need override
        pass

    def force_update(self):
        # need override
        pass

    def destruct(self):
        pass

    def __del__(self):
        self.destruct()


class State(SubState):
    __slots__ = ()  # force empty to enable multiple inheritance, should define slots in subclass
    # ('state_id', 'is_paused', 'sub_states')

    def __init__(self, auto_attach=True, state_id=None):
        # On create
        SubState.__init__(self, auto_attach, state_id)
        self.sub_states = []
        # self.sub_states = {}
        # self.new_sub_states = {}

    def add_sub_state(self, sub_state: SubState):
        self.sub_states.append(sub_state)

    def cleanup_sub_states(self):
        self.sub_states.clear()

    def destruct(self):
        self.sub_states.clear()
