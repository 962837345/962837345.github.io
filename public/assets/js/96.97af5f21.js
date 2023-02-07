(window.webpackJsonp=window.webpackJsonp||[]).push([[96],{608:function(t,e,s){"use strict";s.r(e);var v=s(6),_=Object(v.a)({},(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h2",{attrs:{id:"open-方法"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#open-方法"}},[t._v("#")]),t._v(" "),s("code",[t._v("open()")]),t._v("方法")]),t._v(" "),s("p",[s("code",[t._v("open()")]),t._v("方法用于打开一个文件，并返回文件对象，在对文件进行处理过程都需要使用到这个函数，如果该文件无法被打开，会抛出OSError")]),t._v(" "),s("div",{staticClass:"custom-block tip"},[s("p",{staticClass:"title"}),s("p",[t._v("使用"),s("code",[t._v("open()")]),t._v("方法一定要保证关闭文件对象，即调用"),s("code",[t._v("close()")]),t._v("方法")])]),s("p",[s("code",[t._v("open()")]),t._v("函数常用形式是接收两个参数：文件名(file)和模式(mode)")]),t._v(" "),s("div",{staticClass:"language-py line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-py"}},[s("code",[s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("open")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("file")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" mode "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'r'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br")])]),s("p",[t._v("完整的语法格式为：")]),t._v(" "),s("div",{staticClass:"language-py line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-py"}},[s("code",[s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("open")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("file")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" mode "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'r'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" buffering "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" encoding "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("None")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" errors "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("None")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" newline "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("None")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" closefd "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("True")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" opener "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("None")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br")])]),s("p",[t._v("参数说明:")]),t._v(" "),s("ul",[s("li",[t._v("file：必需，文件路径（相对或绝对路径）")]),t._v(" "),s("li",[t._v("mode：可选，文件打开模式")]),t._v(" "),s("li",[t._v("buffering：设置缓冲")]),t._v(" "),s("li",[t._v("encoding：一般使用utf-8")]),t._v(" "),s("li",[t._v("errors：报错级别")]),t._v(" "),s("li",[t._v("newline：区分换行符")]),t._v(" "),s("li",[t._v("closefd：传入的file参数类型")]),t._v(" "),s("li",[t._v("opener：设置自定义开启器，开启器的返回值必须是一个打开的文件描述符")])]),t._v(" "),s("p",[t._v("mode参数有：")]),t._v(" "),s("table",[s("thead",[s("tr",[s("th",[t._v("模式")]),t._v(" "),s("th",[t._v("描述")])])]),t._v(" "),s("tbody",[s("tr",[s("td",[t._v("t")]),t._v(" "),s("td",[t._v("文本模式（默认）")])]),t._v(" "),s("tr",[s("td",[t._v("x")]),t._v(" "),s("td",[t._v("写模式，新建一个文件，如果该文件已存在则会报错")])]),t._v(" "),s("tr",[s("td",[t._v("b")]),t._v(" "),s("td",[t._v("二进制模式")])]),t._v(" "),s("tr",[s("td",[t._v("+")]),t._v(" "),s("td",[t._v("打开一个文件进行更新（可读可写）")])]),t._v(" "),s("tr",[s("td",[t._v("U")]),t._v(" "),s("td",[t._v("通用换行模式（Python3不支持）")])]),t._v(" "),s("tr",[s("td",[t._v("r")]),t._v(" "),s("td",[t._v("以只读方式打开文件。文件的指针将会放在文件的开头。这是默认的模式")])]),t._v(" "),s("tr",[s("td",[t._v("rb")]),t._v(" "),s("td",[t._v("以二进制格式打开一个文件用于只读。文件指针将会放在文件的开头。这是默认模式。一般用于非文本文件如图片等")])]),t._v(" "),s("tr",[s("td",[t._v("r+")]),t._v(" "),s("td",[t._v("打开一个文件用于读写。文件指针将会放在文件的开头")])]),t._v(" "),s("tr",[s("td",[t._v("rb+")]),t._v(" "),s("td",[t._v("以二进制格式打开一个文件用于读写。文件指针将会放在文件的开头。一般用于非文本文件如图片等")])]),t._v(" "),s("tr",[s("td",[t._v("w")]),t._v(" "),s("td",[t._v("打开一个文件只用于写入。如果该文件已存在则打开文件，并从开头开始编辑，即原因内容会被删除。如果该文件不存在，创建新文件")])]),t._v(" "),s("tr",[s("td",[t._v("wb")]),t._v(" "),s("td",[t._v("以二进制格式打开一个文件只用于写入。如果该文件已存在则打开文件，并从开头开始编辑，即原有内容会被删除。如果该文件不存在，创建新文件。一般用于非文本文件如图片等")])]),t._v(" "),s("tr",[s("td",[t._v("w+")]),t._v(" "),s("td",[t._v("打开一个文件用于读写。如果该文件已存在则打开文件，并从开头开始编辑，即原有内容会被删除。如果该文件不存在，创建新文件")])]),t._v(" "),s("tr",[s("td",[t._v("wb+")]),t._v(" "),s("td",[t._v("以二进制格式打开一个文件用于读写。如果该文件已存在则打开文件，并从开头开始编辑，即原有内容会被删除。如果该文件不存在，创建新文件。一般用于非文本文件如图片等")])]),t._v(" "),s("tr",[s("td",[t._v("a")]),t._v(" "),s("td",[t._v("打开一个文件用于追加。如果该文件已存在，文件指针将会放在文件的结尾。也就是说，新的内容将会被写入到已有内容之后。如果该文件不存在，创建新文件进行写入")])]),t._v(" "),s("tr",[s("td",[t._v("ab")]),t._v(" "),s("td",[t._v("以二进制格式打开一个文件用于追加。如果该文件已存在，文件指针将会放在文件的结尾。也就是说，新的内容将会被写入到已有内容之后。如果该文件不存在，创建新文件进行写入")])]),t._v(" "),s("tr",[s("td",[t._v("a+")]),t._v(" "),s("td",[t._v("打开一个文件用于读写。如果该文件已存在，文件指针将会放在文件的结尾。文件打开时会是追加模式。如果该文件不存在，创建新文件用于读写")])]),t._v(" "),s("tr",[s("td",[t._v("ab+")]),t._v(" "),s("td",[t._v("以二进制格式打开一个文件用于追加。如果该文件已存在，文件指针将会放在文件的结尾。如果该文件不存在，创建新文件用于读写")])])])]),t._v(" "),s("h2",{attrs:{id:"file对象"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#file对象"}},[t._v("#")]),t._v(" file对象")]),t._v(" "),s("p",[t._v("file对象使用open函数来创建，以下为file对象常用的函数：")]),t._v(" "),s("ul",[s("li",[s("code",[t._v("file.close()")]),t._v("：关闭文件。关闭后文件不能再进行读写操作")]),t._v(" "),s("li",[s("code",[t._v("file.flush()")]),t._v("：刷新文件内部缓冲，直接把内部缓冲区的数据立刻写入文件，而不是被动等待输出缓冲区写入")]),t._v(" "),s("li",[s("code",[t._v("file.fileno()")]),t._v("：返回一个整型的文件描述符(file descriptor FD 整型)，可以用在如os模块的read方法等一些底层操作上")]),t._v(" "),s("li",[s("code",[t._v("file.isatty()")]),t._v("：如果文件连接到一个终端设备返回True，否则返回False")]),t._v(" "),s("li",[s("code",[t._v("file.next()")]),t._v("：返回文件的下一行(Python 3中的File对象不支持next()方法)")]),t._v(" "),s("li",[s("code",[t._v("file.read([size])")]),t._v("：从文件读取指定的字节数，如果未给定或负则读取所有")]),t._v(" "),s("li",[s("code",[t._v("file.readline([size])")]),t._v("：读取整行，包括"),s("code",[t._v("\\n")]),t._v("字符")]),t._v(" "),s("li",[s("code",[t._v("file.readlines([sizeint])")]),t._v("：读取所有行并返回列表，若给定sizeint > 0，返回总和大约为sizeint字节的行，实际读取值可能比sizeint较大，因为需要填充缓冲区")]),t._v(" "),s("li",[s("code",[t._v("file.seek(offset[,whence])")]),t._v("：移动文件读取指针到指定位置。offset为开始的偏移量，whence为可选参数，默认为0，代表从文件开头开始算起，1代表从当前位置开始算起，2代表从文件末尾算起")]),t._v(" "),s("li",[s("code",[t._v("file.tell()")]),t._v("：返回文件当前位置")]),t._v(" "),s("li",[s("code",[t._v("file.truncate([size])")]),t._v("：从文件的首行首字符开始截断，截断文件为size字节，无size表示从当前位置截断；截断之后后面的所有字符被删除，其中windows系统下的换行代表2个字符大小")]),t._v(" "),s("li",[s("code",[t._v("file.write(str)")]),t._v("：将字符串写入文件，返回的是写入的字符长度")]),t._v(" "),s("li",[s("code",[t._v("file.writelines(sequence)")]),t._v("：向文件写入一个序列字符串列表，如果需要换行则要字节加入每行的换行符")])])])}),[],!1,null,null,null);e.default=_.exports}}]);