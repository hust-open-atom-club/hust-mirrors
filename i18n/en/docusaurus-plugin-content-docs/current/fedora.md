---
sidebar_label: Fedora
title: Fedora Repository Mirror Usage Guide
cname: 'Fedora Linux'
---

:::info

Some content in this document may have been translated by AI.

:::

## Fedora Linux Introduction

Fedora Linux is one of the most well-known Linux distributions, developed by the Fedora Project community and sponsored by Red Hat. Its goal is to create a novel, multifunctional, and free (open source) operating system. Fedora serves as the upstream source for the commercial Red Hat Enterprise Linux distribution.
:::info
Since Fedora 38 and older versions are no longer officially supported, Fedora 38 and older versions cannot use this mirror. Please use the default configuration file to allow the package manager to automatically obtain available mirror sources.
:::

## One-click Usage

Execute the following command to replace the files in `/etc/yum.repos.d`:

```bash varcode
sed -e 's|^metalink=|#metalink=|g' \
    -e 's|^#baseurl=http://download.example/pub/fedora/linux|baseurl=${_http}://${_domain}/fedora|g' \
    -i.bak \
    /etc/yum.repos.d/fedora.repo \
    /etc/yum.repos.d/fedora-updates.repo
```

After execution, your software source has been replaced with this mirror source.

## Manual Replacement

Replace the fedora repository (`/etc/yum.repos.d/fedora.repo`) with the following content:

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

Replace the updates repository (`/etc/yum.repos.d/fedora-updates.repo`) with the following content:

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

## References

1. [Usage Guide - TUNA Mirror](https://mirrors.tuna.tsinghua.edu.cn/help/fedora/)
