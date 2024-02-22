---
title: LLVM Project Git 镜像使用帮助
sidebar_label: llvm-project.git
cname: llvm-project.git
slug: /llvm-project.git
upstream: llvm-project.git
upstream_sha256: 12318cd134a186583754369b8ae2d82af1906f5e714de5e007c122e6cd7b5cca
mirrorz: true
---
:::tip 该文档来自MirrorZ Help
本文档于*2024年2月22日*自动生成，[点击查看原文](https://help.mirrors.cernet.edu.cn/llvm-project.git)。  
其中可能存在失效链接或其他问题，如遇到问题请及时[反馈](https://gitee.com/dzm91_hust/hust-mirrors/issues)。
:::


本镜像镜像了如下仓库：

```
https://github.com/llvm/llvm-project.git
```

如需克隆代码，使用

```plain varcode
---
---
git clone ${_http}://${_domain}/llvm-project.git
```

由于仓库体积均较大，执行`git clone`可能需要较长时间，并且没有进度提示，请耐心等候。

若要将 mirror 加入已有代码库，可在已有仓库中运行

```plain varcode
---
---
git remote add mirror ${_http}://${_domain}/llvm-project.git
```

或运行

```plain varcode
---
---
git remote set-url origin ${_http}://${_domain}/llvm-project.git
```

将默认上游设置为镜像站

注：如需要各个子项目的发布版本代码，请至 [GitHub Release 镜像](#) 中 llvm-project 一节。
