---
title: Markdown Extended Features
published: 2024-05-01
updated: 2024-11-29
description: 'Read more about Markdown features in Fuwari'
image: ''
tags: [Demo, Example, Markdown, Fuwari]
category: 'Examples'
draft: false
series:
  name: "语法"
  order: 2
---

## GitHub Repository Cards
可以添加 链接到GitHub库的动态卡片，页面加载时，存储库信息将从 GitHub API 获取 

::github{repo="saicaca/fuwari"}

方法是： `::github{repo="<owner>/<repo>"}`.

```markdown
例如：
::github{repo="saicaca/fuwari"}
```

## Admonitions

支持一下几种警告: `note` `tip` `important` `warning` `caution`

:::note
突出显示即使快速浏览也应该考虑的信息.
:::

:::tip
可选信息，意在帮助用户.
:::

:::important
用户成功所需的关键信息.
:::

:::warning
由于潜在风险，关键内容需要用户立即关注.
:::

:::caution
做了某事到可能会导致某后果.
:::

### Basic Syntax

```markdown
:::note
Highlights information that users should take into account, even when skimming.
:::

:::tip
Optional information to help a user be more successful.
:::
```

### Custom Titles

警告的标题可以自定义.

:::note[MY CUSTOM TITLE]
This is a note with a custom title.
:::

```markdown
:::note[MY CUSTOM TITLE]
This is a note with a custom title.
:::
```

### GitHub Syntax

> [!TIP]
> [The GitHub syntax](https://github.com/orgs/community/discussions/16925) is also supported.

```
> [!NOTE]
> The GitHub syntax is also supported.

> [!TIP]
> The GitHub syntax is also supported.
```

### Spoiler

可以添加 spoilers. markdown 语法中也有文本

The content :spoiler[is hidden **ayyy**]!

```markdown
The content :spoiler[is hidden **ayyy**]!

```

