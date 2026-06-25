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
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#f5eef8' }}>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold" style={{ fontFamily: 'Georgia, serif', color: '#2d1a47' }}>
            Reset Password
          </h1>
        </div>
        {sent ? (
          <div className="rounded-2xl p-8 text-center shadow-lg"
            style={{ background: '#fff', border: '1px solid rgba(98,52,145,0.1)' }}>
            <p className="text-sm" style={{ color: '#7a5ea0', fontFamily: 'Georgia, serif' }}>
              Reset link sent to <strong>{email}</strong>. Check your inbox.
            </p>
            <Link href="/login" className="inline-block mt-4 text-sm underline" style={{ color: '#623491' }}>
              Back to login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleReset} className="rounded-2xl p-8 shadow-lg"
            style={{ background: '#fff', border: '1px solid rgba(98,52,145,0.1)' }}>
            {error && (
              <div className="mb-4 p-3 rounded-lg text-sm" style={{ background: '#fde8e8', color: '#c0392b' }}>{error}</div>
            )}
            <div className="mb-6">
              <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: '#9b6fc4' }}>Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                style={{ border: '1px solid rgba(98,52,145,0.2)', fontFamily: 'Georgia, serif', color: '#2d1a47' }} />
            </div>
            <button type="submit" disabled={loading}
              className="w-full py-3 rounded-xl text-sm font-bold cursor-pointer transition-opacity disabled:opacity-60"
              style={{ background: 'linear-gradient(135deg, #623491, #9b6fc4)', color: '#e8c487', fontFamily: 'Georgia, serif', border: 'none' }}>
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
            <div className="text-center mt-4">
              <Link href="/login" className="text-xs underline" style={{ color: '#623491' }}>Back to login</Link>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
