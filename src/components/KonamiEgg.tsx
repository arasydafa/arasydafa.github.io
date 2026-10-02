import { useEffect } from 'react';
import { useToast } from '@omega-os/ui';

const SEQ = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
];

// Konami easter egg. Fires a fake SOC alert toast.
export function KonamiEgg() {
  const toast = useToast();

  useEffect(() => {
    let i = 0;
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (k === SEQ[i]) {
        i += 1;
        if (i === SEQ.length) {
          i = 0;
          toast.show('danger', 'Intrusion detected in this browser. Just kidding. Coffee speeds up incident response.', {
            title: 'SOC ALERT',
          });
        }
      } else {
        i = k === SEQ[0] ? 1 : 0;
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [toast]);

  return null;
}
