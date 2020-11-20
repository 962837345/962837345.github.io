---
title: 判断是否通过new调用构造函数
date: 2020-11-20
tags:
 - JS
categories:
 - 前端笔记
---
1. 在构造函数中使用严格模式，因为在严格模式下，构造函数如果不使用new调用，this的指向为undefined，为undefined添加属性会报错
```js
function Person(){
  'use strict'
  console.log(this) 
}
Person() // undefined
new Person() // Person{}
```
2. 使用instanceof判断this的指向
```js
function Person(){
  console.log(this instanceof Person)
}
Person() // false
new Person() // true
```
3. 使用new.target来判断
```js
function Person(){
  console.log(new.target === Person)
}
Person() // false
new Person() //true
```
如果不是使用new调用，new.target为undefined