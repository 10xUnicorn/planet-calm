import { createClient } from '@/lib/supabase-browser'

/* ══════════════════════════════════════════════════════
   Community helpers: media upload, GIF search, mentions
   ══════════════════════════════════════════════════════ */

export const MEDIA_BUCKET = 'community-media'

export type MediaKind = 'image' | 'video' | 'gif'

export interface MediaItem {
  url: string
  kind: MediaKind
}

/** Detect media kind from a URL (used when rendering media_urls). */
export function mediaKind(url: string): MediaKind {
  const u = url.toLowerCase()
  if (u.includes('giphy.com') || u.endsWith('.gif')) return 'gif'
  if (/\.(mp4|webm|mov|m4v)(\?|$)/.test(u)) return 'video'
  return 'image'
}

/** Upload a File to the community-media bucket and return its public URL. */
export async function uploadMedia(file: File, userId: string): Promise<string> {
  const supabase = createClient()
  const ext = (file.name.split('.').pop() || 'bin').toLowerCase()
  const path = `${userId}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`
  const { error } = await supabase.storage.from(MEDIA_BUCKET).upload(path, file, {
    cacheControl: '3600',
    upsert: false,
    contentType: file.type || undefined,
  })
  if (error) throw error
  const { data } = supabase.storage.from(MEDIA_BUCKET).getPublicUrl(path)
  return data.publicUrl
}

/* ── GIF library (Giphy) ──
   Uses NEXT_PUBLIC_GIPHY_API_KEY when set. Falls back to Giphy's public
   documentation key so GIFs work out of the box. REPLACE with your own
   free production key from developers.giphy.com for rate limits. */
const GIPHY_KEY =
  process.env.NEXT_PUBLIC_GIPHY_API_KEY || 'GlVGYHkr3WSBnllca54iNt0yFbjz7L65'

export interface GifResult {
  id: string
  preview: string // small still/animated for the grid
  full: string // full-size gif to post
}

function mapGiphy(json: any): GifResult[] {
  return (json?.data || []).map((g: any) => ({
    id: g.id,
    preview: g.images?.fixed_width_small?.url || g.images?.fixed_width?.url,
    full: g.images?.downsized_medium?.url || g.images?.original?.url,
  })).filter((g: GifResult) => g.preview && g.full)
}

export async function trendingGifs(limit = 24): Promise<GifResult[]> {
  const res = await fetch(
    `https://api.giphy.com/v1/gifs/trending?api_key=${GIPHY_KEY}&limit=${limit}&rating=g`
  )
  if (!res.ok) throw new Error('giphy trending failed')
  return mapGiphy(await res.json())
}

export async function searchGifs(query: string, limit = 24): Promise<GifResult[]> {
  if (!query.trim()) return trendingGifs(limit)
  const res = await fetch(
    `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_KEY}&q=${encodeURIComponent(
      query
    )}&limit=${limit}&rating=g&lang=en`
  )
  if (!res.ok) throw new Error('giphy search failed')
  return mapGiphy(await res.json())
}

/* ── Mentions ──
   A mention target can be a member, a space/channel, or a resource.
   We store mentions inline as plain @tokens in content and highlight them
   on render. This keeps posts portable and searchable. */
export interface MentionTarget {
  id: string
  label: string // shown in the dropdown and inserted as @label
  type: 'member' | 'space' | 'resource'
  emoji?: string
}

/** Split content into text + @mention tokens for highlighted rendering. */
export function tokenizeMentions(content: string): { text: string; mention: boolean }[] {
  const parts: { text: string; mention: boolean }[] = []
  // @Name (letters, numbers, spaces up to 2 words) — conservative match
  const regex = /@([A-Za-z0-9_]+(?:\s[A-Za-z0-9_]+)?)/g
  let last = 0
  let m: RegExpExecArray | null
  while ((m = regex.exec(content)) !== null) {
    if (m.index > last) parts.push({ text: content.slice(last, m.index), mention: false })
    parts.push({ text: m[0], mention: true })
    last = m.index + m[0].length
  }
  if (last < content.length) parts.push({ text: content.slice(last), mention: false })
  return parts
}
