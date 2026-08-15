#!/usr/bin/env bash
# Builds the csci-134-builder and csci-270-builder projects and syncs
# their output into public/csci-134 and public/csci-270, so the main
# site's `npm run build` picks them up automatically.
#
# Run this after editing csci-134-builder/src/components/csci134.json
# or csci-270-builder/src/components/csci270.json (or any other
# source changes in those two projects).
set -euo pipefail

cd "$(dirname "$0")/.."

for course in csci-134 csci-270; do
  builder="${course}-builder"
  echo "--- building ${builder} ---"
  (cd "$builder" && npm install --silent && npx vite build)

  rm -rf "public/${course}"
  mkdir -p "public/${course}"
  cp -r "${builder}/dist/"* "public/${course}/"
  mkdir -p "public/${course}/images"
  cp "${builder}/images/"*.* "public/${course}/images/"
done

echo "Done. Run npm run build to include these in dist/."
