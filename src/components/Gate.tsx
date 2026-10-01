import { useState, useEffect } from 'react'
import { wedding } from '../config/wedding'
import { getDisplayCouple } from '../lib/couple'

export function Gate() {
  const [opening, setOpening] = useState(false)
  const [done, setDone] = useState(false)
  const [first, second] = getDisplayCouple()

  // Luôn bắt đầu ở đầu trang, không để trình duyệt khôi phục vị trí cuộn cũ
  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)
  }, [])

  // Khóa cuộn trang tới khi mở thiệp xong
  useEffect(() => {
    document.body.style.overflow = done ? '' : 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [done])

  // Tự mở thiệp sau 1s (không cần bấm nút)
  useEffect(() => {
    const t1 = window.setTimeout(() => setOpening(true), 1000)
    const t2 = window.setTimeout(() => {
      window.scrollTo(0, 0)
      setDone(true)
    }, 2550)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  if (done) return null

  return (
    <div className="fixed inset-0 z-[60] overflow-hidden">
      <img
        src={wedding.cover.image}
        alt={`${first.person.name} và ${second.person.name}`}
        className={`absolute inset-0 h-full w-full object-cover object-center transition-[opacity,transform] duration-[2500ms] ease-out ${
          opening ? 'scale-105 opacity-0' : 'scale-100 opacity-100'
        }`}
      />
      <div
        className={`absolute inset-0 bg-gradient-to-b from-forest/70 via-forest/25 to-forest/75 transition-opacity duration-[1800ms] ${
          opening ? 'opacity-0' : 'opacity-100'
        }`}
      />

      <div
        className={`absolute inset-0 flex flex-col items-center justify-start px-6 pt-[8vh] text-center transition-[opacity,transform] duration-700 sm:pt-[16vh] ${
          opening ? 'pointer-events-none -translate-y-3 opacity-0' : 'translate-y-0 opacity-100'
        }`}
      >
        <p className="font-serif text-4xl italic text-cream sm:text-5xl">{wedding.cover.eyebrow}</p>

        <h1 className="mt-6 font-serif text-4xl text-cream sm:text-6xl">{first.person.name}</h1>
        <span className="my-1 font-script text-3xl text-gold sm:text-4xl">&amp;</span>
        <h1 className="font-serif text-4xl text-cream sm:text-6xl">{second.person.name}</h1>

        <p className="mt-6 text-sm uppercase tracking-[0.3em] text-cream/85">{wedding.cover.invite}</p>
        <p className="mt-4 font-serif text-2xl tracking-[0.2em] text-cream sm:text-3xl">
          {wedding.dateText}
        </p>
      </div>
    </div>
  )
}
