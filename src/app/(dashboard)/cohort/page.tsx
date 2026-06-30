'use client'

import { demoCohorts } from '@/lib/demo-data'
import { Plus, Users, Award, Calendar } from 'lucide-react'

export default function CohortPage() {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div style={{ fontSize: '12px', color: '#7a5ea0', fontFamily: 'Georgia, serif' }}>
          {demoCohorts.length} cohorts · {demoCohorts.reduce((s, c) => s + c.members, 0)} total members
        </div>
        <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Plus size={13} /> New Cohort
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        {demoCohorts.map(c => (
          <div key={c.id} className="card" style={{ cursor: 'pointer', transition: 'box-shadow 0.2s' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div>
                <div className="section-title">
                  {c.name}
                </div>
                {c.org && (
                  <div style={{ fontSize: '11px', fontStyle: 'italic', marginTop: '4px', color: '#7a5ea0' }}>{c.org}</div>
                )}
              </div>
              <div style={{ display: 'flex', gap: '4px' }}>
                <span className={`pill ${c.status === 'active' ? 'pill-green' : c.status === 'enrolling' ? 'pill-amber' : 'pill-purple'}`}>
                  {c.status}
                </span>
                {c.isPilot && <span className="pill pill-gold">PILOT</span>}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: '#623491' }}>
                <Users size={13} /> {c.members} members
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: '#623491' }}>
                <Calendar size={13} /> {c.start}
              </div>
              {c.level && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: '#623491' }}>
                  <Award size={13} /> {c.level}
                </div>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="tag">{c.type}</span>
              {c.level && <span className="tag">{c.level}</span>}
            </div>

            {/* Progress heatmap */}
            <div style={{ marginTop: '12px', display: 'flex', gap: '4px' }}>
              {Array.from({ length: 8 }).map((_, i) => {
                const seed = (parseInt(c.id) * 7 + i * 13) % 10
                const filled = seed > 3
                return (
                  <div key={i} style={{
                    height: '12px',
                    flex: 1,
                    borderRadius: '2px',
                    background: filled
                      ? `rgba(98,52,145,${0.2 + (seed / 10) * 0.5})`
                      : 'rgba(98,52,145,0.06)',
                  }} />
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
