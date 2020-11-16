(window.webpackJsonp=window.webpackJsonp||[]).push([[42],{539:function(t,v,i){"use strict";i.r(v);var _=i(4),e=Object(_.a)({},(function(){var t=this,v=t.$createElement,i=t._self._c||v;return i("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[i("h2",{attrs:{id:"页面导入样式时，使用link和-import有什么区别"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#页面导入样式时，使用link和-import有什么区别"}},[t._v("#")]),t._v(" 页面导入样式时，使用link和@import有什么区别?")]),t._v(" "),i("ol",[i("li",[t._v("本质的差别：link属于XHTML标签，而@import完全是CSS提供的一种方式")]),t._v(" "),i("li",[t._v("加载顺序的差别：当一个页面被加载的时候，link引用的CSS会同时被加载，而@import引用的CSS会等到页面\n全部被下载再被加载。所以有时候浏览器@import加载CSS的页面时开始会没有样式，出现闪烁，网速慢的时候会很明显")]),t._v(" "),i("li",[t._v("兼容性的差别：@import是CSS2.1提出的，所以老的浏览器不支持，@import只有在IE5以上才能识别，而link标签无此问题")]),t._v(" "),i("li",[t._v("使用dom控制样式的差别：当使用js控制dom改变样式时，只能使用link标签，因为@import不是dom可以控制的")])]),t._v(" "),i("h2",{attrs:{id:"请简述xmlhttprequest、jsonp的适用场景，并针对两种请求形式简述如何检测请求错误"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#请简述xmlhttprequest、jsonp的适用场景，并针对两种请求形式简述如何检测请求错误"}},[t._v("#")]),t._v(" 请简述XMLHttpRequest、JSONP的适用场景，并针对两种请求形式简述如何检测请求错误")]),t._v(" "),i("ol",[i("li",[t._v("XMLHttpRequest用于浏览器端与服务器端异步请求数据从而实现对页面的无刷新修改，支持GET/POST请求，一般用于非跨域的场景。如果需要使用XMLHttpRequest跨域请求数据，需要通过CORS头支持。 JSONP用于跨域请求数据的场景，只支持GET请求。")]),t._v(" "),i("li",[t._v("XMLHttpRequest异常判断一般通过该对象的readystate和http状态码status来判断，JSONP的异常判断一般是onerror事件和超时timer来判断。")])]),t._v(" "),i("h2",{attrs:{id:"xmlhttprequest中readystate的5种值"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#xmlhttprequest中readystate的5种值"}},[t._v("#")]),t._v(" XMLHttpRequest中readystate的5种值")]),t._v(" "),i("ul",[i("li",[t._v("0 ：（未初始化）（XMLHttpRequest）对象已创建，但是没有调用open()方法")]),t._v(" "),i("li",[t._v("1 ：（载入）已经调用了open()方法，但是没有发送请求")]),t._v(" "),i("li",[t._v("2 ：（载入完成）请求已发送完成")]),t._v(" "),i("li",[t._v("3 ：（交互）可以接收到部分响应数据")]),t._v(" "),i("li",[t._v("4 ：（完成）已经接收到全部数据，并且连接已关闭")])]),t._v(" "),i("h2",{attrs:{id:"浏览器渲染过程"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#浏览器渲染过程"}},[t._v("#")]),t._v(" 浏览器渲染过程")]),t._v(" "),i("p",[t._v("1.构建DOM树")]),t._v(" "),i("p",[t._v("当浏览器客户端从服务器那里接收到HTML文档后，就会遍历文档节点然后生成DOM树，DOM树结构和HTML标签一一对应")]),t._v(" "),i("div",{staticClass:"custom-block tip"},[i("ul",[i("li",[t._v("DOM树在构建过程中可能会被CSS和JS的加载而执行阻塞")]),t._v(" "),i("li",[t._v("display：none的元素也会在DOM树中")]),t._v(" "),i("li",[t._v("注释也会在DOM树中")]),t._v(" "),i("li",[t._v("script标签会在DOM树中")])])]),t._v(" "),i("p",[t._v("2.CSS解析")]),t._v(" "),i("p",[t._v("浏览器会解析CSS文件并生成CSS规则树，在过程中，每个CSS文件都会被分析成StyleSheet对象，每个对象都包括CSS规则，\nCSS规则对象包括对应的选择器和声明对象以及其他对象")]),t._v(" "),i("div",{staticClass:"custom-block tip"},[i("ul",[i("li",[t._v("CSS解析可以与DOM解析同进行")]),t._v(" "),i("li",[t._v("CSS解析与script的执行互斥")]),t._v(" "),i("li",[t._v("在Webkit内核中进行了script执行优化，只有在JS访问CSS时才会发生互斥")])])]),t._v(" "),i("p",[t._v("3.构建渲染树（Render tree）")]),t._v(" "),i("p",[t._v("通过DOM树和CSS规则树，浏览器就可以通过它两构建渲染树了。浏览器会先从DOM树的根节点开始遍历每个可见节点，然后对每个可见节点找到适配的CSS样式规则并应用")]),t._v(" "),i("div",{staticClass:"custom-block tip"},[i("ul",[i("li",[t._v("渲染树和DOM树不完全对应")]),t._v(" "),i("li",[t._v("display：none的元素不在渲染树中")]),t._v(" "),i("li",[t._v("visibility：hidden的元素在渲染树中")])])]),t._v(" "),i("p",[t._v("4.渲染树布局")]),t._v(" "),i("p",[t._v("布局阶段会从渲染树的根节点开始遍历，由于渲染树每个节点都是一个Render Object对象，包含宽高，位置，背景色等样式\n信息。所以浏览器就可以通过这些样式信息来确定每个节点对象在页面上的确切大小和位置，布局阶段的输出就是我们常说的\n盒子模型，它会精确地捕获每个元素在屏幕内的确切位置和大小")]),t._v(" "),i("div",{staticClass:"custom-block tip"},[i("ul",[i("li",[t._v("float元素、absolute元素、fixed元素会发生位置偏移")]),t._v(" "),i("li",[t._v("我们常说的脱离文档流，其实就是脱离Render Tree")])])]),t._v(" "),i("p",[t._v("5.渲染树绘制")]),t._v(" "),i("p",[t._v("在绘制阶段，浏览器会遍历渲染树，调用渲染器的paint()方法在屏幕上显示其内容。渲染树的绘制工作是由浏览器的UI后端组件完成的")]),t._v(" "),i("h3",{attrs:{id:"阻塞渲染的两种情况"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#阻塞渲染的两种情况"}},[t._v("#")]),t._v(" 阻塞渲染的两种情况")]),t._v(" "),i("p",[t._v("当HTML解析器被脚本阻塞时，解析器虽然会停止构建DOM，但仍然会辨识该脚本后面的资源，并进行预加载")]),t._v(" "),i("ul",[i("li",[t._v("JS不仅可以读取和修改DOM属性，还可以读取和修改CSSOM属性，因此CSS解析与script的执行互斥，这就导致了浏览器在遇到\nscript标签时，DOM构建将暂停，直至脚本完成执行，然后继续构建DOM。如果脚本是外部的，会等待脚本下载完毕，在继续解析\n文档,这就是JS阻塞页面。")])]),t._v(" "),i("div",{staticClass:"custom-block tip"},[i("ul",[i("li",[i("p",[t._v("可以在script标签上增加defer或者async属性，脚本解析会将脚本中改变DOM和CSS的地方分别解析出来，追加到DOM树和CSSOM\n规则树上")])]),t._v(" "),i("li",[i("p",[t._v("多个defer会按照声明顺序加载，defer会在DOMContentLoaded之前执行")])]),t._v(" "),i("li",[i("p",[t._v("多个async不会按照声明顺序加载并执行")])])])]),t._v(" "),i("ul",[i("li",[t._v("由于CSSOM负责存储渲染信息，浏览器就必须保证在合成渲染树之前，CSSOM是完备的，这种完备是指所有的CSS（内联、内部和外部）都已经下载完，并解析完。只有CSSOM和DOM解析完全结束，浏览器才会进入下一步的渲染，这就是CSS阻塞渲染")])])])}),[],!1,null,null,null);v.default=e.exports}}]);