import { Heatmap } from '@omega-os/ui';

// Tactic columns, technique rows. Only columns with data stay.
export function AttackMatrix() {
  return (
    <div>
      <p className="mb-3 text-sm text-ot-muted">
        What I actually detect, mapped against MITRE ATT&CK v19. Values are rule
        maturity, not vendor slides.
      </p>
      <div className="grid max-w-4xl gap-6 md:grid-cols-[1fr_220px]">
        <div className="max-w-xl">
          <Heatmap
            label="Detection coverage by tactic"
            xLabels={['Credential Access', 'Persistence', 'Defense Evasion', 'Collection', 'Impact']}
            yLabels={['T1110', 'T1489', 'T1543', 'T1222', 'T1070', 'T1213', 'T1553']}
            data={[
              { x: 'Credential Access', y: 'T1110', value: 90 },
              { x: 'Impact', y: 'T1489', value: 75 },
              { x: 'Persistence', y: 'T1543', value: 85 },
              { x: 'Defense Evasion', y: 'T1222', value: 85 },
              { x: 'Defense Evasion', y: 'T1070', value: 70 },
              { x: 'Collection', y: 'T1213', value: 65 },
              { x: 'Defense Evasion', y: 'T1553', value: 60 },
            ]}
          />
        </div>
        <ul className="grid content-start gap-2 font-mono text-xs leading-relaxed text-ot-muted">
          {[
            ['T1110', 'SSH brute force'],
            ['T1489', 'Docker and Kube disruption'],
            ['T1543', 'Service start and restart'],
            ['T1222', 'FIM drift'],
            ['T1070', 'Log gaps'],
            ['T1213', 'Database CRUD'],
            ['T1553', 'CA issue and revoke'],
          ].map(([id, what]) => (
            <li key={id}>
              <span className="text-ot-text">{id}</span> {what}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
