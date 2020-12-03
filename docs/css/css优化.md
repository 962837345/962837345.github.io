---
title: css优化
date: 2020-11-30
tags:
 - CSS
categories:
 - 前端笔记
---

1. 合并css文件，css文件可以进行缓存，如果页面加载10个css文件，每个文件1k，那么也要比只加载100k的css文件慢
2. 减少css嵌套，最好不要套三层以上
   * 因为css解析是从左往右进行解析的，层级过多需要进行复杂的查找匹配
3. 建立公共样式类，把相同样式提取出来作为公共类使用，比如我们常用的清除浮动等
4. 利用css继承机制，减少代码量，如`color`、`font-size`、`font-family`等等
5. cssSprite，合成所有icon图片，用宽高加上`background-position`的背景图方式呈现出我们要的icon图，极大减少了http请求
6. GZIP压缩