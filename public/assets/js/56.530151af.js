(window.webpackJsonp=window.webpackJsonp||[]).push([[56],{569:function(t,v,a){"use strict";a.r(v);var l=a(6),i=Object(l.a)({},(function(){var t=this,v=t.$createElement,a=t._self._c||v;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h2",{attrs:{id:"bom"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#bom"}},[t._v("#")]),t._v(" BOM")]),t._v(" "),a("ul",[a("li",[t._v("浏览器对象模型")]),t._v(" "),a("li",[t._v("BOM可以使我们通过JS来操作浏览器")]),t._v(" "),a("li",[t._v("在BOM中为我们提供了一组对象，用来完成对浏览器的操作")]),t._v(" "),a("li",[t._v("BOM对象\n"),a("ul",[a("li",[t._v("Window\n"),a("ul",[a("li",[t._v("代表的使整个浏览器的窗口，同时Window也是网页中的全局对象")])])]),t._v(" "),a("li",[t._v("Navigator\n"),a("ul",[a("li",[t._v("代表的当前浏览器的信息，通过该对象可以来识别不同的浏览器")])])]),t._v(" "),a("li",[t._v("Location\n"),a("ul",[a("li",[t._v("代表当前浏览器的地址栏信息，通过Location可以获取地址栏信息，或者操作浏览器跳转页面")])])]),t._v(" "),a("li",[t._v("History\n"),a("ul",[a("li",[t._v("代表浏览器的历史记录，可以通过该对象来操作浏览器的历史记录\n"),a("ul",[a("li",[t._v("由于隐私原因，该对象不能获取到具体的历史记录，只能操作浏览器向前或向后翻页")]),t._v(" "),a("li",[t._v("而且该操作只在当次访问时有效")])])])])]),t._v(" "),a("li",[t._v("Screen\n"),a("ul",[a("li",[t._v("代表用户的屏幕的信息，通过该对象可以获取到用户显示器的相关的信息")])])])])])]),t._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"title"}),a("ul",[a("li",[t._v("这些BOM对象在浏览器中都是作为window对象的属性保存的")]),t._v(" "),a("li",[t._v("可以通过window对象来使用，也可以直接使用")])])]),a("h2",{attrs:{id:"navigator"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#navigator"}},[t._v("#")]),t._v(" Navigator")]),t._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"title"}),a("ul",[a("li",[t._v("代表的当前浏览器的信息，通过该对象可以来识别不同的浏览器")]),t._v(" "),a("li",[t._v("由于历史原因，Navigator对象中的大部分属性都已经不能帮助我们识别浏览器了")]),t._v(" "),a("li",[t._v("一般我们只会使用userAgent来判断浏览器的信息\n"),a("ul",[a("li",[t._v("userAgent是一个字符串，这个字符串中包含有用来描述浏览器信息的内容")]),t._v(" "),a("li",[t._v("不同的浏览器会议不同的userAgent")])])])])]),a("h2",{attrs:{id:"history"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#history"}},[t._v("#")]),t._v(" History")]),t._v(" "),a("ul",[a("li",[t._v("length\n"),a("ul",[a("li",[t._v("获取当前访问的链接数量")])])]),t._v(" "),a("li",[t._v("back()\n"),a("ul",[a("li",[t._v("用来回退到上个页面，作用和浏览器的回退按钮一样")])])]),t._v(" "),a("li",[t._v("forward()\n"),a("ul",[a("li",[t._v("可以跳转下一个页面，作用和浏览器的前进按钮一样")])])]),t._v(" "),a("li",[t._v("go()")]),t._v(" "),a("li",[t._v("它需要一个整数作为参数\n"),a("ul",[a("li",[t._v("1：表示向前跳转一个页面，相当于forward()")]),t._v(" "),a("li",[t._v("2：表示向前跳转两个页面")]),t._v(" "),a("li",[t._v("-1：表示向后跳转一个页面，相当于back()")]),t._v(" "),a("li",[t._v("-2:表示向后跳转两个页面")])])])]),t._v(" "),a("h2",{attrs:{id:"location"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#location"}},[t._v("#")]),t._v(" Location")]),t._v(" "),a("p",[t._v("如果直接打印location，则可以获取到地址栏的信息(当前页面的完整路径)")]),t._v(" "),a("p",[t._v("如果直接将location属性修改为一个完整的路径，或相对路径")]),t._v(" "),a("p",[t._v("则我们页面会自动跳转到该路径，并且生成相应的历史记录")]),t._v(" "),a("h3",{attrs:{id:"assign"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#assign"}},[t._v("#")]),t._v(" assign")]),t._v(" "),a("p",[t._v("用来跳转到其它页面，作用和直接修改location一样")]),t._v(" "),a("h3",{attrs:{id:"reload"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#reload"}},[t._v("#")]),t._v(" reload()")]),t._v(" "),a("ul",[a("li",[t._v("用于重新加载当前页面，作用和按钮刷新一样")]),t._v(" "),a("li",[t._v("如果在方法中传递一个true，作为参数，则会强制清空缓存并刷新页面")])]),t._v(" "),a("h3",{attrs:{id:"replace"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#replace"}},[t._v("#")]),t._v(" replace()")]),t._v(" "),a("ul",[a("li",[t._v("可以使用一个新的页面替换当前页，调用完毕也会跳转页面")]),t._v(" "),a("li",[t._v("不会生成历史记录，不能使用回退按钮")])])])}),[],!1,null,null,null);v.default=i.exports}}]);