'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const navGroups = [
  {
    label: 'Command',
    items: [
      { label: 'Overview', href: '/overview', icon: '🌿' },
      { label: 'Community Hub', href: '/community', icon: '🐾', badge: 12 },
    ],
  },
  {
    label: 'Community',
    items: [
      { label: 'Feed', href: '/community/feed', icon: '🐾' },
      { label: 'Members', href: '/community/members', icon: '👥' },
    ],
  },
  {
    label: 'Growth',
    items: [
      { label: 'Journey & Pipeline', href: '/pipeline', icon: '🗺️' },
      { label: 'Client Portal', href: '/portal', icon: '✨' },
    ],
  },
  {
    label: 'Content & Revenue',
    items: [
      { label: 'Courses (Admin)', href: '/courses', icon: '📚' },
      { label: 'Content & Book Launch', href: '/content', icon: '📖' },
      { label: 'Payments & Finance', href: '/payments', icon: '💳' },
    ],
  },
  {
    label: 'Connect',
    items: [
      { label: 'Events', href: '/events', icon: '📅' },
      { label: 'Messaging', href: '/messaging', icon: '💬' },
    ],
  },
  {
    label: 'Intelligence',
    items: [
      { label: 'AI Brain', href: '/ai-brain', icon: '🤖' },
      { label: 'Reports & KPIs', href: '/kpis', icon: '📊', badge: 3 },
    ],
  },
  {
    label: 'My Account',
    items: [
      { label: 'My Resources', href: '/resources', icon: '🌿' },
      { label: 'My Pets', href: '/pets', icon: '🐕' },
    ],
  },
  {
    label: 'Settings',
    items: [
      { label: 'Settings & Team', href: '/settings', icon: '⚙️' },
    ],
  },
]

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname()
  const [logoError, setLogoError] = useState(false)

  return (
    <>
      {/* Backdrop overlay — mobile only */}
      <div
        className={`sidebar-backdrop ${isOpen ? 'sidebar-backdrop-visible' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      <nav
        className={`sidebar-nav ${isOpen ? 'sidebar-open' : ''}`}
        style={{ background: '#2d1a47' }}
      >
        {/* Logo — matches mockup exactly */}
        <div style={{ padding: '22px 18px 16px', borderBottom: '1px solid rgba(232,196,135,0.18)' }}>
          {!logoError ? (
            <img
              src="https://trpnlkntvulkjerevngm.supabase.co/storage/v1/object/public/dashboard-assets/logos/1782362694767-Planet_Calm_Logo.png"
              alt="Planet Calm"
              style={{ width: 148, display: 'block' }}
              onError={() => setLogoError(true)}
            />
          ) : (
            <div style={{ color: '#e8c487', fontSize: 18, fontWeight: 700, letterSpacing: '.5px' }}>
              Planet Calm
            </div>
          )}
        </div>

        {/* Nav Groups */}
        <div className="flex-1 overflow-y-auto">
          {navGroups.map((group) => (
            <div key={group.label} style={{ padding: '14px 0 4px' }}>
              <div style={{
                fontFamily: 'Georgia, serif',
                fontSize: '9.5px',
                fontWeight: 700,
                letterSpacing: '2px',
                textTransform: 'uppercase' as const,
                color: 'rgba(232,196,135,0.55)',
                padding: '0 20px 6px',
              }}>
                {group.label}
              </div>
              {group.items.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      padding: '9px 20px',
                      cursor: 'pointer',
                      color: isActive ? '#e8c487' : 'rgba(255,255,255,0.75)',
                      fontSize: '12.5px',
                      fontFamily: 'Georgia, serif',
                      transition: 'all .18s',
                      borderLeft: isActive ? '3px solid #e8c487' : '3px solid transparent',
                      letterSpacing: '.2px',
                      fontWeight: isActive ? 700 : 400,
                      background: isActive ? 'rgba(232,196,135,0.15)' : 'transparent',
                      textDecoration: 'none',
                    }}
                  >
                    <span style={{ fontSize: 14, width: 18, textAlign: 'center' as const }}>{item.icon}</span>
                    {item.label}
                    {item.badge && (
                      <span style={{
                        marginLeft: 'auto',
                        background: '#e8c487',
                        color: '#2d1a47',
                        fontSize: 9,
                        fontWeight: 800,
                        padding: '2px 6px',
                        borderRadius: 20,
                      }}>
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
        <div style={{ marginTop: 'auto', padding: '16px 18px', borderTop: '1px solid rgba(232,196,135,0.15)' }}>
          <div style={{ color: 'rgba(232,196,135,0.5)', fontSize: 10, letterSpacing: '.5px' }}>
            PLANET CALM © 2026<br />Calm-First Leadership
          </div>
        </div>
      </nav>
    </>
  )
}
