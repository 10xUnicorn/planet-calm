'use client'

import { useState, useEffect, useCallback } from 'react'
import { useParams } from 'next/navigation'
import { createClient } from '@/lib/supabase-browser'
import Link from 'next/link'
import { ChevronLeft, CheckCircle, Lock, Play, Edit, Plus } from 'lucide-react'

/* ── Types ── */
interface Lesson {
  id: string
  title: string
  sort_order: number
  content_blocks: any[] | null
  video_url: string | null
  is_locked: boolean
  completed: boolean
}

interface Module {
  id: string
  title: string
  sort_order: number
  lessons: Lesson[]
}

interface CourseDetail {
  id: string
  title: string
  slug: string
  description: string | null
  category: string
  visibility: string
  certificate_enabled: boolean
}

interface Enrollment {
  id: string
  progress_pct: number
  completed_at: string | null
}

/* ── Constants ── */
const CATEGORY_EMOJIS: Record<string, string> = {
  barktype: '🐾',
  collective: '🌿',
  council: '👑',
  wayfinder: '🧭',
  book: '📖',
  standalone: '📚',
}

const CATEGORY_COLORS: Record<string, { bg: string; color: string }> = {
  barktype: { bg: '#ede4f5', color: '#623491' },
  collective: { bg: '#e8f5ee', color: '#1e7d47' },
  council: { bg: '#fdf0d0', color: '#7a5500' },
  wayfinder: { bg: '#e4edf5', color: '#1a5a8a' },
  book: { bg: '#fdf3dc', color: '#9a6800' },
  standalone: { bg: '#f0edf5', color: '#623491' },
}

export default function CoursePlayerPage() {
  const params = useParams()
  const slug = params?.slug as string
  const supabase = createClient()

  const [course, setCourse] = useState<CourseDetail | null>(null)
  const [modules, setModules] = useState<Module[]>([])
  const [enrollment, setEnrollment] = useState<Enrollment | null>(null)
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null)
  const [loading, setLoading] = useState(true)
  const [userId, setUserId] = useState<string | null>(null)
  const [userRole, setUserRole] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [markingComplete, setMarkingComplete] = useState(false)

  // Get current user + role
  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setUserId(user.id)
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single()
        if (profile) setUserRole(profile.role)
      }
    }
    getUser()
  }, [supabase])

  const isAdmin = userRole === 'superadmin' || userRole === 'team_member' || userRole === 'coach'

  // Fetch course data
  const fetchCourse = useCallback(async () => {
    if (!slug) return
    setLoading(true)

    // 1. Fetch the course
    const { data: courseData, error: courseErr } = await supabase
      .from('courses')
      .select('id, title, slug, description, category, visibility, certificate_enabled')
      .eq('slug', slug)
      .is('deleted_at', null)
      .single()

    if (courseErr || !courseData) {
      setError('Course not found')
      setLoading(false)
      return
    }
    setCourse(courseData)

    // 2. Fetch modules
    const { data: modulesData } = await supabase
      .from('modules')
      .select('id, title, sort_order')
      .eq('course_id', courseData.id)
      .order('sort_order', { ascending: true })

    // 3. Fetch lessons for all modules
    const moduleIds = (modulesData || []).map((m: any) => m.id)
    let lessonsData: any[] = []
    if (moduleIds.length > 0) {
      const { data } = await supabase
        .from('lessons')
        .select('id, module_id, title, sort_order, content_blocks, video_url, is_locked')
        .in('module_id', moduleIds)
        .order('sort_order', { ascending: true })
      lessonsData = data || []
    }

    // 4. Fetch lesson progress for current user
    let progressMap: Record<string, boolean> = {}
    if (userId) {
      const lessonIds = lessonsData.map((l: any) => l.id)
      if (lessonIds.length > 0) {
        const { data: progressData } = await supabase
          .from('lesson_progress')
          .select('lesson_id, completed')
          .eq('user_id', userId)
          .in('lesson_id', lessonIds)

        if (progressData) {
          for (const p of progressData) {
            if (p.completed) progressMap[p.lesson_id] = true
          }
        }
      }

      // 5. Fetch enrollment
      const { data: enrollmentData } = await supabase
        .from('enrollments')
        .select('id, progress_pct, completed_at')
        .eq('user_id', userId)
        .eq('course_id', courseData.id)
        .maybeSingle()

      if (enrollmentData) {
        setEnrollment({
          id: enrollmentData.id,
          progress_pct: enrollmentData.progress_pct || 0,
          completed_at: enrollmentData.completed_at,
        })
      }
    }

    // Build enriched modules
    const enrichedModules: Module[] = (modulesData || []).map((m: any) => ({
      ...m,
      lessons: lessonsData
        .filter((l: any) => l.module_id === m.id)
        .map((l: any) => ({
          ...l,
          is_locked: l.is_locked ?? false,
          completed: progressMap[l.id] || false,
        })),
    }))

    setModules(enrichedModules)
    setLoading(false)
  }, [supabase, slug, userId])

  useEffect(() => {
    fetchCourse()
  }, [fetchCourse])

  // Find first incomplete lesson
  function findFirstIncomplete(): Lesson | null {
    for (const mod of modules) {
      for (const lesson of mod.lessons) {
        if (!lesson.completed && !lesson.is_locked) return lesson
      }
    }
    return null
  }

  // Mark lesson complete
  async function handleMarkComplete() {
    if (!selectedLesson || !userId || !course) return
    setMarkingComplete(true)

    // Upsert lesson_progress
    const { error: progressErr } = await supabase
      .from('lesson_progress')
      .upsert({
        user_id: userId,
        lesson_id: selectedLesson.id,
        completed: true,
        completed_at: new Date().toISOString(),
      }, { onConflict: 'user_id,lesson_id' })

    if (progressErr) {
      setError(progressErr.message)
      setMarkingComplete(false)
      return
    }

    // Recalculate and update enrollment progress
    const totalLessons = modules.reduce((sum, m) => sum + m.lessons.length, 0)
    const completedCount = modules.reduce(
      (sum, m) => sum + m.lessons.filter(l => l.completed || l.id === selectedLesson.id).length,
      0
    )
    const newPct = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0

    if (enrollment) {
      await supabase
        .from('enrollments')
        .update({
          progress_pct: newPct,
          completed_at: newPct >= 100 ? new Date().toISOString() : null,
        })
        .eq('id', enrollment.id)
    }

    setMarkingComplete(false)
    fetchCourse()
  }

  // Render content blocks
  function renderContentBlocks(blocks: any[] | null) {
    if (!blocks || blocks.length === 0) {
      return (
        <div style={{
          color: '#9b6fc4', fontSize: 12.5, fontStyle: 'italic', padding: '20px 0',
        }}>
          No content has been added to this lesson yet.
        </div>
      )
    }

    return blocks.map((block: any, i: number) => {
      switch (block.type) {
        case 'heading':
          return (
            <h3 key={i} style={{
              fontFamily: 'Georgia, serif', fontSize: 16, fontWeight: 700,
              color: '#2d1a47', marginBottom: 12, marginTop: i > 0 ? 16 : 0,
            }}>
              {block.content}
            </h3>
          )
        case 'text':
          return (
            <p key={i} style={{
              fontFamily: 'Georgia, serif', fontSize: 13, color: '#2d1a47',
              lineHeight: 1.7, marginBottom: 12,
            }}>
              {block.content}
            </p>
          )
        case 'image':
          return (
            <img key={i} src={block.url} alt={block.alt || ''} style={{
              maxWidth: '100%', borderRadius: 10, marginBottom: 12,
              border: '1px solid rgba(98,52,145,0.1)',
            }} />
          )
        case 'callout':
          return (
            <div key={i} style={{
              padding: '14px 18px', borderRadius: 10,
              background: 'linear-gradient(135deg,#f9f5fe,#ede4f5)',
              borderLeft: '3px solid #623491',
              fontFamily: 'Georgia, serif', fontSize: 12.5, color: '#623491',
              lineHeight: 1.6, marginBottom: 12,
            }}>
              {block.content}
            </div>
          )
        default:
          return (
            <div key={i} style={{
              fontFamily: 'Georgia, serif', fontSize: 13, color: '#2d1a47',
              lineHeight: 1.7, marginBottom: 12,
            }}>
              {typeof block.content === 'string' ? block.content : JSON.stringify(block)}
            </div>
          )
      }
    })
  }

  if (loading) {
    return (
      <div style={{
        textAlign: 'center', padding: 48, color: '#9b6fc4',
        fontFamily: 'Georgia, serif', fontStyle: 'italic',
      }}>
        Loading course...
      </div>
    )
  }

  if (error || !course) {
    return (
      <div style={{ padding: 28 }}>
        <Link href="/courses" style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          fontFamily: 'Georgia, serif', fontSize: 12, fontWeight: 700,
          color: '#623491', textDecoration: 'none', marginBottom: 20,
        }}>
          <ChevronLeft size={14} /> Back to Courses
        </Link>
        <div className="card" style={{ textAlign: 'center', padding: 48 }}>
          <div style={{ fontSize: 42, marginBottom: 12 }}>😿</div>
          <div style={{
            fontFamily: 'Georgia, serif', fontSize: 14, fontWeight: 700,
            color: '#2d1a47', marginBottom: 6,
          }}>
            {error || 'Course not found'}
          </div>
        </div>
      </div>
    )
  }

  const catColors = CATEGORY_COLORS[course.category] || CATEGORY_COLORS.standalone
  const totalLessons = modules.reduce((sum, m) => sum + m.lessons.length, 0)
  const completedLessons = modules.reduce(
    (sum, m) => sum + m.lessons.filter(l => l.completed).length, 0
  )

  return (
    <div>
      {/* Back link */}
      <Link href="/courses" style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        fontFamily: 'Georgia, serif', fontSize: 12, fontWeight: 700,
        color: '#623491', textDecoration: 'none', marginBottom: 20,
      }}>
        <ChevronLeft size={14} /> Back to Courses
      </Link>

      {/* Course Header */}
      <div className="card" style={{ marginBottom: 24, position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 3,
          background: 'linear-gradient(90deg,#623491,#e8c487)',
        }} />

        <div className="flex items-start justify-between">
          <div style={{ flex: 1 }}>
            <div className="flex items-center gap-2" style={{ marginBottom: 8 }}>
              <span style={{ fontSize: 24 }}>{CATEGORY_EMOJIS[course.category] || '📚'}</span>
              <span style={{
                display: 'inline-block', padding: '3px 10px', borderRadius: 20,
                fontSize: 10.5, fontWeight: 700, fontFamily: 'Georgia, serif',
                background: catColors.bg, color: catColors.color,
              }}>
                {course.category}
              </span>
              {course.visibility === 'draft' && (
                <span className="pill pill-amber">Draft</span>
              )}
            </div>
            <h1 style={{
              fontFamily: 'Georgia, serif', fontSize: 22, fontWeight: 700,
              color: '#2d1a47', marginBottom: 8,
            }}>
              {course.title}
            </h1>
            {course.description && (
              <p style={{
                fontSize: 13, color: '#7a5ea0', fontStyle: 'italic',
                lineHeight: 1.6, maxWidth: 600,
              }}>
                {course.description}
              </p>
            )}
          </div>

          {/* Progress circle on right */}
          {enrollment && (
            <div style={{ textAlign: 'center', minWidth: 80 }}>
              <div style={{
                width: 72, height: 72, borderRadius: '50%',
                background: `conic-gradient(#623491 ${enrollment.progress_pct * 3.6}deg, rgba(98,52,145,0.12) 0deg)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <div style={{
                  width: 58, height: 58, borderRadius: '50%',
                  background: '#fff', display: 'flex', alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'Georgia, serif', fontSize: 16, fontWeight: 700,
                  color: '#623491',
                }}>
                  {enrollment.progress_pct}%
                </div>
              </div>
              <div style={{
                fontSize: 10, color: '#9b6fc4', fontWeight: 700,
                letterSpacing: 1, marginTop: 6,
              }}>
                {completedLessons}/{totalLessons} LESSONS
              </div>
            </div>
          )}
        </div>

        {/* Admin edit button */}
        {isAdmin && (
          <div style={{ marginTop: 16 }}>
            <span className="ai-chip" style={{ fontSize: 10 }}>
              <Edit size={11} /> Admin Mode
            </span>
          </div>
        )}

        {/* Continue Learning button */}
        {enrollment && !selectedLesson && (
          <div style={{ marginTop: 16 }}>
            <button
              className="btn-primary flex items-center gap-2"
              onClick={() => {
                const next = findFirstIncomplete()
                if (next) setSelectedLesson(next)
              }}
              disabled={!findFirstIncomplete()}
              style={{ opacity: findFirstIncomplete() ? 1 : 0.5 }}
            >
              <Play size={13} />
              {enrollment.completed_at ? 'Review Course' : 'Continue Learning'}
            </button>
          </div>
        )}
      </div>

      {/* Main Content: Curriculum + Lesson View */}
      <div className="grid grid-cols-3 gap-4">
        {/* Curriculum Outline (left sidebar) */}
        <div style={{ gridColumn: '1 / 2' }}>
          <div className="card" style={{ padding: 0 }}>
            <div style={{
              padding: '16px 20px', borderBottom: '1px solid rgba(98,52,145,0.1)',
            }}>
              <div className="section-title">Curriculum</div>
            </div>

            {modules.length === 0 ? (
              <div style={{
                padding: '32px 20px', textAlign: 'center',
                color: '#9b6fc4', fontSize: 12, fontStyle: 'italic',
              }}>
                No modules have been added yet.
                {isAdmin && (
                  <div style={{ marginTop: 12 }}>
                    <button className="btn-secondary flex items-center gap-2" style={{
                      margin: '0 auto', fontSize: 11, padding: '7px 14px',
                    }}>
                      <Plus size={11} /> Add Module
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div>
                {modules.map((mod, mi) => (
                  <div key={mod.id}>
                    {/* Module header */}
                    <div style={{
                      padding: '12px 20px',
                      background: 'rgba(98,52,145,0.03)',
                      borderBottom: '1px solid rgba(98,52,145,0.06)',
                    }}>
                      <div style={{
                        fontSize: 10, fontWeight: 700, letterSpacing: 1.5,
                        textTransform: 'uppercase', color: '#9b6fc4',
                        fontFamily: 'Georgia, serif', marginBottom: 2,
                      }}>
                        Module {mi + 1}
                      </div>
                      <div style={{
                        fontFamily: 'Georgia, serif', fontSize: 12.5, fontWeight: 700,
                        color: '#2d1a47',
                      }}>
                        {mod.title}
                      </div>
                    </div>

                    {/* Lessons */}
                    {mod.lessons.map(lesson => {
                      const isSelected = selectedLesson?.id === lesson.id
                      return (
                        <button
                          key={lesson.id}
                          onClick={() => {
                            if (!lesson.is_locked) setSelectedLesson(lesson)
                          }}
                          disabled={lesson.is_locked}
                          style={{
                            display: 'flex', alignItems: 'center', gap: 10,
                            width: '100%', textAlign: 'left',
                            padding: '11px 20px 11px 32px',
                            background: isSelected ? 'rgba(98,52,145,0.08)' : 'transparent',
                            borderLeft: isSelected ? '3px solid #623491' : '3px solid transparent',
                            borderBottom: '1px solid rgba(98,52,145,0.04)',
                            borderRight: 'none', borderTop: 'none',
                            cursor: lesson.is_locked ? 'not-allowed' : 'pointer',
                            opacity: lesson.is_locked ? 0.5 : 1,
                            fontFamily: 'Georgia, serif',
                            fontSize: 12, color: '#2d1a47',
                            transition: 'all .15s',
                          }}
                        >
                          {/* Status icon */}
                          <span style={{ flexShrink: 0, width: 16, display: 'flex', justifyContent: 'center' }}>
                            {lesson.is_locked ? (
                              <Lock size={12} style={{ color: '#9b6fc4' }} />
                            ) : lesson.completed ? (
                              <CheckCircle size={14} style={{ color: '#2a9d5c' }} />
                            ) : (
                              <div style={{
                                width: 12, height: 12, borderRadius: '50%',
                                border: '2px solid rgba(98,52,145,0.25)',
                              }} />
                            )}
                          </span>
                          <span style={{
                            fontWeight: isSelected ? 700 : 400,
                            color: lesson.completed ? '#7a5ea0' : '#2d1a47',
                            textDecoration: lesson.completed ? 'line-through' : 'none',
                          }}>
                            {lesson.title}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Lesson Content Area (right, 2 cols wide) */}
        <div style={{ gridColumn: '2 / 4' }}>
          {selectedLesson ? (
            <div className="card">
              {/* Lesson header */}
              <div className="flex items-center justify-between" style={{ marginBottom: 20 }}>
                <div>
                  <div style={{
                    fontFamily: 'Georgia, serif', fontSize: 18, fontWeight: 700,
                    color: '#2d1a47', marginBottom: 4,
                  }}>
                    {selectedLesson.title}
                  </div>
                  {selectedLesson.completed && (
                    <span className="pill pill-green" style={{ fontSize: 9 }}>
                      Completed
                    </span>
                  )}
                </div>
                {isAdmin && (
                  <button className="btn-secondary flex items-center gap-2" style={{
                    fontSize: 10.5, padding: '6px 12px',
                  }}>
                    <Edit size={11} /> Edit Lesson
                  </button>
                )}
              </div>

              {/* Video embed */}
              {selectedLesson.video_url && (
                <div style={{
                  marginBottom: 20, borderRadius: 10, overflow: 'hidden',
                  background: '#000', aspectRatio: '16/9',
                }}>
                  <iframe
                    src={selectedLesson.video_url}
                    style={{ width: '100%', height: '100%', border: 'none' }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={selectedLesson.title}
                  />
                </div>
              )}

              {/* Content blocks */}
              <div style={{ marginBottom: 24 }}>
                {renderContentBlocks(selectedLesson.content_blocks)}
              </div>

              {/* Mark Complete */}
              {!selectedLesson.completed && enrollment && (
                <div style={{
                  padding: '16px 0', borderTop: '1px solid rgba(98,52,145,0.1)',
                }}>
                  <button
                    className="btn-primary flex items-center gap-2"
                    onClick={handleMarkComplete}
                    disabled={markingComplete}
                    style={{ opacity: markingComplete ? 0.5 : 1 }}
                  >
                    <CheckCircle size={13} />
                    {markingComplete ? 'Saving...' : 'Mark Complete'}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="card" style={{ textAlign: 'center', padding: 48 }}>
              <div style={{ fontSize: 42, marginBottom: 12 }}>📖</div>
              <div style={{
                fontFamily: 'Georgia, serif', fontSize: 14, fontWeight: 700,
                color: '#2d1a47', marginBottom: 6,
              }}>
                Select a lesson to begin
              </div>
              <div style={{ color: '#9b6fc4', fontSize: 12, fontStyle: 'italic' }}>
                Choose a lesson from the curriculum on the left to view its content.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
