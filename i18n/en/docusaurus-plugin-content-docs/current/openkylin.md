---
sidebar_label: openKylin
title: openKylin
cname: 'openkylin'
---

## Introduction to openKylin and Software Management

The openKylin community is an open-source community founded by basic software and hardware companies, non-profit organizations, community organizations, universities, research institutions, and individual developers. Its goal is to create a top-level desktop operating system community through the core principles of "collaboration" and "open-source convergence, co-creation of the future." It operates on the basis of open-source, voluntary participation, equality, and collaboration. The community collaborates with enterprises through open and open-source means to build a partner ecosystem and jointly create a top-level desktop operating system community, promoting the prosperity of Linux open-source technology and its hardware and software ecosystem.

openKylin uses the APT package management tool to manage DEB software packages. Specifically, openKylin manages system software sources by modifying the `/etc/apt/sources.list` configuration file. In general, users can replace the default source address in this configuration file (i.e., `http://archive.build.openkylin.top/`) with the mirror source provided by this software mirror site.
## Replacing openKylin Software Sources

:::caution
**To avoid problems when replacing software source configuration files, please make a backup of the system's default software source configuration files before proceeding.** 
::: 
1. Based on your preference, copy the following software source configuration content to `/etc/apt/sources.list` and save it.

```shell varcode
[ ] (version) { yangtze:1.0 } openKylin version
---
deb ${_http}://hustmirror.cn/openkylin ${version} main
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

Use the `sed` command to directly replace the default source address [http://archive.build.openkylin.top/](http://archive.build.openkylin.top/)  in the software source configuration file with the current mirror source site.

```shell varcode
[ ] (root) Are you the root user?
---
const SUDO = !root ? 'sudo ' : '';
---
${SUDO}sed -i.bak 's|https?://([^/]+)/openkylin|${_http}://hustmirror.cn/openkylin|' /etc/apt/sources.list
```


## Important Notes
- openKylin does not use HTTPS sources by default. If you choose to use HTTPS sources and encounter issues fetching HTTPS sources, you can install the following software using HTTP sources:

```shell varcode
[ ] (root) Are you the root user?
---
const SUDO = !root ? 'sudo ' : '';
---
${SUDO}apt install apt-transport-https ca-certificates
${SUDO}apt update
```
