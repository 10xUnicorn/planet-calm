# Planet Calm — Build Handoff

**Last Updated:** 2026-07-01
**Live URL:** https://planet-calm.vercel.app
**Repo:** https://github.com/10xUnicorn/planet-calm
**Supabase:** zicxhbevthpdqhnicjkh (planet-calm, us-east-1, Knight Ops org)
**Vercel:** daniel-8142s-projects/planet-calm
**Knight Ops Build ID:** 245fc5e2-db73-4a48-bd1c-d52e175617a1

> **📚 SOURCE OF TRUTH — Heartbeat KB:** `Knight Ops/Planet Calm KB/` in the Obsidian vault. Live Heartbeat community fully cataloged 2026-07-01 (6 sections, 7 channels, 4 courses, 3 recurring events, member/matching fields). See `Heartbeat-vs-Dashboard-Gap-Analysis.md` for the prioritized build backlog.

## Changelog
- **2026-07-01:** Fixed sidebar scroll bug (`.sidebar-nav` bounded to `height:100vh` + `.sidebar-scroll` child with `min-height:0`). Bottom nav items (AI Brain, Reports & KPIs, My Account, Settings) are now reachable. Built Heartbeat KB in Obsidian vault.
- **2026-07-01 (feed upgrade):** Community feed now a real community. New `src/lib/community.ts` (upload/GIF/mentions helpers) + `src/components/Composer.tsx` (rich composer). Feed supports: image+video upload (Supabase Storage bucket `community-media`, public, 50MB, RLS), GIF library (Giphy), @mention autocomplete (members + channels), nested sub-comments (2 levels), video/GIF rendering, mention highlighting. Seeded the 7 real Heartbeat channels into `community_spaces` (Peaceful Paws + Progress Studio gated `visibility='paid'`); archived the 5 demo spaces. `next.config.ts` now sets `eslint.ignoreDuringBuilds:true` (tsc still enforced, passes clean). **New env (optional):** `NEXT_PUBLIC_GIPHY_API_KEY` — GIFs work now on Giphy's public docs key; add a free production key from developers.giphy.com for rate limits.

---

## Stack

- **Web App:** Next.js 16 (App Router) + Tailwind CSS
- **Database:** Supabase (PostgreSQL 17, 58 tables, full RLS)
- **Auth:** Supabase Auth (email/password, auto-profile trigger)
- **Hosting:** Vercel (production)
- **Planned Mobile:** Expo (React Native) — not yet started

## Auth

- **Test User:** dknightunicorn+planetcalm@gmail.com / PlanetCalm2026! (superadmin)
- **Supabase Auth URL Config:** Site URL must be set to https://planet-calm.vercel.app in Supabase Dashboard → Auth → URL Configuration
- Profile auto-created via `handle_new_user()` trigger on `auth.users` insert
- Middleware at `src/middleware.ts` redirects unauthenticated users to `/login`

## Design System

- **Font:** Georgia, serif (forced via globals.css `!important` to override Tailwind preflight)
- **Sidebar:** #2d1a47 (deep purple)
- **Primary:** #623491, Light: #9b6fc4
- **Accent Gold:** #e8c487
- **Background:** #f5eef8
- **Emojis in nav** — approved mockup uses emojis, not SVG icons
- **Card borders:** `rgba(98,52,145,0.1)` — these ARE the intended subtle borders from the approved mockup
- **Key CSS issue:** Tailwind preflight strips base styles. The globals.css has explicit overrides with `!important` for body font, table styling, input focus, etc. New pages should use the CSS classes defined in globals.css (`.card`, `.kpi-card`, `.form-input`, `.page-tab`, `.btn-primary`, `.btn-secondary`, `.pill`, `.tag`, `.ai-chip`, `.search-bar`) or inline styles for visual properties.
- **Layout:** Dashboard layout uses inline `style={{ marginLeft: 240, paddingTop: 62 }}` to avoid Tailwind override. Mobile responsive via CSS media queries in globals.css.

## What's Built (33 routes)

### Admin Dashboard Pages
| Route | Status | Data Source |
|-------|--------|-------------|
| `/overview` | Demo data | Hardcoded (needs Supabase wiring) |
| `/community` | Demo data | Original overview-style community page |
| `/community/feed` | **Live CRUD** | `community_posts`, `community_reactions`, `community_spaces` |
| `/community/members` | **Live CRUD** | `profiles` + `community_profiles` |
| `/pipeline` | Demo data | Kanban board |
| `/portal` | Demo data | Offer cards |
| `/content` | Demo data | Content library grid |
| `/payments` | Demo data | Revenue tables |
| `/ai-brain` | Demo data | Sequence builder UI |
| `/kpis` | Demo data | KPI cards |
| `/clients` | Demo data | Client table |
| `/cohort` | Demo data | Cohort cards |
| `/leads` | Demo data | Lead table with scoring |
| `/partners` | Demo data | Affiliate table |
| `/deals` | Demo data | Deal/coupon table |
| `/messaging` | Demo data (local state) | Thread switching + send works in-memory |
| `/worksheets` | Demo data | Template + review queue |
| `/tasks` | Demo data (local state) | Status toggle works in-memory |
| `/notifications` | Demo data (local state) | Mark read works in-memory |
| `/settings` | Demo data | All 6 tabs rendered |
| `/reports` | Redirect → /kpis | — |

### New Community + LMS Pages
| Route | Status | Data Source |
|-------|--------|-------------|
| `/community/feed` | **Live CRUD** | Real Supabase: posts, reactions, threading, space tabs |
| `/community/members` | **Live CRUD** | Real Supabase: profiles + community_profiles |
| `/pets` | **Live CRUD** | Real Supabase: pet_profiles (add/edit/delete) |
| `/events` | **Live CRUD** | Real Supabase: event_rsvps (Going/Maybe/Can't Go) |
| `/courses` | **Live CRUD** | Real Supabase: courses (create/delete), enrollments, certificates |
| `/courses/[slug]` | **Live CRUD** | Real Supabase: modules, lessons, lesson_progress |
| `/resources` | **Live CRUD** | Real Supabase: courses + enrollments + certificates (tabbed) |

### Auth Pages
| Route | Status |
|-------|--------|
| `/login` | Working (Supabase auth) |
| `/register` | Working (Supabase auth) |
| `/reset-password` | Working (Supabase auth) |

### Components
| Component | Description |
|-----------|-------------|
| `Sidebar.tsx` | Responsive sidebar with hamburger on mobile, emoji nav icons, badges |
| `Topbar.tsx` | Dynamic user name from auth, hamburger toggle for mobile |
| `LeonaChat.tsx` | Floating AI chat widget on every page, persists to `leona_conversations` |

## Database Schema (58 tables)

### Original Dashboard (35 tables)
profiles, clients, leads, pipeline_deals, pipeline_events, deals, partners, cohorts, cohort_members, cohort_milestones, milestone_completions, cohort_sessions, content_collections, content_items, content_views, worksheet_templates, worksheet_assignments, worksheet_submissions, message_threads, messages, message_reads, message_templates, notifications, ai_sequences, ai_drafts, ai_usage_log, payments, subscriptions, client_events, tasks, settings, audit_log, launch_phases

### Community Module (11 tables)
community_profiles, community_spaces, community_posts, community_reactions, pet_profiles, pet_media, event_rsvps, moderation_reports, leaderboard_points, badges, user_badges

### Courses/LMS (12 tables)
courses, course_modules, course_lessons, lesson_resources, quizzes, quiz_questions, quiz_attempts, course_surveys, survey_responses, enrollments, lesson_progress, assignment_submissions, certificates, leona_conversations

### Seed Data
- 5 community spaces (Calm Wins, Puppy Diaries, Book Club, Professional Corner, Wayfinder Alumni)
- 6 badges (First Post, Calm Anchor, BARKType Certified, Helpful Paw, Community Champion, Book Worm)
- 3 courses (BARKType Foundations, Calm-First Morning Routine, Book Companion)
- 8 default settings (launch date, thresholds, AI tone, etc.)
- 5 launch phases with progress data

## What Still Needs To Be Done

### HIGH PRIORITY — Wire Remaining Pages to Supabase
- [ ] Overview page: Replace demo data imports with real Supabase queries
- [ ] Clients page: Real CRUD (create/edit/delete clients, search, filter)
- [ ] Leads page: Real CRUD with lead scoring
- [ ] Pipeline page: Real CRUD with drag-and-drop stage changes
- [ ] Payments page: Wire to Stripe API for real transaction data
- [ ] Partners page: Real CRUD for affiliate management
- [ ] Deals page: Wire "Create & Sync to Stripe" to Stripe coupon API
- [ ] Messaging page: Wire to `messages` + `message_threads` tables with Supabase Realtime
- [ ] Tasks page: Wire to `tasks` table
- [ ] Notifications page: Wire to `notifications` table
- [ ] Settings page: Wire save buttons to `settings` table
- [ ] Worksheets page: Wire to `worksheet_templates` + `worksheet_submissions`
- [ ] Cohort page: Wire to `cohorts` + `cohort_members`
- [ ] Content page: Wire to `content_items` + `content_collections`
- [ ] AI Brain page: Wire to `ai_sequences` + `ai_drafts` + actual AI API calls

### HIGH PRIORITY — Courses/LMS Completion
- [ ] Course Builder: Admin editor for modules/lessons/content blocks (drag-to-reorder)
- [ ] Quiz Builder: Create/edit quizzes with question types (MC, T/F, multi-select, short answer)
- [ ] Quiz Player: Take quiz inline, auto-grade, show results
- [ ] Survey Builder: Create surveys attached to lessons/courses
- [ ] Assignment Review: Admin inbox for file submissions
- [ ] Certificate Generation: PDF generation via `pdf-lib` or `@react-pdf/renderer`
- [ ] Drip Release: Enforce drip rules (time-based, prerequisite-based) on lesson access
- [ ] Enrollment Management: Admin bulk enroll/unenroll

### MEDIUM PRIORITY — Community Enhancements
- [ ] Post media uploads (photos/videos to Supabase Storage)
- [ ] Poll posts (create poll, vote, show results)
- [ ] Mention autocomplete (@username)
- [ ] Pet photo uploads to Supabase Storage
- [ ] Pet Map with Leaflet/OpenStreetMap
- [ ] Leona AI: Wire to real AI API (Claude/Anthropic) instead of placeholder responses
- [ ] Moderation tools: Report → review → action flow
- [ ] Leaderboard page with rankings and badge display

### MEDIUM PRIORITY — Integrations
- [ ] Stripe webhooks: Payment → auto-enroll in course
- [ ] Resend emails: Enrollment confirmation, drip unlock, certificate, assignment review
- [ ] Real-time: Supabase Realtime subscriptions for feed, messaging, notifications

### LOWER PRIORITY — Polish
- [ ] Responsive grids on all pages (4-col → 2-col → 1-col)
- [ ] Loading skeletons / states on all pages
- [ ] Error boundaries (`error.tsx` files)
- [ ] Empty states with Planet Calm voice
- [ ] Supabase Realtime for live updates (feed, messages, notifications)
- [ ] Role-based nav (show different nav items per user role)
- [ ] Client portal vs admin dashboard view switching
- [ ] PWA manifest + service worker for installability

### FUTURE — Mobile App
- [ ] Expo (React Native) project setup
- [ ] Shared Supabase client library
- [ ] Community feed in React Native
- [ ] Push notifications via expo-notifications
- [ ] Pet Map with react-native-maps
- [ ] App Store / Google Play deployment via EAS Build

## Key Files

| File | Purpose |
|------|---------|
| `src/app/(dashboard)/layout.tsx` | Dashboard shell (sidebar + topbar + main) |
| `src/components/Sidebar.tsx` | Navigation sidebar (responsive) |
| `src/components/Topbar.tsx` | Top bar (responsive) |
| `src/components/LeonaChat.tsx` | Floating AI chat widget |
| `src/lib/supabase-browser.ts` | Client-side Supabase client |
| `src/lib/supabase-server.ts` | Server-side Supabase client |
| `src/lib/supabase-middleware.ts` | Middleware auth helper |
| `src/lib/access.ts` | `canAccess()` tier-based feature gating |
| `src/lib/types.ts` | TypeScript type definitions |
| `src/lib/demo-data.ts` | Demo/seed data for pages not yet wired |
| `src/app/globals.css` | Global styles, Tailwind overrides, responsive |
| `supabase/migrations/001_initial_schema.sql` | Original 35-table migration |
| `REDESIGN-MOCKUP.html` | Approved desktop mockup |
| `mockups/PLATFORM-MOCKUPS.html` | Full platform mockups (desktop + mobile + all modules) |
| `BUILD-UPDATES.md` | Audit findings and improvement list |
| `BUILD-NOTES.md` | Build assumptions and notes |
| `ENV-NEEDED.md` | Required environment variables |

## Environment Variables (Vercel)

| Variable | Set? |
|----------|------|
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ Production |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ Production |
| `STRIPE_SECRET_KEY` | ❌ Placeholder |
| `RESEND_API_KEY` | ❌ Placeholder |
