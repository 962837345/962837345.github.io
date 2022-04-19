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

* 指向常量的指针

  ```cpp
  const double pi = 3.14;
  double *ptr = &pi; // 错误：存在通过ptr指针修改pi的风险
  const double *cptr = &pi;
  
  double dval = 3.14;
  cptr = &dval; // 正确：但不能通过cptr修改dval的
  ```

* const指针：指针是对象，也可以限定为常量（必须初始化）

  * 把*放在const之前，说明指针是一个常量

  * 不变的是指针本身的值，而非指向的那个值

    ```cpp
    int n = 0;
    int *const a = &n;
    const double pi = 3.14159;
    const double *const pip = &pi; // 指向常量的常量指针
    
    *pip = 2.71; // 错误：试图修改常量pi
    
    *a = 1;	// 正确：修改的是n的值，地址还是原来的地址
    ```

### 顶层const

* 顶层const：表示变量本身是一个常量
* 底层const：表示指针所指向的对象是一个const

```cpp
int i = 0;
int *const p1 = &i; 		// 顶层
const int ci = 42; 			// 顶层
const int *p2 = &ci; 		// 底层
const int *const p3 = p2; 	// (左：底层)，（右：顶层）

p2 = p3;					// 正确

int *p = p3;				// 错误：存在通过*p修改*p3(const)的风险
p2 = &i;					// 正确：只是不能通过p2修改i而已
int &r = ci;				// 错误：存在通过r修改ci(const)的风险
const int &r2 = i;			// 正确：只是不能通过r2修改i而已
```

### constexpr和常量表达式

* 常量表达式(const expression)是指：值不会改变并且在编译过程就能得到计算结果的表达式

  ```cpp
  const in max_files = 20;	// 是
  int staff_size = 22;		// 不是
  ```

* constexpr变量

  c++11标准规定，允许将变量声明为constexpr类型，以便由编译器来验证变量的值是否是一个变量表达式

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

    