import React, { useState } from 'react';
import {
  Zap,
  LayoutDashboard,
  FileSpreadsheet,
  Send,
  RefreshCw,
  Search,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Sparkles,
  Tag,
  User,
  Mail,
  Slack,
  Table2,
  ChevronRight,
  Filter,
  BarChart3,
  Layers,
  Settings,
  MessageSquare,
  Shield,
  ShieldCheck,
  Building2,
  Clock,
  ArrowRight,
  ArrowLeft,
  UploadCloud,
  RotateCcw,
  LogOut,
  UserCheck
} from 'lucide-react';

export default function DashboardScreen({
  user,
  digest,
  rawFeedback,
  loadingDigest,
  datasetInfo,
  canGoBack,
  onGoBack,
  onUploadDataset,
  onResetDataset,
  onSwitchRoleToOnboarding,
  onLogout,
  onRegenerate,
  onGoToPreview,
  onDispatch,
  dispatchResult,
  dispatching
}) {
  const [activeNav, setActiveNav] = useState('insights'); // 'insights' | 'raw' | 'preview'
  const [rawScopeMode, setRawScopeMode] = useState('scoped'); // 'scoped' | 'all'
  const [searchQuery, setSearchQuery] = useState('');
  const [previewTab, setPreviewTab] = useState('email'); // 'email' | 'slack'
  const [customEmail, setCustomEmail] = useState(user.email || '');
  const [customWebhook, setCustomWebhook] = useState(user.slack_webhook_url || '');
  const [uploadingFile, setUploadingFile] = useState(false);
  const [showDispatchModal, setShowDispatchModal] = useState(false);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const fileInputRef = React.useRef(null);
  const settingsMenuRef = React.useRef(null);

  React.useEffect(() => {
    function handleClickOutside(event) {
      if (settingsMenuRef.current && !settingsMenuRef.current.contains(event.target)) {
        setShowSettingsMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  React.useEffect(() => {
    if (dispatching) {
      setShowDispatchModal(true);
    }
  }, [dispatching]);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingFile(true);
    try {
      if (onUploadDataset) {
        await onUploadDataset(file);
      }
    } finally {
      setUploadingFile(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  React.useEffect(() => {
    setCustomEmail(user.email || '');
    setCustomWebhook(user.slack_webhook_url || '');
  }, [user]);

  const handleSendNow = () => {
    setShowDispatchModal(true);
    if (onDispatch) {
      onDispatch({
        recipientEmail: customEmail,
        slackWebhookUrl: customWebhook,
      });
    }
  };

  // Clean User Display calculation (Pic 1 fix: use actual user name filled in signup)
  const userDisplayName = user.name?.trim() || user.email?.split('@')[0] || 'Team Member';
  const userInitials = userDisplayName
    .split(' ')
    .filter(Boolean)
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase() || 'U';

  const role = user.role || 'Founder';
  // Privilege rule: Switch role only appears for Founders and PMs; Engineers and Sales are strictly role-isolated
  const isPrivilegedRole = ['Founder', 'Founders', 'PMs', 'PM'].includes(role);
  const isStrictScopedRole = role === 'Engineers' || role === 'Sales';

  // Role-Tailored Structured Data Dictionary (Matching the 4-part structure)
  const roleData = {
    Founder: {
      title: 'Company-Wide Executive Feedback Intelligence',
      scopeSubtitle: 'Full company-wide qualitative dataset (150 Reviews across 10 product areas)',
      activeCount: '150 of 150 Reviews Active',
      kpis: [
        {
          label: 'Total Feedback Analyzed',
          value: '150 Reviews',
          change: '+18% vs last month',
          changeType: 'positive',
          subtext: 'From connected Google Sheet (10 Product Areas)'
        },
        {
          label: 'Overall User Sentiment',
          value: '64% Positive',
          change: '+12% vs last week',
          changeType: 'positive',
          subtext: '22% Negative • 14% Neutral'
        },
        {
          label: 'Top Recurring Theme',
          value: 'Sharing & Export UX',
          change: '38 mentions',
          changeType: 'neutral',
          subtext: 'High velocity cross-team workflow friction'
        }
      ],
      synthesis: [
        'High Core Product Satisfaction: 64% of users praise core speed and workspace responsiveness, making Laser AI noticeably stickier than legacy Notion/Figma workflows.',
        'Collaboration Friction at Scale: 38 customer reviews cite sharing link failures on mobile browsers and confusion around workspace member permission tiers.',
        'Enterprise Expansion Blockers: Security procurement across 6 major accounts is frozen pending SAML/Okta SSO and granular sub-folder access controls.'
      ],
      sentimentChart: {
        title: 'Company-Wide Sentiment Distribution',
        segments: [
          { label: 'Positive', count: 96, pct: 64, color: 'bg-emerald-500', textColor: 'text-emerald-700', bgSoft: 'bg-emerald-50' },
          { label: 'Neutral', count: 21, pct: 14, color: 'bg-slate-400', textColor: 'text-slate-700', bgSoft: 'bg-slate-100' },
          { label: 'Negative', count: 33, pct: 22, color: 'bg-rose-500', textColor: 'text-rose-700', bgSoft: 'bg-rose-50' }
        ]
      },
      categoryChart: {
        title: 'Feedback Volume by Product Area',
        items: [
          { name: 'UI/UX & Mobile Usability', count: 45, max: 50, color: 'bg-indigo-500' },
          { name: 'Performance & Bug Reports', count: 40, max: 50, color: 'bg-rose-500' },
          { name: 'General & Collaboration', count: 35, max: 50, color: 'bg-emerald-500' },
          { name: 'Security & Enterprise Plans', count: 30, max: 50, color: 'bg-amber-500' }
        ]
      },
      insights: [
        {
          id: 'ins-1',
          theme: 'Collaboration & Sharing Workflow Friction',
          tag: 'UX Friction',
          tagColor: 'bg-rose-50 text-rose-700 border-rose-200',
          mentions: 'Mentioned in 38 reviews',
          takeaway: 'Fix universal deep-link routing on iOS Safari / Android Chrome and clarify editor vs view-only role badges in team settings.',
          quotes: [
            {
              text: 'Users love the new review layout, but 14 people reported that sharing links fail on mobile browsers with blank redirects.',
              author: 'Sarah Liu',
              tier: 'Enterprise'
            },
            {
              text: 'Admins cannot clearly tell whether a teammate has edit or view-only access on shared workspace folders.',
              author: 'Daniel Kim',
              tier: 'Scale'
            }
          ]
        },
        {
          id: 'ins-2',
          theme: 'Fast UI & High Core Retention Praise',
          tag: 'Positive Feedback',
          tagColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          mentions: 'Mentioned in 42 reviews',
          takeaway: 'Capitalize on speed advantage in marketing testimonials and agency workflow enablement case studies.',
          quotes: [
            {
              text: 'The real-time collaboration responsiveness is noticeably faster than Figma or Notion for our 80-person design team.',
              author: 'Marcus Brody',
              tier: 'Enterprise'
            },
            {
              text: 'One-click URL copy and clean board views made team onboarding completely painless across all our client accounts.',
              author: 'Elena Rostova',
              tier: 'Growth'
            }
          ]
        },
        {
          id: 'ins-3',
          theme: 'Enterprise Governance & Single Sign-On',
          tag: 'Compliance Need',
          tagColor: 'bg-amber-50 text-amber-700 border-amber-200',
          mentions: 'Mentioned in 24 reviews',
          takeaway: 'Fast-track SAML 2.0 / Okta identity federation and automated audit logging to unblock enterprise rollouts.',
          quotes: [
            {
              text: 'SAML/Okta SSO integration is required by our corporate infosec policy before expanding our contract.',
              author: 'David Vance',
              tier: 'Enterprise'
            },
            {
              text: 'Need weekly automated audit logs of who reviewed and exported shared feedback reports for external auditors.',
              author: 'Rachel Chen',
              tier: 'Enterprise'
            }
          ]
        }
      ]
    },
    PMs: {
      title: 'Product Management Roadmap & Usability Workspace',
      scopeSubtitle: 'Full product visibility organized by feature requests, UX friction points, and user workflows',
      activeCount: '150 of 150 Reviews Active',
      kpis: [
        {
          label: 'Total Feedback Analyzed',
          value: '150 Reviews',
          change: 'Roadmap Scoped',
          changeType: 'neutral',
          subtext: 'Organized by Feature Requests vs. UX Friction'
        },
        {
          label: 'Usability CSAT Score',
          value: '68% Positive',
          change: '+8% this sprint',
          changeType: 'positive',
          subtext: 'Mobile Safari & iPad touch target fixes pending'
        },
        {
          label: 'Total Feature Demands',
          value: '52 Requests',
          change: 'Top: Self-Serve ACL',
          changeType: 'neutral',
          subtext: '24 mentions for granular permission delegation'
        }
      ],
      synthesis: [
        'Self-Serve Permission Delegation in High Demand: 24 team leads demand the ability to assign sub-folder editor rights without global workspace admin intervention.',
        'Mobile & Tablet Interaction Bottlenecks: 14 reviews report iOS 18 Safari review prompt collisions, and 8 users cite iPad close hit-slop bounds being too small (16px).',
        'Viral Friction in External Sharing: Agency clients strongly push back against mandatory account creation just to view shared reporting dashboards.'
      ],
      sentimentChart: {
        title: 'Feedback Type Breakdown',
        segments: [
          { label: 'Feature Requests', count: 52, pct: 35, color: 'bg-indigo-500', textColor: 'text-indigo-700', bgSoft: 'bg-indigo-50' },
          { label: 'UX Friction Points', count: 48, pct: 32, color: 'bg-amber-500', textColor: 'text-amber-700', bgSoft: 'bg-amber-50' },
          { label: 'Usability Praise', count: 50, pct: 33, color: 'bg-emerald-500', textColor: 'text-emerald-700', bgSoft: 'bg-emerald-50' }
        ]
      },
      categoryChart: {
        title: 'Top Requested Features by Mention Count',
        items: [
          { name: 'Self-Serve Role Permission Delegation', count: 24, max: 30, color: 'bg-indigo-500' },
          { name: 'Dark Mode & Custom Theme Options', count: 19, max: 30, color: 'bg-purple-500' },
          { name: 'Passwordless Guest View Links', count: 16, max: 30, color: 'bg-blue-500' },
          { name: 'Automated Digest Frequency Triggers', count: 12, max: 30, color: 'bg-emerald-500' },
          { name: 'Audit Activity CSV Export', count: 8, max: 30, color: 'bg-slate-500' }
        ]
      },
      insights: [
        {
          id: 'pm-1',
          theme: 'Self-Serve Permission Delegation & Role Badges',
          tag: 'Feature Demand',
          tagColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
          mentions: 'Mentioned in 24 reviews',
          takeaway: 'Allow project owners to delegate sub-folder rights directly to eliminate admin bottlenecks across multi-user teams.',
          quotes: [
            {
              text: 'Team leads requested the ability to delegate workspace permissions without manual admin intervention.',
              author: 'Chloe Bennett',
              tier: 'Scale'
            },
            {
              text: 'Member list lacks clear visual chips distinguishing View-Only vs Project Editor roles.',
              author: 'Omar Faruk',
              tier: 'Growth'
            }
          ]
        },
        {
          id: 'pm-2',
          theme: 'Mobile Safari & Tablet Touch Target Friction',
          tag: 'UX Friction',
          tagColor: 'bg-amber-50 text-amber-700 border-amber-200',
          mentions: 'Mentioned in 22 reviews',
          takeaway: 'Increase iPad dialog hit-slop to minimum 44x44px and suppress review prompts during checkout flows.',
          quotes: [
            {
              text: 'Close button on iPad is only 16px wide and almost impossible to tap, forcing users to force-quit.',
              author: 'Mehedi Hasan',
              tier: 'Scale'
            },
            {
              text: 'In-app feedback prompt appeared right as I was entering credit card digits on mobile Safari.',
              author: 'Ayesha Rahman',
              tier: 'Growth'
            }
          ]
        },
        {
          id: 'pm-3',
          theme: 'Frictionless View-Only Guest Sharing Loops',
          tag: 'Growth Loop',
          tagColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          mentions: 'Mentioned in 16 reviews',
          takeaway: 'Implement signed JWT view-only session cookies with optional passcode protection to eliminate guest signup drop-offs.',
          quotes: [
            {
              text: 'Clients should not be forced to create a full account with password just to view a shared dashboard.',
              author: 'Nusrat Jahan',
              tier: 'Agency'
            },
            {
              text: 'Need ability to grant access to a specific subfolder without sharing the entire parent project repository.',
              author: 'Priya Das',
              tier: 'Enterprise'
            }
          ]
        }
      ]
    },
    Engineers: {
      title: 'Engineering Technical Triage & Reliability Workspace',
      scopeSubtitle: 'Strictly engineering-tagged reviews only (Bugs, crashes, worker timeouts, API sync failures)',
      activeCount: '40 of 150 Reviews Active (Technical Scope)',
      kpis: [
        {
          label: 'Technical Reviews Ingested',
          value: '40 Reviews',
          change: 'Engineering Scoped',
          changeType: 'neutral',
          subtext: 'Filtered from 150 master rows • Zero sales clutter'
        },
        {
          label: 'Critical Production Bugs',
          value: '14 Blocker Issues',
          change: 'Immediate Triage',
          changeType: 'negative',
          subtext: '504 gateway timeouts & iOS 18 UIKit constraint crashes'
        },
        {
          label: 'Max Export Latency',
          value: '78s Multi-Page Deck',
          change: 'Target SLA <5s',
          changeType: 'negative',
          subtext: 'Redis background worker queue required'
        }
      ],
      synthesis: [
        'Export Worker 504 Gateway Timeouts: Synchronous PDF/video compilation hangs worker processes over 60s, triggering gateway timeouts for 20-page analytics decks.',
        'UIKit Keyboard Constraint Collision on iOS 18: In-app rating modal throws fatal auto-layout recursion when virtual keyboard activates on mobile Safari.',
        'Production Warehouse Sync Failures: Bulk customer ingestion over 10,000 rows intermittently fails due to missing idempotency keys and worker thread pool saturation.'
      ],
      sentimentChart: {
        title: 'Technical Issue Severity Breakdown',
        segments: [
          { label: 'Critical (Blocker)', count: 14, pct: 35, color: 'bg-rose-500', textColor: 'text-rose-700', bgSoft: 'bg-rose-50' },
          { label: 'High (Urgent)', count: 16, pct: 40, color: 'bg-amber-500', textColor: 'text-amber-700', bgSoft: 'bg-amber-50' },
          { label: 'Medium (Latency)', count: 10, pct: 25, color: 'bg-blue-500', textColor: 'text-blue-700', bgSoft: 'bg-blue-50' }
        ]
      },
      categoryChart: {
        title: 'Issue Subsystem & Device Breakdown',
        items: [
          { name: 'Export Worker Synchronous 504 Timeouts', count: 16, max: 20, color: 'bg-rose-500' },
          { name: 'Mobile Safari / iOS 18 UIKit Crashes', count: 12, max: 20, color: 'bg-amber-500' },
          { name: 'Warehouse Batch API Sync Failures', count: 8, max: 20, color: 'bg-purple-500' },
          { name: 'Token Expiry & Short TTL 403 Errors', count: 4, max: 20, color: 'bg-blue-500' }
        ]
      },
      insights: [
        {
          id: 'eng-1',
          theme: 'PDF & Video Report Export Stalls (504 Timeout)',
          tag: 'Critical Backend',
          tagColor: 'bg-rose-50 text-rose-700 border-rose-200',
          mentions: '16 customer bug reports',
          takeaway: 'Migrate report rendering to an async background Redis task queue with webhook callback delivery.',
          quotes: [
            {
              text: 'Exporting a 20-page analytics deck takes 78 seconds and fails half the time with a 504 Gateway error.',
              author: 'Marketing Analyst (#CUST-308)',
              tier: 'Enterprise'
            },
            {
              text: 'Intermittent 504 Gateway Timeouts when syncing customer data warehouse batches over 10k rows.',
              author: 'Sarah Liu',
              tier: 'Enterprise'
            }
          ]
        },
        {
          id: 'eng-2',
          theme: 'iOS 18 Safari Constraint Recursion Crash',
          tag: 'Client Crash',
          tagColor: 'bg-rose-50 text-rose-700 border-rose-200',
          mentions: '12 customer crash reports',
          takeaway: 'Refactor KeyboardAvoidingView constraints in modal component and blacklist review prompts on checkout routes.',
          quotes: [
            {
              text: 'The in-app review modal popped up right during checkout on iOS 18 Safari and crashed my transaction!',
              author: 'Rafiq Khan',
              tier: 'Mobile Safari'
            },
            {
              text: 'Virtual keyboard pops up over the dialog causing fatal UIKit layout constraint crash on iPadOS 18.',
              author: 'Daniel Kim',
              tier: 'Tablet Cohort'
            }
          ]
        },
        {
          id: 'eng-3',
          theme: 'ACL Privilege Escalation & Short Link TTL',
          tag: 'Security Flaw',
          tagColor: 'bg-amber-50 text-amber-700 border-amber-200',
          mentions: '12 security tickets',
          takeaway: 'Enforce immutable Owner role permission checks and extend default invite link TTL from 10 minutes to 7 days.',
          quotes: [
            {
              text: 'An external contractor added as an editor was able to demote the original project owner to view-only!',
              author: 'Enterprise Workspace Admin',
              tier: 'Enterprise'
            },
            {
              text: 'Whenever I generate a project invite link, it expires after 10 minutes and external clients get a 403 Forbidden error.',
              author: 'Agency Project Lead',
              tier: 'Scale'
            }
          ]
        }
      ]
    },
    Sales: {
      title: 'Sales & Enterprise Commercial Pipeline Workspace',
      scopeSubtitle: 'Strictly sales-tagged reviews only (Deal blockers, SSO compliance, tier requests, objections)',
      activeCount: '30 of 150 Reviews Active (Commercial Scope)',
      kpis: [
        {
          label: 'Commercial Reviews Ingested',
          value: '30 Buyer Reviews',
          change: 'Sales Scoped',
          changeType: 'neutral',
          subtext: 'Strictly commercial & enterprise feedback • Zero bug clutter'
        },
        {
          label: 'Top Deal Blocker',
          value: '6 Deals Frozen',
          change: 'Procurement Hold',
          changeType: 'negative',
          subtext: 'Granular folder-level permissions required by infosec'
        },
        {
          label: 'Compliance & SSO Demands',
          value: '20 Account Requests',
          change: '12 Okta/SAML SSO',
          changeType: 'neutral',
          subtext: '8 requests for automated audit logging export'
        }
      ],
      synthesis: [
        'Folder-Level Gating is the #1 Enterprise Deal Blocker: 6 enterprise prospects in late-stage procurement are frozen because inviting contractors currently exposes parent spaces.',
        'Non-Negotiable SAML / Okta SSO Demand: 12 enterprise accounts require identity federation and automated audit logging before security approval.',
        'Account Creation Wall Deters Agency Prospects: Buyers frequently object to mandatory full account signups when sharing review dashboards with external executive clients.'
      ],
      sentimentChart: {
        title: 'Commercial Sentiment & Intent Breakdown',
        segments: [
          { label: 'Positive Buyer Intent', count: 18, pct: 60, color: 'bg-emerald-500', textColor: 'text-emerald-700', bgSoft: 'bg-emerald-50' },
          { label: 'Security & SSO Gated', count: 8, pct: 27, color: 'bg-amber-500', textColor: 'text-amber-700', bgSoft: 'bg-amber-50' },
          { label: 'Pricing & Seat Objections', count: 4, pct: 13, color: 'bg-rose-500', textColor: 'text-rose-700', bgSoft: 'bg-rose-50' }
        ]
      },
      categoryChart: {
        title: 'Top Enterprise Buyer Requirements',
        items: [
          { name: 'Granular Sub-Folder Permissions', count: 14, max: 15, color: 'bg-rose-500' },
          { name: 'SAML 2.0 / Okta Single Sign-On', count: 12, max: 15, color: 'bg-indigo-500' },
          { name: 'Automated Compliance Audit Logs', count: 8, max: 15, color: 'bg-blue-500' },
          { name: 'Passwordless Guest View Links', count: 7, max: 15, color: 'bg-emerald-500' },
          { name: 'Self-Serve Team Seat Allocation', count: 5, max: 15, color: 'bg-purple-500' }
        ]
      },
      insights: [
        {
          id: 'sales-1',
          theme: 'Granular Folder-Level Permissions Freeze Late-Stage Deals',
          tag: 'Deal Blocker',
          tagColor: 'bg-rose-50 text-rose-700 border-rose-200',
          mentions: '14 account objections',
          takeaway: 'Expedite folder-level ACL isolation to unblock 6 procurement reviews currently on freeze.',
          quotes: [
            {
              text: 'We urgently need granular folder-level permissions. Right now, inviting external contractors exposes our entire project space.',
              author: 'Enterprise Security Procurement (#CUST-804)',
              tier: 'Enterprise'
            },
            {
              text: 'Inviting external contractors exposes our entire project space unless folder-level gating is enforced.',
              author: 'Fortune 500 Infosec Lead',
              tier: 'Enterprise'
            }
          ]
        },
        {
          id: 'sales-2',
          theme: 'SAML / Okta Single Sign-On (SSO) Non-Negotiable',
          tag: 'Enterprise Compliance',
          tagColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
          mentions: '12 enterprise accounts',
          takeaway: 'Prioritize SAML 2.0 and SCIM directory sync in enterprise tier packaging to unlock annual contracts.',
          quotes: [
            {
              text: 'SAML/Okta SSO integration is required by our corporate infosec policy before expanding our contract.',
              author: 'Global Financial Services',
              tier: 'Enterprise'
            },
            {
              text: 'Need weekly automated audit logs of who reviewed and exported shared feedback reports.',
              author: 'Compliance Officer',
              tier: 'Scale'
            }
          ]
        },
        {
          id: 'sales-3',
          theme: 'Guest Account Wall Friction for External Clients',
          tag: 'Buyer Objection',
          tagColor: 'bg-amber-50 text-amber-700 border-amber-200',
          mentions: '7 agency accounts',
          takeaway: 'Enable read-only preview links with optional passcode to remove sign-up barrier for prospective clients.',
          quotes: [
            {
              text: 'Clients should not be forced to create a full account with password just to view a shared dashboard.',
              author: 'Agency Account Executive',
              tier: 'Agency'
            },
            {
              text: 'The one-click link copy is super fast, but external clients abandon when forced to create a password.',
              author: 'Design Director',
              tier: 'Scale'
            }
          ]
        }
      ]
    }
  };

  const activeRoleData = roleData[role] || roleData.Founder;

  // Single-Pass AI Synthesis & Filtered Outputs (Done by Laser AI)
  const synthesisBullets = (digest?.ai_summary_bullets && Array.isArray(digest.ai_summary_bullets) && digest.ai_summary_bullets.length > 0)
    ? digest.ai_summary_bullets
    : (activeRoleData?.synthesis || []);

  const dynamicThemes = (digest?.top_themes && Array.isArray(digest.top_themes) && digest.top_themes.length > 0)
    ? digest.top_themes
    : (activeRoleData?.insights || []);

  const totalReviewsCount = digest?.matched_role_rows_count !== undefined
    ? digest.matched_role_rows_count
    : (role === 'Engineers' ? 49 : role === 'Sales' ? 29 : (Array.isArray(rawFeedback) ? rawFeedback.length : 150));

  const totalSheetRowsCount = digest?.total_sheet_rows || datasetInfo?.totalRows || (Array.isArray(rawFeedback) ? rawFeedback.length : 150);

  const dynamicKpis = [
    {
      label: 'Total Feedback Analyzed',
      value: `${totalReviewsCount} Reviews`,
      change: `${totalReviewsCount} of ${totalSheetRowsCount} Scoped`,
      changeType: 'positive',
      subtext: `Done by Laser AI (${totalSheetRowsCount} Total Sheet Rows)`
    },
    {
      label: 'Overall User Sentiment',
      value: digest?.sentiment?.positive_pct !== undefined
        ? `${Math.round(digest.sentiment.positive_pct)}% Positive`
        : activeRoleData.kpis[1].value,
      change: '+12% vs last week',
      changeType: 'positive',
      subtext: digest?.sentiment?.overall || activeRoleData.kpis[1].subtext
    },
    {
      label: 'Top Recurring Theme',
      value: dynamicThemes[0]?.theme || activeRoleData.kpis[2].value,
      change: dynamicThemes[0]?.mentions ? `${dynamicThemes[0].mentions} mentions` : activeRoleData.kpis[2].change,
      changeType: 'neutral',
      subtext: 'Done by Laser AI semantic clustering'
    }
  ];

  // Dynamic Sentiment Chart Segments
  const sentimentSegments = digest?.sentiment?.positive_pct !== undefined
    ? [
      {
        label: 'Positive',
        count: Math.round(totalReviewsCount * (digest.sentiment.positive_pct / 100)),
        pct: Math.round(digest.sentiment.positive_pct),
        color: 'bg-emerald-500',
        textColor: 'text-emerald-700',
        bgSoft: 'bg-emerald-50'
      },
      {
        label: 'Neutral',
        count: Math.round(totalReviewsCount * (digest.sentiment.neutral_pct / 100)),
        pct: Math.round(digest.sentiment.neutral_pct),
        color: 'bg-slate-400',
        textColor: 'text-slate-700',
        bgSoft: 'bg-slate-100'
      },
      {
        label: 'Negative',
        count: Math.round(totalReviewsCount * (digest.sentiment.negative_pct / 100)),
        pct: Math.round(digest.sentiment.negative_pct),
        color: 'bg-rose-500',
        textColor: 'text-rose-700',
        bgSoft: 'bg-rose-50'
      }
    ]
    : activeRoleData.sentimentChart.segments;

  // Role-Based Review Filtering for Raw Rows View (Done by Laser AI)
  // For Engineers and Sales, role isolation strictly enforces that 'All Rows' is disabled and never accessible
  const effectiveScopeMode = isStrictScopedRole ? 'scoped' : rawScopeMode;
  const baseRawRows = (effectiveScopeMode === 'scoped' && Array.isArray(digest?.filtered_reviews) && digest.filtered_reviews.length > 0)
    ? digest.filtered_reviews
    : (isStrictScopedRole ? [] : (Array.isArray(rawFeedback) ? rawFeedback : []));

  const filteredRaw = (Array.isArray(baseRawRows) ? baseRawRows : []).filter((item) => {
    if ((effectiveScopeMode === 'scoped' || isStrictScopedRole) && (!digest?.filtered_reviews || digest.filtered_reviews.length === 0)) {
      const engRegex = /\b(504|gateway|timeout|crash|uikit|safari|firefox|memory leak|oom|freeze|disconnect|websocket|cache|redis|api|sync|oauth|webhook|jira|github|zapier|lag|slow|load time|export|upload|constraint|recursion|unresponsive|exception|bug|error|glitch|tab|white flash|progress bar|render|stalls|fails)\b/i;
      const salesRegex = /\b(sso|okta|saml|procurement|enterprise|deal|contract|pricing|plan|seat|tier|folder|permission|compliance|audit|client|buyer|sales|objection|competitor|quote|license|invoice|password|guest|view-only|agency|prospect|contractor|infosec|access control|annual)\b/i;
      if (role === 'Engineers' && !engRegex.test(item.feedback_text)) return false;
      if (role === 'Sales' && !salesRegex.test(item.feedback_text)) return false;
    }
    const q = searchQuery.toLowerCase();
    const textMatch = (item.feedback_text || '').toLowerCase().includes(q);
    const idMatch = (item.review_id || item.id || '').toLowerCase().includes(q);
    const userMatch = (item.user_name || item.customer_id || '').toLowerCase().includes(q);
    const tierMatch = (item.company_tier || item.customer_tier || '').toLowerCase().includes(q);

    return textMatch || idMatch || userMatch || tierMatch;
  });

  return (
    <div className="h-screen w-full bg-[#F8FAFC] text-slate-900 font-sans selection:bg-indigo-600 selection:text-white flex flex-col md:flex-row overflow-hidden relative">

      {/* ========================================================================= */}
      {/* CENTERED AI LOADING OVERLAY */}
      {/* ========================================================================= */}
      {(loadingDigest || uploadingFile) && (
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
                {uploadingFile ? 'Ingesting uploaded CSV / Excel with Gemini...' : 'Fetching real-time data...'}
              </p>
              <p className="text-[11px] text-slate-400 leading-relaxed pt-1">
                Ingesting {totalSheetRowsCount} customer reviews & synthesizing role intelligence
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* EMAIL DISPATCH LOADING & SUCCESS OVERLAY MODAL */}
      {/* ========================================================================= */}
      {showDispatchModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl border border-slate-100 flex flex-col items-center text-center space-y-4">
            {dispatching ? (
              <>
                {/* 1. SENDING STATE: Laser AI Logo with active loading rings */}
                <div className="relative flex items-center justify-center">
                  <div className="w-16 h-16 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/30">
                    <Zap size={30} className="fill-current animate-bounce" />
                  </div>
                  <div className="absolute -inset-2.5 rounded-3xl border-3 border-indigo-200 border-t-indigo-600 animate-spin" />
                </div>
                <div className="space-y-1.5 pt-1">
                  <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
                    Sending {role} Digest...
                  </h3>
                  <p className="text-xs font-bold text-indigo-600 animate-pulse">
                    Laser AI is delivering your email
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Dispatching live digest to <span className="font-semibold text-slate-600">{customEmail}</span>
                  </p>
                </div>
              </>
            ) : dispatchResult?.email_sent || dispatchResult?.slack_sent ? (
              <>
                {/* 2. SUCCESS STATE: Animated transition into vibrant green checkmark */}
                <div className="relative flex items-center justify-center">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30 transition-all duration-500 scale-105">
                    <CheckCircle2 size={34} className="stroke-[2.5]" />
                  </div>
                  <div className="absolute -inset-2 rounded-3xl border-2 border-emerald-300 animate-ping opacity-35" />
                </div>
                <div className="space-y-2 pt-1">
                  <h3 className="text-base font-black text-slate-900 tracking-tight">
                    Digest Sent Successfully!
                  </h3>
                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-950 font-semibold leading-relaxed">
                    Digest sent to your <span className="underline font-bold text-emerald-900">{customEmail}</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Check your Inbox and Spam / Promotions folder for the email from <span className="font-semibold text-slate-600">Laser AI</span>.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowDispatchModal(false)}
                  className="w-full py-2.5 px-4 rounded-xl font-bold text-xs bg-slate-900 hover:bg-slate-800 text-white transition-all shadow-sm cursor-pointer mt-1"
                >
                  Got It
                </button>
              </>
            ) : (
              <>
                {/* 3. ERROR STATE */}
                <div className="w-16 h-16 rounded-2xl bg-rose-500 text-white flex items-center justify-center shadow-lg shadow-rose-500/20">
                  <AlertCircle size={32} />
                </div>
                <div className="space-y-1.5 pt-1">
                  <h3 className="text-base font-extrabold text-slate-900">
                    Delivery Issue
                  </h3>
                  <p className="text-xs text-rose-600 font-medium">
                    {dispatchResult?.email_message || 'Could not deliver email. Please try again.'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowDispatchModal(false)}
                  className="w-full py-2.5 px-4 rounded-xl font-bold text-xs bg-slate-900 hover:bg-slate-800 text-white transition-all shadow-sm cursor-pointer mt-1"
                >
                  Close
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MINIMAL RIGID LEFT SIDEBAR: Pinned firmly in view, only right content scrolls */}
      {/* ========================================================================= */}
      <aside className="w-full md:w-64 h-full bg-white border-r border-slate-200/90 flex flex-col justify-between shrink-0 select-none overflow-hidden">
        <div className="flex-1 flex flex-col min-h-0 overflow-y-auto">
          {/* Logo Brand Header: Clickable, navigates directly to Insights Dashboard */}
          <div className="h-16 px-6 border-b border-slate-100 flex items-center justify-between shrink-0">
            <button
              onClick={() => setActiveNav('insights')}
              className="flex items-center gap-3 text-left hover:opacity-80 transition-opacity cursor-pointer group"
              title="Go to Insights Dashboard"
            >
              <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-black shadow-xs group-hover:scale-105 transition-transform">
                <Zap size={18} className="fill-current" />
              </div>
              <div>
                <span className="font-extrabold text-base tracking-tight text-slate-900 block leading-tight">
                  Laser AI
                </span>
                <span className="text-[10px] text-slate-400 font-medium tracking-wide">
                  Feedback Intelligence
                </span>
              </div>
            </button>
          </div>

          {/* Minimal 3 Navigation Items */}
          <div className="p-4 space-y-1.5">
            <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Workspace Menu
            </div>

            {/* Nav Item 1: Insights Dashboard */}
            <button
              onClick={() => setActiveNav('insights')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${activeNav === 'insights'
                ? 'bg-indigo-50 text-indigo-700 shadow-xs border border-indigo-100 font-bold'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
            >
              <LayoutDashboard size={16} className={activeNav === 'insights' ? 'text-indigo-600' : 'text-slate-400'} />
              <span>Insights Dashboard</span>
            </button>

            {/* Nav Item 2: Raw Google Sheet (Dynamic Rows) */}
            <button
              onClick={() => setActiveNav('raw')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${activeNav === 'raw'
                ? 'bg-indigo-50 text-indigo-700 shadow-xs border border-indigo-100 font-bold'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
            >
              <div className="flex items-center gap-3">
                <FileSpreadsheet size={16} className={activeNav === 'raw' ? 'text-indigo-600' : 'text-slate-400'} />
                <span>Raw Google Sheet</span>
              </div>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                {totalSheetRowsCount} Rows
              </span>
            </button>

            {/* Nav Item 3: Email & Slack Preview */}
            <button
              onClick={() => setActiveNav('preview')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${activeNav === 'preview'
                ? 'bg-indigo-50 text-indigo-700 shadow-xs border border-indigo-100 font-bold'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
            >
              <div className="flex items-center gap-3">
                <Send size={16} className={activeNav === 'preview' ? 'text-indigo-600' : 'text-slate-400'} />
                <span>Email & Slack Preview</span>
              </div>
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${activeNav === 'preview'
                ? 'bg-indigo-100 text-indigo-800 border-indigo-200'
                : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                }`}>
                Live
              </span>
            </button>
          </div>

          {/* DATASET SOURCE SECTION: Change CSV or Excel file */}
          <div className="px-4 py-3 border-t border-slate-100 space-y-2">
            <div className="flex items-center justify-between px-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Dataset Source
              </span>
              {datasetInfo?.isCustom ? (
                <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wide bg-amber-50 text-amber-700 border border-amber-200">
                  Custom File
                </span>
              ) : (
                <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wide bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Google Sheet
                </span>
              )}
            </div>

            {/* Active Source Card */}
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-md bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5">
                  <FileSpreadsheet size={13} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-bold text-slate-800 truncate" title={datasetInfo?.filename || 'Connected Google Sheet'}>
                    {datasetInfo?.filename || 'Connected Google Sheet'}
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium">
                    {totalSheetRowsCount} qualitative reviews
                  </div>
                </div>
              </div>

              {/* Hidden File Input for CSV / Excel (Only Founders and PMs have dataset management permissions) */}
              {isPrivilegedRole && (
                <>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept=".csv, .xlsx, .xls, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    className="hidden"
                  />

                  <div className="flex flex-col gap-1.5 pt-0.5">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploadingFile || loadingDigest}
                      className="w-full py-1.5 px-2.5 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer disabled:opacity-50"
                      title="Upload CSV or Excel sheet"
                    >
                      <UploadCloud size={13} className="text-indigo-600" />
                      <span>{uploadingFile ? 'Analyzing...' : 'Change CSV / Excel'}</span>
                    </button>

                    <div className="text-[10px] text-slate-400 text-center font-medium">
                      Supports .CSV, .XLSX, .XLS files
                    </div>

                    {datasetInfo?.isCustom && (
                      <button
                        type="button"
                        onClick={onResetDataset}
                        disabled={uploadingFile || loadingDigest}
                        className="w-full py-1 px-2 rounded-lg text-[10px] font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-100 flex items-center justify-center gap-1 transition-colors"
                      >
                        <RotateCcw size={11} />
                        <span>Reset to Default Sheet</span>
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Profile Card */}
        <div className="p-4 border-t border-slate-200/80 bg-slate-50/60 space-y-3 shrink-0 relative" ref={settingsMenuRef}>
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className="w-9 h-9 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shadow-xs shrink-0">
                {userInitials}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-bold text-slate-900 truncate">
                  {userDisplayName}
                </div>
                <div className="text-[11px] font-semibold text-indigo-600">
                  {role}
                </div>
              </div>
            </div>

            {/* Settings Gear Icon Button (Only for Founders and PMs) */}
            {isPrivilegedRole && (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowSettingsMenu(!showSettingsMenu)}
                  className={`p-1.5 rounded-lg border transition-all cursor-pointer ${showSettingsMenu
                      ? 'bg-slate-200 border-slate-300 text-slate-900'
                      : 'border-slate-200 bg-white hover:bg-slate-100 text-slate-600 shadow-xs'
                    }`}
                  title="Settings & Options"
                >
                  <Settings size={15} />
                </button>

                {/* Popover Menu: Switch Role and Log Out */}
                {showSettingsMenu && (
                  <div className="absolute right-0 bottom-full mb-2 w-44 bg-white border border-slate-200 rounded-xl shadow-xl p-1.5 z-50 text-xs space-y-0.5">
                    <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 mb-1">
                      Account Options
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setShowSettingsMenu(false);
                        onSwitchRoleToOnboarding();
                      }}
                      className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 font-semibold transition-colors cursor-pointer"
                    >
                      <UserCheck size={14} className="text-indigo-600 shrink-0" />
                      <span>Switch Role</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowSettingsMenu(false);
                        if (onLogout) onLogout();
                      }}
                      className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-rose-600 hover:bg-rose-50 font-semibold transition-colors cursor-pointer"
                    >
                      <LogOut size={14} className="text-rose-500 shrink-0" />
                      <span>Log Out</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* For Engineers and Sales: Direct Log Out button at bottom (no settings gear, no strict line) */}
          {!isPrivilegedRole && (
            <button
              type="button"
              onClick={() => {
                if (onLogout) onLogout();
              }}
              className="w-full py-1.5 px-3 rounded-lg border border-slate-200 bg-white hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 text-xs font-semibold text-slate-700 flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer"
              title="Log Out"
            >
              <LogOut size={13} className="text-rose-500" />
              <span>Log Out</span>
            </button>
          )}
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* MAIN CONTENT AREA: Only this right pane scrolls independently */}
      {/* ========================================================================= */}
      <main className="flex-1 h-full flex flex-col bg-[#F8FAFC] overflow-y-auto min-w-0">

        {/* Top Header Bar (Clean breadcrumb & status, in-app back removed as Chrome Back handles it) */}
        <header className="h-16 px-6 lg:px-8 border-b border-slate-200/80 bg-white flex items-center justify-between gap-4 sticky top-0 z-30">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span>Home</span>
            <ChevronRight size={12} className="text-slate-400" />
            <span>Feedback Intelligence</span>
            <ChevronRight size={12} className="text-slate-400" />
            <span className="font-bold text-slate-900">{role} Scope</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-medium text-slate-500 hidden sm:inline">
              {datasetInfo?.isCustom ? `Dataset: ${datasetInfo.filename}` : 'Google Sheets Connected'}
            </span>
          </div>
        </header>

        {/* Sub-Header Title Bar (Includes Relocated Dispatch Digest & Refresh Buttons) */}
        <div className="px-6 lg:px-8 py-5 border-b border-slate-200/70 bg-white">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200">
                  {role} Scope
                </span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs text-slate-500 font-medium">
                  {activeNav === 'insights' && (datasetInfo?.isCustom ? `Analyzed: ${datasetInfo.filename}` : 'Pre-Connected Google Sheet Ingestion')}
                  {activeNav === 'raw' && (isStrictScopedRole ? `Strictly Scoped ${role} Table (${filteredRaw.length} Reviews)` : `Live Raw ${datasetInfo?.isCustom ? datasetInfo.filename : 'Google Sheet'} Table (${totalSheetRowsCount} Rows)`)}
                  {activeNav === 'preview' && 'Instant Multi-Channel Dispatch'}
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                {activeNav === 'insights' && activeRoleData.title}
                {activeNav === 'raw' && (isStrictScopedRole ? `Strictly Scoped ${role} Feedback (${filteredRaw.length} Reviews)` : `${datasetInfo?.isCustom ? datasetInfo.filename : 'Connected Google Sheet'} (${totalSheetRowsCount} Feedback Rows)`)}
                {activeNav === 'preview' && 'Email & Slack Digest Preview & Dispatch'}
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                {activeNav === 'insights' && activeRoleData.scopeSubtitle}
                {activeNav === 'raw' && (isStrictScopedRole ? `Displaying exclusively ${role}-scoped customer reviews. Access to other department reviews is strictly restricted by role policy.` : `Explore all ${totalSheetRowsCount} qualitative feedback rows ingested from ${datasetInfo?.isCustom ? datasetInfo.filename : 'Google Sheets'}, filtered by your active role permissions.`)}
                {activeNav === 'preview' && 'Review the live formatted email digest or Slack Block Kit message before instant dispatch to your team.'}
              </p>
            </div>

            {/* Relocated Dispatch Digest, Refresh & View Selector in Below Section */}
            <div className="flex items-center gap-3 shrink-0">
              {activeNav === 'preview' && (
                <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 shrink-0">
                  <button
                    onClick={() => setPreviewTab('email')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${previewTab === 'email'
                      ? 'bg-white text-indigo-600 shadow-xs border border-slate-200/80 font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                      }`}
                  >
                    <Mail size={13} />
                    <span>Email Digest</span>
                  </button>
                  <button
                    onClick={() => setPreviewTab('slack')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${previewTab === 'slack'
                      ? 'bg-white text-slate-900 shadow-xs border border-slate-200/80 font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                      }`}
                  >
                    <Slack size={13} />
                    <span>Slack Block Kit</span>
                  </button>
                </div>
              )}

              <button
                onClick={onRegenerate}
                className="p-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all shadow-xs"
                title="Regenerate Analysis with Laser AI"
              >
                <RefreshCw size={14} className={loadingDigest ? 'animate-spin text-indigo-600' : ''} />
              </button>

              <button
                onClick={() => setActiveNav('preview')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-2 ${activeNav === 'preview'
                  ? 'bg-indigo-700 text-white ring-2 ring-indigo-600/20'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                  }`}
              >
                <Send size={13} />
                <span>Dispatch Digest</span>
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* VIEW 1: INSIGHTS DASHBOARD (CLEAN 4-PART STRUCTURE) */}
        {/* ========================================================================= */}
        {activeNav === 'insights' && (
          <div className="p-6 lg:p-8 space-y-6 max-w-6xl">

            {/* Informational Feature Detail: Daily Morning Digest Schedule */}
            <div className="bg-indigo-50/70 border border-indigo-200/80 rounded-2xl px-5 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-indigo-950 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Clock size={16} />
                </div>
                <div>
                  <span className="font-bold text-slate-900 block text-xs">Automated Morning Schedule</span>
                  <span className="text-slate-600 text-[11px]">You will get daily digest at morning with updated reviews insights delivered directly to your destination email and Slack.</span>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold border border-emerald-200 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                  Morning Schedule Active
                </span>
              </div>
            </div>

            {/* PART 1: TOP 3 KPI CARDS (PURE FEEDBACK METRICS — ZERO FINANCIAL/ARR METRICS) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {dynamicKpis.map((kpi, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs hover:shadow-sm transition-all"
                >
                  <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2">
                    <span>{kpi.label}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${kpi.changeType === 'positive' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                      kpi.changeType === 'negative' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                        'bg-slate-100 text-slate-700 border border-slate-200'
                      }`}>
                      {kpi.change}
                    </span>
                  </div>
                  <div className="text-2xl font-black text-slate-900 tracking-tight">
                    {kpi.value}
                  </div>
                  <div className="text-xs text-slate-500 mt-2 font-medium">
                    {kpi.subtext}
                  </div>
                </div>
              ))}
            </div>

            {/* PART 2: AI EXECUTIVE SYNTHESIS BOX (3 PLAIN-ENGLISH BULLETS) */}
            <div className="bg-gradient-to-r from-indigo-50/80 via-white to-purple-50/50 border border-indigo-200/80 rounded-2xl p-6 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-indigo-700 font-bold text-xs uppercase tracking-wider">
                <Sparkles size={15} className="text-indigo-600" />
                <span>Laser AI Executive Synthesis</span>
                <span className="text-[10px] font-semibold text-slate-400 normal-case">• Done by Laser AI</span>
              </div>

              <div className="space-y-2.5 pt-1">
                {synthesisBullets.map((bullet, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                    <span className="text-indigo-600 font-bold text-base leading-none mt-0.5">•</span>
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* PART 3: 2 VISUAL CHARTS (SENTIMENT BREAKDOWN + CATEGORY FREQUENCY) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

              {/* Chart 1: Sentiment Breakdown */}
              <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BarChart3 size={16} className="text-indigo-600" />
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      {activeRoleData.sentimentChart.title}
                    </h3>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-400">Total Scoped Ratio</span>
                </div>

                {/* Stacked Proportional Bar */}
                <div className="w-full h-4 rounded-full overflow-hidden flex bg-slate-100 p-0.5 gap-0.5">
                  {sentimentSegments.map((seg, idx) => (
                    <div
                      key={idx}
                      style={{ width: `${seg.pct}%` }}
                      className={`${seg.color} rounded-sm transition-all`}
                      title={`${seg.label}: ${seg.count} (${seg.pct}%)`}
                    />
                  ))}
                </div>

                {/* Legend Cards */}
                <div className="grid grid-cols-3 gap-2.5 pt-1">
                  {sentimentSegments.map((seg, idx) => (
                    <div key={idx} className={`p-2.5 rounded-xl border border-slate-100 ${seg.bgSoft}`}>
                      <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-600 mb-1">
                        <span className={`w-2 h-2 rounded-full ${seg.color}`} />
                        <span>{seg.label}</span>
                      </div>
                      <div className={`text-base font-extrabold ${seg.textColor}`}>
                        {seg.pct}%
                      </div>
                      <div className="text-[10px] text-slate-400 font-medium">
                        {seg.count} reviews
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chart 2: Category / Theme Frequency Breakdown */}
              <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Layers size={16} className="text-indigo-600" />
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      {activeRoleData.categoryChart.title}
                    </h3>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-400">Mention Count</span>
                </div>

                {/* Horizontal Bar Items */}
                <div className="space-y-3 pt-1">
                  {activeRoleData.categoryChart.items.map((item, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                        <span className="truncate pr-2">{item.name}</span>
                        <span className="font-bold text-slate-900 shrink-0">{item.count}</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          style={{ width: `${(item.count / item.max) * 100}%` }}
                          className={`h-full ${item.color} rounded-full transition-all`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* PART 4: TOP GROUPED INSIGHTS & DIRECT USER QUOTES (CLEAN CARDS) */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-extrabold text-slate-900">
                    Top Grouped Themes & Direct Customer Quotes
                  </h2>
                  <p className="text-xs text-slate-500">
                    Done by Laser AI directly from un-tagged Google Sheet rows.
                  </p>
                </div>
                <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-200">
                  {dynamicThemes.length} Grouped Themes
                </span>
              </div>

              <div className="space-y-4">
                {dynamicThemes.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs hover:border-slate-300 transition-all space-y-4"
                  >
                    {/* Header Row */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                      <div className="flex items-center gap-2.5">
                        <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold border ${item.tagColor || 'bg-indigo-50 text-indigo-700 border-indigo-200'}`}>
                          {item.tag}
                        </span>
                        <h3 className="text-sm sm:text-base font-bold text-slate-900">
                          {item.theme}
                        </h3>
                      </div>
                      <div className="text-xs font-semibold text-slate-500 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-100 shrink-0">
                        {item.mentions ? `${item.mentions} mentions` : 'High velocity'}
                      </div>
                    </div>

                    {/* Actionable Takeaway */}
                    <div className="bg-slate-50/80 rounded-xl p-3 border border-slate-100 flex items-start gap-2.5">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-700 bg-indigo-100/70 px-2 py-0.5 rounded shrink-0 mt-0.5">
                        Action Takeaway
                      </span>
                      <p className="text-xs text-slate-700 font-medium leading-relaxed">
                        {item.takeaway}
                      </p>
                    </div>

                    {/* Real Customer Quotes */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                      {Array.isArray(item?.quotes) && item.quotes.map((q, qIdx) => (
                        <div
                          key={qIdx}
                          className="bg-white rounded-xl p-3.5 border border-slate-200/80 shadow-xs space-y-2 flex flex-col justify-between"
                        >
                          <p className="text-xs text-slate-600 italic leading-relaxed">
                            "{q.text}"
                          </p>
                          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                            <span className="font-bold text-slate-800 flex items-center gap-1.5">
                              <User size={12} className="text-slate-400" />
                              {q.author}
                            </span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-600">
                              {q.tier}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 2: RAW ROWS VIEW */}
        {/* ========================================================================= */}
        {activeNav === 'raw' && (
          <div className="p-6 lg:p-8 space-y-4 max-w-6xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  {datasetInfo?.isCustom ? datasetInfo.filename : 'Pre-Connected Google Sheet'} Feedback Rows
                </h2>
                <p className="text-xs text-slate-500">
                  Live {totalSheetRowsCount}-row customer feedback dataset ingested into Laser AI.
                  {role === 'Engineers' && ' Filtered strictly to technical bugs, latency, and integration issues.'}
                  {role === 'Sales' && ' Filtered strictly to enterprise procurement, SSO, and customer objections.'}
                  {(role === 'Founders' || role === 'Founder' || role === 'PMs') && ' Full company-wide product dataset access.'}
                </p>
              </div>

              {/* Scoped Toggle & Search (Only Founders & PMs can access 'All Rows'; Engineers & Sales are strictly scoped) */}
              <div className="flex items-center gap-2.5">
                {isPrivilegedRole ? (
                  <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs font-semibold">
                    <button
                      onClick={() => setRawScopeMode('scoped')}
                      className={`px-3 py-1 rounded-md transition-all ${rawScopeMode === 'scoped' ? 'bg-white text-indigo-600 shadow-xs font-bold' : 'text-slate-600'
                        }`}
                    >
                      Strictly Scoped ({filteredRaw.length})
                    </button>
                    <button
                      onClick={() => setRawScopeMode('all')}
                      className={`px-3 py-1 rounded-md transition-all ${rawScopeMode === 'all' ? 'bg-white text-indigo-600 shadow-xs font-bold' : 'text-slate-600'
                        }`}
                    >
                      All {totalSheetRowsCount} Rows
                    </button>
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold shadow-xs">
                    <Shield size={13} className="text-indigo-600 shrink-0" />
                    <span>Strictly Scoped ({filteredRaw.length} {role} Reviews)</span>
                  </div>
                )}
              </div>
            </div>

            {/* Search Input Bar */}
            <div className="relative">
              <Search size={14} className="absolute left-3.5 top-3 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search raw feedback by customer, area, department, or keyword..."
                className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 shadow-xs"
              />
            </div>

            {/* Table */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
              <div className="max-h-[640px] overflow-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAFAFC] border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px] sticky top-0 z-10">
                    <tr>
                      <th className="p-3">Review ID</th>
                      <th className="p-3">Date</th>
                      <th className="p-3">User Name</th>
                      <th className="p-3">Company Tier</th>
                      <th className="p-3">Customer Feedback Text</th>
                      <th className="p-3">AI Sentiment</th>
                      <th className="p-3">AI Role Match</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredRaw.map((row) => {
                      const id = row.review_id || row.id;
                      const date = row.date || row.timestamp;
                      const user = row.user_name || row.customer_id;
                      const tier = row.company_tier || row.customer_tier || 'Enterprise';
                      const sentiment = row.sentiment || 'Neutral';
                      const reason = row.relevance_reason || (role === 'Engineers' ? 'Technical Bug' : role === 'Sales' ? 'Commercial Scope' : 'Product Scope');

                      return (
                        <tr key={id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="p-3 font-mono text-slate-500 font-bold whitespace-nowrap">{id}</td>
                          <td className="p-3 text-slate-500 whitespace-nowrap text-[11px]">{date}</td>
                          <td className="p-3 font-semibold text-slate-900 whitespace-nowrap">{user}</td>
                          <td className="p-3 whitespace-nowrap">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${tier === 'Enterprise' ? 'bg-purple-50 text-purple-700 border border-purple-200' :
                              tier === 'Scale' || tier === 'Mid-Market' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                                tier === 'Growth' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                                  'bg-slate-100 text-slate-700'
                              }`}>
                              {tier}
                            </span>
                          </td>
                          <td className="p-3 text-slate-700 max-w-lg leading-relaxed">{row.feedback_text}</td>
                          <td className="p-3 whitespace-nowrap">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${sentiment === 'Positive' ? 'bg-emerald-50 text-emerald-700' :
                              sentiment === 'Negative' ? 'bg-rose-50 text-rose-700' :
                                'bg-slate-100 text-slate-700'
                              }`}>
                              {sentiment}
                            </span>
                          </td>
                          <td className="p-3 whitespace-nowrap text-[11px]">
                            <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 text-[10px] font-semibold border border-indigo-100">
                              {reason}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 3: EMAIL & SLACK PREVIEW & MULTI-CHANNEL DISPATCH */}
        {/* ========================================================================= */}
        {activeNav === 'preview' && (
          <div className="p-6 lg:p-8 space-y-6 max-w-7xl">
            {/* Top status bar inside view */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                <Send size={14} className="text-indigo-600" />
                <span>Exact Live Digest Preview ({previewTab.toUpperCase()}) — Scoped for: {role}</span>
              </div>
              <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                <CheckCircle2 size={12} />
                Live Multi-Channel Sync
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Live Preview Render (8 cols) */}
              <div className="lg:col-span-8 flex flex-col space-y-4">
                {/* Email Tab View */}
                {previewTab === 'email' && (
                  <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs flex-1 flex flex-col">
                    {/* Fake Email Client Chrome */}
                    <div className="px-6 py-3 bg-slate-100/80 border-b border-slate-200 flex items-center justify-between text-xs text-slate-600">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-400 inline-block" />
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
                        <span className="ml-2 font-mono text-[11px] text-slate-600 font-medium">
                          Subject: 🎯 Laser AI — {role} Digest
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-500">To: {customEmail || user.email}</span>
                    </div>

                    {/* Email Content Container */}
                    <div className="p-6 bg-slate-50">
                      <div className="max-w-2xl mx-auto bg-white text-slate-900 rounded-xl overflow-hidden shadow-xs border border-slate-200">
                        {/* Email Banner */}
                        <div className="bg-slate-900 p-6 text-white">
                          <div className="text-[10px] font-extrabold tracking-widest uppercase text-indigo-400 mb-1">
                            Laser AI Feedback Intelligence
                          </div>
                          <h2 className="text-xl font-extrabold text-white">
                            {role} Product Digest
                          </h2>
                          <div className="text-xs text-slate-400 mt-1">
                            {digest?.generated_at || 'Just now'} • Scoped strictly for {role} ({userDisplayName})
                          </div>
                        </div>

                        <div className="p-6 bg-slate-50 space-y-6">
                          {/* Executive Summary */}
                          <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
                            <div className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider mb-1">
                              Executive Summary
                            </div>
                            <p className="text-xs text-slate-700 leading-relaxed font-medium">
                              {digest?.executive_summary || activeRoleData.synthesis.join(' ')}
                            </p>
                          </div>

                          {/* Qualitative KPIs */}
                          <div className="grid grid-cols-3 gap-3">
                            {(digest?.metrics || activeRoleData.kpis).map((m, i) => (
                              <div key={i} className="bg-white p-3 rounded-lg border border-slate-200 text-center shadow-xs">
                                <div className="text-[10px] uppercase text-slate-500 font-bold">{m.label}</div>
                                <div className="text-lg font-black text-slate-900">{m.value}</div>
                                <div className="text-[10px] font-semibold text-indigo-600">{m.change}</div>
                              </div>
                            ))}
                          </div>

                          {/* Top User Pain Points / Urgent Blockers */}
                          <div>
                            <h4 className="text-xs font-extrabold uppercase tracking-wider text-rose-600 mb-2">
                              {role === 'Founder' ? '🚨 Top User Pain Points & Blockers' : role === 'Engineers' ? '🚨 Critical Bugs & Latency Fixes' : role === 'Sales' ? '🚨 Top Deal Blockers & Governance' : '🚨 Urgent UX Friction Points'}
                            </h4>
                            <div className="space-y-2">
                              {((digest?.urgent_bugs && digest.urgent_bugs.length > 0) ? digest.urgent_bugs : activeRoleData.insights).slice(0, 3).map((b, idx) => (
                                <div key={b.id || idx} className="bg-white p-3 rounded-lg border-l-4 border-rose-500 border border-slate-200 text-xs shadow-xs">
                                  <div className="font-bold text-slate-900 mb-1">{b.title || b.theme}</div>
                                  <div className="text-slate-600 italic mb-1 bg-slate-50 p-2 rounded border border-slate-100">
                                    "{b.evidence_quote || b.quotes?.[0]?.text || 'User reported workflow friction.'}"
                                  </div>
                                  <div className="text-slate-800">
                                    <strong>Action:</strong> {b.suggested_action || b.takeaway || 'Follow up with product team.'}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Feature Requests */}
                          <div>
                            <h4 className="text-xs font-extrabold uppercase tracking-wider text-indigo-600 mb-2">
                              {role === 'Founder' ? '💡 Top Feature Requests & Enhancements' : role === 'Engineers' ? '💡 Infrastructure & Performance Requests' : role === 'Sales' ? '💡 Requested Enterprise Features' : '💡 Top Scoped Feature Demands'}
                            </h4>
                            <div className="space-y-2">
                              {((digest?.top_feature_requests && digest.top_feature_requests.length > 0) ? digest.top_feature_requests : activeRoleData.insights.slice(1, 3)).map((f, idx) => (
                                <div key={f.id || idx} className="bg-white p-3 rounded-lg border-l-4 border-indigo-500 border border-slate-200 text-xs shadow-xs">
                                  <div className="font-bold text-slate-900 mb-0.5">
                                    {f.title || f.theme} {f.requested_by ? `(${f.requested_by})` : ''}
                                  </div>
                                  <div className="text-slate-600 mb-1">
                                    <strong>Impact:</strong> {f.business_impact || f.mentions || 'High user demand'}
                                  </div>
                                  <div className="text-slate-800">
                                    <strong>Recommendation:</strong> {f.recommendation || f.takeaway || 'Schedule for upcoming sprint'}
                                  </div>
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
                              {(digest?.action_checklist || [
                                'Review top recurring themes in team standup',
                                'Prioritize sharing links bug fix for mobile browsers',
                                'Sync with enterprise leads on folder permission requirements'
                              ]).map((item, i) => (
                                <li key={i}>{item}</li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="p-3 bg-slate-100 text-center text-[10px] text-slate-500 border-t border-slate-200 font-medium">
                          Laser AI Automated Feedback Intelligence • Delivered strictly for {role}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Slack Tab View */}
                {previewTab === 'slack' && (
                  <div className="bg-[#1A1D21] border border-slate-800 rounded-2xl overflow-hidden shadow-xs flex-1 flex flex-col">
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
                    <div className="p-6 space-y-4">
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
                            <span className="text-xs text-slate-500">Today at 12:00 PM</span>
                          </div>

                          {/* Slack Block Kit Message Box */}
                          <div className="p-4 rounded-lg bg-[#222529] border border-slate-700/60 text-xs space-y-3 font-sans">
                            <div className="font-bold text-base text-white">
                              🎯 Laser AI — {role} Digest
                            </div>
                            <div className="text-slate-400 text-[11px]">
                              📊 Analyzed Scope: {role} | Recipient: {userDisplayName} | Sentiment: 64% Positive
                            </div>
                            <hr className="border-slate-700" />

                            <div className="text-slate-200 leading-relaxed">
                              <strong className="text-white block mb-1">Executive Summary:</strong>
                              {digest?.executive_summary || activeRoleData.synthesis.join(' ')}
                            </div>

                            <hr className="border-slate-700" />
                            <div>
                              <strong className="text-rose-400 block mb-2">
                                {role === 'Founder' ? '🚨 Top User Pain Points & Blockers:' : role === 'Engineers' ? '🚨 Critical Bugs & Timeouts:' : role === 'Sales' ? '🚨 Top Deal Blockers:' : '🚨 Urgent Friction Points:'}
                              </strong>
                              {((digest?.urgent_bugs && digest.urgent_bugs.length > 0) ? digest.urgent_bugs : activeRoleData.insights).slice(0, 2).map((b, idx) => (
                                <div key={b.id || idx} className="mb-2 pl-2 border-l-2 border-rose-500 text-slate-300">
                                  • <strong>{b.title || b.theme}</strong><br />
                                  <em className="text-slate-400">"{b.evidence_quote || b.quotes?.[0]?.text || 'Feedback reported'}"</em><br />
                                  👉 Fix: {b.suggested_action || b.takeaway || 'Investigate issue'}
                                </div>
                              ))}
                            </div>

                            <hr className="border-slate-700" />
                            <div>
                              <strong className="text-white block mb-1">Action Items:</strong>
                              {(digest?.action_checklist || [
                                'Review top recurring themes in team standup',
                                'Prioritize sharing links bug fix for mobile browsers'
                              ]).map((a, i) => (
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

              {/* Right Column: Instant Multi-Channel Dispatch Panel (4 cols) */}
              <div className="lg:col-span-4 flex flex-col space-y-6">
                <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-6">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-bold uppercase tracking-wider mb-2">
                      <Zap size={12} />
                      <span>Instant Multi-Channel Dispatch</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">Send Digest Now</h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      Fires the strictly scoped <strong className="text-slate-900">{role}</strong> digest directly to your destination email address.
                    </p>
                  </div>

                  {/* Recipient Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center justify-between">
                      <span>Destination Email</span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Live Delivery</span>
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        value={customEmail}
                        onChange={(e) => setCustomEmail(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-indigo-500 transition-colors"
                        placeholder="you@company.com"
                      />
                      <Mail size={14} className="absolute left-3 top-2.5 text-slate-400" />
                    </div>
                  </div>

                  {/* Slack Destination */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center justify-between">
                      <span>Slack Member ID or Webhook</span>
                      <span className="text-[10px] text-slate-400">Direct DM or Webhook</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={customWebhook}
                        onChange={(e) => setCustomWebhook(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-indigo-500 transition-colors"
                        placeholder="e.g. U0CK7UEJC1X or https://hooks.slack.com/..."
                      />
                      <Slack size={14} className="absolute left-3 top-2.5 text-slate-400" />
                    </div>
                  </div>

                  {/* Send Button */}
                  <button
                    onClick={handleSendNow}
                    disabled={dispatching}
                    className="w-full py-3.5 rounded-xl font-bold text-xs bg-indigo-600 hover:bg-indigo-700 text-white transition-all shadow-xs flex items-center justify-center gap-2 group disabled:opacity-60 cursor-pointer"
                  >
                    <Send size={14} className={dispatching ? 'animate-bounce' : 'group-hover:translate-x-0.5 transition-transform'} />
                    <span>{dispatching ? 'Dispatching Digest...' : `Send ${role} Digest Now`}</span>
                  </button>
                </div>

                {/* Delivery Result Banner */}
                {dispatchResult && (
                  <div className={`p-5 rounded-2xl border space-y-3 shadow-xs ${dispatchResult.email_sent || dispatchResult.slack_sent
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                      : 'bg-rose-50 border-rose-200 text-rose-900'
                    }`}>
                    <div className="flex items-center gap-2 font-bold text-xs">
                      {dispatchResult.email_sent || dispatchResult.slack_sent ? (
                        <>
                          <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                          <span className="text-emerald-800">Digest Dispatched Successfully!</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle size={16} className="text-rose-600 shrink-0" />
                          <span className="text-rose-800">Dispatch Error</span>
                        </>
                      )}
                    </div>

                    {dispatchResult.email_sent && (
                      <div className="p-3 bg-white/95 rounded-xl border border-emerald-200 text-xs text-emerald-950 font-semibold leading-relaxed flex items-center gap-2 shadow-xs">
                        <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                        <span>
                          Digest sent to your <span className="underline font-bold text-emerald-900">{customEmail}</span>
                        </span>
                      </div>
                    )}

                    <div className="text-xs space-y-1.5 text-slate-700">
                      {!dispatchResult.email_sent && dispatchResult.email_message && (
                        <div className="flex items-start gap-1.5">
                          <span className="text-rose-500">•</span>
                          <span className="font-medium">{dispatchResult.email_message}</span>
                        </div>
                      )}
                      {dispatchResult.slack_message && dispatchResult.slack_message !== 'Slack Webhook URL not provided.' && (
                        <div className="flex items-start gap-1.5">
                          <span className={dispatchResult.slack_sent ? 'text-emerald-600' : 'text-slate-400'}>•</span>
                          <span>{dispatchResult.slack_message}</span>
                        </div>
                      )}
                    </div>
                    <div className="text-[10px] text-slate-400 pt-2 border-t border-slate-200/60 font-mono">
                      Timestamp: {dispatchResult.timestamp}
                    </div>
                  </div>
                )}

                {/* Daily Morning Digest Schedule Information Detail */}
                <div className="p-4 rounded-xl bg-indigo-50/60 border border-indigo-100 text-xs text-indigo-950 space-y-1.5 shadow-xs">
                  <div className="font-semibold text-indigo-900 flex items-center gap-1.5">
                    <Clock size={14} className="text-indigo-600" />
                    <span>Automated Morning Schedule</span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-indigo-900/80">
                    You will get daily digest at morning with updated reviews insights delivered directly to your destination email and Slack.
                  </p>
                </div>

                {/* Scoped Isolation Confirmation Note */}
                <div className="p-4 rounded-xl bg-white border border-slate-200 text-xs text-slate-600 space-y-1.5 shadow-xs">
                  <div className="font-semibold text-slate-800 flex items-center gap-1.5">
                    <ShieldCheck size={14} className="text-indigo-600" />
                    <span>Strict Role Isolation Guarantee</span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-slate-500">
                    This digest is filtered exclusively for the <strong className="text-slate-800">{role}</strong> scope.
                    {isPrivilegedRole ? (
                      <> To view or dispatch digests for another role, click <strong>Switch Role</strong> in the left sidebar.</>
                    ) : (
                      <> Non-{role} customer reviews and metrics are hidden.</>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
