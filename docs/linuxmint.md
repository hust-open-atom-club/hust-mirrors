---
title: Linux Mint 镜像使用帮助
sidebar_label: Linux Mint
---

Linux Mint 也采用 apt 作为包管理器，与 Ubuntu 和 Debian 类似，你需要编辑 `/etc/apt/sources.list` 和 `/etc/apt/sources.list.d/*` 中的路径。对于来自 Ubuntu 与 Debian 的部分源，可以参考 [Ubuntu 帮助](./ubuntu.md)与 [Debian 帮助](./debian.md)进行修改。

需要修改 `/etc/apt/sources.list.d/official-package-repositories.list`（注意备份），把 `packages.linuxmint.com` 替换为镜像源

```deb varcode
[] (release) { victoria:21.2, vera:21.1, vanessa:21, una:20.3, uma:20.2, ulyssa:20.1 } Linux Mint 版本
---
deb ${_http}://${_domain}/linuxmint ${release} main upstream import backport
```

然后运行 `apt update` 即可。

注：完成后请不要再使用 mintsources（自带的图形化软件源设置工具）进行任何操作，因为在操作后，无论是否有按“确定”，mintsources 均会复写 `/etc/apt/sources.list.d/official-package-repositories.list`

## 引用
[^1] [Tuna镜像源使用帮助](https://mirrors.tuna.tsinghua.edu.cn/help/CPAN/)  
