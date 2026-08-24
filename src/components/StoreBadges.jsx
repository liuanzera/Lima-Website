/** App Store / Google Play badges, exported straight from the Figma frame. */
export default function StoreBadges({ className = '', height = 52, gap = 10 }) {
  return (
    <div className={`flex items-center ${className}`} style={{ gap }}>
      <a className="block" href="#pricing" aria-label="Download on the App Store">
        <img
          src="/assets/badge-appstore.svg"
          alt=""
          style={{ height }}
          className="block w-auto transition-transform duration-250 hover:-translate-y-0.5"
        />
      </a>
      <a className="block" href="#pricing" aria-label="Get it on Google Play">
        <img
          src="/assets/badge-googleplay.svg"
          alt=""
          style={{ height }}
          className="block w-auto transition-transform duration-250 hover:-translate-y-0.5"
        />
      </a>
    </div>
  )
}
