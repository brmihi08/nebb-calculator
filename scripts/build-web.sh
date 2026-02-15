#!/usr/bin/env bash
set -euo pipefail

# Repeatable Expo web export.
# Outputs a static site into ./dist (gitignored by repo-level .gitignore).

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

# Ensure dependencies are installed.
if [ ! -d node_modules ]; then
  echo "node_modules/ not found. Run 'npm install' first." >&2
  exit 1
fi

# Build web export.
# Note: Expo SDK 49 uses 'expo export' for static exports.
# --platform web limits output to web only.
# --output-dir dist forces consistent output location.

npx expo export --platform web --output-dir dist

echo "\nWeb export complete: $ROOT_DIR/dist"
