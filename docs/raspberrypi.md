---
title: Raspberrypi 软件仓库镜像使用帮助
sidebar_label: raspberrypi
cname: raspberrypi
slug: /raspberrypi
upstream: raspberrypi
upstream_sha256: 7ee852b5ab81be31de75e1b341d318c07ba029507abe15aec34bf15076cc26ca
mirrorz: true
---
:::tip 该文档来自MirrorZ Help
本文档于*2024年2月8日*自动生成，[点击查看原文](https://help.mirrors.cernet.edu.cn/raspberrypi)。  
其中可能存在失效链接或其他问题，如遇到问题请及时[反馈](https://github.com/hust-open-atom-club/hust-mirrors/issues)。
:::


主要参考 [Raspbian 帮助](/docs/raspbian/)

编辑 `/etc/apt/sources.list.d/raspi.list` 文件。

```properties varcode title="/etc/apt/sources.list.d/raspi.list"
[ ] (a) { 0:Debian 12 (bookworm), 1:Debian 11 (bullseye), 2:Debian 10 (buster), 3:Debian 9 (stretch) } 选择你的 Raspbian 对应的 Debian 版本
---
let release_name = ""
if(a === "0") { release_name = "bookworm"; }
if(a === "1") { release_name = "bullseye"; }
if(a === "2") { release_name = "buster"; }
if(a === "3") { release_name = "stretch"; }
---
deb ${_http}://${_domain}/raspberrypi/ ${release_name} main
```
