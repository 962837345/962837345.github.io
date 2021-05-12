---
title: 深入python的set和dict
date: 2021-05-09
tags:
  - python
categories:
  - Python之旅
---

## collections中的abc

dist和list（Sequence）相似都继承于Collection，添加了一些方法

```py
from collections.abc import MutableMapping

a = {}

print(isinstance(a, MutableMapping))  # True
```

## dict的常见方法

### copy()

copy只能浅拷贝

```py
a = {"test1": {'test': 'hahaha'}, 'test2': {'test': 'hehehe'}}

b = a.copy()
b['test1']['test'] = 'heihei'

print(a)  # {'test1': {'test': 'heihei'}, 'test2': {'test': 'hehehe'}}
print(b)  # {'test1': {'test': 'heihei'}, 'test2': {'test': 'hehehe'}}
```

要实现深拷贝可以使用copy中的`deepcopy`方法

```py
import copy

a = {"test1": {'test': 'hahaha'}, 'test2': {'test': 'hehehe'}}

b = copy.deepcopy(a)
b['test1']['test'] = 'heihei'

print(a)  # {'test1': {'test': 'hahaha'}, 'test2': {'test': 'hehehe'}}
print(b)  # {'test1': {'test': 'heihei'}, 'test2': {'test': 'hehehe'}}
```

### fromkeys()

`fromkeys()`可以把一个可迭代对象转换成dict,并设置默认值

```py
my_list = ['a', 'b']

my_dict = dict.fromkeys(my_list, 'haha')

print(my_dict)  # {'a': 'haha', 'b': 'haha'}
```

### get()

`get()`方法可以预防keyerror，当没有对应的key时，返回设置的默认值

### items()

一般用于循环，返回key,value的元组

### setdefault()

将值设置进去，并获取该值返回

```py
my_dict = {'name': 'kellen'}

value = my_dict.setdefault('age', '23')

print(value)  # 23
print(my_dict)  # {'name': 'kellen', 'age': '23'}
```

### update()

添加键值对或更新键值对

```py
a = {'name': 'kellen'}

# 添加新键值对（即合并两个字典）

a.update({'age': 23})
print(a)  # {'name': 'kellen', 'age': 23}

# 第二种方式

a.update(sex='man')
print(a)  # {'name': 'kellen', 'age': 23, 'sex': 'man'}

# 第三种方式，list里面放tuple，tuple里面放tuple等（可迭代就行）

a.update([('say', 'haha')])
print(a)  # {'name': 'kellen', 'age': 23, 'sex': 'man', 'say': 'haha'}

# 修改键值对

a.update({'age': 18})
print(a)  # {'name': 'kellen', 'age': 18, 'sex': 'man', 'say': 'haha'}
```

### dict的子类

#### UserDict

不要去继承内置类型，有可能会失败比如`update`方法

```py
# 不建议继承list和dict
class MyDict(dict):
    def __setitem__(self, key, value):
        super().__setitem__(key, value * 2)


# 未调用自己写的方法
my_dict = MyDict(one=1)
print(my_dict)  # {'one': 1}

my_dict['one'] = 1
# 调用自己写的方法
print(my_dict)  # {'one': 2}

# 如果要继承，就继承Userdict
from collections import UserDict


class MyDict2(UserDict):
    def __setitem__(self, key, value):
        super().__setitem__(key, value * 2)


my_dict2 = MyDict2(one=1)
print(my_dict2)  # {'one': 2}
```

#### defaultdict

```py
from collections import defaultdict
# 可以是dict,int,str,list,tuple等等
my_dict = defaultdict(dict)
# 找不到key，实际调用的是__missing__方法
print(my_dict['a'])  # {}
```

## set和frozenset

1. **set：无序，不重复（性能很高）**
2. **frozenset：不可变的集合（无序，不重复）**

## dict和set实现原理

### 结论

1. dict查找的性能远远高于list
2. 在list种随着list数据的增大，查找时间会增大
3. 在dict种查找元素不会随着dict的增大而增大

### dict基于hash表（set也是，所占空间比dict小）

:::tip

1. dict的key或者set的值，都必须是可以hash的（不可变对象都是可以hash的，如str，frozenset，tuple，自己实现的类【实现`__hash__`魔法函数】）
2. dict内存花销大，但是查询速度快，自定义的对象或者python内置的对象都是用dict包装的
3. dict的存储顺序与元素添加顺序有关
4. 添加数据有可能改变已有数据的顺序
5. 取数据的时间复杂度为O(1)

:::

通过hash函数计算key（有很多算法），通过hash函数计算然后于7进行**与运算**，在计算过程种有可能冲突，得到同样的位置（有很多解决方法），如'abc'取一位'c'加一位随机数，如果冲突，就向前多取一位再计算

哈希表会先声明一个很小的内存空间，可能存在一些空白，计算空白，如果小于1/3，就声明一个更大的空间，拷贝过去，减少冲突