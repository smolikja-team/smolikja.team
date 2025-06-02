#!/bin/bash

# Deployment script for Next.js with PM2 and nginx reverse proxy

set -e

echo "🚀 Starting Node.js deployment process..."

# Configuration
PROJECT_DIR="/Users/jakubsmolik/Developer/gitrepos/portfolio-web"
APP_NAME="portfolio-web"
NGINX_CONF="/etc/nginx/sites-available/portfolio-proxy"

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

# Change to project directory
cd "$PROJECT_DIR"

echo_info "Installing dependencies..."
npm ci --production

echo_info "Building Next.js application..."
npm run build

# Install PM2 if not already installed
if ! command -v pm2 &> /dev/null; then
    echo_info "Installing PM2..."
    npm install -g pm2
fi

# Stop existing PM2 process if running
echo_info "Stopping existing PM2 process..."
pm2 stop "$APP_NAME" 2>/dev/null || true
pm2 delete "$APP_NAME" 2>/dev/null || true

# Start the application with PM2
echo_info "Starting application with PM2..."
pm2 start npm --name "$APP_NAME" -- start

# Save PM2 configuration
pm2 save

# Setup PM2 startup (run as root)
if [[ $EUID -eq 0 ]]; then
    pm2 startup
    echo_warn "Run the command displayed above to enable PM2 auto-startup"
else
    echo_warn "Run this script with sudo to enable PM2 auto-startup"
fi

# Copy nginx configuration (requires sudo)
if [[ $EUID -eq 0 ]]; then
    echo_info "Setting up nginx configuration..."
    cp "$PROJECT_DIR/deploy/nginx-proxy.conf" "$NGINX_CONF"
    
    # Enable the site
    if [ ! -L "/etc/nginx/sites-enabled/portfolio-proxy" ]; then
        ln -s "$NGINX_CONF" "/etc/nginx/sites-enabled/portfolio-proxy"
    fi
    
    # Test nginx configuration
    echo_info "Testing nginx configuration..."
    if nginx -t; then
        echo_info "Nginx configuration is valid"
        systemctl reload nginx
    else
        echo_error "Nginx configuration test failed"
        exit 1
    fi
else
    echo_warn "Run this script with sudo to configure nginx"
fi

echo_info "✅ Deployment completed successfully!"
echo_info "Your application is running on port 3000"
echo_info "PM2 process name: $APP_NAME"

# Show PM2 status
echo -e "\n📊 PM2 Status:"
pm2 status "$APP_NAME"

echo -e "\n📋 Useful commands:"
echo -e "   pm2 logs $APP_NAME     - View logs"
echo -e "   pm2 restart $APP_NAME  - Restart app"
echo -e "   pm2 stop $APP_NAME     - Stop app"
echo -e "   pm2 monitor            - Monitor all processes"
