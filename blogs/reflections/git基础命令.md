---
title: git基础命令
date: 2020-07-19
tags:
 - git
categories:
 - 博客随笔
---

## 配置用户名和邮箱
--global为全局参数，表明所有本地git仓库都会使用这个配置
```bash
git config --global user.name "yourname"

git config --global user.email "your_email@youremail.com"
```

## 生成密钥（SSH Key）
```bash
ssh-keygen -t rsa -C "your_email@youremail.com"
```

## 验证是否连接成功
```bash
ssh -T git@github.com
```

## git init
初始化git
```bash
git init
```

## git add

提交所有变化
```bash
git add -A
```

提交被修改(modified)和被删除(deleted)的文件，不包括新文件(new)
```bash
git add -u
```

提交新文件(new)和被修改(modified)的文件，不包括被删除(deleted)的文件
```bash
git add .
```

## git commit
-m表示后面直接输入提交代码的信息
```bash
git commit -m "message"
```

其他功能如-m参数，加的-a参数可以将所有已跟踪文件中的执行修改或删除操作的文件都提交到本地仓库，
即使它们没有经过git add添加到暂存区,注意，新加的文件（即没有被git系统管理的文件）
是不能被提交到本地仓库的。建议一般不要使用-a参数，正常的提交还是使用git add先将要改动的文件添加到暂存区，
再用git commit 提交到本地版本库。
```bash
git commit -a -m "message"
```


## 连接远程仓库
```bash
git remote add origin "git@github.com:yourname/repositoryname.git"
```

## 断开远程仓库
```bash
git remote remove origin
```

## 上传代码
-u为可选参数，使用-u以后就直接git push就行，origin为连接远程仓库的别名，master为默认分支
```bash
git push -u origin master
```

## 下拉代码
下拉分支为master的代码
```bash
git pull origin master
```

## 查看git状态
```bash
git status
```

## 查看git日志
```bash
git log
```
