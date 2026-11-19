import React, { useState, useRef } from 'react';
import {
  Zap,
  Mail,
  Slack,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  CheckCircle2,
  Shield,
  Sparkles,
  FileSpreadsheet,
  UploadCloud,
  Check,
  AlertCircle
} from 'lucide-react';

export default function OnboardingScreen({
  user,
  loadingDigest,
  onCompleteOnboarding,
  onBackToLanding,
  onBackToDashboard,
  isSwitchingRole,
}) {
  // Empty inputs with placeholders by default (no dummy pre-filled values)
  const isDefaultDummy = (val) => !val || val === 'Alex Morgan' || val === 'Team Member' || (typeof val === 'string' && val.includes('@laserai.demo'));
  const [name, setName] = useState(isDefaultDummy(user.name) ? '' : user.name);
  const [email, setEmail] = useState(isDefaultDummy(user.email) ? '' : user.email);
  const [error, setError] = useState('');
  const [slackWebhook, setSlackWebhook] = useState(user.slack_webhook_url || '');
  const [frequency, setFrequency] = useState(user.digest_frequency === 'Weekly' ? 'Weekly' : 'Daily');
  const [role, setRole] = useState(
    ['Founder', 'PMs', 'Engineers', 'Sales'].includes(user.role)
      ? user.role
      : 'Founder'
  );
  const [datasetType, setDatasetType] = useState('default'); // 'default' | 'custom'
  const [customFile, setCustomFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setCustomFile(file);
      setDatasetType('custom');
    }
  };

  const roleDescriptions = {
    Founder: 'Full product visibility across all 150 customer reviews, company-wide sentiment trajectory, cross-module workflow friction, and top feature requests.',
    Founders: 'Full product visibility across all 150 customer reviews, company-wide sentiment trajectory, cross-module workflow friction, and top feature requests.',
    PMs: 'Full product visibility across all 150 reviews organized by feature requests, UX friction points, and user workflow prioritization.',
    Engineers: 'Strictly engineering-related reviews only (bug crashes, iOS UIKit errors, 504 worker timeouts, API sync failures). Hides all sales and non-technical feedback.',
    Sales: 'Strictly sales-related reviews only (enterprise procurement blockers, Okta/SAML SSO compliance, competitor comparisons, and seat requests). Hides all technical bugs.'
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cleanName = name.trim();
    const cleanEmail = email.trim();

    if (!cleanName) {
      setError('Full Name is required. Please enter your name to continue.');
      return;
    }

    if (!cleanEmail) {
      setError('Email address is required. Please enter your email to continue.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      setError('Please enter a valid email address (e.g. you@company.com).');
      return;
    }

    setError('');
    setIsSubmitting(true);
    try {
      await onCompleteOnboarding({
        name: cleanName,
        email: cleanEmail,
        slack_webhook_url: slackWebhook.trim(),
        digest_frequency: frequency,
        role,
        customFile: datasetType === 'custom' ? customFile : null,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-indigo-600 selection:text-white flex flex-col relative">

      {/* ========================================================================= */}
      {/* WAITING SCREEN OVERLAY (While Laser AI / Gemini processes real-time data) */}
      {/* ========================================================================= */}
      {(isSubmitting || loadingDigest) && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl border border-slate-100 flex flex-col items-center text-center space-y-4">
            <div className="relative flex items-center justify-center">
              <div className="w-16 h-16 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg">
                <Zap size={30} className="fill-current animate-bounce" />
              </div>
              <div className="absolute -inset-2.5 rounded-3xl border-3 border-indigo-200 border-t-indigo-600 animate-spin" />
            </div>
            <div className="space-y-1.5 pt-1">
              <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
                Wait... Laser AI is working
              </h3>
              <p className="text-xs font-bold text-indigo-600 animate-pulse">
                {customFile ? `Ingesting ${customFile.name} & tailoring ${role} scope...` : `Fetching real-time data & tailoring ${role} scope...`}
              </p>
              <p className="text-[11px] text-slate-400 leading-relaxed pt-1">
                {customFile ? 'Normalizing columns & synthesizing role intelligence' : 'Ingesting 150 Google Sheet rows & synthesizing role intelligence'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TOP LASER AI HEADER BAR */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-6 sm:px-10 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {(onBackToDashboard || onBackToLanding) && (
            <button
              type="button"
              onClick={isSwitchingRole ? onBackToDashboard : onBackToLanding}
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 shadow-xs mr-2 cursor-pointer"
              title={isSwitchingRole ? "Back to Dashboard" : "Back to Webpage"}
            >
              <ArrowLeft size={14} />
              <span>{isSwitchingRole ? "Back to Dashboard" : "Back to Webpage"}</span>
            </button>
          )}
          <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-black shadow-xs">
            <Zap size={18} className="fill-current" />
          </div>
          <div className="flex items-center">
            <span className="font-extrabold text-base tracking-tight text-slate-900">
              Laser AI
            </span>
            <span className="ml-2.5 text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full border border-slate-200 hidden sm:inline-block">
              {isSwitchingRole ? "Role Switch" : "Intelligence Setup"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs font-semibold text-slate-500">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="hidden sm:inline">Google Sheet Connected</span>
          <span className="text-slate-300">•</span>
          <span className="text-indigo-600 font-bold">{isSwitchingRole ? "Switch Mode" : "Step 2 of 3"}</span>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* MAIN ONBOARDING FORM PAGE CONTENT */}
      {/* ========================================================================= */}
      <main className="flex-1 max-w-2xl w-full mx-auto px-6 py-8 sm:py-12 space-y-6">

        {/* Page Title & Mission Subtitle */}
        <div className="text-center space-y-2.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold uppercase tracking-wider shadow-xs">
            <Sparkles size={13} className="text-indigo-600" />
            <span>{isSwitchingRole ? "Role Reconfiguration" : "Profile & Role-Based Routing"}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {isSwitchingRole ? "Switch Your Intelligence Role" : "Configure Your Intelligence Routing"}
          </h1>
          <p className="text-sm text-slate-500 max-w-lg mx-auto leading-relaxed">
            {isSwitchingRole
              ? "Select a new role scope to dynamically synthesize role-isolated customer intelligence and filtered feedback."
              : "Laser AI reads raw customer feedback from Google Sheets and automatically synthesizes role-scoped product digests delivered to your inbox and Slack."}
          </p>
        </div>

        {/* Validation Error Banner */}
        {error && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2.5 shadow-xs">
            <AlertCircle size={16} className="text-rose-600 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Clean, Full-Page Form Container */}
        <form onSubmit={handleSubmit} className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-10 shadow-sm space-y-7">

          {/* Section 1: Name and Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Full Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (error) setError('');
                }}
                placeholder="Enter your full name"
                className={`w-full bg-slate-50 border rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none transition-colors ${
                  !name.trim() && error ? 'border-rose-400 ring-1 ring-rose-300' : 'border-slate-300 focus:border-indigo-600'
                }`}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Email <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="you@company.com"
                  className={`w-full bg-slate-50 border rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none transition-colors ${
                    !email.trim() && error ? 'border-rose-400 ring-1 ring-rose-300' : 'border-slate-300 focus:border-indigo-600'
                  }`}
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

          {/* Section 3: Customer Feedback Dataset (Default or Upload CSV/Excel) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Customer Feedback Dataset (CSV / Excel)
              </label>
              <span className="text-[11px] font-semibold text-slate-500">
                {datasetType === 'default' ? '150 Reviews Pre-loaded' : customFile?.name}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Option 1: Default Google Sheet */}
              <button
                type="button"
                onClick={() => setDatasetType('default')}
                className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between ${datasetType === 'default'
                  ? 'border-indigo-600 bg-indigo-50/60 shadow-xs ring-1 ring-indigo-600/20'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                  }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${datasetType === 'default' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
                      }`}>
                      <FileSpreadsheet size={15} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">Default Dataset</div>
                      <div className="text-[10px] text-slate-400">Connected Google Sheet</div>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    150 Rows
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Pre-configured customer feedback dataset ready for instant AI role segregation.
                </p>
              </button>

              {/* Option 2: Upload Custom CSV / Excel */}
              <div
                onClick={() => {
                  if (!customFile) {
                    fileInputRef.current?.click();
                  } else {
                    setDatasetType('custom');
                  }
                }}
                className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between cursor-pointer ${datasetType === 'custom'
                  ? 'border-indigo-600 bg-indigo-50/60 shadow-xs ring-1 ring-indigo-600/20'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                  }`}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".csv, .xlsx, .xls, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                  className="hidden"
                />

                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${datasetType === 'custom' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
                      }`}>
                      <UploadCloud size={15} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">
                        {customFile ? 'Custom File Attached' : 'Upload CSV / Excel'}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {customFile ? `${(customFile.size / 1024).toFixed(1)} KB` : '.csv, .xlsx, or .xls'}
                      </div>
                    </div>
                  </div>
                  {customFile ? (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-100 text-indigo-700 border border-indigo-200 flex items-center gap-1">
                      <Check size={10} />
                      Attached
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200">
                      Optional
                    </span>
                  )}
                </div>

                {customFile ? (
                  <div className="flex items-center justify-between pt-1">
                    <p className="text-[11px] font-medium text-slate-700 truncate max-w-[170px]" title={customFile.name}>
                      {customFile.name}
                    </p>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        fileInputRef.current?.click();
                      }}
                      className="text-[10px] font-bold text-indigo-600 hover:text-indigo-800 underline"
                    >
                      Change
                    </button>
                  </div>
                ) : (
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Upload your own feedback file. Laser AI will normalize and filter it by role.
                  </p>
                )}
              </div>
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
                  className={`py-2.5 px-4 rounded-xl text-xs font-bold transition-all border ${frequency === freq
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-100'
                    }`}
                >
                  {freq}
                </button>
              ))}
            </div>
          </div>

          {/* Section 4: Optional Slack Destination */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Optional Slack Member ID or Webhook URL
            </label>
            <div className="relative">
              <input
                type="text"
                value={slackWebhook}
                onChange={(e) => setSlackWebhook(e.target.value)}
                placeholder="e.g. U0CK7UEJC1X or https://hooks.slack.com/..."
                className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-indigo-600 transition-colors"
              />
              <Slack size={16} className="absolute left-3.5 top-3 text-slate-400" />
            </div>
            <p className="text-[11px] text-slate-400">
              Enter your Slack Member ID (e.g. U0CK7UEJC1X) or Incoming Webhook URL to receive live Block Kit digests.
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
              disabled={isSubmitting || loadingDigest}
              className="px-8 py-3 rounded-xl font-bold text-sm bg-indigo-600 hover:bg-indigo-700 disabled:opacity-75 text-white transition-all shadow-sm flex items-center gap-2 group cursor-pointer"
            >
              <span>
                {isSubmitting || loadingDigest
                  ? 'Wait... Laser AI is working'
                  : isSwitchingRole
                  ? 'Apply Role & Go to Dashboard'
                  : 'Go to Dashboard'}
              </span>
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
