set -e

echo ">>> Syncing dependencies..."
npm install --legacy-peer-deps

echo ">>> Starting server..."
exec "$@"