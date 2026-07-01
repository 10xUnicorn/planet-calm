'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase-browser'
import { Search, Plus, Trash2 } from 'lucide-react'

/* ── Types ── */
interface Course {
  id: string
  title: string
  slug: string
  description: string | null
  category: string
  visibility: string
  certificate_enabled: boolean
  created_at: string
  enrolled_count: number
  avg_completion: number
  certificate_count: number
}

type CourseFormData = {
  title: string
  slug: string
  description: string
  category: string
  visibility: string
  certificate_enabled: boolean
}

const CATEGORIES = [
  { value: 'barktype', label: 'BARKType' },
  { value: 'collective', label: 'Collective' },
  { value: 'council', label: 'Council' },
  { value: 'wayfinder', label: 'Wayfinder' },
  { value: 'book', label: 'Book' },
  { value: 'standalone', label: 'Standalone' },
]

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

const emptyForm: CourseFormData = {
  title: '',
  slug: '',
  description: '',
  category: 'standalone',
  visibility: 'draft',
  certificate_enabled: false,
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export default function CoursesAdminPage() {
  const supabase = createClient()
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<string>('all')
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState<CourseFormData>(emptyForm)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchCourses = useCallback(async () => {
    setLoading(true)

    // Fetch courses
    const { data: coursesData, error: coursesErr } = await supabase
      .from('courses')
      .select('id, title, slug, description, category, visibility, certificate_enabled, created_at')
      .is('deleted_at', null)
      .order('created_at', { ascending: false })

    if (coursesErr) {
      setError(coursesErr.message)
      setLoading(false)
      return
    }

    if (!coursesData || coursesData.length === 0) {
      setCourses([])
      setLoading(false)
      return
    }

    // Fetch enrollment stats for each course
    const courseIds = coursesData.map((c: any) => c.id)
    const { data: enrollments } = await supabase
      .from('enrollments')
      .select('course_id, progress_pct, completed_at')
      .in('course_id', courseIds)

    // Fetch certificate counts
    const { data: certificates } = await supabase
      .from('certificates')
      .select('course_id')
      .in('course_id', courseIds)

    // Aggregate stats
    const enriched: Course[] = coursesData.map((c: any) => {
      const courseEnrollments = (enrollments || []).filter((e: any) => e.course_id === c.id)
      const avgCompletion = courseEnrollments.length > 0
        ? Math.round(courseEnrollments.reduce((sum: number, e: any) => sum + (e.progress_pct || 0), 0) / courseEnrollments.length)
        : 0
      const certCount = (certificates || []).filter((cert: any) => cert.course_id === c.id).length

      return {
        ...c,
        enrolled_count: courseEnrollments.length,
        avg_completion: avgCompletion,
        certificate_count: certCount,
      }
    })

    setCourses(enriched)
    setLoading(false)
  }, [supabase])

  useEffect(() => {
    fetchCourses()
  }, [fetchCourses])

  // KPI computations
  const publishedCount = courses.filter(c => c.visibility === 'published').length
  const totalEnrollments = courses.reduce((sum, c) => sum + c.enrolled_count, 0)
  const avgCompletion = courses.length > 0
    ? Math.round(courses.reduce((sum, c) => sum + c.avg_completion, 0) / courses.length)
    : 0
  const totalCertificates = courses.reduce((sum, c) => sum + c.certificate_count, 0)

  // Filter + search
  const filtered = courses.filter(c => {
    if (filter === 'published' && c.visibility !== 'published') return false
    if (filter === 'draft' && c.visibility !== 'draft') return false
    if (filter === 'barktype' && c.category !== 'barktype') return false
    if (search && !c.title.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  // Form handlers
  const updateField = (field: keyof CourseFormData, value: string | boolean) => {
    setForm(prev => {
      const next = { ...prev, [field]: value }
      if (field === 'title' && typeof value === 'string') {
        next.slug = slugify(value)
      }
      return next
    })
  }

  const handleCreate = async () => {
    if (!form.title.trim()) { setError('Title is required'); return }
    if (!form.slug.trim()) { setError('Slug is required'); return }
    setSaving(true)
    setError(null)

    const { error: insertErr } = await supabase.from('courses').insert({
      title: form.title.trim(),
      slug: form.slug.trim(),
      description: form.description.trim() || null,
      category: form.category,
      visibility: form.visibility,
      certificate_enabled: form.certificate_enabled,
    })

    if (insertErr) {
      setError(insertErr.message)
    } else {
      setShowForm(false)
      setForm(emptyForm)
      fetchCourses()
    }
    setSaving(false)
  }

  const handleDelete = async (courseId: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return
    const { error: delErr } = await supabase
      .from('courses')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', courseId)
    if (delErr) {
      setError(delErr.message)
    } else {
      fetchCourses()
    }
  }

  const FILTER_TABS = [
    { key: 'all', label: 'All' },
    { key: 'published', label: 'Published' },
    { key: 'draft', label: 'Draft' },
    { key: 'barktype', label: 'BARKType' },
  ]

  return (
    <div>
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 style={{
            fontFamily: 'Georgia, serif', fontSize: 22, fontWeight: 700,
            color: '#2d1a47', marginBottom: 4,
          }}>
            📚 Courses
          </h1>
          <p style={{ color: '#9b6fc4', fontSize: 12.5, fontStyle: 'italic' }}>
            Build and manage your learning experiences
          </p>
        </div>
        <button className="btn-primary flex items-center gap-2" onClick={() => { setShowForm(true); setError(null) }}>
          <Plus size={13} /> Create Course
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4" style={{ marginBottom: 24 }}>
        {[
          { label: 'Published Courses', value: publishedCount, icon: '📚' },
          { label: 'Total Enrollments', value: totalEnrollments, icon: '👥' },
          { label: 'Avg Completion', value: `${avgCompletion}%`, icon: '📈' },
          { label: 'Certificates Issued', value: totalCertificates, icon: '🏆' },
        ].map(kpi => (
          <div key={kpi.label} className="kpi-card">
            <div style={{
              fontSize: 10, fontWeight: 700, letterSpacing: '1.8px',
              textTransform: 'uppercase', marginBottom: 8,
              color: '#9b6fc4', fontFamily: 'Georgia, serif',
            }}>
              {kpi.label}
            </div>
            <div className="flex items-center gap-2">
              <span style={{ fontSize: 20 }}>{kpi.icon}</span>
              <span style={{
                fontFamily: 'Georgia, serif', fontSize: 28, fontWeight: 700,
                color: '#2d1a47',
              }}>
                {kpi.value}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Error Banner */}
      {error && (
        <div style={{
          padding: '12px 16px', borderRadius: 10, marginBottom: 16,
          background: '#fde8e8', color: '#c0392b', fontSize: 12.5,
          fontFamily: 'Georgia, serif', border: '1px solid rgba(192,57,43,0.2)',
        }}>
          {error}
          <button onClick={() => setError(null)} style={{
            float: 'right', background: 'none', border: 'none',
            color: '#c0392b', cursor: 'pointer', fontWeight: 700,
          }}>
            &times;
          </button>
        </div>
      )}

      {/* Create Course Form */}
      {showForm && (
        <div className="card" style={{ marginBottom: 24 }}>
          <div className="flex items-center justify-between" style={{ marginBottom: 18 }}>
            <div style={{
              fontFamily: 'Georgia, serif', fontSize: 14, fontWeight: 700,
              color: '#2d1a47',
            }}>
              Create New Course
            </div>
            <button
              onClick={() => { setShowForm(false); setForm(emptyForm) }}
              style={{
                background: 'none', border: 'none', fontSize: 18,
                color: '#9b6fc4', cursor: 'pointer',
              }}
            >
              &times;
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4" style={{ marginBottom: 16 }}>
            <div>
              <label className="form-label">Title *</label>
              <input
                className="form-input"
                value={form.title}
                onChange={e => updateField('title', e.target.value)}
                placeholder="e.g. BARKType Foundations"
              />
            </div>
            <div>
              <label className="form-label">Slug (auto-generated)</label>
              <input
                className="form-input"
                value={form.slug}
                onChange={e => updateField('slug', e.target.value)}
                placeholder="barktype-foundations"
              />
            </div>
            <div>
              <label className="form-label">Category</label>
              <select
                className="form-select"
                value={form.category}
                onChange={e => updateField('category', e.target.value)}
              >
                {CATEGORIES.map(c => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="form-label">Visibility</label>
              <select
                className="form-select"
                value={form.visibility}
                onChange={e => updateField('visibility', e.target.value)}
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
          </div>

          <div style={{ marginBottom: 16 }}>
            <label className="form-label">Description</label>
            <textarea
              className="form-input"
              value={form.description}
              onChange={e => updateField('description', e.target.value)}
              placeholder="A brief description of this course..."
              rows={3}
              style={{ resize: 'vertical' }}
            />
          </div>

          <div className="flex items-center gap-4" style={{ marginBottom: 18 }}>
            <label className="flex items-center gap-2" style={{
              cursor: 'pointer', fontSize: 12.5, fontFamily: 'Georgia, serif',
              color: '#2d1a47',
            }}>
              <input
                type="checkbox"
                checked={form.certificate_enabled}
                onChange={e => updateField('certificate_enabled', e.target.checked)}
                style={{ width: 16, height: 16, accentColor: '#623491' }}
              />
              Enable Certificate on Completion
            </label>
          </div>

          <div className="flex items-center gap-3">
            <button className="btn-primary" onClick={handleCreate} disabled={saving}>
              {saving ? 'Creating...' : 'Create Course'}
            </button>
            <button className="btn-secondary" onClick={() => { setShowForm(false); setForm(emptyForm) }}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Filter Tabs + Search */}
      <div className="flex items-center gap-3 mb-4">
        <div className="search-bar" style={{ flex: 1, maxWidth: 320 }}>
          <Search size={14} style={{
            color: '#9b6fc4',
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
          }} />
          <input
            type="text"
            placeholder="Search courses..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        {FILTER_TABS.map(tab => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={filter === tab.key ? 'page-tab page-tab-active' : 'page-tab'}
            style={{ fontSize: '10.5px', padding: '7px 12px' }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Courses Table */}
      {loading ? (
        <div style={{
          textAlign: 'center', padding: 48, color: '#9b6fc4',
          fontFamily: 'Georgia, serif', fontStyle: 'italic',
        }}>
          Loading courses...
        </div>
      ) : filtered.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: 48 }}>
          <div style={{ fontSize: 42, marginBottom: 12 }}>📚</div>
          <div style={{
            fontFamily: 'Georgia, serif', fontSize: 14, fontWeight: 700,
            color: '#2d1a47', marginBottom: 6,
          }}>
            {search || filter !== 'all' ? 'No courses match your filters' : 'No courses yet'}
          </div>
          <div style={{ color: '#9b6fc4', fontSize: 12, fontStyle: 'italic' }}>
            {search || filter !== 'all'
              ? 'Try adjusting your search or filter.'
              : 'Create your first course to get started!'}
          </div>
        </div>
      ) : (
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <table>
            <thead>
              <tr>
                <th style={{ paddingLeft: 20 }}>Course</th>
                <th>Category</th>
                <th>Enrolled</th>
                <th>Avg Completion</th>
                <th>Certificates</th>
                <th>Status</th>
                <th style={{ paddingRight: 20 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(course => {
                const catColors = CATEGORY_COLORS[course.category] || CATEGORY_COLORS.standalone
                return (
                  <tr key={course.id}>
                    <td style={{ paddingLeft: 20 }}>
                      <div className="flex items-center gap-3">
                        <div style={{
                          width: 36, height: 36, borderRadius: 8,
                          background: 'rgba(98,52,145,0.08)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 18, flexShrink: 0,
                        }}>
                          {CATEGORY_EMOJIS[course.category] || '📚'}
                        </div>
                        <div>
                          <a
                            href={`/courses/${course.slug}`}
                            style={{
                              fontFamily: 'Georgia, serif', fontSize: 13, fontWeight: 700,
                              color: '#2d1a47', textDecoration: 'none',
                            }}
                          >
                            {course.title}
                          </a>
                          {course.description && (
                            <div style={{
                              fontSize: 10.5, color: '#9b6fc4', fontStyle: 'italic',
                              maxWidth: 240, overflow: 'hidden', textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                            }}>
                              {course.description}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td>
                      <span style={{
                        display: 'inline-block', padding: '3px 10px', borderRadius: 20,
                        fontSize: 10.5, fontWeight: 700, fontFamily: 'Georgia, serif',
                        background: catColors.bg, color: catColors.color,
                      }}>
                        {course.category}
                      </span>
                    </td>
                    <td>
                      <span style={{ fontWeight: 700, color: '#2d1a47' }}>
                        {course.enrolled_count}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div style={{
                          width: 60, height: 6, background: 'rgba(98,52,145,0.12)',
                          borderRadius: 3, overflow: 'hidden',
                        }}>
                          <div style={{
                            height: '100%', borderRadius: 3, width: `${course.avg_completion}%`,
                            background: 'linear-gradient(90deg, #623491, #e8c487)',
                          }} />
                        </div>
                        <span style={{ fontSize: 11, fontWeight: 700, color: '#623491' }}>
                          {course.avg_completion}%
                        </span>
                      </div>
                    </td>
                    <td>
                      <span style={{ fontWeight: 700, color: '#b8860b' }}>
                        {course.certificate_count}
                      </span>
                    </td>
                    <td>
                      <span className={`pill ${course.visibility === 'published' ? 'pill-green' : 'pill-amber'}`}>
                        {course.visibility === 'published' ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td style={{ paddingRight: 20 }}>
                      <button
                        onClick={() => handleDelete(course.id, course.title)}
                        style={{
                          background: 'none', border: 'none',
                          color: '#c0392b', cursor: 'pointer',
                          padding: 4, borderRadius: 4,
                        }}
                        title="Delete course"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
