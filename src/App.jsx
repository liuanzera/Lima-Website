import useSmoothScroll from './useSmoothScroll.js'
import Nav from './components/Nav.jsx'
import Hero from './sections/Hero.jsx'
import Marquee from './sections/Marquee.jsx'
import Timeline from './sections/Timeline.jsx'
import Assistant from './sections/Assistant.jsx'
import Modules from './sections/Modules.jsx'
import Pricing from './sections/Pricing.jsx'
import Faq from './sections/Faq.jsx'
import Download from './sections/Download.jsx'
import Footer from './sections/Footer.jsx'

export default function App() {
  useSmoothScroll()

  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Marquee />
        <Timeline />
        <Assistant />
        <Modules />
        <Pricing />
        <Faq />
        <Download />
      </main>
      <Footer />
    </>
  )
}
