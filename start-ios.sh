#!/bin/bash
# Start Expo for iOS development (with watchman disabled to avoid file limit errors)
echo "Starting Expo for iOS/Android development..."
echo "Note: Hot reload is disabled to avoid file watcher issues."
echo "To reload, press 'r' in the terminal or shake your device."
echo ""
CI=true DISABLE_WATCHMAN=true npx expo start --ios
