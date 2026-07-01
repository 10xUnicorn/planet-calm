'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase-browser'

/* ── Types ── */
interface Post {
  id: string
  author_id: string
  space_id: string | null
  parent_id: string | null
  content: string
  media_urls: string[] | null
  created_at: string
  author: { first_name: string; last_name: string; role: string; avatar_url: string | null } | null
  space: { name: string; emoji: string } | null
  reactions: Reaction[]
  reply_count: number
}

interface Reaction {
  id: string
  user_id: string
  post_id: string
  emoji: string
}

interface Space {
  id: string
  name: string
  emoji: string
  description: string | null
}

/* ── Tier badge helpers ── */
const TIER_COLORS: Record<string, { bg: string; color: string; label: string }> = {
  client_collective: { bg: '#ede4f5', color: '#623491', label: 'Collective' },
  client_studio: { bg: '#e8f5ee', color: '#1e7d47', label: 'Studio' },
  client_council: { bg: 'linear-gradient(135deg,#fdf0d0,#f5e0a0)', color: '#7a5500', label: 'Council' },
  client_wayfinder: { bg: 'linear-gradient(135deg,#2d1a47,#623491)', color: '#e8c487', label: 'Wayfinder' },
  coach: { bg: '#e4edf5', color: '#1a5a8a', label: 'Coach' },
  team_member: { bg: '#2d1a47', color: '#e8c487', label: 'Team' },
  superadmin: { bg: '#2d1a47', color: '#e8c487', label: 'Admin' },
}

function TierBadge({ role }: { role: string }) {
  const info = TIER_COLORS[role] || { bg: '#ede4f5', color: '#623491', label: role.replace('client_', '') }
  return (
    <span style={{
      display: 'inline-block',
      padding: '2px 8px',
      borderRadius: 20,
      fontSize: '9.5px',
      fontWeight: 700,
      letterSpacing: '.3px',
      fontFamily: 'Georgia, serif',
      background: info.bg,
      color: info.color,
      whiteSpace: 'nowrap',
    }}>
      {info.label}
    </span>
  )
}

/* ── Avatar (initials) ── */
function Avatar({ firstName, lastName, size = 36 }: { firstName: string; lastName: string; size?: number }) {
  const initials = `${(firstName || '?')[0]}${(lastName || '?')[0]}`.toUpperCase()
  return (
    <div style={{
      width: size,
      height: size,
      borderRadius: '50%',
      background: 'linear-gradient(135deg,#623491,#9b6fc4)',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: size * 0.36,
      fontWeight: 700,
      fontFamily: 'Georgia, serif',
      flexShrink: 0,
    }}>
      {initials}
    </div>
  )
}

/* ── Time Ago ── */
function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  if (days < 7) return `${days}d ago`
  return new Date(dateStr).toLocaleDateString()
}

/* ── Reaction emojis ── */
const REACTION_EMOJIS = ['🐾', '❤️', '🔥', '👏', '💡']

export default function CommunityFeedPage() {
  const supabase = createClient()

  const [posts, setPosts] = useState<Post[]>([])
  const [spaces, setSpaces] = useState<Space[]>([])
  const [activeSpace, setActiveSpace] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [userId, setUserId] = useState<string | null>(null)

  // Composer state
  const [composerText, setComposerText] = useState('')
  const [composerSpace, setComposerSpace] = useState<string>('')
  const [posting, setPosting] = useState(false)

  // Reply view
  const [viewingPost, setViewingPost] = useState<Post | null>(null)
  const [replies, setReplies] = useState<Post[]>([])
  const [replyText, setReplyText] = useState('')
  const [loadingReplies, setLoadingReplies] = useState(false)

  // Get current user
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) setUserId(data.user.id)
    })
  }, [supabase.auth])

  // Fetch spaces
  useEffect(() => {
    async function fetchSpaces() {
      const { data } = await supabase
        .from('community_spaces')
        .select('id, name, emoji, description')
        .eq('is_archived', false)
        .order('sort_order', { ascending: true })
      if (data) setSpaces(data)
    }
    fetchSpaces()
  }, [supabase])

  // Fetch posts
  const fetchPosts = useCallback(async () => {
    setLoading(true)
    let query = supabase
      .from('community_posts')
      .select(`
        id, author_id, space_id, parent_id, content, media_urls, created_at,
        author:profiles!community_posts_author_id_fkey(first_name, last_name, role, avatar_url),
        space:community_spaces!community_posts_space_id_fkey(name, emoji),
        reactions:community_reactions(id, user_id, post_id, emoji)
      `)
      .is('parent_id', null)
      .order('created_at', { ascending: false })
      .limit(50)

    if (activeSpace) {
      query = query.eq('space_id', activeSpace)
    }

    const { data, error } = await query

    if (!error && data) {
      // Fetch reply counts
      const postIds = data.map((p: any) => p.id)
      const { data: replyCounts } = await supabase
        .from('community_posts')
        .select('parent_id')
        .in('parent_id', postIds)

      const countMap: Record<string, number> = {}
      if (replyCounts) {
        for (const r of replyCounts) {
          countMap[r.parent_id] = (countMap[r.parent_id] || 0) + 1
        }
      }

      const formatted: Post[] = data.map((p: any) => ({
        ...p,
        author: Array.isArray(p.author) ? p.author[0] || null : p.author,
        space: Array.isArray(p.space) ? p.space[0] || null : p.space,
        reactions: p.reactions || [],
        reply_count: countMap[p.id] || 0,
      }))
      setPosts(formatted)
    }
    setLoading(false)
  }, [supabase, activeSpace])

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  // Create post
  async function handlePost() {
    if (!composerText.trim() || !userId) return
    setPosting(true)
    const { error } = await supabase.from('community_posts').insert({
      author_id: userId,
      content: composerText.trim(),
      space_id: composerSpace || null,
    })
    if (!error) {
      setComposerText('')
      setComposerSpace('')
      fetchPosts()
    }
    setPosting(false)
  }

  // Toggle reaction
  async function toggleReaction(postId: string, emoji: string) {
    if (!userId) return
    const existing = posts
      .find(p => p.id === postId)
      ?.reactions.find(r => r.user_id === userId && r.emoji === emoji)

    if (existing) {
      await supabase.from('community_reactions').delete().eq('id', existing.id)
    } else {
      await supabase.from('community_reactions').insert({
        post_id: postId,
        user_id: userId,
        emoji,
      })
    }
    fetchPosts()
  }

  // View replies
  async function openReplies(post: Post) {
    setViewingPost(post)
    setLoadingReplies(true)
    const { data } = await supabase
      .from('community_posts')
      .select(`
        id, author_id, space_id, parent_id, content, media_urls, created_at,
        author:profiles!community_posts_author_id_fkey(first_name, last_name, role, avatar_url),
        reactions:community_reactions(id, user_id, post_id, emoji)
      `)
      .eq('parent_id', post.id)
      .order('created_at', { ascending: true })

    if (data) {
      const formatted: Post[] = data.map((p: any) => ({
        ...p,
        author: Array.isArray(p.author) ? p.author[0] || null : p.author,
        space: null,
        reactions: p.reactions || [],
        reply_count: 0,
      }))
      setReplies(formatted)
    }
    setLoadingReplies(false)
  }

  // Post reply
  async function handleReply() {
    if (!replyText.trim() || !userId || !viewingPost) return
    setPosting(true)
    const { error } = await supabase.from('community_posts').insert({
      author_id: userId,
      content: replyText.trim(),
      parent_id: viewingPost.id,
      space_id: viewingPost.space_id,
    })
    if (!error) {
      setReplyText('')
      openReplies(viewingPost)
      fetchPosts()
    }
    setPosting(false)
  }

  return (
    <div>
      {/* Hero */}
      <div className="mb-6" style={{
        borderRadius: 16,
        padding: 28,
        background: 'linear-gradient(135deg,#2d1a47 0%,#623491 60%,#9b6fc4 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          right: 32,
          top: '50%',
          transform: 'translateY(-50%)',
          fontSize: 64,
          opacity: 0.15,
        }}>
          💬
        </div>
        <h2 style={{
          fontFamily: 'Georgia, serif',
          color: '#e8c487',
          fontSize: 22,
          fontWeight: 700,
          marginBottom: 6,
        }}>
          💬 Community Feed
        </h2>
        <p style={{
          color: 'rgba(255,255,255,0.75)',
          fontFamily: 'Georgia, serif',
          fontSize: 13,
          fontStyle: 'italic',
        }}>
          Share wins, ask questions, and connect with fellow calm-first leaders
        </p>
      </div>

      {/* Space Tabs */}
      <div className="flex flex-wrap gap-2 mb-5">
        <button
          className={`page-tab ${activeSpace === null ? 'active' : ''}`}
          onClick={() => setActiveSpace(null)}
        >
          All Spaces
        </button>
        {spaces.map(s => (
          <button
            key={s.id}
            className={`page-tab ${activeSpace === s.id ? 'active' : ''}`}
            onClick={() => setActiveSpace(s.id)}
          >
            {s.emoji} {s.name}
          </button>
        ))}
      </div>

      {/* Reply Thread View */}
      {viewingPost ? (
        <div className="card mb-5">
          <button
            onClick={() => { setViewingPost(null); setReplies([]) }}
            style={{
              background: 'none',
              border: 'none',
              color: '#623491',
              fontFamily: 'Georgia, serif',
              fontSize: 12,
              fontWeight: 700,
              marginBottom: 16,
              cursor: 'pointer',
            }}
          >
            &larr; Back to Feed
          </button>

          {/* Original post */}
          <PostCard
            post={viewingPost}
            userId={userId}
            onReact={toggleReaction}
            onViewReplies={() => {}}
            isThreadView
          />

          <div style={{
            borderLeft: '3px solid rgba(98,52,145,0.15)',
            marginLeft: 18,
            paddingLeft: 20,
            marginTop: 16,
          }}>
            <div style={{
              fontFamily: 'Georgia, serif',
              fontSize: 11,
              fontWeight: 700,
              color: '#9b6fc4',
              letterSpacing: 1.5,
              textTransform: 'uppercase',
              marginBottom: 12,
            }}>
              Replies ({replies.length})
            </div>

            {loadingReplies ? (
              <div style={{ color: '#9b6fc4', fontSize: 12, fontStyle: 'italic', padding: '12px 0' }}>
                Loading replies...
              </div>
            ) : replies.length === 0 ? (
              <div style={{ color: '#9b6fc4', fontSize: 12, fontStyle: 'italic', padding: '12px 0' }}>
                No replies yet. Be the first!
              </div>
            ) : (
              replies.map(r => (
                <PostCard
                  key={r.id}
                  post={r}
                  userId={userId}
                  onReact={toggleReaction}
                  onViewReplies={() => {}}
                  isReply
                />
              ))
            )}

            {/* Reply composer */}
            <div style={{ marginTop: 16 }}>
              <textarea
                className="form-input"
                value={replyText}
                onChange={e => setReplyText(e.target.value)}
                placeholder="Write a reply..."
                rows={2}
                style={{ resize: 'vertical', marginBottom: 8 }}
              />
              <button
                className="btn-primary"
                onClick={handleReply}
                disabled={posting || !replyText.trim()}
                style={{ opacity: posting || !replyText.trim() ? 0.5 : 1 }}
              >
                {posting ? 'Posting...' : 'Reply'}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* New Post Composer */}
          <div className="card mb-5">
            <div className="section-title" style={{ marginBottom: 12 }}>
              New Post
            </div>
            <textarea
              className="form-input"
              value={composerText}
              onChange={e => setComposerText(e.target.value)}
              placeholder="Share a win, ask a question, or spark a conversation..."
              rows={3}
              style={{ resize: 'vertical', marginBottom: 12 }}
            />
            <div className="flex items-center gap-3">
              <select
                className="form-select"
                value={composerSpace}
                onChange={e => setComposerSpace(e.target.value)}
                style={{ maxWidth: 220 }}
              >
                <option value="">Choose a space (optional)</option>
                {spaces.map(s => (
                  <option key={s.id} value={s.id}>{s.emoji} {s.name}</option>
                ))}
              </select>
              <button
                className="btn-primary"
                onClick={handlePost}
                disabled={posting || !composerText.trim()}
                style={{ opacity: posting || !composerText.trim() ? 0.5 : 1 }}
              >
                {posting ? 'Posting...' : 'Post'}
              </button>
            </div>
          </div>

          {/* Posts List */}
          {loading ? (
            <div className="card" style={{ textAlign: 'center', padding: 40 }}>
              <div style={{ color: '#9b6fc4', fontSize: 13, fontStyle: 'italic' }}>
                Loading feed...
              </div>
            </div>
          ) : posts.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: 40 }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>🐾</div>
              <div style={{ fontFamily: 'Georgia, serif', color: '#2d1a47', fontSize: 14, fontWeight: 700 }}>
                No posts yet
              </div>
              <div style={{ color: '#9b6fc4', fontSize: 12, fontStyle: 'italic', marginTop: 4 }}>
                Be the first to share something with the community!
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {posts.map(post => (
                <PostCard
                  key={post.id}
                  post={post}
                  userId={userId}
                  onReact={toggleReaction}
                  onViewReplies={() => openReplies(post)}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}

/* ── PostCard Component ── */
function PostCard({
  post,
  userId,
  onReact,
  onViewReplies,
  isThreadView = false,
  isReply = false,
}: {
  post: Post
  userId: string | null
  onReact: (postId: string, emoji: string) => void
  onViewReplies: () => void
  isThreadView?: boolean
  isReply?: boolean
}) {
  const authorName = post.author
    ? `${post.author.first_name} ${post.author.last_name}`
    : 'Unknown'

  // Group reactions by emoji
  const reactionGroups: Record<string, { count: number; userReacted: boolean }> = {}
  for (const r of post.reactions) {
    if (!reactionGroups[r.emoji]) {
      reactionGroups[r.emoji] = { count: 0, userReacted: false }
    }
    reactionGroups[r.emoji].count++
    if (r.user_id === userId) reactionGroups[r.emoji].userReacted = true
  }

  return (
    <div className="card" style={{
      padding: isReply ? '14px 0' : undefined,
      background: isReply ? 'transparent' : undefined,
      border: isReply ? 'none' : undefined,
      boxShadow: isReply ? 'none' : undefined,
      borderBottom: isReply ? '1px solid rgba(98,52,145,0.06)' : undefined,
      borderRadius: isReply ? 0 : undefined,
    }}>
      {/* Author Row */}
      <div className="flex items-start gap-3">
        <Avatar
          firstName={post.author?.first_name || '?'}
          lastName={post.author?.last_name || '?'}
          size={isReply ? 30 : 36}
        />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="flex items-center flex-wrap gap-2" style={{ marginBottom: 2 }}>
            <span style={{
              fontFamily: 'Georgia, serif',
              color: '#2d1a47',
              fontSize: 13,
              fontWeight: 700,
            }}>
              {authorName}
            </span>
            {post.author && <TierBadge role={post.author.role} />}
            {post.space && !isReply && (
              <span style={{
                fontSize: 10,
                color: '#9b6fc4',
                fontStyle: 'italic',
              }}>
                in {post.space.emoji} {post.space.name}
              </span>
            )}
            <span style={{
              fontSize: 10.5,
              color: '#b8a3d0',
              marginLeft: 'auto',
              whiteSpace: 'nowrap',
            }}>
              {timeAgo(post.created_at)}
            </span>
          </div>

          {/* Content */}
          <div style={{
            fontFamily: 'Georgia, serif',
            color: '#2d1a47',
            fontSize: 12.5,
            lineHeight: 1.6,
            marginTop: 6,
            whiteSpace: 'pre-wrap',
          }}>
            {post.content}
          </div>

          {/* Media */}
          {post.media_urls && post.media_urls.length > 0 && (
            <div className="flex gap-2 flex-wrap" style={{ marginTop: 10 }}>
              {post.media_urls.map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt=""
                  style={{
                    borderRadius: 10,
                    maxWidth: 240,
                    maxHeight: 180,
                    objectFit: 'cover',
                    border: '1px solid rgba(98,52,145,0.1)',
                  }}
                />
              ))}
            </div>
          )}

          {/* Reactions + Reply Count */}
          <div className="flex items-center flex-wrap gap-2" style={{ marginTop: 10 }}>
            {/* Existing reaction counts */}
            {Object.entries(reactionGroups).map(([emoji, info]) => (
              <button
                key={emoji}
                onClick={() => onReact(post.id, emoji)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4,
                  padding: '3px 8px',
                  borderRadius: 20,
                  fontSize: 11,
                  fontFamily: 'Georgia, serif',
                  border: info.userReacted
                    ? '1.5px solid #623491'
                    : '1px solid rgba(98,52,145,0.12)',
                  background: info.userReacted
                    ? 'rgba(98,52,145,0.08)'
                    : 'rgba(98,52,145,0.03)',
                  cursor: 'pointer',
                  color: '#2d1a47',
                  fontWeight: info.userReacted ? 700 : 400,
                }}
              >
                {emoji} {info.count}
              </button>
            ))}

            {/* Add reaction picker */}
            {REACTION_EMOJIS.filter(e => !reactionGroups[e]).map(emoji => (
              <button
                key={emoji}
                onClick={() => onReact(post.id, emoji)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '3px 6px',
                  borderRadius: 20,
                  fontSize: 11,
                  border: '1px solid rgba(98,52,145,0.08)',
                  background: 'transparent',
                  cursor: 'pointer',
                  opacity: 0.4,
                }}
                title={`React with ${emoji}`}
              >
                {emoji}
              </button>
            ))}

            {/* Reply count / view thread */}
            {!isReply && !isThreadView && (
              <button
                onClick={onViewReplies}
                style={{
                  marginLeft: 'auto',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4,
                  background: 'none',
                  border: 'none',
                  color: '#623491',
                  fontSize: 11,
                  fontFamily: 'Georgia, serif',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                💬 {post.reply_count} {post.reply_count === 1 ? 'reply' : 'replies'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
