---
title: JS类型转换
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
在JS中，只有0，-0，NaN，"", null，undefined这六个值转为布尔值时，结果为false
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

## 解析字符串和字符串强制转换为数字的区别

解析字符串如`parseInt`或`parseFloat`中含有非数字字符，解析从左到右的顺序，如果遇到非数字字符就停止。而转换如`Number`不允许有非数字字符，否则会失败并返回`NaN`

## 浮点数点左边的数每三位添加一个逗号

```js
function format(number) {
  return number && number.replace(/(?!^)(?=(\d{3})+\.)/g, ',')
}
```



## == 类型转换规则

1. 如果有一个操作数是布尔值，则在比较相等性之前先将其转换为数值——false转为0，true转为1
2. 如果一个操作数是字符串，另一个操作数是数值，在比较相等性之前先将字符串转换为数值
3. 如果一个操作数是对象，另一个操作数不是，则调用对象的valueOf()方法，用得到的基本类型值按照前面的规则进行比较，valueOf()方法无效时，调用toString()方法
:::tip
1. null和undefined是相等的
2. 要比较相等性之前，不能将null和undefined转换成其他任何值
3. 如果有一个操作数是NaN，则相等操作符返回false，而不相等操作符返回true。两个操作数都NaN返回也是false，因为按照规定，NaN不等于NaN
4. 如果两个操作数都是对象，则比较它们是不是同一个对象，如果两个操作数都指向同一个对象，则相等操作符返回true；否则，返回false
:::

### [] == ![] 为true
1. 根据运算符优先级，!的优先级大于==，所有会先执行![]
    * !可以将变量转换成boolean类型，在JS中，只有0，-0，NaN，"", null，undefined这六个值转为布尔值时，结果为false，其余都为true，所以[]转换为boolean类型就为true，而![]就为false
2. 上面的规则1，如果有一个操作数是布尔值，则在比较相等性之前先将其转换为数值——false转为0，true转为1，所以![] == false == 0
3. 上面的规则3，如果一个操作数是对象，另一个操作数不是，则调用对象的valueOf()方法，用得到的基本类型值按照前面的
规则进行比较，valueOf()方法无效时，调用toString()方法，这里先调用valueOf()方法，valueOf()方法返回的也是[],
所以调用toString()方法，得到一个空字符串,此时[] == 0相当于'' == 0
4. 上面的规则2，如果一个操作数是字符串，另一个操作数是数值，在比较相等性之前先将字符串转换为数值，空字符串转换为
数值为0,所以此时 '' == 0相当于0 == 0所以结果返回true

过程：[] == ![] --> [] == false --> [] == 0 --> '' == 0 --> 0 == 0

### {} == !{} 为false
1. 同上，根据运算符优先级，!的优先级大于==，所有会先执行!{}，所以{} == !{}相当于{} == false
2. 同上，{} == false相当于{} == 0
3. 上面的规则3，{}调用{}.valueOf()方法返回也是{},所以调用{}.toString()方法，返回的是一个字符串类型的[object Object]
4. 上面的规则2，如果一个操作数是字符串，另一个操作数是数值，在比较相等性之前先将字符串转换为数值，此时执行Number([object Object])，返回的是NaN
5. 上面的提示中的第3点，如果有一个操作数是NaN，则相等操作符返回false，所以结果为false

过程：{} == !{} --> {} == false --> {} == 0 --> [object Object] == 0 --> NaN == 0