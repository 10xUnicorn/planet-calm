'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase-browser'
import Link from 'next/link'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const supabase = createClient()
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { first_name: firstName, last_name: lastName },
        emailRedirectTo: `${window.location.origin}/api/auth/callback`,
      },
    })
    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setSuccess(true)
      setLoading(false)
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
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
          />
          <h1 className="text-2xl font-bold" style={{ fontFamily: 'Georgia, serif', color: '#2d1a47' }}>
            Create Your Account
          </h1>
        </div>

        {success ? (
          <div className="rounded-2xl p-8 text-center shadow-lg"
            style={{ background: '#fff', border: '1px solid rgba(98,52,145,0.1)' }}>
            <div className="text-4xl mb-4">🐾</div>
            <h2 className="text-lg font-bold mb-2" style={{ fontFamily: 'Georgia, serif', color: '#2d1a47' }}>
              Check your email
            </h2>
            <p className="text-sm" style={{ color: '#7a5ea0', fontFamily: 'Georgia, serif' }}>
              We sent a confirmation link to <strong>{email}</strong>. Click it to activate your account.
            </p>
            <Link href="/login" className="inline-block mt-4 text-sm underline" style={{ color: '#623491' }}>
              Back to login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleRegister}
            className="rounded-2xl p-8 shadow-lg"
            style={{ background: '#fff', border: '1px solid rgba(98,52,145,0.1)' }}>
            {error && (
              <div className="mb-4 p-3 rounded-lg text-sm" style={{ background: '#fde8e8', color: '#c0392b' }}>{error}</div>
            )}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: '#9b6fc4' }}>First Name</label>
                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                  style={{ border: '1px solid rgba(98,52,145,0.2)', fontFamily: 'Georgia, serif', color: '#2d1a47' }} />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: '#9b6fc4' }}>Last Name</label>
                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                  style={{ border: '1px solid rgba(98,52,145,0.2)', fontFamily: 'Georgia, serif', color: '#2d1a47' }} />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: '#9b6fc4' }}>Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                style={{ border: '1px solid rgba(98,52,145,0.2)', fontFamily: 'Georgia, serif', color: '#2d1a47' }} />
            </div>
            <div className="mb-6">
              <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: '#9b6fc4' }}>Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                style={{ border: '1px solid rgba(98,52,145,0.2)', fontFamily: 'Georgia, serif', color: '#2d1a47' }} />
            </div>
            <button type="submit" disabled={loading}
              className="w-full py-3 rounded-xl text-sm font-bold cursor-pointer transition-opacity disabled:opacity-60"
              style={{ background: 'linear-gradient(135deg, #623491, #9b6fc4)', color: '#e8c487', fontFamily: 'Georgia, serif', border: 'none' }}>
              {loading ? 'Creating...' : 'Create Account'}
            </button>
            <div className="text-center mt-4">
              <Link href="/login" className="text-xs underline" style={{ color: '#623491', fontFamily: 'Georgia, serif' }}>
                Already have an account? Sign in
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
