---
sidebar_label: Rocky
title: Rocky 软件源镜像使用帮助
---

## Rocky 简介

Rocky Linux 是一个开源的企业级操作系统，旨在与 Red Hat Enterprise Linux® 100% 完全兼容。本镜像仓库是为 Rocky Linux 提供的软件源镜像。本仓库收录了 x86_64，aarch64 架构的 8，9，10 版本。

## 一键使用
打开终端，执行以下命令，替换默认的软件源配置：
```shell varcode
[ ] (root) 是否为 root 用户
[ ] (version) { 8:Rocky Linux 8, 9:Rocky Linux 9 } Rocky Linux 版本
---
const SUDO = !root ? 'sudo ' : '';
let REPO1 = '';
let REPO2 = '';
let REPO3 = '';
let REPO4 = '';
let REPOend3 = '';
let REPOend4 = '';

if (version == '8') {
    REPO1 = "/etc/yum.repos.d/Rocky-AppStream.repo";
    REPO2 = "/etc/yum.repos.d/Rocky-BaseOS.repo";
    REPO3 = "/etc/yum.repos.d/Rocky-Extras.repo";
    REPO4 = "/etc/yum.repos.d/Rocky-PowerTools.repo";
    REPOend3 = " \\ \n";
    REPOend4 = " \\ \n";
}

if (version == '9') {
    REPO1 = "/etc/yum.repos.d/rocky-extras.repo";
    REPO2 = "/etc/yum.repos.d/rocky.repo";
    REPO3 = "";
    REPO4 = "";
    REPOend3 = "";
    REPOend4 = "";
}
---
${SUDO}sed -e 's|^mirrorlist=|#mirrorlist=|g' \\
    -e 's|^#baseurl=http://dl.rockylinux.org/$contentdir|baseurl=${_http}://${_domain}/rocky|g' \\
    -i.bak \\
    ${REPO1} \\
    ${REPO2} \\
    ${REPO3}${REPOend3}
    ${REPO4}${REPOend4}
```

执行以上命令后，默认启用了的仓库将会被正确替换。在执行命令替换之后，请运行 `dnf makecache` 更新缓存以启用更改。

## 引用
1. [Rocky Linux-USTC Mirror Help](https://mirrors.ustc.edu.cn/help/rocky.html)
2. [主页 - Rocky Linux](https://rockylinux.org/zh-CN)
