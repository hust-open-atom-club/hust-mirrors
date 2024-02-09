---
title: GNU 软件仓库镜像使用帮助
sidebar_label: gnu
cname: gnu
slug: /gnu
upstream: gnu
upstream_sha256: fdbd44d1cdca7e81fec4c99c59e6f622fe107709a403a199d293f890100c685f
mirrorz: true
---
:::tip 该文档来自MirrorZ Help
本文档于*2024年2月8日*自动生成，[点击查看原文](https://help.mirrors.cernet.edu.cn/gnu)。  
其中可能存在失效链接或其他问题，如遇到问题请及时[反馈](https://gitee.com/dzm91_hust/hust-mirrors/issues)。
:::


### Gentoo

本节供 [Gentoo 帮助](/docs/gentoo/) 使用

```bash varcode
---
---
export GNU_URL="${_http}://${_domain}/gnu"
```

### pkgsrc

本节供 [pkgsrc 帮助](/docs/pkgsrc/)使用

```plain varcode
---
---
MASTER_SITE_GNU= ${_http}://${_domain}/gnu/
```