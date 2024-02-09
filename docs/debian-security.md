---
title: Debian Security 软件仓库镜像使用帮助
sidebar_label: debian-security
cname: debian-security
slug: /debian-security
upstream: debian-security
upstream_sha256: e9383e3d620932066df8999c9a9aa6f47145fa95c5d731409498a7f11082a147
mirrorz: true
---
:::tip 该文档来自MirrorZ Help
本文档于*2024年2月8日*自动生成，[点击查看原文](https://help.mirrors.cernet.edu.cn/debian-security)。  
其中可能存在失效链接或其他问题，如遇到问题请及时[反馈](https://gitee.com/dzm91_hust/hust-mirrors/issues)。
:::


一般情况下，将 `/etc/apt/sources.list` 文件中 Debian 默认的源地址 `http://security.debian.org/` 替换为镜像地址即可。

```properties varcode
[ ] (a) { 0:Debian 11 (bullseye), 1:Debian 12 (bookworm), 2:sid, 3:testing, 4:Debian 10 (buster) } Debian 版本
[ ] (b) { 0:否, 1:是 } 启用源码镜像
---
let release_name = ""
let security = ""
let is_sid = ""
let has_backports = ""
let has_nfw = ""
let enable_source = ""
if(a === "0") { release_name = "bullseye"; security = "-security"; is_sid = ""; has_backports = ""; has_nfw = ""; }
if(a === "1") { release_name = "bookworm"; security = "-security"; is_sid = ""; has_backports = ""; has_nfw = " non-free-firmware"; }
if(a === "2") { release_name = "sid"; security = "-security"; is_sid = "# "; has_backports = "# "; has_nfw = " non-free-firmware"; }
if(a === "3") { release_name = "testing"; security = "-security"; is_sid = ""; has_backports = ""; has_nfw = " non-free-firmware"; }
if(a === "4") { release_name = "buster"; security = "/updates"; is_sid = ""; has_backports = ""; has_nfw = ""; }
if(b === "0") { enable_source = "# "; }
if(b === "1") { enable_source = ""; }
---
# 默认注释了源码镜像以提高 apt update 速度，如有需要可自行取消注释
${is_sid}deb ${_http}://${_domain}/debian-security ${release_name}${security} main contrib non-free${has_nfw}
${is_sid}${enable_source}deb-src ${_http}://${_domain}/debian-security ${release_name}${security} main contrib non-free${has_nfw}
```