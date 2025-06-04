# 🚀 Next.js On-Premises Deployment Guide

This guide provides complete instructions for deploying your Next.js portfolio application on-premises using nginx.

## 📋 Prerequisites

- Linux server with nginx installed
- Node.js 18+ (for reverse proxy option)
- sudo/root access
- Domain name (optional but recommended)

## 🎯 Deployment Options

### Option 1: Static Export (Recommended)
- ✅ Fastest performance
- ✅ Lowest resource usage
- ✅ No Node.js required on server
- ✅ Better security (no server-side code)
- ❌ No API routes or server-side features

### Option 2: Reverse Proxy
- ✅ Full Next.js features (API routes, SSR)
- ✅ Dynamic functionality
- ❌ Requires Node.js on server
- ❌ Higher resource usage

## 🔧 Option 1: Static Deployment (Recommended)

### Step 1: Prepare Your Application
```bash
# Build and export static files
npm run export

# Files will be generated in the 'out' directory
ls -la out/
```

### Step 2: Server Setup
```bash
# Install nginx (Ubuntu/Debian)
sudo apt update
sudo apt install nginx

# Or for CentOS/RHEL
sudo yum install nginx
# sudo systemctl enable nginx
```

### Step 3: Deploy Static Files
```bash
# Copy deployment script to your server
scp deploy/deploy-static.sh user@your-server:/tmp/

# Run deployment script on server
sudo /tmp/deploy-static.sh
```

### Step 4: Manual Deployment (Alternative)
```bash
# On your server:
sudo mkdir -p /var/www/portfolio

# Copy static files from your local machine
rsync -av out/ user@your-server:/tmp/portfolio-files/

# On server: Move files and set permissions
sudo rsync -av /tmp/portfolio-files/ /var/www/portfolio/
sudo chown -R www-data:www-data /var/www/portfolio
sudo chmod -R 755 /var/www/portfolio

# Copy nginx configuration
sudo cp deploy/nginx-static.conf /etc/nginx/sites-available/portfolio
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/

# Test and reload nginx
sudo nginx -t
sudo systemctl reload nginx
```

## 🔧 Option 2: Reverse Proxy Deployment

### Step 1: Server Setup
```bash
# Install Node.js and nginx
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs nginx

# Install PM2 globally
sudo npm install -g pm2
```

### Step 2: Deploy Application
```bash
# Copy your project to server
rsync -av --exclude node_modules --exclude .next --exclude out . user@your-server:/opt/portfolio-web/

# Run deployment script
sudo /opt/portfolio-web/deploy/deploy-proxy.sh
```

## 🔒 SSL/HTTPS Setup

### Using Let's Encrypt (Recommended)
```bash
# Install certbot
sudo apt install certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Auto-renewal is usually set up automatically
sudo certbot renew --dry-run
```

### Using Custom Certificate
1. Uncomment the HTTPS server block in your nginx config
2. Update paths to your certificate files
3. Restart nginx

## 🔍 Monitoring and Maintenance

### For Static Deployment
```bash
# Check nginx status
sudo systemctl status nginx

# View nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# Reload nginx configuration
sudo nginx -t && sudo systemctl reload nginx
```

### For Reverse Proxy Deployment
```bash
# Check PM2 status
pm2 status
pm2 logs portfolio-web

# Restart application
pm2 restart portfolio-web

# Check nginx proxy
sudo systemctl status nginx
```

## 🚀 Updating Your Application

### For Static Deployment
```bash
# On your local machine:
npm run export

# Copy new files to server
rsync -av --delete out/ user@your-server:/var/www/portfolio/

# Or use the deployment script
sudo ./deploy/deploy-static.sh
```

### For Reverse Proxy Deployment
```bash
# On your server:
cd /opt/portfolio-web
git pull origin main  # or copy new files
npm ci --production
npm run build
pm2 restart portfolio-web
```

## 🔧 Configuration Files

All nginx configurations are in the `deploy/` directory:
- `nginx-static.conf` - Static file serving
- `nginx-proxy.conf` - Reverse proxy setup
- `deploy-static.sh` - Automated static deployment
- `deploy-proxy.sh` - Automated proxy deployment
- `portfolio-web.service` - SystemD service file

## 🛠 Troubleshooting

### Common Issues

1. **Permission Denied**
   ```bash
   sudo chown -R www-data:www-data /var/www/portfolio
   sudo chmod -R 755 /var/www/portfolio
   ```

2. **Nginx Configuration Test Failed**
   ```bash
   sudo nginx -t
   # Check the error message and fix configuration
   ```

3. **Application Not Starting (Proxy Mode)**
   ```bash
   pm2 logs portfolio-web
   # Check for Node.js errors
   ```

4. **502 Bad Gateway (Proxy Mode)**
   ```bash
   # Check if Node.js app is running
   pm2 status
   
   # Check nginx proxy configuration
   sudo nginx -t
   ```

### Performance Optimization

1. **Enable Gzip** (already configured in nginx configs)
2. **Set up Cloudflare** for additional CDN and security
3. **Monitor with tools like htop, iotop**
4. **Set up log rotation**

### Security Best Practices

1. **Firewall Configuration**
   ```bash
   sudo ufw allow 22    # SSH
   sudo ufw allow 80    # HTTP
   sudo ufw allow 443   # HTTPS
   sudo ufw enable
   ```

2. **Regular Updates**
   ```bash
   sudo apt update && sudo apt upgrade
   ```

3. **Fail2ban** for SSH protection
   ```bash
   sudo apt install fail2ban
   ```

## 📊 Performance Metrics

After deployment, your static site should achieve:
- **Load time**: < 1 second
- **Lighthouse score**: 95+ across all metrics
- **CDN**: Can be easily integrated with Cloudflare
- **Bandwidth**: Minimal due to static optimization

## 🆘 Support

If you encounter issues:
1. Check nginx error logs: `sudo tail -f /var/log/nginx/error.log`
2. Check application logs: `pm2 logs` (for proxy mode)
3. Verify file permissions and ownership
4. Test nginx configuration: `sudo nginx -t`

Your portfolio is now ready for production deployment! 🎉
