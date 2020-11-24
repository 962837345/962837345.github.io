---
title: new操作符做了什么
date: 2020-11-24
tags:
 - JS
categories:
 - 前端笔记
---

### new过程一共有四个步骤

1. 创建一个空对象
2. 链接到原型
3. 绑定this指向，执行构造函数
4. 确保返回的是对象

```js
function Func(){
    
}
const func = new Func()
```

```js
const obj = new Object() // 创建一个空对象
obj.__proto__ = Func.prototype // 链接到原型
const result = Func.call(obj) // 绑定this，执行构造函数
if(typeof result === 'object'){ // 判断构造函数返回值类型
    return result	// 引用类型就返回构造函数的返回值
}else{
    return obj // 不是引用类型，就返回创建的这个对象
}
```

没有显式定义返回值，默认情况下函数返回值为undefined。但构造函数例外，new构造函数在没有return的清空下默认返回新创建的对象。

但是，在有显示返回值的情况下，如果**返回值为基本数据类型**（string，number，null，undefined，Boolean、symbol），返回值仍然是**新创建的对象**。

只有在显式返回一个**非基本数据类型**时，**函数的返回值才为指定对象**。这种情况下，this所引用的值就会被丢弃了。