---
sidebar_label: Gentoo Portage
title: Gentoo Portage 软件源镜像使用帮助
---

## 简介

Portage 是 Gentoo 的官方包管理器和分发系统 。它作为基于 Gentoo 作系统的核心，提供高级依赖解析、从源代码或二进制包灵活构建和安装软件，以及大多数其他核心发行功能。Portage 会从 Gentoo ebuild 仓库、额外的 ebuild 仓库或 binhost 中配置软件。本镜像仓库同步了 Gentoo Portage Ebuild 源，采用 Git 方式同步。

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
