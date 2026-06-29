'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase-browser'
import Link from 'next/link'
import { Mail, CheckCircle } from 'lucide-react'

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

  const inputStyle: React.CSSProperties = {
    border: '1.5px solid #d6c8e4',
    fontFamily: 'Georgia, serif',
    color: '#2d1a47',
    background: '#faf8fc',
  }

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.borderColor = '#623491'
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.borderColor = '#d6c8e4'
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'linear-gradient(135deg, #f5eef8 0%, #ede4f5 50%, #fdf8ec 100%)' }}>
      <div className="w-full max-w-[420px]">
        {/* Logo + Header */}
        <div className="text-center mb-6">
          <div className="w-[140px] h-[140px] mx-auto mb-5 rounded-full flex items-center justify-center overflow-hidden"
            style={{ background: '#2d1a47', boxShadow: '0 8px 32px rgba(45,26,71,0.3)' }}>
            <img
              src="https://trpnlkntvulkjerevngm.supabase.co/storage/v1/object/public/dashboard-assets/logos/1782362694767-Planet_Calm_Logo.png"
              alt="Planet Calm"
              className="w-[120px] h-[120px] object-contain"
              style={{ mixBlendMode: 'lighten' }}
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
            />
          </div>
          <h1 className="text-[26px] font-bold tracking-[-0.3px]"
            style={{ fontFamily: 'Georgia, serif', color: '#2d1a47' }}>
            Create Your Account
          </h1>
          <p className="text-[13px] italic mt-1"
            style={{ color: '#9b6fc4', fontFamily: 'Georgia, serif' }}>
            Join the Calm-First Leadership Community
          </p>
        </div>

        {success ? (
          <div className="rounded-[20px] p-8 text-center"
            style={{
              background: '#fff',
              border: '1px solid #d6c8e4',
              boxShadow: '0 4px 24px rgba(98,52,145,0.08), 0 1px 3px rgba(98,52,145,0.04)',
            }}>
            <div className="w-14 h-14 mx-auto mb-4 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(34,197,94,0.12)' }}>
              <CheckCircle size={28} style={{ color: '#16a34a' }} />
            </div>
            <h2 className="text-[18px] font-bold mb-2" style={{ fontFamily: 'Georgia, serif', color: '#2d1a47' }}>
              Check your email
            </h2>
            <p className="text-[13px]" style={{ color: '#7a5ea0', fontFamily: 'Georgia, serif' }}>
              We sent a confirmation link to <strong style={{ color: '#2d1a47' }}>{email}</strong>. Click it to activate your account.
            </p>
            <Link href="/login"
              className="inline-block mt-5 text-[11.5px] transition-opacity hover:opacity-70"
              style={{ color: '#623491', fontFamily: 'Georgia, serif', textDecoration: 'none', borderBottom: '1px solid rgba(98,52,145,0.25)' }}>
              Back to login
            </Link>
          </div>
        ) : (
          <div className="rounded-[20px] p-8"
            style={{
              background: '#fff',
              border: '1px solid #d6c8e4',
              boxShadow: '0 4px 24px rgba(98,52,145,0.08), 0 1px 3px rgba(98,52,145,0.04)',
            }}>
            {error && typeof error === 'string' && error.length > 0 && (
              <div className="mb-5 p-3 rounded-[12px] text-[12.5px]"
                style={{ background: '#fde8e8', color: '#c0392b', fontFamily: 'Georgia, serif', border: '1px solid rgba(192,57,43,0.15)' }}>
                {error}
              </div>
            )}

            <form onSubmit={handleRegister}>
              <div className="grid grid-cols-2 gap-4 mb-5">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[1.8px] mb-[6px]"
                    style={{ color: '#9b6fc4', fontFamily: 'Georgia, serif' }}>First Name</label>
                  <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required
                    className="w-full px-4 py-[12px] rounded-[12px] text-[13px] outline-none transition-all"
                    style={inputStyle}
                    onFocus={handleFocus} onBlur={handleBlur}
                    placeholder="Jane" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[1.8px] mb-[6px]"
                    style={{ color: '#9b6fc4', fontFamily: 'Georgia, serif' }}>Last Name</label>
                  <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required
                    className="w-full px-4 py-[12px] rounded-[12px] text-[13px] outline-none transition-all"
                    style={inputStyle}
                    onFocus={handleFocus} onBlur={handleBlur}
                    placeholder="Doe" />
                </div>
              </div>

              <div className="mb-5">
                <label className="block text-[10px] font-bold uppercase tracking-[1.8px] mb-[6px]"
                  style={{ color: '#9b6fc4', fontFamily: 'Georgia, serif' }}>Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                  className="w-full px-4 py-[12px] rounded-[12px] text-[13px] outline-none transition-all"
                  style={inputStyle}
                  onFocus={handleFocus} onBlur={handleBlur}
                  placeholder="you@example.com" />
              </div>

              <div className="mb-6">
                <label className="block text-[10px] font-bold uppercase tracking-[1.8px] mb-[6px]"
                  style={{ color: '#9b6fc4', fontFamily: 'Georgia, serif' }}>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8}
                  className="w-full px-4 py-[12px] rounded-[12px] text-[13px] outline-none transition-all"
                  style={inputStyle}
                  onFocus={handleFocus} onBlur={handleBlur}
                  placeholder="Minimum 8 characters" />
              </div>

              <button type="submit" disabled={loading}
                className="w-full py-[13px] rounded-[12px] text-[13px] font-bold cursor-pointer transition-all disabled:opacity-60"
                style={{
                  background: 'linear-gradient(135deg, #623491, #7d4db5)',
                  color: '#e8c487',
                  fontFamily: 'Georgia, serif',
                  border: 'none',
                  letterSpacing: '.4px',
                  boxShadow: '0 4px 16px rgba(98,52,145,0.3)',
                }}>
                {loading ? 'Creating...' : 'Create Account'}
              </button>
            </form>

            <div className="text-center mt-5">
              <Link href="/login"
                className="text-[11.5px] transition-opacity hover:opacity-70"
                style={{ color: '#623491', fontFamily: 'Georgia, serif', textDecoration: 'none', borderBottom: '1px solid rgba(98,52,145,0.25)' }}>
                Already have an account? Sign in
              </Link>
            </div>
          </div>
        )}

        <p className="text-center mt-6 text-[10px] tracking-wide"
          style={{ color: 'rgba(98,52,145,0.4)', fontFamily: 'Georgia, serif' }}>
          PLANET CALM &copy; 2026 &middot; Calm-First Leadership
        </p>
      </div>
    </div>
  )
}
