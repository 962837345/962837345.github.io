---
title: Proxy
date: 2020-12-03
tags:
 - ES6
 - JS
categories:
 - 前端笔记 
---
#### 概述

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

#### Proxy实例方法

Proxy一共有13种拦截操作

* `get(target, propKey, receiver)`：拦截对象属性的读取，比如`proxy.foo`和`proxy['foo']`
* `set(target, propKey, value, receiver)`：拦截对象属性的设置，比如`proxy.foo = v`或`proxy['foo'] = v`,返回一个布尔值
* `has(target, propKey)`：拦截`propKey in proxy`的操作，返回一个布尔值
* `deleteProperty(target, propKey)`：拦截`delete proxy[propKey]`的操作，返回一个布尔值
* `ownKeys(target)`：拦截`Object.getOwnPropertyNames(proxy)`、`Object.getOwnPropertySymbols(proxy)`、`Object.keys(proxy)`、`for...in`循环，返回一格数组。该方法返回目标对象所有自身的属性的属性名，而`Object.keys()`的返回结果仅包括目标对象自身的可遍历属性
* `getOwnPropertyDescriptor(target, propKey)`：拦截`object.getOwnPropertyDescriptor(proxy, propKey)`,返回属性的描述对象
* `defineProperty(target, propKey, propDesc)`：拦截`Object.defineProperty(proxy, propKey, propDesc)`、`Object.defineProperties(proxy, propDescs)`,返回一个布尔值
* `preventExtensions(target)`：拦截`Object.preventExtensions(proxy)`,返回一个布尔值
* `getPrototypeOf(target)`：拦截`Object.getProtptypeOf(proxy)`,返回一个对象
* `isExtensible(target)`：拦截`Object.isExtensible(proxy)`，返回一个布尔值
* `setPrototypeOf(target, proto)`：拦截`object.setPrototypeOf(proxy, proto)`，返回一个布尔值。如果目标对象是函数，那么还有两种额外操作可以拦截
* `apply(target, object, args)`：拦截Proxy实例作为函数调用的操作，比如`proxy(...args)`、`proxy.call(object, ...args)`、`proxy.apply(...)`
* `construct(target, args)`：拦截Proxy实例作为构造函数调用的操作，比如`new Proxy(...args)`

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

#### Proxy.revocable()

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

### Proxy中this问题

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

上面代码中，一旦`proxy`代理`target`,`target.m()`内部的`this`就是指向`proxy`,而不是`target`

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

proxy.getDate() // 1
```

