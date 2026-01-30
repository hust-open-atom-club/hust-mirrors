---
title: Linux Next Git
sidebar_label: Linux Next
cname: 'linux-next.git'
---

1. Clone the `Linux Next` source code by running:

```bash varcode
git clone ${_http}://${_domain}/git/linux-next.git
```

1. To add `mirror` to an existing code repository, in an existing repository, run either of the following commands:

```bash varcode
git remote add mirror ${_http}://${_domain}/git/linux-next.git
```

or

```bash varcode
git remote set-url origin ${_http}://${_domain}/git/linux-next.git
```

This will set the default upstream to the current software mirror site.

## References

[^1] [MirrorZ](https://mirrors.cernet.edu.cn/about)

[^2] [Help Repository](https://github.com/mirrorz-org/mirrorz-help)
