---
title: BFC
date: 2020-08-19
tags:
 - CSS
categories:
 - 前端笔记
---
## BFC
BFC是一个独立的布局环境，其中的元素布局不受外界的影响

### BFC的布局规则
1. BFC内部的Box会在垂直方向一个个排列
2. Box垂直方向的距离由margin决定，同个BFC中的两个相邻Box会发生外边距合并
3. BFC不会与浮动元素重叠
4. 计算BFC的高度时，浮动元素的高度也计算在内

### 如何创建BFC
1. overflow不为visible
2. position不为static或relative
3. float不为none
4. display为inline-block、flex、inline-flex、table-cell、table-caption

### BFC的作用
1. 避免margin重叠
2. 清除浮动
3. 自适应两栏布局

## 外边距合并
外边距合并指两个在正常流中相邻（兄弟或父子关系）的块级元素的外边距发生合并，
取值为较大的值，只有上下外边距才会发生外边距合并，左右不会

### 产生外边距合并的情况
1. 相邻的兄弟块级元素
2. 块级父元素与其第一个子元素和最后一个子元素
3. 空元素块

### 清除外边距合并
在父级元素中加入
1. border: 1px solid transparent;
2. padding: 1px;
3. 设置BFC
