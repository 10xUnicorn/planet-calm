'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase-browser'

const pageTitles: Record<string, string> = {
  '/overview': 'Mission Overview',
  '/community': 'Community Hub',
  '/pipeline': 'Journey & Pipeline',
  '/portal': 'Client Portal',
  '/content': 'Content & Book Launch',
  '/payments': 'Payments & Finance',
  '/ai-brain': 'AI Brain',
  '/kpis': 'Reports & KPIs',
  '/clients': 'Clients',
  '/cohort': 'Cohorts',
  '/leads': 'Leads',
  '/partners': 'Partners & Affiliates',
  '/deals': 'Deals & Promotions',
  '/messaging': 'Messaging',
  '/worksheets': 'Worksheets',
  '/tasks': 'Tasks',
  '/notifications': 'Notifications',
  '/settings': 'Settings & Team',
  '/reports': 'Reports',
}

interface TopbarProps {
  onToggleSidebar: () => void
}

export default function Topbar({ onToggleSidebar }: TopbarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const title = pageTitles[pathname] || 'Dashboard'
  const [userName, setUserName] = useState('')
  const [userInitial, setUserInitial] = useState('S')

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        const first = user.user_metadata?.first_name || ''
        const name = first || user.email?.split('@')[0] || 'User'
        setUserName(name)
        setUserInitial((first?.[0] || user.email?.[0] || 'S').toUpperCase())
      }
    })
  }, [])

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <div className="topbar" style={{
      position: 'fixed', top: 0, right: 0, height: 62,
      background: 'rgba(245,238,248,0.96)', backdropFilter: 'blur(8px)',
      borderBottom: '1px solid rgba(98,52,145,0.1)',
      display: 'flex', alignItems: 'center', padding: '0 28px', zIndex: 90, gap: 16,
    }}>
      {/* Hamburger — mobile only */}
      <button
        className="hamburger-btn"
        onClick={onToggleSidebar}
        aria-label="Toggle navigation menu"
        type="button"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2d1a47" strokeWidth="2.5" strokeLinecap="round">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      <div style={{ fontFamily: 'Georgia, serif', fontSize: 21, fontWeight: 700, color: '#2d1a47', flex: 1, letterSpacing: '-.2px' }}>
        {title}
      </div>
      <div className="topbar-welcome" style={{ fontSize: '12.5px', color: '#7a5ea0', fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>
        {userName ? `Welcome back, ${userName} ✦` : ''}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Link href="/ai-brain" className="ai-chip topbar-hide-mobile" style={{ textDecoration: 'none' }}>🤖 AI Brain</Link>
        <Link href="/tasks" className="topbar-btn topbar-hide-mobile" style={{
          background: 'rgba(98,52,145,0.08)', border: '1px solid rgba(98,52,145,0.18)',
          color: '#623491', fontSize: '11.5px', padding: '6px 14px', borderRadius: 20,
          cursor: 'pointer', fontFamily: 'Georgia, serif', textDecoration: 'none',
        }}>+ New Task</Link>
        <button onClick={handleSignOut} style={{
          width: 36, height: 36, borderRadius: '50%',
          background: 'linear-gradient(135deg,#623491,#9b6fc4)',
          color: '#e8c487', fontSize: 13, fontWeight: 700,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'Georgia, serif', border: '2px solid #e8c487',
          boxShadow: '0 2px 8px rgba(98,52,145,0.25)', cursor: 'pointer',
        }} title="Sign out">{userInitial}</button>
      </div>
    </div>
  )
}
