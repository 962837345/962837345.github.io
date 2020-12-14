---
title: Promise的使用
date: 2020-07-16
tags:
 - vue
 - ES6
categories:
 - 前端笔记 
---

## 使用Promise解决异步问题
```vue
<template>
  <el-button @click="clickButton">点击我</el-button>
  <span style="margin-left: 50px"></span>
</template>

<script>
  export default {
    data() {
      return {
        num: 0
      }
    },
    methods: {
      clickButton() {
        new Promise(resolve => {
          setTimeout(() => {
            resolve()
          },500)
        }).then(() => {
          this.num ++;
        })
      }
    }
  }
</script>
```

## Promise.all()
当所有请求都响应后再对数据进行处理可以使用Promise.all()

Promise.all()中传入一个迭代类型的Promise，可以大致理解为一个包含Promise的数组，即Promise.all([promise1,promise2])
```vue
<template>
  <el-button @click="sendRequest">模拟发送请求</el-button>
  <span v-show="flag" style="margin-left: 50px">两个模拟请求都完成我就会显示</span>
</template>

<script>
export default {
  data() {
    return {
      flag: false
    }
  },
  methods: {
    sendRequest() {
      Promise.all([new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve()
        },1000)
      }),new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve()
        },500)
      })]).then(() => {
        this.flag = true
      })
    }
  }
}
</script>
```

## Promise.all()的原理实现
Promise.all()返回的是一个Promise实例
```js
Promise.all = function (promise) {
    return new Promise((resolve, reject) => {
        let index = 0;
        let result = [];
        if (promise.length === 0) {
            resolve(result)
        } else {
            function processValue(i, data) {
                result[i] = data;
                if (++index === promise.length) {
                    resolve(result)
                }
            }
            for (let i = 0; i < promise.length; i++) {
                Promise.resolve(promise[i]).then((data) => {
                    processValue(i, data)
                }, (err) => {
                    reject(err);
                    return
                })
            }
        }
    })
}
```

## Promise.race()
参数跟Promise.all()一样，区别在于Promise.race()当其中某个一个实例率先改变状态就传递对应实例的返回值

Promise.all()和Promise.race()原理可以理解为&&(或)和||(与)

## Promise的简单实现
```js
class MyPromise{
  constructor(fn){
    this.state = 'pending'
    this.callbacks = []
    try{
      fn.call(this, this.resolve.bind(this), this.reject.bind(this))
    }catch (e) {
      this.value = e
      this.reject.call(this, e)
    }
  }

  resolve(value){
    this.state = 'fulfilled'
    this.value = value
    this.run()
  }

  reject(value){
    this.state = 'rejected'
    this.value = value
    this.run()
  }

  then(onFulFilled, onRejected){
    return new MyPromise((resolve, reject) => {
      this.handle({
        onFulFilled,
        onRejected,
        resolve,
        reject
      })
    })
  }

  catch(onRejected){
    this.state = 'rejected'
    return this.then(undefined, onRejected)
  }

  run(){
    setTimeout(() =>{
      this.callbacks.forEach(callback => {
        this.handle(callback)
      })
    }, 0)
  }

  handle(callback){
    if(this.callbacks.length === 0){
      this.callbacks.push(callback)
      return
    }
    let fn = this.state === 'fulfilled' ? callback.onFulFilled : callback.onRejected
    if(!fn){
      fn = this.state === 'fulfilled' ? callback.resolve : callback.reject
      fn(this.value)
      return
    }
    try{
      let res = fn(this.value)
      callback.resolve(res)
    }catch (e) {
      this.value = e
      callback.reject(e)
    }
  }
}
```