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
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Partners', value: demoPartners.length.toString(), color: '#623491' },
          { label: 'Active', value: activeCount.toString(), color: '#2a9d5c' },
          { label: 'Lapsed (90+ days)', value: lapsedCount.toString(), color: '#c0392b' },
          { label: 'YTD Commissions', value: `$${totalCommissions.toLocaleString()}`, color: '#b8860b' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-[14px] p-5 relative overflow-hidden"
            style={{ border: '1px solid rgba(98,52,145,0.1)', boxShadow: '0 2px 16px rgba(98,52,145,0.06)' }}>
            <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: 'linear-gradient(90deg,#623491,#e8c487)' }} />
            <div className="text-[10px] font-bold tracking-[1.8px] uppercase mb-2" style={{ color: '#9b6fc4', fontFamily: 'Georgia, serif' }}>{s.label}</div>
            <div className="text-[28px] font-bold" style={{ fontFamily: 'Georgia, serif', color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3 mb-4">
        <div className="relative flex-1 max-w-sm">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#9b6fc4' }} />
          <input type="text" placeholder="Search partners..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-[9px] rounded-xl text-[12.5px] outline-none"
            style={{ border: '1px solid rgba(98,52,145,0.2)', fontFamily: 'Georgia, serif', color: '#2d1a47' }} />
        </div>
        {['all', 'active', 'lapsed', 'pending'].map(s => (
          <button key={s} onClick={() => setStatusFilter(s)}
            className="px-3 py-[7px] rounded-full text-[10.5px] font-bold cursor-pointer"
            style={{
              background: statusFilter === s ? '#623491' : 'rgba(98,52,145,0.08)',
              color: statusFilter === s ? '#e8c487' : '#623491',
              fontFamily: 'Georgia, serif',
              border: statusFilter === s ? 'none' : '1px solid rgba(98,52,145,0.15)',
            }}>
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
        <button className="px-4 py-[8px] rounded-full text-[11px] font-bold cursor-pointer flex items-center gap-2 ml-auto"
          style={{ background: 'linear-gradient(135deg,#623491,#9b6fc4)', color: '#e8c487', fontFamily: 'Georgia, serif', border: 'none' }}>
          <RefreshCw size={12} /> Re-Engage Lapsed
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-[14px] p-5"
        style={{ border: '1px solid rgba(98,52,145,0.1)', boxShadow: '0 2px 16px rgba(98,52,145,0.06)' }}>
        <table className="w-full">
          <thead>
            <tr>
              {['Partner', 'Email', 'AWIN ID', 'Status', 'Last Click', 'All-Time', 'YTD'].map(h => (
                <th key={h} className="text-left text-[10px] font-bold tracking-[1.5px] uppercase pb-2 px-3"
                  style={{ color: '#9b6fc4', fontFamily: 'Georgia, serif', borderBottom: '2px solid rgba(98,52,145,0.1)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.id} className="hover:bg-[rgba(232,196,135,0.08)] cursor-pointer">
                <td className="py-[11px] px-3 text-[12.5px] font-bold" style={{ borderBottom: '1px solid rgba(98,52,145,0.06)', color: '#2d1a47' }}>{p.name}</td>
                <td className="py-[11px] px-3 text-[12.5px]" style={{ borderBottom: '1px solid rgba(98,52,145,0.06)', color: '#7a5ea0' }}>{p.email}</td>
                <td className="py-[11px] px-3 text-[11px] font-bold" style={{ borderBottom: '1px solid rgba(98,52,145,0.06)', color: '#623491' }}>{p.awinId}</td>
                <td className="py-[11px] px-3" style={{ borderBottom: '1px solid rgba(98,52,145,0.06)' }}>
                  <span className={`pill ${p.status === 'active' ? 'pill-green' : p.status === 'lapsed' ? 'pill-red' : 'pill-amber'}`}>{p.status}</span>
                </td>
                <td className="py-[11px] px-3 text-[12px]" style={{ borderBottom: '1px solid rgba(98,52,145,0.06)', color: '#7a5ea0' }}>{p.lastClick || '—'}</td>
                <td className="py-[11px] px-3 text-[12.5px] font-bold" style={{ borderBottom: '1px solid rgba(98,52,145,0.06)', color: '#b8860b' }}>${p.allTime.toLocaleString()}</td>
                <td className="py-[11px] px-3 text-[12.5px] font-bold" style={{ borderBottom: '1px solid rgba(98,52,145,0.06)', color: p.ytd > 0 ? '#2a9d5c' : '#c0392b' }}>${p.ytd.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
