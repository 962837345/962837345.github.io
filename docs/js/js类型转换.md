---
title: js类型转换
date: 2020-08-30
tags:
 - JS
categories:
 - 前端笔记
---

## Boolean的类型转换
:::tip
任何对象转为布尔值，都得true
:::

:::warning
在JS中，只有0，-0，NaN，"",null，undefined这六个值转为布尔值时，结果为false
:::

示例：
```js
var x = new Boolean(false);
if (x) {
  alert('hi');
}
var y = Boolean(0);
if (y) {
  alert('hello'); 
}
```
输出结果：`hi`

解析：if(x)中的x期望的是一个布尔类型的原始值，而在实际中x是new出来的Boolean对象，任何对象转为布尔值，
都为true   Boolean(0)将0转换为布尔，结果为false，这里没有使用new，如果使用new，结果依然为true

## Number的类型转换
以下的转化都为0
```js
Number();
Number(0);
Number('');
Number('0');
Number(false);
Number(null);
Number([]);
Number([0]);
```