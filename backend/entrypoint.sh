#!/bin/sh

# Install/update dependencies
echo "Syncing dependencies..."
npm install

# Run the seeder script
echo "Running data seeder..."
node seeder.js

# Then, execute the main command (npm run dev)
echo "Starting server..."
exec "$@"