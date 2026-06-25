-- Planet Calm Dashboard — Full Schema
-- Soft-delete pattern: deleted_at IS NULL for active records
-- Audit: updated_at auto-set via trigger

-- ============================================================
-- EXTENSIONS
-- ============================================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================
-- ENUMS
-- ============================================================
CREATE TYPE user_role AS ENUM (
  'superadmin','team_member','coach',
  'client_collective','client_studio','client_council','client_wayfinder',
  'org_admin','org_member','affiliate','lead'
);

CREATE TYPE journey_stage AS ENUM (
  'free_subscriber','buyer','member','studio','calm_council','wayfinder','alumni'
);

CREATE TYPE pipeline_stage AS ENUM (
  'new_inquiry','discovery_call_booked','proposal_sent','contract_out','won','lost'
);

CREATE TYPE content_type AS ENUM ('video','pdf','audio','template','link','course');

CREATE TYPE worksheet_field_type AS ENUM ('short_text','long_text','multiple_choice','rating','file_upload');

CREATE TYPE submission_status AS ENUM ('not_started','in_progress','submitted','reviewed');

CREATE TYPE notification_type AS ENUM (
  'new_lead','new_purchase','payment_failed','worksheet_submitted',
  'message_received','cohort_update','ai_sequence_complete',
  'reactivation_alert','stale_deal','system'
);

CREATE TYPE deal_discount_type AS ENUM ('percent','flat');

CREATE TYPE partner_status AS ENUM ('active','lapsed','pending');

CREATE TYPE cohort_type AS ENUM ('barktype','studio_group','council_cohort');

CREATE TYPE cohort_status AS ENUM ('enrolling','active','complete');

CREATE TYPE sequence_status AS ENUM ('draft','active','paused','complete');

CREATE TYPE pipeline_type AS ENUM ('individual','barktype');

-- ============================================================
-- HELPER: auto-update updated_at
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================================
-- PROFILES (extends auth.users)
-- ============================================================
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  first_name TEXT NOT NULL DEFAULT '',
  last_name TEXT NOT NULL DEFAULT '',
  role user_role NOT NULL DEFAULT 'lead',
  avatar_url TEXT,
  phone TEXT,
  dog_name TEXT,
  dog_breed TEXT,
  bark_type_result TEXT,
  journey_stage journey_stage DEFAULT 'free_subscriber',
  tier_badge TEXT,
  assigned_coach_id UUID REFERENCES profiles(id),
  tags TEXT[] DEFAULT '{}',
  custom_fields JSONB DEFAULT '{}',
  last_seen_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

CREATE TRIGGER profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, first_name, last_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
    'lead'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ============================================================
-- CLIENTS
-- ============================================================
CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL DEFAULT '',
  email TEXT UNIQUE NOT NULL,
  tier TEXT DEFAULT 'free',
  ltv NUMERIC(12,2) DEFAULT 0,
  active_subscriptions TEXT[] DEFAULT '{}',
  last_activity_at TIMESTAMPTZ,
  assigned_coach_id UUID REFERENCES profiles(id),
  tags TEXT[] DEFAULT '{}',
  is_silent_buyer BOOLEAN DEFAULT false,
  notes TEXT DEFAULT '',
  source TEXT DEFAULT 'manual',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

CREATE TRIGGER clients_updated_at BEFORE UPDATE ON clients
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- LEADS
-- ============================================================
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL,
  source TEXT DEFAULT 'organic',
  bark_type_result TEXT,
  score INTEGER DEFAULT 0,
  stage TEXT DEFAULT 'new',
  tags TEXT[] DEFAULT '{}',
  assigned_to UUID REFERENCES profiles(id),
  quiz_data JSONB,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

CREATE TRIGGER leads_updated_at BEFORE UPDATE ON leads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- PIPELINE DEALS
-- ============================================================
CREATE TABLE pipeline_deals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  contact_name TEXT NOT NULL,
  contact_email TEXT,
  org_name TEXT,
  offer TEXT NOT NULL,
  deal_value NUMERIC(12,2) DEFAULT 0,
  stage pipeline_stage DEFAULT 'new_inquiry',
  probability INTEGER DEFAULT 10,
  assigned_to UUID REFERENCES profiles(id),
  days_in_stage INTEGER DEFAULT 0,
  last_activity_at TIMESTAMPTZ DEFAULT now(),
  next_action TEXT,
  next_action_due TIMESTAMPTZ,
  notes TEXT DEFAULT '',
  pipeline_type pipeline_type DEFAULT 'individual',
  client_id UUID REFERENCES clients(id),
  lead_id UUID REFERENCES leads(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

CREATE TRIGGER pipeline_deals_updated_at BEFORE UPDATE ON pipeline_deals
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Pipeline events log
CREATE TABLE pipeline_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  deal_id UUID NOT NULL REFERENCES pipeline_deals(id) ON DELETE CASCADE,
  from_stage pipeline_stage,
  to_stage pipeline_stage,
  changed_by UUID REFERENCES profiles(id),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- DEALS (promotions/coupons)
-- ============================================================
CREATE TABLE deals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT DEFAULT '',
  discount_type deal_discount_type DEFAULT 'percent',
  discount_value NUMERIC(10,2) DEFAULT 0,
  applicable_products TEXT[] DEFAULT '{}',
  start_date DATE NOT NULL DEFAULT CURRENT_DATE,
  end_date DATE,
  usage_limit INTEGER,
  redemption_count INTEGER DEFAULT 0,
  stripe_coupon_id TEXT,
  is_affiliate_exclusive BOOLEAN DEFAULT false,
  affiliate_id UUID,
  revenue_attributed NUMERIC(12,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

CREATE TRIGGER deals_updated_at BEFORE UPDATE ON deals
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- PARTNERS (affiliates)
-- ============================================================
CREATE TABLE partners (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES profiles(id),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  awin_id TEXT,
  status partner_status DEFAULT 'pending',
  join_date DATE DEFAULT CURRENT_DATE,
  last_click_date DATE,
  all_time_commissions NUMERIC(12,2) DEFAULT 0,
  ytd_commissions NUMERIC(12,2) DEFAULT 0,
  assigned_offers TEXT[] DEFAULT '{}',
  notes TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

CREATE TRIGGER partners_updated_at BEFORE UPDATE ON partners
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- COHORTS
-- ============================================================
CREATE TABLE cohorts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  type cohort_type DEFAULT 'barktype',
  org_name TEXT,
  org_type TEXT,
  start_date DATE NOT NULL,
  end_date DATE,
  member_count INTEGER DEFAULT 0,
  status cohort_status DEFAULT 'enrolling',
  certification_level TEXT,
  is_pilot BOOLEAN DEFAULT false,
  facilitator_id UUID REFERENCES profiles(id),
  staff_count INTEGER,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

CREATE TRIGGER cohorts_updated_at BEFORE UPDATE ON cohorts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Cohort members
CREATE TABLE cohort_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  cohort_id UUID NOT NULL REFERENCES cohorts(id) ON DELETE CASCADE,
  profile_id UUID REFERENCES profiles(id),
  client_id UUID REFERENCES clients(id),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  completion_pct NUMERIC(5,2) DEFAULT 0,
  joined_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Cohort milestones
CREATE TABLE cohort_milestones (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  cohort_id UUID NOT NULL REFERENCES cohorts(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Milestone completions
CREATE TABLE milestone_completions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  milestone_id UUID NOT NULL REFERENCES cohort_milestones(id) ON DELETE CASCADE,
  member_id UUID NOT NULL REFERENCES cohort_members(id) ON DELETE CASCADE,
  completed_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(milestone_id, member_id)
);

-- Cohort sessions
CREATE TABLE cohort_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  cohort_id UUID NOT NULL REFERENCES cohorts(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  session_date TIMESTAMPTZ NOT NULL,
  zoom_link TEXT,
  facilitator_id UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- CONTENT
-- ============================================================
CREATE TABLE content_collections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT DEFAULT '',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE content_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  type content_type DEFAULT 'link',
  description TEXT DEFAULT '',
  tier_access TEXT[] DEFAULT '{}',
  tags TEXT[] DEFAULT '{}',
  kajabi_url TEXT,
  file_url TEXT,
  collection_id UUID REFERENCES content_collections(id) ON DELETE SET NULL,
  sort_order INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT false,
  publish_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

CREATE TRIGGER content_items_updated_at BEFORE UPDATE ON content_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Content view tracking
CREATE TABLE content_views (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  content_id UUID NOT NULL REFERENCES content_items(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  viewed_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(content_id, user_id)
);

-- ============================================================
-- WORKSHEETS
-- ============================================================
CREATE TABLE worksheet_templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  sections JSONB DEFAULT '[]',
  tier_access TEXT[] DEFAULT '{}',
  certification_level TEXT,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

CREATE TRIGGER worksheet_templates_updated_at BEFORE UPDATE ON worksheet_templates
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TABLE worksheet_assignments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  template_id UUID NOT NULL REFERENCES worksheet_templates(id) ON DELETE CASCADE,
  assigned_to UUID REFERENCES profiles(id),
  cohort_id UUID REFERENCES cohorts(id),
  tier TEXT,
  due_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE worksheet_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  assignment_id UUID NOT NULL REFERENCES worksheet_assignments(id) ON DELETE CASCADE,
  submitted_by UUID NOT NULL REFERENCES profiles(id),
  status submission_status DEFAULT 'not_started',
  draft_data JSONB DEFAULT '{}',
  submitted_data JSONB,
  coach_feedback TEXT,
  reviewed_by UUID REFERENCES profiles(id),
  reviewed_at TIMESTAMPTZ,
  submitted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TRIGGER worksheet_submissions_updated_at BEFORE UPDATE ON worksheet_submissions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- MESSAGING
-- ============================================================
CREATE TABLE message_threads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  participant_ids UUID[] DEFAULT '{}',
  is_broadcast BOOLEAN DEFAULT false,
  subject TEXT,
  last_message_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  thread_id UUID NOT NULL REFERENCES message_threads(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES profiles(id),
  content TEXT NOT NULL,
  attachments TEXT[] DEFAULT '{}',
  is_broadcast BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE message_reads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  message_id UUID NOT NULL REFERENCES messages(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  read_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(message_id, user_id)
);

-- Message templates
CREATE TABLE message_templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  subject TEXT DEFAULT '',
  body TEXT NOT NULL,
  category TEXT DEFAULT 'general',
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- NOTIFICATIONS
-- ============================================================
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  type notification_type DEFAULT 'system',
  title TEXT NOT NULL,
  body TEXT DEFAULT '',
  is_read BOOLEAN DEFAULT false,
  action_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- AI BRAIN
-- ============================================================
CREATE TABLE ai_sequences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  goal TEXT NOT NULL,
  audience_segment TEXT DEFAULT '',
  status sequence_status DEFAULT 'draft',
  emails JSONB DEFAULT '[]',
  tone_guidelines TEXT,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TRIGGER ai_sequences_updated_at BEFORE UPDATE ON ai_sequences
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TABLE ai_drafts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type TEXT DEFAULT 'general',
  brief TEXT NOT NULL,
  output TEXT DEFAULT '',
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE ai_usage_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id),
  model TEXT,
  tokens_in INTEGER DEFAULT 0,
  tokens_out INTEGER DEFAULT 0,
  cost_estimate NUMERIC(10,4) DEFAULT 0,
  output_preview TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- PAYMENTS & FINANCE
-- ============================================================
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES clients(id),
  profile_id UUID REFERENCES profiles(id),
  stripe_payment_id TEXT,
  stripe_customer_id TEXT,
  amount NUMERIC(12,2) NOT NULL,
  currency TEXT DEFAULT 'usd',
  status TEXT DEFAULT 'succeeded',
  offer TEXT,
  description TEXT DEFAULT '',
  payment_date TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES clients(id),
  profile_id UUID REFERENCES profiles(id),
  stripe_subscription_id TEXT,
  offer TEXT NOT NULL,
  status TEXT DEFAULT 'active',
  amount NUMERIC(12,2),
  interval TEXT DEFAULT 'month',
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  canceled_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TRIGGER subscriptions_updated_at BEFORE UPDATE ON subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- CLIENT EVENTS (journey timeline)
-- ============================================================
CREATE TABLE client_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  event_data JSONB DEFAULT '{}',
  source TEXT DEFAULT 'system',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- TASKS
-- ============================================================
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  assigned_to UUID REFERENCES profiles(id),
  due_date TIMESTAMPTZ,
  status TEXT DEFAULT 'pending',
  priority TEXT DEFAULT 'medium',
  related_module TEXT,
  related_id UUID,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  completed_at TIMESTAMPTZ,
  deleted_at TIMESTAMPTZ
);

CREATE TRIGGER tasks_updated_at BEFORE UPDATE ON tasks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- SETTINGS
-- ============================================================
CREATE TABLE settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT UNIQUE NOT NULL,
  value JSONB DEFAULT '{}',
  category TEXT DEFAULT 'general',
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TRIGGER settings_updated_at BEFORE UPDATE ON settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- COMMUNITY (cached from Heartbeat)
-- ============================================================
CREATE TABLE community_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  external_id TEXT,
  author_name TEXT NOT NULL,
  author_email TEXT,
  title TEXT NOT NULL,
  content_preview TEXT DEFAULT '',
  space TEXT DEFAULT 'general',
  reactions_count INTEGER DEFAULT 0,
  replies_count INTEGER DEFAULT 0,
  is_hot BOOLEAN DEFAULT false,
  posted_at TIMESTAMPTZ DEFAULT now(),
  synced_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE community_engagement (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  posts_count INTEGER DEFAULT 0,
  replies_count INTEGER DEFAULT 0,
  reactions_count INTEGER DEFAULT 0,
  engagement_score INTEGER DEFAULT 0,
  last_activity_at TIMESTAMPTZ,
  is_low_engagement BOOLEAN DEFAULT false,
  period_start DATE DEFAULT CURRENT_DATE,
  period_end DATE DEFAULT (CURRENT_DATE + INTERVAL '30 days'),
  synced_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- AUDIT LOG
-- ============================================================
CREATE TABLE audit_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id),
  action TEXT NOT NULL,
  table_name TEXT,
  record_id UUID,
  old_data JSONB,
  new_data JSONB,
  ip_address TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- LAUNCH CAMPAIGN TRACKING
-- ============================================================
CREATE TABLE launch_phases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT DEFAULT '',
  status TEXT DEFAULT 'planning',
  goal_target INTEGER DEFAULT 0,
  goal_current INTEGER DEFAULT 0,
  price_label TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- DEFAULT SETTINGS
-- ============================================================
INSERT INTO settings (key, value, category) VALUES
  ('launch_date', '"2026-09-01"', 'launch'),
  ('launch_campaign_active', 'true', 'launch'),
  ('silent_buyer_threshold_days', '90', 'reactivation'),
  ('lapsed_affiliate_threshold_days', '90', 'partners'),
  ('stale_deal_threshold_days', '14', 'pipeline'),
  ('ai_tone_guidelines', '"Use warm, grounded, dog-centered language. Reflect Calm-First Leadership philosophy. Never aggressive or salesy. BARKType terminology is encouraged."', 'ai'),
  ('book_presale_target', '2000', 'launch'),
  ('book_title', '"What the BARK?"', 'launch');

-- Default launch phases
INSERT INTO launch_phases (name, description, status, goal_target, goal_current, price_label, sort_order) VALUES
  ('Quiz → Decoder Ebook', 'Free quiz funnel to $7 ebook', 'active', 2400, 1728, 'Free → $7', 1),
  ('Substack Nurture', 'Newsletter growth campaign', 'active', 8000, 4320, 'Free series', 2),
  ('Pre-Sale Campaign', 'Book pre-sale orders', 'in_progress', 2000, 348, '$20 book', 3),
  ('AWIN Affiliate Reactivation', 'Re-engage 168 dormant affiliates', 'launching', 120, 34, '168 dormant', 4),
  ('Launch Week Event', 'Speaker series event', 'planning', 500, 40, 'Speaker series', 5);

-- ============================================================
-- RLS POLICIES
-- ============================================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE pipeline_deals ENABLE ROW LEVEL SECURITY;
ALTER TABLE deals ENABLE ROW LEVEL SECURITY;
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE cohorts ENABLE ROW LEVEL SECURITY;
ALTER TABLE cohort_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE worksheet_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE worksheet_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE message_threads ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_sequences ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;

-- Helper function: get current user's role
CREATE OR REPLACE FUNCTION get_user_role()
RETURNS user_role AS $$
  SELECT role FROM profiles WHERE id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- Helper: check if admin-level
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
  SELECT get_user_role() IN ('superadmin', 'team_member');
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- PROFILES: own profile or admin
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (id = auth.uid() OR is_admin());
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (id = auth.uid() OR get_user_role() = 'superadmin');
CREATE POLICY "Admin can insert profiles" ON profiles FOR INSERT WITH CHECK (is_admin() OR id = auth.uid());

-- CLIENTS: admin full, coach assigned, client own
CREATE POLICY "Admin full access clients" ON clients FOR ALL USING (is_admin());
CREATE POLICY "Coach view assigned clients" ON clients FOR SELECT USING (
  get_user_role() = 'coach' AND assigned_coach_id = auth.uid()
);

-- LEADS: admin/team only
CREATE POLICY "Admin full access leads" ON leads FOR ALL USING (is_admin());

-- PIPELINE: admin/team
CREATE POLICY "Admin full access pipeline" ON pipeline_deals FOR ALL USING (is_admin());

-- DEALS: admin/team
CREATE POLICY "Admin full access deals" ON deals FOR ALL USING (is_admin());

-- PARTNERS: admin or own
CREATE POLICY "Admin full access partners" ON partners FOR ALL USING (is_admin());
CREATE POLICY "Affiliate view own" ON partners FOR SELECT USING (
  get_user_role() = 'affiliate' AND profile_id = auth.uid()
);

-- COHORTS: admin, org_admin own org
CREATE POLICY "Admin full access cohorts" ON cohorts FOR ALL USING (is_admin());
CREATE POLICY "Cohort members view" ON cohort_members FOR SELECT USING (
  is_admin() OR profile_id = auth.uid()
);
CREATE POLICY "Admin manage cohort members" ON cohort_members FOR ALL USING (is_admin());

-- CONTENT: admin full, clients tier-gated
CREATE POLICY "Admin full access content" ON content_items FOR ALL USING (is_admin());
CREATE POLICY "Published content for authenticated" ON content_items FOR SELECT USING (
  is_published = true AND deleted_at IS NULL AND (publish_date IS NULL OR publish_date <= now())
);

-- WORKSHEETS
CREATE POLICY "Admin full worksheets" ON worksheet_templates FOR ALL USING (is_admin());
CREATE POLICY "Auth view worksheets" ON worksheet_templates FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Own submissions" ON worksheet_submissions FOR SELECT USING (
  submitted_by = auth.uid() OR is_admin() OR (
    get_user_role() = 'coach' AND reviewed_by = auth.uid()
  )
);
CREATE POLICY "Submit own worksheet" ON worksheet_submissions FOR INSERT WITH CHECK (submitted_by = auth.uid());
CREATE POLICY "Update own submission" ON worksheet_submissions FOR UPDATE USING (
  submitted_by = auth.uid() OR is_admin() OR get_user_role() = 'coach'
);

-- MESSAGES: participants only
CREATE POLICY "View own threads" ON message_threads FOR SELECT USING (
  auth.uid() = ANY(participant_ids) OR is_admin()
);
CREATE POLICY "View own messages" ON messages FOR SELECT USING (
  sender_id = auth.uid() OR is_admin() OR EXISTS (
    SELECT 1 FROM message_threads WHERE id = messages.thread_id AND auth.uid() = ANY(participant_ids)
  )
);
CREATE POLICY "Send messages" ON messages FOR INSERT WITH CHECK (sender_id = auth.uid());
CREATE POLICY "Admin manage threads" ON message_threads FOR ALL USING (is_admin());

-- NOTIFICATIONS: own only
CREATE POLICY "Own notifications" ON notifications FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Mark read" ON notifications FOR UPDATE USING (user_id = auth.uid());
CREATE POLICY "System insert notifications" ON notifications FOR INSERT WITH CHECK (is_admin());

-- AI: admin/team
CREATE POLICY "Admin ai sequences" ON ai_sequences FOR ALL USING (is_admin());

-- PAYMENTS: admin full, client own
CREATE POLICY "Admin full payments" ON payments FOR ALL USING (is_admin());
CREATE POLICY "Client own payments" ON payments FOR SELECT USING (profile_id = auth.uid());

-- TASKS: admin full, assigned own
CREATE POLICY "Admin full tasks" ON tasks FOR ALL USING (is_admin());
CREATE POLICY "Assigned tasks" ON tasks FOR SELECT USING (assigned_to = auth.uid());
CREATE POLICY "Update assigned tasks" ON tasks FOR UPDATE USING (assigned_to = auth.uid() OR is_admin());

-- SETTINGS: admin full, auth read
CREATE POLICY "Admin full settings" ON settings FOR ALL USING (get_user_role() = 'superadmin');
CREATE POLICY "Auth read settings" ON settings FOR SELECT USING (auth.uid() IS NOT NULL);

-- COMMUNITY: auth read
CREATE POLICY "Auth read community" ON community_posts FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Admin manage community" ON community_posts FOR ALL USING (is_admin());

-- AUDIT: superadmin only
CREATE POLICY "Superadmin audit" ON audit_log FOR SELECT USING (get_user_role() = 'superadmin');
CREATE POLICY "System insert audit" ON audit_log FOR INSERT WITH CHECK (true);

-- ============================================================
-- INDEXES
-- ============================================================
CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_profiles_email ON profiles(email);
CREATE INDEX idx_clients_email ON clients(email);
CREATE INDEX idx_clients_tier ON clients(tier);
CREATE INDEX idx_clients_silent ON clients(is_silent_buyer) WHERE is_silent_buyer = true;
CREATE INDEX idx_leads_email ON leads(email);
CREATE INDEX idx_leads_source ON leads(source);
CREATE INDEX idx_leads_score ON leads(score DESC);
CREATE INDEX idx_pipeline_stage ON pipeline_deals(stage);
CREATE INDEX idx_pipeline_type ON pipeline_deals(pipeline_type);
CREATE INDEX idx_partners_status ON partners(status);
CREATE INDEX idx_cohorts_status ON cohorts(status);
CREATE INDEX idx_content_published ON content_items(is_published, publish_date);
CREATE INDEX idx_notifications_user ON notifications(user_id, is_read);
CREATE INDEX idx_messages_thread ON messages(thread_id, created_at);
CREATE INDEX idx_payments_client ON payments(client_id);
CREATE INDEX idx_tasks_assigned ON tasks(assigned_to, status);
CREATE INDEX idx_client_events_client ON client_events(client_id, created_at);
CREATE INDEX idx_audit_log_created ON audit_log(created_at DESC);
