import type { ReactNode } from 'react'
import { useReveal } from '../../hooks/useReveal'
import { LeafDivider } from './LeafDivider'
import { CornerFloral } from './Floral'

interface SectionProps {
  id?: string
  eyebrow?: string
  title?: string
  children: ReactNode
  className?: string
  contentClassName?: string
  decor?: boolean
}

export function Section({
  id,
  eyebrow,
  title,
  children,
  className = '',
  contentClassName = '',
  decor = true,
}: SectionProps) {
  const ref = useReveal<HTMLElement>()
  return (
    <section
      id={id}
      ref={ref}
      className={`reveal relative overflow-hidden px-5 py-16 sm:py-20 ${className}`}
    >
      {decor && (
        <>
          <CornerFloral
            className="absolute -right-12 -top-8 h-32 w-32 sm:h-40 sm:w-40"
            opacity={0.35}
          />
          <CornerFloral
            flip
            className="absolute -bottom-10 -left-12 h-28 w-28 sm:h-36 sm:w-36"
            opacity={0.25}
          />
        </>
      )}
      {(eyebrow || title) && (
        <header className="relative z-10 mx-auto mb-10 max-w-2xl text-center">
          {eyebrow && (
            <p className="font-script text-3xl text-sage sm:text-4xl">{eyebrow}</p>
          )}
          {title && (
            <h2 className="mt-1 font-serif text-2xl uppercase tracking-[0.2em] text-forest sm:text-3xl">
              {title}
            </h2>
          )}
          <LeafDivider className="mt-5" />
        </header>
      )}
      <div className={`relative z-10 mx-auto max-w-5xl ${contentClassName}`}>{children}</div>
    </section>
  )
}
