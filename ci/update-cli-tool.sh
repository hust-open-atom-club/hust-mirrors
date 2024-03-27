#!/bin/env bash
# Usage: update-cli-tool.sh <src_dir> <obj_dir>

set -e

src_dir="$1"
obj_dir="$2"

tag='origin/prod'

cd "$src_dir" || exit

git fetch --all
git checkout $tag
make
cp -f ./output/hustmirror-cli "$obj_dir"/get

