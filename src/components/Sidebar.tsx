'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import {
  Compass, TrendingUp, Users, BookOpen, Rocket, Settings,
  LayoutDashboard, BarChart3, UserPlus, GitBranch, Tag, Handshake,
  UserCircle, UsersRound, Heart, MessageSquare,
  Library, FileText, Sparkles, Brain, Bell, CheckSquare,
  CreditCard, FileBarChart
} from 'lucide-react'

const navGroups = [
  {
    label: 'Command',
    items: [
      { icon: LayoutDashboard, label: 'Overview', href: '/overview', emoji: '🌿' },
      { icon: Heart, label: 'Community Hub', href: '/community', emoji: '🐾', badge: 12 },
    ],
  },
  {
    label: 'Growth',
    items: [
      { icon: GitBranch, label: 'Journey & Pipeline', href: '/pipeline', emoji: '🗺️' },
      { icon: Sparkles, label: 'Client Portal', href: '/portal', emoji: '✨' },
    ],
  },
  {
    label: 'Content & Revenue',
    items: [
      { icon: BookOpen, label: 'Content & Book Launch', href: '/content', emoji: '📖' },
      { icon: CreditCard, label: 'Payments & Finance', href: '/payments', emoji: '💳' },
    ],
  },
  {
    label: 'Intelligence',
    items: [
      { icon: Brain, label: 'AI Brain', href: '/ai-brain', emoji: '🤖' },
      { icon: BarChart3, label: 'Reports & KPIs', href: '/kpis', emoji: '📊', badge: 3 },
    ],
  },
  {
    label: 'Manage',
    items: [
      { icon: Users, label: 'Clients', href: '/clients', emoji: '👥' },
      { icon: UsersRound, label: 'Cohorts', href: '/cohort', emoji: '🎓' },
      { icon: UserPlus, label: 'Leads', href: '/leads', emoji: '🎯' },
      { icon: Handshake, label: 'Partners', href: '/partners', emoji: '🤝' },
      { icon: Tag, label: 'Deals', href: '/deals', emoji: '🏷️' },
    ],
  },
  {
    label: 'Tools',
    items: [
      { icon: MessageSquare, label: 'Messaging', href: '/messaging', emoji: '💬' },
      { icon: FileText, label: 'Worksheets', href: '/worksheets', emoji: '📝' },
      { icon: CheckSquare, label: 'Tasks', href: '/tasks', emoji: '✅' },
      { icon: Bell, label: 'Notifications', href: '/notifications', emoji: '🔔' },
    ],
  },
  {
    label: 'Settings',
    items: [
      { icon: Settings, label: 'Settings & Team', href: '/settings', emoji: '⚙️' },
    ],
  },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <nav className="w-[240px] min-h-screen fixed top-0 left-0 z-50 flex flex-col"
      style={{ background: '#2d1a47' }}>
      {/* Logo */}
      <div className="px-[18px] pt-[22px] pb-[16px]" style={{ borderBottom: '1px solid rgba(232,196,135,0.18)' }}>
        <img
          src="https://trpnlkntvulkjerevngm.supabase.co/storage/v1/object/public/dashboard-assets/logos/1782362694767-Planet_Calm_Logo.png"
          alt="Planet Calm"
          className="w-[148px] block"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none'
            const fallback = document.getElementById('logo-fallback')
            if (fallback) fallback.style.display = 'block'
          }}
        />
        <div id="logo-fallback" className="hidden text-[18px] font-bold tracking-wide" style={{ color: '#e8c487' }}>
          Planet Calm
        </div>
      </div>

      {/* Nav Groups */}
      <div className="flex-1 overflow-y-auto py-2">
        {navGroups.map((group) => (
          <div key={group.label} className="py-[14px] px-0">
            <div className="px-5 pb-[6px] text-[9.5px] font-bold tracking-[2px] uppercase"
              style={{ color: 'rgba(232,196,135,0.55)', fontFamily: 'Georgia, serif' }}>
              {group.label}
            </div>
            {group.items.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-[10px] py-[9px] px-5 text-[12.5px] transition-all duration-150"
                  style={{
                    color: isActive ? '#e8c487' : 'rgba(255,255,255,0.75)',
                    background: isActive ? 'rgba(232,196,135,0.15)' : 'transparent',
                    borderLeft: isActive ? '3px solid #e8c487' : '3px solid transparent',
                    fontWeight: isActive ? 700 : 400,
                    fontFamily: 'Georgia, serif',
                    letterSpacing: '.2px',
                  }}
                >
                  <span className="text-[14px] w-[18px] text-center">{item.emoji}</span>
                  {item.label}
                  {item.badge && (
                    <span className="ml-auto text-[9px] font-extrabold px-[6px] py-[2px] rounded-full"
                      style={{ background: '#e8c487', color: '#2d1a47' }}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              )
            })}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="py-4 px-[18px]" style={{ borderTop: '1px solid rgba(232,196,135,0.15)' }}>
        <div className="text-[10px] tracking-wide" style={{ color: 'rgba(232,196,135,0.5)' }}>
          PLANET CALM © 2025<br />Calm-First Leadership
        </div>
      </div>
    </nav>
  )
}
