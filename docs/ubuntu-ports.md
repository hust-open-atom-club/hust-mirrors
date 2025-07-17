---
title: Ubuntu-Ports 镜像使用帮助
sidebar_label: Ubuntu Ports
---

# Ubuntu Ports 使用教程

## Ubuntu Ports 简介与软件管理

Ubuntu Ports 是一个为官方支持的非 x86 架构（如 ARM、RISC-V、PowerPC、s390x 等）提供的 Ubuntu 软件源。与主软件源 `archive.ubuntu.com` 服务于 `amd64` (x86-64) 和 `i386` (x86) 架构不同，`ports.ubuntu.com` 专门为其他处理器架构的用户提供软件包支持。

Ubuntu Ports 同样使用软件包管理工具 `APT` 来管理 DEB 软件包。一般情况下，用户可直接将该配置文件中的默认源地址 [http://ports.ubuntu.com/ubuntu-ports/](http://ports.ubuntu.com/ubuntu-ports/) 替换为本软件镜像站。

## Ubuntu Ports 软件源替换

:::caution
**为避免软件源配置文件替换后产生问题，请先将系统自带的软件源配置文件进行备份，然后进行下列操作。**
:::

1.  配置软件源

在 Ubuntu 24.04（“Noble Numbat”）之前的版本中，`APT` 软件源采用传统的单行格式（One-Line-Style），配置文件路径为：`/etc/apt/sources.list`，从 Ubuntu 24.04 LTS 开始，官方推荐使用更结构化的 DEB822 格式，配置文件路径改为：`/etc/apt/sources.list.d/ubuntu.sources`

### 传统格式（`/etc/apt/sources.list`）

根据个人情况对下列选项进行调整，并使用如下软件源配置替换 `/etc/apt/sources.list` 的原有内容：

```bash varcode
[ ] (version) { plucky:25.04, oracular:24.10, noble:24.04 LTS, jammy:22.04 LTS, lunar:23.04, kinetic:22.10, focal:20.04 LTS, bionic:18.04 LTS, xenial:16.04 LTS, trusty:14.04 LTS } Ubuntu 版本
[ ] (proposed) 启用预发布软件源
[ ] (src) 启用源码镜像
---
const SRC_PREFIX = src ? "" : "# ";
const PROPOSED_PREFIX = proposed ? "" : "# ";
---
deb ${_http}://${_domain}/ubuntu-ports/ ${version} main restricted universe multiverse
${SRC_PREFIX}deb-src ${_http}://${_domain}/ubuntu-ports/ ${version} main restricted universe multiverse
deb ${_http}://${_domain}/ubuntu-ports/ ${version}-updates main restricted universe multiverse
${SRC_PREFIX}deb-src ${_http}://${_domain}/ubuntu-ports/ ${version}-updates main restricted universe multiverse
deb ${_http}://${_domain}/ubuntu-ports/ ${version}-backports main restricted universe multiverse
${SRC_PREFIX}deb-src ${_http}://${_domain}/ubuntu-ports/ ${version}-backports main restricted universe multiverse
deb ${_http}://${_domain}/ubuntu-ports/ ${version}-security main restricted universe multiverse
${SRC_PREFIX}deb-src ${_http}://${_domain}/ubuntu-ports/ ${version}-security main restricted universe multiverse

${PROPOSED_PREFIX}deb ${_http}://${_domain}/ubuntu-ports/ ${version}-proposed main restricted universe multiverse
${PROPOSED_PREFIX || SRC_PREFIX}deb-src ${_http}://${_domain}/ubuntu-ports/ ${version}-proposed main restricted universe multiverse
```

### DEB822 格式（`/etc/apt/sources.list.d/ubuntu.sources`）

根据个人情况对下列选项进行调整，并使用如下软件源配置替换 `/etc/apt/sources.list.d/ubuntu.sources` 的原有内容：

```bash varcode
[ ] (version) { plucky:25.04, oracular:24.10, noble:24.04 LTS, jammy:22.04 LTS, lunar:23.04, kinetic:22.10, focal:20.04 LTS, bionic:18.04 LTS, xenial:16.04 LTS, trusty:14.04 LTS } Ubuntu 版本
[ ] (proposed) 启用预发布软件源
[ ] (src) 启用源码镜像
---
const SRC_PREFIX = src ? "" : "# ";
const PROPOSED_PREFIX = proposed ? "" : "# ";
---
Types: deb
URIs: ${_http}://${_domain}/ubuntu-ports
Suites: ${version} ${version}-updates ${version}-backports ${version}-security
Components: main restricted universe multiverse
Signed-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg

${SRC_PREFIX}Types: deb-src
${SRC_PREFIX}URIs: ${_http}://${_domain}/ubuntu-ports
${SRC_PREFIX}Suites: ${version} ${version}-updates ${version}-backports ${version}-security
${SRC_PREFIX}Components: main restricted universe multiverse
${SRC_PREFIX}Signed-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg

${PROPOSED_PREFIX}Types: deb
${PROPOSED_PREFIX}URIs: ${_http}://${_domain}/ubuntu-ports
${PROPOSED_PREFIX}Suites: ${version}-proposed
${PROPOSED_PREFIX}Components: main restricted universe multiverse
${PROPOSED_PREFIX}Signed-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg

${PROPOSED_PREFIX || SRC_PREFIX}Types: deb-src
${PROPOSED_PREFIX || SRC_PREFIX}URIs: ${_http}://${_domain}/ubuntu-ports
${PROPOSED_PREFIX || SRC_PREFIX}Suites: ${version}-proposed
${PROPOSED_PREFIX || SRC_PREFIX}Components: main restricted universe multiverse
${PROPOSED_PREFIX || SRC_PREFIX}Signed-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg
```

2.  通过如下命令更新软件。

<!-- end list -->

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

使用 `sed` 命令将软件源配置文件中的默认源地址 [http://ports.ubuntu.com/ubuntu-ports/](http://ports.ubuntu.com/ubuntu-ports/) 直接替换为当前镜像源站。

```shell varcode
[ ] (root) 是否为 root 用户
---
const SUDO = !root ? 'sudo ' : '';
---
${SUDO}sed -i.bak 's|https\\?://ports.ubuntu.com/ubuntu-ports|${_http}://${_domain}/ubuntu-ports|g' /etc/apt/sources.list /etc/apt/sources.list.d/ubuntu.sources
${SUDO}apt update
```

## 注意事项

### 软件包架构说明

**本镜像专门为 `ARM (arm64, armhf)`、`PowerPC (ppc64el)`、`RISC-V (riscv64)` 以及 `s390x` 等非 x86 架构的设备提供软件包。**

如果您使用的是标准的桌面 PC 或服务器（采用 Intel 或 AMD 的 x86\_64/amd64 处理器），请使用常规的 [Ubuntu 镜像](https://mirrors.hust.edu.cn/ubuntu/)而非本镜像。

### 关于 HTTPS 源

如果遇到无法拉取 HTTPS 源的情况（例如在某些精简的容器环境中），请先使用 HTTP 源安装必要的软件包后，再换回 HTTPS 源。

```shell varcode
[ ] (root) 是否为 root 用户
---
const SUDO = !root ? 'sudo ' : '';
---
${SUDO}apt-get update
${SUDO}apt-get install apt-transport-https ca-certificates
```

## 引用

1.  [清华大学 tuna 镜像源使用帮助](https://mirrors.tuna.tsinghua.edu.cn/help/ubuntu-ports/)
2.  [中科大镜像源使用帮助](https://mirrors.ustc.edu.cn/help/ubuntu-ports.html)