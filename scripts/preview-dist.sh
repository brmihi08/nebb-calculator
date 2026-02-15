#!/usr/bin/env bash
set -euo pipefail

# Simple local static preview of ./dist

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

if [ ! -d dist ]; then
  echo "dist/ not found. Run 'npm run build:web' first." >&2
  exit 1
fi

# http-server is installed as a devDependency.
# -c-1 disables caching to make refreshes reliable.

npx http-server dist -p 4173 -c-1
