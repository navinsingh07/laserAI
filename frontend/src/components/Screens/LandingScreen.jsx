import React, { useState } from 'react';
import {
  ArrowRight,
  Zap,
  Sparkles,
  Users,
  Star,
  Share2,
  CheckCircle2,
  FileSpreadsheet,
  Mail,
  Slack,
  Layers,
  Clock,
  Send,
  TrendingDown,
  TrendingUp,
  AlertCircle,
  BarChart3,
  Check,
  ChevronRight,
  ChevronDown,
  Filter,
  Eye,
  Sliders,
  ShieldCheck,
  MessageSquare,
  Search,
  Plus,
  Home,
  Database,
  GripVertical,
  MoreHorizontal,
  Tag,
  Calendar,
  User,
  Folder,
  LayoutGrid,
  List,
  X,
  ArrowLeft,
  PanelLeft,
  Shield,
  Rocket,
  LayoutDashboard,
  Settings,
  LogOut,
  UserCheck,
  RefreshCw,
  Table2,
  UploadCloud
} from 'lucide-react';

export default function LandingScreen({ onStartDemo }) {
  // State for Hero Section Real Laser AI Dashboard Preview (100% Matching Real Dashboard)
  const [heroRole, setHeroRole] = useState('Founder'); // 'Founder' | 'PMs' | 'Engineers' | 'Sales'
  const [heroNav, setHeroNav] = useState('insights'); // 'insights' | 'raw' | 'preview'
  const [heroRawScope, setHeroRawScope] = useState('scoped'); // 'scoped' | 'all'
  const [heroSearch, setHeroSearch] = useState('');
  const [heroPreviewTab, setHeroPreviewTab] = useState('email'); // 'email' | 'slack'
  const [heroShowSettings, setHeroShowSettings] = useState(false);

  // State for Role Intelligence Architecture Section (Section 2)
  const [activeRoleExplored, setActiveRoleExplored] = useState('Founder');

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-indigo-600 selection:text-white">

      {/* ========================================================================= */}
      {/* GLOBAL NAVBAR */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-black shadow-xs">
              <Zap size={18} className="fill-current" />
            </div>
            <div className="flex items-center">
              <span className="font-extrabold text-base tracking-tight text-slate-900">
                Laser AI
              </span>
              <span className="ml-2.5 text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full border border-slate-200 hidden sm:inline-block">
                Feedback Intelligence
              </span>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-600">
            <a href="#preview" className="hover:text-slate-900 transition-colors">
              Product Preview
            </a>
            <a href="#how-it-works" className="hover:text-slate-900 transition-colors">
              How It Works
            </a>
            <a href="#advantages" className="hover:text-slate-900 transition-colors">
              Advantages
            </a>
          </nav>

          {/* Primary CTA */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onStartDemo()}
              className="px-5 py-2 rounded-lg font-bold text-xs bg-indigo-600 hover:bg-indigo-700 text-white transition-all shadow-xs flex items-center gap-1.5"
            >
              <span>Sign up</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* SECTION 1: HERO SCREEN (LIGHT MODE, MISSION-FOCUSED, PRODUCT PREVIEW) */}
      {/* ========================================================================= */}
      <section className="pt-20 pb-20 px-6 border-b border-slate-100 bg-white">
        <div className="max-w-6xl mx-auto text-center">

          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold mb-6 shadow-xs">
            <Sparkles size={13} className="text-indigo-600" />
            <span>Automated Qualitative Feedback Analysis for Google Sheets</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12] mb-6">
            Turn Raw User Feedback into Role-Specific Intelligence. <br />
            <span className="text-indigo-600">Without the Manual Grind.</span>
          </h1>

          {/* Subheadline: Core Mission */}
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Effortlessly analyze customer feedback across every stakeholder in your company.
            No more reading spreadsheets row-by-row, writing tedious summaries by hand, or copy-pasting customer reviews into ChatGPT.
            Laser AI reads your feedback source, synthesizes recurring themes, and delivers role-filtered digests straight to Gmail and Slack.
          </p>

          {/* Single Primary CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
            <button
              onClick={() => onStartDemo()}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm bg-indigo-600 hover:bg-indigo-700 text-white transition-all shadow-sm flex items-center justify-center gap-2 group"
            >
              <span>Sign up</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Micro Trust Proof */}
          <div className="flex items-center justify-center gap-4 text-xs text-slate-500 font-medium">
            <span className="flex items-center gap-1.5">
              <Check size={14} className="text-emerald-600" />
              Free Demo Workspace
            </span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center gap-1.5">
              <Check size={14} className="text-emerald-600" />
              Pre-loaded Google Sheet
            </span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center gap-1.5">
              <Check size={14} className="text-emerald-600" />
              Instant Role Segregation
            </span>
          </div>

          {/* Real Laser AI Interactive Dashboard Preview Window (100% Matching Real DashboardScreen) */}
          <div className="mt-14 max-w-5xl mx-auto bg-gradient-to-br from-[#EDE8F8] via-[#F4EFFB] to-[#FCE7F3] p-3 sm:p-5 rounded-3xl border border-purple-200/50 shadow-2xl text-left relative">

            {/* Inner App Window Container */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-lg overflow-hidden flex flex-col md:flex-row relative">

              {/* Left Mini Sidebar */}
              <div className="w-full md:w-56 shrink-0 bg-[#FAFAFC] border-r border-slate-200/80 flex flex-col justify-between select-none">
                <div className="space-y-2">
                  {/* Workspace Header */}
                  <div className="p-3 border-b border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-black shadow-xs">
                        <Zap size={15} className="fill-current" />
                      </div>
                      <div>
                        <span className="font-extrabold text-xs tracking-tight text-slate-900 block leading-tight">
                          Laser AI
                        </span>
                        <span className="text-[9px] text-slate-400 font-medium tracking-wide">
                          Feedback Intelligence
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Minimal 3 Navigation Items */}
                  <div className="p-2 space-y-1">
                    <div className="px-2 pb-1 text-[9px] font-bold uppercase tracking-wider text-slate-400">
                      Workspace Menu
                    </div>

                    <button
                      type="button"
                      onClick={() => setHeroNav('insights')}
                      className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${heroNav === 'insights'
                        ? 'bg-indigo-50 text-indigo-700 shadow-xs border border-indigo-100 font-bold'
                        : 'text-slate-600 hover:bg-slate-100'
                        }`}
                    >
                      <LayoutDashboard size={14} className={heroNav === 'insights' ? 'text-indigo-600' : 'text-slate-400'} />
                      <span>Insights Dashboard</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setHeroNav('raw')}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${heroNav === 'raw'
                        ? 'bg-indigo-50 text-indigo-700 shadow-xs border border-indigo-100 font-bold'
                        : 'text-slate-600 hover:bg-slate-100'
                        }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <FileSpreadsheet size={14} className={heroNav === 'raw' ? 'text-indigo-600' : 'text-slate-400'} />
                        <span>Raw Google Sheet</span>
                      </div>
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                        150 Rows
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setHeroNav('preview')}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${heroNav === 'preview'
                        ? 'bg-indigo-50 text-indigo-700 shadow-xs border border-indigo-100 font-bold'
                        : 'text-slate-600 hover:bg-slate-100'
                        }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Send size={14} className={heroNav === 'preview' ? 'text-indigo-600' : 'text-slate-400'} />
                        <span>Email & Slack Preview</span>
                      </div>
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Live
                      </span>
                    </button>
                  </div>

                  {/* Dataset Source Section (Change CSV/Excel only for Founders & PMs) */}
                  <div className="px-3 py-2 border-t border-slate-100 space-y-1.5">
                    <div className="flex items-center justify-between px-1">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                        Dataset Source
                      </span>
                      <span className="px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wide bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Google Sheet
                      </span>
                    </div>

                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-200/80 space-y-1.5">
                      <div className="flex items-center gap-2">
                        <FileSpreadsheet size={13} className="text-indigo-600 shrink-0" />
                        <div className="min-w-0 flex-1">
                          <div className="text-[11px] font-bold text-slate-800 truncate">
                            Connected Google Sheet
                          </div>
                          <div className="text-[9px] text-slate-500 font-medium">
                            240 qualitative reviews
                          </div>
                        </div>
                      </div>

                      {/* Only Founders and PMs see Change CSV / Excel */}
                      {(heroRole === 'Founder' || heroRole === 'PMs') && (
                        <div className="space-y-1 pt-0.5">
                          <button
                            type="button"
                            onClick={() => onStartDemo()}
                            className="w-full py-1 px-2 rounded-md bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-[10px] font-bold flex items-center justify-center gap-1 shadow-xs cursor-pointer"
                            title="Upload custom dataset"
                          >
                            <UploadCloud size={11} className="text-indigo-600" />
                            <span>Change CSV / Excel</span>
                          </button>
                          <div className="text-[9px] text-slate-400 text-center font-medium">
                            Supports .CSV, .XLSX, .XLS files
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Profile Card at Bottom of Sidebar */}
                <div className="p-3 border-t border-slate-200/80 bg-slate-50/60 space-y-2 shrink-0 relative">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shadow-xs shrink-0">
                        NS
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-bold text-slate-900 truncate">
                          Navin Singh
                        </div>
                        <div className="text-[10px] font-semibold text-indigo-600">
                          {heroRole}
                        </div>
                      </div>
                    </div>

                    {/* Settings Gear (Only for Founders and PMs) */}
                    {(heroRole === 'Founder' || heroRole === 'PMs') && (
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setHeroShowSettings(!heroShowSettings)}
                          className="p-1 rounded-md border border-slate-200 bg-white hover:bg-slate-100 text-slate-600 shadow-xs cursor-pointer"
                          title="Settings & Options"
                        >
                          <Settings size={13} />
                        </button>

                        {heroShowSettings && (
                          <div className="absolute right-0 bottom-full mb-1.5 w-36 bg-white border border-slate-200 rounded-xl shadow-xl p-1 z-50 text-[11px] space-y-0.5">
                            <div className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 mb-0.5">
                              Account Options
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                setHeroShowSettings(false);
                                setHeroRole(heroRole === 'Founder' ? 'PMs' : 'Founder');
                              }}
                              className="w-full flex items-center gap-1.5 px-2 py-1.5 rounded-md text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 font-semibold cursor-pointer"
                            >
                              <UserCheck size={12} className="text-indigo-600" />
                              <span>Switch Role</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setHeroShowSettings(false);
                                onStartDemo();
                              }}
                              className="w-full flex items-center gap-1.5 px-2 py-1.5 rounded-md text-rose-600 hover:bg-rose-50 font-semibold cursor-pointer"
                            >
                              <LogOut size={12} className="text-rose-500" />
                              <span>Log Out</span>
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* For Engineers and Sales: Direct Log Out button at bottom */}
                  {(heroRole === 'Engineers' || heroRole === 'Sales') && (
                    <button
                      type="button"
                      onClick={() => onStartDemo()}
                      className="w-full py-1 px-2 rounded-md border border-slate-200 bg-white hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 text-[11px] font-semibold text-slate-700 flex items-center justify-center gap-1 transition-all shadow-xs cursor-pointer"
                    >
                      <LogOut size={11} className="text-rose-500" />
                      <span>Log Out</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Main Content Area */}
              <div className="flex-1 flex flex-col overflow-hidden bg-white min-w-0">

                {/* Top Header Bar */}
                <div className="px-5 py-2.5 border-b border-slate-200/80 bg-white flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
                    <span>Home</span>
                    <ChevronRight size={11} className="text-slate-400" />
                    <span>Feedback Intelligence</span>
                    <ChevronRight size={11} className="text-slate-400" />
                    <span className="font-bold text-slate-900">{heroRole} Scope</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="font-medium text-slate-500 hidden sm:inline">Google Sheets Connected</span>
                  </div>
                </div>

                {/* Sub-Header Title Bar & 4 Role Switcher */}
                <div className="px-5 py-3.5 border-b border-slate-200/70 bg-white">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200">
                          {heroRole} Scope
                        </span>
                        <span className="text-xs text-slate-300">•</span>
                        <span className="text-[11px] text-slate-500 font-medium">Pre-Connected Google Sheet Ingestion</span>
                      </div>
                      <h2 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
                        {heroRole === 'Founder' && 'Executive Feedback & Customer Sentiment Overview'}
                        {heroRole === 'PMs' && 'Product Management & User Experience Feedback'}
                        {heroRole === 'Engineers' && 'Engineering Technical Triage & Performance Pulse'}
                        {heroRole === 'Sales' && 'Sales Pipeline Intelligence & Commercial Requests'}
                      </h2>
                      <p className="text-[11px] text-slate-500">
                        {heroRole === 'Founder' && 'Aggregated qualitative feedback pulse (240 Customer Reviews across all platforms)'}
                        {heroRole === 'PMs' && 'Feature demand frequency, usability friction points, and workflow enhancements'}
                        {heroRole === 'Engineers' && 'Strictly technical feedback (Exceptions, load times, client crashes, API syncs)'}
                        {heroRole === 'Sales' && 'Commercial objections, enterprise compliance, seat tiers, and buyer requests'}
                      </p>
                    </div>

                    {/* Interactive Role Switcher Pills right in header */}
                    <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 shrink-0 self-start sm:self-auto">
                      {['Founder', 'PMs', 'Engineers', 'Sales'].map((r) => (
                        <button
                          key={r}
                          type="button"
                          onClick={() => {
                            setHeroRole(r);
                            setHeroRawScope('scoped');
                          }}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${heroRole === r
                            ? 'bg-indigo-600 text-white shadow-xs'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                            }`}
                        >
                          {r}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* VIEW 1: INSIGHTS DASHBOARD */}
                {heroNav === 'insights' && (
                  <div className="p-4 sm:p-5 space-y-4 overflow-y-auto max-h-[520px]">
                    {/* Automated Morning Schedule Informational Feature Detail */}
                    <div className="bg-indigo-50/70 border border-indigo-200/80 rounded-xl px-4 py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-indigo-950 shadow-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-md bg-indigo-600 text-white flex items-center justify-center shrink-0">
                          <Clock size={13} />
                        </div>
                        <div>
                          <span className="font-bold text-slate-900 block text-xs">Automated Morning Schedule</span>
                          <span className="text-slate-600 text-[11px]">You will get daily digest at morning with updated reviews insights delivered directly to your destination email and Slack.</span>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[9px] font-bold border border-emerald-200 flex items-center gap-1 shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                        Morning Schedule Active
                      </span>
                    </div>

                    {/* Top 3 Feedback KPI Cards (Pure Dummy SaaS Metrics) */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {heroRole === 'Founder' && (
                        <>
                          <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-xs">
                            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                              <span className="font-semibold text-[11px]">Total Feedback Analyzed</span>
                              <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">+24% vs last quarter</span>
                            </div>
                            <div className="text-lg font-black text-slate-900">240 Reviews</div>
                            <div className="text-[10px] text-slate-500 font-medium mt-1">Web, iOS, Android &amp; Support Desk</div>
                          </div>
                          <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-xs">
                            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                              <span className="font-semibold text-[11px]">Overall User Sentiment</span>
                              <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">+9% this month</span>
                            </div>
                            <div className="text-lg font-black text-emerald-600">72% Positive</div>
                            <div className="text-[10px] text-slate-500 font-medium mt-1">18% Neutral • 10% Constructive</div>
                          </div>
                          <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-xs">
                            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                              <span className="font-semibold text-[11px]">Top Trending Feedback</span>
                              <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-slate-100 text-slate-700">54 mentions</span>
                            </div>
                            <div className="text-lg font-black text-slate-900">Automated Workflow Rules</div>
                            <div className="text-[10px] text-slate-500 font-medium mt-1">Strongest retention &amp; expansion driver</div>
                          </div>
                        </>
                      )}

                      {heroRole === 'PMs' && (
                        <>
                          <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-xs">
                            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                              <span className="font-semibold text-[11px]">Total Product Feedback</span>
                              <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">Roadmap Analyzed</span>
                            </div>
                            <div className="text-lg font-black text-slate-900">240 Reviews</div>
                            <div className="text-[10px] text-slate-500 font-medium mt-1">Feature Demands vs Usability UX</div>
                          </div>
                          <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-xs">
                            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                              <span className="font-semibold text-[11px]">Workflow Satisfaction</span>
                              <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">+6% post-redesign</span>
                            </div>
                            <div className="text-lg font-black text-emerald-600">78% Favorable</div>
                            <div className="text-[10px] text-slate-500 font-medium mt-1">Search &amp; navigation usability high</div>
                          </div>
                          <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-xs">
                            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                              <span className="font-semibold text-[11px]">Top Feature Demand</span>
                              <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-50 text-amber-700 border border-amber-200">46 Requests</span>
                            </div>
                            <div className="text-lg font-black text-slate-900">2-Way Calendar Sync</div>
                            <div className="text-[10px] text-slate-500 font-medium mt-1">Google Calendar &amp; Outlook integrations</div>
                          </div>
                        </>
                      )}

                      {heroRole === 'Engineers' && (
                        <>
                          <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-xs">
                            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                              <span className="font-semibold text-[11px]">Technical Issues Ingested</span>
                              <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">52 of 240 Scoped</span>
                            </div>
                            <div className="text-lg font-black text-slate-900">52 Items</div>
                            <div className="text-[10px] text-slate-500 font-medium mt-1">Bug tickets, API logs &amp; exceptions</div>
                          </div>
                          <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-xs">
                            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                              <span className="font-semibold text-[11px]">High-Priority Bug Tickets</span>
                              <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-rose-50 text-rose-700 border border-rose-200">Active Triage</span>
                            </div>
                            <div className="text-lg font-black text-rose-600">9 Issues</div>
                            <div className="text-[10px] text-slate-500 font-medium mt-1">WebSocket reconnects &amp; export latency</div>
                          </div>
                          <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-xs">
                            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                              <span className="font-semibold text-[11px]">Peak Batch Sync Latency</span>
                              <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-rose-50 text-rose-700 border border-rose-200">Target &lt;2.0s</span>
                            </div>
                            <div className="text-lg font-black text-slate-900">4.2s on 5k Rows</div>
                            <div className="text-[10px] text-slate-500 font-medium mt-1">Database index optimization required</div>
                          </div>
                        </>
                      )}

                      {heroRole === 'Sales' && (
                        <>
                          <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-xs">
                            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                              <span className="font-semibold text-[11px]">Commercial Reviews</span>
                              <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">38 of 240 Scoped</span>
                            </div>
                            <div className="text-lg font-black text-slate-900">38 Ingested</div>
                            <div className="text-[10px] text-slate-500 font-medium mt-1">Filtered commercial queries &amp; objections</div>
                          </div>
                          <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-xs">
                            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                              <span className="font-semibold text-[11px]">Pipeline Inquiries</span>
                              <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">Active Deals</span>
                            </div>
                            <div className="text-lg font-black text-slate-900">18 Inquiries</div>
                            <div className="text-[10px] text-slate-500 font-medium mt-1">Multi-tier discounts &amp; custom SLAs</div>
                          </div>
                          <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-xs">
                            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                              <span className="font-semibold text-[11px]">Top Compliance Request</span>
                              <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-50 text-amber-700 border border-amber-200">15 Accounts</span>
                            </div>
                            <div className="text-lg font-black text-slate-900">SOC 2 Type II</div>
                            <div className="text-[10px] text-slate-500 font-medium mt-1">Vendor compliance review packages</div>
                          </div>
                        </>
                      )}
                    </div>

                    {/* AI Executive Synthesis Box (Dummy SaaS Intelligence) */}
                    <div className="bg-gradient-to-r from-indigo-50/80 via-white to-purple-50/50 border border-indigo-200/80 rounded-xl p-4 shadow-xs space-y-2">
                      <div className="flex items-center gap-2 text-indigo-700 font-bold text-xs uppercase tracking-wider">
                        <Sparkles size={14} className="text-indigo-600" />
                        <span>Laser AI Executive Synthesis</span>
                        <span className="text-[10px] font-semibold text-slate-400 normal-case">• Done by Laser AI</span>
                      </div>

                      <div className="space-y-1.5 text-xs text-slate-700 leading-relaxed">
                        {heroRole === 'Founder' && (
                          <>
                            <div className="flex items-start gap-2">
                              <span className="text-indigo-600 font-bold">•</span>
                              <span><strong>Strong Retention in Core Workflows:</strong> 72% of surveyed teams praise the new visual automation canvas, citing a 4x reduction in recurring status meetings.</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <span className="text-indigo-600 font-bold">•</span>
                              <span><strong>Mobile Alert Volume Concerns:</strong> 36 customer reviews request grouped digest notifications and quiet-hours snooze settings to prevent alert fatigue.</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <span className="text-indigo-600 font-bold">•</span>
                              <span><strong>Enterprise Expansion Inquiries:</strong> Prospective corporate accounts are actively asking for custom data retention policies and IP allowlisting.</span>
                            </div>
                          </>
                        )}
                        {heroRole === 'PMs' && (
                          <>
                            <div className="flex items-start gap-2">
                              <span className="text-indigo-600 font-bold">•</span>
                              <span><strong>Bi-Directional Calendar Sync is #1 Priority:</strong> 46 customer requests ask for real-time 2-way syncing with Outlook and Google Calendar to mirror deadlines.</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <span className="text-indigo-600 font-bold">•</span>
                              <span><strong>Sub-Task Hierarchy Usability:</strong> Users love unlimited task nesting but ask for an expand/collapse all toggle to keep dense boards clean.</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <span className="text-indigo-600 font-bold">•</span>
                              <span><strong>Custom Taxonomy Tagging:</strong> 28 teams request color-coded taxonomy tags for cross-department milestone tracking.</span>
                            </div>
                          </>
                        )}
                        {heroRole === 'Engineers' && (
                          <>
                            <div className="flex items-start gap-2">
                              <span className="text-indigo-600 font-bold">•</span>
                              <span><strong>WebSocket Reconnection Edge Case:</strong> Clients on unstable networks experience intermittent reconnect loops when switching between WiFi and mobile data.</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <span className="text-indigo-600 font-bold">•</span>
                              <span><strong>Large File Export Memory Pressure:</strong> Generating multi-sheet Excel exports over 10MB occasionally hits worker memory thresholds.</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <span className="text-indigo-600 font-bold">•</span>
                              <span><strong>Dark Mode Contrast Accessibility:</strong> Code snippet blocks in dark mode fail WCAG AA contrast standards for low-vision developers.</span>
                            </div>
                          </>
                        )}
                        {heroRole === 'Sales' && (
                          <>
                            <div className="flex items-start gap-2">
                              <span className="text-indigo-600 font-bold">•</span>
                              <span><strong>Centralized Invoicing for Subsidiaries:</strong> 8 multi-entity corporate prospects require a single master invoice covering multiple workspace domains.</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <span className="text-indigo-600 font-bold">•</span>
                              <span><strong>SOC 2 &amp; Vendor Security Documentation:</strong> Mid-market security teams require automated NDA-gated download links for SOC 2 Type II reports.</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <span className="text-indigo-600 font-bold">•</span>
                              <span><strong>Annual Contract Pre-Payment Discounts:</strong> Buyers frequently inquire about 2-year upfront commitment options with grandfathered seat pricing.</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Grouped Customer Quotes (Dummy SaaS Quotes) */}
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-800">Direct Customer Quotes &amp; Action Takeaways</span>
                        <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                          Done by Laser AI
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {heroRole === 'Founder' && (
                          <>
                            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 space-y-1.5">
                              <div className="flex items-center justify-between">
                                <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">High Retention</span>
                                <span className="text-[10px] text-slate-500 font-mono">Elena Vance • Growth</span>
                              </div>
                              <p className="text-xs text-slate-700 italic">"The visual workflow builder saved our operations team at least 6 hours every week. Super intuitive."</p>
                              <div className="text-[10px] text-indigo-700 font-semibold pt-1 border-t border-slate-200/60">
                                Takeaway: Feature visual automation templates in self-serve onboarding guides.
                              </div>
                            </div>
                            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 space-y-1.5">
                              <div className="flex items-center justify-between">
                                <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-rose-50 text-rose-700 border border-rose-200">Alert Fatigue</span>
                                <span className="text-[10px] text-slate-500 font-mono">Marcus Sterling • Scale</span>
                              </div>
                              <p className="text-xs text-slate-700 italic">"We need granular controls over email notifications. Getting pinged for every minor checklist update is overwhelming."</p>
                              <div className="text-[10px] text-indigo-700 font-semibold pt-1 border-t border-slate-200/60">
                                Takeaway: Ship grouped digest notifications and quiet-hours snooze settings.
                              </div>
                            </div>
                          </>
                        )}

                        {heroRole === 'PMs' && (
                          <>
                            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 space-y-1.5">
                              <div className="flex items-center justify-between">
                                <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">Roadmap Priority</span>
                                <span className="text-[10px] text-slate-500 font-mono">Devon Brooks • Enterprise</span>
                              </div>
                              <p className="text-xs text-slate-700 italic">"We really need deadlines to sync automatically to our Google Calendars so cross-functional leads stay aligned."</p>
                              <div className="text-[10px] text-indigo-700 font-semibold pt-1 border-t border-slate-200/60">
                                Takeaway: Prioritize 2-way calendar sync milestone in upcoming sprint backlog.
                              </div>
                            </div>
                            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 space-y-1.5">
                              <div className="flex items-center justify-between">
                                <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-amber-50 text-amber-700 border border-amber-200">UX Friction</span>
                                <span className="text-[10px] text-slate-500 font-mono">Maya Lin • Agency</span>
                              </div>
                              <p className="text-xs text-slate-700 italic">"The multi-select drag-and-drop works great on desktop, but on laptop touchpads it occasionally misplaces sub-tasks."</p>
                              <div className="text-[10px] text-indigo-700 font-semibold pt-1 border-t border-slate-200/60">
                                Takeaway: Adjust drop-zone hitboxes and add undo toast confirmation.
                              </div>
                            </div>
                          </>
                        )}

                        {heroRole === 'Engineers' && (
                          <>
                            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 space-y-1.5">
                              <div className="flex items-center justify-between">
                                <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-rose-50 text-rose-700 border border-rose-200">Socket Disconnect</span>
                                <span className="text-[10px] text-slate-500 font-mono">Kiran Patel • Tech Lead</span>
                              </div>
                              <p className="text-xs text-slate-700 italic">"Whenever my laptop wakes up from sleep on office WiFi, the real-time board disconnects until I force-refresh the page."</p>
                              <div className="text-[10px] text-indigo-700 font-semibold pt-1 border-t border-slate-200/60">
                                Takeaway: Implement exponential backoff with immediate ping probe on visibilitychange event.
                              </div>
                            </div>
                            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 space-y-1.5">
                              <div className="flex items-center justify-between">
                                <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-rose-50 text-rose-700 border border-rose-200">Latency Blocker</span>
                                <span className="text-[10px] text-slate-500 font-mono">Samir Al-Mansoor • DevOps</span>
                              </div>
                              <p className="text-xs text-slate-700 italic">"Exporting our monthly project history to CSV timed out twice when our workspace exceeded 8,000 items."</p>
                              <div className="text-[10px] text-indigo-700 font-semibold pt-1 border-t border-slate-200/60">
                                Takeaway: Stream CSV generation chunks via S3 presigned URLs instead of buffering in memory.
                              </div>
                            </div>
                          </>
                        )}

                        {heroRole === 'Sales' && (
                          <>
                            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 space-y-1.5">
                              <div className="flex items-center justify-between">
                                <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-rose-50 text-rose-700 border border-rose-200">Billing Request</span>
                                <span className="text-[10px] text-slate-500 font-mono">Jessica Ward • Procurement</span>
                              </div>
                              <p className="text-xs text-slate-700 italic">"Our finance department requires consolidated billing for our three regional operating entities on net-30 terms."</p>
                              <div className="text-[10px] text-indigo-700 font-semibold pt-1 border-t border-slate-200/60">
                                Takeaway: Offer parent-child billing hierarchy in enterprise customer settings.
                              </div>
                            </div>
                            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 space-y-1.5">
                              <div className="flex items-center justify-between">
                                <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">Security Gate</span>
                                <span className="text-[10px] text-slate-500 font-mono">Arthur Pendelton • Director IT</span>
                              </div>
                              <p className="text-xs text-slate-700 italic">"We need your SOC 2 Type II compliance package and pen test summary before our legal team will approve rollout."</p>
                              <div className="text-[10px] text-indigo-700 font-semibold pt-1 border-t border-slate-200/60">
                                Takeaway: Deploy self-serve Trust Center portal for verified enterprise prospects.
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* VIEW 2: RAW GOOGLE SHEET (Distinct Dummy Rows) */}
                {heroNav === 'raw' && (
                  <div className="p-4 sm:p-5 space-y-3 overflow-y-auto max-h-[520px]">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <h3 className="text-xs font-bold text-slate-900">
                          Pre-Connected Google Sheet Feedback Rows
                        </h3>
                        <p className="text-[11px] text-slate-500">
                          {heroRole === 'Founder' && 'Full company-wide product dataset access (240 total rows).'}
                          {heroRole === 'PMs' && 'Full product visibility organized by feature requests vs usability friction.'}
                          {heroRole === 'Engineers' && 'Filtered strictly to technical bugs, latency, and integration issues.'}
                          {heroRole === 'Sales' && 'Filtered strictly to enterprise procurement, compliance, and commercial requests.'}
                        </p>
                      </div>

                      {/* Scoped Toggle: Founders & PMs see toggle; Engineers & Sales are strictly scoped */}
                      <div className="flex items-center gap-2">
                        {(heroRole === 'Founder' || heroRole === 'PMs') ? (
                          <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs font-semibold">
                            <button
                              type="button"
                              onClick={() => setHeroRawScope('scoped')}
                              className={`px-2.5 py-0.5 rounded-md text-[11px] transition-all cursor-pointer ${heroRawScope === 'scoped' ? 'bg-white text-indigo-600 shadow-xs font-bold' : 'text-slate-600'
                                }`}
                            >
                              Strictly Scoped
                            </button>
                            <button
                              type="button"
                              onClick={() => setHeroRawScope('all')}
                              className={`px-2.5 py-0.5 rounded-md text-[11px] transition-all cursor-pointer ${heroRawScope === 'all' ? 'bg-white text-indigo-600 shadow-xs font-bold' : 'text-slate-600'
                                }`}
                            >
                              All 240 Rows
                            </button>
                          </div>
                        ) : (
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-700 text-[11px] font-bold shadow-xs">
                            <Shield size={12} className="text-indigo-600 shrink-0" />
                            <span>Strictly Scoped ({heroRole === 'Engineers' ? '52 Engineers Reviews' : '38 Sales Reviews'})</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Search Bar */}
                    <div className="relative">
                      <Search size={13} className="absolute left-3 top-2.5 text-slate-400" />
                      <input
                        type="text"
                        value={heroSearch}
                        onChange={(e) => setHeroSearch(e.target.value)}
                        placeholder="Search raw feedback by customer, area, or keyword..."
                        className="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 shadow-xs"
                      />
                    </div>

                    {/* Table */}
                    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
                      <div className="max-h-[360px] overflow-auto">
                        <table className="w-full text-left text-xs">
                          <thead className="bg-[#FAFAFC] border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[9px] sticky top-0 z-10">
                            <tr>
                              <th className="p-2.5">Review ID</th>
                              <th className="p-2.5">Date</th>
                              <th className="p-2.5">User Name</th>
                              <th className="p-2.5">Company Tier</th>
                              <th className="p-2.5">Customer Feedback Text</th>
                              <th className="p-2.5">AI Sentiment</th>
                              <th className="p-2.5">AI Role Match</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 text-[11px]">
                            {/* Filtered Distinct Dummy Rows */}
                            {(heroRole === 'Sales' ? [
                              { id: 'FB-804', date: '2025-06-11', user: 'Devon Brooks', tier: 'Enterprise', feedback: 'Our security team needs SSO via Okta and custom data retention schedules before we can onboard 200 users.', sentiment: 'Neutral', roleMatch: 'Commercial Scope' },
                              { id: 'FB-827', date: '2025-06-07', user: 'Arthur Pendelton', tier: 'Enterprise', feedback: 'Can you send over your latest SOC 2 Type II report and standard vendor security assessment questionnaire?', sentiment: 'Neutral', roleMatch: 'Commercial Scope' },
                              { id: 'FB-840', date: '2025-06-05', user: 'Jessica Ward', tier: 'Scale', feedback: 'We manage 4 client sub-accounts and need consolidated parent invoicing on annual net-30 payment terms.', sentiment: 'Neutral', roleMatch: 'Commercial Scope' },
                              { id: 'FB-852', date: '2025-06-03', user: 'Harrison Reed', tier: 'Enterprise', feedback: 'Our procurement cycle closes next week; is volume tier discounting available for 500+ seat commitments?', sentiment: 'Positive', roleMatch: 'Commercial Scope' },
                              { id: 'FB-866', date: '2025-05-29', user: 'Nadia Solis', tier: 'Scale', feedback: 'We require a Business Associate Agreement (BAA) and dedicated IP allowlisting for enterprise compliance.', sentiment: 'Neutral', roleMatch: 'Commercial Scope' }
                            ] : heroRole === 'Engineers' ? [
                              { id: 'FB-809', date: '2025-06-10', user: 'Kiran Patel', tier: 'Scale', feedback: 'WebSocket disconnects when my MacBook wakes from sleep, requiring a hard browser refresh to reconnect.', sentiment: 'Negative', roleMatch: 'Technical Bug' },
                              { id: 'FB-820', date: '2025-06-08', user: 'Samir Al-Mansoor', tier: 'Enterprise', feedback: 'Exporting historical activity logs timed out when running against our 10,000-task workspace.', sentiment: 'Negative', roleMatch: 'Technical Bug' },
                              { id: 'FB-835', date: '2025-06-06', user: 'Lucas Vance', tier: 'Growth', feedback: 'Dark mode code snippets fail WCAG contrast ratios in inline terminal preview tabs.', sentiment: 'Negative', roleMatch: 'Technical Bug' },
                              { id: 'FB-848', date: '2025-06-04', user: 'Amina Tariq', tier: 'Scale', feedback: 'Webhook payloads to Slack occasionally drop when firing more than 20 status updates simultaneously.', sentiment: 'Negative', roleMatch: 'Technical Bug' },
                              { id: 'FB-861', date: '2025-05-31', user: 'Brendan Cole', tier: 'Enterprise', feedback: 'Memory usage climbs continuously during 8-hour continuous Kanban editing sessions on Chrome Windows.', sentiment: 'Negative', roleMatch: 'Technical Bug' }
                            ] : [
                              { id: 'FB-801', date: '2025-06-12', user: 'Jordan Lee', tier: 'Growth', feedback: 'The visual automation builder is super slick. Would love an option to trigger custom webhooks on status changes.', sentiment: 'Positive', roleMatch: 'Product Scope' },
                              { id: 'FB-804', date: '2025-06-11', user: 'Devon Brooks', tier: 'Enterprise', feedback: 'Our security team needs SSO via Okta and custom data retention schedules before we can onboard 200 users.', sentiment: 'Neutral', roleMatch: 'Commercial Scope' },
                              { id: 'FB-809', date: '2025-06-10', user: 'Kiran Patel', tier: 'Scale', feedback: 'WebSocket disconnects when my MacBook wakes from sleep, requiring a hard browser refresh to reconnect.', sentiment: 'Negative', roleMatch: 'Technical Bug' },
                              { id: 'FB-814', date: '2025-06-09', user: 'Maya Lin', tier: 'Agency', feedback: 'Need the ability to invite external clients to view-only project dashboards without requiring account creation.', sentiment: 'Neutral', roleMatch: 'Product Scope' },
                              { id: 'FB-833', date: '2025-06-06', user: 'Elena Vance', tier: 'Growth', feedback: 'Speed and search indexing are remarkably fast compared to Jira. Our whole engineering team loves the minimalist design.', sentiment: 'Positive', roleMatch: 'Executive Scope' }
                            ]).filter(item => !heroSearch || item.feedback.toLowerCase().includes(heroSearch.toLowerCase()) || item.user.toLowerCase().includes(heroSearch.toLowerCase())).map((row) => (
                              <tr key={row.id} className="hover:bg-slate-50/80 transition-colors">
                                <td className="p-2.5 font-mono text-slate-500 font-bold whitespace-nowrap">{row.id}</td>
                                <td className="p-2.5 text-slate-500 whitespace-nowrap">{row.date}</td>
                                <td className="p-2.5 font-semibold text-slate-900 whitespace-nowrap">{row.user}</td>
                                <td className="p-2.5 whitespace-nowrap">
                                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200">
                                    {row.tier}
                                  </span>
                                </td>
                                <td className="p-2.5 text-slate-700 max-w-xs truncate">{row.feedback}</td>
                                <td className="p-2.5 whitespace-nowrap">
                                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${row.sentiment === 'Positive' ? 'bg-emerald-50 text-emerald-700' : row.sentiment === 'Negative' ? 'bg-rose-50 text-rose-700' : 'bg-slate-100 text-slate-700'}`}>
                                    {row.sentiment}
                                  </span>
                                </td>
                                <td className="p-2.5 whitespace-nowrap">
                                  <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 text-[10px] font-semibold border border-indigo-100">
                                    {row.roleMatch}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {/* VIEW 3: EMAIL & SLACK PREVIEW (Dummy Briefing Copy) */}
                {heroNav === 'preview' && (
                  <div className="p-4 sm:p-5 space-y-4 overflow-y-auto max-h-[520px]">
                    <div className="flex items-center justify-between">
                      <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs font-semibold">
                        <button
                          type="button"
                          onClick={() => setHeroPreviewTab('email')}
                          className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-all cursor-pointer ${heroPreviewTab === 'email' ? 'bg-white text-indigo-600 shadow-xs font-bold' : 'text-slate-600'
                            }`}
                        >
                          <Mail size={13} />
                          <span>Email Digest</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setHeroPreviewTab('slack')}
                          className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-all cursor-pointer ${heroPreviewTab === 'slack' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600'
                            }`}
                        >
                          <Slack size={13} />
                          <span>Slack Block Kit</span>
                        </button>
                      </div>

                      <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        <CheckCircle2 size={11} />
                        Live Multi-Channel Sync
                      </span>
                    </div>

                    {/* Email Format Preview */}
                    {heroPreviewTab === 'email' && (
                      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
                        <div className="px-4 py-2 bg-slate-100/80 border-b border-slate-200 flex items-center justify-between text-[11px] text-slate-600">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-rose-400 inline-block" />
                            <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
                            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                            <span className="ml-2 font-mono text-[10px] text-slate-600 font-medium">To: {heroRole.toLowerCase()}-digest@company.com</span>
                          </div>
                          <span className="text-[10px] font-mono text-slate-400">Laser AI Dispatch</span>
                        </div>
                        <div className="p-4 space-y-3 text-xs">
                          <div className="border-b border-slate-100 pb-2">
                            <div className="text-[10px] text-indigo-600 font-bold uppercase tracking-wider">⚡ Laser AI Daily Briefing</div>
                            <h4 className="text-sm font-bold text-slate-900">{heroRole} Intelligence Digest — Daily Morning Summary</h4>
                          </div>
                          <div className="p-3 bg-indigo-50/60 rounded-lg border border-indigo-100 text-xs text-indigo-950 space-y-1">
                            <div className="font-bold flex items-center gap-1 text-indigo-900">
                              <Sparkles size={13} />
                              <span>Laser AI Executive Synthesis</span>
                            </div>
                            <p className="text-[11px] text-slate-700 leading-relaxed">
                              {heroRole === 'Founder' && 'Core visual automation praised by 72% of teams; mobile notification clustering and enterprise IP allowlisting represent top priorities.'}
                              {heroRole === 'PMs' && 'High demand for 2-way Google/Outlook calendar sync (46 requests); expand/collapse nested task sub-groups required.'}
                              {heroRole === 'Engineers' && 'WebSocket reconnects on wake-from-sleep and 10k task CSV export timeouts identified as primary technical blockers.'}
                              {heroRole === 'Sales' && 'Centralized billing for corporate subsidiaries and automated SOC 2 compliance packages needed to accelerate enterprise pipeline.'}
                            </p>
                          </div>
                          <div className="p-2.5 rounded-lg bg-amber-50/80 border border-amber-200 text-[11px] text-amber-900 flex items-center gap-2">
                            <Clock size={13} className="text-amber-600 shrink-0" />
                            <span>You will get daily digest at morning with updated reviews insights.</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Slack Block Kit Preview */}
                    {heroPreviewTab === 'slack' && (
                      <div className="bg-[#1A1D21] text-slate-200 rounded-xl p-4 shadow-sm border border-slate-800 space-y-3 font-sans text-xs">
                        <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
                          <div className="w-5 h-5 rounded bg-indigo-600 text-white flex items-center justify-center font-bold text-[10px]">⚡</div>
                          <span className="font-bold text-white text-xs">Laser AI</span>
                          <span className="bg-slate-700 text-slate-300 text-[9px] px-1.5 py-0.2 rounded font-bold">APP</span>
                          <span className="text-[10px] text-slate-500">8:00 AM (Morning Schedule)</span>
                        </div>
                        <div className="text-slate-100 font-bold text-sm">
                          ⚡ *{heroRole} Customer Feedback Digest*
                        </div>
                        <div className="p-3 bg-slate-800/80 rounded-lg border-l-4 border-indigo-500 text-slate-300 text-xs space-y-1">
                          <div className="text-white font-semibold">Morning Synthesis:</div>
                          <div className="text-[11px] text-slate-300">
                            You will get daily digest at morning with updated reviews insights. Filtered strictly for {heroRole}.
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: PRODUCT PREVIEW (SCREENSHOTS & CHARTS) */}
      {/* ========================================================================= */}
      <section id="preview" className="py-20 px-6 border-b border-slate-100 bg-white">
        <div className="max-w-6xl mx-auto">

          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold mb-3">
              <ShieldCheck size={13} className="text-indigo-600" />
              <span>Role-Specific Intelligence Architecture</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
              Tailored Morning Digests for Every Role
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Customer feedback shouldn’t be a one-size-fits-all spreadsheet. Laser AI automatically analyzes, scopes, and routes qualitative intelligence so each leader receives actionable clarity without unwanted noise.
            </p>
          </div>

          {/* 4 Standardized Role Selector Tabs */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex p-1.5 rounded-2xl bg-slate-100 border border-slate-200/80 gap-1 overflow-x-auto max-w-full shadow-2xs">
              {[
                { key: 'Founder', label: 'Founder & Executive', icon: Users, color: 'text-indigo-600' },
                { key: 'PMs', label: 'Product Managers (PMs)', icon: Star, color: 'text-amber-500' },
                { key: 'Engineers', label: 'Engineers & Tech Leads', icon: Layers, color: 'text-rose-500' },
                { key: 'Sales', label: 'Sales & Commercial', icon: ShieldCheck, color: 'text-emerald-500' }
              ].map(({ key, label, icon: Icon, color }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActiveRoleExplored(key)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                    activeRoleExplored === key
                      ? 'bg-white text-slate-900 shadow-xs border border-slate-200/60 font-extrabold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                  }`}
                >
                  <Icon size={14} className={activeRoleExplored === key ? color : 'text-slate-400'} />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Role Intelligence Canvas */}
          <div className="bg-slate-50/70 border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

              {/* Left Column: Scope & Zero-Leakage Policy (5 cols) */}
              <div className="lg:col-span-5 space-y-5">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200">
                      {activeRoleExplored} Scope Definition
                    </span>
                    <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                      <CheckCircle2 size={12} />
                      Zero-Noise Filter Active
                    </span>
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
                    {activeRoleExplored === 'Founder' && 'Executive Health & Macro Sentiment'}
                    {activeRoleExplored === 'PMs' && 'Roadmap Demands & Workflow Usability'}
                    {activeRoleExplored === 'Engineers' && 'Crash Triage & Latency Telemetry'}
                    {activeRoleExplored === 'Sales' && 'Commercial Pipeline & Enterprise Gates'}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {activeRoleExplored === 'Founder' && 'Empowers founders and executive teams with high-level retention sentiment, cross-department friction highlights, and macro expansion blockers.'}
                    {activeRoleExplored === 'PMs' && 'Gives product leaders clustered feature requests by user velocity, usability drop-off hot spots, and verbatim customer quotes.'}
                    {activeRoleExplored === 'Engineers' && 'Directly streams reproducible customer bugs, affected browser/device platforms, and worker timeout bottlenecks without marketing clutter.'}
                    {activeRoleExplored === 'Sales' && 'Isolates procurement objections, tier requests, and security compliance blockers (SSO, SAML, SOC 2) to accelerate active deals.'}
                  </p>
                </div>

                {/* Scope Delivery Specs */}
                <div className="space-y-3 pt-1">
                  <div className="p-3.5 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-1.5">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                      <Check size={14} className="text-emerald-600" />
                      <span>What Laser AI Delivers</span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed pl-5">
                      {activeRoleExplored === 'Founder' && '3-bullet Executive Synthesis, Company-Wide Sentiment breakdown, High-velocity friction themes, and Retention Praise.'}
                      {activeRoleExplored === 'PMs' && 'Semantic feature demand clustering, usability friction patterns, touch-target issues, and customer quote context.'}
                      {activeRoleExplored === 'Engineers' && '100% bug and reliability focus: client auto-layout crashes, worker timeout errors, and memory threshold spikes.'}
                      {activeRoleExplored === 'Sales' && 'Commercial blockers, enterprise compliance mandates (SSO/SAML/SOC 2), parent-subsidiary billing, and objection themes.'}
                    </p>
                  </div>

                  <div className="p-3.5 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-1.5">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                      <Shield size={14} className="text-indigo-600" />
                      <span>What Gets Filtered Out (Zero Noise)</span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed pl-5">
                      {activeRoleExplored === 'Founder' && 'No technical stack traces, server timeouts, or individual sales quote negotiations.'}
                      {activeRoleExplored === 'PMs' && 'No isolated backend worker exceptions or commercial legal contracts.'}
                      {activeRoleExplored === 'Engineers' && 'Strictly zero sales objections, pricing discussions, or marketing campaigns.'}
                      {activeRoleExplored === 'Sales' && 'No code exceptions, server logs, or technical bug triage clutter.'}
                    </p>
                  </div>

                  <div className="p-3.5 bg-indigo-50/70 rounded-xl border border-indigo-200/70 text-xs text-indigo-950 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock size={14} className="text-indigo-600 shrink-0" />
                      <span className="font-semibold text-[11px]">Automated Morning Delivery:</span>
                    </div>
                    <span className="text-[11px] font-bold text-indigo-700 bg-white px-2 py-0.5 rounded border border-indigo-100">
                      8:00 AM Daily
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Live Morning Digest Preview (7 cols) */}
              <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                {/* Fake Client Top Bar */}
                <div className="px-5 py-3 bg-slate-100/80 border-b border-slate-200 flex items-center justify-between text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-400 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
                    <span className="ml-2 font-mono text-[11px] text-slate-600 font-medium">
                      To: {activeRoleExplored.toLowerCase()}-digest@company.com
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                    Live Role Digest
                  </span>
                </div>

                {/* Email Body Preview */}
                <div className="p-6 space-y-4 text-xs">
                  <div className="border-b border-slate-100 pb-3">
                    <div className="text-[10px] text-indigo-600 font-bold uppercase tracking-wider mb-0.5">
                      ⚡ Laser AI Morning Briefing
                    </div>
                    <h4 className="text-base font-extrabold text-slate-900">
                      {activeRoleExplored} Intelligence Digest — Daily Morning Summary
                    </h4>
                  </div>

                  {/* Synthesis Box */}
                  <div className="p-4 bg-indigo-50/60 rounded-xl border border-indigo-100 text-xs text-indigo-950 space-y-2">
                    <div className="font-bold flex items-center gap-1.5 text-indigo-900">
                      <Sparkles size={14} className="text-indigo-600" />
                      <span>Laser AI Executive Synthesis</span>
                    </div>
                    <p className="text-[11px] text-slate-700 leading-relaxed">
                      {activeRoleExplored === 'Founder' && 'Core visual workflow builder praised by 72% of teams; mobile notification clustering and enterprise IP allowlisting represent top strategic focus areas.'}
                      {activeRoleExplored === 'PMs' && 'High demand for 2-way Google and Outlook calendar sync (46 requests); expand/collapse nested sub-tasks required to streamline roadmaps.'}
                      {activeRoleExplored === 'Engineers' && 'WebSocket reconnect loops on laptop wake-from-sleep and 10k task CSV export memory spikes identified as primary technical blockers.'}
                      {activeRoleExplored === 'Sales' && 'Centralized billing for corporate subsidiaries and automated SOC 2 compliance packages needed to accelerate active enterprise pipeline.'}
                    </p>
                  </div>

                  {/* Direct Customer Quote Callout */}
                  <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 space-y-1.5">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                        {activeRoleExplored === 'Founder' && 'Retention Driver'}
                        {activeRoleExplored === 'PMs' && 'Roadmap Demand'}
                        {activeRoleExplored === 'Engineers' && 'Bug Report'}
                        {activeRoleExplored === 'Sales' && 'Commercial Gate'}
                      </span>
                      <span className="text-slate-500 font-mono text-[10px]">
                        {activeRoleExplored === 'Founder' && 'Elena Vance • Growth Tier'}
                        {activeRoleExplored === 'PMs' && 'Devon Brooks • Enterprise Tier'}
                        {activeRoleExplored === 'Engineers' && 'Kiran Patel • Tech Lead'}
                        {activeRoleExplored === 'Sales' && 'Jessica Ward • VP Procurement'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-700 italic leading-relaxed">
                      {activeRoleExplored === 'Founder' && '"The visual workflow builder saved our operations team at least 6 hours every week. Super intuitive."'}
                      {activeRoleExplored === 'PMs' && '"We really need deadlines to sync automatically to our Google Calendars so cross-functional leads stay aligned."'}
                      {activeRoleExplored === 'Engineers' && '"Whenever my laptop wakes up from sleep on office WiFi, the real-time board disconnects until I force-refresh the page."'}
                      {activeRoleExplored === 'Sales' && '"Our finance department requires consolidated billing for our three regional operating entities on net-30 terms."'}
                    </p>
                    <div className="text-[10px] text-indigo-700 font-semibold pt-1 border-t border-slate-200/60">
                      {activeRoleExplored === 'Founder' && 'Action: Feature visual automation templates in self-serve onboarding guides.'}
                      {activeRoleExplored === 'PMs' && 'Action: Prioritize 2-way calendar sync milestone in upcoming sprint backlog.'}
                      {activeRoleExplored === 'Engineers' && 'Action: Implement exponential backoff with immediate ping probe on visibilitychange event.'}
                      {activeRoleExplored === 'Sales' && 'Action: Offer parent-child billing hierarchy in enterprise customer settings.'}
                    </div>
                  </div>

                  {/* Morning Delivery Note */}
                  <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200 text-[11px] text-amber-900 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock size={13} className="text-amber-600 shrink-0" />
                      <span>You will get daily digest at morning with updated reviews insights.</span>
                    </div>
                    <span className="text-[10px] font-bold text-amber-800 bg-white/80 px-2 py-0.5 rounded border border-amber-200/60">
                      Gmail &amp; Slack
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: HOW OUR SYSTEM WORKS (VISUAL FLOW) */}
      {/* ========================================================================= */}
      <section id="how-it-works" className="py-20 px-6 border-b border-slate-100 bg-slate-50/60">
        <div className="max-w-5xl mx-auto">

          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 text-xs font-semibold mb-3 shadow-xs">
              <Sliders size={13} className="text-indigo-600" />
              <span>Simple 3-Stage Pipeline</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
              How Laser AI Works
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              From raw, scattered customer reviews to role-filtered, ready-to-execute digests in three automated steps.
            </p>
          </div>

          {/* Visual Step-by-Step Flow Diagram */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">

            {/* Step 1: Google Sheet Icon */}
            <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between relative group hover:border-slate-300 transition-all">
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mb-5 shadow-xs">
                  <FileSpreadsheet size={24} />
                </div>

                <div className="inline-block px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase tracking-wider mb-2 border border-emerald-100">
                  Step 1 • Ingestion
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Google Sheet
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Raw user reviews, support tickets, and app store ratings stream in continuously.
                  Connect your live Google Sheet CSV or form responses once.
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-[11px] text-slate-500 font-mono">
                ✓ 150 SaaS Feedback Rows from Google Sheet
              </div>
            </div>

            {/* Step 2: Laser AI Icon */}
            <div className="bg-white p-7 rounded-2xl border-2 border-indigo-500 shadow-sm flex flex-col justify-between relative group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center mb-5 shadow-sm">
                  <Zap size={24} className="fill-current" />
                </div>

                <div className="inline-block px-2.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 text-[10px] font-bold uppercase tracking-wider mb-2 border border-indigo-100">
                  Step 2 • Analysis
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Done by Laser AI
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Our AI analyzes sentiment, identifies recurring complaints, assesses usability impact, and strictly filters feedback into dedicated stakeholder scopes.
                </p>
              </div>

              <div className="p-3 bg-indigo-50/60 rounded-xl border border-indigo-100 text-[11px] text-indigo-900 font-mono">
                ✓ NLP Role Segregation
              </div>
            </div>

            {/* Step 3: Gmail & Slack Icons */}
            <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between relative group hover:border-slate-300 transition-all">
              <div>
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center shadow-xs">
                    <Mail size={22} />
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center shadow-xs">
                    <Slack size={22} />
                  </div>
                </div>

                <div className="inline-block px-2.5 py-0.5 rounded-md bg-amber-50 text-amber-700 text-[10px] font-bold uppercase tracking-wider mb-2 border border-amber-100">
                  Step 3 • Delivery
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Gmail & Slack
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Tailored insights are delivered directly to each stakeholder's email and Slack channels. You will get daily digest at morning with updated reviews insights—giving everyone ready-to-act intelligence without extra logins.
                </p>
              </div>

              <div className="space-y-2">
                <div className="p-3 bg-amber-50/80 rounded-xl border border-amber-200 text-xs text-amber-950 font-semibold space-y-1 shadow-2xs">
                  <div className="flex items-center gap-1.5 text-amber-900 font-bold text-[11px]">
                    <Clock size={13} className="text-amber-600 shrink-0" />
                    <span>Morning Automated Delivery</span>
                  </div>
                  <p className="text-[11px] text-amber-800 font-normal leading-normal">
                    You will get daily digest at morning with updated reviews insights.
                  </p>
                </div>
                <div className="p-2.5 bg-amber-50/50 rounded-xl border border-amber-100 text-[11px] text-amber-900 font-mono">
                  ✓ Daily Digest at Morning with Updated Reviews Insights
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: THE PROBLEM WE SOLVE & KEY ADVANTAGES */}
      {/* ========================================================================= */}
      <section id="advantages" className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">

          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold mb-3">
              <ShieldCheck size={13} className="text-indigo-600" />
              <span>Core Value Proposition</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
              The Problem We Solve & Why Teams Choose Laser AI
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Customer feedback is the highest-value data a SaaS company collects, yet most teams fail to act on it because manual analysis is too slow and chaotic.
            </p>
          </div>

          {/* 3 Advantage Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Advantage 1 */}
            <div className="p-7 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center font-bold">
                  <Zap size={20} />
                </div>

                <h3 className="text-base font-bold text-slate-900">
                  Eliminate Multi-Step Manual Friction
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  Removes the slow, repetitive process of manually sorting feedback, reading row-by-row, and copy-pasting customer reviews into ChatGPT. Connect your sheet once and automate the entire pipeline.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200 text-xs text-slate-700 font-medium">
                <span className="text-indigo-600 font-bold block mb-1">Impact:</span>
                Saves 10+ hours per week per product manager.
              </div>
            </div>

            {/* Advantage 2 */}
            <div className="p-7 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center font-bold">
                  <Users size={20} />
                </div>

                <h3 className="text-base font-bold text-slate-900">
                  Built for Multiple Stakeholders (Role-Based Routing)
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  Insights are customized strictly to each person's scope: Founders see company-wide sentiment trends and recurring user pain points across all 150 reviews; PMs see feature demand and usability friction; Engineers see crash bugs and API timeouts; Sales sees deal blockers and SSO compliance.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200 text-xs text-slate-700 font-medium">
                <span className="text-indigo-600 font-bold block mb-1">Impact:</span>
                Zero irrelevant clutter for leadership, engineering, and sales teams.
              </div>
            </div>

            {/* Advantage 3 */}
            <div className="p-7 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center font-bold">
                  <Send size={20} />
                </div>

                <h3 className="text-base font-bold text-slate-900">
                  Automated Multi-Channel Delivery
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  Delivers formatted, ready-to-act digests directly to where teams already communicate. Automated daily or weekly digests arrive in Gmail and interactive Slack Block Kit cards.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200 text-xs text-slate-700 font-medium">
                <span className="text-indigo-600 font-bold block mb-1">Impact:</span>
                Immediate alignment across async and remote teams.
              </div>
            </div>

          </div>

          {/* Bottom Call-to-Action Banner */}
          <div className="mt-16 bg-slate-900 text-white rounded-3xl p-8 sm:p-12 text-center shadow-xl space-y-6">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Ready to eliminate feedback friction across your entire team?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
              Explore our interactive demo workspace and see how Laser AI transforms messy Google Sheets into role-scoped product intelligence.
            </p>
            <div className="pt-2">
              <button
                onClick={() => onStartDemo()}
                className="px-8 py-3.5 rounded-xl font-bold text-sm bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-md inline-flex items-center gap-2 group"
              >
                <span>Sign up</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* GLOBAL FOOTER */}
      {/* ========================================================================= */}
      <footer className="border-t border-slate-200 bg-white py-10 px-6 text-xs text-slate-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-indigo-600 text-white flex items-center justify-center font-bold text-[10px]">
              <Zap size={12} className="fill-current" />
            </div>
            <span className="font-bold text-slate-900">Laser AI</span>
            <span>• Automated Feedback Intelligence</span>
          </div>
          <div>
            Built for Founders, PMs, Engineers, and Sales teams.
          </div>
        </div>
      </footer>

    </div>
  );
}

// Small helper icon for trophy in metrics bar
function AwardIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  );
}
