---
sidebar_label: Alpine Linux
title: Alpine Linux 软件仓库镜像使用帮助
cname: AplineLinux
---
## Alpine Linux 简介与软件管理
Alpine Linux是一个基于musl libc和BusyBox的独立、非商业、通用的Linux发行版，旨在提供小巧、简单、安全和高效的基础系统。Alpine Linux的设计理念是“Keep It Simple”，并且由于其轻量级和高效的特性，它在Docker和Kubernetes等容器环境中非常受欢迎。

Alpine Linux的包管理系统是apk（Alpine Package Keeper）。apk是一个用于Alpine Linux的包管理工具，它可以用于安装新的软件包、升级或删除已存在的软件包、更新软件包索引等。

## Alpine Linux 软件源替换

:::caution
**为避免软件源配置文件替换后产生问题，请先将系统自带的软件源配置文件进行备份，然后进行下列操作。**
:::

1. 编辑 `/etc/apk/repositories`，将下列内容替换原有的内容：

```bash varcode
[ ] (version) {  v3.16:v3.16, v3.17:v3.17, v3.18:v3.18, v3.19:v3.19 } Alpine 版本
---
---
${_http}://${_domain}/alpine/${version}/main
${_http}://${_domain}/alpine/${version}/community
```

2. 更新软件包缓存

```shell varcode
[ ] (root) 是否为 root 用户
---
const SUDO = !root ? 'sudo ' : '';
---
${SUDO}apk update
```

## 一键换源

:::caution
本方法仅适用于从官方源更换到本站源，如果您已经换过了源，请勿使用下列命令。
:::

使用 `sed` 命令将软件源配置文件中的默认源地址 <http://dl-cdn.alpinelinux.org> 直接替换为当前镜像源站：

```shell varcode
[ ] (root) 是否为 root 用户
---
const SUDO = !root ? 'sudo' : '';
---
${SUDO}sed -i 's/dl-cdn.alpinelinux.org/${_domain}/g' /etc/apk/repositories
```

## 引用
[^1] [Tuna镜像源使用帮助](https://mirrors.tuna.tsinghua.edu.cn/help/alpine/)  