---
title: "用 Astro 构建极速个人博客"
description: "探索 Astro 框架的零 JS 理念，以及如何用它搭建一个兼顾美观与性能的个人博客。"
pubDate: 2026-05-20
category: "技术"
tags: ["Astro", "前端", "性能优化"]
featured: true
---

## 为什么选择 Astro？

在众多前端框架中，**Astro** 有一个独特的理念：默认不向客户端发送任何 JavaScript。

这听起来有些激进，但对于内容型网站（博客、文档、作品集），这恰恰是正确的选择。

## 核心概念

### Islands 架构

Astro 的核心是"孤岛架构"——大多数页面是纯静态 HTML，只有需要交互的部分才水合为动态组件。

```astro
---
// 这段代码只在构建时运行，不会发送到浏览器
const posts = await fetchPosts();
---

<ul>
  {posts.map(post => <li>{post.title}</li>)}
</ul>
```

### 内容集合

通过 Content Collections API，可以类型安全地管理 Markdown 文章：

```typescript
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date(),
    tags: z.array(z.string()).default([]),
  }),
});
```

## 性能数据

实测 Lighthouse 分数：

| 指标 | 分数 |
|------|------|
| Performance | 99 |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |

## 结语

对于个人博客这样的场景，Astro 是目前我用过体验最好的框架。构建速度快、输出体积小、开发体验也很舒适。

---

如果你也在考虑搭建个人博客，不妨给 Astro 一个机会。
