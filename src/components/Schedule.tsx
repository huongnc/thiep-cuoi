import { wedding } from '../config/wedding'
import { Section } from './ui/Section'

export function Schedule() {
  return (
    <Section id="schedule" eyebrow="Timeline" title="Lịch trình ngày cưới">
      <div className="mx-auto max-w-md">
        <ol className="relative border-l border-sage-light/50 pl-8">
          {wedding.schedule.map((item) => (
            <li key={item.time} className="mb-8 last:mb-0">
              <span className="absolute -left-[7px] mt-1.5 h-3.5 w-3.5 rounded-full bg-sage ring-4 ring-cream" />
              <p className="font-serif text-2xl text-forest">{item.time}</p>
              <p className="text-sm text-ink/80">{item.label}</p>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  )
}
