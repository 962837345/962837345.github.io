from typing import List, Tuple, Callable
from weakref import ref as weakref

from .state import SubState


EventHandlers = List[Tuple[str, Callable]]

class StateEventBinding(SubState):
    __slots__ = (
        'state_id', 'is_paused',  # define slots for SubState which is forced empty slots
        'event_handlers', 'weak_event_emitter',
    )

    def __init__(self, event_emitter:'EventEmitter', event_handlers: EventHandlers):
        SubState.__init__(self)
        self.event_handlers = event_handlers
        self.weak_event_emitter = weakref(event_emitter)
        for event, handler in event_handlers:
            event_emitter.on(event, handler)

    def destruct(self):
        if self.event_handlers:
            event_emitter = self.weak_event_emitter()
            if event_emitter:
                for event, handler in self.event_handlers:
                    event_emitter.off(event, handler)
        self.event_handlers = None

when = StateEventBinding
