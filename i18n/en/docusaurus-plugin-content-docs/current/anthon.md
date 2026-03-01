---
sidebar_label: Anthon
title: AOSC OS Mirror Usage Help
cname: 'anthon'
---

:::info

Some content in this document may have been translated by AI.

:::

## Introduction to AOSC OS

AOSC OS is a Linux distribution designed with "simplicity and reliability" as its design and maintenance goals. It mainly targets users with some Linux experience, optimizes the experience for personal desktop devices, and is committed to providing users with an out-of-the-box and simple and reliable working environment.

## Usage

### Tool Modification

Please use the following command to interactively enable/disable mirror sources, enter the mirror source name and use space to enable/disable mirror sources:

:::info

oma mirror allows specifying multiple mirror sources, please pay attention to disable mirror sources that are not needed.

:::

```bash varcode
[ ] (root) Are you the root user
---
const SUDO = !root ? 'sudo ' : '';
---
${SUDO}oma mirror
```

For more detailed information and usage about this command, please refer to [oma's GitHub page](https://github.com/AOSC-Dev/oma?tab=readme-ov-file#command-reference).

### Manual Modification

AOSC OS recommends using `oma` to complete the modification of software source configuration, and does not recommend manually editing configuration files.

But if you do have related needs, please edit the content of `/etc/apt/sources.list` according to the following information:

```list varcode
deb ${_http}://${_domain}/anthon/debs stable main
```

## References

1. [Introduction - AOSC OS](https://aosc.io/aosc-os)
2. [Usage Help - MirrorZ](https://help.mirrorz.org/anthon/)