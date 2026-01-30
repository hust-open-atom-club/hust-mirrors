---
sidebar_label: CTAN
title: TeX Packages and Distribution Usage Guide
---

:::info

Some content in this document may have been translated by AI.

:::

CTAN (The Comprehensive TeX Archive Network) is the gathering place for all TeX typesetting system related materials, including source code and documentation for compilation engines, packages, and fonts. Currently, the vast majority of LaTeX packages are uploaded to the CTAN core site and then synchronized to various mirrors around the world.

This article provides mirror configuration methods for the two major distributions: TeX Live and MiKTeX.

## TeX Live

TeX Live is currently the most widely used TeX distribution, supporting Windows, Linux, and macOS. The version released on macOS is called MacTeX.

### Installation

Common installation methods for TeX Live distribution can be found in [this document](pathname:///CTAN/info/install-latex-guide-zh-cn/install-latex-guide-zh-cn.pdf).

In addition to the annual updated full ISO image, the CTAN mirror also contains an online installer. This method ensures that all installed packages are the latest version, but is greatly affected by network connection conditions. The operation method is (*administrator privileges are likely required*):

1. Download [`install-tl.zip`](pathname:///CTAN/systems/texlive/tlnet/install-tl.zip) and extract it
2. On Windows, double-click to run `install-tl.bat`. If there is a graphical interface, you can specify the use of a mirror source in the bottom right button before entering the installer.

    On Linux, use the following command:

```bash varcode
perl install-tl --repository ${_http}://${_domain}/CTAN/systems/texlive/tlnet
```

### Switch Mirror

The CTAN mirror source used by TeX Live can be changed from the built-in package manager `tlmgr` (*administrator privileges are likely required*).

Execute in the command line

```bash varcode
tlmgr option repository ${_http}://${_domain}/CTAN/systems/texlive/tlnet
```

to permanently change the mirror source.

If you only need temporary switching, you can use the following command:

```bash varcode
tlmgr update --all --repository ${_http}://${_domain}/CTAN/systems/texlive/tlnet
```

The `update --all` command in it can be modified as needed.

## MiKTeX

The MiKTeX distribution is characterized by installing only the packages that users need, saving disk space usage, but differs in some implementation details from TeX Live. This distribution supports Windows, Linux, and macOS.

### Installation

MiKTeX only provides standalone installation packages for Windows and macOS. Go to the TeX typesetting system download page. For installation on Linux, please refer to the [official documentation](https://miktex.org/howto/install-miktex-unx).

### Switch Mirror

The CTAN mirror source used by MiKTeX can be switched from the built-in MiKTeX Console graphical application, or you can use the following command:

```bash varcode
mpm --set-repository=${_http}://${_domain}/CTAN/systems/win32/miktex/tm/packages/
```

## References

1. [Tuna Mirror Usage Guide](https://mirrors.tuna.tsinghua.edu.cn/help/CTAN/)
