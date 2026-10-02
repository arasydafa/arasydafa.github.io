import { useEffect, useState } from 'react';
import { Crosshair, FileText, Lock, Radar, Shield, Siren } from 'lucide-react';

const IDS = [
  'about',
  'work',
  'experience',
  'skills',
  'metrics',
  'lab',
  'writeups',
  'publications',
  'certs',
  'contact',
] as const;

function stateFor(id: string) {
  if (id === 'contact') return { label: 'CONTAINED', Icon: Lock };
  if (id === 'lab') return { label: 'ENGAGED', Icon: Siren };
  if (id === 'writeups' || id === 'publications' || id === 'certs')
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

// Corner buddy whose status follows the reader down the page.
export function ScrollBuddy() {
  const [current, setCurrent] = useState('top');

  useEffect(() => {
    const onScroll = () => {
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
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const { label, Icon } = stateFor(current);

  return (
    <div
      className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full py-2 pl-3 pr-4 font-mono text-xs shadow-ot-md"
      style={{ background: '#ffffff', border: '1px solid #E2E5EA', color: '#162C4A' }}
    >
      <span className="relative flex h-2 w-2">
        <span
          className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
          style={{ background: '#1E3A5F' }}
        />
        <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: '#1E3A5F' }} />
      </span>
      <Icon key={label} size={16} strokeWidth={2.5} aria-hidden style={{ color: '#162C4A' }} />
      {label}
    </div>
  );
}
