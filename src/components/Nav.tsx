import { useEffect, useState } from 'react'
import { wedding } from '../config/wedding'

const LINKS = [
  { href: '#couple', label: 'Cặp đôi' },
  { href: '#story', label: 'Chuyện tình' },
  { href: '#gallery', label: 'Album' },
  { href: '#events', label: 'Sự kiện' },
  { href: '#gifts', label: 'Mừng cưới' },
  { href: '#rsvp', label: 'Xác nhận' },
]

export function Nav() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed left-1/2 top-0 z-40 w-full max-w-3xl -translate-x-1/2 border-b border-sage-light/30 bg-cream/90 backdrop-blur transition-transform duration-500 ${
        show ? 'translate-y-0' : '-translate-y-[120%]'
      }`}
    >
      <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-3">
        <a href="#top" className="font-script text-2xl text-forest">
          {wedding.groom.name[0]}
          <span className="text-gold">&amp;</span>
          {wedding.bride.name[0]}
        </a>
        <ul className="hidden gap-6 text-xs uppercase tracking-widest text-ink/70 sm:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="transition hover:text-sage">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
