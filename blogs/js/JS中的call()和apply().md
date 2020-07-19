---
title: JS中的call()和apply()
date: 2020-07-19
tagg:
 - JS
categories:
 - 前端笔记
---

每个函数都包含两个非继承而来的方法：call()和apply()；

在JavaScript中，call和apply作用是一样的，都是为了改变某个函数运行时的上下文（context）而存在的，
换句话说，就是为了改变函数体内部this的指向。
```js
function fruits(){}
            
fruits.prototype = {
    color: "red",
    say: function(){
        console.log("My color is " + this.color);
    }
};

var another = {
    color: "yellow"
};

var apple = new fruits;
apple.say();                //My color is red
apple.say.call(another);    //My color is yellow
apple.say.apply(another);   //My color is yellow
```

## 区别：参数书写方式不同
`call(thisObj, arg1, arg2, arg3, arg4);`

`apply(thisObj, [args]);`

实现继承
```ecmascript 6
//实现js继承
//父类
function Person(name, height) {
    this.sayInfo = function() {
        return "姓名：" + name + ", 身高：" + height + ", 体重：" + this.weight;
    }
}
//子类
function Chinese(name, height, weight) {
    Person.call(this, name, height);
    this.weight = weight;
    
    this.nation = function() {
        console.log("我是中国人");
    }
}
//子类
function America(name, height, weight) {
    Person.apply(this, [name, height]);
    this.weight = weight;
}

let chinese = new Chinese("成龙", "178cm", "60kg");
console.log(chinese.sayInfo());    //姓名：成龙, 身高：178cm, 体重：60kg
let america = new America("jack", "180cm", "55kg");
console.log(america.sayInfo());    //姓名：jack, 身高：180cm, 体重：55kg
```
