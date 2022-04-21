---
title: typedef、auto和decltype
date: 2022-04-21
tags:
 - C++
categories:
 - C++
---

### 类型别名

提高可读性

```cpp
typedef double wages;
typedef wages base, *p;

using SI = Sales_item; // c++11别名声明
```

对于指针这样的复合类型，类型别名的使用可能会产生意想不到的结果：

```cpp
typede chat *pstring;
const pstring cstr = 0; // 指向char的常量指针
const pstring *ps; // ps是指针变量，它的对象是指向char的常量指针

const char *cstr = 0; // 是对const pstring cstr = 0的错误理解
```

### auto类型说明符

```cpp
auto item = val1 + val2;

auto i = 0; *p = &j; // 正确
auto sz = 0, pi = 3.14; // 错误：auto已经被推断为int型，却需要被推断为double型
```

```cpp
int i = 0, &r = i;
auto a = r; // a是int型

const int ci = i, &cr = ci;
auto b = ci; // b是int型，ci的顶层const被忽略
auto c = cr; // c是int型，ci的顶层const被忽略
auto d = &i; // d是整形指针，整数的地址就是指向整型的指针
auto e = &ci;// e是指向整数常量的指针（底层const没有被忽略）

const auto f = ci;	// auto的推演类型为int， f是const int

auto &g = ci;	// g是一个整型常量引用。绑定到ci，（底层const没有被忽略）

auto &h = 42; 	// 错误：不能为非常量引用绑定字面值
const auto &j = 42; // 正确：可以为常量引用绑定字面值

auto &n = i, *p2 = &ci; // 错误：类型不一致
```

### decltype

* 选择并返回操作数的数据类型
* 只要数据类型，不要其值

```cpp
decltype(f()) sum = x; // sum的类型就是函数f返回的类型

const int ci = 0, &cj = ci;
decltype(ci) x = 0; // x的类型是const int
decltype(cj) y = x; // y的类型是const int &
```

```cpp
int i = 42, *p = &i, &r = i;
decltype(r+0) b; // 正确：b为int型

// 下面的*不是出现在声明中，而是表达式中的解引用运算符
decltype(*p) c; // 错误：解引用表达式，c的类型为引用，需要初始化

// 变量如果是加上括号， decltype的结果将是引用
decltype((i)) d; // 错误：d是int&类型，必须初始化
decltype(((i))) d1 = i; // 正确：d1是int&类型，绑定了i
decltype(i) e; // 正确： e是一个(未初始化的)int
```

