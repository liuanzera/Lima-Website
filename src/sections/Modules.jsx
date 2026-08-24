import { motion } from 'motion/react'
import PillButton from '../components/PillButton.jsx'
import Reveal from '../components/Reveal.jsx'
import SpendingCard from '../components/cards/SpendingCard.jsx'
import CalendarCard from '../components/cards/CalendarCard.jsx'
import CommunityCard from '../components/cards/CommunityCard.jsx'

const ROWS = [
  {
    eyebrow: 'Money',
    title: 'Your money, next to the rest of your life',
    body: 'Log expenses and income in seconds (or send them over WhatsApp), organize by category, set goals with a piggy bank and track recurring bills. At the end of the month, the report shows exactly where the money went, and it exports to PDF.',
    Card: SpendingCard,
  },
  {
    eyebrow: 'Integrations',
    title: 'Your calendar talks to Google',
    body: 'Connect Google Calendar and Google Tasks and see everything in one place: what you create in Lima shows up there, what already lives there shows up here. Two-way sync, no duplicates.',
    Card: CalendarCard,
    flip: true,
  },
  {
    eyebrow: 'Community',
    title: 'Consistency is easier in good company',
    body: "You don't have to organize your life alone. Follow people anywhere in the world, see the global feed, share wins, exchange what's working. Every profile shows the last 84 days of activity. The same grid you see in the app.",
    Card: CommunityCard,
  },
]

/** Frame "Desktop - 10" — one dark card holding three alternating feature rows. */
export default function Modules() {
  return (
    <section className="bg-page py-[clamp(40px,5vw,82px)]">
      <div className="shell">
        <div className="rounded-[32px] bg-ink px-[clamp(20px,4vw,64px)] py-[clamp(48px,8vw,113px)]">
          <div className="flex flex-col gap-[clamp(56px,9vw,120px)]">
            {ROWS.map(({ eyebrow, title, body, Card, flip }, i) => (
              <div
                key={eyebrow}
                className="grid items-center gap-8 desk:grid-cols-2 desk:gap-20"
              >
                <Reveal
                  from={flip ? 'right' : 'left'}
                  className={flip ? 'desk:order-2' : undefined}
                >
                  <p className="t-eyebrow text-lime-soft">{eyebrow}</p>
                  <h2 className="t-h2 mt-4 max-w-[525px] text-[clamp(1.75rem,1rem+2.6vw,3.5625rem)] font-semibold text-lime">
                    {title}
                  </h2>
                  <p className="t-body mt-5 max-w-[525px] text-lime-mist/85 desk:text-justify">
                    {body}
                  </p>
                </Reveal>

                <motion.div
                  className={flip ? 'desk:order-1' : undefined}
                  initial={{ opacity: 0, y: 34 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.75, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Card />
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        <Reveal className="mt-[clamp(28px,3vw,32px)] flex justify-center">
          <PillButton size="lg" href="#pricing">
            See how it works
          </PillButton>
        </Reveal>
      </div>
    </section>
  )
}
