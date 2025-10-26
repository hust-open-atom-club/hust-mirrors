---
sidebar_label: OpenBSD
title: OpenBSD 软件仓库镜像使用帮助
cname: 'openbsd'
---

## OpenBSD 简介
OpenBSD 项目致力于创建一个自由的多平台的以 4.4BSD Lite 为基础的类 UNIX 操作系统，强调便携性、标准化、准确性、生产安全性以及完整的密码系统。

## 手动设置
将 `/etc/installurl` 文件修改为以下内容：
```url varcode
${_http}://${_domain}/openbsd/
```

## 快速设置
运行以下命令：
```shell varcode
echo '${_http}://${_domain}/openbsd/' | sudo tee /etc/installurl
```

## 引用
1. [使用帮助 - MirrorZ Projec](https://help.mirrors.cernet.edu.cn/OpenBSD/)
2. [项目简介 - Openbsd.org](https://www.openbsd.org/index.html)
