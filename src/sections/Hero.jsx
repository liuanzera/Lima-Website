import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'
import PillButton from '../components/PillButton.jsx'
import StoreBadges from '../components/StoreBadges.jsx'

const RISE = { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 } }
const ease = [0.22, 1, 0.36, 1]

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
    delay: 0.12,
    drift: 150,
  },
  {
    src: '/assets/phone-right.webp',
    alt: 'Lima calendar',
    className: 'left-[50.8%] top-[7.96%] z-10 w-[49.2%]',
    delay: 0.24,
    drift: 150,
  },
]

/**
 * Sinks with the scroll and never rises above the resting position, so the
 * handsets only ever travel downwards. Coming back to the top runs the spring
 * in reverse, which is where the elastic settle comes from.
 */
function useSink(progress, distance, enabled) {
  const raw = useTransform(progress, [0, 1], [0, enabled ? distance : 0])
  return useSpring(raw, { stiffness: 90, damping: 18, mass: 0.6 })
}

export default function Hero() {
  const sectionRef = useRef(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const centerY = useSink(scrollYProgress, PHONES[0].drift, !reduced)
  const leftY = useSink(scrollYProgress, PHONES[1].drift, !reduced)
  const rightY = useSink(scrollYProgress, PHONES[2].drift, !reduced)
  const sink = [centerY, leftY, rightY]

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative overflow-hidden bg-page pt-[153px] desk:pt-[169px]"
    >
      <div className="shell flex flex-col items-center text-center">
        <motion.div {...RISE} transition={{ duration: 0.6, ease }}>
          <StoreBadges className="justify-center" height={46} />
        </motion.div>

        <motion.h1
          {...RISE}
          transition={{ duration: 0.7, delay: 0.08, ease }}
          className="t-hero mt-10 max-w-[693px] text-ink"
        >
          You don't need another app. You need fewer.
        </motion.h1>

        <motion.p
          {...RISE}
          transition={{ duration: 0.7, delay: 0.16, ease }}
          className="t-lead mt-2 max-w-[661px] text-slate-body"
        >
          Lima replaces the six apps your routine is scattered across, and comes with an AI
          assistant that logs things for you.
        </motion.p>

        <motion.div
          {...RISE}
          transition={{ duration: 0.7, delay: 0.24, ease }}
          className="mt-8 flex justify-center"
        >
          <PillButton size="lg" href="#features">
            See how it works
          </PillButton>
        </motion.div>
      </div>

      {/* Full-bleed on phones (646 of 398), capped to the 1252 content on desktop. */}
      <div className="relative mx-auto mt-[52px] w-[162.3%] max-w-none -translate-x-[19.15%] overflow-hidden [aspect-ratio:646/259] tablet:mt-[42px] tablet:[aspect-ratio:1252/398] tablet:w-[min(1252px,calc(100vw-164px))] tablet:translate-x-0">
        <div className="absolute inset-x-0 top-0" style={{ aspectRatio: '1252 / 1005' }}>
          {PHONES.map((p, i) => (
            // Outer node carries the scroll sink, inner one the entrance spring,
            // so the two animations drive separate transforms and never fight.
            <motion.div
              key={p.src}
              className={'absolute ' + p.className}
              style={{ y: sink[i] }}
            >
              <motion.img
                src={p.src}
                alt={p.alt}
                className="block w-full"
                initial={{ opacity: 0, y: 110 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  opacity: { duration: 0.45, delay: p.delay, ease: 'easeOut' },
                  y: { type: 'spring', stiffness: 130, damping: 16, mass: 0.9, delay: p.delay },
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
