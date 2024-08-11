from types import FunctionType

from .forward_access import ForwardAccess, SlowForwardAccess
from .properties.reactive_property import IReactive


class ReactiveMeta(type):
    """ Convert all properties to ForwardAccess descriptor """
    def __new__(cls, type_name, bases, attrs, **kwargs):
        for name, default_value in attrs.items():
            if name.startswith('__'):
                continue
            if isinstance(default_value, FunctionType) and default_value.__name__ != '<lambda>':
                # Normal function, remain unchange
                continue
            attrs[name] = ForwardAccess(default_value)
        return super().__new__(cls, type_name, bases, attrs)


def initialize_all_reactive_property(obj):
    cls = type(obj)
    get_class_attr = type(cls).__getattribute__
    for name in dir(obj):
        if name.startswith('__'):
            continue
        attr = get_class_attr(cls, name)
        if attr not in obj.__dict__ and isinstance(attr, ForwardAccess):
            obj.__dict__[name] = attr.instantiate(obj)
    return obj

class ReactiveObject(IReactive, metaclass=ReactiveMeta):

    def __new__(cls, *args, **kwargs):
        # Initialize all ReactiveProperties before __init__
        return initialize_all_reactive_property(super().__new__(cls))

Reactive = SlowForwardAccess
