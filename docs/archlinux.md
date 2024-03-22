---
sidebar_label: Arch Linux
title: Arch Linux 软件仓库镜像使用帮助
cname: 'archlinux'
---

## Arch Linux 简介与软件管理

Arch Linux 是一个独立开发的、x86-64 通用 Linux 发行版，致力于采用滚动发布模式，提供最新稳定的软件版本。默认安装的 Arch Linux 是一个最小的基本系统，用户可以根据自己的喜好安装需要的软件（如桌面软件，开发软件）并配置成符合自己理想的系统。

Arch Linux 使用其独特的软件包管理器 Pacman 来安装，更新与卸载软件包。Pacman 以 mirrorlist 中 Server 的顺序作为优先级，因此，用户可以在 `/etc/pacman.d/mirrorlist` 文件的最顶端添加相应镜像，同时可注释其它镜像。关于更详细的 Arch Linux 软件仓库镜像使用帮助，详见[官方文档](https://wiki.archlinuxcn.org/wiki/%E9%95%9C%E5%83%8F%E6%BA%90)。

## Arch Linux 软件源替换

:::caution
**为避免软件源配置文件替换后产生问题，请先将系统自带的软件源配置文件进行备份，然后进行下列操作。**
:::

1. 编辑 `/etc/pacman.d/mirrorlist`，在文件的最顶端添加如下语句：

```bash varcode
Server = ${_http}://${_domain}/archlinux/$repo/os/$arch
```

2. 更新软件包缓存

```shell varcode
[ ] (root) 是否为 root 用户
---
const SUDO = !root ? 'sudo ' : '';
---
${SUDO}pacman -Syu
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

[^1] [校园网联合镜像站](https://mirrors.cernet.edu.cn/about)  
[^2] [帮助仓库](https://github.com/mirrorz-org/mirrorz-help)  
