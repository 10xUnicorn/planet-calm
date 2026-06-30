'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase-browser'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const supabase = createClient()
      const { error: authError } = await supabase.auth.signInWithPassword({ email, password })
      if (authError) {
        setError(authError.message || 'Invalid email or password')
        setLoading(false)
      } else {
        router.push('/overview')
        router.refresh()
      }
    } catch {
      setError('Unable to sign in. Please try again.')
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
            Welcome Back
          </div>
          <div style={{ fontFamily: 'Georgia, serif', fontSize: 13, color: '#9b6fc4', fontStyle: 'italic', marginTop: 6 }}>
            Calm-First Leadership Dashboard
          </div>
        </div>

        {/* Card */}
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

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: 20 }}>
              <label style={{
                display: 'block', fontSize: 10, fontWeight: 700, letterSpacing: '1.8px',
                textTransform: 'uppercase' as const, color: '#9b6fc4', marginBottom: 8, fontFamily: 'Georgia, serif',
              }}>Email</label>
              <input
                type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                placeholder="you@example.com"
                style={{
                  width: '100%', padding: '13px 16px', borderRadius: 12,
                  border: '1.5px solid rgba(98,52,145,0.18)', fontFamily: 'Georgia, serif',
                  fontSize: 14, color: '#2d1a47', background: '#faf8fc', outline: 'none',
                }}
              />
            </div>
            <div style={{ marginBottom: 28 }}>
              <label style={{
                display: 'block', fontSize: 10, fontWeight: 700, letterSpacing: '1.8px',
                textTransform: 'uppercase' as const, color: '#9b6fc4', marginBottom: 8, fontFamily: 'Georgia, serif',
              }}>Password</label>
              <input
                type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
                placeholder="Enter your password"
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
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }}>
            <Link href="/reset-password" style={{
              fontSize: 12, color: '#623491', textDecoration: 'none',
              borderBottom: '1px solid rgba(98,52,145,0.25)', fontFamily: 'Georgia, serif',
            }}>Forgot password?</Link>
            <Link href="/register" style={{
              fontSize: 12, color: '#623491', textDecoration: 'none',
              borderBottom: '1px solid rgba(98,52,145,0.25)', fontFamily: 'Georgia, serif',
            }}>Create account</Link>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: 24, fontSize: 10, color: '#9b6fc4', letterSpacing: '1px', fontFamily: 'Georgia, serif' }}>
          PLANET CALM &copy; 2026 &middot; Calm-First Leadership
        </div>
      </div>
    </div>
  )
}
