---
title: Linux Next Git 镜像使用帮助
sidebar_label: Linux Next
cname: 'linux-next.git'
---

## linux-next 介绍

与linux其他树不同的是，linux-next树是从子系统树合并补丁的窗口树。

:::caution
正因为linux-next是临时版本，所以其master分支仅仅代表最新版本，
如果HEAD追踪master分支，在使用git pull更新master时，会出现各种无法预料的错误。

而正确的做法应该是clone主线分支，而把linux-next作为另外一个remote，使用应该使用标签去追踪commit
:::

## 使用linux-next

1. 克隆 `Linux` 源代码，运行

```bash varcode
git clone ${_http}://${_domain}/git/linux.git
```

2. 将 `linux-next` 作为一个新的remote，并更新本地分支和标签

```bash varcode
git remote add linux-next ${_http}://${_domain}/git/linux-next.git
git fetch linux-next
git fetch --tags linux-next
```

3. 检出 `linux-next` 的commit

```bash
git tag -l "next-*" | tail
```

git工具会输出类似下面的结果

```
next-20231101
next-20231102
...
```

然后通过tag检出到新的本地分支

```bash
git checkout -b new_local_branch next-20231101
```

最后在本地的`new_local_branch`开展你的工作。


## 引用

[^1] [校园网联合镜像站](https://mirrors.cernet.edu.cn/about)  
[^2] [帮助仓库](https://github.com/mirrorz-org/mirrorz-help)  
[^3] [关于Git镜像](about-git)  
[^4] [Working with linux-next](https://www.kernel.org/doc/man-pages/linux-next.html)
