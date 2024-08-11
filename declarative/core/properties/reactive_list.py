from ..dependency import Dependency
from .reactive_property import register_reactive_property_converter
from ._collections_nie import UserList


class ReactiveList(UserList):
	"""
	Calling some unoverrided list interfaces may break reactivity
	"""
	__slots__ = ('depend_new', 'depend_remove', 'depend_each', 'depend_length', 'depend_change')

	def __init__(self, default_value=None, owner=None, name=''):
		self.data = default_value.copy() if default_value else []
		self.depend_new = Dependency(name+'_new')
		self.depend_remove = Dependency(name+'_remove')
		self.depend_each = Dependency(name+'_each')
		self.depend_length = Dependency(name+'_length')
		self.depend_change = Dependency(name + '_change') # Notify when list changed

	def __copy__(self):
		inst = self.__class__.__new__(self.__class__)
		inst.data = self.data[:]
		inst.depend_new = Dependency(self.depend_new.property_name)
		inst.depend_remove = Dependency(self.depend_remove.property_name)
		inst.depend_each = Dependency(self.depend_each.property_name)
		inst.depend_length = Dependency(self.depend_length.property_name)
		inst.depend_change = Dependency(self.depend_change.property_name)
		return inst

	def __len__(self):
		self.depend_length.depend()
		return len(self.data)

	@property
	def value(self):
		return self
	
	def subscribe_length(self) -> bool:
		'''
		订阅dict长度变化
		'''
		self.depend_length.depend()
		return True
	
	def subscribe_change(self) -> bool:
		'''
		订阅dict变化
		'''
		self.depend_change.depend()
		return True

	def _get(self):
		return self

	def _set(self, new_list):
		old_len = len(self.data)
		new_list = new_list.copy()
		for item in self.data:
			# May be we should pop one by one
			self.depend_remove.notify(item)
		self.data = new_list
		for item in new_list:
			self.depend_new.notify(item)
		self.depend_each.notify()
		new_len = len(self.data)
		if old_len != new_len:
			self.depend_length.notify()
		self.depend_change.notify()

	def copy(self):
		return self.data.copy()

	def append(self, item):
		self.data.append(item)
		self.depend_new.notify(item)
		self.depend_each.notify()
		self.depend_length.notify()
		self.depend_change.notify()

	def pop(self):
		item = self.data.pop()
		self.depend_remove.notify(item)
		self.depend_each.notify()
		self.depend_length.notify()
		self.depend_change.notify()
		return item

	def remove(self, item):
		ret = self.data.remove(item)
		self.depend_remove.notify(item)
		self.depend_each.notify()
		self.depend_length.notify()
		self.depend_change.notify()
		return ret

	def __iter__(self):
		self.depend_each.depend()
		return iter(self.data)

	def clear(self):
		if self.data:
			self.depend_length.notify()
		for item in self.data:
			# May be we should pop one by one
			self.depend_remove.notify(item)
		self.data.clear()
		self.depend_each.notify()
		self.depend_change.notify()

def reactive_list_converter(default_value, owner, name):
	if isinstance(default_value, list):
		return (ReactiveList, default_value, owner, name)

register_reactive_property_converter(reactive_list_converter)
