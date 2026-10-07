// Real content from CV. Detection-lab sample log + rule stay illustrative.
export const PROFILE = {
  name: 'Arasy Dafa Sulistya Kurniawan',
  handle: 'arasydafa',
  role: 'SOC Engineer at Zentara',
  location: 'Tangerang, ID (UTC+7)',
  org: 'Zentara',
  phone: '+62 878 4651 2424',
  github: 'https://github.com/arasydafa',
  linkedin: 'https://www.linkedin.com/in/arasydafa/',
  medium: 'https://medium.com/@arasydafa',
  email: 'arasy.dafa@gmail.com',
  openToWork: false,
};

export const ABOUT_SUMMARY = `SOC Engineer turning threat intel into high-fidelity detections. I map adversary behavior with Sigma, YARA and MITRE ATT&CK so threats get caught fast.`;

export const EDUCATION = [
  {
    id: 'edu-1',
    school: 'Politeknik Elektronika Negeri Surabaya',
    degree: "Bachelor's, Telecommunications Engineering, GPA 3.76/4.00",
    meta: '2023 – 2025 · Capstone in Cryptography · 1 IEEE journal (Object Detection & Classification)',
  },
  {
    id: 'edu-2',
    school: 'Politeknik Elektronika Negeri Surabaya',
    degree: "Associate's, Telecommunications Engineering, GPA 3.53/4.00",
    meta: '2019 – 2022 · Capstone in Artificial Intelligence · 1 IEEE journal (Object Detection & Classification)',
  },
];

export const EXPERIENCE = [
  {
    id: 'exp-zentara',
    time: 'Jul 2026 to Present · Tangerang',
    company: 'Zentara',
    role: 'SOC Engineer',
    description:
      'Honeypots, honeynets and honeytokens for adversary TTP collection. TI platforms wired into the SIEM for automated correlation. Sigma, YARA and correlation rules tuned for low false positives. CTI operations plus tech lead for the CTF run by Zentara.',
  },
  {
    id: 'exp-bayarind',
    time: 'Oct 2025 to Jun 2026 · Jakarta',
    company: 'Bayarind',
    role: 'Senior Security Engineer',
    description:
      'Greenfield SIEM rollout from requirements to production. Daily detection, investigation and response. Cloud hardening with Alibaba Cloud Security Center for posture management.',
  },
  {
    id: 'exp-idtrust',
    time: 'Aug 2024 to Oct 2025 · Jakarta',
    company: 'idtrust.id',
    role: 'IT Security Officer',
    description:
      'Built and ran SOC platforms across SIEM, SOAR and CTI. Threat hunting and incident response. SIEM tuning to kill alert fatigue. Vulnerability and endpoint security programs.',
  },
  {
    id: 'exp-mentor',
    time: 'Apr 2025 to Present · Remote',
    company: 'dibimbing.id',
    role: 'Cyber Security Mentor',
    description:
      'Curriculum aligned to NIST and MITRE ATT&CK. Hands-on lab environments. Live troubleshooting and platform reliability for learners.',
  },
  {
    id: 'exp-wazuh',
    time: 'May 2025 to Mar 2026 · Remote',
    company: 'Wazuh',
    role: 'Ambassador',
    description:
      'Technical blogs and hands-on guides from install to threat detection. Open-source security advocacy for practitioners.',
  },
];

export const SKILL_GROUPS = [
  {
    id: 'g1',
    title: 'Detection & response',
    desc: 'Security operations, hunting, and analysis.',
    items: ['Wazuh', 'ELK Stack', 'Sigma', 'YARA', 'Suricata', 'Wireshark', 'OpenCTI', 'MISP', 'Honeypots', 'Honeytokens'],
  },
  {
    id: 'g2',
    title: 'Cloud & infrastructure',
    desc: 'Posture management across clouds and containers.',
    items: ['Alibaba Cloud', 'AWS', 'GCP', 'Cloudflare', 'ZTNA', 'Docker', 'Kubernetes', 'Linux (Ubuntu, Kali)'],
  },
  {
    id: 'g6',
    title: 'Telemetry pipeline',
    desc: 'Ship, buffer, store, and keep it searchable.',
    items: ['OpenSearch', 'Vector', 'Redis', 'PostgreSQL', 'Log forwarding', 'Ingestion pipelines', 'Index policies', 'Snapshots'],
  },
  {
    id: 'g3',
    title: 'Automation',
    desc: 'Pipelines and infra-as-code for security work.',
    items: ['Python', 'Go', 'JavaScript', 'Bash', 'Ansible', 'Terraform'],
  },
  {
    id: 'g4',
    title: 'Exposure & endpoints',
    desc: 'Finding and closing gaps before attackers do.',
    items: ['OpenVAS', 'Cylance', 'Acronis', 'FIM', 'Vulnerability Management', 'Security Assessments'],
  },
  {
    id: 'g5',
    title: 'Governance',
    desc: 'Controls, compliance, and least privilege.',
    items: ['IAM', 'PAM', 'Least Privilege', 'ISO 27001', 'PCI-DSS', 'Risk & Governance'],
  },
];

export const CHALLENGE_WORK = [
  {
    id: 'ch-tcp1p',
    name: 'TCP1P CTF 2023',
    meta: 'Problem Setter · 2023',
    url: 'https://github.com/TCP1P/TCP1P-CTF-2023-Challenges',
  },
  {
    id: 'ch-olivia',
    name: 'OLIVIA 2026',
    meta: 'Problem Setter, CTF Judge and Infra · UNESA · 2026',
    url: 'https://olivia.unesa.ac.id/',
  },
  {
    id: 'ch-tryhards',
    name: 'TryHards',
    meta: 'Problem Setter · tryhards.community',
    url: 'https://tryhards.community',
  },
];

export const SUBJECTS = [
  'Linux Fundamental',
  'Kali Linux Basics and Operations',
  'System and Server Management in Kali',
  'Security Governance and Compliance',
  'Identifying Vulnerabilities',
  'Vulnerable and Outdated Components',
  'Security Misconfiguration',
  'Software and Data Integrity Failures',
  'Intro to Security Analyst Role',
  'Log Collection and SIEM Monitoring',
  'Threat Detection and Behavioral Analytics',
  'Server and Network Security',
  'Network Traffic Analysis for Detection',
  'Endpoint Security and Log Analysis',
  'Threat Detection with NIDS',
  'Incident Response',
  'Digital Forensics',
  'Python Fundamental',
  'Identity and Access Management',
  'Network Security Architecture',
  'Security Architecture and Threat Modeling',
  'Security Automation',
  'Cloud Security Best Practices',
];

export const TEACH_TOOLS = [
  'Kali Linux',
  'Nmap',
  'Nikto',
  'Metasploit',
  'Burp Suite',
  'Wireshark',
  'OWASP Dependency-Check',
  'GCP',
  'Snyk',
  'Wazuh',
  'AWS',
  'Ansible',
];

export const SPEAKING = [
  {
    id: 'sp-mikroskil',
    event: 'Universitas Mikroskil Medan',
    meta: 'Guest Lecture · Blue Team Report Writing',
  },
  {
    id: 'sp-ionic',
    event: 'IONIC 2026',
    meta: 'Webinar · Cloud Security',
  },
  {
    id: 'sp-ocbc',
    event: 'OCBC Digital Youth Program 2026',
    meta: 'Speaker · Cyber Security',
  },
];

export const PUBLICATIONS = [
  {
    id: 'pub-1',
    title: 'Comparative Analysis and Optimization of Deep Learning Models for Object Detection Using Grid Search Hyperparameter Tuning',
    venue: '2024 International Electronics Symposium (IES)',
    date: 'Sep 12, 2024',
    url: 'https://ieeexplore.ieee.org/document/10665797',
    abstract:
      'This study compares three deep learning models for object detection, YOLOv8, MobileNetV2, and MobileNetV2 FPNLite, optimizing each with grid search hyperparameter tuning. YOLOv8 with SGD optimizer and batch size 16 reached 0.966 accuracy with 0.92 F1-Score. MobileNetV2 FPNLite with SGD and batch size 8 reached 0.974 accuracy with 0.868 F1-Score. Results show each model performs best under its own optimized configuration.',
  },
  {
    id: 'pub-2',
    title: 'Automatic Vehicle Classification and Counting System Using Inception Model',
    venue: '2022 14th International Conference on Information Technology and Electrical Engineering (ICITEE)',
    date: 'Nov 23, 2022',
    url: 'https://ieeexplore.ieee.org/document/9954089',
    abstract:
      'Manual vehicle counting on congested roads is slow and error prone, so this study automates it with a CNN classifier built on a pre-trained Inception model. At a 0.4 score threshold the system reached 70.75% true positives while running at 5 FPS during inference.',
  },
];

export type CertStatus = 'In progress' | 'Planned' | 'Expired';

export interface Cert {
  id: string;
  name: string;
  issuer: string;
  status: CertStatus;
  credentialId?: string;
}

export const CERTS: Cert[] = [
  { id: 'c-cnsp', name: 'Certified Network Security Practitioner (CNSP)', issuer: 'SecOps Group', status: 'In progress' },
  { id: 'c-cbt', name: 'Certified Blue Teamer (CBTeamer)', issuer: 'SecOps Group', status: 'In progress' },
  { id: 'c-csedp', name: 'Certified Social Engineering Defense Practitioner (CSEDP)', issuer: 'SecOps Group', status: 'In progress' },
  { id: 'c-hcia-ai', name: 'HCIA Artificial Intelligence', issuer: 'Huawei', status: 'Expired', credentialId: '010102001397808455051268777' },
  { id: 'c-hcia-cloud', name: 'HCIA Cloud Computing', issuer: 'Huawei', status: 'Expired', credentialId: '010100802397808454971267561' },
  { id: 'c-secplus', name: 'CompTIA Security+', issuer: 'CompTIA', status: 'Planned' },
  { id: 'c-sc200', name: 'Security Operations Analyst Associate (SC-200)', issuer: 'Microsoft', status: 'Planned' },
  { id: 'c-btl1', name: 'Blue Team Level 1 (BTL1)', issuer: 'Security Blue Team', status: 'Planned' },
];

export const COURSES = [
  { id: 'cs-cyberops', name: 'CyberOps Associate', issuer: 'Cisco', url: 'https://www.credly.com/earner/earned/badge/3d05e6ea-9c87-41ad-9b4d-3c242f50e6d4' },
  { id: 'cs-essentials', name: 'Cybersecurity Essentials', issuer: 'Cisco', url: 'https://www.credly.com/earner/earned/badge/fc1ab135-c0f2-4f5b-b5e6-0e1f5008c8ec' },
];

export const PROJECTS = [
  {
    id: 'vstack',
    name: 'vstack',
    desc: 'Binary exploitation learning platform. Visualize ROP chains before running them.',
    lang: 'TypeScript',
    topics: ['binary-exploitation', 'educational-project'],
    url: 'https://github.com/arasydafa/vstack',
  },
  {
    id: 'cicd-lab',
    name: 'ci-cd-security-lab',
    desc: 'Interactive learning platform for CI/CD pipeline security.',
    lang: 'TypeScript',
    topics: ['ci-cd', 'educational-project'],
    url: 'https://github.com/arasydafa/ci-cd-security-lab',
  },
  {
    id: 'rulevis',
    name: 'rulevis',
    desc: 'Fork of zbalkan/rulevis with Docker packaging. Turns a Wazuh ruleset into an interactive force-directed graph.',
    lang: 'JavaScript',
    topics: ['wazuh', 'detection-engineering'],
    url: 'https://github.com/arasydafa/rulevis',
  },
  {
    id: 'dtn-crypto',
    name: 'dtn-crypto',
    desc: 'Delay Tolerant Network simulator with CP-ABE cryptography (PENS cryptography capstone lineage).',
    lang: 'Python',
    topics: ['cryptography', 'cpabe'],
    url: 'https://github.com/arasydafa/dtn-crypto',
  },
];

export const WRITEUPS = [
  {
    id: 'w1',
    title: 'File Integrity Monitoring Best Practices with Wazuh: A Theoretical Perspective',
    meta: 'Medium · Nov 2025 · FIM, Wazuh',
    url: 'https://medium.com/@arasydafa/file-integrity-monitoring-best-practices-with-wazuh-a-theoretical-perspective-b74fe577f1f7',
  },
  {
    id: 'w2',
    title: 'How Wazuh Processes Logs: From Decoder to Rule Matching, Part 2',
    meta: 'Medium · Oct 2025 · Detection Engineering',
    url: 'https://medium.com/@arasydafa/how-wazuh-processes-logs-from-decoder-to-rule-matching-part-2-f971a9a750ec',
  },
  {
    id: 'w3',
    title: 'How Wazuh Processes Logs: From Decoder to Rule Matching, Part 1',
    meta: 'Medium · Jul 2025 · Detection Engineering',
    url: 'https://medium.com/@arasydafa/how-wazuh-processes-logs-from-decoder-to-rule-matching-6c40d4dc1b21',
  },
];

export interface CaseStep {
  id: string;
  title: string;
  technique: string;
  techniqueWhy: string;
  note: string;
  keyLogs: string[];
  keyRule: string[];
  logs: { id: string; level: 'info' | 'warn' | 'error' | 'success'; time: string; text: string }[];
  ruleLang: string;
  rule: string;
  alertTone: 'info' | 'warning' | 'success' | 'danger';
  alertTitle: string;
  alertText: string;
}

// Five stage intrusion written fresh for this portfolio. IPs use RFC5737
// documentation space. Nothing here comes from employer infrastructure.
export const CASE_STEPS: CaseStep[] = [
  {
    id: 's1',
    title: 'Initial access',
    technique: 'T1110',
    techniqueWhy: 'T1110 Brute Force means guessing passwords over and over until one works.',
    note: 'Watch the count, not the failures. 42 tries in 5 minutes from one IP, then a success. That success is the whole case.',
    keyLogs: ['42 tries', 'Accepted password'],
    keyRule: ['count(SourceIp)', 'attack.t1110'],
    logs: [
      { id: 'l1', level: 'info', time: '10:01', text: 'sshd[412]: Connection from 203.0.113.10 (sample log)' },
      { id: 'l2', level: 'warn', time: '10:02', text: 'sshd[412]: Failed password for invalid user admin from 203.0.113.10' },
      { id: 'l3', level: 'error', time: '10:06', text: 'sshd[412]: Accepted password for admin from 203.0.113.10 after 42 tries' },
    ],
    ruleLang: 'sigma',
    rule: `title: SSH brute force followed by success
status: experimental
logsource:
  product: linux
  service: sshd
detection:
  bruteforce:
    EventType: 'failed-password'
  timeframe: 5m
  condition: bruteforce | count(SourceIp) by TargetHost > 10
level: high
falsepositives:
  - Admin typos and config management retries
tags:
  - attack.credential-access
  - attack.t1110`,
    alertTone: 'warning',
    alertTitle: 'Foothold likely.',
    alertText: 'Brute force succeeded. Assume the host is owned and hunt forward, not back.',
  },
  {
    id: 's2',
    title: 'Persistence',
    technique: 'T1053.003',
    techniqueWhy: 'T1053.003 Cron means abusing the system scheduler so malware reruns itself.',
    note: 'Cron written outside the package manager plus a service that never existed. Two footholds in the same minute.',
    keyLogs: ['cron.d', 'miner.service'],
    keyRule: ['TargetFilename', 'attack.t1053'],
    logs: [
      { id: 'l4', level: 'warn', time: '10:09', text: 'cron: new entry in /etc/cron.d/ written by uid 0 outside package manager' },
      { id: 'l5', level: 'warn', time: '10:09', text: 'systemd[1]: Started rogue miner service (miner.service)' },
      { id: 'l6', level: 'error', time: '10:10', text: 'fim: checksum drift on /usr/local/bin/kdevtmpfsi, first seen binary' },
    ],
    ruleLang: 'sigma',
    rule: `title: Suspicious cron persistence on Linux host
status: experimental
logsource:
  product: linux
  category: file_event
detection:
  selection:
    TargetFilename|contains: '/etc/cron'
  filter:
    Image|contains: 'apt'
  condition: selection and not filter
level: medium
tags:
  - attack.persistence
  - attack.t1053.003`,
    alertTone: 'warning',
    alertTitle: 'Persistence planted.',
    alertText: 'Cron plus a systemd service plus a fresh binary. The actor plans to stay.',
  },
  {
    id: 's3',
    title: 'Defense evasion',
    technique: 'T1070',
    techniqueWhy: 'T1070 Indicator Removal means deleting logs to blind defenders.',
    note: 'Auth log zeroed and 11 minutes of telemetry gone. From here every timestamp is hostile.',
    keyLogs: ['zero bytes', 'missing'],
    keyRule: ['truncate', 'attack.t1070'],
    logs: [
      { id: 'l7', level: 'warn', time: '10:14', text: 'auditd: /var/log/auth.log truncated to zero bytes by uid 0' },
      { id: 'l8', level: 'warn', time: '10:14', text: 'auditd: history file of admin account cleared in same minute' },
      { id: 'l9', level: 'error', time: '10:15', text: 'wazuh-agent: log gap detected, 11 minutes of telemetry missing' },
    ],
    ruleLang: 'sigma',
    rule: `title: Linux auth log truncated
status: experimental
logsource:
  product: linux
  service: auditd
detection:
  selection:
    Syscall: 'truncate'
    TargetFile: '/var/log/auth.log'
  condition: selection
level: high
tags:
  - attack.defense-evasion
  - attack.t1070`,
    alertTone: 'danger',
    alertTitle: 'Going blind.',
    alertText: 'Truncated logs plus a telemetry gap. Treat every later timestamp as hostile until proven otherwise.',
  },
  {
    id: 's4',
    title: 'Impact',
    technique: 'T1489',
    techniqueWhy: 'T1489 Service Stop means killing workloads to steal their resources.',
    note: 'Six containers killed in 40 seconds while CPU pins at max. The miner is clearing the room for itself.',
    keyLogs: ['kill signal', '100 percent'],
    keyRule: ['count(ContainerId)', 'attack.t1489'],
    logs: [
      { id: 'l10', level: 'warn', time: '10:21', text: 'dockerd: container web-1 received kill signal from host shell' },
      { id: 'l11', level: 'warn', time: '10:21', text: 'dockerd: container db-1 received kill signal from host shell' },
      { id: 'l12', level: 'error', time: '10:22', text: 'dockerd: 6 containers stopped in 40 seconds, CPU pinned at 100 percent' },
    ],
    ruleLang: 'sigma',
    rule: `title: Container kill wave from host shell
status: experimental
logsource:
  product: docker
  service: dockerd
detection:
  selection:
    Action: 'kill'
  timeframe: 2m
  condition: selection | count(ContainerId) > 3
level: high
tags:
  - attack.impact
  - attack.t1489`,
    alertTone: 'danger',
    alertTitle: 'Payload running.',
    alertText: 'Rival workloads killed and CPU maxed. Classic miner behavior after a quiet foothold.',
  },
  {
    id: 's5',
    title: 'Respond and contain',
    technique: 'IR',
    techniqueWhy: 'IR means containment before eradication, evidence before rebuild.',
    note: 'Block, isolate, rotate, rebuild. Order matters and evidence comes first.',
    keyLogs: ['blocked', 'closed'],
    keyRule: ['DROP', 'rebuild'],
    logs: [
      { id: 'l13', level: 'info', time: '10:30', text: 'soar: 203.0.113.10 blocked at edge firewall' },
      { id: 'l14', level: 'info', time: '10:31', text: 'soar: host isolated from production network, snapshot taken' },
      { id: 'l15', level: 'success', time: '10:35', text: 'soc: credentials rotated, cron and service removed, ticket SOC-2481 closed' },
    ],
    ruleLang: 'bash',
    rule: `iptables -A INPUT -s 203.0.113.10 -j DROP
systemctl stop miner.service
rm /etc/cron.d/evil
passwd admin
echo "rotate keys, rebuild from snapshot"`,
    alertTone: 'success',
    alertTitle: 'Contained.',
    alertText: 'Block, isolate, rotate, rebuild. The case above is a fresh sample written for this page.',
  },
];

