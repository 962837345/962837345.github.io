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

## 请简述XMLHttpRequest、JSONP的适用场景，并针对两种请求形式简述如何检测请求错误
1. XMLHttpRequest用于浏览器端与服务器端异步请求数据从而实现对页面的无刷新修改，支持GET/POST请求，一般用于非跨域的场景。如果需要使用XMLHttpRequest跨域请求数据，需要通过CORS头支持。 JSONP用于跨域请求数据的场景，只支持GET请求。
2. XMLHttpRequest异常判断一般通过该对象的readystate和http状态码status来判断，JSONP的异常判断一般是onerror事件和超时timer来判断。

## XMLHttpRequest中readystate的5种值
* 0 ：（未初始化）（XMLHttpRequest）对象已创建，但是没有调用open()方法
* 1 ：（载入）已经调用了open()方法，但是没有发送请求
* 2 ：（载入完成）请求已发送完成
* 3 ：（交互）可以接收到部分响应数据
* 4 ：（完成）已经接收到全部数据，并且连接已关闭