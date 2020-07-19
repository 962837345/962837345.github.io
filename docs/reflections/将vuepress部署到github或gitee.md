---
title: 将vuepress部署到github或gitee
date: 2020-07-18
tags:
 - VuePress
categories:
 - 个人随笔 
---

## 将vuepress部署到github上面

:::warning 血泪史
本文章为部署pages出现404踩坑记录
:::
当使用vuepress-theme-reco脚手架创建vuepress项目时，使用`npm run build`打包项目，会在项目根目录下面生成一个public文件夹，里面就是打包好的内容。

最简单的方式是在github上面建立一个仓库，名字格式为：<你自己的github名称>.github.io 

:::tip 示例
我自己的github仓库名称为：962837345.github.io
:::

随后在终端进入到项目中的public目录中执行以下步骤
```bash
//初始化git
git init   
       
//add public目录下的所有文件
git add .     
    
//进行提交
git commit -m "first commit"    

//连接远程仓库  git名称为自己的github名称,本人的为962837345
git remote add origin git@github.com:<git名称>/<git名称>.github.io.git

//将代码push到远程仓库中
git push -u origin master
```
这样操作后Github就会帮你自动部署静态页面，直接访问<git名称>.github.io就能访问自己的静态页面,如本人的静态页面为962837345.github.io

这样的操作流程最为简单。那如果仓库名称不是<你自己的github名称>.github.io这种格式的呢？

就得在.vuepress/config.js中配置base,base的值为 /你的仓库名称/，这里要以/开头，以/结尾。

## 将vuepress部署到gitee上面
然后我又觉得，我网络不好，放在github上面访问速度慢，我想部署到码云上面。那看起来流程操作跟上面差不多，我就试了一下，就入了坑。

首先，我效仿github创建仓库的操作，创建了一个<我的gitee名称>.gitee.io的仓库，

然后按照刚才的流程，push到gitee仓库上面，gitee的静态页面部署需要在仓库的服务中有个Gitee Pages选项，
点进去后直接点击部署就行，部署完成之后我点进去，好的，页面没加载完全，按下f12，里面很多404。

我调试了很多，不加base，加base，最后我还是把仓库给删了，重新创建一个仓库，
我估计原因是因为gitee上面的仓库不能识别这种<我的gitee名称>.gitee.io的方式，
我自己新建了一个名字为myblog 的仓库，然后重新按照上面的流程将代码push到仓库中，再次进行部署就成功了。
:::warning
除了上面第一种使用github，创建<你自己的github名称>.github.io这种情况，
其他部署Pages包括gitee都需要在.vuepress/config.js配置base!!!
:::