---
title: Mirror Changes Notice - 2026.08.02
authors: paulkm
---

Dear mirror users,

Due to the impending exhaustion of disk space on the mirror servers, and to better meet user demands while optimizing resource allocation, we have made the following adjustments to the mirror site:

1. Sync Policy Adjustments:

   Starting from August 2, 2026, the HUST Open Source Mirror Site **will no longer guarantee synchronization for EOL (End of Life) versions of distributions**. This includes package repositories and installation images corresponding to those versions.

   Please note that the mirror site currently still retains some EOL files for certain distributions, but these files are very likely to be removed in future maintenance.

   Moving forward, the mirror site will only guarantee the synchronization of files that are **still within the distribution's official support lifecycle (including LTS and security update support periods)**.

   Currently, legacy version mirrors for the following distributions have been removed:
   - Removed sync for `alpine` EOL versions (`v3.0` - `v3.20`)
   - Removed sync for `openEuler` EOL versions (see [openEuler Official](https://www.openeuler.openatom.cn/en/other/lifecycle/))

2. Removed Mirrors:
   - Removed synchronization for `fdroid`. The `fdroid` repository occupied over 6TB of mirror disk space, but accumulated less than 200GB of traffic during the previous reporting period (January–June 2026). We have redirected requests under the `fdroid` path to the Tsinghua University TUNA mirror site.

We will continue to monitor the stability of our mirror services to provide a higher quality user experience. Thank you for your continued support and understanding.