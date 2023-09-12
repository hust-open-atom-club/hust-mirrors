---
title: Ubuntu
sidebar_label: Ubuntu
---

## Introduction to Ubuntu and Software Management

Ubuntu is a Debian-based Linux distribution that offers various versions, including desktop, server, and versions for IoT devices and robots. Ubuntu releases a new version every six months and a Long-Term Support (LTS) version every two years. The latest LTS version as of now is Ubuntu 22.04, codenamed "Jammy Jellyfish." Ubuntu is currently developed by the UK-based company Canonical and a community of developers. It follows a merit-based governance model, and Canonical provides security updates and support for each Ubuntu version from its release date until the specified End of Life (EOL) date.

Ubuntu uses the APT package management tool to manage DEB software packages. Specifically, Ubuntu manages system software sources by modifying the `/etc/apt/sources.list` configuration file. In general, users can replace the default source address in this configuration file (i.e., `http://archive.ubuntu.com/`) with the mirror source provided by this software mirror site.
## Replacing Ubuntu Software Sources

:::caution
**To receive security updates promptly and prevent security patch delays due to source updates, we recommend using the official security update software sources.** 
:::

:::caution
**To avoid problems when replacing software source configuration files, please make a backup of the system's default software source configuration files before proceeding.** 
::: 
1. Based on your preference, copy the following software source configuration content to `/etc/apt/sources.list` and save it.

```bash varcode
[ ] (version) { jammy:22.04 LTS, lunar:23.04, kinetic:22.10, focal:20.04 LTS, bionic:18.04 LTS, xenial:16.04 LTS, trusty:14.04 LTS } Ubuntu version
[ ] (proposed) Enable proposed software sources
[ ] (src) Enable source code mirrors
---
const SRC_PREFIX = src ? "" : "# ";
const PROPOSED_PREFIX = proposed ? "" : "# ";
---
deb ${_http}://${_domain}/ubuntu/ ${version} main restricted universe multiverse
${SRC_PREFIX}deb-src ${_http}://${_domain}/ubuntu/ ${version} main restricted universe multiverse
deb ${_http}://${_domain}/ubuntu/ ${version}-updates main restricted universe multiverse
${SRC_PREFIX}deb-src ${_http}://${_domain}/ubuntu/ ${version}-updates main restricted universe multiverse

${PROPOSED_PREFIX}deb ${_http}://${_domain}/ubuntu/ ${version}-proposed main restricted universe multiverse
${PROPOSED_PREFIX || SRC_PREFIX}deb-src ${_http}://${_domain}/ubuntu/ ${version}-proposed main restricted universe multiverse
```


1. Update the software using the following command:

```shell varcode
[ ] (root) Are you the root user?
---
const SUDO = !root ? 'sudo ' : '';
---
${SUDO}apt update
```


## One-Click Source Replacement

:::caution
This method is only applicable when switching from official sources to the mirror sources on this site. If you have already switched sources, please do not use the following commands.
:::

Use the `sed` command to directly replace the default source address [http://archive.ubuntu.com/](http://archive.ubuntu.com/)  in the software source configuration file with the current mirror source site.

```shell varcode
[ ] (root) Are you the root user?
---
const SUDO = !root ? 'sudo ' : '';
---
${SUDO}sed -i.bak 's|http://archive.ubuntu.com|${_http}://${_domain}|g' /etc/apt/sources.list
${SUDO}apt update
```

<!-- This method does not replace the security source. If you want to replace the security source, you can execute the following command:
```shell varcode
[ ] (root) Are you the root user?
---
const SUDO = !root ? 'sudo ' : '';
---
${SUDO}sed -i.bak 's/security.ubuntu.com/${_domain}/g' /etc/apt/sources.list
``` -->
## Important Notes
- Software Package Architectures

This mirror only contains software packages for `x86` and `x64` architecture processors. For devices with architectures such as `ARM (arm64, armhf)`, `PowerPC (ppc64el)`, `RISC-V (riscv64)`, and `s390x`, please use the `ubuntu-ports` mirror.
## References

[^1] [USTC Mirror Source Usage Guide](https://mirrors.ustc.edu.cn/help/ubuntu.html)
