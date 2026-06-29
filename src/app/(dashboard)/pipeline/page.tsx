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
          <div className="text-[10px] font-bold tracking-[1.8px] uppercase mb-1"
            style={{ color: '#9b6fc4', fontFamily: 'Georgia, serif' }}>
            Pipeline Value
          </div>
          <div className="text-[28px] font-bold" style={{ fontFamily: 'Georgia, serif', color: '#2d1a47' }}>
            ${pipelineValue.toLocaleString()}
          </div>
        </div>
        <div className="flex gap-2">
          {['all', 'individual', 'barktype'].map((v) => (
            <button key={v} onClick={() => setView(v as typeof view)}
              className="px-4 py-2 rounded-full text-[11.5px] font-bold transition-all cursor-pointer"
              style={{
                background: view === v ? 'linear-gradient(135deg,#623491,#9b6fc4)' : '#ede4f5',
                color: view === v ? '#e8c487' : '#623491',
                border: view === v ? 'none' : '1px solid #d6c8e4',
                fontFamily: 'Georgia, serif',
              }}>
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
            <div key={stage.key} className="bg-white rounded-[14px] p-[14px]"
              style={{ border: '1px solid #d6c8e4', boxShadow: '0 2px 12px rgba(98,52,145,0.08)' }}>
              <div className="text-[10px] font-bold tracking-[1.5px] uppercase mb-[10px] pb-2"
                style={{
                  color: '#9b6fc4',
                  fontFamily: 'Georgia, serif',
                  borderBottom: `2px solid ${stage.borderColor}`,
                }}>
                {stage.label}
                <span className="ml-2 text-[9px] px-[5px] py-[1px] rounded-full"
                  style={{ background: '#ede4f5', color: '#623491' }}>
                  {stageDeals.length}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                {stageDeals.map((deal) => (
                  <div key={deal.id} className="rounded-[10px] p-[10px] cursor-pointer transition-shadow hover:shadow-md"
                    style={{ background: '#f9f5fe', border: '1px solid #d6c8e4' }}>
                    <div className="text-[12px] font-bold" style={{ fontFamily: 'Georgia, serif', color: '#2d1a47' }}>
                      {deal.name}
                    </div>
                    <div className="text-[10.5px] italic mt-[2px]" style={{ color: '#7a5ea0' }}>
                      {deal.offer}
                    </div>
                    <div className="text-[11px] font-bold mt-1" style={{ fontFamily: 'Georgia, serif', color: '#623491' }}>
                      {deal.value}
                    </div>
                  </div>
                ))}
                {stageDeals.length === 0 && (
                  <div className="text-center py-6 text-[11px] italic" style={{ color: '#9b6fc4' }}>
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
