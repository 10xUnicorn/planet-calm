'use client'

import { demoCohorts } from '@/lib/demo-data'
import { Plus, Users, Award, Calendar } from 'lucide-react'

export default function CohortPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="text-[12px]" style={{ color: '#7a5ea0', fontFamily: 'Georgia, serif' }}>
          {demoCohorts.length} cohorts · {demoCohorts.reduce((s, c) => s + c.members, 0)} total members
        </div>
        <button className="px-4 py-2 rounded-full text-[11px] font-bold cursor-pointer flex items-center gap-2"
          style={{ background: 'linear-gradient(135deg,#623491,#9b6fc4)', color: '#e8c487', fontFamily: 'Georgia, serif', border: 'none' }}>
          <Plus size={13} /> New Cohort
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {demoCohorts.map(c => (
          <div key={c.id} className="bg-white rounded-[14px] p-5 cursor-pointer transition-shadow hover:shadow-lg"
            style={{ border: '1px solid rgba(98,52,145,0.1)', boxShadow: '0 2px 16px rgba(98,52,145,0.06)' }}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="text-[14px] font-bold" style={{ fontFamily: 'Georgia, serif', color: '#2d1a47' }}>
                  {c.name}
                </div>
                {c.org && (
                  <div className="text-[11px] italic mt-1" style={{ color: '#7a5ea0' }}>{c.org}</div>
                )}
              </div>
              <div className="flex gap-1">
                <span className={`pill ${c.status === 'active' ? 'pill-green' : c.status === 'enrolling' ? 'pill-amber' : 'pill-purple'}`}>
                  {c.status}
                </span>
                {c.isPilot && <span className="pill pill-gold">PILOT</span>}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-3">
              <div className="flex items-center gap-2 text-[11px]" style={{ color: '#623491' }}>
                <Users size={13} /> {c.members} members
              </div>
              <div className="flex items-center gap-2 text-[11px]" style={{ color: '#623491' }}>
                <Calendar size={13} /> {c.start}
              </div>
              {c.level && (
                <div className="flex items-center gap-2 text-[11px]" style={{ color: '#623491' }}>
                  <Award size={13} /> {c.level}
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <span className="tag">{c.type}</span>
              {c.level && <span className="tag">{c.level}</span>}
            </div>

            {/* Progress heatmap placeholder */}
            <div className="mt-3 flex gap-1">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-3 flex-1 rounded-sm"
                  style={{
                    background: i < Math.floor(Math.random() * 8) + 1
                      ? `rgba(98,52,145,${0.15 + Math.random() * 0.6})`
                      : 'rgba(98,52,145,0.06)',
                  }} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
