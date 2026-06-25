'use client'

import { useState } from 'react'
import { Plus, Tag, Percent, DollarSign } from 'lucide-react'

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
      <div className="flex items-center justify-between mb-6">
        <div className="text-[12px]" style={{ color: '#7a5ea0', fontFamily: 'Georgia, serif' }}>
          {demoDeals.filter(d => d.active).length} active deals · {demoDeals.reduce((s, d) => s + d.used, 0)} total redemptions
        </div>
        <button onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 rounded-full text-[11px] font-bold cursor-pointer flex items-center gap-2"
          style={{ background: 'linear-gradient(135deg,#623491,#9b6fc4)', color: '#e8c487', fontFamily: 'Georgia, serif', border: 'none' }}>
          <Plus size={13} /> Create Deal
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-[14px] p-6 mb-6"
          style={{ border: '1px solid rgba(98,52,145,0.1)', boxShadow: '0 2px 16px rgba(98,52,145,0.06)' }}>
          <div className="text-[14px] font-bold mb-4" style={{ fontFamily: 'Georgia, serif', color: '#2d1a47' }}>New Deal</div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: '#9b6fc4' }}>Deal Name</label>
              <input className="w-full px-3 py-2 rounded-lg text-[12px] outline-none" style={{ border: '1px solid rgba(98,52,145,0.2)', fontFamily: 'Georgia, serif' }} placeholder="e.g. Summer Launch Special" />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: '#9b6fc4' }}>Discount Type</label>
              <select className="w-full px-3 py-2 rounded-lg text-[12px] outline-none" style={{ border: '1px solid rgba(98,52,145,0.2)', fontFamily: 'Georgia, serif' }}>
                <option>Percentage</option>
                <option>Flat Amount</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: '#9b6fc4' }}>Value</label>
              <input type="number" className="w-full px-3 py-2 rounded-lg text-[12px] outline-none" style={{ border: '1px solid rgba(98,52,145,0.2)', fontFamily: 'Georgia, serif' }} placeholder="20" />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: '#9b6fc4' }}>Usage Limit</label>
              <input type="number" className="w-full px-3 py-2 rounded-lg text-[12px] outline-none" style={{ border: '1px solid rgba(98,52,145,0.2)', fontFamily: 'Georgia, serif' }} placeholder="100" />
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button className="px-4 py-2 rounded-full text-[11px] font-bold cursor-pointer"
              style={{ background: 'linear-gradient(135deg,#623491,#9b6fc4)', color: '#e8c487', fontFamily: 'Georgia, serif', border: 'none' }}>
              Create & Sync to Stripe
            </button>
            <button onClick={() => setShowForm(false)} className="px-4 py-2 rounded-full text-[11px] cursor-pointer"
              style={{ background: 'rgba(98,52,145,0.08)', color: '#623491', fontFamily: 'Georgia, serif', border: '1px solid rgba(98,52,145,0.15)' }}>
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-[14px] p-5"
        style={{ border: '1px solid rgba(98,52,145,0.1)', boxShadow: '0 2px 16px rgba(98,52,145,0.06)' }}>
        <table className="w-full">
          <thead>
            <tr>
              {['Deal', 'Type', 'Value', 'Products', 'Period', 'Usage', 'Status'].map(h => (
                <th key={h} className="text-left text-[10px] font-bold tracking-[1.5px] uppercase pb-2 px-3"
                  style={{ color: '#9b6fc4', fontFamily: 'Georgia, serif', borderBottom: '2px solid rgba(98,52,145,0.1)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {demoDeals.map((deal) => (
              <tr key={deal.id} className="hover:bg-[rgba(232,196,135,0.08)] cursor-pointer">
                <td className="py-[11px] px-3 text-[12.5px] font-bold" style={{ borderBottom: '1px solid rgba(98,52,145,0.06)', color: '#2d1a47' }}>
                  {deal.name}
                </td>
                <td className="py-[11px] px-3" style={{ borderBottom: '1px solid rgba(98,52,145,0.06)' }}>
                  <span className="flex items-center gap-1 text-[11px]" style={{ color: '#623491' }}>
                    {deal.type === 'percent' ? <Percent size={11} /> : <DollarSign size={11} />}
                    {deal.type === 'percent' ? 'Percent' : 'Flat'}
                  </span>
                </td>
                <td className="py-[11px] px-3 text-[12.5px] font-bold" style={{ borderBottom: '1px solid rgba(98,52,145,0.06)', color: '#623491' }}>
                  {deal.type === 'percent' ? `${deal.value}%` : `$${deal.value}`}
                </td>
                <td className="py-[11px] px-3" style={{ borderBottom: '1px solid rgba(98,52,145,0.06)' }}>
                  {deal.products.map((p, i) => <span key={i} className="tag">{p}</span>)}
                </td>
                <td className="py-[11px] px-3 text-[11px]" style={{ borderBottom: '1px solid rgba(98,52,145,0.06)', color: '#7a5ea0' }}>
                  {deal.start} — {deal.end || 'Ongoing'}
                </td>
                <td className="py-[11px] px-3 text-[12px]" style={{ borderBottom: '1px solid rgba(98,52,145,0.06)' }}>
                  <span className="font-bold" style={{ color: '#623491' }}>{deal.used}</span>
                  <span style={{ color: '#9b6fc4' }}>/{deal.limit || '∞'}</span>
                </td>
                <td className="py-[11px] px-3" style={{ borderBottom: '1px solid rgba(98,52,145,0.06)' }}>
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
