---
title: VuePress的使用
date: 2020-07-17
tags:
 - VuePress
categories:
 - 个人随笔 
---

## VuePress的介绍
VuePress 由两部分组成：第一部分是一个极简静态网站生成器，它包含由 Vue 驱动的主题系统和插件 API，另一个部分是为书写技术文档而优化的默认主题，它的诞生初衷是为了支持 Vue 及其子项目的文档需求。

VuePress起初用于写文档，现被多数用于制作个人博客。[官方文档](https://v1.vuepress.vuejs.org/zh/theme/default-theme-config.html)



## vuepress-theme-reco
VuePress有好几种主题，当然也可以自定义主题，这里要介绍的是[vuepress-theme-reco](https://vuepress-theme-reco.recoluan.com/)这款主题

## vuepress-theme-reco的安装
vuepress-theme-reco有对应的脚手架，可以使我们不用进行复杂的配置就能进行博客的攥写，非常适合小白使用。

```bash
# 初始化
npm install @vuepress-reco/theme-cli -g
theme-cli init my-blog

# 安装
cd my-blog
npm install

# 运行
npm run dev

# 编译
npm run build
```

## vuepress配置内容介绍
### 项目根目录下的README.md
项目根目录下的README.md为默认首页面
```bash

---
home: true
heroText: 渝心                  //首页中间的名称
tagline: 心之所向，身之所行      //首页中间的座右铭
# heroImage: /hero.png          //不使用名称也可以使用图片替代，此时最好设置heroText: null
# heroImageStyle: {             //图片样式
#   maxWidth: '600px',
#   width: '100%',
#   display: block,
#   margin: '9rem auto 2rem',
#   background: '#fff',
#   borderRadius: '1rem',
# }
bgImage: /background.jpg        //首页背景图片
bgImageStyle: {                 //首页背景图片样式
  height: '450px'
}
//使用vuepress-theme-reco主题，首页下方部分显示的是博客文章，所以下面配置的不进行显示
isShowTitleInHome: false
actionText: Let's go
actionLink: /blogs/other/guide
features:
- title: Yesterday
  details: 开发一款看着开心、写着顺手的 vuepress 博客主题
- title: Today
  details: 希望帮助更多的人花更多的时间在内容创作上，而不是博客搭建上
- title: Tomorrow
  details: 希望更多的爱好者能够参与进来，帮助这个主题更好的成长
---
```

## .vuepress
.vuepress目录下的public存放静态资源如图片等

当项目的样式无法满足于个人需求时，可以使用自定义样式，在.vuepress目录创建一个styles目录，在styles目录下创建palette.styl文件
这个是我个人的样式配置
```scss
$accentColor = #124578//默认主题颜色
$textColor = #2c3e50//默认字体颜色
$borderColor = #eaecef//默认边框颜色
$codeBgColor = #282c34//默认背景颜色

//示例修改相关样式f12找到需要修改的地方找到对应class类拿过来直接用就行了
.sidebar-group.is-sub-group > .sidebar-heading:not(.clickable) {
  opacity: 1
}

.home-blog .hero h1 {
  margin: 15rem auto 1.8rem;
  font-size: 2.5rem;
}
```

### .vuepress下的config.js配置
```js

module.exports = {
  "title": "渝心",                        //对应页面左上角的标题，网页项的名称，loading-page的名称
  "description": "心之所向，身之所行",     //对应loading-page的描述
  "head": [
    [
      "link",
      {
        "rel": "icon",
        "href": "/portrait.jpg"         //对应网页项的icon
      }
    ]
  ],
  "sidebar": {},                        //设置侧边栏，配置灵活，可以按照自己的想法进行设置
  "logo": "/portrait.jpg",              //对应页面左上角的logo
  "search": true,                       //启用搜索框
  "author": "kellen",                   //主页面右下角的作者名称
  "authorAvatar": "/portrait.jpg",      //主页面右下角的作者头像
}


```