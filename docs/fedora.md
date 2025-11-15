---
sidebar_label: Fedora
title: Fedora 软件仓库镜像使用帮助
cname: 'Fedora Linux'
---

## Fedora Linux 简介
Fedora Linux 是较具知名度的 Linux 发行版之一，由 Fedora 项目社群开发、红帽公司赞助，目标是建立一套新颖、多功能并且自由（开放源代码）的操作系统。Fedora 是商业化的 Red Hat Enterprise Linux 发行版的上游源码。
:::info
由于 Fedora 38 及更旧版本已不再受官方支持，Fedora 38 及更旧版本无法使用此镜像。请使用默认配置文件，以使包管理器自动获取可用的镜像源。
:::

## 一键使用
执行以下命令，替换 `/etc/yum.repos.d` 下的文件：
```bash varcode
sed -e 's|^metalink=|#metalink=|g' \\
    -e 's|^#baseurl=http://download.example/pub/fedora/linux|baseurl=${_http}://${_domain}/fedora|g' \\
    -i.bak \\
    /etc/yum.repos.d/fedora.repo \\
    /etc/yum.repos.d/fedora-updates.repo
```
执行后，您的软件源已替换为本站镜像源。

## 手动替换
将 fedora 仓库（`/etc/yum.repos.d/fedora.repo`）替换为以下内容：
```repo varcode
# /etc/yum.repos.d/fedora.repo
[fedora]
name=Fedora $releasever - $basearch
baseurl=${_http}://${_domain}/fedora/releases/$releasever/Everything/$basearch/os/
#metalink=https://mirrors.fedoraproject.org/metalink?repo=fedora-$releasever&arch=$basearch
enabled=1
countme=1
metadata_expire=7d
repo_gpgcheck=0
type=rpm
gpgcheck=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-fedora-$releasever-$basearch
skip_if_unavailable=False
```

将 updates 仓库（`/etc/yum.repos.d/fedora-updates.repo`）替换为以下内容：
```repo varcode
# /etc/yum.repos.d/fedora-updates.repo
[updates]
name=Fedora $releasever - $basearch - Updates
baseurl=${_http}://${_domain}/fedora/updates/$releasever/Everything/$basearch/
#metalink=https://mirrors.fedoraproject.org/metalink?repo=updates-released-f$releasever&arch=$basearch
enabled=1
countme=1
repo_gpgcheck=0
type=rpm
gpgcheck=1
metadata_expire=6h
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-fedora-$releasever-$basearch
skip_if_unavailable=False
```

## 引用
1. [使用帮助 - TUNA 镜像站](https://mirrors.tuna.tsinghua.edu.cn/help/fedora/)
