---
title: Black Arch 软件仓库镜像使用帮助
sidebar_label: BlackArch
cname: 'blackarch'
type: OS
detection:
  checks:
    - type: os_release
      name: Blackarch
---

## BlackArch 简介和软件管理
BlackArch 是一个基于 Arch Linux 的渗透测试发行版，提供了大量的网路安全工具。它是专为渗透测试人员和安全研究人员创建的开放源码的发行版。该存储库包含 3000 多个可以单独或成组安装的工具。BlackArch Linux 与现有的 Arch Linux 安装相容，可使用 pacman 安装 BlackArch 中的软件。

## BlackArch 软件源替换

:::caution
**为避免软件源配置文件替换后产生问题，请先将系统自带的软件源配置文件进行备份，然后进行下列操作。**
:::

### 一键换源

:::caution
本方法仅适用于从官方源更换到本站源，如果您已经换过了源，请勿使用下列命令。
:::

```yaml cli
type: ReplaceIfExist
required: false
privileged: true
description: 一键替换Alpine Linux软件源
files:
  - path: /etc/pacman.conf
    statement: '$a\\[blackarch]\nServer = ${_http}://${_domain}/blackarch/$repo/os/$arch'
```

### 1. 在 `/etc/pacman.conf` 文件末尾添加两行：

```ini varcode
---
---
[blackarch]
Server = ${_http}://${_domain}/blackarch/$repo/os/$arch
```

:::caution
由于一些软件依赖 32 位的库，需要取消掉 `/etc/pacman.conf` 中 `multilib` 的注释，详见 https://wiki.archlinux.org/index.php/Official_repositories#Enabling_multilib
:::

### 2. 然后请安装 ``blackarch-keyring`` 包以导入 GPG key。

```yaml cli
type: Execute
required: true
privileged: true
description: 安装密钥
exec: |
  #{USE_IN_DOCS/}
  pacman -Sy blackarch-keyring
  #{/USE_IN_DOCS}
```


### 3. 通过如下命令更新软件包缓存

```yaml cli
type: Execute
required: true
privileged: true
description: 更新缓存
exec: |
  #{USE_IN_DOCS/}
  pacman -Syyu
  #{/USE_IN_DOCS}
```

其中，`yy` 能避免从**损坏的**镜像切换到**正常的**镜像时出现的问题。

如果想从一个较新的镜像切换到较旧的镜像，可执行如下命令降级部分软件包，以避免系统的部分更新。

```shell varcode
[ ] (root) 是否为 root 用户
---
const SUDO = !root ? 'sudo ' : '';
---
${SUDO}pacman -Syyuu
```


注：Black Arch 软件源仅包含其打包的工具等软件。如果需要更换 Arch Linux 基础系统的软件源，请查看 [Arch Linux 帮助](/docs/archlinux/)。

## 引用

1. [BlackArch 维基百科](https://zh.wikipedia.org/zh-hans/BlackArch_Linux)
