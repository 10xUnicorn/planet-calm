import {
  kpiData, communityPulse, bookLaunchPhases, silentBuyerData,
  aiInsights, revenueByOffer, integrations
} from '@/lib/demo-data'
import Link from 'next/link'

/* ── Shared inline style objects ── */

const cardStyle: React.CSSProperties = {
  background: '#fff',
  borderRadius: 14,
  padding: 20,
  border: '1px solid rgba(98,52,145,0.1)',
  boxShadow: '0 2px 16px rgba(98,52,145,0.06)',
}

const sectionTitleStyle: React.CSSProperties = {
  fontFamily: 'Georgia, serif',
  fontSize: 14,
  fontWeight: 700,
  color: '#2d1a47',
}

const thStyle: React.CSSProperties = {
  fontSize: 10,
  fontWeight: 700,
  letterSpacing: '1.5px',
  textTransform: 'uppercase' as const,
  color: '#9b6fc4',
  fontFamily: 'Georgia, serif',
  borderBottom: '2px solid rgba(98,52,145,0.1)',
  textAlign: 'left' as const,
  padding: '0 12px 8px',
}

const tdStyle: React.CSSProperties = {
  padding: '11px 12px',
  borderBottom: '1px solid rgba(98,52,145,0.06)',
  fontSize: '12.5px',
  color: '#2d1a47',
  fontFamily: 'Georgia, serif',
}

/* ── Pill inline styles ── */

const pillBase: React.CSSProperties = {
  display: 'inline-block',
  padding: '3px 10px',
  borderRadius: 20,
  fontSize: '10.5px',
  fontWeight: 700,
  letterSpacing: '0.5px',
  fontFamily: 'Georgia, serif',
  whiteSpace: 'nowrap',
}

const pillStyles: Record<string, React.CSSProperties> = {
  'pill-green': { ...pillBase, background: '#e8f5ee', color: '#1e7d47' },
  'pill-amber': { ...pillBase, background: '#fdf3dc', color: '#9a6800' },
  'pill-red':   { ...pillBase, background: '#fde8e8', color: '#c0392b' },
  'pill-purple': { ...pillBase, background: '#ede4f5', color: '#623491' },
  'pill-blue':  { ...pillBase, background: '#e4edf5', color: '#1a5a8a' },
  'pill-gold':  { ...pillBase, background: 'linear-gradient(135deg, #fdf0d0, #f5e0a0)', color: '#7a5500', border: '1px solid rgba(232,196,135,0.6)' },
}

const aiChipStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 5,
  padding: '4px 13px',
  borderRadius: 20,
  fontSize: '10.5px',
  fontWeight: 700,
  letterSpacing: '0.8px',
  fontFamily: 'Georgia, serif',
  background: 'linear-gradient(135deg, #2d1a47, #623491)',
  color: '#e8c487',
  whiteSpace: 'nowrap',
  textDecoration: 'none',
  cursor: 'pointer',
}

export default function OverviewPage() {
  return (
    <div>
      {/* KPI Row */}
      <div className="grid grid-cols-4 gap-4" style={{ marginBottom: 24 }}>
        {[
          { label: 'Total Revenue (LTM)', ...kpiData.totalRevenue },
          { label: 'Active Community Members', ...kpiData.communityMembers },
          { label: 'Book Pre-Sales ("What the BARK?")', ...kpiData.bookPreSales },
          { label: 'BARKType Pipeline', ...kpiData.barktypePipeline },
        ].map((kpi) => (
          <div key={kpi.label} style={{ ...cardStyle, position: 'relative', overflow: 'hidden' }}>
            {/* gradient top bar */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: 3,
              background: 'linear-gradient(90deg,#623491,#e8c487)',
            }} />
            <div style={{
              fontSize: 10, fontWeight: 700, letterSpacing: '1.8px',
              textTransform: 'uppercase', marginBottom: 8,
              color: '#9b6fc4', fontFamily: 'Georgia, serif',
            }}>{kpi.label}</div>
            <div style={{
              fontFamily: 'Georgia, serif', fontSize: 28, fontWeight: 700,
              lineHeight: 1, color: '#2d1a47',
            }}>{kpi.value}</div>
            <div style={{
              fontSize: 11, marginTop: 6,
              color: kpi.up ? '#2a9d5c' : '#7a5ea0',
            }}>{kpi.trend}</div>
            <div style={{
              fontSize: '10.5px', fontStyle: 'italic', marginTop: 2,
              color: '#9b6fc4',
            }}>{kpi.sub}</div>
          </div>
        ))}
      </div>

      {/* Community Pulse + Book Launch */}
      <div className="grid grid-cols-2 gap-4" style={{ marginBottom: 24 }}>
        {/* Community Pulse */}
        <div style={cardStyle}>
          <div className="flex items-center justify-between" style={{ marginBottom: 16 }}>
            <div className="flex items-center gap-2" style={sectionTitleStyle}>
              🐾 Community Pulse
            </div>
            <Link href="/community" style={{
              fontSize: '11.5px', color: '#623491',
              textDecoration: 'underline',
              textDecorationColor: 'rgba(98,52,145,0.3)',
            }}>View All &rarr;</Link>
          </div>
          <div className="grid grid-cols-2 gap-[10px]" style={{ marginBottom: 16 }}>
            <div style={{
              borderRadius: 11, padding: 14, textAlign: 'center',
              background: 'linear-gradient(135deg,#f9f5fe,#ede4f5)',
            }}>
              <div style={{ fontSize: 22, fontWeight: 700, fontFamily: 'Georgia, serif', color: '#623491' }}>
                {communityPulse.collectiveCount}
              </div>
              <div style={{
                fontSize: 10, fontWeight: 700, letterSpacing: '1.2px',
                textTransform: 'uppercase', color: '#9b6fc4', fontFamily: 'Georgia, serif',
              }}>
                Peaceful Paws<br />Collective
              </div>
            </div>
            <div style={{
              borderRadius: 11, padding: 14, textAlign: 'center',
              background: 'linear-gradient(135deg,#fdf8ec,#fdf0d0)',
            }}>
              <div style={{ fontSize: 22, fontWeight: 700, fontFamily: 'Georgia, serif', color: '#7a5500' }}>
                {communityPulse.studioCount}
              </div>
              <div style={{
                fontSize: 10, fontWeight: 700, letterSpacing: '1.2px',
                textTransform: 'uppercase', color: '#9a6800', fontFamily: 'Georgia, serif',
              }}>
                Progress Studio<br />Members
              </div>
            </div>
          </div>
          {communityPulse.threads.map((t, i) => (
            <div key={i} style={{
              padding: '13px 0',
              borderBottom: i < communityPulse.threads.length - 1 ? '1px solid rgba(98,52,145,0.06)' : 'none',
            }}>
              <div style={{ fontSize: '12.5px', fontWeight: 700, fontFamily: 'Georgia, serif', color: '#2d1a47' }}>
                {t.title}
                {t.hot && <span style={{ fontSize: 10, marginLeft: 6, color: '#e8c487' }}>🔥 HOT</span>}
              </div>
              <div style={{ fontSize: 11, fontStyle: 'italic', color: '#9b6fc4' }}>
                Posted by {t.author} &middot; {t.reactions} reactions &middot; {t.space}
              </div>
            </div>
          ))}
        </div>

        {/* Book Launch Sequence */}
        <div style={cardStyle}>
          <div className="flex items-center justify-between" style={{ marginBottom: 16 }}>
            <div className="flex items-center gap-2" style={sectionTitleStyle}>
              📖 Book Launch Sequence &mdash; &quot;What the BARK?&quot;
            </div>
            <span style={pillStyles['pill-amber']}>Sept 2026 Target</span>
          </div>
          <table className="w-full">
            <thead>
              <tr>
                {['Phase', 'Status', 'Goal', 'Progress'].map(h => (
                  <th key={h} style={thStyle}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bookLaunchPhases.map((p, i) => (
                <tr key={i}>
                  <td style={{ ...tdStyle, paddingRight: 12 }}>
                    <strong style={{ fontSize: '12.5px', color: '#2d1a47' }}>{p.name}</strong>
                    <br /><span style={{ fontSize: '10.5px', fontStyle: 'italic', color: '#7a5ea0' }}>{p.price}</span>
                  </td>
                  <td style={tdStyle}>
                    <span style={pillStyles[p.statusClass] || pillBase}>{p.status}</span>
                  </td>
                  <td style={{ ...tdStyle, fontSize: '12.5px' }}>{p.goal}</td>
                  <td style={tdStyle}>
                    {/* progress bar */}
                    <div style={{
                      height: 6, background: 'rgba(98,52,145,0.12)',
                      borderRadius: 3, marginTop: 6, overflow: 'hidden',
                    }}>
                      <div style={{
                        height: '100%', borderRadius: 3, width: `${p.progress}%`,
                        background: 'linear-gradient(90deg, #623491, #e8c487)',
                      }} />
                    </div>
                    <span style={{ fontSize: 10, fontWeight: 700, color: '#623491' }}>{p.progress}%</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Silent Buyer Reactivation + AI Brain */}
      <div className="grid grid-cols-2 gap-4" style={{ marginBottom: 24 }}>
        {/* Silent Buyer */}
        <div style={cardStyle}>
          <div className="flex items-center justify-between" style={{ marginBottom: 16 }}>
            <div className="flex items-center gap-2" style={sectionTitleStyle}>
              🔁 Silent Buyer Reactivation
            </div>
            <span style={pillStyles['pill-gold']}>~550 Targets</span>
          </div>
          <div className="grid grid-cols-3 gap-[10px]" style={{ marginBottom: 16 }}>
            {[
              { val: silentBuyerData.identified, label: 'Identified', bg: '#f9f5fe', color: '#623491', labelColor: '#9b6fc4' },
              { val: silentBuyerData.reEngaged, label: 'Re-Engaged', bg: '#fdf8ec', color: '#9a6800', labelColor: '#9a6800' },
              { val: silentBuyerData.converted, label: 'Converted', bg: '#e8f5ee', color: '#1e7d47', labelColor: '#1e7d47' },
            ].map((s) => (
              <div key={s.label} style={{
                textAlign: 'center', padding: 12, borderRadius: 10,
                background: s.bg,
              }}>
                <div style={{ fontSize: 20, fontWeight: 700, fontFamily: 'Georgia, serif', color: s.color }}>{s.val}</div>
                <div style={{
                  fontSize: 10, fontWeight: 700, letterSpacing: '1px',
                  textTransform: 'uppercase', color: s.labelColor, fontFamily: 'Georgia, serif',
                }}>{s.label}</div>
              </div>
            ))}
          </div>
          <table className="w-full">
            <thead>
              <tr>
                {['Segment', 'Source', 'Re-engage via', 'Status'].map(h => (
                  <th key={h} style={thStyle}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {silentBuyerData.segments.map((s, i) => (
                <tr key={i}>
                  <td style={tdStyle}>{s.segment}</td>
                  <td style={tdStyle}>{s.source}</td>
                  <td style={tdStyle}>{s.via}</td>
                  <td style={tdStyle}>
                    <span style={pillStyles[s.statusClass] || pillBase}>{s.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* AI Brain Insights */}
        <div style={cardStyle}>
          <div className="flex items-center justify-between" style={{ marginBottom: 16 }}>
            <div className="flex items-center gap-2" style={sectionTitleStyle}>
              🤖 AI Brain &mdash; Insights
            </div>
            <span style={aiChipStyle}>✦ Powered by AI</span>
          </div>
          <div className="flex flex-col gap-[11px]">
            {aiInsights.map((ins, i) => (
              <div key={i} style={{
                borderRadius: 11, padding: 14,
                background: ins.bg, borderLeft: `3px solid ${ins.border}`,
              }}>
                <div className="flex items-center gap-[6px]" style={{
                  fontSize: '11.5px', fontWeight: 700, marginBottom: 4,
                  fontFamily: 'Georgia, serif', color: '#2d1a47',
                }}>
                  <span>{ins.icon}</span> {ins.title}
                </div>
                <div style={{
                  fontSize: '11.5px', fontStyle: 'italic', lineHeight: '1.55',
                  fontFamily: 'Georgia, serif', color: ins.textColor,
                }}>
                  {ins.text}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Revenue + Integrations + Quick Actions */}
      <div className="grid grid-cols-3 gap-4" style={{ marginBottom: 24 }}>
        {/* Revenue by Offer */}
        <div style={cardStyle}>
          <div className="flex items-center gap-2" style={{ ...sectionTitleStyle, marginBottom: 16 }}>
            💳 Revenue by Offer
          </div>
          <table className="w-full">
            <thead>
              <tr>
                {['Offer', 'MRR / Rev', 'Trend'].map(h => (
                  <th key={h} style={thStyle}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {revenueByOffer.map((r, i) => (
                <tr key={i}>
                  <td style={tdStyle}>{r.offer}</td>
                  <td style={{ ...tdStyle, fontWeight: 700, color: '#b8860b' }}>{r.revenue}</td>
                  <td style={tdStyle}>{r.trend}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Integration Health */}
        <div style={cardStyle}>
          <div className="flex items-center gap-2" style={{ ...sectionTitleStyle, marginBottom: 16 }}>
            🔗 Integration Health
          </div>
          <div className="flex flex-col gap-2">
            {integrations.map((int, i) => (
              <div key={i} className="flex justify-between items-center" style={{
                padding: '8px 10px', borderRadius: 9,
                background: int.statusClass === 'pill-amber' ? '#fdf8ec' : '#f9f5fe',
              }}>
                <span style={{ fontSize: 12, fontWeight: 700, fontFamily: 'Georgia, serif', color: '#2d1a47' }}>{int.name}</span>
                <span style={pillStyles[int.statusClass] || pillBase}>{int.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div style={cardStyle}>
          <div className="flex items-center gap-2" style={{ ...sectionTitleStyle, marginBottom: 16 }}>
            ⚡ Quick Actions
          </div>
          <div className="flex flex-col gap-3">
            {[
              { label: 'Add New Client', href: '/clients', icon: '👤' },
              { label: 'Send Broadcast', href: '/messaging', icon: '📤' },
              { label: 'View Pipeline', href: '/pipeline', icon: '🗺️' },
              { label: 'Run AI Sequence', href: '/ai-brain', icon: '🤖' },
              { label: 'View Reports', href: '/kpis', icon: '📊' },
            ].map((action) => (
              <Link key={action.href} href={action.href}
                className="flex items-center gap-3"
                style={{
                  padding: 12, borderRadius: 10,
                  background: 'linear-gradient(135deg,#f9f5fe,#ede4f5)',
                  border: '1px solid rgba(98,52,145,0.15)',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  transition: 'all 150ms',
                }}>
                <span>{action.icon}</span>
                <span style={{
                  fontSize: 12, fontWeight: 700,
                  fontFamily: 'Georgia, serif', color: '#2d1a47',
                }}>
                  {action.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
