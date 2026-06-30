'use client'

import { Plus, CheckCircle, Clock, Eye } from 'lucide-react'

const worksheets = [
  { id: '1', title: 'Calm Anchoring Foundations', submissions: 14, reviewed: 10, pending: 4, tier: 'Studio' },
  { id: '2', title: 'BARKType Self-Assessment', submissions: 8, reviewed: 8, pending: 0, tier: 'BARKType' },
  { id: '3', title: 'Weekly Calm Check-In', submissions: 42, reviewed: 35, pending: 7, tier: 'All' },
  { id: '4', title: 'Leadership Reflection \u2014 Module 3', submissions: 6, reviewed: 3, pending: 3, tier: 'Council' },
  { id: '5', title: 'Dog Behavior Journal', submissions: 22, reviewed: 18, pending: 4, tier: 'Collective' },
]

const reviewQueue = [
  { id: '1', client: 'Marisol Vega', worksheet: 'Weekly Calm Check-In', submitted: '2 hours ago', tier: 'Collective' },
  { id: '2', client: 'Trevor Kim', worksheet: 'Calm Anchoring Foundations', submitted: '5 hours ago', tier: 'Studio' },
  { id: '3', client: 'Dr. Peter Wang', worksheet: 'Leadership Reflection \u2014 Module 3', submitted: '1 day ago', tier: 'Council' },
  { id: '4', client: 'Linnae Reed', worksheet: 'Dog Behavior Journal', submitted: '1 day ago', tier: 'Collective' },
]

export default function WorksheetsPage() {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div style={{ fontSize: '12px', color: '#7a5ea0', fontFamily: 'Georgia, serif' }}>
          {reviewQueue.length} pending reviews &middot; {worksheets.length} templates
        </div>
        <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Plus size={13} /> Create Template
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
        {/* Templates */}
        <div className="card">
          <div className="section-title" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            📝 Worksheet Templates
          </div>
          {worksheets.map(w => (
            <div key={w.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', cursor: 'pointer', borderBottom: '1px solid rgba(98,52,145,0.06)' }}>
              <div>
                <div style={{ fontSize: '12.5px', fontWeight: 700, fontFamily: 'Georgia, serif', color: '#2d1a47' }}>{w.title}</div>
                <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                  <span className="tag">{w.tier}</span>
                  <span style={{ fontSize: '10px', color: '#9b6fc4' }}>{w.submissions} submissions</span>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '10px', color: '#2a9d5c' }}>
                  <CheckCircle size={11} /> {w.reviewed}
                </span>
                {w.pending > 0 && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '10px', color: '#9a6800' }}>
                    <Clock size={11} /> {w.pending}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Review Queue */}
        <div className="card">
          <div className="section-title" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            📋 Coach Review Queue
          </div>
          {reviewQueue.map(r => (
            <div key={r.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 8px', cursor: 'pointer', borderBottom: '1px solid rgba(98,52,145,0.06)', borderRadius: '8px', transition: 'background 0.18s' }}>
              <div>
                <div style={{ fontSize: '12.5px', fontWeight: 700, fontFamily: 'Georgia, serif', color: '#2d1a47' }}>{r.client}</div>
                <div style={{ fontSize: '11px', fontStyle: 'italic', color: '#7a5ea0' }}>{r.worksheet}</div>
                <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                  <span className="tag">{r.tier}</span>
                  <span style={{ fontSize: '10px', color: '#9b6fc4' }}>{r.submitted}</span>
                </div>
              </div>
              <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '6px 12px', fontSize: '10.5px' }}>
                <Eye size={11} /> Review
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
