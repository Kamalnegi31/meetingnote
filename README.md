# 🎤 MeetingNote

A powerful local AI-powered meeting note taker desktop application that transcribes your meetings in real-time using Whisper AI. All processing happens on your device - no internet required, complete privacy!

---

## 👥 Are you a user or developer?

- **🎯 End User?** (Want to download and install the app)
  - **[📥 Download Installers](#-download-for-end-users)** - Get the app for Windows, macOS, or Linux
  - **[📖 Installation Guide](INSTALLATION_GUIDE.md)** - Step-by-step instructions for users

- **👨‍💻 Developer?** (Want to build or modify the app)
  - **[🛠️ Development Setup](#-development-setup)** - Get started developing
  - **[📦 Build Guide](BUILD_GUIDE.md)** - Create installers for distribution
  - **[🚀 Release Guide](RELEASE.md)** - Quick checklist for releasing

---

## ✨ Features

- **🔒 100% Local Processing**: All AI transcription happens on your device. No data is sent to external servers.
- **🎙️ Real-time Recording**: Record meetings with start, pause, and stop controls.
- **🤖 AI-Powered Transcription**: Uses OpenAI's Whisper model for accurate speech-to-text conversion.
- **📝 Clean Interface**: Beautiful, intuitive UI for easy meeting note-taking.
- **💾 Save & Export**: Save your transcripts as text or markdown files.
- **📋 Quick Copy**: Copy transcripts to clipboard with one click.
- **⏱️ Timestamped Notes**: Each transcript segment includes the time it was recorded.
- **🎨 Modern Design**: Clean, professional interface with smooth animations.

## 📥 Download for End Users

**Ready-to-use installers** for non-technical users:

### Windows
Download: `MeetingNote-Setup-1.0.0.exe` (~80MB)
- Double-click to install
- Follow the installation wizard
- App appears in Start Menu

### macOS
Download: `MeetingNote-1.0.0.dmg` (~90MB)
- Open the DMG file
- Drag to Applications folder
- Open from Applications

### Linux
Download: `MeetingNote-1.0.0.AppImage` (~90MB) or `.deb` package
- Make executable and run (AppImage)
- Or install via package manager (.deb)

**📖 Need help installing?** See the **[Installation Guide](INSTALLATION_GUIDE.md)** for detailed instructions.

**Note:** Download links will be available after the first release is built. See [Build Guide](BUILD_GUIDE.md) to create installers.

---

## 🛠️ Development Setup

For developers who want to modify or build the application:

### Prerequisites

- Node.js 18 or higher
- npm or yarn package manager
- Git

### Quick Start

1. Clone the repository:
```bash
git clone https://github.com/yourusername/meetingnote.git
cd meetingnote
```

2. Install dependencies:
```bash
npm install
```

3. Start development mode:
```bash
npm run dev
```

The application will open in development mode. The Whisper AI model (~40MB) downloads automatically on first launch.

### Building Installers

To create distributable packages:

```bash
# Build for your current platform
npm run package

# Or build for specific platforms
npm run package:win     # Windows
npm run package:mac     # macOS
npm run package:linux   # Linux
```

Installers appear in the `release/` folder.

**📦 For detailed build instructions**, see **[BUILD_GUIDE.md](BUILD_GUIDE.md)**

## 🎯 Usage

1. **Start Recording**: Click the "Start Recording" button to begin capturing audio.
2. **Pause/Resume**: Use the pause button to temporarily stop recording, resume when ready.
3. **Stop & Transcribe**: Click "Stop & Transcribe" to end the recording and process the audio with AI.
4. **View Transcripts**: Transcribed text appears in real-time with timestamps.
5. **Save Notes**: Click the "Save" button to export your meeting notes to a file.
6. **Copy to Clipboard**: Use the "Copy" button to quickly copy all transcripts.

## 🛠️ For Developers

### Available Scripts

```bash
# Development
npm run dev              # Start with hot reload
npm run start            # Run built application

# Building
npm run build            # Build all components
npm run build:renderer   # Build React frontend only
npm run build:main       # Build Electron main process only
npm run build:preload    # Build preload script only

# Distribution
npm run package          # Create installer for current platform
npm run package:win      # Create Windows installer
npm run package:mac      # Create macOS installer
npm run package:linux    # Create Linux installers
npm run package:all      # Create all installers (macOS only)
```

### Documentation

- **[BUILD_GUIDE.md](BUILD_GUIDE.md)** - Complete guide to building distributable installers
- **[RELEASE.md](RELEASE.md)** - Quick checklist for creating releases
- **[build/README.md](build/README.md)** - Instructions for creating application icons

### Project Structure

```
meetingnote/
├── electron/           # Electron main process
│   ├── main.ts        # Main Electron entry point
│   └── preload.ts     # Preload script for IPC
├── src/               # React application
│   ├── components/    # React components
│   │   ├── AudioRecorder.tsx
│   │   └── TranscriptDisplay.tsx
│   ├── hooks/         # Custom React hooks
│   │   └── useWhisper.ts
│   ├── types/         # TypeScript type definitions
│   ├── App.tsx        # Main App component
│   └── main.tsx       # React entry point
├── public/            # Static assets
└── package.json       # Project configuration
```

## 🤖 AI Model

MeetingNote uses the [Whisper Tiny English model](https://huggingface.co/Xenova/whisper-tiny.en) from Transformers.js. This model provides a good balance between:

- **Speed**: Fast transcription on most modern hardware
- **Accuracy**: Reliable speech recognition for English
- **Size**: Small enough to run efficiently locally (~40MB)

### Changing the Model

You can use a different Whisper model by modifying `src/hooks/useWhisper.ts`:

```typescript
// Available models (larger = more accurate but slower):
// - Xenova/whisper-tiny.en (recommended, ~40MB)
// - Xenova/whisper-base.en (~75MB)
// - Xenova/whisper-small.en (~250MB)

pipelineRef.current = await pipeline(
  'automatic-speech-recognition',
  'Xenova/whisper-tiny.en' // Change this line
);
```

## 📦 Distributing to Non-Technical Users

### Quick Summary

Non-technical users don't need Node.js, npm, or any development tools. Just:

1. **You (developer)** build the installers once using `npm run package`
2. **Users** download and double-click the installer (`.exe`, `.dmg`, or `.AppImage`)
3. **Users** use the app like any other desktop application

### Step-by-Step Distribution Process

**1. Build the Installers (You do this once):**
```bash
# Install dependencies (first time only)
npm install

# Build installers for your platform
npm run package

# Or build for specific platforms:
npm run package:win     # Creates .exe for Windows
npm run package:mac     # Creates .dmg for macOS
npm run package:linux   # Creates .AppImage and .deb for Linux
```

**2. Upload installers** (from `release/` folder) to:
- GitHub Releases
- Google Drive
- Dropbox
- Your website
- Any file hosting service

**3. Share download links** with users along with the [Installation Guide](INSTALLATION_GUIDE.md)

**4. Users install** by simply:
- **Windows**: Double-clicking the `.exe` file
- **macOS**: Opening the `.dmg` and dragging to Applications
- **Linux**: Making `.AppImage` executable or installing `.deb`

**No technical knowledge required from users!** ✅

For complete instructions, see:
- **[BUILD_GUIDE.md](BUILD_GUIDE.md)** - How to build installers
- **[INSTALLATION_GUIDE.md](INSTALLATION_GUIDE.md)** - Share with end users
- **[RELEASE.md](RELEASE.md)** - Quick release checklist

## 🔒 Privacy & Security

- **No Internet Required**: All processing happens locally on your device
- **No Data Collection**: We don't collect, store, or transmit any of your data
- **Open Source**: The code is fully open for inspection and audit

## 🙏 Acknowledgments

- [OpenAI Whisper](https://github.com/openai/whisper) - The AI model powering transcription
- [Transformers.js](https://github.com/xenova/transformers.js) - Running ML models in the browser
- [Electron](https://www.electronjs.org/) - Desktop application framework
- [React](https://react.dev/) - UI framework

## 📄 License

MIT License - see LICENSE file for details

## 🐛 Issues & Contributions

Found a bug or want to contribute? Please open an issue or submit a pull request on our [GitHub repository](https://github.com/yourusername/meetingnote).

---

Made with ❤️ for better meeting notes 
