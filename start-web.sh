#!/bin/bash
# Kill any existing processes
pkill -f "Metro Bundler" 2>/dev/null
pkill -f "expo start" 2>/dev/null

# Start webpack only (not metro)
cd "$(dirname "$0")"
EXPO_USE_METRO=0 npx webpack serve --config ./node_modules/@expo/webpack-config --mode development --port 8080
