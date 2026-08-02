import { wedding, type WeddingEvent } from '../config/wedding'
import { Section } from './ui/Section'
import { LeafDivider } from './ui/LeafDivider'

function EventBlock({ ev }: { ev: WeddingEvent }) {
  const [day, month, year] = ev.date.split('.')
  const mapQuery = encodeURIComponent(`${ev.venue}, ${ev.address}`)

  return (
    <div className="text-center">
      <p className="text-xs uppercase tracking-[0.35em] text-sage">{ev.side}</p>
      <h3 className="mt-2 font-serif text-3xl text-forest sm:text-4xl">{ev.name}</h3>

      {/* Ngày: THỨ | NGÀY (số lớn) | THÁNG */}
      <div className="mt-7 flex items-center justify-center gap-5">
        <div className="text-right leading-tight">
          <p className="text-[11px] uppercase tracking-widest text-sage">{ev.weekday}</p>
          <p className="mt-1 text-sm text-ink/70">{ev.time}</p>
        </div>
        <div className="border-x border-sage-light/60 px-6">
          <span className="font-serif text-6xl leading-none text-gold sm:text-7xl">{day}</span>
        </div>
        <div className="text-left leading-tight">
          <p className="text-[11px] uppercase tracking-widest text-sage">Tháng {month}</p>
          <p className="mt-1 text-sm text-ink/70">{year}</p>
        </div>
      </div>

      {ev.lunar && (
        <p className="mt-4 text-[11px] uppercase tracking-[0.18em] text-ink/50">({ev.lunar})</p>
      )}

      {ev.welcomeTime && (
        <p className="mt-2 text-sm text-ink/70">
          Đón khách {ev.welcomeTime} · Khai tiệc {ev.time}
        </p>
      )}

      <p className="mt-5 font-serif text-xl text-forest">{ev.venue}</p>
      <p className="text-sm text-ink/70">{ev.address}</p>

      <a
        href={ev.mapUrl || `https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
        target="_blank"
        rel="noreferrer"
        className="mt-5 inline-flex items-center gap-2 rounded-full border border-sage px-6 py-2 text-xs uppercase tracking-widest text-sage transition hover:bg-sage hover:text-cream"
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0Z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        Xem bản đồ
      </a>
    </div>
  )
}

export function Events() {
  return (
    <Section id="events" eyebrow="Sự kiện" title="Thông tin lễ cưới">
      <div className="mx-auto max-w-md">
        {wedding.events.map((ev, i) => (
          <div key={ev.key}>
            {i > 0 && <LeafDivider className="my-12" />}
            <EventBlock ev={ev} />
          </div>
        ))}
      </div>
    </Section>
  )
}
