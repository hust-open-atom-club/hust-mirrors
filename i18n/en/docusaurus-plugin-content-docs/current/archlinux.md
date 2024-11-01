---
sidebar_label: Arch Linux
title: Arch Linux
cname: 'archlinux'
---

## Introduction to Arch Linux and Software Management

Arch Linux is an independently developed, x86-64 general-purpose Linux distribution that aims to provide the latest stable software versions through a rolling release model. The default installation of Arch Linux is a minimal base system, and users can install the software they need (such as desktop software and development tools) and configure it to create their ideal system.

Arch Linux uses its unique package manager, Pacman, for installing, updating, and uninstalling software packages. Pacman prioritizes servers in the `mirrorlist` based on their order, allowing users to add their preferred mirrors to the top of the `/etc/pacman.d/mirrorlist` file while commenting out others. For more detailed information on using Arch Linux software repository mirrors, please refer to the [official documentation](https://wiki.archlinux.org/title/Mirrors) .

## Replacing Arch Linux Software Sources

:::caution
**To avoid problems when replacing software source configuration files, please make a backup of the system's default software source configuration files before proceeding.** 
::: 
1. Edit `/etc/pacman.d/mirrorlist` and add the following line to the top of the file:

```bash varcode
Server = ${_http}://${_domain}/archlinux/$repo/os/$arch
```


1. Update the package cache:

```bash varcode
[ ] (root) Are you the root user?
---
const SUDO = !root ? 'sudo ' : '';
---
${SUDO}pacman -Syyu
```

The `yy` in the command helps prevent issues when switching from **broken**  mirrors to **healthy**  mirrors.

If you want to switch from a newer mirror to an older mirror, you can execute the following command to downgrade some packages and avoid partial updates to the system:

```bash varcode
[ ] (root) Are you the root user?
---
const SUDO = !root ? 'sudo ' : '';
---
${SUDO}pacman -Syyuu
```

##One-click source switching

:::caution
This method is only applicable for switching from the official source to our site's source. If you have already switched sources, please do not use the following commands.
:::

Use the  `sed ` command to insert the address of the current mirror at the beginning of the software source configuration file:

```shell varcode
[ ] (root) Are you the root user?
---
const SUDO = !root ? 'sudo ' : '';
---
${SUDO}echo -e "[archlinuxcn]\nServer = ${_http}://${_domain}/archlinuxcn/\$arch" >> /etc/pacman.conf
```

## References

1. [ZMirror](https://mirrors.cernet.edu.cn/about)   
2. [Help Repository](https://github.com/mirrorz-org/mirrorz-help)
