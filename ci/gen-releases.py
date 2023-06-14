#!/bin/env python3
# Usage: gen-releases.py <mirror_dir> <output_file>

from configparser import ConfigParser
from glob import glob
import re, sys, os, json

config = ConfigParser()

script_path = os.path.dirname(os.path.realpath(__file__))
config.read(script_path + '/releases.conf',encoding="utf-8")
mirror_dir = sys.argv[1]
output_file = sys.argv[2]

result = []

for sec in config.sections():
    release_sec = config[sec]["name"] if config[sec]["name"] else sec
    exp = config[sec]["exp"]
    release_pos = int(config[sec]["release"])
    version_pos = int(config[sec]["version"])
    variant_pos = int(config[sec]["variant"])
    # get all directories and files under mirror_dir
    # and filter out the ones that match the regex
    files = list(glob(config[sec]["path"], root_dir=mirror_dir, recursive=True))
    for file in files:
        release = release_sec
        version = ""
        variant = ""
        matches = re.match(exp, file)
        if matches:
            release = matches.group(release_pos) if release_pos != -1 else release_sec
            version = matches.group(version_pos) if version_pos != -1 else None
            variant = matches.group(variant_pos) if variant_pos != -1 else None
            d = {
                "release": release,
                "version": version,
                "variant": variant,
                "path": file
            }
            d = {k: v for k, v in d.items() if v is not None}
            result.append(d) 
    with open(output_file, 'w') as f:
        f.write(json.dumps(result))
