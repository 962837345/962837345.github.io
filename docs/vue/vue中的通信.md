---
title: vue中的通信
date: 2020-07-16
tags:
  - vue
categories:
  - 前端笔记 
---

:::tip vue中的data必须是一个函数
vue作为一个组件进行复用时，data写成一个对象时，会导致数据共享，而data为一个函数时，对该组件进行调用时data每次都会返回一个新的对象
:::

## 组件间的通信
### 父传子
父组件通过v-bind传递一个属性给子组件，子组件通过props进行接收
:::tip
父组件
:::
```vue
<template>
  <children :message="message" :fruits="fruits"></children>
</template>

<script>
  export default {
    data() {
      return {
        message: '你好子组件',
        fruits: ['apple','banana']
      }
    }
  }
</script>
```

:::tip
子组件
:::
```vue
<template>
  <p>{{message}}</p>
  <el-button v-for="fruit in fruits" :key="fruit">{{fruit}}</el-button>
</template>

<script>
  export default {
    data() {
      return {}
    }，
    props: {
      message: {
        type: String, //类型限制
        default: '我是默认值',  //默认值
        required: true  //true时为必传值，不传就会报错
      },
      fruits: {
        //类型是对象或者数组时。，默认值必须是一个函数
        type: Array,
        default(){
          return []
        }
      }
    }
  }
</script>
```

### 子传父
子组件通过this.$emit()向父组件传递一个自定义函数，第一个参数为要emit的函数名称，第二个参数为携带的数据
:::tip
父组件
:::
```vue
<template>
  <children @buttonClick="childrenClick"></children>
</template>

<script>
export default {
  methods: {
    childrenClick(fruit){
      alert('子组件点击了'+fruit);
    }
  }
}
</script>
```

:::tip
子组件
:::

```vue
<template>
  <p>{{message}}</p>
  <el-button v-for="fruit in fruits" @click=childrenClick(fruit) :key="fruit">{{fruit}}</el-button>
</template>

<script>
export default {
  methods: {
   childrenClick(fruit){
      this.$emit('buttonClick',fruit)
    }
  }
}
</script>
```

## 父子组件间的访问
### 父访问子
:::tip 
父组件访问子组件:使用$children或$refs
:::
大部分情况下使用$refs，使用$refs需要在调用子组件时，给子组件绑定一个ref属性，如:
```vue
<template>
  <children ref="child"></children>
</template>
```
父组件方法中调用this.$refs.child即可

此处只示例$children
```vue
<template>
  <el-button @click="visitChildren"></el-button>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    visitChildren() {
      alert(this.$children[0].message);
    }
  }
}
</script>
```
:::tip 区别
使用$children获取子组件是一个数组，当有多个子组件时，需要知道子组件的顺序，通过数组下标获取对应的子组件

使用$refs获取子组件是通过具体绑定名称获取，当要获取特定某个子组件实例时，使用$refs更加合适
:::

### 子访问父
:::tip
子组件访问父组件:使用$parent或$root
:::
同上，在子组件中给button绑定一个函数，在函数中调用this.$parent.message
:::tip 区别
使用$parent获取的是父组件实例

使用$root获取的是根组件实例
:::