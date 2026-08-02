import { useState } from 'react'
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
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed left-1/2 top-0 z-40 w-full max-w-3xl -translate-x-1/2 border-b border-sage-light/30 bg-cream/90 backdrop-blur">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-3">
        <a href="#top" onClick={() => setOpen(false)} className="font-script text-2xl text-forest">
          {wedding.groom.name[0]}
          <span className="text-gold">&amp;</span>
          {wedding.bride.name[0]}
        </a>

        {/* Menu desktop */}
        <ul className="hidden gap-5 text-xs uppercase tracking-widest text-ink/70 sm:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="transition hover:text-sage">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Nút hamburger (mobile) */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
          aria-expanded={open}
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 text-forest sm:hidden"
        >
          <span
            className={`h-0.5 w-6 bg-current transition-transform duration-300 ${open ? 'translate-y-2 rotate-45' : ''}`}
          />
          <span className={`h-0.5 w-6 bg-current transition-opacity duration-300 ${open ? 'opacity-0' : ''}`} />
          <span
            className={`h-0.5 w-6 bg-current transition-transform duration-300 ${open ? '-translate-y-2 -rotate-45' : ''}`}
          />
        </button>
      </div>

      {/* Dropdown menu (mobile) */}
      <div
        className={`overflow-hidden border-t border-sage-light/30 bg-cream/95 backdrop-blur transition-[max-height] duration-300 sm:hidden ${
          open ? 'max-h-80' : 'max-h-0'
        }`}
      >
        <ul className="flex flex-col px-5 py-2 text-sm uppercase tracking-widest text-ink/75">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block border-b border-sage-light/20 py-3 transition hover:text-sage"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
