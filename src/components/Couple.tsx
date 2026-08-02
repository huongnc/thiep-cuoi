import { wedding, type Person } from '../config/wedding'
import { useReveal } from '../hooks/useReveal'
import { CornerFloral, DecorBar } from './ui/Floral'
import { Tilt3D } from './ui/Tilt3D'

function Photo({ person, baseRotate }: { person: Person; baseRotate: number }) {
  return (
    <Tilt3D
      baseRotate={baseRotate}
      className="shrink-0 rounded-md border-[3px] border-gold/70 bg-white/60 p-1.5 shadow-xl"
    >
      <img
        src={person.photo}
        alt={person.name}
        className="h-72 w-56 rounded-sm object-cover sm:h-80 sm:w-60"
      />
    </Tilt3D>
  )
}

function NameBlock({ person, align }: { person: Person; align: 'left' | 'right' }) {
  return (
    <div className={align === 'right' ? 'text-right' : 'text-left'}>
      <p className="font-serif text-lg italic text-ink/70">{person.title}</p>
      <h3 className="mt-1 font-serif text-4xl text-forest sm:text-5xl">{person.name}</h3>
    </div>
  )
}

export function Couple() {
  const ref = useReveal<HTMLElement>()
  return (
    <section
      id="couple"
      ref={ref}
      className="reveal relative overflow-hidden px-6 py-20 sm:py-24"
    >
      {/* Dải hồ sen full-width phía sau */}
      <DecorBar className="absolute inset-x-0 top-[42%] z-0 h-28 sm:h-32" />
      {/* Hoa lớn trang trí */}
      <CornerFloral className="absolute -right-12 -top-10 z-0 h-56 w-56 sm:h-80 sm:w-80" />
      <CornerFloral flip className="absolute -left-14 -top-6 z-0 h-40 w-40 opacity-80 sm:h-52 sm:w-52" />
      <CornerFloral flip className="absolute -bottom-10 -left-12 z-0 h-52 w-52 sm:h-64 sm:w-64" />
      <CornerFloral className="absolute -bottom-8 -right-10 z-0 h-40 w-40 opacity-80 sm:h-52 sm:w-52" />

      <div className="relative z-10 mx-auto max-w-2xl">
        {/* Chú rể: ảnh trái — chữ phải */}
        <div className="flex items-center gap-6 sm:gap-10">
          <Photo person={wedding.groom} baseRotate={-4} />
          <NameBlock person={wedding.groom} align="left" />
        </div>

        {/* Cô dâu: chữ trái — ảnh phải, lệch xuống */}
        <div className="mt-12 flex items-center justify-end gap-6 sm:mt-8 sm:gap-10">
          <NameBlock person={wedding.bride} align="right" />
          <Photo person={wedding.bride} baseRotate={3} />
        </div>
      </div>
    </section>
  )
}
