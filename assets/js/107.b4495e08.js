(window.webpackJsonp=window.webpackJsonp||[]).push([[107],{620:function(t,s,v){"use strict";v.r(s);var _=v(6),h=Object(_.a)({},(function(){var t=this,s=t.$createElement,v=t._self._c||s;return v("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[v("h2",{attrs:{id:"流量控制"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#流量控制"}},[t._v("#")]),t._v(" 流量控制")]),t._v(" "),v("p",[t._v("如果发送方把数据发送得过快，接收方可能会来不及接收，这就会造成数据的丢失。")]),t._v(" "),v("p",[t._v("TCP 的流量控制是利用滑动窗口机制实现的，接收方在返回的数据中会包含自己的接收窗口的大小，以控制发送方的数据发送。")]),t._v(" "),v("img",{staticStyle:{height:"300px"},attrs:{src:t.$withBase("/http/流量控制.jfif"),alt:"流量控制"}}),t._v(" "),v("h2",{attrs:{id:"拥塞控制"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#拥塞控制"}},[t._v("#")]),t._v(" 拥塞控制")]),t._v(" "),v("p",[t._v("拥塞控制就是"),v("strong",[t._v("防止过多的数据注入到网络中，这样可以使网络中的路由器或链路不致过载")]),t._v("。拥塞控制是一个"),v("strong",[t._v("全局性的过程")]),t._v("，涉及到所有的主机、路由器，以及与降低网络传输性能有关的所有因素。")]),t._v(" "),v("p",[v("strong",[t._v("几种拥塞控制的方法：")])]),t._v(" "),v("ul",[v("li",[t._v("慢开始")]),t._v(" "),v("li",[t._v("拥塞避免")]),t._v(" "),v("li",[t._v("快重传")]),t._v(" "),v("li",[t._v("快恢复")])]),t._v(" "),v("h3",{attrs:{id:"慢开始和拥塞避免"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#慢开始和拥塞避免"}},[t._v("#")]),t._v(" 慢开始和拥塞避免")]),t._v(" "),v("p",[t._v("发送方维持一个拥塞窗口 cwnd（congestion window）的状态变量。拥塞窗口的大小取决于网络的拥塞程度，并且动态地在变化。发送方让自己的发送窗口等于拥塞")]),t._v(" "),v("p",[t._v("发送方控制拥塞窗口的原则是：只要网络没有出现拥塞，拥塞窗口就再增大一些，以便把更多的分组发送出去。但只要网络出现拥塞，拥塞窗口就减小一些，以减少注入到网络中的分组数。")]),t._v(" "),v("p",[v("strong",[t._v("慢开始算法")]),t._v("：当主机开始发送数据时，如果立即将大量数据字节注入网络，那么就有可能引起网络拥塞，因为现在并不清楚网络的负荷情况。因此，较号的方法是先探测一下，即由小到大逐渐增大发送窗口，也就是说，由小到大逐渐增大拥塞窗口数值。通常再刚刚开始发送报文段时，先把拥塞窗口 cwnd 设置为一个最大报文段 MSS 的数值。而在每收到一个对新的报文段的确认后，把拥塞窗口增多至多一个 MSS 的数值。用这样的方法逐渐增大发送方的拥塞窗口 cwnd，可以使分组注入到网络的速率更加合理。")]),t._v(" "),v("img",{staticStyle:{height:"300px"},attrs:{src:t.$withBase("/http/慢开始.jfif"),alt:"慢开始"}}),t._v(" "),v("p",[t._v('每经过一个传输轮次，拥塞窗口 cwnd 就加倍。一个传输轮次所经历的时间其实就是往返的时间 RTT。不过"传输轮次"更加强调：把拥塞窗口 cwnd 所允许发送的报文段都连续发送出去，并收到了对已发送的最后一个字节的确认。')]),t._v(" "),v("p",[t._v("为了防止拥塞窗口 cwnd 增长过大引起网络拥塞，还需要设置一个慢开始门限 ssthresh 状态变量。慢开始门限 ssthresh 的用法如下“")]),t._v(" "),v("ul",[v("li",[t._v("当 cwnd < ssthresh 时，使用上述的慢开始算法")]),t._v(" "),v("li",[t._v("当 cwnd > ssthresh 时，停止使用慢开始算法而改用拥塞避免算法")]),t._v(" "),v("li",[t._v("cwnd = ssthresh 时,即可使用慢开始算法，也可使用拥塞避免算法")])]),t._v(" "),v("p",[v("strong",[t._v("拥塞避免算法")]),t._v("：让拥塞窗口 cwnd 缓慢地增大，即每经过一个往返时间 RTT 就把发送方的拥塞窗口 cwnd 加 1，而不是加倍。这样拥塞窗口 cwnd 按线性规律缓慢增长，比慢开始算法的拥塞窗口增长速率缓慢很多。")]),t._v(" "),v("p",[t._v("无论在慢开始阶段还是在拥塞避免阶段，只要发送方判断网络出现拥塞，就要把慢开始门限 ssthresh 设置为出现拥塞时的发送方窗口值的一半（但不能小于 2）.然后把拥塞窗口 cwnd 重写设置为 1，执行慢开始算法。这样 uo 的目的就是要迅速减少主机发送到网络中的分组数，使得发生拥塞的路由器有足够时间把队列中积压的分组处理完毕")]),t._v(" "),v("img",{staticStyle:{height:"300px"},attrs:{src:t.$withBase("/http/慢开始和拥塞避免.jfif"),alt:"慢开始和拥塞避免"}}),t._v(" "),v("ol",[v("li",[t._v("当 TCP 连接进行初始化时，把拥塞窗口 cwnd 置为 1。慢开始门限的初始值设置为 16 个报文段，即 cwnd = 16")]),t._v(" "),v("li",[t._v("在执行慢开始算法时，拥塞窗口 cwnd 的初始值为 1。以后发送方每收到一个对新报文段的确认 ACK，就把拥塞窗口值乘 2，然后开始下一轮的传输。因此拥塞窗口 cwnd 随着传输轮次按指数规律增长。当拥塞窗口 cwnd 增长到慢开始门限值 ssthresh（即当 cwnd = 16 时），就改为执行拥塞控制算法，拥塞窗口按线性规律增长。")]),t._v(" "),v("li",[t._v("假定拥塞窗口的数值增长到 24 时，网络出现超时（这很可能就是网络发送拥塞了）。更新后的 ssthresh 值变为 12（即变为出现超时时的拥塞窗口数值 24 的一半），拥塞窗口再重新设置为 1，并执行慢开始算法。当 cwnd = ssthresh = 12 时改为执行拥塞避免算法，拥塞窗口按线性规律增长，每经过一个往返时间增加一个 MSS 的大小")])]),t._v(" "),v("h3",{attrs:{id:"快重传和快恢复"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#快重传和快恢复"}},[t._v("#")]),t._v(" 快重传和快恢复")]),t._v(" "),v("p",[t._v("快重传算法首先要求接收方每收到一个失序的报文段后就立刻发出重复确认（为的是使发送方及早知道有报文段没有到达对方）而不要等到自己发送数据时才进行捎带确认。")]),t._v(" "),v("img",{staticStyle:{height:"300px"},attrs:{src:t.$withBase("/http/快重传.jfif"),alt:"快重传"}}),t._v(" "),v("p",[t._v("接收方收到了 M1 和 M2 后都分别发出了确认。现在假定接收方没有收到 M3 但接着收到了 M4。显然，接收方不能确认 M4，因为 M4 是收到的失序报文段。根据可靠传输原理，接收方可以什么都不做，也可以在设当时机发送一次对 M2 的确认。但按照快重传算法的规定，接收方应及时发送对 M2 的重复确认，这样做可以让发送方及早知道报文段 M3 没有到达接收方。发送方接着发送了 M5 和 M6.接收方收到这两个报文后，也还要再次发出对 M2 的重复确认。这样，发送方共收到了接收方的四个对 M2 的确认，其后三个都是重复确认。快重传算法还规定，发送方只要一连收到三个重复确认就应当立即重传对方尚未收到的报文段 M3，而不必继续等待 M3 设置的重传计时器到期。由于发送方尽早重传未被确认的报文段，因此采用快重传后可以使整个网络吞吐量提高约 20%。")]),t._v(" "),v("p",[t._v("与快重传配合使用的还有快恢复算法，其过程有以下两个要点：")]),t._v(" "),v("ol",[v("li",[t._v('当发送方连续收到三个重复确认，就执行"乘法减小"算法，把慢开始门限 ssthresh 减半。这是为了预防网络发送拥塞。')]),t._v(" "),v("li",[t._v('由于发送方现在认为网络很可能没有发送拥塞，因此与慢开始不同之处是现在不执行慢开始算法（即拥塞窗口 cwnd 现在不设置为 1），而是把 cwnd 值设置为慢开始门限 ssthresh 减半后的数值，然后开始执行拥塞避免算法（"加法增大"），使拥塞窗口缓慢地线性增大')])]),t._v(" "),v("img",{staticStyle:{height:"300px"},attrs:{src:t.$withBase("/http/快重传和快恢复.jfif"),alt:"快重传和快恢复"}})])}),[],!1,null,null,null);s.default=h.exports}}]);