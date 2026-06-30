'use client'

import { useState } from 'react'
import { Send, Paperclip, Users } from 'lucide-react'

const demoThreads = [
  { id: '1', name: 'Marisol Vega', initials: 'MV', tier: 'Peaceful Paws Collective', preview: 'Thank you for the worksheet feedback!', time: '2 min ago', unread: true },
  { id: '2', name: 'Trevor Kim', initials: 'TK', tier: 'Progress Studio', preview: 'When is the next Studio call?', time: '1 hour ago', unread: true },
  { id: '3', name: 'Dr. Peter Wang', initials: 'PW', tier: 'Calm Council', preview: 'Loved the Council session today', time: '3 hours ago', unread: false },
  { id: '4', name: 'Rachel Nguyen', initials: 'RN', tier: 'Calm Council', preview: "I'll prepare the onboarding deck", time: '1 day ago', unread: false },
  { id: '5', name: 'Coach Jen', initials: 'CJ', tier: 'Team', preview: 'Updated the worksheet for David', time: '2 days ago', unread: false },
]

const allMessages: Record<string, Array<{ sender: string; text: string; time: string; fromMe: boolean }>> = {
  '1': [
    { sender: 'Marisol Vega', text: 'Hi Stephanie! Just wanted to say the worksheet was really helpful. My GSD Max had a breakthrough this week!', time: '10:32 AM', fromMe: false },
    { sender: 'You', text: "That's wonderful to hear, Marisol! Max's progress with the structured calm approach shows exactly why the BARKType framework works. Keep up the beautiful work.", time: '10:45 AM', fromMe: true },
    { sender: 'Marisol Vega', text: 'Thank you for the worksheet feedback! The breathing exercise before walks has been a game-changer.', time: '11:02 AM', fromMe: false },
  ],
  '2': [
    { sender: 'Trevor Kim', text: 'Hey Stephanie, quick question — when is the next Studio group call?', time: '9:15 AM', fromMe: false },
    { sender: 'You', text: 'Hi Trevor! The next Studio call is this Saturday at 10am PT. I\'ll send the Zoom link tomorrow.', time: '9:30 AM', fromMe: true },
    { sender: 'Trevor Kim', text: 'When is the next Studio call?', time: '9:45 AM', fromMe: false },
  ],
  '3': [
    { sender: 'Dr. Peter Wang', text: 'Stephanie, today\'s Council session was incredible. The framework for calm leadership in high-stress environments really resonated.', time: '2:00 PM', fromMe: false },
    { sender: 'You', text: 'Thank you Peter! Your question about applying it in veterinary settings was brilliant. I\'d love to explore that further in our next session.', time: '2:15 PM', fromMe: true },
    { sender: 'Dr. Peter Wang', text: 'Loved the Council session today', time: '2:30 PM', fromMe: false },
  ],
  '4': [
    { sender: 'Rachel Nguyen', text: "I'll prepare the onboarding deck for the new Council members. Should I base it on the current template?", time: 'Yesterday', fromMe: false },
    { sender: 'You', text: 'Yes, use the current template but add the new BARKType assessment section. Thanks Rachel!', time: 'Yesterday', fromMe: true },
  ],
  '5': [
    { sender: 'Coach Jen', text: 'Updated the worksheet for David Torres — added some extra prompts for the calm anchoring exercise.', time: '2 days ago', fromMe: false },
    { sender: 'You', text: 'Perfect, thanks Jen. David has been making good progress. Let\'s discuss his plan in our next coaching sync.', time: '2 days ago', fromMe: true },
  ],
}

export default function MessagingPage() {
  const [activeThread, setActiveThread] = useState('1')
  const [newMessage, setNewMessage] = useState('')
  const [messages, setMessages] = useState(allMessages)

  const currentThread = demoThreads.find(t => t.id === activeThread)!
  const currentMessages = messages[activeThread] || []

  const handleSend = () => {
    if (!newMessage.trim()) return
    const now = new Date()
    const timeStr = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
    setMessages(prev => ({
      ...prev,
      [activeThread]: [...(prev[activeThread] || []), { sender: 'You', text: newMessage, time: timeStr, fromMe: true }],
    }))
    setNewMessage('')
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '16px', height: 'calc(100vh - 120px)' }}>
      {/* Thread List */}
      <div className="card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(98,52,145,0.06)' }}>
          <div className="section-title">Messages</div>
          <button style={{ padding: '8px', borderRadius: '50%', cursor: 'pointer', background: 'rgba(98,52,145,0.08)', border: 'none' }}>
            <Users size={14} style={{ color: '#623491' }} />
          </button>
        </div>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {demoThreads.map(t => (
            <div key={t.id} onClick={() => setActiveThread(t.id)}
              style={{
                padding: '12px 16px',
                cursor: 'pointer',
                transition: 'all 0.18s',
                background: activeThread === t.id ? 'rgba(232,196,135,0.15)' : 'transparent',
                borderLeft: activeThread === t.id ? '3px solid #e8c487' : '3px solid transparent',
                borderBottom: '1px solid rgba(98,52,145,0.06)',
              }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#2d1a47', fontFamily: 'Georgia, serif' }}>{t.name}</span>
                <span style={{ fontSize: '10px', color: '#9b6fc4' }}>{t.time}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '11px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1, color: '#7a5ea0' }}>{t.preview}</span>
                {t.unread && <span style={{ width: '8px', height: '8px', borderRadius: '50%', flexShrink: 0, background: '#e8c487' }} />}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid rgba(98,52,145,0.06)' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700, color: '#fff', background: 'linear-gradient(135deg,#623491,#9b6fc4)' }}>
            {currentThread.initials}
          </div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 700, fontFamily: 'Georgia, serif', color: '#2d1a47' }}>{currentThread.name}</div>
            <div style={{ fontSize: '10px', color: '#9b6fc4' }}>{currentThread.tier} · Online</div>
          </div>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {currentMessages.map((m, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: m.fromMe ? 'flex-end' : 'flex-start' }}>
              <div style={{
                maxWidth: '70%',
                borderRadius: '12px',
                padding: '12px 16px',
                background: m.fromMe ? 'linear-gradient(135deg,#623491,#9b6fc4)' : '#f9f5fe',
                color: m.fromMe ? '#fff' : '#2d1a47',
                border: m.fromMe ? 'none' : '1px solid rgba(98,52,145,0.1)',
              }}>
                <div style={{ fontSize: '12.5px', lineHeight: 1.6, fontFamily: 'Georgia, serif' }}>{m.text}</div>
                <div style={{ fontSize: '9px', marginTop: '4px', textAlign: 'right', color: m.fromMe ? 'rgba(255,255,255,0.6)' : '#9b6fc4' }}>{m.time}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Composer */}
        <div style={{ padding: '16px', borderTop: '1px solid rgba(98,52,145,0.06)' }}>
          <form onSubmit={(e) => { e.preventDefault(); handleSend() }} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button type="button" style={{ padding: '8px', borderRadius: '50%', cursor: 'pointer', background: 'rgba(98,52,145,0.08)', border: 'none' }}>
              <Paperclip size={14} style={{ color: '#623491' }} />
            </button>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="form-input"
              style={{ flex: 1 }}
            />
            <button type="submit" style={{ padding: '8px', borderRadius: '50%', cursor: 'pointer', background: 'linear-gradient(135deg,#623491,#9b6fc4)', border: 'none' }}>
              <Send size={14} style={{ color: '#e8c487' }} />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
