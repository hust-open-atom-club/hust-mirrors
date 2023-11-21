#!/bin/env python3
# Usage: gen-releases.py <mirror_dir1> <mirror_dir2> ... <output_file>

from configparser import ConfigParser
from glob import glob
import re, sys, os, json

config = ConfigParser()

script_path = os.path.dirname(os.path.realpath(__file__))
config.read(script_path + "/releases.conf", encoding="utf-8")
mirror_dirs = sys.argv[1:-1]
output_file = sys.argv[-1]

result = []

for sec in config.sections():
    release_sec = config[sec]["name"] if "name" in config[sec] else sec
    exp = config[sec]["exp"]
    release_pos = int(config[sec]["release"]) if "release" in config[sec] else -1
    version_pos = int(config[sec]["version"]) if "version" in config[sec] else -1
    variant_pos = int(config[sec]["variant"]) if "variant" in config[sec] else -1
    take_count = int(config[sec]["take"]) if "take" in config[sec] else -1
    description = config[sec]["description"] if "description" in config[sec] else None

    print("Generating " + release_sec + " with " + exp, file=sys.stderr)

    # get all directories and files under mirror_dir
    # and filter out the ones that match the regex
    files = []
    for mirror_dir in mirror_dirs:
        files.extend(
            list(glob(config[sec]["path"], root_dir=mirror_dir, recursive=True))
        )

    if take_count != -1:
        # order files by date
        files.sort(key=os.path.getmtime, reverse=True)
        files = files[:take_count]

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
                "path": file,
                "description": description,
            }
            d = {k: v for k, v in d.items() if v is not None}
            result.append(d)
    with open(output_file, "w") as f:
        f.write(json.dumps(result))
