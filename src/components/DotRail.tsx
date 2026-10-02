import { useEffect, useState } from 'react';

export interface RailSection {
  id: string;
  label: string;
}

// Fixed dot rail. One dot per section, active follows the reader.
export function DotRail({ sections, onJump }: { sections: RailSection[]; onJump: (id: string) => void }) {
  const [current, setCurrent] = useState('');

  useEffect(() => {
    const onScroll = () => {
      const mid = window.scrollY + window.innerHeight * 0.4;
      let found = '';
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (el && el.offsetTop <= mid) found = s.id;
      }
      setCurrent(found);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [sections]);

  const onDark = current === 'contact';

  return (
    <nav
      aria-label="Section shortcuts"
      className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-2.5 lg:flex"
    >
      {sections.map((s) => (
        <button
          key={s.id}
          type="button"
          aria-label={`Jump to ${s.label}`}
          aria-current={current === s.id ? 'true' : undefined}
          onClick={() => onJump(s.id)}
          className="group flex items-center justify-end gap-2"
        >
          <span
            aria-hidden
            className={`whitespace-nowrap rounded-ot-sm px-2 py-1 font-mono text-[11px] opacity-0 transition-all group-hover:opacity-100 ${
              onDark ? 'bg-white text-[#162C4A]' : 'bg-ot-surface text-ot-muted'
            }`}
          >
            {s.label}
          </span>
          <span
            aria-hidden
            className={`rounded-full transition-all ${
              current === s.id
                ? onDark
                  ? 'h-2 w-5 bg-white'
                  : 'h-2 w-5 bg-navy'
                : onDark
                  ? 'h-2 w-2 bg-white/40 group-hover:bg-white'
                  : 'h-2 w-2 bg-ot-border group-hover:bg-ot-muted'
            }`}
          />
        </button>
      ))}
    </nav>
  );
}
