---
title: Ubuntu 镜像使用帮助
sidebar_label: Ubuntu
---

## Ubuntu 简介与软件管理

Ubuntu 是一个基于 Debian 的 Linux 发行版，发布包括桌面版、服务器版以及适用于物联网设备和机器人等多个版本。Ubuntu 每六个月将发布一次版本，每两年发布一次长期支持版本（LTS），目前最新的长期支持版本是 Ubuntu 22.04（“Jammy Jellyfish”）。Ubuntu 目前由英国公司 Canonical 以及其他开发者社区共同开发，采用一种以功绩为基础的治理模式。Canonical 提供每个 Ubuntu 版本的安全更新和支持，从发布日期开始直至达到指定的终止生命周期（EOL）日期。

Ubuntu 使用软件包管理工具 `APT` 来管理 DEB 软件包。具体来说，Ubuntu 通过修改 `/etc/apt/sources.list` 配置文件来管理系统软件源。一般情况下，用户可直接将该配置文件中的默认源地址 [http://archive.ubuntu.com/](http://archive.ubuntu.com/) 替换为本软件镜像站。

## Ubuntu 软件源替换

:::caution
**为避免软件源配置文件替换后产生问题，请先将系统自带的软件源配置文件进行备份，然后进行下列操作。**
:::

1. 根据个人情况对下列选项进行调整，并使用如下软件源配置替换 `/etc/apt/sources.list` 的原有内容：

```bash varcode
[ ] (version) { jammy:22.04 LTS, lunar:23.04, kinetic:22.10, focal:20.04 LTS, bionic:18.04 LTS, xenial:16.04 LTS, trusty:14.04 LTS } Ubuntu 版本
[ ] (proposed) 启用预发布软件源
[ ] (src) 启用源码镜像
---
const SRC_PREFIX = src ? "" : "# ";
const PROPOSED_PREFIX = proposed ? "" : "# ";
---
deb ${_http}://${_domain}/ubuntu/ ${version} main restricted universe multiverse
${SRC_PREFIX}deb-src ${_http}://${_domain}/ubuntu/ ${version} main restricted universe multiverse
deb ${_http}://${_domain}/ubuntu/ ${version}-updates main restricted universe multiverse
${SRC_PREFIX}deb-src ${_http}://${_domain}/ubuntu/ ${version}-updates main restricted universe multiverse
deb ${_http}://${_domain}/ubuntu/ ${version}-backports main restricted universe multiverse
${SRC_PREFIX}deb-src ${_http}://${_domain}/ubuntu/ ${version}-backports main restricted universe multiverse

deb http://security.ubuntu.com/ubuntu/ ${version}-security main restricted universe multiverse
${SRC_PREFIX}deb-src http://security.ubuntu.com/ubuntu/ ${version}-security main restricted universe multiverse

${PROPOSED_PREFIX}deb ${_http}://${_domain}/ubuntu/ ${version}-proposed main restricted universe multiverse
${PROPOSED_PREFIX || SRC_PREFIX}deb-src ${_http}://${_domain}/ubuntu/ ${version}-proposed main restricted universe multiverse
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

使用 `sed` 命令将软件源配置文件中的默认源地址 [http://archive.ubuntu.com/](http://archive.ubuntu.com/) 直接替换为当前镜像源站。

```shell varcode
[ ] (root) 是否为 root 用户
---
const SUDO = !root ? 'sudo ' : '';
---
${SUDO}sed -i.bak 's|https\\?://archive.ubuntu.com|${_http}://${_domain}|g' /etc/apt/sources.list
${SUDO}apt update
```

## Ubuntu Release 镜像 {#cd}
Ubuntu 官方提供两种安装镜像：桌面版安装镜像及服务器版安装镜像。

- 桌面版安装镜像是专为桌面 PC 和笔记本打造的 Ubuntu 版本，其可以让你在不安装系统的前提下尝试 Ubuntu 系统，请注意要安装桌面版系统至少需要 384 MiB 的 RAM 大小。
- 服务器版安装镜像将安装一个不带用户图形界面纯命令行的 Ubuntu 系统，通常用于部署服务器。

要下载这两个版本的安装镜像，请点击下方的按钮前往[下载页面](/release/?release=Ubuntu)选择对应的版本和种类进行下载。

<a href="/release?release=Ubuntu">
    <button className="button button--primary">下载镜像</button>
</a>

## Ubuntu Security 源

:::caution
**为了及时地获得安全更新，防止因软件源更新而导致的安全补丁滞后问题，我们推荐直接使用官方安全更新软件源。**
:::

因镜像站同步有延迟，可能会导致生产环境系统不能及时检查、安装最新的安全更新，因此不建议替换 security 源。

如果存在官方源下载速度不理想等问题，可使用如下命令替换安全更新软件源：

```shell varcode
[ ] (root) 是否为 root 用户
---
const SUDO = !root ? 'sudo ' : '';
---
${SUDO}sed -i.bak 's|https\\?://security.ubuntu.com|${_http}://${_domain}|g' /etc/apt/sources.list
${SUDO}apt update
```

或将 security 源替换为以下内容：

```shell varcode
[ ] (version) { jammy:22.04 LTS, lunar:23.04, kinetic:22.10, focal:20.04 LTS, bionic:18.04 LTS, xenial:16.04 LTS, trusty:14.04 LTS } Ubuntu 版本
[ ] (src) 启用源码镜像
---
const SRC_PREFIX = src ? "" : "# ";
---
deb ${_http}://${_domain}/ubuntu ${version}-security main restricted universe multiverse
${SRC_PREFIX}deb-src ${_http}://${_domain}/ubuntu ${version}-security main restricted universe multiverse
```

## 注意事项

### 软件包架构说明

本镜像仅包含 x86 与 x64 架构处理器的软件包，在 ARM(arm64，armhf)、PowerPC(ppc64el)、RISC-V(riscv64) 以及 s390x 等架构的设备上，请使用 ubuntu-ports 镜像。

### 关于 HTTPS 源

如果遇到无法拉取 HTTPS 源的情况（如 docker 镜像中），请先使用 HTTP 源安装如下软件再进行换源。

```shell varcode
[ ] (root) 是否为 root 用户
---
const SUDO = !root ? 'sudo ' : '';
---
${SUDO}apt install apt-transport-https ca-certificates
${SUDO}apt update
```

## 引用

1. [中科大镜像源使用帮助](https://mirrors.ustc.edu.cn/help/ubuntu.html)  
