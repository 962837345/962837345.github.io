---
title: CSS3渐变
date: 2020-07-22
tags:
 - CSS
categories:
 - 前端笔记
---

## 线性渐变 linear-gradient

linear-gradient()函数用于创建一个表示两种或多种颜色线性渐变的图片

### 渐变线

 在渐变容器中，穿过容器中心点和颜色停止点连接在一起的线称为渐变线

### 线性渐变方向

第一个参数为渐变的方向,它可以接受一个表示角度的值(可用的单位`deg`、`rad`、`grad`、或`turn`)或者是表示方向的关键词(`to top`、`to right`、`to bottom`、`to left`、`to left top`、`to right top` 、`to left bottom`或`to right bottom` )

:::tip

如果第一个设置方向的参数没有设置，则渐变方向默认由上往下	`background: linear-gradient(red, green)`

:::

### 线性渐变节点

后面的参数都是用于设置需要渐变的颜色的节点

例如`background: linear-gradient(to right, red, green)`，此时`red`将被放置在渐变线`0%`位置(渐变线的开始位置)，`green`将被放置在`100%`位置处(渐变线的结束点)。如果有三个颜色，那么颜色1在渐变线的`0%`,颜色2在渐变线的`50%`,颜色3在渐变线的`100%`。

当然，也可以在渐变线上显示自定义渐变颜色在渐变线上的位置。每个位置可以用百分比表示(相对于渐变线计算)，也可以是任何一个`css`长度单位。示例：`background: linear-gradient(to right, red, green 25%, blue);`，此时`green`的位置就处于渐变线的`25%`的位置上，而不是默认的`50%`

### 利用线性渐变制作背景
<bg-animation/>

```vue
<template>
  <div class="sm">
  </div>
</template>

<script>
  export default {
    name: "BgAnimation"
  }
</script>

<style scoped>
  .sm {
    width: 100%;
    height: 500px;
    margin: 0;
    padding: 0;
    background-image: linear-gradient(125deg, #2c3e50, #27ae60, #2980b9, #e74c3c, #8e44ad);
    background-size: 400%;
    animation: bganimation 15s infinite;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @keyframes bganimation {
    0%{
      background-position: 0 50%;
    }
    50%{
      background-position: 100% 50%;
    }
    100%{
      background-position: 0 50%;
    }
  }
</style>
```

## 径向渐变 radial-gradient

语法：`background-image: radial-gradient(shape size at position, start-color, ..., last-color);`

1. `shape`——确定圆的类型
* **ellipse**(默认)：指定椭圆形的径向渐变
   * **circle**：指定圆形的径向渐变
   
2. `size`——定义渐变的大小
* **farthest-corner**(默认) : 指定径向渐变的半径长度为从圆心到离圆心最远的角
   
* **closest-side** ：指定径向渐变的半径长度为从圆心到离圆心最近的边
   * **closest-corner** ： 指定径向渐变的半径长度为从圆心到离圆心最近的角
   *  **farthest-side**：指定径向渐变的半径长度为从圆心到离圆心最远的边
   * 也可以是单位长度数组，如`100px`
   
3. `position`——定义渐变的位置
* **center**（默认）：设置中间为径向渐变圆心的纵坐标值。
   * **top**：设置顶部为径向渐变圆心的纵坐标值。
   * **bottom**：设置底部为径向渐变圆心的纵坐标值。

4. `start-color, ..., last-color` 用于指定渐变的起止颜色

### 利用radial-gradient实现Tabbar圆形凹槽

<tab-bar/>

```vue
<template>
  <div class="content">
    <div class="item1 item"></div>
    <div class="item2"></div>
    <div class="item3 item"></div>
  </div>
</template>

<script>
  export default {
    name: "Tabbar"
  }
</script>

<style scoped>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.content{
  display: flex;
  width: 375px;
  height: 66px;
  margin-top: 100px;
}
.item{
  width: 40%;
  height: 100%;
  background: skyblue;
}
.item1{
  border-radius: 0 30% 0 0;
}
.item3{
  border-radius: 30% 0 0 0;
}
.item2{
  position: relative;
  width: 20%;
  height: 100%;
  background: radial-gradient(circle at 50% top, transparent 48%, skyblue 50%);
}

.item2:after{
  content: '';
  position: absolute;
  left: 50%;
  transform: translate(-49%, -50%);
  width: 55px;
  height: 55px;
  border-radius: 50%;
  background: skyblue;
}
</style>
```

