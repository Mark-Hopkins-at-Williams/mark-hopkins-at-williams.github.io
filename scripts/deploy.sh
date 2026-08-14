#!/usr/bin/env bash
# Builds the site and rsyncs it to the Ubuntu server's per-user www directory.
#
# Usage:
#   ./scripts/deploy.sh
#
# Override the target without editing this file:
#   REMOTE_HOST=other.host.edu REMOTE_USER=someone ./scripts/deploy.sh
#
# Note: rsync --delete makes the remote www/ exactly match the local dist/
# build, removing anything on the server not produced by this build.
set -euo pipefail

REMOTE_USER="${REMOTE_USER:-hopkins}"
REMOTE_HOST="${REMOTE_HOST:-jersey.cs.williams.edu}"
REMOTE_PATH="${REMOTE_PATH:-www}"

cd "$(dirname "$0")/.."

npm run build

rsync -avz --delete dist/ "${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_PATH}/"

echo "Deployed to ${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_PATH}/"
