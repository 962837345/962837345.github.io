(window.webpackJsonp=window.webpackJsonp||[]).push([[104],{617:function(v,_,t){"use strict";t.r(_);var e=t(6),s=Object(e.a)({},(function(){var v=this,_=v.$createElement,t=v._self._c||_;return t("ContentSlotsDistributor",{attrs:{"slot-key":v.$parent.slotKey}},[t("ol",[t("li",[v._v("序列号seq：用来标记数据段的顺序，TCP把连接中发送的所有数据字节都编上一个序号，第一个字节的编号由本地随机产生；给字节编上序号后，就给每一个报文段指派一个序号；序列号seq就是这个报文段中的第一个字节的数据编号")]),v._v(" "),t("li",[v._v("确认号ack：期待收到对方下一个报文段的第一个数据字节的序号；当前报文段最后一个字节的编号+1即为确认号")]),v._v(" "),t("li",[v._v("确认ACK：仅当ACK=1时，确认号字段才有效。ACK=0时，确认号无效")]),v._v(" "),t("li",[v._v("同步SYN：连接建立时用于同步序号。当SYN=1，ACK=0时表示：这是一个连接请求报文段。若同意连接，则在响应报文段使得SYN=1，ACK=1.因此，SYN=1表示这是一个连接请求，或连接接受报文。SYN这个标志位只有在TCP建立连接时才会被置1，握手完成后SYN标志位被置0")]),v._v(" "),t("li",[v._v("终止FIN：用来释放一个连接。FIN=1表示：此报文段的发送方的数据已经发送完毕，并要求释放运输连接")])]),v._v(" "),t("div",{staticClass:"custom-block tip"},[t("p",{staticClass:"title"}),t("p",[v._v("ACK、SYN、和FIN这些大写的单词表示标记位，其值要么是1，要么是0；ack、seq小写的单词表示序号")])]),t("h3",{attrs:{id:"三次握手"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#三次握手"}},[v._v("#")]),v._v(" 三次握手")]),v._v(" "),t("img",{staticStyle:{height:"300px"},attrs:{src:v.$withBase("/http/threeHand.png"),alt:"三次握手"}}),v._v(" "),t("p",[t("strong",[v._v("第一次握手")]),v._v("：")]),v._v(" "),t("ul",[t("li",[v._v("标记位为SYN，表示“请求建立新连接”")]),v._v(" "),t("li",[v._v("序列号seq = x （x一般为1）")]),v._v(" "),t("li",[v._v("随后客户端进入SYN-SENT阶段，等待服务器端确认")])]),v._v(" "),t("p",[t("strong",[v._v("第二次握手")]),v._v("：")]),v._v(" "),t("ul",[t("li",[v._v("标记位SYN = 1和ACK = 1，表示“确认客户端的报文seq序号有效，服务器能正常接收客户端发送的数据，并同意创建新连接”（即告诉客户端，服务器收到了你的数据）")]),v._v(" "),t("li",[v._v("序列号seq = y")]),v._v(" "),t("li",[v._v("确认号ack = x + 1，表示收到客户端的序号seq并将其值加1作为自己确认号seq的值，随后服务器端进入SYN-RCVD阶段")])]),v._v(" "),t("p",[t("strong",[v._v("第三次握手")]),v._v("：")]),v._v(" "),t("ul",[t("li",[v._v("标记位ACK = 1，表示“确认收到服务器端同意连接的信号”（即告诉服务器，我知道你收到我发的数据了）")]),v._v(" "),t("li",[v._v("序列号seq = x + 1，表示收到服务器端的确认号ack，并将其值作为自己的序列号值")]),v._v(" "),t("li",[v._v("确认号ack = y + 1，表示收到服务器端序号seq，并将其值加1作为自己的确认号ack的值")]),v._v(" "),t("li",[v._v("随后客户端进入ESTABLISHED阶段")])]),v._v(" "),t("p",[v._v("服务器收到来自客户端的“确认收到服务器数据”的TCP报文之后，明确了从服务器到客户端的数据传输时正常的。结束SYN-SEND阶段，进入ESTABLISHED阶段")]),v._v(" "),t("h3",{attrs:{id:"四次挥手"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#四次挥手"}},[v._v("#")]),v._v(" 四次挥手")]),v._v(" "),t("img",{staticStyle:{height:"300px"},attrs:{src:v.$withBase("/http/fourHand.png"),alt:"四次挥手"}}),v._v(" "),t("p",[t("strong",[v._v("第一次挥手")]),v._v("：")]),v._v(" "),t("p",[v._v("首先客户端想要释放连接，其中：")]),v._v(" "),t("ul",[t("li",[v._v("标记位为FIN = 1，表示“请求释放连接”")]),v._v(" "),t("li",[v._v("序列号为seq = u")]),v._v(" "),t("li",[v._v("随后客户端进入FIN-WAIT-1阶段，即半关闭状态。并且停止在客户端到服务器端方面上发送数据，但是客户端仍然能接收到服务器端传输过来的数据")])]),v._v(" "),t("div",{staticClass:"custom-block tip"},[t("p",{staticClass:"title"}),t("p",[v._v("这里不发送的是正常连接时传输的数据，而不是一切数据，所以客户端仍然能发送ACK确认报文")])]),t("p",[t("strong",[v._v("第二次挥手")]),v._v("：")]),v._v(" "),t("p",[v._v("服务器端接收到从客户端发出的TCP报文之后，确认了客户端想要释放连接，随后服务器端结束ESTABLISHED阶段，进入CLOSE-WAIT阶段（半关闭状态）并返回一段TCP报文，其中：")]),v._v(" "),t("ul",[t("li",[v._v("标记位ACK = 1，表示“接收到客户端发送的释放连接的请求”")]),v._v(" "),t("li",[v._v("序列号seq = v")]),v._v(" "),t("li",[v._v("确认号为ack = u + 1，表示是在收到客户端报文的基础上，将其序列号seq值加1作为本段报文确认号ack的值")]),v._v(" "),t("li",[v._v("随后服务器端开始准备释放服务器端到客户端方向上的连接")])]),v._v(" "),t("p",[v._v("客户端收到服务器端发出的TCP报文之后，确认了服务器收到了客户端发出的释放连接请求，随后客户端结束FIN-WAIT阶段，进入FIN-WAIT-2阶段")]),v._v(" "),t("p",[t("strong",[v._v("第三次挥手")]),v._v("：")]),v._v(" "),t("p",[v._v("服务器端自从发出ACK确认报文之后，经过CLOSED-WAIT阶段，做好了释放服务器端到客户端方向上的连接准备，再次向客户端发出一段TCP报文，其中：")]),v._v(" "),t("ul",[t("li",[v._v("标记位为FIN = 1， ACK = 1，表示“已经准备号释放连接了”。")]),v._v(" "),t("li",[v._v("序列号seq = w")]),v._v(" "),t("li",[v._v("确认号ack = u + 1，表示是在收到客户端报文的基础上，将其序号seq值加1作为本段报文确认号ack的值")])]),v._v(" "),t("p",[v._v("随后服务器端结束CLOSE-WAIT阶段，进入LAST-ACK阶段。并且停止在服务器端到客户端的方向上发送数据，但是服务器端仍然能够接收从客户端传输过来的数据")]),v._v(" "),t("p",[t("strong",[v._v("第四次挥手")]),v._v("：")]),v._v(" "),t("p",[v._v("客户端收到服务器端发出的TCP报文，确认了服务器端已做好释放连接的准备，结束FIN-WAIT-2阶段，进入TIME-WAIT阶段，并向服务器端发送一段报文，其中：")]),v._v(" "),t("ul",[t("li",[v._v("标记位ACK = 1，表示“接收到服务器准备好释放连接的信号”")]),v._v(" "),t("li",[v._v("序列号seq = u + 1；表示是在收到了服务器端报文的基础上，将其确认号ack值作文本段报文序号的值")]),v._v(" "),t("li",[v._v("确认号ack = w + 1；表示是在收到了服务器端baow的基础上，将其序列好seq值作为本段报文确认号的值")])]),v._v(" "),t("p",[v._v("随后客户端开始在TIME-WAIT阶段等待2MSL")]),v._v(" "),t("p",[v._v("服务器端收到从客户端发出的TCP报文之后结束LAST-ACK阶段，进入CLOSED阶段。由此正式确认关闭服务器端在客户端方向上的连接")]),v._v(" "),t("p",[v._v("客户端等待完2MSL之后，结束TIME-WAIT阶段，进入CLOSED阶段，由此完成“四次挥手”")]),v._v(" "),t("h3",{attrs:{id:"常见面试题"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#常见面试题"}},[v._v("#")]),v._v(" 常见面试题")]),v._v(" "),t("p",[v._v("【问题1】为什么连接的时候是三次握手，关闭的时候却是四次挥手？")]),v._v(" "),t("p",[v._v('答：因为当Server端收到Client端的SYN连接请求报文后，可以直接发送SYN+ACK报文。其中ACK报文是用来应答的，SYN报文是用来同步的。但是关闭连接时，当Server端收到FIN报文时，很可能并不会立即关闭SOCKET，所以只能先回复一个ACK报文，告诉Client端，"你发的FIN报文我收到了"。只有等到我Server端所有的报文都发送完了，我才能发送FIN报文，因此不能一起发送。故需要四步挥手。')]),v._v(" "),t("p",[v._v("【问题2】为什么不能用两次握手进行连接？")]),v._v(" "),t("p",[v._v("答：3次握手完成两个重要的功能，既要双方做好发送数据的准备工作(双方都知道彼此已准备好)，也要允许双方就初始序列号进行协商，这个序列号在握手过程中被发送和确认。")]),v._v(" "),t("p",[v._v("​    现在把三次握手改成仅需要两次握手，死锁是可能发生的。作为例子，考虑计算机S和C之间的通信，假定C给S发送一个连接请求分组，S收到了这个分组，并发送了确认应答分组。按照两次握手的协定，S认为连接已经成功地建立了，可以开始发送数据分组。可是，C在S的应答分组在传输中被丢失的情况下，将不知道S 是否已准备好，不知道S建立什么样的序列号，C甚至怀疑S是否收到自己的连接请求分组。在这种情况下，C认为连接还未建立成功，将忽略S发来的任何数据分组，只等待连接确认应答分组。而S在发出的分组超时后，重复发送同样的分组。这样就形成了死锁。")]),v._v(" "),t("p",[v._v("【问题3】为什么TIME_WAIT状态需要经过2MSL(最大报文段生存时间)才能返回到CLOSE状态？")]),v._v(" "),t("p",[v._v("答：虽然按道理，四个报文都发送完毕，我们可以直接进入CLOSE状态了，但是我们必须假象网络是不可靠的，有可以最后一个ACK丢失。所以TIME_WAIT状态就是用来重发可能丢失的ACK报文。在Client发送出最后的ACK回复，但该ACK可能丢失。Server如果没有收到ACK，将不断重复发送FIN片段。所以Client不能立即关闭，它必须确认Server接收到了该ACK。Client会在发送出ACK之后进入到TIME_WAIT状态。Client会设置一个计时器，等待2MSL的时间。如果在该时间内再次收到FIN，那么Client会重发ACK并再次等待2MSL。所谓的2MSL是两倍的MSL(Maximum Segment Lifetime)。MSL指一个片段在网络中最大的存活时间，2MSL就是一个发送和一个回复所需的最大时间。如果直到2MSL，Client都没有再次收到FIN，那么Client推断ACK已经被成功接收，则结束TCP连接。")]),v._v(" "),t("p",[v._v("【问题4】如果已经建立了连接，但是客户端突然出现故障了怎么办？")]),v._v(" "),t("p",[v._v("TCP还设有一个保活计时器，显然，客户端如果出现故障，服务器不能一直等下去，白白浪费资源。服务器每收到一次客户端的请求后都会重新复位这个计时器，时间通常是设置为2小时，若两小时还没有收到客户端的任何数据，服务器就会发送一个探测报文段，以后每隔75秒钟发送一次。若一连发送10个探测报文仍然没反应，服务器就认为客户端出了故障，接着就关闭连接。")])])}),[],!1,null,null,null);_.default=s.exports}}]);