---
sidebar_label: Anolis OS
title: Anolis software repository mirror use help
---

## Anolis OS profile and software govern

Anolis OS is OpenAnolis community launch completely open-source, neutral and open distirbution, it supports
multiple computing architectures, face to cloud scenarios optimized too. Compatible with the CentOS sortware
ecosystem. Anolis OS is aimed at providing stable, high-performance, safe, reliable and open-source operating
system services for a wide number of developers operation and maintenance personnel.


Anolis use YUM tools to govern RPM software package, enquiry software package information,get from the prescribed software library to software packages, manage dependenices automaticially to install and uninstall software 
packages, and also update system. Anolis OS configures and manages software sources through files under `/etc/yum.repos.d/`

## one click to change source

:::caution
Because of Anolis OS 23 has been released no stable version yet, this mirror site only provide the versions lower
than Anolis OS 23 software source, if you use other Anolis OS versions, please don't use the mirror site and the following orders.
:::

:::caution
The following orders only replace Anolis OS relative software sources, don't replace other software sources,
such as EPEL.

This way only apply to change from the official source to this site, if you have changed the source, please
don't use the following order.
:::


use `sed` order to modify software source configuration files in `/etc/yum.repos.d/` folder, original 
configuration files will be backed up with `.bak` suffix.

```shell varcode
[ ] (root) whether the root user or not
---
const SUDO = !root ? 'sudo ' : '';
---
${SUDO}sed -i.bak -E "s|https?://(mirrors\\.openanolis\\.cn)|${_http}://${_domain}|g" \\
    /etc/yum.repos.d/*.repo
${SUDO}yum makecache
${SUDO}yum update
```













