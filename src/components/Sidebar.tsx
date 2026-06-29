'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import {
  LayoutDashboard,
  Heart,
  GitBranch,
  Sparkles,
  BookOpen,
  CreditCard,
  Brain,
  BarChart3,
  Users,
  UsersRound,
  UserPlus,
  Handshake,
  Tag,
  MessageSquare,
  FileText,
  CheckSquare,
  Bell,
  Settings,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface NavItem {
  label: string
  href: string
  icon: LucideIcon
  badge?: number
}

interface NavGroup {
  label: string
  items: NavItem[]
}

const navGroups: NavGroup[] = [
  {
    label: 'Command',
    items: [
      { label: 'Overview', href: '/overview', icon: LayoutDashboard },
      { label: 'Community Hub', href: '/community', icon: Heart, badge: 12 },
    ],
  },
  {
    label: 'Growth',
    items: [
      { label: 'Journey & Pipeline', href: '/pipeline', icon: GitBranch },
      { label: 'Client Portal', href: '/portal', icon: Sparkles },
    ],
  },
  {
    label: 'Content & Revenue',
    items: [
      { label: 'Content & Book Launch', href: '/content', icon: BookOpen },
      { label: 'Payments & Finance', href: '/payments', icon: CreditCard },
    ],
  },
  {
    label: 'Intelligence',
    items: [
      { label: 'AI Brain', href: '/ai-brain', icon: Brain },
      { label: 'Reports & KPIs', href: '/kpis', icon: BarChart3, badge: 3 },
    ],
  },
  {
    label: 'Manage',
    items: [
      { label: 'Clients', href: '/clients', icon: Users },
      { label: 'Cohorts', href: '/cohort', icon: UsersRound },
      { label: 'Leads', href: '/leads', icon: UserPlus },
      { label: 'Partners', href: '/partners', icon: Handshake },
      { label: 'Deals', href: '/deals', icon: Tag },
    ],
  },
  {
    label: 'Tools',
    items: [
      { label: 'Messaging', href: '/messaging', icon: MessageSquare },
      { label: 'Worksheets', href: '/worksheets', icon: FileText },
      { label: 'Tasks', href: '/tasks', icon: CheckSquare },
      { label: 'Notifications', href: '/notifications', icon: Bell },
    ],
  },
  {
    label: 'Settings',
    items: [
      { label: 'Settings & Team', href: '/settings', icon: Settings },
    ],
  },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [logoError, setLogoError] = useState(false)

  return (
    <nav
      className="w-[240px] min-h-screen fixed top-0 left-0 z-50 flex flex-col"
      style={{ background: '#2d1a47' }}
      aria-label="Main navigation"
    >
      {/* Logo */}
      <div
        className="px-[18px] pt-[22px] pb-[16px]"
        style={{ borderBottom: '1px solid rgba(232,196,135,0.18)' }}
      >
        {!logoError ? (
          <div
            className="w-[148px] h-[48px] rounded-lg flex items-center justify-center overflow-hidden"
            style={{ background: '#2d1a47' }}
          >
            <img
              src="https://trpnlkntvulkjerevngm.supabase.co/storage/v1/object/public/dashboard-assets/logos/1782362694767-Planet_Calm_Logo.png"
              alt="Planet Calm"
              className="w-[148px] block"
              style={{ mixBlendMode: 'lighten' }}
              onError={() => setLogoError(true)}
            />
          </div>
        ) : (
          <div
            className="text-[18px] font-bold tracking-wide"
            style={{ color: '#e8c487' }}
          >
            Planet Calm
          </div>
        )}
      </div>

      {/* Nav Groups */}
      <div className="flex-1 overflow-y-auto py-2">
        {navGroups.map((group) => (
          <div key={group.label} className="py-[14px] px-0">
            <div
              className="px-5 pb-[6px] text-[9.5px] font-bold tracking-[2px] uppercase"
              style={{
                color: 'rgba(232,196,135,0.55)',
                fontFamily: 'Georgia, serif',
              }}
            >
              {group.label}
            </div>
            {group.items.map((item) => {
              const isActive = pathname === item.href
              const IconComponent = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="sidebar-nav-link flex items-center gap-[10px] py-[9px] px-5 text-[12.5px] transition-all duration-200"
                  style={{
                    color: isActive ? '#e8c487' : 'rgba(255,255,255,0.75)',
                    background: isActive
                      ? 'rgba(232,196,135,0.15)'
                      : 'transparent',
                    borderLeft: isActive
                      ? '3px solid #e8c487'
                      : '3px solid transparent',
                    fontWeight: isActive ? 700 : 400,
                    fontFamily: 'Georgia, serif',
                    letterSpacing: '.2px',
                    cursor: 'pointer',
                  }}
                >
                  <IconComponent
                    size={16}
                    strokeWidth={isActive ? 2.2 : 1.8}
                    style={{
                      color: isActive
                        ? '#e8c487'
                        : 'rgba(255,255,255,0.6)',
                      flexShrink: 0,
                    }}
                    aria-hidden="true"
                  />
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
      <div
        className="py-4 px-[18px]"
        style={{ borderTop: '1px solid rgba(232,196,135,0.15)' }}
      >
        <div
          className="text-[10px] tracking-wide"
          style={{ color: 'rgba(232,196,135,0.5)' }}
        >
          PLANET CALM &copy; 2026
          <br />
          Calm-First Leadership
        </div>
      </div>
    </nav>
  )
}
