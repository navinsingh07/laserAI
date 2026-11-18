import React from 'react';
import { Target, AlertTriangle, AlertCircle, Sparkles } from 'lucide-react';

export default function ThemesGrid({ themes }) {
  if (!themes || themes.length === 0) return null;

  const severityIcon = {
    'CRITICAL': <AlertCircle size={13} />,
    'WARNING': <AlertTriangle size={13} />,
    'OPPORTUNITY': <Sparkles size={13} />,
  };

  const severityClass = {
    'CRITICAL': 'severity-critical',
    'WARNING': 'severity-warning',
    'OPPORTUNITY': 'severity-opportunity',
  };

  return (
    <div className="themes-section">
      <div className="section-title">
        <Target size={16} />
        <span>Role-Targeted Themes & Recommendations</span>
      </div>

      <div className="themes-list">
        {themes.map((t, idx) => (
          <div key={idx} className={`theme-card ${severityClass[t.severity] || ''}`}>
            <div className="theme-card-top">
              <div className="theme-title">{t.theme}</div>
              <div className="severity-badge" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                {severityIcon[t.severity]}
                <span>{t.severity}</span>
              </div>
            </div>

            <div className="user-segment">
              Impacted Cohort: <span>{t.affected_user_segment}</span>
            </div>

            <div className="recommendation">
              <strong>Actionable Fix:</strong> {t.recommendation}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
