---
title: vue-router的使用
date: 2020-07-16
tags:
 - vue
 - vue-router
categories:
 - 前端笔记 
---

## 动态路由
### el-menu结合router跳转页面
:::tip this.$router和this.$route
this.$router是全局路由对象，在任何页面可以调用push、go等方法进行路由跳转

this.$route是当前路由对象，可以调用其name、path、query、params等属性
:::
el-menu标签包裹el-menu-item

el-menu标签中default-active必须动态设置为当前页面路径

必须给el-menu标签添加一个router属性

el-menu-item标签中使用index赋值对应路径进行跳转
```vue
<el-menu
    :default-active="this.$route.path"
    class="el-menu-vertical-demo"
    router>
  <el-menu-item index="/home/webpack">webpack的使用</el-menu-item>
</el-menu>
```

## vue-router传递参数
### params类型
在router中配置路由格式:/router/:id

在path后面跟上对应的值

传递后形成的路径/router/abc

传递过来的值用$route.params.id进行接收，id与配置在router中的id对应
:::tip
router中
:::
```vue
{
  path: 'vueCom/:id',
  name: 'vueCom',
  component: () => import('../views/VueCommunication.vue')
},
```

:::tip
跳转页面
:::
```vue
<template>
  <el-menu-item :index="'/home/vueCom/'+userId">vue中的通信</el-menu-item>
</template>
<!-- 或 -->
<template>
  <router-view :to="'/home/vueCom/'+userId"></router-view>
</template>

<script>
  export default {
    data() {
      return {
        userId: '123'
      }
    }
  }
</script>
```
:::tip
接收页面
:::
```vue
{{$route.params.id}}
```

### query类型
router中无需修改，直接在跳转页面中写入query

传递后形成的路径/router?id="123"&name="abc"

接收页面中使用$route.query进行接收
:::tip
跳转页面
:::
```vue
<template>
  <el-menu-item :index="{path:'/home/vueCom',query:{id:'123',name:'abc'}}">vue中的通信></el-menu-item>
</template>
```
:::tip
接收页面
:::
```vue
<template>
  {{$route.query.id}}
  {{$route.query.name}}
</template>
```

## 导航守卫
### 全局守卫
全局守卫通常用于判断用户是否已登录，未登录则跳转到登录页面

前置钩子

router.beforeEach((to,from,next) => {})

回调函数中的参数，to：进入到哪个路由去，from：从哪个路由离开，next：函数，决定是否展示你要看到的路由页面,通常next都得调用
:::tip 示例
通过全局守卫修改页面title,在main.js中
:::
```js
router.beforeEach((to,from,next) => {
  document.title = to.meta.title;
  next();
})
```
### 路由独享守卫
beforeEnter:(to,from,next) => {}

在路由对象中进行配置，只在这个路由下起作用

### 组件内守卫
beforeRouteEnter:(to,from,next) => {}

beforeRouteUpdate:(to,from,next) => {}

beforeRouteLeave:(to,from,next) => {}

### keep-alive
使用keep-alive标签包裹router-view，可以使组件不被频繁创建和销毁，使得页面的内容点击状态不刷新

keep-alive有include和exclude属性，属性对应注册组件时的name属性