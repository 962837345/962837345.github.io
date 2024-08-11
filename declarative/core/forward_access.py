from types import LambdaType
from .properties.reactive_property import create_reactive_property
from .watcher import should_access_dynamically


class ForwardAccess(object):
    """ A data descriptor forwards get/set to ReactiveProperty when using obj.property """
    __slots__ = ('default_value', 'name')

    def __init__(self, default_value):
        self.default_value = default_value

    def __set_name__(self, cls, name):
        self.name = name

    def __get__(self, obj: "Reactive", objtype):
        if not obj:
            # Called by Class.Property
            return self
        if should_access_dynamically():
            return obj.__dict__[self.name]._get()
        # fast access the value while no valid watcher or active watcher is non-dynamic
        return obj.__dict__[self.name].value

    def __set__(self, obj: "Reactive", new_val):
        obj.__dict__[self.name]._set(new_val)

    def instantiate(self, owner):
        return create_reactive_property(self.default_value, owner, self.name)


class SlowForwardAccess(ForwardAccess):
    """
    Enable using ReactiveProperty with a class not inherited from ReactiveClass.
    Slower than ForwardAccess due to key validation
    """
    __slots__ = ()

    def __get__(self, obj, objtype):
        if not obj:
            # Called by Class.Property
            return self.default_value
        return self.get_reactive_property(obj)._get()

    def __set__(self, obj, new_val):
        self.get_reactive_property(obj)._set(new_val)

    def get_reactive_property(self, obj):
        name = self.name
        reactive_property = obj.__dict__.get(name, None)
        if not reactive_property:
            reactive_property = obj.__dict__[name] = self.instantiate(obj)
        return reactive_property
