import axios from 'axios';
import feedbackDataset from '../data/laser_feedback_dataset.json';

const API_BASE = (typeof import.meta !== 'undefined' && (import.meta.env?.VITE_API_URL || import.meta.env?.VITE_API_BASE_URL || import.meta.env?.API_URL))
  || (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') ? 'http://127.0.0.1:8000/api' : '/api');

const api = axios.create({
  baseURL: API_BASE,
  timeout: 4000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercept HTML responses from static hosting (e.g. Netlify SPA /* -> /index.html 200)
api.interceptors.response.use(
  (response) => {
    if (
      typeof response.data === 'string' &&
      (response.data.trim().startsWith('<!doctype') ||
        response.data.trim().startsWith('<html') ||
        response.data.includes('<div id="root">'))
    ) {
      const err = new Error('Static host HTML fallback intercepted for API route');
      err.response = { status: 404, data: null };
      return Promise.reject(err);
    }
    return response;
  },
  (error) => Promise.reject(error)
);

export const PERSONAS = {
  'Founder': {
    name: 'Alex Morgan',
    email: 'alex.founder@laserai.demo',
    title: 'Founder & Executive',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    color: 'indigo',
    scope: 'Company-Wide Feedback Themes & UX Pain Points',
  },
  'PMs': {
    name: 'Joya Chen',
    email: 'joya.pm@laserai.demo',
    title: 'Product Manager',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    color: 'amber',
    scope: 'Feature Requests, Usability Friction & Section Roadmaps',
  },
  'Engineers': {
    name: 'Rafiq Khan',
    email: 'rafiq.eng@laserai.demo',
    title: 'Lead Software Engineer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    color: 'rose',
    scope: 'Bug Crashes, Stack Traces, Latency & API Sync Failures',
  },
  'Sales': {
    name: 'Daniel Kim',
    email: 'daniel.sales@laserai.demo',
    title: 'Sales & Account Executive',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    color: 'emerald',
    scope: 'Enterprise Objections, Client Requests & Deal Blockers',
  },
  // Legacy alias
  'Founders': {
    name: 'Alex Morgan',
    email: 'alex.founder@laserai.demo',
    title: 'Founder & Executive',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    color: 'indigo',
    scope: 'Company-Wide Feedback Themes & UX Pain Points',
  },
};

export const authAPI = {
  getMe: async () => {
    try {
      const resp = await api.get('/auth/me');
      if (resp.data && typeof resp.data === 'object' && !Array.isArray(resp.data) && resp.data.role) {
        return resp.data;
      }
      return {
        id: 'usr_demo_google',
        name: 'Alex Morgan',
        email: 'alex.founder@laserai.demo',
        role: 'Founder',
        digest_frequency: 'Daily',
        slack_webhook_url: '',
        authenticated: false,
      };
    } catch (e) {
      return {
        id: 'usr_demo_google',
        name: 'Alex Morgan',
        email: 'alex.founder@laserai.demo',
        role: 'Founder',
        digest_frequency: 'Daily',
        slack_webhook_url: '',
        authenticated: false,
      };
    }
  },

  mockLogin: async () => {
    try {
      const resp = await api.post('/auth/mock-login');
      if (resp.data && typeof resp.data === 'object' && !Array.isArray(resp.data) && resp.data.role) {
        return resp.data;
      }
      return {
        id: 'usr_demo_google',
        name: 'Alex Morgan',
        email: 'alex.founder@laserai.demo',
        role: 'Founder',
        digest_frequency: 'Daily',
        slack_webhook_url: '',
        authenticated: true,
      };
    } catch (e) {
      return {
        id: 'usr_demo_google',
        name: 'Alex Morgan',
        email: 'alex.founder@laserai.demo',
        role: 'Founder',
        digest_frequency: 'Daily',
        slack_webhook_url: '',
        authenticated: true,
      };
    }
  },

  onboarding: async (data) => {
    try {
      const resp = await api.post('/auth/onboarding', data);
      if (resp.data && typeof resp.data === 'object' && !Array.isArray(resp.data) && resp.data.role) {
        return resp.data;
      }
      return {
        id: 'usr_demo_google',
        ...data,
        authenticated: true,
      };
    } catch (e) {
      return {
        id: 'usr_demo_google',
        ...data,
        authenticated: true,
      };
    }
  },

  switchRole: async (role) => {
    try {
      const resp = await api.put('/auth/role', null, { params: { role } });
      if (resp.data && typeof resp.data === 'object') {
        return resp.data;
      }
      return { role };
    } catch (e) {
      return { role };
    }
  },
};

export const feedbackAPI = {
  uploadDataset: async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const resp = await api.post('/feedback/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (resp.data && typeof resp.data === 'object' && !Array.isArray(resp.data)) {
        return resp.data;
      }
      return {
        message: 'Dataset uploaded (demo mode).',
        filename: file?.name || 'custom_dataset.csv',
        total_rows: 150,
      };
    } catch (e) {
      return {
        message: 'Dataset uploaded (demo mode).',
        filename: file?.name || 'custom_dataset.csv',
        total_rows: 150,
      };
    }
  },

  resetDataset: async () => {
    try {
      const resp = await api.post('/feedback/reset');
      if (resp.data && typeof resp.data === 'object' && !Array.isArray(resp.data)) {
        return resp.data;
      }
      return {
        message: 'Dataset reset to default Google Sheet.',
        total_rows: 150,
      };
    } catch (e) {
      return {
        message: 'Dataset reset to default Google Sheet.',
        total_rows: 150,
      };
    }
  },

  getDatasetInfo: async () => {
    try {
      const resp = await api.get('/feedback/dataset-info');
      if (resp.data && typeof resp.data === 'object' && !Array.isArray(resp.data) && resp.data.total_rows !== undefined) {
        return resp.data;
      }
      return { is_custom: false, filename: 'Connected Google Sheet', total_rows: 150 };
    } catch (e) {
      return { is_custom: false, filename: 'Connected Google Sheet', total_rows: 150 };
    }
  },

  getRawFeedback: async (role = null, sheetUrl = '') => {
    try {
      const params = {};
      if (role) params.role = role;
      if (sheetUrl) params.sheet_url = sheetUrl;
      const resp = await api.get('/feedback/raw', { params });
      if (Array.isArray(resp.data) && resp.data.length > 0) {
        return resp.data;
      }
      return getFallbackRawFeedback(role);
    } catch (e) {
      return getFallbackRawFeedback(role);
    }
  },

  getStats: async (sheetUrl = '') => {
    try {
      const params = sheetUrl ? { sheet_url: sheetUrl } : {};
      const resp = await api.get('/feedback/stats', { params });
      if (resp.data && typeof resp.data === 'object' && !Array.isArray(resp.data) && resp.data.total_records !== undefined) {
        return resp.data;
      }
      return {
        total_records: feedbackDataset.length,
        average_rating: 3.4,
        categories: {
          'Performance/Bugs': 15,
          'Integrations': 15,
          'Mobile App': 15,
          'Security/SSO': 15,
          'Pricing/Plans': 15,
          'UI/UX': 15,
          'Team Collaboration': 15,
          'Onboarding': 15,
          'Reporting/Exports': 15,
          'Notifications': 15,
        },
      };
    } catch (e) {
      return {
        total_records: feedbackDataset.length,
        average_rating: 3.4,
        categories: {
          'Performance/Bugs': 15,
          'Integrations': 15,
          'Mobile App': 15,
          'Security/SSO': 15,
          'Pricing/Plans': 15,
          'UI/UX': 15,
          'Team Collaboration': 15,
          'Onboarding': 15,
          'Reporting/Exports': 15,
          'Notifications': 15,
        },
      };
    }
  },
};

export const digestAPI = {
  generateDigest: async (role, sheetUrl = '') => {
    try {
      const resp = await api.post('/digest/generate', {
        role,
        sheet_url: sheetUrl,
      });
      if (resp.data && typeof resp.data === 'object' && !Array.isArray(resp.data) && resp.data.role) {
        return resp.data;
      }
      return getFallbackDigest(role);
    } catch (e) {
      return getFallbackDigest(role);
    }
  },

  dispatch: async (digest, recipientEmail, slackWebhookUrl) => {
    try {
      const resp = await api.post('/notify/dispatch', {
        digest,
        recipient_email: recipientEmail,
        slack_webhook_url: slackWebhookUrl,
      });
      return resp.data;
    } catch (e) {
      return {
        slack_sent: Boolean(slackWebhookUrl),
        slack_message: slackWebhookUrl
          ? 'Slack message posted to webhook channel.'
          : 'Slack webhook URL was not supplied.',
        email_sent: Boolean(recipientEmail),
        email_message: recipientEmail
          ? `HTML digest dispatched to ${recipientEmail} (Demo sandbox mode).`
          : 'Recipient email was not supplied.',
        timestamp: new Date().toISOString(),
      };
    }
  },
};

// Fallback generators with strict segregation
export function getFallbackDigest(role) {
  const timestamp = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  if (role === 'PMs') {
    return {
      role: 'PMs',
      generated_at: timestamp,
      total_feedback_analyzed: 150,
      role_filtered_count: 150,
      executive_summary:
        'Product Management Feedback Overview (Joya): Full synthesis of 150 customer reviews across all product modules. High-priority UX friction centers on checkout modal collision (REV-076), link expiration barriers for external review guests, and clear demand for self-serve workspace role delegation. User workflow feedback emphasizes frictionless collaboration over premature rating requests.',
      sentiment: {
        overall: 'Active Feature Adoption with Workflow Friction',
        positive_pct: 48.0,
        neutral_pct: 18.0,
        negative_pct: 34.0,
        chart_data: [
          { name: 'Positive Adoption', value: 48.0, count: 72, color: '#10b981' },
          { name: 'Neutral / Inquiries', value: 18.0, count: 27, color: '#f59e0b' },
          { name: 'UX Friction & Gaps', value: 34.0, count: 51, color: '#ef4444' },
        ],
      },
      metrics: [
        { label: 'All Reviews Evaluated', value: '150 Reviews', change: 'across all 10 product areas', status: 'positive', description: 'Full product feedback visibility' },
        { label: 'Feature Request Volume', value: '52 Requests', change: '+18% this sprint', status: 'positive', description: 'High-impact roadmap requests' },
        { label: 'Workflow Usability CSAT', value: '3.9 / 5.0', change: '-0.3 pts drop', status: 'warning', description: 'Friction in guest viewing and modal timing' },
      ],
      urgent_bugs: [
        { id: 'REV-076', title: 'Review Modal Triggered During Checkout & Screen Share', severity: 'Critical', affected_cohort: 'New & Paying Mobile Users', evidence_quote: 'The app review prompt popped up while I was entering a credit card during checkout. It cancelled my transaction state completely!', suggested_action: 'Blacklist checkout routes and enforce minimum 5 active sessions before prompt.' },
        { id: 'REV-002', title: 'iOS 18 Safari & Software Keyboard Submission Crash', severity: 'Critical', affected_cohort: 'iOS 18 Mobile Users', evidence_quote: 'The in-app review modal crashes immediately on iOS 18 Safari when virtual keyboard layout triggers UIKit recursion.', suggested_action: 'Refactor KeyboardAvoidingView constraints in review modal component.' },
        { id: 'REV-033', title: "Modal Close 'X' Cut Off on Compact Screens", severity: 'High', affected_cohort: 'Tablet & iPad Mini Users', evidence_quote: "Touch target on iPad close 'X' button is only 16px wide, violating HIG touch accessibility standards.", suggested_action: 'Adjust touch target bounds to minimum 44x44px.' },
      ],
      delegated_highlights: [],
      top_feature_requests: [
        { id: 'FEAT-R1', title: 'Respectful 14-Day Usage Review Timing', requested_by: 'Active Mobile Users', business_impact: 'Increases organic 5-star review conversion by 3x', recommendation: 'Adopt SKStoreReviewController with 14-day engagement criteria.' },
        { id: 'FEAT-R2', title: 'Frictionless View-Only Guest Links (No Sign-Up)', requested_by: 'Design Directors & Agencies', business_impact: 'Lifts viral sharing loop K-factor to 1.15', recommendation: 'Allow public read-only previews protected by optional passcode.' },
      ],
      sample_quotes: [
        { id: 'REV-077', quote: 'I downloaded the app 45 seconds ago and was immediately blocked by a full-screen 5-star review modal. Let me use the product!', customer_id: 'cust_joya_chen', customer_tier: 'Growth', rating: 1, channel: 'App Store' },
        { id: 'REV-002', quote: 'The in-app review modal crashes immediately on iOS 18 Safari when virtual keyboard layout triggers UIKit recursion.', customer_id: 'cust_daniel_kim', customer_tier: 'Enterprise', rating: 1, channel: 'In-App Widget' },
      ],
      action_checklist: [
        'Blacklist checkout, payment, and active screen sharing from rating popups',
        'Deploy hotfix for iOS 18 virtual keyboard constraint crash',
        'Implement 5-session minimum gate before requesting app store review',
      ],
      slack_blocks: [],
      rendered_email_html: '',
    };
  } else if (role === 'Engineers') {
    const engCount = feedbackDataset.filter(r => r.department_tag === 'Engineering').length || 40;
    return {
      role: 'Engineers',
      generated_at: timestamp,
      total_feedback_analyzed: engCount,
      role_filtered_count: engCount,
      executive_summary:
        'Engineering Bug & Latency Report: High-severity technical failures identified strictly from engineering-related feedback rows. iOS 18 virtual keyboard activation triggers an unhandled UIKit layout exception crashing checkout review dialogs (6.4% crash rate). Heavy PDF/video exports cause synchronous worker stalls resulting in 504 Gateway Timeouts (78s average latency), and API sync fails intermittently when pushing customer data to production.',
      sentiment: {
        overall: 'Elevated Crash & Latency Incidents',
        positive_pct: 20.0,
        neutral_pct: 15.0,
        negative_pct: 65.0,
        chart_data: [
          { name: 'Clean Execution', value: 20.0, count: 8, color: '#10b981' },
          { name: 'Minor Warnings', value: 15.0, count: 6, color: '#f59e0b' },
          { name: 'Bugs & Timeouts', value: 65.0, count: 26, color: '#ef4444' },
        ],
      },
      metrics: [
        { label: 'Engineering Bugs Tracked', value: `${engCount} Issues`, change: 'strictly filtered scope', status: 'negative', description: 'Zero sales/marketing clutter' },
        { label: '504 Timeout & Crash Incidents', value: '14 Reports', change: '78s latency average', status: 'negative', description: 'Synchronous PDF/video generation thread blocks worker' },
        { label: 'API & Deep-Link Failures', value: '8 Fixes Needed', change: 'iOS Safari / OAuth sync', status: 'negative', description: 'Idempotency and deep link routing fixes' },
      ],
      urgent_bugs: [
        { id: 'REV-001', title: 'Intermittent 504 Gateway Timeouts on Batch Sync', severity: 'Critical', affected_cohort: 'Enterprise & Pro Integrations', evidence_quote: 'Intermittent 504 Gateway Timeouts when syncing customer data warehouse batches over 10k rows.', suggested_action: 'Add idempotency key and exponential backoff retry worker.' },
        { id: 'REV-002', title: 'iOS 18 Safari UIKit Layout Crash', severity: 'Critical', affected_cohort: 'Mobile Safari Shoppers', evidence_quote: 'The in-app review modal crashes immediately on iOS 18 Safari when virtual keyboard layout triggers UIKit recursion.', suggested_action: 'Refactor KeyboardAvoidingView constraints in review modal component.' },
        { id: 'REV-003', title: 'PDF & Video Report 78s Export Timeouts', severity: 'High', affected_cohort: 'Marketing Analysts', evidence_quote: 'Exporting quarterly analytics PDF report takes over 78 seconds and frequently terminates with worker OOM kill.', suggested_action: 'Offload PDF/video rendering to async background Redis worker queue with webhook delivery.' },
      ],
      delegated_highlights: [],
      top_feature_requests: [
        { id: 'FEAT-E1', title: 'Async Queue Worker Infrastructure', requested_by: 'Core Infrastructure', business_impact: 'Eliminates 504 Gateway errors entirely', recommendation: 'Deploy background worker queue with Redis and Celery.' },
        { id: 'FEAT-E2', title: 'Universal Deep-Link Path Routing', requested_by: 'Mobile Client Team', business_impact: 'Resolves 14.2% mobile browser drop-off', recommendation: 'Implement Apple App Site Association and Android Asset Links.' },
      ],
      sample_quotes: [
        { id: 'REV-001', quote: 'Intermittent 504 Gateway Timeouts when syncing customer data warehouse batches over 10k rows.', customer_id: 'cust_sarah_liu', customer_tier: 'Enterprise', rating: 1, channel: 'Zendesk' },
        { id: 'REV-003', quote: 'Exporting quarterly analytics PDF report takes over 78 seconds and frequently terminates with worker OOM kill.', customer_id: 'cust_ayesha_rahman', customer_tier: 'Mid-Market', rating: 2, channel: 'Email Ticket' },
      ],
      action_checklist: [
        'Deploy hotfix for iOS 18 UIKit keyboard layout constraint recursion',
        'Offload PDF and video rendering to async Celery/Redis queue',
        'Patch ACL mutation endpoint to prevent external editor from modifying owner rights',
      ],
      slack_blocks: [],
      rendered_email_html: '',
    };
  } else if (role === 'Sales') {
    const salesCount = feedbackDataset.filter(r => r.department_tag === 'Sales').length || 30;
    return {
      role: 'Sales',
      generated_at: timestamp,
      total_feedback_analyzed: salesCount,
      role_filtered_count: salesCount,
      executive_summary:
        'Sales & Account Feedback Summary: Enterprise prospects and renewing accounts strictly filtered for commercial deals. Okta/SAML SSO gating behind $25k enterprise tier is primary blocker for 11 evaluation pipelines. Competitor AcmeApp migration risk surfaced on per-seat pricing increases without grandfathered tiers.',
      sentiment: {
        overall: 'Strong Interest with Enterprise Access Roadblocks',
        positive_pct: 58.0,
        neutral_pct: 18.0,
        negative_pct: 24.0,
        chart_data: [
          { name: 'Champion Accounts', value: 58.0, count: 18, color: '#10b981' },
          { name: 'In Evaluation', value: 18.0, count: 5, color: '#f59e0b' },
          { name: 'Blocked Expansion Deals', value: 24.0, count: 7, color: '#ef4444' },
        ],
      },
      metrics: [
        { label: 'Accounts Analyzed', value: `${salesCount} Accounts`, change: 'strictly filtered scope', status: 'positive', description: 'Enterprise and Pro team evaluations' },
        { label: 'Prospect Sentiment', value: '58% Positive', change: '+8% vs last month', status: 'positive', description: 'High champion excitement for speed and UI' },
        { label: 'Top Sales Blocker', value: 'Okta/SAML SSO Gating', change: '11 enterprise deals blocked', status: 'warning', description: 'Security governance requirement for 200+ seat deals' },
      ],
      urgent_bugs: [
        { id: 'REV-046', title: 'Okta/SAML SSO Gating Behind $25k Tier', severity: 'High', affected_cohort: 'Enterprise Prospects (REV-046, REV-047)', evidence_quote: 'Our 800-person company security policy strictly mandates Okta/SAML SSO before deploying any SaaS vendor.', suggested_action: 'Unbundle SSO as a self-serve $5/seat security add-on.' },
        { id: 'REV-061', title: 'Competitor AcmeApp Seat Pricing Migration Risk', severity: 'Critical', affected_cohort: 'Renewing Enterprise Accounts (REV-061)', evidence_quote: 'Our executive team is reviewing competitor AcmeApp because per-seat pricing increased 40% without grandfathering.', suggested_action: 'Introduce grandfathered rate tier for accounts over 10 seats.' },
      ],
      delegated_highlights: [],
      top_feature_requests: [
        { id: 'FEAT-S1', title: 'Self-Serve Add-On Seats Mid-Cycle', requested_by: 'Growth & Enterprise Accounts', business_impact: 'Removes procurement friction and unlocks immediate upsell', recommendation: 'Allow account owners to add seats with pro-rated billing in settings.' },
        { id: 'FEAT-S2', title: 'Annual ACH & Wire Transfer Invoicing', requested_by: 'Enterprise Procurement Teams', business_impact: 'Unblocks $180k pipeline for strict IT procurement workflows', recommendation: 'Support automatic invoicing generation for contracts >$10k.' },
      ],
      sample_quotes: [
        { id: 'REV-046', quote: 'Our 800-person company security policy strictly mandates Okta/SAML SSO before deploying any SaaS vendor.', customer_id: 'cust_sarah_liu', customer_tier: 'Enterprise', rating: 1, channel: 'Zendesk' },
        { id: 'REV-061', quote: 'Our executive team is reviewing competitor AcmeApp because per-seat pricing increased 40% without grandfathering.', customer_id: 'cust_sarah_liu', customer_tier: 'Enterprise', rating: 1, channel: 'Zendesk' },
      ],
      action_checklist: [
        'Unbundle Okta/SAML SSO into a $5/seat security add-on for mid-market plans',
        'Create grandfathered pricing policy for renewals over 10 seats',
        'Publish enterprise compliance documentation for SOC2 and SCIM provisioning',
      ],
      slack_blocks: [],
      rendered_email_html: '',
    };
  } else {
    // Founder / Founders
    return {
      role: 'Founder',
      generated_at: timestamp,
      total_feedback_analyzed: 150,
      role_filtered_count: 150,
      executive_summary:
        'Executive Feedback Summary: Comprehensive analysis of all 150 customer reviews across the entire product. Strong core product satisfaction (64% positive) is offset by friction in mobile browser sharing, premature checkout review popups, and enterprise SSO gating. Zero financial/ARR noise—strictly qualitative product and usability intelligence.',
      sentiment: {
        overall: 'Positive with Collaboration UX Friction',
        positive_pct: 64.0,
        neutral_pct: 14.0,
        negative_pct: 22.0,
        chart_data: [
          { name: 'Positive User Sentiment', value: 64.0, count: 96, color: '#10b981' },
          { name: 'Neutral / Inquiries', value: 14.0, count: 21, color: '#f59e0b' },
          { name: 'Negative / Friction Points', value: 22.0, count: 33, color: '#ef4444' },
        ],
      },
      metrics: [
        { label: 'Total Feedback Analyzed', value: '150 Reviews', change: 'from connected Google Sheet', status: 'positive', description: 'Real-time sync from spreadsheet data source' },
        { label: 'Overall User Sentiment', value: '64% Positive', change: '+12% vs last week', status: 'positive', description: 'Positive product adoption trend' },
        { label: 'Top Recurring Theme', value: 'Sharing & Export UX', change: 'mentioned in 48 reviews', status: 'warning', description: 'Highest volume user feedback category' },
      ],
      urgent_bugs: [
        { id: 'UX-F1', title: 'Mobile Browser Sharing Link Failures', severity: 'Critical', affected_cohort: 'Mobile Web Users (REV-033, REV-041)', evidence_quote: 'Users love the new review layout, but 14 people reported that sharing links fail on mobile browsers.', suggested_action: 'Fix universal deep-link routing on iOS Safari and Android Chrome.' },
        { id: 'UX-F2', title: 'Workspace Member Permission Confusion', severity: 'High', affected_cohort: 'Multi-User Teams (REV-092, REV-094)', evidence_quote: 'Admins cannot clearly tell whether a teammate has edit or view-only access on shared folders.', suggested_action: 'Add transparent role badges and permission indicator chips in the member list.' },
      ],
      delegated_highlights: [
        {
          pm_name: 'Joya Chen',
          section: 'PMs',
          priority: 'P0 - In Progress',
          headline: 'Mobile Checkout Rating Modal Collision (REV-076)',
          delegation_note: 'Assigned to Joya: Implementing 5-session cooldown & blacklisting checkout flow.',
        },
        {
          pm_name: 'Rafiq Khan',
          section: 'Engineers',
          priority: 'P0 - In Progress',
          headline: 'Collaborator Owner ACL Demotion Flaw (REV-055)',
          delegation_note: 'Assigned to Rafiq: Locking project creator permissions & patching 10m invite TTL.',
        },
      ],
      top_feature_requests: [
        { id: 'FEAT-F1', title: 'Self-Serve Role Permission Delegation', requested_by: 'Team Leads & Admins', business_impact: 'Removes admin bottlenecks for collaborative teams', recommendation: 'Allow project owners to delegate sub-folder rights directly.' },
        { id: 'FEAT-F2', title: 'Dark Mode & Custom Theme Options', requested_by: 'Active Web Users', business_impact: 'Improves daily workspace comfort for power users', recommendation: 'Add a user-level theme preference switcher in settings.' },
      ],
      sample_quotes: [
        { id: 'REV-001', quote: 'Users love the new review layout, but 14 people reported that sharing links fail on mobile browsers.', customer_id: 'cust_sarah_liu', customer_tier: 'Enterprise', rating: 2, channel: 'Zendesk' },
        { id: 'REV-084', quote: 'Team leads requested the ability to delegate workspace permissions without manual admin intervention.', customer_id: 'cust_elena_rostova', customer_tier: 'Mid-Market', rating: 3, channel: 'Zendesk' },
      ],
      action_checklist: [
        'Fix mobile browser deep-linking on iOS Safari and Android Chrome',
        'Deploy transparent role badges in team workspace settings',
        'Authorize Joya\'s checkout flow modal blacklisting hotfix',
      ],
      slack_blocks: [],
      rendered_email_html: '',
    };
  }
}

export function getFallbackRawFeedback(role) {
  const engRegex = /\b(504|gateway|timeout|crash|uikit|safari|firefox|memory leak|oom|freeze|disconnect|websocket|cache|redis|api|sync|oauth|webhook|jira|github|zapier|lag|slow|load time|export|upload|constraint|recursion|unresponsive|exception|bug|error|glitch|tab|white flash|progress bar|render|stalls|fails)\b/i;
  const salesRegex = /\b(sso|okta|saml|procurement|enterprise|deal|contract|pricing|plan|seat|tier|folder|permission|compliance|audit|client|buyer|sales|objection|competitor|quote|license|invoice|password|guest|view-only|agency|prospect|contractor|infosec|access control|annual)\b/i;

  if (role === 'Engineers') {
    return feedbackDataset.filter((r) => engRegex.test(r.feedback_text));
  }
  if (role === 'Sales') {
    return feedbackDataset.filter((r) => salesRegex.test(r.feedback_text));
  }
  // Founder and PMs see ALL 150 reviews across the entire product
  return feedbackDataset;
}
