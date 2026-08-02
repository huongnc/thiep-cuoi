import { wedding } from '../config/wedding'
import { useCountdown } from '../hooks/useCountdown'
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
    <div className="mx-auto mt-12 max-w-sm rounded-2xl border border-sage-light/40 bg-white/50 p-6">
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

  return (
    <Section
      id="countdown"
      eyebrow="Cùng đếm ngược"
      title="Đến ngày trọng đại"
      className="bg-cream-dark/50"
    >
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5">
        {UNITS.map((u) => (
          <div
            key={u.key}
            className="flex h-20 w-20 flex-col items-center justify-center rounded-2xl bg-white/70 shadow-sm sm:h-24 sm:w-24"
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
        <p className="mt-8 text-center font-script text-3xl text-gold">
          Hôm nay là ngày cưới của chúng mình!
        </p>
      )}

      <MonthCalendar />
    </Section>
  )
}
