---
title: MongoDB
date: 2020-08-05
tags:
 - MongoDB
categories:
 - 博客随笔
---

## 使用MongoDB
### 安装MongoDB
此处提供4.0.6版本的百度网盘地址

链接：[https://pan.baidu.com/s/14oXqAuJZplcq2RoDTLn6-Q](https://pan.baidu.com/s/14oXqAuJZplcq2RoDTLn6-Q)

提取码：e572

[参考博客地址](https://blog.csdn.net/fengtingYan/article/details/88371232)

下载完成MongoDB安装包后

mongodb-win32-x86_64-2008plus-ssl-4.0.6-signed.msi

双击打开安装包，一直next，中途可以点击Custom选择自己想安装的路径

随后会花费几分钟进行安装，但是如果网速比较慢之类的可能会出现

Service 'MongoDB Server' (MongoDB) failed to start的警告

此时直接选Ignore继续

但是安装完后会出现无法运行mongodb的情况

解决办法：
1. 找到mongodb的安装路径，进入bin文件夹，打开mongod.cfg文件
2. 将最后一行的mp:删除，保存退出
3. 重启服务

随后mongodb就可以正常运行了，先运行mongod.exe,再运行mongo.exe即可

可以去服务中查看MongoDB Server是否已经启动

### 配置环境变量
直接在系统变量的path中添加一条，路径为mongodb的bin文件夹的路径即可

## MongoDB的常用命令
mongo
* 运行mongo

db
* 显示当前的数据库名称

show dbs	
* 显示当前服务器下数据库（非空的数据库）列表

use test	
* 如果test数据库不存在，则创建test数据库
* 如果test已存在，则切换到test数据库

show collections	
* 显示当前数据库下所包含的集合（表）列表