---
title: LLVM Project Git Mirror Usage Guide
sidebar_label: llvm-project.git
type: repo
---

:::info

Some content in this document may have been translated by AI.

:::

## LLVM Project Introduction

LLVM is an open-source project, a compiler framework, and a collection of modular and reusable compiler and toolchain technologies.

It includes a series of subprojects: clang, lldb, libc++, libc++abi, klee, lld, etc.

## Mirror Repository Introduction

This mirror site mirrors the LLVM Project's [GitHub repository](https://github.com/llvm/llvm-project.git).

:::info Release Versions
If you need release version source code for various subprojects, this mirror site does not currently provide mirrors. Please download from [GitHub Release](https://github.com/llvm/llvm-project/releases).
:::

## LLVM Project Git Mirror Usage Guide

To clone the code, use:

```yaml cli
type: Execute
privileged: false
interpreter: shell
exec: |
  #{USE_IN_DOCS/}
  git clone ${_http}://${_domain}/llvm-project.git
  #{/USE_IN_DOCS}
```

Due to the large repository size, executing `git clone` may take a considerable amount of time.

To add the mirror to an existing repository, run in the existing repository:

```shell varcode
git remote add mirror ${_http}://${_domain}/llvm-project.git
```

Or run:

```yaml cli
type: Execute
privileged: false
interpreter: shell
exec: |
  #{USE_IN_DOCS/}
  git remote set-url origin ${_http}://${_domain}/llvm-project.git
  #{/USE_IN_DOCS}
```

Set the default upstream to the mirror site
