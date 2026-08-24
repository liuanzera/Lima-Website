import { useEffect, useRef, useState } from 'react'
import { DISTANCE, DURATION, EASE } from '../motion-tokens.js'
import { AnimatePresence, m } from 'motion/react'
import { Check, ChevronDown, Globe } from 'lucide-react'


// Demo only — no i18n wired up behind it yet.
export const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
  { code: 'pt', label: 'Português' },
]

/**
 * Globe dropdown in the desktop and tablet nav. The selection is owned by Nav
 * so the mobile sheet's picker and this one stay in sync.
 */
export default function LanguageMenu({ value, onChange, dark = false }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return
    const onPointer = (e) => {
      if (!ref.current?.contains(e.target)) setOpen(false)
    }
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('pointerdown', onPointer)
    window.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointer)
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`Language: ${LANGUAGES.find((l) => l.code === value).label}`}
        className={`flex items-center gap-0.5 rounded-full px-1 py-1 transition-colors duration-250 ${
          dark ? 'text-lime-mist hover:text-lime' : 'text-ink/80 hover:text-ink'
        }`}
      >
        <Globe className="size-[27px]" strokeWidth={1.6} />
        <ChevronDown
          className={`size-[23px] transition-transform duration-250 ease-expo ${
            open ? '-rotate-180' : ''
          }`}
          strokeWidth={1.6}
        />
      </button>

      <AnimatePresence>
        {open && (
          <m.ul
            role="menu"
            className="absolute right-0 top-[calc(100%+12px)] z-50 w-[184px] origin-top-right overflow-hidden rounded-2xl border border-ink/10 bg-white p-1.5 will-change-[transform,opacity] shadow-[0_24px_50px_-24px_rgba(20,41,0,0.45)]"
            initial={{ opacity: 0, y: -DISTANCE.base, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{
              opacity: 0,
              y: -DISTANCE.base,
              scale: 0.99,
              transition: { duration: DURATION.quick, ease: EASE },
            }}
            transition={{ duration: DURATION.fast, ease: EASE }}
          >
            {LANGUAGES.map((lang, i) => (
              <m.li
                key={lang.code}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * DURATION.stagger, duration: DURATION.quick, ease: EASE }}
              >
                <button
                  type="button"
                  role="menuitemradio"
                  aria-checked={value === lang.code}
                  onClick={() => {
                    onChange(lang.code)
                    setOpen(false)
                  }}
                  className={`flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-[15px] font-medium tracking-[-0.02em] transition-colors ${
                    value === lang.code
                      ? 'bg-lime-mist text-ink'
                      : 'text-ink/75 hover:bg-lime-mist/60 hover:text-ink'
                  }`}
                >
                  <span className="flex-1">{lang.label}</span>
                  {value === lang.code && (
                    <Check className="size-4 text-[#295200]" strokeWidth={2.6} aria-hidden="true" />
                  )}
                </button>
              </m.li>
            ))}
          </m.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
