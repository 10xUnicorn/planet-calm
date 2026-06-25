'use client'

import { useState } from 'react'
import { demoClients } from '@/lib/demo-data'
import { Search, Download, UserPlus, Filter } from 'lucide-react'

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
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Clients', value: demoClients.length.toString(), sub: 'All tiers combined' },
          { label: 'Total LTV', value: `$${totalLTV.toLocaleString()}`, sub: 'Lifetime value' },
          { label: 'Silent Buyers', value: silentCount.toString(), sub: '90+ days inactive' },
          { label: 'Active This Week', value: (demoClients.length - silentCount).toString(), sub: 'Engaged recently' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-[14px] p-5 relative overflow-hidden"
            style={{ border: '1px solid rgba(98,52,145,0.1)', boxShadow: '0 2px 16px rgba(98,52,145,0.06)' }}>
            <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: 'linear-gradient(90deg,#623491,#e8c487)' }} />
            <div className="text-[10px] font-bold tracking-[1.8px] uppercase mb-2" style={{ color: '#9b6fc4', fontFamily: 'Georgia, serif' }}>{s.label}</div>
            <div className="text-[28px] font-bold" style={{ fontFamily: 'Georgia, serif', color: '#2d1a47' }}>{s.value}</div>
            <div className="text-[10.5px] italic" style={{ color: '#9b6fc4' }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3 mb-4">
        <div className="relative flex-1 max-w-sm">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#9b6fc4' }} />
          <input type="text" placeholder="Search clients..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-[9px] rounded-xl text-[12.5px] outline-none"
            style={{ border: '1px solid rgba(98,52,145,0.2)', fontFamily: 'Georgia, serif', color: '#2d1a47' }} />
        </div>
        {tiers.map(t => (
          <button key={t} onClick={() => setTierFilter(t)}
            className="px-3 py-[7px] rounded-full text-[10.5px] font-bold cursor-pointer"
            style={{
              background: tierFilter === t ? '#623491' : 'rgba(98,52,145,0.08)',
              color: tierFilter === t ? '#e8c487' : '#623491',
              fontFamily: 'Georgia, serif',
              border: tierFilter === t ? 'none' : '1px solid rgba(98,52,145,0.15)',
            }}>
            {t === 'all' ? 'All Tiers' : t}
          </button>
        ))}
        <button className="px-4 py-[8px] rounded-full text-[11px] font-bold cursor-pointer flex items-center gap-2 ml-auto"
          style={{ background: 'linear-gradient(135deg,#623491,#9b6fc4)', color: '#e8c487', fontFamily: 'Georgia, serif', border: 'none' }}>
          <UserPlus size={13} /> Add Client
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-[14px] p-5"
        style={{ border: '1px solid rgba(98,52,145,0.1)', boxShadow: '0 2px 16px rgba(98,52,145,0.06)' }}>
        <table className="w-full">
          <thead>
            <tr>
              {['Client', 'Email', 'Tier', 'LTV', 'Coach', 'Last Activity', 'Tags'].map(h => (
                <th key={h} className="text-left text-[10px] font-bold tracking-[1.5px] uppercase pb-2 px-3"
                  style={{ color: '#9b6fc4', fontFamily: 'Georgia, serif', borderBottom: '2px solid rgba(98,52,145,0.1)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(c => (
              <tr key={c.id} className="hover:bg-[rgba(232,196,135,0.08)] cursor-pointer">
                <td className="py-[11px] px-3" style={{ borderBottom: '1px solid rgba(98,52,145,0.06)' }}>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold text-white"
                      style={{ background: 'linear-gradient(135deg,#623491,#9b6fc4)' }}>
                      {c.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="text-[12.5px] font-bold" style={{ color: '#2d1a47' }}>{c.name}</span>
                  </div>
                </td>
                <td className="py-[11px] px-3 text-[12.5px]" style={{ borderBottom: '1px solid rgba(98,52,145,0.06)', color: '#7a5ea0' }}>{c.email}</td>
                <td className="py-[11px] px-3" style={{ borderBottom: '1px solid rgba(98,52,145,0.06)' }}>
                  <span className={`pill ${c.tier === 'Wayfinder' ? 'pill-gold' : c.tier === 'Council' ? 'pill-purple' : c.tier === 'Studio' ? 'pill-blue' : 'pill-green'}`}>{c.tier}</span>
                </td>
                <td className="py-[11px] px-3 text-[12.5px] font-bold" style={{ borderBottom: '1px solid rgba(98,52,145,0.06)', color: '#b8860b' }}>${c.ltv.toLocaleString()}</td>
                <td className="py-[11px] px-3 text-[12px]" style={{ borderBottom: '1px solid rgba(98,52,145,0.06)', color: '#7a5ea0' }}>{c.coach || '—'}</td>
                <td className="py-[11px] px-3 text-[12px]" style={{ borderBottom: '1px solid rgba(98,52,145,0.06)', color: '#7a5ea0' }}>{c.lastActivity}</td>
                <td className="py-[11px] px-3" style={{ borderBottom: '1px solid rgba(98,52,145,0.06)' }}>
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
