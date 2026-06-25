import { communityPulse } from '@/lib/demo-data'

export default function CommunityPage() {
  const recentMembers = [
    { name: 'Marisol V.', tier: 'Collective', color: 'c1' },
    { name: 'Trevor K.', tier: 'Studio', color: 'c2' },
    { name: 'Dr. Peter W.', tier: 'Council', color: 'c3' },
    { name: 'Linnae R.', tier: 'Collective', color: 'c4' },
    { name: 'Rachel N.', tier: 'Council', color: 'c5' },
  ]

  return (
    <div>
      {/* Hero */}
      <div className="rounded-[16px] p-7 mb-6 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg,#2d1a47 0%,#623491 60%,#9b6fc4 100%)' }}>
        <div className="absolute right-8 top-1/2 -translate-y-1/2 text-[64px] opacity-15">🐾</div>
        <h2 className="text-[22px] font-bold mb-[6px]" style={{ fontFamily: 'Georgia, serif', color: '#e8c487' }}>
          Community Hub
        </h2>
        <p className="text-[13px] italic" style={{ color: 'rgba(255,255,255,0.75)', fontFamily: 'Georgia, serif' }}>
          Where calm-first leaders connect, share wins, and grow together
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-[14px] mb-6">
        {[
          { icon: '🐾', val: '1,247', label: 'Total Members' },
          { icon: '💬', val: '342', label: 'Posts This Month' },
          { icon: '🔥', val: '89%', label: 'Engagement Rate' },
          { icon: '🌱', val: '94', label: 'New This Month' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-[13px] p-[18px] text-center relative overflow-hidden"
            style={{ border: '1px solid rgba(98,52,145,0.1)', boxShadow: '0 2px 12px rgba(98,52,145,0.07)' }}>
            <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{ background: 'linear-gradient(90deg,#e8c487,#623491)' }} />
            <div className="text-[22px] mb-[6px]">{s.icon}</div>
            <div className="text-[24px] font-bold" style={{ fontFamily: 'Georgia, serif', color: '#2d1a47' }}>{s.val}</div>
            <div className="text-[10px] font-bold tracking-[1.5px] uppercase mt-[3px]" style={{ color: '#9b6fc4', fontFamily: 'Georgia, serif' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Threads + Members */}
      <div className="grid gap-4 mb-6" style={{ gridTemplateColumns: '1.4fr 1fr' }}>
        {/* Threads */}
        <div className="bg-white rounded-[14px] p-5"
          style={{ border: '1px solid rgba(98,52,145,0.1)', boxShadow: '0 2px 16px rgba(98,52,145,0.06)' }}>
          <div className="text-[14px] font-bold mb-4" style={{ fontFamily: 'Georgia, serif', color: '#2d1a47' }}>
            🔥 Trending Threads
          </div>
          {communityPulse.threads.map((t, i) => (
            <div key={i} className="py-[13px]" style={{ borderBottom: i < communityPulse.threads.length - 1 ? '1px solid rgba(98,52,145,0.08)' : 'none' }}>
              <div className="text-[12.5px] font-bold" style={{ fontFamily: 'Georgia, serif', color: '#2d1a47' }}>
                {t.title}
                {t.hot && <span className="text-[10px] ml-[6px]" style={{ color: '#e8c487' }}>🔥 HOT</span>}
              </div>
              <div className="text-[11px] italic" style={{ color: '#9b6fc4' }}>
                Posted by {t.author} · {t.reactions} reactions · {t.space}
              </div>
            </div>
          ))}
        </div>

        {/* Active Members */}
        <div className="bg-white rounded-[14px] p-5"
          style={{ border: '1px solid rgba(98,52,145,0.1)', boxShadow: '0 2px 16px rgba(98,52,145,0.06)' }}>
          <div className="text-[14px] font-bold mb-4" style={{ fontFamily: 'Georgia, serif', color: '#2d1a47' }}>
            ✨ Most Active Members
          </div>
          {recentMembers.map((m, i) => (
            <div key={i} className="flex items-center gap-[10px] py-[10px]"
              style={{ borderBottom: i < recentMembers.length - 1 ? '1px solid rgba(98,52,145,0.07)' : 'none' }}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold text-white member-av ${m.color}`}
                style={{
                  background: m.color === 'c1' ? 'linear-gradient(135deg,#623491,#9b6fc4)' :
                    m.color === 'c2' ? 'linear-gradient(135deg,#2a9d5c,#52c880)' :
                    m.color === 'c3' ? 'linear-gradient(135deg,#c0392b,#e05a50)' :
                    m.color === 'c4' ? 'linear-gradient(135deg,#9a6800,#d4a017)' :
                    'linear-gradient(135deg,#1a5a8a,#3a8ac4)',
                }}>
                {m.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <div className="text-[12.5px] font-bold" style={{ fontFamily: 'Georgia, serif', color: '#2d1a47' }}>{m.name}</div>
                <div className="text-[10.5px] italic" style={{ color: '#7a5ea0' }}>{m.tier}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reactivation Bar */}
      <div className="bg-white rounded-[14px] p-5"
        style={{ border: '1px solid rgba(98,52,145,0.1)', boxShadow: '0 2px 16px rgba(98,52,145,0.06)' }}>
        <div className="text-[14px] font-bold mb-4" style={{ fontFamily: 'Georgia, serif', color: '#2d1a47' }}>
          🔁 Re-Engagement Dashboard
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[
            { num: '38', label: 'New Members — No Post Yet', cta: 'Send Warm Nudge' },
            { num: '14', label: 'Low Engagement (14+ days)', cta: 'Run AI Sequence' },
            { num: '7', label: 'At Risk of Churning', cta: 'Personal Check-in' },
          ].map(r => (
            <div key={r.label} className="rounded-[12px] p-4 text-center"
              style={{ background: 'linear-gradient(135deg,#f9f5fe,#fdf0ff)', border: '1px solid rgba(98,52,145,0.1)' }}>
              <div className="text-[26px] font-bold" style={{ fontFamily: 'Georgia, serif', color: '#623491' }}>{r.num}</div>
              <div className="text-[10.5px] font-bold tracking-[1.2px] uppercase mt-1"
                style={{ color: '#9b6fc4', fontFamily: 'Georgia, serif' }}>{r.label}</div>
              <div className="text-[11px] italic mt-2" style={{ fontFamily: 'Georgia, serif', color: '#2d1a47' }}>{r.cta}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
