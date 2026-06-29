'use client'

import { Plus, FileText, CheckCircle, Clock, Eye, ClipboardList } from 'lucide-react'

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
      <div className="flex items-center justify-between mb-6">
        <div className="text-[12px]" style={{ color: '#7a5ea0', fontFamily: 'Georgia, serif' }}>
          {reviewQueue.length} pending reviews &middot; {worksheets.length} templates
        </div>
        <button className="px-4 py-2 rounded-[12px] text-[11px] font-bold cursor-pointer flex items-center gap-2"
          style={{ background: 'linear-gradient(135deg,#623491,#9b6fc4)', color: '#e8c487', fontFamily: 'Georgia, serif', border: 'none' }}>
          <Plus size={13} /> Create Template
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Templates */}
        <div className="bg-white rounded-[14px] p-5"
          style={{ border: '1px solid #d6c8e4', boxShadow: '0 2px 12px rgba(98,52,145,0.08)' }}>
          <div className="flex items-center gap-2 text-[14px] font-bold mb-4" style={{ fontFamily: 'Georgia, serif', color: '#2d1a47' }}>
            <FileText size={16} style={{ color: '#623491' }} /> Worksheet Templates
          </div>
          {worksheets.map(w => (
            <div key={w.id} className="flex items-center justify-between py-3 cursor-pointer"
              style={{ borderBottom: '1px solid #f0e8f5' }}>
              <div>
                <div className="text-[12.5px] font-bold" style={{ fontFamily: 'Georgia, serif', color: '#2d1a47' }}>{w.title}</div>
                <div className="flex gap-2 mt-1">
                  <span className="tag">{w.tier}</span>
                  <span className="text-[10px]" style={{ color: '#9b6fc4' }}>{w.submissions} submissions</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 text-[10px]" style={{ color: '#2a9d5c' }}>
                  <CheckCircle size={11} /> {w.reviewed}
                </span>
                {w.pending > 0 && (
                  <span className="flex items-center gap-1 text-[10px]" style={{ color: '#9a6800' }}>
                    <Clock size={11} /> {w.pending}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Review Queue */}
        <div className="bg-white rounded-[14px] p-5"
          style={{ border: '1px solid #d6c8e4', boxShadow: '0 2px 12px rgba(98,52,145,0.08)' }}>
          <div className="flex items-center gap-2 text-[14px] font-bold mb-4" style={{ fontFamily: 'Georgia, serif', color: '#2d1a47' }}>
            <ClipboardList size={16} style={{ color: '#623491' }} /> Coach Review Queue
          </div>
          {reviewQueue.map(r => (
            <div key={r.id} className="flex items-center justify-between py-3 cursor-pointer hover:bg-[#fdf8ec] rounded-lg px-2"
              style={{ borderBottom: '1px solid #f0e8f5' }}>
              <div>
                <div className="text-[12.5px] font-bold" style={{ fontFamily: 'Georgia, serif', color: '#2d1a47' }}>{r.client}</div>
                <div className="text-[11px] italic" style={{ color: '#7a5ea0' }}>{r.worksheet}</div>
                <div className="flex gap-2 mt-1">
                  <span className="tag">{r.tier}</span>
                  <span className="text-[10px]" style={{ color: '#9b6fc4' }}>{r.submitted}</span>
                </div>
              </div>
              <button className="flex items-center gap-1 px-3 py-[6px] rounded-[12px] text-[10.5px] font-bold cursor-pointer"
                style={{ background: '#ede4f5', color: '#623491', fontFamily: 'Georgia, serif', border: '1.5px solid #d6c8e4' }}>
                <Eye size={11} /> Review
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
