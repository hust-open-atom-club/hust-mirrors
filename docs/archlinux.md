---
sidebar_label: Arch Linux
title: Arch Linux 软件仓库镜像使用帮助
cname: 'archlinux'
---

Arch Linux 是通用 x86-64 GNU/Linux 发行版。Arch 采用滚动升级模式，尽全力提供最新的稳定版软件。初始安装的 Arch 只是一个基本系统，随后用户可以根据自己的喜好安装需要的软件并配置成符合自己理想的系统。

Pacman 以 `mirrorlist` 中 Server 的顺序作为优先级，因此添加镜像需要在文件的最顶端添加；您可以同时注释掉其它所有镜像。

有关 Arch Linux 使用镜像的详细说明请见[官方文档](https://wiki.archlinux.org/title/mirrors)

编辑 `/etc/pacman.d/mirrorlist`，在文件的最顶端添加：

```bash varcode
Server = ${_http}://${_domain}/archlinux/$repo/os/$arch
```

更新软件包缓存：

```shell
sudo pacman -Syyu
```

两次 `y` 能避免从**损坏的**镜像切换到**正常的**镜像时出现的问题。

如果您从一个较新的镜像切换到较旧的镜像，以下命令可以降级部分包，以避免系统的部分更新。

```shell
sudo pacman -Syyuu
```

> 注：本页面帮助内容摘自[校园网联合镜像站](https://mirrors.cernet.edu.cn/about)的[帮助仓库](https://github.com/mirrorz-org/mirrorz-helps)
