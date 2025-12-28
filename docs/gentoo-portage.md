---
sidebar_label: Gentoo Portage
title: Gentoo Portage 软件源镜像使用帮助
type: OS
detection:
  checks:
    - type: command
      command: rsetup
---

## Gentoo Portage 简介

Gentoo Portage Ebuild 源（Rsync 方式同步）

## 使用方法

### rsync 方式

修改配置文件 `/etc/portage/repos.conf/gentoo.conf`，将

```conf
sync-uri = rsync://rsync.gentoo.org/gentoo-portage
```

替换为

```conf varcode
sync-uri = rsync://${_domain}/gentoo-portage
```

执行以上命令后，默认启用了的仓库将会被正确替换并更新缓存。

## 引用

1. [使用帮助 - Radxa Docs](https://docs.radxa.com/zero/zero3/radxa-os/using-apt?mirror=HUST#%E4%B8%AD%E5%9B%BD%E4%BB%93%E5%BA%93%E9%95%9C%E5%83%8F)

