---
sidebar_label: Gentoo
title: Gentoo 软件仓库镜像使用帮助
cname: 'gentoo'
---

## Gentoo 简介

Gentoo Linux 是一个适用于多种计算机系统架构的 Linux 发行版。本仓库提供的是 Gentoo 的 Stage3 的镜像。
:::info
stage 文件是一个压缩包，可以作为完整 Gentoo 环境的种子。
stage 3 文件可以在任意一个 Gentoo 官方镜像站及本站的 `releases/amd64/autobuilds/` 内下载。Stage 文件更新比较频繁因此不会包含在官方 live 镜像中。
:::

## 安装时配置
打开 [Gentoo 主网站下载小节](https://www.gentoo.org/downloads/#other-arches)，右键单击 stage 文件的链接，然后复制链接到剪贴板，将其中的
`https://distfiles.gentoo.org/` 替换成
```bash varcode
${_http}://${_domain}/gentoo/
```
代替原链接，在接下来的安装步骤中使用。

## Gentoo Prefix Bootstrap 配置镜像
在您运行 Bootstrap 脚本之前，可以通过执行以下命令设置环境变量来设置在 Bootstrap 过程中使用本镜像仓库。
```bash varcode
export GENTOO_MIRRORS="${_http}://${_domain}/gentoo"
export SNAPSHOT_URL="${_http}://${_domain}/gentoo/snapshots"
export GNU_URL="${_http}://mirror/gnu"
```

## Distfiles 配置
您可以在 `/etc/portage/make.conf` 中写入：
```conf varcode
GENTOO_MIRRORS="${_http}://${_domain}/gentoo"
```
设置完成后，您可以在终端执行 `emerge --sync` 进行更新。

## 引用
1. [Gentoo 手册 AMD64：安装](https://wiki.gentoo.org/wiki/Handbook:AMD64/Full/Installation/zh-cn)
