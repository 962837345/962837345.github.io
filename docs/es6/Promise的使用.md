---
title: Promise的使用
date: 2020-07-16
tags:
 - vue
 - ES6
categories:
 - 前端笔记 
---

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
static all = (promises) {
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

```js
static race(promises){
  return new Promise((resolve, reject) => {
		for(let i = 0; i < promises.length; i++){
      Promise.resolve(this[i]).then(res => {
        return resolve(res)
      }, reason => {
        return reject(reason)
      })
    }
  })
}
```



## Promise的简单实现
```js
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";
class MyPromise {
  // resolve静态方法
  static resolve(value){
    if(value && value instanceof MyPromise){
      return value
    }else if(value && typeof value === 'object' && typeof value.then === 'function'){
      const then = value.then
      return new MyPromise(resolve => {
        then(resolve)
      })
    }else if(value){
      return new MyPromise(resolve => resolve(value))
    }else{
      return new MyPromise(resolve => resolve())
    }
  }
	// reject静态方法
  static reject(reason){
    if(reason && typeof reason === 'object' && typeof reason.then === 'function'){
      const then = reason.then
      return new MyPromise((resolve, reject) => {
        then(reject)
      })
    } else{
      return new MyPromise((resolve, reject) => reject(value))
    }
  }
  constructor(fn) {
    this.state = PENDING;
    this.value = null;
    this.reason = null;
    this.onFulfillCallbacks = [];
    this.onRejectCallbacks = [];
    const resolve = (value) => {
      if (this.state !== PENDING) return;
      this.state = FULFILLED;
      this.value = value;
      setTimeout(() => {
        this.onFulfillCallbacks.forEach((callback) => callback());
      }, 0);
    };
    const reject = (reason) => {
      if (this.state !== PENDING) return;
      this.state = REJECTED;
      this.reason = reason;
      setTimeout(() => {
        this.onRejectCallbacks.forEach((callback) => callback());
      }, 0);
    };
    try {
      fn(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }
  then(onFulfilled, onRejected) {
    let promise =  new MyPromise((resolve, reject) => {
      onFulfilled = onFulfilled ? onFulfilled : resolve
      onRejected = onRejected ? onRejected : reject
      if (this.state === FULFILLED) {
        setTimeout(() => {
          try {
            const result = onFulfilled(this.value);
            resolvePromise(promise, result, resolve, reject)
          }catch (e) {
            reject(e)
          }
        }, 0)
      } else if (this.state === REJECTED) {
        setTimeout(() => {
          try {
            const result = onRejected(this.reason);;
            resolvePromise(promise, result, resolve, reject)
          }catch (e) {
            reject(e)
          }
        }, 0)
      } else if (this.state === PENDING) {
        this.onFulfillCallbacks.push(() => {
          const result = onFulfilled(this.value);
          resolvePromise(promise, result, resolve, reject)
        });
        this.onRejectCallbacks.push(() => {
          const result = onRejected(this.reason);
          resolvePromise(promise, result, resolve, reject)
        });
      }
    });
    return promise
  }
  catch(onRejected) {
    this.then(undefined, onRejected)
  }
  finally(fn){
    return this.then(value => {
      return MyPromise.resolve(fn()).then(() => value)
    }, err => {
      return MyPromise.reject(fn()).then(() => {
        throw err
      })
    })
  }
}

function resolvePromise(promise, result, resolve, reject){
  if(promise === result){
    return reject(new TypeError('Chaining cycle detected for promise #<MyPromise>'))
  }
  let called = false
  if(result instanceof MyPromise){
    try{
      let then = result.then
      if(typeof then === 'function'){
        then.call(result, newResult => {
          if(called) return
          called = true
          resolvePromise(promise, newResult, resolve, reject)
        }, e => {
          if(called) return
          called = true
          reject(e)
        })
      }else{
        resolve(result)
      }
    }catch (e) {
      if(called) return
      called = true
      reject(e)
    }
  }else{
    resolve(result)
  }
}

const p = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(123)
  })
});
p.then(res => {
  console.log(res)
  return new MyPromise((resolve) => {
    resolve(321)
  })
}).then(res => {
  console.log(res)
}).finally(() => {
  console.log('finally')
});
```