---
sidebar_label: Rocky
title: Rocky Software Repository Mirror Usage Guide
---

## Rocky Introduction

Rocky Linux is an open-source enterprise-grade operating system designed to be 100% fully compatible with Red Hat Enterprise Linux®. This mirror repository provides software source mirrors for Rocky Linux. This repository includes versions 8, 9, and 10 for x86_64 and aarch64 architectures.

## One-click Usage

Open the terminal and execute the following command to replace the default software source configuration:

```shell varcode
[ ] (root) Whether is root user
[ ] (version) { 8:Rocky Linux 8, 9:Rocky Linux 9 } Rocky Linux Version
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

After executing the above command to replace, the default enabled repositories will be correctly replaced. After executing the command replacement, please run `dnf makecache` to update the cache to enable the changes.

## References

1. [Rocky Linux - USTC Mirror Help](https://mirrors.ustc.edu.cn/help/rocky.html)
2. [Homepage - Rocky Linux](https://rockylinux.org/zh-CN)
