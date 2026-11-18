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
  Rocket
} from 'lucide-react';

export default function LandingScreen({ onStartDemo }) {
  // State for Section 2 Interactive Product Preview Switcher
  const [activePreviewRole, setActivePreviewRole] = useState('Founder');
  const [previewViewMode, setPreviewViewMode] = useState('board'); // 'board' | 'issue'
  const [selectedPreviewIssue, setSelectedPreviewIssue] = useState(null);
  const [activeDrawerTab, setActiveDrawerTab] = useState('slack'); // 'comments' | 'slack'
  const [commentInput, setCommentInput] = useState('');
  const [commentsList, setCommentsList] = useState([]);

  // Comprehensive Role Preview Data for Section 2
  const rolePreviews = {
    Founder: {
      roleTitle: 'Founder & Executive View',
      personaName: 'Alex Morgan',
      tagline: 'Company-Wide Feedback Themes & Top User Pain Points',
      sentiment: {
        overall: 'Positive with Collaboration UX Friction',
        positive: 64,
        neutral: 14,
        negative: 22,
      },
      metrics: [
        { label: 'Analyzed 120', rep1: 'Ayesha Rahman', rep1Count: 12, rep2: 'Daniel Kim', rep2Count: 8, subtitle: '120 Reviews' },
        { label: 'Positive 77', rep1: 'Fahim Hasan', rep1Count: 5, rep2: 'Sarah Liu', rep2Count: 3, subtitle: '64% Positive' },
        { label: 'Pain Points 28', rep1: 'Nusrat Jahan', rep1Count: 3, rep2: 'Omar Faruk', rep2Count: 2, subtitle: '28 Mentions' },
        { label: 'Feature Demands 15', rep1: 'Mehedi Hasan', rep1Count: 4, rep2: 'Priya Das', rep2Count: 2, subtitle: '15 Demands' },
      ],
      defaultIssue: {
        id: 'VGS-1024',
        title: 'Fix API Sync Failure',
        type: 'Bug',
        priority: 'High',
        assignee: 'Rafiq Khan',
        assigneeInitials: 'RK',
        assigneeColor: 'bg-indigo-600',
        dueDate: 'Sep 14, 2024',
        sprint: 'Sprint 24',
        environment: 'Production',
        module: 'API Integration',
        summary: 'Fix API Sync Failure',
        description: 'API sync is failing intermittently when syncing customer data to the production environment. Need to investigate the error logs and fix the issue.',
        customer: 'Enterprise & Pro Integrations',
        quote: 'Customer data sync to warehouse fails on high-volume batches with intermittent 504 gateway timeout.',
        impact: 'Blocks real-time reporting for 14 enterprise customers',
        action: 'Increase worker timeout threshold and implement background retry queue.',
        tag: 'Bug',
        tagColor: 'bg-rose-50 text-rose-600 border-rose-100',
      },
      columns: [
        {
          id: 'col-1',
          title: 'Top User Pain Points',
          items: [
            {
              id: 'VGS-1024',
              title: 'Fix API Sync Failure',
              tag: 'Bug',
              tagColor: 'bg-rose-50 text-rose-600 border-rose-100',
              customer: 'Enterprise & Pro Integrations',
              quote: 'API sync is failing intermittently when syncing customer data to the production environment.',
              assignee: 'Rafiq Khan',
              assigneeInitials: 'RK',
              assigneeColor: 'bg-indigo-600',
              priority: 'High',
              type: 'Bug',
              dueDate: 'Sep 14, 2024',
              sprint: 'Sprint 24',
              environment: 'Production',
              module: 'API Integration',
              summary: 'Fix API Sync Failure',
              description: 'API sync is failing intermittently when syncing customer data to the production environment. Need to investigate the error logs and fix the issue.',
              impact: 'Blocks 14 large team syncs',
              action: 'Add idempotency key and exponential backoff retry worker.',
            },
            {
              id: 'VGS-1021',
              title: 'Mobile Browser Sharing Link Failures',
              tag: 'Branding',
              tagColor: 'bg-rose-50 text-rose-600 border-rose-100',
              customer: 'Design Leads & Mobile Clients',
              quote: '14 clients on iOS Safari reported that project invite links lead to a 403 or blank page.',
              assignee: 'Aman Patel',
              assigneeInitials: 'AP',
              assigneeColor: 'bg-emerald-600',
              priority: 'High',
              type: 'Bug',
              dueDate: 'Sep 16, 2024',
              sprint: 'Sprint 24',
              environment: 'Production',
              module: 'Sharing Engine',
              summary: 'Universal Deep-Link Route Failure',
              description: 'Users on iOS Safari and Android Chrome receive broken redirect loops when opening project links.',
              impact: '14.2% drop-off on mobile onboarding links',
              action: 'Patch universal deep-link routing on iOS Safari and Android Chrome.',
            },
          ],
        },
        {
          id: 'col-2',
          title: 'Top Feature Requests',
          items: [
            {
              id: 'VGS-1023',
              title: 'Self-Serve Role Permission Delegation',
              tag: 'Content',
              tagColor: 'bg-emerald-50 text-emerald-600 border-emerald-100',
              customer: 'Team Leads & Admins',
              quote: 'Team leads requested the ability to delegate workspace permissions without manual admin intervention.',
              assignee: 'Alex Morgan',
              assigneeInitials: 'AM',
              assigneeColor: 'bg-indigo-600',
              priority: 'Medium',
              type: 'Feature',
              dueDate: 'Sep 25, 2024',
              sprint: 'Sprint 25',
              environment: 'Staging',
              module: 'Workspace Settings',
              summary: 'Self-Serve Role Delegation',
              description: 'Enable department managers to invite collaborators with predefined roles without contacting super-admins.',
              impact: 'Saves 4 hours/week in IT support tickets',
              action: 'Add self-serve workspace role management to team settings.',
            },
            {
              id: 'VGS-1025',
              title: 'Rich Slack Unfurl Link Previews',
              tag: 'Social Media',
              tagColor: 'bg-sky-50 text-sky-600 border-sky-100',
              customer: 'Slack Active Workspaces',
              quote: 'When we paste project links into Slack channels, we want a clean preview card showing status and assignee.',
              assignee: 'Ayesha Rahman',
              assigneeInitials: 'AR',
              assigneeColor: 'bg-amber-600',
              priority: 'Low',
              type: 'Enhancement',
              dueDate: 'Oct 02, 2024',
              sprint: 'Sprint 25',
              environment: 'Production',
              module: 'Slack Integration',
              summary: 'Slack Link Unfurl Cards',
              description: 'Generate OpenGraph rich metadata cards with real-time status badges for Slack paste events.',
              impact: 'Increases cross-team viral visibility',
              action: 'Configure Slack bot OAuth unfurl handlers with signed webhooks.',
            },
          ],
        },
        {
          id: 'col-3',
          title: 'Under Triage',
          items: [
            {
              id: 'VGS-1022',
              title: 'Workspace Member Permission Confusion',
              tag: 'Paid Ads',
              tagColor: 'bg-amber-50 text-amber-600 border-amber-100',
              customer: 'Multi-User Teams',
              quote: 'Admins cannot clearly tell whether a teammate has edit or view-only access on shared folders.',
              assignee: 'Daniel Kim',
              assigneeInitials: 'DK',
              assigneeColor: 'bg-blue-600',
              priority: 'Medium',
              type: 'UX Friction',
              dueDate: 'Sep 20, 2024',
              sprint: 'Sprint 24',
              environment: 'Production',
              module: 'User Permissions',
              summary: 'Permission Badging Clarity',
              description: 'Member list lacks explicit badge chips indicating role scopes.',
              impact: 'Frequent support inquiries from account admins',
              action: 'Display distinct color-coded badge chips for View-Only vs Editor roles.',
            },
            {
              id: 'VGS-1026',
              title: 'Folder-Level Access Isolation',
              tag: 'Website',
              tagColor: 'bg-purple-50 text-purple-600 border-purple-100',
              customer: 'Enterprise Security Officers',
              quote: 'Inviting external contractors exposes our entire project space unless folder-level gating is enforced.',
              assignee: 'Sarah Liu',
              assigneeInitials: 'SL',
              assigneeColor: 'bg-emerald-600',
              priority: 'High',
              type: 'Security',
              dueDate: 'Sep 28, 2024',
              sprint: 'Sprint 25',
              environment: 'Staging',
              module: 'Access Control',
              summary: 'Folder Scoped Access Control',
              description: 'Enable granular permissions per folder to isolate sensitive assets from external contractors.',
              impact: 'Critical enterprise security requirement',
              action: 'Implement resource-level ACL checks before rendering directory contents.',
            },
          ],
        },
      ],
    },
    PMs: {
      roleTitle: 'Lead Product Manager (PMs) View',
      personaName: 'Joya Chen',
      tagline: 'Feature Requests, UX Friction Points, & User Workflows (All 150 Reviews)',
      sentiment: {
        overall: 'High Demand for Workflow Customization & Mobile Fixes',
        positive: 62,
        neutral: 16,
        negative: 22,
      },
      metrics: [
        { label: 'Total Feedback', rep1: 'Joya Chen', rep1Count: 150, rep2: 'Product Scope', rep2Count: 'All', subtitle: '150 Reviews' },
        { label: 'Usability CSAT', rep1: 'Satisfaction Score', rep1Count: '4.2', rep2: 'Retention Cohort', rep2Count: '+8%', subtitle: '68% Positive' },
        { label: 'Top Feature Demand', rep1: 'Delegation Rights', rep1Count: 24, rep2: 'Export Previews', rep2Count: 16, subtitle: 'Permissions & Export' },
        { label: 'UX Friction Points', rep1: 'Mobile Safari Fail', rep1Count: 14, rep2: 'iPad Touch Target', rep2Count: 8, subtitle: '22 Usability Items' },
      ],
      defaultIssue: {
        id: 'VGS-1031',
        title: 'iOS 18 Safari Review Modal Collision',
        type: 'Bug',
        priority: 'Critical',
        assignee: 'Joya Chen',
        assigneeInitials: 'JC',
        assigneeColor: 'bg-amber-600',
        dueDate: 'Sep 12, 2024',
        sprint: 'Sprint 24',
        environment: 'Production',
        module: 'Review Submission Modal',
        summary: 'In-App Review Dialog Crashing Checkout on iOS 18 Safari',
        description: 'The review prompt appears immediately during checkout on iOS 18 Safari. Virtual keyboard activation causes UIKit constraint layout crash and aborts payment flow.',
        customer: 'Mobile Safari Shoppers',
        quote: 'The in-app review modal popped up right during checkout on iOS 18 Safari and cancelled my transaction!',
        impact: 'Cancels 6.4% of checkout sessions on mobile Safari',
        action: 'Add global checkout blacklist to prevent review modals from firing during payment flow.',
        tag: '1-Star Bug',
        tagColor: 'bg-rose-50 text-rose-600 border-rose-100',
      },
      columns: [
        {
          id: 'col-1',
          title: 'UX Friction & Usability Bugs',
          items: [
            {
              id: 'VGS-1031',
              title: 'iOS 18 Safari Review Modal Collision',
              tag: '1-Star Bug',
              tagColor: 'bg-rose-50 text-rose-600 border-rose-100',
              customer: 'Mobile Safari Shoppers',
              quote: 'The in-app review modal popped up right during checkout on iOS 18 Safari and cancelled my transaction!',
              assignee: 'Joya Chen',
              assigneeInitials: 'JC',
              assigneeColor: 'bg-amber-600',
              priority: 'Critical',
              type: 'Bug',
              dueDate: 'Sep 12, 2024',
              sprint: 'Sprint 24',
              environment: 'Production',
              module: 'Review Modal',
              summary: 'In-App Modal Trigger Collision',
              description: 'Virtual keyboard pops up over review dialog causing fatal layout constraint recursion.',
              impact: 'Blocks mobile purchases',
              action: 'Blacklist checkout routes from modal triggers.',
            },
            {
              id: 'VGS-1021',
              title: 'Mobile Browser Sharing Link Failures',
              tag: 'UX Friction',
              tagColor: 'bg-rose-50 text-rose-600 border-rose-100',
              customer: 'Mobile Web Users (14 reviews)',
              quote: 'Users love the new review layout, but 14 people reported that sharing links fail on mobile browsers.',
              assignee: 'Joya Chen',
              assigneeInitials: 'JC',
              assigneeColor: 'bg-amber-600',
              priority: 'High',
              type: 'UX Friction',
              dueDate: 'Sep 16, 2024',
              sprint: 'Sprint 24',
              environment: 'Production',
              module: 'Sharing Engine',
              summary: 'Universal Deep-Link Route Failure',
              description: 'Users on iOS Safari and Android Chrome receive broken redirect loops when opening project links.',
              impact: '14.2% drop-off on mobile onboarding links',
              action: 'Fix universal deep-link routing on iOS Safari and Android Chrome.',
            },
          ],
        },
        {
          id: 'col-2',
          title: 'Top Feature Demands & Enhancements',
          items: [
            {
              id: 'VGS-1023',
              title: 'Self-Serve Role Permission Delegation',
              tag: 'Feature Demand',
              tagColor: 'bg-amber-50 text-amber-700 border-amber-100',
              customer: 'Team Leads & Admins',
              quote: 'Team leads requested the ability to delegate workspace permissions without manual admin intervention.',
              assignee: 'Joya Chen',
              assigneeInitials: 'JC',
              assigneeColor: 'bg-amber-600',
              priority: 'High',
              type: 'Feature Request',
              dueDate: 'Sep 25, 2024',
              sprint: 'Sprint 25',
              environment: 'Staging',
              module: 'Workspace Admin',
              summary: 'Self-Serve Role Delegation',
              description: 'Project owners want to delegate reviewer and editor rights without requiring company-wide admin action.',
              impact: 'Removes Admin Bottlenecks for 24 Accounts',
              action: 'Allow project owners to delegate sub-folder rights directly.',
            },
            {
              id: 'VGS-1033',
              title: 'iPad Touch Target Close "X" Unresponsive',
              tag: 'Touch Target',
              tagColor: 'bg-amber-50 text-amber-700 border-amber-100',
              customer: 'Tablet Users',
              quote: 'Close button on iPad is only 16px wide and almost impossible to tap, forcing users to force-quit.',
              assignee: 'Joya Chen',
              assigneeInitials: 'JC',
              assigneeColor: 'bg-amber-600',
              priority: 'High',
              type: 'Accessibility Bug',
              dueDate: 'Sep 15, 2024',
              sprint: 'Sprint 24',
              environment: 'Production',
              module: 'Review Dialog UI',
              summary: 'iPad Close Hit-Slop Fix',
              description: 'Touch target bounds on iPad are 16px, violating Apple HIG guidelines.',
              impact: 'Causes angry 1-star rage ratings',
              action: 'Increase hit-slop to minimum 44x44px touch target.',
            },
          ],
        },
        {
          id: 'col-3',
          title: 'User Workflow & Sharing Requests',
          items: [
            {
              id: 'VGS-1044',
              title: 'Frictionless View-Only Guest Access (No Account Wall)',
              tag: 'Growth Loop',
              tagColor: 'bg-indigo-50 text-indigo-700 border-indigo-100',
              customer: 'Design Leads & Clients',
              quote: 'Clients should not be forced to create a full account with password just to view a shared dashboard.',
              assignee: 'Joya Chen',
              assigneeInitials: 'JC',
              assigneeColor: 'bg-amber-600',
              priority: 'High',
              type: 'Feature Request',
              dueDate: 'Oct 05, 2024',
              sprint: 'Sprint 25',
              environment: 'Staging',
              module: 'Guest Access Gateway',
              summary: 'Passwordless Guest View Links',
              description: 'Allow guests with secret token to view dashboard without mandatory signup.',
              impact: 'Removes primary viral barrier (lifting K-factor from 0.74 to 1.15)',
              action: 'Implement signed JWT view-only session cookies.',
            },
            {
              id: 'VGS-1036',
              title: 'Clean Minimalist Star Dialog UI',
              tag: 'Positive CSAT',
              tagColor: 'bg-emerald-50 text-emerald-700 border-emerald-100',
              customer: 'Happy Mobile User',
              quote: 'The new lightweight thumbs up/down micro-survey is fast and does not interrupt my design workflow.',
              assignee: 'Joya Chen',
              assigneeInitials: 'JC',
              assigneeColor: 'bg-amber-600',
              priority: 'Low',
              type: 'Positive Feedback',
              dueDate: 'Oct 01, 2024',
              sprint: 'Sprint 25',
              environment: 'Production',
              module: 'Micro-Survey',
              summary: 'Expand Micro-Survey Pattern',
              description: 'Positive sentiment recorded on non-intrusive survey widget.',
              impact: 'Highest recorded completion rate (82%)',
              action: 'Roll out micro-survey pattern across remaining dashboard pages.',
            },
          ],
        },
      ],
    },
    Engineers: {
      roleTitle: 'Engineering & Infrastructure View',
      personaName: 'Rafiq Khan',
      tagline: 'Bugs, Latency, Crash Exceptions, & Worker Timeouts (40 Engineering Reviews)',
      sentiment: {
        overall: 'Targeted Bug Triage & Latency Bottlenecks',
        positive: 45,
        neutral: 15,
        negative: 40,
      },
      metrics: [
        { label: 'Engineering Reviews', rep1: 'Rafiq Khan', rep1Count: 40, rep2: 'Ingested Bugs', rep2Count: 22, subtitle: '40 Tech Reviews' },
        { label: 'Critical Bugs', rep1: '504 Timeouts', rep1Count: 8, rep2: 'Safari Crashes', rep2Count: 6, subtitle: '14 Blocker Bugs' },
        { label: 'Export Latency', rep1: '20-Page PDF Deck', rep1Count: '78s', rep2: 'Target SLA', rep2Count: '<5s', subtitle: 'Queue Worker Fix' },
        { label: 'Resolved Tickets', rep1: 'Redis Async Queue', rep1Count: 'Pass', rep2: 'Idempotency Key', rep2Count: 'Verified', subtitle: 'Zero Cross-Leakage' },
      ],
      defaultIssue: {
        id: 'VGS-1024',
        title: 'Fix API Sync Failure in Production',
        type: 'Bug',
        priority: 'Critical',
        assignee: 'Rafiq Khan',
        assigneeInitials: 'RK',
        assigneeColor: 'bg-indigo-600',
        dueDate: 'Sep 14, 2024',
        sprint: 'Sprint 24',
        environment: 'Production',
        module: 'API Integration',
        summary: 'Fix API Sync Failure in Production',
        description: 'API sync is failing intermittently when syncing customer data to the production environment. Need to investigate error logs and implement background retry worker.',
        customer: 'Enterprise Warehouse Sync',
        quote: 'API sync is failing intermittently when syncing customer data to the production environment. Need to investigate error logs.',
        impact: 'Causes 8.2% intermittent sync failures',
        action: 'Add idempotency key and exponential backoff retry worker.',
        tag: 'API Bug',
        tagColor: 'bg-rose-50 text-rose-600 border-rose-100',
      },
      columns: [
        {
          id: 'col-1',
          title: 'Critical Production Bugs',
          items: [
            {
              id: 'VGS-1024',
              title: 'Fix API Sync Failure in Production',
              tag: 'API Bug',
              tagColor: 'bg-rose-50 text-rose-600 border-rose-100',
              customer: 'Enterprise Warehouse Sync',
              quote: 'API sync is failing intermittently when syncing customer data to the production environment. Need to investigate error logs.',
              assignee: 'Rafiq Khan',
              assigneeInitials: 'RK',
              assigneeColor: 'bg-indigo-600',
              priority: 'Critical',
              type: 'Backend Failure',
              dueDate: 'Sep 14, 2024',
              sprint: 'Sprint 24',
              environment: 'Production',
              module: 'API Integration',
              summary: 'Fix API Sync Failure in Production',
              description: 'API sync is failing intermittently when syncing customer data to the production environment.',
              impact: 'Causes 8.2% intermittent sync failures',
              action: 'Add idempotency key and exponential backoff retry worker.',
            },
            {
              id: 'VGS-1031',
              title: 'iOS 18 Safari Keyboard Constraint Crash',
              tag: 'UIKit Crash',
              tagColor: 'bg-rose-50 text-rose-600 border-rose-100',
              customer: 'Mobile Safari Shoppers',
              quote: 'The in-app review modal popped up right during checkout on iOS 18 Safari and cancelled my transaction!',
              assignee: 'Rafiq Khan',
              assigneeInitials: 'RK',
              assigneeColor: 'bg-indigo-600',
              priority: 'Critical',
              type: 'Client Crash',
              dueDate: 'Sep 12, 2024',
              sprint: 'Sprint 24',
              environment: 'Production',
              module: 'Review Modal',
              summary: 'iOS 18 Constraint Layout Collision',
              description: 'Virtual keyboard pops up over review dialog causing fatal layout constraint recursion.',
              impact: '6.4% crash rate on iOS 18 devices',
              action: 'Refactor KeyboardAvoidingView constraints in review modal component.',
            },
          ],
        },
        {
          id: 'col-2',
          title: 'Latency & Worker Timeouts',
          items: [
            {
              id: 'VGS-1043',
              title: 'PDF & Video Report 78s Export Timeouts',
              tag: '504 Timeout',
              tagColor: 'bg-amber-50 text-amber-700 border-amber-100',
              customer: 'Marketing Analysts (#CUST-308)',
              quote: 'Exporting a 20-page analytics deck takes 78 seconds and fails half the time with a 504 Gateway error.',
              assignee: 'Rafiq Khan',
              assigneeInitials: 'RK',
              assigneeColor: 'bg-indigo-600',
              priority: 'High',
              type: 'Timeout Bug',
              dueDate: 'Sep 18, 2024',
              sprint: 'Sprint 24',
              environment: 'Production',
              module: 'Export Service',
              summary: 'Export Worker Latency Overhaul',
              description: 'Synchronous PDF compilation blocks worker threads, exceeding 60-second gateway proxy limits.',
              impact: 'Worker thread hangs during multi-page exports',
              action: 'Offload PDF/video rendering to async background Redis worker queue with webhook delivery.',
            },
          ],
        },
        {
          id: 'col-3',
          title: 'Security & Access Flaws',
          items: [
            {
              id: 'VGS-1042',
              title: 'External Editor Demoting Project Owner',
              tag: 'ACL Vulnerability',
              tagColor: 'bg-rose-50 text-rose-600 border-rose-100',
              customer: 'Enterprise Admins',
              quote: 'An external contractor added as an editor was able to demote the original project owner to view-only!',
              assignee: 'Rafiq Khan',
              assigneeInitials: 'RK',
              assigneeColor: 'bg-indigo-600',
              priority: 'Critical',
              type: 'Security Flaw',
              dueDate: 'Sep 13, 2024',
              sprint: 'Sprint 24',
              environment: 'Production',
              module: 'Permissions Engine',
              summary: 'Owner Demotion Privilege Escalation',
              description: 'Missing immutable check on project owner permissions allowed editors to change owner ACLs.',
              impact: 'Severe Privilege Escalation Flaw',
              action: 'Enforce strict immutable Owner role permission rules.',
            },
            {
              id: 'VGS-1046',
              title: 'Redis Async Task Queue Verification',
              tag: 'Infra Win',
              tagColor: 'bg-emerald-50 text-emerald-700 border-emerald-100',
              customer: 'Core Infrastructure',
              quote: 'Async queue verified in staging environment with zero worker thread blocks under high concurrent load.',
              assignee: 'Rafiq Khan',
              assigneeInitials: 'RK',
              assigneeColor: 'bg-indigo-600',
              priority: 'Low',
              type: 'Infrastructure',
              dueDate: 'Sep 22, 2024',
              sprint: 'Sprint 24',
              environment: 'Staging',
              module: 'Task Queue',
              summary: 'Queue Performance Benchmark',
              description: 'Staging load test verified zero worker stalls under 500 concurrent export requests.',
              impact: '100% elimination of 504 gateway timeout bugs',
              action: 'Promote Redis task queue worker to production cluster.',
            },
          ],
        },
      ],
    },
    Sales: {
      roleTitle: 'Sales & Enterprise Pipeline View',
      personaName: 'Daniel Kim',
      tagline: 'Deal Blockers, SSO/Security Compliance, & Buyer Objections (30 Sales Reviews)',
      sentiment: {
        overall: 'High Enterprise Intent Gated by Compliance & Access',
        positive: 58,
        neutral: 12,
        negative: 30,
      },
      metrics: [
        { label: 'Sales Reviews', rep1: 'Daniel Kim', rep1Count: 30, rep2: 'Enterprise Tiers', rep2Count: 18, subtitle: '30 Commercial Reviews' },
        { label: 'Top Deal Blocker', rep1: 'Sub-Folder ACL', rep1Count: 6, rep2: 'Procurement', rep2Count: 'Frozen', subtitle: '6 Deals Frozen' },
        { label: 'Security Demands', rep1: 'Okta SAML SSO', rep1Count: 12, rep2: 'Audit Logs', rep2Count: 8, subtitle: '20 Compliance Requests' },
        { label: 'Viral Objections', rep1: 'No Account Wall', rep1Count: 9, rep2: 'Invite TTL', rep2Count: 14, subtitle: '23 Viral Friction Points' },
      ],
      defaultIssue: {
        id: 'VGS-1026',
        title: 'Granular Folder-Level Permissions',
        type: 'Compliance',
        priority: 'Critical',
        assignee: 'Daniel Kim',
        assigneeInitials: 'DK',
        assigneeColor: 'bg-emerald-600',
        dueDate: 'Sep 20, 2024',
        sprint: 'Sprint 24',
        environment: 'Sales Pipeline',
        module: 'Enterprise Governance',
        summary: 'Granular Folder-Level Permissions for Enterprise Contracts',
        description: 'We urgently need granular folder-level permissions. Right now, inviting external contractors exposes our entire project space.',
        customer: 'Enterprise Security Procurement (#CUST-804)',
        quote: 'We urgently need granular folder-level permissions. Right now, inviting external contractors exposes our entire project space.',
        impact: 'Blocks 6 enterprise deals currently in procurement freeze',
        action: 'Fast-track sub-folder permission isolation for enterprise sales commitments.',
        tag: 'Access Control',
        tagColor: 'bg-rose-50 text-rose-600 border-rose-100',
      },
      columns: [
        {
          id: 'col-1',
          title: 'Top Deal Blockers',
          items: [
            {
              id: 'VGS-1026',
              title: 'Granular Folder-Level Permissions',
              tag: 'Access Control',
              tagColor: 'bg-rose-50 text-rose-600 border-rose-100',
              customer: 'Enterprise Security Procurement (#CUST-804)',
              quote: 'We urgently need granular folder-level permissions. Right now, inviting external contractors exposes our entire project space.',
              assignee: 'Daniel Kim',
              assigneeInitials: 'DK',
              assigneeColor: 'bg-emerald-600',
              priority: 'Critical',
              type: 'Compliance Need',
              dueDate: 'Sep 20, 2024',
              sprint: 'Sprint 24',
              environment: 'Sales Pipeline',
              module: 'Enterprise Governance',
              summary: 'Granular Folder-Level Permissions',
              description: 'Right now, inviting external contractors exposes our entire project space unless folder-level gating is enforced.',
              impact: 'Blocks 6 enterprise deals currently in procurement freeze',
              action: 'Fast-track sub-folder permission isolation for enterprise sales commitments.',
            },
            {
              id: 'VGS-1041',
              title: '10-Minute Invite Link Expiration (403 Errors)',
              tag: 'Demo Blocker',
              tagColor: 'bg-rose-50 text-rose-600 border-rose-100',
              customer: 'Agency Accounts',
              quote: 'Whenever I generate a project invite link, it expires after 10 minutes and external clients get a 403 Forbidden error.',
              assignee: 'Daniel Kim',
              assigneeInitials: 'DK',
              assigneeColor: 'bg-emerald-600',
              priority: 'High',
              type: 'Client Drop-off',
              dueDate: 'Sep 13, 2024',
              sprint: 'Sprint 24',
              environment: 'Production',
              module: 'Sharing Links',
              summary: 'Short Invite Token Expiration',
              description: 'Prospective buyers drop off when sent 10-minute short-lived invite links.',
              impact: 'Frustrates prospects during evaluation phase',
              action: 'Extend external project invite link expiration from 10 minutes to 7 days.',
            },
          ],
        },
        {
          id: 'col-2',
          title: 'Requested Enterprise Features',
          items: [
            {
              id: 'VGS-1027',
              title: 'SAML / Okta Single Sign-On (SSO)',
              tag: 'Enterprise SSO',
              tagColor: 'bg-amber-50 text-amber-700 border-amber-100',
              customer: 'Fortune 500 Procurement',
              quote: 'SAML/Okta SSO integration is required by our corporate infosec policy before expanding our contract.',
              assignee: 'Daniel Kim',
              assigneeInitials: 'DK',
              assigneeColor: 'bg-emerald-600',
              priority: 'Critical',
              type: 'Compliance',
              dueDate: 'Sep 30, 2024',
              sprint: 'Sprint 25',
              environment: 'Procurement Review',
              module: 'SSO & Identity',
              summary: 'SAML 2.0 / Okta Integration',
              description: 'Mandatory infosec checkbox for 5 prospective enterprise customers.',
              impact: 'Unblocks enterprise expansion deals',
              action: 'Deliver SAML 2.0 / Okta identity federation.',
            },
            {
              id: 'VGS-1023',
              title: 'Self-Serve Role Permission Delegation',
              tag: 'Admin Demand',
              tagColor: 'bg-amber-50 text-amber-700 border-amber-100',
              customer: 'Department Heads & IT Admins',
              quote: 'Team leads requested the ability to delegate workspace permissions without manual admin intervention.',
              assignee: 'Daniel Kim',
              assigneeInitials: 'DK',
              assigneeColor: 'bg-emerald-600',
              priority: 'High',
              type: 'Governance',
              dueDate: 'Sep 25, 2024',
              sprint: 'Sprint 25',
              environment: 'Staging',
              module: 'Role Delegation',
              summary: 'Self-Serve Role Management',
              description: 'Enables departmental admins to allocate seats without contacting global admins.',
              impact: 'Key requirement for 100+ seat enterprise deployments',
              action: 'Add self-serve workspace role management to team settings.',
            },
          ],
        },
        {
          id: 'col-3',
          title: 'Client Objections & Friction',
          items: [
            {
              id: 'VGS-1044',
              title: 'Frictionless View-Only Guest Access (No Account Wall)',
              tag: 'Viral Barrier',
              tagColor: 'bg-indigo-50 text-indigo-700 border-indigo-100',
              customer: 'Agency & Consulting Clients',
              quote: 'Clients should not be forced to create a full account with password just to view a shared dashboard.',
              assignee: 'Daniel Kim',
              assigneeInitials: 'DK',
              assigneeColor: 'bg-emerald-600',
              priority: 'High',
              type: 'Onboarding Barrier',
              dueDate: 'Oct 05, 2024',
              sprint: 'Sprint 25',
              environment: 'Staging',
              module: 'Guest Gateway',
              summary: 'Passwordless Guest Previews',
              description: 'External stakeholders refuse to create account credentials just to review a report.',
              impact: 'Removes primary viral barrier for external stakeholders',
              action: 'Allow public read-only previews protected by optional passcode.',
            },
            {
              id: 'VGS-1047',
              title: 'Fast Link Copy & Intuitive Board Interface',
              tag: 'Champion Win',
              tagColor: 'bg-emerald-50 text-emerald-700 border-emerald-100',
              customer: 'Design Director',
              quote: 'The one-click link copy is super fast and the clean light-mode UI made adoption immediate across our team.',
              assignee: 'Daniel Kim',
              assigneeInitials: 'DK',
              assigneeColor: 'bg-emerald-600',
              priority: 'Low',
              type: 'Positive Feedback',
              dueDate: 'Oct 08, 2024',
              sprint: 'Sprint 25',
              environment: 'Production',
              module: 'Sales Enablement',
              summary: 'Champion UI Usability Praise',
              description: 'Prospective buyers highlight ease of adoption as decisive factor.',
              impact: 'Drives internal word-of-mouth referral',
              action: 'Leverage champion testimonial in sales presentations.',
            },
          ],
        },
      ],
    },
  };

  const currentPreview = rolePreviews[activePreviewRole] || rolePreviews.Founder;
  const activeIssue = selectedPreviewIssue || currentPreview.defaultIssue;

  const handleAddPreviewComment = (e) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    setCommentsList((prev) => [
      ...prev,
      {
        id: Date.now(),
        author: currentPreview.personaName,
        time: 'Just now',
        text: commentInput.trim(),
        avatar: activePreviewRole === 'Founder' ? 'AM' : activePreviewRole === 'PMs' ? 'JC' : activePreviewRole === 'Engineers' ? 'RK' : 'DK',
        badge: 'APP USER'
      }
    ]);
    setCommentInput('');
  };

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

          {/* Clean Product Preview Graphic / Browser Frame */}
          <div className="mt-14 max-w-5xl mx-auto bg-gradient-to-br from-[#EDE8F8] via-[#F4EFFB] to-[#FCE7F3] p-3 sm:p-5 rounded-3xl border border-purple-200/50 shadow-2xl text-left relative">

            {/* Inner App Window Container (Vice / Laser AI SaaS Window) */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-lg overflow-hidden flex flex-col md:flex-row relative">

              {/* Left Mini Sidebar */}
              <div className="w-full md:w-56 shrink-0 bg-[#FAFAFC] border-r border-slate-200/80 p-3 flex flex-col justify-between select-none">
                <div className="space-y-3.5">
                  {/* Workspace Header */}
                  <div className="flex items-center justify-between p-1 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-[#E24A27] text-white font-extrabold flex items-center justify-center text-xs shadow-xs">
                        V
                      </div>
                      <div>
                        <div className="flex items-center gap-1 font-bold text-xs text-slate-900 leading-tight">
                          <span>Vice / Laser AI</span>
                          <ChevronDown size={11} className="text-slate-400" />
                        </div>
                        <div className="text-[10px] text-slate-400">12 members</div>
                      </div>
                    </div>
                    <PanelLeft size={13} className="text-slate-400 hover:text-slate-700 cursor-pointer" />
                  </div>

                  {/* Search Bar */}
                  <div className="flex items-center gap-2 px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-400 shadow-xs">
                    <Search size={12} />
                    <span>Search...</span>
                  </div>

                  {/* Navigation List */}
                  <div className="space-y-0.5 text-xs font-medium text-slate-600">
                    <div className="flex items-center gap-2.5 px-2 py-1.5 rounded-md hover:bg-slate-100 cursor-pointer">
                      <Plus size={13} />
                      <span>Add New</span>
                    </div>
                    <div className="flex items-center gap-2.5 px-2 py-1.5 rounded-md bg-indigo-50/70 text-indigo-700 font-bold cursor-pointer">
                      <Home size={13} className="text-indigo-600" />
                      <span>Home</span>
                    </div>
                    <div className="flex items-center gap-2.5 px-2 py-1.5 rounded-md hover:bg-slate-100 cursor-pointer">
                      <Rocket size={13} />
                      <span>Deploy</span>
                    </div>
                    <div className="flex items-center gap-2.5 px-2 py-1.5 rounded-md hover:bg-slate-100 cursor-pointer">
                      <Database size={13} />
                      <span>Data Templates</span>
                    </div>
                    <div className="flex items-center justify-between px-2 py-1.5 rounded-md hover:bg-slate-100 cursor-pointer">
                      <div className="flex items-center gap-2.5">
                        <Sparkles size={13} className="text-indigo-500" />
                        <span>Tulvo AI</span>
                      </div>
                      <span className="text-[9px] font-bold text-sky-600 bg-sky-50 px-1.5 py-0.2 rounded border border-sky-100">Beta</span>
                    </div>
                  </div>

                  {/* Collections List */}
                  <div className="pt-2 border-t border-slate-200/70 space-y-1">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2">Recents</div>
                    <div className="space-y-0.5 text-xs text-slate-600">
                      <div className="flex items-center gap-2 px-2 py-1 rounded hover:bg-slate-100 cursor-pointer">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span className="truncate">Website CMS</span>
                      </div>
                      <div className="flex items-center gap-2 px-2 py-1 rounded hover:bg-slate-100 cursor-pointer">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                        <span className="truncate">Sales Board</span>
                      </div>
                      <div className="flex items-center gap-2 px-2 py-1 rounded hover:bg-slate-100 cursor-pointer">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                        <span className="truncate">Project Feed</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200/70 text-[10px] text-slate-400 flex items-center justify-between">
                  <span>Google Sheet Synced</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                </div>
              </div>

              {/* Main Content Area */}
              <div className="flex-1 flex flex-col overflow-hidden bg-white">

                {/* Top Breadcrumb & Control Bar */}
                <div className="px-5 py-3 border-b border-slate-200/80 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 text-slate-500">
                    <span>Home</span>
                    <ChevronRight size={12} className="text-slate-400" />
                    <span>Customer Feedback Board</span>
                    <ChevronRight size={12} className="text-slate-400" />
                    <span className="font-bold text-slate-800">Q2 2025</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 px-2.5 py-1 bg-slate-100 rounded-lg text-slate-700 font-semibold text-xs border border-slate-200">
                      <List size={12} />
                      <span>Q2 2025</span>
                      <ChevronDown size={11} className="text-slate-400" />
                    </div>
                    <span className="w-6 h-6 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 font-bold text-xs cursor-pointer">+</span>
                  </div>
                </div>

                {/* 4 Feedback KPI Cards (Pure Qualitative Feedback Metrics) */}
                <div className="p-5 border-b border-slate-100 bg-slate-50/50">
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">

                    {/* KPI 1: Total Feedback */}
                    <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-xs">
                      <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                        <span className="font-semibold">Total Analyzed</span>
                        <FileSpreadsheet size={13} className="text-emerald-500" />
                      </div>
                      <div className="text-lg font-extrabold text-slate-900">150 Reviews</div>
                      <div className="text-[10px] text-slate-500 font-medium">From connected Google Sheet</div>
                    </div>

                    {/* KPI 2: Overall Sentiment */}
                    <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-xs">
                      <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                        <span className="font-semibold">User Sentiment</span>
                        <TrendingUp size={13} className="text-emerald-500" />
                      </div>
                      <div className="text-lg font-extrabold text-emerald-600">64% Positive</div>
                      <div className="text-[10px] text-slate-500 font-medium">+12% vs last week</div>
                    </div>

                    {/* KPI 3: Top Theme */}
                    <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-xs">
                      <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                        <span className="font-semibold">Top Recurring Theme</span>
                        <Tag size={13} className="text-indigo-500" />
                      </div>
                      <div className="text-lg font-extrabold text-slate-900">Sharing & Export UX</div>
                      <div className="text-[10px] text-slate-500 font-medium">Mentioned in 38 reviews</div>
                    </div>

                    {/* KPI 4: Top User Pain Point */}
                    <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-xs">
                      <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                        <span className="font-semibold">Top UX Pain Point</span>
                        <AlertCircle size={13} className="text-amber-500" />
                      </div>
                      <div className="text-lg font-extrabold text-rose-600">Mobile Safari Link Fail</div>
                      <div className="text-[10px] text-slate-500 font-medium">14 user bug reports</div>
                    </div>

                  </div>
                </div>

                {/* Qualitative Pain Point Quote Highlight Bar */}
                <div className="px-5 py-3 bg-indigo-50/50 border-b border-indigo-100 flex items-center justify-between text-xs text-indigo-950">
                  <div className="flex items-center gap-2 truncate">
                    <span className="font-bold text-indigo-600 uppercase text-[10px] bg-indigo-100 px-2 py-0.5 rounded shrink-0">Insight Highlight</span>
                    <span className="truncate italic text-slate-700">"Users love the new review layout, but 14 people reported that sharing links fail on mobile browsers."</span>
                  </div>
                  <span className="shrink-0 text-[11px] font-bold text-indigo-600">Actionable Takeaway →</span>
                </div>

                {/* Mini Kanban Columns View */}
                <div className="p-5 overflow-x-auto">
                  <div className="grid grid-cols-3 gap-4 min-w-[500px]">

                    {/* Column 1 */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-700 pb-1 border-b border-slate-200">
                        <span>Lead 12 of 12 items</span>
                        <span className="text-slate-400 font-bold">+</span>
                      </div>
                      <div className="bg-white border border-slate-200/80 rounded-xl p-3 shadow-xs space-y-2">
                        <div className="text-xs font-bold text-slate-900">NovaTech Branding</div>
                        <div>
                          <span className="inline-block px-2.5 py-0.5 rounded-md text-[10px] font-semibold bg-rose-50 text-rose-600 border border-rose-100/70">
                            Branding
                          </span>
                        </div>
                        <div className="pt-1 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                          <span className="flex items-center gap-1">Select A Project Type <ChevronDown size={10} /></span>
                          <GripVertical size={11} className="text-slate-300" />
                        </div>
                      </div>
                      <div className="bg-white border border-slate-200/80 rounded-xl p-3 shadow-xs space-y-2">
                        <div className="text-xs font-bold text-slate-900">Lumen Social Campaign</div>
                        <div>
                          <span className="inline-block px-2.5 py-0.5 rounded-md text-[10px] font-semibold bg-sky-50 text-sky-600 border border-sky-100/70">
                            Social Media
                          </span>
                        </div>
                        <div className="pt-1 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                          <span className="flex items-center gap-1">Select A Project Type <ChevronDown size={10} /></span>
                          <GripVertical size={11} className="text-slate-300" />
                        </div>
                      </div>
                    </div>

                    {/* Column 2 */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-700 pb-1 border-b border-slate-200">
                        <span>Meeting Scheduled 3 of 3 items</span>
                        <span className="text-slate-400 font-bold">+</span>
                      </div>
                      <div className="bg-white border border-slate-200/80 rounded-xl p-3 shadow-xs space-y-2">
                        <div className="text-xs font-bold text-slate-900">PixelNest Content Strategy</div>
                        <div>
                          <span className="inline-block px-2.5 py-0.5 rounded-md text-[10px] font-semibold bg-emerald-50 text-emerald-600 border border-emerald-100/70">
                            Content
                          </span>
                        </div>
                        <div className="pt-1 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                          <span className="flex items-center gap-1">Select A Project Type <ChevronDown size={10} /></span>
                          <GripVertical size={11} className="text-slate-300" />
                        </div>
                      </div>
                      <div className="bg-white border border-slate-200/80 rounded-xl p-3 shadow-xs space-y-2">
                        <div className="text-xs font-bold text-slate-900">Stride Digital Ads</div>
                        <div>
                          <span className="inline-block px-2.5 py-0.5 rounded-md text-[10px] font-semibold bg-amber-50 text-amber-600 border border-amber-100/70">
                            Paid Ads
                          </span>
                        </div>
                        <div className="pt-1 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                          <span className="flex items-center gap-1">Select A Project Type <ChevronDown size={10} /></span>
                          <GripVertical size={11} className="text-slate-300" />
                        </div>
                      </div>
                    </div>

                    {/* Column 3 */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-700 pb-1 border-b border-slate-200">
                        <span>Qualified 4 of 4 items</span>
                        <span className="text-slate-400 font-bold">+</span>
                      </div>
                      <div className="bg-white border border-slate-200/80 rounded-xl p-3 shadow-xs space-y-2">
                        <div className="text-xs font-bold text-slate-900">BrightPath Rebranding</div>
                        <div>
                          <span className="inline-block px-2.5 py-0.5 rounded-md text-[10px] font-semibold bg-rose-50 text-rose-600 border border-rose-100/70">
                            Branding
                          </span>
                        </div>
                        <div className="pt-1 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                          <span className="flex items-center gap-1">Select A Project Type <ChevronDown size={10} /></span>
                          <GripVertical size={11} className="text-slate-300" />
                        </div>
                      </div>
                      <div className="bg-white border border-slate-200/80 rounded-xl p-3 shadow-xs space-y-2">
                        <div className="text-xs font-bold text-slate-900">UrbanLeaf Website</div>
                        <div>
                          <span className="inline-block px-2.5 py-0.5 rounded-md text-[10px] font-semibold bg-purple-50 text-purple-600 border border-purple-100/70">
                            Website
                          </span>
                        </div>
                        <div className="pt-1 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                          <span className="flex items-center gap-1">Select A Project Type <ChevronDown size={10} /></span>
                          <GripVertical size={11} className="text-slate-300" />
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

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
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold mb-3">
              <BarChart3 size={13} className="text-indigo-600" />
              <span>Interactive Application Workbench</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
              Role-Specific Workspaces & Live Slack Collaboration
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Experience the dual power of Laser AI: switch personas to see role-isolated board columns, or click any card to inspect tickets and live Slack feeds.
            </p>
          </div>

          {/* Controls Bar: 4 Role Personas Switcher (Strictly Standardized) */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-slate-50 p-2.5 rounded-2xl border border-slate-200">

            {/* Persona Switcher Tabs for 4 Standardized Roles */}
            <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
              <button
                onClick={() => { setActivePreviewRole('Founder'); setSelectedPreviewIssue(null); }}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${activePreviewRole === 'Founder'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
              >
                <Users size={13} className={activePreviewRole === 'Founder' ? 'text-indigo-400' : 'text-slate-400'} />
                <span>Founder</span>
              </button>

              <button
                onClick={() => { setActivePreviewRole('PMs'); setSelectedPreviewIssue(null); }}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${activePreviewRole === 'PMs'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
              >
                <Star size={13} className={activePreviewRole === 'PMs' ? 'text-amber-400' : 'text-slate-400'} />
                <span>PMs</span>
              </button>

              <button
                onClick={() => { setActivePreviewRole('Engineers'); setSelectedPreviewIssue(null); }}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${activePreviewRole === 'Engineers'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
              >
                <Layers size={13} className={activePreviewRole === 'Engineers' ? 'text-rose-400' : 'text-slate-400'} />
                <span>Engineers</span>
              </button>

              <button
                onClick={() => { setActivePreviewRole('Sales'); setSelectedPreviewIssue(null); }}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${activePreviewRole === 'Sales'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
              >
                <ShieldCheck size={13} className={activePreviewRole === 'Sales' ? 'text-emerald-400' : 'text-slate-400'} />
                <span>Sales</span>
              </button>
            </div>

            {/* Scope Helper Badge */}
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium px-2">
              <span className="text-[11px] text-slate-500">
                Click any ticket to inspect live issue details & Slack thread
              </span>
            </div>

          </div>

          {/* Interactive Workbench Canvas */}
          <div className="bg-white border border-slate-200/90 rounded-2xl shadow-xl overflow-hidden min-h-[580px] flex flex-col">

            {/* Top Bar for Interactive Workbench */}
            <div className="px-6 py-3 border-b border-slate-200/80 bg-slate-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                  {currentPreview.roleTitle}
                </span>
                <span className="font-bold text-slate-800">{currentPreview.tagline}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-500">
                <span>Active Role: <strong className="text-slate-800">{activePreviewRole}</strong></span>
                <span className="text-slate-300">•</span>
                <span className="text-emerald-600 font-semibold flex items-center gap-1">
                  <CheckCircle2 size={12} />
                  Zero Cross-Role Leakage
                </span>
              </div>
            </div>

            {/* VIEW MODE 1: KANBAN BOARD WITH TOP COUNTERS (Images 1, 2, 4) */}
            {!selectedPreviewIssue && (
              <div className="p-6 space-y-6 flex-1 overflow-auto">

                {/* 4 Metrics Counters Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {currentPreview.metrics.map((m, idx) => (
                    <div key={idx} className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-xs flex flex-col justify-between">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-2">
                        <span className="flex items-center gap-1.5">
                          {idx % 2 === 0 ? <List size={13} className="text-slate-400" /> : <AwardIcon className="w-3.5 h-3.5 text-amber-500" />}
                          <span>{m.label}</span>
                        </span>
                        <MoreHorizontal size={12} className="text-slate-300" />
                      </div>
                      <div className="space-y-1 text-[11px] text-slate-500">
                        <div className="flex justify-between items-center">
                          <span className="flex items-center gap-1 text-slate-700">
                            <User size={11} className="text-slate-400" />
                            {m.rep1}
                          </span>
                          <span className="font-bold text-slate-800">{m.rep1Count}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="flex items-center gap-1 text-slate-700">
                            <User size={11} className="text-slate-400" />
                            {m.rep2}
                          </span>
                          <span className="font-bold text-slate-800">{m.rep2Count}</span>
                        </div>
                        <div className="text-[10px] text-indigo-600 font-semibold pt-1">
                          {m.subtitle} • <span className="text-slate-400">+ add metrics</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Scoped Kanban Board Columns */}
                <div>
                  <div className="flex items-center justify-between mb-3 text-xs text-slate-500 font-medium">
                    <span>Click any card below to open the <strong>Image 3 Detailed Ticket & Slack Drawer</strong>:</span>
                    <span className="text-indigo-600 font-bold">Interactive Live Demo</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {currentPreview.columns.map((col) => (
                      <div key={col.id} className="space-y-3">
                        <div className="flex items-center justify-between pb-1 text-xs">
                          <div className="flex items-center gap-2 font-bold text-slate-800">
                            <span>{col.title}</span>
                            <span className="text-slate-400 font-normal">{col.items.length} items</span>
                          </div>
                          <span className="text-slate-400 font-bold cursor-pointer">+</span>
                        </div>

                        <div className="space-y-3">
                          {col.items.map((card) => (
                            <div
                              key={card.id}
                              onClick={() => {
                                setSelectedPreviewIssue(card);
                                setPreviewViewMode('issue');
                              }}
                              className="bg-white border border-slate-200/80 hover:border-indigo-400 rounded-xl p-4 shadow-xs hover:shadow-md transition-all cursor-pointer group space-y-2.5 relative"
                            >
                              <div className="flex items-start justify-between gap-2">
                                <h4 className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug">
                                  {card.title}
                                </h4>
                                <span className="text-[10px] font-mono text-slate-400 shrink-0">{card.id}</span>
                              </div>

                              {/* Frosted Pastel Pill Badge (Image 2 & 4 style) */}
                              <div>
                                <span className={`inline-block px-2.5 py-0.5 rounded-md text-[10px] font-semibold border ${card.tagColor}`}>
                                  {card.tag}
                                </span>
                              </div>

                              <p className="text-[11px] text-slate-500 italic line-clamp-2 leading-relaxed">
                                "{card.quote}"
                              </p>

                              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                                <div className="flex items-center gap-1.5 text-[11px] text-slate-500 group-hover:text-slate-800">
                                  <span>Select A Project Type</span>
                                  <ChevronDown size={11} className="text-slate-400" />
                                </div>
                                <GripVertical size={13} className="text-slate-300 group-hover:text-slate-500 transition-colors" />
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

            {/* VIEW MODE 2: ISSUE DETAIL & SLACK SIDE DRAWER (Exact Image 3 layout) */}
            {selectedPreviewIssue && (
              <div className="flex-1 flex flex-col lg:flex-row overflow-hidden bg-white">

                {/* Left/Center Issue Details Area */}
                <div className="flex-1 overflow-auto p-6 lg:p-8 space-y-6">

                  {/* Back Link & Breadcrumb Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200/80">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <button
                        onClick={() => setSelectedPreviewIssue(null)}
                        className="flex items-center gap-1 text-indigo-600 hover:text-indigo-700 font-semibold"
                      >
                        <ArrowLeft size={13} />
                        <span>Back to Board</span>
                      </button>
                      <span>/</span>
                      <span>Engineering</span>
                      <span>/</span>
                      <span>Issues</span>
                      <span>/</span>
                      <span className="font-mono text-slate-700 font-bold">{activeIssue.id}</span>
                    </div>

                    <button
                      onClick={() => setSelectedPreviewIssue(null)}
                      className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                    >
                      <X size={15} />
                    </button>
                  </div>

                  {/* Issue Title & Status Badge */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-xs font-bold text-slate-500">{activeIssue.id}</span>
                      <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Open
                      </span>
                    </div>
                    <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                      {activeIssue.title}
                    </h1>
                  </div>

                  {/* Metadata Property Table (Exact Image 3 Table) */}
                  <div className="space-y-3.5 max-w-xl text-xs py-2">
                    <div className="grid grid-cols-3 items-center">
                      <span className="text-slate-400 flex items-center gap-2">
                        <Tag size={13} />
                        <span>Issue Type</span>
                      </span>
                      <div className="col-span-2">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-rose-50 text-rose-700 text-xs font-semibold border border-rose-100">
                          {activeIssue.type}
                          <ChevronDown size={11} className="text-rose-400" />
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 items-center">
                      <span className="text-slate-400 flex items-center gap-2">
                        <Shield size={13} />
                        <span>Priority</span>
                      </span>
                      <div className="col-span-2">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-amber-50 text-amber-700 text-xs font-semibold border border-amber-100">
                          {activeIssue.priority}
                          <ChevronDown size={11} className="text-amber-400" />
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 items-center">
                      <span className="text-slate-400 flex items-center gap-2">
                        <User size={13} />
                        <span>Assignee</span>
                      </span>
                      <div className="col-span-2 flex items-center gap-2">
                        <div className={`w-6 h-6 rounded-full ${activeIssue.assigneeColor} text-white font-bold text-[10px] flex items-center justify-center`}>
                          {activeIssue.assigneeInitials}
                        </div>
                        <span className="font-semibold text-slate-800">{activeIssue.assignee}</span>
                        <span className="text-slate-400 text-xs cursor-pointer">+</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 items-center">
                      <span className="text-slate-400 flex items-center gap-2">
                        <Calendar size={13} />
                        <span>Due Date</span>
                      </span>
                      <div className="col-span-2 flex items-center gap-1.5 text-slate-700 font-medium">
                        <span>{activeIssue.dueDate}</span>
                        <X size={11} className="text-slate-400 cursor-pointer" />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 items-center">
                      <span className="text-slate-400 flex items-center gap-2">
                        <Clock size={13} />
                        <span>Sprint</span>
                      </span>
                      <div className="col-span-2 flex items-center gap-1 text-slate-700 font-medium">
                        <span>{activeIssue.sprint}</span>
                        <ChevronDown size={11} className="text-slate-400" />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 items-center">
                      <span className="text-slate-400 flex items-center gap-2">
                        <Layers size={13} />
                        <span>Environment</span>
                      </span>
                      <div className="col-span-2 flex items-center gap-1 text-slate-700 font-medium">
                        <span>{activeIssue.environment}</span>
                        <ChevronDown size={11} className="text-slate-400" />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 items-center">
                      <span className="text-slate-400 flex items-center gap-2">
                        <Folder size={13} />
                        <span>Related Module</span>
                      </span>
                      <div className="col-span-2 flex items-center gap-1 text-slate-700 font-medium">
                        <span>{activeIssue.module}</span>
                        <ChevronDown size={11} className="text-slate-400" />
                      </div>
                    </div>
                  </div>

                  {/* Summary & Description */}
                  <div className="space-y-4 pt-4 border-t border-slate-200/80">
                    <div>
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Summary</div>
                      <div className="text-sm font-semibold text-slate-800">{activeIssue.summary}</div>
                    </div>

                    <div>
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Description</div>
                      <div className="text-xs text-slate-600 bg-slate-50 p-3.5 rounded-xl border border-slate-200/70 leading-relaxed font-sans">
                        {activeIssue.description}
                      </div>
                    </div>

                    <div>
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Raw User Voice Quote</div>
                      <div className="text-xs text-indigo-900 bg-indigo-50/60 p-3.5 rounded-xl border border-indigo-100 italic leading-relaxed">
                        "{activeIssue.quote}"
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 text-xs text-slate-700">
                      <span className="font-bold text-indigo-600 block mb-1">Recommended Resolution:</span>
                      {activeIssue.action}
                    </div>
                  </div>

                </div>

                {/* Right Side Drawer: Comments & Slack Integration (Exact Image 3 Right Column) */}
                <div className="w-full lg:w-80 shrink-0 border-t lg:border-t-0 lg:border-l border-slate-200 bg-[#FAFAFC] flex flex-col justify-between">

                  <div>
                    {/* Drawer Tab Headers */}
                    <div className="flex border-b border-slate-200 text-xs font-bold text-slate-600 bg-white">
                      <button
                        onClick={() => setActiveDrawerTab('comments')}
                        className={`flex-1 py-3 text-center transition-colors border-b-2 ${activeDrawerTab === 'comments'
                          ? 'border-indigo-600 text-indigo-600'
                          : 'border-transparent text-slate-500 hover:text-slate-800'
                          }`}
                      >
                        Comments
                      </button>
                      <button
                        onClick={() => setActiveDrawerTab('slack')}
                        className={`flex-1 py-3 text-center transition-colors border-b-2 flex items-center justify-center gap-1.5 ${activeDrawerTab === 'slack'
                          ? 'border-indigo-600 text-indigo-600'
                          : 'border-transparent text-slate-500 hover:text-slate-800'
                          }`}
                      >
                        <Slack size={13} className="text-[#4A154B]" />
                        <span>Slack</span>
                      </button>
                    </div>

                    {/* Drawer Content */}
                    <div className="p-4 space-y-4 max-h-[480px] overflow-auto">

                      {/* Mock Slack Bot Feed */}
                      <div className="space-y-3 text-xs">

                        {/* Slack message: Vega CI Bot */}
                        <div className="flex items-start gap-2.5">
                          <div className="w-6 h-6 rounded bg-sky-500 text-white font-extrabold text-[10px] flex items-center justify-center shrink-0">
                            VC
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center gap-1.5 text-[11px]">
                              <span className="font-bold text-slate-900">Vega CI</span>
                              <span className="text-[9px] bg-slate-200 px-1 rounded text-slate-600 font-semibold">APP</span>
                            </div>
                            <div className="bg-white p-2.5 rounded-lg border border-slate-200 text-slate-700 text-[11px] shadow-xs">
                              Build #4821 failed in module API Integration
                            </div>
                          </div>
                        </div>

                        {/* Slack message: Rafiq Khan */}
                        <div className="flex items-start gap-2.5">
                          <div className="w-6 h-6 rounded-full bg-amber-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0">
                            AR
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center gap-1.5 text-[11px]">
                              <span className="font-bold text-slate-900">Akib Rahman</span>
                              <span className="text-slate-400 text-[10px]">10:42 AM</span>
                            </div>
                            <div className="bg-white p-2.5 rounded-lg border border-slate-200 text-slate-700 text-[11px] shadow-xs">
                              <span className="text-indigo-600 font-semibold">@rafiq</span> can you check the exponential backoff worker logs?
                            </div>
                          </div>
                        </div>

                        {/* Slack message: Sentry Bot */}
                        <div className="flex items-start gap-2.5">
                          <div className="w-6 h-6 rounded bg-purple-600 text-white font-extrabold text-[10px] flex items-center justify-center shrink-0">
                            SN
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center gap-1.5 text-[11px]">
                              <span className="font-bold text-slate-900">Sentry</span>
                              <span className="text-[9px] bg-slate-200 px-1 rounded text-slate-600 font-semibold">APP</span>
                            </div>
                            <div className="bg-white p-2.5 rounded-lg border border-slate-200 text-slate-700 text-[11px] shadow-xs space-y-1">
                              <div>Error rate spike detected: <strong>API_SYNC_TIMEOUT</strong></div>
                              <div className="text-[10px] text-indigo-600 font-bold cursor-pointer">View Sentry Issue #884 →</div>
                            </div>
                          </div>
                        </div>

                        {/* Dynamic User Added Comments */}
                        {commentsList.map((c) => (
                          <div key={c.id} className="flex items-start gap-2.5">
                            <div className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0">
                              {c.avatar}
                            </div>
                            <div className="space-y-1">
                              <div className="flex items-center gap-1.5 text-[11px]">
                                <span className="font-bold text-slate-900">{c.author}</span>
                                <span className="text-slate-400 text-[10px]">{c.time}</span>
                              </div>
                              <div className="bg-white p-2.5 rounded-lg border border-indigo-200 text-slate-800 text-[11px] shadow-xs">
                                {c.text}
                              </div>
                            </div>
                          </div>
                        ))}

                      </div>

                    </div>
                  </div>

                  {/* Comment Input Footer Box */}
                  <form onSubmit={handleAddPreviewComment} className="p-3 border-t border-slate-200 bg-white">
                    <div className="relative">
                      <input
                        type="text"
                        value={commentInput}
                        onChange={(e) => setCommentInput(e.target.value)}
                        placeholder="Add a comment or Slack reply..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 pr-8"
                      />
                      <button
                        type="submit"
                        disabled={!commentInput.trim()}
                        className="absolute right-2 top-2 text-indigo-600 disabled:text-slate-300 hover:text-indigo-800 transition-colors"
                      >
                        <Send size={13} />
                      </button>
                    </div>
                  </form>

                </div>

              </div>
            )}

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
                  Laser AI (Gemini 2.5)
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
                  Tailored insights are delivered directly to each stakeholder's email and Slack channels—giving everyone ready-to-act intelligence without extra logins.
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-[11px] text-slate-500 font-mono">
                ✓ Real-time Unified Dispatch
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
