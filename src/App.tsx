import { Nav } from './components/Nav'
import { Gate } from './components/Gate'
import { Couple } from './components/Couple'
import { Invitation } from './components/Invitation'
import { LoveStory } from './components/LoveStory'
import { Gallery } from './components/Gallery'
import { Events } from './components/Events'
import { Countdown } from './components/Countdown'
import { Schedule } from './components/Schedule'
import { Wishes } from './components/Wishes'
import { Gifts } from './components/Gifts'
import { Footer } from './components/Footer'
import { DecorBar } from './components/ui/Floral'

export default function App() {
  return (
    <div id="top" className="flex min-h-screen justify-center">
      <Gate />
      <div className="invite-card relative w-full max-w-3xl">
        <Nav />
        <Couple />
        <Invitation />
        <LoveStory />
        <DecorBar />
        <Gallery />
        <Events />
        <Countdown />
        <Schedule />
        <DecorBar />
        <Gifts />
        <Wishes />
        <Footer />
      </div>
    </div>
  )
}
