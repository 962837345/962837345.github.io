---
title: collections
date: 2021-07-12
tags:
  - python
categories:
  - Python之旅
---

collections是Python内建的一个集合模块，提供了许多有用的集合类

### namedtuple

`collections.namedtuple(typename, field_name, verbose=False, rename=False)`

返回一个具名元组子类typename,其中参数的意义如下:

* typename:元组名称
* field_name:元组中元素的名称
* rename:如果元素名称中含有python的关键字，则必须设置为rename=True
* verbose:默认就好

```py
from collections import namedtuple

# 两种方式来给namedtuple定义方法名
User = namedtuple("User", ["name", "age", "sex"])
# User = namedtuple("user", "name age id")

user = User("小明", 18, "男")

# 获取所有字段名
print(user._fields)  # ('name', 'age', 'sex')

# 通过点调用获取用户属性
print(user.name)  # 小明
print(user.age)  # 18
print(user.sex)  # 男

# 修改对象属性，要使用_replace方法
user = user._replace(age=22)
print(user)  # User(name='小明', age=22, sex='男')

# 将User对象转换成字典，使用_asdict
print(user._asdict())  # {'name': '小明', 'age': 22, 'sex': '男'}
```

### deque

使用`list`存储数据时，按索引访问元素很快，但是插入和删除元素就很慢了，因为`list`时线性存储，数据量大的时候，插入和删除的效率很低

deque是为了高效实现插入和删除操作的双向列表，适用于队列和栈

```py
from collections import deque
q = deque([1, 2, 3])
q.append(4)
q.appendleft('a')
print(q)
# deque(['a', 1, 2, 3, 4])
```

* `appendleft()`：首部添加一个元素
* `extentdleft()`：首部添加一组元素
* `popleft()`：首部弹出一个元素
* `append()`：尾部添加一个元素
* `extend()`：尾部添加一组元素
* `pop()`：尾部弹出一个元素
* `insert(index, x)`：插入到指定位置
* `remove(item)`：删除指定元素
* `reverse()`：队列翻转

* `count()`：计算队列元素数
* `clear()`：清空队列
* `rotate(n)`：n>0：从尾部旋转n个元素到首部（顺时针）；n<0，从首部旋转n个元素到尾部（逆时针）
* `copy()`：复制一个新队列

* 支持`in`操作符：

  ```py
  from collections import deque
  q = deque([1, 2, 3])
  print(4 in q)  # False
  print(2 in q)  # True
  ```

### defaultdict

使用`dict`时，如果引用的key不存在，就会抛出`KeyError`。如果希望key不存在时，返回一个默认值，就可以用`defaultdict`

`defaultdict`接受一个工厂函数作为参数

* `defaultdict(list)`：对应[]
* `defaultdict(set)`：对应set()
* `defaultdict(str)`：对应空字符串
* `defaultdict(int)`：对应0
* 也可以传入一个自定义的函数:`defaultdict(lambda: "abc")`

```py
from collections import defaultdict
dd = defaultdict(list)
print(dd["1"])  # []
```

### OrderedDict

使用`dict`时，Key是无序的。在对`dict`做迭代时，我们无法确定Key的顺序

如果要保存Key的顺序，可以用`OrderedDict`

:::tip

`OrderedDict`的Key会按照插入的顺序排列，不是Key本身排序

:::

```py
from collections import OrderedDict
d = dict([("a", 1), ("c", 2), ("b", 3)])
print(d)
# {'a': 1, 'c': 2, 'b': 3}
od = OrderedDict([("a", 1), ("c", 2), ("b", 3)])
print(od)
# OrderedDict([('a', 1), ('c', 2), ('b', 3)])
```

`OrderedDict`可以实现一个FIFO的dict，当容量超出限制时，先删除最早添加的Key:

```py
from collections import OrderedDict


class LastUpdateOrderedDict(OrderedDict):
    def __init__(self, capacity):
        super(LastUpdateOrderedDict, self).__init__()
        self._capacity = capacity

    def __setitem__(self, key, value):
        containsKey = 1 if key in self else 0
        if len(self) - containsKey >= self._capacity:
            last = self.popitem(last=False)
            print('remove', last)
        if containsKey:
            del self[key]
            print('set', (key, value))
        else:
            print('add', (key, value))
        OrderedDict.__setitem__(self, key, value)
```

### Counter

`Counter`是一个简单的计数器，例如，可以统计字符出现的次数

```py
from collections import Counter


c = Counter()
for ch in 'Programmer':
	c[ch] = c[ch] + 1

print(c)
# Counter({'r': 3, 'm': 2, 'a': 1, 'e': 1, 'g': 1, 'o': 1, 'P': 1})
```

