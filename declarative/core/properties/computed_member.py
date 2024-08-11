from weakref import ref as weakref
from weakref import WeakMethod

from ..dependency import Dependency
from ..watcher import ExpressionWatcher
from .reactive_property import register_reactive_property_converter, create_reactive_property


def get_weak_bound_method(unbound_function, obj):
    # Turn unbound_function to a weak-bound-method
    return WeakMethod(unbound_function.__get__(obj, obj.__class__))

class ComputedMember(ExpressionWatcher):
    __slots__ = ('name', 'depend', 'weak_owner', 'initialized')

    def __init__(self, expression, owner, name, lazy=True):
        """ Using weak ref to break self reference at the cost of effeciency """
        self.name = name
        self.depend = Dependency(name)
        self.weak_owner = weakref(owner)
        weak_method = get_weak_bound_method(expression, owner)
        self.initialized = True
        ExpressionWatcher.__init__(self, lambda: weak_method()(), lazy)
        # Because we use the 'dynamic' flag to decide whether to access the 'value' directly, we can't be lazy here
        self.lazy = False
        lazy = False
        if hasattr(owner, "__non_dynamic__") and owner.__non_dynamic__():
            self.is_dynamic = False
            self.initialized = False

    def _set(self, new_unbound_function):
        assert(callable(new_unbound_function))
        owner = self.weak_owner()
        assert(owner)
        weak_method = get_weak_bound_method(new_unbound_function, owner)
        self.function = lambda: weak_method()()
        self.update(None)
    
    @property
    def value(self):
        if not self.has_set_value or self.is_dynamic:
            return self._get()
        return self._value
    
    @value.setter
    def value(self, value):
        self._value = value

    def _get(self):
        if not self.is_dynamic and not self.initialized:
            # non-dynamic computed member only bound function at the first time call "_get"
            self.is_dynamic = True
            self.evaluate() # Evaluate first to trigger potential notify
            self.is_dynamic = False
            self.initialized = True
        else:
            self.evaluate() # Evaluate first to trigger potential notify
        self.depend.depend()
        return self._value

    def update(self, dependency):
        """ Called upon dependency changed """
        if self.depend.subscribers or not self.lazy:
            self.execute()

    def on_value_changed(self, new_value, old_value):
        self.depend.notify()

class ComputedReactiveMember(ExpressionWatcher):
    """ Developing """
    __slots__ = ('name', 'weak_owner', 'reactive_property')

    def __init__(self, expression, owner, name, lazy=True):
        """ Using weak ref to break self reference at the cost of effeciency """
        self.name = name
        self.weak_owner = weakref(owner)
        self.reactive_property = None
        weak_method = get_weak_bound_method(expression, owner)
        ExpressionWatcher.__init__(self, lambda: weak_method()(), lazy)

    def _set(self, new_unbound_function):
        assert(callable(new_unbound_function))
        owner = self.weak_owner()
        assert(owner)
        weak_method = get_weak_bound_method(new_unbound_function, owner)
        self.function = lambda: weak_method()()
        self.update(None)

    def _get(self):
        self.evaluate() # Evaluate first to trigger potential notify
        return self.reactive_property._get()

    def update(self, dependency):
        """ Called upon dependency changed """
        # TODO:
        # if not self.lazy or (self.reactive_property and self.reactive_property.has_any_subscribers()):
        if True:
            self.execute()

    def on_value_changed(self, new_value, old_value):
        if not self.reactive_property:
            self.reactive_property = create_reactive_property(new_value)
        else:
            self.reactive_property._set(new_value)

def computed_member_converter(default_value, owner, name):
    from ..utils import is_lambda
    if is_lambda(default_value):
        return (ComputedMember, default_value, owner, name)

register_reactive_property_converter(computed_member_converter)
