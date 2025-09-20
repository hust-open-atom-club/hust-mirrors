---
sidebar_label: crates.io
title: crates.io 镜像使用帮助
type: lang
automated: true 
detection:
  policy: OneOf
  checks:
    - type: command
      command: cargo
---

## Cargo 使用方法

在 `$CARGO_HOME/config.toml` 中添加如下内容：

:::info CARGO_HOME 默认路径
- 在 Windows 上，`$CARGO_HOME` 默认为：`%USERPROFILE%\.cargo`，例如 C:\Users\test\\.cargo
- 在 *nix 系统上，`$CARGO_HOME` 默认为：`$HOME/.cargo`，例如 /home/test/.cargo
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

```yaml cli-nodocs
type: Execute
required: false
privileged: false
provide_backup: true
interpreter: shell
exec: |
  mkdir -p "${HOME}/.cargo"

  if [ -f "${HOME}/.cargo/config.toml" ]; then
      confirm "You already have a config.toml file in your cargo home, do you want to continue?" || \
          return 1
      mv "${HOME}/.cargo/config.toml" "${_backup_dir}/cargo.bak"
  else
      touch "${_backup_dir}/cargo.bak"
  fi

  version=$(cargo --version 2>/dev/null | cut -f 2 -d " ")
  if [ -n "$version" ] && \
      [ $(echo "$version" | cut -f 1 -d ".") -ge 1 ] && \
      [ $(echo "$version" | cut -f 2 -d ".") -ge 68 ]; then
      _crates_mirror="sparse+${http}://${domain}/crates.io-index/"
  else
      _crates_mirror="${http}://${domain}/git/crates.io-index/"
  fi

  tee -a "${HOME}/.cargo/config.toml" > /dev/null << EOF
  # ${gen_tag}
  [source.crates-io]
  replace-with = 'hustmirror'

  [source.hustmirror]
  registry = "${_crates_mirror}"
  EOF
recover: |
  mv "${_backup_dir}/cargo.bak" "${HOME}/.cargo/config"
```

:::info 关于稀疏索引

cargo 1.68 版本开始支持稀疏索引：不再需要完整克隆 crates.io-index 仓库，可以加快获取包的速度。

如果您的 cargo 版本小于 1.68，可以通过 cargo +nightly -Z sparse-registry update 使用稀疏索引。

:::
