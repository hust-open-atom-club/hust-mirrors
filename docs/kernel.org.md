---
sidebar_label: kernel.org
title: kernel.org 镜像使用帮助
type: repo
---

## kernel.org 简介
kernel.org 是 Linux 内核官方主站，托管着内核源码（如 tarball 归档、Git 仓库）、补丁、签名文件、文档等关键资源。

## 镜像仓库介绍

该镜像站点镜像了 [https://www.kernel.org/pub/](https://www.kernel.org/pub/)。


## 使用
在使用时，将链接里的 `https://www.kernel.org/pub/` 替换为以下内容：
```url varcode
${_http}://${_domain}/kernel.org/
```
即可使用。
