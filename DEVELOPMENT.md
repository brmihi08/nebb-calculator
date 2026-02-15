# NEBB Calculator - Development Guide

## Quick Start

### Running on Different Platforms

#### **iOS Development**
```bash
npm run ios
```
- Opens the app in iOS Simulator
- Metro bundler runs without file watching (to avoid EMFILE errors)
- To reload: Press `r` in terminal or shake the device

#### **Android Development**
```bash
npm run android
```
- Opens the app in Android Emulator
- Same Metro configuration as iOS

#### **Web Development**
```bash
npm run web
```
- Opens at http://localhost:8080
- Uses Webpack instead of Metro
- Hot reloading enabled

#### **All Platforms (Choose from Menu)**
```bash
npm start
```
- Shows QR code and menu
- Press `i` for iOS, `a` for Android, `w` for web

---

## Important Notes

### File Watcher Issue Fix

This project had "too many open files" errors with Metro's file watcher. The fix:

**For iOS/Android (Metro):**
- Disabled watchman with `DISABLE_WATCHMAN=true`
- Runs in CI mode (no auto-reload)
- Manual reload required: Press `r` in terminal

**For Web (Webpack):**
- Uses Webpack instead of Metro
- Full hot reloading works fine
- No file watcher issues

### Manual Reloading on iOS/Android

Since auto-reload is disabled:
1. Make your code changes
2. Press `r` in the Metro terminal, OR
3. Shake your physical device, OR
4. Press `Cmd+R` in iOS Simulator / `R+R` in Android Emulator

---

## Production Builds

### Web Build
```bash
npm run build:web
```
Outputs to `dist/` directory as static HTML/JS/CSS

### Preview Production Web Build
```bash
npm run preview:web
```
Serves the built files at http://localhost:4173

### iOS/Android Builds
```bash
npx expo build:ios
npx expo build:android
```
Or use EAS Build for cloud building

---

## Troubleshooting

### Metro crashes with "EMFILE: too many open files"
✅ Already fixed! The npm scripts now include `CI=true DISABLE_WATCHMAN=true`

### Webpack not working for web
Make sure webpack-cli is installed:
```bash
npm install -D webpack-cli
```

### iOS Simulator not opening
Check that Xcode is installed:
```bash
xcode-select --install
```

### Changes not reflecting in iOS/Android
Remember to manually reload:
- Press `r` in the Metro terminal

---

## File Structure

```
NEBB_calc_14FEB25/
├── App.tsx                    # Main app component
├── app.json                   # Expo config (web uses webpack)
├── webpack.config.js          # Webpack config for web
├── metro.config.js            # Metro config for iOS/Android
├── package.json               # Dependencies and scripts
└── src/
    └── screens/               # All calculator screens
```

---

## Tech Stack Summary

- **iOS/Android:** React Native + Metro bundler
- **Web:** React Native Web + Webpack
- **Navigation:** React Navigation
- **UI:** React Native Paper (Material Design)
- **Language:** TypeScript
