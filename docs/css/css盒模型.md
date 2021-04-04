---
title: css盒模型
date: 2021-04-04
tags:
  - CSS
categories:
  - 前端笔记
---

## W3C 盒子模型(标准盒模型)

根据 W3C 的规范，元素内容占据的空间是由 width 属性设置的，而内容周围的 padding 和 border 值是另外计算；即在标准模式下的盒模型，盒子实际内容(content)的 width/height = 我们设置的 width/height；盒子总宽度/高度 = width/height + padding + border + margin

```css
.box {
  width: 200px;
  height: 200px;
  border: 20px solid red;
  padding: 50px;
  margin: 50px;
}
```

<img style="height: 200px" :src="$withBase('/标准盒模型.png')" alt="标准盒模型">

## IE 盒子模型(怪异盒模型)

在该模式下，浏览器的 width 属性不是内容的宽度，而是内容、内边距和边框的宽度的总和。即在怪异模式下的盒模型，盒子的(content)宽度 + 内边距 padding + 边框 border 宽度 = 我们设置的 width 属性，盒子总宽度/高度 = width/height + margin = 内容区域宽度/高度 + padding + border + margin

```css
.box {
  box-sizing: border-box;
  width: 200px;
  height: 200px;
  border: 20px solid red;
  padding: 50px;
  margin: 50px;
}
```

<img style="height: 200px" :src="$withBase('/怪异盒模型.png')" alt="怪异盒模型">
