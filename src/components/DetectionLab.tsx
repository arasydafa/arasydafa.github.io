import { useState } from 'react';
import { Alert, Badge, Button } from '@omega-os/ui';
import { ChevronLeft, ChevronRight, Highlighter } from 'lucide-react';
import { CASE_STEPS } from '../data/placeholder';
import { CaseLogs, CaseRule, TypeNote } from './CaseViewers';

// Five stage intrusion: access, persistence, evasion, impact, response.
// Each stage carries an analyst note, a plain language technique glossary,
// and highlighted key lines. All sample data written fresh.
export function DetectionLab({ step, onStep }: { step: number; onStep: (n: number) => void }) {
  const current = CASE_STEPS[step];
  const shown = CASE_STEPS.slice(0, step + 1).flatMap((s) => s.logs);
  const [cross, setCross] = useState<{ x: number; y: number; on: boolean } | null>(null);

  // Crosshair only appears inside the log and rule bodies, not on panel titles.
  // Position is kept while fading out so entering a panel never hard blinks.
  const onMove = (e: React.MouseEvent) => {
    const zone = (e.target as HTMLElement).closest('[data-cross]');
    const r = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    setCross((prev) => ({ x, y, on: Boolean(zone) }));
  };

  return (
    <div
      className="relative grid gap-3"
      onMouseMove={onMove}
      onMouseLeave={() => setCross(null)}
    >
      {cross ? (
        <div
          aria-hidden
          className={`pointer-events-none absolute z-10 hidden transition-opacity duration-150 [@media(pointer:fine)]:block ${
            cross.on ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ left: cross.x, top: cross.y }}
        >
          <span className="block h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-navy" />
          <span className="absolute left-1/2 top-1/2 block h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-navy" />
        </div>
      ) : null}
      <div className="flex flex-wrap items-center gap-2">
        <span className="flex gap-1.5">
          <Badge tone="navy">{current.technique}</Badge>
          <Badge tone="info">Sigma</Badge>
          <Badge tone="info">Wazuh rules</Badge>
        </span>
        <span className="ml-auto flex gap-2">
          <Button
            size="sm"
            variant="secondary"
            icon={<ChevronLeft size={15} />}
            disabled={step === 0}
            onClick={() => onStep(Math.max(0, step - 1))}
          >
            Prev
          </Button>
          <Button
            size="sm"
            variant="secondary"
            icon={<ChevronRight size={15} />}
            disabled={step === CASE_STEPS.length - 1}
            onClick={() => onStep(Math.min(CASE_STEPS.length - 1, step + 1))}
          >
            Next
          </Button>
        </span>
      </div>
      <div className="flex flex-wrap gap-1.5" aria-label="Case stages">
        {CASE_STEPS.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => onStep(i)}
            className={`rounded-full px-3 py-1 font-mono text-xs transition-colors ${
              i === step
                ? 'bg-navy-bg font-semibold text-navy-text'
                : 'text-ot-muted hover:bg-ot-surface hover:text-ot-text'
            }`}
          >
            {i + 1}. {s.title}
          </button>
        ))}
      </div>
      <p className="text-sm text-ot-muted">{current.techniqueWhy}</p>
      <div key={current.id} className="case-swap grid gap-3">
        <Alert tone="info" title="Analyst note." icon={<Highlighter size={18} aria-hidden />}>
          <TypeNote key={current.id} text={current.note} />
        </Alert>
        <CaseLogs lines={shown} keys={current.keyLogs} freshIds={current.logs.map((l) => l.id)} />
        <CaseRule language={current.ruleLang} code={current.rule} keys={current.keyRule} />
        <Alert tone={current.alertTone} title={current.alertTitle}>
          {current.alertText}
        </Alert>
      </div>
    </div>
  );
}
