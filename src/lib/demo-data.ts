// Demo/seed data used when Supabase is not yet connected
// This allows the dashboard to render with realistic data matching the mockup

export const kpiData = {
  totalRevenue: { value: '$127,840', trend: '\u2191 18.4% vs prior year', sub: 'Stripe + Shopify combined', up: true },
  communityMembers: { value: '1,247', trend: '\u2191 94 this month', sub: 'Heartbeat + Substack + Kajabi', up: true },
  bookPreSales: { value: '348', trend: '\u2191 62 since last week', sub: 'Sept 2026 launch target: 2,000', up: true },
  barktypePipeline: { value: '$84K', trend: '5 orgs in active cert talks', sub: 'Best Friends pilot: stage 3', up: false },
}

export const communityPulse = {
  collectiveCount: 842,
  studioCount: 405,
  threads: [
    { title: 'My rescue GSD finally walked calmly past another dog!', author: '@MarisolV', reactions: 47, space: 'Peaceful Paws Collective', hot: true },
    { title: 'BARKType quiz unlocked something in me \u2014 week 3 update', author: '@TrevorK', reactions: 31, space: 'Progress Studio', hot: false },
    { title: 'Anyone else reading the early chapter drops from Stephanie?', author: '@LinnaeR', reactions: 28, space: 'Book Pre-Sale Circle', hot: false },
    { title: 'Calm Council office hours recap \u2014 my biggest takeaway', author: '@DrPeterW', reactions: 19, space: 'Calm Council', hot: false },
  ],
}

export const bookLaunchPhases = [
  { name: 'Quiz \u2192 Decoder Ebook', price: 'Free \u2192 $7', status: 'Live', statusClass: 'pill-green', goal: '2,400 leads', progress: 72 },
  { name: 'Substack Nurture', price: 'Free series', status: 'Active', statusClass: 'pill-green', goal: '8,000 subs', progress: 54 },
  { name: 'Pre-Sale Campaign', price: '$20 book', status: 'In Progress', statusClass: 'pill-amber', goal: '2,000 orders', progress: 17 },
  { name: 'AWIN Affiliate Reactivation', price: '168 dormant', status: 'Launching', statusClass: 'pill-amber', goal: '120 active', progress: 28 },
  { name: 'Launch Week Event', price: 'Speaker series', status: 'Planning', statusClass: 'pill-purple', goal: '500 attendees', progress: 8 },
]

export const silentBuyerData = {
  identified: 548,
  reEngaged: 127,
  converted: 43,
  segments: [
    { segment: 'Decoder Buyers (past)', source: 'Shopify/GHL', via: 'Resend sequence', status: 'In Flow', statusClass: 'pill-amber' },
    { segment: 'Free Quiz Completers', source: 'GHL funnel', via: 'Community invite', status: 'Active', statusClass: 'pill-green' },
    { segment: 'Chew Sub Lapsed', source: 'Shopify', via: 'Win-back offer', status: 'Queued', statusClass: 'pill-amber' },
    { segment: 'AWIN Dormant Affiliates', source: 'AWIN', via: 'Partner briefing', status: 'Draft', statusClass: 'pill-purple' },
  ],
}

export const aiInsights = [
  {
    icon: 'paw',
    title: 'Community Momentum Alert',
    text: "Members who post within 7 days of joining retain at 3.2\u00d7 the rate. 38 new members haven't posted yet \u2014 send a warm nudge from Stephanie.",
    bg: 'linear-gradient(135deg,#f9f5fe,#ede4f5)',
    border: '#623491',
    textColor: '#623491',
  },
  {
    icon: 'book',
    title: 'Pre-Sale Momentum Window',
    text: 'Your Substack open rate is 52%. An exclusive early-reader chapter drop to top-engaged subscribers could push pre-sales +80 units this week.',
    bg: 'linear-gradient(135deg,#fdf8ec,#fdf0d0)',
    border: '#e8c487',
    textColor: '#9a6800',
  },
  {
    icon: 'sparkles',
    title: 'BARKType Opportunity',
    text: 'Best Friends Animal Society pilot ready to sign. 2 additional shelter orgs showing high-intent behavior. Total cert pipeline value: $84K.',
    bg: 'linear-gradient(135deg,#e8f5ee,#d4f0e2)',
    border: '#2a9d5c',
    textColor: '#1e7d47',
  },
  {
    icon: 'alert',
    title: 'Churn Risk \u2014 14 Progress Studio',
    text: "14 Peaceful Progress Studio members haven't logged in for 21+ days. Proactive 1:1 check-in recommended before next billing cycle.",
    bg: 'linear-gradient(135deg,#fde8e8,#fcd4d4)',
    border: '#c0392b',
    textColor: '#c0392b',
  },
]

export const revenueByOffer = [
  { offer: 'Calm Council ($6K/yr)', revenue: '$18,000', trend: '\u2191 stable' },
  { offer: 'Wayfinder Exp. ($25K)', revenue: '$50,000', trend: '2 sold YTD' },
  { offer: 'Progress Studio ($275/mo)', revenue: '$11,138', trend: '\u2191 8%' },
  { offer: 'BARKType Cert ($3\u20135K)', revenue: '$24,000', trend: 'Pipeline' },
  { offer: 'Peaceful Paws ($49/mo)', revenue: '$6,258', trend: '\u2191 12%' },
  { offer: 'Chew Sub + Ebook + Book', revenue: '$18,444', trend: '\u2191 seasonal' },
]

export const integrations = [
  { name: 'GHL (Funnels x2)', status: 'Connected', statusClass: 'pill-green' },
  { name: 'Shopify (Chew Sub)', status: 'Connected', statusClass: 'pill-green' },
  { name: 'Heartbeat (Community)', status: 'Connected', statusClass: 'pill-green' },
  { name: 'Substack (Newsletter)', status: 'Connected', statusClass: 'pill-green' },
  { name: 'AWIN (Affiliates)', status: 'Partial', statusClass: 'pill-amber' },
  { name: 'Stripe + Kajabi', status: 'Connected', statusClass: 'pill-green' },
  { name: 'Resend + Webhooks', status: 'Connected', statusClass: 'pill-green' },
]

export const pipelineDeals = [
  // new_inquiry
  { id: '1', name: 'Sarah Mitchell', offer: 'Peaceful Progress Studio', value: '$275/mo', stage: 'new_inquiry' },
  { id: '2', name: 'Portland Humane', offer: 'BARKType Certification', value: '$4,500', stage: 'new_inquiry' },
  // discovery
  { id: '3', name: 'Dr. James Ortiz', offer: 'Calm Council', value: '$6,000', stage: 'discovery_call_booked' },
  { id: '4', name: 'Austin Animal Center', offer: 'BARKType Pilot', value: '$3,200', stage: 'discovery_call_booked' },
  // proposal
  { id: '5', name: 'Best Friends Animal Society', offer: 'BARKType Full Cert', value: '$25,000', stage: 'proposal_sent' },
  { id: '6', name: 'Lena Vasquez', offer: 'Wayfinder Experience', value: '$25,000', stage: 'proposal_sent' },
  // contract
  { id: '7', name: 'Denver Dumb Friends League', offer: 'BARKType Foundations', value: '$3,500', stage: 'contract_out' },
  // won
  { id: '8', name: 'Rachel Nguyen', offer: 'Calm Council (Founding)', value: '$6,000', stage: 'won' },
  { id: '9', name: 'SF SPCA', offer: 'BARKType Pilot', value: '$5,000', stage: 'won' },
]

export const demoLeads = [
  { id: '1', name: 'Emma Whitfield', email: 'emma@example.com', source: 'Quiz', barkType: 'The Structured Guardian', score: 85, stage: 'Qualified' },
  { id: '2', name: 'Marcus Chen', email: 'marcus@example.com', source: 'Substack', barkType: null, score: 42, stage: 'New' },
  { id: '3', name: 'Priya Sharma', email: 'priya@example.com', source: 'Ad (Meta)', barkType: 'The Empathic Explorer', score: 71, stage: 'Nurturing' },
  { id: '4', name: 'Jake Morrison', email: 'jake@example.com', source: 'Affiliate', barkType: 'The Calm Anchor', score: 63, stage: 'Engaged' },
  { id: '5', name: 'Aisha Johnson', email: 'aisha@example.com', source: 'Event', barkType: null, score: 38, stage: 'New' },
  { id: '6', name: 'Tom Bradshaw', email: 'tom@example.com', source: 'Organic', barkType: 'The Playful Catalyst', score: 55, stage: 'Qualified' },
  { id: '7', name: 'Lily Tran', email: 'lily@example.com', source: 'Quiz', barkType: 'The Steady Shepherd', score: 92, stage: 'Hot Lead' },
  { id: '8', name: 'Carlos Reyes', email: 'carlos@example.com', source: 'Substack', barkType: null, score: 29, stage: 'New' },
]

export const demoClients = [
  { id: '1', name: 'Marisol Vega', email: 'marisol@example.com', tier: 'Collective', ltv: 588, coach: 'Stephanie', lastActivity: '2 hours ago', tags: ['active', 'dog-parent'] },
  { id: '2', name: 'Trevor Kim', email: 'trevor@example.com', tier: 'Studio', ltv: 2750, coach: 'Coach Jen', lastActivity: '1 day ago', tags: ['active', 'professional'] },
  { id: '3', name: 'Dr. Peter Wang', email: 'peter@example.com', tier: 'Council', ltv: 6000, coach: 'Stephanie', lastActivity: '3 hours ago', tags: ['vip', 'speaking'] },
  { id: '4', name: 'Rachel Nguyen', email: 'rachel@example.com', tier: 'Council', ltv: 6000, coach: 'Stephanie', lastActivity: '1 day ago', tags: ['founding-member'] },
  { id: '5', name: 'Linnae Reed', email: 'linnae@example.com', tier: 'Collective', ltv: 294, coach: 'Coach Jen', lastActivity: '5 hours ago', tags: ['book-fan'] },
  { id: '6', name: 'David Torres', email: 'david@example.com', tier: 'Studio', ltv: 1375, coach: 'Coach Ari', lastActivity: '3 days ago', tags: ['silent-buyer'] },
  { id: '7', name: 'Sandra Flynn', email: 'sandra@example.com', tier: 'Wayfinder', ltv: 25000, coach: 'Stephanie', lastActivity: '6 hours ago', tags: ['vip', 'wayfinder-alumni'] },
  { id: '8', name: 'Mike Patel', email: 'mike@example.com', tier: 'Collective', ltv: 147, coach: null, lastActivity: '45 days ago', tags: ['silent-buyer', 'chew-sub'] },
]

export const demoPartners = [
  { id: '1', name: 'Jessica Bloom', email: 'jessica@example.com', awinId: 'AW-4821', status: 'active' as const, lastClick: '2 days ago', allTime: 3240, ytd: 1580 },
  { id: '2', name: 'Mark Sullivan', email: 'mark@example.com', awinId: 'AW-3192', status: 'active' as const, lastClick: '1 week ago', allTime: 5100, ytd: 2400 },
  { id: '3', name: 'Andrea Lopez', email: 'andrea@example.com', awinId: 'AW-7744', status: 'lapsed' as const, lastClick: '142 days ago', allTime: 890, ytd: 0 },
  { id: '4', name: 'Chris Wei', email: 'chris@example.com', awinId: 'AW-5567', status: 'active' as const, lastClick: '3 days ago', allTime: 4680, ytd: 1920 },
  { id: '5', name: 'Dana Richards', email: 'dana@example.com', awinId: 'AW-8833', status: 'lapsed' as const, lastClick: '198 days ago', allTime: 420, ytd: 0 },
  { id: '6', name: 'Sam Nguyen', email: 'sam@example.com', awinId: 'AW-2105', status: 'pending' as const, lastClick: null, allTime: 0, ytd: 0 },
]

export const demoCohorts = [
  { id: '1', name: 'BARKType Foundations \u2014 Best Friends Pilot', type: 'BARKType', org: 'Best Friends Animal Society', start: '2026-07-15', members: 12, status: 'enrolling', level: 'Foundations', isPilot: true },
  { id: '2', name: 'BARKType Practitioner \u2014 SF SPCA', type: 'BARKType', org: 'SF SPCA', start: '2026-06-01', members: 8, status: 'active', level: 'Practitioner', isPilot: false },
  { id: '3', name: 'Peaceful Progress Studio \u2014 Summer 2026', type: 'Studio Group', org: null, start: '2026-06-15', members: 18, status: 'active', level: null, isPilot: false },
  { id: '4', name: 'Calm Council \u2014 Q3 Cohort', type: 'Council', org: null, start: '2026-07-01', members: 6, status: 'enrolling', level: null, isPilot: false },
]

export const demoContent = [
  { id: '1', title: 'BARKType Foundations \u2014 Module 1: Understanding Your Dog', type: 'course', tier: ['client_studio', 'client_council', 'org_member'], collection: 'BARKType Foundations', published: true },
  { id: '2', title: 'Calm-First Morning Routine (Video)', type: 'video', tier: ['client_collective', 'client_studio', 'client_council'], collection: 'Calm-First Essentials', published: true },
  { id: '3', title: 'What the BARK? \u2014 Chapter 1 Preview', type: 'pdf', tier: ['client_collective', 'client_studio', 'client_council', 'client_wayfinder'], collection: 'Book Launch Prep', published: true },
  { id: '4', title: 'Dog Decoder Ebook', type: 'pdf', tier: ['client_collective', 'client_studio', 'client_council'], collection: 'Entry Products', published: true },
  { id: '5', title: 'Weekly Calm Check-In Template', type: 'template', tier: ['client_studio', 'client_council'], collection: 'Worksheets & Templates', published: true },
  { id: '6', title: 'Council VIP: Exclusive Stephanie Q&A Recording', type: 'video', tier: ['client_council'], collection: 'Council Exclusives', published: true },
]
