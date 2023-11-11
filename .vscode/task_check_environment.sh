#!/bin/bash

WORKSPACE_FOLDER=$1

# Install node_modules if not found
if [ ! -d "$WORKSPACE_FOLDER/node_modules" ]; then
    echo "Node modules not found, installing dependencies..."
    npm install
fi

# Start development server depening of local configuration
echo "starting development server..."
if [ -f /etc/nginx/sites-available/zentala.local ]; then
    echo "Using configuration for zentala.local domain."
    npm run dev
else
    npm run start
fi
