# Hust Mirror CI/CD

## Crontab configuration
Use `crontab -e` to configure crontab.  
```
0 4 * * * PATH=/path/to/nodejs-bin:$PATH /path/to/ci/update-pages.sh /path/to/mirror-src /path/to/mirror-srv-dir
*/30 * * * * /path/to/ci/gen-releases.py /path/to/mirror-data path/to/mirror-srv-dir/releases.json
0 4 * * * path/to/ci/update-cli-tool.sh /path/to/mirror-cli-src /path/to/mirror-srv-dir/get
```

### Substitution   
Replace all path begin with /path/to to real absolute path.  

