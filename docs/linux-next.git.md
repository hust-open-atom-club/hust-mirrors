---
title: Linux Next Git 镜像使用帮助
sidebar_label: Linux Next
cname: 'linux-next.git'
type: repo
---

## linux-next 介绍

与 linux 其他树不同的是，linux-next 树是从子系统树合并补丁的窗口树。

:::caution
正因为 linux-next 是临时版本，所以其 master 分支仅仅代表最新版本，
如果 HEAD 追踪 master 分支，在使用 git pull 更新 master 时，会出现各种无法预料的错误。

而正确的做法应该是 clone 主线分支，而把 linux-next 作为另外一个 remote，使用标签去追踪 commit。
:::

## 使用 linux-next

1. 克隆 `Linux` 源代码，运行

```yaml cli
type: Execute
privileged: false
interpreter: shell
exec: |
  #{USE_IN_DOCS/}
  git clone ${_http}://${_domain}/git/linux.git
  #{/USE_IN_DOCS}
```

2. 将 `linux-next` 作为一个新的 remote，并更新本地分支和标签

```yaml cli
type: Execute
privileged: false
interpreter: shell
exec: |
  #{USE_IN_DOCS/}
  git remote add linux-next ${_http}://${_domain}/git/linux-next.git
  git fetch linux-next
  git fetch --tags linux-next
  #{/USE_IN_DOCS}
```

3. 检出 `linux-next` 的 commit

```bash
git tag -l "next-*" | tail
```

git 工具会输出类似下面的结果

```
next-20231101
next-20231102
...
```

然后通过 tag 检出到新的本地分支

```bash
git checkout -b new_local_branch next-20231101
```

最后在本地的 `new_local_branch` 开展你的工作。


## 引用

1. [校园网联合镜像站](https://mirrors.cernet.edu.cn/about)  
2. [帮助仓库](https://github.com/mirrorz-org/mirrorz-help)  
3. [Working with linux-next](https://www.kernel.org/doc/man-pages/linux-next.html)
