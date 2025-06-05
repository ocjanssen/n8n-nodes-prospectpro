#!/bin/bash

echo "🔨 Building custom node..."
npm install
npm run build

# Check if container is already running
if [ "$(docker-compose ps -q n8n)" ]; then
    echo "🔄 Updating running n8n container..."
    docker-compose restart
else
    echo "🚀 Starting n8n with ProspectPro node..."
    docker-compose up
fi

