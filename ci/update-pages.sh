#!/bin/env bash
# Usage: update-pages.sh <src_dir> <obj_dir>

set -e

src_dir="$1"
obj_dir="$2"

cd "$src_dir" || exit

last_commit=$(git rev-parse prod) || last_commit=""
git pull origin --force prod
current_commit=$(git rev-parse prod)

if [[ "$last_commit" != "$current_commit" ]]; then
  git checkout prod
  yarn && yarn build
  cp -rf ./build/* "$obj_dir"
fi
