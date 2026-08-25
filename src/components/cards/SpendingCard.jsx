import { m } from 'motion/react'
import { DURATION, EASE } from '../../motion-tokens.js'
import { px, pxMin } from '../../scale.js'

// See Timeline.jsx: the trigger cannot live on a zero-width bar.
const GROW = { hidden: { scaleX: 0 }, shown: { scaleX: 1 } }

// Bar widths are the frame's own fills over the 466px track.
const LINES = [
  { label: 'Groceries', value: 'R$ 340', width: '68%', color: '#d2ff1f' },
  { label: 'Transport', value: 'R$ 215', width: '42.9%', color: '#baff75' },
  { label: 'Leisure', value: 'R$ 128', width: '26%', color: '#ddffbb' },
]

/** "Spending by category · July" card from the Money row. */
export default function SpendingCard() {
  return (
    <div className="card">
      <p
        className="font-semibold uppercase leading-[1.55] tracking-[0.14em] text-ink-deep"
        style={{ fontSize: pxMin(10.88, 10) }}
      >
        Spending by category · July
      </p>

      <ul className="flex flex-col" style={{ marginTop: px(8), gap: px(16) }}>
        {LINES.map((line, i) => (
          <li key={line.label}>
            <div
              className="flex items-baseline justify-between"
              style={{ gap: px(12), fontSize: pxMin(14, 10.28) }}
            >
              <span className="font-medium leading-[1.43] text-ink-deep">{line.label}</span>
              <span className="leading-[1.43] text-ink-deep">{line.value}</span>
            </div>
            <m.div
              className="w-full overflow-hidden rounded-full bg-lime-mist"
              style={{ marginTop: px(6), height: px(8) }}
              initial="hidden"
              whileInView="shown"
              viewport={{ once: true, amount: 0.6 }}
            >
              {/* scaleX rather than width: a width tween relayouts the card
                  on every frame, a transform stays on the compositor. */}
              <m.div
                className="h-full origin-left rounded-full"
                style={{ background: line.color, width: line.width }}
                variants={GROW}
                transition={{
                  duration: DURATION.verySlow,
                  delay: DURATION.micro + i * DURATION.stagger,
                  ease: EASE,
                }}
              />
            </m.div>
          </li>
        ))}
      </ul>

      <div
        className="flex items-baseline justify-between bg-lime-mist"
        style={{
          marginTop: px(22),
          gap: px(12),
          borderRadius: px(16),
          paddingBlock: px(14),
          paddingInline: px(17),
          fontSize: pxMin(14, 9.4),
        }}
      >
        <span className="leading-[1.43] text-ink-deep">Goal: graduation trip</span>
        <span className="font-display shrink-0 whitespace-nowrap font-semibold leading-[1.43] text-ink-deep">
          R$ 1,250 / 3,000
        </span>
      </div>
    </div>
  )
}
