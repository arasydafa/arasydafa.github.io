import { Fragment, useEffect, useRef, useState, type ReactNode } from 'react';
import {
  Badge,
  Button,
  CommandPalette,
  CopyButton,
  ToasterProvider,
  toggleThemeReveal,
  useToast,
} from '@omega-os/ui';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Award,
  BookOpen,
  Briefcase,
  FlaskConical,
  Github,
  GraduationCap,
  Layers,
  Linkedin,
  Mail,
  Moon,
  Newspaper,
  Search,
  Shield,
  Sun,
  Trophy,
  User,
  Wrench,
  Activity,
} from 'lucide-react';
import { AttackMatrix } from './components/AttackMatrix';
import { DetectionLab } from './components/DetectionLab';
import { DotRail } from './components/DotRail';
import { FooterTerm } from './components/FooterTerm';
import { KillChain } from './components/KillChain';
import { SessionGimmicks } from './components/SessionGimmicks';
import { KonamiEgg } from './components/KonamiEgg';
import { ProjectCard } from './components/ProjectCard';
import { Reveal } from './components/Reveal';
import { ScrollBuddy, ScrollProgress } from './components/ScrollBuddy';
import { TerminalHero } from './components/TerminalHero';
import { Ticker } from './components/Ticker';
import { ABOUT_SUMMARY, CERTS, CHALLENGE_WORK, COURSES, EXPERIENCE, PROFILE, PROJECTS, PUBLICATIONS, SKILL_GROUPS, SPEAKING, SUBJECTS, TEACH_TOOLS, WRITEUPS } from './data/placeholder';
import pkg from '../package.json';

const NAV = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'lab', label: 'Lab' },
  { id: 'contact', label: 'Contact' },
];

const ALL_SECTIONS = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Service Record' },
  { id: 'work', label: 'Fieldwork' },
  { id: 'skills', label: 'Arsenal' },
  { id: 'metrics', label: 'Signal' },
  { id: 'lab', label: 'Casefile' },
  { id: 'writeups', label: 'Dispatches' },
  { id: 'ctf', label: 'Challenge Work' },
  { id: 'classroom', label: 'Classroom' },
  { id: 'publications', label: 'Publications' },
  { id: 'certs', label: 'Credentials' },
  { id: 'contact', label: 'Contact' },
];

// Animated number — counts up on first scroll into view.
function CountUp({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          io.disconnect();
          const t0 = performance.now();
          const dur = 1200;
          const tick = (t: number) => {
            const p = Math.min(1, (t - t0) / dur);
            setVal(Math.round((1 - Math.pow(1 - p, 3)) * to));
            if (p < 1) raf = requestAnimationFrame(tick);
          };
          raf = requestAnimationFrame(tick);
        });
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to]);

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

function Eyebrow({ index, label, icon }: { index: string; label: string; icon: React.ReactNode }) {
  const toast = useToast();
  const id = ALL_SECTIONS[Number(index) - 1]?.id;

  const copyLink = () => {
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    navigator.clipboard?.writeText(url);
    toast.show('success', `Link to #${id} copied. Share the lab.`, { title: 'DEEP LINK' });
  };

  return (
    <p className="flex items-center gap-2 font-mono text-xs tracking-widest text-ot-muted">
      <span className="text-navy-text">{icon}</span>
      {index} / {label}
      {id ? (
        <button
          type="button"
          onClick={copyLink}
          title={`Copy link to #${id}`}
          aria-label={`Copy link to ${label}`}
          className="rounded-ot-sm px-1.5 py-0.5 text-navy-text opacity-40 transition-opacity hover:bg-ot-surface-2 hover:opacity-100 focus-visible:opacity-100"
        >
          #
        </button>
      ) : null}
    </p>
  );
}

// Start of the first SOC role. Drives the live days counter.
const SOC_START = Date.parse('2024-08-01');

function daysInSoc() {
  return Math.floor((Date.now() - SOC_START) / 86_400_000);
}

// Copy email with the phishing joke. Lives under ToasterProvider.
function EmailCopy() {
  const toast = useToast();
  return (
    <CopyButton
      text={PROFILE.email}
      className="!text-white/70 hover:!bg-white/10 hover:!text-white"
      onCopy={() => toast.show('info', 'Copied. No phishing involved.', { title: 'CLIPBOARD' })}
    />
  );
}

// Live WIB clock. Click toggles UTC, threat intel lives there.
function WibClock() {
  const [now, setNow] = useState('');
  const [utc, setUtc] = useState(false);

  useEffect(() => {
    const tick = () =>
      setNow(
        new Date().toLocaleTimeString('en-GB', {
          timeZone: utc ? 'UTC' : 'Asia/Jakarta',
          hour12: false,
        }),
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [utc]);

  return (
    <button
      type="button"
      onClick={() => setUtc((v) => !v)}
      title="Toggle WIB and UTC"
      className="transition-colors hover:text-ot-text"
    >
      SOC TIME {now} {utc ? 'UTC' : 'WIB'}
    </button>
  );
}

// Footer telemetry strip: weather, visit count, clock, incident counter.
// Items are joined by dots, and a hidden item takes its dot with it.
function FooterTelemetry() {
  const [temp, setTemp] = useState<number | null>(null);
  const [visit, setVisit] = useState<number | null>(null);

  // Tangerang weather, no key needed. Silent when offline.
  useEffect(() => {
    fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=-6.2&longitude=106.63&current=temperature_2m&timezone=Asia%2FJakarta',
    )
      .then((r) => r.json())
      .then((j) => {
        const t = j?.current?.temperature_2m;
        if (typeof t === 'number') setTemp(Math.round(t));
      })
      .catch(() => {
        // Offline or blocked. Footer stays quiet.
      });
  }, []);

  // Local visit counter. Never leaves the browser.
  useEffect(() => {
    try {
      const v = Number(localStorage.getItem('ot-visits') ?? 0) + 1;
      localStorage.setItem('ot-visits', String(v));
      setVisit(v);
    } catch {
      // Private mode. No counting.
    }
  }, []);

  const parts: ReactNode[] = [];
  if (temp !== null) parts.push(`TANGERANG ${temp}°C · GOOD HUNTING WEATHER`);
  if (visit !== null) parts.push(`VISIT #${visit}`);
  parts.push(<WibClock key="clock" />);
  parts.push('0 DAYS SINCE LAST INCIDENT');

  return (
    <span className="inline-flex flex-wrap items-center gap-x-2">
      {parts.map((part, i) => (
        <Fragment key={i}>
          {i > 0 && <span aria-hidden>·</span>}
          <span>{part}</span>
        </Fragment>
      ))}
    </span>
  );
}

export default function App() {
  const [dark, setDark] = useState(() => {
    try {
      const saved = localStorage.getItem('ot-theme');
      if (saved) return saved === 'dark';
    } catch {
      // Private mode. Fall through to night shift default.
    }
    const h = new Date().getHours();
    return h >= 18 || h < 6;
  });
  const [labStep, setLabStep] = useState(0);
  const [paletteOpen, setPaletteOpen] = useState(false);

  const STAGE_NODES: string[][] = [
    ['actor', 'sshd', 'login'],
    ['cron', 'svc', 'fim'],
    ['wipe'],
    ['kill'],
    ['soc'],
  ];

  const handleNodeSelect = (id: string) => {
    const stage: Record<string, number> = {
      actor: 0,
      sshd: 0,
      login: 0,
      cron: 1,
      svc: 1,
      fim: 1,
      wipe: 2,
      kill: 3,
      soc: 4,
    };
    setLabStep(stage[id] ?? 0);
  };
  const railRef = useRef<HTMLDivElement>(null);
  const dragState = useRef<{ x: number; scroll: number } | null>(null);

  // Apply the initial theme once. Manual toggles afterwards persist the choice.
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const forceTheme = (next: boolean) => {
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
  };

  const toggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
    const x = e.clientX || window.innerWidth - 60;
    const y = e.clientY || 40;
    toggleThemeReveal(x, y, () => {
      const next = !dark;
      setDark(next);
      document.documentElement.classList.toggle('dark', next);
      try {
        localStorage.setItem('ot-theme', next ? 'dark' : 'light');
      } catch {
        // Private mode. Theme just resets next visit.
      }
    });
  };

  const go = (id: string) => {
    setPaletteOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen((v) => !v);
        return;
      }
      // Number keys jump to a section, but never while typing.
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || (e.target as HTMLElement | null)?.isContentEditable)
        return;
      const n = Number(e.key);
      if (Number.isInteger(n) && n >= 1 && n <= 9) {
        const section = ALL_SECTIONS[n - 1];
        if (section) go(section.id);
      }
    };
    const flipDark = () => {
      setDark((prev) => {
        const next = !prev;
        document.documentElement.classList.toggle('dark', next);
        try {
          localStorage.setItem('ot-theme', next ? 'dark' : 'light');
        } catch {
          // Private mode. Theme just resets next visit.
        }
        return next;
      });
    };
    const onFlip = () => {
      try {
        toggleThemeReveal(window.innerWidth / 2, window.innerHeight - 80, flipDark);
      } catch {
        flipDark();
      }
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('ot-toggle-theme', onFlip);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('ot-toggle-theme', onFlip);
    };
  }, []);

  // Deep-link: URL follows the section in view, and a hash on load scrolls there.
  useEffect(() => {
    let raf = 0;
    const sync = () => {
      raf = 0;
      const mid = window.scrollY + window.innerHeight * 0.35;
      let found = '';
      for (const s of ALL_SECTIONS) {
        const el = document.getElementById(s.id);
        if (el && el.offsetTop <= mid) found = s.id;
      }
      const next = found ? `#${found}` : window.location.pathname;
      if (window.location.hash !== next && !(next === window.location.pathname && !window.location.hash)) {
        history.replaceState(null, '', next);
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(sync);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    sync();
    if (window.location.hash) {
      const id = window.location.hash.slice(1);
      requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView());
    }
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  const slideRail = (dir: 1 | -1) =>
    railRef.current?.scrollBy({ left: dir * 360, behavior: 'smooth' });

  return (
    <ToasterProvider>
      <ScrollProgress />
      <KonamiEgg />
      <SessionGimmicks forceTheme={forceTheme} />
      <div className="min-h-screen bg-ot-bg font-sans text-ot-text">
        {/* Minimal full-width bar — no panel box */}
        <header className="sticky top-0 z-10 border-b border-ot-border bg-ot-bg/85 backdrop-blur">
          <div className="mx-auto flex w-full max-w-7xl items-center gap-5 px-6 py-3 md:px-10">
            <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-2">
              <span className="grid h-7 w-7 place-items-center rounded-ot-sm bg-navy text-white">
                <Shield size={14} />
              </span>
              <b className="text-sm tracking-tight">arasydafa</b>
            </button>
            <nav aria-label="Sections" className="ml-auto hidden items-center gap-1 text-sm md:flex">
              {NAV.map((n) => (
                <button
                  key={n.id}
                  type="button"
                  onClick={() => go(n.id)}
                  className="rounded-ot-sm px-3 py-1.5 text-ot-muted transition-colors hover:bg-ot-surface hover:text-ot-text"
                >
                  {n.label}
                </button>
              ))}
            </nav>
            <span className="ml-auto flex items-center gap-2 md:ml-0">
              <button
                type="button"
                onClick={() => setPaletteOpen(true)}
                aria-label="Jump to section (Ctrl K)"
                title="Jump to section (Ctrl K)"
                className="grid h-8 w-8 place-items-center rounded-full border border-ot-border text-ot-muted transition-colors hover:text-ot-text"
              >
                <Search size={15} />
              </button>
              <button
                type="button"
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="grid h-8 w-8 place-items-center rounded-full border border-ot-border text-ot-muted transition-colors hover:text-ot-text"
              >
                {dark ? <Sun size={15} /> : <Moon size={15} />}
              </button>
              <a href={PROFILE.github} target="_blank" rel="noreferrer">
                <Button size="sm" icon={<Github size={15} />}>
                  GitHub
                </Button>
              </a>
            </span>
          </div>
        </header>

        <main id="main">
          <TerminalHero onLab={() => go('lab')} />
          <Ticker />

          {/* 01 — ABOUT */}
          <section id="about" className="w-full scroll-mt-20 border-t border-ot-border">
            <div className="mx-auto grid w-full max-w-7xl gap-8 px-6 py-20 md:grid-cols-[1fr_1.4fr] md:px-10 md:py-28">
              <Reveal>
                <Eyebrow index="01" label="OPERATOR" icon={<User size={13} />} />
                <h2 className="mt-3 text-4xl font-extrabold tracking-tight md:text-5xl">
                  Blue team,
                  <br />
                  by practice.
                </h2>
              </Reveal>
              <Reveal delay={120}>
                <p className="max-w-2xl text-base leading-relaxed text-ot-muted md:text-lg">
                  {ABOUT_SUMMARY}
                </p>
                <p className="mt-4 font-mono text-xs tracking-widest text-ot-muted">
                  BASED IN · {PROFILE.location.toUpperCase()}
                </p>
                <p className="mt-1 font-mono text-xs tracking-widest text-navy-text">
                  IN THE SOC · {daysInSoc()} DAYS AND COUNTING
                </p>
                <p className="mt-1 font-mono text-xs tracking-widest text-ot-muted">
                  FOCUS · DETECTION · INTEL · ENGINEERING
                </p>
                <p className="mt-6 font-mono text-xs tracking-widest text-ot-muted">
                  POLITEKNIK ELEKTRONIKA NEGERI SURABAYA · TELECOMMUNICATIONS ENGINEERING
                </p>
              </Reveal>
            </div>
          </section>

          {/* 02 — EXPERIENCE (horizontal rail) */}
          <section id="experience" className="w-full scroll-mt-20 border-t border-ot-border bg-ot-surface">
            <div className="mx-auto w-full max-w-7xl px-6 py-20 md:px-10 md:py-28">
              <Reveal>
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <Eyebrow index="02" label="SERVICE RECORD" icon={<Briefcase size={13} />} />
                    <h2 className="mt-3 text-4xl font-extrabold tracking-tight md:text-6xl">
                      Service
                      <br />
                      record.
                    </h2>
                  </div>
                  <span className="flex gap-2">
                    <button
                      type="button"
                      aria-label="Scroll roles left"
                      onClick={() => slideRail(-1)}
                      className="grid h-10 w-10 place-items-center rounded-full border border-ot-border text-ot-muted transition-colors hover:text-ot-text"
                    >
                      <ArrowLeft size={16} />
                    </button>
                    <button
                      type="button"
                      aria-label="Scroll roles right"
                      onClick={() => slideRail(1)}
                      className="grid h-10 w-10 place-items-center rounded-full border border-ot-border text-ot-muted transition-colors hover:text-ot-text"
                    >
                      <ArrowRight size={16} />
                    </button>
                  </span>
                </div>
              </Reveal>
              <Reveal delay={120}>
                <div
                  ref={railRef}
                  className="no-scrollbar -mx-6 mt-10 flex cursor-grab snap-x snap-mandatory gap-4 overflow-x-auto px-6 select-none active:cursor-grabbing md:-mx-10 md:px-10"
                  onPointerDown={(e) => {
                    const el = railRef.current;
                    if (!el) return;
                    if (e.pointerType === 'mouse' && e.button !== 0) return;
                    dragState.current = { x: e.clientX, scroll: el.scrollLeft };
                    el.style.scrollSnapType = 'none';
                    el.setPointerCapture(e.pointerId);
                  }}
                  onPointerMove={(e) => {
                    const el = railRef.current;
                    const st = dragState.current;
                    if (!el || !st) return;
                    el.scrollLeft = st.scroll - (e.clientX - st.x);
                  }}
                  onPointerUp={() => {
                    dragState.current = null;
                    const el = railRef.current;
                    if (el) el.style.scrollSnapType = '';
                  }}
                  onPointerCancel={() => {
                    dragState.current = null;
                    const el = railRef.current;
                    if (el) el.style.scrollSnapType = '';
                  }}
                  onDragStart={(e) => e.preventDefault()}
                >
                  {EXPERIENCE.map((e, i) => (
                    <article
                      key={e.id}
                      className="w-[85vw] max-w-[380px] shrink-0 snap-start rounded-ot-lg border border-ot-border bg-ot-bg p-6"
                    >
                      <p className="font-mono text-xs text-ot-muted">0{i + 1}</p>
                      <p className="mt-2 font-mono text-xs text-navy-text">{e.time}</p>
                      <h3 className="mt-2 text-2xl font-extrabold tracking-tight">{e.company}</h3>
                      <p className="mt-0.5 text-sm font-semibold">{e.role}</p>
                      <p className="mt-2 text-sm leading-relaxed text-ot-muted">{e.description}</p>
                    </article>
                  ))}
                </div>
                <p className="mt-4 font-mono text-xs text-ot-muted">
                  Drag the rail sideways. Roles plus community work below.
                </p>
              </Reveal>
            </div>
          </section>

          {/* 03 — WORK */}
          <section id="work" className="w-full scroll-mt-20 border-t border-ot-border">
            <div className="mx-auto w-full max-w-7xl px-6 py-20 md:px-10 md:py-28">
              <Reveal>
                <Eyebrow index="03" label="FIELDWORK" icon={<Layers size={13} />} />
                <h2 className="mt-3 text-4xl font-extrabold tracking-tight md:text-6xl">
                  Pulled from
                  <br />
                  the field.
                </h2>
                <p className="mt-4 max-w-xl text-[15px] text-ot-muted">
                  Cyber only. Open-source work backing the day job.
                </p>
              </Reveal>
              <div className="mt-4 divide-y divide-ot-border">
                {PROJECTS.map((p, i) => (
                  <Reveal key={p.id} delay={Math.min(i * 80, 240)}>
                    <ProjectCard index={`0${i + 1}`} {...p} />
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* 04 — TOOLKIT */}
          <section id="skills" className="w-full scroll-mt-20 border-t border-ot-border bg-ot-surface">
            <div className="mx-auto w-full max-w-7xl px-6 py-20 md:px-10 md:py-28">
              <Reveal>
                <Eyebrow index="04" label="ARSENAL" icon={<Wrench size={13} />} />
                <h2 className="mt-3 text-4xl font-extrabold tracking-tight md:text-6xl">
                  The working
                  <br />
                  arsenal.
                </h2>
              </Reveal>
              <div className="mt-10 divide-y divide-ot-border border-y border-ot-border">
                {SKILL_GROUPS.map((g, i) => (
                  <Reveal key={g.id} delay={(i % 3) * 80}>
                    <div className="grid gap-1 py-5 md:grid-cols-[260px_1fr] md:gap-8">
                      <div>
                        <p className="font-mono text-xs text-ot-muted">0{i + 1}</p>
                        <h3 className="mt-1 text-lg font-bold tracking-tight">{g.title}</h3>
                        <p className="mt-0.5 text-sm text-ot-muted">{g.desc}</p>
                      </div>
                      <p className="font-mono text-sm leading-7 md:pt-5">
                        {g.items.join(' · ')}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
              <Reveal delay={80}>
                <div className="mt-12">
                  <AttackMatrix />
                </div>
              </Reveal>
            </div>
          </section>

          {/* 05 — SCALE (animated metrics) */}
          <section id="metrics" className="w-full scroll-mt-20 border-t border-ot-border">
            <div className="mx-auto w-full max-w-7xl px-6 py-20 md:px-10 md:py-28">
              <Reveal>
                <Eyebrow index="05" label="SIGNAL" icon={<Activity size={13} />} />
                <h2 className="mt-3 text-4xl font-extrabold tracking-tight md:text-6xl">
                  Signal, not
                  <br />
                  noise.
                </h2>
                <p className="mt-4 max-w-xl text-[15px] text-ot-muted">
                  By the numbers. Ship counts and credentials, no vanity metrics.
                </p>
              </Reveal>
              <div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-4">
                {[
                  { v: 3, s: '', l: 'Security roles held' },
                  { v: 4, s: '', l: 'Security projects shipped' },
                  { v: 2, s: '', l: 'IEEE publications' },
                  { v: 2, s: '', l: 'Engineering degrees' },
                ].map((m, i) => (
                  <Reveal key={m.l} delay={i * 80}>
                    <p className="text-4xl font-extrabold tracking-tight md:text-5xl">
                      <CountUp to={m.v} suffix={m.s} />
                    </p>
                    <p className="mt-2 text-sm text-ot-muted">{m.l}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* 06 — DETECTION LAB */}
          <section id="lab" className="w-full scroll-mt-20 border-t border-ot-border bg-ot-surface">
            <div className="mx-auto w-full max-w-7xl px-6 py-20 md:px-10 md:py-28">
              <Reveal>
                <Eyebrow index="06" label="CASEFILE" icon={<FlaskConical size={13} />} />
                <h2 className="mt-3 text-4xl font-extrabold tracking-tight md:text-6xl">
                  One case,
                  <br />
                  end to end.
                </h2>
                <p className="mt-4 max-w-xl text-[15px] text-ot-muted">
                  Log → rule → response, Sigma or Wazuh flavor. The sample below is illustrative. Swap in a
                  sanitized real case when ready.
                </p>
              </Reveal>
              <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_300px] [&_button]:cursor-pointer">
                <Reveal delay={100}>
                  <DetectionLab step={labStep} onStep={setLabStep} />
                </Reveal>
                <Reveal delay={140}>
                  <div className="lg:sticky lg:top-24">
                    <div className="mb-2 flex flex-wrap justify-between gap-2 font-mono text-xs text-ot-muted">
                      <span>KILL CHAIN</span>
                      <span>click to jump stage</span>
                    </div>
                    <KillChain activeIds={STAGE_NODES[labStep]} onSelect={handleNodeSelect} />
                  </div>
                </Reveal>
              </div>
            </div>
          </section>

          {/* 07 — WRITEUPS */}
          <section id="writeups" className="w-full scroll-mt-20 border-t border-ot-border">
            <div className="mx-auto w-full max-w-7xl px-6 py-20 md:px-10 md:py-28">
              <Reveal>
                <Eyebrow index="07" label="DISPATCHES" icon={<Newspaper size={13} />} />
                <h2 className="mt-3 text-4xl font-extrabold tracking-tight md:text-6xl">
                  Notes from
                  <br />
                  the hunt.
                </h2>
              </Reveal>
              <div className="mt-6 divide-y divide-ot-border border-y border-ot-border">
                {WRITEUPS.map((w, i) => (
                  <Reveal key={w.id} delay={Math.min(i * 80, 160)}>
                    <a
                      href={w.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-baseline gap-4 py-6"
                    >
                      <span className="font-mono text-sm text-ot-muted">0{i + 1}</span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-lg font-bold tracking-tight md:text-2xl">
                          {w.title}
                        </span>
                        <span className="mt-1 block font-mono text-xs text-ot-muted">{w.meta}</span>
                      </span>
                      <ArrowUpRight
                        size={24}
                        aria-hidden
                        className="shrink-0 text-ot-muted transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-navy-text"
                      />
                    </a>
                  </Reveal>
                ))}
              </div>
              <Reveal delay={100}>
                <p className="mt-8 max-w-xl text-[15px] text-ot-muted">
                  Detection notes and lab writeups live on Medium. Links get pinned here as they publish.
                </p>
              </Reveal>
            </div>
          </section>

          {/* 08 — CHALLENGE WORK */}
          <section id="ctf" className="w-full scroll-mt-20 border-t border-ot-border bg-ot-surface">
            <div className="mx-auto w-full max-w-7xl px-6 py-20 md:px-10 md:py-28">
              <Reveal>
                <Eyebrow index="08" label="CHALLENGE WORK" icon={<Trophy size={13} />} />
                <h2 className="mt-3 text-4xl font-extrabold tracking-tight md:text-6xl">
                  Built to
                  <br />
                  be broken.
                </h2>
                <p className="mt-4 max-w-xl text-[15px] text-ot-muted">
                  CTF problem sets authored and competitions run.
                </p>
              </Reveal>
              <div className="mt-6 divide-y divide-ot-border border-y border-ot-border">
                {CHALLENGE_WORK.map((c, i) => (
                  <Reveal key={c.id} delay={Math.min(i * 80, 160)}>
                    <a
                      href={c.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-baseline gap-4 py-6 transition-colors hover:bg-ot-bg"
                    >
                      <span className="font-mono text-sm text-ot-muted">0{i + 1}</span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-lg font-bold tracking-tight md:text-2xl">
                          {c.name}
                        </span>
                        <span className="mt-1 block font-mono text-xs text-ot-muted">{c.meta}</span>
                      </span>
                      <ArrowUpRight
                        size={24}
                        aria-hidden
                        className="shrink-0 text-ot-muted transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-navy-text"
                      />
                    </a>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* 09 — CLASSROOM */}
          <section id="classroom" className="w-full scroll-mt-20 border-t border-ot-border bg-ot-surface">
            <div className="mx-auto w-full max-w-7xl px-6 py-20 md:px-10 md:py-28">
              <Reveal>
                <Eyebrow index="09" label="CLASSROOM" icon={<GraduationCap size={13} />} />
                <h2 className="mt-3 text-4xl font-extrabold tracking-tight md:text-6xl">
                  Those
                  <br />I teach.
                </h2>
                <p className="mt-4 max-w-xl text-[15px] text-ot-muted">
                  Mentor at dibimbing.id plus guest stages. Teaching 23 subjects across
                  Linux, blue team ops, and cloud security.
                </p>
              </Reveal>
              <div className="mt-6 divide-y divide-ot-border border-y border-ot-border">
                {SPEAKING.map((s, i) => (
                  <Reveal key={s.id} delay={Math.min(i * 80, 160)}>
                    <div className="flex items-baseline gap-4 py-4">
                      <span className="font-mono text-sm text-ot-muted">0{i + 1}</span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-lg font-bold tracking-tight">{s.event}</span>
                        <span className="mt-0.5 block font-mono text-xs text-ot-muted">{s.meta}</span>
                      </span>
                    </div>
                  </Reveal>
                ))}
              </div>
              <Reveal delay={100}>
                <div className="mt-10 grid gap-x-8 md:grid-cols-2">
                  {SUBJECTS.map((s, i) => (
                    <p key={s} className="border-b border-ot-border py-2 font-mono text-[13px]">
                      <span className="mr-3 text-ot-muted">{String(i + 1).padStart(2, '0')}</span>
                      {s}
                    </p>
                  ))}
                </div>
                <p className="mt-6 font-mono text-xs leading-6 tracking-widest text-ot-muted">
                  LAB TOOLS · {TEACH_TOOLS.join(' · ').toUpperCase()}
                </p>
              </Reveal>
            </div>
          </section>

          {/* 10 — PUBLICATIONS */}
          <section id="publications" className="w-full scroll-mt-20 border-t border-ot-border">
            <div className="mx-auto w-full max-w-7xl px-6 py-20 md:px-10 md:py-28">
              <Reveal>
                <Eyebrow index="10" label="PUBLICATIONS" icon={<BookOpen size={13} />} />
                <h2 className="mt-3 text-4xl font-extrabold tracking-tight md:text-6xl">
                  Published
                  <br />
                  research.
                </h2>
                <p className="mt-4 max-w-xl text-[15px] text-ot-muted">
                  Two IEEE papers from my engineering years. Different field, same rigor.
                </p>
              </Reveal>
              <div className="mt-6 divide-y divide-ot-border border-y border-ot-border">
                {PUBLICATIONS.map((p, i) => (
                  <Reveal key={p.id} delay={Math.min(i * 80, 160)}>
                    <div className="flex items-baseline gap-4 py-6">
                      <span className="shrink-0 font-mono text-sm text-ot-muted">0{i + 1}</span>
                      <div className="min-w-0 flex-1">
                        <h3 className="max-w-3xl text-lg font-bold leading-snug tracking-tight md:text-2xl">
                          {p.title}
                        </h3>
                        <p className="mt-2 font-mono text-xs text-ot-muted">
                          {p.venue} · {p.date}
                        </p>
                        <details className="group mt-3 max-w-3xl">
                          <summary className="inline-flex cursor-pointer items-center gap-1.5 text-sm font-semibold text-navy-text">
                            <span className="transition-transform group-open:rotate-90">›</span>
                            Abstract
                          </summary>
                          <p className="mt-2 text-sm leading-relaxed text-ot-muted">{p.abstract}</p>
                        </details>
                        <a
                          href={p.url}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-3 inline-flex items-center gap-1.5 font-mono text-xs text-navy-text"
                        >
                          IEEE XPLORE
                          <ArrowUpRight size={13} aria-hidden />
                        </a>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* 11 — CREDENTIALS */}
          <section id="certs" className="w-full scroll-mt-20 border-t border-ot-border bg-ot-surface">
            <div className="mx-auto w-full max-w-7xl px-6 py-20 md:px-10 md:py-28">
              <Reveal>
                <Eyebrow index="11" label="CREDENTIALS" icon={<Award size={13} />} />
                <h2 className="mt-3 text-4xl font-extrabold tracking-tight md:text-6xl">
                  Stamped
                  <br />
                  and stacked.
                </h2>
                <p className="mt-4 max-w-xl text-[15px] text-ot-muted">
                  Active, planned, and expired. Expired ones stay listed because the
                  knowledge stayed.
                </p>
              </Reveal>
              {(['In progress', 'Planned', 'Expired'] as const).map((group) => (
                <div key={group} className="mt-8">
                  <p className="font-mono text-xs tracking-widest text-ot-muted">{group.toUpperCase()}</p>
                  <div className="mt-2 divide-y divide-ot-border border-y border-ot-border">
                    {CERTS.filter((c) => c.status === group).map((c, i) => (
                      <Reveal key={c.id} delay={Math.min(i * 80, 160)}>
                        <div className="flex items-center gap-4 py-4">
                          <span className="min-w-0 flex-1">
                            <span className="block text-[15px] font-bold tracking-tight">
                              {c.name}
                            </span>
                            <span className="mt-0.5 block font-mono text-xs text-ot-muted">
                              {c.issuer}
                              {c.credentialId ? ` · ID ${c.credentialId}` : ''}
                            </span>
                          </span>
                          <Badge
                            tone={c.status === 'In progress' ? 'info' : c.status === 'Planned' ? 'navy' : 'grey'}
                          >
                            {c.status}
                          </Badge>
                        </div>
                      </Reveal>
                    ))}
                  </div>
                </div>
              ))}
              <div className="mt-8">
                <p className="font-mono text-xs tracking-widest text-ot-muted">COURSES</p>
                <div className="mt-2 divide-y divide-ot-border border-y border-ot-border">
                  {COURSES.map((c, i) => (
                    <Reveal key={c.id} delay={Math.min(i * 80, 160)}>
                      <a
                        href={c.url}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex items-center gap-4 py-4"
                      >
                        <span className="min-w-0 flex-1">
                          <span className="block text-[15px] font-bold tracking-tight">
                            {c.name}
                          </span>
                          <span className="mt-0.5 block font-mono text-xs text-ot-muted">
                            {c.issuer} · Verify on Credly
                          </span>
                        </span>
                        <ArrowUpRight
                          size={18}
                          aria-hidden
                          className="shrink-0 text-ot-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-navy-text"
                        />
                      </a>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* 12 — CONTACT */}
          <section id="contact" className="w-full scroll-mt-20 border-t border-ot-border bg-navy text-white">
            <div className="mx-auto w-full max-w-7xl px-6 py-20 md:px-10 md:py-28">
              <Reveal>
                <p className="font-mono text-xs tracking-widest opacity-70">12 / OPEN CHANNEL</p>
                <h2 className="mt-3 text-4xl font-extrabold tracking-tight md:text-7xl">
                  Open a<br />
                  <span className="font-light italic">channel.</span>
                </h2>
                <p className="mt-4 max-w-xl text-[15px] opacity-70">
                  Roles, collaborations, or questions. Fastest through email.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 rounded-ot-md bg-white/10 px-4 py-2.5 font-mono text-sm">
                    <Mail size={15} />
                    {PROFILE.email}
                  </span>
                  <EmailCopy />
                  <a
                    href={PROFILE.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-8 items-center gap-2 rounded-ot-sm bg-white/15 px-3 text-[13px] font-semibold text-white transition-colors hover:bg-white/25"
                  >
                    <Linkedin size={15} />
                    LinkedIn
                  </a>
                  <a
                    href={PROFILE.medium}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-8 items-center gap-2 rounded-ot-sm bg-white/15 px-3 text-[13px] font-semibold text-white transition-colors hover:bg-white/25"
                  >
                    Medium
                  </a>
                </div>
              </Reveal>
            </div>
          </section>

          <footer className="w-full border-t border-ot-border">
            <div className="mx-auto w-full max-w-7xl px-6 py-10 md:px-10">
              <div className="max-w-xl">
                <FooterTerm />
              </div>
              <nav aria-label="Sitemap" className="mt-8 flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs text-ot-muted">
                {ALL_SECTIONS.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => go(s.id)}
                    className="transition-colors hover:text-navy-text"
                  >
                    {s.label}
                  </button>
                ))}
              </nav>
            </div>
            <div className="mx-auto flex w-full max-w-7xl items-center gap-4 border-t border-ot-border px-6 py-5 font-mono text-xs text-ot-muted md:px-10">
              <span>© 2026 {PROFILE.handle} · v{pkg.version}</span>
              <span className="ml-auto inline-flex items-center gap-2">
                STACK · REACT · VITE · @OMEGA-OS/UI
                <button
                  type="button"
                  aria-label="Back to top"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="grid h-8 w-8 place-items-center rounded-full border border-ot-border transition-colors hover:text-ot-text"
                >
                  <ArrowUp size={14} />
                </button>
              </span>
            </div>
            <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center gap-x-4 gap-y-1 border-t border-ot-border px-6 py-4 font-mono text-[11px] text-ot-muted md:px-10">
              <FooterTelemetry />
            </div>
          </footer>
        </main>
        <ScrollBuddy />
        <DotRail sections={ALL_SECTIONS} onJump={go} />
        <CommandPalette
          open={paletteOpen}
          onOpenChange={setPaletteOpen}
          placeholder="Jump to a section…"
          items={[
            ...ALL_SECTIONS.map((s) => ({
              id: s.id,
              label: s.label,
              group: 'Sections',
              onSelect: () => go(s.id),
            })),
            { id: 'github', label: 'GitHub', group: 'Elsewhere', onSelect: () => window.open(PROFILE.github, '_blank') },
            { id: 'medium', label: 'Medium', group: 'Elsewhere', onSelect: () => window.open(PROFILE.medium, '_blank') },
            { id: 'linkedin', label: 'LinkedIn', group: 'Elsewhere', onSelect: () => window.open(PROFILE.linkedin, '_blank') },
          ]}
        />
      </div>
    </ToasterProvider>
  );
}
