---
title: "Android 开发那些年：我踩过的十个坑"
description: "从初学者到能独当一面，五年 Android 开发路上让我印象最深的十个坑。"
pubDate: 2026-04-15
category: "技术"
tags: ["Android", "Kotlin", "经验总结"]
---

五年前，我写下了第一行 Kotlin 代码。

那时候还不知道什么是协程、不知道 ViewModel 为什么重要，也不知道为什么 `runOnUiThread` 会让同事皱眉头。

现在回过头看，那些踩过的坑，每一个都是值钱的。

## 坑一：在主线程做网络请求

这是每个 Android 新手都会犯的错误。

```kotlin
// ❌ 错误写法 — 直接在主线程请求
val result = okHttpClient.newCall(request).execute()

// ✅ 正确写法 — 用协程切换到 IO 线程
viewModelScope.launch {
    val result = withContext(Dispatchers.IO) {
        okHttpClient.newCall(request).execute()
    }
}
```

系统会直接抛出 `NetworkOnMainThreadException`，而且这还是相对友好的——更糟糕的是 ANR，用户会看到"应用无响应"弹窗。

## 坑二：Activity 内存泄漏

长时间运行的操作持有 Activity 引用，导致 Activity 无法被 GC 回收。

解决方案：使用 `WeakReference`，或者更好的——用 `ViewModel` + `LiveData` 彻底分离生命周期。

## 坑三：忽视 RecyclerView 的 ViewHolder 复用

这个坑我踩了好久。RecyclerView 会复用 ViewHolder，如果你在 `onBindViewHolder` 里设置了监听器但没有及时清除，滑动列表时会出现各种奇怪的行为。

```kotlin
// ✅ 正确做法：在 bind 里重新设置监听器
fun bind(item: Post) {
    // 先清除旧监听器
    checkBox.setOnCheckedChangeListener(null)
    checkBox.isChecked = item.isLiked
    // 再设置新监听器
    checkBox.setOnCheckedChangeListener { _, isChecked ->
        onLikeClick(item, isChecked)
    }
}
```

---

剩下的七个坑，留到下一篇再讲。有些故事，需要一点铺垫才能说清楚。
