#!/bin/env bash
# Usage: update-pages.sh <src_dir> <obj_dir> <mirror_dir>

set -e

src_dir="$1"
obj_dir="$2"
mirror_dir="$3"

cd "$src_dir" || exit

last_commit=$(git rev-parse stable)
git pull origin stable:stable
current_commit=$(git rev-parse stable)

if [[ "$last_commit" != "$current_commit" ]]; then
  make
  cp ./build/* "$obj_dir"
fi

${src_dir}/ci/gen-releases.py "${mirror_dir}" "${obj_dir}/releases.json"
