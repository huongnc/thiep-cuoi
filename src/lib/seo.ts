import { getInvitationMetadata } from './invitation-metadata'

export { getInvitationMetadata } from './invitation-metadata'

export function applyInvitationMetadata(pathname?: string) {
  if (typeof document === 'undefined') return

  const metadata = getInvitationMetadata(pathname ?? window.location.pathname)
  document.title = metadata.title

  setMeta('name', 'description', metadata.description)
  setMeta('property', 'og:site_name', metadata.siteName)
  setMeta('property', 'og:url', metadata.url)
  setMeta('property', 'og:title', metadata.title)
  setMeta('property', 'og:description', metadata.description)
  setMeta('property', 'og:image', metadata.image)
  setMeta('property', 'og:image:url', metadata.image)
  setMeta('property', 'og:image:secure_url', metadata.image)
  setMeta('property', 'og:image:type', 'image/jpeg')
  setMeta('property', 'og:image:alt', metadata.imageAlt)
  setMeta('name', 'twitter:title', metadata.title)
  setMeta('name', 'twitter:description', metadata.description)
  setMeta('name', 'twitter:image', metadata.image)
  setMeta('name', 'twitter:image:alt', metadata.imageAlt)

  let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!canonical) {
    canonical = document.createElement('link')
    canonical.rel = 'canonical'
    document.head.appendChild(canonical)
  }
  canonical.href = metadata.url
}

function setMeta(attribute: 'name' | 'property', value: string, content: string) {
  const existing = Array.from(document.head.querySelectorAll<HTMLMetaElement>('meta')).find(
    (tag) => tag.getAttribute(attribute) === value,
  )
  const meta = existing ?? document.createElement('meta')

  if (!existing) {
    meta.setAttribute(attribute, value)
    document.head.appendChild(meta)
  }
  meta.content = content
}
