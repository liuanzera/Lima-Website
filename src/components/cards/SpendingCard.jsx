import { motion } from 'motion/react'

const LINES = [
  { label: 'Groceries', value: 'R$ 340', width: '68%', color: '#d2ff1f' },
  { label: 'Transport', value: 'R$ 215', width: '43%', color: '#baff75' },
  { label: 'Leisure', value: 'R$ 128', width: '26%', color: '#ddffbb' },
]

/** "Spending by category · July" card from the Money row. */
export default function SpendingCard() {
  return (
    <div className="w-full max-w-[532px] rounded-[32px] bg-white p-8">
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
              <motion.div
                className="h-full rounded-full"
                style={{ background: line.color }}
                initial={{ width: 0 }}
                whileInView={{ width: line.width }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 0.9, delay: 0.15 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
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
