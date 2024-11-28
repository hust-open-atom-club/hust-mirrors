---
sidebar_label: Buildroot
title: Buildroot 仓库镜像使用帮助
---

## Buildroot 简介

Buildroot 是一个创建嵌入式 Linux 系统的框架。其采用 KBuild 框架编写，由 Makefile 和 KConfig 文件构成，可以很方便的像编译内核一样，使用 menuconfig 修改配置，为各种架构的嵌入式设备创建 Linux 根文件系统、交叉编译工具链。

## Buildroot 下载

如果官方站点连接速度缓慢，直接前往该镜像站的[下载页面](/release?release=Buildroot)。
选择 buildroot，并选择所需要的版本进行下载。

然后在本地使用 tar 工具进行解包。

## Buildroot 换源

Buildroot 在构建过程中需要使用 kernel、gnu、CPAN 等源。

除此以外的其他源码包会在上游仓库或者其备用服务器 [http://sources.buildroot.net/](http://sources.buildroot.net/)下载。

本镜像站已经镜像 gnu 和 CPAN 以及 kernel，可以在 buildroot 的配置文件中修改这些源地址。

### 方法一：手动修改

首先备份你的 config 文件，并手动修改配置信息。（可以使用 menuconfig，nconfig，甚至可以直接编辑文件进行修改）

```raw varcode
BR2_KERNEL_MIRROR="${_http}://${_domain}/kernel.org"
BR2_GNU_MIRROR="${_http}://${_domain}/gnu"
BR2_CPAN_MIRROR="${_http}://${_domain}/CPAN"
```

### 方法二：使用脚本替换

:::info
使用脚本替换前，请确保已经存在 `.config` 文件。可以使用 `make defconfig` 生成默认配置文件。
:::

在 buildroot 根目录（有 `.config` 文件的目录）运行下面的替换脚本：

```bash varcode
sed -i.old \\
    -e '/BR2_KERNEL_MIRROR/c\\BR2_KERNEL_MIRROR="${_http}://${_domain}/kernel.org"' \\
    -e '/BR2_GNU_MIRROR/c\\BR2_GNU_MIRROR="${_http}://${_domain}/gnu"' \\
    -e '/BR2_CPAN_MIRROR/c\\BR2_CPAN_MIRROR="${_http}://${_domain}/CPAN"' \\
    .config

```

然后执行 `make` 开始构建。
