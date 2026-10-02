const TACTICS = ['Credential Access', 'Execution', 'Persistence', 'Defense Evasion', 'Collection', 'Impact'];

export interface StatusCell {
  tactic: string;
  technique: string;
  level: 'live' | 'tuning' | 'planned' | null;
  onPick: (technique: string) => void;
  picked: boolean;
}

const FILL: Record<Exclude<StatusCell['level'], null>, string> = {
  live: 'var(--ot-navy)',
  tuning: 'color-mix(in srgb, var(--ot-navy) 55%, var(--ot-surface-2))',
  planned: 'color-mix(in srgb, var(--ot-navy) 28%, var(--ot-surface-2))',
};

// Absolute color scale. Unlike the generic heatmap this never normalizes,
// so the lowest status stays visible instead of collapsing to zero.
export function StatusMatrix({
  techniques,
  levels,
  selectedId,
  onSelect,
}: {
  techniques: string[];
  levels: Map<string, 'live' | 'tuning' | 'planned'>;
  selectedId: string;
  onSelect: (technique: string) => void;
}) {
  return (
    <div
      role="img"
      aria-label={`Coverage matrix, ${techniques.length} techniques across ${TACTICS.length} tactics`}
      className="grid gap-1"
      style={{ gridTemplateColumns: `auto repeat(${TACTICS.length}, minmax(0, 1fr))` }}
    >
      <span />
      {TACTICS.map((t) => (
        <span key={t} className="truncate pb-1 text-center text-xs text-ot-muted">
          {t}
        </span>
      ))}
      {techniques.map((tech) => (
        <CellRow
          key={tech}
          technique={tech}
          levels={levels}
          selectedId={selectedId}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}

function CellRow({
  technique,
  levels,
  selectedId,
  onSelect,
}: {
  technique: string;
  levels: Map<string, 'live' | 'tuning' | 'planned'>;
  selectedId: string;
  onSelect: (technique: string) => void;
}) {
  return (
    <>
      <span className="flex items-center pr-1 font-mono text-xs text-ot-muted">{technique}</span>
      {TACTICS.map((tactic) => {
        const key = `${tactic}\n${technique}`;
        const level = levels.get(key) ?? null;
        const picked = selectedId === technique;
        if (!level) {
          return (
            <span
              key={key}
              aria-hidden
              className="aspect-square w-full rounded-ot-sm"
              style={{ background: 'var(--ot-surface-2)' }}
            />
          );
        }
        return (
          <button
            key={key}
            type="button"
            title={`${technique} in ${tactic}: ${level}`}
            aria-label={`${technique}, ${tactic}, ${level}`}
            onClick={() => onSelect(technique)}
            className="aspect-square w-full cursor-pointer rounded-ot-sm transition-transform hover:scale-[1.04]"
            style={{
              background: FILL[level],
              boxShadow: picked
                ? '0 0 0 2px var(--ot-bg), 0 0 0 4px var(--ot-navy)'
                : undefined,
            }}
          />
        );
      })}
    </>
  );
}
