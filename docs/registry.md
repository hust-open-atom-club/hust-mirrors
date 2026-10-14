---
sidebar_label: Registry
title: OCI 容器镜像仓库使用帮助
---

## 镜像简介

镜像站提供部分 OCI 容器镜像的镜像，可使用 Docker 等容器客户端直接 pull。请使用下表列出的拉取地址及标签。

## 镜像列表

以下列表由维护者手工更新，目前提供如下镜像：

<!-- 新增或调整镜像时，请更新此表和下方的拉取命令，并同步更新英文文档。 -->

| 镜像 | 版本 | Tag | 上游 |
| --- | --- | --- | --- |
| Open Source Dashboard 前端 | `latest` | `hust-open-atom-club/open-source-dashboard/frontend` | `ghcr.io/hust-open-atom-club/open-source-dashboard/frontend` |
| Open Source Dashboard 后端 | `latest` | `hust-open-atom-club/open-source-dashboard/backend` | `ghcr.io/hust-open-atom-club/open-source-dashboard/backend` |
| Open Source Deadlines | `latest` | `hust-open-atom-club/open-source-deadlines` | `ghcr.io/hust-open-atom-club/open-source-deadlines` |
| HUST Mirrors 前端 | `latest` | `hust-open-atom-club/hust-mirrors` | `ghcr.io/hust-open-atom-club/hust-mirrors` |
| Alpine | `3.24` | `alpine` | `docker.io/library/alpine` |
| Ubuntu | `26.04` | `ubuntu` | `docker.io/library/ubuntu` |
| Ubuntu | `24.04` | `ubuntu` | `docker.io/library/ubuntu` |
| Ubuntu | `22.04` | `ubuntu` | `docker.io/library/ubuntu` |
| Node.JS | `26-bookworm-slim` | `node` | `docker.io/library/node` |
| Node.JS | `24-bookworm-slim` | `node` | `docker.io/library/node` |
| Node.JS | `22-bookworm-slim` | `node` | `docker.io/library/node` |
| Bun | `slim` | `oven/bun` | `docker.io/oven/bun` |
| Golang | `latest` | `golang` | `docker.io/library/golang` |
| Rust | `slim` | `rust` | `docker.io/library/rust` |
| Python | `slim` | `python` | `docker.io/library/python` |
| Python | `3.15-slim` | `python` | `docker.io/library/python` |
| Python | `3.14-slim` | `python` | `docker.io/library/python` |
| Python | `3.13-slim` | `python` | `docker.io/library/python` |
| PostgreSQL | `18` | `postgres` | `docker.io/library/postgres` |
| PostgreSQL | `17` | `postgres` | `docker.io/library/postgres` |
| MongoDB | `9` | `mongo` | `docker.io/library/mongo` |
| MongoDB | `8` | `mongo` | `docker.io/library/mongo` |
| BusyBox | `latest` | `busybox` | `docker.io/library/busybox` |

:::warning 注意事项
镜像站只能保证上方表格中的标签版本能够被正常下载，无法保证任意时刻由 tag 推导的 hash 一定被同步。我们推荐使用 tag 的形式进行开发和构建。
:::

## 使用方法

使用以下命令直接拉取镜像：

```shell varcode
docker pull ${_domain}/...:...
```
