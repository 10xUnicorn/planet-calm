'use client'

import { useState } from 'react'
import { pipelineDeals } from '@/lib/demo-data'

const stages = [
  { key: 'new_inquiry', label: 'New Inquiry', borderColor: '#e8c487' },
  { key: 'discovery_call_booked', label: 'Discovery Call', borderColor: '#9b6fc4' },
  { key: 'proposal_sent', label: 'Proposal Sent', borderColor: '#623491' },
  { key: 'contract_out', label: 'Contract Out', borderColor: '#2a9d5c' },
  { key: 'won', label: 'Won', borderColor: '#1e7d47' },
]

export default function PipelinePage() {
  const [deals, setDeals] = useState(pipelineDeals)
  const [view, setView] = useState<'all' | 'individual' | 'barktype'>('all')

  const filteredDeals = view === 'all' ? deals : deals.filter(d =>
    view === 'barktype' ? d.offer.toLowerCase().includes('bark') : !d.offer.toLowerCase().includes('bark')
  )

  const pipelineValue = deals
    .filter(d => d.stage !== 'won' && d.stage !== 'lost')
    .reduce((sum, d) => sum + parseFloat(d.value.replace(/[$,/mo]/g, '')), 0)

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div style={{ color: '#9b6fc4', fontFamily: 'Georgia, serif', fontSize: '10px', fontWeight: 700, letterSpacing: '1.8px', textTransform: 'uppercase', marginBottom: '4px' }}>
            Pipeline Value
          </div>
          <div style={{ fontFamily: 'Georgia, serif', color: '#2d1a47', fontSize: '28px', fontWeight: 700 }}>
            ${pipelineValue.toLocaleString()}
          </div>
        </div>
        <div className="flex gap-2">
          {['all', 'individual', 'barktype'].map((v) => (
            <button key={v} onClick={() => setView(v as typeof view)}
              className={view === v ? 'page-tab page-tab-active' : 'page-tab'}
              style={{ padding: '8px 16px', fontSize: '11.5px' }}>
              {v === 'all' ? 'All Deals' : v === 'individual' ? 'Individual' : 'BARKType Orgs'}
            </button>
          ))}
        </div>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-5 gap-3">
        {stages.map((stage) => {
          const stageDeals = filteredDeals.filter(d => d.stage === stage.key)
          return (
            <div key={stage.key} className="card" style={{ padding: '14px' }}>
              <div style={{
                color: '#9b6fc4',
                fontFamily: 'Georgia, serif',
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                marginBottom: '10px',
                paddingBottom: '8px',
                borderBottom: `2px solid ${stage.borderColor}`,
              }}>
                {stage.label}
                <span style={{
                  marginLeft: '8px',
                  fontSize: '9px',
                  padding: '1px 5px',
                  borderRadius: '9999px',
                  background: 'rgba(98,52,145,0.08)',
                  color: '#623491',
                }}>
                  {stageDeals.length}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                {stageDeals.map((deal) => (
                  <div key={deal.id} style={{
                    borderRadius: '10px',
                    padding: '10px',
                    cursor: 'pointer',
                    background: '#f9f5fe',
                    border: '1px solid rgba(98,52,145,0.1)',
                    transition: 'box-shadow .18s',
                  }}>
                    <div style={{ fontFamily: 'Georgia, serif', color: '#2d1a47', fontSize: '12px', fontWeight: 700 }}>
                      {deal.name}
                    </div>
                    <div style={{ color: '#7a5ea0', fontSize: '10.5px', fontStyle: 'italic', marginTop: '2px' }}>
                      {deal.offer}
                    </div>
                    <div style={{ fontFamily: 'Georgia, serif', color: '#623491', fontSize: '11px', fontWeight: 700, marginTop: '4px' }}>
                      {deal.value}
                    </div>
                  </div>
                ))}
                {stageDeals.length === 0 && (
                  <div style={{ textAlign: 'center', padding: '24px 0', fontSize: '11px', fontStyle: 'italic', color: '#9b6fc4' }}>
                    No deals
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
