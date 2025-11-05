import { useState, useCallback, useRef } from 'react';
import { pipeline } from '@xenova/transformers';

export const useWhisper = () => {
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [modelLoaded, setModelLoaded] = useState(false);
  const pipelineRef = useRef<any>(null);

  const loadModel = useCallback(async () => {
    if (pipelineRef.current) {
      return;
    }

    try {
      console.log('Loading Whisper model...');
      // Use the tiny model for faster inference
      // Available models: tiny, base, small, medium, large
      pipelineRef.current = await pipeline(
        'automatic-speech-recognition',
        'Xenova/whisper-tiny.en'
      );
      setModelLoaded(true);
      console.log('Whisper model loaded successfully');
    } catch (error) {
      console.error('Error loading Whisper model:', error);
      alert('Failed to load AI model. Please refresh the page and try again.');
    }
  }, []);

  const transcribe = useCallback(async (audioBlob: Blob): Promise<string> => {
    if (!pipelineRef.current) {
      console.error('Model not loaded');
      return '';
    }

    setIsTranscribing(true);

    try {
      // Convert blob to array buffer
      const arrayBuffer = await audioBlob.arrayBuffer();

      // Create an audio context to decode the audio
      const audioContext = new AudioContext({ sampleRate: 16000 });
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

      // Get the audio data (mono channel)
      const audioData = audioBuffer.getChannelData(0);

      console.log('Transcribing audio...');

      // Perform transcription
      const result = await pipelineRef.current(audioData, {
        chunk_length_s: 30,
        stride_length_s: 5,
        language: 'english',
        task: 'transcribe',
      });

      console.log('Transcription result:', result);

      setIsTranscribing(false);
      return result.text || '';
    } catch (error) {
      console.error('Error transcribing audio:', error);
      setIsTranscribing(false);
      alert('Failed to transcribe audio. Please try again.');
      return '';
    }
  }, []);

  return {
    transcribe,
    isTranscribing,
    modelLoaded,
    loadModel,
  };
};
