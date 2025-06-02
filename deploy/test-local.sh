#!/bin/bash

# Quick test deployment script for local testing

echo "🧪 Testing local deployment..."

# Configuration
PROJECT_DIR="/Users/jakubsmolik/Developer/gitrepos/portfolio-web"
TEST_DIR="/tmp/portfolio-test"

cd "$PROJECT_DIR"

echo "Building application..."
npm run export

echo "Creating test directory..."
rm -rf "$TEST_DIR"
mkdir -p "$TEST_DIR"

echo "Copying files..."
cp -r out/* "$TEST_DIR/"

echo "Starting local server..."
cd "$TEST_DIR"
python3 -m http.server 8080 &
SERVER_PID=$!

echo "✅ Test server started at http://localhost:8080"
echo "📁 Files served from: $TEST_DIR"
echo "🔍 File count: $(find $TEST_DIR -type f | wc -l)"
echo "📊 Total size: $(du -sh $TEST_DIR | cut -f1)"

echo ""
echo "Press any key to stop the server..."
read -n 1 -s

echo "Stopping server..."
kill $SERVER_PID 2>/dev/null

echo "Cleaning up..."
rm -rf "$TEST_DIR"

echo "✅ Test completed!"
