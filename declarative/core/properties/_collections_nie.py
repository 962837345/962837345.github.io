import _collections_abc

__all__ = [
	'UserDict',
	'UserList',
]

class UserDict(_collections_abc.MutableMapping):
	__slots__ = ('data', '__weakref__')

	# Start by filling-out the abstract methods
	def __init__(self, dict=None, /, **kwargs):
		self.data = {}
		if dict is not None:
			self.update(dict)
		if kwargs:
			self.update(kwargs)

	def __len__(self):
		return len(self.data)

	def __getitem__(self, key):
		if key in self.data:
			return self.data[key]
		if hasattr(self.__class__, "__missing__"):
			return self.__class__.__missing__(self, key)
		raise KeyError(key)

	def __setitem__(self, key, item):
		self.data[key] = item

	def __delitem__(self, key):
		del self.data[key]

	def __iter__(self):
		return iter(self.data)

	# Modify __contains__ to work correctly when __missing__ is present
	def __contains__(self, key):
		return key in self.data

	# Now, add the methods in dicts but not in MutableMapping
	def __repr__(self):
		return repr(self.data)

	def __or__(self, other):
		if isinstance(other, UserDict):
			return self.__class__(self.data | other.data)
		if isinstance(other, dict):
			return self.__class__(self.data | other)
		return NotImplemented

	def __ror__(self, other):
		if isinstance(other, UserDict):
			return self.__class__(other.data | self.data)
		if isinstance(other, dict):
			return self.__class__(other | self.data)
		return NotImplemented

	def __ior__(self, other):
		if isinstance(other, UserDict):
			self.data |= other.data
		else:
			self.data |= other
		return self

	def __copy__(self):
		inst = self.__class__.__new__(self.__class__)
		inst.data = self.data.copy()
		return inst

	def copy(self):
		if self.__class__ is UserDict:
			return UserDict(self.data)
		import copy
		data = self.data
		try:
			self.data = {}
			c = copy.copy(self)
		finally:
			self.data = data
		c.update(self)
		return c

	@classmethod
	def fromkeys(cls, iterable, value=None):
		d = cls()
		for key in iterable:
			d[key] = value
		return d


class UserList(_collections_abc.MutableSequence):
	"""A more or less complete user-defined wrapper around list objects."""
	__slots__ = ('data', '__weakref__')

	def __init__(self, initlist=None):
		self.data = []
		if initlist is not None:
			# XXX should this accept an arbitrary sequence?
			if type(initlist) == type(self.data):
				self.data[:] = initlist
			elif isinstance(initlist, UserList):
				self.data[:] = initlist.data[:]
			else:
				self.data = list(initlist)

	def __repr__(self):
		return repr(self.data)

	def __lt__(self, other):
		return self.data < self.__cast(other)

	def __le__(self, other):
		return self.data <= self.__cast(other)

	def __eq__(self, other):
		return self.data == self.__cast(other)

	def __gt__(self, other):
		return self.data > self.__cast(other)

	def __ge__(self, other):
		return self.data >= self.__cast(other)

	def __cast(self, other):
		return other.data if isinstance(other, UserList) else other

	def __contains__(self, item):
		return item in self.data

	def __len__(self):
		return len(self.data)

	def __getitem__(self, i):
		if isinstance(i, slice):
			return self.__class__(self.data[i])
		else:
			return self.data[i]

	def __setitem__(self, i, item):
		self.data[i] = item

	def __delitem__(self, i):
		del self.data[i]

	def __add__(self, other):
		if isinstance(other, UserList):
			return self.__class__(self.data + other.data)
		elif isinstance(other, type(self.data)):
			return self.__class__(self.data + other)
		return self.__class__(self.data + list(other))

	def __radd__(self, other):
		if isinstance(other, UserList):
			return self.__class__(other.data + self.data)
		elif isinstance(other, type(self.data)):
			return self.__class__(other + self.data)
		return self.__class__(list(other) + self.data)

	def __iadd__(self, other):
		if isinstance(other, UserList):
			self.data += other.data
		elif isinstance(other, type(self.data)):
			self.data += other
		else:
			self.data += list(other)
		return self

	def __mul__(self, n):
		return self.__class__(self.data * n)

	__rmul__ = __mul__

	def __imul__(self, n):
		self.data *= n
		return self

	def __copy__(self):
		inst = self.__class__.__new__(self.__class__)
		inst.data = self.data[:]
		return inst

	def append(self, value):
		self.data.append(value)

	def insert(self, index, value):
		self.data.insert(index, value)

	def pop(self, index=-1):
		return self.data.pop(index)

	def remove(self, value):
		self.data.remove(value)

	def clear(self):
		self.data.clear()

	def copy(self):
		return self.__class__(self)

	def count(self, value):
		return self.data.count(value)

	def index(self, value, *args):
		return self.data.index(value, *args)

	def reverse(self):
		self.data.reverse()

	def sort(self, /, *args, **kwds):
		self.data.sort(*args, **kwds)

	def extend(self, values):
		if isinstance(values, UserList):
			self.data.extend(values.data)
		else:
			self.data.extend(values)
