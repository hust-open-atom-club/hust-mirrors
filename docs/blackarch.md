---
title: Black Arch 软件仓库镜像使用帮助
sidebar_label: blackarch
cname: blackarch
slug: /blackarch
upstream: blackarch
upstream_sha256: d5e4da305898a29e48a9fb6b8b456e53c5ea79ca5bea70fd2979b6e920f3b789
mirrorz: true
---
:::tip 该文档来自MirrorZ Help
本文档于*2024年2月8日*自动生成，[点击查看原文](https://help.mirrors.cernet.edu.cn/blackarch)。  
其中可能存在失效链接或其他问题，如遇到问题请及时[反馈](https://gitee.com/dzm91_hust/hust-mirrors/issues)。
:::


BlackArch 是一款基于 ArchLinux 的为渗透测试及安全研究人员开发的发行版，相当于 Arch 版的 BackTrack/Kali。

仓库地址：https://blackarch.org/blackarch/

## 使用说明

在 `/etc/pacman.conf` 文件末尾添加两行：

```ini varcode
---
---
[blackarch]
Server = ${_http}://${_domain}/blackarch/$repo/os/$arch
```

由于一些软件依赖 32 位的库，需要取消掉 `/etc/pacman.conf` 中 `multilib` 的注释，详见 https://wiki.archlinux.org/index.php/Official_repositories#Enabling_multilib

然后请安装 ``blackarch-keyring`` 包以导入 GPG key。

```plain varcode
[ ] (root) 是否为 root 用户
---
const sudo = !root ? 'sudo ' : '';
---
${sudo}pacman -Sy blackarch-keyring
```