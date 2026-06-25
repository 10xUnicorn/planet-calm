export type UserRole =
  | 'superadmin'
  | 'team_member'
  | 'coach'
  | 'client_collective'
  | 'client_studio'
  | 'client_council'
  | 'client_wayfinder'
  | 'org_admin'
  | 'org_member'
  | 'affiliate'
  | 'lead'

export type JourneyStage =
  | 'free_subscriber'
  | 'buyer'
  | 'member'
  | 'studio'
  | 'calm_council'
  | 'wayfinder'
  | 'alumni'

export type PipelineStage =
  | 'new_inquiry'
  | 'discovery_call_booked'
  | 'proposal_sent'
  | 'contract_out'
  | 'won'
  | 'lost'

export type ContentType = 'video' | 'pdf' | 'audio' | 'template' | 'link' | 'course'

export type WorksheetFieldType = 'short_text' | 'long_text' | 'multiple_choice' | 'rating' | 'file_upload'

export type SubmissionStatus = 'not_started' | 'in_progress' | 'submitted' | 'reviewed'

export type NotificationType =
  | 'new_lead'
  | 'new_purchase'
  | 'payment_failed'
  | 'worksheet_submitted'
  | 'message_received'
  | 'cohort_update'
  | 'ai_sequence_complete'
  | 'reactivation_alert'
  | 'stale_deal'
  | 'system'

export interface Profile {
  id: string
  email: string
  first_name: string
  last_name: string
  role: UserRole
  avatar_url?: string
  phone?: string
  dog_name?: string
  dog_breed?: string
  bark_type_result?: string
  journey_stage?: JourneyStage
  tier_badge?: string
  assigned_coach_id?: string
  tags?: string[]
  custom_fields?: Record<string, unknown>
  last_seen_at?: string
  is_active: boolean
  created_at: string
  updated_at: string
  deleted_at?: string
}

export interface Lead {
  id: string
  first_name: string
  last_name: string
  email: string
  source: string
  bark_type_result?: string
  score: number
  stage: string
  tags?: string[]
  assigned_to?: string
  created_at: string
  updated_at: string
  deleted_at?: string
}

export interface PipelineDeal {
  id: string
  contact_name: string
  org_name?: string
  offer: string
  deal_value: number
  stage: PipelineStage
  probability: number
  assigned_to?: string
  days_in_stage: number
  last_activity_at: string
  next_action?: string
  next_action_due?: string
  notes?: string
  pipeline_type: 'individual' | 'barktype'
  created_at: string
  updated_at: string
  deleted_at?: string
}

export interface Client {
  id: string
  profile_id: string
  first_name: string
  last_name: string
  email: string
  tier: string
  ltv: number
  active_subscriptions?: string[]
  last_activity_at?: string
  assigned_coach_id?: string
  tags?: string[]
  is_silent_buyer: boolean
  created_at: string
  updated_at: string
}

export interface ContentItem {
  id: string
  title: string
  type: ContentType
  description?: string
  tier_access: string[]
  tags?: string[]
  kajabi_url?: string
  file_url?: string
  collection_id?: string
  sort_order: number
  is_published: boolean
  publish_date?: string
  created_at: string
  updated_at: string
}

export interface Message {
  id: string
  sender_id: string
  recipient_id?: string
  thread_id: string
  content: string
  is_broadcast: boolean
  attachments?: string[]
  is_read: boolean
  created_at: string
}

export interface Notification {
  id: string
  user_id: string
  type: NotificationType
  title: string
  body: string
  is_read: boolean
  action_url?: string
  created_at: string
}

export interface Partner {
  id: string
  name: string
  email: string
  awin_id?: string
  status: 'active' | 'lapsed' | 'pending'
  join_date: string
  last_click_date?: string
  all_time_commissions: number
  ytd_commissions: number
  assigned_offers?: string[]
  created_at: string
  updated_at: string
}

export interface Cohort {
  id: string
  name: string
  type: 'barktype' | 'studio_group' | 'council_cohort'
  org_name?: string
  org_type?: string
  start_date: string
  end_date?: string
  member_count: number
  status: 'enrolling' | 'active' | 'complete'
  certification_level?: string
  is_pilot: boolean
  created_at: string
  updated_at: string
}

export interface Deal {
  id: string
  name: string
  description?: string
  discount_type: 'percent' | 'flat'
  discount_value: number
  applicable_products?: string[]
  start_date: string
  end_date?: string
  usage_limit?: number
  redemption_count: number
  stripe_coupon_id?: string
  is_affiliate_exclusive: boolean
  affiliate_id?: string
  created_at: string
  updated_at: string
}

export interface AISequence {
  id: string
  goal: string
  audience_segment: string
  status: 'draft' | 'active' | 'paused' | 'complete'
  emails: Array<{
    subject: string
    body: string
    delay_days: number
    variant?: string
  }>
  created_by: string
  created_at: string
  updated_at: string
}

export interface Setting {
  id: string
  key: string
  value: unknown
  category: string
  updated_at: string
}
