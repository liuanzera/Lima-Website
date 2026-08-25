import { useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'

/** Lenis momentum scrolling, disabled when the user asks for reduced motion. */
export function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({ duration: 1.1, smoothWheel: true })
    let frame
    const loop = (time) => {
      lenis.raf(time)
      frame = requestAnimationFrame(loop)
    }
    frame = requestAnimationFrame(loop)

    // Anchor links have to go through Lenis or they fight the rAF loop.
    const onClick = (e) => {
      const link = e.target.closest('a[href^="#"]')
      if (!link) return
      const target = document.querySelector(link.getAttribute('href'))
      if (!target) return
      e.preventDefault()
      lenis.scrollTo(target, { offset: -90 })
    }
    document.addEventListener('click', onClick)

    return () => {
      document.removeEventListener('click', onClick)
      cancelAnimationFrame(frame)
      lenis.destroy()
    }
  }, [])
}

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
export function useScrollDirection() {
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

// Mirrors the `tablet` breakpoint in index.css — below it is the phone layout.
const MOBILE = '(max-width: 767px)'

/** True on phone widths. Used where the motion differs, not just the layout. */
export function useIsMobile() {
  const [is, setIs] = useState(() => window.matchMedia(MOBILE).matches)
  useEffect(() => {
    const mq = window.matchMedia(MOBILE)
    const sync = () => setIs(mq.matches)
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])
  return is
}
