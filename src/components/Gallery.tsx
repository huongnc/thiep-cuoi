import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { wedding } from '../config/wedding'
import { Section } from './ui/Section'
import { Tilt3D } from './ui/Tilt3D'

export function Gallery() {
  const [active, setActive] = useState<number | null>(null)
  const preview = wedding.gallery.slice(0, 4)
  const extra = wedding.gallery.length - preview.length

  return (
    <Section id="gallery" eyebrow="Khoảnh khắc" title="Album ảnh">
      <div className="mx-auto grid max-w-xl grid-cols-2 gap-3 sm:gap-4">
        {preview.map((src, i) => {
          const isLast = i === preview.length - 1 && extra > 0
          return (
            <Tilt3D key={src} max={9} className="rounded-xl">
              <button
                onClick={() => setActive(i)}
                className="relative block w-full overflow-hidden rounded-xl shadow-md focus:outline-none"
                aria-label={`Xem ảnh ${i + 1}`}
              >
                <img
                  src={src}
                  alt={`Ảnh cưới ${i + 1}`}
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover"
                />
                {isLast && (
                  <span className="absolute inset-0 flex items-center justify-center bg-forest/50 font-serif text-4xl text-cream">
                    +{extra}
                  </span>
                )}
              </button>
            </Tilt3D>
          )
        })}
      </div>

      {active !== null && (
        <Lightbox
          images={wedding.gallery}
          index={active}
          onClose={() => setActive(null)}
          onNav={(i) => setActive(i)}
        />
      )}
    </Section>
  )
}

function Lightbox({
  images,
  index,
  onClose,
  onNav,
}: {
  images: string[]
  index: number
  onClose: () => void
  onNav: (i: number) => void
}) {
  const prev = (index - 1 + images.length) % images.length
  const next = (index + 1) % images.length

  // Khóa cuộn nền + phím tắt (Esc đóng, ← → chuyển ảnh)
  useEffect(() => {
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onNav(prev)
      if (e.key === 'ArrowRight') onNav(next)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [prev, next, onClose, onNav])

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex flex-col bg-forest/80 p-4 pb-7 backdrop-blur-md sm:p-6 sm:pb-9"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-cream/10 text-2xl text-cream transition hover:bg-cream/20 sm:right-6 sm:top-6"
        aria-label="Đóng"
      >
        ×
      </button>

      {/* Ảnh chính */}
      <div className="relative flex min-h-0 flex-1 items-center justify-center">
        <button
          onClick={(e) => {
            e.stopPropagation()
            onNav(prev)
          }}
          className="absolute left-1 flex h-11 w-11 items-center justify-center rounded-full bg-cream/10 text-3xl text-cream/90 transition hover:bg-cream/20 sm:left-4"
          aria-label="Ảnh trước"
        >
          ‹
        </button>
        <img
          src={images[index]}
          alt="Ảnh cưới phóng to"
          onClick={(e) => e.stopPropagation()}
          className="max-h-full max-w-full rounded-lg object-contain shadow-2xl"
        />
        <button
          onClick={(e) => {
            e.stopPropagation()
            onNav(next)
          }}
          className="absolute right-1 flex h-11 w-11 items-center justify-center rounded-full bg-cream/10 text-3xl text-cream/90 transition hover:bg-cream/20 sm:right-4"
          aria-label="Ảnh sau"
        >
          ›
        </button>
      </div>

      {/* Dải ảnh thu nhỏ để chuyển đổi */}
      <div
        className="mt-5 flex shrink-0 justify-center gap-2 overflow-x-auto px-1 py-1"
        onClick={(e) => e.stopPropagation()}
      >
        {images.map((src, i) => (
          <button
            key={src}
            onClick={() => onNav(i)}
            aria-label={`Ảnh ${i + 1}`}
            className="shrink-0"
          >
            <img
              src={src}
              alt=""
              className={`h-14 w-12 rounded-md object-cover transition sm:h-16 sm:w-14 ${
                i === index
                  ? 'opacity-100 ring-2 ring-cream'
                  : 'opacity-40 hover:opacity-80'
              }`}
            />
          </button>
        ))}
      </div>
    </div>,
    document.body,
  )
}
