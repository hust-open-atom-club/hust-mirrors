---
sidebar_label: Gentoo Portage Prefix
title: Gentoo Portage Prefix 软件源镜像使用帮助
---

## Gentoo Portage Prefix 简介

为了突出 Gentoo 在不同操作系统上的优点，Gentoo Prefix 项目开发并维护了一种在非标准位置安装 Gentoo 系统的方法。本镜像仓库同步了 Gentoo Portage Ebuild 源，采用 Git 方式同步。

## 使用方法

### 手动配置

请在 `/etc/portage/repos.conf/gentoo.conf` 中参照以下内容配置：

```conf varcode
[DEFAULT]
main-repo = gentoo

[gentoo]
location = /var/db/repos/gentoo
sync-type = git
sync-uri = ${_http}://${_domain}/git/gentoo-portage.git
auto-sync = yes
```

然后，执行下列命令：

第一次使用 git 同步时请执行：

```bash
# 删除本地 main tree 目录
rm -rf /var/db/repos/gentoo

# 重新同步
emerge --sync
```

否则请执行：

```bash varcode
# 进入 main tree 目录
cd /var/db/repos/gentoo

# 将 remote url 设置为中科大
git remote set-url origin ${_http}://${_domain}/git/gentoo-portage.git

# 重新同步
emerge --sync
```

## 引用

1. [使用帮助 - USTC Mirror](https://mirrors.ustc.edu.cn/help/gentoo.git.html)
