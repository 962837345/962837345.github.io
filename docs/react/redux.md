---
title: redux
date: 2020-08-03
tags:
 - React
 - redux
categories:
 - 前端笔记
---

## 安装redux
```bash
npm install redux -S
```

## redux的核心API
### createStore()

1. 作用：创建包含指定reducer的store对象

2. 编码
```js
import {createStore} from 'redux'
import counter from './reducers/counter'
const store = createStore(counter)
```

### store对象
1. 作用:redux库最核心的管理对象
2. 它内部维护着：state、reducer
3. 核心方法：
    * getState()
    * dispatch(action)
    * subscribe(listener)
4. 编码:
    * store.getState()
    * store.dispatch(type:'INCREMENT',number')
    * store.subscribe(render)
    
## redux的三个核心概念
1.action
* 标识要执行行为的对象
* 包含2个方面的属性
  * type:标识属性，值为字符串，唯一，必要属性
  * xxx：数据属性，值类型任意，可选属性
  
例子：
```js
const action = {
  type:'INCREMENT',
  data: 2
}
```
* Action Creator(创建Action的函数)

`const increment = (number) => ({type:'INCREMENT', number'})`

2.reducer
* 根据老的state和action，产生新的state的纯函数
* 示例
```js
export default function counter(state=0,action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + action.number;
    case 'DECREMENT':
      return state - action.number;
    default:
      return state
  }
}
```
:::tip
返回一个新的状态，不要修改原来的状态
:::

3.store
* 将state，action与reducer联系在一起的对象
* 如何得到此对象？
```js
import {createStore} from 'redux'
import reducer from './reducer'
const store = createStore(reducer)
```
* 此对象的功能？
  * getState():得到state
  * dispatch(action):分发action，触发reducer调用，产生新的state
  * subscribe(listener):注册监听，当产生了新的state时，自动调用
  
## 使用redux编写应用
* 在src下创建redux文件夹
* 在redux文件夹中创建store.js
```js
import {createStore} from 'redux'
import {counter} from './reducers'

//  生成一个store对象
const store = createStore(counter);

export default store
```
* 在redux文件夹中创建action-type.js
```js
export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
```
* 在redux文件夹中创建reducers.js
```js
import {INCREMENT,DECREMENT} from "./action-types";

export function counter(state = 0,action) {
  switch (action.type) {
    case INCREMENT:
      return state + action.data;
    case DECREMENT:
      return state - action.data;
    default:
      return state;
  }
}
```
* 在redux文件夹中创建actions.js
```js
import {INCREMENT,DECREMENT} from "./action-types";

export const increment = (number) => ({type:INCREMENT,data:number});

export const decrement = (number) => ({type:DECREMENT,data:number});
```
* 创建app.jsx
```jsx harmony
import React, {Component} from 'react'
import './app.css'
import * as actions from '../../redux/actions'

export default class App extends Component {

  state = {
    num: 0
  };

  increment = () => {
    // 1.得到选择增加数量
    const number = this.select.value * 1;
    // 2.得到原本的count状态，并计算新的count
    // const num = this.state.num + number;
    this.props.store.dispatch(actions.increment(number))
    // 3.更新状态
    // this.setState({num: num})
  };

  decrement = () => {
    // 1.得到选择增加数量
    const number = this.select.value * 1;
    // 2.得到原本的count状态，并计算新的count
    this.props.store.dispatch(actions.decrement(number))
    // const num = this.state.num - number;
    // 3.更新状态
    // this.setState({num: num})
  };

  incrementOdd = () => {
    // 1.得到选择增加数量
    const number = this.select.value * 1;
    // 2.得到原本的count状态，并计算新的count
    const num = this.props.store.getState();
    // 3.满足条件才更新状态
    if (num % 2 === 1) {
      this.props.store.dispatch(actions.increment(number))
    }
  };

  incrementAsync = () => {
    // 1.得到选择增加数量
    const number = this.select.value * 1;
    setTimeout(() => {
      this.props.store.dispatch(actions.increment(number))
    },1000)
  };

  render() {
    const num = this.props.store.getState();
    return (
        <div>
          <p>Click {num} times</p>
          <div>
            <select ref={select => this.select = select}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>&nbsp;
            <button onClick={this.increment}>+</button>
            &nbsp;
            <button onClick={this.decrement}>-</button>
            &nbsp;
            <button onClick={this.incrementOdd}>increment if odd</button>
            &nbsp;
            <button onClick={this.incrementAsync}>increment async</button>
            &nbsp;
          </div>
        </div>
    )
  }
}
```
* 创建index.js
```jsx harmony
import React from 'react'
import ReactDOM from 'react-dom'


import App from './components/app/app'
import store from './redux/store'



function render(){
  ReactDOM.render(<App store={store}/>, document.getElementById('root'));
}

//  初始化渲染
render();

//  订阅监听(store中的状态变化了，就会自动调用进行重绘)
store.subscribe(render);
```
:::tip
以上使用redux与react耦合度太高，不够简洁

使用react-redux可以简化代码
:::

## 使用react-redux

### 安装react-redux
```bash
npm install -S react-redux
```
### index.js中的修改
```jsx harmony
import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'

import App from './components/app/app'
import store from './redux/store'



function render(){
  ReactDOM.render((
      <Provider store={store}>
        <App />
      </Provider>
      ),
      document.getElementById('root'));
}

render();

store.subscribe(render);
```
使用Provider标签将App包裹起来，将store的值传给Provider

### app.jsx的修改
```jsx harmony
import React, {Component} from 'react'
import './app.css'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {increment, decrement} from '../../redux/actions'

class App extends Component {

  static propTypes = {
    num: PropTypes.number.isRequired,
    increment: PropTypes.func.isRequired,
    decrement: PropTypes.func.isRequired
  };

  state = {
    num: 0
  };

  increment = () => {
    // 1.得到选择增加数量
    const number = this.select.value * 1;
    this.props.increment(number)
  };

  decrement = () => {
    // 1.得到选择减少数量
    const number = this.select.value * 1;
    this.props.decrement(number)
  };

  incrementOdd = () => {
    // 1.得到选择增加数量
    const number = this.select.value * 1;
    // 2.得到原本的num状态，并计算新的num
    const num = this.props.num;
    // 3.满足条件才更新状态
    if (num % 2 === 1) {
      this.props.increment(number)
    }
  };

  incrementAsync = () => {
    // 1.得到选择增加数量
    const number = this.select.value * 1;
    setTimeout(() => {
      this.props.increment(number)
    }, 1000)
  };

  render() {
    const {num} = this.props;
    return (
        <div>
          <p>Click {num} times</p>
          <div>
            <select ref={select => this.select = select}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>&nbsp;
            <button onClick={this.increment}>+</button>
            &nbsp;
            <button onClick={this.decrement}>-</button>
            &nbsp;
            <button onClick={this.incrementOdd}>increment if odd</button>
            &nbsp;
            <button onClick={this.incrementAsync}>increment async</button>
            &nbsp;
          </div>
        </div>
    )
  }
}

export default connect(
    state => ({num: state}),
    {increment, decrement}
)(App)
```
:::tip
```jsx harmony
export default connect(
    state => ({num: state}),
    {increment, decrement}
)(App)
```
其中{increment:increment}，右边的值为actions.js中的action对象，由于命名相同，所以可以省略
:::

## react-redux将所有组件分成两大类
1. UI组件
    * 只负责UI的呈现，不带有任何业务逻辑
    * 通过props接收数据(一般数据和函数
    * 不使用任何Redux 的API
    * 一般保存在components文件夹下
2. 容器组件
    * 负责管理数据和业务逻辑，不负责UI的呈现
    * 使用Redux的API
    * 一般保存在containers文件夹下
    
因此在src下创建containers文件夹

将app.jsx进行抽离

在components文件夹下创建一个counter.jsx文件
```jsx harmony
import React, {Component} from 'react'
import PropTypes from 'prop-types'


export default class Counter extends Component {

  static propTypes = {
    num: PropTypes.number.isRequired,
    increment: PropTypes.func.isRequired,
    decrement: PropTypes.func.isRequired
  };

  state = {
    num: 0
  };

  increment = () => {
    // 1.得到选择增加数量
    const number = this.select.value * 1;
    this.props.increment(number)
  };

  decrement = () => {
    // 1.得到选择增加数量
    const number = this.select.value * 1;
    this.props.decrement(number)
  };

  incrementOdd = () => {
    // 1.得到选择增加数量
    const number = this.select.value * 1;
    // 2.得到原本的num状态，并计算新的num
    const num = this.props.num;
    // 3.满足条件才更新状态
    if (num % 2 === 1) {
      this.props.increment(number)
    }
  };

  incrementAsync = () => {
    // 1.得到选择增加数量
    const number = this.select.value * 1;
    setTimeout(() => {
      this.props.increment(number)
    }, 1000)
  };

  render() {
    const {num} = this.props;
    return (
        <div>
          <p>Click {num} times</p>
          <div>
            <select ref={select => this.select = select}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>&nbsp;
            <button onClick={this.increment}>+</button>
            &nbsp;
            <button onClick={this.decrement}>-</button>
            &nbsp;
            <button onClick={this.incrementOdd}>increment if odd</button>
            &nbsp;
            <button onClick={this.incrementAsync}>increment async</button>
            &nbsp;
          </div>
        </div>
    )
  }
}
```

在containers文件夹下创建app.jsx
```jsx harmony
import React from 'react'
import {connect} from 'react-redux'
import {increment, decrement} from '../redux/actions'
import Counter from '../components/counter'

export default connect(
    state => ({num: state}),
    {increment, decrement}
)(Counter)
```

## redux异步编程
### 安装redux-thunk
```bash
npm install --save redux-thunk
```
### 应用异步中间件
在store.js中
```jsx harmony
import {createStore, applyMiddleware} from 'redux'
import {counter} from './reducers'
import thunk from 'redux-thunk'

//  生成一个store对象
const store = createStore(
    counter,
    applyMiddleware(thunk)  // 应用异步中间件
);

export default store
```
### 在actions.js中创建一个异步action
```js
// 同步返回的是对象
// 异步返回的是函数
export const incrementAsync = (number) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(increment(number))
    },1000)
  }
};
```

app.jsx中对应修改
```jsx harmony
import {connect} from 'react-redux'
import {increment, decrement,incrementAsync} from '../redux/actions'
import Counter from '../components/counter'

export default connect(
    state => ({num: state}),
    {increment, decrement,incrementAsync}
)(Counter)
```

counter.jsx中直接调用`this.props.异步函数名`即可

## 使用redux调试工具
### 安装chrome浏览器插件
redux-devtools  
### 下载工具依赖包
```bash
npm install -D redux-devtools-extension
```
### 编码
修改store.js,引入composeWithDevTools，将applyMiddleware(thunk)包裹起来
```js
import {createStore, applyMiddleware} from 'redux'
import {counter} from './reducers'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'


//  生成一个store对象
const store = createStore(
    counter,
    composeWithDevTools(applyMiddleware(thunk))  // 应用异步中间件
);

export default store
```

## reducers.js补充
当reducers.js中的function有多个时,使用combineReducers统一将导出的模块整合
```jsx harmony
import {combineReducers} from 'redux'

function xxx(state=0,action) {

  return state
}

function yyy(state=0,action) {

  return state
}

export default combineReducers({
  xxx,
  yyy
})
```