---
sidebar_label: Gentoo
title: Gentoo Mirror Usage Guide
---

## Introduction to Gentoo

Gentoo is a free operating system based on Linux.This repository provides mirrors of Gentoo's Stage3 installation.A stage3 installation is the only supported method of installation.

:::info
A stage file is an archive which serves as the seed for a Gentoo environment.
Stage 3 files can be downloaded from releases/amd64/autobuilds/ on any of the official Gentoo mirrors. Stages are updated frequently and are therefore not included within official live images.
:::

## Configuration During Installation

Go to the [Gentoo Downloads page](https://www.gentoo.org/downloads/#other-arches), right-click the link to the desired Stage 3 file, and copy it to your clipboard. Replace the original base URL:
`https://distfiles.gentoo.org/`
with the following:
```bash varcode
${_http}://${_domain}/gentoo/
```

Then use the modified URL in the subsequent installation steps.

## Configuring Mirrors for Gentoo Prefix Bootstrap

Before running the Bootstrap script, you can configure the use of this mirror during the bootstrap process by setting the following environment variables:
```bash varcode
export GENTOO_MIRRORS="${_http}://${_domain}/gentoo"
export SNAPSHOT_URL="${_http}://${_domain}/gentoo/snapshots"
export GNU_URL="${_http}://mirror/gnu"
```

## Distfiles Configuration

You can add the following line to `/etc/portage/make.conf`:
```conf varcode
GENTOO_MIRRORS="${_http}://${_domain}/gentoo"
```

After configuration, run `emerge --sync` in your terminal to update the package database.

## References

1. [Gentoo Handbook – AMD64 Installation](https://wiki.gentoo.org/wiki/Handbook:AMD64/Full/Installation/zh-cn)
