---
sidebar_label: crates.io
title: crates.io Mirror Usage Guide
type: lang
automated: true 
detection:
  policy: OneOf
  checks:
    - type: command
      command: cargo
---

:::info

Some content in this document may have been translated by AI.

:::

## Cargo Usage Method

Add the following content to `$CARGO_HOME/config.toml`:

:::info CARGO_HOME Default Path

- On Windows, `$CARGO_HOME` defaults to: `%USERPROFILE%\.cargo`, for example C:\Users\test\.cargo
- On *nix systems, `$CARGO_HOME` defaults to: `$HOME/.cargo`, for example /home/test/.cargo
:::

```toml varcode
[x] (sparse) Whether to use sparse index (cargo >= 1.68)
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

:::info About Sparse Index

Starting from cargo version 1.68, sparse index is supported: no longer need to fully clone the crates.io-index repository, which can speed up package fetching.

If your cargo version is less than 1.68, you can use sparse index with cargo +nightly -Z sparse-registry update.

:::
