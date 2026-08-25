import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, m } from 'motion/react'
import { Check, ChevronDown, Menu, X } from 'lucide-react'
import PillButton from './PillButton.jsx'
import LanguageMenu, { LANGUAGES } from './LanguageMenu.jsx'
import { DISTANCE, DURATION, EASE } from '../motion-tokens.js'

// Opening geometry lifted from the Swup parallel-transition the client picked:
// the panel rises with its top clipped away.
//
// These run longer than the 400/350ms the motion tokens prescribe for a panel:
// at token speed the wipe reads as a cut rather than a reveal. The curve is a
// slow-settling expo-out, so most of the travel happens early and the last
// stretch eases in almost imperceptibly — that is where the softness comes
// from, not from the length alone.
const SHEET_EASE = [0.16, 1, 0.3, 1]
const SHEET_OPEN = 0.78
const SHEET = {
  hidden: { y: '22dvh', opacity: 0, clipPath: 'inset(45% 0% 0% 0%)' },
  shown: { y: '0dvh', opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' },
  // Closing has to reach inset(100%) — leaving it partway keeps the bottom of
  // the list on screen right up to the moment it is unmounted, which is what
  // made the close read as a stutter. Still shorter than the open: getting out
  // of the way should never take as long as arriving.
  gone: {
    y: '12dvh',
    opacity: 0,
    clipPath: 'inset(100% 0% 0% 0%)',
    transition: { duration: 0.62, ease: SHEET_EASE },
  },
}

const LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Blog', href: '#faq' },
]

// No rule at rest — it wipes in from the left on hover/focus. The entry you
// picked keeps it, and turns lime.
const LINK_BASE =
  "relative inline-block font-display text-[34px] font-semibold transition-colors duration-250 after:absolute after:-bottom-1 after:left-0 after:h-[3px] after:w-full after:origin-left after:rounded-full after:bg-lime after:transition-transform after:duration-250 after:ease-expo after:content-['']"

// Ignore sub-pixel scroll jitter, otherwise the bar flickers between states.
const JITTER = 4

/**
 * Reading direction, so the bar can come back when someone scrolls up.
 * 'top' is the design's own transparent header; 'up' pins a dark bar;
 * 'down' slides it away.
 *
 * The pinned bar only exists from the second section on: over the hero it
 * would sit on the artwork and compete with the headline, so the whole thing
 * stays 'top' until the hero has scrolled past.
 */
function useScrollDirection() {
  const [mode, setMode] = useState('top')
  const previous = useRef(0)
  const pinAt = useRef(Infinity)

  useEffect(() => {
    const hero = document.getElementById('top')
    // Its height changes with the viewport, so re-measure rather than cache a
    // number: fluid type and the phone cluster both move this edge.
    const measure = () => {
      pinAt.current = hero ? hero.offsetTop + hero.offsetHeight : Infinity
    }

    // A plain scroll listener, not Motion's useScroll: all this needs is a
    // direction flag, and setMode already bails out when the value repeats.
    const onScroll = () => {
      const y = window.scrollY
      const last = previous.current
      if (Math.abs(y - last) < JITTER) return
      previous.current = y
      setMode(y < pinAt.current ? 'top' : y < last ? 'up' : 'down')
    }

    measure()
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', measure)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', measure)
    }
  }, [])

  return mode
}

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(null)
  const [langOpen, setLangOpen] = useState(false)
  const [lang, setLang] = useState('en')
  const mode = useScrollDirection()

  // Pinned means a dark bar over the page, so the ink-on-light logo and links
  // have to flip to their light counterparts.
  const pinned = mode !== 'top'

  // Lock the page while the mobile sheet is up, and let Esc close it.
  useEffect(() => {
    if (!open) {
      setLangOpen(false)
      return
    }
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

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

      <AnimatePresence>
        {open && (
          <m.div
            key="sheet"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-50 flex flex-col overflow-y-auto overscroll-contain bg-ink px-6 py-6 will-change-[transform,clip-path,opacity] [backface-visibility:hidden] desk:hidden"
            initial={SHEET.hidden}
            animate={SHEET.shown}
            exit={SHEET.gone}
            transition={{ duration: SHEET_OPEN, ease: SHEET_EASE }}
          >
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="grid size-11 place-items-center rounded-full border-2 border-white/90 text-white transition-colors hover:border-lime hover:text-lime"
              >
                <X className="size-5" strokeWidth={2.4} />
              </button>
            </div>

            {/*
              The panel itself scrolls, not the list — expanding Language must
              push the CTA down instead of being clipped behind it.
            */}
            <nav aria-label="Mobile" className="mt-14">
              <ul className="flex flex-col gap-8">
                {LINKS.map((l, i) => (
                  <m.li
                    key={l.label}
                    initial={{ opacity: 0, x: -DISTANCE.medium }}
                    animate={{ opacity: 1, x: 0 }}
                    // Held back until the wipe has cleared the row, so the text
                    // arrives with the panel instead of racing it.
                    transition={{ delay: 0.24 + i * 0.06, duration: 0.5, ease: SHEET_EASE }}
                  >
                    <a
                      href={l.href}
                      onClick={() => {
                        setActive(l.href)
                        setOpen(false)
                      }}
                      aria-current={active === l.href ? 'true' : undefined}
                      className={`${LINK_BASE} ${
                        active === l.href
                          ? 'text-lime after:scale-x-100'
                          : 'text-white after:scale-x-0 hover:text-lime hover:after:scale-x-100 focus-visible:text-lime focus-visible:after:scale-x-100'
                      }`}
                    >
                      {l.label}
                    </a>
                  </m.li>
                ))}

                <m.li
                  initial={{ opacity: 0, x: -DISTANCE.medium }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.42, duration: 0.5, ease: SHEET_EASE }}
                >
                  <button
                    type="button"
                    onClick={() => setLangOpen((v) => !v)}
                    aria-expanded={langOpen}
                    className="flex items-center gap-3 font-display text-[34px] font-semibold text-white transition-colors duration-250 hover:text-lime"
                  >
                    Language
                    <ChevronDown
                      className={`size-7 transition-transform duration-250 ease-expo ${
                        langOpen ? '-rotate-180' : ''
                      }`}
                      strokeWidth={2.2}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {langOpen && (
                      <m.ul
                        className="overflow-hidden"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: DURATION.fast, ease: EASE }}
                      >
                        {LANGUAGES.map((l, i) => (
                          <m.li
                            key={l.code}
                            initial={{ opacity: 0, x: -DISTANCE.medium }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              delay: i * DURATION.stagger,
                              duration: DURATION.fast,
                              ease: EASE,
                            }}
                          >
                            <button
                              type="button"
                              onClick={() => setLang(l.code)}
                              aria-pressed={lang === l.code}
                              className={`mt-5 flex w-full items-center gap-3 text-left text-xl font-medium transition-colors duration-250 ${
                                lang === l.code ? 'text-lime' : 'text-white/60 hover:text-lime'
                              }`}
                            >
                              <span className="flex-1">{l.label}</span>
                              {lang === l.code && (
                                <Check className="size-5" strokeWidth={2.6} aria-hidden="true" />
                              )}
                            </button>
                          </m.li>
                        ))}
                      </m.ul>
                    )}
                  </AnimatePresence>
                </m.li>
              </ul>
            </nav>

            <m.div
              className="mt-auto pb-2 pt-12"
              initial={{ opacity: 0, y: DISTANCE.medium }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5, ease: SHEET_EASE }}
            >
              <PillButton tone="lime" size="md" href="#pricing" onClick={() => setOpen(false)}>
                Download the app
              </PillButton>
              <p className="mt-6 text-sm text-slate-faint">© 2026 Lima. All rights reserved.</p>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  )
}
