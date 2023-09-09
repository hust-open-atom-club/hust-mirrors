---
title: Ubuntu 镜像使用帮助
sidebar_label: Ubuntu
---

## Ubuntu 简介与软件管理

Ubuntu 是一个基于 Debian 的 Linux 发行版,发布包括桌面版、服务器版以及适用于物联网设备和机器人等多个版本。Ubuntu 每六个月将发布一次版本，每两年发布一次长期支持版本（LTS），目前最新的长期支持版本是 Ubuntu 22.04（"Jammy Jellyfish"）。Ubuntu 目前由英国公司 Canonical 以及其他开发者社区共同开发，采用一种以功绩为基础的治理模式。Canonical 提供每个Ubuntu版本的安全更新和支持，从发布日期开始直至达到指定的终止生命周期（EOL）日期。

`Ubuntu` 使用软件包管理工具 `APT` 来管理 `DEB` 软件包。具体来说，`Ubuntu` 通过修改 `/etc/apt/sources.list` 配置文件来管理系统软件源。一般情况下，用户可直接将该配置文件中的默认源地址（即，`http://archive.ubuntu.com/`）替换为本软件镜像站。

## Ubuntu 软件源替换

:::caution
**为了及时地获得安全更新，防止因软件源更新而导致的安全补丁滞后问题，我们推荐直接使用官方安全更新软件源。**
:::

:::caution
**为避免软件源配置文件替换后产生问题，请先将系统自带的软件源配置文件进行备份，然后进行下列操作。**
:::

1. 根据个人喜欢做出选择，并将如下软件源配置内容拷贝至 `/etc/apt/sources.list`，并进行保存。

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

使用 `sed` 命令将软件源配置文件中的默认源地址 <http://archive.ubuntu.com/> 直接替换为当前镜像源站。

```shell varcode
[ ] (root) 是否为 root 用户
---
const SUDO = !root ? 'sudo ' : '';
---
${SUDO}sed -i.bak 's|http://archive.ubuntu.com|${_http}://${_domain}|g' /etc/apt/sources.list
${SUDO}apt update
```

<!-- 本方法没有替换 security 源，如果想要替换 security 源可以执行以下命令：
```shell varcode
[ ] (root) 是否为 root 用户
---
const SUDO = !root ? 'sudo ' : '';
---
${SUDO}sed -i.bak 's/security.ubuntu.com/${_domain}/g' /etc/apt/sources.list
``` -->

## 注意事项

- 软件包架构说明

本镜像仅包含 `x86` 与 `x64` 架构处理器的软件包，在 `ARM(arm64, armhf)`、`PowerPC(ppc64el)`、`RISC-V(riscv64)` 以及 `s390x` 等架构的设备上，请使用 `ubuntu-ports` 镜像。

## 引用

[^1] [中科大镜像源使用帮助](https://mirrors.ustc.edu.cn/help/ubuntu.html)  