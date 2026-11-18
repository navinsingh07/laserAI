import React, { useState } from 'react';
import { Table, Search, Filter, ExternalLink } from 'lucide-react';

export default function FeedbackTable({ feedbackItems, currentRole }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const categories = ['ALL', ...new Set((feedbackItems || []).map((it) => it.category))];

  const filtered = (feedbackItems || []).filter((item) => {
    const matchesSearch =
      item.feedback_text.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.customer_id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'ALL' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="feedback-explorer">
      <div className="explorer-top">
        <div className="explorer-title">
          <Table size={16} />
          <span>Ingested Customer Feedback (Google Sheet Records)</span>
        </div>

        <div className="explorer-filters">
          <div className="search-box">
            <Search size={14} color="#94a3b8" />
            <input
              type="text"
              placeholder="Search comments or IDs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            className="filter-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                Category: {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>{currentRole} Relevance</th>
              <th>Customer ID</th>
              <th>Tier</th>
              <th>Rating</th>
              <th>Category</th>
              <th>Channel</th>
              <th>Verbatim Feedback</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((row, idx) => {
              const relevance = row.role_relevance_score || 0.5;
              const isHigh = relevance >= 0.8;
              return (
                <tr key={idx}>
                  <td>
                    <span className={`score-badge ${isHigh ? 'score-high' : 'score-med'}`}>
                      {Math.round(relevance * 100)}% Match
                    </span>
                  </td>
                  <td>
                    <code>{row.customer_id}</code>
                  </td>
                  <td>{row.customer_tier}</td>
                  <td>
                    <span className="rating-pill">{'★'.repeat(row.rating_score)}</span>
                  </td>
                  <td>
                    <span style={{ color: '#cbd5e1' }}>{row.category}</span>
                  </td>
                  <td>{row.channel}</td>
                  <td className="feedback-body">"{row.feedback_text}"</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
