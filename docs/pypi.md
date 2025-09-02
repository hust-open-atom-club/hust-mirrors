---
sidebar_label: PyPI
title: Python 软件包索引仓库使用帮助
type: lang
automated: true 
detection:
  policy: OneOf
  checks:
    - type: command
      command: pip
    - type: command
      command: pdm
    - type: command
      command: uv
---

## PyPI 介绍

PyPI (The Python Package Index) 是 Python 编程语言的软件存储仓库。其托管在 [https://pypi.org/](https://pypi.org/) 上。

## 切换 pip 软件镜像

:::caution
pip 工具默认配置下仅支持 https，请不要使用 http。
:::

:::info 关于externally-managed-environment 错误
Python 3.11 中实现了 PEP 668，允许 Python 软件包指定默认情况下是否可以在全局解释器上下文中安装包。
如果遇到该问题，可以尝试使用 venv 创建虚拟环境，或者使用其他基于虚拟环境的的包管理器。
:::

### 临时使用

```bash varcode
pip install -i https://${_domain}/pypi/web/simple <some-package>
```

### 设为默认

```yaml cli
type: TestAndExecute
required: false
privileged: false
interpreter: shell
test: |
  has_command pip
exec: |
  pip config get global.index-url 2>/dev/null > ${_backup_dir}/pip.bak
  #{USE_IN_DOCS/}
  pip config set global.index-url "https://${_domain}/pypi/web/simple/"
  #{/USE_IN_DOCS}
recover: |
  last_url=$(cat "${_backup_dir}/pip.bak")
  pip config set global.index-url "$last_url"
```

:::caution
请升级 pip 到 10 以上版本后进行配置。
:::

如果 pip 版本较低，可以使用下面的命令升级 pip
```bash varcode
python -m pip install -i https://${_domain}/pypi/web/simple --upgrade pip
```

## 切换 PDM 软件镜像

PDM 支持使用 `pdm config` 命令或环境变量来设置软件镜像。如果长期使用，建议通过 `pdm config` 进行配置。

```yaml cli
type: TestAndExecute
required: false
privileged: false
provide_backup: true
interpreter: shell
test: |
  has_command pdm
exec: |
  pdm config pypi.url 2>/dev/null > ${_backup_dir}/pdm.bak
  #{USE_IN_DOCS/}
  pdm config global.index-url https://${_domain}/pypi/web/simple/
  #{/USE_IN_DOCS}
recover: |
  last_url=$(cat "${_backup_dir}/pdm.bak")
  pdm config pypi.url "$last_url"
```

或使用环境变量设置 PDM 软件镜像：
```bash varcode
export PDM_PYPI_URL=https://${_domain}/pypi/web/simple
```

## 切换 Poetry 软件镜像

:::caution
Poetry 不支持配置全局镜像，只能为项目配置。
:::

Poetry 支持使用 `poetry source` 命令或修改 `pyproject.toml` 来设置当前项目的软件镜像。

使用 `poetry source` 命令设置软件镜像：
```bash varcode
poetry source add --priority=primary mirrors https://${_domain}/pypi/web/simple
```

或修改 `pyproject.toml` 设置软件镜像，在 `pyproject.toml` 文件中添加如下内容：
```toml varcode
[[tool.poetry.source]]
name = "mirrors"
url = "https://${_domain}/pypi/web/simple"
priority = "primary"
```

## 切换 pipx 软件镜像

pipx 默认使用和 pip 相同的镜像，故设置软件镜像的方式与 pip 相同。

## 切换 uv 软件镜像

```yaml cli
type: TestAndExecute
required: false
privileged: true
provide_backup: true
interpreter: shell
test: |
  has_command uv
exec: |
  mkdir -p /etc/uv
  if [ ! -f /etc/uv/uv.toml ]; then
    touch /etc/uv/uv.toml
  else
    cp /etc/uv/uv.toml ${_backup_dir}/uv.bak
  fi
  #{USE_IN_DOCS/}
  tee -a /etc/uv/uv.toml > /dev/null << EOF 
  [[index]]
  url = "https://${_domain}"
  default = true
  EOF
  #{/USE_IN_DOCS}
recover: |
  set_sudo
  $sudo rm /etc/uv/uv.toml
  $sudo cp ${_backup_dir}/uv.bak /etc/uv/uv.toml
```

## 切换回默认镜像

如果希望使用官方默认镜像，请将以上命令中的镜像地址改为 `https://pypi.org/simple`，使用同样的方式进行配置即可。