import { useState } from 'react'
import { m } from 'motion/react'
import { Menu } from 'lucide-react'
import PillButton from './PillButton.jsx'
import LanguageMenu from './LanguageMenu.jsx'
import MenuSheet from './MenuSheet.jsx'
import { useScrollDirection } from '../hooks.js'
import { LINKS } from '../links.js'
import { EASE } from '../motion-tokens.js'

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [lang, setLang] = useState('en')
  const mode = useScrollDirection()

  // Pinned means a dark bar over the page, so the ink-on-light logo and links
  // have to flip to their light counterparts.
  const pinned = mode !== 'top'

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-5 focus:top-5 focus:z-10 focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-lime-snow"
      >
        Skip to content
      </a>

      {/*
        The transform lives on the bar, never on <header>: a transformed
        ancestor becomes the containing block for `position: fixed`, which
        would trap the full-screen sheet below inside this element.
      */}
      <m.div
        className={`inset-x-0 top-0 will-change-transform ${
          pinned ? 'fixed border-b border-white/10 bg-ink/95' : 'relative'
        }`}
        animate={{ y: mode === 'down' && !open ? '-100%' : '0%' }}
        transition={{ duration: mode === 'down' ? 0.32 : 0.5, ease: EASE }}
      >
        <div className="shell flex h-[76px] items-center justify-between desk:h-[90px]">
          <a href="#top" aria-label="Lima — home" className="shrink-0">
            <img
              src={pinned ? '/assets/logo-lime.svg' : '/assets/logo.svg'}
              alt="Lima"
              className="h-8 w-auto desk:h-[39px]"
            />
          </a>

          <nav aria-label="Primary" className="hidden desk:block">
            <ul className="flex items-center gap-16">
              {LINKS.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    // scale-x, not width: animating width relayouts the line on
                    // every frame, the transform runs on the compositor.
                    className={`relative text-lg font-medium tracking-[-0.028em] transition-colors duration-250 after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:transition-transform after:duration-250 after:ease-expo after:content-[''] hover:after:scale-x-100 ${
                      pinned
                        ? 'text-lime-mist after:bg-lime hover:text-lime'
                        : 'text-ink after:bg-ink'
                    }`}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden items-center gap-4 desk:flex">
            <LanguageMenu value={lang} onChange={setLang} dark={pinned} />
            <PillButton size="sm" href="#pricing" tone={pinned ? 'lime' : 'dark'}>
              Download for free
            </PillButton>
          </div>

          {/* Mobile / tablet: compact CTA + hamburger, as in the iPhone frame. */}
          <div className="flex items-center gap-3 desk:hidden">
            <PillButton
              size="sm"
              href="#pricing"
              tone={pinned ? 'lime' : 'dark'}
              className="max-[380px]:hidden"
            >
              Download app
            </PillButton>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className={`grid size-11 place-items-center transition-colors duration-250 ${
                pinned ? 'text-lime-mist' : 'text-ink'
              }`}
            >
              <Menu className="size-7" strokeWidth={2} />
            </button>
          </div>
        </div>
      </m.div>

      <MenuSheet open={open} onClose={() => setOpen(false)} lang={lang} onLang={setLang} />
    </header>
  )
}
