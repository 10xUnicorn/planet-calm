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
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <div className="search-bar" style={{ flex: 1 }}>
          <Search size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9b6fc4', zIndex: 1 }} />
          <input type="text" placeholder="Search leads..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          {sources.map(s => (
            <button key={s} onClick={() => setSourceFilter(s)}
              className={`page-tab ${sourceFilter === s ? 'active' : ''}`}>
              {s === 'all' ? 'All Sources' : s}
            </button>
          ))}
        </div>
        <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <UserPlus size={13} /> Add Lead
        </button>
      </div>

      {/* Table */}
      <div className="card">
        <div className="section-hd">
          <div className="section-title">
            {filtered.length} Leads
          </div>
          <button className="section-action" style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'none', border: 'none' }}>
            <Download size={12} /> Export CSV
          </button>
        </div>
        <table>
          <thead>
            <tr>
              {['Name', 'Email', 'Source', 'BARKType Result', 'Score', 'Stage'].map(h => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((lead) => (
              <tr key={lead.id} style={{ cursor: 'pointer' }}>
                <td style={{ fontWeight: 700, color: '#2d1a47' }}>
                  {lead.name}
                </td>
                <td style={{ color: '#7a5ea0' }}>
                  {lead.email}
                </td>
                <td>
                  <span className="tag">{lead.source}</span>
                </td>
                <td style={{ fontStyle: 'italic', color: '#623491', fontSize: '12px' }}>
                  {lead.barkType || '—'}
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div className="progress-bar" style={{ width: '48px', marginTop: 0 }}>
                      <div className="progress-fill" style={{
                        width: `${lead.score}%`,
                        background: lead.score >= 70 ? '#2a9d5c' : lead.score >= 40 ? '#e8c487' : '#9b6fc4',
                      }} />
                    </div>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#623491' }}>{lead.score}</span>
                  </div>
                </td>
                <td>
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
