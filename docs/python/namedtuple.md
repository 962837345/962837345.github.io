---
title: namedtuple
date: 2021-06-26
tags:
  - python
categories:
  - Python之旅
---

## namedtuple

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

