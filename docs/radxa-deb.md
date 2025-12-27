---
sidebar_label: RadxaOS
title: RadxaOS Deb软件源镜像使用帮助
---

## RadxaOS 简介

RadxaOS 是基于 Debian / Ubuntu 基础上进行二次开发而获得的系统。
本镜像源为 RadxaOS 独有的软件包提供了额外的仓库的镜像源。

## Debian 软件源替换

对于来自 Debian 的部分源，可以参考 [Debian 帮助](./debian)进行修改。

## RadxaOS 软件源替换

### 一键换源

:::caution
本方法仅适用于从官方源更换到本站源，如果您已经换过了源，请勿使用下列命令。
:::
打开终端，执行以下命令，替换默认的软件源配置：

```shell varcode
[ ] (root) 是否为 root 用户
---
const SUDO = !root ? 'sudo ' : '';
---
${SUDO}sed -i "s|https://radxa-repo.github.io|https://mirrors.hust.edu.cn/radxa-deb|g" /etc/apt/sources.list.d/*radxa*.list
${SUDO}apt-get update
```

执行以上命令后，默认启用了的仓库将会被正确替换并更新缓存。

## 引用

1. [使用帮助 - Radxa Docs](https://docs.radxa.com/zero/zero3/radxa-os/using-apt?mirror=HUST#%E4%B8%AD%E5%9B%BD%E4%BB%93%E5%BA%93%E9%95%9C%E5%83%8F)
