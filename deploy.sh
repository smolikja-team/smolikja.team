#!/bin/bash

# Use the SSH alias defined in ~/.ssh/config for the server.
SSH_HOST="lucinka"

# The target directory on your server where the web files will be placed.
SERVER_TARGET_PATH="/var/www/portfolio-web"

# Local path to the build output relative to the script location
LOCAL_BUILD_PATH="./dist"

# Deployment type (default or specified by first argument)
DEPLOY_TYPE=${1:-"default"}

# --- Deployment Steps ---

echo "--- Starting Web Deployment (${DEPLOY_TYPE}) ---"

# 1. Build the web application locally
echo "Building web application for production..."
npm run build

# Check if the build command was successful
if [ $? -ne 0 ]; then
    echo "Error: Build failed. Aborting deployment."
    exit 1
fi

# Check if the local build output directory exists after build
if [ ! -d "$LOCAL_BUILD_PATH" ]; then
    echo "Error: Local build output directory '$LOCAL_BUILD_PATH' not found after build. Aborting deployment."
    exit 1
fi

echo "Build successful."

# Deploy based on deployment type
case "$DEPLOY_TYPE" in
    "github")
        echo "Deploying to GitHub Pages..."
        # Add GitHub Pages deployment logic here
        # For example, using gh-pages package if installed:
        npm run gh-pages -d dist
        ;;
        
    "netlify")
        echo "Deploying to Netlify..."
        # Add Netlify CLI deployment logic here
        # For example, using Netlify CLI if installed:
        netlify deploy --prod --dir=dist
        ;;
        
    *)
        # Default deployment to SSH host
        echo "Deploying to server via SSH..."
        
        # Ensure the target directory exists on the server before syncing
        ssh "$SSH_HOST" "mkdir -p $SERVER_TARGET_PATH"
        
        # Use rsync to copy files
        rsync -avz --delete "$LOCAL_BUILD_PATH/" "$SSH_HOST:$SERVER_TARGET_PATH/"
        
        # Check if the rsync command was successful
        if [ $? -ne 0 ]; then
            echo "Error: rsync synchronization failed. Deployment may be incomplete or failed."
            echo "Run on server: sudo chown -R USERNAME:USERNAME $SERVER_TARGET_PATH/"
            echo "Then try again."
            exit 1
        fi
        
        echo "Setting correct permissions on server..."
        ssh "$SSH_HOST" "sudo chown -R www-data:www-data $SERVER_TARGET_PATH && sudo find $SERVER_TARGET_PATH -type d -exec chmod 755 {} \; && sudo find $SERVER_TARGET_PATH -type f -exec chmod 644 {} \;"
        ;;
esac

echo "--- Deployment Finished ---"
echo "Your new build should now be live!"