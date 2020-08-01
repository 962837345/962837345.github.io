---
title: react基础
date: 2020-08-01
tags:
 - React
categories:
 - 前端笔记
---

## 使用react脚手架创建第一个react项目

### 安装react脚手架
```bash
npm install -g create-react-app
```

### 使用react脚手架创建项目
```bash
create-react-app hello-react
```

### 进入hello-react
```bash
cd hello-react
```

### 运行react
```bash
npm start
```

### 创建app.jsx文件
```jsx harmony
import React, {Component} from 'react'

export default class App extends Component {
  state = {
    msg: '我是app'
  };
  
  render() {
    const {msg} = this.state;
    return(
        <div className="app" style={{color: 'red'}}>{msg}</div>
    )
  }
}
```

### 创建index.js文件
```js
import React from 'react'
import {render} from 'react-dom'
import App from './components/app/app'

render(<App/>,document.getElementById('root'));
```

:::tip
react中设置样式的class应更换为className

style内联样式使用{{}}

获取变量使用{}
:::

## 组件三大属性state
state是组件对象最重要的属性，值是对象（可以包含多个属性）
组件被称为“状态机”，通过更新组件的state来更新对应的页面显示（重新渲染组件）
### 初始化状态
```jsx harmony
import React, {Component} from 'react'
export default class Person extends Component{
  constructor(props){
    super(props);
    this.state = {
      stateProp1: value1,
      stateProp2: value2
    }
  }
}
```
或直接在class中(推荐，比较方便)
```jsx harmony
import React, {Component} from 'react'
export default class Person extends Component{
  state = {
    stateProp1: value1,
    stateProp2: value2
  }
}

```

### 读取某个状态值
```jsx harmony
this.state.stateName
```

### 更新状态->组件界面更新
```jsx harmony
this.setState({
  stateProp1:value1,
  stateProp2:value2
})
```

## 组件三大属性props
使用prop-types对props进行数据类型检验

安装prop-types
```bash
npm install --save prop-types
```
### 使用构造函数示例
```jsx harmony
  import React,{Component} from 'react'
  import PropTypes from 'prop-types'
  export default class Person extends Component{
  
  //指定属性类型限制和必要性限制
  static propTypes = {
    name: PropTypes.string.isRequired,
    age: PropTypes.number,
    sex: PropTypes.string.isRequired
  };
  
  //设置默认属性值
  static defaultProps = {
    name: '小明',
    sex: '男'
  };
  
  render(){
    const {name,age,sex} = this.props;
        return(
            <ul>
              <li>姓名：{name}</li>
              <li>年龄：{age}</li>
              <li>性别:{sex}</li>
            </ul>
        )
  }
}
```

## 组件三大属性ref
```jsx harmony
  import React,{Component} from 'react'
  
  export default class MyConponent extends Component {
  
    handleClick = () => {
      const input = this.refs.content;
      console.log(input.value)
    };
    
    render() {
      return (
        <div>
          // 官方不推荐
          <input type="text" ref="content"/>
          // 推荐方法
          <input type="text" ref={input => this.input = input}/>
          <button onClick={this.handkeClick}>确定</button>
        </div>
      )
    }
  }
```
:::tip
在react中定义方法，一律使用箭头函数声明，这样可以直接自动绑定上一级的作用域
:::