---
title: Markdown Example
published: 2023-10-01
description: A simple example of a Markdown blog post.
tags: [Markdown, Blogging, Demo]
category: Examples
draft: false
---

# An h1 header

段落之间使用空行分隔

 _斜体_, **加粗**, and `等宽字体`. 列表项样式：

- this one
- this one
- 。。。

> 块引号
> 这样写
>
> They can span multiple paragraphs,
> if you like.

使用两个空格("  ")可进行强制换行  
三个短横("---")表示长破折号：12---14  
两个短横表示段破折号，或者范围： 12--14  
三个点... 可表示破折号  

## An h2 header

数字

1. first item
2. second item
3. third item

注意，实际文本是从左侧第4个字符开始的。以下是代码示例：
    
    # Let me re-iterate ...
    for i in 1 .. 10 { do-something(i) }

上面仅缩进4个空格就表示了代码块，除此之外，通常使用分隔符进行代码的分隔：
```
define foobar() {
    print "Welcome to flavor country!";
}
```

可以表示代码块语言，以便Pandoc 对语法进行高亮显示：

```python
import time
# Quick, count to ten!
for i in range(10):
    # (but not *too* quick)
    time.sleep(0.5)
    print i
```

### An h3 header

嵌套列表：

1. 第一步：

    - carrots
    - celery
    - lentils

2. 第二步
    ```
    (代码分隔符形式)
    ```

3. 第三步:

        (缩进形式)
        find wooden spoon
        uncover pot
        stir
        cover pot
        balance wooden spoon precariously on pot handle
        wait 10 minutes
        goto first step (or shut off burner when done)

    other something want to write

依然注意代码块的缩进（4个字符）

这是链接写法： [a website](http://foo.bar), to [另一个文章](/posts/guide/hello-world/), and to [当前文章的某个标题](#an-h2-header). 这是脚注 [^1].

[^1]: 这是footnote.

#### An h4 Header

这里原本使用了另一种表示多种格式的方式，但是目前不支持所以仅使用传统markdown 写法

**表格：**

**Table: Shoes, their sizes, and what they're made of**

| Size | Material | Color |
|---|---|---|
| 9 | leather | brown |
| 10 | hemp canvas | natural |
| 11 | glass | transparent |

**分割线：**

---


行块：末尾使用双空格进行强制换行

Line one  
Line two  
Line three  

或者接<br>
Line one<br>
Line two<br>
Line three


**图片显示**

    ![example image](图片链接)
![example image](./Test.jpg)



行内数学公式的写法: $\omega = d\phi / dt$. 显示数学公式时，应单独占一行，并用双美元符号括起来:

$$I = \int \rho R^{2} dV$$

$$
\begin{equation*}
\pi
=3.1415926535
 \;8979323846\;2643383279\;5028841971\;6939937510\;5820974944
 \;5923078164\;0628620899\;8628034825\;3421170679\;\ldots
\end{equation*}
$$

可以使用反斜杠转义任何希望按字面意思显示的符号: \`foo\`, \*bar\*, etc.(这样例如foo就不会格式化了)

更多的的写法： [Markdown Extended](/posts/guide/markdown-extended/)

丰富的代码显示：[Expressive Code](/posts/guide/expressive-code/)

