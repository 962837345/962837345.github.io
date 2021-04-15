---
title: python的基本数据类型
date: 2021-04-13
tags:
  - python
categories:
  - Python之旅
---

Python3 中有六个标准的数据类型

- Number（数字）
- String（字符串）
- List（列表）
- Tuple（元组）
- Set（集合）
- Dicitionary（字典）

其中

- 可变数据：List（列表）、Set（集合）、Dicitionary（字典）
- 不可变数据：Number（数字）、String（字符串）、Tuple（元组）

## Number（数字）

Python3 支持**int**、**float**、**bool**、**complex（复数）**

type()函数可以用来查询遍历所指的对象类型

```py
a = 10
print(type(a))

<class 'int'>
```

也可以用 isinstance()来判断

```py
a = 10
print(isinstance(a, int))

True
```

type 和 isinstance 的区别在于:

- type()不会认为子类是一种父类类型
- isinstance()会认为子类是一种父类类型

```py
class A:
    pass


class B(A):
    pass


print(isinstance(B(), A)) # True

print(type(B()) == A) # False
```

python 中除法`/`得到一个浮点数,`//`将调用`floor()`向下取整得到一个整数

## String（字符串）

字符串的截取语法如下:**变量[头下标:尾下标]**（不包含尾下标的那个元素）

```py
str = 'kellen'

print(str[2:5]) # lle
```

## List（列表）

列表用方括号`[]`表示。列表和字符串一样，可以被索引和截取，列表被截取后返回一个包含所需元素的新列表

列表截取语法如下:**变量[头下标:尾下标]**

List 可以用`+`操作符进行拼接

```py
list1 = [1, 2, 3]

list2 = [4, 5, 6]

print(list1 + list2) # [1, 2, 3, 4, 5, 6]
```

列表截取可以接收第三个参数，参数作用是截取的步长

```py
list = [1, 2, 3, 4, 5]
print(list[1:5:2]) # [2, 4]
```

使用列表反转字符串:

```py
def reverseWords(input):
    inputWords = input.split(' ')

    # 这里[-1::-1]有三个参数
    # 第一个-1代表最后一个元素
    # 第二个-1表示逆向

    inputWords = inputWords[-1::-1]
    output = ' '.join(inputWords)

    return output

if __name__ == "__main__":
    input = 'I like python'
    rw = reverseWords(input)
    print(rw)
```

## Tuple（元组）

元组与列表类似，不同之处在于元组的元素不能修改。元组写在小括号`()`里。元组中的元素类型可以不相同

构造包含 0 个或 1 个元素的元组比较特殊，需要额外的语法规则

```py
tup1 = () # 空元组
tup2 = (20,) # 一个元素，需要在元素后添加逗号
```

## Set（集合）

用`{}`或`set()`函数可以创建集合

::: tip
创建一个空集合必须用`set()`,因为`{}`是用来创建一个空字典
:::

集合不包含重复的元素，重复的元素会被去掉

## Dictionary（字典）

字典是无序的对象集合，通过键值对存取。字典用`{}`标识
