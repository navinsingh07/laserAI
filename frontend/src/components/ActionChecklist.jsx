import React, { useState } from 'react';
import { CheckSquare } from 'lucide-react';

export default function ActionChecklist({ items }) {
  if (!items || items.length === 0) return null;

  const [completed, setCompleted] = useState({});

  const toggleItem = (idx) => {
    setCompleted((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  return (
    <div className="checklist-card">
      <div className="card-header">
        <CheckSquare size={15} />
        <span>Executive Action Checklist</span>
      </div>

      <div className="checklist-items">
        {items.map((item, idx) => {
          const isDone = completed[idx];
          return (
            <label key={idx} className="check-item" style={{ cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={Boolean(isDone)}
                onChange={() => toggleItem(idx)}
              />
              <span className={`check-text ${isDone ? 'completed' : ''}`}>
                {item}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
