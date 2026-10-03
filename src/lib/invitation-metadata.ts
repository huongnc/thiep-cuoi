import { getDisplayCouple } from './couple.ts'

export interface InvitationMetadata {
  title: string
  description: string
  siteName: string
  url: string
  image: string
  imageAlt: string
}

export const SITE_ORIGIN = 'https://thiepcuoi.nch.id.vn'
export const INVITATION_IMAGE = `${SITE_ORIGIN}/og-cover-casual.jpg`

export function getInvitationMetadata(pathname = '/'): InvitationMetadata {
  const [first, second] = getDisplayCouple(pathname)
  const siteName = `${first.person.name} & ${second.person.name}`

  return {
    title: `${siteName} | Trân trọng kính mời`,
    description: `Trân trọng kính mời bạn đến chung vui trong ngày thành hôn của ${siteName}.`,
    siteName,
    url: new URL(pathname || '/', SITE_ORIGIN).toString(),
    image: INVITATION_IMAGE,
    imageAlt: `${first.person.name} và ${second.person.name} trong ảnh cưới`,
  }
}
