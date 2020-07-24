---
title: JS作用域
date: 2020-07-24
tags:
 - JS
categories:
 - 前端笔记
---

## 全局作用域
* 直接编写在script标签中的JS代码，都在全局作用域中
* 全局作用域在页面打开时创建，在页面关闭时销毁
* 在全局作用域中有一个全局对象window
* 在全局作用域中
  * 创建的变量都会作为window对象的属性保存
  * 创建的函数都会作为window对象的方法保存
* 全局作用域中的变量都是全局变量
  * 在页面的任意的部分都可以访问到

## 函数作用域
* 调用函数时创建函数作用域，函数执行完毕后，函数作用域销毁
* 每调用一次函数就会创建一个新的函数作用域，它们之间是互相独立的
* 在函数作用域中可以访问到全局作用域的变量
* 在全局作用域中无法访问到函数作用域中的变量
* 当函数作用域操作一个变量时，它会先在自身作用域中找，找不到再向上级作用域中找，直到找到全局作用域
* 在函数作用域也有声明提前的特性
  * 使用var关键字声明的变量，会在函数中所有代码执行之前声明
  * 函数声明也会在函数中所有代码执行之前声明
* 在函数中不是var关键字声明的变量都会被作为全局变量
* 函数中的形参会在函数作用域中声明了变量

示例1；
```js
var a = 123;
function fun() {
  alert(a);         //undefined
  var a = 456;      //这里的a被var关键字提前声明
}
fun();
alert(a)            //123
```
示例2：
```js
var a = 123;
function fun() {
  alert(a);         //123
  a = 456;          //这里的a被var关键字提前声明
}
fun();
alert(a)            //456
```
示例3：
```js
var a = 123;
function fun(a) {
  alert(a);         //undefined
  a = 456;          
}
fun();
alert(a)            //123
```
示例4：
```js
var a = 123;
function fun(a) {
  alert(a);         //123
  a = 456;          
}
fun(123);
alert(a)            //123
```



## 变量的提前声明
使用var关键字声明的变量，会在所以的代码执行之前被声明（但是不会赋值）

如果不使用var关键字，则变量不会被声明提前
```js
console.log(a)
var a = 123;
```
等于
```js
var a;
console.log(a)
a = 123;
```
此时a为undefined

如果去掉var
```js
console.log(a)
a = 123;
```
此时报错  a is not defined

## 函数的声明提前
使用函数声明形式创建的函数function函数(){}

它会在所有代码执行之前就被创建

示例1：
```js
    fun();
    function fun() {
      console.log("我是一个fun函数")
    }
    var fun2 = function () {
      console.log("我是一个fun2函数")
    }
```
等于
```js
    function fun() {
      console.log("我是一个fun函数")
    }
    fun();
    var fun2 = function () {
      console.log("我是一个fun2函数")
    }
```
输出: 我是一个fun函数

示例2：
```js
    fun2();
    function fun() {
      console.log("我是一个fun函数")
    }
    var fun2 = function () {
      console.log("我是一个fun2函数")
    }
```
输出：fun2 is not a function

这里的fun2会被提前声明，但是只是声明一个var fun2,没有进行赋值，所以会报错
