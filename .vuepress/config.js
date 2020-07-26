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
    "nav": [
      {
        "text": "Home",
        "link": "/",
        "icon": "reco-home"
      },
      {
        "text": "Project",
        "icon": "reco-message",
        "items": [
          {
            "text": "蘑菇商城",
            "link": "http://120.25.234.110"
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
        "items": [
          {
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
      "/docs/": [
        {
          "title": "Vue",
          "children": [
            "vue/v-model的使用及实现原理",
            "vue/v-show和v-if的区别",
            "vue/vue-router的使用",
            "vue/vue中的通信",
            "vue/vuex的使用",
            "vue/vue的响应式原理"
          ]
        },
        {
          "title": "ES6",
          "children": [
            "es6/Promise的使用",
            "es6/axios的使用",
            "es6/let和const"
          ]
        },
        {
          "title": "JS",
          "children": [
            "js/JS作用域",
            "js/JS的关键字",
            "js/原型对象",
            "js/JS中的栈和堆",
            "js/数组的方法",
            "js/JavaScript高阶函数的使用",
            "js/JS中的call()和apply()",
            "js/arguments",
            "js/DOM",
            "js/拖拽",
            "js/BOM",
            "js/防抖和节流",
          ]
        },
        {
          "title": "CSS",
          "children": [
            "css/flex布局",
            "css/css动画",
            "css/渐变背景动画"
          ]
        },
        {
          "title": "webpack",
          "children": [
            "webpack/webpack的基本配置"
          ]
        },
        {
          "title": "Components",
          "children": [
            "components/better-scroll的使用与封装"
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
    "friendLink": [
      {
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