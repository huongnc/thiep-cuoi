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
        <DecorBar />
        <Gallery />
        <Events />
        <Countdown />
        <div className="relative overflow-hidden px-5 pb-8 pt-6 sm:pb-10 sm:pt-8">
          <img
            src={wedding.schedulePhoto}
            alt="Ảnh cưới"
            loading="lazy"
            className="mx-auto block aspect-[2/3] w-full max-w-3xl rounded-3xl object-cover shadow-xl"
          />
        </div>
        <DecorBar />
        <Gifts />
        <Wishes />
        <Footer />
      </div>
    </div>
  )
}
