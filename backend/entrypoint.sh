#!/bin/sh

# Run the seeder script first
echo "Running data seeder..."
node seeder.js

# Then, execute the main command (npm run dev)
echo "Starting server..."
exec "$@"