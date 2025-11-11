---
title: Ubuntu Kylin Mirror Usage Guide
sidebar_label: UbuntuKylin
---

## About Ubuntu Kylin and Software Management

Ubuntu Kylin is a Linux distribution based on Ubuntu, led by Kylin Software Co., Ltd., and is one of the official Ubuntu derivatives.
It focuses on developing a "user-friendly, simple and easy-to-use" desktop environment, committed to providing a smarter user experience for global users.

Ubuntu Kylin uses the `APT` package management tool to manage DEB packages.
Its software sources consist of two parts:
- One part is the Ubuntu software repository.
- The other part is the Ubuntu Kylin software repository.

## Ubuntu Official Software Source Replacement

:::info
Apart from Ubuntu Kylin's software sources, Ubuntu Kylin shares the same software sources with Ubuntu. Please directly refer to the [Ubuntu documentation](./ubuntu).

:::

:::caution
Note that Ubuntu Kylin may have pre-replaced Ubuntu sources with Alibaba Cloud during installation. Please do not refer to the "One-click Source Replacement" section in the Ubuntu documentation.
:::

Click [here](./ubuntu) to view the Ubuntu software source replacement method.

## Ubuntu Kylin Official Software Source Replacement

:::caution
**To avoid issues after replacing the software source configuration files, please back up the system's original software source configuration files before proceeding with the following operations.**
:::

1. Adjust the following options according to your situation, and use the following software source configuration to replace the original content in `/etc/apt/sources.list.d/ukui.list` and
`/etc/apt/sources.list.d/software.list`:

```bash varcode title=/etc/apt/sources.list.d/ukui.list
[ ] (version) { jammy:22.04 LTS, groovy:20.10, focal:20.04 LTS } Ubuntu Kylin Version
---
deb ${_http}://${_domain}/ubuntukylin/ ${version} main
```

```bash varcode title=/etc/apt/sources.list.d/software.list
[ ] (version) { jammy:22.04 LTS, groovy:20.10, focal:20.04 LTS } Ubuntu Kylin Version
---
deb ${_http}://${_domain}/ubuntukylin/ ${version}-partner main
```

2. Update software using the following command:

```shell varcode
[ ] (root) Is root user?
---
const SUDO = !root ? 'sudo ' : '';
---
${SUDO}apt update
```

## Image Download {#image}

This mirror site synchronizes Ubuntu Kylin installation images.

Please click the button below, then select the appropriate version to download and install.

<a href="/release?release=Ubuntu%20Kylin">
    <button className="button button--primary">Download Image</button>
</a>