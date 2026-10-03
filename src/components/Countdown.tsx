import { useCallback, useState } from 'react'
import { wedding } from '../config/wedding'
import { useCountdown } from '../hooks/useCountdown'
import { RsvpDialog } from './RsvpDialog'
import { Section } from './ui/Section'

const UNITS: { key: keyof ReturnType<typeof useCountdown>; label: string }[] = [
  { key: 'days', label: 'Ngày' },
  { key: 'hours', label: 'Giờ' },
  { key: 'minutes', label: 'Phút' },
  { key: 'seconds', label: 'Giây' },
]

function MonthCalendar() {
  const d = new Date(wedding.weddingDate)
  const year = d.getFullYear()
  const month = d.getMonth()
  const target = d.getDate()

  const firstWeekday = new Date(year, month, 1).getDay() // 0=CN..6=T7
  const offset = (firstWeekday + 6) % 7 // đưa về tuần bắt đầu Thứ Hai
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const cells: (number | null)[] = [
    ...Array(offset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]
  const headers = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']

  return (
    <div className="mx-auto mt-10 max-w-sm rounded-2xl border border-sage-light/40 bg-white/60 p-6 shadow-sm backdrop-blur-sm">
      <p className="mb-4 text-center font-serif text-lg text-forest">
        Tháng {month + 1} / {year}
      </p>
      <div className="grid grid-cols-7 gap-1 text-center text-xs">
        {headers.map((h) => (
          <span key={h} className="py-1 font-medium uppercase tracking-wider text-sage">
            {h}
          </span>
        ))}
        {cells.map((day, i) => (
          <span
            key={i}
            className={
              'flex aspect-square items-center justify-center rounded-full text-sm ' +
              (day === target
                ? 'bg-sage font-semibold text-cream shadow'
                : 'text-ink/75')
            }
          >
            {day ?? ''}
          </span>
        ))}
      </div>
    </div>
  )
}

export function Countdown() {
  const left = useCountdown(wedding.weddingDate)
  const [rsvpOpen, setRsvpOpen] = useState(false)
  const closeRsvp = useCallback(() => setRsvpOpen(false), [])

  return (
    <div className="relative overflow-hidden bg-cream">
      <img
        src={wedding.scheduleCover}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="pointer-events-none absolute inset-0 h-full w-full object-contain opacity-70"
      />
      <div className="absolute inset-0 bg-cream/75 backdrop-blur-[2px]" aria-hidden="true" />
      <Section
        id="countdown"
        eyebrow="Cùng đếm ngược"
        title="Đến ngày trọng đại"
        className="bg-transparent"
      >
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5">
          {UNITS.map((u) => (
            <div
              key={u.key}
              className="flex h-20 w-20 flex-col items-center justify-center rounded-2xl border border-white/70 bg-white/80 shadow-sm backdrop-blur-sm transition-[transform,box-shadow] hover:-translate-y-1 hover:shadow-md sm:h-24 sm:w-24"
            >
              <span className="font-serif text-3xl text-forest sm:text-4xl">
                {String(left[u.key]).padStart(2, '0')}
              </span>
              <span className="mt-1 text-[10px] uppercase tracking-widest text-sage">
                {u.label}
              </span>
            </div>
          ))}
        </div>

        {left.done && (
          <p className="mt-8 text-center font-serif text-3xl italic text-gold">
            Hôm nay là ngày cưới của chúng mình!
          </p>
        )}

        <MonthCalendar />

        <div className="mx-auto mt-9 max-w-md text-center">
          <p className="text-sm leading-relaxed text-ink/75">
            Sự hiện diện của bạn sẽ làm ngày trọng đại của chúng mình thêm trọn vẹn.
          </p>
          <button
            type="button"
            onClick={() => setRsvpOpen(true)}
            className="mt-4 cursor-pointer rounded-full border border-sage bg-white/70 px-6 py-2.5 text-sm font-medium uppercase tracking-widest text-forest shadow-sm transition-[background-color,transform,box-shadow] hover:-translate-y-0.5 hover:bg-white hover:shadow-md active:scale-95"
          >
            Xác nhận tham dự
          </button>
        </div>
      </Section>
      <RsvpDialog open={rsvpOpen} onClose={closeRsvp} />
    </div>
  )
}
