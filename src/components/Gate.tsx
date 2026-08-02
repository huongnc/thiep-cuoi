import { useState, useEffect } from 'react'
import { wedding } from '../config/wedding'
import { CornerFloral } from './ui/Floral'

export function Gate() {
  const [opening, setOpening] = useState(false)
  const [done, setDone] = useState(false)

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

  const doorBase =
    'absolute inset-y-0 w-1/2 bg-cream transition-transform duration-1000 [transition-delay:400ms] ease-[cubic-bezier(0.76,0,0.24,1)]'

  return (
    <div className="fixed inset-0 z-[60] overflow-hidden">
      {/* Cánh trái */}
      <div className={`${doorBase} left-0 ${opening ? '-translate-x-full' : 'translate-x-0'}`}>
        <CornerFloral className="absolute -left-14 -top-12 h-52 w-52 sm:h-72 sm:w-72" />
        <span className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-black/10 to-transparent" />
      </div>

      {/* Cánh phải */}
      <div className={`${doorBase} right-0 ${opening ? 'translate-x-full' : 'translate-x-0'}`}>
        <CornerFloral
          flip
          className="absolute -bottom-14 -right-14 h-52 w-52 sm:h-72 sm:w-72"
        />
        <span className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black/10 to-transparent" />
      </div>

      {/* Nội dung bìa (mờ dần khi mở) */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center px-6 text-center transition-opacity duration-500 ${
          opening ? 'pointer-events-none opacity-0' : 'opacity-100'
        }`}
      >
        <p className="font-script text-4xl text-sage sm:text-5xl">{wedding.cover.eyebrow}</p>

        <h1 className="mt-6 font-serif text-4xl text-forest sm:text-6xl">{wedding.groom.name}</h1>
        <span className="my-1 font-script text-3xl text-gold sm:text-4xl">&amp;</span>
        <h1 className="font-serif text-4xl text-forest sm:text-6xl">{wedding.bride.name}</h1>

        <p className="mt-6 text-sm uppercase tracking-[0.3em] text-sage">{wedding.cover.invite}</p>
        <p className="mt-4 font-serif text-2xl tracking-[0.2em] text-forest sm:text-3xl">
          {wedding.dateText}
        </p>
      </div>
    </div>
  )
}
