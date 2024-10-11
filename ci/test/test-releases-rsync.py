#!/bin/env python3
# Usage:
#     test-releases-rsync.py --section <section> --rsync <rsync_url> [--prefix <prefix>] [--strip <strip>] [--follow-link]
# Example:
#     python3 ./test-releases-rsync.py --section msys2 --rsync rsync://mirrors.tuna.tsinghua.edu.cn/msys2 --prefix msys2/

import argparse
import fnmatch
import os
import re
import time
from configparser import ConfigParser
from subprocess import PIPE, Popen, DEVNULL

config = ConfigParser()

script_path = os.path.dirname(os.path.realpath(__file__))
config.read(script_path + "/../releases.conf", encoding="utf-8")

parser = argparse.ArgumentParser()
parser.add_argument("--section", required=True)
parser.add_argument("--rsync", required=True)
parser.add_argument("--prefix", default="")
parser.add_argument("--strip", type=int, default=0)
parser.add_argument(
    "--follow-link", action=argparse.BooleanOptionalAction, default=True
)


args = parser.parse_args()
sec = args.section
rsync_url = args.rsync
prefix = args.prefix
strip = args.strip
follow_link = args.follow_link


release_sec = config[sec]["name"] if "name" in config[sec] else sec
exp = config[sec]["exp"]
release_pos = int(config[sec]["release"]) if "release" in config[sec] else -1
version_pos = int(config[sec]["version"]) if "version" in config[sec] else -1
variant_pos = int(config[sec]["variant"]) if "variant" in config[sec] else -1
take_count = int(config[sec]["take"]) if "take" in config[sec] else -1
description = config[sec]["description"] if "description" in config[sec] else None
glob_pattern = config[sec]["path"]


def get_files():
    args = ["rsync", "--no-motd", "--list-only", "--recursive", rsync_url]
    if follow_link:
        args.insert(1, "--copy-links")
    p = Popen(args, stdout=PIPE, stderr=DEVNULL)
    if p.stdout is None:
        return
    while p.poll() is None:
        line = p.stdout.readline().decode("utf-8").strip()
        parts = re.split(r"\s+", line)
        if len(parts) < 5:
            continue
        path = prefix + "/".join(parts[4].split("/")[strip:])
        yield {
            "mode": parts[0],
            "size": parts[1],
            "time": time.strptime(parts[2] + " " + parts[3], "%Y/%m/%d %H:%M:%S"),
            "path": path,
        }


def filter_files_in_glob(files):
    for file in files:
        if fnmatch.fnmatch(file["path"], glob_pattern):
            yield file


count = 0
for f in filter_files_in_glob(get_files()):
    file = f["path"]
    release = release_sec
    version = ""
    variant = ""
    matches = re.match(exp, file)
    if matches:
        release = matches.group(release_pos) if release_pos != -1 else release_sec
        version = matches.group(version_pos) if version_pos != -1 else "<none>"
        variant = matches.group(variant_pos) if variant_pos != -1 else "<none>"
        print("{:10}\t{:10}\t{:25}\t{}".format(release, version, variant, file))
