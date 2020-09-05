(window.webpackJsonp=window.webpackJsonp||[]).push([[42],{537:function(e,a,t){"use strict";t.r(a);var v=t(4),_=Object(v.a)({},(function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("p",[e._v("缓存的优点：")]),e._v(" "),t("ol",[t("li",[e._v("减少了不必要的数据传输，节省带宽")]),e._v(" "),t("li",[e._v("减少服务器的负担，提高网站性能")]),e._v(" "),t("li",[e._v("加快了客户端加载页面的速度")]),e._v(" "),t("li",[e._v("用户体验友好\n缺点：")])]),e._v(" "),t("ul",[t("li",[e._v("资源如果有更改但是客户端不及时更新会造成用户获取信息滞后")])]),e._v(" "),t("h2",{attrs:{id:"强缓存"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#强缓存"}},[e._v("#")]),e._v(" 强缓存")]),e._v(" "),t("p",[e._v("当浏览器去请求某个文件的时候，服务端就在response header里面对该文件做了缓存设置。缓存的时间、缓存类型都由服务端控制")]),e._v(" "),t("p",[e._v("具体表现为response header的cache-control，常见的设置是max-age、public、private、immutable、no-cache、no-store")]),e._v(" "),t("ol",[t("li",[t("p",[e._v("cache-control：max-age=xxx，public")]),e._v(" "),t("ul",[t("li",[e._v("客户端和代理服务器都可以缓存该资源")]),e._v(" "),t("li",[e._v("客户端在xxx秒的有效期内，如果有请求该资源的需求的话就直接读取缓存，status code：200")]),e._v(" "),t("li",[e._v("如果用户做了刷新操作，就向服务器发送http请求")])])]),e._v(" "),t("li",[t("p",[e._v("cache-control：max-age=xxx，private")]),e._v(" "),t("ul",[t("li",[e._v("只让客户端可以缓存该资源，代理服务器不缓存")]),e._v(" "),t("li",[e._v("客户端在xxx秒内直接读取缓存，status code：200")])])]),e._v(" "),t("li",[t("p",[e._v("cache-control：max-age=xxx，immutable")]),e._v(" "),t("ul",[t("li",[e._v("客户端在xxx秒的有效期内，如果有请求该资源的需求的话就直接读取缓存，status code：200")]),e._v(" "),t("li",[e._v("即使用户做了刷新操作，也不向服务器发起http请求")])])]),e._v(" "),t("li",[t("p",[e._v("cache-control：no-cache")]),e._v(" "),t("ul",[t("li",[e._v("跳过设置强缓存，但是不妨碍设置协商缓存，一般如果做了强缓存，只有在强缓存失效了才走协商缓存，设置了no-cache就不会走强缓存了，每次请求都会询问服务端")])])]),e._v(" "),t("li",[t("p",[e._v("cache-control：no-store")]),e._v(" "),t("ul",[t("li",[e._v("不缓存，这个会让客户端、服务端都不缓存，也就没有所谓的强缓存、协商缓存了")])])])]),e._v(" "),t("h2",{attrs:{id:"协商缓存"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#协商缓存"}},[e._v("#")]),e._v(" 协商缓存")]),e._v(" "),t("p",[e._v("上面说到的强缓存就是给资源设置个过期时间，客户端每次请求资源时都会看是否过期；只有在过期才会去询问服务器。所以，强缓存就是为了给客户端自给自足用的。当某天，客户端请求该资源时发现其过期了，这时就会去请求服务器了，而这时候去请求服务器的过程就可以设置协商缓存。这时候，协商缓存就是需要客户端和服务器两端进行交互的")]),e._v(" "),t("h3",{attrs:{id:"怎么设置协商缓存？"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#怎么设置协商缓存？"}},[e._v("#")]),e._v(" 怎么设置协商缓存？")]),e._v(" "),t("p",[e._v("在response header里面设置")]),e._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("etag: '5c20abbd-e2e8'\nlast-modified: Mon, 24 Dec 2018 09:49:49 GMT\n")])]),e._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[e._v("1")]),t("br"),t("span",{staticClass:"line-number"},[e._v("2")]),t("br")])]),t("p",[e._v("etag：每个文件有一个，改动文件了就变了，就是个文件hash，每个文件唯一")]),e._v(" "),t("p",[e._v("last-modified：文件的修改时间，精确到秒")]),e._v(" "),t("p",[e._v("也就是说，每次请求返回回来response header中的etag和last-modified，在下次请求时在request header把这两个带上，服务端把\n带过来的标识进行对比，然后判断资源是否更改了，如果更改就直接返回新的资源，和更新对应的response header的标识etag、last-modified。\n如果资源没有变，那就不变etag、last-modified，客户端用缓存的老资源")]),e._v(" "),t("p",[e._v("协商缓存步骤总结：")]),e._v(" "),t("ul",[t("li",[e._v("请求资源时，把用户本地该资源的etag同时带到服务器，服务器和最新资源做对比")]),e._v(" "),t("li",[e._v("如果资源没更改，返回304，浏览器读取本地缓存")]),e._v(" "),t("li",[e._v("如果资源有更改，返回200，返回最新的资源")])]),e._v(" "),t("h3",{attrs:{id:"为什么要有etag？"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#为什么要有etag？"}},[e._v("#")]),e._v(" 为什么要有etag？")]),e._v(" "),t("p",[e._v("etag是为了解决last-modified的缺点")]),e._v(" "),t("ol",[t("li",[e._v("一些文件也许会周期性更改，但是它的内容并不改变（仅仅改变修改时间），这个时候我们并不希望客户端认为这个文件被修改了，而重新get")]),e._v(" "),t("li",[e._v("某些文件修改非常频繁，比如在秒以下的时间内进行修改，if-modified-since能检查到的粒度是秒级的，这种修改无法判断")]),e._v(" "),t("li",[e._v("某些服务器不能精确地得到文件的最后修改时间")])])])}),[],!1,null,null,null);a.default=_.exports}}]);