#!/usr/bin/env bash
#
# Restores the private internal/ docs repo into this working tree.
#
# The public repo gitignores internal/ — it is its own private companion repo
# (nodrel-dev/n8n-fedex-node-internal) holding the captured FedEx specs, build
# brief, doc map, ADRs, and planning. Run this once after a fresh clone.
#
# Usage:
#   ./bootstrap-internal.sh                 # uses the default SSH remote below
#   ./bootstrap-internal.sh <git-remote>    # override (e.g. an HTTPS URL)
set -euo pipefail

REMOTE="${1:-git@github.com:nodrel-dev/n8n-fedex-node-internal.git}"
DIR="internal"

if [ -e "$DIR/.git" ]; then
  echo "internal/ is already a git repo — pulling latest instead."
  git -C "$DIR" pull --ff-only
  exit 0
fi

if [ -e "$DIR" ] && [ -n "$(ls -A "$DIR" 2>/dev/null)" ]; then
  echo "ERROR: ./$DIR exists and is non-empty but is not a git repo." >&2
  echo "Move or remove it first, then re-run." >&2
  exit 1
fi

git clone "$REMOTE" "$DIR"
echo "✓ Restored internal/ from $REMOTE"
