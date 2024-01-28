---
title: const限定符
date: 2022-04-19
tags:
 - C++
categories:
 - C++
---


**const限定符**：把变量定义成一个常量

使用const对变量的类型加以限定，变量的值不能被改变

const对象必须**初始化**（其他时候不能出现在等号左边）

默认状态下，const对象仅在文件内有效

如果想在多个文件之间共享const对象，必须在变量的定义之前添加**extern**关键字

### const的引用

对常量的引用

```cpp
const int a = 222;
const int &b = a; // 正确：引用及其绑定的对象都是常量

b = 333; // 错误：相当于a=333,试图修改常量
int &c = a; //错误：a是常量，存在通过c改变a(const)的风险
```

```cpp
int a = 222;
const int &b = a; // 正确：a依然可以通过其他途径修改
int &c = b*2; // 错误：不能通过一个非常量的引用指向一个常量
```

### 指针和const

* 指针常量
  
  ```int * const p = &a;```
  
  指针指向不能改，指针指向的值可以改（必须初始化）

  ```cpp
  int a = 10, b = 20;
  int* const p = &a;
  *p = 15; // 允许修改值
  p = &b; // 报错
  ```

* 常量指针

  ```const int* p = &a;```

  指针指向可以改，指针指向的值不可以改

  ```cpp
  int a = 10, b = 20;
  const int* p = &a;
  *p = 15; // 报错
  p = &b; // 允许修改值
  ```

* 指向常量的指针常量

  ```const int* const p = &a;```


### constexpr和常量表达式

* 常量表达式(const expression)是指：值不会改变并且在编译过程就能得到计算结果的表达式

  ```cpp
  const in max_files = 20;	// 是
  int staff_size = 22;		// 不是
  ```

* constexpr变量

  c++11标准规定，允许将变量声明为constexpr类型，以便由编译器来验证变量的值是否是一个常量表达式

  * 一定是一个常量

  * 必须用变量表达式初始化

    ```cpp
    constexpr int mf = 20;
    constexpr int limit = mf + 1;
    constexpr int sz = size(); // 只有当size是一个constexpr函数时才正确
    ```

  * 指针和constexpr

    * 限定符仅对指针有效，对指针所指的对象无关

    ```cpp
    const int *np = nullptr; // 常量指针
    int j = 0;
    constexpr int i = 42;
    
    constexpr const int *p = &i;	// p是常量指针，指向常量
    constexpr int *p1 = &j;			// p1是常量指针，指向变量j
    ```

### Const修饰成员函数

**常函数：**

* 成员函数后加const我们称这个函数为常函数
* 常函数内不可以修改成员属性
* 成员属性声明时加关键字`mutable`后,在常函数中依然可以修改

**常对象:**

* 声明对象前加const称该对象为常对象
* 常对象只能调用常函数

```cpp
#include <iostream>
#include <string>
using namespace std;

class Person 
{
public:
    int a;
    mutable int b; // 特殊变量，加上mutable，即使在常函数中，也可以修改这个值
    
    // this指针的本质,是指针常量,指针的指向是不可以修改的
    // const Person * const this
    // 在成员函数后面加const,修饰的是this指向，让指针指向的值也不可以改变
    void ShowPerson() const 
    {
        // a = 10;
        b = 20;
    }
};

void test()
{
    const Person p; // 常对象
    p.b = 100;      // b用mutable修饰，可以修改
    p.ShowPerson(); // 常对象只能调用常函数
}


int main()
{
    test();

    system("pause");

    return 0;
}
```