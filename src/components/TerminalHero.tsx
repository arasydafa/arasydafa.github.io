import { useEffect, useRef, useState } from 'react';
import { Badge, Button } from '@omega-os/ui';
import { ArrowDown, Github } from 'lucide-react';
import { PROFILE } from '../data/placeholder';

const WORDS = ['contain', 'triage', 'hunt', 'isolate'];
const GLYPHS = '!<>-_\\/[]{}=+*^?#';

// Drifting packet dots in the hero background. Static when reduced motion is on.
function PacketDrift() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let w = 0;
    let h = 0;
    const dots = Array.from({ length: 34 }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: 0.00012 + Math.random() * 0.00022,
      vy: (Math.random() - 0.5) * 0.00006,
      r: 1.6 + Math.random() * 2,
      a: 0.28 + Math.random() * 0.3,
    }));

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      const dark = document.documentElement.classList.contains('dark');
      const rgb = dark ? '150, 178, 214' : '30, 58, 95';
      ctx.clearRect(0, 0, w, h);
      for (const d of dots) {
        const px = d.x * w;
        const py = d.y * h;
        // Short trail behind the dot, like a packet moving on a wire.
        const tail = d.vx * w * 420;
        ctx.beginPath();
        ctx.moveTo(px - tail, py);
        ctx.lineTo(px, py);
        ctx.strokeStyle = `rgba(${rgb}, ${d.a * 0.45})`;
        ctx.lineWidth = d.r * 0.7;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(px, py, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb}, ${d.a})`;
        ctx.fill();
      }
    };

    let raf = 0;
    let last = performance.now();
    const loop = (t: number) => {
      const dt = Math.min(64, t - last);
      last = t;
      for (const d of dots) {
        d.x += d.vx * dt;
        d.y += d.vy * dt;
        if (d.x > 1.05) d.x = -0.05;
        if (d.y > 1.05) d.y = -0.05;
        if (d.y < -0.05) d.y = 1.05;
      }
      draw();
      raf = requestAnimationFrame(loop);
    };

    resize();
    draw();
    const onTheme = () => requestAnimationFrame(draw);
    if (!reduce) {
      raf = requestAnimationFrame(loop);
    } else {
      // Static art still needs a repaint after the theme flips.
      window.addEventListener('ot-toggle-theme', onTheme);
    }
    const onResize = () => {
      resize();
      draw();
    };
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('ot-toggle-theme', onTheme);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}

// Scrambles once on mount, then settles. Skipped for reduced motion.
function Scramble({ text }: { text: string }) {
  const [out, setOut] = useState(text);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let frame = 0;
    const total = 42;
    const id = setInterval(() => {
      frame += 1;
      const p = frame / total;
      setOut(
        text
          .split('')
          .map((c, i) =>
            i / text.length < p ? c : GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
          )
          .join(''),
      );
      if (frame >= total) clearInterval(id);
    }, 50);
    return () => clearInterval(id);
  }, [text]);

  return <span>{out}</span>;
}

// Full-screen hero — rotating verb in the middle line, no panel.
export function TerminalHero({ onLab }: { onLab: () => void }) {
  const [wi, setWi] = useState(0);
  const [nonce, setNonce] = useState(0);
  const [spot, setSpot] = useState<{ x: number; y: number } | null>(null);
  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 11) return 'Good morning';
    if (h < 15) return 'Good afternoon';
    if (h < 19) return 'Good evening';
    return 'Good night';
  })();

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => setWi((i) => (i + 1) % WORDS.length), 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="hero-grid-bg relative flex min-h-[92vh] w-full flex-col overflow-hidden"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setSpot({ x: e.clientX - r.left, y: e.clientY - r.top });
      }}
      onMouseLeave={() => setSpot(null)}
    >
      <PacketDrift />
      {spot ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(320px at ${spot.x}px ${spot.y}px, rgb(30 58 95 / 0.14), transparent 70%)`,
          }}
        />
      ) : null}
      <div className="ot-hero relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6 py-16 md:px-10">
        <p className="font-mono text-[13px] tracking-wide text-ot-muted">
          {greeting}, analyst · soc@portfolio:~ whoami
          <span className="ml-1 inline-block animate-pulse text-navy-text">▌</span>
        </p>
        <p className="mt-2 text-xl font-bold tracking-tight md:text-2xl">
          Arasy Dafa Sulistya Kurniawan
        </p>
        {PROFILE.openToWork ? (
          <p className="mt-3">
            <Badge tone="success" icon={<span className="h-2 w-2 animate-pulse rounded-full bg-success" />}>
              Open to opportunities
            </Badge>
          </p>
        ) : null}
        <h1
          className="mt-4 cursor-pointer text-[clamp(3rem,10vw,7.5rem)] font-extrabold leading-[0.95] tracking-tight"
          onClick={() => setNonce((n) => n + 1)}
          title="Click to decode"
        >
          <Scramble key={`d${nonce}`} text="DETECT" />
          <br />
          <span className="rot-word font-light italic text-navy-text">
            <span key={wi}>{WORDS[wi]}</span>
          </span>
          <br />
          <Scramble key={`r${nonce}`} text="REPEAT" />
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-ot-muted md:text-lg">
          SOC Engineer at {PROFILE.org}, focused on threat detection, threat intelligence
          and detection engineering.
        </p>
        <div className="mt-8 flex flex-wrap gap-2.5">
          <Button icon={<ArrowDown size={16} />} onClick={onLab}>
            Explore detection lab
          </Button>
          <a href={PROFILE.github} target="_blank" rel="noreferrer">
            <Button variant="secondary" icon={<Github size={16} />}>
              GitHub
            </Button>
          </a>
        </div>
      </div>
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 pb-8 font-mono text-xs text-ot-muted md:px-10">
        <span>{PROFILE.location}</span>
        <span className="hidden md:inline">SIEM · SIGMA · THREAT INTEL</span>
        <span className="inline-flex animate-bounce items-center gap-1.5">
          <ArrowDown size={14} /> scroll
        </span>
      </div>
    </div>
  );
}
