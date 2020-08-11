---
title: arguments
date: 2020-07-24
tags:
 - JS
categories:
 - 前端笔记
---

在调用函数时，浏览器每次都会传递两个隐含的参数：
* 函数的上下文对象this
* 封装实参的对象arguments
  * arguments是一个类数组对象，可以通过索引来获取数据，也可以获取长度
  * 在调用函数时，我们所传递的实参都会在arguments中保存
  * arguments.length可以用来获取实参的长度
* 它里面有一个属性叫callee
  * 这个属性对应一个函数对象，就是当前正在指向的函数的对象
```js
function fun() {
  console.log(arguments instanceof Array);
  console.log(arguments.length)
  console.log(arguments[0],arguments[1])
}

fun(2,6)
```
输出
```
false
2
2 6
```
  