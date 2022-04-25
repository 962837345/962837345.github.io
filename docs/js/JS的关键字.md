---
title: JS的关键字
date: 2020-07-24
tags:
 - JS
categories:
 - 前端笔记
---


## typeof
使用typeof 操作符来检测变量的数据类型
```js
typeof "John"                // 返回 string
typeof 3.14                  // 返回 number
typeof false                 // 返回 boolean
typeof [1,2,3,4]             // 返回 object
typeof {name:'John', age:34} // 返回 object
```

## null
在 JavaScript 中 null 表示 "什么都没有"。

null是一个只有一个值的特殊类型。表示一个空对象引用。

## undefined
在 JavaScript 中, undefined 是一个没有设置值的变量。

typeof 一个没有值的变量会返回 undefined。

1. 变量被声明了，但没有赋值时，就等于undefined
2. 调用函数时，应该提供的参数没有提供，该参数等于undefined
3. 对象没有赋值的属性，该属性的值为undefined
4. 函数没有返回值时，默认返回undefined

## undefined 和 null 的区别
```js
typeof undefined             // undefined
typeof null                  // object
null === undefined           // false
null == undefined            // true
```

:::tip
* NaN 的数据类型是 number
* 数组(Array)的数据类型是 object
* 日期(Date)的数据类型为 object
* null 的数据类型是 object
* 未定义变量的数据类型为 undefined
:::

如果对象是 JavaScript Array 或 JavaScript Date ，我们就无法通过 typeof 来判断他们的类型，因为都是 返回 object

## instanceof
使用`instanceof`来判断一个实例是否属于某种类型，`instanceof`的返回值为`boolean`
```js
let str = new String("abc")
console.log(str instanceof String)
```

## String和string的区分
String是一个构造函数，string是变量的一个类型

String("xxx")返回的是一个string
```js
let str = new String("abc");
let str1 = "abc";
console.log(typeof str);         //object
console.log(typeof str1);        //string
console.log(typeof String);      //function
console.log(typeof string);      //undefined
console.log(typeof String("abc"));//string
```

## constructor属性
constructor 属性返回所有 JavaScript 变量的构造函数
```js
"John".constructor                 // 返回函数 String()  { [native code] }
(3.14).constructor                 // 返回函数 Number()  { [native code] }
false.constructor                  // 返回函数 Boolean() { [native code] }
[1,2,3,4].constructor              // 返回函数 Array()   { [native code] }
{name:'John', age:34}.constructor  // 返回函数 Object()  { [native code] }
new Date().constructor             // 返回函数 Date()    { [native code] }
function () {}.constructor         // 返回函数 Function(){ [native code] }
```