import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Check, ChevronDown, Menu, X } from 'lucide-react'
import PillButton from './PillButton.jsx'
import LanguageMenu, { LANGUAGES } from './LanguageMenu.jsx'

// Opening geometry lifted from the Swup parallel-transition the client picked:
// the panel rises with its top clipped away. Travel and duration are dialled
// back from the source values — a full 50dvh over 1.4s reads as heavy on a
// menu, and the shorter distance keeps the whole wipe inside one smooth arc.
const SHEET_EASE = [0.4, 0.3, 0, 1]
const SHEET_DURATION = 0.72
const SHEET = {
  hidden: { y: '28dvh', clipPath: 'inset(55% 0% 0% 0%)' },
  shown: { y: '0dvh', clipPath: 'inset(0% 0% 0% 0%)' },
}

const LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Blog', href: '#faq' },
]

// No rule at rest — it wipes in from the left on hover/focus. The entry you
// picked keeps it, and turns lime.
const LINK_BASE =
  "relative inline-block font-display text-[34px] font-semibold transition-colors duration-300 after:absolute after:-bottom-1 after:left-0 after:h-[3px] after:w-full after:origin-left after:rounded-full after:bg-lime after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.22,1,0.36,1)] after:content-['']"

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(null)
  const [langOpen, setLangOpen] = useState(false)
  const [lang, setLang] = useState('en')

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

      <div className="shell flex h-[76px] items-center justify-between desk:h-[90px]">
        <a href="#top" aria-label="Lima — home" className="shrink-0">
          <img src="/assets/logo.svg" alt="Lima" className="h-8 w-auto desk:h-[39px]" />
        </a>

        <nav aria-label="Primary" className="hidden desk:block">
          <ul className="flex items-center gap-16">
            {LINKS.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="relative text-lg font-medium tracking-[-0.028em] text-ink after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-ink after:transition-[width] after:duration-300 hover:after:w-full"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-4 desk:flex">
          <LanguageMenu />
          <PillButton size="sm" href="#features">
            See how it works
          </PillButton>
        </div>

        {/* Mobile / tablet: compact CTA + hamburger, as in the iPhone frame. */}
        <div className="flex items-center gap-3 desk:hidden">
          <PillButton size="sm" href="#pricing" className="max-[380px]:hidden">
            Dowload app
          </PillButton>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            className="grid size-11 place-items-center text-ink"
          >
            <Menu className="size-7" strokeWidth={2} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            key="sheet"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-50 flex flex-col overflow-y-auto overscroll-contain bg-ink px-6 py-6 will-change-[transform,clip-path] [backface-visibility:hidden] desk:hidden"
            initial={SHEET.hidden}
            animate={SHEET.shown}
            exit={SHEET.hidden}
            transition={{ duration: SHEET_DURATION, ease: SHEET_EASE }}
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
                  <motion.li
                    key={l.label}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.16 + i * 0.05, duration: 0.42, ease: SHEET_EASE }}
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
                  </motion.li>
                ))}

                <motion.li
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.31, duration: 0.42, ease: SHEET_EASE }}
                >
                  <button
                    type="button"
                    onClick={() => setLangOpen((v) => !v)}
                    aria-expanded={langOpen}
                    className="flex items-center gap-3 font-display text-[34px] font-semibold text-white transition-colors duration-300 hover:text-lime"
                  >
                    Language
                    <ChevronDown
                      className={`size-7 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        langOpen ? '-rotate-180' : ''
                      }`}
                      strokeWidth={2.2}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {langOpen && (
                      <motion.ul
                        className="overflow-hidden"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.34, ease: SHEET_EASE }}
                      >
                        {LANGUAGES.map((l, i) => (
                          <motion.li
                            key={l.code}
                            initial={{ opacity: 0, x: -12 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              delay: 0.05 + i * 0.05,
                              duration: 0.3,
                              ease: SHEET_EASE,
                            }}
                          >
                            <button
                              type="button"
                              onClick={() => setLang(l.code)}
                              aria-pressed={lang === l.code}
                              className={`mt-5 flex w-full items-center gap-3 text-left text-xl font-medium transition-colors duration-300 ${
                                lang === l.code ? 'text-lime' : 'text-white/60 hover:text-lime'
                              }`}
                            >
                              <span className="flex-1">{l.label}</span>
                              {lang === l.code && (
                                <Check className="size-5" strokeWidth={2.6} aria-hidden="true" />
                              )}
                            </button>
                          </motion.li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </motion.li>
              </ul>
            </nav>

            <div className="mt-auto pb-2 pt-12">
              <PillButton tone="lime" size="md" href="#pricing" onClick={() => setOpen(false)}>
                Dowload the app
              </PillButton>
              <p className="mt-6 text-sm text-slate-faint">© 2026 Lima. All rights reserved.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
