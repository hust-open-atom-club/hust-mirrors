---
title: How to use QEMU mirror
cname: 'qemu.git'
sidebar_label: QEMU
---


1. Clone the `QEMU` code and run:

```bash varcode
git clone ${_http}://${_domain}/git/qemu.git
```
 
1. Add `mirror` to an existing code repository. In an existing repository, run either:

```bash varcode
git remote add mirror ${_http}://${_domain}/git/qemu.git
```

or

```bash varcode
git remote set-url origin ${_http}://${_domain}/git/qemu.git
```

to set the default upstream to the current software mirror site.
<!-- 
### Notes

Experimental script (provided by TUNA only):

To clone the complete source code of `QEMU` (including its submodules), run:

```bash varcode
curl ${_http}://${_domain}/qemu/qemu.sh | bash
``` 
-->
## References

[^1] [ZMirror](https://mirrors.cernet.edu.cn/about) 

[^2] [Help Repository](https://github.com/mirrorz-org/mirrorz-help) 

