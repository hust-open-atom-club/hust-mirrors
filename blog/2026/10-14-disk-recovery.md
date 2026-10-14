---
title: 镜像站磁盘恢复
authors: paulkm
---

尊敬的镜像站用户：

2026 年 9 月左右，我们开始注意到镜像站存在部分镜像经常性同步失败。经过排查，我们发现根因是镜像站磁盘存储的 RAID6 阵列损坏了两块磁盘，导致开始出现不可恢复错误。

首页已新增 `registry` 入口，点击即可查看[使用帮助与镜像列表](/docs/registry)。

<!-- truncate -->

## 已收录的镜像

目前，镜像站提供以下项目的部分镜像和标签：

- 俱乐部项目：Open Source Dashboard 前端与后端、Open Source Deadlines、HUST Mirrors 前端。
- Linux 基础镜像：Alpine、Ubuntu、BusyBox。
- 开发环境：Node.js、Bun、Go、Rust、Python。
- 数据库：PostgreSQL、MongoDB。

具体的镜像名称、标签和上游地址请参阅 [Registry 文档](/docs/registry)。镜像列表由维护者手工更新，后续新增或调整会同步记录在文档中。

## 使用方法

使用文档中列出的镜像名称和标签，将仓库地址替换为 `mirrors.hust.edu.cn` 即可直接拉取。例如：

```bash
docker pull mirrors.hust.edu.cn/hust-open-atom-club/open-source-dashboard/frontend:latest
docker pull mirrors.hust.edu.cn/hust-open-atom-club/open-source-dashboard/backend:latest
docker pull mirrors.hust.edu.cn/ubuntu:24.04
```

:::warning 同步范围

OCI 容器镜像同步服务目前处于测试阶段，可能出现不稳定的情况。

本服务仅同步镜像列表中列出的镜像和标签，未收录的镜像或标签不保证可用。镜像站也不保证任意时刻由标签解析出的摘要（digest）都已完成同步，建议使用文档列出的标签进行拉取、开发和构建。

:::

欢迎大家使用并反馈问题。如果您需要的镜像尚未收录，可通过首页的新增镜像入口提交需求，我们会根据实际使用需求和服务器资源进行评估。
