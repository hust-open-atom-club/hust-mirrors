---
sidebar_label: Buildroot
title: Buildroot Warehouse Image Usage Help
---

## Buildroot Introduction

Buildroot is a framework for creating embedded Linux systems. It is written using the KBuild framework, consisting of Makefiles and KConfig files, and allows one to conveniently modify configurations using menuconfig, similar to compiling the kernel, to create Linux root filesystems and cross-compilation toolchains for embedded devices of various architectures.

## Buildroot Download

If the official site is slow to connect, go directly to the [download page]  of this mirror site.(/release?release=Buildroot).
Select buildroot and choose the required version to download.

Then use the tar tool locally to extract it.

## Buildroot Change source

Buildroot needs to use sources such as kernel, GNU, CPAN, etc. during the build process.

Other source packages will be downloaded from the upstream repository or its backup server [http://sources.buildroot.net/](http://sources.buildroot.net/)

This mirror site has mirrored GNU, CPAN, and the kernel, and you can modify these source addresses in the Buildroot configuration file.

### Method 1: Manual Modification

First, back up your config file and manually modify the configuration information. (You can use menuconfig, nconfig, or even directly edit the file to make changes)

```raw varcode
BR2_KERNEL_MIRROR="${_http}://${_domain}/kernel.org"
BR2_GNU_MIRROR="${_http}://${_domain}/gnu"
BR2_CPAN_MIRROR="${_http}://${_domain}/CPAN"
```

### Method 2: Use a script to replace

:::info
Before using the script to replace, make sure that the `.config` file already exists. You can use `make defconfig` to generate the default configuration file.
:::

Run the following replacement script in the buildroot root directory (the directory that contains the `.config` file):

```bash varcode
sed -i.old \\
    -e '/BR2_KERNEL_MIRROR/c\\BR2_KERNEL_MIRROR="${_http}://${_domain}/kernel.org"' \\
    -e '/BR2_GNU_MIRROR/c\\BR2_GNU_MIRROR="${_http}://${_domain}/gnu"' \\
    -e '/BR2_CPAN_MIRROR/c\\BR2_CPAN_MIRROR="${_http}://${_domain}/CPAN"' \\
    .config

```

Then run `make` to start the build.
