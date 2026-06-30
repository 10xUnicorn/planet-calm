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
      <div className="rounded-[14px] p-6 mb-6 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg,#2d1a47 0%,#623491 60%,#9b6fc4 100%)' }}>
        <div className="absolute right-8 top-1/2 -translate-y-1/2 text-[48px] opacity-15">
          📖
        </div>
        <div className="flex items-center gap-2 mb-2">
          <h2 className="text-[18px] font-bold" style={{ fontFamily: 'Georgia, serif', color: '#e8c487' }}>
            📖 &quot;What the BARK?&quot; &mdash; Book Launch Content
          </h2>
          <span className="pill pill-amber">Sept 2026</span>
        </div>
        <p className="text-[12px]" style={{ color: 'rgba(255,255,255,0.75)', fontFamily: 'Georgia, serif' }}>
          348 pre-sales &middot; 54% Substack growth &middot; Chapter previews releasing weekly
        </p>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3 mb-4">
        <div className="relative flex-1 max-w-sm">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#9b6fc4' }} />
          <input type="text" placeholder="Search content..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-[9px] rounded-xl text-[12.5px] outline-none"
            style={{ border: '1px solid rgba(98,52,145,0.2)', fontFamily: 'Georgia, serif', color: '#2d1a47' }} />
        </div>
        {types.map(t => (
          <button key={t} onClick={() => setTypeFilter(t)}
            className="px-3 py-[7px] rounded-full text-[10.5px] font-bold cursor-pointer"
            style={{
              background: typeFilter === t ? '#623491' : 'rgba(98,52,145,0.08)',
              color: typeFilter === t ? '#e8c487' : '#623491',
              fontFamily: 'Georgia, serif',
              border: typeFilter === t ? 'none' : '1px solid rgba(98,52,145,0.15)',
            }}>
            {t === 'all' ? 'All Types' : t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
        <button className="px-4 py-[8px] rounded-full text-[11px] font-bold cursor-pointer flex items-center gap-2 ml-auto"
          style={{ background: 'linear-gradient(135deg,#623491,#9b6fc4)', color: '#e8c487', fontFamily: 'Georgia, serif', border: 'none' }}>
          <Plus size={13} /> Add Content
        </button>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-3 gap-4">
        {filtered.map(item => (
          <div key={item.id} className="bg-white rounded-[14px] p-5 cursor-pointer transition-shadow hover:shadow-lg"
            style={{ border: '1px solid rgba(98,52,145,0.1)', boxShadow: '0 2px 16px rgba(98,52,145,0.06)' }}>
            <div className="flex items-start justify-between mb-3">
              <div className="p-2 rounded-lg text-[16px]" style={{ background: 'rgba(98,52,145,0.08)' }}>
                {typeIcons[item.type]}
              </div>
              <span className={`pill ${item.published ? 'pill-green' : 'pill-amber'}`}>
                {item.published ? 'Published' : 'Draft'}
              </span>
            </div>
            <div className="text-[13px] font-bold mb-2" style={{ fontFamily: 'Georgia, serif', color: '#2d1a47' }}>
              {item.title}
            </div>
            <div className="text-[10.5px] italic mb-3" style={{ color: '#7a5ea0' }}>
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
