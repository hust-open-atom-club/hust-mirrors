---
sidebar_label: Buildroot
title: Buildroot 仓库镜像使用帮助
---

## Buildroot简介

Buildroot是一个创建嵌入式Linux系统的框架。其采用KBuild框架编写，由Makefile和KConfig文件构成，可以很方便的像编译内核一样，使用menuconfig修改配置，为各种架构的嵌入式设备创建Linux根文件系统、交叉编译工具链。

## Buildroot下载

如果官方站点连接速度缓慢，直接前往该镜像站的[下载页面](/release)。
选择buildroot，并选择所需要的版本进行下载。

然后在本地使用tar工具进行解包。

## Buildroot换源

Buildroot在构建过程中需要使用kernel、gnu、CPAN等源。

除此以外的其他源码包会在上游仓库或者其备用服务器<http://sources.buildroot.net/>下载。

本镜像站已经镜像gnu和CPAN，kernel的镜像可以使用[中科大开源镜像站](https://mirrors.ustc.edu.cn/kernel.org/)提供的kernel镜像。


首先备份你的config文件，并使用menuconfig修改配置信息

```raw varcode
BR2_KERNEL_MIRROR="${_http}://mirrors.ustc.edu.cn/kernel.org"
BR2_GNU_MIRROR="${_http}://${_domain}/gnu"
BR2_CPAN_MIRROR="${_http}://${_domain}/CPAN"
```

或者在buildroot根目录（有.config文件的目录）运行下面的替换脚本：

```bash varcode
sed -i.old \\
    -e '/BR2_KERNEL_MIRROR/c\\BR2_KERNEL_MIRROR="https://mirrors.ustc.edu.cn/kernel.org"' \\
    -e '/BR2_GNU_MIRROR/c\\BR2_GNU_MIRROR="${_http}://${_domain}/gnu"' \\
    -e '/BR2_CPAN_MIRROR/c\\BR2_CPAN_MIRROR="${_http}://${_domain}/CPAN"' \\
    .config

```

然后执行`make`开始构建。
