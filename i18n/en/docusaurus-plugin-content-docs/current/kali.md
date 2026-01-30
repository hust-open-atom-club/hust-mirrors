---
sidebar_label: Kali
title: Kali Linux Repository Mirror Usage Guide
cname: 'kali'
type: OS
detection:
  checks:
    - type: os_release
      name: Kali GNU/Linux
---

:::info

Some content in this document may have been translated by AI.

:::

## Kali Introduction and Software Management

Kali Linux is an open-source, Debian-based Linux distribution designed to provide powerful tool support for various information security tasks including penetration testing, security research, and reverse engineering.

Kali uses the package management tool `APT` to manage DEB packages. Specifically, Kali manages system software sources by modifying the `/etc/apt/sources.list` configuration file. Generally, users can directly replace the default source address [http://http.kali.org/](http://http.kali.org/) in this configuration file with this software mirror site.

## Kali Software Source Replacement

### One-click Source Replacement

:::caution
This method only applies to switching from the official source to this site source. If you have already changed the source, please do not use the following command.
:::

Use the `sed` command to directly replace the default source address [http://http.kali.org/](http://http.kali.org/) in the software source configuration file with the current mirror source site.

```yaml cli
type: ReplaceIfExist
required: true
optional: false
description: Replace Kali main repository
privileged: true
files:
  - path: /etc/apt/sources.list
    match: 'https?://([^/]+)/kali'
    replace: '${_http}://${_domain}/kali'
```

:::caution
**To avoid problems when replacing software source configuration files, please make a backup of the system's default software source configuration files before proceeding.**
:::

:::caution
Early versions of Kali Linux are not supported by this site.
:::

### 1. Make your choice based on personal preference, and replace `/etc/apt/sources.list` with the following content

```plaintext varcode
[ ] (src) Enable source mirror
---
const SRC_PREFIX = src ? "" : "# ";
---
# See https://w.kali.org/docs/general-use/kali-linux-sources-list-repositories/
deb https://mirrors.hust.edu.cn/kali kali-rolling main contrib non-free non-free-firmware
# Additional line for source packages
${SRC_PREFIX}deb-src https://mirrors.hust.edu.cn/kali kali-rolling main contrib non-free non-free-firmware
```

### 2. Update software with the following command

```yaml cli
type: Execute
privileged: true
interpreter: shell
exec: |
  #{USE_IN_DOCS/}
  apt-get update
  #{/USE_IN_DOCS}
```

## Notes

- Kali uses HTTP sources by default. If you choose to use HTTPS sources and encounter issues pulling HTTPS sources, please use HTTP sources to install the following software.

```shell varcode
[ ] (root) Whether root user
---
const SUDO = !root ? 'sudo ' : '';
---
${SUDO}apt install apt-transport-https ca-certificates
${SUDO}apt update
```

## Kali CD Images and Virtual Machine Images {#iso}

This site provides download services for Kali Linux CD images and virtual machine images.

- [Click this link](/release?release=Kali%20Linux), select the required version and architecture to download the desired Kali Linux installation image.
