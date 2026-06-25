# Planet Calm Dashboard — Updates Needed

## CRITICAL

- [ ] **Cohort page Math.random() hydration error** — Progress heatmap uses `Math.random()` during render, causing SSR/client mismatch. Replace with deterministic values.
- [ ] **Remove unused Lucide icon imports** — Sidebar imports 20+ icons but only uses emojis. Dead imports inflate client bundle.

## HIGH — Missing Core Functionality

- [ ] **Connect all pages to Supabase CRUD** — Every dashboard page uses hardcoded demo data. Need real `select/insert/update/delete` calls for: Clients, Leads, Pipeline, Deals, Partners, Cohorts, Content, Worksheets, Messaging, Tasks, Notifications, Settings, Payments, AI Brain, KPIs, Community, Overview.
- [ ] **Wire up all CTA buttons** — "Add Client", "Add Lead", "New Cohort", "Create Deal", "Create Template", "Add Task", "Add Content", "Re-Engage Lapsed", "Export CSV", "Mark all as read", "Review", "Generate Sequence", "Generate Draft", "Run Batch", "Analyze BARKType", "Approve & Activate", "Learn More" — all non-functional.
- [ ] **Messaging send functionality** — Send button has no handler. Thread switching doesn't change messages.
- [ ] **Tasks toggle/complete/delete** — Status icons are not clickable. No inline editing.
- [ ] **Settings save handlers** — All 3 save buttons (General, AI, Launch) have no onSubmit/onClick.
- [ ] **Deals form state management** — "Create Deal" form inputs are uncontrolled with no value/onChange bindings.
- [ ] **Pipeline drag-and-drop** — Kanban board needs `@dnd-kit/core` for stage transitions. Cards not clickable.
- [ ] **Pipeline value calculation** — Regex `replace(/[$,/mo]/g, '')` is fragile; use proper currency parsing.
- [ ] **Client-side role-based access control** — All authenticated users see full admin dashboard. Need role checks per page/module.
- [ ] **Dynamic user data** — Topbar "Welcome back, Stephanie" and avatar "S" are hardcoded. Portal shows hardcoded progress. Need profile fetch.
- [ ] **Server-side auth check in dashboard layout** — Layout should verify user with `supabase-server.ts`, not rely solely on middleware.
- [ ] **No real AI integration** — AI Brain tabs need API routes calling Claude/Anthropic.
- [ ] **No Stripe integration** — Payments page needs real Stripe API calls.

## MEDIUM — UX / Missing Features

- [ ] **No responsive design** — Fixed 240px sidebar, no collapse/hamburger. All grids use fixed columns (`grid-cols-4`, `grid-cols-5`) with no responsive breakpoints.
- [ ] **No pagination** — All tables render every row. Will break with real data volumes.
- [ ] **No empty states** — Tables with 0 filtered results show empty tbody, no "No results" message.
- [ ] **No loading states** — No `loading.tsx` files, no skeleton loaders anywhere.
- [ ] **No error boundaries** — No `error.tsx` files in any route segment.
- [ ] **Notification badges hardcoded** — Sidebar badges (12, 3) and topbar bell (5) are static numbers.
- [ ] **KPIs date range is cosmetic** — Buttons change state but don't filter data.
- [ ] **Community re-engagement CTAs are plain text** — "Send Warm Nudge" etc. are not buttons.
- [ ] **Sidebar copyright says 2025** — Should be 2026 or dynamic.
- [ ] **No confirmation dialogs** — Sign-out button immediately signs out with no confirmation.
- [ ] **No pagination on tables** — Clients, Leads, Partners, Deals all render all rows.
- [ ] **Settings notification toggles don't persist** — Toggle state is lost on navigation.
- [ ] **AI Brain usage log references "GPT-4"** — Should reference the actual model being used.

## LOW — Polish

- [ ] **Sidebar logo fallback uses document.getElementById** — Anti-pattern in React; use state instead.
- [ ] **Massive inline style={{}} usage** — globals.css defines CSS vars that are rarely used in JSX.
- [ ] **Unused imports** — `Filter`, `Download`, `UserPlus` in clients/leads/partners; `Users`, `Key`, `Bell`, `Brain`, `Calendar`, `Shield` in settings.
- [ ] **`date-fns` installed but never used** — Remove from dependencies or start using.
- [ ] **No ARIA labels** — Interactive elements lack accessibility attributes.
- [ ] **No Open Graph metadata** — No OG images, Twitter cards.
- [ ] **Auth pages don't show password requirements** — Register has minLength=8 but no visible hint.
- [ ] **Logo loaded from external Knight Ops Supabase storage** — Should be stored locally or in Planet Calm's own storage.
- [ ] **Inconsistent data patterns** — Some pages import from demo-data.ts, others define data inline.
- [ ] **No .env.example file** — Should document required environment variables.
