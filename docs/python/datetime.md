---
title: datetime
date: 2021-07-12
tags:
  - python
categories:
  - Python之旅
---

### 获取当前日期和时间

```py
from datetime import datetime
now = datetime.now()
print(now) # 2021-07-12 15:37:15.867000
```

:::tip

`datetime`是模块，`datetime`模块还包含一个`datetime`类，通过`from datetime import datetime`导入的才是`datetime`这个类

如果仅导入`import datetime`，则必须引用全名`datetime.datetime`

`datetime.now()`返回当前日期和时间，其类型是`datetime`

:::

### 获取指定日期和时间

```py
from datetime import datetime
dt = datetime(2021, 7, 12, 15, 40)
print(dt)
# 2021-07-12 15:40:00
```

### datetime转timestamp

时间戳跟时区没有关系，因此保存时间一般用时间戳进行保存

```py
from datetime import datetime
import time
dt = datetime(2021, 7, 12, 15, 40)
print(int(time.mktime(dt.timetuple())))
# print(dt.timestamp()) python3可以使用timestamp
# 1626075600
```

### timestamp转datetime

```py
from datetime import datetime
t = 1626075600
print(datetime.fromtimestamp(t))
# 2021-07-12 15:40:00
```

:::tip

`fromtimestamp()`转换出来的时间为本地时间，若要UTC时间，则使用`utcfromtimestamp()`

:::

### str转datetime

很多时候，日期和时间是用字符串表示，要处理日期和时间，首先要把str转换为datetime。转换的方法是通过`datetime.strptime()`实现，需要一个日期和时间的格式化字符串

```py
from datetime import datetime
cday = datetime.strptime("2021-7-12 15:51:00", "%Y-%m-%d %H:%M:%S")
print(cday)
# 2021-07-12 15:51:00
```

### datetime加减

对日期和时间进行加减实际上就是把datetime往后或往前计算，得到新的datetime。加减可以直用`+`和`-`运算符，不过需要导入`timedelta`这个类

```py
from datetime import datetime, timedelta
now = datetime.now()
print(now)
print(now + timedelta(hours=6))
print(now - timedelta(minutes=50))
print(now + timedelta(days=1))
# 2021-07-12 15:56:32.840000
# 2021-07-12 21:56:32.840000
# 2021-07-12 15:06:32.840000
# 2021-07-13 15:56:32.840000
```

:::tip

函数原型：
`class datetime.timedelta([days[, seconds[, microseconds[, milliseconds[, minutes[, hours[, weeks]]]]]]])`

:::

