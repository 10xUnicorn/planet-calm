import Link from 'next/link'

const offerIcons: Record<string, string> = {
  collective: '🐾',
  studio: '💜',
  council: '✨',
  wayfinder: '🗺️',
  book: '📖',
  chew: '🍪',
}

const quickLinkIcons: Record<string, string> = {
  '/worksheets': '📝',
  '/content': '📚',
  '/community': '🐾',
  '/messaging': '💬',
}

const offers = [
  { tier: 'collective', name: 'Peaceful Paws Collective', price: '$49/mo', desc: 'Community access, content library, Heartbeat space, monthly group calls' },
  { tier: 'studio', name: 'Peaceful Progress Studio', price: '$275/mo', desc: 'Everything in Collective plus worksheets, coach messaging, progress tracking' },
  { tier: 'council', name: 'Calm Council', price: '$6K/yr', desc: 'VIP access, 1:1 coaching, exclusive content, deal perks, partner resources' },
  { tier: 'wayfinder', name: 'Wayfinder Experience', price: '$25K', desc: 'Immersive 2-day experience with Stephanie. Pre-event prep, post-event resources' },
  { tier: 'book', name: '"What the BARK?" Book', price: '$20', desc: 'Pre-order Stephanie\'s debut book on Calm-First Leadership. Ships Sept 2026' },
  { tier: 'chew', name: 'Completely Calm Chew Sub', price: '$42/mo', desc: 'Monthly calming chew subscription. Science-backed formulas for your dog' },
]

export default function PortalPage() {
  return (
    <div>
      {/* Hero */}
      <div className="mb-6" style={{
        borderRadius: '16px',
        padding: '24px',
        background: 'linear-gradient(135deg,#fdf8ec 0%,#f5eef8 100%)',
        border: '2px solid rgba(232,196,135,0.5)',
      }}>
        <h3 className="flex items-center gap-2" style={{
          fontFamily: 'Georgia, serif',
          color: '#2d1a47',
          fontSize: '18px',
          fontWeight: 700,
          marginBottom: '4px',
        }}>
          Welcome Home, Stephanie ✨
        </h3>
        <p style={{ color: '#7a5ea0', fontFamily: 'Georgia, serif', fontSize: '12.5px', fontStyle: 'italic' }}>
          &quot;Calm is not the absence of challenge &mdash; it is the mastery of response.&quot;
        </p>
      </div>

      {/* Progress */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="card">
          <div style={{ color: '#9b6fc4', fontSize: '10px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '8px' }}>Your Progress</div>
          <div className="progress-bar" style={{ marginBottom: '4px' }}><div className="progress-fill" style={{ width: '68%' }} /></div>
          <div style={{ color: '#623491', fontSize: '10px', fontWeight: 700 }}>68% &mdash; Learning Path</div>
        </div>
        <div className="card">
          <div style={{ color: '#9b6fc4', fontSize: '10px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '8px' }}>Next Step</div>
          <div style={{ fontFamily: 'Georgia, serif', color: '#2d1a47', fontSize: '12.5px', fontWeight: 700 }}>
            Complete Worksheet 3 &mdash; Calm Anchoring
          </div>
        </div>
        <div className="card">
          <div style={{ color: '#9b6fc4', fontSize: '10px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '8px' }}>Upcoming Event</div>
          <div style={{ fontFamily: 'Georgia, serif', color: '#2d1a47', fontSize: '12.5px', fontWeight: 700 }}>
            Studio Group Call &mdash; June 28
          </div>
        </div>
      </div>

      {/* Offer Cards */}
      <div className="section-title" style={{ marginBottom: '16px' }}>
        ✨ The Planet Calm Ascension Path
      </div>
      <div className="grid grid-cols-3 gap-[14px] mb-6">
        {offers.map(o => (
          <div key={o.tier} className="card" style={{ padding: '18px' }}>
            <div style={{ marginBottom: '8px', fontSize: '22px' }}>{offerIcons[o.tier]}</div>
            <div style={{ fontFamily: 'Georgia, serif', color: '#2d1a47', fontSize: '13px', fontWeight: 700, marginBottom: '3px' }}>{o.name}</div>
            <div style={{ fontFamily: 'Georgia, serif', color: '#623491', fontSize: '16px', fontWeight: 700, marginBottom: '6px' }}>{o.price}</div>
            <div style={{ color: '#7a5ea0', fontSize: '11px', fontStyle: 'italic', lineHeight: 1.5, marginBottom: '12px' }}>{o.desc}</div>
            <button className="btn-primary" style={{ width: '100%', padding: '8px 20px', fontSize: '11.5px', letterSpacing: '.3px' }}>
              Learn More
            </button>
          </div>
        ))}
      </div>

      {/* Quick Links */}
      <div className="card">
        <div className="section-title" style={{ marginBottom: '16px' }}>
          🔗 Quick Links
        </div>
        <div className="grid grid-cols-4 gap-3">
          {[
            { label: 'My Worksheets', href: '/worksheets' },
            { label: 'Content Library', href: '/content' },
            { label: 'Community', href: '/community' },
            { label: 'Messages', href: '/messaging' },
          ].map(l => (
            <Link key={l.href} href={l.href}
              className="flex items-center gap-3"
              style={{
                padding: '12px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg,#f9f5fe,#ede4f5)',
                border: '1px solid rgba(98,52,145,0.15)',
                cursor: 'pointer',
                transition: 'all .18s',
                textDecoration: 'none',
              }}>
              <span>{quickLinkIcons[l.href]}</span>
              <span style={{ fontFamily: 'Georgia, serif', color: '#2d1a47', fontSize: '12px', fontWeight: 700 }}>{l.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
