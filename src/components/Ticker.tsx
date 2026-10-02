const ITEMS = [
  'WAZUH',
  'SIGMA',
  'YARA',
  'SURICATA',
  'MISP',
  'OPENCTI',
  'ELK STACK',
  'WIRESHARK',
  'T1059.001',
  'T1110',
  'T1078',
];

// Infinite ticker strip. Pure CSS, pauses for reduced motion.
export function Ticker() {
  const row = (hidden: boolean) => (
    <div className="flex shrink-0 items-center" aria-hidden={hidden}>
      {ITEMS.map((t) => (
        <span key={t} className="inline-flex items-center font-mono text-xs tracking-widest text-ot-muted">
          <span className="px-5">{t}</span>
          <span className="text-navy-text">·</span>
        </span>
      ))}
    </div>
  );

  return (
    <div className="w-full overflow-hidden border-y border-ot-border bg-ot-bg py-3">
      <div className="ticker-track flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
