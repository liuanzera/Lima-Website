/**
 * Motion tokens (transitions.dev scale). The CSS side mirrors these:
 * `--ease-expo` in index.css is EASE, and the Tailwind `duration-*` utilities
 * use the same millisecond values.
 */
export const EASE = [0.22, 1, 0.36, 1]

export const DURATION = {
  stagger: 0.04, // per-item offset
  micro: 0.08, // intent delay, large-item stagger
  quick: 0.15, // dropdown close, text swap
  fast: 0.25, // dropdown open, accordion, icon swap
  medium: 0.35, // panel close
  slow: 0.4, // panel open
  verySlow: 0.5, // text reveal, emphasis
}

export const DISTANCE = {
  micro: 4,
  base: 8, // dropdown slide
  medium: 12, // text reveal
  large: 30, // one-off celebratory entrance
}
