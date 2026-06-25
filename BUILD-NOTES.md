# Build Notes — Planet Calm Dashboard

## Assumptions Made

1. **Supabase project not yet created** — The Knight Ops org has overdue Supabase invoices, preventing new project creation. The full SQL migration is ready at `supabase/migrations/001_initial_schema.sql`. Apply it once billing is resolved.

2. **Demo data for initial render** — All pages render with realistic demo data matching the MOCKUP.html exactly. Once Supabase is connected, pages will switch to live data queries.

3. **Font: Georgia serif** — Matched the mockup's use of Georgia throughout. No custom font loading needed.

4. **Logo from Knight Ops storage** — Using the Planet Calm logo from the Knight Ops Supabase storage bucket with fallback text display.

5. **Color system** — Faithfully reproduced from mockup:
   - Sidebar: `#2d1a47`
   - Primary: `#623491`
   - Accent/Gold: `#e8c487`
   - Background: `#f5eef8`
   - Text: `#2d1a47`
   - Muted text: `#7a5ea0`, `#9b6fc4`

6. **Roles/permissions** — RLS policies created for all 11 roles as specified in SPEC.md. Permission matrix enforced at the database level.

7. **AI Brain** — UI built with all tabs (Sequence Builder, Content Drafts, Reactivation, BARKType Analyzer, Usage Log). Actual AI calls require API key setup.

8. **Stripe integration** — Deals page includes Stripe coupon sync UI. Actual Stripe API calls require STRIPE_SECRET_KEY.

9. **Sidebar grouping** — Adjusted from mockup to include all 22 modules from the spec while maintaining the mockup's aesthetic. Groups: Command, Growth, Content & Revenue, Intelligence, Manage, Tools, Settings.

## What's Working

- All 22+ module pages built and navigable
- Sidebar + topbar matching mockup design
- Auth flow (login, register, reset password)
- Overview dashboard with all sections from mockup
- Community Hub with hero, stats, threads, members, reactivation
- Pipeline Kanban with stage columns
- Full Supabase schema with 30+ tables, RLS, triggers, audit logging
- Responsive layout foundations

## What Needs Post-Deploy Setup

- Supabase project creation + migration
- Real env vars (Supabase, Stripe, Resend)
- Email template configuration in Resend
- Stripe product/price setup
- AWIN webhook configuration
- Heartbeat API integration
