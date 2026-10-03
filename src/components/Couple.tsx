import { type Person } from '../config/wedding'
import { useReveal } from '../hooks/useReveal'
import { getDisplayCouple } from '../lib/couple'
import { CornerFloral } from './ui/Floral'

function CoupleCard({ person }: { person: Person }) {
  return (
    <article className="group relative mx-auto w-full max-w-[30rem] overflow-hidden rounded-[1.5rem] border-4 border-cream/25 bg-forest shadow-2xl">
      <img
        src={person.photo}
        alt={person.name}
        className="block aspect-[2/3] w-full object-cover transition duration-700 group-hover:scale-[1.02]"
      />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest via-forest/75 to-transparent px-6 pb-7 pt-28 text-center text-cream sm:px-8 sm:pb-9">
          <p className="font-serif text-xl italic text-cream/90 sm:text-2xl">
            {person.role}
          </p>
          <h3 className="mt-1 font-script text-5xl leading-tight text-cream sm:text-7xl">
            {person.name}
          </h3>
      </div>
    </article>
  )
}

export function Couple() {
  const ref = useReveal<HTMLElement>()
  const [first, second] = getDisplayCouple()

  return (
    <section
      id="couple"
      ref={ref}
      className="reveal relative scroll-mt-20 overflow-hidden bg-forest px-5 py-14 sm:px-10 sm:py-20 lg:px-16"
    >
      <CornerFloral className="absolute -right-20 -top-16 z-0 h-72 w-72 opacity-30 sm:h-[28rem] sm:w-[28rem]" />
      <CornerFloral flip className="absolute -bottom-20 -left-20 z-0 h-72 w-72 opacity-25 sm:h-[28rem] sm:w-[28rem]" />

      <div className="relative z-10 mx-auto grid max-w-5xl gap-8 sm:gap-12 lg:grid-cols-2 lg:items-start">
        <CoupleCard person={first.person} />
        <CoupleCard person={second.person} />
      </div>
    </section>
  )
}
