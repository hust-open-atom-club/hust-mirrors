---
sidebar_label: MXLinux
title: MXLinux 软件仓库镜像使用帮助
---

## MXLinux 简介

MX Linux 是 [antiX](https://antixlinux.com/) 和 [MX Linux 社区](https://mxlinux.org/)之间的合作项目。它是由 Debian 稳定存储库的用户构建的一系列作系统，旨在将优雅高效的桌面与高稳定性和稳定的性能相结合。

## 使用

### 1. 备份/etc/apt/sources.list.d/下面所有的索引文件

```yaml cli
type: Execute
description: 复制 APT 源文件
optional: false
privileged: true
exec: |
  #{USE_IN_DOCS/}
  cp /etc/apt/sources.list.d/antix.list /etc/apt/sources.list.d/antix.list.bak
  cp /etc/apt/sources.list.d/mx.list /etc/apt/sources.list.d/mx.list.bak
  cp /etc/apt/sources.list.d/debian.list /etc/apt/sources.list.d/debian.list.bak
  cp /etc/apt/sources.list.d/debian-stable-updates.list /etc/apt/sources.list.d/debian-stable-updates.list.bak
  #{USE_IN_DOCS/}
recover: |
  cp /etc/apt/sources.list.d/antix.list.bak /etc/apt/sources.list.d/antix.list
  cp /etc/apt/sources.list.d/mx.list.bak /etc/apt/sources.list.d/mx.list
  cp /etc/apt/sources.list.d/debian.list.bak /etc/apt/sources.list.d/debian.list
  cp /etc/apt/sources.list.d/debian-stable-updates.list.bak /etc/apt/sources.list.d/debian-stable-updates.list
```

### 2. 修改所有索引文件的下载源地址为本站

```yaml cli
required: true
optional: false
description: 配置 MXLinux 软件仓库镜像源
privileged: true
type: ReplaceIfExist
files:
  - path: /etc/apt/sources.list.d/antix.list
    match: 'http://repo.antixlinux.com/stretch'
    replace: '${_http}://${_domain}/mxlinux/antix/stretch'
  - path: /etc/apt/sources.list.d/mx.list
    match: 'http://la\.mxrepo\.com/mx/repo/'
    replace: '${_http}://${_domain}/mxlinux/mx/repo/'
  - path: /etc/apt/sources.list.d/debian-stable-updates.list
    match: 'http://ftp\.us\.debian\.org/debian/'
    replace: '${_http}://${_domain}/debian/'
  - path: /etc/apt/sources.list.d/debian.list
    match: 'http://ftp\.us\.debian\.org/debian/'
    replace: '${_http}://${_domain}/debian/'
  - path: /etc/apt/sources.list.d/debian.list
    match: 'http://security\.debian\.org/'
    replace: '${_http}://${_domain}/debian-security/'
```

### 3. 更新镜像列表

```yaml cli
required: true
description: 更新软件包列表
privileged: true
type: Execute
exec: |
  #{USE_IN_DOCS/}
  apt update
  #{/USE_IN_DOCS}
```

## MXLinux 安装镜像 {#cd}

MXLinux 安装镜像提供 KDE，Fluxbox 和 xfce 三种桌面环境，分别对应了三个版本的安装镜像。如果需要下载这两个版本的安装镜像，可点击下面的按钮选择对应的版本和种类进行下载。

- KDE：一个自定义化的桌面环境，基于 GNOME 3 开发。
- Fluxbox：一个轻量级窗口管理器，作为默认 Xfce 桌面环境的替代方案。
- xfce：轻量级桌面环境，适合配置较低的计算机。

<a href="/release?release=Mxlinux">
    <button className="button button--primary">下载镜像</button>
</a>

## 引用

1. [MXLinux 官网](https://mxlinux.org/)
2. [帮助 - 阿里云镜像站](https://developer.aliyun.com/mirror/mxlinux)
