'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase-browser'

/* ── Types ── */
type RsvpStatus = 'going' | 'maybe' | 'not_going'

interface SeedEvent {
  id: string
  title: string
  description: string
  date: string          // YYYY-MM-DD
  time: string          // e.g. "2:00 PM EST"
  type: 'virtual' | 'in-person'
  host: string
  rsvp_count: number
}

interface UserRsvp {
  event_id: string
  status: RsvpStatus
}

/* ── Seed events (inline until events table structure is finalized) ── */
const SEED_EVENTS: SeedEvent[] = [
  {
    id: 'evt-1',
    title: 'Calm-First Leadership: Live Q&A with Stephanie',
    description: 'Monthly live session covering reader questions, calm techniques, and community wins.',
    date: '2026-07-10',
    time: '2:00 PM EST',
    type: 'virtual',
    host: 'Stephanie Gibeault',
    rsvp_count: 87,
  },
  {
    id: 'evt-2',
    title: 'Peaceful Paws Park Walk — Austin Chapter',
    description: 'Group walk with calm-first principles. All breeds welcome, BARKType quiz recommended.',
    date: '2026-07-15',
    time: '9:00 AM CST',
    type: 'in-person',
    host: 'Austin Community Leads',
    rsvp_count: 24,
  },
  {
    id: 'evt-3',
    title: 'BARKType Deep Dive: Understanding Your Dog\'s Personality',
    description: 'Interactive workshop exploring the 4 BARKTypes and how to tailor your calm approach.',
    date: '2026-07-22',
    time: '7:00 PM EST',
    type: 'virtual',
    host: 'Dr. Peter Wharton',
    rsvp_count: 142,
  },
  {
    id: 'evt-4',
    title: 'Progress Studio: Cohort 6 Kickoff',
    description: 'Welcome session for new Progress Studio members. Meet your cohort and set your 90-day goals.',
    date: '2026-08-01',
    time: '12:00 PM EST',
    type: 'virtual',
    host: 'Stephanie Gibeault',
    rsvp_count: 38,
  },
  {
    id: 'evt-5',
    title: '"What the BARK?" Book Launch Party',
    description: 'Celebrate the launch of Stephanie\'s new book with a live reading, Q&A, and giveaways.',
    date: '2026-09-15',
    time: '6:00 PM EST',
    type: 'virtual',
    host: 'Planet Calm Team',
    rsvp_count: 214,
  },
  // Past events
  {
    id: 'evt-past-1',
    title: 'Calm Council: Monthly Office Hours',
    description: 'Exclusive session for Calm Council members — strategy, troubleshooting, and support.',
    date: '2026-06-12',
    time: '3:00 PM EST',
    type: 'virtual',
    host: 'Stephanie Gibeault',
    rsvp_count: 19,
  },
  {
    id: 'evt-past-2',
    title: 'Community Meetup: Denver Dog Park Social',
    description: 'Informal meetup at Washington Park. Bring your dogs and your BARKType results!',
    date: '2026-06-05',
    time: '10:00 AM MST',
    type: 'in-person',
    host: 'Denver Chapter',
    rsvp_count: 16,
  },
]

/* ── Style Constants ── */
const cardStyle: React.CSSProperties = {
  background: '#fff',
  borderRadius: 14,
  border: '1px solid rgba(98,52,145,0.1)',
  boxShadow: '0 2px 16px rgba(98,52,145,0.06)',
  overflow: 'hidden',
}

const rsvpBtnBase: React.CSSProperties = {
  padding: '7px 14px',
  borderRadius: 20,
  fontSize: 11,
  fontWeight: 700,
  fontFamily: 'Georgia, serif',
  cursor: 'pointer',
  transition: 'all .18s',
  border: '1px solid',
}

export default function EventsPage() {
  const supabase = createClient()
  const [rsvps, setRsvps] = useState<UserRsvp[]>([])
  const [loadingRsvps, setLoadingRsvps] = useState(true)
  const [savingEventId, setSavingEventId] = useState<string | null>(null)

  const today = new Date().toISOString().slice(0, 10)
  const upcomingEvents = SEED_EVENTS.filter(e => e.date >= today)
  const pastEvents = SEED_EVENTS.filter(e => e.date < today)

  const fetchRsvps = useCallback(async () => {
    setLoadingRsvps(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { setLoadingRsvps(false); return }

    const { data } = await supabase
      .from('event_rsvps')
      .select('event_id, status')
      .eq('user_id', user.id)

    if (data) {
      setRsvps(data as UserRsvp[])
    }
    setLoadingRsvps(false)
  }, [supabase])

  useEffect(() => {
    fetchRsvps()
  }, [fetchRsvps])

  const getUserRsvp = (eventId: string): RsvpStatus | null => {
    const found = rsvps.find(r => r.event_id === eventId)
    return found?.status ?? null
  }

  const handleRsvp = async (eventId: string, status: RsvpStatus) => {
    setSavingEventId(eventId)

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { setSavingEventId(null); return }

    const existing = getUserRsvp(eventId)

    if (existing) {
      // If clicking the same status, remove RSVP
      if (existing === status) {
        await supabase
          .from('event_rsvps')
          .delete()
          .eq('user_id', user.id)
          .eq('event_id', eventId)
      } else {
        await supabase
          .from('event_rsvps')
          .update({ status, updated_at: new Date().toISOString() })
          .eq('user_id', user.id)
          .eq('event_id', eventId)
      }
    } else {
      await supabase
        .from('event_rsvps')
        .insert({ user_id: user.id, event_id: eventId, status })
    }

    await fetchRsvps()
    setSavingEventId(null)
  }

  /* ── Helpers ── */
  const formatDateParts = (dateStr: string) => {
    const d = new Date(dateStr + 'T00:00:00')
    const month = d.toLocaleDateString('en-US', { month: 'short' }).toUpperCase()
    const day = d.getDate()
    return { month, day }
  }

  const isEventPast = (dateStr: string) => dateStr < today

  const rsvpButtonStyle = (status: RsvpStatus, currentRsvp: RsvpStatus | null): React.CSSProperties => {
    const isActive = currentRsvp === status
    const colors: Record<RsvpStatus, { bg: string; color: string; border: string }> = {
      going: { bg: '#e8f5ee', color: '#1e7d47', border: '#2a9d5c' },
      maybe: { bg: '#fdf3dc', color: '#9a6800', border: '#d4a017' },
      not_going: { bg: '#fde8e8', color: '#c0392b', border: '#e05a50' },
    }
    const c = colors[status]
    return {
      ...rsvpBtnBase,
      background: isActive ? c.bg : 'transparent',
      color: isActive ? c.color : '#9b6fc4',
      borderColor: isActive ? c.border : 'rgba(98,52,145,0.15)',
    }
  }

  const renderEventCard = (event: SeedEvent, isPast: boolean) => {
    const { month, day } = formatDateParts(event.date)
    const currentRsvp = getUserRsvp(event.id)
    const isSaving = savingEventId === event.id

    return (
      <div key={event.id} style={{
        ...cardStyle,
        opacity: isPast ? 0.55 : 1,
      }}>
        <div className="flex" style={{ padding: 0 }}>
          {/* Date Box */}
          <div className="flex flex-col items-center justify-center" style={{
            minWidth: 80,
            background: isPast
              ? 'rgba(98,52,145,0.06)'
              : 'linear-gradient(135deg,#2d1a47,#623491)',
            padding: '16px 12px',
          }}>
            <div style={{
              fontSize: 10, fontWeight: 700, letterSpacing: '1.5px',
              color: isPast ? '#9b6fc4' : 'rgba(232,196,135,0.8)',
              fontFamily: 'Georgia, serif',
            }}>
              {month}
            </div>
            <div style={{
              fontSize: 28, fontWeight: 700,
              color: isPast ? '#623491' : '#e8c487',
              fontFamily: 'Georgia, serif', lineHeight: 1.1,
            }}>
              {day}
            </div>
          </div>

          {/* Content */}
          <div style={{ flex: 1, padding: '16px 20px' }}>
            <div className="flex items-start justify-between gap-3">
              <div style={{ flex: 1 }}>
                <div style={{
                  fontFamily: 'Georgia, serif', fontSize: 14, fontWeight: 700,
                  color: '#2d1a47', marginBottom: 4,
                }}>
                  {event.title}
                </div>
                <div style={{
                  fontSize: 11.5, color: '#9b6fc4', fontFamily: 'Georgia, serif',
                  marginBottom: 8,
                }}>
                  {event.time} &middot; Hosted by {event.host}
                </div>
              </div>
              {/* Type badge */}
              <span className={event.type === 'virtual' ? 'pill pill-purple' : 'pill pill-blue'}>
                {event.type === 'virtual' ? 'Virtual' : 'In-Person'}
              </span>
            </div>

            <div style={{
              fontSize: 12, color: '#7a5ea0', fontFamily: 'Georgia, serif',
              fontStyle: 'italic', marginBottom: 12, lineHeight: 1.5,
            }}>
              {event.description}
            </div>

            <div className="flex items-center justify-between">
              {/* RSVP count */}
              <div style={{
                fontSize: 11, color: '#9b6fc4', fontFamily: 'Georgia, serif',
                fontWeight: 700,
              }}>
                {event.rsvp_count + (currentRsvp === 'going' ? 1 : 0)} attending
              </div>

              {/* RSVP Buttons */}
              {!isPast && (
                <div className="flex gap-2">
                  <button
                    style={rsvpButtonStyle('going', currentRsvp)}
                    onClick={() => handleRsvp(event.id, 'going')}
                    disabled={isSaving || loadingRsvps}
                  >
                    {currentRsvp === 'going' ? '\u2713 Going' : 'Going'}
                  </button>
                  <button
                    style={rsvpButtonStyle('maybe', currentRsvp)}
                    onClick={() => handleRsvp(event.id, 'maybe')}
                    disabled={isSaving || loadingRsvps}
                  >
                    {currentRsvp === 'maybe' ? '\u2713 Maybe' : 'Maybe'}
                  </button>
                  <button
                    style={rsvpButtonStyle('not_going', currentRsvp)}
                    onClick={() => handleRsvp(event.id, 'not_going')}
                    disabled={isSaving || loadingRsvps}
                  >
                    {currentRsvp === 'not_going' ? '\u2713 Can\'t Go' : 'Can\'t Go'}
                  </button>
                </div>
              )}
              {isPast && currentRsvp && (
                <span className="pill pill-purple" style={{ fontSize: 9.5 }}>
                  You were {currentRsvp === 'going' ? 'going' : currentRsvp === 'maybe' ? 'maybe' : 'not going'}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Page Header */}
      <div className="mb-6">
        <div style={{
          borderRadius: 16, padding: 28,
          background: 'linear-gradient(135deg,#2d1a47 0%,#623491 60%,#9b6fc4 100%)',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', right: 32, top: '50%', transform: 'translateY(-50%)',
            fontSize: 64, opacity: 0.15,
          }}>
            📅
          </div>
          <h1 style={{
            fontFamily: 'Georgia, serif', color: '#e8c487',
            fontSize: 22, fontWeight: 700, marginBottom: 6,
          }}>
            📅 Events
          </h1>
          <p style={{
            color: 'rgba(255,255,255,0.75)', fontFamily: 'Georgia, serif',
            fontSize: 13, fontStyle: 'italic',
          }}>
            Join live sessions, meetups, and workshops with the Planet Calm community
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { val: upcomingEvents.length, label: 'Upcoming Events', icon: '🗓️' },
          { val: rsvps.filter(r => r.status === 'going').length, label: 'You\'re Attending', icon: '✅' },
          { val: SEED_EVENTS.reduce((sum, e) => sum + e.rsvp_count, 0), label: 'Total RSVPs', icon: '🐾' },
        ].map(s => (
          <div key={s.label} className="kpi-card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 18, marginBottom: 6 }}>{s.icon}</div>
            <div style={{
              fontFamily: 'Georgia, serif', color: '#2d1a47',
              fontSize: 24, fontWeight: 700,
            }}>
              {s.val}
            </div>
            <div style={{
              color: '#9b6fc4', fontFamily: 'Georgia, serif',
              fontSize: 10, fontWeight: 700, letterSpacing: '1.5px',
              textTransform: 'uppercase', marginTop: 3,
            }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Upcoming Events */}
      <div style={{ marginBottom: 32 }}>
        <div style={{
          fontFamily: 'Georgia, serif', fontSize: 14, fontWeight: 700,
          color: '#2d1a47', marginBottom: 14,
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <span style={{
            display: 'inline-block', width: 8, height: 8,
            borderRadius: '50%', background: '#2a9d5c',
          }} />
          Upcoming Events
        </div>
        <div className="flex flex-col gap-4">
          {upcomingEvents.map(event => renderEventCard(event, false))}
        </div>
      </div>

      {/* Past Events */}
      {pastEvents.length > 0 && (
        <div>
          <div style={{
            fontFamily: 'Georgia, serif', fontSize: 14, fontWeight: 700,
            color: '#7a5ea0', marginBottom: 14,
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <span style={{
              display: 'inline-block', width: 8, height: 8,
              borderRadius: '50%', background: '#c4a8e0',
            }} />
            Past Events
          </div>
          <div className="flex flex-col gap-4">
            {pastEvents.map(event => renderEventCard(event, true))}
          </div>
        </div>
      )}
    </div>
  )
}
