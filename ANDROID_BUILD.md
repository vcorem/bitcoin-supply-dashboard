# Bitcoin Supply Dashboard - Android App

Your Bitcoin dashboard has been successfully converted to an Android app using Capacitor!

## 📱 What Was Done

1. ✅ Installed Capacitor core and Android platform packages
2. ✅ Created Capacitor configuration (`capacitor.config.ts`)
3. ✅ Added Android native project in the `android/` directory
4. ✅ Updated HTML with mobile-friendly meta tags
5. ✅ Created PWA manifest for app metadata
6. ✅ Built and synced your React app to Android

## 🏗️ Project Structure

```
├── android/                  # Native Android project (auto-generated)
├── client/                   # Your React web app (unchanged)
├── capacitor.config.ts       # Capacitor configuration
└── ANDROID_BUILD.md         # This file
```

## 📦 Building the Android App

### Option 1: Using Capacitor CLI (Recommended)

1. **Build the web app**:
   ```bash
   npm run build
   ```

2. **Sync to Android**:
   ```bash
   npx cap sync android
   ```

3. **Open in Android Studio**:
   ```bash
   npx cap open android
   ```

4. **In Android Studio**:
   - Wait for Gradle sync to complete
   - Click **Run** (green play button) to install on a connected device or emulator
   - Or go to **Build > Build Bundle(s)/APK(s) > Build APK(s)** to create an installable APK
   - APK will be in: `android/app/build/outputs/apk/debug/app-debug.apk`

### Option 2: Build APK from Command Line

```bash
# Build the web app
npm run build

# Sync to Android
npx cap sync android

# Build debug APK
cd android
./gradlew assembleDebug
cd ..
```

The APK will be at: `android/app/build/outputs/apk/debug/app-debug.apk`

### Option 3: Build Release APK (for distribution)

```bash
# Build the web app
npm run build

# Sync to Android
npx cap sync android

# Build release APK
cd android
./gradlew assembleRelease
cd ..
```

**Note**: Release builds require signing configuration. See [Android Signing Guide](https://capacitorjs.com/docs/android/configuration#signing).

## 🔄 Development Workflow

### Making Changes to Your App

1. Edit your React code in `client/src/`
2. Build: `npm run build`
3. Sync: `npx cap sync android`
4. Run in Android Studio or rebuild APK

### Live Reload (Optional)

For faster development with live reload:

```bash
# Start dev server
npm run dev

# In another terminal, run with live reload
npx cap run android -l --external
```

Your app will reload automatically when you save changes!

## 🎨 Customizing App Icons & Splash Screen

### App Icons

1. Create icon images in various sizes:
   - 48x48 (mdpi)
   - 72x72 (hdpi)
   - 96x96 (xhdpi)
   - 144x144 (xxhdpi)
   - 192x192 (xxxhdpi)

2. Place them in:
   - `android/app/src/main/res/mipmap-mdpi/ic_launcher.png`
   - `android/app/src/main/res/mipmap-hdpi/ic_launcher.png`
   - `android/app/src/main/res/mipmap-xhdpi/ic_launcher.png`
   - `android/app/src/main/res/mipmap-xxhdpi/ic_launcher.png`
   - `android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png`

### Splash Screen

Customize splash screen images in:
- `android/app/src/main/res/drawable-*` directories

Or use `@capacitor/splash-screen` plugin for programmatic control.

## 📱 Testing on Device

### Via USB:

1. Enable Developer Options on your Android device
2. Enable USB Debugging
3. Connect via USB
4. Run from Android Studio or: `npx cap run android`

### Via APK:

1. Build APK (see above)
2. Transfer `app-debug.apk` to your device
3. Install it (you may need to enable "Install from Unknown Sources")

## 🚀 App Configuration

Edit `capacitor.config.ts` to change:

```typescript
{
  appId: 'com.bitcoin.supply',      // Change for your app
  appName: 'Bitcoin Supply',         // Displayed name
  webDir: 'dist/public',            // Built web assets location
}
```

After changing `appId` or `appName`, run:
```bash
npx cap sync android
```

## 📦 App Details

- **App ID**: com.bitcoin.supply
- **App Name**: Bitcoin Supply
- **Package Format**: APK/AAB (Android App Bundle)
- **Minimum Android Version**: Android 5.0 (API 21+)
- **Platform**: Capacitor 7+ with React + Vite

## 🔒 Permissions

Your app requests internet permission (added automatically) to fetch Bitcoin data from:
- CoinGecko API
- Blockchain.info API
- CoinDesk API

## 🐛 Troubleshooting

### Build Errors

- Make sure you've run `npm run build` before syncing
- Try cleaning: `cd android && ./gradlew clean && cd ..`
- Delete `android/` folder and re-add: `npx cap add android`

### Sync Issues

- Ensure `webDir: 'dist/public'` matches your Vite build output
- Check that `dist/public/` folder exists after build

### Android Studio Issues

- Update Android Studio to latest version
- Update Android SDK tools
- Invalidate caches: File > Invalidate Caches / Restart

## 📚 Resources

- [Capacitor Docs](https://capacitorjs.com/docs)
- [Capacitor Android Guide](https://capacitorjs.com/docs/android)
- [Vite + Capacitor](https://capacitorjs.com/docs/guides/vite)

## ✨ Your App Features

Your Bitcoin Supply Dashboard Android app includes:

- ⚡ Real-time Bitcoin circulating supply tracking
- 💰 Live Bitcoin price updates (USD)
- 📊 Supply progress visualization
- ⏰ Countdown to 20 million BTC milestone
- 📅 Next halving date calculation (based on block height)
- 🌐 Requires internet connection for live data updates
- 🎨 Dark Cypherpunk aesthetic with Bitcoin Orange theme

---

**Next Steps**: Open Android Studio with `npx cap open android` and build your APK! 🚀
