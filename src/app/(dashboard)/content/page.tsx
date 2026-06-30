'use client'

import { useState } from 'react'
import { demoContent } from '@/lib/demo-data'
import { Search, Plus } from 'lucide-react'

const typeIcons: Record<string, string> = {
  video: '🎥',
  pdf: '📄',
  audio: '🎧',
  template: '📐',
  link: '🔗',
  course: '📖',
}

export default function ContentPage() {
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')

  const types = ['all', ...new Set(demoContent.map(c => c.type))]
  const filtered = demoContent.filter(c =>
    (typeFilter === 'all' || c.type === typeFilter) &&
    (search === '' || c.title.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div>
      {/* Book Launch Banner */}
      <div className="mb-6" style={{
        borderRadius: '14px',
        padding: '24px',
        background: 'linear-gradient(135deg,#2d1a47 0%,#623491 60%,#9b6fc4 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          right: '32px',
          top: '50%',
          transform: 'translateY(-50%)',
          fontSize: '48px',
          opacity: 0.15,
        }}>
          📖
        </div>
        <div className="flex items-center gap-2" style={{ marginBottom: '8px' }}>
          <h2 style={{ fontFamily: 'Georgia, serif', color: '#e8c487', fontSize: '18px', fontWeight: 700 }}>
            📖 &quot;What the BARK?&quot; &mdash; Book Launch Content
          </h2>
          <span className="pill pill-amber">Sept 2026</span>
        </div>
        <p style={{ color: 'rgba(255,255,255,0.75)', fontFamily: 'Georgia, serif', fontSize: '12px' }}>
          348 pre-sales &middot; 54% Substack growth &middot; Chapter previews releasing weekly
        </p>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3 mb-4">
        <div className="search-bar" style={{ flex: 1 }}>
          <Search size={14} style={{
            color: '#9b6fc4',
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
          }} />
          <input type="text" placeholder="Search content..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        {types.map(t => (
          <button key={t} onClick={() => setTypeFilter(t)}
            className={typeFilter === t ? 'page-tab page-tab-active' : 'page-tab'}
            style={{ fontSize: '10.5px', padding: '7px 12px' }}>
            {t === 'all' ? 'All Types' : t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
        <button className="btn-primary flex items-center gap-2" style={{ marginLeft: 'auto', padding: '8px 16px', fontSize: '11px', borderRadius: '9999px' }}>
          <Plus size={13} /> Add Content
        </button>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-3 gap-4">
        {filtered.map(item => (
          <div key={item.id} className="card" style={{ cursor: 'pointer', transition: 'box-shadow .18s' }}>
            <div className="flex items-start justify-between" style={{ marginBottom: '12px' }}>
              <div style={{ padding: '8px', borderRadius: '8px', fontSize: '16px', background: 'rgba(98,52,145,0.08)' }}>
                {typeIcons[item.type]}
              </div>
              <span className={`pill ${item.published ? 'pill-green' : 'pill-amber'}`}>
                {item.published ? 'Published' : 'Draft'}
              </span>
            </div>
            <div style={{ fontFamily: 'Georgia, serif', color: '#2d1a47', fontSize: '13px', fontWeight: 700, marginBottom: '8px' }}>
              {item.title}
            </div>
            <div style={{ color: '#7a5ea0', fontSize: '10.5px', fontStyle: 'italic', marginBottom: '12px' }}>
              {item.collection}
            </div>
            <div className="flex flex-wrap gap-1">
              {item.tier.slice(0, 3).map((t, i) => (
                <span key={i} className="tag">{t.replace('client_', '')}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
