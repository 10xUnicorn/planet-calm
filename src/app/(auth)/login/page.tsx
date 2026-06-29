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
    <div className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'linear-gradient(160deg, #f5eef8 0%, #ede4f5 40%, #fdf8ec 100%)' }}>
      <div className="w-full max-w-[400px]">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-[130px] h-[130px] mx-auto mb-5 rounded-full flex items-center justify-center overflow-hidden"
            style={{ background: '#2d1a47', boxShadow: '0 8px 40px rgba(45,26,71,0.35)' }}>
            <img
              src="https://trpnlkntvulkjerevngm.supabase.co/storage/v1/object/public/dashboard-assets/logos/1782362694767-Planet_Calm_Logo.png"
              alt="Planet Calm"
              className="w-[110px] h-[110px] object-contain"
              style={{ mixBlendMode: 'lighten' }}
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
            />
          </div>
          <h1 className="text-[28px] font-bold tracking-[-0.5px]"
            style={{ fontFamily: 'Georgia, serif', color: '#2d1a47' }}>
            Welcome Back
          </h1>
          <p className="text-[13px] italic mt-2"
            style={{ color: '#9b6fc4', fontFamily: 'Georgia, serif' }}>
            Calm-First Leadership Dashboard
          </p>
        </div>

        {/* Form Card */}
        <div className="rounded-[20px] p-8"
          style={{
            background: '#ffffff',
            border: '1px solid #d6c8e4',
            boxShadow: '0 8px 40px rgba(98,52,145,0.12), 0 2px 6px rgba(98,52,145,0.06)',
          }}>
          {error && typeof error === 'string' && error.length > 0 && (
            <div className="mb-5 p-3 rounded-[12px] text-[12.5px]"
              style={{ background: '#fde8e8', color: '#c0392b', fontFamily: 'Georgia, serif', border: '1px solid #f5c6c6' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="mb-5">
              <label className="block text-[10px] font-bold uppercase tracking-[1.8px] mb-2"
                style={{ color: '#9b6fc4', fontFamily: 'Georgia, serif' }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-[13px] rounded-[12px] text-[14px] outline-none"
                style={{
                  border: '2px solid #d6c8e4',
                  fontFamily: 'Georgia, serif',
                  color: '#2d1a47',
                  background: '#faf8fc',
                }}
                onFocus={(e) => { e.target.style.borderColor = '#623491'; e.target.style.boxShadow = '0 0 0 3px rgba(98,52,145,0.12)' }}
                onBlur={(e) => { e.target.style.borderColor = '#d6c8e4'; e.target.style.boxShadow = 'none' }}
                placeholder="you@example.com"
              />
            </div>

            <div className="mb-7">
              <label className="block text-[10px] font-bold uppercase tracking-[1.8px] mb-2"
                style={{ color: '#9b6fc4', fontFamily: 'Georgia, serif' }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-[13px] rounded-[12px] text-[14px] outline-none"
                style={{
                  border: '2px solid #d6c8e4',
                  fontFamily: 'Georgia, serif',
                  color: '#2d1a47',
                  background: '#faf8fc',
                }}
                onFocus={(e) => { e.target.style.borderColor = '#623491'; e.target.style.boxShadow = '0 0 0 3px rgba(98,52,145,0.12)' }}
                onBlur={(e) => { e.target.style.borderColor = '#d6c8e4'; e.target.style.boxShadow = 'none' }}
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-[14px] rounded-[12px] text-[14px] font-bold cursor-pointer disabled:opacity-60"
              style={{
                background: 'linear-gradient(135deg, #623491, #7d4db5)',
                color: '#e8c487',
                fontFamily: 'Georgia, serif',
                border: 'none',
                letterSpacing: '.5px',
                boxShadow: '0 6px 20px rgba(98,52,145,0.35)',
              }}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="flex justify-between mt-5 text-[12px]" style={{ fontFamily: 'Georgia, serif' }}>
            <Link href="/reset-password" className="hover:opacity-70"
              style={{ color: '#623491', textDecoration: 'none', borderBottom: '1px solid #c4a8e0' }}>
              Forgot password?
            </Link>
            <Link href="/register" className="hover:opacity-70"
              style={{ color: '#623491', textDecoration: 'none', borderBottom: '1px solid #c4a8e0' }}>
              Create account
            </Link>
          </div>
        </div>

        <p className="text-center mt-6 text-[10px] tracking-wider"
          style={{ color: '#9b6fc4', fontFamily: 'Georgia, serif' }}>
          PLANET CALM &copy; 2026 &middot; Calm-First Leadership
        </p>
      </div>
    </div>
  )
}
