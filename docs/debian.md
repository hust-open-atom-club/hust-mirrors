---
sidebar_label: Debian
title: Debian 软件仓库镜像使用帮助
cname: 'debian'
---

### Debian 简介与软件管理

`Debian` 是一个由自由和开源软件组成的 `Linux` 发行版。本项目创建于1993年，是最古老的 `Linux` 发行版之一。`Debian` 使用 `Linux` 内核，但大多数的基本操作系统工具都来自于 `GNU` 项目。因此，`Debian` 也常被称为 `Debian GNU/Linux` 操作系统。该项目由一组志愿者通过互联网协作进行协调，他们遵循着 `Debian` 社会契约、`Debian` 宪法和 `Debian` 自由软件准则这三个基本文件的指导。

`Debian` 使用软件包管理工具 `APT` 来管理 `DEB` 软件包。具体来说，`Debian` 通过修改 `/etc/apt/sources.list` 配置文件来管理系统软件源。一般情况下，用户可直接将该配置文件中的默认源地址（即，`http://deb.debian.org/`）替换为本软件镜像站。

### Debian 软件源替换

:::caution
**为了及时地获得安全更新，防止因软件源更新而导致的软件补丁滞后问题，我们推荐直接使用官方安全更新软件源。**
:::

```shell varcode
[ ] (version) { bullseye:Debian 11, bookworm:Debian 12, sid:Unstable - SID, testing:Testing, buster:Debian 10 } Debian 版本
[ ] (src) 启用源码镜像
---
const BACKPORTS_PREFIX = version == 'sid' ? '# ' : ''
const SID_PREFIX = version == 'sid' ? '# ' : ''
let NFW = ''
if (version == 'bookworm' || version == 'sid' || version == 'testing') 
  NFW = ' non-free-firmware'
const SRC_PREFIX = src ? "" : "# ";
---
# 默认注释了源码镜像以提高 apt update 速度，如有需要可自行取消注释
deb ${_http}://${_domain}/debian ${version} main contrib non-free${NFW}
${SRC_PREFIX}deb-src ${_http}://${_domain}/debian ${version} main contrib non-free${NFW}

${SID_PREFIX}deb ${_http}://${_domain}/debian ${version}-updates main contrib non-free${NFW}
${SID_PREFIX}${SRC_PREFIX}deb-src ${_http}://${_domain}/debian ${version}-updates main contrib non-free${NFW}

${SID_PREFIX}${BACKPORTS_PREFIX}deb ${_http}://${_domain}/debian ${version}-backports main contrib non-free${NFW}
${SID_PREFIX}${BACKPORTS_PREFIX}${SRC_PREFIX}deb-src ${_http}://${_domain}/debian ${version}-backports main contrib non-free${NFW}
```

### 注意事项

1. Debian Buster 以上版本默认支持 HTTPS 源。如果遇到无法拉取 HTTPS 源的情况，请使用 HTTP 源安装如下软件。

```shell varcode
[ ] (root) 是否为 root 用户
---
const SUDO = !root ? 'sudo ' : '';
---
${SUDO}apt install apt-transport-https ca-certificates
```

<!-- 2. Connection reset by peer 问题

在 apt 2.1.9 及以后的版本中，apt 的 HTTP Pipelining 特性与 Nginx 服务器疑似存在一定的不兼容问题，可能导致高带宽从镜像站下载大量软件包
（例如系统升级）时出现偶发的 Connection reset by peer 错误（详见 [Debian bug #973581](https://bugs.debian.org/cgi-bin/bugreport.cgi?bug=973581)）。

目前，用户可以通过关闭 HTTP Pipelining 特性解决此问题。
如果需要关闭，可以在使用 `apt` 命令时加上 `-o Acquire::http::Pipeline-Depth=0` 参数，
或使用以下命令将相关设置加入 apt 系统配置中：

```bash
echo "Acquire::http::Pipeline-Depth \"0\";" > /etc/apt/apt.conf.d/99nopipelining
``` -->

### 引用

[^1] [Debian 官网](https://wiki.debian.org/zh_CN/DebianIntroduction)  
[^2] [Debian 安全更新软件源](https://www.debian.org/security/faq.en.html#mirror)  