from ..dependency import Dependency

class IReactive(object):
    pass

class ReactiveProperty(object):
    """
    ReactiveProperty protocol:
    Create new ReactiveProperty by implementing these three function
    """
    __slots__ = ('name', 'depend', 'value')

    def __init__(self, default_value, owner, name=''):
        self.name = name
        self.depend = Dependency(name)
        self.value = default_value

    def _get(self):
        self.depend.depend()
        return self.value

    def _set(self, new_value):
        if new_value != self.value:
            if isinstance(self.value, IReactive) or isinstance(new_value, IReactive):
                # if ReactiveObject has changed, need to collect dependencies dynamically
                self.value = new_value
                self.depend.notify_dynamically()
            else:
                self.value = new_value
                self.depend.notify()


"""
ReactivePropertyConverter:
    Allows users register their own ReactiveProperty.
    A converter receives three parameters: default_value, property_owner, property_name
    If a converter get an expected input, it should return a tuple:
        (ReactivePropertyClass, default_value, owner, name)
    And then the reactive_property will be created using code below:
        ReactivePropertyClass(default_value, owner, name)
    Otherwise, the converter should simply return None to give next converter a try.
    U can checkout existing converters for example.
"""

def default_reactive_property_converter(default_value, owner, name):
    """ Never return None """
    return (ReactiveProperty, default_value, owner, name)

reactive_property_converters = [default_reactive_property_converter]

def register_reactive_property_converter(converter):
    """ Register your own converter """
    reactive_property_converters.append(converter)

def create_reactive_property(default_value, owner=None, name=None):
    for converter in reversed(reactive_property_converters):
        result = converter(default_value, owner, name)
        if result:
            property_class, default_value, owner, name = result
            return property_class(default_value, owner, name)
    return None
