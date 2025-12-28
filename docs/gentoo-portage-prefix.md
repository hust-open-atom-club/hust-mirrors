---
sidebar_label: Gentoo Portage Prefix
title: Gentoo Portage Prefix 软件源镜像使用帮助
---

## Gentoo Portage Prefix 简介

为了突出 Gentoo 在不同操作系统上的优点，Gentoo Prefix 项目开发并维护了一种在非标准位置安装 Gentoo 系统的方法。

:::tip
Gentoo Prefix Portage tree 已合并进 gentoo.git。如果您是 Linux 用户，请使用 [gentoo-portage rsync 镜像](gentoo-portage)。此 repo 专为 macOS 下 prefix 用户而设。
:::

## 使用方法

### Gentoo Portage Prefix 镜像配置

在 `$EPREFIX/etc/portage` 目录下创建名为 `repos.conf` 的**目录**，在 `$EPREFIX/etc/portage/repos.conf/gentoo.conf` 中加入如下内容：

```conf varcode
[gentoo_prefix]
sync-uri = rsync://${_domain}/gentoo-portage-prefix
```

## 引用

1. [使用帮助 - TUNA Mirror](https://mirrors.tuna.tsinghua.edu.cn/help/gentoo-prefix/)
2. [Wiki - Gentoo Linux](https://wiki.gentoo.org/wiki/Project:Prefix)

