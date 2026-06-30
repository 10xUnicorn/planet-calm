'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'

const initialNotifications = [
  { id: '1', type: 'new_purchase', title: 'New Payment', body: 'Rachel Nguyen purchased Calm Council ($6,000)', time: '10 min ago', read: false },
  { id: '2', type: 'worksheet_submitted', title: 'Worksheet Submitted', body: 'Marisol Vega submitted Weekly Calm Check-In', time: '2 hours ago', read: false },
  { id: '3', type: 'new_lead', title: 'New Lead', body: 'Emma Whitfield completed BARKType quiz (Structured Guardian)', time: '3 hours ago', read: false },
  { id: '4', type: 'stale_deal', title: 'Stale Deal Alert', body: 'Denver Dumb Friends League \u2014 14 days in Contract Out', time: '5 hours ago', read: false },
  { id: '5', type: 'ai_sequence_complete', title: 'AI Sequence Complete', body: 'Silent buyer reactivation batch processed (127 emails)', time: '1 day ago', read: true },
  { id: '6', type: 'payment_failed', title: 'Payment Failed', body: 'David Torres \u2014 Progress Studio renewal declined', time: '1 day ago', read: true },
  { id: '7', type: 'cohort_update', title: 'Cohort Update', body: 'SF SPCA cohort: 2 members behind on Module 3', time: '2 days ago', read: true },
  { id: '8', type: 'message_received', title: 'New Message', body: 'Coach Jen: Updated worksheet feedback for Trevor', time: '2 days ago', read: true },
]

const iconMap: Record<string, string> = {
  new_purchase: '💳',
  worksheet_submitted: '📝',
  new_lead: '🎯',
  stale_deal: '⚠️',
  ai_sequence_complete: '🤖',
  payment_failed: '❌',
  cohort_update: '🎓',
  message_received: '💬',
}

const defaultIcon = '🔔'

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications)
  const unreadCount = notifications.filter(n => !n.read).length

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  const toggleRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: !n.read } : n))
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div style={{ fontSize: '12px', color: '#7a5ea0', fontFamily: 'Georgia, serif' }}>
          {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
        </div>
        {unreadCount > 0 && (
          <button onClick={markAllRead} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '6px 12px', fontSize: '11px' }}>
            <Check size={12} /> Mark all as read
          </button>
        )}
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        {notifications.map(n => (
          <div key={n.id} onClick={() => toggleRead(n.id)}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              padding: '16px 20px',
              cursor: 'pointer',
              transition: 'all 0.18s',
              borderBottom: '1px solid rgba(98,52,145,0.06)',
              background: n.read ? 'transparent' : 'rgba(232,196,135,0.05)',
            }}>
            <span style={{ marginTop: '2px', flexShrink: 0, fontSize: '16px' }}>{iconMap[n.type] || defaultIcon}</span>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '12.5px', fontWeight: n.read ? 400 : 700, fontFamily: 'Georgia, serif', color: '#2d1a47' }}>
                  {n.title}
                </span>
                {!n.read && <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#e8c487' }} />}
              </div>
              <div style={{ fontSize: '11.5px', marginTop: '2px', color: '#7a5ea0' }}>{n.body}</div>
            </div>
            <span style={{ fontSize: '10px', marginTop: '4px', whiteSpace: 'nowrap', color: '#9b6fc4' }}>{n.time}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
