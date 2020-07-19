---
title: axios的使用
data: 2020-07-16
tags:
  - vue
  - ES6
categories:
  - 前端笔记 
---

### axios实例和模块封装
使用axios实例而不是使用axios全局对象可以方便以后扩展使用不同ip地址

对axios进行模块封装可以使得更方便维护
:::tip
在request.js中对axios进行实例化和封装
:::
```js
import axios from 'axios'

export function request(config) {
  //创建axios实例
  const instance = axios.create({
    baseURL: 'http://123.207.32.32:8000',
    timeout: 5000
  })

  return instance(config)
}
```

```vue
<el-button @click="buttonClick">发送请求</el-button>

<script>
  import {request} from "../network/request";

  export default {
    name: "Axios",
    methods: {
      buttonClick() {
        request({
          url: 'home/multidata'
        }).then(res => {
          console.log(res);
        }).catch(err => {
          console.log(err);
        })
      }
    }
  }
</script>
```

### axios拦截器
```js
  //请求拦截
  instance.interceptors.request.use(config => {
    // 1.config中的一些信息不符合服务器的要求

    // 2.每次发送网络请求时，都希望在界面中显示一个请求的图标

    // 3.某些网络请求（登录（token）），必须携带一些特殊的信息
    return config
  },err => {
    console.log(err);
  });

  //响应拦截
  instance.interceptors.response.use(res => {
    // 只返回data，不返回额外附加的一些属性
    return res.data
  },err => {
    console.log(err);
  });
```