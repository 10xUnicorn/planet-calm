'use client'

import { useState } from 'react'
import { demoLeads } from '@/lib/demo-data'
import { Search, Download, UserPlus } from 'lucide-react'

export default function LeadsPage() {
  const [search, setSearch] = useState('')
  const [sourceFilter, setSourceFilter] = useState('all')

  const sources = ['all', ...new Set(demoLeads.map(l => l.source))]
  const filtered = demoLeads.filter(l =>
    (sourceFilter === 'all' || l.source === sourceFilter) &&
    (search === '' || l.name.toLowerCase().includes(search.toLowerCase()) || l.email.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div>
      {/* Controls */}
      <div className="flex items-center gap-3 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#9b6fc4' }} />
          <input
            type="text"
            placeholder="Search leads..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-[9px] rounded-xl text-[12.5px] outline-none"
            style={{ border: '2px solid #d6c8e4', fontFamily: 'Georgia, serif', color: '#2d1a47' }}
          />
        </div>
        <div className="flex gap-2">
          {sources.map(s => (
            <button key={s} onClick={() => setSourceFilter(s)}
              className="px-3 py-[7px] rounded-full text-[10.5px] font-bold cursor-pointer transition-all"
              style={{
                background: sourceFilter === s ? '#623491' : '#ede4f5',
                color: sourceFilter === s ? '#e8c487' : '#623491',
                fontFamily: 'Georgia, serif',
                border: sourceFilter === s ? 'none' : '1.5px solid #d6c8e4',
              }}>
              {s === 'all' ? 'All Sources' : s}
            </button>
          ))}
        </div>
        <button className="px-4 py-[8px] rounded-full text-[11px] font-bold cursor-pointer flex items-center gap-2"
          style={{ background: 'linear-gradient(135deg,#623491,#9b6fc4)', color: '#e8c487', fontFamily: 'Georgia, serif', border: 'none' }}>
          <UserPlus size={13} /> Add Lead
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-[14px] p-5"
        style={{ border: '1px solid #d6c8e4', boxShadow: '0 2px 12px rgba(98,52,145,0.08)' }}>
        <div className="flex items-center justify-between mb-4">
          <div className="text-[14px] font-bold" style={{ fontFamily: 'Georgia, serif', color: '#2d1a47' }}>
            {filtered.length} Leads
          </div>
          <button className="flex items-center gap-1 text-[11px] underline cursor-pointer" style={{ color: '#623491' }}>
            <Download size={12} /> Export CSV
          </button>
        </div>
        <table className="w-full">
          <thead>
            <tr>
              {['Name', 'Email', 'Source', 'BARKType Result', 'Score', 'Stage'].map(h => (
                <th key={h} className="text-left text-[10px] font-bold tracking-[1.5px] uppercase pb-2 px-3"
                  style={{ color: '#9b6fc4', fontFamily: 'Georgia, serif', borderBottom: '2px solid #ede4f5' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((lead) => (
              <tr key={lead.id} className="hover:bg-[#fdf8ec] cursor-pointer">
                <td className="py-[11px] px-3 text-[12.5px] font-bold" style={{ borderBottom: '1px solid #f0e8f5', color: '#2d1a47' }}>
                  {lead.name}
                </td>
                <td className="py-[11px] px-3 text-[12.5px]" style={{ borderBottom: '1px solid #f0e8f5', color: '#7a5ea0' }}>
                  {lead.email}
                </td>
                <td className="py-[11px] px-3" style={{ borderBottom: '1px solid #f0e8f5' }}>
                  <span className="tag">{lead.source}</span>
                </td>
                <td className="py-[11px] px-3 text-[12px] italic" style={{ borderBottom: '1px solid #f0e8f5', color: '#623491' }}>
                  {lead.barkType || '—'}
                </td>
                <td className="py-[11px] px-3" style={{ borderBottom: '1px solid #f0e8f5' }}>
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-[5px] rounded-full overflow-hidden" style={{ background: 'rgba(98,52,145,0.12)' }}>
                      <div className="h-full rounded-full" style={{
                        width: `${lead.score}%`,
                        background: lead.score >= 70 ? '#2a9d5c' : lead.score >= 40 ? '#e8c487' : '#9b6fc4',
                      }} />
                    </div>
                    <span className="text-[11px] font-bold" style={{ color: '#623491' }}>{lead.score}</span>
                  </div>
                </td>
                <td className="py-[11px] px-3" style={{ borderBottom: '1px solid #f0e8f5' }}>
                  <span className={`pill ${lead.stage === 'Hot Lead' ? 'pill-red' : lead.stage === 'Qualified' ? 'pill-green' : lead.stage === 'Nurturing' ? 'pill-amber' : 'pill-purple'}`}>
                    {lead.stage}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
