'use client'

import { revenueByOffer } from '@/lib/demo-data'

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
          <div key={s.label} className="kpi-card">
            <div style={{ color: '#9b6fc4', fontFamily: 'Georgia, serif', fontSize: '10px', fontWeight: 700, letterSpacing: '1.8px', textTransform: 'uppercase', marginBottom: '8px' }}>{s.label}</div>
            <div style={{ fontFamily: 'Georgia, serif', color: '#2d1a47', fontSize: '28px', fontWeight: 700 }}>{s.value}</div>
            <div style={{ color: '#2a9d5c', fontSize: '11px', marginTop: '4px' }}>{s.trend}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Revenue by Offer */}
        <div className="card">
          <div className="section-title" style={{ marginBottom: '16px' }}>
            💳 Revenue by Offer
          </div>
          <table>
            <thead>
              <tr>
                {['Offer', 'Revenue', 'Trend'].map(h => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {revenueByOffer.map((r, i) => (
                <tr key={i}>
                  <td>{r.offer}</td>
                  <td className="gold-accent">{r.revenue}</td>
                  <td>{r.trend}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Recent Payments */}
        <div className="card">
          <div className="section-title" style={{ marginBottom: '16px' }}>Recent Transactions</div>
          <table>
            <thead>
              <tr>
                {['Client', 'Amount', 'Offer', 'Date', 'Status'].map(h => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentPayments.map(p => (
                <tr key={p.id}>
                  <td style={{ fontWeight: 700, color: '#2d1a47' }}>{p.client}</td>
                  <td className="gold-accent">{p.amount}</td>
                  <td style={{ color: '#7a5ea0', fontSize: '12px' }}>{p.offer}</td>
                  <td style={{ color: '#7a5ea0', fontSize: '12px' }}>{p.date}</td>
                  <td>
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
