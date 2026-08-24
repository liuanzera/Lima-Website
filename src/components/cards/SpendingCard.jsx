import { m } from 'motion/react'
import { DURATION, EASE } from '../../motion-tokens.js'

const LINES = [
  { label: 'Groceries', value: 'R$ 340', width: '68%', color: '#d2ff1f' },
  { label: 'Transport', value: 'R$ 215', width: '43%', color: '#baff75' },
  { label: 'Leisure', value: 'R$ 128', width: '26%', color: '#ddffbb' },
]

/** "Spending by category · July" card from the Money row. */
export default function SpendingCard() {
  return (
    <div className="card">
      <p className="text-[11px] font-semibold uppercase leading-4 tracking-[0.14em] text-ink-deep">
        Spending by category · July
      </p>

      <ul className="mt-5 space-y-4">
        {LINES.map((line, i) => (
          <li key={line.label}>
            <div className="flex items-baseline justify-between gap-3">
              <span className="text-sm font-medium leading-5 text-ink-deep">{line.label}</span>
              <span className="text-sm leading-5 text-ink-deep">{line.value}</span>
            </div>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-lime-mist">
              {/* scaleX rather than width: a width tween relayouts the card
                  on every frame, a transform stays on the compositor. */}
              <m.div
                className="h-full origin-left rounded-full"
                style={{ background: line.color, width: line.width }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{
                  duration: DURATION.verySlow,
                  delay: DURATION.micro + i * DURATION.stagger,
                  ease: EASE,
                }}
              />
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-center justify-between gap-3 rounded-2xl bg-lime-mist px-4 py-3">
        <span className="text-sm leading-5 text-ink-deep">Goal: graduation trip</span>
        <span className="font-display text-sm font-semibold leading-5 text-ink-deep">
          R$ 1,250 / 3,000
        </span>
      </div>
    </div>
  )
}
