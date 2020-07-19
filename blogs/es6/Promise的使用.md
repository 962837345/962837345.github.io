---
title: Promise的使用
data: 2020-07-16
tags:
  - vue
  - ES6
categories:
  - 前端笔记 
---

### 使用Promise解决异步问题
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

### Promise.all()
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

### Promise.race()
参数跟Promise.all()一样，区别在于Promise.race()当其中某个一个实例率先改变状态就传递对应实例的返回值

Promise.all()和Promise.race()原理可以理解为&&(或)和||(与)