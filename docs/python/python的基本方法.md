---
title: python的基本方法
date: 2021-04-16
tags:
  - python
categories:
  - Python之旅
---

### 随机数函数

1. `choice(seq)`：从序列的元素中随机挑选一个元素，seq 可以是一个列表、元组或字符串

```py
import random

# 从0~9中随机挑选一个数字
random.choice(range(10))
```

2. `randrange([start,] stop [,step])`：返回指定递增基数集合中的一个随机数，基数（start）默认值为 1

```py
import random

# 从 1-100 中选取一个奇数
random.randrange(1, 100, 2)

# 从 0-99 中选取一个随机数
random.randrange(100)
```

3. `random()`：随机生成一个范围在`[0,1)`范围内的实数

```py
import random

# 0.8156452628193048
random.random()
```

4. `seed([x])`：改变随机数生成器的种子 seed

理解：改变随机数生成的生成机制

5. `shuffle(lst)`：将序列的所有元素随机排序,没有返回值，调用直接改变列表

```py
import random

list = [1, 2, 3, 4, 5]
random.shuffle(list)
print(list) # [4, 3, 1, 2, 5]
```

### 列表的方法

1. `list.append(obj)`：在列表末尾添加新的对象
2. `list.count(obj)`： 统计某个元素在列表中出现的次数
3. `list.extend(seq)`：在列表末尾一次性追加另一个列表，会改变原列表
4. `list.index(obj)`：从列表中找出第一个匹配该值的索引
5. `list.insert(index, obj)`：将对象插入列表
6. `list.pop([index = -1])`：移除列表中的一个元素，无参数时默认移除最后一个元素
7. `list.remove(obj)`：移除列表中某个值的第一个匹配项
8. `list.reverse()`：反转列表
9. `list.sort(key = None, reverse = False)`：对原列表进行排序,`reverse = True`降序,`reverse = False`升序

```py
# 获取列表的第二个元素
def tackSecond(elem):
    return elem[1]


# 列表中的每个元素都是一个元组
random = [(2, 2), (3, 4), (4, 1), (1, 3)]

# 根据列表元素中的第二个元素来排序
random.sort(key=tackSecond)

print(random)  # [(4, 1), (2, 2), (1, 3), (3, 4)]
```

10. `sorted(key = None, reverse = False)`：与`sort()`的区别是`sorted()`返回一个新的 list
11. `list.clear()`：清空列表
12. `list.copy()`: 复制列表

### 字典的方法

1. `dist.clear()`：删除字典内所有元素
2. `dist.copy()`: 返回一个字典的浅复制
   浅复制和直接赋值的区别：浅复制会深拷贝父对象（一级目录），但不会深拷贝子对象（二级目录）；直接赋值只是引用对象

```py
dist1 = {'name': 'xiaoming', 'num': [1, 2, 3]}

dist2 = dist1 # 引用对象
dist3 = dist1.copy()  # 深拷贝一级目录

# 修改name
dist1['name'] = 'kellen'
dist1['num'].remove(1)

# 输出结果
print(dist1) # {'name': 'kellen', 'num': [2, 3]}
print(dist2) # {'name': 'kellen', 'num': [2, 3]}
print(dist3) # {'name': 'xiaoming', 'num': [2, 3]}
```

dist3 的一级目录是深拷贝，所以不会被修改

3. `dist.fromkeys(seq, val = None)`：创建一个新字典，以序列 seq 中元素做字典的 key，val 为字典所有键对应的初始值

```py
list = ['haha', 'hehe', 'xixi']

dist = {}
dist = dist.fromkeys(list) #{'haha': None, 'hehe': None, 'xixi': None}

print(dist)

dist = dist.fromkeys(list, 222) # {'haha': 222, 'hehe': 222, 'xixi': 222}

print(dist)
```

4. `dist.get(key, default = None)`：返回指定键的值，如果键不在字典中返回 default 设置的默认值

5. `key in dist`：判断 key 是否在 dist 中

6. `dist.items()`：以列表返回可遍历的(键，值)元组数组，可以用`list()`转化为列表

7. `dist.keys()`：返回一个迭代器，可以用`list()`来转化为包含所有 key 的列表

8. `dist.values()`：返回一个迭代器，可以用`list()`来转化为包含所有 value 的列表

9. `dist.setdefault(key, default = None)`：和`get()`类似，但如果键不存在于字典中，将会添加键并将值设为 default;存在则不改变，返回对应值

10. `dist.update(dist2)`：把字典 dist2 的键值对更新到 dist 中,key 相同时，会覆盖 value，不相同时会新增该 key 和 value。与 js 中 Object.assign()作用差不多

11. `pop(key, default)`：删除字典中给定 key 所对应的值，返回值为被删除的值。key 值必须给出。没有该 key 则返回 default 值

12. `popitem()`：删除并返回字典中的最后一对键和值

### 集合的方法

1. `add()`：为集合添加元素,如果添加的元素在集合中已存在，则不执行任何操作
2. `clear()`：移除集合中的所有元素
3. `copy()`：拷贝一个集合
4. `difference()`：返回多个集合的差集
5. `difference_update()`：移除集合中的元素，该元素在指定的集合也存在
6. `discard()`：删除集合中指定的元素
7. `intersection()`：返回集合的交集，返回的是一个新的集合
8. `intersection_update()`：返回集合的交集，在原始的集合上移除不重叠的元素
9. `isdisjoint()`：判断两个集合是否包含相同的元素，如果没有返回`True`,如果有返回`False`
10. `issubset()`：判断指定集合是否为该方法参数集合的子集
11. `issuperset()`：判断该方法的参数集合是否为指定集合的子集
12. `pop()`：随机移除元素
13. `remove()`：移除指定元素
14. `symmetric_difference()`：返回两个集合中不重复的元素集合
15. `symmetric_difference_update()`：移除当前集合中在另一个指定集合相同的元素，并将另外一个指定集合中不同的元素插入到当前集合中
16. `union()`：返回两个集合的并集
17. `update()`：给集合添加元素,可以添加新的元素或集合到当前集合中，如果添加的元素已存在，则该元素只会出现一次
