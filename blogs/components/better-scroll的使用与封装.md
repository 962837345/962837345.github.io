---
title: better-scroll的使用与封装
date: 2020-07-16
tags:
 - better-scroll
categories:
 - 前端笔记 
---

### better-scroll的安装
```bash
npm install better-scroll -S
```

### better-scroll的使用 [官方文档](https://better-scroll.github.io/docs/zh-CN/)
better-scroll只能包裹一个子元素，然后再通过子元素包裹其他元素，实现滚动

better-scroll默认会阻止原生click事件的触发，因此在创建better-scroll的时候需设置click:true

:::warning better-scroll注意事项
1.使用pullUpLoad进行上拉加载数据时，当数据加载完毕后，需调用finishPullUp()通知better-scroll数据加载完成

2.当页面有异步请求加载数据或图片资源时，better-scroll无法自动获取加载完成后的height，需要调用refresh进行刷新
:::

### probeType属性
probeType用于侦测better-scroll实时位置，默认0和1

0和1不实时侦测

2 在手指拖动的过程中侦测，而手指离开时的惯性不侦测

3 只要是滚动都侦测惯性

### pullUpLoad属性
pullUpload用于做上拉加载功能，当设置为true或者是一个Object时，可以开启上拉加载，加载完成后需要执行finishPullIUp方法

当使用pullUpLoad方法时，当上拉加载信息，对应的高度变更时，better-scroll中的scrollerHight没有及时更新，就会出现下拉卡顿，无法继续下拉

解决办法：当图片加载完成时，调用scroll对象中的refresh方法进行刷新

1.在main.js中使用Vue.prototype.$bus = new Vue()添加一个事件总线

2.Vue中的img通过@load方法监听图片加载完成，加载完成时，调用this.$bus.$emit('method')发射完成事件

3. 在主页面中调用this.$bus.$on('method'，function)监听该事件

4.在回调函数中调用scroll对象中的refresh方法

### mouseWheel属性
为true时支持鼠标滚轮滚动

### scroll.on方法
scroll.on方法用于绑定对应的事件方法

this.scroll.on('scroll',(position) => {}) //监听滚动事件

this.scroll.on('pullingUp', () => {}) //监听上拉事件

### better-scroll的封装
```vue
<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        scroll: null
      }
    },
    mounted() {
      //1.创建BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        // 0和1不侦测实时位置
        // 2.在手指拖动的过程中侦测，而手指离开时的惯性不侦测
        // 3.只要是滚动都侦测惯性
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      })

      //2.监听滚动的位置
      this.scroll.on('scroll',(position) => {
        this.$emit('scroll',position);
      })

      //3.监听上拉事件
      this.scroll.on('pullingUp',() => {
        this.$emit('pullingUp');
      })
    },
  }
</script>
```