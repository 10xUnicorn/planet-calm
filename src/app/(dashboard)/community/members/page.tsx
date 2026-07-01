'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase-browser'

/* ── Types ── */
interface Member {
  id: string
  first_name: string
  last_name: string
  role: string
  avatar_url: string | null
  community_profile: {
    headline: string | null
    location: string | null
    bio: string | null
  } | null
}

/* ── Tier badge config ── */
const TIER_CONFIG: Record<string, { bg: string; color: string; label: string }> = {
  client_collective: { bg: '#ede4f5', color: '#623491', label: 'Collective' },
  client_studio: { bg: '#e8f5ee', color: '#1e7d47', label: 'Studio' },
  client_council: { bg: 'linear-gradient(135deg,#fdf0d0,#f5e0a0)', color: '#7a5500', label: 'Council' },
  client_wayfinder: { bg: 'linear-gradient(135deg,#2d1a47,#623491)', color: '#e8c487', label: 'Wayfinder' },
  coach: { bg: '#e4edf5', color: '#1a5a8a', label: 'Coach' },
  team_member: { bg: '#2d1a47', color: '#e8c487', label: 'Team' },
  superadmin: { bg: '#2d1a47', color: '#e8c487', label: 'Admin' },
}

const TIER_FILTERS = [
  { value: 'all', label: 'All Members' },
  { value: 'client_collective', label: 'Collective' },
  { value: 'client_studio', label: 'Studio' },
  { value: 'client_council', label: 'Council' },
  { value: 'client_wayfinder', label: 'Wayfinder' },
  { value: 'coach', label: 'Coaches' },
  { value: 'team_member', label: 'Team' },
]

/* ── Avatar (initials) ── */
function Avatar({ firstName, lastName }: { firstName: string; lastName: string }) {
  const initials = `${(firstName || '?')[0]}${(lastName || '?')[0]}`.toUpperCase()
  // Generate a consistent color from name
  const hash = (firstName + lastName).split('').reduce((a, c) => a + c.charCodeAt(0), 0)
  const gradients = [
    'linear-gradient(135deg,#623491,#9b6fc4)',
    'linear-gradient(135deg,#2a9d5c,#52c880)',
    'linear-gradient(135deg,#1a5a8a,#3a8ac4)',
    'linear-gradient(135deg,#9a6800,#d4a017)',
    'linear-gradient(135deg,#c0392b,#e05a50)',
  ]
  return (
    <div style={{
      width: 48,
      height: 48,
      borderRadius: '50%',
      background: gradients[hash % gradients.length],
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 17,
      fontWeight: 700,
      fontFamily: 'Georgia, serif',
      flexShrink: 0,
    }}>
      {initials}
    </div>
  )
}

function TierBadge({ role }: { role: string }) {
  const info = TIER_CONFIG[role] || { bg: '#ede4f5', color: '#623491', label: role.replace('client_', '') }
  return (
    <span style={{
      display: 'inline-block',
      padding: '2px 10px',
      borderRadius: 20,
      fontSize: '9.5px',
      fontWeight: 700,
      letterSpacing: '.3px',
      fontFamily: 'Georgia, serif',
      background: info.bg,
      color: info.color,
      whiteSpace: 'nowrap',
    }}>
      {info.label}
    </span>
  )
}

export default function MemberDirectoryPage() {
  const supabase = createClient()

  const [members, setMembers] = useState<Member[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [tierFilter, setTierFilter] = useState('all')

  const fetchMembers = useCallback(async () => {
    setLoading(true)

    let query = supabase
      .from('profiles')
      .select(`
        id, first_name, last_name, role, avatar_url,
        community_profile:community_profiles(headline, location, bio)
      `)
      .eq('is_active', true)
      .in('role', [
        'client_collective',
        'client_studio',
        'client_council',
        'client_wayfinder',
        'coach',
        'team_member',
        'superadmin',
      ])
      .order('first_name', { ascending: true })
      .limit(200)

    if (tierFilter !== 'all') {
      query = query.eq('role', tierFilter)
    }

    if (search.trim()) {
      query = query.or(
        `first_name.ilike.%${search.trim()}%,last_name.ilike.%${search.trim()}%`
      )
    }

    const { data, error } = await query

    if (!error && data) {
      const formatted: Member[] = data.map((m: any) => ({
        ...m,
        community_profile: Array.isArray(m.community_profile)
          ? m.community_profile[0] || null
          : m.community_profile,
      }))
      setMembers(formatted)
    }
    setLoading(false)
  }, [supabase, tierFilter, search])

  useEffect(() => {
    fetchMembers()
  }, [fetchMembers])

  return (
    <div>
      {/* Hero */}
      <div className="mb-6" style={{
        borderRadius: 16,
        padding: 28,
        background: 'linear-gradient(135deg,#2d1a47 0%,#623491 60%,#9b6fc4 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          right: 32,
          top: '50%',
          transform: 'translateY(-50%)',
          fontSize: 64,
          opacity: 0.15,
        }}>
          👥
        </div>
        <h2 style={{
          fontFamily: 'Georgia, serif',
          color: '#e8c487',
          fontSize: 22,
          fontWeight: 700,
          marginBottom: 6,
        }}>
          👥 Member Directory
        </h2>
        <p style={{
          color: 'rgba(255,255,255,0.75)',
          fontFamily: 'Georgia, serif',
          fontSize: 13,
          fontStyle: 'italic',
        }}>
          Connect with fellow calm-first leaders in the Planet Calm community
        </p>
      </div>

      {/* Search + Filter Row */}
      <div className="flex flex-wrap items-center gap-4 mb-5">
        <div className="search-bar" style={{ flex: 1, maxWidth: 360 }}>
          <span style={{
            position: 'absolute',
            left: 12,
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: 14,
            color: '#9b6fc4',
            pointerEvents: 'none',
          }}>
            🔍
          </span>
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div style={{
          color: '#9b6fc4',
          fontSize: 11,
          fontFamily: 'Georgia, serif',
          fontWeight: 700,
        }}>
          {members.length} member{members.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Tier Tabs */}
      <div className="flex flex-wrap gap-2 mb-5">
        {TIER_FILTERS.map(t => (
          <button
            key={t.value}
            className={`page-tab ${tierFilter === t.value ? 'active' : ''}`}
            onClick={() => setTierFilter(t.value)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Member Grid */}
      {loading ? (
        <div className="card" style={{ textAlign: 'center', padding: 40 }}>
          <div style={{ color: '#9b6fc4', fontSize: 13, fontStyle: 'italic' }}>
            Loading members...
          </div>
        </div>
      ) : members.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: 40 }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>👥</div>
          <div style={{ fontFamily: 'Georgia, serif', color: '#2d1a47', fontSize: 14, fontWeight: 700 }}>
            No members found
          </div>
          <div style={{ color: '#9b6fc4', fontSize: 12, fontStyle: 'italic', marginTop: 4 }}>
            {search ? 'Try a different search term' : 'Members will appear here once profiles are set up'}
          </div>
        </div>
      ) : (
        <div className="grid gap-4" style={{
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        }}>
          {members.map(member => (
            <div key={member.id} className="card" style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              padding: 24,
            }}>
              <Avatar firstName={member.first_name} lastName={member.last_name} />

              <div style={{
                fontFamily: 'Georgia, serif',
                color: '#2d1a47',
                fontSize: 14,
                fontWeight: 700,
                marginTop: 12,
              }}>
                {member.first_name} {member.last_name}
              </div>

              <div style={{ marginTop: 6 }}>
                <TierBadge role={member.role} />
              </div>

              {member.community_profile?.headline && (
                <div style={{
                  color: '#7a5ea0',
                  fontSize: 11.5,
                  fontStyle: 'italic',
                  marginTop: 8,
                  lineHeight: 1.4,
                  maxWidth: 220,
                }}>
                  {member.community_profile.headline}
                </div>
              )}

              {member.community_profile?.location && (
                <div style={{
                  color: '#b8a3d0',
                  fontSize: 10.5,
                  marginTop: 6,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                }}>
                  <span>📍</span>
                  {member.community_profile.location}
                </div>
              )}

              {member.community_profile?.bio && (
                <div style={{
                  color: '#7a5ea0',
                  fontSize: 11,
                  marginTop: 10,
                  lineHeight: 1.5,
                  maxWidth: 240,
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                }}>
                  {member.community_profile.bio}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
