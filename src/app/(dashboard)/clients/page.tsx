'use client'

import { useState } from 'react'
import { demoClients } from '@/lib/demo-data'
import { Search, UserPlus } from 'lucide-react'

export default function ClientsPage() {
  const [search, setSearch] = useState('')
  const [tierFilter, setTierFilter] = useState('all')

  const tiers = ['all', ...new Set(demoClients.map(c => c.tier))]
  const filtered = demoClients.filter(c =>
    (tierFilter === 'all' || c.tier === tierFilter) &&
    (search === '' || c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase()))
  )

  const totalLTV = demoClients.reduce((s, c) => s + c.ltv, 0)
  const silentCount = demoClients.filter(c => c.tags.includes('silent-buyer')).length

  return (
    <div>
      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {[
          { label: 'Total Clients', value: demoClients.length.toString(), sub: 'All tiers combined' },
          { label: 'Total LTV', value: `$${totalLTV.toLocaleString()}`, sub: 'Lifetime value' },
          { label: 'Silent Buyers', value: silentCount.toString(), sub: '90+ days inactive' },
          { label: 'Active This Week', value: (demoClients.length - silentCount).toString(), sub: 'Engaged recently' },
        ].map(s => (
          <div key={s.label} className="kpi-card">
            <div className="form-label" style={{ marginBottom: '8px' }}>{s.label}</div>
            <div style={{ fontSize: '28px', fontWeight: 700, fontFamily: 'Georgia, serif', color: '#2d1a47' }}>{s.value}</div>
            <div style={{ fontSize: '10.5px', fontStyle: 'italic', color: '#9b6fc4' }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
        <div className="search-bar" style={{ flex: 1 }}>
          <Search size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9b6fc4', zIndex: 1 }} />
          <input type="text" placeholder="Search clients..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        {tiers.map(t => (
          <button key={t} onClick={() => setTierFilter(t)}
            className={`page-tab ${tierFilter === t ? 'active' : ''}`}>
            {t === 'all' ? 'All Tiers' : t}
          </button>
        ))}
        <button className="btn-primary" style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <UserPlus size={13} /> Add Client
        </button>
      </div>

      {/* Table */}
      <div className="card">
        <table>
          <thead>
            <tr>
              {['Client', 'Email', 'Tier', 'LTV', 'Coach', 'Last Activity', 'Tags'].map(h => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(c => (
              <tr key={c.id} style={{ cursor: 'pointer' }}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700, background: 'linear-gradient(135deg,#623491,#9b6fc4)', color: '#fff' }}>
                      {c.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#2d1a47', fontFamily: 'Georgia, serif' }}>{c.name}</span>
                  </div>
                </td>
                <td style={{ color: '#7a5ea0' }}>{c.email}</td>
                <td>
                  <span className={`pill ${c.tier === 'Wayfinder' ? 'pill-gold' : c.tier === 'Council' ? 'pill-purple' : c.tier === 'Studio' ? 'pill-blue' : 'pill-green'}`}>{c.tier}</span>
                </td>
                <td className="gold-accent">${c.ltv.toLocaleString()}</td>
                <td style={{ color: '#7a5ea0' }}>{c.coach || '—'}</td>
                <td style={{ color: '#7a5ea0' }}>{c.lastActivity}</td>
                <td>
                  {c.tags.map((t, i) => <span key={i} className="tag">{t}</span>)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
