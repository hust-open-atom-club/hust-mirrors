---
sidebar_label: Anolis OS
title: Anolis Software Repository Mirror Use Guide
---

## Anolis OS Profile and Software Manage

Anolis OS is a fully open-source, neutral, and open distribution launched by the OpenAnolis community. It supports multiple computing architectures, is optimized for cloud scenarios, and is compatible with the CentOS software ecosystem. Anolis OS aims to provide stable, high-performance, secure, reliable, and open-source operating system services for a wide range of developers and operations and maintenance personnel.

Anolis uses YUM tool to manage RPM packages, enquiry software package information, obtain packages from specified software repositories, automatically handle dependencies for package installation and uninstallation, and update the system. Anolis OS configures and manages software sources through files in `/etc/yum.repos.d/`.

## One-click Source Replacement

:::caution
Since there is no stable release of Anolis OS 23 yet, this mirror site only provides software sources for versions lower than Anolis OS 23. If you are using a different version of Anolis OS, please do not use this mirror site and the following commands.
:::

:::caution
The following commands will only replace the software sources related to Anolis OS and will not replace other software sources, such as EPEL.

This way only apply to change from the official source to this site source. If you have already changed the source, please don't use the following orders.
:::

Use the `sed` command to modify the software source configuration files in the `/etc/yum.repos.d/` folder. The original configuration files will be backed up as files with the `.bak` suffix.

```shell varcode
[ ] (root) Are you the root user?
---
const SUDO = !root ? 'sudo ' : '';
---
${SUDO}sed -i.bak -E "s|https?://(mirrors\\.openanolis\\.cn)|${_http}://${_domain}|g" \\
    /etc/yum.repos.d/*.repo
${SUDO}yum makecache
${SUDO}yum update
```
