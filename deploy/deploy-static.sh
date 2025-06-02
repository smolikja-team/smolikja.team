#!/bin/bash

# Static deployment script for Next.js with nginx

set -e

echo "🚀 Starting deployment process..."

# Configuration
PROJECT_DIR="/Users/jakubsmolik/Developer/gitrepos/portfolio-web"
NGINX_ROOT="/var/www/portfolio"
NGINX_CONF="/etc/nginx/sites-available/portfolio"
BACKUP_DIR="/var/backups/portfolio-$(date +%Y%m%d-%H%M%S)"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

echo_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

echo_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if running as root or with sudo
if [[ $EUID -ne 0 ]]; then
   echo_error "This script must be run as root or with sudo"
   exit 1
fi

# Change to project directory
cd "$PROJECT_DIR"

echo_info "Building Next.js application..."
npm run export

# Create backup of existing deployment
if [ -d "$NGINX_ROOT" ]; then
    echo_info "Creating backup of existing deployment..."
    mkdir -p "$(dirname "$BACKUP_DIR")"
    cp -r "$NGINX_ROOT" "$BACKUP_DIR"
    echo_info "Backup created at: $BACKUP_DIR"
fi

# Create nginx root directory
echo_info "Creating nginx root directory..."
mkdir -p "$NGINX_ROOT"

# Copy static files
echo_info "Copying static files to nginx root..."
rsync -av --delete "$PROJECT_DIR/out/" "$NGINX_ROOT/"

# Set proper permissions
echo_info "Setting file permissions..."
chown -R www-data:www-data "$NGINX_ROOT"
find "$NGINX_ROOT" -type d -exec chmod 755 {} \;
find "$NGINX_ROOT" -type f -exec chmod 644 {} \;

# Copy nginx configuration
echo_info "Setting up nginx configuration..."
cp "$PROJECT_DIR/deploy/nginx-static.conf" "$NGINX_CONF"

# Enable the site
if [ ! -L "/etc/nginx/sites-enabled/portfolio" ]; then
    ln -s "$NGINX_CONF" "/etc/nginx/sites-enabled/portfolio"
fi

# Test nginx configuration
echo_info "Testing nginx configuration..."
if nginx -t; then
    echo_info "Nginx configuration is valid"
else
    echo_error "Nginx configuration test failed"
    exit 1
fi

# Reload nginx
echo_info "Reloading nginx..."
systemctl reload nginx

echo_info "✅ Deployment completed successfully!"
echo_info "Your portfolio is now available at your configured domain"
echo_info "Static files are located at: $NGINX_ROOT"
echo_info "Nginx config is at: $NGINX_CONF"

# Optional: Show deployment info
echo -e "\n📊 Deployment Summary:"
echo -e "   📁 Static files: $(du -sh $NGINX_ROOT | cut -f1)"
echo -e "   🔗 Files count: $(find $NGINX_ROOT -type f | wc -l)"
echo -e "   ⏰ Deployed at: $(date)"
