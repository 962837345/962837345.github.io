from ..dependency import Dependency, DefaultDict_Dependency
from .reactive_property import register_reactive_property_converter
from ._collections_nie import UserDict


class ReactiveDict(UserDict):
	""" Calling some unoverrided dict interfaces may break reactivity """
	__slots__ = ('depend_length', 'depend_new', 'depend_remove', 'depend_change', 'depend_each', 'depend_key')

	def __init__(self, default_value=None, owner=None, name=''):
		self.data = default_value.copy() if default_value else {}
		self.depend_length = Dependency(name + '_length') # Notify when length changed
		self.depend_new = Dependency(name + '_new')
		self.depend_remove = Dependency(name + '_remove')
		self.depend_change = Dependency(name + '_change') # Notify when dict changed
		self.depend_each = Dependency(name+'_each') # Notify whenever the dict has changed
		self.depend_key = DefaultDict_Dependency() # Notify only when specific key changed

	def __copy__(self):
		inst = self.__class__.__new__(self.__class__)
		inst.data = self.data.copy()
		inst.depend_length = Dependency(self.depend_length.property_name)
		inst.depend_new = Dependency(self.depend_new.property_name)
		inst.depend_remove = Dependency(self.depend_remove.property_name)
		inst.depend_change = Dependency(self.depend_change.property_name)
		inst.depend_each = Dependency(self.depend_each.property_name)
		inst.depend_key = DefaultDict_Dependency()
		return inst

	def __len__(self) -> int:
		'''
		对dict判空的时候也会触发该函数
		如果这里加上对长度的依赖的话，每次item添加或者移除，那么以下代码重复触发。
		if example_dict:
			foreach(example_dict, on_example_add, on_example_remove)
		如果需要监听长度的变化，请使用subscribe_length()
		'''
		# self.depend_length.depend()
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

	def _set(self, new_dict):
		old_len = len(self.data)
		if isinstance(new_dict, ReactiveDict):
			new_dict = new_dict.data.copy()
		for key, value in self.data.items():
			self.depend_remove.notify(key, value)
		self.data = new_dict
		for key, value in self.data.items():
			self.depend_new.notify(key, value)
		self.depend_each.notify()
		new_len = len(self.data)
		if old_len != new_len:
			self.depend_length.notify()
		self.depend_change.notify()

	def copy(self):
		return self.data.copy()

	def __getitem__(self, key):
		# self.depend_key[key].depend() # Try creating a new Dependency
		return self.data[key]

	def __contains__(self, key):
		# self.depend_key[key].depend() # Try creating a new Dependency
		return key in self.data

	def __setitem__(self, key, value):
		new = key not in self.data
		self.data[key] = value
		if new:
			self.depend_new.notify(key, value)
			self.depend_length.notify()
			self.depend_change.notify()
		if key in self.depend_key: # Try not to create dependency
			self.depend_key[key].notify()
		self.depend_each.notify()

	def __delitem__(self, key):
		is_exist = key in self.data
		value = self.data.pop(key)
		self.depend_remove.notify(key, value)
		if key in self.depend_key:
			self.depend_key[key].notify()
		self.depend_each.notify()
		if is_exist:
			self.depend_length.notify()
			self.depend_change.notify()

	def __iter__(self):
		self.depend_each.depend()
		return iter(self.data)

def reactive_dict_converter(default_value, owner, name):
	if isinstance(default_value, dict):
		return (ReactiveDict, default_value, owner, name)

register_reactive_property_converter(reactive_dict_converter)
