---
title: vuex的使用
data: 2020-07-16
tags:
  - vue
  - vuex
categories:
  - 前端笔记  
---
:::tip vuex的作用
vuex是专门为Vue.js应用程序开发的状态管理模式
:::

## vuex的核心概念
### State
State保存变量状态，对应data

State的值只能通过Mutation来改变，不能通过Action来改变
```vue
<template>
  {{$store.state.name}}
</template>
```

### Mutations
Mutations存放一些同步操作

Mutations需要通过this.$store.commit('mutations中的函数名','可选参数')进行调用

多参数传递时通常使用对象进行传参
```vue
<template>
  <el-button @click="addCount(5)">+5</el-button>
  <span style="margin-left: 20px">{{$store.state.count}}</span>
</template>

<script>
  methods: {
    addCount(count) {
      this.$store.commit('increment',count);
      //  特殊的提交封装
      // this.$store.commit({
      //   type: 'increment',
      //   count
      // })
    }
  }
</script>
```
:::tip 
store的index.js中
:::
```js
state: {
  count: 0
},
mutations: {
  increment(state,count) {
    //使用特殊的提交封装时，这里的count是一个封装对象，要调用时需改为count.count
    state.count += count;
  }
}
```

### Actions
Actions用于做一些异步操作

Actions需要通过this.$store.dispatch('actions中的函数名','可选参数')进行调用

传参可以传数值或字符串也可以传一个对象

在showMessage中返回一个Promise对象，然后在对应使用dispatch的地方使用then进行回调，达到数据响应通知的目的，是一种优雅的写法
```vue
<template>
  <el-button @click="buttonClick">Click Me</el-button>
  <span style="margin-left: 20px">{{$store.state.count}}</span>
</template>

<script>
  methods: {
    buttonClick() {
      this.$store.dispatch('showMessage',{
        num: 10
      }).then(res => {
        console.log(res);
      })
    }
  }
</script>
```
:::tip 
store的index.js中
:::
```js
actions: {
  showMessage(context,payload) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        //这里使用context是为了区别Module中的actions，此处commit只会在当前的mutation中调用
        context.commit('increment',payload.num)
        resolve('改变了count')
      }, 1000)
    })
  }
},
mutations: {
  increment(state, count) {
    state.count += count;
  }
},
```

### Getters
类似于computed，做一些计算操作

使用Getters传参要在getters的函数中返回一个函数，返回的函数中进行传参
```vue
<template>
  {{$store.getters.sayHello('hello')}}
</template>
```
:::tip
store的index.js中
:::
```js
getters: {
  sayHello(state){
    return hello => {
      return hello + ' ' + state.name
    }
  }
}
```
### Modules
Vuex允许我们将store分割成模块，而每个模块拥有自己的state、mutations、actions、getters