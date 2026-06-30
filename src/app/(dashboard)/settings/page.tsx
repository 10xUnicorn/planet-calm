'use client'

import { useState } from 'react'
import {
  Save,
  UserPlus,
  Link2,
  Clock,
  BookOpen,
  Calendar,
  Target,
  ToggleLeft,
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
    { key: 'general', label: 'General', emoji: '⚙️' },
    { key: 'team', label: 'Team & Roles', emoji: '👥' },
    { key: 'integrations', label: 'Integrations', emoji: '🔗' },
    { key: 'notifications', label: 'Notifications', emoji: '🔔' },
    { key: 'ai', label: 'AI Settings', emoji: '🤖' },
    { key: 'launch', label: 'Launch Config', emoji: '🚀' },
  ]

  const toggleNotification = (name: string) => {
    setNotifications(prev => ({ ...prev, [name]: !prev[name] }))
  }

  return (
    <div>
      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={`page-tab${activeTab === t.key ? ' active' : ''}`}
          >
            {t.emoji} {t.label}
          </button>
        ))}
      </div>

      {/* General Settings */}
      {activeTab === 'general' && (
        <div className="card">
          <h2 className="section-title mb-6">⚙️ General Settings</h2>

          <div className="space-y-5">
            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="form-label">Dashboard Name</label>
                <input type="text" defaultValue="Planet Calm" className="form-input" />
              </div>
              <div>
                <label className="form-label">Primary URL</label>
                <input type="text" defaultValue="app.planetcalm.com" className="form-input" />
              </div>
            </div>

            {/* Threshold Section Header */}
            <div className="flex items-center gap-2 mt-2">
              <Clock size={14} className="text-primary-light" />
              <span className="form-label" style={{ marginBottom: 0 }}>Threshold Settings</span>
            </div>

            {/* Row 2 - Thresholds */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className="form-label">Silent Buyer (days)</label>
                <input type="number" defaultValue="90" className="form-input" />
              </div>
              <div>
                <label className="form-label">Stale Deal (days)</label>
                <input type="number" defaultValue="14" className="form-input" />
              </div>
              <div>
                <label className="form-label">Lapsed Affiliate (days)</label>
                <input type="number" defaultValue="90" className="form-input" />
              </div>
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="form-label">Default Timezone</label>
                <input type="text" defaultValue="America/Denver" className="form-input" />
              </div>
            </div>
          </div>

          <button className="btn-primary mt-6 flex items-center gap-2">
            <Save size={14} /> Save Settings
          </button>
        </div>
      )}

      {/* Team & Roles */}
      {activeTab === 'team' && (
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="section-title">👥 Team Members &amp; Roles</h2>
            <button className="btn-primary flex items-center gap-2">
              <UserPlus size={14} /> Invite Team Member
            </button>
          </div>

          <div className="overflow-x-auto">
            <table style={{ minWidth: '540px' }}>
              <thead>
                <tr>
                  <th style={{ width: '25%' }}>Name</th>
                  <th style={{ width: '35%' }}>Email</th>
                  <th style={{ width: '20%' }}>Role</th>
                  <th style={{ width: '20%' }}>Status</th>
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
                    <td className="font-bold">{m.name}</td>
                    <td className="text-text-muted">{m.email}</td>
                    <td>
                      <span className="pill pill-purple">{m.role}</span>
                    </td>
                    <td>
                      <span className="pill pill-green">{m.status}</span>
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
        <div className="card">
          <h2 className="section-title mb-6">🤖 AI Tone Guidelines</h2>
          <textarea
            className="form-input mb-5"
            style={{ height: '144px', resize: 'none' }}
            defaultValue="Use warm, grounded, dog-centered language. Reflect Calm-First Leadership philosophy. Never aggressive or salesy. BARKType terminology is encouraged. Reference the journey from reactive to calm. Acknowledge the bond between human and dog."
          />
          <button className="btn-primary flex items-center gap-2">
            <Save size={14} /> Save AI Settings
          </button>
        </div>
      )}

      {/* Launch Config */}
      {activeTab === 'launch' && (
        <div className="card">
          <h2 className="section-title mb-6">🚀 Launch Campaign Config</h2>

          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="form-label">
                  <span className="inline-flex items-center gap-1"><BookOpen size={11} /> Book Title</span>
                </label>
                <input defaultValue="What the BARK?" className="form-input" />
              </div>
              <div>
                <label className="form-label">
                  <span className="inline-flex items-center gap-1"><Calendar size={11} /> Launch Date</span>
                </label>
                <input type="date" defaultValue="2026-09-01" className="form-input cursor-pointer" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="form-label">
                  <span className="inline-flex items-center gap-1"><Target size={11} /> Pre-Sale Target</span>
                </label>
                <input type="number" defaultValue="2000" className="form-input" />
              </div>
              <div>
                <label className="form-label">
                  <span className="inline-flex items-center gap-1"><ToggleLeft size={11} /> Campaign Active</span>
                </label>
                <select defaultValue="true" className="form-select cursor-pointer">
                  <option value="true">Active</option>
                  <option value="false">Paused</option>
                </select>
              </div>
            </div>
          </div>

          <button className="btn-primary mt-6 flex items-center gap-2">
            <Save size={14} /> Save Launch Config
          </button>
        </div>
      )}

      {/* Integrations */}
      {activeTab === 'integrations' && (
        <div className="card">
          <h2 className="section-title mb-6">🔗 Integration Keys</h2>
          <div className="flex flex-col gap-3">
            {[
              { name: 'Stripe', key: 'STRIPE_SECRET_KEY', status: 'Connected' },
              { name: 'Resend', key: 'RESEND_API_KEY', status: 'Connected' },
              { name: 'AWIN', key: 'AWIN_API_KEY', status: 'Partial' },
              { name: 'Heartbeat', key: 'HEARTBEAT_API_KEY', status: 'Connected' },
              { name: 'Kajabi', key: 'KAJABI_API_KEY', status: 'Connected' },
            ].map(int => (
              <div key={int.name} className="flex items-center justify-between p-4 rounded-[12px]"
                style={{ background: '#faf8fc', border: '1px solid rgba(98,52,145,0.1)' }}>
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-[8px] flex items-center justify-center"
                    style={{ background: 'rgba(98,52,145,0.1)' }}>
                    <Link2 size={13} className="text-primary" />
                  </div>
                  <div>
                    <span className="text-[13px] font-bold block" style={{ color: '#2d1a47' }}>{int.name}</span>
                    <span className="text-[10px] tracking-[0.5px]" style={{ color: '#9b6fc4' }}>{int.key}</span>
                  </div>
                </div>
                <span className={`pill ${int.status === 'Connected' ? 'pill-green' : 'pill-amber'}`}>
                  {int.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Notifications */}
      {activeTab === 'notifications' && (
        <div className="card">
          <h2 className="section-title mb-6">🔔 Notification Preferences</h2>
          <div className="flex flex-col gap-3">
            {Object.entries(notifications).map(([name, enabled]) => (
              <div key={name} className="flex items-center justify-between p-4 rounded-[12px]"
                style={{ background: '#faf8fc', border: '1px solid rgba(98,52,145,0.1)' }}>
                <span className="text-[13px] font-bold" style={{ color: '#2d1a47' }}>{name}</span>
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

          <button className="btn-primary mt-6 flex items-center gap-2">
            <Save size={14} /> Save Preferences
          </button>
        </div>
      )}
    </div>
  )
}
