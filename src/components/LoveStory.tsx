import { wedding } from '../config/wedding'
import { Section } from './ui/Section'

export function LoveStory() {
  return (
    <Section id="story" eyebrow="Our Story" title="Câu chuyện tình yêu">
      <div className="relative mx-auto max-w-2xl">
        {/* Đường dọc timeline */}
        <span className="absolute left-4 top-0 h-full w-px -translate-x-1/2 bg-sage-light/50 sm:left-1/2" />

        <div className="space-y-12">
          {wedding.story.map((item, i) => (
            <div key={item.title} className="relative">
              {/* Chấm luôn nằm chính giữa đường kẻ */}
              <span className="absolute left-4 top-2 z-10 h-3.5 w-3.5 -translate-x-1/2 rounded-full bg-sage ring-4 ring-cream sm:left-1/2" />

              <div
                className={`pl-10 sm:w-1/2 ${
                  i % 2 === 0
                    ? 'sm:pl-0 sm:pr-10 sm:text-right'
                    : 'sm:ml-auto sm:pl-10'
                }`}
              >
                <p className="font-script text-2xl text-gold">{item.date}</p>
                <h3 className="mt-1 font-serif text-xl text-forest">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/80">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
