import React, { useState } from 'react';
import {
  ArrowLeft,
  Send,
  Mail,
  Slack,
  CheckCircle2,
  AlertCircle,
  Copy,
  Eye,
  Zap,
  Clock,
  Sparkles,
  Users,
  Star,
  Share2,
  Sliders,
  Settings,
  ShieldCheck
} from 'lucide-react';
import { PERSONAS } from '../../services/api';

export default function DigestPreviewScreen({
  user,
  digest,
  onBackToDashboard,
  onSwitchRoleToOnboarding,
  onDispatch,
  dispatchResult,
  dispatching
}) {
  const [activeTab, setActiveTab] = useState('email'); // 'email' | 'slack'
  const [customEmail, setCustomEmail] = useState(user.email || '');
  const [customWebhook, setCustomWebhook] = useState(user.slack_webhook_url || '');

  React.useEffect(() => {
    setCustomEmail(user.email || '');
    setCustomWebhook(user.slack_webhook_url || '');
  }, [user]);

  const handleSendNow = () => {
    onDispatch({
      recipientEmail: customEmail,
      slackWebhookUrl: customWebhook,
    });
  };

  const currentPersona = PERSONAS[user.role] || PERSONAS['Founders'] || PERSONAS['Founder'];
  const RoleIcon = (user.role === 'PMs' || user.role === 'Review Section PM') ? Star : user.role === 'Engineers' ? Share2 : Users;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EDE8F8] via-[#F4EFFB] to-[#FCE7F3] p-2 sm:p-4 md:p-6 flex items-center justify-center font-sans selection:bg-indigo-500 selection:text-white">
      <div className="w-full max-w-[1550px] min-h-[92vh] bg-white rounded-2xl md:rounded-3xl shadow-2xl border border-white/60 overflow-hidden flex flex-col">
        {/* Top Header */}
        <header className="border-b border-slate-200 bg-white/90 backdrop-blur-md sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={onBackToDashboard}
                className="flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50"
              >
                <ArrowLeft size={14} />
                <span>Back to Dashboard</span>
              </button>

              <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-slate-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                <span className="text-xs font-medium text-slate-600">
                  Active Scoped Digest: <strong className="text-slate-900">{user.role}</strong>
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* View Selector Tabs */}
              <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
                <button
                  onClick={() => setActiveTab('email')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${activeTab === 'email'
                    ? 'bg-white text-indigo-600 shadow-sm border border-slate-200/80 font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                    }`}
                >
                  <Mail size={13} />
                  <span>Email Digest</span>
                </button>
                <button
                  onClick={() => setActiveTab('slack')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${activeTab === 'slack'
                    ? 'bg-white text-slate-900 shadow-sm border border-slate-200/80 font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                    }`}
                >
                  <Slack size={13} />
                  <span>Slack Block Kit</span>
                </button>
              </div>

              {/* Re-configure Role Button (Founders and PMs only) */}
              {['Founder', 'Founders', 'PMs', 'PM'].includes(user.role) && onSwitchRoleToOnboarding && (
                <button
                  onClick={onSwitchRoleToOnboarding}
                  className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-all"
                  title="Return to Onboarding to change role or settings"
                >
                  <Settings size={13} className="text-slate-500" />
                  <span className="hidden md:inline">Re-configure Role</span>
                </button>
              )}
            </div>
          </div>
        </header>

        {/* Main Grid */}
        <main className="max-w-7xl mx-auto px-6 py-8 flex-1 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 overflow-auto">

          {/* Left Column: Live Preview Render (8 cols) */}
          <div className="lg:col-span-8 flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                <Eye size={14} className="text-indigo-600" />
                <span>Exact Live Digest Preview ({activeTab.toUpperCase()}) — Strictly Scoped: {user.role}</span>
              </div>
              <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                <CheckCircle2 size={12} />
                Unified Output Guaranteed
              </span>
            </div>

            {/* Email Tab View */}
            {activeTab === 'email' && (
              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex-1 flex flex-col">
                {/* Fake Email Client Chrome */}
                <div className="px-6 py-3 bg-slate-100/80 border-b border-slate-200 flex items-center justify-between text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-400 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
                    <span className="ml-2 font-mono text-[11px] text-slate-600 font-medium">
                      Subject: 🎯 Laser AI — {user.role} Digest
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500">To: {customEmail || user.email}</span>
                </div>

                {/* Email Content Container */}
                <div className="p-6 overflow-auto max-h-[700px] bg-slate-50">
                  <div className="max-w-2xl mx-auto bg-white text-slate-900 rounded-xl overflow-hidden shadow-sm border border-slate-200">
                    {/* Email Banner */}
                    <div className="bg-slate-900 p-6 text-white">
                      <div className="text-[10px] font-extrabold tracking-widest uppercase text-indigo-400 mb-1">
                        Laser AI Feedback Intelligence
                      </div>
                      <h2 className="text-xl font-extrabold text-white">
                        {digest?.role || user.role} Product Digest
                      </h2>
                      <div className="text-xs text-slate-400 mt-1">
                        {digest?.generated_at} • Scoped strictly for {user.role} ({currentPersona.name})
                      </div>
                    </div>

                    <div className="p-6 bg-slate-50 space-y-6">
                      {/* Executive Summary */}
                      <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
                        <div className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider mb-1">
                          Executive Summary
                        </div>
                        <p className="text-xs text-slate-700 leading-relaxed font-medium">
                          {digest?.executive_summary}
                        </p>
                      </div>

                      {/* Metrics */}
                      <div className="grid grid-cols-3 gap-3">
                        {(digest?.metrics || []).map((m, i) => (
                          <div key={i} className="bg-white p-3 rounded-lg border border-slate-200 text-center shadow-xs">
                            <div className="text-[10px] uppercase text-slate-500 font-bold">{m.label}</div>
                            <div className="text-lg font-black text-slate-900">{m.value}</div>
                            <div className="text-[10px] font-semibold text-indigo-600">{m.change}</div>
                          </div>
                        ))}
                      </div>

                      {/* Urgent Bugs / Blockers */}
                      <div>
                        <h4 className="text-xs font-extrabold uppercase tracking-wider text-rose-600 mb-2">
                          {(user.role === 'Founders' || user.role === 'Founder') ? '🚨 Top User Pain Points & Blockers' : user.role === 'Engineers' ? '🚨 Critical Bugs & Latency Fixes' : user.role === 'Sales' ? '🚨 Top Deal Blockers & Governance' : '🚨 Urgent Module Bugs & Friction'}
                        </h4>
                        <div className="space-y-2">
                          {(digest?.urgent_bugs || []).map((b) => (
                            <div key={b.id} className="bg-white p-3 rounded-lg border-l-4 border-rose-500 border border-slate-200 text-xs shadow-xs">
                              <div className="font-bold text-slate-900 mb-1">{b.title}</div>
                              <div className="text-slate-600 italic mb-1 bg-slate-50 p-2 rounded border border-slate-100">
                                "{b.evidence_quote}"
                              </div>
                              <div className="text-slate-800"><strong>Action:</strong> {b.suggested_action}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Feature Requests */}
                      <div>
                        <h4 className="text-xs font-extrabold uppercase tracking-wider text-indigo-600 mb-2">
                          {(user.role === 'Founders' || user.role === 'Founder') ? '💡 Top Feature Requests & Enhancements' : user.role === 'Engineers' ? '💡 Infrastructure & Performance Requests' : user.role === 'Sales' ? '💡 Requested Enterprise Features' : '💡 Top Scoped Feature Demands'}
                        </h4>
                        <div className="space-y-2">
                          {(digest?.top_feature_requests || []).map((f) => (
                            <div key={f.id} className="bg-white p-3 rounded-lg border-l-4 border-indigo-500 border border-slate-200 text-xs shadow-xs">
                              <div className="font-bold text-slate-900 mb-0.5">{f.title} ({f.requested_by})</div>
                              <div className="text-slate-600 mb-1"><strong>Impact:</strong> {f.business_impact}</div>
                              <div className="text-slate-800"><strong>Recommendation:</strong> {f.recommendation}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Checklist */}
                      <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
                        <div className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                          Immediate Action Checklist
                        </div>
                        <ul className="text-xs space-y-1.5 text-slate-700 pl-4 list-disc">
                          {(digest?.action_checklist || []).map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-100 text-center text-[10px] text-slate-500 border-t border-slate-200 font-medium">
                      Laser AI Automated Feedback Intelligence • Delivered strictly for {user.role}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Slack Tab View */}
            {activeTab === 'slack' && (
              <div className="bg-[#1A1D21] border border-slate-800 rounded-2xl overflow-hidden shadow-sm flex-1 flex flex-col">
                {/* Simulated Slack Channel Bar */}
                <div className="px-6 py-3 bg-[#121016] border-b border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white"># product-intelligence-feed</span>
                    <span className="text-[11px] text-slate-500">| Laser AI Slack Bot</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px]">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>APP</span>
                  </div>
                </div>

                {/* Simulated Slack Message */}
                <div className="p-6 overflow-auto max-h-[700px] space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center shrink-0 text-white font-bold text-sm shadow">
                      ⚡
                    </div>
                    <div className="flex-1 space-y-3">
                      <div className="flex items-baseline gap-2">
                        <span className="font-bold text-white text-sm">Laser AI Bot</span>
                        <span className="text-[10px] uppercase font-bold px-1.5 py-0.2 rounded bg-slate-800 text-slate-400">
                          APP
                        </span>
                        <span className="text-xs text-slate-500">Today at {digest?.generated_at?.split('•')[1] || '12:00'}</span>
                      </div>

                      {/* Slack Block Kit Message Box */}
                      <div className="p-4 rounded-lg bg-[#222529] border border-slate-700/60 text-xs space-y-3 font-sans">
                        <div className="font-bold text-base text-white">
                          {(user.role === 'Founders' || user.role === 'Founder') ? '👑' : (user.role === 'PMs' || user.role === 'Review Section PM') ? '📊' : user.role === 'Engineers' ? '⚙️' : user.role === 'Sales' ? '💼' : '🔗'} Laser AI — {digest?.role || user.role} Digest
                        </div>
                        <div className="text-slate-400 text-[11px]">
                          📊 Analyzed Scope: {user.role} | Recipient: {currentPersona.name} | Sentiment: {digest?.sentiment?.overall}
                        </div>
                        <hr className="border-slate-700" />

                        <div className="text-slate-200 leading-relaxed">
                          <strong className="text-white block mb-1">Executive Summary:</strong>
                          {digest?.executive_summary}
                        </div>

                        <hr className="border-slate-700" />
                        <div>
                          <strong className="text-rose-400 block mb-2">
                            {(user.role === 'Founders' || user.role === 'Founder') ? '🚨 Top User Pain Points & Blockers:' : user.role === 'Engineers' ? '🚨 Critical Bugs & Timeouts:' : user.role === 'Sales' ? '🚨 Top Deal Blockers:' : '🚨 Urgent Scoped Module Bugs:'}
                          </strong>
                          {(digest?.urgent_bugs || []).map((b) => (
                            <div key={b.id} className="mb-2 pl-2 border-l-2 border-rose-500 text-slate-300">
                              • <strong>[{b.severity}] {b.title}</strong> ({b.affected_cohort})<br />
                              <em className="text-slate-400">"{b.evidence_quote}"</em><br />
                              👉 Fix: {b.suggested_action}
                            </div>
                          ))}
                        </div>

                        <hr className="border-slate-700" />
                        <div>
                          <strong className="text-white block mb-1">Action Items:</strong>
                          {(digest?.action_checklist || []).map((a, i) => (
                            <div key={i} className="text-slate-300">• [ ] {a}</div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Instant Dispatch Action Panel (4 cols) */}
          <div className="lg:col-span-4 flex flex-col space-y-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-bold uppercase tracking-wider mb-2">
                  <Zap size={12} />
                  <span>Instant Multi-Channel Dispatch</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900">Send Digest Now</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Fires the strictly scoped <strong className="text-slate-900">{user.role}</strong> digest to your configured Gmail and Slack channels.
                </p>
              </div>

              {/* Recipient Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center justify-between">
                  <span>Destination Email</span>
                  <span className="text-[10px] text-slate-400">Gmail / SMTP</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={customEmail}
                    onChange={(e) => setCustomEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-indigo-500 transition-colors"
                    placeholder="alex.founder@laserai.demo"
                  />
                  <Mail size={14} className="absolute left-3 top-2.5 text-slate-400" />
                </div>
              </div>

              {/* Slack Webhook */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center justify-between">
                  <span>Slack Webhook URL</span>
                  <span className="text-[10px] text-slate-400">Incoming Webhook</span>
                </label>
                <div className="relative">
                  <input
                    type="url"
                    value={customWebhook}
                    onChange={(e) => setCustomWebhook(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-indigo-500 transition-colors"
                    placeholder="https://hooks.slack.com/services/..."
                  />
                  <Slack size={14} className="absolute left-3 top-2.5 text-slate-400" />
                </div>
              </div>

              {/* Send Button */}
              <button
                onClick={handleSendNow}
                disabled={dispatching}
                className="w-full py-3.5 rounded-xl font-bold text-sm bg-indigo-600 hover:bg-indigo-700 text-white transition-all shadow-sm flex items-center justify-center gap-2 group disabled:opacity-60"
              >
                <Send size={15} className={dispatching ? 'animate-bounce' : 'group-hover:translate-x-0.5 transition-transform'} />
                <span>{dispatching ? 'Dispatching Digest...' : `Send ${user.role} Digest Now`}</span>
              </button>
            </div>

            {/* Delivery Result Banner */}
            {dispatchResult && (
              <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-3 shadow-xs">
                <div className="flex items-center gap-2 font-bold text-xs text-emerald-700">
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                  <span>Digest Successfully Dispatched!</span>
                </div>
                <div className="text-xs space-y-1.5 text-slate-700">
                  <div className="flex items-start gap-1.5">
                    <span className="text-emerald-600">•</span>
                    <span>{dispatchResult.email_message}</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <span className="text-emerald-600">•</span>
                    <span>{dispatchResult.slack_message}</span>
                  </div>
                </div>
                <div className="text-[10px] text-slate-500 pt-2 border-t border-emerald-200/60 font-mono">
                  Timestamp: {dispatchResult.timestamp}
                </div>
              </div>
            )}

            {/* Scoped Isolation Confirmation Note */}
            <div className="p-4 rounded-xl bg-white border border-slate-200 text-xs text-slate-600 space-y-1.5 shadow-xs">
              <div className="font-semibold text-slate-800 flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-indigo-600" />
                <span>Strict Role Isolation Guarantee</span>
              </div>
              <p className="text-[11px] leading-relaxed text-slate-500">
                This digest is filtered exclusively for the <strong className="text-slate-800">{user.role}</strong> scope. To test digests for another role, click <strong>Re-configure Role</strong> in the header.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
