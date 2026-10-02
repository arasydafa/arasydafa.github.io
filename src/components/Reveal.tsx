import { useEffect, useRef, useState, type ReactNode } from 'react';

// Fade-up on first scroll into view. No animation library needed.
export function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // No disconnect — replays when scrolling back up too.
          setVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`ot-reveal ${visible ? 'ot-reveal-in' : ''} ${className}`}
    >
      {children}
    </div>
  );
}
