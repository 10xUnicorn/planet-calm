import type { UserRole } from './types'

/**
 * Central access-control helper for Planet Calm.
 *
 * Returns { allowed, reason, upgradeTarget? } for the given feature gate.
 * All decisions are made from the user's profile.role fetched once per call.
 */

// Tier hierarchy — index = power level (higher = more access)
const TIER_ORDER: UserRole[] = [
  'lead',
  'affiliate',
  'org_member',
  'org_admin',
  'client_wayfinder',
  'client_council',
  'client_studio',
  'client_collective',
  'coach',
  'team_member',
  'superadmin',
]

function tierIndex(role: UserRole): number {
  return TIER_ORDER.indexOf(role)
}

function isAtLeast(role: UserRole, minRole: UserRole): boolean {
  return tierIndex(role) >= tierIndex(minRole)
}

export type AccessResult = {
  allowed: boolean
  reason: string
  upgradeTarget?: string
}

export async function canAccess(
  supabase: any,
  userId: string,
  feature: string,
  _resourceId?: string,
): Promise<AccessResult> {
  // 1. Get user profile + role
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('role, journey_stage, is_active')
    .eq('id', userId)
    .single()

  if (error || !profile) {
    return { allowed: false, reason: 'Profile not found. Please log in again.' }
  }

  if (!profile.is_active) {
    return { allowed: false, reason: 'Your account is currently inactive.' }
  }

  const role = profile.role as UserRole

  // 2. Superadmin & team_member → always true
  if (role === 'superadmin' || role === 'team_member') {
    return { allowed: true, reason: 'Staff access' }
  }

  // 3. Coach → always true (staff-level)
  if (role === 'coach') {
    return { allowed: true, reason: 'Coach access' }
  }

  // 4. Feature gates
  switch (feature) {
    // ── Feed ──────────────────────────────────────────
    case 'feed_read':
      // Any authenticated user can read the feed
      return { allowed: true, reason: 'Authenticated user' }

    case 'feed_post':
      // Must be at least a buyer (client_collective is lowest paying tier)
      if (isAtLeast(role, 'client_collective')) {
        return { allowed: true, reason: 'Member tier' }
      }
      return {
        allowed: false,
        reason: 'Posting requires a membership. Upgrade to join the conversation.',
        upgradeTarget: 'client_collective',
      }

    // ── Spaces & DMs ─────────────────────────────────
    case 'spaces':
    case 'dms':
      if (isAtLeast(role, 'client_collective')) {
        return { allowed: true, reason: 'Member tier' }
      }
      return {
        allowed: false,
        reason: 'Spaces and direct messages are available to Collective members and above.',
        upgradeTarget: 'client_collective',
      }

    // ── Courses ──────────────────────────────────────
    case 'courses':
      // Check enrollment if resourceId provided, otherwise tier check
      if (_resourceId) {
        const { data: enrollment } = await supabase
          .from('course_enrollments')
          .select('id')
          .eq('user_id', userId)
          .eq('course_id', _resourceId)
          .maybeSingle()

        if (enrollment) {
          return { allowed: true, reason: 'Enrolled in course' }
        }
      }
      if (isAtLeast(role, 'client_studio')) {
        return { allowed: true, reason: 'Studio+ tier includes courses' }
      }
      return {
        allowed: false,
        reason: 'Courses require a Studio membership or individual enrollment.',
        upgradeTarget: 'client_studio',
      }

    // ── Pet Profiles ─────────────────────────────────
    case 'pet_profiles':
      return { allowed: true, reason: 'Authenticated user' }

    // ── Member Directory ─────────────────────────────
    case 'member_directory':
      if (isAtLeast(role, 'client_collective')) {
        return { allowed: true, reason: 'Member tier' }
      }
      return {
        allowed: false,
        reason: 'The member directory is available to Collective members and above.',
        upgradeTarget: 'client_collective',
      }

    // ── Events ───────────────────────────────────────
    case 'events':
      return { allowed: true, reason: 'Authenticated user' }

    // ── Default: deny unknown features ───────────────
    default:
      return {
        allowed: false,
        reason: `Unknown feature: ${feature}`,
      }
  }
}
