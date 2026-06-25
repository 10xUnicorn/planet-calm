# Environment Variables Needed

These environment variables must be set in Vercel (and .env.local for local dev) before the app is fully functional:

| Variable | Source | Required |
|----------|--------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project → Settings → API | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase project → Settings → API | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase project → Settings → API | Yes |
| `STRIPE_SECRET_KEY` | Stripe Dashboard → API Keys | For payments |
| `RESEND_API_KEY` | Resend Dashboard → API Keys | For emails |

## Setup Steps

1. Create a new Supabase project
2. Run the migration at `supabase/migrations/001_initial_schema.sql`
3. Copy the Supabase URL and keys to the env vars above
4. Add Stripe and Resend keys when ready
5. Redeploy on Vercel after setting env vars
