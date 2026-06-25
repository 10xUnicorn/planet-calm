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
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/overview')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#f5eef8' }}>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img
            src="https://trpnlkntvulkjerevngm.supabase.co/storage/v1/object/public/dashboard-assets/logos/1782362694767-Planet_Calm_Logo.png"
            alt="Planet Calm"
            className="w-48 mx-auto mb-4"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none'
            }}
          />
          <h1 className="text-2xl font-bold" style={{ fontFamily: 'Georgia, serif', color: '#2d1a47' }}>
            Welcome Back
          </h1>
          <p className="text-sm italic mt-1" style={{ color: '#7a5ea0', fontFamily: 'Georgia, serif' }}>
            Calm-First Leadership Dashboard
          </p>
        </div>

        <form onSubmit={handleLogin}
          className="rounded-2xl p-8 shadow-lg"
          style={{ background: '#fff', border: '1px solid rgba(98,52,145,0.1)' }}>
          {error && (
            <div className="mb-4 p-3 rounded-lg text-sm" style={{ background: '#fde8e8', color: '#c0392b' }}>
              {error}
            </div>
          )}

          <div className="mb-4">
            <label className="block text-xs font-bold uppercase tracking-wider mb-2"
              style={{ color: '#9b6fc4', fontFamily: 'Georgia, serif' }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
              style={{
                border: '1px solid rgba(98,52,145,0.2)',
                fontFamily: 'Georgia, serif',
                color: '#2d1a47',
              }}
              placeholder="stephanie@planetcalm.com"
            />
          </div>

          <div className="mb-6">
            <label className="block text-xs font-bold uppercase tracking-wider mb-2"
              style={{ color: '#9b6fc4', fontFamily: 'Georgia, serif' }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
              style={{
                border: '1px solid rgba(98,52,145,0.2)',
                fontFamily: 'Georgia, serif',
                color: '#2d1a47',
              }}
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl text-sm font-bold cursor-pointer transition-opacity disabled:opacity-60"
            style={{
              background: 'linear-gradient(135deg, #623491, #9b6fc4)',
              color: '#e8c487',
              fontFamily: 'Georgia, serif',
              border: 'none',
              letterSpacing: '.3px',
            }}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>

          <div className="flex justify-between mt-4 text-xs" style={{ fontFamily: 'Georgia, serif' }}>
            <Link href="/reset-password" className="underline" style={{ color: '#623491' }}>
              Forgot password?
            </Link>
            <Link href="/register" className="underline" style={{ color: '#623491' }}>
              Create account
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
