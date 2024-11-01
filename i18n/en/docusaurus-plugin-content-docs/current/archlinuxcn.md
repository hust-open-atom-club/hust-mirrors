---
sidebar_label: Arch Linux CN
title: Arch Linux CN Software Repository Mirror Usage Guide
cname: 'archlinuxcn'
---

## Introduction to Arch Linux CN and Software Management

The Arch Linux Chinese Community Repository, an unofficial software repository driven by the Arch Linux Chinese community, includes many additional packages not provided by the official repositories, as well as git versions and other variants of existing software. Some of the packaging scripts for these packages originate from the AUR (Arch User Repository), but there are also many packages that differ from those in the AUR.

## Arch Linux CN Software Source Replacement

:::caution
**To avoid problems when replacing software source configuration files, please make a backup of the system's default software source configuration files before proceeding.**
:::

1. Edit the `/etc/pacman.conf file` add the following line to the top of the file:

```bash varcode
[archlinuxcn]
Server = ${_http}://${_domain}/archlinuxcn/$arch
```

2. Install the archlinuxcn-keyring:
```shell varcode
[ ] (root) Are you the root user?
---
const SUDO = !root ? 'sudo ' : '';
---
${SUDO}pacman -S archlinuxcn-keyring
```

:::caution
If you encounter the following error during the installation process:
```shell
error: archlinuxcn-keyring: Signature from "Jiachen YANG (Arch Linux Packager Signing Key) " is marginal trust
```
This issue occurs because the developer has retired, which leaves the GPG key for farseerfc with a limited trust status in new installations. You can address this by executing the following command:
```shell varcode
sudo pacman-key --lsign-key "farseerfc@archlinux.org"
```
:::

3. Update the package cache:

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

##One-click source switching

:::caution
This method is only applicable for switching from the official source to our site's source. If you have already switched sources, please do not use the following commands.
:::

Use the `echo`  command to add the address of the current mirror to the end of the software source configuration file:

```shell varcode
[ ] (root) Are you the root user?
---
const SUDO = !root ? 'sudo ' : '';
---
${SUDO}echo -e "[archlinuxcn]\nServer = ${_http}://${_domain}/archlinuxcn/\$arch" >> /etc/pacman.conf
```

## References

1. [ZMirror](https://mirrors.cernet.edu.cn/about)   
2.  [Help Repository](https://github.com/mirrorz-org/mirrorz-help)
