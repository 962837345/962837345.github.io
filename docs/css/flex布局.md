---
title: flex布局
date: 2020-07-20
tags:
 - CSS
categories:
 - 前端笔记
---

## flex相关的属性

### 应用在flex container上的CSS属性
* flex-direction
* justify-content
* align-items
* flex-warp
* flex-flow
* align-content

### 应用在flex items上的CSS属性
* order
* align-self
* flex-grow
* flex-shrink
* flex-basis
* flex

## flex container

### flex-direction
决定主轴（main axis）的方向
* row：主轴从左到右
* row-reverse：主轴从右到左
* column：主轴从上到下
* column-reverse：主轴从下到上

### justify-content
决定flex items在主轴的对齐方式
* flex-start（默认值）：与main start对齐
* flex-end：与main end对齐
* center：居中对齐
* space-between：
    * flex items之间的距离相等
    * 与main start、main end两端对齐
* space-evenly：
    * flex items之间的距离相等
    * flex items与main start、main end之间的距离等于flex items之间的距离
* space-around：
    * flex items之间的距离相等
    * flex items与main start、main end之间的距离是flex items之间距离的一半

### align-items
决定flex items在交叉轴（cross axis）上的对齐方式
* normal：在弹性布局中，效果和stretch一样
* stretch：当flex items在交叉轴方向的size为auto时，会自动拉伸至填充flex container
* flex-start：与cross start对齐
* flex-end：与cross end对齐
* center：居中对齐
* baseline：与基准线对齐

### flex-warp
默认情况下，flex items都会在同一行显示
* nowarp：不换行
* warp：换行
* warp-reverse：多行（对比warp，cross start与cross end相反，很少使用）

### flex-flow
flex-flow为缩写属性：flex-direction || flex-warp

### align-content
align-content决定了多行的flex items在交叉轴上的对齐方式，用法与justify-content类似
* stretch：（默认值）与align-items的stretch类似
* flex-start：与cross start对齐
* flex-end：与cross end对齐
* center：居中对齐
* space-between：
    * flex items之间的距离相等
    * 与cross start、cross end两端对齐
* space-around：
    * flex items之间的距离相等
    * flex items与cross start、cross end之间的距离时flex items之间距离的一半
* space-evenly：
    * flex items之间的距离相等
    * flex items与cross start、cross end之间的距离等于flex items之间的距离
    
## flex items

### order
order决定了flex items的排布顺序
* 可以设置任意整数（正整数、负整数、0），值越小就越排在前面
* 默认值是0

### align-self
flex items可以通过align-self覆盖flex container设置的align-items
* auto（默认值）：遵从flex container的align-items设置
* stretch、flex-start、flexx-end、center、baseline，效果跟align-items一致

### flex-grow
* flew-grow决定了flex items如何扩展
    * 可以设置任意非负数字（正小数、正整数、0），默认值是0
    * 当flex container在主轴方向上有剩余size时，flex-grow属性才会有效
* 如果所有的flex items的flex-grow总和超过1，每个flex item扩展的size为：
    * flex container的剩余size * flex-grow / sum
* 如果所有flex items的flex-grow总和不超过1，每个flex item扩展的size为：
    * flex container的剩余size * flex-grow
* flex items扩展后的最终size不能超过max-width\max-height

### flex-shrink
* flew-shrink决定了flew items如何收缩
    * 可以设置任意非负数字（正小数、正整数、0），默认值是1
    * 当flex items在主轴方向上超过了flex container的size，flex-shrink属性才会有效
* 如果所有flex items的flex-shrink总和超过1，每个flex item收缩的size为：
    * flex items超出flex container的size * 收缩比例 / 所有flex items 的收缩比例之和
* 如果所有flex items的flex-shrink总和sum不超过1，每个flex item收缩的size为：
    * flex items超出flex container的size * sum * 收缩比例 / 所有flex items的收缩比例之和
    * 收缩比例 = flex-shrink * flex item的base size
    * base size就是flex item放入flex container之前的size
* flex items收缩后的最终size不能小于min-width\min-height

### flex-basis
* flex-basis用来设置flex items在主轴方向上的base size
    * auto（默认值） = 具体的宽度数值
* 决定flex items最终base size的因素，从优先级高到低
    * max-width\max-height\min-width\min-height
    * flex-basis
    * width\height
    * 内容本身的size

### flex
* flex是flex-grow || flex-shrink || flex-basis 的简写，flex属性可以指定1个，2个或3个值
* 单值语法：值必须为以下其中之一：
    * 一个无单位数（number）：它会被当作flex-grow的值
    * 一个有效的宽度（width）值：它会被当作flex-basis的值
    * 关键字none，auto或initial
* 双值语法：第一个值必须为一个无单位数，并且它会被当作flex-grow的值
    * 第二个值必须为以下之一：
        * 一个无单位数：它会被当作flex-shrink的值
        * 一个有效的宽度值：它会被当作flex-basis的值
* 三值语法：
    * 第一个值必须为一个无单位数，并且它会被当作flex-grow的值
    * 第二个值必须为一个无单位数，并且它会被当作flex-shrink的值
    * 第三个值必须为一个有效的宽度值，并且它会被当作flex-basis的值