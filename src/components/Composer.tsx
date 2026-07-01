'use client'

import { useEffect, useRef, useState } from 'react'
import {
  uploadMedia,
  searchGifs,
  mediaKind,
  type MentionTarget,
  type GifResult,
} from '@/lib/community'

interface SpaceOpt {
  id: string
  name: string
  emoji: string
}

interface ComposerProps {
  userId: string | null
  mode?: 'post' | 'reply'
  spaces?: SpaceOpt[]
  mentionTargets?: MentionTarget[]
  initialSpaceId?: string
  placeholder?: string
  submitLabel?: string
  onSubmit: (content: string, mediaUrls: string[], spaceId: string | null) => Promise<void>
}

export default function Composer({
  userId,
  mode = 'post',
  spaces = [],
  mentionTargets = [],
  initialSpaceId = '',
  placeholder = 'Share a win, ask a question, or spark a conversation...',
  submitLabel = 'Post',
  onSubmit,
}: ComposerProps) {
  const [text, setText] = useState('')
  const [spaceId, setSpaceId] = useState(initialSpaceId)
  const [media, setMedia] = useState<string[]>([])
  const [uploading, setUploading] = useState(false)
  const [posting, setPosting] = useState(false)
  const [showGif, setShowGif] = useState(false)

  // mention autocomplete
  const [mentionQuery, setMentionQuery] = useState<string | null>(null)
  const textRef = useRef<HTMLTextAreaElement>(null)

  const canSubmit = (text.trim().length > 0 || media.length > 0) && !posting && !uploading

  function handleTextChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const val = e.target.value
    setText(val)
    // detect an active @token at the caret
    const caret = e.target.selectionStart ?? val.length
    const upToCaret = val.slice(0, caret)
    const match = /@([A-Za-z0-9_ ]{0,20})$/.exec(upToCaret)
    setMentionQuery(match ? match[1].toLowerCase() : null)
  }

  function insertMention(t: MentionTarget) {
    const el = textRef.current
    const caret = el?.selectionStart ?? text.length
    const upToCaret = text.slice(0, caret)
    const rest = text.slice(caret)
    const replaced = upToCaret.replace(/@([A-Za-z0-9_ ]{0,20})$/, `@${t.label} `)
    setText(replaced + rest)
    setMentionQuery(null)
    setTimeout(() => el?.focus(), 0)
  }

  async function handleFiles(files: FileList | null) {
    if (!files || !userId) return
    setUploading(true)
    try {
      const urls: string[] = []
      for (const file of Array.from(files)) {
        urls.push(await uploadMedia(file, userId))
      }
      setMedia(m => [...m, ...urls])
    } catch {
      alert('Upload failed. Please try a smaller file (max 50MB).')
    }
    setUploading(false)
  }

  async function handleSubmit() {
    if (!canSubmit) return
    setPosting(true)
    try {
      await onSubmit(text.trim(), media, spaceId || null)
      setText('')
      setMedia([])
      if (mode === 'post') setSpaceId('')
    } finally {
      setPosting(false)
    }
  }

  const filteredMentions =
    mentionQuery === null
      ? []
      : mentionTargets
          .filter(t => t.label.toLowerCase().includes(mentionQuery))
          .slice(0, 6)

  return (
    <div style={{ position: 'relative' }}>
      <textarea
        ref={textRef}
        className="form-input"
        value={text}
        onChange={handleTextChange}
        placeholder={placeholder}
        rows={mode === 'reply' ? 2 : 3}
        style={{ resize: 'vertical', marginBottom: 10 }}
      />

      {/* Mention dropdown */}
      {filteredMentions.length > 0 && (
        <div style={{
          position: 'absolute',
          zIndex: 30,
          top: 8,
          left: 8,
          background: '#fff',
          border: '1px solid rgba(98,52,145,0.18)',
          borderRadius: 10,
          boxShadow: '0 8px 24px rgba(45,26,71,0.16)',
          padding: 4,
          minWidth: 220,
        }}>
          {filteredMentions.map(t => (
            <button
              key={`${t.type}-${t.id}`}
              onClick={() => insertMention(t)}
              style={{
                display: 'flex', alignItems: 'center', gap: 8, width: '100%',
                padding: '7px 10px', background: 'none', border: 'none',
                cursor: 'pointer', borderRadius: 8, textAlign: 'left',
                fontFamily: 'Georgia, serif', fontSize: 12.5, color: '#2d1a47',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(98,52,145,0.06)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'none')}
            >
              <span style={{ fontSize: 14 }}>{t.emoji || (t.type === 'member' ? '👤' : t.type === 'space' ? '#️⃣' : '📎')}</span>
              <span style={{ fontWeight: 600 }}>{t.label}</span>
              <span style={{ marginLeft: 'auto', fontSize: 9.5, color: '#9b6fc4', textTransform: 'uppercase', letterSpacing: 0.5 }}>{t.type}</span>
            </button>
          ))}
        </div>
      )}

      {/* Media previews */}
      {media.length > 0 && (
        <div className="flex gap-2 flex-wrap" style={{ marginBottom: 10 }}>
          {media.map((url, i) => (
            <div key={i} style={{ position: 'relative' }}>
              {mediaKind(url) === 'video' ? (
                <video src={url} style={{ width: 92, height: 92, objectFit: 'cover', borderRadius: 8, border: '1px solid rgba(98,52,145,0.12)' }} />
              ) : (
                <img src={url} alt="" style={{ width: 92, height: 92, objectFit: 'cover', borderRadius: 8, border: '1px solid rgba(98,52,145,0.12)' }} />
              )}
              <button
                onClick={() => setMedia(m => m.filter((_, idx) => idx !== i))}
                style={{
                  position: 'absolute', top: -6, right: -6, width: 20, height: 20,
                  borderRadius: '50%', background: '#2d1a47', color: '#fff', border: 'none',
                  cursor: 'pointer', fontSize: 12, lineHeight: '20px', textAlign: 'center',
                }}
                aria-label="Remove"
              >×</button>
            </div>
          ))}
        </div>
      )}

      {/* Toolbar */}
      <div className="flex items-center gap-2 flex-wrap">
        <label
          title="Upload image or video"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 5, cursor: 'pointer',
            padding: '6px 10px', borderRadius: 8, border: '1px solid rgba(98,52,145,0.14)',
            fontFamily: 'Georgia, serif', fontSize: 12, color: '#623491', background: 'rgba(98,52,145,0.03)',
          }}
        >
          📷 Photo/Video
          <input
            type="file"
            accept="image/*,video/mp4,video/webm,video/quicktime"
            multiple
            hidden
            onChange={e => handleFiles(e.target.files)}
          />
        </label>

        <button
          type="button"
          onClick={() => setShowGif(true)}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 5, cursor: 'pointer',
            padding: '6px 10px', borderRadius: 8, border: '1px solid rgba(98,52,145,0.14)',
            fontFamily: 'Georgia, serif', fontSize: 12, color: '#623491', background: 'rgba(98,52,145,0.03)',
          }}
        >
          🎞️ GIF
        </button>

        {mode === 'post' && spaces.length > 0 && (
          <select
            className="form-select"
            value={spaceId}
            onChange={e => setSpaceId(e.target.value)}
            style={{ maxWidth: 200 }}
          >
            <option value="">Choose a channel</option>
            {spaces.map(s => (
              <option key={s.id} value={s.id}>{s.emoji} {s.name}</option>
            ))}
          </select>
        )}

        {uploading && (
          <span style={{ fontSize: 11.5, color: '#9b6fc4', fontStyle: 'italic' }}>Uploading…</span>
        )}

        <button
          className="btn-primary"
          onClick={handleSubmit}
          disabled={!canSubmit}
          style={{ marginLeft: 'auto', opacity: canSubmit ? 1 : 0.5 }}
        >
          {posting ? 'Posting…' : submitLabel}
        </button>
      </div>

      {showGif && (
        <GifPicker
          onClose={() => setShowGif(false)}
          onPick={url => { setMedia(m => [...m, url]); setShowGif(false) }}
        />
      )}
    </div>
  )
}

/* ── GIF Picker modal ── */
function GifPicker({ onClose, onPick }: { onClose: () => void; onPick: (url: string) => void }) {
  const [q, setQ] = useState('')
  const [gifs, setGifs] = useState<GifResult[]>([])
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState(false)

  async function run(query: string) {
    setLoading(true); setErr(false)
    try {
      setGifs(await searchGifs(query))
    } catch {
      setErr(true)
    }
    setLoading(false)
  }

  // initial load (trending)
  useEffect(() => { run('') }, [])

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(45,26,71,0.5)', zIndex: 200,
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20,
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#fff', borderRadius: 16, padding: 18, width: 'min(560px, 96vw)',
          maxHeight: '80vh', display: 'flex', flexDirection: 'column',
          boxShadow: '0 20px 60px rgba(45,26,71,0.35)',
        }}
      >
        <div className="flex items-center gap-2" style={{ marginBottom: 12 }}>
          <input
            className="form-input"
            autoFocus
            placeholder="Search GIFs…"
            value={q}
            onChange={e => setQ(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') run(q) }}
            style={{ flex: 1 }}
          />
          <button className="btn-secondary" onClick={() => run(q)}>Search</button>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: '#623491' }}
            aria-label="Close"
          >×</button>
        </div>

        <div style={{ overflowY: 'auto', flex: 1 }}>
          {loading ? (
            <div style={{ textAlign: 'center', color: '#9b6fc4', padding: 30, fontStyle: 'italic' }}>Loading GIFs…</div>
          ) : err ? (
            <div style={{ textAlign: 'center', color: '#9b6fc4', padding: 30, fontSize: 12 }}>
              Couldn&apos;t load GIFs. Add a free Giphy key as <code>NEXT_PUBLIC_GIPHY_API_KEY</code> for reliable access.
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
              {gifs.map(g => (
                <img
                  key={g.id}
                  src={g.preview}
                  alt="gif"
                  onClick={() => onPick(g.full)}
                  style={{ width: '100%', height: 110, objectFit: 'cover', borderRadius: 10, cursor: 'pointer', border: '1px solid rgba(98,52,145,0.08)' }}
                />
              ))}
            </div>
          )}
        </div>
        <div style={{ textAlign: 'right', marginTop: 8, fontSize: 9.5, color: '#b8a3d0' }}>Powered by GIPHY</div>
      </div>
    </div>
  )
}
