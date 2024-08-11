from .state import SubState

class StateExistence(SubState):
    __slots__ = (
        'state_id', 'is_paused',  # define slots for SubState which is forced empty slots
        'object', 'dtor',
    )

    def __init__(self, ctor, dtor = None):
        from ..utils import push_fence, pop_fence
        SubState.__init__(self)
        push_fence()
        self.object = ctor()
        pop_fence()
        self.dtor = dtor

    def destruct(self):
        from ..utils import push_fence, pop_fence
        if self.dtor and self.object:
            push_fence()
            self.dtor(self.object)
            pop_fence()
        self.object = None
        self.dtor = None

there_is = StateExistence
