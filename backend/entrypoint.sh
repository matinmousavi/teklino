#!/bin/sh
set -e

echo ">>> Syncing dependencies..."
npm install --legacy-peer-deps

echo ">>> Running data seeder..."
node seeder.js

echo ">>> Starting server..."
exec "$@"