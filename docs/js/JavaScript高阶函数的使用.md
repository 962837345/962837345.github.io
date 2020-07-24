---
title: JavaScript高阶函数的使用
date: 2020-07-16
tags:
 - JS
categories:
 - 前端笔记 
---

JavaScript的函数其实都指向某个变量。既然变量可以指向函数，函数的参数能接收变量，那么一个函数就可以接收另一个函数作为参数，这种函数就称之为高阶函数。

## map
map()方法定义在JavaScript的Array中，我们调用Array的map()方法，传入我们自己的函数，就得到了一个新的Array作为结果
```vue
<template>
  <el-button @click="mapClick">map</el-button>
  <span style="margin-left: 20px">{{this.mapArray}}</span>
</template>

<script>
  export default {
    name: "Js高阶函数",
    data() {
      return {
        mapArray: [1, 2, 3, 4, 5, 6]
      }
    },
    methods: {
      mapClick() {
        this.array = this.array.map(x => x*x);
      }
    }
  }
</script>
```

## reduce
Array的reduce()把一个函数作用在这个Array的[x1, x2, x3...]上，这个函数必须接收两个参数，reduce()把结果继续和序列的下一个元素做累积计算
```vue
<template>
  <el-button @click="reduceClick">reduce</el-button>
  <span style="margin-left: 20px">{{this.reduceArray}}</span>
  <span style="margin-left: 20px">the sum is :{{this.reduceNum}}</span>
</template>

<script>
  export default {
    name: "Js高阶函数",
    data() {
      return {
        reduceArray: [1,3,5,7,9],
        reduceNum: ''
      }
    },
    methods: {
      reduceClick() {
        this.reduceNum = this.reduceArray.reduce((x,y) => x + y)
      }
    }
  }
</script>
```

## filter
filter也是一个常用的操作，它用于把Array的某些元素过滤掉，然后返回剩下的元素
```vue
<template>
  <el-button @click="reduceClick">reduce</el-button>
  <span style="margin-left: 20px">before:{{this.filterBefore}}</span>
  <span style="margin-left: 20px">after:{{this.filterAfter}}</span>
</template>

<script>
  export default {
    name: "Js高阶函数",
    data() {
      return {
        filterBefore: [4,8,12,16,20],
        filterAfter: []
      }
    },
    methods: {
      filterClick() {
        this.filterAfter = this.filterBefore.filter(x => x > 10)
      }
    }
  }
</script>
```