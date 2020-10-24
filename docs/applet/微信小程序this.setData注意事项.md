---
title: 微信小程序this.setData注意事项
date: 2020-10-24
tags: 
 - 微信小程序
categories:
 - 前端笔记
---

微信小程序中，直接使用this.data.xxx = value 是无法保持数据层和视图层的一致的，而要保持数据层和视图层的一致，需要使用this.setData()方法对视图层进行更新，同时this.data中的数据也会相对应更新

## 使用this.setData()操作数组或对象时的注意事项

我在开发项目时，有这样一个需求，当前有一个数组，数组中的每一项是一个对象(例如:`{value:'',checked: false}`),用于单选框的数据，但是单选框中的数据不是不变的，是可以动态改变的，在进行某个操作后，数据的最后一项要进行更新，即在数组最后一项变为`{value: newValue, checked: true}`

起初我的想法就是直接通过`const { images } = this.data`取出数组作为一个临时变量，在临时变量上面调用splice方法'images.splice(arr.length - 1, 1)'然后再调用push方法'images.push({value:'', checked: false'})',但是发现这样并没有进行更新,原因是因为this.data中取出数组赋给一个临时变量，其地址指向的是同一个地方，所以images改变时，this.data.images也会随之改变,而且这种一次性取出整个数组内容，然后进行修改后再this.setData()回去效率较低，尤其是在数据太大的时候，会严重影响性能

### 使用this.setData()改变对象某个属性时
例如改变{value: '', checked: false}
```js
this.setData({
  ['obj.value']: 'i am newValue', //属性名要使用字符串
  ['obj.checked']: true
})
```

### 使用this.setData()改变数组中某个元素或对象属性
```js
  const { images } = this.data
  const imgLength = images.length
  this.setData({
    ['images[' + (imgLength - 1) + '].value']: 'newValue',
    ['images[' + (imgLength - 1) + '].checked']: true
  })
```

或者使用模板字符串写法
```js
  const { images } = this.data
  const imgLength = images.length
  this.setData({
    [`images[${imgLength - 1}].value`]: 'newValue',
    [`images[${imgLength - 1}].checked`]: true
  })
```