---
title: How to use linux-stable.git
sidebar_label: Linux Stable
cname: 'linux-stable.git'
---

1. Clone the `Linux` source code by running:

```bash varcode
git clone ${_http}://${_domain}/git/linux-stable.git
```

 
1. To add `mirror` to an existing code repository, in an existing repository, run either of the following commands:

```bash varcode
git remote add mirror ${_http}://${_domain}/git/linux-stable.git
```

or

```bash varcode
git remote set-url origin ${_http}://${_domain}/git/linux-stable.git
```

This will set the default upstream to the current software mirror site.

## References

[^1] [MirrorZ](https://mirrors.cernet.edu.cn/about) 

[^2] [Help Repository](https://github.com/mirrorz-org/mirrorz-help) 

[^3] [About Git Mirrors](https://chat.openai.com/c/about-git) 
