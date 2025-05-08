#!/bin/bash

# Use the SSH alias defined in ~/.ssh/config for the server.
SSH_HOST="lucinka"

# The target directory on your server where the web files will be placed.
SERVER_TARGET_PATH="/var/www/portfolio-web"

# Local path to the Flutter web build output relative to the script location
LOCAL_BUILD_PATH="./build/web"

# --- Deployment Steps ---

echo "--- Starting Flutter Web Deployment ---"

# 1. Build the Flutter web application locally
echo "Building Flutter web application locally (release mode)..."
flutter build web --release

# Check if the build command was successful
if [ $? -ne 0 ]; then
    echo "Error: Flutter build failed. Aborting deployment."
    exit 1
fi

# Check if the local build output directory exists after build
if [ ! -d "$LOCAL_BUILD_PATH" ]; then
    echo "Error: Local build output directory '$LOCAL_BUILD_PATH' not found after build. Aborting deployment."
    exit 1
fi

echo "Flutter build successful."

# 2. Synchronize built files with the server directory using rsync
# Use the SSH alias. User is defined in ~/.ssh/config for this alias.
echo "Synchronizing build files from '$LOCAL_BUILD_PATH' to '$SSH_HOST:$SERVER_TARGET_PATH'..." # <-- Popis příkazu

# Ensure the target directory exists on the server before syncing
# Use the SSH alias directly as the host
ssh "$SSH_HOST" "mkdir -p $SERVER_TARGET_PATH" # <-- POUŽIJ ALIAS

# Use rsync to copy files.
# Use the SSH alias as the host in the destination.
rsync -avz --delete "$LOCAL_BUILD_PATH/" "$SSH_HOST:$SERVER_TARGET_PATH/" # <-- POUŽIJ ALIAS

# Check if the rsync command was successful
if [ $? -ne 0 ]; then
    echo "Error: rsync synchronization failed. Deployment may be incomplete or failed."
    echo "Run on server: sudo chown -R USERNAME:USERNAME $SERVER_TARGET_PATH/"
    echo "Then try again."
    exit 1
fi

echo "Rsync synchronization successful."

# --- Post-Deployment (Optional) ---
# If using optional post-deployment commands, they also use the alias
# echo "Setting correct permissions on server..."
# ssh "$SSH_HOST" "sudo chown -R www-data:www-data $SERVER_TARGET_PATH" # Change owner to Nginx user
# ssh "$SSH_HOST" "sudo find $SERVER_TARGET_PATH -type d -exec chmod 755 {} \;" # Directories need execute for access
# ssh "$SSH_HOST" "sudo find $SERVER_TARGET_PATH -type f -exec chmod 644 {} \;" # Files need read

echo "--- Deployment Finished ---"
echo "Your new build should now be live at $SERVER_TARGET_PATH on $SSH_HOST (via SSH alias)."
echo "Run on server: sudo chown -R www-data:www-data $SERVER_TARGET_PATH/"