import { useState } from 'react';
import { Alert, Badge, Button, CodeBlock, LogViewer } from '@omega-os/ui';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CASE_STEPS } from '../data/placeholder';

// Five stage intrusion: access, persistence, evasion, impact, response.
// Logs accumulate as the case unfolds. All sample data written fresh.
export function DetectionLab({ step, onStep }: { step: number; onStep: (n: number) => void }) {
  const current = CASE_STEPS[step];
  const shown = CASE_STEPS.slice(0, step + 1).flatMap((s) => s.logs);

  return (
    <div className="grid gap-3">
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
      <p className="text-sm text-ot-muted">
        Stage {step + 1} of {CASE_STEPS.length}: {current.title}. A cryptojacker
        pattern built from the TTPs I watch daily. Sample data, written fresh.
      </p>
      <div className="grid gap-3 md:grid-cols-2">
        <LogViewer lines={shown} />
        <CodeBlock language={current.ruleLang} code={current.rule} maxHeight={320} />
      </div>
      <Alert tone={current.alertTone} title={current.alertTitle}>
        {current.alertText}
      </Alert>
    </div>
  );
}
