import { useEffect, useRef, useState } from 'react';

export interface ChainNode {
  id: string;
  label: string;
  sub: string;
  technique: string;
}

const NODES: ChainNode[] = [
  { id: 'actor', label: '203.0.113.10', sub: 'Attacker ip', technique: 'Source' },
  { id: 'sshd', label: 'SSH brute force', sub: '42 tries then success', technique: 'T1110 Brute Force' },
  { id: 'login', label: 'Login success', sub: 'Admin account owned', technique: 'T1078 Valid Account' },
  { id: 'cron', label: 'Cron persistence', sub: 'Rogue entry in /etc/cron.d', technique: 'T1053 Scheduled Task' },
  { id: 'svc', label: 'Miner service', sub: 'rogue systemd unit', technique: 'T1543 System Process' },
  { id: 'fim', label: 'Payload drop', sub: 'New binary, hash drift', technique: 'T1222 File Permissions' },
  { id: 'wipe', label: 'Log wipe', sub: 'auth.log truncated', technique: 'T1070 Indicator Removal' },
  { id: 'kill', label: 'Docker kill wave', sub: '6 containers in 40s', technique: 'T1489 Service Stop' },
  { id: 'soc', label: 'Contained', sub: 'Ticket SOC-2481', technique: 'IR Response' },
];

// Vertical kill chain. Nodes in the current stage light up, synced from the lab.
export function KillChain({
  activeIds,
  onSelect,
}: {
  activeIds: string[];
  onSelect: (id: string) => void;
}) {
  // Single timeline drives both the traveling glow and the node lighting.
  // Nodes light exactly when the glow passes their measured position,
  // so nothing lags. One duration controls the whole trip.
  const [lit, setLit] = useState<string[]>(activeIds);
  const [glowTop, setGlowTop] = useState<number | null>(null);
  const glowRef = useRef<number | null>(null);
  const rowRefs = useRef(new Map<string, HTMLLIElement>());
  const key = activeIds.join(',');
  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const measure = (id: string) => {
    const row = rowRefs.current.get(id);
    return row ? row.offsetTop + 7 : null;
  };

  useEffect(() => {
    const tops = new Map<string, number>();
    activeIds.forEach((id) => {
      const t = measure(id);
      if (t !== null) tops.set(id, t);
    });
    if (tops.size === 0) return;
    const ordered = [...tops.entries()].sort((a, b) => a[1] - b[1]);
    const shallowest = ordered[0][1];
    const deepest = ordered[ordered.length - 1][1];
    const initial = glowRef.current ?? ordered[0][1];
    const end = initial <= shallowest ? deepest : shallowest;
    const start = initial;

    if (reduced || start === end) {
      glowRef.current = end;
      setGlowTop(end);
      setLit(activeIds);
      return;
    }

    const DURATION = 900;
    const dir = end >= start ? 1 : -1;
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / DURATION);
      const eased = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
      const pos = start + (end - start) * eased;
      glowRef.current = pos;
      setGlowTop(pos);
      if (dir >= 0) {
        const passed = activeIds.filter((id) => {
          const tp = tops.get(id);
          return tp !== undefined && (tp - start) * dir <= (pos - start) * dir + 2;
        });
        setLit((prev) => (prev.join(',') === passed.join(',') ? prev : passed));
      } else {
        const passed = activeIds.filter((id) => {
          const tp = tops.get(id);
          return tp !== undefined && tp >= pos - 2;
        });
        setLit((prev) => (prev.join(',') === passed.join(',') ? prev : passed));
      }
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return (
    <ol className="relative grid gap-0">
      {glowTop !== null ? (
        <span
          aria-hidden
          className="pointer-events-none absolute z-20 block h-2.5 w-2.5 rounded-full bg-navy"
          style={{
            left: 3,
            top: glowTop,
            boxShadow: '0 0 12px 3px rgb(30 58 95 / 0.55)',
          }}
        />
      ) : null}
      {NODES.map((n, i) => {
        const active = lit.includes(n.id);
        return (
          <li
            key={n.id}
            ref={(el) => {
              if (el) rowRefs.current.set(n.id, el);
              else rowRefs.current.delete(n.id);
            }}
            className="relative flex gap-3 pb-4 last:pb-0"
          >
            {i < NODES.length - 1 ? (
              <span aria-hidden className="absolute bottom-0 left-[7px] top-5 w-px bg-ot-border" />
            ) : null}
            <button
              type="button"
              onClick={() => onSelect(n.id)}
              aria-label={`${n.label}, ${n.technique}`}
              className={`z-10 mt-1 grid h-4 w-4 shrink-0 place-items-center rounded-full transition-colors ${
                active ? 'animate-pulse bg-navy' : 'bg-ot-surface-2 hover:bg-navy'
              }`}
            />
            <button
              type="button"
              onClick={() => onSelect(n.id)}
              className={`min-w-0 flex-1 rounded-ot-sm px-2 py-1 text-left transition-colors ${
                active ? 'bg-navy-bg' : 'hover:bg-ot-surface'
              }`}
            >
              <span className="flex flex-wrap items-baseline gap-x-2">
                <span className="text-sm font-bold">{n.label}</span>
                <span className="font-mono text-xs text-navy-text">{n.technique}</span>
              </span>
              <span className="block font-mono text-xs text-ot-muted">{n.sub}</span>
            </button>
          </li>
        );
      })}
    </ol>
  );
}
