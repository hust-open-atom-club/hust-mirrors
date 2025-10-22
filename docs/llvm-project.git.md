---
title: LLVM Project Git 镜像使用帮助
sidebar_label: llvm-project.git
type: repo
---


## LLVM Project 介绍

LLVM 是一个开源的项目，是一个编译器框架，是一系列模块化、可重用的编译器以及工具链技术的集合。

其包含了一系列子项目：clang、lldb、libc++、libc++abi、klee、lld 等。


## 镜像仓库介绍

该镜像站点镜像了 LLVM Project 的 [GitHub 仓库](https://github.com/llvm/llvm-project.git)。

:::info 发布版本
如果需要各个子项目的发布版本源代码，该镜像站暂时不提供镜像，请至 [GitHub Release](https://github.com/llvm/llvm-project/releases) 下载。
:::

## LLVM Project Git 镜像使用帮助

如需克隆代码，使用
```yaml cli
type: Execute
privileged: false
interpreter: shell
exec: |
  #{USE_IN_DOCS/}
  git clone ${_http}://${_domain}/llvm-project.git
  #{/USE_IN_DOCS}
```

由于仓库体积均较大，执行 `git clone` 可能需要较长时间。

若要将 mirror 加入已有代码库，可在已有仓库中运行

```shell varcode
git remote add mirror ${_http}://${_domain}/llvm-project.git
```

或运行

```yaml cli
type: Execute
privileged: false
interpreter: shell
exec: |
  #{USE_IN_DOCS/}
  git remote set-url origin ${_http}://${_domain}/llvm-project.git
  #{/USE_IN_DOCS}
```

将默认上游设置为镜像站
