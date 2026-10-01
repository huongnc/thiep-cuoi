import { wedding, type Person } from '../config/wedding'

export type CoupleSide = 'groom' | 'bride'

export interface DisplayCoupleMember {
  side: CoupleSide
  person: Person
  monogram: string
}

/**
 * Resolve the requested invitation variant from the URL path.
 * /codau puts the bride first; /chure and the root path put the groom first.
 */
export function getPrimaryCoupleSide(pathname?: string): CoupleSide {
  const currentPath = pathname ?? (typeof window === 'undefined' ? '/' : window.location.pathname)
  const segments = currentPath.toLowerCase().split('/').filter(Boolean)

  if (segments.includes('codau')) return 'bride'
  if (segments.includes('chure')) return 'groom'
  return 'groom'
}

export function getDisplayCouple(pathname?: string): DisplayCoupleMember[] {
  const primarySide = getPrimaryCoupleSide(pathname)
  const orderedSides: CoupleSide[] =
    primarySide === 'bride' ? ['bride', 'groom'] : ['groom', 'bride']

  return orderedSides.map((side) => ({
    side,
    person: wedding[side],
    monogram: side === 'bride' ? wedding.monogram.bride : wedding.monogram.groom,
  }))
}
