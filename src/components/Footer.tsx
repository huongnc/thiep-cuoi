import { wedding } from '../config/wedding'
import { LeafDivider } from './ui/LeafDivider'

export function Footer() {
  return (
    <footer className="bg-forest px-6 py-16 text-center text-cream">
      <p className="font-script text-4xl sm:text-5xl">
        {wedding.groom.name} <span className="text-gold">&amp;</span> {wedding.bride.name}
      </p>
      <p className="mt-3 text-sm uppercase tracking-[0.3em] text-cream/70">{wedding.dateText}</p>

      <LeafDivider className="mt-6 text-sage-light" />

      <p className="mt-6 text-sm text-cream/80">Cảm ơn bạn đã là một phần trong ngày hạnh phúc của chúng mình.</p>
      <p className="mt-1 text-sm text-cream/60">#{wedding.hashtag}</p>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="mt-8 rounded-full border border-cream/40 px-6 py-2 text-xs uppercase tracking-widest text-cream/80 transition hover:bg-cream/10"
      >
        Về đầu trang
      </button>
    </footer>
  )
}
