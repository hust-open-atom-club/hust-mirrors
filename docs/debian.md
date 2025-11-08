---
sidebar_label: Debian
title: Debian 软件仓库镜像使用帮助
cname: 'debian'
typs: OS
detection:
  checks:
    - type: os_release
      name: Debian GNU/Linux
---

## Debian 简介与软件管理

Debian 是一个由自由和开源软件组成的 Linux 发行版。本项目创建于 1993 年，是最古老的 Linux 发行版之一。Debian 使用 Linux 内核，但大多数的基本操作系统工具都来自于 GNU 项目。因此，Debian 也常被称为 Debian GNU/Linux 操作系统。该项目由一组志愿者通过互联网协作进行协调，他们遵循着 Debian 社会契约、Debian 宪法和 Debian 自由软件准则这三个基本文件的指导。

Debian 使用软件包管理工具 APT 来管理 DEB 软件包。具体来说，Debian 通过修改 `/etc/apt/sources.list` 配置文件来管理系统软件源。一般情况下，用户可直接将该配置文件中的默认源地址 [http://deb.debian.org/](http://deb.debian.org/) 替换为本软件镜像站。

## Debian 软件源替换

### 一键换源

:::caution
本方法仅适用于从官方源更换到本站源，如果您已经换过了源，请勿使用下列命令。
:::

使用 `sed` 命令将软件源配置文件中的默认源地址 [http://deb.debian.org/](http://deb.debian.org/) 直接替换为当前镜像源站。

```yaml cli
type: ReplaceIfExist
required: true
description: 替换Debian主仓库
privileged: true
files:
  - path: /etc/apt/sources.list.d/debian.sources
    match: '^URIs: .*deb.debian.com.*'
    replace: 'URIs: ${_http}:\/\/${_domain}\/debian\/'
    comment: '> 对于Debian 12及**以上**版本，使用这个命令'
  - path: /etc/apt/sources.list
    match: '^deb .*debian.*'
    replace: 'deb ${_http}:\/\/${_domain}\/debian\/'
    comment: '> 对于Debian 11及**以下**版本，使用这个命令'
display_policy:
  kind: OneOf
  variables:
    - name: version
      description: Debain 版本
      options:
        - name: '>= 12'
          display: 
            - 1
        - name: '<= 11'
          display:
            - 2
```


:::caution
**为避免软件源配置文件替换后产生问题，请先将系统自带的软件源配置文件进行备份，然后进行下列操作。**
:::

### 1. 根据个人情况对下列选项进行调整，并使用如下软件源配置替换 `/etc/apt/sources.list` 的原有内容：

```shell varcode
[ ] (version) { trixie:Debian 13, bookworm:Debian 12, bullseye:Debian 11, buster:Debian 10, testing:Testing, sid:Unstable SID} Debian 版本
[ ] (src) 启用源码镜像
---
const BACKPORTS_PREFIX = version == 'sid' ? '# ' : ''
const SID_PREFIX = version == 'sid' ? '# ' : ''
let NFW = ''
if (version == 'trixie' || version == 'bookworm' || version == 'sid' || version == 'testing') 
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

### 2. 通过如下命令更新软件。

```yaml cli
type: Execute
privileged: true
interpreter: shell
exec: |
  #{USE_IN_DOCS/}
  apt-get update
  #{/USE_IN_DOCS}
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


## Debian CD 镜像 {#cd}

Debian 官方提供两种安装镜像：网络安装镜像（文件名含有 `netinst`）及 Live CD 镜像（文件名含有 `live`）。

- [网络安装镜像（点此跳转至下载页面）](/release/?release=Debian)：网络安装镜像只包含安装基本系统所需的最少的软件，通常具有较小的体积，但是需要互联网连接以安装完整系统。
- [Live CD 镜像（点此跳转至下载页面）](/release/?release=Debian%20Live%20CD%20(amd64))：Live CD 镜像可用于直接启动 Debian 系统，并在没有互联网连接时完成安装，但仅支持 amd64 架构。

## Debian Security 源 {#security}

:::caution
**为了及时地获得安全更新，防止因软件源更新而导致的安全补丁滞后问题，我们推荐直接使用官方安全更新软件源。**
:::

[https://security.debian.org](https://security.debian.org) 是 Debian 的官方安全软件源。它包含了针对 Debian 发行版中已知安全漏洞的修复程序。当有新的安全更新可用时，你可以通过该源来更新你的系统。要确保你的系统及时获得安全更新，建议将该源添加到你的软件源列表中。虽然本站也同步了安全软件源，但本着对安全的严谨性，我们强烈建议使用官方软件源。

如果你一定要做这个源的替换，我们建议大家使用如下命令：

```shell varcode
[ ] (root) 是否为 root 用户
---
const SUDO = !root ? 'sudo ' : '';
---
${SUDO}sed -i.bak 's|https\\?://security.debian.org|${_http}://${_domain}|g' /etc/apt/sources.list
${SUDO}apt update
```

或将 security 源替换为以下内容：

```shell varcode
[ ] (version) { trixie:Debian 13, bookworm:Debian 12, bullseye:Debian 11, buster:Debian 10, testing:Testing} Debian 版本
[ ] (src) 启用源码镜像
---
const BACKPORTS_PREFIX = version == 'sid' ? '# ' : ''
const SID_PREFIX = version == 'sid' ? '# ' : ''
let NFW = ''
if (version == 'trixie' || version == 'bookworm' || version == 'sid' || version == 'testing') 
  NFW = ' non-free-firmware'
const SRC_PREFIX = src ? "" : "# ";
---
deb ${_http}://${_domain}/debian-security ${version}-security main contrib non-free${NFW}
${SRC_PREFIX}deb-src ${_http}://${_domain}/debian-security ${version}-security main contrib non-free${NFW}
```

## 引用

1. [Debian 官网](https://wiki.debian.org/zh_CN/DebianIntroduction)  
2. [Debian 安全更新软件源](https://www.debian.org/security/faq.en.html#mirror)  
3. [debian | 镜像站使用帮助 | 清华大学开源软件镜像站 | Tsinghua Open Source Mirror](https://mirrors.tuna.tsinghua.edu.cn/help/debian/)  
4. [常见问答集](https://www.debian.org/CD/faq/)  
