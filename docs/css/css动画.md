---
title: css动画
date: 2020-07-22
tags:
 - CSS
categories:
 - 前端笔记
---

## 转换 transform
转换的效果是让某个元素改变形状、大小和位置

转换的类型分为2D和3D

### 2D转换 

#### translate()方法
translate()方法，根据左(X轴)和顶部(Y轴)位置给定的参数，从当前元素位置移动

示例：translate值（50px，100px）是从左边元素移动50个像素，并从顶部移动100像素

#### rotate()方法
rotate()方法，在一个给定度数顺时针旋转的元素。负值是允许的，这样是元素逆时针旋转,rotate()旋转点为中心点

示例：rotate值（30deg）元素顺时针旋转30度

#### scale()方法
scale()方法，该元素增加或减少的大小，取决于宽度（X轴）和高度（Y轴）的参数

示例：scale（2,3）转变宽度为原来的大小的2倍，和其原始大小3倍的高度

#### skew()方法
包含两个参数值，分别表示X轴和Y轴倾斜的角度，如果第二个参数为空，则默认为0，参数为负表示向相反方向倾斜
* skewX();表示只在X轴(水平方向)倾斜
* skewY();表示只在Y轴(垂直方向)倾斜

示例：skew(30deg,20deg) 元素在X轴和Y轴上倾斜20度30度

#### matrix()方法
matrix 方法有六个参数，包含旋转，缩放，移动（平移）和倾斜功能

### 3D转换

#### rotateX()方法
rotateX()方法，围绕其在一个给定度数X轴旋转的元素

#### rotateY()方法
rotateY()方法，围绕其在一个给定度数Y轴旋转的元素

## 过渡 transition
CSS3 过渡是元素从一种样式逐渐改变为另一种的效果。

要实现这一点，必须规定两项内容：
* 指定要添加效果的CSS属性
* 指定效果的持续时间。

### transition的属性
* transition	简写属性，用于在一个属性中设置四个过渡属性

* transition-property	规定应用过渡的 CSS 属性的名称
* transition-duration	定义过渡效果花费的时间。默认是 0
* transition-timing-function	规定过渡效果的时间曲线。默认是 "ease"
* transition-delay	规定过渡效果何时开始。默认是 0

:::tip
如果未指定duration，transition将没有任何效果，因为默认值是0
:::

示例:
给一个div添加transition属性，设置过渡属性为width，持续时间2s
```css
div
{
    transition: width 2s;
    -webkit-transition: width 2s; /* Safari */
}
```
当鼠标指针悬浮于div上时，div的width会在2s内逐渐过渡为300px
```css
div:hover
{
    width:300px;
}
```

要添加多个样式的变换效果，添加的属性由逗号分隔
添加了width，height和transform的过渡效果
```css
div
{
    transition: width 2s, height 2s, transform 2s;
    -webkit-transition: width 2s, height 2s, -webkit-transform 2s;
}
```

当要使全部css属性都添加过渡效果时，可以使用all指定全部:
```css
div
{
  transition: all 2s
}
```

## 动画 animation
### @keyframes 规则
@keyframes 规则是创建动画。

@keyframes 规则内指定一个 CSS 样式和动画将逐步从目前的样式更改为新的样式

当在 @keyframes 创建动画，把它绑定到一个选择器，否则动画不会有任何效果。

指定至少这两个CSS3的动画属性绑定向一个选择器：
* 规定动画的名称
* 规定动画的时长

示例：把 "myfirst" 动画捆绑到 div 元素，时长：5 秒：
```css
div
{
    animation: myfirst 5s;
    -webkit-animation: myfirst 5s; /* Safari 与 Chrome */
}
```

```css
@keyframes myfirst
{
    0%   {background: red;}
    25%  {background: yellow;}
    50%  {background: blue;}
    100% {background: green;}
}
 
@-webkit-keyframes myfirst /* Safari 与 Chrome */
{
    0%   {background: red;}
    25%  {background: yellow;}
    50%  {background: blue;}
    100% {background: green;}
}
```

### animation属性
* animation	所有动画属性的简写属性，除了 animation-play-state 属性。
* animation-name	规定 @keyframes 动画的名称
* animation-duration	规定动画完成一个周期所花费的秒或毫秒。默认是 0
* animation-timing-function	规定动画的速度曲线。默认是 "ease"
* animation-fill-mode	规定当动画不播放时（当动画完成时，或当动画有一个延迟未开始播放时），要应用到元素的样式
* animation-delay	规定动画何时开始。默认是 0
* animation-iteration-count	规定动画被播放的次数。默认是 1,infinite为无限循环
* animation-direction	规定动画是否在下一周期逆向地播放。默认是 "normal"
* animation-play-state	规定动画是否正在运行或暂停。默认是 "running"