import { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface Props {
  title: string;
  description: ReactNode;
  icon: ReactNode;
  source?: string;
  href?: string;
}

export function SkillCard({ title, description, icon, source, href }: Props) {
  return (
    <div className="group rounded-lg bg-white p-8 transition-all duration-200 hover:scale-[1.02]">
      <div className="h-14 w-14 rounded-full bg-bg-muted text-accent-primary group-hover:scale-110 transition-transform duration-200 flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-2xl font-extrabold tracking-tight text-text-primary mb-3">{title}</h3>
      <p className="text-text-secondary leading-relaxed">{description}</p>
      {(source || href) && (
        <div className="mt-5 flex items-center justify-between gap-3 flex-wrap">
          {source && <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">{source}</span>}
          {href && (
            <Link
              href={href}
              className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-accent-primary hover:underline"
            >
              See the work <ArrowRight size={14} strokeWidth={2.5} />
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
