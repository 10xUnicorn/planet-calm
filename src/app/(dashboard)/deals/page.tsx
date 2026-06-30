'use client'

import { useState } from 'react'
import { Plus, Percent, DollarSign } from 'lucide-react'

const demoDeals = [
  { id: '1', name: 'Founding Council Discount', type: 'percent', value: 20, products: ['Calm Council'], start: '2026-06-01', end: '2026-08-31', limit: 10, used: 3, active: true },
  { id: '2', name: 'Book Launch Bundle', type: 'flat', value: 15, products: ['What the BARK? Book', 'Dog Decoder Ebook'], start: '2026-08-15', end: '2026-09-30', limit: 500, used: 0, active: true },
  { id: '3', name: 'Affiliate 10% Off', type: 'percent', value: 10, products: ['All Products'], start: '2026-01-01', end: null, limit: null, used: 47, active: true },
  { id: '4', name: 'Chew Sub Welcome', type: 'flat', value: 5, products: ['Completely Calm Chew Subscription'], start: '2026-03-01', end: '2026-12-31', limit: 200, used: 89, active: true },
  { id: '5', name: 'Studio Summer Special', type: 'percent', value: 15, products: ['Peaceful Progress Studio'], start: '2026-06-01', end: '2026-06-30', limit: 25, used: 25, active: false },
]

export default function DealsPage() {
  const [showForm, setShowForm] = useState(false)

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div style={{ fontSize: '12px', color: '#7a5ea0', fontFamily: 'Georgia, serif' }}>
          {demoDeals.filter(d => d.active).length} active deals · {demoDeals.reduce((s, d) => s + d.used, 0)} total redemptions
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Plus size={13} /> Create Deal
        </button>
      </div>

      {showForm && (
        <div className="card" style={{ marginBottom: '24px' }}>
          <div className="section-title" style={{ marginBottom: '16px' }}>New Deal</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label className="form-label">Deal Name</label>
              <input className="form-input" placeholder="e.g. Summer Launch Special" />
            </div>
            <div>
              <label className="form-label">Discount Type</label>
              <select className="form-select">
                <option>Percentage</option>
                <option>Flat Amount</option>
              </select>
            </div>
            <div>
              <label className="form-label">Value</label>
              <input type="number" className="form-input" placeholder="20" />
            </div>
            <div>
              <label className="form-label">Usage Limit</label>
              <input type="number" className="form-input" placeholder="100" />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
            <button className="btn-primary">
              Create & Sync to Stripe
            </button>
            <button onClick={() => setShowForm(false)} className="btn-secondary">
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="card">
        <table>
          <thead>
            <tr>
              {['Deal', 'Type', 'Value', 'Products', 'Period', 'Usage', 'Status'].map(h => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {demoDeals.map((deal) => (
              <tr key={deal.id} style={{ cursor: 'pointer' }}>
                <td style={{ fontWeight: 700, color: '#2d1a47' }}>
                  {deal.name}
                </td>
                <td>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#623491' }}>
                    {deal.type === 'percent' ? <Percent size={11} /> : <DollarSign size={11} />}
                    {deal.type === 'percent' ? 'Percent' : 'Flat'}
                  </span>
                </td>
                <td style={{ fontWeight: 700, color: '#623491' }}>
                  {deal.type === 'percent' ? `${deal.value}%` : `$${deal.value}`}
                </td>
                <td>
                  {deal.products.map((p, i) => <span key={i} className="tag">{p}</span>)}
                </td>
                <td style={{ fontSize: '11px', color: '#7a5ea0' }}>
                  {deal.start} — {deal.end || 'Ongoing'}
                </td>
                <td style={{ fontSize: '12px' }}>
                  <span style={{ fontWeight: 700, color: '#623491' }}>{deal.used}</span>
                  <span style={{ color: '#9b6fc4' }}>/{deal.limit || '∞'}</span>
                </td>
                <td>
                  <span className={`pill ${deal.active ? 'pill-green' : 'pill-red'}`}>
                    {deal.active ? 'Active' : 'Expired'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
