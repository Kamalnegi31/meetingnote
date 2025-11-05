# 🎤 MeetingNote

A powerful local AI-powered meeting note taker desktop application that transcribes your meetings in real-time using Whisper AI. All processing happens on your device - no internet required, complete privacy!

## ✨ Features

- **🔒 100% Local Processing**: All AI transcription happens on your device. No data is sent to external servers.
- **🎙️ Real-time Recording**: Record meetings with start, pause, and stop controls.
- **🤖 AI-Powered Transcription**: Uses OpenAI's Whisper model for accurate speech-to-text conversion.
- **📝 Clean Interface**: Beautiful, intuitive UI for easy meeting note-taking.
- **💾 Save & Export**: Save your transcripts as text or markdown files.
- **📋 Quick Copy**: Copy transcripts to clipboard with one click.
- **⏱️ Timestamped Notes**: Each transcript segment includes the time it was recorded.
- **🎨 Modern Design**: Clean, professional interface with smooth animations.

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/meetingnote.git
cd meetingnote
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will open in development mode. The first time you run it, the Whisper AI model will be downloaded (approximately 40MB for the tiny model).

## 🎯 Usage

1. **Start Recording**: Click the "Start Recording" button to begin capturing audio.
2. **Pause/Resume**: Use the pause button to temporarily stop recording, resume when ready.
3. **Stop & Transcribe**: Click "Stop & Transcribe" to end the recording and process the audio with AI.
4. **View Transcripts**: Transcribed text appears in real-time with timestamps.
5. **Save Notes**: Click the "Save" button to export your meeting notes to a file.
6. **Copy to Clipboard**: Use the "Copy" button to quickly copy all transcripts.

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development mode with hot reload
- `npm run build` - Build the application for production
- `npm run package` - Create distributable packages for your platform
- `npm start` - Run the built application

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

## 📦 Building for Distribution

Build executable packages for your platform:

```bash
npm run package
```

This will create distributable files in the `release/` directory:
- **macOS**: `.dmg` installer
- **Windows**: `.exe` installer
- **Linux**: `.AppImage` file

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
