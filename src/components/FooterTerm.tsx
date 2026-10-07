import { useRef, useState } from 'react';
import pkg from '../../package.json';

const PKG_VERSION = pkg.version;

const HELP: [string, string][] = [
  ['WHOAMI', 'The operator'],
  ['HIRE', 'Why you should'],
  ['CONTACT', 'Where to reach'],
  ['PING', 'Latency to this site'],
  ['THEME', 'Flip light and dark'],
  ['VER', 'Site version'],
  ['HACK', 'Do not'],
  ['CLEAR', 'Wipe this terminal'],
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
    const say = (text: string) =>
      setLines((prev) => [...prev, { id: idRef.current++, kind: 'out', text }]);
    const echo = () =>
      setLines((prev) => [...prev, { id: idRef.current++, kind: 'in', text: `visitor@portfolio:~$ ${raw}` }]);

    if (cmd === 'clear') {
      setLines([]);
      setValue('');
      return;
    }
    echo();

    if (cmd === 'help') {
      say('Type a command name. Available commands:');
      HELP.forEach(([c, d]) => say(`${c.padEnd(10)}${d}`));
    } else if (cmd === 'hack') {
      [
        'scanning 203.0.113.10 ... port 22 open',
        'brute forcing ... 41 tries, all failed',
        'bypassing firewall ... denied by common sense',
        'just kidding. Real hacking is illegal. Try hire instead.',
      ].forEach((s, i) => setTimeout(() => say(s), 350 * (i + 1)));
    } else if (cmd.startsWith('rm')) {
      say('nope.');
    } else if (cmd.startsWith('sudo')) {
      say('nice try.');
    } else if (cmd === 'ping') {
      const t0 = performance.now();
      fetch('/favicon.svg', { cache: 'no-store' })
        .then(() => say(`pong in ${Math.round(performance.now() - t0)}ms. The server lives.`))
        .catch(() => say('request timed out. Blame the wifi.'));
    } else if (cmd === 'theme') {
      window.dispatchEvent(new CustomEvent('ot-toggle-theme'));
      say('theme flipped. Check the header icon too.');
    } else if (cmd === 'ver') {
      say(`portfolio v${PKG_VERSION}. Changelog lives in the repo.`);
    } else if (ANSWERS[cmd]) {
      ANSWERS[cmd].forEach(say);
    } else if (cmd !== '') {
      say(`command not found: ${cmd}. Try help.`);
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
            <p key={l.id} className="whitespace-pre-wrap text-ot-muted">
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
        <span className="relative min-w-0 flex-1 font-mono text-[13px] leading-6">
          <span aria-hidden className="whitespace-pre text-ot-text">
            {value}
            <span className="animate-pulse text-navy-text">▌</span>
          </span>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            aria-label="Terminal command"
            placeholder="help"
            autoComplete="off"
            spellCheck={false}
            className="absolute inset-0 w-full bg-transparent font-mono text-[13px] leading-6 text-transparent caret-transparent outline-none"
          />
        </span>
      </form>
    </div>
  );
}
