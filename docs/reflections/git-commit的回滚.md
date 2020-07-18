---
title: git commit的回滚
date: 2020-07-18
tags:
 - git
categories:
 - 个人随笔 
---

##  git commit之后，想要撤销commit操作
回退到上一个版本
```bash
git reset --soft HEAD^
```
也可以写成
```bash
git reset --soft HEAD~1
```
如果想回退两个版本
```bash
git reset --soft HEAD~2
```
以此类推

git撤销commit有三种参数

:::tip --mixed
意思是：不删除工作空间改动代码，撤销commit，并且撤销git add . 操作
这个为默认参数,git reset --mixed HEAD^ 和 git reset HEAD^ 效果是一样的。
:::

:::tip --soft 
不删除工作空间改动代码，撤销commit，不撤销git add . 
:::

:::danger --hard
此操作尽量不要执行，会导致代码回滚到之前，会改动代码，特别坑，亲身经历，切记！！！

删除工作空间改动代码，撤销commit，撤销git add . 
注意完成这个操作后，就恢复到了上一次的commit状态。
:::

