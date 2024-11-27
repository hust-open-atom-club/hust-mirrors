---
sidebar_label: PyPI
title: Python 软件包索引仓库使用帮助
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

```bash varcode
pip config set global.index-url https://${_domain}/pypi/web/simple
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

使用 `pdm config` 命令设置软件镜像：
```bash varcode
pdm config pypi.url https://${_domain}/pypi/web/simple
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

## 切换回默认镜像

如果希望使用官方默认镜像，请将以上命令中的镜像地址改为 `https://pypi.org/simple`，使用同样的方式进行配置即可。
