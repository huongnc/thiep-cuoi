import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { wedding } from '../config/wedding'
import { Section } from './ui/Section'
import { Tilt3D } from './ui/Tilt3D'

export function Gallery() {
  const [active, setActive] = useState<number | null>(null)
  const columnCount = useGalleryColumnCount()
  const columnRefs = useRef<(HTMLDivElement | null)[]>([])
  const pausedRef = useRef(false)
  const progressRef = useRef(0)
  const resumeTimerRef = useRef<number | null>(null)
  const items = wedding.gallery.map((src, index) => ({ src, index }))
  const columns = Array.from({ length: columnCount }, (_, columnIndex) =>
    items.filter((_, index) => index % columnCount === columnIndex),
  )

  const handlePauseChange = (paused: boolean) => {
    if (resumeTimerRef.current !== null) {
      window.clearTimeout(resumeTimerRef.current)
      resumeTimerRef.current = null
    }

    if (paused) {
      pausedRef.current = true
      return
    }

    resumeTimerRef.current = window.setTimeout(() => {
      pausedRef.current = false
      resumeTimerRef.current = null
    }, 1000)
  }

  useEffect(() => {
    let frame = 0
    let previousTime = performance.now()

    const animate = (time: number) => {
      const delta = Math.min(time - previousTime, 100)
      previousTime = time

      if (!pausedRef.current) {
        progressRef.current = (progressRef.current + (delta / 1000) * 0.015) % 1
        columnRefs.current.forEach((column, columnIndex) => {
          if (!column) return
          const loopHeight = getGalleryLoopHeight(column)
          const progress = columnIndex % 2 === 1 ? 1 - progressRef.current : progressRef.current
          column.scrollTop = progress * Math.max(loopHeight, 0)
        })
      }

      frame = requestAnimationFrame(animate)
    }

    frame = requestAnimationFrame(animate)
    return () => {
      cancelAnimationFrame(frame)
      if (resumeTimerRef.current !== null) window.clearTimeout(resumeTimerRef.current)
    }
  }, [columnCount])

  return (
    <Section id="gallery" eyebrow="Khoảnh khắc" title="Album ảnh">
      <div className="gallery-marquee-grid mx-auto grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
        {columns.map((column, columnIndex) => (
          <GalleryColumn
            key={columnIndex}
            items={column}
            columnIndex={columnIndex}
            onSelect={setActive}
            setRef={(element) => {
              columnRefs.current[columnIndex] = element
            }}
            onPauseChange={handlePauseChange}
            onScroll={(element) => {
              if (!pausedRef.current) return
              const loopHeight = getGalleryLoopHeight(element)
              if (!loopHeight) return
              const ratio = Math.min(Math.max(element.scrollTop / loopHeight, 0), 1)
              progressRef.current = columnIndex % 2 === 1 ? 1 - ratio : ratio
              handlePauseChange(false)
            }}
          />
        ))}
      </div>
      <p className="mt-3 text-center text-[10px] uppercase tracking-[0.25em] text-sage/80">
        Ảnh tự cuộn chậm · Rê vào cột để kéo tay
      </p>

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

function getGalleryLoopHeight(element: HTMLDivElement) {
  const firstCopy = element.firstElementChild?.firstElementChild
  return firstCopy instanceof HTMLElement ? firstCopy.offsetHeight : element.scrollHeight / 2
}

function useGalleryColumnCount() {
  const [count, setCount] = useState(4)

  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) setCount(2)
      else if (window.innerWidth < 1024) setCount(3)
      else setCount(4)
    }

    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return count
}

function GalleryColumn({
  items,
  columnIndex,
  onSelect,
  setRef,
  onPauseChange,
  onScroll,
}: {
  items: { src: string; index: number }[]
  columnIndex: number
  onSelect: (index: number) => void
  setRef: (element: HTMLDivElement | null) => void
  onPauseChange: (paused: boolean) => void
  onScroll: (element: HTMLDivElement) => void
}) {
  return (
    <div
      ref={setRef}
      className="gallery-scroll h-[30rem] overflow-y-auto overscroll-contain rounded-2xl border border-sage-light/35 bg-white/20 p-2 shadow-inner sm:h-[36rem] sm:p-3"
      aria-label={`Cột album ${columnIndex + 1}, có thể cuộn dọc`}
      onMouseEnter={() => onPauseChange(true)}
      onMouseLeave={() => onPauseChange(false)}
      onFocus={() => onPauseChange(true)}
      onBlur={() => onPauseChange(false)}
      onTouchStart={() => onPauseChange(true)}
      onTouchEnd={() => onPauseChange(false)}
      onTouchCancel={() => onPauseChange(false)}
      onScroll={(event) => onScroll(event.currentTarget)}
    >
      <div>
        {[0, 1].map((copy) => (
          <div
            key={copy}
            aria-hidden={copy === 1}
            className="space-y-3 pb-3 sm:space-y-4 sm:pb-4"
          >
            {items.map(({ src, index }) => (
              <Tilt3D key={`${src}-${copy}`} max={9} className="rounded-xl">
                <button
                  type="button"
                  onClick={() => onSelect(index)}
                  tabIndex={copy === 1 ? -1 : undefined}
                  className="group relative block w-full cursor-pointer overflow-hidden rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-sage/60 focus:ring-offset-2 focus:ring-offset-cream"
                  aria-label={`Xem ảnh ${index + 1}`}
                >
                  <img
                    src={src}
                    alt={copy === 1 ? '' : `Ảnh cưới ${index + 1}`}
                    loading="lazy"
                    className="block h-auto w-full transition duration-700 group-hover:scale-105"
                  />
                </button>
              </Tilt3D>
            ))}
          </div>
        ))}
      </div>
    </div>
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
        className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-cream/10 text-2xl text-cream transition-[background-color,transform] hover:rotate-90 hover:bg-cream/20 active:scale-90 sm:right-6 sm:top-6"
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
          className="absolute left-1 flex h-11 w-11 items-center justify-center rounded-full bg-cream/10 text-3xl text-cream/90 transition-[background-color,transform] hover:-translate-x-1 hover:bg-cream/20 active:scale-90 sm:left-4"
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
          className="absolute right-1 flex h-11 w-11 items-center justify-center rounded-full bg-cream/10 text-3xl text-cream/90 transition-[background-color,transform] hover:translate-x-1 hover:bg-cream/20 active:scale-90 sm:right-4"
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
            className="shrink-0 transition-transform hover:-translate-y-1 active:scale-90"
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
