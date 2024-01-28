---
title: UFunction代理的创建与使用
date: 2022-07-18
tags:
 - C++
 - UE
categories:
 - UE
---

### 声明代理

```cpp
# DYNAMIC表示可以在蓝图中调用
# 在UE中，代理必须以大写`F`开头
DECLARE_DYNAMIC_MULTICAST_DELEGATE_TwoParams(FOnColorChanged, const FLinearColor&, Color, const FString&, Name);

DECLARE_MULTICAST_DELEGATE_OneParam(FOnTimerFinished, AActor* Actor);
```

### 创建代理

```cpp
FOnColorChanged OnColorChanged;
FOnTimerFinished OnTimerFinished;
```

### 广播代理

```cpp
OnColorChanged.Broadcast(NewColor, GetName());
OnTimerFinished.Broadcast(this);
```

### 绑定代理

```cpp
UFUNCTION()
void OnColorChanged(const FLinearColor& Color, const FString& Name);
void OnTimerFinished(AActor* Actor);

# Dynamic使用AddDynamic接口，纯C++调用的使用AddUObject接口
# 参数含义：第一个参数为指向对象的指针，第二个参数为该对象函数的引用
Geometry->OnColorChanged.AddDynamic(this, &AGeometryHudActor::OnColorChanged);
Geometry->OnTimerFinished.AddUObject(this, &AGeometryHudActor::OnTimerFinished);
```

:::warning

这里需要注意`OnColorChanged`代理必须要绑定一个`UFunction`

:::