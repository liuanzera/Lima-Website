import { useState } from 'react'
import { m } from 'motion/react'

/** The 84 cells, in the exact order the Figma grid uses. */
const CELLS =
  '0,1,2,1,0,2,3,1,2,3,2,1,0,2,2,3,3,2,1,2,3,0,1,2,3,3,2,1,2,2,1,3,2,3,3,1,0,2,2,3,2,1,3,2,3,1,2,0,2,2,3,2,3,1,2,3,3,3,2,2,3,1,2,2,1,3,3,2,3,3,3,2,2,3,3,2,1,2,3,3,2,3,3,3'
    .split(',')
    .map(Number)

const LEVELS = ['rgba(14,28,0,0.08)', '#ddffbb', '#baff75', '#d2ff1f']

/** Community profile card: avatar, handle and the 84-day consistency grid. */
export default function CommunityCard() {
  const [on, setOn] = useState(false)

  return (
    <div className="card">
      <div className="flex items-center gap-3">
        <span className="font-display grid size-9 place-items-center rounded-full bg-lime-pale text-sm text-ink-deep">
          C
        </span>
        <div>
          <p className="text-sm font-semibold leading-5 text-ink-deep">@cmoraes.7</p>
          <p className="text-xs leading-4 text-ink-deep/70">67 active days in the last 12 weeks</p>
        </div>
      </div>

      {/*
        One cell at a time, left to right, 10ms apart. The grid animates in CSS
        off a single class flip: 84 Motion values would be the heaviest thing on
        the page, while 84 keyframe animations cost the main thread nothing.
      */}
      <m.div
        className={`heatmap mt-5 grid grid-cols-12 gap-[5px] ${on ? 'is-on' : ''}`}
        role="img"
        aria-label="84-day activity grid"
        viewport={{ once: true, amount: 0.4 }}
        onViewportEnter={() => setOn(true)}
      >
        {CELLS.map((level, i) => (
          <span
            key={i}
            className="aspect-square rounded-[4px]"
            style={{ background: LEVELS[level], '--cell': i }}
          />
        ))}
      </m.div>

      <p className="mt-4 text-xs leading-4 text-ink-deep/70">
        Each profile's consistency, day by day. Straight from the app.
      </p>
    </div>
  )
}
