#!/usr/bin/env bash
# Helper to find and optionally replace references to 'studio37' in this folder.
# NOTE: Review before running. This script is destructive and does in-place replacements.

set -euo pipefail

ROOT_DIR=$(dirname "$0")/..
cd "$ROOT_DIR"

echo "Scanning for references to 'studio37'..."
grep -RIn "studio37|Studio37" || true

read -p "Run replacements to rename 'Studio37' -> 'Lilly Combest' and 'studio37' -> 'lillycombest'? (y/N) " yn
if [[ "$yn" != "y" && "$yn" != "Y" ]]; then
  echo "Aborting replacements. No changes made."
  exit 0
fi

# Replace case-sensitive occurrences (make a backup of files with .bak)
find . -type f -not -path "./.git/*" -not -path "./node_modules/*" -name "*.*" -print0 | \
  xargs -0 sed -i.bak \
    -e 's/Studio37/Lilly Combest/g' \
    -e 's/studio37/lillycombest/g' \
    -e 's/studio37.cc/lillycombest.com/g' 

# Remove backup files produced by sed
find . -name "*.bak" -delete

echo "Replacement complete. Search again to verify:"
grep -RIn "studio37|Studio37" || echo "No matches found."
