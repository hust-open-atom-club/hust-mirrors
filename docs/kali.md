---
sidebar_label: Kali
title: Kali Linux 软件仓库镜像使用帮助
cname: 'kali'
---

## Kali 简介与软件管理

`Kali Linux` 是一款开源的，基于 `Debian` 的 Linux 发行版。其目的在于为包括渗透测试，安全研究，逆向工程在内的多种信息安全工作提供强大的工具支持。

`Kali` 使用软件包管理工具 `APT` 来管理 `DEB` 软件包。具体来说，`Kali` 通过修改 `/etc/apt/sources.list` 配置文件来管理系统软件源。一般情况下，用户可直接将该配置文件中的默认源地址（即，`http://http.kali.org/`）替换为本软件镜像站。

## Kali 软件源替换

:::caution
**为避免软件源配置文件替换后产生问题，请先将系统自带的软件源配置文件进行备份，然后进行下列操作。**
:::

:::caution
本方法仅适用于从官方源更换到本站源，如果您已经换过了源，请勿使用下列命令。
:::

使用 `sed` 命令将软件源配置文件中的默认源地址 <http://http.kali.org/> 直接替换为当前镜像源站。

```shell varcode
[ ] (root) 是否为 root 用户
---
const SUDO = !root ? 'sudo ' : '';
---
${SUDO}sed -E -e 's|https?://([^/]+)/kali|${_http}://${_domain}/kali|' /etc/apt/sources.list
```

## 注意事项

- Kali 默认使用 HTTP 源。如果您选择使用 HTTPS 源后遇到无法拉取 HTTPS 源的情况，请使用 HTTP 源安装如下软件。

```shell varcode
[ ] (root) 是否为 root 用户
---
const SUDO = !root ? 'sudo ' : '';
---
${SUDO}apt install apt-transport-https ca-certificates
${SUDO}apt update
```
