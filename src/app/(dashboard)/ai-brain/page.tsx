'use client'

import { useState } from 'react'
import { Brain, Wand2, Users, Mail, FileText, BarChart3, CheckCircle } from 'lucide-react'

export default function AIBrainPage() {
  const [activeTab, setActiveTab] = useState<'sequences' | 'drafts' | 'reactivation' | 'analyzer' | 'usage'>('sequences')

  const tabs = [
    { key: 'sequences', label: 'Sequence Builder', icon: Mail },
    { key: 'drafts', label: 'Content Drafts', icon: FileText },
    { key: 'reactivation', label: 'Reactivation', icon: Users },
    { key: 'analyzer', label: 'BARKType Analyzer', icon: Brain },
    { key: 'usage', label: 'Usage Log', icon: BarChart3 },
  ] as const

  return (
    <div>
      {/* Hero */}
      <div className="mb-6" style={{
        borderRadius: '14px',
        padding: '24px',
        background: 'linear-gradient(135deg,#2d1a47 0%,#623491 60%,#9b6fc4 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          right: '32px',
          top: '50%',
          transform: 'translateY(-50%)',
          fontSize: '48px',
          opacity: 0.15,
        }}>
          🤖
        </div>
        <div className="flex items-center gap-3" style={{ marginBottom: '8px' }}>
          <h2 style={{ fontFamily: 'Georgia, serif', color: '#e8c487', fontSize: '18px', fontWeight: 700 }}>🤖 AI Brain</h2>
          <span className="ai-chip">✦ Powered by AI</span>
        </div>
        <p style={{ color: 'rgba(255,255,255,0.75)', fontFamily: 'Georgia, serif', fontSize: '12px' }}>
          Sequence generation, content drafting, reactivation intelligence, and BARKType analysis
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {tabs.map(t => (
          <button key={t.key} onClick={() => setActiveTab(t.key)}
            className={`flex items-center gap-2 ${activeTab === t.key ? 'page-tab page-tab-active' : 'page-tab'}`}
            style={{ padding: '9px 16px', fontSize: '11.5px' }}>
            <t.icon size={13} /> {t.label}
          </button>
        ))}
      </div>

      {/* Sequence Builder */}
      {activeTab === 'sequences' && (
        <div className="card" style={{ padding: '24px' }}>
          <div className="section-title" style={{ marginBottom: '16px' }}>
            ✨ Build an Email Sequence
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="form-label">Goal</label>
              <select className="form-select">
                <option>Reactivate Silent Buyers</option>
                <option>Re-engage Lapsed Affiliates</option>
                <option>Onboard New Clients</option>
                <option>Book Pre-Sale Nurture</option>
              </select>
            </div>
            <div>
              <label className="form-label">Audience Segment</label>
              <select className="form-select">
                <option>Silent Buyers (90+ days)</option>
                <option>Decoder Ebook Buyers</option>
                <option>Chew Sub Lapsed</option>
                <option>AWIN Dormant Affiliates</option>
                <option>New Collective Members</option>
              </select>
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <label className="form-label">Additional Context</label>
              <textarea className="form-input" style={{ height: '80px', resize: 'none' }}
                placeholder="E.g., Focus on book launch angle, mention BARKType quiz, use Calm-First language..." />
            </div>
          </div>
          <button className="btn-primary flex items-center gap-2">
            <Wand2 size={14} /> Generate Sequence
          </button>

          {/* Demo Output */}
          <div style={{
            marginTop: '24px',
            padding: '16px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg,#f9f5fe,#ede4f5)',
            border: '1px solid rgba(98,52,145,0.1)',
          }}>
            <div style={{ color: '#623491', fontFamily: 'Georgia, serif', fontSize: '11px', fontWeight: 700, marginBottom: '12px' }}>
              ✨ Generated 5-Email Reactivation Sequence
            </div>
            {[
              { day: 'Day 0', subject: 'We miss you (and your dog misses calm walks)', status: 'Ready' },
              { day: 'Day 3', subject: "Here's what changed since you were last here", status: 'Ready' },
              { day: 'Day 7', subject: 'Your BARKType profile unlocked something new', status: 'Ready' },
              { day: 'Day 12', subject: "Stephanie's new book \u2014 early access for past members", status: 'Ready' },
              { day: 'Day 18', subject: 'Last chance: Rejoin Peaceful Paws at founding rate', status: 'Ready' },
            ].map((e, i) => (
              <div key={i} className="flex items-center justify-between" style={{
                padding: '8px 0',
                borderBottom: i < 4 ? '1px solid rgba(98,52,145,0.06)' : 'none',
              }}>
                <div className="flex items-center gap-3">
                  <span style={{
                    fontSize: '10px',
                    fontWeight: 700,
                    padding: '4px 8px',
                    borderRadius: '4px',
                    background: 'rgba(98,52,145,0.08)',
                    color: '#623491',
                  }}>{e.day}</span>
                  <span style={{ fontFamily: 'Georgia, serif', color: '#2d1a47', fontSize: '12px' }}>{e.subject}</span>
                </div>
                <span className="pill pill-green">{e.status}</span>
              </div>
            ))}
            <div className="flex gap-2" style={{ marginTop: '12px' }}>
              <button className="btn-primary flex items-center gap-2" style={{ padding: '8px 16px', fontSize: '11px' }}>
                <CheckCircle size={12} /> Approve & Activate
              </button>
              <button className="btn-secondary" style={{ padding: '8px 16px', fontSize: '11px' }}>
                Edit Emails
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Content Drafts */}
      {activeTab === 'drafts' && (
        <div className="card" style={{ padding: '24px' }}>
          <div className="section-title" style={{ marginBottom: '16px' }}>Content Drafting Assistant</div>
          <div style={{ marginBottom: '16px' }}>
            <label className="form-label">What do you need?</label>
            <textarea className="form-input" style={{ height: '96px', resize: 'none' }}
              placeholder="E.g., Write a Substack post about the connection between dog behavior and human leadership..." />
          </div>
          <button className="btn-primary flex items-center gap-2">
            <Wand2 size={14} /> Generate Draft
          </button>
        </div>
      )}

      {/* Reactivation */}
      {activeTab === 'reactivation' && (
        <div className="card" style={{ padding: '24px' }}>
          <div className="section-title" style={{ marginBottom: '16px' }}>Reactivation Intelligence</div>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div style={{ padding: '16px', borderRadius: '12px', textAlign: 'center', background: '#f9f5fe', border: '1px solid rgba(98,52,145,0.1)' }}>
              <div style={{ fontFamily: 'Georgia, serif', color: '#623491', fontSize: '24px', fontWeight: 700 }}>548</div>
              <div style={{ color: '#9b6fc4', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px' }}>Silent Buyers</div>
            </div>
            <div style={{ padding: '16px', borderRadius: '12px', textAlign: 'center', background: '#fdf8ec', border: '1px solid rgba(232,196,135,0.3)' }}>
              <div style={{ fontFamily: 'Georgia, serif', color: '#9a6800', fontSize: '24px', fontWeight: 700 }}>~$12K</div>
              <div style={{ color: '#9a6800', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px' }}>Recovery Potential</div>
            </div>
            <div style={{ padding: '16px', borderRadius: '12px', textAlign: 'center', background: '#e8f5ee', border: '1px solid rgba(42,157,92,0.2)' }}>
              <div style={{ fontFamily: 'Georgia, serif', color: '#1e7d47', fontSize: '24px', fontWeight: 700 }}>7.8%</div>
              <div style={{ color: '#1e7d47', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px' }}>Conversion Rate</div>
            </div>
          </div>
          <button className="btn-primary flex items-center gap-2">
            <Wand2 size={14} /> Run Batch Reactivation (548 contacts)
          </button>
        </div>
      )}

      {/* BARKType Analyzer */}
      {activeTab === 'analyzer' && (
        <div className="card" style={{ padding: '24px' }}>
          <div className="section-title" style={{ marginBottom: '16px' }}>BARKType Profile Analyzer</div>
          <p style={{ color: '#7a5ea0', fontSize: '12px', fontStyle: 'italic', marginBottom: '16px' }}>Input quiz responses to get BARKType profile with recommended content and sequence</p>
          <textarea className="form-input" style={{ height: '96px', resize: 'none', marginBottom: '16px' }}
            placeholder="Paste quiz responses or describe the contact's behavior patterns..." />
          <button className="btn-primary flex items-center gap-2">
            <Brain size={14} /> Analyze BARKType
          </button>
        </div>
      )}

      {/* Usage Log */}
      {activeTab === 'usage' && (
        <div className="card" style={{ padding: '24px' }}>
          <div className="section-title" style={{ marginBottom: '16px' }}>AI Usage Log</div>
          <table>
            <thead>
              <tr>
                {['Timestamp', 'Type', 'Model', 'Tokens', 'Est. Cost'].map(h => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { time: '2 hours ago', type: 'Sequence Gen', model: 'GPT-4', tokens: '3,420', cost: '$0.10' },
                { time: '5 hours ago', type: 'Content Draft', model: 'GPT-4', tokens: '2,100', cost: '$0.06' },
                { time: '1 day ago', type: 'Reactivation', model: 'GPT-4', tokens: '18,500', cost: '$0.56' },
                { time: '2 days ago', type: 'BARKType Analysis', model: 'GPT-4', tokens: '1,840', cost: '$0.06' },
              ].map((r, i) => (
                <tr key={i}>
                  <td style={{ color: '#7a5ea0' }}>{r.time}</td>
                  <td><span className="tag">{r.type}</span></td>
                  <td style={{ color: '#623491' }}>{r.model}</td>
                  <td>{r.tokens}</td>
                  <td className="gold-accent">{r.cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
