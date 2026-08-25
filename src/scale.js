/**
 * Figma numbers, kept as Figma numbers.
 *
 * `--s` is one design pixel: a block that carries it scales as a single unit,
 * so every size below can be written as the raw value from the frame. See
 * `.card-scale` and `.tuesday` in index.css for where it comes from.
 */
export const px = (n) => `calc(${n} * var(--s))`

/**
 * Same, with a floor. The phone frames draw the smallest text larger than a
 * plain scale-down would, so those roles keep a minimum of their own.
 */
export const pxMin = (n, floor) => `max(${floor}px, calc(${n} * var(--s)))`
