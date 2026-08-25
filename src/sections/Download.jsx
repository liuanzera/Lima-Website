import PillButton from '../components/PillButton.jsx'
import StoreBadges from '../components/StoreBadges.jsx'
import Reveal from '../components/Reveal.jsx'

/**
 * Frame "Desktop - 13" / "iPhone 16 - 10".
 *
 * Same artwork, two very different crops: the desktop frame shows the whole
 * 1610px illustration, the phone frame blows it up to 1377px on a 398px screen
 * and slides it left, so only the middle-right group is on screen. Both use
 * blend mode Multiply — that is what tints the white JPG background green.
 */
export default function Download() {
  return (
    <section
      id="download"
      className="relative overflow-hidden bg-lime-pale pt-[clamp(64px,10vw,114px)]"
    >
      <Reveal className="shell relative z-10 text-center">
        <h2 className="font-display mx-auto max-w-[576px] text-[clamp(3rem,1.3rem+5vw,5rem)] font-black leading-[1.1] text-ink">
          One app
          <br />
          instead of six
        </h2>
        <p className="mt-5 text-[clamp(1rem,0.9rem+0.8vw,1.75rem)] font-medium leading-[1.5] tracking-[-0.03em] text-slate-strong">
          Free to download. Free to keep using.
        </p>
        <div className="mt-6 flex justify-center desk:mt-8">
          <PillButton size="lg" href="#pricing">
            Download for free
          </PillButton>
        </div>
      </Reveal>

      {/* Window that reveals 590 of the 768px art on phones, 583 of 898 on desktop. */}
      <div className="relative -mt-[20.1%] w-full overflow-hidden [aspect-ratio:398/590] desk:-mt-[4.93%] desk:[aspect-ratio:1440/583]">
        <img
          src="/assets/people.webp"
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="block w-[346%] max-w-none -ml-[167.3%] select-none mix-blend-multiply desk:-ml-[6.04%] desk:w-[111.8%]"
        />
      </div>

      {/*
        Badges sit on the artwork, ~28px off the bottom edge of the section.
        The frames size them 162.1x58.7 on the 398 phone and 232x84 from the
        1049 tablet up; both SVGs are exactly 232x84, so height alone is enough.
      */}
      <div className="absolute inset-x-0 bottom-[27px] z-10 flex justify-center desk:bottom-[30px]">
        <StoreBadges
          height="clamp(58.7px, 42.6px + 4.04vw, 84px)"
          gap="clamp(11.8px, 8.5px + 0.83vw, 17px)"
        />
      </div>
    </section>
  )
}
