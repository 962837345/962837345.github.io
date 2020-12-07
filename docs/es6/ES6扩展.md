---
title: ES6扩展
date: 2020-12-08
tags:
 - ES6
 - JS
categories:
 - 前端笔记 
---

## 链判断运算符

通常情况下，读取对象内部的某个属性，往往需要先判断该对象是否存在

```js
// 错误的写法
const firstName = message.body.user.firstName

// 正确的写法
const firstName = (message && message.body && message.body.user && message.body.user.firstName) || 'defalut'
```

上面例子中，`firstName`属性在对象的第四层，需要判断四次

三元运算符`?:`也常用于判断对象是否存在

```js
const firstName = user ? user.value : undefined 
```

在多层级的时候，进行判断十分麻烦，ES2020引入了"链判断运算符"`?.`简化上面的写法

```js
const firstName = message?.body?.user?.firstName || 'default'
```

上面代码中使用了`?.`运算符，直接在链式调用的时候判断，左侧的对象是否为`null`或`undefined`。如果是，就不再往下运算，而是返回`undefined`

下面是判断对象方法是否存在，如果存在就立即执行

```js
iterator.return?.()
```

上面的代码中，`iterator.return`如果有定义，就会调用该方法，否则`iterator.return`直接返回`undefined`,不再执行`?.`后面的部分

链判断运算符有三种用法

* `obj?.prop` 对象属性
* `obj?.[expr]` 同上
* `func?.(...args)` 函数或对象方法的调用

使用链判断运算符`?.`有以下几个注意点

1. 短路机制

   ```js
   a?.[++x]
   // 等同于
   a == null ? undefined : a[++x]
   ```

   上面代码中，如果`a`是`undefined`或`null`，那么`x`不会进行递增运算

2. delete运算符

   ```js
   delete a?.b
   // 等同于
   a == null ? undefined : delete a.b
   ```

   上面代码中，如果`a`是`undefined`或`null`,会直接返回`undefined`,而不会进行`delete`运算

3. 括号的影响

   如果属性链有圆括号，链判断运算符对圆括号外部没有影响，只对圆括号内部有影响

   ```js
   (a?.b).c
    // 等同于
    (a == null ? undefined : a.b).c
   ```

   上面代码中，`?.`对圆括号外部没有影响，不管`a`对象是否存在，圆括号后面的`.c`总是会执行

   一般来说，使用`?.`运算符，不应该使用圆括号

4. 报错场合

   以下写法是禁止的，会报错

   ```js
   // 构造函数
   new a?.()
   new a?.b()
   
   // 链判断运算符的右侧有模板字符串
   a?.`{b}`
   a?.b`{c}`
   
   // 链判断运算符的左侧是 super
   super?.()
   super?.foo
   
   // 链判断运算符用于赋值运算符左侧
   a?.b = c
   ```

5. 右侧不得为十进制数值

   为了保证兼容以前的代码，允许`foo?.3:0`被解析成`foo ? .3 : 0`,因此规定如果`?.`后面紧跟一个十进制数字，那么`?.`不再被看成是一个完整的运算符，而会按照三元运算符进行处理，也就是说，那个小数点会归属于后面的十进制数字，形成一个小数

## Null判断运算符

读取对象属性的时候，某个属性的值是`null`或`undefined`,有时候需要为它们指定默认值。常见的做法是通过`||`运算符指定默认值

```js
const age = user.age || 20
```

上面的代码通过`||`运算符指定默认值，但是这样写是错的。开发者的原意是，只要属性的值为`null`或`undefined`，默认值就会生效，但是属性的值如果为空字符串或者`false`或`0`,默认值也会生效

为了避免这种情况，ES2020引入了一个新的Null判断运算符`??`。它的行为类似`||`，但是只有运算符左侧的值为`null`或`undefined`时，才会返回右侧的值

```js
const age = user.age ?? 20
```

上面代码中，默认值只有在左侧属性值为`null`或`undefined`时，才会生效

这个运算符的一个目的，就是跟链判断运算符`?.`配合使用，为`null`或`undefined`的值设置默认值

```js
cosnt age = user?.age ?? 20
```

上面代码中，如果`user`是`null`或`undefined`，或者`user.age`是`null`或`undefined`，就会返回默认值20

`??`有一个运算符优先级问题，它与`&&`和`||`的优先级的比较。现在的规则是，如果多个逻辑运算符一起使用，必须用括号表明优先级，否则会报错

## Number.EPSILON

ES6在`Number`对象上面，新增了一个极小的常量`Number,EPSILON`。它表示1与大于1的最小浮点数之间的差

对于64位浮点数来说，大于1的最小浮点数相当于二进制的`1.00...001`，小数点后面有连续51个零。这个值减去1之后，就等于2的-52次方

```js
Number.EPSILON === Math.pow(2, -52) // ture
Number.EPSILON // 2.220446049250313e-16
Number.EPSILON.toFixed(20) // 0.00000000000000022204
```

`Number.EPSILON`实际上是JavaScript能够表示的最小精度。误差如果小于这个值，就可以认为已经没有意义了，即不存在误差了

引入这么小的量的目的，在于浮点数计算，设置一个误差范围

```js
0.1 + 0.2 === 0.3 //false
```

`Number.EPSILON`可以用来设置“能够接受的误差范围”。即如果两个浮点数的差小于这个值，我们就认为这两个浮点数相等

```js
function isEqual(x, y){
    return Math.abs(x - y) < Number.EPSILON
}
console.log(isEqual(0.1+0.2, 0.3))
```

::: tip

这里的`0.1 + 0.2 === 0.3`可以以另一种方式进行比较

```js
console.log((0.1 * 1000 + 0.2 * 1000) / 1000 === 0.3)
```

:::

## Math.trunc()

`Math.trunc()`方法用于去除一个数的小数部分，返回整数部分

```js
Math.trunc(2.22) // 2
Math.trunc(-4.1) // -4
Math.trunc(-0.15) // -0
```

对于非数值，`math.trunc`内部使用`Number`方法将其先转为数值

```js
Math.trunc('123.321') // 123
Math.trunc(false) // 0
Math.trunc(null) // 0
```

对于空值和无法截取整数的值，返回`NaN`

```js
Math.trunc(NaN) // NaN
Math.trunc('abc') // NaN
Math.trunc() // NaN
Math.trunc(undefined) // NaN
```

