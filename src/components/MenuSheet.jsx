import { useEffect, useState } from 'react'
import { AnimatePresence, m } from 'motion/react'
import { Check, ChevronDown, X } from 'lucide-react'
import PillButton from './PillButton.jsx'
import { LANGUAGES } from './LanguageMenu.jsx'
import { LINKS } from '../links.js'
import { DISTANCE, DURATION, EASE } from '../motion-tokens.js'

/*
  Menu choreography, mobile only (the sheet never renders above desk).

  The sheet is a plain translateY — no clip-path, no opacity — so the whole
  panel is one compositor transform. Rows rise out of an overflow-hidden slot,
  which is what makes them read as revealed rather than slid over the panel.

  Closing inverts the order: the rows leave upward first and the sheet only
  starts moving 140ms later, so it never cuts through content that is still
  on screen.
*/
const EASE_INOUT = [0.65, 0, 0.35, 1]
const EASE_IN = [0.55, 0.085, 0.68, 0.53]

const SHEET = {
  hidden: { y: '-100%' },
  shown: {
    y: '0%',
    transition: {
      duration: 0.72,
      ease: EASE,
      delayChildren: 0.16,
      staggerChildren: 0.075,
    },
  },
  gone: {
    y: '-100%',
    transition: {
      duration: 0.62,
      ease: EASE_INOUT,
      delay: 0.14,
      staggerChildren: 0.04,
    },
  },
}

// Rows travel more than their own height so they clear the slot completely.
const ROW = {
  hidden: { y: '115%', opacity: 0 },
  shown: {
    y: '0%',
    opacity: 1,
    transition: { duration: 0.75, ease: EASE },
  },
  gone: {
    y: '-60%',
    opacity: 0,
    transition: { duration: 0.32, ease: EASE_IN },
  },
}

const FOOT = {
  hidden: { opacity: 0, y: 12 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
  gone: { opacity: 0, y: 10, transition: { duration: 0.22, ease: EASE_IN } },
}

// No rule at rest — it wipes in from the left on hover/focus. The entry you
// picked keeps it, and turns lime.
const LINK_BASE =
  "relative inline-block font-display text-[39px] font-semibold leading-[1.04] transition-colors duration-250 after:absolute after:-bottom-1 after:left-0 after:h-[3px] after:w-full after:origin-left after:rounded-full after:bg-lime after:transition-transform after:duration-250 after:ease-expo after:content-['']"

/**
 * Full-screen menu for phones and tablets. Spacing comes from the
 * "Menu - Navbar Android/Iphone OPEN" frame; read the choreography note above
 * before touching any timing.
 */
export default function MenuSheet({ open, onClose, lang, onLang }) {
  const [langOpen, setLangOpen] = useState(false)
  const [active, setActive] = useState(null)

  // Lock the page while the sheet is up, and let Esc close it.
  useEffect(() => {
    if (!open) {
      setLangOpen(false)
      return
    }
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <m.div
          key="sheet"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-50 flex flex-col overflow-y-auto overscroll-contain bg-ink px-8 pb-[99px] pt-6 will-change-transform [backface-visibility:hidden] desk:hidden"
          variants={SHEET}
          initial="hidden"
          animate="shown"
          exit="gone"
        >
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
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
          <nav aria-label="Mobile" className="mt-[108px]">
            {/* The frame's 61px pitch: a 41px row, 4px of slot padding so descenders
              are not clipped by the mask, and 16px of gap. */}
            <ul className="flex flex-col gap-4">
              {LINKS.map((l) => (
                <li key={l.label} className="overflow-hidden py-0.5">
                  <m.div variants={ROW}>
                    <a
                      href={l.href}
                      onClick={() => {
                        setActive(l.href)
                        onClose()
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
                  </m.div>
                </li>
              ))}

              <li>
                {/* Only the trigger is masked — the dropdown below it must
                  be free to expand past the slot. */}
                <m.div className="overflow-hidden py-0.5" variants={ROW}>
                  <button
                    type="button"
                    onClick={() => setLangOpen((v) => !v)}
                    aria-expanded={langOpen}
                    className="flex items-center gap-[13px] font-display text-[39px] font-semibold leading-[1.04] text-white transition-colors duration-250 hover:text-lime"
                  >
                    Language
                    <ChevronDown
                      className={`h-[13px] w-6 transition-transform duration-250 ease-expo ${
                        langOpen ? '-rotate-180' : ''
                      }`}
                      strokeWidth={2.2}
                    />
                  </button>
                </m.div>

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
                            onClick={() => onLang(l.code)}
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
              </li>
            </ul>
          </nav>

          <m.div className="mt-auto pt-12" variants={FOOT}>
            <PillButton tone="lime" size="menu" href="#pricing" onClick={onClose}>
              Download the app
            </PillButton>
            <p className="mt-5 text-[15px] leading-[1.7] text-[#a3a7a0]">
              © 2026 Lima. All rights reserved.
            </p>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  )
}
