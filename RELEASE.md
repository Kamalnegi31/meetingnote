# Quick Release Guide

This is a streamlined checklist for creating and distributing a new release.

## 🚀 Release Process (5 Steps)

### 1️⃣ Prepare (5 minutes)

```bash
# Update version
# Edit package.json: "version": "1.0.1"

# Ensure icons exist
ls -la build/icon.*

# Test the app
npm install
npm run dev
# Test: record, transcribe, save, copy
```

### 2️⃣ Build Installers (10-30 minutes)

Choose your approach:

**Option A: Build on Current Platform Only**
```bash
npm run package
```

**Option B: Build for Specific Platform**
```bash
npm run package:win     # Windows only
npm run package:mac     # macOS only
npm run package:linux   # Linux only
```

**Option C: Build All (macOS only)**
```bash
npm run package:all     # All platforms
```

**Result:** Installers appear in `release/` folder

### 3️⃣ Test Installers (10 minutes)

Install on a test machine and verify:
- [ ] App installs successfully
- [ ] App launches without errors
- [ ] AI model downloads on first launch
- [ ] Microphone permission prompt appears
- [ ] Recording works
- [ ] Transcription works
- [ ] Save feature works
- [ ] Copy to clipboard works

### 4️⃣ Upload (5 minutes)

**GitHub Releases (Recommended):**
```bash
# Create a new release on GitHub
# Tag: v1.0.1
# Title: MeetingNote v1.0.1
# Upload installers from release/ folder
```

**Alternative: File Hosting**
- Upload to Google Drive, Dropbox, or your server
- Make files publicly accessible
- Note download URLs

### 5️⃣ Distribute (2 minutes)

Share with users:

**Email Template:**
```
Subject: MeetingNote v1.0.1 - New Release

Hi everyone,

A new version of MeetingNote is available!

📥 Download:
- Windows: [Link to .exe]
- macOS: [Link to .dmg]
- Linux: [Link to .AppImage or .deb]

📖 Installation Guide: [Link to INSTALLATION_GUIDE.md]

What's new in v1.0.1:
- [List your changes]

Questions? Reply to this email or check the installation guide.

Thanks!
```

## 📋 Release Checklist

Copy this for each release:

```
Release v______

Pre-Build:
[ ] Version updated in package.json
[ ] CHANGELOG updated (if you have one)
[ ] Icons present in build/ folder
[ ] Tested in dev mode
[ ] Git committed and pushed

Build:
[ ] Built Windows installer
[ ] Built macOS installer
[ ] Built Linux installer
[ ] All builds completed without errors

Testing:
[ ] Windows: Installed and tested
[ ] macOS: Installed and tested
[ ] Linux: Installed and tested
[ ] AI model downloads correctly
[ ] All features work

Distribution:
[ ] Created GitHub release (or uploaded to hosting)
[ ] Updated download links
[ ] Sent notification to users
[ ] Updated documentation if needed

Post-Release:
[ ] Monitored for user issues
[ ] Responded to feedback
[ ] Planned next release
```

## 🎯 Platform-Specific Notes

### Windows
- **File**: `MeetingNote-Setup-1.0.0.exe`
- **Size**: ~80-100 MB
- **Users see**: Installation wizard with "Next" buttons
- **Install location**: Usually `C:\Program Files\MeetingNote`
- **Creates**: Desktop shortcut, Start Menu entry

### macOS
- **File**: `MeetingNote-1.0.0.dmg`
- **Size**: ~90-110 MB
- **Users see**: Drag-to-Applications window
- **Install location**: `/Applications/MeetingNote.app`
- **Note**: May show "unidentified developer" warning (normal without code signing)

### Linux
- **Files**: `MeetingNote-1.0.0.AppImage` and `meetingnote_1.0.0_amd64.deb`
- **Size**: ~85-105 MB
- **AppImage**: Portable, no installation needed
- **DEB**: For Debian/Ubuntu, installs via package manager

## 🔢 Version Numbers

Follow semantic versioning: `MAJOR.MINOR.PATCH`

- **1.0.0**: Initial release
- **1.0.1**: Bug fixes, small improvements
- **1.1.0**: New features, backward compatible
- **2.0.0**: Major changes, breaking changes

Examples:
- Fixed a bug? → 1.0.0 → 1.0.1
- Added new feature? → 1.0.1 → 1.1.0
- Rewrote major part? → 1.1.0 → 2.0.0

## 📝 Release Notes Template

```markdown
# v1.0.1 - 2024-01-15

## 🎉 New Features
- Added pause/resume functionality
- Improved transcript formatting

## 🐛 Bug Fixes
- Fixed microphone permission dialog
- Resolved saving issue on Windows

## 🔧 Improvements
- Faster transcription processing
- Better error messages
- Updated UI styling

## 📦 Downloads
- Windows: [MeetingNote-Setup-1.0.1.exe](link)
- macOS: [MeetingNote-1.0.1.dmg](link)
- Linux: [MeetingNote-1.0.1.AppImage](link)
```

## ⚡ Quick Commands Reference

```bash
# Development
npm run dev              # Start development mode

# Building
npm run build           # Build all components
npm run package         # Build + create installer

# Platform-specific builds
npm run package:win     # Windows only
npm run package:mac     # macOS only
npm run package:linux   # Linux only
npm run package:all     # All platforms (macOS only)

# Cleaning
rm -rf dist release node_modules
npm install             # Fresh install
```

## 🆘 Common Issues During Release

**"Build fails with icon error"**
→ Add icons to `build/` folder or temporarily remove icon config

**"Windows build fails on Mac"**
→ Install wine: `brew install wine-stable`

**"Users can't install on macOS"**
→ Tell them to right-click → Open (bypasses security warning)

**"Blank screen after install"**
→ Rebuild: `npm run build && npm run package`

**"Slow transcription"**
→ Expected on older hardware. Consider adding a performance warning.

## 📚 More Information

- Detailed build instructions: `BUILD_GUIDE.md`
- User installation help: `INSTALLATION_GUIDE.md`
- Development guide: `README.md`

---

**Remember:** Always test installers before distributing to users!
