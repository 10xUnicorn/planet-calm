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
      <div className="mb-6" style={{
        borderRadius: '16px',
        padding: '28px',
        background: 'linear-gradient(135deg,#2d1a47 0%,#623491 60%,#9b6fc4 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          right: '32px',
          top: '50%',
          transform: 'translateY(-50%)',
          fontSize: '64px',
          opacity: 0.15,
        }}>
          🐾
        </div>
        <h2 style={{
          fontFamily: 'Georgia, serif',
          color: '#e8c487',
          fontSize: '22px',
          fontWeight: 700,
          marginBottom: '6px',
        }}>
          🐾 Community Hub
        </h2>
        <p style={{
          color: 'rgba(255,255,255,0.75)',
          fontFamily: 'Georgia, serif',
          fontSize: '13px',
          fontStyle: 'italic',
        }}>
          Where calm-first leaders connect, share wins, and grow together
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-[14px] mb-6">
        {[
          { val: '1,247', label: 'Total Members', icon: '🐾' },
          { val: '342', label: 'Posts This Month', icon: '💬' },
          { val: '89%', label: 'Engagement Rate', icon: '🔥' },
          { val: '94', label: 'New This Month', icon: '🌱' },
        ].map(s => (
          <div key={s.label} className="kpi-card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '18px', marginBottom: '6px' }}>{s.icon}</div>
            <div style={{ fontFamily: 'Georgia, serif', color: '#2d1a47', fontSize: '24px', fontWeight: 700 }}>{s.val}</div>
            <div style={{ color: '#9b6fc4', fontFamily: 'Georgia, serif', fontSize: '10px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', marginTop: '3px' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Threads + Members */}
      <div className="grid gap-4 mb-6" style={{ gridTemplateColumns: '1.4fr 1fr' }}>
        {/* Threads */}
        <div className="card">
          <div className="section-title" style={{ marginBottom: '16px' }}>
            🔥 Trending Threads
          </div>
          {communityPulse.threads.map((t, i) => (
            <div key={i} style={{
              padding: '13px 0',
              borderBottom: i < communityPulse.threads.length - 1 ? '1px solid rgba(98,52,145,0.06)' : 'none',
            }}>
              <div style={{ fontFamily: 'Georgia, serif', color: '#2d1a47', fontSize: '12.5px', fontWeight: 700 }}>
                {t.title}
                {t.hot && <span style={{ color: '#e8c487', fontSize: '10px', marginLeft: '6px' }}>🔥 HOT</span>}
              </div>
              <div style={{ color: '#9b6fc4', fontSize: '11px', fontStyle: 'italic' }}>
                Posted by {t.author} &middot; {t.reactions} reactions &middot; {t.space}
              </div>
            </div>
          ))}
        </div>

        {/* Active Members */}
        <div className="card">
          <div className="section-title" style={{ marginBottom: '16px' }}>
            ✨ Most Active Members
          </div>
          {recentMembers.map((m, i) => (
            <div key={i} className="flex items-center gap-[10px]"
              style={{
                padding: '10px 0',
                borderBottom: i < recentMembers.length - 1 ? '1px solid rgba(98,52,145,0.06)' : 'none',
              }}>
              <div className="flex items-center justify-center" style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                fontSize: '12px',
                fontWeight: 700,
                color: '#fff',
                background: m.color === 'c1' ? 'linear-gradient(135deg,#623491,#9b6fc4)' :
                  m.color === 'c2' ? 'linear-gradient(135deg,#2a9d5c,#52c880)' :
                  m.color === 'c3' ? 'linear-gradient(135deg,#c0392b,#e05a50)' :
                  m.color === 'c4' ? 'linear-gradient(135deg,#9a6800,#d4a017)' :
                  'linear-gradient(135deg,#1a5a8a,#3a8ac4)',
              }}>
                {m.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <div style={{ fontFamily: 'Georgia, serif', color: '#2d1a47', fontSize: '12.5px', fontWeight: 700 }}>{m.name}</div>
                <div style={{ color: '#7a5ea0', fontSize: '10.5px', fontStyle: 'italic' }}>{m.tier}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reactivation Bar */}
      <div className="card">
        <div className="section-title" style={{ marginBottom: '16px' }}>
          🔁 Re-Engagement Dashboard
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[
            { num: '38', label: 'New Members \u2014 No Post Yet', cta: 'Send Warm Nudge' },
            { num: '14', label: 'Low Engagement (14+ days)', cta: 'Run AI Sequence' },
            { num: '7', label: 'At Risk of Churning', cta: 'Personal Check-in' },
          ].map(r => (
            <div key={r.label} style={{
              borderRadius: '12px',
              padding: '16px',
              textAlign: 'center',
              background: 'linear-gradient(135deg,#f9f5fe,#fdf0ff)',
              border: '1px solid rgba(98,52,145,0.1)',
            }}>
              <div style={{ fontFamily: 'Georgia, serif', color: '#623491', fontSize: '26px', fontWeight: 700 }}>{r.num}</div>
              <div style={{ color: '#9b6fc4', fontFamily: 'Georgia, serif', fontSize: '10.5px', fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase', marginTop: '4px' }}>{r.label}</div>
              <div style={{ fontFamily: 'Georgia, serif', color: '#2d1a47', fontSize: '11px', fontStyle: 'italic', marginTop: '8px' }}>{r.cta}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
