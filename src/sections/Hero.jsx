import { useEffect, useRef, useState } from 'react'
import { DISTANCE, DURATION, EASE } from '../motion-tokens.js'
import { m, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'
import PillButton from '../components/PillButton.jsx'
import StoreBadges, { STORE } from '../components/StoreBadges.jsx'
import StorePill from '../components/StorePill.jsx'
import { ArrowUpRight } from 'lucide-react'

const RISE = {
  initial: { opacity: 0, y: DISTANCE.medium },
  animate: { opacity: 1, y: 0 },
}

/**
 * Frame "Desktop - 2" / "iPhone 16 - 1".
 *
 * The mockup cluster keeps the same internal proportions in both frames
 * (646x519 on mobile, 1252x1005 on desktop — identical ratios), so only the
 * cluster width and how much of it the section reveals change per breakpoint.
 * On phones it deliberately bleeds past both edges, exactly like the frame.
 */
const PHONES = [
  // Order matches the frame's reading order: centre first, then left, then right.
  // `drift` is how far the handset sinks by the time the hero has scrolled past;
  // the centre one travels furthest so it reads as the phone that resurfaces in
  // the assistant section.
  {
    src: '/assets/phone-center.webp',
    alt: 'Lima home screen',
    className: 'left-[33.55%] top-0 z-20 w-[32.83%]',
    delay: 0,
    drift: 300,
  },
  {
    src: '/assets/phone-left.webp',
    alt: 'Lima community profile',
    className: 'left-0 top-[7.96%] z-10 w-[49.2%]',
    delay: DURATION.micro,
    drift: 150,
  },
  {
    src: '/assets/phone-right.webp',
    alt: 'Lima calendar',
    className: 'left-[50.8%] top-[7.96%] z-10 w-[49.2%]',
    delay: 2 * DURATION.micro,
    drift: 150,
  },
]

const MOBILE = '(max-width: 767px)'

function useIsMobile() {
  const [is, setIs] = useState(() => window.matchMedia(MOBILE).matches)
  useEffect(() => {
    const mq = window.matchMedia(MOBILE)
    const sync = () => setIs(mq.matches)
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])
  return is
}

/*
  On phones the three handsets travel the same distance and start within a
  breath of each other, so the cluster settles as one object. The desktop
  behaviour — the centre phone sinking twice as far, so it reads as the handset
  that resurfaces in the assistant section — makes the mobile layout look like
  the phone is leaving for the next section, which is not what happens there.

  The mobile spring is underdamped (12 against a critical ~17) so it overshoots
  and settles back: that is the elastic part. The desktop one stays overdamped.
*/
const SPRING = {
  desk: { stiffness: 90, damping: 18, mass: 0.6 },
  mobile: { stiffness: 110, damping: 12, mass: 0.7 },
}

/**
 * Sinks with the scroll and never rises above the resting position, so the
 * handsets only ever travel downwards. Coming back to the top runs the spring
 * in reverse, which is where the elastic settle comes from.
 *
 * `start` is where in the scroll the phone begins to move — the side handsets
 * pick it up a hair after the centre one on mobile.
 */
function useSink(progress, distance, start, spring, enabled) {
  const raw = useTransform(progress, [start, 1], [0, enabled ? distance : 0])
  const settled = useSpring(raw, spring)
  // Clamped at zero: an elastic spring overshoots on the way back too, and the
  // handsets rest flush with the top of the cluster's clip box — any negative
  // value lifts them past it and shears their top edge off.
  return useTransform(settled, (v) => (v < 0 ? 0 : v))
}

export default function Hero() {
  const sectionRef = useRef(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const mobile = useIsMobile()
  const spring = mobile ? SPRING.mobile : SPRING.desk
  // Mobile: same travel for all three, sides trailing the centre by 5% of the
  // scroll. Desktop keeps the frame's staggered drift.
  const drift = (i) => (mobile ? 150 : PHONES[i].drift)
  const start = (i) => (mobile && i > 0 ? 0.05 : 0)

  const centerY = useSink(scrollYProgress, drift(0), start(0), spring, !reduced)
  const leftY = useSink(scrollYProgress, drift(1), start(1), spring, !reduced)
  const rightY = useSink(scrollYProgress, drift(2), start(2), spring, !reduced)
  const sink = [centerY, leftY, rightY]
  // Entrance: the centre leads by one micro beat, then both sides together.
  const enter = (i) => (mobile ? (i === 0 ? 0 : DURATION.micro) : PHONES[i].delay)

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative overflow-hidden bg-page pt-[181px] desk:pt-[169px]"
    >
      <div className="shell flex flex-col items-center text-center">
        <m.h1
          {...RISE}
          transition={{ duration: DURATION.verySlow, ease: EASE }}
          className="t-hero max-w-[693px] text-ink"
        >
          You don't need another app. You need fewer.
        </m.h1>

        <m.p
          {...RISE}
          transition={{
            duration: DURATION.verySlow,
            delay: DURATION.micro,
            ease: EASE,
          }}
          className="t-lead mt-2 max-w-[661px] text-slate-body"
        >
          Lima replaces the six apps your routine is scattered across, and comes with an AI
          assistant that logs things for you.
        </m.p>

        {/*
          Phone frames pair the CTA with the visitor's own store badge; from the
          tablet frame up that badge moves to its own row below and the slot
          holds the secondary "See how it works" link instead.
        */}
        <m.div
          {...RISE}
          transition={{
            duration: DURATION.verySlow,
            delay: 2 * DURATION.micro,
            ease: EASE,
          }}
          className="mt-8 flex items-center justify-center gap-[9px] tablet:gap-4"
        >
          <PillButton size="hero" href="#pricing">
            Download for free
          </PillButton>

          <StorePill store={STORE} className="tablet:hidden" />

          <a
            href="#features"
            className="group hidden items-center gap-4 rounded-full px-6 py-5 text-xl font-semibold tracking-[-0.025em] text-ink transition-colors duration-250 hover:text-ink-deep tablet:inline-flex"
          >
            See how it works
            {/* Sized in em so the arrow always matches the label's cap height. */}
            <ArrowUpRight
              className="size-[1em] shrink-0 transition-transform duration-250 ease-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={2}
              aria-hidden="true"
            />
          </a>
        </m.div>

        <m.div
          {...RISE}
          transition={{
            duration: DURATION.verySlow,
            delay: 3 * DURATION.micro,
            ease: EASE,
          }}
          className="mt-8 hidden justify-center tablet:flex"
        >
          <StoreBadges height={58} gap={12} />
        </m.div>
      </div>

      {/* Full-bleed on phones (646 of 398), capped to the 1252 content on desktop. */}
      <div className="relative mx-auto mt-[52px] w-[162.3%] max-w-none -translate-x-[19.15%] overflow-hidden [aspect-ratio:646/259] tablet:mt-[66px] tablet:[aspect-ratio:1252/398] tablet:w-[min(1252px,calc(100vw-164px))] tablet:translate-x-0">
        <div className="absolute inset-x-0 top-0" style={{ aspectRatio: '1252 / 1005' }}>
          {PHONES.map((p, i) => (
            // Outer node carries the scroll sink, inner one the entrance spring,
            // so the two animations drive separate transforms and never fight.
            <m.div key={p.src} className={'absolute ' + p.className} style={{ y: sink[i] }}>
              <m.img
                src={p.src}
                alt={p.alt}
                className="block w-full"
                initial={{ opacity: 0, y: 110 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  opacity: {
                    duration: DURATION.verySlow,
                    delay: enter(i),
                    ease: 'easeOut',
                  },
                  y: {
                    type: 'spring',
                    stiffness: 130,
                    damping: 16,
                    mass: 0.9,
                    delay: enter(i),
                  },
                }}
              />
            </m.div>
          ))}
        </div>
      </div>
    </section>
  )
}
