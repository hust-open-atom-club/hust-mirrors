---
sidebar_label: Alpine Linux
title: Alpine Linux 软件仓库镜像使用帮助
---

Alpine Linux 是一个面向安全，轻量级的基于musl libc与busybox项目的Linux发行版。

在终端输入以下命令以替换镜像源：
```shell varcode
sed -i 's#https\?://dl-cdn.alpinelinux.org/alpine#${_http}://${_domain}/alpine#g' /etc/apk/repositories
```
更改完 `/etc/apk/repositories` 文件后请运行 `apk update` 更新索引以生效。

## 引用
[^1] [Tuna镜像源使用帮助](https://mirrors.tuna.tsinghua.edu.cn/help/CPAN/)  