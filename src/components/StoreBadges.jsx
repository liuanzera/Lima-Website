const BADGES = {
  appstore: { src: '/assets/badge-appstore.svg', label: 'Download on the App Store' },
  googleplay: { src: '/assets/badge-googleplay.svg', label: 'Get it on Google Play' },
}

/** The phone's own store, so the mobile frames show a single relevant badge. */
export const STORE =
  typeof navigator !== 'undefined' && /android/i.test(navigator.userAgent)
    ? 'googleplay'
    : 'appstore'

/**
 * App Store / Google Play badges, exported straight from the Figma frame.
 * `only` renders just one of them (the mobile hero shows the store the
 * visitor's phone actually has).
 */
export default function StoreBadges({ className = '', height = 52, gap = 10, only }) {
  const keys = only ? [only] : ['appstore', 'googleplay']
  return (
    <div className={`flex items-center ${className}`} style={{ gap }}>
      {keys.map((k) => (
        <a className="block shrink-0" key={k} href="#pricing" aria-label={BADGES[k].label}>
          <img
            src={BADGES[k].src}
            alt=""
            style={{ height }}
            className="block w-auto transition-transform duration-250 hover:-translate-y-0.5"
          />
        </a>
      ))}
    </div>
  )
}
