import { motion } from 'motion/react'
import { EASE } from '../motion.js'

const OFFSET = { up: { y: 28 }, left: { x: -28 }, right: { x: 28 }, none: {} }

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
  const Tag = motion[as] ?? motion.div
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, ...OFFSET[from] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </Tag>
  )
}
