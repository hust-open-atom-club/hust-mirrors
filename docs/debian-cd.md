---
title: Debian CD 镜像使用帮助
sidebar_label: debian-cd
cname: debian-cd
slug: /debian-cd
upstream: debian-cd
upstream_sha256: a8258ad275729471419fb41136b5e4b178a2b1fbccbf5ec317673532d5a5f99e
mirrorz: true
---
:::tip 该文档来自MirrorZ Help
本文档于*2024年2月22日*自动生成，[点击查看原文](https://help.mirrors.cernet.edu.cn/debian-cd)。  
其中可能存在失效链接或其他问题，如遇到问题请及时[反馈](https://gitee.com/dzm91_hust/hust-mirrors/issues)。
:::


Debian 安装镜像

需要安装 Debian 时，如果需要网络安装介质，下载以下链接

```plain varcode
---
---
${_http}://${_domain}/debian-cd/current/amd64/iso-cd/
```

中以 ``amd64-netinst.iso`` 结尾的文件即可。

如果需要离线安装桌面环境，在

```plain varcode
---
---
${_http}://${_domain}/debian-cd/current-live/amd64/iso-hybrid/
```

中可以选择不同桌面的 `debian-live-xxx-amd64-xxx.iso` 文件，如 `debian-live-12.1.0-amd64-lxqt.iso` 的文件中
就包含了离线安装 12.1.0 amd64 架构 lxqt 桌面的 Debian 所需的内容。
