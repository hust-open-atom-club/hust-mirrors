---
sidebar_label: MSYS2
title: MSYS2 软件仓库镜像使用帮助
cname: 'MSYS2'
---

## MSYS2 简介与使用场景

MSYS2 是一个用于 Windows 的软件发行版，提供了一个类似于 Unix 的环境。它基于现代的 Cygwin 和 MinGW-w64 项目，旨在为开发人员提供一个强大的构建和开发平台。MSYS2 使用 `pacman` 包管理器（与 Arch Linux 相同），可以方便地安装、更新和管理软件包。它提供了与 Unix 系统类似的环境，使得在 Windows 上进行跨平台开发变得更加容易。MSYS2 包含了大量的预编译软件包，包括编译器、库和工具等。

## 收录架构

- MinGW: i686, x86_64, ucrt64, clang64
- MSYS: i686, x86_64

## MSYS2 的下载与安装

请访问镜像目录下的 distrib/ 目录：

### x86_64

<SiteLink href="/msys2/distrib/x86_64/">
    <button className="button button--primary">查看 x86_64 版本安装包</button>
</SiteLink>

### i686

<SiteLink href="/msys2/distrib/i686/">
    <button className="button button--primary">查看 i686 版本安装包</button>
</SiteLink>


### 使用细节

找到名为 `msys2-<架构>-<日期>.exe` 的文件（如 `msys2-x86_64-20141113.exe`），下载安装即可。

## MSYS2 内的 pacman 配置

:::caution
**为避免软件源配置文件替换后产生问题，请先将系统自带的软件源配置文件进行备份，然后进行下列操作。**
:::

## 手动换源

1. **编辑 `/etc/pacman.d/mirrorlist.mingw32` 文件**：
在文件开头添加以下内容：

    ```bash varcode
    Server = ${_http}://${_domain}/msys2/mingw/i686
    ```

2. **编辑 `/etc/pacman.d/mirrorlist.mingw64` 文件**：
   在文件开头添加以下内容：

    ```bash varcode
    Server = ${_http}://${_domain}/msys2/mingw/x86_64
    ```

3. **编辑 `/etc/pacman.d/mirrorlist.msys` 文件**：
   在文件开头添加以下内容：

    ```bash varcode
    Server = ${_http}://${_domain}/msys2/msys/$arch
    ```

4. **编辑 `/etc/pacman.d/mirrorlist.ucrt64` 文件**：
   在文件开头添加以下内容：

    ```bash varcode
    Server = ${_http}://${_domain}/msys2/mingw/ucrt64
    ```

5. **刷新软件包数据库**：

    ```shell varcode
    [ ] (root) 是否为 root 用户
    ---
    const SUDO = !root ? 'sudo ' : '';
    ---
    ${SUDO}pacman -Sy
    ```

通过这些步骤，你可以将 MSYS2 的镜像源更改为华中科技大学的镜像站，从而加速软件包的下载和更新。

## 一键换源

:::caution
本方法仅适用于从官方源更换到本站源，如果您已经换过了源，请勿使用下列命令。
:::

你可以使用以下命令一键更换 MSYS2 的镜像源为华中科技大学的镜像站：

```shell varcode
[ ] (root) 是否为 root 用户
---
const SUDO = !root ? 'sudo ' : '';
---
${SUDO}sed -i "s#https\\?://mirror.msys2.org/#${_http}://${_domain}/msys2/#g" /etc/pacman.d/mirrorlist*

```

## 引用

1. [MSYS2 镜像站使用帮助 | 阿里云开源镜像站](https://developer.aliyun.com/mirror/msys2)
2. [MSYS2 镜像站使用帮助 | 清华大学开源软件镜像站](https://mirrors.tuna.tsinghua.edu.cn/help/msys2/)










 





