---
sidebar_label: Arch Linux CN
title: Arch Linux CN软件仓库镜像使用帮助
cname: 'archlinuxcn'
type: OS
---

## Arch Linux CN 简介与软件管理

Arch Linux 中文社区仓库是由 Arch Linux 中文社区驱动的非官方软件仓库，包含许多官方仓库未提供的额外的软件包，以及已有软件的 git 版本等变种。一部分软件包的打包脚本来源于 AUR，但也有许多包与 AUR 不一样。

## 一键换源

:::caution
本方法仅适用于从官方源更换到本站源，如果您已经换过了源，请勿使用下列命令。
:::

使用 `echo` 命令将当前镜像站的地址添加到软件源配置文件末尾：

```yaml cli
type: ReplaceIfExist
required: false
privileged: true
description: 一键替换Alpine Linux软件源
files:
  - path: /etc/pacman.conf
    statement: '1i\\[archlinuxcn]\nServer = ${_http}://${_domain}/archlinuxcn/\$arch'
```


## Arch Linux CN 软件源替换

:::caution
**为避免软件源配置文件替换后产生问题，请先将系统自带的软件源配置文件进行备份，然后进行下列操作。**
:::

1. 编辑 `/etc/pacman.conf`，在文件的最顶端添加如下语句：

```bash varcode
[archlinuxcn]
Server = ${_http}://${_domain}/archlinuxcn/$arch
```

2. 安装 Arch Linux CN 的密钥：

```yaml cli
type: Execute
required: true
privileged: true
description: 安装密钥
exec: |
  pacman-key --lsign-key "farseerfc@archlinux.org"
  #{USE_IN_DOCS/}
  pacman -S archlinuxcn-keyring
  #{/USE_IN_DOCS}
```

:::caution
如果在安装过程中遇到了如下错误：
```shell
error: archlinuxcn-keyring: Signature from "Jiachen YANG (Arch Linux Packager Signing Key) " is marginal trust
```
这是因为由于开发者退休，导致新安装的系统中，farseerfc 的 GPG key 是勉强信任的。可以通过如下命令解决：
```shell varcode
sudo pacman-key --lsign-key "farseerfc@archlinux.org"
```
:::

3. 更新软件包缓存


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



## 引用
1. [archlinuxcn 中文社区仓库](https://www.archlinuxcn.org/archlinux-cn-repo-and-mirror/)
