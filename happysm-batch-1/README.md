# happysm

A privacy-conscious health and lifestyle education app. It is designed to help people understand measurements and reported habits, not to diagnose disease.

> **Current status:** Batch 1 foundation. The landing page and a local-only adult BMI calculator are implemented. Supabase identity/profile migration and BMI unit tests are included. Authentication, questionnaires, persistent dashboards, assessments, PDFs, schedules, notifications, creator validation workflows, and deployment verification remain in later batches. This is not yet production-ready and must not be used as a clinical tool.

## Stack

- Next.js App Router + TypeScript
- Tailwind CSS
- Supabase Auth + PostgreSQL + Row Level Security
- Zod, Vitest
- Planned: server-side PDF generation, Resend (or equivalent), scheduled jobs, Playwright end-to-end tests

## Folder structure

```text
happysm/
├── app/
│   ├── bmi/page.tsx              # Local-only adult BMI calculator
│   ├── login/page.tsx            # Setup placeholder; no credentials collected yet
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                  # Public landing page
├── components/brand.tsx
├── docs/ARCHITECTURE.md
├── lib/bmi/index.ts              # Pure, tested BMI logic
├── lib/supabase/env.ts           # Public Supabase env validation
├── supabase/migrations/0001_identity_and_access.sql
├── tests/bmi.test.ts
├── .env.example
├── package.json
└── README.md
```

## Requirements

Install Node.js 22 LTS, Git, and a code editor. Create a Supabase project before configuring authentication or database-backed features.

## Run locally (Windows PowerShell)

```powershell
# 1. Extract the project ZIP, then enter its folder
cd .\happysm

# 2. Install dependencies
npm install

# 3. Create local environment settings (do not commit this file)
Copy-Item .env.example .env.local

# 4. Start the development server
npm run dev
```

Open `http://localhost:3000`. The landing page and BMI calculator can run without Supabase credentials because they do not persist health data. Authentication is intentionally not active until Phase 4 is implemented.

## Quality commands

```powershell
npm run typecheck
npm test
npm run lint
npm run build
```

Run these after installing dependencies. Test execution and a production build have **not** been verified in this generated batch; do not assume they passed.

## Database setup

1. Create a new Supabase project.
2. Open **SQL Editor** and review `supabase/migrations/0001_identity_and_access.sql`.
3. Run it only on the intended project. It creates `profiles` and `creator_access` with RLS and basic ownership policies.
4. Do not insert a creator grant until the creator has registered and verified the account. Provisioning instructions and a secure script will be added in Phase 4.

Never place the Supabase service-role key in a browser variable or commit real secrets. The `.env.example` contains placeholders only.

## Health-data and security caveats

- BMI uses adult thresholds only. Under-18 users receive a clear non-classification message.
- The calculator does not save submitted measurements.
- The login page is a placeholder and does not authenticate anyone yet.
- The initial SQL migration is only the identity/access foundation; the complete schema and policies are pending.
- Do not accept real users or sensitive health histories until authentication, consent, RLS, authorization, deletion, retention, report access, and security tests are implemented and reviewed.
- A successful software test does not prove clinical validity or legal compliance.

## Implementation checklist

- [x] Phase 1: requirements architecture and data boundaries documented
- [x] Phase 2 (foundation only): Next.js project files, responsive landing page, local BMI page
- [x] Phase 3 (foundation only): profile and creator-access migration with initial RLS
- [x] BMI calculation unit tests written
- [ ] Phase 2: finish navigation, reusable form components, and full UI states
- [ ] Phase 3: questionnaire, assessment, report, schedule, and validation schema migrations/RLS
- [ ] Phase 4: email magic-link, GitHub OAuth, LinkedIn OAuth, secure creator provisioning
- [ ] Phases 5–10: profiles/questionnaire, dashboard, assessment engine, private PDFs, schedules, notifications/jobs
- [ ] Phase 11: creator-only validation module and synthetic profile isolation
- [ ] Phase 12: integration/E2E/security/regression tests
- [ ] Phases 13–14: deploy, monitor, backups, final documentation

## License and medical note

Choose a license before public release. The app is educational and is not a substitute for professional medical advice, diagnosis, or treatment.
