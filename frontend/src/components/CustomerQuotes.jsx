import React from 'react';
import { MessageSquareQuote, Star } from 'lucide-react';

export default function CustomerQuotes({ quotes }) {
  if (!quotes || quotes.length === 0) return null;

  return (
    <div className="quotes-card">
      <div className="card-header">
        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <MessageSquareQuote size={15} /> Voice of Customer Verbatim
        </span>
      </div>

      <div className="quotes-container">
        {quotes.map((q, idx) => (
          <div key={idx} className="quote-bubble">
            <div className="quote-text">"{q.quote}"</div>
            <div className="quote-meta">
              <span>{q.customer_id} • via {q.channel || 'Direct Feedback'}</span>
              <div className="stars-row" style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={11}
                    fill={i < q.rating ? '#fbbf24' : 'none'}
                    color={i < q.rating ? '#fbbf24' : '#4b5563'}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
