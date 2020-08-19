---
title: css面试题
date: 2020-08-19
tags:
 - CSS
categories:
 - 前端笔记
---

## css隐藏元素的方法以及区别
1. `display: none;`
2. `visibility: hidden;`
3. `opacity: 0;`
4. `position: absolute;top; -9999px;left: -9999px;`

* 设置`display: none`
    * 该元素下面的子元素都会被隐藏，而且不会占据空间
    * 会导致回流和重绘
* 设置`visibility: hidden`
    * 该元素下面的子元素会被隐藏，但是由于visibility具有继承性，
所以可以对子元素设置`visibility: visible;`从而达到隐藏父元素，显示子元素的效果，
    * visibility会占据空间，visibility不会影响计数器的运行，虽然隐藏掉了，但是计数器依然会进行。
    * visibility只会导致重绘
* 设置`opacity: 0`
    * 设置透明度为0，依然会占据空间，隐藏后也不会改变html原有样式
    * opacity会被子元素继承，但是不能通过设置子元素的opacity进行反隐藏
    * 依旧可以触发已绑定的事件