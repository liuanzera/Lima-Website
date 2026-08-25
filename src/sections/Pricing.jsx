import PillButton from '../components/PillButton.jsx'
import Reveal from '../components/Reveal.jsx'

const PRO_FEATURES = [
  'No limit on the AI assistant',
  'WhatsApp bot: photo, audio and bank statement scanning',
  'Google Calendar and Tasks sync',
  'Advanced reports and PDF export',
]

/** Frame "Desktop - 11" — Free and Pro, with Pro raised and outlined. */
export default function Pricing() {
  return (
    <section id="pricing" className="bg-page py-[clamp(64px,8vw,101px)]">
      <div className="shell">
        <Reveal className="mx-auto max-w-[493px] text-center">
          <h2 className="font-display text-[clamp(2.5rem,1.4rem+4.4vw,4.5rem)] font-black leading-[1.2] text-ink">
            What does it cost?
          </h2>
          <p className="mt-1 text-[clamp(1rem,0.9rem+0.4vw,1.25rem)] leading-[1.5] tracking-[-0.025em] text-slate-body">
            Same app on both plans. Free has a daily limit on the assistant, Pro has none.
          </p>
        </Reveal>

        <div className="mx-auto mt-[clamp(40px,5vw,62px)] flex max-w-[801px] flex-col items-stretch gap-6 desk:flex-row desk:items-center">
          {/* Free */}
          <Reveal
            from="left"
            className="order-2 flex flex-col rounded-[30px] border-2 border-hairline bg-white px-8 pb-6 pt-10 desk:order-1 desk:w-[359px]"
          >
            <h3 className="font-display text-[32px] font-bold leading-none text-ink">Free</h3>
            <p className="mt-2.5 text-lg leading-[1.5] text-slate-strong">Free forever, no card</p>

            <p className="mt-8 flex flex-nowrap items-baseline gap-2 whitespace-nowrap">
              <span className="font-display text-[clamp(2.25rem,1rem+3.2vw,4.1875rem)] font-black leading-[1.2] text-ink">
                $ 0
              </span>
              <span className="shrink-0 text-base font-medium text-slate-strong">/month</span>
            </p>

            <p className="mt-8 text-base font-medium leading-[1.5] tracking-[-0.03em] text-slate-body">
              Calendar, habits, focus, journal, money, community and the AI assistant. All of it. The
              AI has a daily usage limit.
            </p>

            <PillButton size="sm" href="#download" className="mt-10 self-start">
              Download for free
            </PillButton>
          </Reveal>

          {/* Pro */}
          <Reveal
            from="right"
            delay={0.1}
            className="relative order-1 flex flex-col rounded-[34px] border-[3px] border-lime-vivid bg-ink px-9 pb-6 pt-11 desk:order-2 desk:w-[403px]"
          >
            <div className="flex items-start justify-between gap-4">
              <h3 className="font-display text-[36px] font-bold leading-none text-lime">Pro</h3>
              <span className="rounded-full bg-lime px-3 py-1 text-[13px] font-medium leading-[17px] tracking-[-0.023em] text-[#103b34]">
                Most popular
              </span>
            </div>
            <p className="mt-3 text-xl leading-[1.5] text-lime-mist">14-day free trial</p>

            <p className="mt-6 flex flex-nowrap items-baseline gap-2 whitespace-nowrap">
              <span className="font-display text-[clamp(2.25rem,1rem+3.2vw,4.625rem)] font-black leading-[1.2] text-lime">
                $ 19.90
              </span>
              <span className="shrink-0 text-lg font-medium text-white">/month</span>
            </p>
            <p className="mt-1 text-[13px] leading-[22px] text-white/70">
              or <span className="font-semibold text-lime-soft">R$ 199/year</span> (pay for 10
              months, use 12)
            </p>

            <ul className="mt-6 space-y-1 text-base leading-[1.9] tracking-[-0.035em] text-slate-muted">
              {PRO_FEATURES.map((f) => (
                <li key={f} className="flex gap-2.5">
                  <span aria-hidden="true">·</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <PillButton tone="lime" size="sm" href="#download" className="mt-8 self-start">
              Start free trial
            </PillButton>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
