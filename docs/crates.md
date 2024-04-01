---
sidebar_label: crates.io
title: crates.io 镜像使用帮助
---

## Cargo 使用方法

在 `$CARGO_HOME/config.toml` 中添加如下内容：

:::info CARGO_HOME 默认路径
- 在 Windows 上，`$CARGO_HOME` 默认为：`%USERPROFILE%\.cargo`，例如 C:\Users\test\\.cargo。  
- 在 *nix 系统 上，`$CARGO_HOME` 默认为：`$HOME/.cargo`，例如 /home/test/.cargo。
:::

```toml varcode
[x] (sparse) 是否使用稀疏索引 (cargo >= 1.68)
---
const registry = sparse ? `sparse+${_http}://${_domain}/crates.io-index/` : `${_http}://${_domain}/git/crates.io-index`
---
[source.crates-io]
replace-with = 'hustmirror'

[source.hustmirror]
registry = "${registry}"
```


:::info 关于稀疏索引

cargo 1.68 版本开始支持稀疏索引：不再需要完整克隆 crates.io-index 仓库，可以加快获取包的速度。

如果您的 cargo 版本小于 1.68，可以通过 cargo +nightly -Z sparse-registry update 使用稀疏索引。

:::
