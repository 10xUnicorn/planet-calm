import Link from 'next/link'
import {
  PawPrint, Heart, Sparkles, Map, BookOpen, Cookie,
  Link2, FileText, Library, MessageSquare
} from 'lucide-react'

const offerIcons: Record<string, React.ReactNode> = {
  collective: <PawPrint size={22} style={{ color: '#623491' }} />,
  studio: <Heart size={22} style={{ color: '#623491' }} />,
  council: <Sparkles size={22} style={{ color: '#623491' }} />,
  wayfinder: <Map size={22} style={{ color: '#623491' }} />,
  book: <BookOpen size={22} style={{ color: '#623491' }} />,
  chew: <Cookie size={22} style={{ color: '#623491' }} />,
}

const quickLinkIcons: Record<string, React.ReactNode> = {
  '/worksheets': <FileText size={16} style={{ color: '#623491' }} />,
  '/content': <Library size={16} style={{ color: '#623491' }} />,
  '/community': <PawPrint size={16} style={{ color: '#623491' }} />,
  '/messaging': <MessageSquare size={16} style={{ color: '#623491' }} />,
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
      <div className="rounded-[16px] p-6 mb-6"
        style={{ background: 'linear-gradient(135deg,#fdf8ec 0%,#f5eef8 100%)', border: '2px solid rgba(232,196,135,0.5)' }}>
        <h3 className="flex items-center gap-2 text-[18px] font-bold mb-1" style={{ fontFamily: 'Georgia, serif', color: '#2d1a47' }}>
          Welcome Home, Stephanie <Sparkles size={16} style={{ color: '#e8c487' }} />
        </h3>
        <p className="text-[12.5px] italic" style={{ color: '#7a5ea0', fontFamily: 'Georgia, serif' }}>
          &quot;Calm is not the absence of challenge &mdash; it is the mastery of response.&quot;
        </p>
      </div>

      {/* Progress */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-[14px] p-5"
          style={{ border: '1px solid #d6c8e4', boxShadow: '0 2px 12px rgba(98,52,145,0.08)' }}>
          <div className="text-[10px] font-bold tracking-[1.5px] uppercase mb-2" style={{ color: '#9b6fc4' }}>Your Progress</div>
          <div className="progress-bar mb-1"><div className="progress-fill" style={{ width: '68%' }} /></div>
          <div className="text-[10px] font-bold" style={{ color: '#623491' }}>68% &mdash; Learning Path</div>
        </div>
        <div className="bg-white rounded-[14px] p-5"
          style={{ border: '1px solid #d6c8e4', boxShadow: '0 2px 12px rgba(98,52,145,0.08)' }}>
          <div className="text-[10px] font-bold tracking-[1.5px] uppercase mb-2" style={{ color: '#9b6fc4' }}>Next Step</div>
          <div className="text-[12.5px] font-bold" style={{ fontFamily: 'Georgia, serif', color: '#2d1a47' }}>
            Complete Worksheet 3 &mdash; Calm Anchoring
          </div>
        </div>
        <div className="bg-white rounded-[14px] p-5"
          style={{ border: '1px solid #d6c8e4', boxShadow: '0 2px 12px rgba(98,52,145,0.08)' }}>
          <div className="text-[10px] font-bold tracking-[1.5px] uppercase mb-2" style={{ color: '#9b6fc4' }}>Upcoming Event</div>
          <div className="text-[12.5px] font-bold" style={{ fontFamily: 'Georgia, serif', color: '#2d1a47' }}>
            Studio Group Call &mdash; June 28
          </div>
        </div>
      </div>

      {/* Offer Cards */}
      <div className="flex items-center gap-2 text-[14px] font-bold mb-4" style={{ fontFamily: 'Georgia, serif', color: '#2d1a47' }}>
        <Sparkles size={16} style={{ color: '#623491' }} /> The Planet Calm Ascension Path
      </div>
      <div className="grid grid-cols-3 gap-[14px] mb-6">
        {offers.map(o => (
          <div key={o.tier} className="bg-white rounded-[13px] p-[18px]"
            style={{ border: '1px solid #d6c8e4', boxShadow: '0 2px 12px rgba(98,52,145,0.08)' }}>
            <div className="mb-2">{offerIcons[o.tier]}</div>
            <div className="text-[13px] font-bold mb-[3px]" style={{ fontFamily: 'Georgia, serif', color: '#2d1a47' }}>{o.name}</div>
            <div className="text-[16px] font-bold mb-[6px]" style={{ fontFamily: 'Georgia, serif', color: '#623491' }}>{o.price}</div>
            <div className="text-[11px] italic leading-[1.5] mb-3" style={{ color: '#7a5ea0' }}>{o.desc}</div>
            <button className="w-full py-2 rounded-[12px] text-[11.5px] font-bold cursor-pointer transition-opacity hover:opacity-85"
              style={{
                background: 'linear-gradient(135deg,#623491,#7d4db5)',
                color: '#e8c487',
                border: 'none',
                fontFamily: 'Georgia, serif',
                letterSpacing: '.3px',
              }}>
              Learn More
            </button>
          </div>
        ))}
      </div>

      {/* Quick Links */}
      <div className="bg-white rounded-[14px] p-5"
        style={{ border: '1px solid #d6c8e4', boxShadow: '0 2px 12px rgba(98,52,145,0.08)' }}>
        <div className="flex items-center gap-2 text-[14px] font-bold mb-4" style={{ fontFamily: 'Georgia, serif', color: '#2d1a47' }}>
          <Link2 size={16} style={{ color: '#623491' }} /> Quick Links
        </div>
        <div className="grid grid-cols-4 gap-3">
          {[
            { label: 'My Worksheets', href: '/worksheets' },
            { label: 'Content Library', href: '/content' },
            { label: 'Community', href: '/community' },
            { label: 'Messages', href: '/messaging' },
          ].map(l => (
            <Link key={l.href} href={l.href}
              className="flex items-center gap-3 p-3 rounded-[10px] transition-all cursor-pointer"
              style={{ background: 'linear-gradient(135deg,#f9f5fe,#ede4f5)', border: '1px solid #d6c8e4' }}>
              {quickLinkIcons[l.href]}
              <span className="text-[12px] font-bold" style={{ fontFamily: 'Georgia, serif', color: '#2d1a47' }}>{l.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
