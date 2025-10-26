---
sidebar_label: OpenBSD
title: OpenBSD Mirror Usage Guide
---

## Introduction to OpenBSD
The OpenBSD project produces a FREE, multi-platform 4.4BSD-based UNIX-like operating system.

## Manual Configuration
Edit the `/etc/installurl` file to contain the following:
```url varcode
${_http}://${_domain}/openbsd/
```

## Quick Setup
Run the following command:
```bash varcode
echo '${_http}://${_domain}/openbsd/' | sudo tee /etc/installurl
```

## References
1. [Usage Guide-MirrorZ Project](https://help.mirrors.cernet.edu.cn/OpenBSD/)
2. [openbsd.org](https://www.openbsd.org/index.html)
