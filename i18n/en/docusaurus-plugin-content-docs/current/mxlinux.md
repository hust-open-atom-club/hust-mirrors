---
sidebar_label: MXLinux
title: MXLinux Software Repository Mirror Usage Guide
---

## MXLinux Introduction

MX Linux is a cooperative venture between the [antiX](https://antixlinux.com/) and [MX Linux communities](https://mxlinux.org/). It is a family of operating systems built by users from Debian stable repositories, designed to combine elegant and efficient desktops with high stability and solid performance.

## Usage

1. Backup all index files under /etc/apt/sources.list.d/:

```bash varcode
[ ] (root) Whether is root user
---
const SUDO = !root ? 'sudo ' : '';
---
${SUDO}cp /etc/apt/sources.list.d/antix.list /etc/apt/sources.list.d/antix.list.bak
${SUDO}cp /etc/apt/sources.list.d/mx.list /etc/apt/sources.list.d/mx.list.bak
${SUDO}cp /etc/apt/sources.list.d/debian.list /etc/apt/sources.list.d/debian.list.bak
${SUDO}cp /etc/apt/sources.list.d/debian-stable-updates.list /etc/apt/sources.list.d/debian-stable-updates.list.bak
```

2. Modify the download source address of all index files to this site:

```bash varcode
[ ] (root) Whether is root user
---
const SUDO = !root ? 'sudo ' : '';
---
${SUDO}sed -i "s@http://repo.antixlinux.com/stretch@${_http}://${_domain}/mxlinux/antix/stretch@g" /etc/apt/sources.list.d/antix.list
${SUDO}sed -i "s@http://la.mxrepo.com/mx/repo/@${_http}://${_domain}/mxlinux/mx/repo/@g" /etc/apt/sources.list.d/mx.list
${SUDO}sed -i "s@http://ftp.us.debian.org/debian/@${_http}://${_domain}/debian/@g" /etc/apt/sources.list.d/debian-stable-updates.list
${SUDO}sed -i "s@http://ftp.us.debian.org/debian/@${_http}://${_domain}/debian/@g" /etc/apt/sources.list.d/debian.list
${SUDO}sed -i "s@http://security.debian.org/@${_http}://${_domain}/debian-security/@g" /etc/apt/sources.list.d/debian.list
```

3. Update mirror list
Execute the following command:

```bash varcode
[ ] (root) Whether is root user
---
const SUDO = !root ? 'sudo ' : '';
---
${SUDO}apt update
```

## MXLinux Installation Image {#cd}

MXLinux installation images provide three desktop environments: KDE, Fluxbox, and xfce, corresponding to three versions of installation images. If you need to download these versions of installation images, you can click the button below to select the corresponding version and type for download.

- KDE: A customized desktop environment based on GNOME 3 development.
- Fluxbox: A lightweight window manager as an alternative to the default Xfce desktop environment.
- xfce: Lightweight desktop environment suitable for computers with lower configurations.

<a href="/release?release=Mxlinux">
    <button className="button button--primary">Download Image</button>
</a>

## References

1. [MXLinux Official Website](https://mxlinux.org/)
2. [Help - Alibaba Cloud Mirror Station](https://developer.aliyun.com/mirror/mxlinux)
