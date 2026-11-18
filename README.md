# Laser AI — Automated SaaS Customer Feedback Intelligence (v2.2)

> **Laser AI** transforms raw, unstructured customer feedback from a Google Sheet into role-specific product digests (**Founder**, **Review Section PM**, and **Sharing Section PM**), featuring strict single-role isolation, a clean light-mode SaaS aesthetic, interactive sentiment charts, and 1-click instant dispatch to **Gmail** and **Slack Webhooks**.

---

## 🌟 Key Updates in v2.2

### 1. Strict Single-Role Isolation (No Simulator Clutter)
- **Zero Cross-Role Leakage**: The dashboard and digest preview render **ONLY** the workspace, metrics, sentiment, and action items belonging strictly to the single role selected by the user on the Onboarding Form.
- **Removed Prototype Simulator Bar**: Roles like Joya Chen or Aman Patel are no longer displayed on another persona's active workspace.
- **Clean "Switch Role / Re-configure" Flow**: To switch roles or change settings, users simply click the **"Switch Role / Re-configure"** button in the top header, which takes them cleanly back to the Onboarding Form.
- **Removed Cross-Role Mentions**: Cross-role mentions (such as "Delegated Feature PM Initiatives") have been eliminated from the Founder view. The Founder screen stays strictly dedicated to macro revenue, ARR at risk ($180k), enterprise NPS, and churn velocity, while each PM screen remains strictly focused on their own module.

### 2. Clean, Light-Mode SaaS Theme (Linear / Notion Aesthetic)
- **Airy Canvas & Cards**: Replaced dark navy backgrounds with pure white (`#FFFFFF`) cards resting on a soft off-white/slate canvas (`#F8FAFC`, `bg-slate-50`).
- **Subtle Gray Borders**: Clean, understated borders (`#E2E8F0`, `border-slate-200`) provide structure without heavy visual weight.
- **Dark Slate Typography**: High-readability slate typography (`#0F172A`, `text-slate-900`) with balanced secondary labels (`text-slate-500`).
- **Calm, Modern Accents**: Vibrant Indigo (`#4F46E5`) for primary actions, soft Emerald (`#10B981`) for positive sentiment, and muted Amber/Rose badges for alerts—without artificial neon glows.
- **Reduced Density & Increased Whitespace**: Streamlined card layouts, increased breathing room, and eliminated dense text blocks for effortless scanning.

### 3. Interactive Marketing Canvas (Screen 1)
- **Interactive Architecture Flow**: Step-by-step visual canvas illustrating raw feedback traveling from Google Sheets -> through Gemini 2.5 Flash -> splitting into role-tailored digests.
- **Interactive Classifier Beam Tester**: Click 3 live sample customer feedback pills (*"Pricing doubled"*, *"Review modal popped during checkout"*, *"Invite link 403"*) to watch the AI classifier route feedback with real-time confidence scores.
- **"See Example Digests" Modal**: Scoped side-by-side comparison modal between Founder and Feature PM digest structures.

---

## 🚀 5-Screen User Flow

1. **Screen 1 — Interactive Landing Page**: Hero, interactive ingestion canvas, live classifier tester, example digest comparison, and quick-launch CTAs.
2. **Screen 2 — Demo Login**: Clean, minimal white card with 1-click **"Continue with Google (Demo)"** bypass button.
3. **Screen 3 — Onboarding & Routing Form**: Name, Email, optional Slack Webhook, Digest Frequency, and Role cards.
4. **Screen 4 — Strictly Isolated Role Dashboard**: Strictly scoped metrics & sentiment charts, urgent bugs / blockers, feature demands, raw feedback modal, and a clean "Switch Role / Re-configure" header button.
5. **Screen 5 — Digest Preview & Instant Dispatch**: Live unified Email HTML & Slack Block Kit preview + **"Send Digest Now"** trigger button.

---

## ⚡ Quickstart

### Launch Batch / PowerShell Script:
Double-click [start.bat](file:///d:/AntiGravity/laserAI/start.bat) or run [run.ps1](file:///d:/AntiGravity/laserAI/run.ps1) in PowerShell:
```powershell
.\run.ps1
```

### Manual Terminals:
1. **Backend**:
   ```powershell
   cd backend
   .\venv\Scripts\python.exe -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
   ```
   * Swagger Docs: [http://localhost:8000/docs](http://localhost:8000/docs)
2. **Frontend**:
   ```powershell
   cd frontend
   npm run dev
   ```
   * Interactive App: [http://localhost:5173](http://localhost:5173)

---

## 📂 Key Files

* [architecture.md](file:///d:/AntiGravity/laserAI/architecture.md) — System architecture, data flow, and role segregation model.
* [backend/data/sample_feedback.csv](file:///d:/AntiGravity/laserAI/backend/data/sample_feedback.csv) — 30-row customer feedback dataset.
* [backend/app/services/llm_service.py](file:///d:/AntiGravity/laserAI/backend/app/services/llm_service.py) — Gemini 2.5 Flash structured synthesis engine.
* [backend/app/services/email_service.py](file:///d:/AntiGravity/laserAI/backend/app/services/email_service.py) — Clean HTML email renderer.
* [backend/app/services/slack_service.py](file:///d:/AntiGravity/laserAI/backend/app/services/slack_service.py) — Slack Block Kit formatter.
* [frontend/src/components/Screens/LandingScreen.jsx](file:///d:/AntiGravity/laserAI/frontend/src/components/Screens/LandingScreen.jsx) — Light-theme marketing canvas & classifier simulator.
* [frontend/src/components/Screens/DashboardScreen.jsx](file:///d:/AntiGravity/laserAI/frontend/src/components/Screens/DashboardScreen.jsx) — Strictly isolated light-theme role dashboard.
* [frontend/src/components/Screens/DigestPreviewScreen.jsx](file:///d:/AntiGravity/laserAI/frontend/src/components/Screens/DigestPreviewScreen.jsx) — Live Email & Slack preview with instant multi-channel dispatch.
