const EVENTS = [
  { title: 'Project meeting', meta: '10:00 · Google Calendar' },
  { title: 'Deliver report', meta: '14:00 · Google Tasks' },
  { title: 'Leg day', meta: '19:00 · Lima' },
]

/** "Calendar · Thursday" card from the Integrations row. */
export default function CalendarCard() {
  return (
    <div className="card">
      <p className="text-[11px] font-semibold uppercase leading-4 tracking-[0.14em] text-ink-deep">
        Calendar · Thursday
      </p>
      <ul className="mt-6 space-y-6">
        {EVENTS.map((e) => (
          <li key={e.title} className="flex items-center gap-3">
            <span className="size-2 shrink-0 rounded-full bg-[#d2ff1f]" aria-hidden="true" />
            <span className="text-sm font-medium leading-5 text-ink-deep">{e.title}</span>
            <span className="ml-auto shrink-0 text-sm leading-5 text-ink-deep/70">{e.meta}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
