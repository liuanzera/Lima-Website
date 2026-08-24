import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react'

/**
 * Frame "Desktop - 8". The frame is 1440 wide with 108px gutters, so the three
 * columns are 351 / 411 / 345.
 *
 * Desktop only: the handset reads as the one that sank out of the hero. It
 * starts above this section, hidden behind the previous one, and descends as
 * you scroll, landing when you reach the middle of the section. A spring sits
 * between the scroll position and the transform so it trails and settles
 * instead of being pinned frame-for-frame to the wheel. Once it lands it stays
 * put — scrolling back up must not replay the section.
 *
 * On phones the column is already stacked and that travel would push the copy
 * around while someone is reading it, so there the three blocks simply reveal
 * in reading order: copy, handset, WhatsApp copy.
 */
const ease = [0.22, 1, 0.36, 1]
const DESK = '(min-width: 1024px)'

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia(DESK)
    const sync = () => setIsDesktop(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  return isDesktop
}

export default function Assistant() {
  const sectionRef = useRef(null)
  const reduced = useReducedMotion()
  const isDesktop = useIsDesktop()
  const [arrived, setArrived] = useState(false)

  const cinematic = isDesktop && !reduced

  // 0 when the section first appears, 1 once its middle reaches the viewport middle.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'center center'],
  })

  const locked = useRef(false)
  const tracked = useTransform(scrollYProgress, (v) => (locked.current ? 1 : v))
  const raw = useTransform(tracked, [0, 1], cinematic ? [-941, 0] : [0, 0])
  // Stiff enough to stay under the scroll over 941px of travel — a softer
  // spring lags so far behind that a quick scroll leaves the handset off-screen.
  const y = useSpring(raw, { stiffness: 150, damping: 26, mass: 0.5 })

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (v >= 0.9) locked.current = true
    if (v >= 0.8 && !arrived) setArrived(true)
  })

  // Desktop: the copy lands with the handset. Mobile: each block reveals on its own.
  const copy = (delay) =>
    cinematic
      ? {
          initial: { opacity: 0, y: 20 },
          animate: arrived ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
          transition: { duration: 0.6, delay, ease },
        }
      : {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.3 },
          transition: { duration: 0.6, ease },
        }

  return (
    <section ref={sectionRef} className="relative z-0 bg-ink py-[clamp(56px,7vw,88px)]">
      {/* Rings from the frame: 4px stroke of #ccff99 at 3% opacity. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 grid place-items-center overflow-hidden"
      >
        <div className="aspect-square w-[110vw] max-w-[1255px] rounded-full border-4 border-lime-soft/[0.06]" />
        <div className="absolute aspect-square w-[102vw] max-w-[1163px] rounded-full border-4 border-lime-soft/[0.06]" />
      </div>

      <div className="relative mx-auto flex w-full max-w-[1224px] flex-col gap-12 px-5 tablet:px-10 desk:grid desk:grid-cols-[351px_1fr_345px] desk:items-start desk:gap-8 desk:px-6">
        <motion.div className="max-w-[351px] desk:pt-[60px]" {...copy(0)}>
          <p className="t-eyebrow text-lime-soft">AI Assistant</p>
          <h2 className="mt-4 font-display text-[clamp(2rem,1.2rem+2.4vw,3.375rem)] font-semibold leading-[1.2] text-lime">
            You say it. Lima does it.
          </h2>
          <p className="mt-5 text-[clamp(1rem,0.95rem+0.25vw,1.125rem)] leading-[1.5] text-lime-mist/90">
            More than a chatbot, it's your account assistant. It creates tasks, tracks habits, logs
            expenses, and answers using your data. Ask two questions at once, and it manages both.
          </p>
        </motion.div>

        {cinematic ? (
          <motion.img
            src="/assets/phone-ai.webp"
            alt="Chat with the Lima AI assistant"
            className="relative mx-auto w-[min(411px,78vw)] will-change-transform drop-shadow-[0_40px_80px_rgba(0,0,0,0.45)]"
            style={{ y }}
          />
        ) : (
          <motion.img
            src="/assets/phone-ai.webp"
            alt="Chat with the Lima AI assistant"
            loading="lazy"
            className="relative mx-auto w-[min(411px,78vw)] drop-shadow-[0_40px_80px_rgba(0,0,0,0.45)]"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease }}
          />
        )}

        <motion.div className="max-w-[345px] desk:self-end desk:pb-[22px]" {...copy(0.35)}>
          <h2 className="font-display text-[clamp(2rem,1.2rem+2.4vw,3.375rem)] font-semibold leading-[1.2] text-lime">
            It also lives
            <br className="hidden desk:block" /> on WhatsApp
          </h2>
          <p className="mt-5 text-[clamp(1rem,0.95rem+0.25vw,1.125rem)] leading-[1.5] text-white/90 desk:text-justify">
            link your number and log anything by message, photo or voice note. Send a bank statement
            photo and Lima reads it and logs every transaction automatically.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
