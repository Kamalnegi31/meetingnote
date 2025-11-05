# MeetingNote - Installation Guide for Users

Welcome to MeetingNote! This guide will help you install and use the application on your computer.

## 📥 Download

Download the installer for your operating system:

### Windows
1. Download `MeetingNote-Setup-1.0.0.exe`
2. Double-click the downloaded file
3. Follow the installation wizard

### macOS
1. Download `MeetingNote-1.0.0.dmg`
2. Double-click the downloaded file
3. Drag MeetingNote to your Applications folder
4. Open Finder → Applications → MeetingNote

**Note for macOS users:** If you see "MeetingNote can't be opened because it is from an unidentified developer":
- Right-click (or Control-click) on MeetingNote
- Select "Open" from the menu
- Click "Open" in the dialog that appears
- This only needs to be done once

### Linux
1. Download `MeetingNote-1.0.0.AppImage` or `meetingnote_1.0.0_amd64.deb`
2. **For AppImage:**
   - Right-click → Properties → Permissions
   - Check "Allow executing file as program"
   - Double-click to run
3. **For .deb (Ubuntu/Debian):**
   - Double-click to install via Software Center
   - Or use terminal: `sudo dpkg -i meetingnote_1.0.0_amd64.deb`

## 🚀 First Time Setup

When you first open MeetingNote:

1. **Wait for AI Model Download**
   - The app needs to download the AI model (about 40MB)
   - This happens automatically on first launch
   - Takes 1-5 minutes depending on your internet speed
   - Shows "Loading AI model..." status

2. **Grant Microphone Permission**
   - When you click "Start Recording", your system will ask for microphone access
   - Click "Allow" or "Yes" to grant permission
   - This is required for recording meetings

## 📖 How to Use

### Recording Your First Meeting

1. **Launch the App**
   - Open MeetingNote from your Applications folder or Start Menu

2. **Optional: Add Meeting Title**
   - Type a name for your meeting in the text box (e.g., "Team Standup")

3. **Start Recording**
   - Click the "🎙️ Start Recording" button
   - Speak clearly into your microphone
   - You'll see "Recording - 00:00" indicating it's active

4. **Pause if Needed**
   - Click "⏸️ Pause" to temporarily stop recording
   - Click "▶️ Resume" to continue

5. **Stop and Transcribe**
   - Click "⏹️ Stop & Transcribe" when done
   - The app will process your audio (takes a few seconds)
   - Transcribed text appears below with timestamps

6. **Save Your Notes**
   - Click "💾 Save" to save as a text file
   - Choose a location on your computer
   - Your notes are saved with meeting title and timestamps

7. **Copy to Clipboard**
   - Click "📋 Copy" to copy all notes
   - Paste into email, Slack, or any document

## ✨ Tips for Best Results

### Audio Quality
- Use a good quality microphone
- Record in a quiet environment
- Speak clearly and at a normal pace
- Keep microphone 6-12 inches from your mouth

### Recording
- The app works best with recordings under 5 minutes
- For longer meetings, stop and transcribe every few minutes
- This ensures better accuracy and saves memory

### Saving
- Save your notes frequently
- Use descriptive meeting titles
- Notes are saved in plain text format (easy to open anywhere)

## 🔒 Privacy & Offline Use

- **100% Local Processing**: All transcription happens on your computer
- **No Internet After Setup**: Only internet needed is to download the AI model once
- **No Data Collection**: Nothing is sent to external servers
- **Your Data Stays Yours**: All recordings and transcripts stay on your device

## ❓ Troubleshooting

### "Loading AI model..." never finishes
- Check your internet connection (needed only first time)
- Close and reopen the app
- On slow connections, this can take up to 10 minutes

### Microphone not working
- **Windows**: Settings → Privacy → Microphone → Allow apps to access
- **macOS**: System Preferences → Security & Privacy → Microphone → Check MeetingNote
- **Linux**: Check audio settings and ensure microphone is not muted

### App won't open (macOS)
- Right-click → Open (as mentioned in installation)
- Or: System Preferences → Security & Privacy → General → "Open Anyway"

### Poor transcription quality
- Check microphone is working in other apps
- Speak more clearly and slowly
- Reduce background noise
- Try moving closer to microphone

### Transcription is slow
- Normal on older computers (Whisper AI is resource-intensive)
- Close other applications to free up resources
- Consider shorter recording segments
- The "tiny" model is already the fastest option

## 🆘 Getting Help

If you encounter issues:

1. Check the troubleshooting section above
2. Make sure you're using the latest version
3. Contact support or report issues at: [Your support contact/GitHub]

## 🔄 Updating

When a new version is available:

1. Download the new installer
2. Install over the existing version
3. Your settings and saved notes are preserved

## 📞 Support

- Email: [your-email@example.com]
- Website: [your-website.com]
- GitHub Issues: [github-link]

---

Thank you for using MeetingNote! We hope it makes your meeting notes easier and more accurate. 🎉
