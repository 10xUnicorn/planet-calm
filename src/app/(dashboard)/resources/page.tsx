'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase-browser'
import { Search, Download, Play, Lock, CheckCircle, Clock } from 'lucide-react'
import Link from 'next/link'
import { demoContent } from '@/lib/demo-data'

/* ── Types ── */
interface CourseWithEnrollment {
  id: string
  title: string
  slug: string
  description: string | null
  category: string
  visibility: string
  certificate_enabled: boolean
  enrollment: {
    id: string
    progress_pct: number
    completed_at: string | null
  } | null
}

interface Certificate {
  id: string
  course_id: string
  user_id: string
  issued_at: string
  certificate_url: string | null
  course: { title: string } | null
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

const TYPE_ICONS: Record<string, string> = {
  video: '🎥',
  pdf: '📄',
  audio: '🎧',
  template: '📐',
  link: '🔗',
  course: '📖',
}

/* ── Worksheets (matching existing data shape from worksheets page) ── */
const worksheets = [
  { id: '1', title: 'Calm Anchoring Foundations', submissions: 14, reviewed: 10, pending: 4, tier: 'Studio' },
  { id: '2', title: 'BARKType Self-Assessment', submissions: 8, reviewed: 8, pending: 0, tier: 'BARKType' },
  { id: '3', title: 'Weekly Calm Check-In', submissions: 42, reviewed: 35, pending: 7, tier: 'All' },
  { id: '4', title: 'Leadership Reflection \u2014 Module 3', submissions: 6, reviewed: 3, pending: 3, tier: 'Council' },
  { id: '5', title: 'Dog Behavior Journal', submissions: 22, reviewed: 18, pending: 4, tier: 'Collective' },
]

export default function ResourcesPage() {
  const supabase = createClient()
  const [activeTab, setActiveTab] = useState<'courses' | 'worksheets' | 'content' | 'certificates'>('courses')
  const [courses, setCourses] = useState<CourseWithEnrollment[]>([])
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [loading, setLoading] = useState(true)
  const [userId, setUserId] = useState<string | null>(null)
  const [search, setSearch] = useState('')

  // Get current user
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) setUserId(data.user.id)
    })
  }, [supabase.auth])

  // Fetch courses with enrollment status
  const fetchCourses = useCallback(async () => {
    if (!userId) return
    setLoading(true)

    const { data: coursesData } = await supabase
      .from('courses')
      .select('id, title, slug, description, category, visibility, certificate_enabled')
      .eq('visibility', 'published')
      .is('deleted_at', null)
      .order('created_at', { ascending: false })

    if (!coursesData) {
      setCourses([])
      setLoading(false)
      return
    }

    // Fetch enrollments for current user
    const courseIds = coursesData.map((c: any) => c.id)
    const { data: enrollments } = await supabase
      .from('enrollments')
      .select('id, course_id, progress_pct, completed_at')
      .eq('user_id', userId)
      .in('course_id', courseIds)

    const enriched: CourseWithEnrollment[] = coursesData.map((c: any) => {
      const enrollment = (enrollments || []).find((e: any) => e.course_id === c.id)
      return {
        ...c,
        enrollment: enrollment ? {
          id: enrollment.id,
          progress_pct: enrollment.progress_pct || 0,
          completed_at: enrollment.completed_at,
        } : null,
      }
    })

    setCourses(enriched)
    setLoading(false)
  }, [supabase, userId])

  // Fetch certificates
  const fetchCertificates = useCallback(async () => {
    if (!userId) return

    const { data } = await supabase
      .from('certificates')
      .select('id, course_id, user_id, issued_at, certificate_url, course:courses(title)')
      .eq('user_id', userId)
      .order('issued_at', { ascending: false })

    if (data) {
      const formatted: Certificate[] = data.map((c: any) => ({
        ...c,
        course: Array.isArray(c.course) ? c.course[0] || null : c.course,
      }))
      setCertificates(formatted)
    }
  }, [supabase, userId])

  useEffect(() => {
    if (userId) {
      fetchCourses()
      fetchCertificates()
    }
  }, [userId, fetchCourses, fetchCertificates])

  // Start enrollment
  const handleEnroll = async (courseId: string) => {
    if (!userId) return
    const { error } = await supabase.from('enrollments').insert({
      user_id: userId,
      course_id: courseId,
      progress_pct: 0,
    })
    if (!error) fetchCourses()
  }

  // Get course status label
  function getCourseStatus(course: CourseWithEnrollment) {
    if (!course.enrollment) return { label: 'Not Started', color: '#9b6fc4', bg: '#f9f5fe' }
    if (course.enrollment.completed_at) return { label: 'Completed', color: '#1e7d47', bg: '#e8f5ee' }
    return { label: 'In Progress', color: '#9a6800', bg: '#fdf3dc' }
  }

  const TABS = [
    { key: 'courses' as const, label: 'Courses', icon: '📚' },
    { key: 'worksheets' as const, label: 'Worksheets', icon: '📝' },
    { key: 'content' as const, label: 'Content Library', icon: '📖' },
    { key: 'certificates' as const, label: 'Certificates', icon: '🏆' },
  ]

  // Filter content by search
  const filteredContent = demoContent.filter(c =>
    search === '' || c.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      {/* Page Header */}
      <div className="mb-6">
        <h1 style={{
          fontFamily: 'Georgia, serif', fontSize: 22, fontWeight: 700,
          color: '#2d1a47', marginBottom: 4,
        }}>
          🌿 My Resources
        </h1>
        <p style={{ color: '#9b6fc4', fontSize: 12.5, fontStyle: 'italic' }}>
          Your courses, worksheets, content library, and earned certificates
        </p>
      </div>

      {/* Sub-tabs */}
      <div className="flex flex-wrap gap-2 mb-5">
        {TABS.map(tab => (
          <button
            key={tab.key}
            onClick={() => { setActiveTab(tab.key); setSearch('') }}
            className={`page-tab ${activeTab === tab.key ? 'page-tab-active' : ''}`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* ═══════ COURSES TAB ═══════ */}
      {activeTab === 'courses' && (
        <div>
          {loading ? (
            <div style={{
              textAlign: 'center', padding: 48, color: '#9b6fc4',
              fontFamily: 'Georgia, serif', fontStyle: 'italic',
            }}>
              Loading courses...
            </div>
          ) : courses.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: 48 }}>
              <div style={{ fontSize: 42, marginBottom: 12 }}>📚</div>
              <div style={{
                fontFamily: 'Georgia, serif', fontSize: 14, fontWeight: 700,
                color: '#2d1a47', marginBottom: 6,
              }}>
                No courses available yet
              </div>
              <div style={{ color: '#9b6fc4', fontSize: 12, fontStyle: 'italic' }}>
                Check back soon for new learning experiences!
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-4">
              {courses.map(course => {
                const status = getCourseStatus(course)
                const catColors = CATEGORY_COLORS[course.category] || CATEGORY_COLORS.standalone
                return (
                  <div key={course.id} className="card" style={{ position: 'relative' }}>
                    {/* Cover thumbnail */}
                    <div className="flex items-center justify-center" style={{
                      width: '100%', height: 100, borderRadius: 10,
                      background: 'linear-gradient(135deg,#f9f5fe,#ede4f5)',
                      marginBottom: 14, fontSize: 36,
                    }}>
                      {CATEGORY_EMOJIS[course.category] || '📚'}
                    </div>

                    {/* Category badge */}
                    <div className="flex items-center gap-2" style={{ marginBottom: 8 }}>
                      <span style={{
                        display: 'inline-block', padding: '2px 8px', borderRadius: 20,
                        fontSize: 9.5, fontWeight: 700, fontFamily: 'Georgia, serif',
                        background: catColors.bg, color: catColors.color,
                      }}>
                        {course.category}
                      </span>
                      <span style={{
                        display: 'inline-block', padding: '2px 8px', borderRadius: 20,
                        fontSize: 9.5, fontWeight: 700, fontFamily: 'Georgia, serif',
                        background: status.bg, color: status.color,
                      }}>
                        {status.label}
                      </span>
                    </div>

                    {/* Title */}
                    <div style={{
                      fontFamily: 'Georgia, serif', fontSize: 14, fontWeight: 700,
                      color: '#2d1a47', marginBottom: 6,
                    }}>
                      {course.title}
                    </div>

                    {course.description && (
                      <div style={{
                        fontSize: 11.5, color: '#7a5ea0', fontStyle: 'italic',
                        marginBottom: 12, lineHeight: 1.5,
                        display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}>
                        {course.description}
                      </div>
                    )}

                    {/* Progress bar */}
                    {course.enrollment && (
                      <div style={{ marginBottom: 12 }}>
                        <div className="flex justify-between" style={{ marginBottom: 4 }}>
                          <span style={{ fontSize: 10, color: '#9b6fc4', fontWeight: 700, letterSpacing: 1 }}>
                            PROGRESS
                          </span>
                          <span style={{ fontSize: 10, fontWeight: 700, color: '#623491' }}>
                            {course.enrollment.progress_pct}%
                          </span>
                        </div>
                        <div style={{
                          height: 6, background: 'rgba(98,52,145,0.12)',
                          borderRadius: 3, overflow: 'hidden',
                        }}>
                          <div style={{
                            height: '100%', borderRadius: 3,
                            width: `${course.enrollment.progress_pct}%`,
                            background: course.enrollment.completed_at
                              ? 'linear-gradient(90deg, #2a9d5c, #4ecf7d)'
                              : 'linear-gradient(90deg, #623491, #e8c487)',
                          }} />
                        </div>
                      </div>
                    )}

                    {/* Action button */}
                    {course.enrollment ? (
                      <Link
                        href={`/courses/${course.slug}`}
                        className="btn-primary flex items-center justify-center gap-2"
                        style={{
                          display: 'flex', width: '100%', textDecoration: 'none',
                          textAlign: 'center', padding: '9px 16px', fontSize: 11.5,
                        }}
                      >
                        <Play size={12} />
                        {course.enrollment.completed_at ? 'Review' : 'Continue'}
                      </Link>
                    ) : (
                      <button
                        className="btn-secondary flex items-center justify-center gap-2"
                        style={{ width: '100%', fontSize: 11.5, padding: '9px 16px' }}
                        onClick={() => handleEnroll(course.id)}
                      >
                        <Play size={12} /> Start Course
                      </button>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}

      {/* ═══════ WORKSHEETS TAB ═══════ */}
      {activeTab === 'worksheets' && (
        <div className="card">
          <div className="section-title" style={{ marginBottom: 16 }}>
            📝 Your Worksheets
          </div>
          {worksheets.length === 0 ? (
            <div style={{
              textAlign: 'center', padding: 32, color: '#9b6fc4',
              fontFamily: 'Georgia, serif', fontStyle: 'italic',
            }}>
              No worksheets assigned yet.
            </div>
          ) : (
            worksheets.map(w => (
              <div key={w.id} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '14px 0', borderBottom: '1px solid rgba(98,52,145,0.06)',
              }}>
                <div>
                  <div style={{
                    fontSize: 13, fontWeight: 700, fontFamily: 'Georgia, serif',
                    color: '#2d1a47',
                  }}>
                    {w.title}
                  </div>
                  <div className="flex items-center gap-2" style={{ marginTop: 4 }}>
                    <span className="tag">{w.tier}</span>
                    <span style={{ fontSize: 10.5, color: '#9b6fc4' }}>
                      {w.submissions} submissions
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1" style={{ fontSize: 10.5, color: '#2a9d5c' }}>
                    <CheckCircle size={11} /> {w.reviewed} reviewed
                  </span>
                  {w.pending > 0 && (
                    <span className="flex items-center gap-1" style={{ fontSize: 10.5, color: '#9a6800' }}>
                      <Clock size={11} /> {w.pending} pending
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* ═══════ CONTENT LIBRARY TAB ═══════ */}
      {activeTab === 'content' && (
        <div>
          {/* Search */}
          <div className="flex items-center gap-3 mb-4">
            <div className="search-bar" style={{ flex: 1, maxWidth: 360 }}>
              <Search size={14} style={{
                color: '#9b6fc4',
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
              }} />
              <input
                type="text"
                placeholder="Search content..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {filteredContent.map(item => (
              <div key={item.id} className="card" style={{ cursor: 'pointer', transition: 'box-shadow .18s' }}>
                <div className="flex items-start justify-between" style={{ marginBottom: 12 }}>
                  <div style={{
                    padding: 8, borderRadius: 8, fontSize: 16,
                    background: 'rgba(98,52,145,0.08)',
                  }}>
                    {TYPE_ICONS[item.type] || '📄'}
                  </div>
                  <span className={`pill ${item.published ? 'pill-green' : 'pill-amber'}`}>
                    {item.published ? 'Available' : 'Coming Soon'}
                  </span>
                </div>
                <div style={{
                  fontFamily: 'Georgia, serif', color: '#2d1a47',
                  fontSize: 13, fontWeight: 700, marginBottom: 8,
                }}>
                  {item.title}
                </div>
                <div style={{
                  color: '#7a5ea0', fontSize: 10.5, fontStyle: 'italic', marginBottom: 12,
                }}>
                  {item.collection}
                </div>
                <div className="flex flex-wrap gap-1">
                  {item.tier.slice(0, 3).map((t, i) => (
                    <span key={i} className="tag">{t.replace('client_', '')}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ═══════ CERTIFICATES TAB ═══════ */}
      {activeTab === 'certificates' && (
        <div>
          {certificates.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: 48 }}>
              <div style={{ fontSize: 42, marginBottom: 12 }}>🏆</div>
              <div style={{
                fontFamily: 'Georgia, serif', fontSize: 14, fontWeight: 700,
                color: '#2d1a47', marginBottom: 6,
              }}>
                No certificates earned yet
              </div>
              <div style={{ color: '#9b6fc4', fontSize: 12, fontStyle: 'italic' }}>
                Complete courses to earn certificates and showcase your achievements!
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-4">
              {certificates.map(cert => (
                <div key={cert.id} className="card">
                  {/* Certificate visual */}
                  <div className="flex items-center justify-center" style={{
                    width: '100%', height: 100, borderRadius: 10,
                    background: 'linear-gradient(135deg,#fdf8ec,#fdf0d0)',
                    marginBottom: 14,
                    border: '2px solid rgba(232,196,135,0.4)',
                  }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: 32 }}>🏆</div>
                      <div style={{
                        fontSize: 9, fontWeight: 700, letterSpacing: 1.5,
                        textTransform: 'uppercase', color: '#7a5500',
                        fontFamily: 'Georgia, serif',
                      }}>
                        Certificate
                      </div>
                    </div>
                  </div>

                  <div style={{
                    fontFamily: 'Georgia, serif', fontSize: 13, fontWeight: 700,
                    color: '#2d1a47', marginBottom: 4,
                  }}>
                    {cert.course?.title || 'Course Certificate'}
                  </div>
                  <div style={{
                    fontSize: 10.5, color: '#9b6fc4', fontStyle: 'italic', marginBottom: 12,
                  }}>
                    Issued {new Date(cert.issued_at).toLocaleDateString('en-US', {
                      month: 'short', day: 'numeric', year: 'numeric',
                    })}
                  </div>

                  {cert.certificate_url ? (
                    <a
                      href={cert.certificate_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary flex items-center justify-center gap-2"
                      style={{
                        display: 'flex', width: '100%', textDecoration: 'none',
                        fontSize: 11.5, padding: '9px 16px',
                      }}
                    >
                      <Download size={12} /> Download
                    </a>
                  ) : (
                    <div style={{
                      textAlign: 'center', padding: '8px', fontSize: 11,
                      color: '#9b6fc4', fontStyle: 'italic',
                    }}>
                      Certificate available soon
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
