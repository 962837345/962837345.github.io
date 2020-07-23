---
title: webpack的基本配置
date: 2020-07-15
tags:
 - webpack
categories:
 - 前端笔记 
---

### cnpm淘宝镜像安装
```bash
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

### 使用npm安装webpack
```bash
npm install webpack -D
```

### css文件的处理,使用npm安装css-loader
```bash
npm install css-loader -D
npm install style-loader -D
```

### less文件的处理,使用npm安装less-loader
```bash
npm install less-loader -D
```

### 图片文件的处理,使用npm安装url-loader
```bash
npm install url-loader -D
npm install file-loader -D
``` 

### ES6语法处理,使用npm安装babel-loader
```bash
npm install -D babel-loader babel-core babel-preset-es2015
```

### 使用Vue,使用npm安装vue
```bash
npm install vue -D
```

### 处理.vue文件,使用npm安装vue-loader 和 vue-template-compiler
```bash
npm install vue-loader vue-template-compiler -D
```

### 使用npm安装HtmlWebpackPlugin插件
```bash
npm install html-webpack-plugin -D
```

### 搭建本地服务器,使用npm安装webpack-dev-server
```bash
npm install webpack-dev-server@2.9.1 -D
```

### webpack.config.js基本配置
```js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.export{
  entry: './src/main.js'  //文件入口
  output: {
    //__dirname是一个全局变量，保存当前页面所在路径，使用path.resolve()进行路径拼接
    path: path.resolve(__dirname,'dist'),  
    filename: 'bundle.js'， //导出文件名
  },
  module:{
    rules:[
      {
        //配置css-loader
        test: /\.css$/,
        //css-loader只负责将css文件进行加载
        //style-loader负责将样式添加到DOM中
        //使用多个loader时，是从右向左
        use: ['style-loader', 'css-loader']
      },
      {
        //配置less-loader
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        //配置url-loader
        test: /\.(png|jpg|gif|jpeg)$/,
        use:[
          {
            loader: 'url-loader',
            options:{
              //当加载的图片小于limit时，会将图片编译成base64字符串形式
              //当加载的图片大于limit时，需要使用file-loader模块进行加载
              limit: 8192,
              name: 'img/[name].[hash:8].[ext]'
            }，
          }
        ]
      },
      {
        //配置babel-loader
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015']
          }
        }
      },
      {
        //配置vue-loader
        //报错提示需要安装一个插件，可以把vue-loader版本修改为^13.0.0版本
        test: /\.vue$/,
        use: ['vue-loader']
      }
    ]
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue/esm/js'
    },
    //配置省略扩展名
    extensions: ['.js', '.css', '.vue']
  }，
  plugins: {
    new HtmlWebpackPlugin({
      template: 'index.html'
    })
  },
  devServer: {
    //为哪一个文件夹提供本地服务，默认时根文件夹，这里要填写'./dist'
    contentBase: './dist',
    //页面实时刷新
    inline: true
  }
}
```

### ,package.json中的配置修改package.json中的scripts
``` js
"scripts": {
  "build": "webpack",
  "dev": "webpack-dev-server"
}
```

## vue-cli4.0——Webpack配置
### 在根目录创建vue.config.js文件夹
### 配置别名
### 当导入图片等路径需要别名时，在别名前面加个~
```js
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views'
      }
    }
  }
}
```

### 配置scss公共样式
```js
module.exports = {
  chainWebpack: config => {
    const oneOfsMap = config.module.rule('scss').oneOfs.store
    oneOfsMap.forEach(item => {
      item
          .use('sass-resources-loader')
          .loader('sass-resources-loader')
          .options({
            // 要公用的scss的路径
            resources: './src/assets/css/base.scss'
          })
          .end()
    })
  }
}
```
