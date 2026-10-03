import { wedding } from '../config/wedding'
import { getDisplayCouple } from '../lib/couple'
import { Section } from './ui/Section'

export function Invitation() {
  const couple = getDisplayCouple()

  return (
    <Section id="invitation" eyebrow="Thư mời" title="Trân trọng kính mời">
      <div className="mx-auto max-w-2xl text-center">
        <p className="leading-relaxed text-ink/85">{wedding.invitation.body}</p>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
          {couple.map(({ side, person }) => {
            const eventSide = side === 'groom' ? 'Nhà Trai' : 'Nhà Gái'
            const familyEvent = wedding.events.find((event) => event.side === eventSide)

            return (
              <FamilyBlock
                key={side}
                side={eventSide}
                father={person.father}
                mother={person.mother}
                address={familyEvent?.address}
              />
            )
          })}
        </div>
      </div>
    </Section>
  )
}

function FamilyBlock({
  side,
  father,
  mother,
  address,
}: {
  side: string
  father: string
  mother: string
  address?: string
}) {
  return (
    <div className="rounded-2xl border border-sage-light/40 bg-white/40 px-6 py-8">
      <p className="text-xs uppercase tracking-[0.3em] text-sage">{side}</p>
      <div className="mt-3 space-y-1 font-body text-base font-normal leading-7 text-ink sm:text-lg">
        <p>{father}</p>
        <p>{mother}</p>
      </div>
      {address && <p className="mt-3 text-sm text-ink/70">{address}</p>}
    </div>
  )
}
