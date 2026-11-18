import React, { useState } from 'react';
import { Zap, Mail, Slack, ArrowRight, ChevronDown, CheckCircle2, Shield, Sparkles } from 'lucide-react';

export default function OnboardingScreen({ user, onCompleteOnboarding }) {
  // Empty inputs with placeholders by default (no pre-filled values)
  const [name, setName] = useState(user.name && user.name !== 'Alex Morgan' ? user.name : '');
  const [email, setEmail] = useState(user.email && user.email !== 'alex.founder@laserai.demo' ? user.email : '');
  const [slackWebhook, setSlackWebhook] = useState(user.slack_webhook_url || '');
  const [frequency, setFrequency] = useState(user.digest_frequency === 'Weekly' ? 'Weekly' : 'Daily');
  const [role, setRole] = useState(
    ['Founder', 'PMs', 'Engineers', 'Sales'].includes(user.role) 
      ? user.role 
      : 'Founder'
  );

  const roleDescriptions = {
    Founder: 'Full product visibility across all 150 customer reviews, company-wide sentiment trajectory, cross-module workflow friction, and top feature requests.',
    Founders: 'Full product visibility across all 150 customer reviews, company-wide sentiment trajectory, cross-module workflow friction, and top feature requests.',
    PMs: 'Full product visibility across all 150 reviews organized by feature requests, UX friction points, and user workflow prioritization.',
    Engineers: 'Strictly engineering-related reviews only (bug crashes, iOS UIKit errors, 504 worker timeouts, API sync failures). Hides all sales and non-technical feedback.',
    Sales: 'Strictly sales-related reviews only (enterprise procurement blockers, Okta/SAML SSO compliance, competitor comparisons, and seat requests). Hides all technical bugs.'
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCompleteOnboarding({
      name: name.trim() || 'Team Member',
      email: email.trim() || '',
      slack_webhook_url: slackWebhook.trim(),
      digest_frequency: frequency,
      role,
    });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-indigo-600 selection:text-white flex flex-col">
      
      {/* ========================================================================= */}
      {/* TOP LASER AI HEADER BAR */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-6 sm:px-10 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-black shadow-xs">
            <Zap size={18} className="fill-current" />
          </div>
          <div className="flex items-center">
            <span className="font-extrabold text-base tracking-tight text-slate-900">
              Laser AI
            </span>
            <span className="ml-2.5 text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full border border-slate-200 hidden sm:inline-block">
              Intelligence Setup
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs font-semibold text-slate-500">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="hidden sm:inline">Google Sheet Connected</span>
          <span className="text-slate-300">•</span>
          <span className="text-indigo-600 font-bold">Step 2 of 3</span>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* MAIN ONBOARDING FORM PAGE CONTENT */}
      {/* ========================================================================= */}
      <main className="flex-1 max-w-2xl w-full mx-auto px-6 py-10 sm:py-16 space-y-8">
        
        {/* Page Title & Mission Subtitle */}
        <div className="text-center space-y-2.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold uppercase tracking-wider shadow-xs">
            <Sparkles size={13} className="text-indigo-600" />
            <span>Profile & Role-Based Routing</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Configure Your Intelligence Routing
          </h1>
          <p className="text-sm text-slate-500 max-w-lg mx-auto leading-relaxed">
            Laser AI reads raw customer feedback from Google Sheets and automatically synthesizes role-scoped product digests delivered to your inbox and Slack.
          </p>
        </div>

        {/* Clean, Full-Page Form Container */}
        <form onSubmit={handleSubmit} className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-10 shadow-sm space-y-7">
          
          {/* Section 1: Name and Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-indigo-600 transition-colors"
              />
            </div>

            {/* Digest Notification Email */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Digest Notification Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-indigo-600 transition-colors"
                />
                <Mail size={16} className="absolute left-3.5 top-3 text-slate-400" />
              </div>
            </div>
          </div>

          {/* Section 2: Role Selection Dropdown (Replacing large persona cards) */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Select Your Role
            </label>
            <div className="relative">
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:border-indigo-600 transition-colors appearance-none cursor-pointer pr-10 shadow-xs"
              >
                <option value="Founder">Founder</option>
                <option value="PMs">PMs</option>
                <option value="Engineers">Engineers</option>
                <option value="Sales">Sales</option>
              </select>
              <ChevronDown size={17} className="absolute right-4 top-3.5 text-slate-400 pointer-events-none" />
            </div>

            {/* Dynamic Role Scope Subtitle */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 text-xs text-slate-600 leading-relaxed flex items-start gap-2">
              <span className="font-bold text-indigo-600 shrink-0">Scoped Focus:</span>
              <span>{roleDescriptions[role]}</span>
            </div>
          </div>

          {/* Section 3: Digest Frequency (Daily & Weekly Only, No Instant Demo) */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Digest Frequency
            </label>
            <div className="grid grid-cols-2 gap-3">
              {['Daily', 'Weekly'].map((freq) => (
                <button
                  key={freq}
                  type="button"
                  onClick={() => setFrequency(freq)}
                  className={`py-2.5 px-4 rounded-xl text-xs font-bold transition-all border ${
                    frequency === freq
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  {freq}
                </button>
              ))}
            </div>
          </div>

          {/* Section 4: Optional Slack Webhook */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Optional Slack Webhook URL
            </label>
            <div className="relative">
              <input
                type="url"
                value={slackWebhook}
                onChange={(e) => setSlackWebhook(e.target.value)}
                placeholder="https://hooks.slack.com/services/..."
                className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-indigo-600 transition-colors"
              />
              <Slack size={16} className="absolute left-3.5 top-3 text-slate-400" />
            </div>
            <p className="text-[11px] text-slate-400">
              Leave blank for simulated delivery or paste your real webhook to see live Block Kit notifications.
            </p>
          </div>

          {/* Submit Action */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <CheckCircle2 size={14} className="text-emerald-600" />
              <span>Strict Role Isolation Enforced</span>
            </div>

            <button
              type="submit"
              className="px-8 py-3 rounded-xl font-bold text-sm bg-indigo-600 hover:bg-indigo-700 text-white transition-all shadow-sm flex items-center gap-2 group"
            >
              <span>Launch Role Dashboard</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </form>

      </main>

      {/* Global Minimal Footer */}
      <footer className="border-t border-slate-200/80 bg-white py-6 px-6 text-center text-xs text-slate-400">
        Laser AI • Automated Role-Segregated Customer Feedback Intelligence
      </footer>

    </div>
  );
}
