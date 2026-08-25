import { m } from 'motion/react'
import { DURATION, EASE } from '../motion-tokens.js'
import { Check } from 'lucide-react'
import Reveal from '../components/Reveal.jsx'

// Every number below is the raw value from the "Tuesday with lima" frames,
// scaled by --s (see .tuesday in index.css).
const px = (n) => `calc(${n} * var(--s))`

/**
 * The phone frame draws the smallest three roles slightly larger than a plain
 * scale-down would (8.95 / 13.61 / 11.93 instead of 7.9 / 11.8 / 10.5), so
 * they keep a floor of their own.
 */
const pxMin = (n, floor) => `max(${floor}px, calc(${n} * var(--s)))`

const ROWS = [
  {
    time: '07:30',
    label: 'Habits',
    title: 'Drink 4L of water',
    value: '2.5 / 4L',
    bar: '64.2%', // 463 of 721 in the frame
  },
  {
    time: '09:00',
    label: 'Focus',
    title: 'Study anatomy',
    value: '25:00',
    note: 'Pomodoro done. Third session this week.',
  },
  {
    time: '12:40',
    label: 'Assistant · WhatsApp',
    chat: {
      sent: 'spent 32.90 on lunch',
      reply: "Logged: R$ 32.90 under Food. That's R$ 418 in this category so far this month.",
    },
  },
  {
    time: '19:00',
    label: 'Calendar',
    title: 'Leg day',
    check: true,
    badge: '12-day streak',
  },
  {
    time: '22:10',
    label: 'Journal',
    title: '"Long day, but I closed everything. Earlier start tomorrow."',
    note: 'Mood: calm · 214 words',
  },
]

/** Frames "Tuesday with lima" — the day laid out as a timeline of app cards. */
export default function Timeline() {
  return (
    <section id="features" className="relative z-10 bg-page py-[clamp(56px,7vw,94px)]">
      <div className="shell">
        <Reveal className="mx-auto max-w-[808px] text-center">
          <h2 className="t-h2 text-ink">
            A day, one app at a
            <br className="hidden tablet:block" /> time.{' '}
            <span className="text-[#295200]">Except it isn't.</span>
          </h2>
          <p className="mt-4 text-[clamp(0.9375rem,0.85rem+0.4vw,1.25rem)] font-medium leading-[1.5] tracking-[-0.03em] text-slate-strong">
            That shower plan got lost in the grocery list. By lunchtime, Lima had tracked water
            usage, managed expenses, and set up tomorrow's training. You've just made it through the
            day.
          </p>
        </Reveal>

        {/* The container sits outside the padding: container-type queries the
            content box, so padding on the container itself would shrink --s. */}
        <Reveal delay={0.1} className="tuesday mx-auto mt-[clamp(41px,3.36vw,76px)] max-w-[924px]">
          <div className="rounded-[24px] bg-white" style={{ padding: px(40) }}>
            <p className="font-semibold leading-none text-ink-deep" style={{ fontSize: px(15) }}>
              What it looks like
            </p>
            <h3
              className="font-display font-bold leading-[1.5] text-ink-deep"
              style={{ fontSize: px(40), marginTop: px(8) }}
            >
              A Tuesday with Lima
            </h3>

            <ol className="flex flex-col" style={{ marginTop: px(32), gap: px(32) }}>
              {ROWS.map((row, i) => (
                <m.li
                  key={row.time}
                  className="flex"
                  style={{ gap: px(24) }}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{
                    duration: DURATION.verySlow,
                    delay: i * DURATION.stagger,
                    ease: EASE,
                  }}
                >
                  <span
                    className="shrink-0 font-semibold leading-[1.2] text-black"
                    style={{ width: px(51), fontSize: px(18) }}
                  >
                    {row.time}
                  </span>

                  <div
                    className="min-w-0 flex-1 bg-lime-pale"
                    style={{
                      borderRadius: px(16),
                      paddingBlock: px(16),
                      paddingInline: px(24),
                    }}
                  >
                    <Row {...row} />
                  </div>
                </m.li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Row({ label, title, value, bar, note, badge, check, chat }) {
  return (
    <>
      <div className="flex items-end justify-between" style={{ gap: px(16) }}>
        <div className="min-w-0">
          <p
            className="font-semibold leading-[1.2] text-black"
            style={{ fontSize: pxMin(12, 8.95) }}
          >
            {label}
          </p>

          {title && (
            <div className="flex items-center" style={{ marginTop: px(8), gap: px(10) }}>
              {check && (
                <span
                  className="grid shrink-0 place-items-center bg-[#8fff1f]"
                  style={{
                    width: px(22),
                    height: px(22),
                    borderRadius: px(7.2),
                  }}
                >
                  <Check className="size-[62%] text-ink" strokeWidth={3} aria-hidden="true" />
                </span>
              )}
              <p
                className="relative font-bold leading-[1.2] text-ink"
                style={{ fontSize: pxMin(18, 13.61) }}
              >
                {title}
                {/* Done task: the rule wipes across the label on scroll-in, the
                    same left-to-right reveal the habits bar uses above. */}
                {check && (
                  <m.span
                    aria-hidden="true"
                    className="absolute left-0 top-1/2 w-full origin-left -translate-y-1/2 rounded-full bg-ink"
                    style={{ height: px(2) }}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, amount: 0.9 }}
                    transition={{ duration: DURATION.verySlow, delay: DURATION.fast, ease: EASE }}
                  />
                )}
              </p>
            </div>
          )}
        </div>

        {value && (
          <p
            className="shrink-0 font-bold leading-[1.2] text-ink"
            style={{ fontSize: pxMin(18, 13.61) }}
          >
            {value}
          </p>
        )}

        {badge && (
          <p
            className="shrink-0 rounded-full bg-[#fef77f] font-bold leading-[1.2] text-ink"
            style={{
              fontSize: px(14),
              paddingBlock: px(8),
              paddingInline: px(20),
            }}
          >
            {badge}
          </p>
        )}
      </div>

      {bar && (
        <div
          className="w-full overflow-hidden rounded-full bg-lime-snow"
          style={{ marginTop: px(16), height: px(7) }}
        >
          {/* Fixed width, animated with scaleX — animating width itself would
              relayout the row on every frame. */}
          <m.div
            className="h-full origin-left rounded-full bg-[#66cc00]"
            style={{ width: bar }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.9 }}
            transition={{
              duration: DURATION.verySlow,
              delay: DURATION.micro,
              ease: EASE,
            }}
          />
        </div>
      )}

      {chat && (
        <div className="flex flex-col" style={{ marginTop: px(8), gap: px(8) }}>
          <p
            className="self-end font-semibold leading-[1.5] text-ink-deep bg-lime"
            style={{
              maxWidth: px(402),
              fontSize: px(16),
              paddingBlock: px(12),
              paddingInline: px(24),
              borderRadius: px(13.4),
              borderBottomRightRadius: px(3.3),
            }}
          >
            {chat.sent}
          </p>
          <p
            className="self-start bg-white font-medium leading-[1.5] text-ink-deep"
            style={{
              maxWidth: px(402),
              fontSize: px(16),
              paddingBlock: px(16),
              paddingInline: px(24),
              borderRadius: px(13.4),
              borderBottomLeftRadius: px(3.3),
            }}
          >
            {chat.reply}
          </p>
        </div>
      )}

      {note && (
        <p
          className="font-medium leading-[1.2] text-[#666a62]"
          style={{ marginTop: px(8), fontSize: pxMin(16, 11.93) }}
        >
          {note}
        </p>
      )}
    </>
  )
}
