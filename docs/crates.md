---
sidebar_label: crates.io
title: crates.io 镜像使用帮助
---

## Cargo 使用方法

在 `$CARGO_HOME/config.toml` 中添加如下内容：

:::info
`$CARGO_HOME` 在 Windows 系统默认为：`%USERPROFILE%\.cargo`，例如C:\Users\test\\.cargo。
在*nix系统默认为：`$HOME/.cargo`
:::

```toml varcode
[source.crates-io]
replace-with = 'hustmirror'

[source.hustmirror]
registry = "sparse+${_http}://${_domain}/crates.io-index/"
```

:::info

cargo 从 1.68 版本开始默认使用稀疏索引：不再需要完整克隆 crates.io-index 仓库，可以加快获取包的速度。

如果您的 cargo 版本小于 1.68，可以通过 cargo +nightly -Z sparse-registry update 使用稀疏索引，
或者去除 `source.hustmirror` `registry` 字段前的 `sparse+` 来关闭稀疏索引。

:::
