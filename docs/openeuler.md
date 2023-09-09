---
sidebar_label: openEuler
title: openEuler 软件仓库镜像使用帮助
---
## 命令替换

可以用以下命令替换 `/etc/yum.repos.d` 下的文件

```shell varcode
[ ] (root) 是否为 root 用户
---
const SUDO = !root ? 'sudo ' : '';
---
${SUDO}sed -i.bak -e "s|http://repo.openeuler.org|${_http}://${_domain}/openeuler|g" \\
	/etc/yum.repos.d/openEuler.repo
```
