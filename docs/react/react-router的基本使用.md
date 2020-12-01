---
title: react-router的基本使用
date: 2020-08-02
tags:
 - React
categories:
 - 前端笔记
---

##　安装react-router
```bash
npm install --save react-router-dom
```

## 使用react-router
### 在index.js中`import`BrowserRouter,使用BrowserRouter将App包裹起来
```bash
import {BrowserRouter} from 'react-router-dom'

render(
    (
        <BrowserRouter>
          <App/>
        </BrowserRouter>
    ),
    document.getElementById('root')
);
```

### 在app.jsx中
```bash
import React, {Component} from 'react'
import {NavLink,Switch,Route,Redirect} from 'react-router-dom'

import About from '../../views/about/about'
import Home from '../../views/home/home'
```
使用NavLink标签作为跳转选项
```html
<NavLink to='/about'>About</NavLink>
<NavLink to='/home'>Home</NavLink>
```
在要局部刷新的位置使用`<Switch>`代表路由匹配才显示

`<Route>`中设置`path`，`component`为引入的组件

`<Redirect>`为初始重定向到某个页面,与`<Route>`中的`path`对应

```html
<Switch>
  <Route path='/about' component={About}/>
  <Route path='/home' component={Home}/>
  <Redirect to='/about'/>
</Switch>
```

## 嵌套路由
嵌套路由的步骤基本跟使用路由的步骤差不多，关键在于`<Route>`中的`path`需要加上父组件的路径

示例：这里的home为父组件Home，嵌套一个子组件News
```html
<Route path='/home/news' component={News}/>
```

## 使用路由传递数据
示例：

在父组件中传入id
```html
<a href={`/home/message/messagedetail/${m.id}`}>{m.title}</a>

<Route path='/home/message/messagedetail/:id' component={MessageDetail}/>
```

在子组件中使用this.props.match.params取出
```jsx harmony
const {id} = this.props.match.params;
```