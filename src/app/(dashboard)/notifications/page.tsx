'use client'

import { useState } from 'react'
import {
  Check, CreditCard, FileText, Target, AlertTriangle,
  Brain, XCircle, GraduationCap, MessageSquare, Bell
} from 'lucide-react'

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

const iconMap: Record<string, React.ReactNode> = {
  new_purchase: <CreditCard size={16} style={{ color: '#623491' }} />,
  worksheet_submitted: <FileText size={16} style={{ color: '#623491' }} />,
  new_lead: <Target size={16} style={{ color: '#623491' }} />,
  stale_deal: <AlertTriangle size={16} style={{ color: '#e8c487' }} />,
  ai_sequence_complete: <Brain size={16} style={{ color: '#623491' }} />,
  payment_failed: <XCircle size={16} style={{ color: '#c0392b' }} />,
  cohort_update: <GraduationCap size={16} style={{ color: '#623491' }} />,
  message_received: <MessageSquare size={16} style={{ color: '#623491' }} />,
}

const defaultIcon = <Bell size={16} style={{ color: '#623491' }} />

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
      <div className="flex items-center justify-between mb-6">
        <div className="text-[12px]" style={{ color: '#7a5ea0', fontFamily: 'Georgia, serif' }}>
          {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
        </div>
        {unreadCount > 0 && (
          <button onClick={markAllRead}
            className="flex items-center gap-1 text-[11px] cursor-pointer px-3 py-[6px] rounded-[12px]"
            style={{ background: 'rgba(98,52,145,0.08)', color: '#623491', fontFamily: 'Georgia, serif', border: '1px solid rgba(98,52,145,0.15)' }}>
            <Check size={12} /> Mark all as read
          </button>
        )}
      </div>

      <div className="bg-white rounded-[14px] overflow-hidden"
        style={{ border: '1px solid rgba(98,52,145,0.1)', boxShadow: '0 2px 16px rgba(98,52,145,0.06)' }}>
        {notifications.map(n => (
          <div key={n.id} onClick={() => toggleRead(n.id)}
            className="flex items-start gap-3 px-5 py-4 cursor-pointer transition-all hover:bg-[rgba(232,196,135,0.08)]"
            style={{
              borderBottom: '1px solid rgba(98,52,145,0.06)',
              background: n.read ? 'transparent' : 'rgba(232,196,135,0.05)',
            }}>
            <span className="mt-[2px] flex-shrink-0">{iconMap[n.type] || defaultIcon}</span>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className={`text-[12.5px] ${n.read ? '' : 'font-bold'}`} style={{ fontFamily: 'Georgia, serif', color: '#2d1a47' }}>
                  {n.title}
                </span>
                {!n.read && <span className="w-2 h-2 rounded-full" style={{ background: '#e8c487' }} />}
              </div>
              <div className="text-[11.5px] mt-[2px]" style={{ color: '#7a5ea0' }}>{n.body}</div>
            </div>
            <span className="text-[10px] mt-1 whitespace-nowrap" style={{ color: '#9b6fc4' }}>{n.time}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
