(window.webpackJsonp=window.webpackJsonp||[]).push([[32],{528:function(i,v,l){"use strict";l.r(v);var t=l(4),_=Object(t.a)({},(function(){var i=this,v=i.$createElement,l=i._self._c||v;return l("ContentSlotsDistributor",{attrs:{"slot-key":i.$parent.slotKey}},[l("h2",{attrs:{id:"css隐藏元素的方法以及区别"}},[l("a",{staticClass:"header-anchor",attrs:{href:"#css隐藏元素的方法以及区别"}},[i._v("#")]),i._v(" css隐藏元素的方法以及区别")]),i._v(" "),l("ol",[l("li",[l("code",[i._v("display: none;")])]),i._v(" "),l("li",[l("code",[i._v("visibility: hidden;")])]),i._v(" "),l("li",[l("code",[i._v("opacity: 0;")])]),i._v(" "),l("li",[l("code",[i._v("position: absolute;top; -9999px;left: -9999px;")])])]),i._v(" "),l("ul",[l("li",[i._v("设置"),l("code",[i._v("display: none")]),i._v(" "),l("ul",[l("li",[i._v("该元素下面的子元素都会被隐藏，而且不会占据空间")]),i._v(" "),l("li",[i._v("会导致回流和重绘")])])]),i._v(" "),l("li",[i._v("设置"),l("code",[i._v("visibility: hidden")]),i._v(" "),l("ul",[l("li",[i._v("该元素下面的子元素会被隐藏，但是由于visibility具有继承性，\n所以可以对子元素设置"),l("code",[i._v("visibility: visible;")]),i._v("从而达到隐藏父元素，显示子元素的效果，")]),i._v(" "),l("li",[i._v("visibility会占据空间，visibility不会影响计数器的运行，虽然隐藏掉了，但是计数器依然会进行。")]),i._v(" "),l("li",[i._v("visibility只会导致重绘")])])]),i._v(" "),l("li",[i._v("设置"),l("code",[i._v("opacity: 0")]),i._v(" "),l("ul",[l("li",[i._v("设置透明度为0，依然会占据空间，隐藏后也不会改变html原有样式")]),i._v(" "),l("li",[i._v("opacity会被子元素继承，但是不能通过设置子元素的opacity进行反隐藏")]),i._v(" "),l("li",[i._v("依旧可以触发已绑定的事件")])])])])])}),[],!1,null,null,null);v.default=_.exports}}]);