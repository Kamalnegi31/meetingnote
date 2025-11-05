import React from 'react';
import { TranscriptSegment } from '../App';
import './TranscriptDisplay.css';

interface TranscriptDisplayProps {
  transcripts: TranscriptSegment[];
  onClear: () => void;
  onSave: () => void;
  onCopy: () => void;
}

const TranscriptDisplay: React.FC<TranscriptDisplayProps> = ({
  transcripts,
  onClear,
  onSave,
  onCopy,
}) => {
  return (
    <div className="transcript-display">
      <div className="transcript-header">
        <h2>Transcript</h2>
        <div className="transcript-actions">
          <button
            onClick={onCopy}
            disabled={transcripts.length === 0}
            className="btn btn-sm btn-outline"
            title="Copy to clipboard"
          >
            📋 Copy
          </button>
          <button
            onClick={onSave}
            disabled={transcripts.length === 0}
            className="btn btn-sm btn-outline"
            title="Save to file"
          >
            💾 Save
          </button>
          <button
            onClick={onClear}
            disabled={transcripts.length === 0}
            className="btn btn-sm btn-outline btn-danger-outline"
            title="Clear all transcripts"
          >
            🗑️ Clear
          </button>
        </div>
      </div>

      <div className="transcript-content">
        {transcripts.length === 0 ? (
          <div className="empty-state">
            <p className="empty-icon">📝</p>
            <p className="empty-text">No transcripts yet</p>
            <p className="empty-subtext">Start recording to see your meeting notes here</p>
          </div>
        ) : (
          <div className="transcript-list">
            {transcripts.map((segment) => (
              <div key={segment.id} className="transcript-segment">
                <div className="segment-timestamp">
                  {segment.timestamp.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
                <div className="segment-text">{segment.text}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {transcripts.length > 0 && (
        <div className="transcript-footer">
          <span className="transcript-count">
            {transcripts.length} segment{transcripts.length !== 1 ? 's' : ''}
          </span>
        </div>
      )}
    </div>
  );
};

export default TranscriptDisplay;
