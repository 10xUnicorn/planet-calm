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
      <div className="rounded-[14px] p-6 mb-6 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg,#2d1a47 0%,#623491 60%,#9b6fc4 100%)' }}>
        <div className="absolute right-8 top-1/2 -translate-y-1/2 text-[48px] opacity-15">
          🤖
        </div>
        <div className="flex items-center gap-3 mb-2">
          <h2 className="text-[18px] font-bold" style={{ fontFamily: 'Georgia, serif', color: '#e8c487' }}>🤖 AI Brain</h2>
          <span className="ai-chip">✦ Powered by AI</span>
        </div>
        <p className="text-[12px]" style={{ color: 'rgba(255,255,255,0.75)', fontFamily: 'Georgia, serif' }}>
          Sequence generation, content drafting, reactivation intelligence, and BARKType analysis
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {tabs.map(t => (
          <button key={t.key} onClick={() => setActiveTab(t.key)}
            className="px-4 py-[9px] rounded-full text-[11.5px] font-bold cursor-pointer flex items-center gap-2 transition-all"
            style={{
              background: activeTab === t.key ? 'linear-gradient(135deg,#623491,#9b6fc4)' : 'rgba(98,52,145,0.08)',
              color: activeTab === t.key ? '#e8c487' : '#623491',
              fontFamily: 'Georgia, serif',
              border: activeTab === t.key ? 'none' : '1px solid rgba(98,52,145,0.15)',
            }}>
            <t.icon size={13} /> {t.label}
          </button>
        ))}
      </div>

      {/* Sequence Builder */}
      {activeTab === 'sequences' && (
        <div className="bg-white rounded-[14px] p-6"
          style={{ border: '1px solid rgba(98,52,145,0.1)', boxShadow: '0 2px 16px rgba(98,52,145,0.06)' }}>
          <div className="flex items-center gap-2 text-[14px] font-bold mb-4" style={{ fontFamily: 'Georgia, serif', color: '#2d1a47' }}>
            ✨ Build an Email Sequence
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: '#9b6fc4' }}>Goal</label>
              <select className="w-full px-3 py-2 rounded-[12px] text-[12px] outline-none" style={{ background: '#faf8fc', border: '1px solid rgba(98,52,145,0.15)', fontFamily: 'Georgia, serif' }}>
                <option>Reactivate Silent Buyers</option>
                <option>Re-engage Lapsed Affiliates</option>
                <option>Onboard New Clients</option>
                <option>Book Pre-Sale Nurture</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: '#9b6fc4' }}>Audience Segment</label>
              <select className="w-full px-3 py-2 rounded-[12px] text-[12px] outline-none" style={{ background: '#faf8fc', border: '1px solid rgba(98,52,145,0.15)', fontFamily: 'Georgia, serif' }}>
                <option>Silent Buyers (90+ days)</option>
                <option>Decoder Ebook Buyers</option>
                <option>Chew Sub Lapsed</option>
                <option>AWIN Dormant Affiliates</option>
                <option>New Collective Members</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="block text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: '#9b6fc4' }}>Additional Context</label>
              <textarea className="w-full px-3 py-2 rounded-[12px] text-[12px] outline-none h-20 resize-none"
                style={{ background: '#faf8fc', border: '1px solid rgba(98,52,145,0.15)', fontFamily: 'Georgia, serif' }}
                placeholder="E.g., Focus on book launch angle, mention BARKType quiz, use Calm-First language..." />
            </div>
          </div>
          <button className="px-6 py-[10px] rounded-[12px] text-[12px] font-bold cursor-pointer flex items-center gap-2"
            style={{ background: 'linear-gradient(135deg,#623491,#9b6fc4)', color: '#e8c487', fontFamily: 'Georgia, serif', border: 'none' }}>
            <Wand2 size={14} /> Generate Sequence
          </button>

          {/* Demo Output */}
          <div className="mt-6 p-4 rounded-[12px]" style={{ background: 'linear-gradient(135deg,#f9f5fe,#ede4f5)', border: '1px solid rgba(98,52,145,0.1)' }}>
            <div className="flex items-center gap-[6px] text-[11px] font-bold mb-3" style={{ color: '#623491', fontFamily: 'Georgia, serif' }}>
              ✨ Generated 5-Email Reactivation Sequence
            </div>
            {[
              { day: 'Day 0', subject: 'We miss you (and your dog misses calm walks)', status: 'Ready' },
              { day: 'Day 3', subject: "Here's what changed since you were last here", status: 'Ready' },
              { day: 'Day 7', subject: 'Your BARKType profile unlocked something new', status: 'Ready' },
              { day: 'Day 12', subject: "Stephanie's new book \u2014 early access for past members", status: 'Ready' },
              { day: 'Day 18', subject: 'Last chance: Rejoin Peaceful Paws at founding rate', status: 'Ready' },
            ].map((e, i) => (
              <div key={i} className="flex items-center justify-between py-2"
                style={{ borderBottom: i < 4 ? '1px solid rgba(98,52,145,0.06)' : 'none' }}>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold px-2 py-1 rounded" style={{ background: 'rgba(98,52,145,0.08)', color: '#623491' }}>{e.day}</span>
                  <span className="text-[12px]" style={{ fontFamily: 'Georgia, serif', color: '#2d1a47' }}>{e.subject}</span>
                </div>
                <span className="pill pill-green">{e.status}</span>
              </div>
            ))}
            <div className="flex gap-2 mt-3">
              <button className="px-4 py-2 rounded-[12px] text-[11px] font-bold cursor-pointer flex items-center gap-2"
                style={{ background: 'linear-gradient(135deg,#623491,#9b6fc4)', color: '#e8c487', fontFamily: 'Georgia, serif', border: 'none' }}>
                <CheckCircle size={12} /> Approve & Activate
              </button>
              <button className="px-4 py-2 rounded-[12px] text-[11px] cursor-pointer"
                style={{ background: 'rgba(98,52,145,0.08)', color: '#623491', fontFamily: 'Georgia, serif', border: '1px solid rgba(98,52,145,0.15)' }}>
                Edit Emails
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Content Drafts */}
      {activeTab === 'drafts' && (
        <div className="bg-white rounded-[14px] p-6"
          style={{ border: '1px solid rgba(98,52,145,0.1)', boxShadow: '0 2px 16px rgba(98,52,145,0.06)' }}>
          <div className="text-[14px] font-bold mb-4" style={{ fontFamily: 'Georgia, serif', color: '#2d1a47' }}>Content Drafting Assistant</div>
          <div className="mb-4">
            <label className="block text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: '#9b6fc4' }}>What do you need?</label>
            <textarea className="w-full px-3 py-2 rounded-[12px] text-[12px] outline-none h-24 resize-none"
              style={{ background: '#faf8fc', border: '1px solid rgba(98,52,145,0.15)', fontFamily: 'Georgia, serif' }}
              placeholder="E.g., Write a Substack post about the connection between dog behavior and human leadership..." />
          </div>
          <button className="px-6 py-[10px] rounded-[12px] text-[12px] font-bold cursor-pointer flex items-center gap-2"
            style={{ background: 'linear-gradient(135deg,#623491,#9b6fc4)', color: '#e8c487', fontFamily: 'Georgia, serif', border: 'none' }}>
            <Wand2 size={14} /> Generate Draft
          </button>
        </div>
      )}

      {/* Reactivation */}
      {activeTab === 'reactivation' && (
        <div className="bg-white rounded-[14px] p-6"
          style={{ border: '1px solid rgba(98,52,145,0.1)', boxShadow: '0 2px 16px rgba(98,52,145,0.06)' }}>
          <div className="text-[14px] font-bold mb-4" style={{ fontFamily: 'Georgia, serif', color: '#2d1a47' }}>Reactivation Intelligence</div>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="p-4 rounded-[12px] text-center" style={{ background: '#f9f5fe', border: '1px solid rgba(98,52,145,0.1)' }}>
              <div className="text-[24px] font-bold" style={{ fontFamily: 'Georgia, serif', color: '#623491' }}>548</div>
              <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: '#9b6fc4' }}>Silent Buyers</div>
            </div>
            <div className="p-4 rounded-[12px] text-center" style={{ background: '#fdf8ec', border: '1px solid rgba(232,196,135,0.3)' }}>
              <div className="text-[24px] font-bold" style={{ fontFamily: 'Georgia, serif', color: '#9a6800' }}>~$12K</div>
              <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: '#9a6800' }}>Recovery Potential</div>
            </div>
            <div className="p-4 rounded-[12px] text-center" style={{ background: '#e8f5ee', border: '1px solid rgba(42,157,92,0.2)' }}>
              <div className="text-[24px] font-bold" style={{ fontFamily: 'Georgia, serif', color: '#1e7d47' }}>7.8%</div>
              <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: '#1e7d47' }}>Conversion Rate</div>
            </div>
          </div>
          <button className="px-6 py-[10px] rounded-[12px] text-[12px] font-bold cursor-pointer flex items-center gap-2"
            style={{ background: 'linear-gradient(135deg,#623491,#9b6fc4)', color: '#e8c487', fontFamily: 'Georgia, serif', border: 'none' }}>
            <Wand2 size={14} /> Run Batch Reactivation (548 contacts)
          </button>
        </div>
      )}

      {/* BARKType Analyzer */}
      {activeTab === 'analyzer' && (
        <div className="bg-white rounded-[14px] p-6"
          style={{ border: '1px solid rgba(98,52,145,0.1)', boxShadow: '0 2px 16px rgba(98,52,145,0.06)' }}>
          <div className="text-[14px] font-bold mb-4" style={{ fontFamily: 'Georgia, serif', color: '#2d1a47' }}>BARKType Profile Analyzer</div>
          <p className="text-[12px] italic mb-4" style={{ color: '#7a5ea0' }}>Input quiz responses to get BARKType profile with recommended content and sequence</p>
          <textarea className="w-full px-3 py-2 rounded-[12px] text-[12px] outline-none h-24 resize-none mb-4"
            style={{ background: '#faf8fc', border: '1px solid rgba(98,52,145,0.15)', fontFamily: 'Georgia, serif' }}
            placeholder="Paste quiz responses or describe the contact's behavior patterns..." />
          <button className="px-6 py-[10px] rounded-[12px] text-[12px] font-bold cursor-pointer flex items-center gap-2"
            style={{ background: 'linear-gradient(135deg,#623491,#9b6fc4)', color: '#e8c487', fontFamily: 'Georgia, serif', border: 'none' }}>
            <Brain size={14} /> Analyze BARKType
          </button>
        </div>
      )}

      {/* Usage Log */}
      {activeTab === 'usage' && (
        <div className="bg-white rounded-[14px] p-6"
          style={{ border: '1px solid rgba(98,52,145,0.1)', boxShadow: '0 2px 16px rgba(98,52,145,0.06)' }}>
          <div className="text-[14px] font-bold mb-4" style={{ fontFamily: 'Georgia, serif', color: '#2d1a47' }}>AI Usage Log</div>
          <table className="w-full">
            <thead>
              <tr>
                {['Timestamp', 'Type', 'Model', 'Tokens', 'Est. Cost'].map(h => (
                  <th key={h} className="text-left text-[10px] font-bold tracking-[1.5px] uppercase pb-2 px-3"
                    style={{ color: '#9b6fc4', fontFamily: 'Georgia, serif', borderBottom: '2px solid rgba(98,52,145,0.1)' }}>{h}</th>
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
                  <td className="py-[11px] px-3 text-[12px]" style={{ borderBottom: '1px solid rgba(98,52,145,0.06)', color: '#7a5ea0' }}>{r.time}</td>
                  <td className="py-[11px] px-3" style={{ borderBottom: '1px solid rgba(98,52,145,0.06)' }}><span className="tag">{r.type}</span></td>
                  <td className="py-[11px] px-3 text-[12px]" style={{ borderBottom: '1px solid rgba(98,52,145,0.06)', color: '#623491' }}>{r.model}</td>
                  <td className="py-[11px] px-3 text-[12px]" style={{ borderBottom: '1px solid rgba(98,52,145,0.06)' }}>{r.tokens}</td>
                  <td className="py-[11px] px-3 text-[12px] font-bold" style={{ borderBottom: '1px solid rgba(98,52,145,0.06)', color: '#b8860b' }}>{r.cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
