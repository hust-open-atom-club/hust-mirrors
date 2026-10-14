---
title: Mirror Site Disk Recovery
authors: paulkm
---

Dear mirror users,

Around September 2026, we began noticing frequent synchronization failures for some mirrors. Users also reported that some mirrored files were corrupted. Our investigation found that two drives in the mirror site's RAID 5 storage array had failed, resulting in unrecoverable errors. Upon discovering the problem, we immediately contacted the university's Network Center and visited the server room to investigate.

Because of how RAID 5 stripes data during writes, attempting to repair the existing filesystem with tools such as `fsck` would take at least as long as creating a new filesystem from scratch. Filesystem checks and recovery would also require taking the mirror server offline, potentially affecting many users. After discussing our options, we decided to back up the data while keeping the service available. We purchased an external storage device of the same capacity from our supplier and began copying files while the mirror site remained online.

After nearly two weeks of copying, all files that were not corrupted had been successfully transferred. We then migrated the mirror service to the new storage and took the old array offline to recreate its RAID configuration. The failed drives in the old array have now been replaced and the array rebuilt, so it can once again be used for mirror storage.

Since operations such as switching directories and adding storage devices required taking the server offline, the mirror site experienced several outages during the recovery process. We sincerely apologize for the disruption.

The most direct cause of this incident was the lack of a comprehensive monitoring system for the mirror site's operational status. We did not detect the drive failures and replace the affected drives promptly, and only discovered the problem after the RAID 5 array could no longer tolerate the failures. After completing the repairs, we promptly set up operational metrics collection and alerting to help prevent similar incidents in the future.

One positive outcome is that our planned storage expansion was completed much earlier than anticipated. The mirror site now has more than 220 TB of storage, with approximately 110 TB currently available for mirroring additional software packages. We will resume reviewing requests for new mirrors and welcome users to submit their requests.

Thank you for your patience and understanding during this maintenance work.
