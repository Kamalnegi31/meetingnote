import React, { useState } from 'react';
import AudioRecorder from './components/AudioRecorder';
import TranscriptDisplay from './components/TranscriptDisplay';
import './App.css';

export interface TranscriptSegment {
  id: string;
  text: string;
  timestamp: Date;
}

function App() {
  const [transcripts, setTranscripts] = useState<TranscriptSegment[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [meetingTitle, setMeetingTitle] = useState('');

  const handleTranscriptUpdate = (text: string) => {
    const newSegment: TranscriptSegment = {
      id: Date.now().toString(),
      text,
      timestamp: new Date(),
    };
    setTranscripts((prev) => [...prev, newSegment]);
  };

  const handleClearTranscripts = () => {
    if (window.confirm('Are you sure you want to clear all transcripts?')) {
      setTranscripts([]);
    }
  };

  const handleSaveNotes = async () => {
    if (transcripts.length === 0) {
      alert('No transcripts to save!');
      return;
    }

    const content = generateNotesContent();
    const filename = meetingTitle
      ? `${meetingTitle.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.txt`
      : 'meeting-notes.txt';

    if (window.electron) {
      const result = await window.electron.saveNotes(content, filename);
      if (result.success) {
        alert(`Notes saved successfully to ${result.path}`);
      } else if (!result.canceled) {
        alert(`Failed to save notes: ${result.error}`);
      }
    } else {
      // Fallback for browser mode
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const generateNotesContent = (): string => {
    const title = meetingTitle || 'Meeting Notes';
    const date = new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const time = new Date().toLocaleTimeString('en-US');

    let content = `${title}\n`;
    content += `${'='.repeat(title.length)}\n\n`;
    content += `Date: ${date}\n`;
    content += `Time: ${time}\n\n`;
    content += `Transcript:\n`;
    content += `${'─'.repeat(50)}\n\n`;

    transcripts.forEach((segment, index) => {
      const timestamp = segment.timestamp.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      });
      content += `[${timestamp}] ${segment.text}\n\n`;
    });

    return content;
  };

  const handleCopyToClipboard = () => {
    const content = generateNotesContent();
    navigator.clipboard.writeText(content).then(() => {
      alert('Notes copied to clipboard!');
    });
  };

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1>🎤 MeetingNote</h1>
          <p className="subtitle">Local AI Meeting Note Taker</p>
        </header>

        <div className="meeting-info">
          <input
            type="text"
            placeholder="Enter meeting title (optional)"
            value={meetingTitle}
            onChange={(e) => setMeetingTitle(e.target.value)}
            className="meeting-title-input"
            disabled={isRecording}
          />
        </div>

        <AudioRecorder
          onTranscriptUpdate={handleTranscriptUpdate}
          onRecordingStateChange={setIsRecording}
        />

        <TranscriptDisplay
          transcripts={transcripts}
          onClear={handleClearTranscripts}
          onSave={handleSaveNotes}
          onCopy={handleCopyToClipboard}
        />

        <footer className="footer">
          <p>
            Powered by{' '}
            <a
              href="https://huggingface.co/openai/whisper-tiny"
              target="_blank"
              rel="noopener noreferrer"
            >
              Whisper
            </a>{' '}
            - All processing happens locally on your device
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
