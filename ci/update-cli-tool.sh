#!/bin/env bash
# Usage: update-cli-tool.sh <src_dir> <obj_dir>

set -e

src_dir="$1"
obj_dir="$2"

tag='origin/prod'

cd "$src_dir" || exit

last_commit=$(git rev-parse $tag) || last_commit=""
git pull origin --force prod
current_commit=$(git rev-parse $tag)

if [[ "$last_commit" != "$current_commit" ]]; then
  git checkout $tag
  make
  cp -f ./output/hustmirror-cli "$obj_dir"/get
fi

