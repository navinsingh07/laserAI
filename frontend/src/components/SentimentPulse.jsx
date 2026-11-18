import React from 'react';
import { Activity, Smile, Meh, Frown } from 'lucide-react';

export default function SentimentPulse({ sentiment }) {
  if (!sentiment) return null;

  const getOverallClass = (overall) => {
    const text = (overall || '').toLowerCase();
    if (text.includes('positive')) return 'sentiment-positive';
    if (text.includes('mixed') || text.includes('velocity')) return 'sentiment-mixed';
    return 'sentiment-negative';
  };

  return (
    <div className="sentiment-card">
      <div>
        <div className="card-title">
          <Activity size={15} />
          <span>Sentiment Pulse</span>
        </div>

        <div className={`overall-indicator ${getOverallClass(sentiment.overall)}`}>
          <div>
            <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.8 }}>Overall Tone</div>
            <div className="sentiment-label">{sentiment.overall}</div>
          </div>
        </div>

        <div className="bars-container">
          <div className="bar-row">
            <div className="bar-header">
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Smile size={14} color="#10b981" /> Positive
              </span>
              <strong>{sentiment.positive_pct}%</strong>
            </div>
            <div className="bar-track">
              <div
                className="bar-fill fill-pos"
                style={{ width: `${sentiment.positive_pct}%` }}
              />
            </div>
          </div>

          <div className="bar-row">
            <div className="bar-header">
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Meh size={14} color="#f59e0b" /> Neutral
              </span>
              <strong>{sentiment.neutral_pct}%</strong>
            </div>
            <div className="bar-track">
              <div
                className="bar-fill fill-neu"
                style={{ width: `${sentiment.neutral_pct}%` }}
              />
            </div>
          </div>

          <div className="bar-row">
            <div className="bar-header">
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Frown size={14} color="#ef4444" /> Negative / Friction
              </span>
              <strong>{sentiment.negative_pct}%</strong>
            </div>
            <div className="bar-track">
              <div
                className="bar-fill fill-neg"
                style={{ width: `${sentiment.negative_pct}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 20, fontSize: 11, color: '#64748b', textAlign: 'center' }}>
        Computed dynamically from Google Sheets feedback ratings & NLP tone
      </div>
    </div>
  );
}
