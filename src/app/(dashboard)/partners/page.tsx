'use client'

import { useState } from 'react'
import { demoPartners } from '@/lib/demo-data'
import { Search, RefreshCw } from 'lucide-react'

export default function PartnersPage() {
  const [statusFilter, setStatusFilter] = useState('all')
  const [search, setSearch] = useState('')

  const filtered = demoPartners.filter(p =>
    (statusFilter === 'all' || p.status === statusFilter) &&
    (search === '' || p.name.toLowerCase().includes(search.toLowerCase()))
  )

  const totalCommissions = demoPartners.reduce((s, p) => s + p.ytd, 0)
  const activeCount = demoPartners.filter(p => p.status === 'active').length
  const lapsedCount = demoPartners.filter(p => p.status === 'lapsed').length

  return (
    <div>
      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {[
          { label: 'Total Partners', value: demoPartners.length.toString(), color: '#623491' },
          { label: 'Active', value: activeCount.toString(), color: '#2a9d5c' },
          { label: 'Lapsed (90+ days)', value: lapsedCount.toString(), color: '#c0392b' },
          { label: 'YTD Commissions', value: `$${totalCommissions.toLocaleString()}`, color: '#b8860b' },
        ].map(s => (
          <div key={s.label} className="kpi-card">
            <div className="form-label" style={{ marginBottom: '8px' }}>{s.label}</div>
            <div style={{ fontSize: '28px', fontWeight: 700, fontFamily: 'Georgia, serif', color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
        <div className="search-bar" style={{ flex: 1 }}>
          <Search size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9b6fc4', zIndex: 1 }} />
          <input type="text" placeholder="Search partners..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        {['all', 'active', 'lapsed', 'pending'].map(s => (
          <button key={s} onClick={() => setStatusFilter(s)}
            className={`page-tab ${statusFilter === s ? 'active' : ''}`}>
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
        <button className="btn-primary" style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <RefreshCw size={12} /> Re-Engage Lapsed
        </button>
      </div>

      {/* Table */}
      <div className="card">
        <table>
          <thead>
            <tr>
              {['Partner', 'Email', 'AWIN ID', 'Status', 'Last Click', 'All-Time', 'YTD'].map(h => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.id} style={{ cursor: 'pointer' }}>
                <td style={{ fontWeight: 700, color: '#2d1a47' }}>{p.name}</td>
                <td style={{ color: '#7a5ea0' }}>{p.email}</td>
                <td style={{ fontSize: '11px', fontWeight: 700, color: '#623491' }}>{p.awinId}</td>
                <td>
                  <span className={`pill ${p.status === 'active' ? 'pill-green' : p.status === 'lapsed' ? 'pill-red' : 'pill-amber'}`}>{p.status}</span>
                </td>
                <td style={{ fontSize: '12px', color: '#7a5ea0' }}>{p.lastClick || '—'}</td>
                <td className="gold-accent">${p.allTime.toLocaleString()}</td>
                <td style={{ fontWeight: 700, color: p.ytd > 0 ? '#2a9d5c' : '#c0392b' }}>${p.ytd.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
