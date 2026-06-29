'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Bell, Brain } from 'lucide-react'
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

export default function Topbar() {
  const pathname = usePathname()
  const router = useRouter()
  const title = pageTitles[pathname] || 'Dashboard'
  const [userName, setUserName] = useState('')
  const [userInitial, setUserInitial] = useState('?')

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        const first = user.user_metadata?.first_name || ''
        const last = user.user_metadata?.last_name || ''
        const name = first || user.email?.split('@')[0] || 'User'
        setUserName(name)
        setUserInitial((first?.[0] || user.email?.[0] || '?').toUpperCase())
      }
    })
  }, [])

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <div
      className="fixed top-0 left-[240px] right-0 h-[62px] flex items-center px-7 z-40 gap-4"
      style={{
        background: 'rgba(245,238,248,0.96)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid #d6c8e4',
      }}
    >
      <div
        className="flex-1 text-[21px] font-bold tracking-[-0.2px]"
        style={{ fontFamily: 'Georgia, serif', color: '#2d1a47' }}
      >
        {title}
      </div>
      <div
        className="text-[12.5px] italic"
        style={{ color: '#7a5ea0', fontFamily: 'Georgia, serif' }}
      >
        {userName ? `Welcome back, ${userName}` : ''}
      </div>
      <div className="flex items-center gap-3">
        <Link
          href="/ai-brain"
          className="ai-chip cursor-pointer transition-opacity duration-200 hover:opacity-85"
          aria-label="Go to AI Brain"
        >
          <Brain size={14} strokeWidth={2} aria-hidden="true" />
          AI Brain
        </Link>
        <Link
          href="/tasks"
          className="topbar-btn px-[14px] py-[6px] rounded-full text-[11.5px] cursor-pointer transition-all duration-200"
          style={{
            background: '#ede4f5',
            border: '1px solid #d6c8e4',
            color: '#623491',
            fontFamily: 'Georgia, serif',
          }}
        >
          + New Task
        </Link>
        <Link
          href="/notifications"
          className="topbar-icon-btn relative flex items-center justify-center w-9 h-9 rounded-full cursor-pointer transition-all duration-200"
          style={{ background: 'transparent' }}
          aria-label="Notifications"
        >
          <Bell size={18} style={{ color: '#623491' }} aria-hidden="true" />
        </Link>
        <button
          onClick={handleSignOut}
          className="topbar-avatar w-9 h-9 rounded-full text-[13px] font-bold flex items-center justify-center cursor-pointer transition-all duration-200"
          style={{
            background: 'linear-gradient(135deg,#623491,#9b6fc4)',
            color: '#e8c487',
            fontFamily: 'Georgia, serif',
            border: '2px solid #e8c487',
            boxShadow: '0 2px 8px rgba(98,52,145,0.25)',
          }}
          title="Sign out"
          aria-label="Sign out"
        >
          {userInitial}
        </button>
      </div>
    </div>
  )
}
