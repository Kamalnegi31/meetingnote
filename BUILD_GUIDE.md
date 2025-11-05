# MeetingNote - Build & Distribution Guide

This guide explains how to build distributable installers for non-technical users.

## 📋 Prerequisites

Before building installers, ensure you have:

1. **Node.js 18+** installed
2. **Git** installed
3. **Platform-specific tools:**
   - **macOS**: Xcode Command Line Tools (`xcode-select --install`)
   - **Windows**: Visual Studio Build Tools or Windows SDK
   - **Linux**: Standard build tools (`build-essential` on Ubuntu/Debian)

## 🚀 Quick Start

### 1. Clone and Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/meetingnote.git
cd meetingnote

# Install dependencies
npm install
```

### 2. Add Icons (Important!)

Create proper application icons before building:

```bash
# Add these files to the build/ directory:
# - build/icon.icns (macOS)
# - build/icon.ico (Windows)
# - build/icon.png (Linux)
```

See `build/README.md` for detailed icon creation instructions.

### 3. Build for Your Platform

```bash
# Build for your current platform
npm run package

# Or build for specific platform:
npm run package:win    # Windows
npm run package:mac    # macOS
npm run package:linux  # Linux

# Build for all platforms (requires macOS)
npm run package:all
```

### 4. Find Your Installers

Built installers are in the `release/` directory:

```
release/
├── MeetingNote-1.0.0.dmg              # macOS installer
├── MeetingNote Setup 1.0.0.exe        # Windows installer
├── MeetingNote-1.0.0.AppImage         # Linux AppImage
└── meetingnote_1.0.0_amd64.deb        # Linux Debian package
```

## 📦 Distribution Process

### Step 1: Prepare for Release

1. **Update version** in `package.json`:
   ```json
   {
     "version": "1.0.1"
   }
   ```

2. **Add/update icons** in `build/` directory

3. **Test the application** in development mode:
   ```bash
   npm run dev
   ```

### Step 2: Build Installers

#### Option A: Build on Each Platform

For best results, build on the target platform:

**On Windows:**
```bash
npm install
npm run package:win
```

**On macOS:**
```bash
npm install
npm run package:mac
```

**On Linux:**
```bash
npm install
npm run package:linux
```

#### Option B: Build All on macOS

macOS can build for all platforms (requires additional tools):

```bash
# Install wine-stable for Windows builds
brew install wine-stable

# Build for all platforms
npm run package:all
```

### Step 3: Test Installers

Before distributing, test each installer:

1. Install on a clean machine
2. Test all features:
   - Recording
   - Transcription
   - Saving files
   - Copy to clipboard
3. Check that AI model downloads correctly
4. Verify microphone permissions work

### Step 4: Distribute to Users

#### Upload to File Hosting

Upload installers to:
- GitHub Releases
- Google Drive
- Dropbox
- Your own server

#### Create Download Page

Example structure:
```
📥 Download MeetingNote v1.0.0

Windows
- MeetingNote-Setup-1.0.0.exe (80 MB)
  Download | Install Guide

macOS
- MeetingNote-1.0.0.dmg (85 MB)
  Download | Install Guide

Linux
- MeetingNote-1.0.0.AppImage (90 MB)
- meetingnote_1.0.0_amd64.deb (85 MB)
  Download | Install Guide
```

## 🔧 Build Configuration

### Customizing the Build

Edit `package.json` to customize build settings:

```json
{
  "build": {
    "appId": "com.yourcompany.meetingnote",
    "productName": "MeetingNote",
    "copyright": "Copyright © 2024 ${author}",
    "compression": "normal",
    // ... other settings
  }
}
```

### Important Build Options

- **appId**: Unique identifier (reverse domain format)
- **productName**: Application display name
- **compression**: "store" (fast), "normal" (balanced), "maximum" (slow but small)
- **asar**: true (recommended for security)

## 🐛 Common Build Issues

### Issue: "Cannot find module..."

**Solution:**
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
npm run package
```

### Issue: Windows build fails on macOS

**Solution:**
```bash
# Install wine
brew install wine-stable

# Try again
npm run package:win
```

### Issue: "ENOENT: no such file or directory, stat 'build/icon.icns'"

**Solution:**
- Add the missing icon file to `build/` directory
- Or remove icon references from `package.json` temporarily
- See `build/README.md` for icon creation instructions

### Issue: Build succeeds but app won't open

**Solution:**
- Check that `dist/` folder contains compiled files
- Verify `package.json` main field points to `dist/main.js`
- Check electron/main.ts has correct paths
- Rebuild: `npm run build && npm run package`

### Issue: App opens but shows blank screen

**Solution:**
- Check browser console in dev mode: Ctrl+Shift+I (Windows/Linux) or Cmd+Option+I (macOS)
- Verify `dist/renderer/` contains built React files
- Check paths in `electron/main.ts` are correct
- Rebuild renderer: `npm run build:renderer`

## 📊 Build Size Optimization

Current approximate sizes:
- Windows: ~80-100 MB
- macOS: ~90-110 MB
- Linux: ~85-105 MB

### Reducing Size

1. **Use compression:**
   ```json
   "build": {
     "compression": "maximum"
   }
   ```

2. **Exclude unnecessary files:**
   ```json
   "build": {
     "files": [
       "dist/**/*",
       "!dist/**/*.map"
     ]
   }
   ```

3. **Consider using Whisper Base instead of Tiny:**
   - If accuracy is more important than size
   - Edit `src/hooks/useWhisper.ts`

## 🚢 Continuous Deployment

### GitHub Actions Example

Create `.github/workflows/build.yml`:

```yaml
name: Build

on:
  push:
    tags:
      - 'v*'

jobs:
  build:
    strategy:
      matrix:
        os: [macos-latest, windows-latest, ubuntu-latest]

    runs-on: ${{ matrix.os }}

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Install dependencies
        run: npm install

      - name: Build
        run: npm run package

      - name: Upload artifacts
        uses: actions/upload-artifact@v3
        with:
          name: ${{ matrix.os }}-build
          path: release/
```

## 🔐 Code Signing (Optional but Recommended)

### macOS Code Signing

Prevents "unidentified developer" warnings:

```bash
# Get Apple Developer ID certificate
# Add to package.json:
{
  "build": {
    "mac": {
      "identity": "Developer ID Application: Your Name (TEAM_ID)"
    }
  }
}
```

### Windows Code Signing

Prevents SmartScreen warnings:

```bash
# Get code signing certificate
# Add to package.json:
{
  "build": {
    "win": {
      "certificateFile": "path/to/cert.pfx",
      "certificatePassword": "password"
    }
  }
}
```

## 📚 Additional Resources

- [Electron Builder Docs](https://www.electron.build/)
- [Electron Documentation](https://www.electronjs.org/docs/latest/)
- [Vite Documentation](https://vitejs.dev/)
- [Transformers.js](https://huggingface.co/docs/transformers.js)

## ✅ Pre-Release Checklist

Before releasing to users:

- [ ] Version number updated in package.json
- [ ] Icons added to build/ directory
- [ ] Tested in development mode
- [ ] Built all required platform installers
- [ ] Tested each installer on clean machine
- [ ] Verified AI model downloads correctly
- [ ] Tested all features (record, pause, stop, save, copy)
- [ ] Created release notes
- [ ] Updated INSTALLATION_GUIDE.md if needed
- [ ] Uploaded installers to hosting
- [ ] Created download page/GitHub release
- [ ] Sent download links to users

## 🎉 You're Ready!

Your installers are now ready to distribute to non-technical users. They can simply download and install like any other application.

For user-facing instructions, share the `INSTALLATION_GUIDE.md` file with them.
