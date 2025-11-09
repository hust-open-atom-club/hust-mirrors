---
sidebar_label: MXLinux
title: MXLinux 软件仓库镜像使用帮助
---

## MXLinux 简介
MX Linux 是 [antiX](https://antixlinux.com/) 和 [MX Linux 社区](https://mxlinux.org/)之间的合作项目。它是由 Debian 稳定存储库的用户构建的一系列作系统，旨在将优雅高效的桌面与高稳定性和稳定的性能相结合。
## 使用
1. 备份/etc/apt/sources.list.d/下面所有的索引文件：
```bash varcode
[ ] (root) 是否为 root 用户
---
const SUDO = !root ? 'sudo ' : '';
---
${SUDO}cp /etc/apt/sources.list.d/antix.list /etc/apt/sources.list.d/antix.list.bak
${SUDO}cp /etc/apt/sources.list.d/mx.list /etc/apt/sources.list.d/mx.list.bak
${SUDO}cp /etc/apt/sources.list.d/debian.list /etc/apt/sources.list.d/debian.list.bak
${SUDO}cp /etc/apt/sources.list.d/debian-stable-updates.list /etc/apt/sources.list.d/debian-stable-updates.list.bak
```

2. 修改所有索引文件的下载源地址为本站：
```bash varcode
[ ] (root) 是否为 root 用户
---
const SUDO = !root ? 'sudo ' : '';
---
${SUDO}sed -i "s@http://repo.antixlinux.com/stretch@${_http}://${_domain}/mxlinux/antix/stretch@g" /etc/apt/sources.list.d/antix.list
${SUDO}sed -i "s@http://la.mxrepo.com/mx/repo/@${_http}://${_domain}/mxlinux/mx/repo/@g" /etc/apt/sources.list.d/mx.list
${SUDO}sed -i "s@http://ftp.us.debian.org/debian/@${_http}://${_domain}/debian/@g" /etc/apt/sources.list.d/debian-stable-updates.list
${SUDO}sed -i "s@http://ftp.us.debian.org/debian/@${_http}://${_domain}/debian/@g" /etc/apt/sources.list.d/debian.list
${SUDO}sed -i "s@http://security.debian.org/@${_http}://${_domain}/debian-security/@g" /etc/apt/sources.list.d/debian.list
```

3. 更新镜像列表
执行以下命令：
```bash varcode
[ ] (root) 是否为 root 用户
---
const SUDO = !root ? 'sudo ' : '';
---
${SUDO}apt update
```

## 引用
1. [MXLinux 官网](https://mxlinux.org/)
2. [帮助 - 阿里云镜像站](https://developer.aliyun.com/mirror/mxlinux)
