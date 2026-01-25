---
sidebar_label: Gentoo Portage
title: Gentoo Portage Repository Mirror Usage Guide
---

## Introduction

Portage is the official package manager and distribution system for Gentoo. It provides advanced dependency resolution, flexible building and installation of software from source code or binary packages, and other features. Portage configures software from the Gentoo ebuild repository, additional ebuild repositories, or binhosts. This mirror repository mirrors the Gentoo Portage Ebuild repository using Git synchronization.

## Usage

### Manual Configuration

Please configure in `/etc/portage/repos.conf/gentoo.conf` with the following content:

```conf varcode
[DEFAULT]
main-repo = gentoo

[gentoo]
location = /var/db/repos/gentoo
sync-type = git
sync-uri = ${_http}://${_domain}/git/gentoo-portage.git
auto-sync = yes
```

Then execute the following commands:

For first-time Git synchronization, please execute:

```bash
# Remove local main tree directory
rm -rf /var/db/repos/gentoo

# Resynchronize
emerge --sync
```

Otherwise, please execute:

```bash varcode
# Enter main tree directory
cd /var/db/repos/gentoo

# Set remote URL to HUST mirror source
git remote set-url origin ${_http}://${_domain}/git/gentoo-portage.git

# Resynchronize
emerge --sync
```

## References

1. [Usage Guide - USTC Mirror](https://mirrors.ustc.edu.cn/help/gentoo.git.html)
