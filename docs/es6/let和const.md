---
title: let和const
date: 2020-07-24
tags:
 - ES6
categories:
 - 前端笔记 
---

## let命令
* let在代码块中有效，var是在全局范围内有效
* let只能声明一次，var可以多次声明

示例:
```js
for (var i = 0; i < 10; i++) {
  setTimeout(function(){
    console.log(i);
  })
}
// 输出十个 10
for (let j = 0; j < 10; j++) {
  setTimeout(function(){
    console.log(j);
  })
}
// 输出0123456789
```
变量 i 是用 var 声明的，在全局范围内有效，所以全局中只有一个变量 i, 每次循环时，setTimeout 定时器里面的 i 指的是全局变量 i ，而循环里的十个 setTimeout 是在循环结束后才执行，所以此时的 i 都是 10。

变量 j 是用 let 声明的，当前的 j 只在本轮循环中有效，每次循环的 j 其实都是一个新的变量，所以 setTimeout 定时器里面的 j 其实是不同的变量

* let不存在变量提升
```js
console(a);   // a is not defined   
let a = 123;

console(b);   // undefined
var b = 456;
```

## const
const声明一个只读变量，声明后不允许改变，意味着，一旦声明就必须赋值，不然就会报错

const定义的对象或数组，是可变的

简单类型和复合类型保存值的方式是不一样的
* 简单类型（Number，String，boolean），值就保存在变量指向的那个内存地址
* 复杂类型（object，function，array），变量指向的内存地址其实是保存了一个指向实际数据的指针，
const只能保证指针是固定的，至于指针指向的数据结构变不变就无法控制
```js
const person = {
  name: "小明",
  age: 18,
  sex: "男"
};
console.log(person); //{name:"小明",age:18,sex:"男"}
person.age = 20;
console.log(person); //{name:"小明",age:20,sex:"男"}
person = {name:"小红",age:25,sex:"女"}   // 错误
```