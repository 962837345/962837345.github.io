---
title: html前端面试题
date: 2020-08-29
tags:
 - HTML
categories:
 - 前端笔记
---

## 页面导入样式时，使用link和@import有什么区别?
1. 本质的差别：link属于XHTML标签，而@import完全是CSS提供的一种方式
2. 加载顺序的差别：当一个页面被加载的时候，link引用的CSS会同时被加载，而@import引用的CSS会等到页面
全部被下载再被加载。所以有时候浏览器@import加载CSS的页面时开始会没有样式，出现闪烁，网速慢的时候会很明显
3. 兼容性的差别：@import是CSS2.1提出的，所以老的浏览器不支持，@import只有在IE5以上才能识别，而link标签无此问题
4. 使用dom控制样式的差别：当使用js控制dom改变样式时，只能使用link标签，因为@import不是dom可以控制的

