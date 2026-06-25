'use client'

import { useState } from 'react'
import { Save, Users, Key, Bell, Brain, Calendar, Shield } from 'lucide-react'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general')

  const tabs = [
    { key: 'general', label: 'General', icon: '⚙️' },
    { key: 'team', label: 'Team & Roles', icon: '👥' },
    { key: 'integrations', label: 'Integrations', icon: '🔗' },
    { key: 'notifications', label: 'Notification Prefs', icon: '🔔' },
    { key: 'ai', label: 'AI Settings', icon: '🤖' },
    { key: 'launch', label: 'Launch Config', icon: '🚀' },
  ]

  return (
    <div>
      <div className="flex gap-2 mb-6">
        {tabs.map(t => (
          <button key={t.key} onClick={() => setActiveTab(t.key)}
            className="px-4 py-[9px] rounded-full text-[11.5px] font-bold cursor-pointer flex items-center gap-2"
            style={{
              background: activeTab === t.key ? 'linear-gradient(135deg,#623491,#9b6fc4)' : 'rgba(98,52,145,0.08)',
              color: activeTab === t.key ? '#e8c487' : '#623491',
              fontFamily: 'Georgia, serif',
              border: activeTab === t.key ? 'none' : '1px solid rgba(98,52,145,0.15)',
            }}>
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {activeTab === 'general' && (
        <div className="bg-white rounded-[14px] p-6"
          style={{ border: '1px solid rgba(98,52,145,0.1)', boxShadow: '0 2px 16px rgba(98,52,145,0.06)' }}>
          <div className="text-[14px] font-bold mb-4" style={{ fontFamily: 'Georgia, serif', color: '#2d1a47' }}>General Settings</div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Dashboard Name', value: 'Planet Calm', type: 'text' },
              { label: 'Primary URL', value: 'app.planetcalm.com', type: 'text' },
              { label: 'Silent Buyer Threshold (days)', value: '90', type: 'number' },
              { label: 'Stale Deal Threshold (days)', value: '14', type: 'number' },
              { label: 'Lapsed Affiliate Threshold (days)', value: '90', type: 'number' },
              { label: 'Default Timezone', value: 'America/Denver', type: 'text' },
            ].map(f => (
              <div key={f.label}>
                <label className="block text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: '#9b6fc4' }}>{f.label}</label>
                <input type={f.type} defaultValue={f.value}
                  className="w-full px-3 py-2 rounded-lg text-[12px] outline-none"
                  style={{ border: '1px solid rgba(98,52,145,0.2)', fontFamily: 'Georgia, serif', color: '#2d1a47' }} />
              </div>
            ))}
          </div>
          <button className="mt-4 px-6 py-[10px] rounded-full text-[12px] font-bold cursor-pointer flex items-center gap-2"
            style={{ background: 'linear-gradient(135deg,#623491,#9b6fc4)', color: '#e8c487', fontFamily: 'Georgia, serif', border: 'none' }}>
            <Save size={14} /> Save Settings
          </button>
        </div>
      )}

      {activeTab === 'team' && (
        <div className="bg-white rounded-[14px] p-6"
          style={{ border: '1px solid rgba(98,52,145,0.1)', boxShadow: '0 2px 16px rgba(98,52,145,0.06)' }}>
          <div className="text-[14px] font-bold mb-4" style={{ fontFamily: 'Georgia, serif', color: '#2d1a47' }}>Team Members & Roles</div>
          <table className="w-full">
            <thead>
              <tr>
                {['Name', 'Email', 'Role', 'Status'].map(h => (
                  <th key={h} className="text-left text-[10px] font-bold tracking-[1.5px] uppercase pb-2 px-3"
                    style={{ color: '#9b6fc4', fontFamily: 'Georgia, serif', borderBottom: '2px solid rgba(98,52,145,0.1)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'Stephanie', email: 'stephanie@planetcalm.com', role: 'Super Admin', status: 'Active' },
                { name: 'Coach Jen', email: 'jen@planetcalm.com', role: 'Coach', status: 'Active' },
                { name: 'Coach Ari', email: 'ari@planetcalm.com', role: 'Coach', status: 'Active' },
                { name: 'Taylor (VA)', email: 'taylor@planetcalm.com', role: 'Team Member', status: 'Active' },
              ].map((m, i) => (
                <tr key={i}>
                  <td className="py-[11px] px-3 text-[12.5px] font-bold" style={{ borderBottom: '1px solid rgba(98,52,145,0.06)', color: '#2d1a47' }}>{m.name}</td>
                  <td className="py-[11px] px-3 text-[12.5px]" style={{ borderBottom: '1px solid rgba(98,52,145,0.06)', color: '#7a5ea0' }}>{m.email}</td>
                  <td className="py-[11px] px-3" style={{ borderBottom: '1px solid rgba(98,52,145,0.06)' }}>
                    <span className="pill pill-purple">{m.role}</span>
                  </td>
                  <td className="py-[11px] px-3" style={{ borderBottom: '1px solid rgba(98,52,145,0.06)' }}>
                    <span className="pill pill-green">{m.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'ai' && (
        <div className="bg-white rounded-[14px] p-6"
          style={{ border: '1px solid rgba(98,52,145,0.1)', boxShadow: '0 2px 16px rgba(98,52,145,0.06)' }}>
          <div className="text-[14px] font-bold mb-4" style={{ fontFamily: 'Georgia, serif', color: '#2d1a47' }}>AI Tone Guidelines</div>
          <textarea
            className="w-full px-4 py-3 rounded-lg text-[12px] outline-none h-32 resize-none mb-4"
            style={{ border: '1px solid rgba(98,52,145,0.2)', fontFamily: 'Georgia, serif', color: '#2d1a47' }}
            defaultValue="Use warm, grounded, dog-centered language. Reflect Calm-First Leadership philosophy. Never aggressive or salesy. BARKType terminology is encouraged. Reference the journey from reactive to calm. Acknowledge the bond between human and dog."
          />
          <button className="px-6 py-[10px] rounded-full text-[12px] font-bold cursor-pointer flex items-center gap-2"
            style={{ background: 'linear-gradient(135deg,#623491,#9b6fc4)', color: '#e8c487', fontFamily: 'Georgia, serif', border: 'none' }}>
            <Save size={14} /> Save AI Settings
          </button>
        </div>
      )}

      {activeTab === 'launch' && (
        <div className="bg-white rounded-[14px] p-6"
          style={{ border: '1px solid rgba(98,52,145,0.1)', boxShadow: '0 2px 16px rgba(98,52,145,0.06)' }}>
          <div className="text-[14px] font-bold mb-4" style={{ fontFamily: 'Georgia, serif', color: '#2d1a47' }}>Launch Campaign Config</div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: '#9b6fc4' }}>Book Title</label>
              <input defaultValue="What the BARK?" className="w-full px-3 py-2 rounded-lg text-[12px] outline-none"
                style={{ border: '1px solid rgba(98,52,145,0.2)', fontFamily: 'Georgia, serif' }} />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: '#9b6fc4' }}>Launch Date</label>
              <input type="date" defaultValue="2026-09-01" className="w-full px-3 py-2 rounded-lg text-[12px] outline-none"
                style={{ border: '1px solid rgba(98,52,145,0.2)', fontFamily: 'Georgia, serif' }} />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: '#9b6fc4' }}>Pre-Sale Target</label>
              <input type="number" defaultValue="2000" className="w-full px-3 py-2 rounded-lg text-[12px] outline-none"
                style={{ border: '1px solid rgba(98,52,145,0.2)', fontFamily: 'Georgia, serif' }} />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: '#9b6fc4' }}>Campaign Active</label>
              <select defaultValue="true" className="w-full px-3 py-2 rounded-lg text-[12px] outline-none"
                style={{ border: '1px solid rgba(98,52,145,0.2)', fontFamily: 'Georgia, serif' }}>
                <option value="true">Active</option>
                <option value="false">Paused</option>
              </select>
            </div>
          </div>
          <button className="mt-4 px-6 py-[10px] rounded-full text-[12px] font-bold cursor-pointer flex items-center gap-2"
            style={{ background: 'linear-gradient(135deg,#623491,#9b6fc4)', color: '#e8c487', fontFamily: 'Georgia, serif', border: 'none' }}>
            <Save size={14} /> Save Launch Config
          </button>
        </div>
      )}

      {activeTab === 'integrations' && (
        <div className="bg-white rounded-[14px] p-6"
          style={{ border: '1px solid rgba(98,52,145,0.1)', boxShadow: '0 2px 16px rgba(98,52,145,0.06)' }}>
          <div className="text-[14px] font-bold mb-4" style={{ fontFamily: 'Georgia, serif', color: '#2d1a47' }}>Integration Keys</div>
          <div className="flex flex-col gap-3">
            {[
              { name: 'Stripe', key: 'STRIPE_SECRET_KEY', status: 'Connected' },
              { name: 'Resend', key: 'RESEND_API_KEY', status: 'Connected' },
              { name: 'AWIN', key: 'AWIN_API_KEY', status: 'Partial' },
              { name: 'Heartbeat', key: 'HEARTBEAT_API_KEY', status: 'Connected' },
              { name: 'Kajabi', key: 'KAJABI_API_KEY', status: 'Connected' },
            ].map(int => (
              <div key={int.name} className="flex items-center justify-between p-3 rounded-lg" style={{ background: '#f9f5fe' }}>
                <div>
                  <span className="text-[12px] font-bold" style={{ fontFamily: 'Georgia, serif', color: '#2d1a47' }}>{int.name}</span>
                  <span className="text-[10px] ml-2" style={{ color: '#9b6fc4' }}>{int.key}</span>
                </div>
                <span className={`pill ${int.status === 'Connected' ? 'pill-green' : 'pill-amber'}`}>{int.status}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'notifications' && (
        <div className="bg-white rounded-[14px] p-6"
          style={{ border: '1px solid rgba(98,52,145,0.1)', boxShadow: '0 2px 16px rgba(98,52,145,0.06)' }}>
          <div className="text-[14px] font-bold mb-4" style={{ fontFamily: 'Georgia, serif', color: '#2d1a47' }}>Notification Preferences</div>
          <div className="flex flex-col gap-3">
            {['New Lead', 'New Purchase', 'Payment Failed', 'Worksheet Submitted', 'Stale Deal', 'AI Sequence Complete'].map(n => (
              <div key={n} className="flex items-center justify-between p-3 rounded-lg" style={{ background: '#f9f5fe' }}>
                <span className="text-[12px] font-bold" style={{ fontFamily: 'Georgia, serif', color: '#2d1a47' }}>{n}</span>
                <label className="relative inline-block w-10 h-5">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <span className="absolute inset-0 rounded-full cursor-pointer transition-all peer-checked:bg-[#623491] bg-[#c4a8e0]" />
                  <span className="absolute left-[2px] top-[2px] w-4 h-4 rounded-full bg-white transition-all peer-checked:translate-x-5" />
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
