---
title: explicit关键字
date: 2022-06-11
tags:
 - C++
categories:
 - C++
---

`explicit`关键字只能用于修饰只有一个参数的类构造函数，它的作用是表明该构造函数是显示的，而非隐式的，跟它相对应的另一个关键字是`implicit`，意思是隐藏的。**类构造函数默认情况下即声明为`implicit`(隐式)**

#### 没有使用explicit关键字

```cpp
class CxStirng
{
public:
    char *_pstr;
    int _size;
    CxString(int size)
    {
        _size = size;
        _pstr = malloc(size + 1);
        memset(_pstr, 0, size + 1);
    }
    CxString(const char *p)
    {
        int size = strlen(p);
        _pstr = malloc(size + 1);
        strcpy(_pstr, p);
        _size = strlen(_pstr);
    }
}


CxString string1(24);		// 正确，为CxString预分配24字节大小的内存
CxString string2 = 10;		// 正确，为CxString预分配10
CxStirng string3;			// 错误，没有默认的构造函数
CxString string4("aaa");	// 正确
CxString string5 = "bbb";	// 正确，调用的是CxString(cosnt char *p)
CxString string6 = 'c';		// 正确，调用的是CxString(int size)，且size等于'c'的ascii码
string1 = 2;				// 正确，为CxString预分配2字节大小的内存
```

在C++中，如果构造函数只有一个参数时，那么在编译时就会有一个缺省的转换操作，将该构造函数对应数据类型的数据转换为该类对象，也就是说`CxString string2 = 10;`这段代码，编译器自动将整型转换为CxString类对象，实际上等同于下面的操作

```cpp
CxString string2(10);

CxString temp(10);
CxString string2 = temp;
```

对于`CxString string2 = 10;`和`CxString string6 = 'c';`，两句都可以正常执行，但是容易让人疑惑，这里就需要使用`explicit`关键字

```cpp
class CxString
{
public:
    char *_pstr;
    int _size;
    explicit CxString(int size)
    {
        _size = size;
        _pstr = malloc(size + 1);
        memset(_pstr, 0, size + 1);
    }
    CxString(const char *p)
    {
        int size = strlen(p);
        _pstr = malloc(size + 1);
        strcpy(_pstr, p);
        _size = strlen(_pstr);
    }
}


CxString string1(24);		// 正确，为CxString预分配24字节大小的内存
CxString string2 = 10;		// 错误，因为explicit关键字取消了隐式转换
CxStirng string3;			// 错误，没有默认的构造函数
CxString string4("aaa");	// 正确
CxString string5 = "bbb";	// 正确，调用的是CxString(cosnt char *p)
CxString string6 = 'c';		// 错误，explicit关键字取消了隐式转换
string1 = 2;				// 错误，因为取消了隐式转换
```

`explicit`关键字的作用就是防止类构造函数的隐式自动转换

`explicit`关键字只对有一个参数的类构造函数有效，如果类构造函数参数大于或等于两小时，是不会产生隐式转换的，所以`explicit`关键字也就无效了

但是，也有一个例外，就是当除了第一个参数以外的其他参数都有默认值的时候，explicit关键字依然有效，此时，当调用构造函数时只传入一个参数，等效于只有一个参数的类构造函数