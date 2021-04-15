---
title: 实用的js函数
date: 2021-04-13
tags:
 - JS
categories:
 - 前端笔记
---

## 生成随机颜色函数

```js
function getRandomColor(){
  return `#${(~~((1<<24) * Math.random())).toString(16)}`
}
```

`(1 << 24) * Math.random()`可以得到0~2^24 - 1之间的随机数。因为得到的是一个浮点数，但我们只需要整数部分，使用取反操作符`~`连续两次取反获得整数部分，然后再用`toString(16)`转换为16进制的字符串