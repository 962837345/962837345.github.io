from enum import IntEnum, auto
from math import modf

from .dependency import Dependency
from .reactive import ReactiveObject

class ReactiveTime(ReactiveObject):
    """ Also a reactive property """

    time = 0
    millisecond = lambda self: modf(self.time)
    second = lambda self: int(self.time)
    minute = lambda self: int(self.second / 60)
    hour = lambda self: int(self.minute / 60)

    def __init__(self, time, owner=None, name=None):
        self.time = time

    def _get(self):
        return self

    def _set(self, new_time):
        self.time = new_time

    def __sub__(self, other):
        return self.time - other.time

    def __add__(self, other):
        return self.time + other.time

class TimerState(IntEnum):
    UNSTART = auto()
    TIMING = auto()
    ABORT = auto()
    FINISHED = auto()

class ComputedTime(ReactiveObject):

    def __init__(self, expression, owner, name=None):
        pass

class CountDownTimer(ReactiveObject):
    total_time = ReactiveTime(0)
    passed_time = ReactiveTime(0)
    left_time = lambda self: self.total_time - self.passed_time
    state = TimerState.UNSTART

    # _left_time = ReactiveTime(computed_member(lambda self: self.total_time - self.passed_time))

    # def __init__(self, default_value)
