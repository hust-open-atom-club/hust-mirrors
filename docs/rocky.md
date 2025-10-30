---
sidebar_label: Rocky
title: Rocky 软件源镜像使用帮助
cname: 'Rocky Linux'
---

## Rocky 简介

Rocky Linux 是一个开源的企业级操作系统，旨在与 Red Hat Enterprise Linux® 100% 完全兼容。本镜像仓库是为 Rocky Linux 提供的软件源镜像。本仓库收录了 x86_64，aarch64 架构的 8，9，10 版本。

## 一键使用
打开终端，执行以下命令，替换默认的软件源配置：

Rocky Linux 8：
```shell varcode
sed -e 's|^mirrorlist=|#mirrorlist=|g' \ 
    -e 's|^#baseurl=http://dl.rockylinux.org/$contentdir|baseurl=${_http}://${_domain}/rocky|g' \ 
    -i.bak \ 
    /etc/yum.repos.d/Rocky-AppStream.repo \ 
    /etc/yum.repos.d/Rocky-BaseOS.repo \ 
    /etc/yum.repos.d/Rocky-Extras.repo \ 
    /etc/yum.repos.d/Rocky-PowerTools.repo
```
Rocky Linux 9：
```shell varcode
sed -e 's|^mirrorlist=|#mirrorlist=|g' \ 
    -e 's|^#baseurl=http://dl.rockylinux.org/$contentdir|baseurl=${_http}://${_domain}/rocky|g' \ 
    -i.bak \ 
    /etc/yum.repos.d/rocky-extras.repo \ 
    /etc/yum.repos.d/rocky.repo
```
执行以上命令后，默认启用了的仓库将会被正确替换。在执行命令替换之后，请运行 `dnf makecache` 更新缓存以启用更改。

## 引用
1. [Rocky Linux-USTC Mirror Help](https://mirrors.ustc.edu.cn/help/rocky.html)
2. [主页 - Rocky Linux](https://rockylinux.org/zh-CN)
