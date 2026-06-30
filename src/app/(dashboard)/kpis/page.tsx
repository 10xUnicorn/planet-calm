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
              className={range === r ? 'page-tab page-tab-active' : 'page-tab'}
              style={{ fontSize: '10.5px', padding: '7px 12px' }}>
              {r}
            </button>
          ))}
        </div>
        <button className="section-action flex items-center gap-1">
          <Download size={12} /> Export All
        </button>
      </div>

      {/* Revenue KPIs */}
      <div style={{ color: '#9b6fc4', fontFamily: 'Georgia, serif', fontSize: '12px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '12px' }}>Revenue</div>
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: 'MRR', value: '$17,671', trend: '↑ 12%', up: true },
          { label: 'ARR', value: '$127,840', trend: '↑ 18.4%', up: true },
          { label: 'New Revenue', value: '$8,240', trend: '↑ This period', up: true },
          { label: 'Churned Revenue', value: '$1,420', trend: '↓ 2.1%', up: false },
        ].map(k => (
          <div key={k.label} className="kpi-card">
            <div style={{ color: '#9b6fc4', fontFamily: 'Georgia, serif', fontSize: '10px', fontWeight: 700, letterSpacing: '1.8px', textTransform: 'uppercase', marginBottom: '8px' }}>{k.label}</div>
            <div style={{ fontFamily: 'Georgia, serif', color: '#2d1a47', fontSize: '24px', fontWeight: 700 }}>{k.value}</div>
            <div style={{ fontSize: '11px', marginTop: '4px', color: k.up ? '#2a9d5c' : '#c0392b' }}>{k.trend}</div>
          </div>
        ))}
      </div>

      {/* Funnel KPIs */}
      <div style={{ color: '#9b6fc4', fontFamily: 'Georgia, serif', fontSize: '12px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '12px' }}>Funnel</div>
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Leads Generated', value: '342', trend: '↑ 24%' },
          { label: 'Quiz Completions', value: '189', trend: '55% of leads' },
          { label: 'Ebook Purchases', value: '67', trend: '35% conversion' },
          { label: 'Tier Conversions', value: '23', trend: '12% to paid' },
        ].map(k => (
          <div key={k.label} className="kpi-card">
            <div style={{ color: '#9b6fc4', fontFamily: 'Georgia, serif', fontSize: '10px', fontWeight: 700, letterSpacing: '1.8px', textTransform: 'uppercase', marginBottom: '8px' }}>{k.label}</div>
            <div style={{ fontFamily: 'Georgia, serif', color: '#2d1a47', fontSize: '24px', fontWeight: 700 }}>{k.value}</div>
            <div style={{ fontSize: '11px', marginTop: '4px', color: '#2a9d5c' }}>{k.trend}</div>
          </div>
        ))}
      </div>

      {/* BARKType + Affiliate KPIs */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <div style={{ color: '#9b6fc4', fontFamily: 'Georgia, serif', fontSize: '12px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '12px' }}>BARKType</div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Pipeline Value', value: '$84K' },
              { label: 'Orgs Contracted', value: '2' },
              { label: 'Cohorts Active', value: '2' },
              { label: 'Certifications', value: '8' },
            ].map(k => (
              <div key={k.label} className="kpi-card">
                <div style={{ color: '#9b6fc4', fontFamily: 'Georgia, serif', fontSize: '10px', fontWeight: 700, letterSpacing: '1.8px', textTransform: 'uppercase', marginBottom: '8px' }}>{k.label}</div>
                <div style={{ fontFamily: 'Georgia, serif', color: '#2d1a47', fontSize: '24px', fontWeight: 700 }}>{k.value}</div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div style={{ color: '#9b6fc4', fontFamily: 'Georgia, serif', fontSize: '12px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '12px' }}>Affiliates</div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Active Affiliates', value: '34' },
              { label: 'YTD Commissions', value: '$5,900' },
              { label: 'Top GMV', value: '$5,100' },
              { label: 'Lapsed Count', value: '134' },
            ].map(k => (
              <div key={k.label} className="kpi-card">
                <div style={{ color: '#9b6fc4', fontFamily: 'Georgia, serif', fontSize: '10px', fontWeight: 700, letterSpacing: '1.8px', textTransform: 'uppercase', marginBottom: '8px' }}>{k.label}</div>
                <div style={{ fontFamily: 'Georgia, serif', color: '#2d1a47', fontSize: '24px', fontWeight: 700 }}>{k.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
