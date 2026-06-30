'use client'

import { useState } from 'react'
import { Download } from 'lucide-react'

export default function KPIsPage() {
  const [range, setRange] = useState('30d')

  return (
    <div>
      {/* Controls */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-2">
          {['7d', '30d', '90d', 'YTD', 'Custom'].map(r => (
            <button key={r} onClick={() => setRange(r)}
              className="px-3 py-[7px] rounded-full text-[10.5px] font-bold cursor-pointer"
              style={{
                background: range === r ? '#623491' : 'rgba(98,52,145,0.08)',
                color: range === r ? '#e8c487' : '#623491',
                fontFamily: 'Georgia, serif',
                border: range === r ? 'none' : '1px solid rgba(98,52,145,0.15)',
              }}>
              {r}
            </button>
          ))}
        </div>
        <button className="flex items-center gap-1 text-[11px] underline cursor-pointer" style={{ color: '#623491' }}>
          <Download size={12} /> Export All
        </button>
      </div>

      {/* Revenue KPIs */}
      <div className="text-[12px] font-bold tracking-[1.5px] uppercase mb-3" style={{ color: '#9b6fc4', fontFamily: 'Georgia, serif' }}>Revenue</div>
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: 'MRR', value: '$17,671', trend: '↑ 12%', up: true },
          { label: 'ARR', value: '$127,840', trend: '↑ 18.4%', up: true },
          { label: 'New Revenue', value: '$8,240', trend: '↑ This period', up: true },
          { label: 'Churned Revenue', value: '$1,420', trend: '↓ 2.1%', up: false },
        ].map(k => (
          <div key={k.label} className="bg-white rounded-[14px] p-5 relative overflow-hidden"
            style={{ border: '1px solid rgba(98,52,145,0.1)', boxShadow: '0 2px 16px rgba(98,52,145,0.06)' }}>
            <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: 'linear-gradient(90deg,#623491,#e8c487)' }} />
            <div className="text-[10px] font-bold tracking-[1.8px] uppercase mb-2" style={{ color: '#9b6fc4', fontFamily: 'Georgia, serif' }}>{k.label}</div>
            <div className="text-[24px] font-bold" style={{ fontFamily: 'Georgia, serif', color: '#2d1a47' }}>{k.value}</div>
            <div className={`text-[11px] mt-1 ${k.up ? 'text-[#2a9d5c]' : 'text-[#c0392b]'}`}>{k.trend}</div>
          </div>
        ))}
      </div>

      {/* Funnel KPIs */}
      <div className="text-[12px] font-bold tracking-[1.5px] uppercase mb-3" style={{ color: '#9b6fc4', fontFamily: 'Georgia, serif' }}>Funnel</div>
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Leads Generated', value: '342', trend: '↑ 24%' },
          { label: 'Quiz Completions', value: '189', trend: '55% of leads' },
          { label: 'Ebook Purchases', value: '67', trend: '35% conversion' },
          { label: 'Tier Conversions', value: '23', trend: '12% to paid' },
        ].map(k => (
          <div key={k.label} className="bg-white rounded-[14px] p-5 relative overflow-hidden"
            style={{ border: '1px solid rgba(98,52,145,0.1)', boxShadow: '0 2px 16px rgba(98,52,145,0.06)' }}>
            <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: 'linear-gradient(90deg,#623491,#e8c487)' }} />
            <div className="text-[10px] font-bold tracking-[1.8px] uppercase mb-2" style={{ color: '#9b6fc4', fontFamily: 'Georgia, serif' }}>{k.label}</div>
            <div className="text-[24px] font-bold" style={{ fontFamily: 'Georgia, serif', color: '#2d1a47' }}>{k.value}</div>
            <div className="text-[11px] mt-1 text-[#2a9d5c]">{k.trend}</div>
          </div>
        ))}
      </div>

      {/* BARKType + Affiliate KPIs */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <div className="text-[12px] font-bold tracking-[1.5px] uppercase mb-3" style={{ color: '#9b6fc4', fontFamily: 'Georgia, serif' }}>BARKType</div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Pipeline Value', value: '$84K' },
              { label: 'Orgs Contracted', value: '2' },
              { label: 'Cohorts Active', value: '2' },
              { label: 'Certifications', value: '8' },
            ].map(k => (
              <div key={k.label} className="bg-white rounded-[14px] p-5 relative overflow-hidden"
                style={{ border: '1px solid rgba(98,52,145,0.1)', boxShadow: '0 2px 16px rgba(98,52,145,0.06)' }}>
                <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: 'linear-gradient(90deg,#623491,#e8c487)' }} />
                <div className="text-[10px] font-bold tracking-[1.8px] uppercase mb-2" style={{ color: '#9b6fc4', fontFamily: 'Georgia, serif' }}>{k.label}</div>
                <div className="text-[24px] font-bold" style={{ fontFamily: 'Georgia, serif', color: '#2d1a47' }}>{k.value}</div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="text-[12px] font-bold tracking-[1.5px] uppercase mb-3" style={{ color: '#9b6fc4', fontFamily: 'Georgia, serif' }}>Affiliates</div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Active Affiliates', value: '34' },
              { label: 'YTD Commissions', value: '$5,900' },
              { label: 'Top GMV', value: '$5,100' },
              { label: 'Lapsed Count', value: '134' },
            ].map(k => (
              <div key={k.label} className="bg-white rounded-[14px] p-5 relative overflow-hidden"
                style={{ border: '1px solid rgba(98,52,145,0.1)', boxShadow: '0 2px 16px rgba(98,52,145,0.06)' }}>
                <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: 'linear-gradient(90deg,#623491,#e8c487)' }} />
                <div className="text-[10px] font-bold tracking-[1.8px] uppercase mb-2" style={{ color: '#9b6fc4', fontFamily: 'Georgia, serif' }}>{k.label}</div>
                <div className="text-[24px] font-bold" style={{ fontFamily: 'Georgia, serif', color: '#2d1a47' }}>{k.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
