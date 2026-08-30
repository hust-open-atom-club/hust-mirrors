# cgit configuration sample

The cgit post-build plugin generates the head, header, and footer fragments used
by the production cgit deployment. A minimal corresponding cgit configuration
looks like this:

```ini
virtual-root=/git

head-include=<HEAD_FILE_FS_PATH>
header=<HEADER_FILE_FS_PATH>
footer=<FOOTER_FILE_FS_PATH>

snapshots=tar.gz zip

enable-blame=1
max-stats=week

source-filter=/usr/lib/cgit/filters/syntax-highlighting.sh
```
