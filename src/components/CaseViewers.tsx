import { useEffect, useState } from 'react';
import { CopyButton, useToast } from '@omega-os/ui';

type Level = 'debug' | 'info' | 'success' | 'warn' | 'error';

const LEVEL_COLOR: Record<Level, string> = {
  debug: 'text-ot-muted',
  info: 'text-ot-text',
  success: 'text-success',
  warn: 'text-warning',
  error: 'text-danger',
};

function isKey(text: string, keys: string[]) {
  const lower = text.toLowerCase();
  return keys.some((k) => lower.includes(k.toLowerCase()));
}

// Analyst note typed out like a terminal. Static when reduced motion is on.
export function TypeNote({ text }: { text: string }) {
  const [n, setN] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setN(text.length);
      return;
    }
    setN(0);
    const id = setInterval(() => {
      setN((v) => {
        if (v >= text.length) {
          clearInterval(id);
          return v;
        }
        return v + 1;
      });
    }, 18);
    return () => clearInterval(id);
  }, [text]);

  const done = n >= text.length;
  return (
    <span>
      {text.slice(0, n)}
      {!done && (
        <span className="animate-pulse" aria-hidden>
          ▌
        </span>
      )}
    </span>
  );
}

// Static case log. Fresh rows cascade in one by one, key rows highlighted.
// Click a row to copy it for discussion.
export function CaseLogs({
  lines,
  keys,
  freshIds,
}: {
  lines: { id: string; level: Level; time: string; text: string }[];
  keys: string[];
  freshIds: string[];
}) {
  const toast = useToast();

  const copyRow = (l: { level: Level; time: string; text: string }) => {
    navigator.clipboard?.writeText(`[${l.time}] ${l.level.toUpperCase()} ${l.text}`);
    toast.show('success', 'Log line copied.', { title: 'CASE.LOG' });
  };

  return (
    <div className="overflow-hidden rounded-ot-md border border-ot-border bg-ot-bg">
      <div className="border-b border-ot-border bg-ot-surface px-3 py-1.5 font-mono text-xs text-ot-muted">
        case.log · {lines.length} lines · click a line to copy
      </div>
      <div
        data-cross=""
        className="grid gap-0.5 p-3 font-mono text-[13px] leading-6 [@media(pointer:fine)]:cursor-none [&_button]:cursor-none [&_a]:cursor-none"
      >
        {lines.map((l, i) => {
          const hot = isKey(l.text, keys);
          const fresh = freshIds.includes(l.id);
          return (
            <button
              key={l.id}
              type="button"
              onClick={() => copyRow(l)}
              title="Click to copy this line"
              style={fresh ? { animationDelay: `${Math.min(i * 55, 550)}ms` } : undefined}
              className={`whitespace-pre-wrap break-all rounded-ot-sm px-2 py-0.5 text-left transition-colors hover:bg-ot-surface ${
                fresh ? 'case-row' : ''
              } ${hot ? 'bg-warning-bg hover:bg-warning-bg' : 'opacity-55 hover:opacity-100'}`}
            >
              <span className="text-ot-muted">[{l.time}] </span>
              <span className={`mr-2 font-semibold ${LEVEL_COLOR[l.level]}`}>
                {l.level.toUpperCase()}
              </span>
              <span className={LEVEL_COLOR[l.level]}>{l.text}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// Static rule block with the same highlighter treatment.
export function CaseRule({
  language,
  code,
  keys,
}: {
  language: string;
  code: string;
  keys: string[];
}) {
  const rows = code.replace(/\n$/, '').split('\n');
  return (
    <div className="overflow-hidden rounded-ot-md border border-ot-border bg-ot-bg">
      <div className="flex items-center gap-2 border-b border-ot-border bg-ot-surface px-3 py-1.5">
        <span className="min-w-0 flex-1 font-mono text-xs text-ot-muted">{language}</span>
        <CopyButton text={code} />
      </div>
      <pre
        data-cross=""
        className="overflow-x-auto p-3 font-mono text-[13px] leading-6 [@media(pointer:fine)]:cursor-none [&_button]:cursor-none [&_a]:cursor-none"
      >
        <code className="block min-w-max">
          {rows.map((row, i) => {
            const hot = isKey(row, keys);
            return (
              <span
                key={i}
                style={{ animationDelay: `${Math.min(i * 40, 480)}ms` }}
                className={`case-row block whitespace-pre rounded-ot-sm px-2 ${
                  hot ? 'bg-warning-bg text-ot-text' : 'opacity-55'
                }`}
              >
                {row === '' ? ' ' : row}
              </span>
            );
          })}
        </code>
      </pre>
    </div>
  );
}
