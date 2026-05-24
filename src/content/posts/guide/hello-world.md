---
title: Hello World
published: 2024-02-28
description: 引导与内容测试
image: "./guide.jpg"
tags: ["Guide", "Test"]
category: Test
draft: false
pinned: true
license:
    name: "Test"
    url: "https://astro.build/"

---

> 图片存在于当前路径下，似乎也可以放置远程图片

Welcome to [Astro](https://astro.build/) and [Fuwari](https://github.com/saicaca/fuwari). 

# Guides
写 blog 基础使用方式
具体markdown 格式看：[Markdown Example](/posts/guide/markdown/)
## Front-matter of Posts

```yaml
---
title: My First Blog Post
published: 2023-09-09
description: This is the first post of my new Astro blog.
image: ./cover.jpg
tags: [Foo, Bar]
category: Front-end
draft: false
pinned: true
comments: false
license：false
---
```


标识含义：
| Attribute     | Description                                                                                                                                                                                                 |
|---------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `title`       | The title of the post.                                                                                                                                                                                      |
| `published`   | The date the post was published.                                                                                                                                                                            |
| `description` | A short description of the post. Displayed on index page.                                                                                                                                                   |
| `image`       | The cover image path of the post.<br/>1. Start with `http://` or `https://`: Use web image<br/>2. Start with `/`: For image in `public` dir<br/>3. With none of the prefixes: Relative to the markdown file |
| `tags`        | The tags of the post.                                                                                                                                                                                       |
| `category`    | The category of the post.                                                                                                                                                                                   |
| `draft`        | If this post is still a draft, which won't be displayed.                                                                                                                                                    |
|`pinned`| 表示文章是否为置顶|
|`license`| 表示文章协议内容:<br/>false 表示不显示协议<br/>不写代表默认协议CC BY-NC-SA 4.0<br/>更改协议使用：<br/>license:<br/>  name: "CC BY 4.0"<br/>  url: "https://creativecommons.org/licenses/by/4.0/" 注意url:与name: 后面是有空格的|
| `comments` |表示是否开启评论区|



## Where to Place the Post Files
文章放在  `src/content/posts/` 目录 ，也可在其中创建子目录进行文章管理
```
src/content/posts/
├── post-1.md
└── post-2/
    ├── cover.png
    └── index.md
```

# Draft 
当draft 被标记为 true 意味着此文章不会公开
想要公开则 更改 draft true -> false 即可
```markdown
---
title: Draft Example
published: 2024-01-11T04:40:26.381Z
tags: [Markdown, Blogging, Demo]
category: Examples
draft: false
---
```

# VideoTest

仅将视频链接直接复制到如下格式的src中即可

```yaml
---
title: Include Video in the Post
published: 2023-10-19
// ...
---
<iframe width="100%" height="468" src="https://www.youtube.com/embed/5gIf0_xpFPI?si=N1WTorLKL0uwLsU_" title="YouTube video player" frameborder="0" allowfullscreen></iframe>
```
## YouTube

<iframe width="100%" height="468" src="https://www.youtube.com/embed/5gIf0_xpFPI?si=N1WTorLKL0uwLsU_" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## Bilibili

<iframe width="100%" height="468" src="//player.bilibili.com/player.html?bvid=BV1fK4y1s7Qf&p=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>




