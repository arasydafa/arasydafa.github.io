import { useEffect, useState } from 'react';
import { Button } from '@omega-os/ui';
import { ArrowDown, Github } from 'lucide-react';
import { PROFILE } from '../data/placeholder';

const WORDS = ['contain', 'triage', 'hunt', 'isolate'];

// Full-screen hero — rotating verb in the middle line, no panel.
export function TerminalHero({ onLab }: { onLab: () => void }) {
  const [wi, setWi] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => setWi((i) => (i + 1) % WORDS.length), 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="hero-grid-bg flex min-h-[92vh] w-full flex-col">
      <div className="ot-hero mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6 py-16 md:px-10">
        <p className="font-mono text-[13px] tracking-wide text-ot-muted">
          soc@portfolio:~ whoami<span className="ml-1 inline-block animate-pulse text-navy-text">▌</span>
        </p>
        <p className="mt-2 text-xl font-bold tracking-tight md:text-2xl">
          Arasy Dafa Sulistya Kurniawan
        </p>
        <h1 className="mt-4 text-[clamp(3rem,10vw,7.5rem)] font-extrabold leading-[0.95] tracking-tight">
          DETECT
          <br />
          <span className="rot-word font-light italic text-navy-text">
            <span key={wi}>{WORDS[wi]}</span>
          </span>
          <br />
          REPEAT
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-ot-muted md:text-lg">
          SOC Engineer at {PROFILE.org}, focused on threat detection, threat intelligence
          and detection engineering.
        </p>
        <div className="mt-8 flex flex-wrap gap-2.5">
          <Button icon={<ArrowDown size={16} />} onClick={onLab}>
            Explore detection lab
          </Button>
          <a href={PROFILE.github} target="_blank" rel="noreferrer">
            <Button variant="secondary" icon={<Github size={16} />}>
              GitHub
            </Button>
          </a>
        </div>
      </div>
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 pb-8 font-mono text-xs text-ot-muted md:px-10">
        <span>{PROFILE.location}</span>
        <span className="hidden md:inline">SIEM · SIGMA · THREAT INTEL</span>
        <span className="inline-flex animate-bounce items-center gap-1.5">
          <ArrowDown size={14} /> scroll
        </span>
      </div>
    </div>
  );
}
