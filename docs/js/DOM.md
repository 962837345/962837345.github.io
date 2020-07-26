---
title: DOM的使用
date: 2020-07-25
tags:
 - JS
 - HTML
categories:
 - 前端笔记
---

## getElementById() 
通过id获取HTML元素

## getElementsByTagName()
通过标签名获取HTML元素

## getElementsByClassName()
通过class获取HTML元素

## querySelector
通过css选择器获取HTML元素

## appendChild(node)
插入新的子节点

## removeChild(node) 
删除子节点

通常删除节点：节点.parentNode.removeChild(节点)

## replaceChild()
替换子节点

父节点.replaceChild(新节点，旧节点)

## insertBefore()
在某个子节点前面插入子节点

父节点.insertBefore(新节点，旧节点)

## innerHTML
节点的文本值

## parentNode
节点的父节点

## childNode
节点的子节点

## attributes
节点的属性节点

## createElement()
创建元素节点

## element.offsetHeight\element.offsetWidth
返回元素的高度\宽度，包括padding、border

## element.offsetLeft\element.offsetTop
返回元素的水平\垂直偏移量

## element.clientHeight\element.clientWidth
返回元素的可见高度\宽度，包括padding

## element.scrollWidth\element.scrollHeight
返回整个滚动区域的宽度和高度

## element.scrollLeft\element.scrollTop
返回水平\垂直滚动距离

## 垂直滚动条滚动到低
element.scrollHeight - element.scrollTop == element.clientHeight

## 事件冒泡
阻止事件冒泡方法
* IE:event.cancelBubble = true
* w3c:event.stopPropagation()

# onclick()
无法为一个元素绑定多个onclick()事件，前一个onclick()事件会被后一个覆盖

## addEventListener()
参数：
1. 事件的字符串，click不要on
2. 回调函数，当事件触发时该函数会被调用
3. 是否在捕获阶段触发事件，需要一个布尔值，一般都传false

使用addEventListener()可以同时为一个元素的相同事件同时绑定多个响应函数

这样当事件被触发时，响应函数将会被按照函数的绑定顺序执行

:::tip
IE8及以下不支持addEventListener()
:::

可以使用attachEvent()

参数：
1.事件的字符串，onclick要on
2. 回调函数

这个方法也可以同时为一个元素绑定多个函数

不同的是它是后绑定先执行，执行顺序与addEventListener()相反

兼容方法：自定义一个函数进行兼容
```js
function bind(obj, eventStr, callback) {
  if(obj.addEventListener){
    obj.addEventListener(eventStr, callback, false);
  }else {
    obj.attachEvent("on"+eventStr, function() {
      callback.call(obj)
    })
  }
}
```

W3C将事件传播分成了三个阶段

1.捕获阶段
* 在捕获阶段时从最外层的祖先元素，向目标元素进行事件的捕获，但是默认此时不会触发事件

2.目标阶段
* 事件捕获到目标元素，捕获结束开始在目标元素上触发事件

3.冒泡阶段
  * 事件从目标元素向外的祖先元素传递，依次触发祖先元素上的事件