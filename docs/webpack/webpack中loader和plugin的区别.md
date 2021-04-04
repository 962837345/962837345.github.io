---
title: webpack的中loader和plugin的区别
date: 2021-04-03
tags:
  - webpack
categories:
  - 前端笔记
---

## 从功能角度区分

### loader

- loader 从字面意思理解是加载
- 由于 webpack 本身只能打包 commonjs 规范的 js 文件，所以针对 css、图片等格式的文件无法打包，就需要引入第三方的模块进行打包
- loader 虽然只是扩展了 webpack，但它只专注于转化文件(transform)这一领域，完成压缩、打包、语言翻译
- loader 运行在 nodejs 中
- 仅仅只为了打包

### plugin

plugin 也是为了扩展 webpack 的功能，但是 plugin 是作用于 webpack 本身上的。而且 plugin 不仅只局限在打包、资源的加载上，它的功能更加丰富。从打包优化和压缩、到重新定义环境遍历，功能强大到可以用来处理各种各样的任务

## 从运行实际的角度分

- loader 运行在打包文件之前(loader 是模块加载时的预处理文件)
- plugin 在整个编译周期都起作用
