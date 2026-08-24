import { ArrowUpRight } from 'lucide-react'

const TONES = {
  dark: {
    shell: 'bg-ink text-lime-snow hover:bg-[#1c3a00]',
    dot: 'bg-lime text-ink',
  },
  lime: {
    shell: 'bg-lime text-ink hover:bg-lime-vivid',
    dot: 'bg-ink text-lime',
  },
}

const SIZES = {
  sm: { shell: 'h-[52px] pl-6 pr-[6px] text-[15px]', dot: 'size-10' },
  md: { shell: 'h-[58px] pl-7 pr-[7px] text-[17px]', dot: 'size-11' },
  lg: { shell: 'h-[66px] pl-8 pr-[8px] text-xl', dot: 'size-[50px]' },
}

/** The pill CTA used across every frame: label + circular arrow badge. */
export default function PillButton({
  children,
  href = '#pricing',
  tone = 'dark',
  size = 'md',
  className = '',
  ...rest
}) {
  const t = TONES[tone]
  const s = SIZES[size]
  return (
    <a
      href={href}
      className={`group inline-flex shrink-0 items-center gap-4 rounded-full font-semibold tracking-[-0.025em] transition-colors duration-300 ${t.shell} ${s.shell} ${className}`}
      {...rest}
    >
      <span>{children}</span>
      <span
        className={`grid place-items-center rounded-full transition-transform duration-300 ease-expo group-hover:rotate-45 ${t.dot} ${s.dot}`}
        aria-hidden="true"
      >
        <ArrowUpRight className="size-[55%]" strokeWidth={2.2} />
      </span>
    </a>
  )
}
