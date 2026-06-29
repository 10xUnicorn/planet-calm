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
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Clients', value: demoClients.length.toString(), sub: 'All tiers combined' },
          { label: 'Total LTV', value: `$${totalLTV.toLocaleString()}`, sub: 'Lifetime value' },
          { label: 'Silent Buyers', value: silentCount.toString(), sub: '90+ days inactive' },
          { label: 'Active This Week', value: (demoClients.length - silentCount).toString(), sub: 'Engaged recently' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-[14px] p-5 relative overflow-hidden"
            style={{ border: '1px solid #d6c8e4', boxShadow: '0 2px 12px rgba(98,52,145,0.08)' }}>
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
            className="w-full pl-9 pr-4 py-[10px] rounded-[12px] text-[13px] outline-none"
            style={{ border: '2px solid #d6c8e4', fontFamily: 'Georgia, serif', color: '#2d1a47', background: '#faf8fc' }} />
        </div>
        {tiers.map(t => (
          <button key={t} onClick={() => setTierFilter(t)}
            className="px-4 py-[8px] rounded-[12px] text-[11px] font-bold cursor-pointer"
            style={{
              background: tierFilter === t ? '#623491' : '#fff',
              color: tierFilter === t ? '#e8c487' : '#623491',
              fontFamily: 'Georgia, serif',
              border: tierFilter === t ? '2px solid #623491' : '2px solid #d6c8e4',
            }}>
            {t === 'all' ? 'All Tiers' : t}
          </button>
        ))}
        <button className="px-4 py-[8px] rounded-[12px] text-[11px] font-bold cursor-pointer flex items-center gap-2 ml-auto"
          style={{ background: 'linear-gradient(135deg,#623491,#9b6fc4)', color: '#e8c487', fontFamily: 'Georgia, serif', border: 'none', boxShadow: '0 4px 12px rgba(98,52,145,0.25)' }}>
          <UserPlus size={13} /> Add Client
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-[14px] p-5"
        style={{ border: '1px solid #d6c8e4', boxShadow: '0 2px 12px rgba(98,52,145,0.08)' }}>
        <table className="w-full">
          <thead>
            <tr>
              {['Client', 'Email', 'Tier', 'LTV', 'Coach', 'Last Activity', 'Tags'].map(h => (
                <th key={h} className="text-left text-[10px] font-bold tracking-[1.5px] uppercase pb-3 px-3"
                  style={{ color: '#9b6fc4', fontFamily: 'Georgia, serif', borderBottom: '2px solid #ede4f5' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(c => (
              <tr key={c.id} className="hover:bg-[#fdf8ec] cursor-pointer">
                <td className="py-3 px-3" style={{ borderBottom: '1px solid #f0e8f5' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold"
                      style={{ background: 'linear-gradient(135deg,#623491,#9b6fc4)', color: '#fff' }}>
                      {c.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="text-[13px] font-bold" style={{ color: '#2d1a47', fontFamily: 'Georgia, serif' }}>{c.name}</span>
                  </div>
                </td>
                <td className="py-3 px-3 text-[12.5px]" style={{ borderBottom: '1px solid #f0e8f5', color: '#7a5ea0' }}>{c.email}</td>
                <td className="py-3 px-3" style={{ borderBottom: '1px solid #f0e8f5' }}>
                  <span className={`pill ${c.tier === 'Wayfinder' ? 'pill-gold' : c.tier === 'Council' ? 'pill-purple' : c.tier === 'Studio' ? 'pill-blue' : 'pill-green'}`}>{c.tier}</span>
                </td>
                <td className="py-3 px-3 text-[13px] font-bold" style={{ borderBottom: '1px solid #f0e8f5', color: '#b8860b', fontFamily: 'Georgia, serif' }}>${c.ltv.toLocaleString()}</td>
                <td className="py-3 px-3 text-[12.5px]" style={{ borderBottom: '1px solid #f0e8f5', color: '#7a5ea0' }}>{c.coach || '—'}</td>
                <td className="py-3 px-3 text-[12.5px]" style={{ borderBottom: '1px solid #f0e8f5', color: '#7a5ea0' }}>{c.lastActivity}</td>
                <td className="py-3 px-3" style={{ borderBottom: '1px solid #f0e8f5' }}>
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
