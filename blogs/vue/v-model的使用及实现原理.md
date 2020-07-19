---
title: v-model的使用及实现原理
date: 2020-07-16
sidebarDepth: 2
tags:
 - vue
categories:
  - 前端笔记 
---

:::tip
前置知识点
:::
### v-bind
#### v-bind用于绑定data中的变量,v-bind可以使用语法糖，直接用 : 绑定属性
```vue
<template>
  <el-input :placeholder="placeholder"></el-input>
</template>

<script>
export default {
  data() {
    return {
      placeholder: '请输入内容'
    }
  }
}
</script>
```

### v-on
#### v-on用于绑定methods中的变量,v-on可以使用语法糖，直接用@绑定方法
```vue
<template>
  <el-button @click="click" >click me</el-button>
</template>

<script>
  export default {
    methods:{
      click() {
        alert("你点击了按钮")
      }
    }
  }
</script>
```

### v-model
#### v-model用于input中数据的双向绑定
```vue
<template>
  <el-input v-model="input" :placeholder="placeholder"></el-input>
</template>

<script>
  export default {
    data() {
      return {
        input: '',
        placeholder: '请输入内容'
      }
    }
  }
</script>
          
```
v-model实际是语法糖，原理实现:value绑定对应值，input属性能监听input标签中数据的变化，当数据发生改变时，进行对inputText值的修改
```vue
<template>
  <input :value="inputText" @input="inputChange" :placeholder="placeholder"></input>
</template>

<script>
  export default {
    data() {
      return {
        inputText: '',
        placeholder: '请输入内容'
      }
    },
    methods: {
      inputChange(event) {
        this.inputText = event.target.value;
      }
    }
  }
</script>
```
