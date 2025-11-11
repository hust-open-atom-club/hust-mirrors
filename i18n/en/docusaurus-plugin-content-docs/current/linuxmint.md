---
title: Linux Mint
sidebar_label: Linux Mint
cname: LinuxMint
---

## Linux Mint Introduction and Software Management
Linux Mint is a Linux distribution based on Ubuntu. The purpose of Linux Mint is to provide a free and open-source, modern, elegant, powerful yet easy-to-use operating system. Linux Mint also uses `apt` as its package manager, similar to Ubuntu and Debian, and you need to edit the paths in `/etc/apt/sources.list` and `/etc/apt/sources.list.d/*`.

## Ubuntu / Debian Software Source Replacement

For some sources from Ubuntu and Debian, you can refer to the [Ubuntu Help](./ubuntu) and [Debian Help](./debian) to make modifications.

## Linux Mint Software Source Replacement

:::caution
**To avoid errors after replacing the software source configuration files, please back up the system's original software source configuration files before proceeding with the following steps.**
:::

1. Modify `/etc/apt/sources.list.d/official-package-repositories.list`, replacing `packages.linuxmint.com` with the mirror source.

```deb varcode
[] (release) { victoria:21.2, vera:21.1, vanessa:21, una:20.3, uma:20.2, ulyssa:20.1 } Linux Mint versions
---
deb ${_http}://${_domain}/linuxmint ${release} main upstream import backport
```

2. Update the software with the following command.

```shell varcode
[ ] (root) Whether you are a root user
---
const SUDO = !root ? 'sudo ' : '';
---
${SUDO}apt update
```

:::caution
After completion, do not use mintsources (the built-in graphical software source setting tool) for any further operations, as mintsources will overwrite `/etc/apt/sources.list.d/official-package-repositories.list` after any operation, regardless of whether "OK" is pressed.
:::

## One-click Source Replacement

:::caution
This method is only applicable for changing from the official source to this site's source. If you have already changed the source, do not use the following commands.
:::

Use the `sed` command to directly replace the default source URL [http://packages.linuxmint.com](http://packages.linuxmint.com) in the software source configuration file with the current mirror source.

```shell varcode
[ ] (root) Whether you are a root user
---
const SUDO = !root ? 'sudo ' : '';
---
${SUDO}sed -i.bak 's|http://packages.linuxmint.com|${_http}://${_domain}/linuxmint|g' /etc/apt/official-package-repositories.list
${SUDO}sed -i 's|http://archive.ubuntu.com|${_http}://${_domain}|g' /etc/apt/official-package-repositories.list
```

## Linux Mint Installation Image {#cd}
Linux Mint installation images are available in cinnamon, mate, and xfce desktop environments, corresponding to three different versions of the installation images. If you need to download these versions of the installation images, click the button below to select the corresponding version and type for download.

- cinnamon: The default desktop environment of Linux Mint, developed based on GNOME 3.
- mate: A desktop environment developed based on GNOME 2.
- xfce: A lightweight desktop environment, suitable for computers with lower specifications.

<a href="/release?release=Linux%20Mint">
    <button className="button button--primary">Download Images</button>
</a>

## References
1. [Tuna Mirror Help](https://mirrors.tuna.tsinghua.edu.cn/help/linuxmint/)

---
