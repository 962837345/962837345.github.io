---
title: Symbol的使用
date: 2020-12-06
tags:
 - ES6
 - JS
categories:
 - 前端笔记 
---

## 概述

ES6引入了一种新的原始数据类型`Symbol`,表示独一无二的值

Symbol值通过`Symbol`函数生成。这就是说，对象的属性名现在可以有两种类型，一种是原来就有的字符串，另一种就是新增的Symbol类型。凡是属性名属于Symbol类型，就都是独一无二的，可以保证不会与其他属性名产生冲突。

::: tip

`Symbol`函数前不能使用`new`命令，否则会报错。这时因为生成的Symbol是一个原始类型的值， 不是对象。也就是说，由于Symbol值不是对象，所以不能添加属性。基本上，它是一种类似于字符串的数据类型

:::

`Symbol`函数可以接受一个字符串作为参数，表示对Symbol实例的描述，主要是为了在控制台显示，或者转为字符串时，比较容易区分

```js 
const s1 = Symbol('foo')
const s2 = Symbol('bar')

s1 // Symbol(foo)
s2 // Symbol(bar)

s1.toString() // 'Symbol(foo)'
s1.toString() // 'Symbol(bar)'
```

上面代码中，`s1`和`s2`是两个Symbol值。如果不加参数，它们在控制台的输出都是`Symbol()`，不利于区分。有了参数以后，就等于为它们加上了描述，输出的时候就能够分清楚，到底是哪一个值

如果Symbol的参数是一个对象，就会调用该对象的`toString()`方法，将其转为字符串，然后才生成一个Symbol值

```js
const obj = {
    toString(){
        return 'abc'
    }
}
const symbol = Symbol(obj)
symbol // Symbol(abc)
```

::: tip

`Symbol`函数的参数只是表示对当前Symbol值的描述，因此相同参数的`Symbol`函数返回值是不相等的

:::

Symbol值不能与其他类型的值进行运算，会报错

```js
const sym = Symbol('abc')
console.log('your symbol is' + sym)
// Uncaught TypeError: Cannot convert a Symbol value to a string
```

但是，Symbol值可以显示转为字符串

```js
const symbol = Symbol('abc')
String(symbol) // 'Symbol(abc)'
symbol.toString() // 'Symbol(abc)'
```

另外，Symbol值也可以转为布尔值，但是不能转为数值

```js
const sym = Symbol()
Boolean(sym) // true
Number(sym) // TypeError
```

## Symbol.prototype.description

创建Symbol的时候，可以添加一个描述

```js
const sym = Symbol('foo')
```

上面代码中，`sym`的描述就是字符串`foo`

但是，读取这个描述需要将Symbol显示转为字符串

```js
const sym = Symbol('foo')

String(sym) // "Symbol(foo)"
sym.toString() // "Symbol(foo)"
```

上面的用法不是很方便。ES2019提供了一个实例属性`description`，直接返回Symbol的描述

```js
cosnt sym = Symbol('foo')

sym.description // 'foo'
```

## 作为属性名的Symbol

由于每一个Symbol值都是不相等的，意味着Symbol值可以作为标识符，用于对象的属性名，就能保证不会出现同名的属性。这对于一个对象由多个模块构成的情况非常有用，能防止某一个键被不小心改写或覆盖

```js
const symbol = Symbol()

// 第一种写法
let a = {}
a[symbol] = 'hello'

// 第二种写法
let a = {
    [symbol]: 'hello'
}

// 第三种写法
let a = {}
Object.defineProperty(a, symbol, {value: 'hello'})
```

::: tip

Symbol值作为对象属性名时，不能用点运算符

```js
const symbol = Symbol()
const a = {}

a.symbol = 'hello'
a[symbol] // undefined
a['symbol'] // 'hello'
```

上面代码中，因为点运算符后面总是字符串，所以不会读取`symbol`作为标识名所指代的那个值，导致`a`的属性名实际上是一个字符串，而不是一个Symbol值

:::

同理，在对象的内部，使用Symbol值定义属性时，Symbol值必须放在方括号之中

```js
const symbol = Symbol()

let obj = {
    [symbol]: function(args) { ... }
}
obj[symbol](123)
```

采用增强的对象写法，可以使上面的obj对象写的更简洁一些

```js
let obj = {
  [symbol](args){ ... }  
}
```

Symbol类型还可以用于定义一组常量，保证这组常量的值都是不相等的

还有一点需要注意，Symbol值作为属性名时，该属性还是公开属性，不是私有属性

## 属性名的遍历

Symbol作为属性名，遍历对象的时候，该属性不会出现在`for...in`、`for...of`循环中，也不会被`Object.keys()`、`Object.getOwnPropertyNames()`、`JSON.stringify()`返回

但是，它也不是私有属性，有一个`Object.getOwnPropertySymbols()`方法可以获取指定对象的所以Symbol属性名。该方法返回一个数组，成员是当前对象的所以用作属性名的Symbol值

```js
const obj = {}
const a = Symbol('a')
const b = Symbol('b')

obj[a] = 'hello'
obj[b] = 'world'

const symbols = Object.getOwnPropertySymbols(obj)

console.log(symbols)
// [Symbol(a), Symbol(b)]
```

## Symbol.for()、Symbol.keyFor()

有时，我们希望重新使用同一个Symbol值，`Symbol.for()`方法可以做到这一点。它接受一个字符串作为参数，然后搜索有没有以该参数作为名称的Symbol值。如果有，就返回这个Symbol值，否则就新建一个以该字符串为名称的Symbol值，并将其注册到全局

```js
const s1 = Symbol.for('foo')
const s2 = Symbol.for('foo')

s1 === s2 // true
```

`Symbol.keyFor()`方法返回一个已登记的Symbol类型值的`key`

```js
const s1 = Symbol.for('foo')
Symbol.keyFor(s1) // 'foo'

const s2 = Symbol('foo')
Symbol.keyFor(s2) // undefined
```

::: tip

`Symbol.for()`为Symbol值登记的名字，是全局环境的，不管有没有在全局环境运行

:::

```js
function foo(){
    return Symbol.for('bar')
}
const x = foo()
const y = Symbol.for('bar')
console.log(x === y) // true
```

上面代码中，`Symbol.for('bar')`是函数内部运行的，但是生成的Symbol值是登记在全局环境的。所以，第二次运行`Symbol.for('bar')`可以取到这个Symbol值

`Symbol.for()`的这个全局登记特性，可以用在不同的iframe和service worker中取到同一个值

