---
title: 手写实现find、filter、reduce等数组方法
date: 2020-08-19
tags:
 - JS
categories:
 - 前端笔记
---

## 手写find方法
find方法用于查找第一个符合条件的数组成员，找不到则返回undefined
```js
Array.prototype.MyFind = function(fn){      // 使用普通function而不是箭头函数，使this指向调用的数组  
    if(typeof fn !== 'function'){           // 判断fn是否是一个function
        throw TypeError('Error function')
    }
    for(let i = 0; i < this.length;i++){    // 遍历判断条件是否成立，成立返回第一个成立的值
        if(fn(this[i])){
            return this[i];
        }
    }
    return undefined;                       // 没有匹配项，返回undefined
}
```

## 手写findIndex方法
findIndex用于查找第一个符合条件的数组成员位置，找不到则返回-1
```js
Array.prototype.MyFindIndex = function(fn){
    if(typeof fn !== 'function')
        throw TypeError('error function');
    for(let i = 0; i < this.length; i++){
        if(fn(this[i]))
            return i;
    }
    return -1;
}
```

## 手写some方法
some用于其中一个满足条件就返回true，都不满足就返回false
```js
Array.prototype.MySome = function(fn) {
    if(typeof fn !== 'function')
        throw TypeError('error function');
    for(let i = 0; i < this.length; i++){
        if(fn(this[i]))
            return true;
    }
    return false;
}
```

## 手写every方法
every方法用于判断数组中的每个元素都符合条件，返回true，否则返回false
```js
Array.prototype.MyEvery = function(fn) {
    if(typeof fn !== 'function')
        throw TypeError('error function');
    for(let i = 0; i < this.length; i++){
        if(!fn(this[i]))
            return false;
    }
    return true;
}
```

## 手写实现map方法
map方法用于遍历数组中的每个元素，并返回一个新的数组
```js
Array.prototype.MyMap = function(fn) {
    if(typeof fn !== 'function')
        throw TypeError('error function');
    let newArr = [];
    for(let i = 0; i < this.length; i++){
        newArr.push(fn(this[i]))
    }
    return newArr;
}
```

## 手写实现filter方法
filter方法用于过滤某些元素，返回剩下的元素,不会改变原数组
```js
Array.prototype.MyFilter = function (fn) {
    if (typeof fn !== 'function')
        throw TypeError('error function');
    let newArr = [];
    for (let i = 0; i < this.length; i++) {
        if (fn(this[i])) {
            newArr.push(this[i]);
        }
    }
    return newArr;
}
```

## 手写实现reduce方法
reduce方法用于不断迭代计算数组，最终返回一个值

reduce需要传入两个参数，第一个参数为一个function，第二个为初始迭代值，而第一个function中又有4个参数
* prev：  上次调用函数的返回值
* cur：   当前元素
* index： 当前索引   
* arr：   被遍历的数组

reduce的第二个参数可以省略，省略第二个参数时，会将数组中的第一个元素作为初始值
```js
Array.prototype.MyReduce = function (fn, obj) {
    if (typeof fn !== 'function')
        throw TypeError('error function');
    if (typeof obj !== 'undefined') {
        for (let i = 0; i < this.length; i++) {
            obj = fn(obj,this[i],i,this);
        }
    } else {
        obj = this[0];
        for (let i = 1; i < this.length; i++) {
            obj = fn(obj,this[i],i,this);
        }
    }
    return obj;
}
```