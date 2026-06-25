'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Bell } from 'lucide-react'
import { createClient } from '@/lib/supabase-browser'
import { useRouter } from 'next/navigation'

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

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <div className="fixed top-0 left-[240px] right-0 h-[62px] flex items-center px-7 z-40 gap-4"
      style={{
        background: 'rgba(245,238,248,0.96)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid rgba(98,52,145,0.1)',
      }}>
      <div className="flex-1 text-[21px] font-bold tracking-[-0.2px]"
        style={{ fontFamily: 'Georgia, serif', color: '#2d1a47' }}>
        {title}
      </div>
      <div className="text-[12.5px] italic"
        style={{ color: '#7a5ea0', fontFamily: 'Georgia, serif' }}>
        Welcome back, Stephanie ✦
      </div>
      <div className="flex items-center gap-3">
        <div className="ai-chip">🤖 AI Brain</div>
        <Link href="/tasks"
          className="px-[14px] py-[6px] rounded-full text-[11.5px] cursor-pointer transition-all duration-150"
          style={{
            background: 'rgba(98,52,145,0.08)',
            border: '1px solid rgba(98,52,145,0.18)',
            color: '#623491',
            fontFamily: 'Georgia, serif',
          }}>
          + New Task
        </Link>
        <Link href="/notifications" className="relative">
          <Bell size={18} style={{ color: '#623491' }} />
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[8px] font-bold flex items-center justify-center"
            style={{ background: '#e8c487', color: '#2d1a47' }}>
            5
          </span>
        </Link>
        <button onClick={handleSignOut}
          className="w-9 h-9 rounded-full text-[13px] font-bold flex items-center justify-center cursor-pointer"
          style={{
            background: 'linear-gradient(135deg,#623491,#9b6fc4)',
            color: '#e8c487',
            fontFamily: 'Georgia, serif',
            border: '2px solid #e8c487',
            boxShadow: '0 2px 8px rgba(98,52,145,0.25)',
          }}
          title="Sign out">
          S
        </button>
      </div>
    </div>
  )
}
