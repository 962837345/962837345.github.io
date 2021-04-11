---
title: diff算法
date: 2021-04-11
tags:
  - vue
categories:
  - 前端笔记
---

## diff 算法流程图

<img style="height: 600px" :src="$withBase('/diffFlowChart.jpg')" alt="diff算法流程图">

## index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <button id="button">点我改变</button>
    <div id="container"></div>
    <script src="xuni/bundle.js"></script>
  </body>
</html>
```

## index.js

```js
import h from "../h";
import patch from "../patch";

// 创建虚拟节点
const myVnode1 = h("ul", {}, [
  h("li", { key: "A" }, "A"),
  h("li", { key: "B" }, "B"),
  h("li", { key: "C" }, "C"),
]);

const myVnode2 = h("ul", {}, [
  h("li", { key: "A" }, "A"),
  h("li", { key: "C" }, "C"),
  h("li", { key: "E" }, "E"),
  h("li", { key: "B" }, "B"),
  h("li", { key: "Q" }, "Q"),
]);

// 让虚拟节点上树
const container = document.getElementById("container");
const button = document.getElementById("button");
patch(container, myVnode1);

button.onclick = function() {
  patch(myVnode1, myVnode2);
};
```

## h.js

h 函数用于创建虚拟节点

```js
import vnode from "./vnode";

export default function(sel, data, c) {
  // 检查c的类型
  if (typeof c === "string" || typeof c === "number") {
    return vnode(sel, data, undefined, c, undefined);
  } else if (Array.isArray(c)) {
    const children = [];
    // 遍历收集children
    for (let i = 0; i < c.length; i++) {
      if (!(typeof c[i] === "object" && c[i].hasOwnProperty("sel"))) {
        throw new Error("传入的数组参数中有项不是h函数");
      }
      children.push(c[i]);
    }
    return vnode(sel, data, children, undefined, undefined);
  } else if (typeof c === "object" && c.hasOwnProperty("sel")) {
    // 传入的c是唯一的children
    return vnode(sel, data, [c], undefined, undefined);
  } else {
    throw new Error("传入的第三个参数的类型不对");
  }
}
```

## vnode.js

vnode 方法将穿入的参数组合成对象，然后把该对象传回

```js
// 把传入的5个参数组合成对象传回
export default function(sel, data, children, text, elm) {
  const key = data.key;
  return { sel, data, children, text, elm, key };
}
```

## createElement.js

```js
// 真正创建节点,将vnode创建为DOM，不进行插入
export default function createElement(vnode) {
  // 创建一个节点，它现在还是孤儿节点
  const domNode = document.createElement(vnode.sel);
  // 有子节点还是文本
  if (
    vnode.text !== "" &&
    (vnode.children === undefined || vnode.children.length === 0)
  ) {
    // 它内部是文本
    domNode.innerText = vnode.text;
  } else if (Array.isArray(vnode.children) && vnode.children.length > 0) {
    // 它内部是子节点就要递归创建子节点
    for (let i = 0; i < vnode.children.length; i++) {
      // 得到当前的children
      const ch = vnode.children[i];
      // 当前的children创建DOM
      const chDOM = createElement(ch);
      // 上树
      domNode.appendChild(chDOM);
    }
  }
  // 补充elm属性
  vnode.elm = domNode;

  // vnode.elm是一个实际的dom对象
  return vnode.elm;
}
```

## patch.js
patch函数用于让新的虚拟DOM挂载到DOM上
```js
import vnode from "./vnode";
import createElement from "./createElement";
import patchVnode from "./patchVnode";

export default function(oldVnode, newVnode) {
  // 判断传入的第一个参数是DOM节点还是虚拟节点
  if (oldVnode.sel === "" || oldVnode.sel === undefined) {
    // 传入的第一个参数是DOM节点
    oldVnode = vnode(
      oldVnode.tagName.toLowerCase(),
      {},
      [],
      undefined,
      oldVnode
    );
  }

  // oldVnode和newVnode是否是同一个节点
  if (oldVnode.key === newVnode.key && oldVnode.sel === newVnode.sel) {
    // 是同一个节点
    patchVnode(oldVnode, newVnode);
  } else {
    // 不是同一个节点，暴力插入新的，删除旧的
    const newVnodeElm = createElement(newVnode);
    // 插入到老节点之前
    if (oldVnode.elm.parentNode && newVnodeElm) {
      oldVnode.elm.parentNode.insertBefore(newVnodeElm, oldVnode.elm);
    }
    // 删除老节点
    oldVnode.elm.parentNode.removeChild(oldVnode.elm);
  }
}
```

## patchVnode.js

```js
import createElement from "./createElement";
import updateChildren from "./updateChildren";

// 对比节点
export default function patchVnode(oldVnode, newVnode) {
  // 是否新旧vnode同一个对象
  if (oldVnode === newVnode) return;
  // 判断新vnode有没有text属性
  if (newVnode.text !== undefined &&(newVnode.children === undefined || newVnode.children.length === 0)) {
    // 有text属性
    if (oldVnode.text !== newVnode.text) {
      // 如果新虚拟节点的text和老虚拟节点的text不同，直接让新的text写入老的elm中
      // 老的elm中是children，也会被替换掉
      oldVnode.elm.innerText = newVnode.text;
    }
  } else {
    // 新vnode没有text属性
    // 判断老的有没有children
    if (oldVnode.children !== undefined && oldVnode.children.length > 0) {
      // 老的有children，此时就是最复杂的情况，就是新老都有children，需要执行最优diff更新
      updateChildren(oldVnode.elm, oldVnode.children, newVnode.children);
    } else {
      // 老的没有children，新的有children
      // 清空老的节点的内容
      oldVnode.elm.innerHTML = "";
      // 遍历新的vnode节点，创建dom，上树
      for (let i = 0; i < newVnode.children.length; i++) {
        const dom = createElement(newVnode.children[i]);
        oldVnode.elm.appendChild(dom);
      }
    }
  }
}
```

## updateChildren.js

```js
import patch from "./patch";
import patchVnode from "./patchVnode";
import createElement from "./createElement";

// 判断是否时同一个虚拟节点,当选择器和key都相同时则相同
function checkSameVnode(a, b) {
  return a.sel === b.sel && a.key === b.key;
}

export default function updateChildren(parentElm, oldCh, newCh) {
  // 旧前
  let oldStartIndex = 0;
  // 新前
  let newStartIndex = 0;
  // 旧后
  let oldEndIndex = oldCh.length - 1;
  // 新后
  let newEndIndex = newCh.length - 1;
  // 旧前节点
  let oldStartVnode = oldCh[0];
  // 旧后节点
  let oldEndVnode = oldCh[oldEndIndex];
  // 新前节点
  let newStartVnode = newCh[0];
  // 新后节点
  let newEndVnode = newCh[newEndIndex];

  let keyMap = null;

  while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
    // 跳过已经加undefined标记的节点
    if (!oldStartVnode || !oldCh[oldStartIndex]) {
      oldStartVnode = oldCh[++oldStartIndex];
    } else if (!oldEndVnode || !oldCh[oldEndIndex]) {
      oldEndVnode = oldCh[--oldEndIndex];
    } else if (!newStartVnode || !newCh[newStartIndex]) {
      newStartVnode = newCh[++newStartIndex];
    } else if (!newEndVnode || !newCh[newEndIndex]) {
      newEndVnode = newCh[--newEndIndex];
    } else if (checkSameVnode(oldStartVnode, newStartVnode)) {
      // 新前与旧前
      patchVnode(oldStartVnode, newStartVnode);
      oldStartVnode = oldCh[++oldStartIndex];
      newStartVnode = newCh[++newStartIndex];
    } else if (checkSameVnode(oldEndVnode, newEndVnode)) {
      // 新后与旧后
      patchVnode(oldEndVnode, newEndVnode);
      oldEndVnode = oldCh[--oldEndIndex];
      newEndVnode = newCh[--newEndIndex];
    } else if (checkSameVnode(oldStartVnode, newEndVnode)) {
      // 新后与旧前
      patchVnode(oldStartVnode, newEndVnode);
      // 当新后与旧前命中时，此时要移动节点，移动新后指向的这个节点到老节点的旧后的后面
      parentElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling);
      oldStartVnode = oldCh[++oldStartIndex];
      newEndVnode = newCh[--newEndIndex];
    } else if (checkSameVnode(oldEndVnode, newStartVnode)) {
      // 新前与旧后
      patchVnode(oldEndVnode, newStartVnode);
      // 当新前与旧后命中时，此时要移动节点，移动新前指向的这个节点到老节点的旧前的前面
      parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm);
      oldEndVnode = oldCh[--oldEndIndex];
      newStartVnode = newCh[++newStartIndex];
    } else {
      // 四种命中都没有命中
      // 制作一个keyMap映射对象
      if (!keyMap) {
        keyMap = {};
        // 从oldStartIndex开始，到oldEndIndex结束，创建keyMap映射对象
        for (let i = oldStartIndex; i <= oldEndIndex; i++) {
          const key = oldCh[i].key;
          if (key) {
            keyMap[key] = i;
          }
        }
      }

      // 寻找当前这项 {newStartIndex} 这项在keyMap中的映射的位置序号
      const indexOld = keyMap[newStartVnode.key];
      if (indexOld === undefined) {
        // 被加入的项 {就是newStartVnode这项} 不是真正的DOM节点，要先转为DOM节点
        parentElm.insertBefore(createElement(newStartVnode), oldStartVnode.elm);
      } else {
        // 不是全新的项，要移动
        const elmToMove = oldCh[indexOld];
        patchVnode(elmToMove, newStartVnode);
        // 把这项设置为undefined,表示已经处理完这项了
        oldCh[indexOld] = undefined;
        // 移动，调用insertBefore实现移动
        parentElm.insertBefore(elmToMove.elm, oldStartVnode.elm);
      }
      // 指针下移,只移动新的头
      newStartVnode = newCh[++newStartIndex];
    }
  }
  // 是否还有节点没有处理，即插入节点的情况
  if (newStartIndex <= newEndIndex) {
    const before = newCh[newEndIndex + 1]
      ? oldCh.find((ch) => ch.key === newCh[newEndIndex + 1].key).elm
      : null;
    for (let i = newStartIndex; i <= newEndIndex; i++) {
      // insertBefore方法可以自动识别null，如果时null就会自动排到队尾去
      // newCh[i]现在还没有变成真正DOM，所以要调用createElement()函数变为DOM
      parentElm.insertBefore(createElement(newCh[i]), before);
    }
  } else if (oldStartIndex <= oldEndIndex) {
    // 批量删除oldStart和oldEnd之间的项
    for (let i = oldStartIndex; i <= oldEndIndex; i++) {
      if (oldCh[i]) {
        parentElm.removeChild(oldCh[i].elm);
      }
    }
  }
}
```

## updateChildren算法详解

该方法用于处理新旧虚拟DOM是同一个对象时，新旧虚拟DOM的chirldren不一样的情况

该方法需要四个指针，分别指向新虚拟DOM的头部和尾部，旧虚拟DOM的头部和尾部,同时需要四个节点分别存储指针指向的那个节点。

按照以下的顺序进行比较

1. 新前与旧前
2. 新后与旧后
3. 新后与旧前
4. 新前与旧后

1、2、3、4匹配到都需要分别移动对应指针，并更新存储的节点, startIndex下移，endIndex上移

3和4命中时需要进行特殊的处理

**3命中时，需要将旧前所指向的节点移动到旧后的后面**

**4命中时，需要将旧后所指向的节点移动到旧前的前面**

如果1、2、3、4都没有命中，则需要创建一个kepMap来存储旧虚拟节点的映射，然后在newStartVnode中取得key，通过该key到kepMap中查找有没有该节点。

**没有则说明这个节点是一个全新的节点，需要插入到oldStartVnode的前面**

**有则说明该节点不是一个新的节点，需要进行移动，将该节点移动到oldStartVnode的前面,同时将该项设置为undefined，表示该项已经被处理过。最后将移动新虚拟DOM的newStartIndex指针，并更新newStartVnode节点**

当oldStartIndex > oldEndIndex 或 newStartIndex > newEndIndex则跳出while循环，此时需要查看是否还有剩余节点没有处理

如果newStartIndex <= newEndIndex，说明新虚拟DOM还有要插入的节点，此时需要创建一个标杆before，拿到newCh[newEndIndex + 1]的节点，如果没有该节点则为null，如果有则通过该节点的key到旧虚拟DOM中得到相同key的节点，获得该节点的elm对象，然后遍历将需要插入的节点插入到标杆之前，这里如果标杆为null时，会自动插在末尾

如果oldStartIndex <= oldEndIndex，说明旧虚拟DOM有需要删除的节点，则循环删除oldStartIndex到oldEndIndex之间的节点

## 图例演示

当两个节点的sel(即选择器)和key都相同时，则两个节点相同

初始化

|               oldCh |                newCh | parentElm |
| ------------------: | -------------------: | --------: |
| oldstartIndex ->  A | newstartIndex ->   A |         A |
|                   B |                    C |         B |
|    oldEndIndex -> C |                    E |         C |
|                     |                    B |           |
|                     |     newEndIndex -> Q |           |

新前与旧前比较，相同，移动指针

|              oldCh |              newCh | parentElm |
| -----------------: | -----------------: | --------: |
|                  A |                  A |         A |
| oldstartIndex -> B | newstartIndex -> C |         B |
|   oldEndIndex -> C |                  E |         C |
|                    |                  B |           |
|                    |   newEndIndex -> Q |           |

再次循环，1. 新前与旧前比较，不相同；2. 新后与旧后比较，不相同；3. 新后与旧前比较,不相同; 4. 新前与旧后比较，相同。将旧后指向的节点移动到旧前的前面。移动指针

|                             oldCh |              newCh | parentElm |
| --------------------------------: | -----------------: | --------: |
|                                 A |                  A |         A |
| oldstartIndex -> oldEndIndex -> B |                  C |         C |
|                                 C | newstartIndex -> E |         B |
|                                   |                  B |           |
|                                   |   newEndIndex -> Q |           |

再次循环，1. 新前与旧前比较，不相同；2. 新后与旧后比较，不相同；3. 新后与旧前比较，不相同；4. 新前与旧后比较，不相同。此时4种都不相同，则创建了kepMap映射对象,此时的kepMap为{ B: 1 },然后在kepMap中寻找有没有newStartVnode.key这一项，此时newStartVnode.key为E，没有，则将newStartVnode转为真正的DOM之后插入到oldStartVnode(也就是B之前)之前,同时newStartVnode更新并且newstartIndex指针下移

|                             oldCh |             newCh | parentElm |
| --------------------------------: | ----------------: | --------: |
|                                 A |                 A |         A |
| oldstartIndex -> oldEndIndex -> B |                 C |         C |
|                                 C |                 E |         E |
|                                   | newstartIndex ->B |         B |
|                                   |  newEndIndex -> Q |           |

再次循环，1. 新前与旧前比较，相同，指针下移

|              oldCh |                             newCh | parentElm |
| -----------------: | --------------------------------: | --------: |
|                  A |                                 A |         A |
|   oldEndIndex -> B |                                 C |         C |
| oldstartIndex -> C |                                 E |         E |
|                    |                                 B |         B |
|                    | newstartIndex -> newEndIndex -> Q |           |

此时oldstartIndex > oldEndIndex,跳出循环。此时由于newStartIndex <= newEndIndex,说明还有节点Q需要插入,此时需要创建一个标杆before,判断newCh[newEndIndex + 1]是否存在,存在则拿到newCh[newEndIndex + 1]的key到oldCh中找到一样的key的节点,将Q插入到该节点之前;如果不存在则before置为null,调用insertBefore时,如果为null则会默认插入到末尾

|              oldCh |                             newCh | parentElm |
| -----------------: | --------------------------------: | --------: |
|                  A |                                 A |         A |
|   oldEndIndex -> B |                                 C |         C |
| oldstartIndex -> C |                                 E |         E |
|                    |                                 B |         B |
|                    | newstartIndex -> newEndIndex -> Q |         Q |