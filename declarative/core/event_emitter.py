import traceback
from collections import defaultdict
from typing import Callable
from weakref import WeakMethod
# from unreal_engine import UObject
# import unreal_engine as ue


class EventEmitter(object):
	"""
	We may add some call depth counters to ensure the containter's constness during iteration
	"""
	__slots__ = ('handlers', '__weakref__')

	def __init__(self):
		self.handlers = defaultdict(_EventBase)

	def on(self, event: str, func: Callable):
		self.handlers[event] += func

	def emit(self, event: str, *args):
		self.handlers[event](*args)

	def off(self, event: str, func: Callable):
		self.handlers[event] -= func

	def clear(self):
		self.handlers.clear()

	def redirect(self, obj):
		obj.on = self.on
		obj.emit = self.emit
		obj.off = self.off
		obj.clear = self.clear

	def __getitem__(self, name):
		return self.handlers[name]

	def __setitem__(self, key, value):
		self.handlers[key] = value

class _EventBase(object):
	__slots__ = ('listeners', '_iter_counter', '_to_del_listeners', '_to_add_listeners')

	def __init__(self):
		self.listeners = []
		self._iter_counter = 0
		self._to_del_listeners = []
		self._to_add_listeners = []

	def __iadd__(self, listener):
		if self._iter_counter > 0:
			self._to_add_listeners.append(listener)
		else:
			self.__isub__(listener)
			self.listeners.append(try_cast_to_weak_method(listener))   #仅在这里转换
		return self

	def __isub__(self, listener):
		if self._iter_counter > 0:
			self._to_del_listeners.append(listener)
		else:
			try:
				self.listeners.remove(listener)
			except ValueError:
				pass
		return self

	def __call__(self, *args, **kwargs):
		self._iter_counter += 1
		for func in self.listeners:
			try:
				if func:
					func(*args, **kwargs)
				else:
					self._to_del_listeners.append(func)
			except Exception as err:
				traceback.print_exc()
		self._iter_counter -= 1
		if self._iter_counter == 0:
			if self._to_add_listeners:
				for listener in self._to_add_listeners:
					self.__iadd__(listener)
				self._to_add_listeners = []
			if self._to_del_listeners:
				for listener in self._to_del_listeners:
					self.__isub__(listener)
				self._to_del_listeners = []


def is_bound_method(func):
	return func.__class__.__name__ == 'method'


def try_cast_to_weak_method(func):
	return WeakFuncRef(func) if is_bound_method(func) else func


class WeakFuncRef(object):   #进来的一定是Method
	__slots__ = ('func', 'is_uboject')

	def __init__(self, func):
		try:
			obj = func.__self__
			self.is_uboject = isinstance(obj, UObject)
		except:
			self.is_uboject = False
		if self.is_uboject:
			self.func = func
		else:
			self.func = WeakMethod(func)

	def __call__(self, *args, **kwargs):
		if self.is_uboject:
			self.func(*args, **kwargs)
		else:
			self.func()(*args, **kwargs)

	def __bool__(self):
		if self.is_uboject:
			obj = self.func.__self__
			return ue.is_valid(obj)
		else:
			return self.func() is not None

	def __eq__(self, other):
		if self.is_uboject:
			return self.func == other
		else:
			return self.func() == other
