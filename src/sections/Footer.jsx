import StoreBadges from '../components/StoreBadges.jsx'

// Nothing real is wired up behind these yet. Grep TODO to find every one.
const TODO = '#' // TODO: replace with the real URL

const COLUMNS = [
  {
    title: 'Legal',
    links: [
      { label: 'Terms of Use', note: '(in Portuguese)', href: TODO },
      { label: 'Privacy Policy', note: '(in Portuguese)', href: TODO },
      { label: 'Account Deletion', href: TODO },
    ],
  },
  {
    title: 'Contact',
    links: [{ label: 'hello@getlima.app', href: 'mailto:hello@getlima.app' }],
  },
]

const SOCIAL = [
  { icon: '/assets/ic-instagram.svg', label: 'Instagram @getlima.app', href: TODO },
  { icon: '/assets/ic-tiktok.svg', label: 'TikTok @getlima.app', href: TODO },
  { icon: '/assets/ic-x.svg', label: 'X @getlimaapp', href: TODO },
]

export default function Footer() {
  return (
    <footer className="bg-ink py-12">
      <div className="shell">
        <div className="grid gap-10 tablet:grid-cols-2 desk:grid-cols-4">
          <div>
            <img src="/assets/logo-lime.svg" alt="Lima" className="h-[25px] w-auto" />
            <p className="mt-3 max-w-[252px] text-sm leading-5 text-slate-faint">
              Your calendar, habits, money and journal. One app.
            </p>
            <a
              href="#faq"
              className="mt-3 inline-block text-sm font-medium leading-5 text-slate-faint transition-colors hover:text-lime"
            >
              Blog →
            </a>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h2 className="text-sm font-semibold leading-5 text-lime-soft">{col.title}</h2>
              <ul className="mt-3 space-y-2">
                {col.links.map(({ label, note, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-sm leading-5 text-slate-faint transition-colors hover:text-lime"
                    >
                      {label}
                      {note && <span className="text-[11px]"> {note}</span>}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h2 className="text-sm font-semibold leading-5 text-lime-soft">Social</h2>
            <ul className="mt-3 space-y-2">
              {SOCIAL.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    className="flex items-center gap-2 text-sm leading-5 text-slate-faint transition-colors hover:text-lime"
                  >
                    <img src={s.icon} alt="" aria-hidden="true" className="size-[18px]" />
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr className="mt-10 border-white/15" />

        <div className="mt-8 flex flex-col gap-6">
          {/* Two 232px badges do not fit side by side on a phone, and the
              mobile frame stacks them for exactly that reason. */}
          <StoreBadges height={84} gap={17} className="max-tablet:flex-col" />
          <p className="text-lg leading-6 text-[#f5f5f4]">© 2026 Lima. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
