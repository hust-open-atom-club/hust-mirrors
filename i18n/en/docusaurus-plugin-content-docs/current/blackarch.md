---
title: Black Arch
sidebar_label: BlackArch
cname: 'blackarch'
---

## Introduction to BlackArch and Software Management

BlackArch Linux is an Arch Linux-based penetration testing distribution for penetration testers and security researchers. The repository contains over 3000 tools that can be installed individually or in groups.
BlackArch Linux is compatible with existing Arch Linux installations and allows software installation from BlackArch repository using pacman.

## Replacing BlackArch Software Sources

:::caution
**To avoid problems when replacing software source configuration files, please make a backup of the system's default software source configuration files before proceeding.**
:::

1. Edit `/etc/pacman.d/mirrorlist` and add the following lines to the end of the file:

```ini varcode
---
---
[blackarch]
Server = ${_http}://${_domain}/blackarch/$repo/os/$arch
```

:::caution
Some software depends on 32-bit libraries. You need to uncomment `multilib` in `/etc/pacman.conf`. For details, see [https://wiki.archlinux.org/index.php/Official_repositories#Enabling_multilib](https://wiki.archlinux.org/index.php/Official_repositories#Enabling_multilib).
:::

2. Install the `blackarch-keyring` package to import the GPG key.

```shell varcode
[ ] (root) Are you the root user?
---
const SUDO = !root ? 'sudo ' : '';
---
${SUDO}pacman -Sy blackarch-keyring
```

3. Update the package cache with the following command:

```shell varcode
[ ] (root) Are you the root user?
---
const SUDO = !root ? 'sudo ' : '';
---
${SUDO}pacman -Syyu
```

The `yy` in the command helps prevent issues when switching from **broken**  mirrors to **healthy**  mirrors.

If you want to switch from a newer mirror to an older mirror, you can execute the following command to downgrade some packages and avoid partial updates to the system:

```shell varcode
[ ] (root) Are you the root user?
---
const SUDO = !root ? 'sudo ' : '';
---
${SUDO}pacman -Syyuu
```

## One-Click Source Replacement

:::caution
This method is only applicable when switching from official sources to the mirror sources on this site. If you have already switched sources, please do not use the following commands.
:::

Use the `echo` command to add the current mirror source in one step:

```shell varcode
[ ] (root) Are you the root user?
---
const SUDO = !root ? 'sudo ' : '';
---
${SUDO}echo "[blackarch]
Server = ${_http}://${_domain}/blackarch/$repo/os/$arch" >> /etc/pacman.conf
```

Note: The BlackArch software source only contains tools and other software packaged by it. If you need to replace the software source for the Arch Linux system, please refer to [Arch Linux Help](/docs/archlinux/).

## References

1. [BlackArch Wikipedia](https://en.wikipedia.org/wiki/BlackArch)
