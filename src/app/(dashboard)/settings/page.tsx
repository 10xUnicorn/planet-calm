'use client'

import { useState } from 'react'
import {
  Save,
  Settings,
  Users,
  Link2,
  Bell,
  Brain,
  Rocket,
  UserPlus,
  Shield,
  Globe,
  Clock,
  BookOpen,
  Calendar,
  Target,
  ToggleLeft,
  Key,
} from 'lucide-react'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general')
  const [notifications, setNotifications] = useState<Record<string, boolean>>({
    'New Lead': true,
    'New Purchase': true,
    'Payment Failed': true,
    'Worksheet Submitted': true,
    'Stale Deal': true,
    'AI Sequence Complete': true,
  })

  const tabs = [
    { key: 'general', label: 'General', Icon: Settings },
    { key: 'team', label: 'Team & Roles', Icon: Users },
    { key: 'integrations', label: 'Integrations', Icon: Link2 },
    { key: 'notifications', label: 'Notification Prefs', Icon: Bell },
    { key: 'ai', label: 'AI Settings', Icon: Brain },
    { key: 'launch', label: 'Launch Config', Icon: Rocket },
  ]

  const inputStyle: React.CSSProperties = {
    border: '1.5px solid rgba(98,52,145,0.15)',
    fontFamily: 'Georgia, serif',
    color: '#2d1a47',
    background: '#faf8fc',
  }

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.target.style.borderColor = '#623491'
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.target.style.borderColor = 'rgba(98,52,145,0.15)'
  }

  const toggleNotification = (name: string) => {
    setNotifications(prev => ({ ...prev, [name]: !prev[name] }))
  }

  return (
    <div>
      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map(t => (
          <button key={t.key} onClick={() => setActiveTab(t.key)}
            className="px-4 py-[9px] rounded-[12px] text-[11.5px] font-bold cursor-pointer flex items-center gap-2 transition-all"
            style={{
              background: activeTab === t.key ? 'linear-gradient(135deg,#623491,#9b6fc4)' : 'rgba(98,52,145,0.08)',
              color: activeTab === t.key ? '#e8c487' : '#623491',
              fontFamily: 'Georgia, serif',
              border: activeTab === t.key ? '1.5px solid transparent' : '1.5px solid rgba(98,52,145,0.15)',
              boxShadow: activeTab === t.key ? '0 4px 16px rgba(98,52,145,0.25)' : 'none',
            }}>
            <t.Icon size={14} /> {t.label}
          </button>
        ))}
      </div>

      {/* General Settings */}
      {activeTab === 'general' && (
        <div className="bg-white rounded-[16px] p-6 md:p-8"
          style={{ border: '1px solid rgba(98,52,145,0.1)', boxShadow: '0 2px 16px rgba(98,52,145,0.06)' }}>
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-[10px] flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg,#623491,#9b6fc4)' }}>
              <Globe size={16} color="#e8c487" />
            </div>
            <h2 className="text-[14px] font-bold" style={{ fontFamily: 'Georgia, serif', color: '#2d1a47' }}>
              General Settings
            </h2>
          </div>

          <div className="space-y-5">
            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[1.8px] mb-[6px]"
                  style={{ color: '#9b6fc4', fontFamily: 'Georgia, serif' }}>Dashboard Name</label>
                <input type="text" defaultValue="Planet Calm"
                  className="w-full px-4 py-[12px] rounded-[12px] text-[13px] outline-none transition-all"
                  style={inputStyle}
                  onFocus={handleFocus} onBlur={handleBlur} />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[1.8px] mb-[6px]"
                  style={{ color: '#9b6fc4', fontFamily: 'Georgia, serif' }}>Primary URL</label>
                <input type="text" defaultValue="app.planetcalm.com"
                  className="w-full px-4 py-[12px] rounded-[12px] text-[13px] outline-none transition-all"
                  style={inputStyle}
                  onFocus={handleFocus} onBlur={handleBlur} />
              </div>
            </div>

            {/* Threshold Section Header */}
            <div className="flex items-center gap-2 mt-2">
              <Clock size={14} style={{ color: '#9b6fc4' }} />
              <span className="text-[10px] font-bold uppercase tracking-[1.8px]"
                style={{ color: '#9b6fc4', fontFamily: 'Georgia, serif' }}>Threshold Settings</span>
            </div>

            {/* Row 2 - Thresholds */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[1.8px] mb-[6px]"
                  style={{ color: '#9b6fc4', fontFamily: 'Georgia, serif' }}>Silent Buyer (days)</label>
                <input type="number" defaultValue="90"
                  className="w-full px-4 py-[12px] rounded-[12px] text-[13px] outline-none transition-all"
                  style={inputStyle}
                  onFocus={handleFocus} onBlur={handleBlur} />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[1.8px] mb-[6px]"
                  style={{ color: '#9b6fc4', fontFamily: 'Georgia, serif' }}>Stale Deal (days)</label>
                <input type="number" defaultValue="14"
                  className="w-full px-4 py-[12px] rounded-[12px] text-[13px] outline-none transition-all"
                  style={inputStyle}
                  onFocus={handleFocus} onBlur={handleBlur} />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[1.8px] mb-[6px]"
                  style={{ color: '#9b6fc4', fontFamily: 'Georgia, serif' }}>Lapsed Affiliate (days)</label>
                <input type="number" defaultValue="90"
                  className="w-full px-4 py-[12px] rounded-[12px] text-[13px] outline-none transition-all"
                  style={inputStyle}
                  onFocus={handleFocus} onBlur={handleBlur} />
              </div>
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[1.8px] mb-[6px]"
                  style={{ color: '#9b6fc4', fontFamily: 'Georgia, serif' }}>Default Timezone</label>
                <input type="text" defaultValue="America/Denver"
                  className="w-full px-4 py-[12px] rounded-[12px] text-[13px] outline-none transition-all"
                  style={inputStyle}
                  onFocus={handleFocus} onBlur={handleBlur} />
              </div>
            </div>
          </div>

          <button className="mt-6 px-6 py-[12px] rounded-[12px] text-[13px] font-bold cursor-pointer flex items-center gap-2 transition-all"
            style={{
              background: 'linear-gradient(135deg,#623491,#7d4db5)',
              color: '#e8c487',
              fontFamily: 'Georgia, serif',
              border: 'none',
              boxShadow: '0 4px 16px rgba(98,52,145,0.3)',
            }}>
            <Save size={14} /> Save Settings
          </button>
        </div>
      )}

      {/* Team & Roles */}
      {activeTab === 'team' && (
        <div className="bg-white rounded-[16px] p-6 md:p-8"
          style={{ border: '1px solid rgba(98,52,145,0.1)', boxShadow: '0 2px 16px rgba(98,52,145,0.06)' }}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-[10px] flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg,#623491,#9b6fc4)' }}>
                <Shield size={16} color="#e8c487" />
              </div>
              <h2 className="text-[14px] font-bold" style={{ fontFamily: 'Georgia, serif', color: '#2d1a47' }}>
                Team Members & Roles
              </h2>
            </div>
            <button className="px-4 py-[10px] rounded-[12px] text-[12px] font-bold cursor-pointer flex items-center gap-2 transition-all"
              style={{
                background: 'linear-gradient(135deg,#623491,#7d4db5)',
                color: '#e8c487',
                fontFamily: 'Georgia, serif',
                border: 'none',
                boxShadow: '0 4px 16px rgba(98,52,145,0.3)',
              }}>
              <UserPlus size={14} /> Invite Team Member
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full" style={{ minWidth: '540px' }}>
              <thead>
                <tr>
                  {['Name', 'Email', 'Role', 'Status'].map((h, idx) => (
                    <th key={h}
                      className="text-left text-[10px] font-bold tracking-[1.8px] uppercase pb-3 px-4"
                      style={{
                        color: '#9b6fc4',
                        fontFamily: 'Georgia, serif',
                        borderBottom: '2px solid rgba(98,52,145,0.1)',
                        width: idx === 0 ? '25%' : idx === 1 ? '35%' : '20%',
                      }}>
                      {h}
                    </th>
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
                  <tr key={i} className="transition-colors" style={{ background: i % 2 === 1 ? '#faf8fc' : 'transparent' }}>
                    <td className="py-[12px] px-4 text-[13px] font-bold"
                      style={{ borderBottom: '1px solid rgba(98,52,145,0.06)', color: '#2d1a47', fontFamily: 'Georgia, serif' }}>
                      {m.name}
                    </td>
                    <td className="py-[12px] px-4 text-[13px]"
                      style={{ borderBottom: '1px solid rgba(98,52,145,0.06)', color: '#7a5ea0', fontFamily: 'Georgia, serif' }}>
                      {m.email}
                    </td>
                    <td className="py-[12px] px-4" style={{ borderBottom: '1px solid rgba(98,52,145,0.06)' }}>
                      <span className="inline-block px-3 py-[4px] rounded-full text-[10px] font-bold uppercase tracking-[1px]"
                        style={{
                          background: m.role === 'Super Admin' ? 'rgba(98,52,145,0.12)' : 'rgba(98,52,145,0.08)',
                          color: '#623491',
                          fontFamily: 'Georgia, serif',
                        }}>
                        {m.role}
                      </span>
                    </td>
                    <td className="py-[12px] px-4" style={{ borderBottom: '1px solid rgba(98,52,145,0.06)' }}>
                      <span className="inline-block px-3 py-[4px] rounded-full text-[10px] font-bold uppercase tracking-[1px]"
                        style={{
                          background: 'rgba(34,197,94,0.12)',
                          color: '#16a34a',
                          fontFamily: 'Georgia, serif',
                        }}>
                        {m.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* AI Settings */}
      {activeTab === 'ai' && (
        <div className="bg-white rounded-[16px] p-6 md:p-8"
          style={{ border: '1px solid rgba(98,52,145,0.1)', boxShadow: '0 2px 16px rgba(98,52,145,0.06)' }}>
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-[10px] flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg,#623491,#9b6fc4)' }}>
              <Brain size={16} color="#e8c487" />
            </div>
            <h2 className="text-[14px] font-bold" style={{ fontFamily: 'Georgia, serif', color: '#2d1a47' }}>
              AI Tone Guidelines
            </h2>
          </div>
          <textarea
            className="w-full px-4 py-[12px] rounded-[12px] text-[13px] outline-none h-36 resize-none mb-5 transition-all"
            style={inputStyle}
            onFocus={(e) => { e.target.style.borderColor = '#623491' }}
            onBlur={(e) => { e.target.style.borderColor = 'rgba(98,52,145,0.15)' }}
            defaultValue="Use warm, grounded, dog-centered language. Reflect Calm-First Leadership philosophy. Never aggressive or salesy. BARKType terminology is encouraged. Reference the journey from reactive to calm. Acknowledge the bond between human and dog."
          />
          <button className="px-6 py-[12px] rounded-[12px] text-[13px] font-bold cursor-pointer flex items-center gap-2 transition-all"
            style={{
              background: 'linear-gradient(135deg,#623491,#7d4db5)',
              color: '#e8c487',
              fontFamily: 'Georgia, serif',
              border: 'none',
              boxShadow: '0 4px 16px rgba(98,52,145,0.3)',
            }}>
            <Save size={14} /> Save AI Settings
          </button>
        </div>
      )}

      {/* Launch Config */}
      {activeTab === 'launch' && (
        <div className="bg-white rounded-[16px] p-6 md:p-8"
          style={{ border: '1px solid rgba(98,52,145,0.1)', boxShadow: '0 2px 16px rgba(98,52,145,0.06)' }}>
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-[10px] flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg,#623491,#9b6fc4)' }}>
              <Rocket size={16} color="#e8c487" />
            </div>
            <h2 className="text-[14px] font-bold" style={{ fontFamily: 'Georgia, serif', color: '#2d1a47' }}>
              Launch Campaign Config
            </h2>
          </div>

          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[1.8px] mb-[6px]"
                  style={{ color: '#9b6fc4', fontFamily: 'Georgia, serif' }}>
                  <span className="inline-flex items-center gap-1"><BookOpen size={11} /> Book Title</span>
                </label>
                <input defaultValue="What the BARK?"
                  className="w-full px-4 py-[12px] rounded-[12px] text-[13px] outline-none transition-all"
                  style={inputStyle}
                  onFocus={handleFocus} onBlur={handleBlur} />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[1.8px] mb-[6px]"
                  style={{ color: '#9b6fc4', fontFamily: 'Georgia, serif' }}>
                  <span className="inline-flex items-center gap-1"><Calendar size={11} /> Launch Date</span>
                </label>
                <input type="date" defaultValue="2026-09-01"
                  className="w-full px-4 py-[12px] rounded-[12px] text-[13px] outline-none transition-all cursor-pointer"
                  style={inputStyle}
                  onFocus={handleFocus} onBlur={handleBlur} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[1.8px] mb-[6px]"
                  style={{ color: '#9b6fc4', fontFamily: 'Georgia, serif' }}>
                  <span className="inline-flex items-center gap-1"><Target size={11} /> Pre-Sale Target</span>
                </label>
                <input type="number" defaultValue="2000"
                  className="w-full px-4 py-[12px] rounded-[12px] text-[13px] outline-none transition-all"
                  style={inputStyle}
                  onFocus={handleFocus} onBlur={handleBlur} />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[1.8px] mb-[6px]"
                  style={{ color: '#9b6fc4', fontFamily: 'Georgia, serif' }}>
                  <span className="inline-flex items-center gap-1"><ToggleLeft size={11} /> Campaign Active</span>
                </label>
                <select defaultValue="true"
                  className="w-full px-4 py-[12px] rounded-[12px] text-[13px] outline-none transition-all cursor-pointer"
                  style={inputStyle}
                  onFocus={(e) => { e.target.style.borderColor = '#623491' }}
                  onBlur={(e) => { e.target.style.borderColor = 'rgba(98,52,145,0.15)' }}>
                  <option value="true">Active</option>
                  <option value="false">Paused</option>
                </select>
              </div>
            </div>
          </div>

          <button className="mt-6 px-6 py-[12px] rounded-[12px] text-[13px] font-bold cursor-pointer flex items-center gap-2 transition-all"
            style={{
              background: 'linear-gradient(135deg,#623491,#7d4db5)',
              color: '#e8c487',
              fontFamily: 'Georgia, serif',
              border: 'none',
              boxShadow: '0 4px 16px rgba(98,52,145,0.3)',
            }}>
            <Save size={14} /> Save Launch Config
          </button>
        </div>
      )}

      {/* Integrations */}
      {activeTab === 'integrations' && (
        <div className="bg-white rounded-[16px] p-6 md:p-8"
          style={{ border: '1px solid rgba(98,52,145,0.1)', boxShadow: '0 2px 16px rgba(98,52,145,0.06)' }}>
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-[10px] flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg,#623491,#9b6fc4)' }}>
              <Key size={16} color="#e8c487" />
            </div>
            <h2 className="text-[14px] font-bold" style={{ fontFamily: 'Georgia, serif', color: '#2d1a47' }}>
              Integration Keys
            </h2>
          </div>
          <div className="flex flex-col gap-3">
            {[
              { name: 'Stripe', key: 'STRIPE_SECRET_KEY', status: 'Connected' },
              { name: 'Resend', key: 'RESEND_API_KEY', status: 'Connected' },
              { name: 'AWIN', key: 'AWIN_API_KEY', status: 'Partial' },
              { name: 'Heartbeat', key: 'HEARTBEAT_API_KEY', status: 'Connected' },
              { name: 'Kajabi', key: 'KAJABI_API_KEY', status: 'Connected' },
            ].map(int => (
              <div key={int.name} className="flex items-center justify-between p-4 rounded-[12px]"
                style={{ background: '#faf8fc', border: '1px solid rgba(98,52,145,0.08)' }}>
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-[8px] flex items-center justify-center"
                    style={{ background: 'rgba(98,52,145,0.1)' }}>
                    <Link2 size={13} style={{ color: '#623491' }} />
                  </div>
                  <div>
                    <span className="text-[13px] font-bold block" style={{ fontFamily: 'Georgia, serif', color: '#2d1a47' }}>{int.name}</span>
                    <span className="text-[10px] tracking-[0.5px]" style={{ color: '#9b6fc4', fontFamily: 'Georgia, serif' }}>{int.key}</span>
                  </div>
                </div>
                <span className="inline-block px-3 py-[4px] rounded-full text-[10px] font-bold uppercase tracking-[1px]"
                  style={{
                    background: int.status === 'Connected' ? 'rgba(34,197,94,0.12)' : 'rgba(245,158,11,0.12)',
                    color: int.status === 'Connected' ? '#16a34a' : '#d97706',
                    fontFamily: 'Georgia, serif',
                  }}>
                  {int.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Notifications */}
      {activeTab === 'notifications' && (
        <div className="bg-white rounded-[16px] p-6 md:p-8"
          style={{ border: '1px solid rgba(98,52,145,0.1)', boxShadow: '0 2px 16px rgba(98,52,145,0.06)' }}>
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-[10px] flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg,#623491,#9b6fc4)' }}>
              <Bell size={16} color="#e8c487" />
            </div>
            <h2 className="text-[14px] font-bold" style={{ fontFamily: 'Georgia, serif', color: '#2d1a47' }}>
              Notification Preferences
            </h2>
          </div>
          <div className="flex flex-col gap-3">
            {Object.entries(notifications).map(([name, enabled]) => (
              <div key={name} className="flex items-center justify-between p-4 rounded-[12px]"
                style={{ background: '#faf8fc', border: '1px solid rgba(98,52,145,0.08)' }}>
                <span className="text-[13px] font-bold" style={{ fontFamily: 'Georgia, serif', color: '#2d1a47' }}>{name}</span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={enabled}
                  onClick={() => toggleNotification(name)}
                  className="relative inline-flex items-center w-11 h-6 rounded-full cursor-pointer transition-colors duration-200"
                  style={{ background: enabled ? '#623491' : '#c4a8e0' }}>
                  <span
                    className="inline-block w-[18px] h-[18px] rounded-full bg-white transition-transform duration-200"
                    style={{
                      transform: enabled ? 'translateX(22px)' : 'translateX(3px)',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
                    }}
                  />
                </button>
              </div>
            ))}
          </div>

          <button className="mt-6 px-6 py-[12px] rounded-[12px] text-[13px] font-bold cursor-pointer flex items-center gap-2 transition-all"
            style={{
              background: 'linear-gradient(135deg,#623491,#7d4db5)',
              color: '#e8c487',
              fontFamily: 'Georgia, serif',
              border: 'none',
              boxShadow: '0 4px 16px rgba(98,52,145,0.3)',
            }}>
            <Save size={14} /> Save Preferences
          </button>
        </div>
      )}
    </div>
  )
}
