---
title: html基础
date: 2020-08-29
tags:
 - HTML
categories:
 - 前端笔记
---

## HTML中的块级元素
div、form、h1~h6、p、ul、ol、dl(定义一个列表描述)、table、address

center(实现居中效果，HTML5已经不支持，在CSS中实现)

hr(水平分割线)

pre(预格式化)

1. 会自动换行
2. 高度、宽度都是可控的
3. 没有宽度默认为100%
4. 块级元素中可以包含块级元素和行内元素

## HTML中的行内元素
span、a、br、b(加粗)、strong(语义化强调)、img、sup(上标)、sub(下标)、i(斜体)、em(语义化斜体)

del(删除线)、u(下划线)、input(文本框)、textarea(多行文本)、select(下拉列表)

1. 和其他元素都在一行
2. 高度、宽度都是不可控的
3. 宽高就是内容的宽高，不可以改变
4. 行内元素只能包含行内元素，不能包含块级元素

## html5新增的常用的语义化标签
1. section：独立内容区块，可以用h1~h6组成大纲，表示文档结构，也可以有章节、页眉、页脚或页眉的其他部分
2. article：特殊独立区块，表示这篇页眉中的核心内容
3. aside：标签内容之外与标签内容相关的辅助信息
4. header：某个区块的头部信息/标题
5. hgroup：头部信息/标题的补充内容
6. footer：底部信息
7. nav：导航条部分信息
8. figure：独立的单元，例如某个有图片与内容的新闻块

## html5新增的表单标签类型
1. email：必须输入邮件
2. url：必须输入url
3. number：必须输入数值
4. range：必须输入一定范围内的数值
5. Date Picker日期选择器
    * date：选取日、月、年
    * month：选取月、年
    * week：选取周和年
    * time：选取时间（小时和分钟）
    * datetime：选取时间、日、月、年（UTC时间）
    * datetime-local：选取时间、日、月、年（本地时间）
6. search：搜索常规的文本域
7. color：选择颜色

## html5新增的媒体标签
1. video：视频
2. audio：音频
3. embed：嵌入内容（包括各种媒体）

## html5新增的其他功能标签
1. mark：标注（像荧光笔做笔记）
2. progress：进度条 max="最大进度条的值" value="当前进度条的值"
3. canvas：定义一个绘图容器，需通过js来绘制图形