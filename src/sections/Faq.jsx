import { Plus } from 'lucide-react'
import Reveal from '../components/Reveal.jsx'

const ITEMS = [
  [
    'What is Lima?',
    'Lima is a personal organization app that brings together your calendar, habits, focus timer, journal, notes, finances and community in one place. It ships with an AI assistant that works inside the app and over WhatsApp.',
  ],
  [
    'Is Lima free?',
    'Yes. The AI assistant is included in the free plan, with a daily limit. Pro (R$ 19.90/month, or R$ 199/year with a 14-day free trial) removes that limit and adds the WhatsApp bot, Google Calendar and Tasks sync, advanced reports and PDF export.',
  ],
  [
    'Does Lima work on WhatsApp?',
    'Yes, it is a Pro feature. To activate: open Lima, tap your profile, go to Account and verify your phone number. After that the bot works. You can send text, photos or voice notes. Send a bank statement photo and Lima reads and logs every transaction automatically.',
  ],
  [
    'Does it sync with Google Calendar and Google Tasks?',
    'Two-way sync. Events and tasks you create in Lima appear in Google; what already lives in Google appears in Lima. Nothing duplicates.',
  ],
  [
    'What is the community feature?',
    "Follow anyone in the world, see the global feed, share wins and trade what's working. Every profile shows an 84-day activity grid, the same one you see in the app.",
  ],
  [
    'What modules does Lima include?',
    'Eight: Calendar, Habits, Focus (Pomodoro), Journal, Notes, Money, Community and an AI Assistant. Money covers expense tracking, income, budgets by category, savings goals, recurring bills and monthly reports. The AI Assistant is in all plans. Free has a daily limit; Pro removes it.',
  ],
  [
    'When is Lima coming to the App Store and Google Play?',
    'Soon. The app is in final testing. Register interest and follow updates at getlima.app.',
  ],
]

/** Frame "Desktop - 12" — native <details> accordion, no JS state needed. */
export default function Faq() {
  return (
    <section id="faq" className="bg-ink py-[clamp(64px,9vw,153px)]">
      <div className="shell">
        <Reveal className="mx-auto max-w-[848px] text-center">
          <h2 className="font-display text-[clamp(2rem,1.1rem+3.6vw,3.5625rem)] font-black leading-[1.2] text-lime">
            Before you download
          </h2>
          <p className="mt-1 text-[clamp(0.9375rem,0.88rem+0.3vw,1.125rem)] leading-[1.65] text-lime-mist">
            The things people ask most. Anything else, write to{' '}
            <a className="underline underline-offset-4" href="mailto:hello@getlima.app">
              hello@getlima.app
            </a>
            .
          </p>
        </Reveal>

        <div className="mx-auto mt-[clamp(40px,6vw,81px)] flex max-w-[848px] flex-col gap-2">
          {ITEMS.map(([q, a], i) => (
            <Reveal key={q} delay={Math.min(i * 0.05, 0.25)} amount={0.2}>
              <details className="faq-item group rounded-2xl border border-ink-deep/10 bg-white px-5 py-4">
                <summary className="flex cursor-pointer list-none items-center gap-4 text-base font-semibold leading-6 text-ink-deep [&::-webkit-details-marker]:hidden">
                  <span className="flex-1">{q}</span>
                  <Plus
                    className="size-5 shrink-0 text-[#97a511] transition-transform duration-300 group-open:rotate-45"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                </summary>
                <p className="mt-3 text-sm leading-[23px] text-ink-deep/85">{a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
