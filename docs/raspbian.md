---
title: Raspbian 软件仓库镜像使用帮助
sidebar_label: raspbian
cname: raspbian
slug: /raspbian
upstream: raspbian
upstream_sha256: 11817d0e3e89c5d0d5a45783ec9664c2f3857e456852ba92a97e67cc653ae65f
mirrorz: true
---
:::tip 该文档来自MirrorZ Help
本文档于*2024年2月8日*自动生成，[点击查看原文](https://help.mirrors.cernet.edu.cn/raspbian)。  
其中可能存在失效链接或其他问题，如遇到问题请及时[反馈](https://gitee.com/dzm91_hust/hust-mirrors/issues)。
:::


### Raspbian 简介

Raspbian 是专门用于 ARM 卡片式计算机 Raspberry Pi® “树莓派”的操作系统，
其基于 Debian 开发，针对 Raspberry Pi 硬件优化。

Raspbian 并非由树莓派的开发与维护机构 The Raspberry Pi Foundation
“树莓派基金会”官方支持。其维护者是一群 Raspberry Pi 硬件和 Debian 项目的爱好者。

注：Raspbian 系统由于从诞生开始就基于（为了 armhf，也必须基于）当时还是
testing 版本的 7.0/wheezy，所以 Raspbian 不倾向于使用 stable/testing
表示版本。

### 使用说明

首先通过 `uname -m` 确定你使用的系统的架构。

编辑镜像站后，请使用`sudo apt-get update`命令，更新软件源列表，同时检查您的编辑是否正确。

#### armv7l

```properties varcode title="/etc/apt/sources.list"
[ ] (a) { 0:Debian 11 (bullseye), 1:Debian 10 (buster), 2:Debian 9 (stretch) } 选择你的 Raspbian 对应的 Debian 版本
[ ] (b) { 0:否, 1:是 } 启用源码镜像
[ ] (c) { 0:否, 1:是 } 启用 multi-arch aarch64
---
let release_name = ""
let enable_source = ""
let enable_aarch64 = ""
if(a === "0") { release_name = "bullseye"; }
if(a === "1") { release_name = "buster"; }
if(a === "2") { release_name = "stretch"; }
if(b === "0") { enable_source = "# "; }
if(b === "1") { enable_source = ""; }
if(c === "0") { enable_aarch64 = "# "; }
if(c === "1") { enable_aarch64 = ""; }
---
deb ${_http}://${_domain}/raspbian/raspbian/ ${release_name} main non-free contrib rpi
${enable_source}deb-src ${_http}://${_domain}/raspbian/raspbian/ ${release_name} main non-free contrib rpi

${enable_aarch64}deb [arch=arm64] ${_http}://${_domain}/raspbian/multiarch/ ${release_name} main
```