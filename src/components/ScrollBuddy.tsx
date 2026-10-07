import { useEffect, useRef, useState } from 'react';
import { Crosshair, FileText, Lock, Radar, Shield, Siren } from 'lucide-react';

const IDS = [
  'about',
  'experience',
  'work',
  'skills',
  'metrics',
  'lab',
  'writeups',
  'ctf',
  'classroom',
  'publications',
  'certs',
  'contact',
] as const;

function stateFor(id: string) {
  if (id === 'contact') return { label: 'CONTAINED', Icon: Lock };
  if (id === 'lab') return { label: 'ENGAGED', Icon: Siren };
  if (id === 'ctf') return { label: 'GAME ON', Icon: Crosshair };
  if (id === 'writeups' || id === 'publications' || id === 'certs' || id === 'classroom')
    return { label: 'REPORTING', Icon: FileText };
  if (id === 'experience' || id === 'skills' || id === 'metrics')
    return { label: 'HUNTING', Icon: Crosshair };
  if (id === 'about' || id === 'work') return { label: 'SCANNING', Icon: Radar };
  return { label: 'ON STANDBY', Icon: Shield };
}

// Hairline scroll progress at the very top of the viewport.
export function ScrollProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setPct(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-50 h-0.5 bg-transparent" aria-hidden>
      <div className="h-full bg-navy transition-[width]" style={{ width: `${pct}%` }} />
    </div>
  );
}

// Corner buddy: status follows the reader, dodges the cursor, counts explored
// sections, shouts on fast scrolls, and jumps back to top on click.
export function ScrollBuddy() {
  const [current, setCurrent] = useState('top');
  const [dodge, setDodge] = useState<{ x: number; y: number } | null>(null);
  const [whoa, setWhoa] = useState(false);
  const last = useRef({ y: 0, t: 0 });
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const onScroll = () => {
      const now = performance.now();
      const speed = Math.abs(window.scrollY - last.current.y) / Math.max(1, now - last.current.t);
      last.current = { y: window.scrollY, t: now };
      if (speed > 4) {
        setWhoa(true);
        timers.current.forEach(clearTimeout);
        timers.current = [
          window.setTimeout(() => setWhoa(false), 1000),
        ];
      }
      const mid = window.scrollY + window.innerHeight * 0.4;
      let found = 'top';
      for (const id of IDS) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= mid) found = id;
      }
      setCurrent(found);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      timers.current.forEach(clearTimeout);
    };
  }, []);

  const dodgeAway = () => {
    setDodge({ x: (Math.random() > 0.5 ? 1 : -1) * (36 + Math.random() * 30), y: -(24 + Math.random() * 24) });
    timers.current.push(window.setTimeout(() => setDodge(null), 700));
  };

  const { label, Icon } = stateFor(current);
  const explored = current === 'top' ? 0 : IDS.indexOf(current as (typeof IDS)[number]) + 1;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      onPointerEnter={dodgeAway}
      aria-label={`Back to top. Status ${label}, explored ${explored} of ${IDS.length}.`}
      className="fixed bottom-5 right-5 z-40 inline-flex cursor-pointer items-center gap-2 rounded-full py-2 pl-3 pr-4 font-mono text-xs shadow-ot-md transition-transform"
      style={{
        background: '#ffffff',
        border: '1px solid #E2E5EA',
        color: '#162C4A',
        transform: dodge ? `translate(${dodge.x}px, ${dodge.y}px)` : undefined,
      }}
    >
      <span className="relative flex h-2 w-2">
        <span
          className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
          style={{ background: '#1E3A5F' }}
        />
        <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: '#1E3A5F' }} />
      </span>
      <Icon key={label} size={16} strokeWidth={2.5} aria-hidden style={{ color: '#162C4A' }} />
      {whoa ? 'WHOA' : label} · {explored}/{IDS.length}
    </button>
  );
}
