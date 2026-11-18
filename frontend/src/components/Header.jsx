import React from 'react';
import { Zap, Bell, Shield, Smartphone, Share2, Settings } from 'lucide-react';

export default function Header({ user, onRoleChange, onOpenSettings }) {
  const roles = [
    { id: 'Founder', label: 'Founder', icon: Shield, activeClass: 'active-founder' },
    { id: 'Review PM', label: 'Review PM', icon: Smartphone, activeClass: 'active-review' },
    { id: 'Sharing PM', label: 'Sharing PM', icon: Share2, activeClass: 'active-sharing' },
  ];

  return (
    <header className="top-header">
      <div className="brand-area">
        <div className="logo-icon">
          <Zap size={22} />
        </div>
        <div className="brand-title">
          Laser AI <span>Feedback Intelligence</span>
        </div>
      </div>

      {/* Role Switcher Pills */}
      <div className="role-pills-container">
        {roles.map((r) => {
          const Icon = r.icon;
          const isActive = user.role === r.id;
          return (
            <button
              key={r.id}
              className={`role-pill-btn ${isActive ? r.activeClass : ''}`}
              onClick={() => onRoleChange(r.id)}
            >
              <Icon size={14} />
              {r.label}
            </button>
          );
        })}
      </div>

      {/* User & Settings */}
      <div className="user-menu">
        <button className="settings-btn" onClick={onOpenSettings} title="Notification & Webhook Settings">
          <Settings size={15} />
          <span>Alerts</span>
          {(user.slack_webhook_url || user.notification_email) && <span className="badge-dot" />}
        </button>

        <div className="user-profile-btn" onClick={onOpenSettings}>
          <img src={user.avatar_url} alt={user.name} className="avatar-img" />
          <span className="user-name">{user.name}</span>
        </div>
      </div>
    </header>
  );
}
