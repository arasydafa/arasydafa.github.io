import { useRef, useState } from 'react';

const HELP = [
  'whoami: the operator',
  'hire: why you should',
  'contact: where to reach',
  'clear: wipe this terminal',
];

const ANSWERS: Record<string, string[]> = {
  whoami: ['Arasy Dafa Sulistya Kurniawan, SOC Engineer at Zentara.'],
  hire: [
    'High fidelity detections. Low false positives. Zero drama.',
    'Email arasy.dafa@gmail.com.',
  ],
  contact: ['arasy.dafa@gmail.com. LinkedIn in/arasydafa.'],
};

interface Line {
  id: number;
  kind: 'in' | 'out';
  text: string;
}

// Tiny footer terminal. Four commands, no backend.
export function FooterTerm() {
  const [lines, setLines] = useState<Line[]>([
    { id: 0, kind: 'out', text: 'Type help and press enter.' },
  ]);
  const [value, setValue] = useState('');
  const idRef = useRef(1);
  const boxRef = useRef<HTMLDivElement>(null);

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    const next: Line[] = [...lines, { id: idRef.current++, kind: 'in', text: `visitor@portfolio:~$ ${raw}` }];
    if (cmd === 'clear') {
      setLines([]);
    } else if (cmd === 'help') {
      HELP.forEach((h) => next.push({ id: idRef.current++, kind: 'out', text: h }));
      setLines(next);
    } else if (ANSWERS[cmd]) {
      ANSWERS[cmd].forEach((a) => next.push({ id: idRef.current++, kind: 'out', text: a }));
      setLines(next);
    } else if (cmd !== '') {
      next.push({ id: idRef.current++, kind: 'out', text: `command not found: ${cmd}. Try help.` });
      setLines(next);
    }
    setValue('');
    requestAnimationFrame(() => {
      boxRef.current?.scrollTo({ top: boxRef.current.scrollHeight });
    });
  };

  return (
    <div className="overflow-hidden rounded-ot-md border border-ot-border bg-ot-bg">
      <div className="border-b border-ot-border bg-ot-surface px-3 py-1.5 font-mono text-xs text-ot-muted">
        guest-terminal
      </div>
      <div ref={boxRef} className="h-36 overflow-y-auto p-3 font-mono text-[13px] leading-6">
        {lines.map((l) =>
          l.kind === 'in' ? (
            <p key={l.id} className="text-navy-text">
              {l.text}
            </p>
          ) : (
            <p key={l.id} className="text-ot-muted">
              {l.text}
            </p>
          ),
        )}
      </div>
      <form
        className="flex items-center gap-2 border-t border-ot-border px-3 py-2"
        onSubmit={(e) => {
          e.preventDefault();
          run(value);
        }}
      >
        <span className="font-mono text-[13px] text-navy-text">visitor@portfolio:~$</span>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          aria-label="Terminal command"
          placeholder="help"
          autoComplete="off"
          spellCheck={false}
          className="w-full bg-transparent font-mono text-[13px] text-ot-text outline-none placeholder:text-ot-muted"
        />
      </form>
    </div>
  );
}
