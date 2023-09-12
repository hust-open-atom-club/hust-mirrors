---
sidebar_label: Debian
title: Debian
cname: 'debian'
---

## Introduction to Debian and Software Management

Debian is a Linux distribution composed of free and open-source software. The project was created in 1993 and is one of the oldest Linux distributions. Debian uses the Linux kernel, but most of its core operating system tools come from the GNU project. Therefore, Debian is often referred to as the Debian GNU/Linux operating system. The project is coordinated by a group of volunteers collaborating over the internet, following three fundamental documents: the Debian Social Contract, Debian Constitution, and Debian Free Software Guidelines.

Debian uses the package management tool APT to manage DEB software packages. Specifically, Debian manages system software sources by modifying the `/etc/apt/sources.list` configuration file. In general, users can replace the default source address in this configuration file (i.e., `http://deb.debian.org/`) with the mirror source provided by this software mirror site.
## Replacing Debian Software Sources

:::caution
**To receive security updates promptly and avoid security patch lag due to source updates, we recommend using the official security update software source.** 
:::

:::caution
**To avoid problems when replacing software source configuration files, please make a backup of the system's default software source configuration files before proceeding.** 
::: 

1. Based on your preference, copy the following software source configuration content to `/etc/apt/sources.list` and save it.

```bash varcode
[ ] (version) { bullseye:Debian 11, bookworm:Debian 12, sid:Unstable - SID, testing:Testing, buster:Debian 10 } Debian version
[ ] (src) Enable source code mirror
---
const BACKPORTS_PREFIX = version == 'sid' ? '# ' : ''
const SID_PREFIX = version == 'sid' ? '# ' : ''
let NFW = ''
if (version == 'bookworm' || version == 'sid' || version == 'testing') 
  NFW = ' non-free-firmware'
const SRC_PREFIX = src ? "" : "# ";
---
# Default comment out the source code mirror to improve apt update speed. Uncomment if needed.
deb ${_http}://${_domain}/debian ${version} main contrib non-free${NFW}
${SRC_PREFIX}deb-src ${_http}://${_domain}/debian ${version} main contrib non-free${NFW}

${SID_PREFIX}deb ${_http}://${_domain}/debian ${version}-updates main contrib non-free${NFW}
${SID_PREFIX}${SRC_PREFIX}deb-src ${_http}://${_domain}/debian ${version}-updates main contrib non-free${NFW}

${SID_PREFIX}${BACKPORTS_PREFIX}deb ${_http}://${_domain}/debian ${version}-backports main contrib non-free${NFW}
${SID_PREFIX}${BACKPORTS_PREFIX}${SRC_PREFIX}deb-src ${_http}://${_domain}/debian ${version}-backports main contrib non-free${NFW}
```


2. Update the software using the following command:

```bash varcode
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

Use the `sed` command to directly replace the default source address [http://deb.debian.org/](http://deb.debian.org/)  in the software source configuration file with the current mirror source site.

```shell varcode
[ ] (root) Are you the root user?
---
const SUDO = !root ? 'sudo ' : '';
---
${SUDO}sed -i.bak 's|http://deb.debian.org|${_http}://${_domain}|g' /etc/apt/sources.list
```


## Important Notes
- Debian Buster and later versions support HTTPS sources by default. If you encounter issues fetching HTTPS sources, you can install the following software using HTTP sources:

```shell varcode
[ ] (root) Are you the root user?
---
const SUDO = !root ? 'sudo ' : '';
---
${SUDO}apt install apt-transport-https ca-certificates
${SUDO}apt update
```

<!-- 2. Connection reset by peer issue

In apt versions 2.1.9 and later, there is a suspected compatibility issue between apt's HTTP Pipelining feature and Nginx servers, which may lead to occasional "Connection reset by peer" errors when downloading a large number of packages from mirror sites (e.g., during system upgrades). See [Debian bug #973581](https://bugs.debian.org/cgi-bin/bugreport.cgi?bug=973581) for more details.

Currently, users can resolve this issue by disabling the HTTP Pipelining feature. If needed, you can add the related setting to the apt system configuration with the following command:

```bash
echo "Acquire::http::Pipeline-Depth \"0\";" > /etc/apt/apt.conf.d/99nopipelining
``` -->
## References

[^1] [Debian Official Website](https://wiki.debian.org/zh_CN/DebianIntroduction) 
[^2] [Debian Security FAQ](https://www.debian.org/security/faq.en.html#mirror)
