---
title: Mirror Changes Notice - 2026.08.28
authors: paulkm
---

Dear mirror users,

Due to recent poor connectivity between the mirror servers and GitHub, as well as the high CPU consumption caused by the `cgit` service, we have made the following adjustments to better meet user demands and optimize resource allocation:

1. Sync Source Adjustments:

   Starting from August 28, 2026, package releases under `github-releases` will be pulled via a Cloudflare reverse proxy mirror. For the vast majority of users, this change will not cause any noticeable impact. However, due to upstream synchronization policies, there is a cache duration for Release files, which may introduce a delay of several hours in syncing.

2. Removed Mirrors:
   - Removed synchronization for `llvm-project.git`. This path has been redirected to upstream GitHub.
   - Removed synchronization for `metasploit-framework.git`. This path has been redirected to upstream GitHub.

3. Added Mirrors:
   - Added synchronization for [`github-release/hust-open-atom-club/oh-dsh`](https://mirrors.hust.edu.cn/github-release/hust-open-atom-club/oh-dsh/LatestRelease/). [Oh-DSH](https://dsh.openatom.club) is a DeepSeek Harness desktop distribution built and maintained by the HUST OpenAtom Club, featuring a rich set of built-in plugins, out-of-the-box readiness, and continuous updates. Everyone is welcome to use it, provide feedback, and submit Issues or Pull Requests to the [GitHub](https://github.com/hust-open-atom-club/oh-dsh) repository.

We will continue to monitor the stability of our mirror services to provide a higher quality user experience. Thank you for your continued support and understanding.