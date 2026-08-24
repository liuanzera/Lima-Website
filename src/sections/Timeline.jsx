import { motion } from 'motion/react'
import { EASE } from '../motion.js'
import { Check } from 'lucide-react'
import Reveal from '../components/Reveal.jsx'

const ROWS = [
  {
    time: '07:30',
    label: 'Habits',
    render: () => (
      <>
        <div className="flex items-baseline justify-between gap-3 pt-1.5">
          <p className="text-[13px] font-medium leading-5 text-ink-deep">Drink 4L of water</p>
          <p className="shrink-0 text-xs leading-[17px] text-ink-deep">2.5 / 4L</p>
        </div>
        <div className="mt-[7px] h-[7px] w-full overflow-hidden rounded-full bg-lime-mist">
          <motion.div
            className="h-full rounded-full bg-[#d2ff1f]"
            initial={{ width: 0 }}
            whileInView={{ width: '62%' }}
            viewport={{ once: true, amount: 0.9 }}
            transition={{ duration: 1, delay: 0.15, ease: EASE }}
          />
        </div>
      </>
    ),
  },
  {
    time: '09:00',
    label: 'Focus',
    render: () => (
      <>
        <div className="flex items-baseline justify-between gap-3 pt-1.5">
          <p className="text-[13px] font-medium leading-5 text-ink-deep">Study anatomy</p>
          <p className="font-display shrink-0 text-[15px] leading-[23px] text-ink-deep/35">25:00</p>
        </div>
        <p className="mt-1 text-[11px] leading-4 text-ink-deep/55">
          Pomodoro done. Third session this week.
        </p>
      </>
    ),
  },
  {
    time: '12:40',
    label: 'Assistant · WhatsApp',
    render: () => (
      <div className="pt-2">
        <div className="flex justify-end">
          <p className="rounded-lg bg-[#ddffbb] px-3 py-2 text-xs leading-[18px] text-ink-deep">
            spent 32.90 on lunch
          </p>
        </div>
        <div className="mt-[7px] max-w-[402px]">
          <p className="rounded-lg bg-white px-3 py-2 text-[13px] leading-[19px] text-ink-deep">
            Logged: R$ 32.90 under Food. That's R$ 418 in this category so far this month.
          </p>
        </div>
      </div>
    ),
  },
  {
    time: '19:00',
    label: 'Calendar',
    render: () => (
      <div className="flex items-center gap-2.5 pt-1.5">
        <span className="grid size-[18px] shrink-0 place-items-center rounded-md bg-[#baff75]">
          <Check className="size-3 text-ink-deep" strokeWidth={3} />
        </span>
        {/*
          Done task: the rule wipes across the label on scroll-in, the same
          left-to-right reveal the habits progress bar uses above.
        */}
        <span className="relative text-[13px] font-medium leading-5 text-ink-deep">
          Leg day
          <motion.span
            aria-hidden="true"
            className="absolute left-0 top-1/2 h-[1.5px] w-full origin-left -translate-y-1/2 rounded-full bg-ink-deep"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.9 }}
            transition={{ duration: 0.55, delay: 0.25, ease: EASE }}
          />
        </span>
        <p className="ml-auto shrink-0 rounded bg-[#f5f08a] px-1.5 py-0.5 text-[10px] font-semibold leading-[13px] text-ink-deep">
          12-day streak
        </p>
      </div>
    ),
  },
  {
    time: '22:10',
    label: 'Journal',
    render: () => (
      <>
        <p className="pt-1.5 text-[13px] font-medium leading-5 text-ink-deep">
          "Long day, but I closed everything. Earlier start tomorrow."
        </p>
        <p className="mt-1 text-[11px] leading-4 text-ink-deep/55">Mood: calm · 214 words</p>
      </>
    ),
  },
]

/** Frame "Desktop - 7" — the "A Tuesday with Lima" card. */
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

        <Reveal delay={0.1} className="mx-auto mt-[clamp(40px,5vw,76px)] max-w-[924px]">
          <div className="rounded-[27px] bg-white p-[clamp(20px,3vw,40px)] shadow-[0_24px_60px_-40px_rgba(20,41,0,0.35)]">
            <p className="t-eyebrow text-[10px] font-semibold tracking-[0.18em] text-ink-deep">
              What it looks like
            </p>
            <h3 className="font-display mt-1.5 text-[clamp(1.375rem,1.1rem+0.9vw,1.875rem)] font-bold leading-[1.1] text-ink-deep">
              A Tuesday with Lima
            </h3>

            <ol className="mt-[33px] space-y-[23px]">
              {ROWS.map((row, i) => (
                <motion.li
                  key={row.time}
                  className="flex gap-3 tablet:gap-[13px]"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.5, delay: i * 0.07, ease: EASE }}
                >
                  <span className="w-[38px] shrink-0 pt-[15px] text-[11px] font-semibold leading-4 text-ink-deep tablet:w-[46px]">
                    {row.time}
                  </span>
                  <div className="min-w-0 flex-1 rounded-[17px] bg-[#f4ffea] px-3 py-[13px] tablet:px-[17px]">
                    <p className="text-[9px] font-semibold uppercase leading-[14px] tracking-[0.14em] text-ink-deep">
                      {row.label}
                    </p>
                    {row.render()}
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
