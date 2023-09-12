---
sidebar_label: openEuler
title: openEuler
---
## Introduction to openEuler and Software Management

openEuler is an open-source operating system project incubated and operated by the OpenAtom Foundation, aiming to provide powerful operating system support for servers and cloud computing environments. openEuler is led by Huawei, a Chinese company, and supported by the community. The current openEuler system is based on the Linux kernel and supports Kunpeng, RISC-V, and various other processors, fully unleashing the potential of computing chips. It is an efficient, stable, and secure open-source operating system built by global open-source contributors and is suitable for database, big data, cloud computing, artificial intelligence, and other application scenarios.

openEuler uses the DNF tool to manage RPM software packages, query package information, fetch packages from specified repositories, automatically handle dependencies for package installation and removal, and system updates. openEuler is configured and manages software sources through the `/etc/yum.repos.d/openEuler.repo` file.
## One-Click Source Replacement

:::caution
This method is only applicable when switching from official sources to the mirror sources on this site. If you have already switched sources, please do not use the following commands.
:::

Use the `sed` command to modify the software source configuration file `/etc/yum.repos.d/openEuler.repo`.

```bash varcode
[ ] (root) Are you the root user?
---
const SUDO = !root ? 'sudo ' : '';
---
${SUDO}sed -i.bak -e "s|http://repo.openeuler.org|${_http}://${_domain}/openeuler|g" \\
	/etc/yum.repos.d/openEuler.repo
${SUDO}dnf update
```

## References

[^1] [Managing Software Packages with DNF](https://docs.openeuler.org/en/docs/22.03_LTS_SP2/docs/Administration/using-dnf-to-manage-software-packages.html)