---
sidebar_label: Github Release
title: Github Release Repository Mirror Usage Guide
---

:::info

Some content in this document may have been translated by AI.

:::

## Mirror Introduction

GitHub Release is typically used by developers to distribute software releases (release notes, binaries, installers, etc.) for others to use. This mirror provides mirrors of Release content for some GitHub repositories.

## Software List

Currently, the following software are synchronized in this mirror repository:

- [rustdesk/rustdesk](https://mirrors.hust.edu.cn/github-release/rustdesk/rustdesk/)
- [ip7z/7zip](https://mirrors.hust.edu.cn/github-release/ip7z/7zip/)
- [llvm/llvm-project](https://mirrors.hust.edu.cn/github-release/llvm/llvm-project/)

:::tip

This mirror repository currently only synchronizes the latest release versions.

:::

## Usage Methods

### Method 1: Direct Replacement

When the software you want is included in this mirror repository, you can directly replace the relevant parts in the software's GitHub Release download link. The modification method is as follows:
Original link:

```url
https://github.com/<organization>/<repository>/releases/download/<version>/<filename>
```

Modify to:

```url varcode
${_http}://${_domain}/github-release/<organization>/<repository>/<version>/<filename>
```

### Method 2: Manual Search

You can also select the software you want to download from the following list, click to enter the link, and choose the corresponding file to download. By default, it enters the latest release version download.

- [rustdesk](https://mirrors.hust.edu.cn/github-release/rustdesk/rustdesk/LatestRelease/)
- [7zip](https://mirrors.hust.edu.cn/github-release/ip7z/7zip/LatestRelease/)
- [llvm-project](https://mirrors.hust.edu.cn/github-release/llvm/llvm-project/LatestRelease/)

## References

1. [About Releases - Github Docs](https://docs.github.com/en/repositories/releasing-projects-on-github/about-releases)
2. [Usage Guide - USTC Mirror](https://mirrors.ustc.edu.cn/help/github-release.html)
