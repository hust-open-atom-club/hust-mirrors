#!/bin/env bash
# Usage: update-pages.sh <src_dir> <obj_dir>

set -e

src_dir="$1"
obj_dir="$2"

tag='origin/prod'

cd "$src_dir" || exit

last_commit=$(git rev-parse $tag) || last_commit=""
git pull origin --force $tag
current_commit=$(git rev-parse $tag)

if [[ "$last_commit" != "$current_commit" ]]; then
  git checkout $tag
  yarn && yarn build
  cp -rf ./build/* "$obj_dir"
fi
