#!/bin/env bash
# Usage: update-cli-tool.sh <src_dir> <obj_dir>

set -e

src_dir="$1"
obj_dir="$2"

cd "$src_dir" || exit

last_commit=$(git rev-parse stable)
git pull origin --tags --force stable
current_commit=$(git rev-parse stable)

if [[ "$last_commit" != "$current_commit" ]]; then
  make
  cp ./output/hust-mirror.sh "$obj_dir"/get
fi

