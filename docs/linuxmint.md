---
title: Linux Mint 镜像使用帮助
sidebar_label: Linux Mint
cname: LinuxMint
type: OS
detection:
  checks:
    - type: os_release
      name: Linux Mint
---

## Linux Mint 简介与软件管理
Linux Mint 是一种基于 Ubuntu 的 Linux 发行版，Linux Mint 的宗旨是提供一个免费开源、现代、优雅、功能强大却也易于使用的作业系统
Linux Mint 也采用 apt 作为包管理器，与 Ubuntu 和 Debian 类似，你需要编辑 `/etc/apt/sources.list` 和 `/etc/apt/sources.list.d/*` 中的路径。


## Ubuntu / Debian 软件源替换

对于来自 Ubuntu 与 Debian 的部分源，可以参考 [Ubuntu 帮助](./ubuntu)与 [Debian 帮助](./debian)进行修改。

## Linux Mint 软件源替换

### 一键换源

:::caution
本方法仅适用于从官方源更换到本站源，如果您已经换过了源，请勿使用下列命令。
:::

使用 `sed` 命令将软件源配置文件中的默认源地址 [http://packages.linuxmint.com](http://packages.linuxmint.com) 直接替换为当前镜像源站

```yaml cli
type: ReplaceIfExist
required: true
optional: false
description: 替换Linux Mint主仓库
privileged: true
files:
  - path: /etc/apt/offical-package-repositories.list
    match: 'http://packages.linuxmint.com'
    replace: '${_http}://${_domain}/linuxmint'
  - path: /etc/apt/offical-package-repositories.list
    match: 'http://archive.ubuntu.com'
    replace: '${_http}://${_domain}'
display_policy:
  kind: All
```

:::caution
**为避免软件源配置文件替换后产生问题，请先将系统自带的软件源配置文件进行备份，然后进行下列操作。**
:::

### 1. 修改 `/etc/apt/sources.list.d/official-package-repositories.list`，把 `packages.linuxmint.com` 替换为镜像源

```deb varcode
[] (release) { victoria:21.2, vera:21.1, vanessa:21, una:20.3, uma:20.2, ulyssa:20.1 } Linux Mint 版本
---
deb ${_http}://${_domain}/linuxmint ${release} main upstream import backport
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

:::caution
完成后请不要再使用 mintsources（自带的图形化软件源设置工具）进行任何操作，因为在操作后，无论是否有按 “确定”，mintsources 均会复写 `/etc/apt/sources.list.d/official-package-repositories.list`
:::



## Linux Mint 安装镜像 {#cd}
Linux Mint 安装镜像提供 cinnamon，mate 和 xfce 三种桌面环境，分别对应了三个版本的安装镜像。如果需
要下载这两个版本的安装镜像，点击下面的按钮选择对应的版本和种类进行下载。

- cinnamon：Linux Mint 的默认桌面环境，基于 GNOME 3 开发。
- mate：基于 GNOME 2 开发的桌面环境。
- xfce：轻量级桌面环境，适合配置较低的计算机。

<a href="/release?release=Linux%20Mint">
    <button className="button button--primary">下载镜像</button>
</a>

## 引用
1. [Tuna 镜像源使用帮助](https://mirrors.tuna.tsinghua.edu.cn/help/linuxmint/)  
