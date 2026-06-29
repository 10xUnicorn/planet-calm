'use client'

import { revenueByOffer } from '@/lib/demo-data'
import { CreditCard } from 'lucide-react'

const recentPayments = [
  { id: '1', client: 'Rachel Nguyen', amount: '$6,000', offer: 'Calm Council', date: 'Jun 24, 2026', status: 'succeeded' },
  { id: '2', client: 'Marisol Vega', amount: '$49', offer: 'Peaceful Paws Collective', date: 'Jun 23, 2026', status: 'succeeded' },
  { id: '3', client: 'Trevor Kim', amount: '$275', offer: 'Progress Studio', date: 'Jun 22, 2026', status: 'succeeded' },
  { id: '4', client: 'David Torres', amount: '$275', offer: 'Progress Studio', date: 'Jun 20, 2026', status: 'failed' },
  { id: '5', client: 'Sandra Flynn', amount: '$25,000', offer: 'Wayfinder Experience', date: 'Jun 15, 2026', status: 'succeeded' },
  { id: '6', client: 'SF SPCA', amount: '$5,000', offer: 'BARKType Pilot', date: 'Jun 10, 2026', status: 'succeeded' },
]

export default function PaymentsPage() {
  return (
    <div>
      {/* Revenue Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: 'MRR', value: '$17,671', trend: '\u2191 12% vs last month' },
          { label: 'ARR', value: '$127,840', trend: '\u2191 18.4% vs prior year' },
          { label: 'Avg LTV', value: '$1,840', trend: 'Across all tiers' },
          { label: 'Churn Rate', value: '3.2%', trend: '\u2193 Improving' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-[14px] p-5 relative overflow-hidden"
            style={{ border: '1px solid rgba(98,52,145,0.1)', boxShadow: '0 2px 16px rgba(98,52,145,0.06)' }}>
            <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: 'linear-gradient(90deg,#623491,#e8c487)' }} />
            <div className="text-[10px] font-bold tracking-[1.8px] uppercase mb-2" style={{ color: '#9b6fc4', fontFamily: 'Georgia, serif' }}>{s.label}</div>
            <div className="text-[28px] font-bold" style={{ fontFamily: 'Georgia, serif', color: '#2d1a47' }}>{s.value}</div>
            <div className="text-[11px] mt-1" style={{ color: '#2a9d5c' }}>{s.trend}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Revenue by Offer */}
        <div className="bg-white rounded-[14px] p-5"
          style={{ border: '1px solid rgba(98,52,145,0.1)', boxShadow: '0 2px 16px rgba(98,52,145,0.06)' }}>
          <div className="flex items-center gap-2 text-[14px] font-bold mb-4" style={{ fontFamily: 'Georgia, serif', color: '#2d1a47' }}>
            <CreditCard size={16} style={{ color: '#623491' }} /> Revenue by Offer
          </div>
          <table className="w-full">
            <thead>
              <tr>
                {['Offer', 'Revenue', 'Trend'].map(h => (
                  <th key={h} className="text-left text-[10px] font-bold tracking-[1.5px] uppercase pb-2 px-3"
                    style={{ color: '#9b6fc4', fontFamily: 'Georgia, serif', borderBottom: '2px solid rgba(98,52,145,0.1)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {revenueByOffer.map((r, i) => (
                <tr key={i}>
                  <td className="py-[11px] px-3 text-[12.5px]" style={{ borderBottom: '1px solid rgba(98,52,145,0.06)' }}>{r.offer}</td>
                  <td className="py-[11px] px-3 font-bold text-[12.5px]" style={{ color: '#b8860b', borderBottom: '1px solid rgba(98,52,145,0.06)' }}>{r.revenue}</td>
                  <td className="py-[11px] px-3 text-[12.5px]" style={{ borderBottom: '1px solid rgba(98,52,145,0.06)' }}>{r.trend}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Recent Payments */}
        <div className="bg-white rounded-[14px] p-5"
          style={{ border: '1px solid rgba(98,52,145,0.1)', boxShadow: '0 2px 16px rgba(98,52,145,0.06)' }}>
          <div className="text-[14px] font-bold mb-4" style={{ fontFamily: 'Georgia, serif', color: '#2d1a47' }}>Recent Transactions</div>
          <table className="w-full">
            <thead>
              <tr>
                {['Client', 'Amount', 'Offer', 'Date', 'Status'].map(h => (
                  <th key={h} className="text-left text-[10px] font-bold tracking-[1.5px] uppercase pb-2 px-3"
                    style={{ color: '#9b6fc4', fontFamily: 'Georgia, serif', borderBottom: '2px solid rgba(98,52,145,0.1)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentPayments.map(p => (
                <tr key={p.id} className="hover:bg-[rgba(232,196,135,0.08)]">
                  <td className="py-[11px] px-3 text-[12.5px] font-bold" style={{ borderBottom: '1px solid rgba(98,52,145,0.06)', color: '#2d1a47' }}>{p.client}</td>
                  <td className="py-[11px] px-3 text-[12.5px] font-bold" style={{ borderBottom: '1px solid rgba(98,52,145,0.06)', color: '#b8860b' }}>{p.amount}</td>
                  <td className="py-[11px] px-3 text-[12px]" style={{ borderBottom: '1px solid rgba(98,52,145,0.06)', color: '#7a5ea0' }}>{p.offer}</td>
                  <td className="py-[11px] px-3 text-[12px]" style={{ borderBottom: '1px solid rgba(98,52,145,0.06)', color: '#7a5ea0' }}>{p.date}</td>
                  <td className="py-[11px] px-3" style={{ borderBottom: '1px solid rgba(98,52,145,0.06)' }}>
                    <span className={`pill ${p.status === 'succeeded' ? 'pill-green' : 'pill-red'}`}>{p.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
