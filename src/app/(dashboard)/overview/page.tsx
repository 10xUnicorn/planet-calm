import {
  kpiData, communityPulse, bookLaunchPhases, silentBuyerData,
  aiInsights, revenueByOffer, integrations
} from '@/lib/demo-data'
import Link from 'next/link'

export default function OverviewPage() {
  return (
    <div>
      {/* KPI Row */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Revenue (LTM)', ...kpiData.totalRevenue },
          { label: 'Active Community Members', ...kpiData.communityMembers },
          { label: 'Book Pre-Sales ("What the BARK?")', ...kpiData.bookPreSales },
          { label: 'BARKType Pipeline', ...kpiData.barktypePipeline },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-white rounded-[14px] p-5 relative overflow-hidden"
            style={{ border: '1px solid rgba(98,52,145,0.1)', boxShadow: '0 2px 16px rgba(98,52,145,0.06)' }}>
            <div className="absolute top-0 left-0 right-0 h-[3px]"
              style={{ background: 'linear-gradient(90deg,#623491,#e8c487)' }} />
            <div className="text-[10px] font-bold tracking-[1.8px] uppercase mb-2"
              style={{ color: '#9b6fc4', fontFamily: 'Georgia, serif' }}>{kpi.label}</div>
            <div className="text-[28px] font-bold leading-none"
              style={{ fontFamily: 'Georgia, serif', color: '#2d1a47' }}>{kpi.value}</div>
            <div className={`text-[11px] mt-[6px] ${kpi.up ? 'text-[#2a9d5c]' : 'text-[#7a5ea0]'}`}>{kpi.trend}</div>
            <div className="text-[10.5px] italic mt-[2px]" style={{ color: '#9b6fc4' }}>{kpi.sub}</div>
          </div>
        ))}
      </div>

      {/* Community Pulse + Book Launch */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Community Pulse */}
        <div className="bg-white rounded-[14px] p-5"
          style={{ border: '1px solid rgba(98,52,145,0.1)', boxShadow: '0 2px 16px rgba(98,52,145,0.06)' }}>
          <div className="flex items-center justify-between mb-4">
            <div className="text-[14px] font-bold" style={{ fontFamily: 'Georgia, serif', color: '#2d1a47' }}>
              🐾 Community Pulse
            </div>
            <Link href="/community" className="text-[11.5px] underline"
              style={{ color: '#623491', textDecorationColor: 'rgba(98,52,145,0.3)' }}>View All →</Link>
          </div>
          <div className="grid grid-cols-2 gap-[10px] mb-4">
            <div className="rounded-[11px] p-[14px] text-center"
              style={{ background: 'linear-gradient(135deg,#f9f5fe,#ede4f5)' }}>
              <div className="text-[22px] font-bold" style={{ fontFamily: 'Georgia, serif', color: '#623491' }}>
                {communityPulse.collectiveCount}
              </div>
              <div className="text-[10px] font-bold tracking-[1.2px] uppercase"
                style={{ color: '#9b6fc4', fontFamily: 'Georgia, serif' }}>
                Peaceful Paws<br />Collective
              </div>
            </div>
            <div className="rounded-[11px] p-[14px] text-center"
              style={{ background: 'linear-gradient(135deg,#fdf8ec,#fdf0d0)' }}>
              <div className="text-[22px] font-bold" style={{ fontFamily: 'Georgia, serif', color: '#7a5500' }}>
                {communityPulse.studioCount}
              </div>
              <div className="text-[10px] font-bold tracking-[1.2px] uppercase"
                style={{ color: '#9a6800', fontFamily: 'Georgia, serif' }}>
                Progress Studio<br />Members
              </div>
            </div>
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

        {/* Book Launch Sequence */}
        <div className="bg-white rounded-[14px] p-5"
          style={{ border: '1px solid rgba(98,52,145,0.1)', boxShadow: '0 2px 16px rgba(98,52,145,0.06)' }}>
          <div className="flex items-center justify-between mb-4">
            <div className="text-[14px] font-bold" style={{ fontFamily: 'Georgia, serif', color: '#2d1a47' }}>
              📖 Book Launch Sequence — &quot;What the BARK?&quot;
            </div>
            <span className="pill pill-amber">Sept 2026 Target</span>
          </div>
          <table className="w-full">
            <thead>
              <tr>
                {['Phase', 'Status', 'Goal', 'Progress'].map(h => (
                  <th key={h} className="text-left text-[10px] font-bold tracking-[1.5px] uppercase pb-2"
                    style={{ color: '#9b6fc4', fontFamily: 'Georgia, serif', borderBottom: '2px solid rgba(98,52,145,0.1)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bookLaunchPhases.map((p, i) => (
                <tr key={i}>
                  <td className="py-[11px] pr-3" style={{ borderBottom: '1px solid rgba(98,52,145,0.06)' }}>
                    <strong className="text-[12.5px]">{p.name}</strong>
                    <br /><span className="text-[10.5px] italic" style={{ color: '#7a5ea0' }}>{p.price}</span>
                  </td>
                  <td className="py-[11px]" style={{ borderBottom: '1px solid rgba(98,52,145,0.06)' }}>
                    <span className={`pill ${p.statusClass}`}>{p.status}</span>
                  </td>
                  <td className="py-[11px] text-[12.5px]" style={{ borderBottom: '1px solid rgba(98,52,145,0.06)' }}>{p.goal}</td>
                  <td className="py-[11px]" style={{ borderBottom: '1px solid rgba(98,52,145,0.06)' }}>
                    <div className="progress-bar"><div className="progress-fill" style={{ width: `${p.progress}%` }} /></div>
                    <span className="text-[10px] font-bold" style={{ color: '#623491' }}>{p.progress}%</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Silent Buyer Reactivation + AI Brain */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Silent Buyer */}
        <div className="bg-white rounded-[14px] p-5"
          style={{ border: '1px solid rgba(98,52,145,0.1)', boxShadow: '0 2px 16px rgba(98,52,145,0.06)' }}>
          <div className="flex items-center justify-between mb-4">
            <div className="text-[14px] font-bold" style={{ fontFamily: 'Georgia, serif', color: '#2d1a47' }}>
              🔁 Silent Buyer Reactivation
            </div>
            <span className="pill pill-gold">~550 Targets</span>
          </div>
          <div className="grid grid-cols-3 gap-[10px] mb-4">
            {[
              { val: silentBuyerData.identified, label: 'Identified', bg: '#f9f5fe', color: '#623491', labelColor: '#9b6fc4' },
              { val: silentBuyerData.reEngaged, label: 'Re-Engaged', bg: '#fdf8ec', color: '#9a6800', labelColor: '#9a6800' },
              { val: silentBuyerData.converted, label: 'Converted', bg: '#e8f5ee', color: '#1e7d47', labelColor: '#1e7d47' },
            ].map((s) => (
              <div key={s.label} className="text-center p-3 rounded-[10px]" style={{ background: s.bg }}>
                <div className="text-[20px] font-bold" style={{ fontFamily: 'Georgia, serif', color: s.color }}>{s.val}</div>
                <div className="text-[10px] font-bold tracking-[1px] uppercase" style={{ color: s.labelColor, fontFamily: 'Georgia, serif' }}>{s.label}</div>
              </div>
            ))}
          </div>
          <table className="w-full">
            <thead>
              <tr>
                {['Segment', 'Source', 'Re-engage via', 'Status'].map(h => (
                  <th key={h} className="text-left text-[10px] font-bold tracking-[1.5px] uppercase pb-2 px-3"
                    style={{ color: '#9b6fc4', fontFamily: 'Georgia, serif', borderBottom: '2px solid rgba(98,52,145,0.1)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {silentBuyerData.segments.map((s, i) => (
                <tr key={i}>
                  <td className="py-[11px] px-3 text-[12.5px]" style={{ borderBottom: '1px solid rgba(98,52,145,0.06)' }}>{s.segment}</td>
                  <td className="py-[11px] px-3 text-[12.5px]" style={{ borderBottom: '1px solid rgba(98,52,145,0.06)' }}>{s.source}</td>
                  <td className="py-[11px] px-3 text-[12.5px]" style={{ borderBottom: '1px solid rgba(98,52,145,0.06)' }}>{s.via}</td>
                  <td className="py-[11px] px-3" style={{ borderBottom: '1px solid rgba(98,52,145,0.06)' }}>
                    <span className={`pill ${s.statusClass}`}>{s.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* AI Brain Insights */}
        <div className="bg-white rounded-[14px] p-5"
          style={{ border: '1px solid rgba(98,52,145,0.1)', boxShadow: '0 2px 16px rgba(98,52,145,0.06)' }}>
          <div className="flex items-center justify-between mb-4">
            <div className="text-[14px] font-bold" style={{ fontFamily: 'Georgia, serif', color: '#2d1a47' }}>
              🤖 AI Brain — Insights
            </div>
            <span className="ai-chip">✦ Powered by AI</span>
          </div>
          <div className="flex flex-col gap-[11px]">
            {aiInsights.map((ins, i) => (
              <div key={i} className="rounded-[11px] p-[14px]"
                style={{ background: ins.bg, borderLeft: `3px solid ${ins.border}` }}>
                <div className="text-[11.5px] font-bold mb-1"
                  style={{ fontFamily: 'Georgia, serif', color: '#2d1a47' }}>
                  {ins.icon} {ins.title}
                </div>
                <div className="text-[11.5px] italic leading-[1.55]"
                  style={{ fontFamily: 'Georgia, serif', color: ins.textColor }}>
                  {ins.text}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Revenue + Integrations */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {/* Revenue by Offer */}
        <div className="bg-white rounded-[14px] p-5"
          style={{ border: '1px solid rgba(98,52,145,0.1)', boxShadow: '0 2px 16px rgba(98,52,145,0.06)' }}>
          <div className="text-[14px] font-bold mb-4" style={{ fontFamily: 'Georgia, serif', color: '#2d1a47' }}>
            💳 Revenue by Offer
          </div>
          <table className="w-full">
            <thead>
              <tr>
                {['Offer', 'MRR / Rev', 'Trend'].map(h => (
                  <th key={h} className="text-left text-[10px] font-bold tracking-[1.5px] uppercase pb-2 px-3"
                    style={{ color: '#9b6fc4', fontFamily: 'Georgia, serif', borderBottom: '2px solid rgba(98,52,145,0.1)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {revenueByOffer.map((r, i) => (
                <tr key={i}>
                  <td className="py-[11px] px-3 text-[12.5px]" style={{ borderBottom: '1px solid rgba(98,52,145,0.06)' }}>{r.offer}</td>
                  <td className="py-[11px] px-3 text-[12.5px] font-bold" style={{ color: '#b8860b', borderBottom: '1px solid rgba(98,52,145,0.06)' }}>{r.revenue}</td>
                  <td className="py-[11px] px-3 text-[12.5px]" style={{ borderBottom: '1px solid rgba(98,52,145,0.06)' }}>{r.trend}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Integration Health */}
        <div className="bg-white rounded-[14px] p-5"
          style={{ border: '1px solid rgba(98,52,145,0.1)', boxShadow: '0 2px 16px rgba(98,52,145,0.06)' }}>
          <div className="text-[14px] font-bold mb-4" style={{ fontFamily: 'Georgia, serif', color: '#2d1a47' }}>
            🔗 Integration Health
          </div>
          <div className="flex flex-col gap-2">
            {integrations.map((int, i) => (
              <div key={i} className="flex justify-between items-center px-[10px] py-2 rounded-[9px]"
                style={{ background: int.statusClass === 'pill-amber' ? '#fdf8ec' : '#f9f5fe' }}>
                <span className="text-[12px] font-bold" style={{ fontFamily: 'Georgia, serif', color: '#2d1a47' }}>{int.name}</span>
                <span className={`pill ${int.statusClass}`}>{int.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-[14px] p-5"
          style={{ border: '1px solid rgba(98,52,145,0.1)', boxShadow: '0 2px 16px rgba(98,52,145,0.06)' }}>
          <div className="text-[14px] font-bold mb-4" style={{ fontFamily: 'Georgia, serif', color: '#2d1a47' }}>
            ⚡ Quick Actions
          </div>
          <div className="flex flex-col gap-3">
            {[
              { label: 'Add New Client', href: '/clients', icon: '👤' },
              { label: 'Send Broadcast', href: '/messaging', icon: '📨' },
              { label: 'View Pipeline', href: '/pipeline', icon: '🗺️' },
              { label: 'Run AI Sequence', href: '/ai-brain', icon: '🤖' },
              { label: 'View Reports', href: '/kpis', icon: '📊' },
            ].map((action) => (
              <Link key={action.href} href={action.href}
                className="flex items-center gap-3 p-3 rounded-[10px] transition-all duration-150 cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg,#f9f5fe,#ede4f5)',
                  border: '1px solid rgba(98,52,145,0.08)',
                }}>
                <span className="text-[16px]">{action.icon}</span>
                <span className="text-[12px] font-bold" style={{ fontFamily: 'Georgia, serif', color: '#2d1a47' }}>
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
