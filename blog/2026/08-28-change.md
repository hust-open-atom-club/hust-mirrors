---
title: 镜像站变更通知-26.8.28
authors: paulkm
---

尊敬的镜像站用户：

由于镜像站服务器近期与 Github 连通性不佳，同时 cgit 服务占用大量 CPU 资源，为更好地满足用户需求并优化资源分配，我们对镜像站进行了一些调整。

1. 调整同步源：

    自2026年8月28日起，`github-releases` 下的软件包 Release 同步将通过 Cloudflare 反向代理站点拉取。对于绝大部分用户来说，这个操作不会带来任何影响。但受限于上游同步策略，Release 文件的同步存在一定的缓存时间，因此同步可能会出现数小时的延迟。

2. 删除镜像

      - 删除了 `llvm-project.git` 的同步，该路径已重定向至 Github 上游。
      - 删除了 `metasploit-framework.git` 的同步，该路径已重定向至 Github 上游。

3. 新增镜像

      - 新增了 [`github-release/hust-open-atom-club/oh-dsh`](https://mirrors.hust.edu.cn/github-release/hust-open-atom-club/oh-dsh/LatestRelease/) 的同步。[Oh-DSH](https://dsh.openatom.club) 是华中科技大学开放原子俱乐部构建并维护的 DeepSeek Harness 桌面发行版，具有丰富的内置插件、开箱即用、持续更新等特性，欢迎大家使用并反馈，也欢迎前往 [Github](https://github.com/hust-open-atom-club/oh-dsh) 仓库提交 Issue 或 Pull Request。

我们将持续关注镜像服务的稳定性，为您提供更高质量的使用体验。感谢大家一直以来的支持与理解。
