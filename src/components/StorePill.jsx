// Logo paths lifted from the badge SVGs in public/assets, with the viewBox
// trimmed to each glyph's own bounding box.
const APPLE =
  'M38.479 18.1757C37.6151 19.3276 36.0312 20.0476 34.5913 19.9036C34.4473 18.4637 35.1672 16.8798 36.0312 15.8719C37.0391 14.72 38.623 14 40.0629 14C40.2069 15.4399 39.4869 17.0238 38.479 18.1757ZM40.0629 20.3356C37.903 20.1916 36.0312 21.6315 35.0232 21.6315C34.0153 21.6315 32.2874 20.4795 30.5595 20.4795C28.2557 20.4795 26.0959 21.9194 25.0879 23.9353C22.7841 28.111 24.512 34.3026 26.8158 37.6144C27.9677 39.3422 29.2636 41.2141 31.1355 41.0701C32.8634 40.9261 33.4393 39.9182 35.4552 39.9182C37.6151 39.9182 38.191 41.0701 39.9189 41.0701C41.7908 40.9261 43.0867 39.1982 44.0946 37.6144C45.3905 35.7425 45.8225 33.8706 45.9665 33.7266C45.8225 33.7266 42.2227 32.2867 42.2227 28.111C42.2227 24.6553 44.9585 23.0714 45.1025 22.9274C43.3747 20.4795 40.7828 20.1916 40.0629 20.3356Z'

const PLAY = [
  ['#4285F4', 'M24.1611 24.7207L40 41.9995H24.1611V24.7207Z'],
  ['#EA4335', 'M24.1611 24.7207L55.8389 41.9995H40L24.1611 24.7207Z'],
  ['#34A853', 'M24.1611 42H40L24.1611 59.2788V42Z'],
  ['#FBBC04', 'M40 42H55.8389L24.1611 59.2788L40 42Z'],
]

const STORES = {
  appstore: {
    label: 'Download on the App Store',
    top: 'Download on',
    name: 'App Store',
    nameClass: 'font-bold',
    viewBox: '24 14 21.966 27.078',
    logoHeight: 14,
    pad: 20,
    paths: [['currentColor', APPLE]],
  },
  googleplay: {
    label: 'Get it on Google Play',
    top: 'GET IT ON',
    name: 'Google Play',
    nameClass: 'font-normal',
    viewBox: '24.1611 24.7207 31.6778 34.5581',
    logoHeight: 18,
    // The Play glyph is wider, so the frame tightens the padding to keep the
    // two badges roughly the same size.
    pad: 17,
    paths: PLAY,
  },
}

/**
 * The store badge as the phone frames draw it: a full pill, the same height as
 * the CTA beside it. The rectangular SVG badges in StoreBadges are the tablet
 * and desktop frames' version — those keep their 5.5px corners.
 */
export default function StorePill({ store, href = '#pricing', className = '' }) {
  const s = STORES[store]
  return (
    <a
      href={href}
      aria-label={s.label}
      style={{ paddingInline: s.pad }}
      className={`inline-flex h-[59px] shrink-0 items-center gap-[7px] rounded-full bg-black text-white transition-transform duration-250 hover:-translate-y-0.5 ${className}`}
    >
      <svg
        viewBox={s.viewBox}
        style={{ height: s.logoHeight }}
        className="block w-auto shrink-0"
        aria-hidden="true"
      >
        {s.paths.map(([fill, d]) => (
          <path key={d} d={d} fill={fill} />
        ))}
      </svg>
      <span className="flex flex-col leading-none">
        <span className="text-[10px] leading-[12px]">{s.top}</span>
        <span className={`mt-[1px] text-[14px] leading-[17px] ${s.nameClass}`}>{s.name}</span>
      </span>
    </a>
  )
}
