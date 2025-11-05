import React, { useState, useRef, useEffect } from 'react';
import { useWhisper } from '../hooks/useWhisper';
import './AudioRecorder.css';

interface AudioRecorderProps {
  onTranscriptUpdate: (text: string) => void;
  onRecordingStateChange: (isRecording: boolean) => void;
}

const AudioRecorder: React.FC<AudioRecorderProps> = ({
  onTranscriptUpdate,
  onRecordingStateChange,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const { transcribe, isTranscribing, modelLoaded, loadModel } = useWhisper();

  useEffect(() => {
    // Load the Whisper model on component mount
    loadModel();
  }, [loadModel]);

  useEffect(() => {
    if (isRecording && !isPaused) {
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRecording, isPaused]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        stream.getTracks().forEach((track) => track.stop());

        // Transcribe the audio
        if (audioBlob.size > 0) {
          const text = await transcribe(audioBlob);
          if (text) {
            onTranscriptUpdate(text);
          }
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
      setIsPaused(false);
      setRecordingTime(0);
      onRecordingStateChange(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Error accessing microphone. Please ensure you have granted microphone permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsPaused(false);
      setRecordingTime(0);
      onRecordingStateChange(false);
    }
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current && isRecording && !isPaused) {
      mediaRecorderRef.current.pause();
      setIsPaused(true);
    }
  };

  const resumeRecording = () => {
    if (mediaRecorderRef.current && isRecording && isPaused) {
      mediaRecorderRef.current.resume();
      setIsPaused(false);
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="audio-recorder">
      <div className="recorder-status">
        {!modelLoaded ? (
          <div className="status-message loading">
            <div className="spinner"></div>
            <span>Loading AI model...</span>
          </div>
        ) : isTranscribing ? (
          <div className="status-message transcribing">
            <div className="spinner"></div>
            <span>Transcribing audio...</span>
          </div>
        ) : isRecording ? (
          <div className="status-message recording">
            <div className={`recording-indicator ${isPaused ? 'paused' : ''}`}></div>
            <span>{isPaused ? 'Paused' : 'Recording'} - {formatTime(recordingTime)}</span>
          </div>
        ) : (
          <div className="status-message ready">
            <span>Ready to record</span>
          </div>
        )}
      </div>

      <div className="recorder-controls">
        {!isRecording ? (
          <button
            onClick={startRecording}
            disabled={!modelLoaded || isTranscribing}
            className="btn btn-primary btn-large"
          >
            <span className="btn-icon">🎙️</span>
            Start Recording
          </button>
        ) : (
          <>
            {!isPaused ? (
              <button onClick={pauseRecording} className="btn btn-secondary">
                <span className="btn-icon">⏸️</span>
                Pause
              </button>
            ) : (
              <button onClick={resumeRecording} className="btn btn-secondary">
                <span className="btn-icon">▶️</span>
                Resume
              </button>
            )}
            <button onClick={stopRecording} className="btn btn-danger">
              <span className="btn-icon">⏹️</span>
              Stop & Transcribe
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AudioRecorder;
