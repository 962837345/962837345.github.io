---
title: Const修饰成员函数
date: 2023-02-19
tags:
 - C++
categories:
 - C++
---


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

