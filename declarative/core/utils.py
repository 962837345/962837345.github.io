from types import LambdaType
import traceback

from .watcher import push_watcher, pop_watcher, active_watcher
from .states.state import push_state, pop_state, active_state


def is_lambda(something):
	return isinstance(something, LambdaType) and (something.__name__ == '<lambda>')

def set_attr_func(obj, name):
	cls = type(obj)
	return lambda value: cls.__setattr__(obj, name, value)

"""
Fence:
	Can be used to access reactive properties without being
collected by a potential watcher. Often used to execute
imperative function in a declarative context.
"""
def push_fence():
	push_state(None)
	push_watcher(None)

def pop_fence():
	assert(active_watcher is None)
	pop_watcher()
	assert(active_state is None)
	pop_state()

def get_fenced_func(func):
	""" Wrap a function to make it unseen by watcher """
	def fenced_func(*args):
		push_fence()
		try:
			func(*args)
		except Exception as e:
			traceback.print_exc()
		pop_fence()
	return fenced_func

class ScopeDeclarativeFence:
	def __enter__(self):
		push_fence()

	def __exit__(self, exc_type, exc_val, exc_tb):
		if exc_type is not None:
			traceback.print_exc()
		pop_fence()

def scope_declarative_fence(func):
	def wrapped_func(*args, **kwargs):
		with ScopeDeclarativeFence():
			return func(*args, **kwargs)
	return wrapped_func
