'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const navGroups = [
  {
    label: 'Command',
    items: [
      { label: 'Overview', href: '/overview', emoji: '🌿' },
      { label: 'Community Hub', href: '/community', emoji: '🐾' },
    ],
  },
  {
    label: 'Growth',
    items: [
      { label: 'Journey & Pipeline', href: '/pipeline', emoji: '🗺️' },
      { label: 'Client Portal', href: '/portal', emoji: '✨' },
    ],
  },
  {
    label: 'Content & Revenue',
    items: [
      { label: 'Content & Book Launch', href: '/content', emoji: '📖' },
      { label: 'Payments & Finance', href: '/payments', emoji: '💳' },
    ],
  },
  {
    label: 'Intelligence',
    items: [
      { label: 'AI Brain', href: '/ai-brain', emoji: '🤖' },
      { label: 'Reports & KPIs', href: '/kpis', emoji: '📊' },
    ],
  },
  {
    label: 'Manage',
    items: [
      { label: 'Clients', href: '/clients', emoji: '👥' },
      { label: 'Cohorts', href: '/cohort', emoji: '🎓' },
      { label: 'Leads', href: '/leads', emoji: '🎯' },
      { label: 'Partners', href: '/partners', emoji: '🤝' },
      { label: 'Deals', href: '/deals', emoji: '🏷️' },
    ],
  },
  {
    label: 'Tools',
    items: [
      { label: 'Messaging', href: '/messaging', emoji: '💬' },
      { label: 'Worksheets', href: '/worksheets', emoji: '📝' },
      { label: 'Tasks', href: '/tasks', emoji: '✅' },
      { label: 'Notifications', href: '/notifications', emoji: '🔔' },
    ],
  },
  {
    label: 'Settings',
    items: [
      { label: 'Settings & Team', href: '/settings', emoji: '⚙️' },
    ],
  },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [logoError, setLogoError] = useState(false)

  return (
    <nav className="w-[240px] min-h-screen fixed top-0 left-0 z-50 flex flex-col"
      style={{ background: '#2d1a47' }}>
      {/* Logo */}
      <div className="px-[18px] pt-[22px] pb-[16px]" style={{ borderBottom: '1px solid rgba(232,196,135,0.18)' }}>
        {!logoError ? (
          <img
            src="https://trpnlkntvulkjerevngm.supabase.co/storage/v1/object/public/dashboard-assets/logos/1782362694767-Planet_Calm_Logo.png"
            alt="Planet Calm"
            className="w-[148px] block"
            onError={() => setLogoError(true)}
          />
        ) : (
          <div className="text-[18px] font-bold tracking-wide" style={{ color: '#e8c487' }}>
            Planet Calm
          </div>
        )}
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
                </Link>
              )
            })}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="py-4 px-[18px]" style={{ borderTop: '1px solid rgba(232,196,135,0.15)' }}>
        <div className="text-[10px] tracking-wide" style={{ color: 'rgba(232,196,135,0.5)' }}>
          PLANET CALM © 2026<br />Calm-First Leadership
        </div>
      </div>
    </nav>
  )
}
