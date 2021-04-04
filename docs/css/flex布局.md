---
title: flex布局
date: 2020-07-20
tags:
  - CSS
categories:
  - 前端笔记
---

## flex 相关的属性

### 应用在 flex container 上的 CSS 属性

- flex-direction
- justify-content
- align-items
- flex-warp
- flex-flow
- align-content

### 应用在 flex items 上的 CSS 属性

- order
- align-self
- flex-grow
- flex-shrink
- flex-basis
- flex

## flex container

### flex-direction

决定主轴（main axis）的方向

- row：主轴从左到右
- row-reverse：主轴从右到左
- column：主轴从上到下
- column-reverse：主轴从下到上

### justify-content

决定 flex items 在主轴的对齐方式

- flex-start（默认值）：与 main start 对齐
- flex-end：与 main end 对齐
- center：居中对齐
- space-between：
  - flex items 之间的距离相等
  - 与 main start、main end 两端对齐
- space-evenly：
  - flex items 之间的距离相等
  - flex items 与 main start、main end 之间的距离等于 flex items 之间的距离
- space-around：
  - flex items 之间的距离相等
  - flex items 与 main start、main end 之间的距离是 flex items 之间距离的一半

### align-items

决定 flex items 在交叉轴（cross axis）上的对齐方式

- normal：在弹性布局中，效果和 stretch 一样
- stretch：当 flex items 在交叉轴方向的 size 为 auto 时，会自动拉伸至填充 flex container
- flex-start：与 cross start 对齐
- flex-end：与 cross end 对齐
- center：居中对齐
- baseline：与基准线对齐

### flex-warp

默认情况下，flex items 都会在同一行显示

- nowarp：不换行
- warp：换行
- warp-reverse：多行（对比 warp，cross start 与 cross end 相反，很少使用）

### flex-flow

flex-flow 为缩写属性：flex-direction || flex-warp

### align-content

align-content 决定了多行的 flex items 在交叉轴上的对齐方式，用法与 justify-content 类似

- stretch：（默认值）与 align-items 的 stretch 类似
- flex-start：与 cross start 对齐
- flex-end：与 cross end 对齐
- center：居中对齐
- space-between：
  - flex items 之间的距离相等
  - 与 cross start、cross end 两端对齐
- space-around：
  - flex items 之间的距离相等
  - flex items 与 cross start、cross end 之间的距离时 flex items 之间距离的一半
- space-evenly：
  - flex items 之间的距离相等
  - flex items 与 cross start、cross end 之间的距离等于 flex items 之间的距离

## flex items

### order

order 决定了 flex items 的排布顺序

- 可以设置任意整数（正整数、负整数、0），值越小就越排在前面
- 默认值是 0

### align-self

flex items 可以通过 align-self 覆盖 flex container 设置的 align-items

- auto（默认值）：遵从 flex container 的 align-items 设置
- stretch、flex-start、flex-end、center、baseline，效果跟 align-items 一致

### flex-grow

- flew-grow 决定了 flex items 如何扩展
  - 可以设置任意非负数字（正小数、正整数、0），默认值是 0
  - 当 flex container 在主轴方向上有剩余 size 时，flex-grow 属性才会有效
- 如果所有的 flex items 的 flex-grow 总和超过 1，每个 flex item 扩展的 size 为：
  - flex container 的剩余 size \* flex-grow / sum
- 如果所有 flex items 的 flex-grow 总和不超过 1，每个 flex item 扩展的 size 为：
  - flex container 的剩余 size \* flex-grow
- flex items 扩展后的最终 size 不能超过 max-width\max-height

### flex-shrink

- flew-shrink 决定了 flew items 如何收缩
  - 可以设置任意非负数字（正小数、正整数、0），默认值是 1
  - 当 flex items 在主轴方向上超过了 flex container 的 size，flex-shrink 属性才会有效
- 如果所有 flex items 的 flex-shrink 总和超过 1，每个 flex item 收缩的 size 为：
  - flex items 超出 flex container 的 size \* 收缩比例 / 所有 flex items 的收缩比例之和
- 如果所有 flex items 的 flex-shrink 总和 sum 不超过 1，每个 flex item 收缩的 size 为：
  - flex items 超出 flex container 的 size _ sum _ 收缩比例 / 所有 flex items 的收缩比例之和
  - 收缩比例 = flex-shrink \* flex item 的 base size
  - base size 就是 flex item 放入 flex container 之前的 size
- flex items 收缩后的最终 size 不能小于 min-width\min-height

### flex-basis

- flex-basis 用来设置 flex items 在主轴方向上的 base size
  - auto（默认值） = 具体的宽度数值
- 决定 flex items 最终 base size 的因素，从优先级高到低
  - max-width\max-height\min-width\min-height
  - flex-basis
  - width\height
  - 内容本身的 size

### flex

- flex 是 flex-grow || flex-shrink || flex-basis 的简写，flex 属性可以指定 1 个，2 个或 3 个值
- 单值语法：值必须为以下其中之一：
  - 一个无单位数（number）：它会被当作 flex-grow 的值
  - 一个有效的宽度（width）值：它会被当作 flex-basis 的值
  - 关键字 none，auto 或 initial
- 双值语法：第一个值必须为一个无单位数，并且它会被当作 flex-grow 的值
  - 第二个值必须为以下之一：
    - 一个无单位数：它会被当作 flex-shrink 的值
    - 一个有效的宽度值：它会被当作 flex-basis 的值
- 三值语法：
  - 第一个值必须为一个无单位数，并且它会被当作 flex-grow 的值

  - 第二个值必须为一个无单位数，并且它会被当作 flex-shrink 的值

  - 第三个值必须为一个有效的宽度值，并且它会被当作 flex-basis 的值

::: tip
flex 实现父窗口中的三个子项中两个居左，一个居右效果
:::

在 flex 布局中如果某个元素的`margin`为`auto`，那么它的 margin 将会自动填充为剩下的空间

因此只需要在第三个子项中设置 margin-left:auto 就可以实现该效果
