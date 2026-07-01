'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase-browser'

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

const INITIAL_GREETING: ChatMessage = {
  role: 'assistant',
  content:
    "Hi! I'm Leona, your Calm-First AI guide. I know everything about BARKType profiles, calm anchoring, and Stephanie's framework. How can I help you today? 🐾",
}

const SUGGESTED_CHIPS = [
  "What's my BARKType?",
  'Calm anchoring tips',
  'Help with reactivity',
]

function generatePlaceholderReply(userMessage: string): string {
  const topic = userMessage.length > 40 ? userMessage.slice(0, 37) + '...' : userMessage
  return `Thanks for your question! I'm learning more about "${topic}" every day. For now, try checking the Resources section or ask your coach directly. 🌿`
}

export default function LeonaChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_GREETING])
  const [input, setInput] = useState('')
  const [conversationId, setConversationId] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Focus input when panel opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 200)
    }
  }, [isOpen])

  const saveConversation = useCallback(
    async (updatedMessages: ChatMessage[]) => {
      try {
        const supabase = createClient()
        const {
          data: { user },
        } = await supabase.auth.getUser()
        if (!user) return

        if (conversationId) {
          await supabase
            .from('leona_conversations')
            .update({ messages: updatedMessages, updated_at: new Date().toISOString() })
            .eq('id', conversationId)
        } else {
          const { data } = await supabase
            .from('leona_conversations')
            .insert({
              user_id: user.id,
              messages: updatedMessages,
            })
            .select('id')
            .single()
          if (data) setConversationId(data.id)
        }
      } catch {
        // Silently fail — chat still works without persistence
      }
    },
    [conversationId],
  )

  const handleSend = useCallback(
    (text?: string) => {
      const message = (text ?? input).trim()
      if (!message) return

      const userMsg: ChatMessage = { role: 'user', content: message }
      const assistantMsg: ChatMessage = {
        role: 'assistant',
        content: generatePlaceholderReply(message),
      }

      const updated = [...messages, userMsg, assistantMsg]
      setMessages(updated)
      setInput('')
      saveConversation(updated)
    },
    [input, messages, saveConversation],
  )

  const handleChipClick = useCallback(
    (chip: string) => {
      handleSend(chip)
    },
    [handleSend],
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        handleSend()
      }
    },
    [handleSend],
  )

  return (
    <>
      {/* ── Floating Button ── */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open Leona AI Chat"
          style={{
            position: 'fixed',
            bottom: 20,
            right: 20,
            width: 52,
            height: 52,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #623491, #9b6fc4)',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 24,
            boxShadow: '0 4px 20px rgba(98, 52, 145, 0.4)',
            zIndex: 200,
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.08)'
            e.currentTarget.style.boxShadow = '0 6px 28px rgba(98, 52, 145, 0.55)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)'
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(98, 52, 145, 0.4)'
          }}
        >
          🤖
        </button>
      )}

      {/* ── Chat Panel ── */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: isOpen ? 350 : 0,
          maxWidth: '100vw',
          zIndex: 200,
          display: 'flex',
          flexDirection: 'column',
          background: '#fff',
          boxShadow: isOpen ? '-4px 0 30px rgba(45, 26, 71, 0.18)' : 'none',
          transition: 'width 0.28s cubic-bezier(0.4, 0, 0.2, 1)',
          overflow: 'hidden',
        }}
        className="leona-chat-panel"
      >
        {/* Header */}
        <div
          style={{
            padding: '14px 16px',
            background: 'linear-gradient(135deg, #2d1a47, #623491)',
            color: '#e8c487',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0,
          }}
        >
          <div
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: '0.3px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            🤖 Leona — Your Calm-First AI Guide
          </div>
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close Leona Chat"
            style={{
              background: 'none',
              border: 'none',
              color: '#e8c487',
              fontSize: 18,
              cursor: 'pointer',
              padding: '2px 6px',
              borderRadius: 4,
              lineHeight: 1,
              flexShrink: 0,
            }}
          >
            ✕
          </button>
        </div>

        {/* Messages */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px 14px',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            background: '#faf8fc',
          }}
        >
          {messages.map((msg, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
              }}
            >
              <div
                style={{
                  maxWidth: '85%',
                  padding: '10px 14px',
                  borderRadius:
                    msg.role === 'user'
                      ? '14px 14px 4px 14px'
                      : '14px 14px 14px 4px',
                  background:
                    msg.role === 'user'
                      ? 'linear-gradient(135deg, #623491, #9b6fc4)'
                      : '#fff',
                  color: msg.role === 'user' ? '#fff' : '#2d1a47',
                  fontFamily: 'Georgia, serif',
                  fontSize: '12.5px',
                  lineHeight: '1.55',
                  boxShadow:
                    msg.role === 'user'
                      ? '0 2px 8px rgba(98, 52, 145, 0.2)'
                      : '0 1px 6px rgba(98, 52, 145, 0.08)',
                  border:
                    msg.role === 'assistant'
                      ? '1px solid rgba(98, 52, 145, 0.1)'
                      : 'none',
                }}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {/* Suggested chips — only show when just the greeting is present */}
          {messages.length === 1 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 4 }}>
              {SUGGESTED_CHIPS.map((chip) => (
                <button
                  key={chip}
                  onClick={() => handleChipClick(chip)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: 20,
                    border: '1px solid rgba(98, 52, 145, 0.2)',
                    background: '#ede4f5',
                    color: '#623491',
                    fontFamily: 'Georgia, serif',
                    fontSize: '11px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                    whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#623491'
                    e.currentTarget.style.color = '#e8c487'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#ede4f5'
                    e.currentTarget.style.color = '#623491'
                  }}
                >
                  {chip}
                </button>
              ))}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div
          style={{
            padding: '12px 14px',
            borderTop: '1px solid rgba(98, 52, 145, 0.1)',
            background: '#fff',
            display: 'flex',
            gap: 8,
            flexShrink: 0,
          }}
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask Leona anything..."
            style={{
              flex: 1,
              padding: '10px 14px',
              borderRadius: 10,
              border: '1px solid rgba(98, 52, 145, 0.15)',
              fontFamily: 'Georgia, serif',
              fontSize: '12.5px',
              color: '#2d1a47',
              background: '#faf8fc',
              outline: 'none',
            }}
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim()}
            aria-label="Send message"
            style={{
              padding: '10px 14px',
              borderRadius: 10,
              background:
                input.trim()
                  ? 'linear-gradient(135deg, #623491, #7d4db5)'
                  : 'rgba(98, 52, 145, 0.1)',
              color: input.trim() ? '#e8c487' : '#9b6fc4',
              border: 'none',
              fontFamily: 'Georgia, serif',
              fontSize: 14,
              fontWeight: 700,
              cursor: input.trim() ? 'pointer' : 'default',
              flexShrink: 0,
              transition: 'all 0.15s',
            }}
          >
            ➤
          </button>
        </div>
      </div>
    </>
  )
}
