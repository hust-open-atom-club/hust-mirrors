---
sidebar_label: Debian
title: Debian 软件仓库镜像使用帮助
cname: 'debian'
---

## Debian 简介与软件管理

Debian 是一个由自由和开源软件组成的 Linux 发行版。本项目创建于 1993 年，是最古老的 Linux 发行版之一。Debian 使用 Linux 内核，但大多数的基本操作系统工具都来自于 GNU 项目。因此，Debian 也常被称为 Debian GNU/Linux 操作系统。该项目由一组志愿者通过互联网协作进行协调，他们遵循着 Debian 社会契约、Debian 宪法和 Debian 自由软件准则这三个基本文件的指导。

Debian 使用软件包管理工具 APT 来管理 DEB 软件包。具体来说，Debian 通过修改 `/etc/apt/sources.list` 配置文件来管理系统软件源。一般情况下，用户可直接将该配置文件中的默认源地址 <http://deb.debian.org/> 替换为本软件镜像站。

## Debian 软件源替换

:::caution
**为避免软件源配置文件替换后产生问题，请先将系统自带的软件源配置文件进行备份，然后进行下列操作。**
:::

1. 根据个人情况对下列选项进行调整，并将生成的软件源配置替换 `/etc/apt/sources.list` 的原有内容，并进行保存。

```shell varcode
[ ] (version) { bookworm:Debian 12, bullseye:Debian 11, buster:Debian 10, testing:Testing, sid:Unstable SID} Debian 版本
[ ] (src) 启用源码镜像
---
const BACKPORTS_PREFIX = version == 'sid' ? '# ' : ''
const SID_PREFIX = version == 'sid' ? '# ' : ''
let NFW = ''
if (version == 'bookworm' || version == 'sid' || version == 'testing') 
  NFW = ' non-free-firmware'
const SRC_PREFIX = src ? "" : "# ";
---
# 默认注释了源码镜像以提高 apt update 速度，如有需要可自行取消注释
deb ${_http}://${_domain}/debian ${version} main contrib non-free${NFW}
${SRC_PREFIX}deb-src ${_http}://${_domain}/debian ${version} main contrib non-free${NFW}

${SID_PREFIX}deb ${_http}://${_domain}/debian ${version}-updates main contrib non-free${NFW}
${SID_PREFIX}${SRC_PREFIX}deb-src ${_http}://${_domain}/debian ${version}-updates main contrib non-free${NFW}

${SID_PREFIX}${BACKPORTS_PREFIX}deb ${_http}://${_domain}/debian ${version}-backports main contrib non-free${NFW}
${SID_PREFIX}${BACKPORTS_PREFIX}${SRC_PREFIX}deb-src ${_http}://${_domain}/debian ${version}-backports main contrib non-free${NFW}

${SID_PREFIX}deb http://security.debian.org/debian-security ${version}-security main contrib non-free${NFW}
${SID_PREFIX}${SRC_PREFIX}deb-src http://security.debian.org/debian-security ${version}-security main contrib non-free${NFW}
```

2. 通过如下命令更新软件。

```shell varcode
[ ] (root) 是否为 root 用户
---
const SUDO = !root ? 'sudo ' : '';
---
${SUDO}apt update
```

## 一键换源

:::caution
本方法仅适用于从官方源更换到本站源，如果您已经换过了源，请勿使用下列命令。
:::

使用 `sed` 命令将软件源配置文件中的默认源地址 <http://deb.debian.org/> 直接替换为当前镜像源站。

```shell varcode
[ ] (root) 是否为 root 用户
---
const SUDO = !root ? 'sudo ' : '';
---
${SUDO}sed -i.bak 's|http://deb.debian.org|${_http}://${_domain}|g' /etc/apt/sources.list
${SUDO}apt update
```

<div id="security"></div>

## Debian Security 源

:::caution
**为了及时地获得安全更新，防止因软件源更新而导致的安全补丁滞后问题，我们推荐直接使用官方安全更新软件源。**
:::

<https://security.debian.org> 是 Debian 的官方安全软件源。它包含了针对 Debian 发行版中已知安全漏洞的修复程序。当有新的安全更新可用时，你可以通过该源来更新你的系统。要确保你的系统及时获得安全更新，建议将该源添加到你的软件源列表中。虽然本站也同步了安全软件源，但本着对安全的严谨性，我们强烈建议使用官方软件源。

如果你一定要做这个源的替换，我们建议大家使用如下命令：

```shell varcode
[ ] (root) 是否为 root 用户
---
const SUDO = !root ? 'sudo ' : '';
---
${SUDO}sed -i.bak 's|https://security.debian.org|${_http}://${_domain}|g' /etc/apt/sources.list
${SUDO}apt update
```

或将 security 源替换为以下内容：

```shell varcode
[ ] (version) { bookworm:Debian 12, bullseye:Debian 11, buster:Debian 10, testing:Testing} Debian 版本
[ ] (src) 启用源码镜像
---
const BACKPORTS_PREFIX = version == 'sid' ? '# ' : ''
const SID_PREFIX = version == 'sid' ? '# ' : ''
let NFW = ''
if (version == 'bookworm' || version == 'sid' || version == 'testing') 
  NFW = ' non-free-firmware'
const SRC_PREFIX = src ? "" : "# ";
---
deb ${_http}://${_domain}/debian-security ${version}-security main contrib non-free${NFW}
${SRC_PREFIX}deb-src ${_http}://${_domain}/debian-security ${version}-security main contrib non-free${NFW}
```

## 注意事项

### 关于 HTTPS 源

Debian Buster 以上版本默认支持 HTTPS 源。如果遇到无法拉取 HTTPS 源的情况（如 docker 镜像中），请先使用 HTTP 源安装如下软件再进行换源。

```shell varcode
[ ] (root) 是否为 root 用户
---
const SUDO = !root ? 'sudo ' : '';
---
${SUDO}apt install apt-transport-https ca-certificates
${SUDO}apt update
```

### 关于 Debian Docker 镜像

目前，最新版的 Debian Docker（Debian 12，bookworm）镜像将默认 apt 配置文件置于 `/etc/apt/sources.list.d` 目录中。手动替换软件源时，请使用以下指令使原配置文件无效化并备份：

```shell varcode
[ ] (root) 是否为 root 用户
---
const SUDO = !root ? 'sudo ' : '';
---
${SUDO}mv /etc/apt/sources.list.d/debian.sources /etc/apt/sources.list.d/debian.sources.bak
```

## 引用

[^1] [Debian 官网](https://wiki.debian.org/zh_CN/DebianIntroduction)  
[^2] [Debian 安全更新软件源](https://www.debian.org/security/faq.en.html#mirror)  
[^3] [debian | 镜像站使用帮助 | 清华大学开源软件镜像站 | Tsinghua Open Source Mirror](https://mirrors.tuna.tsinghua.edu.cn/help/debian/)  
