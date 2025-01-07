
| sidebar_label | title                                             | cname |
| :-----------: | ------------------------------------------------- | ----- |
|     MSYS2     | Usage Guide for MSYS2 Software Repository Mirrors | MSYS2 |
## Introduction and Usage Scenarios of MSYS2
MSYS2 is a software distribution for Windows that provides an environment similar to Unix. It is based on the modern Cygwin and MinGW-w64 projects, aiming to offer developers a powerful platform for building and development. MSYS2 uses the pacman package manager, (which is the same as Arch Linux), making it convenient to install, update, and manage software packages. It provides an environment akin to Unix systems, making cross-platform development on Windows easier. MSYS2 includes a vast array of pre-compiled packages, including compilers, libraries, tools, and so on.
## Inclusive Architecture
-  MinGW: i686, x86_64, ucrt64, clang64
-  MSYS: i686, x86_64
## Download and Installation of MSYS2

Please visit the distrib/ directory under the mirror directory:

### x86_64

<SiteLink href="/msys2/distrib/x86_64/">
    <button className="button button--primary">Check the installation packages of the x86_64 version</button>
</SiteLink>


### i686

<SiteLink href="/msys2/distrib/i686/">
    <button className="button button--primary">Check the installation packages of the i686 version
    </button>
</SiteLink>

### Usage Details

Find the file named `msys2-<architecture>-<date>.exe`(such as `msys2-x86_64-20141113.exe`), and then download and install it.

## The configuration of pacman within MSYS2

:::caution
**To avoid issues after replacing the software source configuration file, please first back up the system's default software source configuration file, and then proceed with the following steps.**
:::

## Manual Source Replacement

1.**Edit the`/etc/pacman.d/mirrorlist.mingw32` file**: Add the following content at the beginning of the file:

```bash varcode
    Server = ${_http}://${_domain}/msys2/mingw/i686
```
2.**Edit the `/etc/pacman.d/mirrorlist.mingw64` file**: Add the following content at the beginning of the file:

```bash varcode
    Server = ${_http}://${_domain}/msys2/mingw/x86_64
```
3.**Edit the `/etc/pacman.d/mirrorlist.msys` file**: Add the following content at the beginning of the file:

```bash varcode
    Server = ${_http}://${_domain}/msys2/msys/$arch
```
4.**Edit the `/etc/pacman.d/mirrorlist.ucrt64` file**: Add the following content at the beginning of the file:

```bash varcode
    Server = ${_http}://${_domain}/msys2/mingw/ucrt64
```
5.**Refresh the software package database**:

```shell varcode
    Is [ ] (root) a root user
    ---
    const SUDO = !root ? 'sudo ' : '';
    ---
    ${SUDO}pacman -Sy
```

Through these steps, you can change the mirror source of MSYS2 to the mirror station of Huazhong University of Science and Technology, thus speeding up the download and update of software packages.

## One-click source replacement

:::caution
This method is only applicable to changing from the official source to the source of this site. If you have already changed the source, please do not use the following commands.
:::

You can use the following command to change the mirror source of MSYS2 to the mirror station of Huazhong University of Science and Technology with one click:

```shell varcode
Is [ ] (root) a root user
---
const SUDO = !root ? 'sudo ' : '';
---
${SUDO}sed -i "s#https\\?://mirror.msys2.org/#${_http}://${_domain}/msys2/#g" /etc/pacman.d/mirrorlist*

```

## Quote

1. [MSYS2 Mirror Site Usage Help | Alibaba Cloud Open Source Mirror Station](https://developer.aliyun.com/mirror/msys2)

2. [MSYS2 Mirror Site Usage Help | Tsinghua University Open Source Software Mirror Station](https://mirrors.tuna.tsinghua.edu.cn/help/msys2/)
