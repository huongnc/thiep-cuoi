import { Nav } from './components/Nav'
import { wedding } from './config/wedding'
import { Gate } from './components/Gate'
import { Music } from './components/Music'
import { Petals } from './components/Petals'
import { Couple } from './components/Couple'
import { Invitation } from './components/Invitation'
import { LoveStory } from './components/LoveStory'
import { Gallery } from './components/Gallery'
import { Events } from './components/Events'
import { Countdown } from './components/Countdown'
import { Wishes } from './components/Wishes'
import { Gifts } from './components/Gifts'
import { Footer } from './components/Footer'
import { DecorBar } from './components/ui/Floral'

export default function App() {
  return (
    <div id="top" className="flex min-h-screen justify-center">
      <Gate />
      <Music />
      <Petals />
      <div className="invite-card relative w-full max-w-3xl">
        <Nav />
        <Couple />
        <Invitation />
        <LoveStory />
        <DecorBar className="h-16 sm:h-20" />
        <Gallery />
        <Events />
        <Countdown />
        <figure className="relative px-5 py-10 sm:px-8 sm:py-14">
          <div className="mx-auto max-w-2xl overflow-hidden rounded-[2rem] border border-sage-light/35 bg-white/40 p-2 shadow-xl">
            <img
              src={wedding.schedulePhoto}
              alt="Khoảnh khắc trong ngày cưới"
              loading="lazy"
              className="block aspect-[3/2] w-full rounded-[1.5rem] object-cover transition-transform duration-700 hover:scale-[1.02]"
            />
          </div>
        </figure>
        <DecorBar className="h-16 sm:h-20" />
        <Gifts />
        <Wishes />
        <Footer />
      </div>
    </div>
  )
}
