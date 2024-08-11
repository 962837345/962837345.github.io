from weakref import ref as weakref

from .state import SubState



class StateItemSubscriber(SubState):
    __slots__ = (
        'state_id', 'is_paused',  # define slots for SubState which is forced empty slots
        'target_func', 'weak_dependency', '__weakref__',
    )

    def __init__(self, target_func, dependency):
        SubState.__init__(self)
        self.target_func = target_func
        self.weak_dependency = weakref(dependency)
        dependency.add_subscriber(self)

    def notify_change(self, dependency, *item):
        self.target_func(*item)

    def destruct(self):
        weak_dependency = self.weak_dependency
        if weak_dependency and weak_dependency():
            weak_dependency().remove_subscriber(self)
            self.weak_dependency = None
            self.target_func = None


def foreach(reactive_container, on_new=None, on_remove=None):
    from ..utils import get_fenced_func, push_fence, pop_fence
    states = []
    if on_new:
        push_fence()
        data = reactive_container.data
        if isinstance(data, list):
            for item in data:
                on_new(item)
        elif isinstance(data, dict):
            for key, value in data.items():
                on_new(key, value)
        pop_fence()
        states.append(StateItemSubscriber(get_fenced_func(on_new), reactive_container.depend_new))
    if on_remove:
        states.append(StateItemSubscriber(get_fenced_func(on_remove), reactive_container.depend_remove))
    return states
