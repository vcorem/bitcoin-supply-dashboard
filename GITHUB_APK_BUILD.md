# Building Your Bitcoin Supply APK with GitHub Actions

This guide will help you automatically build your Android APK using GitHub's free cloud build service.

## 🚀 Quick Start (5 minutes)

### Step 1: Push Your Code to GitHub

1. **Create a GitHub account** (if you don't have one): https://github.com/signup

2. **Create a new repository** on GitHub:
   - Go to: https://github.com/new
   - Name it: `bitcoin-supply-dashboard` (or any name you like)
   - Make it Public or Private (your choice)
   - **Don't** initialize with README (we already have code)
   - Click "Create repository"

3. **Connect Replit to GitHub**:
   - In Replit, click the **Version Control** icon (left sidebar, looks like branches)
   - Click "Connect to GitHub"
   - Authorize Replit to access your GitHub account
   - Select the repository you just created
   - Click "Connect"

4. **Push your code**:
   - In the Version Control panel, you'll see all your changed files
   - Add a commit message: "Initial commit - Bitcoin Supply Dashboard"
   - Click "Commit & Push"

### Step 2: Download Your APK

That's it! GitHub Actions will automatically start building your APK.

**To get your APK:**

1. **Go to your GitHub repository** in your browser
   - URL will be: `https://github.com/YOUR_USERNAME/bitcoin-supply-dashboard`

2. **Click the "Actions" tab** at the top

3. **Wait for the build to complete** (takes about 3-5 minutes)
   - You'll see a workflow run with your commit message
   - Green checkmark ✅ = Success!
   - Red X ❌ = Failed (check logs for errors)

4. **Download the APK**:
   - Click on the successful workflow run
   - Scroll down to the "Artifacts" section
   - Click **"bitcoin-supply-app"** to download
   - Extract the ZIP file
   - Inside you'll find: `app-debug.apk`

5. **Install on your Android device**:
   - Transfer the APK to your phone
   - Open it and tap "Install"
   - You may need to enable "Install from Unknown Sources" in Settings

## 🔄 How It Works

Every time you push code to GitHub:
1. GitHub Actions automatically runs
2. Builds your React web app
3. Syncs it with Capacitor
4. Compiles the Android APK
5. Uploads the APK for download (stored for 30 days)

## 📱 Manual Build Trigger

You can also trigger builds manually without pushing code:

1. Go to your repo → **Actions** tab
2. Click **"Build Android APK"** in the left sidebar
3. Click **"Run workflow"** button
4. Select branch (usually `main`)
5. Click green **"Run workflow"** button

The build will start immediately!

## 🎯 Build Status Badge (Optional)

Add a cool build status badge to your repository:

1. Go to **Actions** tab
2. Click **"Build Android APK"** workflow
3. Click the "⋯" (three dots) → **"Create status badge"**
4. Copy the Markdown code
5. Paste it in your `README.md`

Example badge:
![Build Status](https://github.com/YOUR_USERNAME/bitcoin-supply-dashboard/actions/workflows/build-android.yml/badge.svg)

## 📦 What Gets Built

- **File**: `app-debug.apk`
- **Size**: ~60-80 MB
- **Type**: Debug APK (for testing)
- **Signing**: Debug keystore (auto-generated)
- **Installable**: Yes, on any Android device

## 🔒 Building a Release APK (For Google Play Store)

The current workflow builds a **debug APK** for testing. To publish on Google Play Store, you'll need a **release APK** with proper signing.

### Generate Upload Key

```bash
# On your local machine (requires Java)
keytool -genkey -v -keystore bitcoin-supply-upload-key.keystore \
  -alias bitcoin-supply -keyalg RSA -keysize 2048 -validity 10000
```

Follow the prompts to set a password and your info.

### Add Signing to GitHub

1. Encode your keystore to base64:
   ```bash
   base64 bitcoin-supply-upload-key.keystore > keystore.txt
   ```

2. In GitHub, go to: **Settings** → **Secrets and variables** → **Actions**

3. Add these secrets:
   - `KEYSTORE_BASE64`: Contents of `keystore.txt`
   - `KEYSTORE_PASSWORD`: Your keystore password
   - `KEY_ALIAS`: `bitcoin-supply`
   - `KEY_PASSWORD`: Your key password

4. Update the workflow to use release build (I can help with this when you're ready)

## 🐛 Troubleshooting

### Build Failed?

1. **Check the logs**:
   - Click the failed workflow run
   - Click on the "build" job
   - Expand the failed step to see error details

2. **Common issues**:
   - **npm install failed**: Check `package.json` for dependency issues
   - **Build failed**: Check for TypeScript/React errors in your code
   - **Gradle failed**: Usually means Android configuration issue

### Can't Install APK on Phone?

1. **Enable Unknown Sources**:
   - Settings → Security → Unknown Sources (enable)
   - OR Settings → Apps → Special Access → Install Unknown Apps → (select your browser/file manager) → Allow

2. **"App not installed" error**:
   - Uninstall any existing version first
   - Make sure you have enough storage space
   - Try transferring via USB instead of download

## 💡 Pro Tips

### Faster Builds

The workflow caches Node.js dependencies, so builds after the first one are faster (2-3 minutes).

### Multiple Versions

GitHub stores artifacts for 30 days. You can keep multiple APK versions:
- Each push creates a new artifact
- Download older versions from their respective workflow runs

### Automatic Versioning

You can modify the workflow to auto-increment version numbers. Let me know if you want this!

## 📊 Build Frequency

GitHub Actions is **100% free** for public repositories with:
- Unlimited build minutes
- Unlimited storage for artifacts (30-day retention)

For private repos:
- 2,000 free minutes/month
- Each build takes ~3-5 minutes
- You can run ~400 builds/month for free

## ✨ Next Steps

Once you have your APK:

1. **Test it thoroughly** on your Android device
2. **Share it** with friends (send them the APK file)
3. **Publish to Google Play** (requires release build + $25 one-time fee)
4. **Keep improving** - every push builds a new APK automatically!

---

## 📚 Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Capacitor Android Documentation](https://capacitorjs.com/docs/android)
- [Google Play Publishing Guide](https://developer.android.com/studio/publish)

## 🎉 You're All Set!

Every time you make changes in Replit and push to GitHub, a fresh APK will be automatically built and ready to download. No Android Studio required! 🚀
