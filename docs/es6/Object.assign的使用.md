---
title: Object.assign的使用
date: 2020-0-11-21
tags:
 - ES6
 - JS
categories:
 - 前端笔记 
---

`Object.assign`方法用来将源对象(source)的所以可枚举属性，复制到目标对象(target)。它至少需要两个对象作为参数，第一个参数是目标对象，后面的参数都是源对象。

```js
const targetObj1 = { a : 1 }
const sourceObj1 = { b : 1 }
const sourceObj2 = { c : 2 }
Object.assign(targetObj1, sourceObj1, sourceObj2)
console.log(targetObj1) // {a: 1, b: 1, c: 2}
```

:::tip

1. 如果目标对象与源对象有同名属性，或多个源对象与目标对象有同名属性，则后面的属性会覆盖前面的属性
2. 如果只有一个参数，`Object.assign`会直接返回参数
3. 如果该参数不是对象，则会先转为对象，然后返回

:::

对于嵌套的对象，`Object.assign`的处理方法是替换，而不是添加

```js
const target = { a: { b: 1, c: 2 } }
const source = { a: { b: 'hello' } }
Object.assign(target, source)
console.log(target) // { a: { b: 'hello' } }
```

:::warning

不是得到`{ a: { b: 'hello', c: 2 } }`的结果

:::

`Object.assign`可以用来处理数组，但是会把数组视为对象

```js
console.log(Object.assign([1,2,3], [4,5])) // [4, 5, 3]
```

这里4覆盖1，5覆盖2，因为位置相同

`Object.assign`方法实现的是浅拷贝，而不是深拷贝。也就是说，如果源对象某个属性的值是个对象，那么目标对象拷贝得到的是这个对象的引用