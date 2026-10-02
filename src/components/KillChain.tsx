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
  return (
    <ol className="grid gap-0">
      {NODES.map((n, i) => {
        const active = activeIds.includes(n.id);
        return (
          <li key={n.id} className="relative flex gap-3 pb-4 last:pb-0">
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
