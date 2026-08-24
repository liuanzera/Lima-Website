import {
  BookOpen,
  CalendarDays,
  CircleCheckBig,
  Landmark,
  Sparkles,
  SquarePen,
  Target,
  Users,
} from 'lucide-react'
import Reveal from '../components/Reveal.jsx'

const MODULES = [
  { label: 'Calendar', Icon: CalendarDays },
  { label: 'Habits', Icon: CircleCheckBig },
  { label: 'Focus', Icon: Target },
  { label: 'Journal', Icon: BookOpen },
  { label: 'Notes', Icon: SquarePen },
  { label: 'Money', Icon: Landmark },
  { label: 'Community', Icon: Users },
  { label: 'Assistant', Icon: Sparkles },
]

/** Frame "Desktop - 4" — headline plus the endless strip of modules. */
export default function Marquee() {
  return (
    <section className="overflow-hidden bg-ink py-[66px] desk:py-[66px]">
      <Reveal className="shell">
        <h2 className="font-display text-center text-[clamp(1.25rem,0.9rem+1.2vw,1.75rem)] font-black leading-[1.2] tracking-[-0.006em] text-lime-pale">
          Organizing the lives of
          <br />
          thousands of people in one place.
        </h2>
      </Reveal>

      <div
        className="relative mt-12 flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]"
        aria-hidden="true"
      >
        <div className="marquee-track flex w-max shrink-0">
          {[0, 1].map((copy) => (
            <ul key={copy} className="flex shrink-0 items-center gap-14 pr-14">
              {MODULES.map(({ label, Icon }) => (
                <li
                  key={label}
                  className="flex shrink-0 items-center gap-2.5 text-[clamp(1rem,0.9rem+0.4vw,1.25rem)] font-medium tracking-[-0.026em] text-lime-pale"
                >
                  <Icon className="size-[22px] shrink-0" strokeWidth={1.7} />
                  {label}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      {/* Screen-reader copy of the same list, since the strip above is decorative. */}
      <p className="sr-only">
        Lima includes {MODULES.map((m) => m.label).join(', ')}.
      </p>
    </section>
  )
}
