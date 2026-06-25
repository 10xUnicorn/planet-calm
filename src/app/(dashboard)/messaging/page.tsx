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
    { sender: 'You', text: "That's wonderful to hear, Marisol! Max's progress with the structured calm approach shows exactly why the BARKType framework works. Keep up the beautiful work. 🐾", time: '10:45 AM', fromMe: true },
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
    <div className="grid gap-4" style={{ gridTemplateColumns: '320px 1fr', height: 'calc(100vh - 120px)' }}>
      {/* Thread List */}
      <div className="bg-white rounded-[14px] overflow-hidden flex flex-col"
        style={{ border: '1px solid rgba(98,52,145,0.1)', boxShadow: '0 2px 16px rgba(98,52,145,0.06)' }}>
        <div className="p-4 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(98,52,145,0.08)' }}>
          <div className="text-[13px] font-bold" style={{ fontFamily: 'Georgia, serif', color: '#2d1a47' }}>Messages</div>
          <button className="p-2 rounded-full cursor-pointer" style={{ background: 'rgba(98,52,145,0.08)' }}>
            <Users size={14} style={{ color: '#623491' }} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          {demoThreads.map(t => (
            <div key={t.id} onClick={() => setActiveThread(t.id)}
              className="px-4 py-3 cursor-pointer transition-all"
              style={{
                background: activeThread === t.id ? 'rgba(232,196,135,0.15)' : 'transparent',
                borderLeft: activeThread === t.id ? '3px solid #e8c487' : '3px solid transparent',
                borderBottom: '1px solid rgba(98,52,145,0.05)',
              }}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[12.5px] font-bold" style={{ color: '#2d1a47', fontFamily: 'Georgia, serif' }}>{t.name}</span>
                <span className="text-[10px]" style={{ color: '#9b6fc4' }}>{t.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] truncate flex-1" style={{ color: '#7a5ea0' }}>{t.preview}</span>
                {t.unread && <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: '#e8c487' }} />}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="bg-white rounded-[14px] overflow-hidden flex flex-col"
        style={{ border: '1px solid rgba(98,52,145,0.1)', boxShadow: '0 2px 16px rgba(98,52,145,0.06)' }}>
        {/* Header */}
        <div className="p-4 flex items-center gap-3" style={{ borderBottom: '1px solid rgba(98,52,145,0.08)' }}>
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-[12px] font-bold text-white"
            style={{ background: 'linear-gradient(135deg,#623491,#9b6fc4)' }}>
            {currentThread.initials}
          </div>
          <div>
            <div className="text-[13px] font-bold" style={{ fontFamily: 'Georgia, serif', color: '#2d1a47' }}>{currentThread.name}</div>
            <div className="text-[10px]" style={{ color: '#9b6fc4' }}>{currentThread.tier} · Online</div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
          {currentMessages.map((m, i) => (
            <div key={i} className={`flex ${m.fromMe ? 'justify-end' : 'justify-start'}`}>
              <div className="max-w-[70%] rounded-[12px] px-4 py-3"
                style={{
                  background: m.fromMe ? 'linear-gradient(135deg,#623491,#9b6fc4)' : '#f9f5fe',
                  color: m.fromMe ? '#fff' : '#2d1a47',
                  border: m.fromMe ? 'none' : '1px solid rgba(98,52,145,0.1)',
                }}>
                <div className="text-[12.5px] leading-[1.6]" style={{ fontFamily: 'Georgia, serif' }}>{m.text}</div>
                <div className="text-[9px] mt-1 text-right" style={{ color: m.fromMe ? 'rgba(255,255,255,0.6)' : '#9b6fc4' }}>{m.time}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Composer */}
        <div className="p-4" style={{ borderTop: '1px solid rgba(98,52,145,0.08)' }}>
          <form onSubmit={(e) => { e.preventDefault(); handleSend() }} className="flex items-center gap-2">
            <button type="button" className="p-2 rounded-full cursor-pointer" style={{ background: 'rgba(98,52,145,0.08)' }}>
              <Paperclip size={14} style={{ color: '#623491' }} />
            </button>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 px-4 py-[9px] rounded-xl text-[12.5px] outline-none"
              style={{ border: '1px solid rgba(98,52,145,0.2)', fontFamily: 'Georgia, serif', color: '#2d1a47' }}
            />
            <button type="submit" className="p-2 rounded-full cursor-pointer"
              style={{ background: 'linear-gradient(135deg,#623491,#9b6fc4)' }}>
              <Send size={14} style={{ color: '#e8c487' }} />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
