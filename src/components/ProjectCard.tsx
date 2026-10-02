import { ArrowUpRight } from 'lucide-react';

interface Props {
  index: string;
  name: string;
  desc: string;
  lang: string;
  topics: string[];
  url: string;
}

// Full-bleed editorial row — big title, meta, arrow. No Card.
export function ProjectCard({ index, name, desc, lang, topics, url }: Props) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="group grid gap-2 py-10 transition-colors md:grid-cols-[80px_1fr_auto] md:items-baseline md:gap-6"
    >
      <span className="font-mono text-sm text-ot-muted">{index}</span>
      <span>
        <span className="block font-mono text-2xl font-bold tracking-tight md:text-4xl">
          {name}
        </span>
        <span className="mt-2 block max-w-2xl text-[15px] leading-relaxed text-ot-muted">
          {desc}
        </span>
        <span className="mt-3 block font-mono text-xs text-ot-muted">
          {lang} · {topics.join(' · ')}
        </span>
      </span>
      <ArrowUpRight
        size={28}
        aria-hidden
        className="text-ot-muted transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-navy-text"
      />
    </a>
  );
}
