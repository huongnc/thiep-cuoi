import { useEffect, useRef, useState } from 'react'
import { wedding } from '../config/wedding'

export function Music() {
  const ref = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const audio = ref.current
    if (!audio) return
    audio.volume = 0.5

    const tryPlay = () =>
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false))

    // Thử tự phát sau khi mở thiệp; nếu trình duyệt chặn thì phát ở lần tương tác đầu.
    const timer = window.setTimeout(tryPlay, 2600)

    const onGesture = () => {
      tryPlay()
      remove()
    }
    const remove = () => {
      window.removeEventListener('pointerdown', onGesture)
      window.removeEventListener('keydown', onGesture)
      window.removeEventListener('touchstart', onGesture)
      window.removeEventListener('scroll', onGesture)
    }
    window.addEventListener('pointerdown', onGesture)
    window.addEventListener('keydown', onGesture)
    window.addEventListener('touchstart', onGesture)
    window.addEventListener('scroll', onGesture, { passive: true })

    return () => {
      clearTimeout(timer)
      remove()
    }
  }, [])

  const toggle = () => {
    const audio = ref.current
    if (!audio) return
    if (audio.paused) {
      audio.play().then(() => setPlaying(true)).catch(() => {})
    } else {
      audio.pause()
      setPlaying(false)
    }
  }

  return (
    <>
      <audio ref={ref} src={wedding.music.src} loop preload="auto" />
      <button
        onClick={toggle}
        aria-label={wedding.music.title}
        title={wedding.music.title}
        className="fixed bottom-5 right-5 z-[70] flex h-12 w-12 items-center justify-center rounded-full bg-sage/90 text-cream shadow-lg backdrop-blur transition hover:bg-forest"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="currentColor"
          className={playing ? 'animate-spin-slow' : 'opacity-80'}
        >
          <path d="M9 18V5l12-2v13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </svg>
      </button>
    </>
  )
}
