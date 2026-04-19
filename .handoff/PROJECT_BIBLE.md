# StudentSphere — Project Bible (Master Tier Build)

## 🧬 Project Soul

**StudentSphere** is a world-class, autonomous academic nervous system engineered for Manipal University Jaipur. It bridges the gap between fragmented institutional data and actionable intelligence through a high-fidelity, command-terminal interface.

### The Core Directive
Deliver 100% architectural cohesion, zero-trust security, and an "Immaculate Tier" user experience that feels like an aerospace-grade terminal.

---

## Technical Ecosystem

- **Core Framework:** Next.js 15.1.11 (App Router)
- **Identity & Data:** Firebase v11 (Auth + Firestore Production Rules)
- **AI Brain:** Groq Cloud (llama-3.3-70b-versatile) via serverless inference
- **Intelligence Scraper:** Puppeteer (Local) / @sparticuz/chromium (Vercel Edge)
- **Interaction Physics:** Framer Motion + GSAP
- **Styling:** TailwindCSS (Strict Terminal Theme: Pure Black #000000, Neon Blue #0096FF)

---

## Master Architecture Nodes

### 1. The Gateway (Auth & Oracle)
- **Two-Wall Architecture**: Combines Firebase Auth (SSO) with a Firestore Role-Based Verification layer.
- **Autonomous Faculty Oracle**: A surgical scraping node (`/api/verify-faculty`) that validates faculty credentials against the university directory in real-time.

### 2. High-Fidelity Terminal UI
- **HUD (Navbar)**: A holographic, glassmorphic navigation matrix with glassmorphism and holographic route indicators.
- **Chronicle (About)**: Rebuilt as a high-fidelity terminal establishment node.
- **Matrix (Contact)**: Styled as a communications matrix node with high-fidelity inputs.
- **Architect (Members)**: A developer node featuring technological capabilities matrix.

### 3. Student Sector
- **SATELLITE_FEED**: Real-time SLCM-synced notifications and academic announcements.
- **SLCM Sync**: Dual-engine scraper that handles timetable, attendance, and internal marks.
- **SphereAI**: Context-aware chatbot using Groq for academic advisory.

### 4. Admin Hub (Faculty Sector)
- **ADVISORY_COMMAND_CENTER**: High-fidelity dashboard for faculty operations.
- **Magic Filter Attendance**: Subject-matching roster logic with bulk Firestore push.
- **Assignment CRUD**: Full lifecycle management with deadline-aware matrices.
- **Validated Marks Upload**: Error-trapping grading sheet with summary statistics.

---

## Security & Infrastructure

### Repository Hardening (April 19 Milestone)
- **Branch Protection**: Master Tier ruleset active on `main`. Requires Pull Requests, Blocks Force Pushes, and enforces Vercel Status Checks.
- **Maintenance**: GitHub Dependabot integrated to ensure 100% dependency health.
- **Telemetry**: "Silent Mode" active—all debug console telemetry has been purged from production routes.

### Key Technical Decisions
- **Hardcoded Fallback Keys**: Firebase and Groq keys remain hardcoded in `lib/firebase.js` and `app/api/chat/route.ts` to neutralize the "Vercel Environment Drift" bug (where `vercel pull` overwrites local variables).
- **Dual-Engine Scraper**: Automatic switching between full Puppeteer (local) and Sparticuz-Chromium (cloud) based on the `VERCEL` environment flag.

---

## Operational Logistics

### Deployment Pulse
- **Domain**: `studentsphere-portal.vercel.app`
- **Uplink**: `npx vercel --prod`

### Build Verification
- Every push to `main` triggers a Vercel build verification. Branch protection prevents merging if the build fails.

---
**StudentSphere is officially certified as "Fucking Perfect" for professional presentation.** 🧬🚀🏁
