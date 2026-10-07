import { useEffect, useRef } from 'react';
import { useToast } from '@omega-os/ui';

const TITLE = 'Arasy Dafa - Blue Team';

// Tab title, midnight flip, welcome back, idle nudge. All local, no backend.
export function SessionGimmicks({ forceTheme }: { forceTheme: (dark: boolean) => void }) {
  const toast = useToast();
  const idleRef = useRef(0);

  useEffect(() => {
    // 1. Tab title jahil.
    const onVis = () => {
      document.title = document.hidden ? 'Come back, analyst!' : TITLE;
    };
    document.addEventListener('visibilitychange', onVis);

    // 2. Midnight flip, 1 minute only.
    const checkMidnight = () => {
      const now = new Date();
      if (now.getHours() === 0 && now.getMinutes() === 0) {
        const key = `midnight-${now.toDateString()}`;
        if (!sessionStorage.getItem(key)) {
          sessionStorage.setItem(key, '1');
          const wasDark = document.documentElement.classList.contains('dark');
          forceTheme(true);
          toast.show('info', 'Shift change. Stay sharp.', { title: 'MIDNIGHT' });
          setTimeout(() => {
            if (!wasDark) forceTheme(false);
          }, 60000);
        }
      }
    };
    const midnightTimer = setInterval(checkMidnight, 20000);
    checkMidnight();

    // 3. Welcome back on a different day.
    const today = new Date().toDateString();
    const last = localStorage.getItem('ot-last-visit');
    if (last && last !== today) {
      setTimeout(() => toast.show('info', 'Welcome back.', { title: 'HELLO AGAIN' }), 2500);
    }
    try {
      localStorage.setItem('ot-last-visit', today);
    } catch {
      // Private mode. No memory, no greeting.
    }

    // 4. Idle nudge after 60 quiet seconds.
    const poke = () => {
      window.clearTimeout(idleRef.current);
      idleRef.current = window.setTimeout(() => {
        toast.show('info', 'Still there? The logs wait for no one.', { title: 'IDLE' });
      }, 60000);
    };
    const events = ['scroll', 'click', 'keydown', 'pointermove'];
    events.forEach((e) => window.addEventListener(e, poke, { passive: true }));
    poke();

    return () => {
      document.removeEventListener('visibilitychange', onVis);
      window.clearInterval(midnightTimer);
      events.forEach((e) => window.removeEventListener(e, poke));
      window.clearTimeout(idleRef.current);
      document.title = TITLE;
    };
  }, [toast, forceTheme]);

  return null;
}
