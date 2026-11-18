import React, { useState } from 'react';
import { X, Slack, Mail, User, CheckCircle2 } from 'lucide-react';

export default function NotificationModal({ isOpen, onClose, user, onSave }) {
  if (!isOpen) return null;

  const [name, setName] = useState(user.name || '');
  const [email, setEmail] = useState(user.notification_email || user.email || '');
  const [webhook, setWebhook] = useState(user.slack_webhook_url || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      name,
      notification_email: email,
      slack_webhook_url: webhook,
    });
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 900);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Notification & Role Settings</h3>
          <button className="close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>
              <User size={13} style={{ display: 'inline', marginRight: 6 }} />
              Full Name (Mock Google SSO)
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Alex Morgan"
            />
          </div>

          <div className="form-group">
            <label>
              <Mail size={13} style={{ display: 'inline', marginRight: 6 }} />
              Digest Notification Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alex.product@laserai.internal"
            />
            <div className="hint">
              Laser AI dispatches the exact role digest HTML template to this address upon generation.
            </div>
          </div>

          <div className="form-group">
            <label>
              <Slack size={13} style={{ display: 'inline', marginRight: 6 }} />
              Slack Incoming Webhook URL
            </label>
            <input
              type="url"
              value={webhook}
              onChange={(e) => setWebhook(e.target.value)}
              placeholder="https://hooks.slack.com/services/T000/B000/XXXX"
            />
            <div className="hint">
              Leave blank to use prototype simulated dispatch or paste your real Slack webhook URL.
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="save-btn">
              {savedSuccess ? 'Saved!' : 'Save Preferences'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
