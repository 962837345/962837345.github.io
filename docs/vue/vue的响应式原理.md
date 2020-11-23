---
title: vue的响应式原理
date: 2020-07-21
tags:
 - vue
categories:
 - 前端笔记
---
## 核心思想——发布/订阅模式（观察者模式）
vue的响应式原理是当把一个普通的JavaScript对象传入Vue实例作为`data`选项，
Vue 将遍历此对象所有的 property，并使用 `Object.defineProperty `把这些 property 全部转为 `getter/setter`,
这就是进行数据劫持或数据代理

每个组件实例都对应一个 watcher 实例，它会在组件渲染的过程中把“接触”过的数据 property 记录为依赖。
之后当依赖项的 setter 触发时，会通知 watcher，从而使它关联的组件重新渲染。

Vue 无法检测 property 的添加或移除。由于 Vue 会在初始化实例时对 property 执行 getter/setter 转化，
所以 property 必须在 `data` 对象上存在才能让 Vue 将它转换为响应式

对于已经创建的实例，Vue 不允许动态添加根级别的响应式 property。但是，
可以使用` Vue.set(object, propertyName, value)` 方法向嵌套对象添加响应式 property

对于数组的响应式是通过重写数组的方法（'pop', 'shift', 'unshift', 'sort', 'reverse', 'splice', 'push'）实现的

## Vue 不能检测以下数组的变动

1.当你利用索引直接设置一个数组项时，例如：`vm.items[indexOfItem]` = newValue

2.当你修改数组的长度时，例如：vm.items.length = newLength

解决方案：
```js
vm.$set(vm.items, indexOfItem, newValue)
```
```js
vm.items.splice(newLength)
```

## 异步更新队列
Vue 在更新 DOM 时是异步执行的。只要侦听到数据变化，Vue 将开启一个队列，
并缓冲在同一事件循环中发生的所有数据变更。如果同一个 watcher 被多次触发，只会被推入到队列中一次

可以在数据变化之后使用`Vue.nextTick(callback)`，这样回调函数将会在DOM更新完后被调用，
回调函数返回的是一个Promise实例

## 总结
外界通过watcher读取数据时，会触发getter从而将watcher添加到依赖中

在修改对象的值的时候，会触发对应的setter，setter通知之前依赖收集得到每一个watcher，通知它们进行update操作

## vue响应式原理简单实现
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Test</title>
</head>
<body>
  <div id="app"></div>
  <script>
    let state = {count: 0}
    app.innerHTML = state.count
    let active;
    function defineReactive(obj) { // 变成响应
      for(let key in obj){
        let value = obj[key] // 对象的值
        let dep = [] // 收集依赖
        Object.defineProperty(obj, key, {
          get(){
            if(active){
              dep.push(active)
            }
            return value
          },
          set(newValue){
            value = newValue
            dep.forEach(watcher => watcher()) // 通知watcher更新
          }
        })
      }
    }

    defineReactive(state)

    const watcher = (fn) => {
      active = fn
      fn()
      active = null
    }
    watcher(() => {
      app.innerHTML = state.count
    })
    watcher(() => {
      console.log(state.count)
    })
  </script>
</body>
</html>
```