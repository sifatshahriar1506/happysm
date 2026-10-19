# happysm architecture (Phase 1)

## Core decisions

- **Web application:** Next.js App Router + TypeScript. UI and server endpoints live in one repository.
- **Styling:** Tailwind CSS with a small set of brand tokens in `app/globals.css`.
- **Identity/data:** Supabase Auth + PostgreSQL. PostgreSQL is authoritative; the browser never supplies a trusted owner ID.
- **Validation:** Zod at request boundaries; TypeScript for internal contracts.
- **Health rules:** Pure, versioned TypeScript modules with unit tests. A passing software test is not clinical validation.
- **PDF/email/jobs:** server-side generation and a durable job mechanism will be added in later phases. Email provider configuration is optional until that phase.
- **Deployment:** Vercel for Next.js and Supabase for auth/database. Provider-specific OAuth and email settings remain deployment configuration, not assumed to work by default.

## Data boundaries

1. Production records are owned by a Supabase Auth user and protected by RLS.
2. Creator access is a separate server-managed grant, never a public registration field.
3. Synthetic test profiles and validation runs will use separate tables and an explicit `is_synthetic`/environment boundary; they will not be selected by ordinary-user queries or production jobs.
4. The creator dashboard will check identity on the server for every page/action/API request. RLS will independently protect validation tables. Hiding a navigation link is not authorization.
5. Service-role credentials must remain server-only. Never use them in client components or `NEXT_PUBLIC_*` variables.

## Creator provisioning model

Create and verify the creator's normal Supabase Auth account first. A trusted operator then inserts that exact auth UUID into `public.creator_access` using the Supabase SQL editor or a protected server-side provisioning command. The account UUID is not guessed from an email. No public signup path can grant creator access. Access can be revoked by deleting the row. Creator authorization must be checked server-side and again at the database boundary for validation data.

## Health safety constraints

- Adult BMI cutoffs are not applied to under-18 users.
- BMI is a screening measure, not a diagnosis.
- Do not infer diabetes, liver disease, cardiovascular disease, or mental-health diagnoses from generic habits.
- Report missing data and uncertainty instead of inventing a score.
- Keep rule source, population, version, exclusions, limitations, and review status with each meaningful rule.
- Specialist comments, guideline consistency, software correctness, and clinical validation are distinct statuses.

## Planned production data model

- `profiles` 1:1 with `auth.users`.
- `health_questionnaire_responses` 1:1 or versioned 1:N with profiles; structured answer JSON only for questionnaire answers, with strict validation and consent metadata.
- `user_conditions` and `family_health_history` N:1 with profiles.
- `health_assessments` N:1 with profiles and a foreign key to `assessment_rule_versions`.
- `health_reports` N:1 with profiles; private object-storage key, profile version, report version, status, generated timestamp.
- `personalized_schedules` 1:N with profiles; `schedule_items` N:1 with schedules.
- `notification_preferences` 1:1 with profiles; `notification_jobs` queued independently with idempotency keys and delivery state.
- `creator_access` maps trusted creator grants to auth users.
- `validation_test_cases` references synthetic profiles only; `validation_runs` references a test case and rule version; `validation_expected_results` stores expected behavior; `specialist_feedback` references a run/case; `validation_audit_events` tracks sensitive creator actions.
- `assessment_rule_versions` stores methodology references, scope, limitations, review status, and immutable version metadata.

## Folder map

See `README.md` for setup and the complete folder map. Implementation will continue in numbered batches; current code is a foundation, not yet a production-ready health platform.
