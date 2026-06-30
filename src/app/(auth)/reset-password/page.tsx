'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase-browser'
import Link from 'next/link'

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const supabase = createClient()
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/api/auth/callback?next=/settings`,
    })
    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setSent(true)
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(160deg, #f5eef8 0%, #ede4f5 40%, #fdf8ec 100%)', padding: '0 16px',
    }}>
      <div style={{ width: '100%', maxWidth: 400 }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{
            width: 130, height: 130, margin: '0 auto 20px', borderRadius: '50%',
            background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden', boxShadow: '0 8px 40px rgba(45,26,71,0.15)',
          }}>
            <img
              src="https://trpnlkntvulkjerevngm.supabase.co/storage/v1/object/public/dashboard-assets/logos/1782362694767-Planet_Calm_Logo.png"
              alt="Planet Calm"
              style={{ width: 120, height: 120, objectFit: 'contain' }}
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
            />
          </div>
          <div style={{ fontFamily: 'Georgia, serif', fontSize: 28, fontWeight: 700, color: '#2d1a47', letterSpacing: '-.5px' }}>
            Reset Password
          </div>
          <div style={{ fontFamily: 'Georgia, serif', fontSize: 13, color: '#9b6fc4', fontStyle: 'italic', marginTop: 6 }}>
            We will send you a reset link
          </div>
        </div>

        {sent ? (
          <div style={{
            background: '#fff', borderRadius: 20, padding: 32, textAlign: 'center',
            border: '1px solid rgba(98,52,145,0.12)',
            boxShadow: '0 8px 40px rgba(98,52,145,0.1), 0 2px 8px rgba(98,52,145,0.05)',
          }}>
            <div style={{
              width: 56, height: 56, margin: '0 auto 16px', borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'rgba(34,197,94,0.12)',
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <div style={{ fontFamily: 'Georgia, serif', fontSize: 18, fontWeight: 700, color: '#2d1a47', marginBottom: 8 }}>
              Check your inbox
            </div>
            <div style={{ fontFamily: 'Georgia, serif', fontSize: 13, color: '#7a5ea0' }}>
              Reset link sent to <strong style={{ color: '#2d1a47' }}>{email}</strong>. Click it to set a new password.
            </div>
            <div style={{ marginTop: 20 }}>
              <Link href="/login" style={{
                fontSize: 12, color: '#623491', textDecoration: 'none',
                borderBottom: '1px solid rgba(98,52,145,0.25)', fontFamily: 'Georgia, serif',
              }}>Back to login</Link>
            </div>
          </div>
        ) : (
          <div style={{
            background: '#fff', borderRadius: 20, padding: 32,
            border: '1px solid rgba(98,52,145,0.12)',
            boxShadow: '0 8px 40px rgba(98,52,145,0.1), 0 2px 8px rgba(98,52,145,0.05)',
          }}>
            {error && typeof error === 'string' && error.length > 0 && (
              <div style={{
                marginBottom: 20, padding: 12, borderRadius: 12,
                background: '#fde8e8', color: '#c0392b', fontSize: '12.5px', fontFamily: 'Georgia, serif',
              }}>{error}</div>
            )}

            <form onSubmit={handleReset}>
              <div style={{ marginBottom: 28 }}>
                <label style={{
                  display: 'block', fontSize: 10, fontWeight: 700, letterSpacing: '1.8px',
                  textTransform: 'uppercase' as const, color: '#9b6fc4', marginBottom: 8, fontFamily: 'Georgia, serif',
                }}>Email Address</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                  placeholder="you@example.com"
                  style={{
                    width: '100%', padding: '13px 16px', borderRadius: 12,
                    border: '1.5px solid rgba(98,52,145,0.18)', fontFamily: 'Georgia, serif',
                    fontSize: 14, color: '#2d1a47', background: '#faf8fc', outline: 'none',
                  }}
                />
              </div>

              <button type="submit" disabled={loading} style={{
                width: '100%', padding: 14, borderRadius: 12,
                background: 'linear-gradient(135deg, #623491, #7d4db5)',
                color: '#e8c487', fontFamily: 'Georgia, serif', fontSize: 14, fontWeight: 700,
                border: 'none', cursor: 'pointer', letterSpacing: '.5px',
                boxShadow: '0 6px 20px rgba(98,52,145,0.35)',
                opacity: loading ? 0.6 : 1,
              }}>
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </form>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }}>
              <Link href="/login" style={{
                fontSize: 12, color: '#623491', textDecoration: 'none',
                borderBottom: '1px solid rgba(98,52,145,0.25)', fontFamily: 'Georgia, serif',
              }}>Back to login</Link>
              <Link href="/register" style={{
                fontSize: 12, color: '#623491', textDecoration: 'none',
                borderBottom: '1px solid rgba(98,52,145,0.25)', fontFamily: 'Georgia, serif',
              }}>Create account</Link>
            </div>
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: 24, fontSize: 10, color: '#9b6fc4', letterSpacing: '1px', fontFamily: 'Georgia, serif' }}>
          PLANET CALM &copy; 2026 &middot; Calm-First Leadership
        </div>
      </div>
    </div>
  )
}
