---
title: Proxy
date: 2020-12-03
tags:
 - ES6
 - JS
categories:
 - 前端笔记
---
## 概述

Proxy用于修改某些操作的默认行为，可以理解成，在目标对象之前假设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写

ES6原生提供Proxy构造函数，用来生成Proxy实例

```js
var Proxy = new Proxy(target, handler)
```

```js
const proxy = new Proxy({}, {
    get(target, propKey, receiver){
        console.log(`get ${propKey}`)
        return Reflect.get(target, propKey, receiver)
    },
    set(target, propKey, value, receiver){
        console.log(`set ${propKey} : ${value}`)
    }
})
proxy.count = 1 // set count : 1
proxy.count // get count
```

:::tip

要使得`Proxy`起作用，必须针对`Proxy`实例进行操作，而不是针对目标对象进行操作

```js
const target = {}
const handler = {
    get: function(){
        return 'abc'
    }
}
const proxy = new Proxy(target, handler)
console.log(proxy.a) // 'abc'
console.log(target.a) // undefined
```

:::

同一个拦截器函数，可以设置拦截多个操作

```js
var handler = {
  get: function(target, name) {
    if (name === 'prototype') {
      return Object.prototype;
    }
    return 'Hello, ' + name;
  },

  apply: function(target, thisBinding, args) {
    return args[0];
  },

  construct: function(target, args) {
    return {value: args[1]};
  }
};

var fproxy = new Proxy(function(x, y) {
  return x + y;
}, handler);

fproxy(1, 2) // 1
new fproxy(1, 2) // {value: 2}
fproxy.prototype === Object.prototype // true
fproxy.foo === "Hello, foo" // true
```

## Proxy实例方法

Proxy一共有13种拦截操作

* `get(target, propKey, receiver)`：拦截对象属性的读取，比如`proxy.foo`和`proxy['foo']`
* `set(target, propKey, value, receiver)`：拦截对象属性的设置，比如`proxy.foo = v`或`proxy['foo'] = v`,返回一个布尔值
* `apply(target, object, args)`：拦截Proxy实例作为函数调用的操作，比如`proxy(...args)`、`proxy.call(object, ...args)`、`proxy.apply(...)`
* `has(target, propKey)`：拦截`propKey in proxy`的操作，返回一个布尔值
* `construct(target, args)`：拦截Proxy实例作为构造函数调用的操作，比如`new Proxy(...args)`
* `deleteProperty(target, propKey)`：拦截`delete proxy[propKey]`的操作，返回一个布尔值
* `defineProperty(target, propKey, propDesc)`：拦截`Object.defineProperty(proxy, propKey, propDesc)`、`Object.defineProperties(proxy, propDescs)`,返回一个布尔值
* `getOwnPropertyDescriptor(target, propKey)`：拦截`object.getOwnPropertyDescriptor(proxy, propKey)`,返回属性的描述对象
* `getPrototypeOf(target)`：拦截`Object.getProtptypeOf(proxy)`,返回一个对象
* `isExtensible(target)`：拦截`Object.isExtensible(proxy)`，返回一个布尔值
* `ownKeys(target)`：拦截`Object.getOwnPropertyNames(proxy)`、`Object.getOwnPropertySymbols(proxy)`、`Object.keys(proxy)`、`for...in`循环，返回一格数组。该方法返回目标对象所有自身的属性的属性名，而`Object.keys()`的返回结果仅包括目标对象自身的可遍历属性
* `preventExtensions(target)`：拦截`Object.preventExtensions(proxy)`,返回一个布尔值
* `setPrototypeOf(target, proto)`：拦截`object.setPrototypeOf(proxy, proto)`，返回一个布尔值。如果目标对象是函数，那么还有两种额外操作可以拦截

### get(target, propKey, receiver)

`get`方法用于拦截某个属性的读取操作，可以接受三个参数，依次为目标对象、属性名和proxy实例本身(严格地说，是操作行为所针对的对象)，其中最后一个参数可选

```js
const data = {
  age: 20
}

const proxy = new Proxy(data, {
  get(target, p, receiver) {
      console.log(p)
      console.log(receiver)
      return Reflect.get(target, p, receiver)
  }
})

proxy.age
// age 
// Proxy {age: 20}
```

`get`方法可以继承

```js
const proto = new Proxy({}, {
    get(target, p, receiver){
        console.log(`get ${p}`)
        return Reflect.get(target, p, receiver)
    }
})
const proxy = Object.create(proto)
proxy.foo // get foo
```

上面代码中，拦截操作定义在`Prototype`对象上面，所以如果读取`proxy`对象继承的`foo`属性时，拦截会生效



利用Proxy，可以将读取属性的操作`get`，转变为执行某个函数，从而实现属性的链式操作

```js
var pipe = function (value){
    var funcStack = []
    var oproxy = new Proxy({}, {
        get: function(pipeObject, fnName){
            if(fnName === 'get'){
                return funcStack.reduce(function (val, fn){
                    return fn(val)
                },value)
            }
            funcStack.push(window[fnName])
            return oproxy
        }
    })
    return oproxy
}

var double = n => n * 2
var pow = n => n * n
var reverseInt = n => n.toString().split("").reverse().join("") | 0

pipe(3).double.pow.reverseInt.get // 63
```

下面是一个`get`方法的第三个参数的例子，它总是指向原始的读操作所在的那个对象，一般情况下就是Proxy实例

```js
const proxy = new Proxy({}, {
    get(target, p, receiver){
        return receiver
    }
})
proxy.getReceiver === proxy // true
```

上面代码中，`proxy`对象的`getReceiver`属性是由`proxy`对象提供的，所以`receiver`指向`proxy`对象

```js
const proxy = new Proxy({}, {
    get(target, p, receiver){
        return receiver
    }
})

const d = Object.create(proxy)
d.a === d // true
```

上面代码中，`d`对象本身没有`a`属性，所以读取`d.a`的时候，会去`d`的原型`proxy`对象找。这时，`receiver`就指向`d`，代表原始的读操作所在的那个对象

### set(target, propKey, value, receiver)

`set`方法用来拦截某个属性的赋值操作，可以接受四个参数，依次为目标对象、属性名、属性值和Proxy实例本身，其中最后一个参数可选

有时，我们会在对象上面设置内部属性，属性名的第一个字符使用下划线开头，表示这些属性不应该被外部使用。结合`get`和`set`方法，就可以做到防止这些内部属性被外部读写

```js
const handler = {
    get(target, key){
        invariant(key, 'get')
        return target[key]
    },
    set(target, key, value){
        invariant(key, 'set')
        target[key] = value
        return true
    }
}

function invariant(key, action){
    if(key[0] === '_'){
        throw new Error(`Invalid attempt to ${action} private "${key}" property`)
    }
}
const target = {}
const proxy = new Proxy(target, handler)
proxy._prop
// Uncaught Error: Invalid attempt to get private "_prop" property
proxy._prop = 123
// Uncaught Error: Invalid attempt to set private "_prop" property
```

上面代码中，只要读写的属性名的第一个字符是下划线，一律报错，从而达到禁止读写内部属性的目的



下面是`set`方法的第四个参数的例子

```js
const handler = {
    set(obj, prop, value, receiver){
        obj[prop] = receiver
    }
}
const proxy = new Proxy({}, handler)
proxy.foo = 'bar'
proxy.foo === proxy
```

上面代码中，`set`方法的第四个参数`receiver`,指的是原始的操作行为所在的那个对象，一般情况下是`proxy`实例本身

```js
const handler = {
    set(obj, prop, value, receiver){
        obj[prop] = receiver
    }
}
const proxy = new Proxy({}, handler)
const myObj = {}
Object.setPrototypeOf(myObj, proxy)

myObj.foo = 'bar'
myObj.foo === myObj // true
```

上面代码中，设置`myObj.foo`属性的值时，`myObj`并没有`foo`属性，因此引擎会到`myObj`的原型链去找`foo`属性。`myObj`的原型对象`proxy`是一个Proxy实例，设置它的`foo`属性会触发`set`方法。这时，第四个参数`receiver`就指向原始赋值行为所在的对象`myObj`

::: tip

严格模式下，`set`代理如果没有返回`true`，就会报错

```js
'use strict'
const handler = {
    set(obj, prop, value, receiver){
        obj[prop] = receiver
        // 无论有没有下面这一行，都会报错
        return false
    }
}
const proxy = new Proxy({}, handler)
proxy.foo = 'bar'
// Uncaught TypeError: 'set' on proxy: trap returned falsish for property 'foo'
```

上面代码中，严格模式下，`set`代理返回`false`或者`undefined`,都会报错

:::

### apply(target, object, args)

`apply`方法拦截函数的调用、`call`和`apply`操作

`apply`方法可以接受三个参数，分别是目标对象、目标对象的上下文对象(`this`)和目标对象的参数数组

```js
const target = function(){
    return `I am the target`
}
const handler = {
	apply(){
        return `I am the proxy`
    }
}
const p = new Proxy(target, handler)

p() // I am the proxy
```

上面代码中，变量`p`是Proxy的实例，当它作为函数调用时(`p()`),就会被`apply`方法拦截，返回一个字符串

```js
const handler = {
    apply(target, ctx, args){
        return Reflect.apply(...arguments) * 2
    }
}
function sum (left, right) {
    return left + right
}
const proxy = new Proxy(sum, handler)
proxy(1, 2) // 6
proxy.call(null, 5, 6) // 22
proxy.apply(null, [7, 8]) // 30
```

上面代码中，每当执行`proxy`函数（直接调用或`call`和`apply`调用），就会被`apply`方法拦截

另外，直接调用`Reflect.apply`方法，也会被拦截

```js
Reflect.apply(proxy, null, [9, 10]) // 38
```

### has(target, propKey)

`has()`方法用来拦截`HasProperty`操作，即判断对象是否具有某个属性时，这个方法会生效。典型的操作就是`in`操作符

`has()`方法可以接受两个参数，分别是目标对象、需查询的属性名

下面的例子使用`has()`方法隐藏某些属性，不被`in`运算符发现

```js
const handler = {
    has(target, key){
        if(key[0] === '_'){
            return false
        }
        return key in target
    }
}
const target = {_prop: 'foo', prop: 'foo'}
const proxy = new Proxy(target, handler)
'_prop' in proxy // false
```

上面代码中，如果原对象的属性名的第一个字符是下划线，`proxy.has()`就会返回`false`，从而不会被`in`运算符发现

如果原对象不可配置或者禁止扩展，这时`has`拦截会报错

```js
const obj = {a: 10}
Object.preventExtensions(obj)

const p = new Proxy(obj, {
    has(target, prop){
        return false
    }
})

'a' in p // TypeError is thrown
```

上面代码中，`obj`对象禁止扩展，结果使用`has`拦截就会报错。也就是说，如果某个属性不可配置（或目标对象不可扩展），则`has()`方法就不得“隐藏”（即返回`false`）目标对象的该属性

::: tip

`has()`方法拦截的是`HasProperty`操作，而不是`HasOwnProperty`操作，即`has()`方法不判断一个属性是对象自身的属性，还是继承的属性

:::

另外，虽然`for...in`循环也用到了`in`运算符，但是`has()`拦截对`for...in`循环不生效

### construct(target, args)

`construct()`方法用于拦截`new`命令，下面是拦截对象的写法

```js
const handler = {
    construct(target, args, newTarget){
        return new target(...args)
    }
}
```

`construct()`方法可以接受三个参数

* `target`：目标对象
* `args`： 构造函数的参数数组
* `newTarget`： 创造实例对象时，`new`命令作用的构造函数(下面例子的`p`)

```js
const p = new Proxy(function () {}, {
    construct(target, args){
        console.log('called: '+ args.join(', '))
        return { value: args[0] * 10}
    }
})
(new p(1)).value
// called: 1
// 10
```

`construct()`方法返回的必须是一个对象，否则会报错

另外，由于`construct`拦截的是构造函数，所以它的目标对象必须是函数，否则就会报错

::: tip

`construct()`方法中的`this`指向的是`handler`，而不是实例对象

```js
const handler = {
    construct(target, args){
        console.log(this === handler)
        return new target(...args)
    }
}

const p = new Proxy(function () {}, handler)
new p() // true
```

:::

### deleteProperty(target, propKey)

`deleteProperty`()方法用于拦截`delete`操作，如果这个方法抛出错误或者返回`false`，当前属性就无法被`delete`命令删除

```js
const handler = {
    deleteProperty(target, key){
        invariant(key, 'delete')
        delete target[key]
        return true
    }
}
function invariant (key, action){
    if(key[0] === '_'){
        throw new Error(`Invalid attempt to ${action} private "${key}" property`)
    }
}
const target = { _prop: 'foo'}
const proxy = new Proxy(target, handler)
delete proxy._prop
// Uncaught Error: Invalid attempt to delete private "_prop" property
```

上面代码中，`deletePropeyty`()方法拦截了`delete`操作符。删除第一个字符为下划线的属性会报错

::: tip

目标对象自身的不可配置(configurable)的属性，不能被`deleteProperty()`方法删除，否则报错

:::

### defineProperty(target, propKey, propDesc)

`defineProperty()`方法拦截了`Object.defineProperty()`操作

```js
const handler = {
    defineProperty (target, key, descriptor){
        return false
    }
}
const target = {}
const proxy = new Proxy(target, handler)
proxy.foo = 'bar' // 不会生效
```

上面代码中，`defineProperty()`方法内部没有任何操作，只返回`false`。导致添加新属性总是无效

::: tip

这里的`false`只是用来提示操作失败，本身并不能阻止添加新属性

:::

::: tip

如果目标对象不可扩展(non-extensible)，则`defineProperty()`不能增加目标对象不存在的属性，否则会报错。另外，如果目标对象的某个属性不可写(writable)或不可配置(configurable)，则`defineProperty()`方法不得改变这两个设置

:::

### getOwnPropertyDescriptor(target, propKey)

`getOwnPropertyDescriptor()`方法拦截`Object.getOwnPropertyDescriptor()`,返回一个属性描述对象或者`undefined`

```js
const handler = {
    getOwnPropertyDescriptor(target, key){
        if(key[0] === '_'){
            return
        }
        return Object.getOwnPropertyDescriptor(target, key)
    }
}
const target = { _foo: 'bar', baz: 'tar'}
const proxy = new Proxy(target, handler)
Object.getOwnPropertyDescriptor(proxy, 'wat')
// undefined
Object.getOwnPropertyDescriptor(proxy, '_foo')
// undefined
Object.getOwnPropertyDescriptor(proxy, 'baz')
// {value: "tar", writable: true, enumerable: true, configurable: true}
```

上面代码中，`handler.getOwnPropertyDescriptor()`方法对于第一个字符为下划线的属性名会返回`undefined`

### getPrototypeOf(target)

`getPrototypeOf()`方法主要用来拦截获取对象原型。具体来说，拦截下面这些操作：

* `Object.prototype.__proto__`
* `Object.prototype.isPrototypeOf()`
* `Object.getPrototypeOf()`
* `Reflect.getPrototypeOf()`
* `instanceof`

```js
const proto = {}
const p = new Proxy({}, {
    getPrototypeOf(target){
        return proto
    }
})
Object.getPrototypeOf(p) === proto // true
```

上面代码中,`getPrototypeOf()`方法拦截`Object.getPrototypeOf()`，返回`proto`对象

::: tip

`getPrototype()`方法的返回值必须是对象或者`null`，否则报错。另外，如果目标对象不可扩展(non-extensible)，`getPrototypeOf()`方法必须返回目标对象的原型对象

:::

### isExtensible(target)

`isExtensible()`方法拦截`Object.isExtensible()`操作

```js
const p = new Proxy({}, {
    isExtensible(){
        console.log('called')
        return true
    }
})

Object.isExtensible(p)
// called
// true
```

上面代码设置了`isExtensible()`方法，在调用`Object.isExtensible`时会输出`called`

::: tip

该方法只能返回布尔值，否则返回值会被自动转为布尔值

:::

这个方法有一个强限制，它的返回值必须与目标对象的`isExtensible`属性报错一致，否则就会抛出错误

```js
Object.isExtensible(proxy) === Object.isExtensible(target)
```

```js
const p = new Proxy({}, {
    isExtensible (target) {
        return false
    }
})
Object.isExtensible(p)
// Uncaught TypeError: 'isExtensible' on proxy: trap result does not reflect
```

### ownKeys(target)

`ownKeys()`方法用来拦截对象自身属性的读取操作。具体来说，拦截以下操作

* `Object.getOwnPropertyNames()`
* `Object.getOwnPropertySymbols()`
* `Object.keys()`
* `for...in`循环

下面是拦截`Object.keys()`的例子

```js
const target = {
    a: 1,
    b: 2,
    c: 3
}

const handler = {
    ownKeys(target){
        return ['a']
    }
}

const proxy = new Proxy(target, handler)

Object.keys(proxy)
// ['a']
```

上面代码拦截了对于`target`对象的`Object.keys()`操作，只返回`a`、`b`、`c`三个属性之中的`a`属性

::: tip

使用`Object.keys()`方法时，有三类属性会被`ownKeys()`方法自动过滤，不会返回

* 目标对象上不存在的属性
* 属性名为Symbol值
* 不可遍历(`enumerable`)的属性

```js
const target = {
    a: 1,
    b: 2,
    c: 3,
    [Symbol.for('secret')]: '4'
}
Object.defineProperty(target, 'key', {
    enumerable: false,
    configurable: true,
    writable: true,
    value: 'static'
})
const handler = {
    ownKeys(target){
        return ['a', 'd', Symbol.for('secret'), 'key']
    }
}

const proxy = new Proxy(target, handler)
Object.keys(proxy)
// ["a"]
```

上面代码中，ownKeys()方法之中，显示返回不存在的属性(d)、Symbol值(Symbol.for('secret'))、不可遍历的属性(`key`)，结果都被自动过滤掉

:::

`ownKeys()`方法还可以拦截`Object.getOwnPropertyNames()`

```js
const p = new Proxy({}, {
    ownKeys(target){
        return ['a', 'b', 'c']
    }
})
Object.getOwnPropertyNames(p)
// ['a', 'b', 'c']
```

`for...in`循环也受到`ownKeys()`方法的拦截

```js
const obj = {hello: 'world'}
const proxy = new Proxy(obj, {
    ownKeys(){
        return ['a', 'b']
    }
})
for(let key in proxy){
    console.log(key) // 没有任何输出
}
```

上面代码中，'ownKeys()'指定只返回`a`和`b`属性，由于`obj`没有这两个属性，因此`for..in`循环不会有任何输出

`ownKeys()`方法返回的数组成员，只能是字符串或Symbol值。如果有其他类型的值，或者返回的根本不是数组，就会报错

::: tip

如果目标对象自身包括不可配置的属性，则该属性必须被`ownKeys()`方法返回，否则报错

:::

```js
const obj = {}
Object.defineProperty(obj, 'a', {
    configurable: false,
    enumerable: true,
    value: 10
})
const p = new Proxy(obj, {
    ownKeys(target){
        return ['b']
    }
})

Object.getOwnPropertyNames(p)
// Uncaught TypeError: 'ownKeys' on proxy: trap result did not include 'a'
```

上面代码中，`obj`对象的`a`属性是不可配置的，这时`ownKeys()`方法返回的数组之中必须包含`a`，否则会报错

另外，如果目标对象是不可扩展的(non-extensible)，这时`ownKeys()`方法返回的数组之中，必须包含原对象的所有属性，且不能包含多余的属性，否则报错

```js
const obj = {
    a: 1
}
Object.preventExtensions(obj)

const p = new Proxy(obj, {
    ownKeys(target){
        return ['a', 'b']
    }
})

Object.getOwnPropertyNames(p)
// Uncaught TypeError: 'ownKeys' on proxy: trap returned extra keys but proxy target
```

上面代码中，`obj`对象是不可扩展的，这时`ownKeys()`方法返回的数组之中，包含了`obj`对象的多余属性`b`,所以导致了报错

### preventExtensions(target)

`preventExtensions()`方法拦截`Object.preventExtensions`。该方法必须返回一个布尔值，否则会被自动转为布尔值

这个方法有一个限制，只有目标对象不可扩展时(即`Object.isExtensible(proxy)`为`false`)，`proxy.preventExtensions`才能返回`true`,否则会报错

```js
const proxy = new Proxy({}, {
    preventExtensions(target){
        return true
    }
})

Object.preventExtensions(proxy)
// Uncaught TypeError: 'preventExtensions' on proxy: trap returned truish but the proxy target is extensible
```

上面代码中，`proxy.preventExtensions()`方法返回`true`，但这时`Object.isExtensible(proxy)`会返回`true`,因此报错

为了防止出现这个问题，通常要在`proxy.preventExtensions()`方法里面，调用一次`Object.preventExtensions()`

```js
const proxy = new Proxy({}, {
    preventExtensions(target){
        console.log('called')
        Object.preventExtensions(target)
        return true
    }
})

Object.preventExtensions(proxy)
// called
// Proxy {}
```

### setPrototypeOf(target, proto)

`setPrototypeOf()`方法主要用来拦截`Object.setPrototypeOf()`方法

```js
const handler = {
    setPrototypeOf(target, proto){
        throw new Error('Changing the prototype if forbidden')
    }
}
const proto = {}
const target = function(){}
const proxy = new Proxy(target, handler)
Object.setPrototypeOf(proxy, proto)
// Uncaught Error: Changing the prototype if forbidden
```

上面代码中，只要修改`target`的原型对象，就会报错

::: tip

该方法只能返回布尔值，否则会被自动转为布尔值。另外，如果目标对象不可扩展(non-extensible),`setPrototypeOf()`方法不得改变目标对象的原型

:::

## Proxy.revocable()

`Proxy.revocable()`方法返回一个可取消的Proxy实例

```js
let target = {}
let handler = {}

let {proxy, revoke} = Proxy.revocable(target, handler)

proxy.foo = 123
proxy.foo // 123

revoke()
proxy.foo // TypeError: Revoked
```

`Proxy.revocable()`方法返回一个对象，该对象的`proxy`属性是`Proxy`实例，`revoke`属性是一个函数，可以取消`Proxy`实例。上面代码中，当执行`revoke`函数之后，再访问`Proxy`实例，就会抛出一个错误

`Proxy.revocable()`的一个使用场景是，目标对象不允许直接访问，必须通过代理访问，一旦访问结束，就收回代理权，不允许再次访问

## Proxy中this问题

虽然`Proxy`可以代理针对目标对象的访问，但它不是目标对象的透明代理，即不做任何拦截的情况下，也无法保证与目标对象的行为一致。主要原因就是在`Proxy`代理情况下，目标对象内部的`this`关键字会指向`Proxy`代理

```js
const target = {
    m: function (){
        console.log(this === proxy)
    }
}
const handler = {}

const proxy = new Proxy(target, handler)

target.m() // false
proxy.m() // true
```

上面代码中，一旦`proxy`代理`target`,`proxy.m()`内部的`this`就是指向`proxy`,而不是`target`

有些原生对象的内部属性，只有通过正确的`this`才能拿到，所以`Proxy`也无法代理这些原生对象的属性

```js
const target = new Date()
const handler = {}
const proxy = new Proxy(target, handler)

proxy.getDate()
// TypeError: this is not a Date object
```

上面代码中，`getDate()`方法只能在`Date`对象实例上面拿到，如果`this`不是`Date`对象实例就会报错。这时，`this`绑定原始对象，就可以解决这个问题

```js
const target = new Date('2020-12-04')
const handler = {
    get(target, prop){
        if(prop === 'getDate'){
            return target.getDate.bind(target)
        }
        return Reflect.get(target, prop)
    }
}
const proxy = new Proxy(target, handler)

proxy.getDate() // 4
```

 另外，Proxy 拦截函数内部的`this`，指向的是`handler`对象

```js
const handler = {
  get: function (target, key, receiver) {
    console.log(this === handler);
    return 'Hello, ' + key;
  },
  set: function (target, key, value) {
    console.log(this === handler);
    target[key] = value;
    return true;
  }
};

const proxy = new Proxy({}, handler);

proxy.foo
// true
// Hello, foo

proxy.foo = 1
// true
```

