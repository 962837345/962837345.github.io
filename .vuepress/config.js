module.exports = {
  "title": "渝心",
  "description": "心之所向，身之所行",
  "dest": "public",
  "base": "/yuxinbuhui/",
  "head": [
    [
      "link",
      {
        "rel": "icon",
        "href": "/portrait.jpg"
      }
    ],
    [
      "meta",
      {
        "name": "viewport",
        "content": "width=device-width,initial-scale=1,user-scalable=no"
      }
    ]
  ],
  "theme": "reco",
  "themeConfig": {
    "subSidebar": 'auto', //在所有页面中启用自动生成子侧边栏，原 sidebar 仍然兼容
    "nav": [{
      "text": "Home",
      "link": "/",
      "icon": "reco-home"
    },
    {
      "text": "Project",
      "icon": "reco-message",
      "items": [{
        "text": "蘑菇商城",
        "link": "http://120.25.234.110"
      },
      {
        "text": "硅谷直聘",
        "link": "/blogs/project/硅谷直聘.md"
      },
      {
        "text": "keep记账本",
        "link": "/blogs/project/keep记账本.md"
      }
      ]
    },
    {
      "text": "TimeLine",
      "link": "/timeline/",
      "icon": "reco-date"
    },
    {
      "text": "Contact",
      "icon": "reco-message",
      "items": [{
        "text": "GitHub",
        "link": "https://github.com/962837345",
        "icon": "reco-github"
      },
      {
        "text": "Gitee",
        "link": "https://gitee.com/yuxinbuhui",
        "icon": "reco-mayun"
      }
      ]
    }
    ],
    "sidebar": {
      "/docs/": [{
        "title": "Vue",
        "children": [
          "vue/v-model的使用及实现原理",
          "vue/v-show和v-if的区别",
          "vue/vue-router的使用",
          "vue/vue中的通信",
          "vue/vuex的使用",
          "vue/axios的使用",
          "vue/vue的响应式原理",
          "vue/DOM和虚拟DOM的区别",
          "vue/diff算法"
        ]
      },
      {
        "title": "React",
        "children": [
          "react/react基础",
          "react/组件间的通信",
          "react/react生命周期",
          "react/react-router的基本使用",
          "react/使用antd",
          "react/redux"
        ]
      },
      {
        "title": "Applet",
        "children": [
          "applet/微信小程序this.setData注意事项"
        ]
      },
      {
        "title": "Python",
        "children": [
          "python/python的基本数据类型",
          "python/python的基本方法",
          "python/输入和输出",
          "python/列表推导式",
          "python/File",
          "python/魔法函数",
          "python/深入类和对象",
          "python/自定义序列类",
          "python/深入python的set和dict",
          "python/对象引用、可变性和垃圾回收",
          "python/元类编程",
          "python/迭代器和生成器",
          "python/多线程、多进程和线程池编程",
          "python/namedtuple",
          "python/函数的参数"
        ]
      },
      {
        "title": "ES6",
        "children": [
          "es6/Promise的使用",
          "es6/let和const",
          "es6/解构",
          "es6/Object.assign的使用",
          "es6/Proxy",
          "es6/Reflect",
          "es6/Symbol的使用",
          "es6/ES6扩展"
        ]
      },
      {
        "title": "HTML",
        "children": [
          "html/html基础",
          "html/SEO优化",
          "html/html前端面试题",
          "html/浏览器渲染过程",
          "html/强缓存和协商缓存",
          "html/多页面应用跨页面通信",
          "html/跨域",
          "html/前端安全",
          "html/Session和Cookie和Token"
        ]
      },
      {
        "title": "JS",
        "children": [
          "js/JS执行上下文和作用域",
          "js/JS的关键字",
          "js/原型对象",
          "js/JS中的栈和堆",
          "js/JS类型转换",
          "js/数组的方法",
          "js/数组去重",
          "js/JS中的call()和apply()",
          "js/arguments",
          "js/DOM",
          "js/拖拽",
          "js/BOM",
          "js/防抖和节流",
          "js/严格模式",
          "js/闭包",
          "js/浅拷贝和深拷贝",
          "js/手写实现find、filter、reduce等数组方法",
          "js/事件委托原理及实现",
          "js/排序算法",
          "js/判断是否通过new调用构造函数",
          "js/new操作符做了什么",
          "js/数组扁平化",
          "js/继承",
          "js/实用的js函数"
        ]
      },
      {
        "title": "CSS",
        "children": [
          "css/css基础",
          "css/flex布局",
          "css/css动画",
          "css/CSS3渐变",
          "css/BFC",
          "css/css面试题",
          "css/css盒模型"
        ]
      },
      {
        "title": "网络",
        "children": [
          "network/三次握手四次挥手",
          "network/TCP与UDP",
          "network/http和https",
          "network/流量控制和拥塞控制"
        ]
      },
      {
        "title": "webpack",
        "children": [
          "webpack/webpack的基本配置",
          "webpack/webpack中loader和plugin的区别"
        ]
      },
      {
        "title": "Components",
        "children": [
          "components/better-scroll的使用与封装",
          "components/轮播图的实现与封装",
          "components/折叠面板的实现与封装"
        ]
      }
      ]
    },
    "type": "blog",
    "blogConfig": {
      "category": {
        "location": 2,
        "text": "Category"
      },
      "tag": {
        "location": 3,
        "text": "Tag"
      }
    },
    "friendLink": [{
      "title": "午后南杂",
      "desc": "Enjoy when you can, and endure when you must.",
      "email": "1156743527@qq.com",
      "link": "https://www.recoluan.com"
    },
    {
      "title": "vuepress-theme-reco",
      "desc": "A simple and beautiful vuepress Blog & Doc theme.",
      "avatar": "https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png",
      "link": "https://vuepress-theme-reco.recoluan.com"
    }
    ],
    "logo": "/portrait.jpg",
    "search": true,
    "searchMaxSuggestions": 10,
    "lastUpdated": "Last Updated",
    "author": "kellen",
    "authorAvatar": "/portrait.jpg",
    "record": null,
    "startYear": "2020",
    "valineConfig": {
      "appId": 'vuKAlEHhQT9IpA3PNgWR8YT7-gzGzoHsz',
      "appKey": 'QNvp8Muda64iV3RpUjBXvgch',
      "visitor": true,
    }
  },
  "markdown": {
    "lineNumbers": true
  },
};