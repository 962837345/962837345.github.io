---
title: 将vuepress部署到github或gitee修改
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

最简单的方式是在github上面建立一个仓库，名字格式为：`你自己的github名称.github.io`

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

首先，我效仿github创建仓库的操作，创建了一个`我的gitee名称.gitee.io`的仓库，

然后按照刚才的流程，push到gitee仓库上面，gitee的静态页面部署需要在仓库的服务中有个Gitee Pages选项，
点进去后直接点击部署就行，部署完成之后我点进去，好的，页面没加载完全，按下f12，里面很多404。

随后我在码云帮助中心查到要直接使用`自己gitee名字.gitee.io`的方式访问，只需要创建一个名字为`自己gitee名字`的仓库就行了，

类似于上面github，而不同的只是github创建的是`自己github名字.github.io`这个仓库，而gitee只需要创建`自己gitee名字`这个仓库就行。

我自己新建了一个以自己gitee名字为名的仓库，然后重新按照上面的流程将代码push到仓库中，再次进行部署就成功了。

:::warning
除了上面第一种使用github，创建<你自己的github名称>.github.io这种情况，
其他部署Pages包括gitee都需要在.vuepress/config.js配置base!!!
:::

我本人倾向于上传到gitee上面， 毕竟速度比较快，但是有个问题就是当你写了新的博客，
再次push到gitee上面需要手动进行更新，而且更新后访问进去还是没有显示新加的博客，
这个原因卡了我很久，明明已经push成功了，但是就是不显示，为之捣鼓了一整天，
最后发现浏览器刷新一下就有了，个人估计应该是有缓存机制，使用手机访问就是最新版本的。
个人使用谷歌浏览器，自测使用Edge和IE无法正常访问，会停留在加载页面，查看是报HierarchyRequestError的错误。