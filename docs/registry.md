---
sidebar_label: Registry
title: OCI 容器镜像仓库使用帮助
---

## 镜像简介

镜像站提供部分 OCI 容器镜像的镜像，可使用 Docker 等容器客户端直接 pull。请使用下表列出的完整拉取地址及标签。

## 镜像列表

以下列表由维护者手工更新，目前提供这两个镜像：

<!-- 新增或调整镜像时，请更新此表和下方的拉取命令，并同步更新英文文档。 -->

| 镜像 | 标签 | 拉取地址 |
| --- | --- | --- |
| Open Source Dashboard 前端 | `latest` | `mirrors.hust.edu.cn/hust-open-atom-club/open-source-dashboard/frontend:latest` |
| Open Source Dashboard 后端 | `latest` | `mirrors.hust.edu.cn/hust-open-atom-club/open-source-dashboard/backend:latest` |

`latest` 为可变标签，镜像内容可能随同步更新。

## 使用方法

使用以下命令直接拉取镜像：

```shell varcode
docker pull ${_domain}/hust-open-atom-club/open-source-dashboard/frontend:latest
docker pull ${_domain}/hust-open-atom-club/open-source-dashboard/backend:latest
```
