'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase-browser'

/* ── Types ── */
interface PetProfile {
  id: string
  user_id: string
  name: string
  type: string
  breed: string | null
  gender: string | null
  birthday: string | null
  bio: string | null
  photo_url: string | null
  show_on_map: boolean
  created_at: string
  updated_at: string
}

type PetFormData = {
  name: string
  type: string
  breed: string
  gender: string
  birthday: string
  bio: string
  show_on_map: boolean
}

const PET_TYPES = ['Dog', 'Cat', 'Rabbit', 'Bird', 'Fish', 'Reptile', 'Horse', 'Other']
const GENDERS = ['Male', 'Female', 'Unknown']

const emptyForm: PetFormData = {
  name: '',
  type: 'Dog',
  breed: '',
  gender: '',
  birthday: '',
  bio: '',
  show_on_map: false,
}

/* ── Shared Styles ── */
const cardStyle: React.CSSProperties = {
  background: '#fff',
  borderRadius: 14,
  padding: 20,
  border: '1px solid rgba(98,52,145,0.1)',
  boxShadow: '0 2px 16px rgba(98,52,145,0.06)',
  cursor: 'pointer',
  transition: 'all .18s',
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: 10,
  fontWeight: 700,
  letterSpacing: '1.8px',
  textTransform: 'uppercase',
  color: '#9b6fc4',
  marginBottom: 6,
  fontFamily: 'Georgia, serif',
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '11px 14px',
  borderRadius: 10,
  border: '1px solid rgba(98,52,145,0.15)',
  fontFamily: 'Georgia, serif',
  fontSize: '12.5px',
  color: '#2d1a47',
  background: '#faf8fc',
  outline: 'none',
}

export default function PetsPage() {
  const supabase = createClient()
  const [pets, setPets] = useState<PetProfile[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<PetFormData>(emptyForm)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchPets = useCallback(async () => {
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { setLoading(false); return }

    const { data, error: fetchErr } = await supabase
      .from('pet_profiles')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (fetchErr) {
      setError(fetchErr.message)
    } else {
      setPets(data ?? [])
    }
    setLoading(false)
  }, [supabase])

  useEffect(() => {
    fetchPets()
  }, [fetchPets])

  const openAdd = () => {
    setEditingId(null)
    setForm(emptyForm)
    setShowForm(true)
    setError(null)
  }

  const openEdit = (pet: PetProfile) => {
    setEditingId(pet.id)
    setForm({
      name: pet.name,
      type: pet.type,
      breed: pet.breed ?? '',
      gender: pet.gender ?? '',
      birthday: pet.birthday ?? '',
      bio: pet.bio ?? '',
      show_on_map: pet.show_on_map,
    })
    setShowForm(true)
    setError(null)
  }

  const handleSave = async () => {
    if (!form.name.trim()) { setError('Pet name is required'); return }
    setSaving(true)
    setError(null)

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { setError('You must be signed in'); setSaving(false); return }

    const payload = {
      user_id: user.id,
      name: form.name.trim(),
      type: form.type,
      breed: form.breed.trim() || null,
      gender: form.gender || null,
      birthday: form.birthday || null,
      bio: form.bio.trim() || null,
      show_on_map: form.show_on_map,
    }

    if (editingId) {
      const { error: updateErr } = await supabase
        .from('pet_profiles')
        .update({ ...payload, updated_at: new Date().toISOString() })
        .eq('id', editingId)
      if (updateErr) setError(updateErr.message)
    } else {
      const { error: insertErr } = await supabase
        .from('pet_profiles')
        .insert(payload)
      if (insertErr) setError(insertErr.message)
    }

    setSaving(false)
    if (!error) {
      setShowForm(false)
      setEditingId(null)
      fetchPets()
    }
  }

  const handleDelete = async () => {
    if (!editingId) return
    if (!confirm('Remove this pet profile?')) return
    setSaving(true)
    const { error: delErr } = await supabase
      .from('pet_profiles')
      .delete()
      .eq('id', editingId)
    if (delErr) { setError(delErr.message); setSaving(false); return }
    setSaving(false)
    setShowForm(false)
    setEditingId(null)
    fetchPets()
  }

  const updateField = (field: keyof PetFormData, value: string | boolean) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  /* ── Helpers ── */
  const petTypeEmoji = (type: string) => {
    const map: Record<string, string> = {
      Dog: '🐕', Cat: '🐈', Rabbit: '🐇', Bird: '🐦',
      Fish: '🐟', Reptile: '🦎', Horse: '🐴', Other: '🐾',
    }
    return map[type] ?? '🐾'
  }

  const formatBirthday = (dateStr: string | null) => {
    if (!dateStr) return null
    const d = new Date(dateStr + 'T00:00:00')
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  return (
    <div>
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 style={{
            fontFamily: 'Georgia, serif', fontSize: 22, fontWeight: 700,
            color: '#2d1a47', marginBottom: 4,
          }}>
            🐕 My Pets
          </h1>
          <p style={{ color: '#9b6fc4', fontSize: 12.5, fontStyle: 'italic' }}>
            Manage your pet profiles for the Planet Calm community
          </p>
        </div>
        <button className="btn-primary" onClick={openAdd}>
          + Add Pet
        </button>
      </div>

      {/* Error Banner */}
      {error && (
        <div style={{
          padding: '12px 16px', borderRadius: 10, marginBottom: 16,
          background: '#fde8e8', color: '#c0392b', fontSize: 12.5,
          fontFamily: 'Georgia, serif', border: '1px solid rgba(192,57,43,0.2)',
        }}>
          {error}
        </div>
      )}

      {/* Inline Form */}
      {showForm && (
        <div className="card" style={{ marginBottom: 24 }}>
          <div className="flex items-center justify-between" style={{ marginBottom: 18 }}>
            <div style={{
              fontFamily: 'Georgia, serif', fontSize: 14, fontWeight: 700,
              color: '#2d1a47',
            }}>
              {editingId ? 'Edit Pet' : 'Add New Pet'}
            </div>
            <button
              onClick={() => { setShowForm(false); setEditingId(null) }}
              style={{
                background: 'none', border: 'none', fontSize: 18,
                color: '#9b6fc4', cursor: 'pointer',
              }}
            >
              &times;
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4" style={{ marginBottom: 16 }}>
            {/* Name */}
            <div>
              <label style={labelStyle}>Name *</label>
              <input
                style={inputStyle}
                value={form.name}
                onChange={e => updateField('name', e.target.value)}
                placeholder="e.g. Luna"
              />
            </div>
            {/* Type */}
            <div>
              <label style={labelStyle}>Type</label>
              <select
                style={inputStyle}
                value={form.type}
                onChange={e => updateField('type', e.target.value)}
              >
                {PET_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            {/* Breed */}
            <div>
              <label style={labelStyle}>Breed</label>
              <input
                style={inputStyle}
                value={form.breed}
                onChange={e => updateField('breed', e.target.value)}
                placeholder="e.g. German Shepherd"
              />
            </div>
            {/* Gender */}
            <div>
              <label style={labelStyle}>Gender</label>
              <select
                style={inputStyle}
                value={form.gender}
                onChange={e => updateField('gender', e.target.value)}
              >
                <option value="">Select...</option>
                {GENDERS.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
            {/* Birthday */}
            <div>
              <label style={labelStyle}>Birthday</label>
              <input
                type="date"
                style={inputStyle}
                value={form.birthday}
                onChange={e => updateField('birthday', e.target.value)}
              />
            </div>
            {/* Show on Map toggle */}
            <div className="flex items-center" style={{ paddingTop: 22 }}>
              <label className="flex items-center gap-2" style={{
                cursor: 'pointer', fontSize: 12.5, fontFamily: 'Georgia, serif',
                color: '#2d1a47',
              }}>
                <input
                  type="checkbox"
                  checked={form.show_on_map}
                  onChange={e => updateField('show_on_map', e.target.checked)}
                  style={{ width: 16, height: 16, accentColor: '#623491' }}
                />
                Show on Community Map
              </label>
            </div>
          </div>

          {/* Bio */}
          <div style={{ marginBottom: 18 }}>
            <label style={labelStyle}>Bio</label>
            <textarea
              style={{ ...inputStyle, minHeight: 80, resize: 'vertical' }}
              value={form.bio}
              onChange={e => updateField('bio', e.target.value)}
              placeholder="Tell us about your pet..."
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button className="btn-primary" onClick={handleSave} disabled={saving}>
              {saving ? 'Saving...' : editingId ? 'Update Pet' : 'Save Pet'}
            </button>
            <button className="btn-secondary" onClick={() => { setShowForm(false); setEditingId(null) }}>
              Cancel
            </button>
            {editingId && (
              <button
                onClick={handleDelete}
                disabled={saving}
                style={{
                  marginLeft: 'auto', background: 'none', border: 'none',
                  color: '#c0392b', fontSize: 12, fontWeight: 700,
                  fontFamily: 'Georgia, serif', cursor: 'pointer',
                  textDecoration: 'underline',
                }}
              >
                Delete Pet
              </button>
            )}
          </div>
        </div>
      )}

      {/* Pet Grid */}
      {loading ? (
        <div style={{
          textAlign: 'center', padding: 48, color: '#9b6fc4',
          fontFamily: 'Georgia, serif', fontStyle: 'italic',
        }}>
          Loading your pets...
        </div>
      ) : pets.length === 0 && !showForm ? (
        <div style={{
          textAlign: 'center', padding: 48, borderRadius: 14,
          background: 'linear-gradient(135deg,#f9f5fe,#fdf0ff)',
          border: '1px solid rgba(98,52,145,0.1)',
        }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🐾</div>
          <div style={{
            fontFamily: 'Georgia, serif', fontSize: 16, fontWeight: 700,
            color: '#2d1a47', marginBottom: 6,
          }}>
            No pets yet
          </div>
          <div style={{ color: '#9b6fc4', fontSize: 12.5, fontStyle: 'italic', marginBottom: 16 }}>
            Add your first pet to share with the Planet Calm community
          </div>
          <button className="btn-primary" onClick={openAdd}>
            + Add Your First Pet
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {pets.map(pet => (
            <div
              key={pet.id}
              style={cardStyle}
              onClick={() => openEdit(pet)}
              role="button"
              tabIndex={0}
              onKeyDown={e => { if (e.key === 'Enter') openEdit(pet) }}
            >
              {/* Photo placeholder */}
              <div className="flex items-center justify-center" style={{
                width: '100%', height: 120, borderRadius: 10,
                background: 'linear-gradient(135deg,#f9f5fe,#ede4f5)',
                marginBottom: 14, fontSize: 42,
              }}>
                {pet.photo_url ? (
                  <img
                    src={pet.photo_url}
                    alt={pet.name}
                    style={{
                      width: '100%', height: '100%', objectFit: 'cover',
                      borderRadius: 10,
                    }}
                  />
                ) : (
                  petTypeEmoji(pet.type)
                )}
              </div>

              {/* Pet Info */}
              <div style={{
                fontFamily: 'Georgia, serif', fontSize: 15, fontWeight: 700,
                color: '#2d1a47', marginBottom: 4,
              }}>
                {pet.name}
              </div>
              <div style={{
                fontSize: 11.5, color: '#9b6fc4', fontFamily: 'Georgia, serif',
                marginBottom: 6,
              }}>
                {pet.type}{pet.breed ? ` \u00B7 ${pet.breed}` : ''}
              </div>
              {pet.birthday && (
                <div style={{
                  fontSize: 10.5, color: '#7a5ea0', fontStyle: 'italic',
                  fontFamily: 'Georgia, serif',
                }}>
                  Born {formatBirthday(pet.birthday)}
                </div>
              )}
              {pet.show_on_map && (
                <div style={{ marginTop: 8 }}>
                  <span className="pill pill-green" style={{ fontSize: 9 }}>
                    On Map
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
