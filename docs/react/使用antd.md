---
title: 使用Ant Design Mobile
date: 2020-08-03
tags:
 - React
 - Ant Design
categories:
 - 前端笔记
---

## 安装Ant Design Mobile
```bash
cnpm install antd-mobile --save
```

## 引入FastClick
解决移动端点击300ms延迟问题
```html
<html>
<head>
  <!-- set `maximum-scale` for some compatibility issues -->
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no" />
  <script src="https://as.alipayobjects.com/g/component/fastclick/1.0.6/fastclick.js"></script>
  <script>
    if ('addEventListener' in document) {
      document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
      }, false);
    }
    if(!window.Promise) {
      document.writeln('<script src="https://as.alipayobjects.com/g/component/es6-promise/3.2.2/es6-promise.min.js"'+'>'+'<'+'/'+'script>');
    }
  </script>
</head>
<body></body>
</html>
```

## 按需加载
### 按需加载组件
示例：
```js
import { Button } from 'antd-mobile';
```

### 按需加载css
1.下载依赖包
```bash
cnpm install react-app-rewired babel-plugin-import customize-cra -D
```

2.修改默认配置package.json
```json
{
  "scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test --env=jsdom"
  }
}
```
3.在根目录下创建config.override.js
```js
const {override, fixBabelImports} = require('customize-cra');

module.exports = override(
    fixBabelImports('import', {
      libraryName: 'antd-mobile',
      style: 'css',
    }),
);
```