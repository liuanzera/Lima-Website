import { m } from 'motion/react'
import { DISTANCE, DURATION, EASE } from '../motion-tokens.js'

const D = DISTANCE.medium
const OFFSET = { up: { y: D }, left: { x: -D }, right: { x: D }, none: {} }

/**
 * Scroll-in reveal. `from` picks the direction, `delay` staggers siblings.
 * Motion already honours prefers-reduced-motion via the reducedMotion config.
 */
export default function Reveal({
  children,
  from = 'up',
  delay = 0,
  className,
  as = 'div',
  amount = 0.35,
}) {
  const Tag = m[as] ?? m.div
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, ...OFFSET[from] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: DURATION.verySlow, delay, ease: EASE }}
    >
      {children}
    </Tag>
  )
}
