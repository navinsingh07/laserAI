import React from 'react';
import { RefreshCw, Send, Sparkles, Clock, Database } from 'lucide-react';

export default function DigestHero({ digest, role, loading, onGenerate, onDispatch }) {
  const roleThemes = {
    'Founder': 'theme-founder',
    'Review PM': 'theme-review',
    'Sharing PM': 'theme-sharing',
  };

  const badgeClasses = {
    'Founder': 'role-founder',
    'Review PM': 'role-review',
    'Sharing PM': 'role-sharing',
  };

  return (
    <div className={`digest-hero ${roleThemes[role] || 'theme-founder'}`}>
      <div className="hero-header">
        <div className="role-badge-row">
          <span className={`role-label-badge ${badgeClasses[role] || 'role-founder'}`}>
            {role} Digest
          </span>
          <span className="digest-meta">
            <Clock size={13} style={{ display: 'inline', marginRight: 4 }} />
            {digest?.generated_at || 'Just now'}
          </span>
          <span className="digest-meta">
            <Database size={13} style={{ display: 'inline', marginRight: 4 }} />
            {digest?.total_feedback_analyzed || 0} customer items analyzed
          </span>
        </div>

        <div className="hero-actions">
          <button
            className="dispatch-btn"
            onClick={onDispatch}
            title="Send this exact digest to Slack and Email"
          >
            <Send size={14} />
            <span>Dispatch to Channels</span>
          </button>

          <button
            className="generate-btn"
            onClick={onGenerate}
            disabled={loading}
          >
            <RefreshCw size={14} className={loading ? 'spin-icon' : ''} />
            <span>{loading ? 'Synthesizing...' : 'Regenerate Digest'}</span>
          </button>
        </div>
      </div>

      <div className="executive-summary-box">
        <div className="summary-heading">Executive Intelligence Summary</div>
        <p className="summary-text">
          {digest?.executive_summary || 'Ingesting feedback rows and generating synthesis...'}
        </p>
      </div>
    </div>
  );
}
