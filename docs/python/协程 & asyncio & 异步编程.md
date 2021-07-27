---
title: 协程 & asyncio & 异步编程
date: 2021-07-24
tags:
  - python
categories:
  - Python之旅
---

## 协程

实现协程的几种方式：

* greenlet，早期模块
* yield关键字
* asyncio装饰器（py3.4）
* async、await（py3.5）

### greenlet实现协程

```py
pip install greenlet
```

```py
def func1():
	print(1)		# 第2步： 输出 1
	gr2.switch()	# 第3步： 切换到 func2 函数
	print(2)		# 第6步： 输出 2
	gr2.switch()	# 第7步： 切换到 func2 函数
	
	
def func2():
	print(3)		# 第4步：输出 3
	gr1.switch()	# 第5步： 切换到 func1 函数
	print(4)		# 第8步： 输出 4
	

gr1 = greenlet(func1)
gr2 = greenlet(func2)

gr1.switch() # 第1步 去执行 func1 函数
```

### yield实现协程

在generator中，我们不但可以通过`for`循环来迭代，还可以不断调用`next()`函数获取由`yield`语句返回的下一个值

但是Python的`yeild`不但可以返回一个值，它还可以接收调用者发出的参数

**通过协程实现生产者和消费者模式**

生产者生成消息后，直接通过`yield`跳转到消费者开始执行，待消费者执行完毕后，切换回生产者继续生产，效率极高

```py
def consumer():
    r = ''
    while True:
        n = yield r
        if not n:
            return
        print('[CONSUMER] Consuming %s...' % n)
        r = '200 OK'

def produce(c):
    c.send(None)
    n = 0
    while n < 5:
        n = n + 1
        print('[PRODUCER] Producing %s...' % n)
        r = c.send(n)
        print('[PRODUCER] Consumer return: %s' % r)
    c.close()

c = consumer()
produce(c)
```

执行结果:

```py
[PRODUCER] Producing 1...
[CONSUMER] Consuming 1...
[PRODUCER] Consumer return: 200 OK
[PRODUCER] Producing 2...
[CONSUMER] Consuming 2...
[PRODUCER] Consumer return: 200 OK
[PRODUCER] Producing 3...
[CONSUMER] Consuming 3...
[PRODUCER] Consumer return: 200 OK
[PRODUCER] Producing 4...
[CONSUMER] Consuming 4...
[PRODUCER] Consumer return: 200 OK
[PRODUCER] Producing 5...
[CONSUMER] Consuming 5...
[PRODUCER] Consumer return: 200 OK
```

`consumer`函数是一个`generator`，把一个`consumer`传入`produce`后：

1. 首先调用`c.send(None)`启动生成器
2. 一旦生成了东西，通过`c.send(n)`切换到`consumer`执行
3. `consumer`通过`yield`拿到消息`n`，处理，又通过`yield`把结果传回
4. `produce`拿到`consumer`处理的结果，继续生产下一条消息
5. `produce`决定不生产了，通过`c.close()`关闭`consumer`，整个过程结束

整个流程无锁，由一个线程执行，`produce`和`comsumer`协作完成任务，所以称为“协程”，而非线程的抢占式多任务

## asyncio

在python3.4以及之后的版本

```py
import asyncio
from asyncio import tasks

@asyncio.coroutine
def func1():
    print(1)
    yield from asyncio.sleep(2) # 遇到IO耗时操作，自动化切换到tasks中的其他任务
    print(2)
    
@asyncio.coroutine
def func2():
    print(3)
    yield from asyncio.sleep(2) # 遇到IO耗时操作，自动化切换到tasks中的其他任务
    print(4)
    

tasks = [
    asyncio.ensure_future( func1() ), 
    asyncio.ensure_future( func2() )
    ]

loop = asyncio.get_event_loop()
loop.run_until_complete(asyncio.wait(tasks))
```

:::tip

遇到IO阻塞会自动切换

:::

### async & await关键字

在python3.5以及以后的版本

```py
import asyncio
from asyncio import tasks

async def func1():
    print(1)
    await asyncio.sleep(2)
    print(2)
    

async def func2():
    print(3)
    await asyncio.sleep(2)
    print(4)
    

tasks = [
    asyncio.ensure_future( func1() ), 
    asyncio.ensure_future( func2() )
    ]

loop = asyncio.get_event_loop()
loop.run_until_complete(asyncio.wait(tasks))
```

协程函数： 定义函数时`async def 函数名`

协程对象： 执行 协程函数() 得到的协程对象

```py
async def func():
	pass
```

:::tip

执行协程函数创建协程对象，函数内部代码不会执行

如果想要运行协程函数内部代码，必须要将协程对象交给事件循环来处理

:::

```py
import asyncio

async def func():
    print("哈哈哈")
    
result = func()

# loop = asyncio.get_event_loop()
# loop.run_until_complete( result )
asyncio.run(result) # python 3.7以后
```

## 异步编程

#### await

await后面加 可等待对象（协程对象、Future、Task对象）

```py
import asyncio

async def func():
    print("哈哈哈")
    response = await asyncio.sleep(2)
    print(response)
    return "func1执行完毕"

async def func1():
    print("开始执行")
    
    response = await func()
    
    print(response)

asyncio.run(func1())

'''
开始执行
哈哈哈
None
func1执行完毕
'''
```

### Task对象

task对象可以在事件中添加多个任务

Tasks用于并发调度协程，通过`asyncio.create_task(协程对象)`的方式创建Task对象，这样可以让协程加入事件循环中等待被调度执行。除了使用`asyncio.create_task()`函数以外，还可以用低层级的`loop.create_task()`或`ensure_future()`函数。不建议手动实例化Task对象

:::tip

`asyncio.create_task()`函数在Python3.7中被加入。Python3.7之前，可以改用低层级的`asyncio.ensure_future()`函数

:::

 ```py
 import asyncio
 from asyncio import tasks
 
 async def func():
     print(1)
     await asyncio.sleep(2)
     print(2)
     return "func执行完毕"
 
 async def main():
     task_list = [
         asyncio.create_task( func(), name="n1"),
         asyncio.create_task( func(), name="n2")
     ]
     
     print("main结束")
     
     done, pending = await asyncio.wait(task_list, timeout=None)
     print(done, pending)
     
 asyncio.run( main() )
 '''
 main结束
 1
 1
 2
 2
 {<Task finished name='n1' coro=<func() done, defined at g:\pythonProject\pythonTest.py:4> result='func执行完毕'>, <Task finished name='n2' coro=<func() done, defined at g:\pythonProject\pythonTest.py:4> result='func执行完毕'>} set()
 '''
 ```

### asyncio.Future对象

```py
import asyncio

async def set_after(fut):
    await asyncio.sleep(2)
    fut.set_result("123")
    

async def main():
    # 获取当前事件循环
    loop = asyncio.get_running_loop()
    
    # 创建一个任务（future对象），没绑定任何行为，则这个任务永远不知道什么时候结束
    fut = loop.create_future()
    
    # 创建一个任务（Task对象），绑定了set_after函数，函数内部在2s之后，会给fut赋值
    # 即手动设置future任务的最终结果，那么fut就可以结束了
    await loop.create_task( set_after(fut) )
    
    # 等待 Futrue 对象获取最终结果， 否则一直等下去
    data = await fut
    print(data)
    
asyncio.run( main() )
```

### concurrent.futures.Future对象

使用线程池、进程池实现异步操作时用到的对象

```py
import time
from concurrent.futures import Future
from concurrent.futures.thread import ThreadPoolExecutor
from concurrent.futures.process import ProcessPoolExecutor


def func(value):
    time.sleep(1)
    print(value)
    return 123


# 创建线程池
pool = ThreadPoolExecutor(max_workers=5)

# 创建进程池
# pool = ProcessPoolExecutor(max_workers=5)

for i in range(10):
    fut = pool.submit(func, i)
    print(fut)
```

以后写代码可能会存在交叉事件。例如：crm项目80%都是基于协程异步编程 + MySQL（不支持）【线程、进程做异步编程】

```py
import time
import asyncio
import concurrent.futures

def func():
    # 某个耗时操作
    time.sleep(1)
    return "123"

async def main():
    loop = asyncio.get_running_loop()
    
    # Run in the default loop's executor(默认ThreadpoolExecutor)
    # 第一步：内部会先调用 ThreadPoolExecutor 的sumbit方法去线程池中申请一个线程去执行func函数，并返回一个concurrent.futures.Future对象
    # 第二步：调用asyncio.warp_future将concurrent.futures.Future对象包装为asyncio.Future对象
    # 因为concurrent.futures.Future对象不支持await语法，所以需要包装为asycio.Future对象才能使用
    fut = loop.run_in_executor(None, func)
    result = await fut
    print('default thread pool', result)
    
asyncio.run(main()) 
```

### 异步迭代器

**什么是异步迭代器**

实现了`__aiter__()`和`__anext__()`方法的对象。`__anext__()`必须返回一个`awaitable`对象。`async for`会处理异步迭代器的`__anext__()`方法所返回的可等待对象，直到其引发一个`StopAsyncIteration`异常。

**什么是异步可迭代对象**

可在`async for`语句中被使用的对象。必须通过它的`__aiter__()`方法返回一个`asynchronous iterator`

```py
import asyncio

class Reader(object):
    def __init__(self):
        self.count = 0
        
    async def readline(self):
        self.count += 1
        if self.count == 100:
            return None
        return self.count
    
    def __aiter__(self):
        return self
    
    async def __anext__(self):
        val = await self.readline()
        if val == None:
            raise StopAsyncIteration
        return val
    
async def func():
    obj = Reader()
    async for item in obj:
        print(item)
        
asyncio.run(func())
```

### 异步上下文管理器

通过定义`__aenter__()`和`__aexit__()`方法来对`async with`语句中的环境进行控制

```py
import asyncio

class AsyncContextManager:
    def __init__(self):
        self.conn = None
    
    async def do_something(self):
         # 异步操作数据库
         return 666
     
    async def __aenter__(self):
         # 异步连接数据库
         self.conn = await asyncio.sleep(1)
         return self
    
    async def __aexit__(self, exc_type, exc, tb):
        # 异步关闭数据库链接
        await asyncio.sleep(1)
        
async def func():
    async with AsyncContextManager() as f:
        result = await f.do_something()
        print(result)
        
asyncio.run(func())
```

