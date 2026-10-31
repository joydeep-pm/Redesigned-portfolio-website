import type { ReactNode } from 'react';
import { Split } from '@/components/home/Split';

type Part = string | { mark: string };

export function PageHero({
  eyebrow,
  title,
  lead,
  tone = 'cream',
  children,
}: {
  eyebrow: string;
  title: Part[];
  lead?: string;
  tone?: 'cream' | 'sun';
  children?: ReactNode;
}) {
  return (
    <section className={`phero${tone === 'sun' ? ' sun' : ''}`}>
      <div className="wrap">
        {children}
        <p className="eyebrow">{eyebrow}</p>
        <Split as="h1" className="" parts={title} />
        {lead && <p className="lead">{lead}</p>}
      </div>
    </section>
  );
}
