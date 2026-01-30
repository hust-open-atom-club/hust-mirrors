---
sidebar_label: CRAN
title: CRAN Repository Mirror Usage Guide
type: lang
automated: true 
detection:
  policy: OneOf
  checks:
    - type: file
      path: ~/.Rprofile
---

:::info

Some content in this document may have been translated by AI.

:::

## CRAN Introduction

CRAN is a network of ftp and Web servers around the world that store identical, up-to-date versions of R code and documentation.

## Usage

### Long-term Use

CRAN (The Comprehensive R Archive Network) mirror source configuration file is `.Rprofile` (located at `~/.Rprofile` in linux).

```yaml cli
type: ReplaceIfExist
required: true
description: Replace R configuration file
privileged: false
files:
  - path: ~/.Rprofile
    statement: '$a options("repos" = c(CRAN="http://${_domain}/CRAN/"))'
```

Open R to use this CRAN mirror source to install R packages.

### Temporary Use

Specify repo during installation, such as installing lattice:

```raw varcode
install.packages("lattice", repos="${_http}://${_domain}/CRAN/")
```

## References

1. [Tuna Mirror Usage Guide](https://mirrors.tuna.tsinghua.edu.cn/help/CRAN/)
