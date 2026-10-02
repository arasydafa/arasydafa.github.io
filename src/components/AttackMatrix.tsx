import { useState } from 'react';
import { Badge } from '@omega-os/ui';
import { Heatmap } from '@omega-os/ui';

type Status = 'Live' | 'Tuning' | 'Planned';

interface TechniqueDetail {
  id: string;
  name: string;
  tactic: string;
  status: Status;
  coverage: string;
  example: string;
}

const DETAILS: TechniqueDetail[] = [
  {
    id: 'T1110',
    name: 'Brute Force',
    tactic: 'Credential Access',
    status: 'Live',
    coverage: 'SSH brute force with per IP per host thresholds and allowlisted admin ranges.',
    example: '44 failures in 5 minutes from one IP, then a success. Walk it live in the Casefile below.',
  },
  {
    id: 'T1489',
    name: 'Service Stop',
    tactic: 'Impact',
    status: 'Tuning',
    coverage: 'Docker stops and Kube restarts beyond baseline. Still separating deploy noise from kill waves.',
    example: '6 containers stopped in 40 seconds while CPU pins at max.',
  },
  {
    id: 'T1543',
    name: 'System Process',
    tactic: 'Persistence',
    status: 'Live',
    coverage: 'Service and cron creation outside package managers, tuned against config management.',
    example: 'A systemd unit that never existed plus a rogue cron entry in the same minute.',
  },
  {
    id: 'T1222',
    name: 'File Permissions',
    tactic: 'Defense Evasion',
    status: 'Live',
    coverage: 'FIM drift on watched paths with who-data on every change.',
    example: 'A fresh binary appears and its hash matches nothing known.',
  },
  {
    id: 'T1070',
    name: 'Indicator Removal',
    tactic: 'Defense Evasion',
    status: 'Tuning',
    coverage: 'Log gaps and truncation. Distinguishing rotation from tampering.',
    example: 'auth.log zeroed to the byte with 11 minutes of telemetry missing.',
  },
  {
    id: 'T1213',
    name: 'Info Repositories',
    tactic: 'Collection',
    status: 'Tuning',
    coverage: 'Unusual CRUD volume on sensitive tables outside migration windows.',
    example: 'Read bursts on tables that normally see a trickle.',
  },
  {
    id: 'T1553',
    name: 'Subvert Trust',
    tactic: 'Defense Evasion',
    status: 'Tuning',
    coverage: 'Anomalous issuance and revocation at the CA, correlated with requester identity.',
    example: 'A cert issued at 3 AM for a name nobody requested.',
  },
  {
    id: 'T1059',
    name: 'Command Execution',
    tactic: 'Execution',
    status: 'Planned',
    coverage: 'Suspicious shells and encoded commands. Next rule family on the list.',
    example: 'Planned. Tell me if this one should move up or out.',
  },
];

const VALUE: Record<Status, number> = { Live: 100, Tuning: 55, Planned: 20 };

const TONE: Record<Status, 'success' | 'info' | 'navy'> = {
  Live: 'success',
  Tuning: 'info',
  Planned: 'navy',
};

// Clickable coverage matrix. Statuses, not fake precision scores.
export function AttackMatrix() {
  const [selectedId, setSelectedId] = useState('T1110');
  const selected = DETAILS.find((d) => d.id === selectedId) ?? DETAILS[0];

  return (
    <div>
      <p className="mb-3 text-sm text-ot-muted">
        What I actually detect, mapped against MITRE ATT&CK v19. Click a cell for
        the story behind it.
      </p>
      <div className="grid max-w-5xl gap-6 md:grid-cols-[1fr_280px]">
        <div className="max-w-xl">
          <Heatmap
            label="Detection coverage by tactic"
            xLabels={['Credential Access', 'Execution', 'Persistence', 'Defense Evasion', 'Collection', 'Impact']}
            yLabels={DETAILS.map((d) => d.id)}
            data={DETAILS.map((d) => ({ x: d.tactic, y: d.id, value: VALUE[d.status] }))}
            onSelect={(cell) => setSelectedId(cell.y)}
          />
        </div>
        <div className="grid content-start gap-4">
          <ul className="grid content-start gap-1 font-mono text-xs leading-relaxed text-ot-muted">
            {DETAILS.map((d) => (
              <li key={d.id}>
                <button
                  type="button"
                  onClick={() => setSelectedId(d.id)}
                  className={`w-full rounded-ot-sm px-1 py-0.5 text-left transition-colors ${
                    d.id === selectedId ? 'bg-navy-bg text-navy-text' : 'hover:bg-ot-surface'
                  }`}
                >
                  <span className="text-ot-text">
                    {d.id} {d.tactic} {d.name}
                  </span>
                </button>
              </li>
            ))}
          </ul>
          <div
            key={selected.id}
            className="case-swap rounded-ot-md border border-ot-border bg-ot-bg p-4"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-base font-bold">{selected.id}</span>
              <Badge tone={TONE[selected.status]}>{selected.status}</Badge>
            </div>
            <p className="mt-2 text-[13px] leading-relaxed">{selected.coverage}</p>
            <p className="mt-1 font-mono text-xs leading-relaxed text-ot-muted">{selected.example}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
