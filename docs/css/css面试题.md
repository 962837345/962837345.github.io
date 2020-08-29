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
4. `position: absolute;top： -9999px;left: -9999px;`
5. `transform: rotateX(90deg);`

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

## div设置水平垂直居中的方法
1.绝对定位，不知道div的宽高
```css
div {
  height: 100px;
  width: 100px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: red;
}
```
2.绝对定位，知道div的宽高
```css
div{
  height: 100px;
  width: 100px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50px, -50px);
  background: red;
}
```
3.绝对定位，设置top、left、bottom、right都为0,margin为auto
```css
div{
  height: 100px;
  width: 100px;
  position: absolute;       
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  background: red;
}
```
4.flex布局，给父元素设置高度，并设置flex布局，设置justify-content、align-items属性
```css
.parent{
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
}
div{
  height: 100px;
  width: 100px;
  background: red;
}
```
5.同样给父元素设置flex布局，子元素margin为auto
```css
.parent{
  height: 500px;
  display: flex;
}
div{
  height: 100px;
  width: 100px;
  background: red;
  margin: auto;
}
```
6.calc计算实现居中
```css
.parent{
  height: 200px;
  width: 200px;
  position: relative;
}
div{
  height: 100px;
  width: 100px;
  background: red;
  position: absolute;
  top: calc((200px - 100px) / 2);
  left: calc((200px - 100px) / 2);
}
```