---
title: SEO优化
date: 2020-08-15
tags:
 - HTML
categories:
 - 前端笔记
---

## 网站TDK三大标签SEO优化
SEO(Search Engine Optimization)汉译为搜索引擎优化，是一种利用搜索引擎的规则提高网站在有关搜索引擎内自然排名的方式。

SEO的目的是对网站进行深度的优化，从而帮助网站获取免费的流量，进而在搜索引擎上提示网站的排名，提高网站的知名度

页面必须有三个标签用来符合SEO优化：1.title 2.description 3.keywords
### title网站标题
title具有不可替代性，是我们页内的第一个重要标签，是搜索引擎了解网页的入口和对网页主题归属的最佳判断点。

```html
<title>京东(JD.COM)-正品低价、品质保障、配送及时、轻松购物！</title>
```
### description网站说明
简要说明我们网站主要是做什么的

```html
<meta name="description" content="京东JD.COM-专业的综合网上购物商城,销售家电、数码通讯、
电脑、家居百货、服装服饰、母婴、图书、食品等数万个品牌优质商品.便捷、诚信的服务，为您提供
愉悦的网上购物体验!"/>
```
### keywords关键字
keywords是页面关键词，是搜索引擎的关注的之一

keywords最后限制为6~8个关键词，关键词之间用英文逗号隔开，采用关键词1，关键词2的形式

```html
<meta name="keywords" content="网上购物,网上商城,手机,笔记本,电脑,MP3,CD,VCD,DV,相机,数码,配件,手表,存储卡,京东" />
```

## LOGO SEO优化
1. logo里面首先放一个h1标签，目的是为了提权，告诉搜索引擎，这个地方很重要
2. h1里面再放一个链接，可以返回首页的，把logo的背景图片给链接即可
3. 为了搜索引擎收录我们，我们链接里面要放文字（网站名称），但是文字不要显示出来
    * 方法1：text-indent移到盒子外面（text-indent:-9999px），然后overflow:hidden,淘宝的做法。
    * 方法2：直接给font-size:0;就看不到文字了，京东的做法。
4. 最后给链接一个title属性，这样鼠标放到logo上就可以看到提示文字了。