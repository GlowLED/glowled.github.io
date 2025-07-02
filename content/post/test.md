---
title: "Test"
description: "test"
keywords: "test"

date: 2025-07-02T09:56:24+08:00
lastmod: 2025-07-02T09:56:24+08:00
draft: false

math: true
mermaid: false

categories: ["测试"]
tags: ["Hugo", "Test"]
---
Test

这是一篇测试文章，用来验证Hugo博客系统是否正常工作。

<!--more-->

## 测试内容

这里是文章的详细内容。

### 功能测试

- [x] 文章显示
- [x] 分类和标签
- [ ] 评论功能
- [ ] 搜索功能

### 代码示例

```python
def hello_world():
    print("Hello, Hugo!")
    return "成功发布文章"

hello_world()
```

这是文章的结尾。


$$
R^d_{\Theta,m} =
\begin{pmatrix}
\cos m\theta_0 & -\sin m\theta_0 & 0 & 0 & \cdots & 0 & 0
\\
\sin m\theta_0 & \cos m\theta_0 & 0 & 0 & \cdots & 0 & 0 
\\
0 & 0 & \cos m\theta_1 & -\sin m\theta_1 & \cdots & 0 & 0 
\\
0 & 0 & \sin m\theta_1 & \cos m\theta_1  & \cdots & 0 & 0
\\
\vdots & \vdots & \vdots & \vdots & \ddots & \vdots & \vdots 
\\
0 & 0 & 0 & 0 & ... & \cos m\theta_{d/2-1} & -\sin m\theta_{d/2-1}
\\
0 & 0 & 0 & 0 & ... & \sin m\theta_{d/2-1} & \cos m\theta_{d/2-1}
\end{pmatrix}
$$
$$
r^d_{\theta_0,m}=  
\begin{pmatrix} 
\cos m\theta_0 & -\sin m\theta_0 \\ 
\sin m\theta_0 & \cos m\theta_0 
\end{pmatrix}
$$

$$
x_{m,part_0}=
\begin{pmatrix}
x_0\\
x_1
\end{pmatrix}
$$

$$
R^d_{\Theta,m}x_m= \begin{pmatrix} 
x_0\\ 
x_1\\ 
x_2\\ 
x_3\\ 
\vdots\\ 
x_{d-2}\\ 
x_{d-1} 
\end{pmatrix} 
\odot 
\begin{pmatrix} 
\cos m\theta_0\\ 
\cos m\theta_0\\ 
\cos m\theta_1\\ 
\cos m\theta_1\\ 
\vdots\\ 
\cos m\theta_{d/2-1}\\ 
\cos m\theta_{d/2-1} 
\end{pmatrix} 
+ 
\begin{pmatrix} 
-x_1\\ 
x_0\\ 
-x_3\\ 
x_2\\ 
\vdots\\ 
-x_{d-1}\\ 
x_{d-2} 
\end{pmatrix} 
\odot 
\begin{pmatrix} 
\sin m\theta_0\\ 
\sin m\theta_0\\ 
\sin m\theta_1\\ 
\sin m\theta_1\\ 
\vdots\\ 
\sin m\theta_{d/2-1}\\ 
\sin m\theta_{d/2-1} 
\end{pmatrix}
$$

$$
R^d_{\Theta,m}x_m= 
\begin{pmatrix} 
x_0\\ 
x_1\\ 
x_2\\ 
\vdots\\ 
x_{d/2-1}\\ 
x_{d/2}\\ 
x_{d/2+1}\\ 
x_{d/2+2}\\ 
\vdots\\ 
x_{d-1} 
\end{pmatrix} 
\odot 
\begin{pmatrix} 
\cos m\theta_0\\ 
\cos m\theta_1\\ 
\cos m\theta_2\\ 
\vdots\\ 
\cos m\theta_{d/2-1}\\ 
\cos m\theta_0\\ 
\cos m\theta_1\\ 
\cos m\theta_2\\ 
\vdots \\ 
\cos m\theta_{d/2-1} 
\end{pmatrix} 
+ 
\begin{pmatrix} 
-x_{d/2}\\ 
-x_{d/2+1}\\ 
-x_{d/2+2}\\ 
\vdots\\ 
-x_{d-1}\\ 
x_0\\ 
x_1\\ 
x_2\\ 
\vdots\\ 
x_{d/2-1} 
\end{pmatrix} 
\odot 
\begin{pmatrix} 
\sin m\theta_0\\ 
\sin m\theta_1\\ 
\sin m\theta_2\\ 
\vdots\\ 
\sin m\theta_{d/2-1}\\ 
\sin m\theta_0\\ 
\sin m\theta_1\\ 
\sin m\theta_2\\ 
\vdots \\ 
\sin m\theta_{d/2-1} 
\end{pmatrix}
$$