---
title: Reflect
date: 2020-12-04
tags:
 - ES6
 - JS
categories:
 - 前端笔记 
---
### 概述

`Reflect`对象与`Proxy`对象一样，也是ES6为了操作对象而提供的新的API。`Reflect`对象的设计目的有这样几个

1.  将`Object`对象的一些明显属于语言内部的方法（比如`Object.defineProperty`）,放到`Reflect`对象上。先阶段，某些方法同时在`Object`和`Reflect`对象上部署，未来的新方法将只会部署在`Reflect`对象上。也就是说，从`Reflect`对象上可以拿到语言内部的方法

2. 修改某些`object`方法的返回结果，让其变得更合理。比如，`Object.defineProperty(obj, name, desc)`在无法定义属性时，会抛出一个错误，而`Reflect.defineProperty(obj, name, desc)`则会返回`false`

   ```js
   // 老写法
   try{
       Object.defineProperty(target, property, attributes)
       // success
   } catch (e){
       // failure
   }
   
   // 新写法
   if(Reflect.defineProperty(target, property, attributes)){
       // success
   } else {
       // failure
   }
   ```

3. 让`Object`操作都变成函数行为。某些`Object`操作是命令式，比如`name in obj`和`delete obj[name]`,而`Reflect.has(obj, name)`和`Reflect.deleteProperty(obj, name)`让它们变成了函数行为

   ```js
   // 老写法
   'assign' in Object // true
   
   // 新写法
   Reflect.has(Object, 'assign') // true
   ```

4. `Reflect`对象的方法与`Proxy `对象的方法一一对应，只要是`Proxy`对象的方法，就能在`Reflect`对象上找到对应的方法。这就让`Proxy`对象可以方便地调用对应的`Reflect`方法，完成默认行为，作为修改行为的继承。也就是说，不管`Proxy`怎么修改默认行为，你总可以在`Reflect`上获取默认行为

```js
var loggedObj = new Proxy(obj, {
    get(target, name){
        console.log('get', target, name)
        return Reflect.get(target, name)
    },
    deleteProperty(target, name){
        console.log('delete' + name)
        return Reflect.deleteProperty(target, name)
    },
    has(target, name){
        console.log('has' + name)
        return Reflect.has(target, name)
    }
})
```

上面代码中，每一个`Proxy`对象的拦截操作（`get`、`delete`、`has`），内部都调用对应的`Reflect`方法，保证原生行为能够正常执行。添加的工作，就是将每一个操作输出一行日志。

有了`Reflect`对象以后，很多操作会更易读

```js
// 老写法
Function.prototype.apply.call(Match.floor, undefined, [1.75]) // 1

// 新写法
Reflect.apply(Math.floor, undefined, [1.75]) // 1
```

### 静态方法

`Reflect`对象一共有13个静态方法

* Reflect.get(target, name, receiver)
* Reflect.set(target, name, value, receiver)
* Reflect.has(target, name)
* Reflect.deleteProperty(target, name)
* Reflect.construct(target, args)
* Reflect.getPrototypeOf(target)
* Reflect.setPrototypeOf(target, prototype)
* Reflect.apply(target, thisArg, args)
* Reflect.defineProperty(target, name, desc)
* Reflect.getOwnPropertyDescriptor(target, name)
* Reflect.isExtensible(target)
* Reflect.preventExtensions(target)
* Reflect.ownKeys(target)

上面这些方法的作用，大部分与`Object`对象的同名方法的作用都是相同的，而且它与`Proxy`对象的方法是一一对应的。

#### Reflect.get(target, name, receiver)

`Reflect.get`方法查找并返回`target`对象的`name`属性，如果没有该属性，则返回`undefined`

```js
const obj = {
    a: 1,
    b: 2,
    get baz() {
        return this.a + this.b;
    },
};
console.log(Reflect.get(obj, "a")); // 1
console.log(Reflect.get(obj, "b")); // 2
console.log(Reflect.get(obj, "baz")); // 3
```

如果`name`属性部署了读取函数（getter），则读取函数的`this`绑定`receiver`

```js
const obj = {
    a: 1,
    b: 2,
    get baz() {
        return this.a + this.b;
    },
};
const receiverObj = {
    a: 3,
    b: 5
}
console.log(Reflect.get(obj, "a")); // 1
console.log(Reflect.get(obj, "b")); // 2
console.log(Reflect.get(obj, "baz", receiverObj)); // 8
```

如果第一个参数不是对象，`Reflect.get`方法会报错

```js
Reflect.get(1, "a"); // 报错
Reflect.get(true, "a"); // 报错
```

#### Reflect.set(target, name, value, receiver)

`Reflect.set`方法设置`target`对象的`name`属性等于`value`

```js
const obj = {
    foo: 1,
    set bar(value) {
        return (this.foo = value);
    },
};

console.log(obj.foo); // 1

Reflect.set(obj, "foo", 2);
console.log(obj.foo); // 2

Reflect.set(obj, "bar", 5);
console.log(obj.foo); // 5
```

如果`name`属性设置了赋值函数，则赋值函数的`this`绑定`receiver`

```js
const obj = {
    foo: 1,
    set bar(value) {
        return (this.foo = value);
    },
};

const receiverObj = {
    foo: 5,
};

Reflect.set(obj, "foo", 2, receiverObj);
console.log(obj.foo); // 1
console.log(receiverObj.foo); // 2
```

:::tip

如果`Proxy`对象和`Reflect`对象联合使用，前者拦截赋值操作，后者完成赋值的默认行为，而且传入了`receiver`，那么`Reflect.set`会触发`proxy.defineProperty`

:::

```js
const p = {
    foo: 1,
};

const handler = {
    set(target, propKey, value, receiver) {
        console.log("set");
        Reflect.set(target, propKey, value, receiver);
    },
    defineProperty(target, propKey, attribute) {
        console.log("defineProperty");
        Reflect.defineProperty(target, propKey, attribute);
    },
};

const obj = new Proxy(p, handler);

obj.foo = 2;
// set
// defineProperty
```

上面代码中，`Proxy.set`拦截里面使用了`Reflect.set`，而且传入了`receiver`，导致触发`Proxy.defineProperty`拦截。这是因为`Proxy.set`的`receiver`参数总是指向当前的`Proxy`实例(即上面的`obj`),而`Reflect.set`一旦传入`receiver`，就会将属性赋值到`receiver`上面（即`obj`）,导致触发`defineProperty`拦截。如果`Reflect.set`没有传入`receiver`,那么就不会触发`defineProperty`拦截

```js
const p = {
    foo: 1,
};

const handler = {
    set(target, propKey, value, receiver) {
        console.log("set");
        Reflect.set(target, propKey, value);
    },
    defineProperty(target, propKey, attribute) {
        console.log("defineProperty");
        Reflect.defineProperty(target, propKey, attribute);
    },
};

const obj = new Proxy(p, handler);

obj.foo = 2;
// set
```

如果第一个参数不是对象，`Reflect.set`会报错

```js
Reflect.set(1, 'foo', {}) // 报错
Reflect.set(false, 'foo', {}) // 报错
```

#### Reflect.has(obj, name)

`Reflect.has`方法对应`name in obj`里面的`in`运算符

```js
const obj = {
    a: 1,
};
console.log("a" in obj); // 旧写法
console.log(Reflect.has(obj, "a")); // 新写法
```

如果`Reflect.has()`方法的第一个参数不是对象，会报错

#### Reflect.deleteProperty(obj, name)

`Reflect.deleteProperty`方法等同于`delete obj[name]`，用于删除对象的属性

```js
const obj = {
    a: 1,
};
delete obj.a // 旧写法
Reflect.deleteProperty(obj, 'a') // 新写法
```

该方法返回一个布尔值。如果删除成功，或者**被删除的属性不存在**，返回`true`;删除失败，被删除的属性依然存在，返回`false`

如果`Reflect.deleteProperty()`方法的第一个参数不是对象，会报错。

#### Reflect.construct(target, args)

`Reflect.construct`方法等同于`new target(...args)`,这提供了一种不使用`new`，来调用构造函数的方法

```js
function Person(name) {
    this.name = name;
}
// new 的写法
const person = new Person("xiaoming");
// Reflect.construct 写法
const person1 = Reflect.construct(Person, ["xiaoming"]);
```

如果`Reflect.construct()`方法的第一个参数不是函数，会报错

#### Reflect.getPrototypeOf(obj)

`Reflect.getPrototypeOf`方法用于读取对象的`__proto__`属性，对应`Object.getPrototypeOf(obj)`

```js
function Person(name) {
    this.name = name;
}
const person = new Person();
// 旧写法
console.log(Object.getPrototypeOf(person) === Person.prototype); // true
// 新写法
console.log(Reflect.getPrototypeOf(person) === Person.prototype); //true
```

`Reflect.getPrototypeOf`和`Object.getPrototypeOf`的一个区别是，如果参数不是对象，`Object.getPrototypeOf`会将这个参数转为对象，然后再运行，而`Reflect.getPrototypeOf`会报错

```js
Object.getPrototypeOf(1); // Number {0, constructor: ƒ, …}
Reflect.getPrototypeOf(1); // 报错
```

#### Reflect.setPrototypeOf(obj, newProto)

`Reflect.setPrototypeOf`方法用于设置目标对象的原型(prototype),对应`Object.setPrototypeOf(obj, newProto)`方法。它返回一个布尔值，表示是否设置成功

```js
const obj = {}

// 旧写法
Object.setPrototypeOf(obj, Array.prototype)

// 新写法
Reflect.setPrototypeOf(obj, Array.prototype)

console.log(obj.length) // 0
```

如果无法设置目标对象的原型（比如，目标对象禁止扩展）

`Reflect.setPrototypeOf`方法返回`false`

```js
Reflect.setPrototypeOf({}, null) // true
Reflect.setPrototypeOf(Object.freeze({}, null)) // false
```

如果第一个参数不是对象，`Object.setPrototypeOf`会返回第一个参数本身，而`Reflect.setPrototypeOf`会报错

```js
Object.setPrototypeOf(1, {}) // 1
Reflect.setPrototypeOf(1, {}) // TypeError
```

如果第一个参数是`undefined`或`null`,`Object.setPrototypeOf`和`Reflect.setPrototypeOf`都会报错

```js
Object.setPrototypeOf(null, {}) // TypeError
Reflect.setPrototypeOf(null, {}) // TypeError
```

#### Reflect.apply(func, thisArg, args)

`Reflect.apply`方法等同于`Function.prototype.apply.call(func, thisArg, args)`用于绑定`this`对象后执行给定函数

一般来说，如果要绑定一个函数的`this`对象，可以这样写`fn.apply(obj, args)`，但是如果函数定义了自己的`apply`方法，就只能写成`Function.prototype.apply.call(fn, obj, args)`，采用`Reflect`对象可以简化这种操作

```js
const ages = [1, 2, 3, 4, 5]

// 旧写法
const youngest = Math.min.apply(Math, ages)
const oldest = Math.max.apply(Math, ages)
const type = Object.prototype.toString.call(youngest)

// 新写法
const youngest = Reflect.apply(Math.min, Math, ages)
const oldest = Reflect.apply(Match.max, Math, ages)
const type = Reflect.apply(Object.prototype.toString, youngest, [])
```

#### Reflect.defineProperty(target, propertyKey, attributes)

`Reflect.defineProperty`方法基本等同于`Object.defineProperty`,用来为对象定义属性

```js
function myDate(){}

// 旧写法
Object.defineProperty(myDate, 'now', {
    value: () => Date.now()
})

// 新写法
Reflect.defineProperty(MyDate, 'now', {
    value: () => Date.now()
})
```

如果`Reflect.defineProperty`的第一个参数不是对象，就会抛出错误，比如`Reflect.defineProperty(1, 'foo')`

这个方法可以与`Proxy.defineProperty`配合使用

```js
const p = new Proxy({}, {
    defineProperty(target, p, attributes) {
        console.log(attributes)
        return Reflect.defineProperty(target, p, attributes)
    }
})

p.foo = 'bar' // {value: "bar", writable: true, enumerable: true, configurable: true}

console.log(p.foo) // 'bar'
```

上面代码中，`Proxy.defineProperty`对属性赋值设置了拦截，然后使用`Reflect.defineProperty`完成了赋值

#### Reflect.getOwnPropertyDescriptor(target, propertyKey)

`Reflect.getOwnPropertyDescriptor`基本等同于`Object.getOwnPropertyDescriptor`，用于得到指定属性的表述对象

```js
const obj = {}
Object.defineProperty(obj, 'hidden', {
    value: true,
    enumerable: false
})

// 旧写法
const oldDescriptor = Object.getOwnPropertyDescriptor(obj, 'hidden')
console.log(oldDescriptor)
// {value: true, writable: false, enumerable: false, configurable: false}

// 新写法
const newDescriptor = Reflect.getOwnPropertyDescriptor(obj, 'hidden')
console.log(newDescriptor) 
// {value: true, writable: false, enumerable: false, configurable: false}
```

`Reflect.getOwnPropertyDescriptor`和`Object.getOwnPropertyDescriptor`的一个区别是，如果第一个参数不是对象，`Object.getOwnPropertyDescriptor(1, 'foo')`不报错，返回`undefined`,而`Reflect.getOwnPropertyDescriptor(1, 'foo')`会抛出错误，表示参数非法

#### Reflect.isExtensible(target)

`Reflect.isExtensible`方法对应`Object.isExtensible`，返回一个布尔值，表示当前对象是否可扩展

```js
const obj = {}

// 旧写法
Object.isExtensible(obj) // true

// 新写法
Reflect.isExtensible(obj) // true
```

如果参数不是对象，`Object.isExtensible`会返回`false`，因为非对象本来就是不可扩展的，而`Reflect.isExtensible`会报错

```js
Object.isExtensible(1) // false
Reflect.isExtensible(1) // 报错
```

#### Reflect.preventExtensions(target)

`Reflect.preventExtensions`对应`Object.preventExtensions`方法，用于让一个对象变为不可扩展。它返回一个布尔值，表示是否操作成功

```js
const obj = {}

// 旧写法
Object.preventExtensions(obj) // {}

// 新写法
Reflect.preventExtensions(obj) // true
```

如果参数不是对象，`Object.preventExtensions`在ES5环境报错，在ES6环境返回传入的参数，而`Reflect.preventExtensions`会报错

```js
// ES5环境
Object.preventExtensions(1) // 报错

// ES6环境
Object.preventExtensions(1) // 1

// 新写法
Reflect.preventExtensions(1) // 报错
```

#### Reflect.ownKeys(target)

`Reflect.ownKeys`方法用于返回对象的所有属性，基本等同于`Object,getOwnPropertyNames`与`Object.getOwnPropertySymbols`之和

```js
const obj = {
    foo: 1,
    bar: 2,
    [Symbol.for('baz')]: 3,
    [Symbol.for('bing')]: 4
}
// 旧写法
Object.getOwnPropertyNames(obj) // ["foo", "bar"]

Object.getOwnPropertySymbols(obj) // [Symbol(baz), Symbol(bing)]

// 新写法
Reflect.ownKeys(obj) // ["foo", "bar", Symbol(baz), Symbol(bing)]
```

如果`Reflect.ownKeys()`方法的第一个参数不是对象，会报错

### 实例：使用Proxy实现观察者模式

```js
let active = null
const queueObservers = new Set()

const observe = fn => queueObservers.add(fn)
const observable = obj => new Proxy(obj, {get,set})

function get(target, propKey, receiver) {
    if(active) {
        observe(active)
    }
    return Reflect.get(target, propKey, receiver)
}

function set(target, key, value, receiver){
    const result = Reflect.set(target, key, value, receiver)
    queueObservers.forEach(observer => observer())
    return result
}

const person = observable({
    name: '小明',
    age: 20
})

const watcher = fn => {
    active = fn
    fn()
    active = null
}

watcher(() => {
    console.log(`${person.name}, ${person.age}, ${person.sex}`)
})

// 小明, 20, undefined

watcher(() => {
    app.innerHTML = person.sex
})

person.name = '小红' // 小红, 20, undefined
person.sex = '女' // 小红, 20, 女
```

上面代码中，`observable`函数返回一个`Proxy`原始对象的Proxy代理，通过`get`收集依赖，通过`set`拦截赋值操作，在`set`中调用`forEach`来触发充当观察者的各个函数

每当`watcher`执行时，`get`方法就会收集该依赖。一开始，`person`中的属性为`name: '小明', age: 20`,当`person.name = '小红'`时，`set`方法会触发`Reflect.set()`方法，并通知依赖进行更新，所以会打印输出`小红, 20, undefined`

在Vue中，`Proxy`实现响应式比`Object.defineProperty()`实现响应式相比，优点在于添加新的响应式属性时，不需要调用` Vue.$set() `手动实现对新增属性的响应式

上面代码中，`person`中没有`sex`属性，所以一开始`app.innerHTML`的值为`undefined`,当设置`person.sex = '女'`时，会触发`set`通知更新页面，`Object.defineProperty()`则无法做到对新属性的响应式

但是上面代码的有一定缺点，无法深度代理对象，而且也无法通过改变数组下标实现响应式。要实现该功能，必须进行递归

```js
let active = null
const queueObservers = new Set()

const observe = fn => queueObservers.add(fn)

const observable = target => {
    if(typeof  target !== 'object' || target === {}){
        return target
    }

    const handler = {
        get(target, propKey) {
            if(active) {
                observe(active)
            }
            const result = Reflect.get(target, propKey)
            // 对返回的结果进行递归
            return observable(result)
        },
        set(target, key, value, receiver){
            const result = Reflect.set(target, key, value, receiver)
            // 遍历通知观察者
            queueObservers.forEach(observer => observer())
            return result
        }
    }

    return new Proxy(target, handler)
}

const data = {
    name: '小明',
    age: 20,
    obj: {
        data: {
            sex: 'male'
        }
    },
    arr: [1,2,3]
}

const newData = observable(data)

const watcher = fn => {
    active = fn
    fn()
    active = null
}

watcher(() => {
    app.innerHTML = newData.obj.data.sex
})
```

通过以上代码就可实现对象深度响应式和数组下标改变响应式