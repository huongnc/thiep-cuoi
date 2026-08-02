import { wedding } from '../config/wedding'
import { Section } from './ui/Section'

export function Invitation() {
  const groomFamily = wedding.events.find((e) => e.side === 'Nhà Trai')
  const brideFamily = wedding.events.find((e) => e.side === 'Nhà Gái')

  return (
    <Section id="invitation" eyebrow="Thư mời" title="Trân trọng báo tin">
      <div className="mx-auto max-w-2xl text-center">
        <p className="font-serif text-lg italic leading-relaxed text-ink/85 sm:text-xl">
          “{wedding.quote.text}”
        </p>
        <p className="mt-2 text-sm text-sage">— {wedding.quote.author}</p>

        <p className="mt-10 leading-relaxed text-ink/85">{wedding.invitation.body}</p>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
          <FamilyBlock
            side="Nhà Trai"
            father={wedding.groom.father}
            mother={wedding.groom.mother}
            address={groomFamily?.address}
          />
          <FamilyBlock
            side="Nhà Gái"
            father={wedding.bride.father}
            mother={wedding.bride.mother}
            address={brideFamily?.address}
          />
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
      <div className="mt-3 space-y-1 font-serif text-lg text-forest">
        <p>{father}</p>
        <p>{mother}</p>
      </div>
      {address && <p className="mt-3 text-sm text-ink/70">{address}</p>}
    </div>
  )
}
