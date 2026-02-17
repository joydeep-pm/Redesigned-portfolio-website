'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface Props {
  company: string;
  role: string;
  duration: string;
  metric: string;
  current?: boolean;
  isLast?: boolean;
  logo?: string;
  priority?: boolean;
  children?: React.ReactNode;
}

export function TimelineEntry({ company, role, duration, metric, current, isLast, logo, priority, children }: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="relative pl-8 pb-8">
      {!isLast && <div className="absolute left-[11px] top-4 bottom-0 w-0.5 bg-border-default" />}
      <div className={`absolute left-0 top-1 h-6 w-6 rounded-full ${current ? 'bg-accent-secondary' : 'bg-accent-primary'}`} />

      <div className="rounded-lg bg-white p-6 border-2 border-border-default">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex items-start gap-3">
            {logo && (
              <div className="w-11 h-11 rounded-md bg-bg-muted flex items-center justify-center flex-shrink-0">
                <Image
                  src={logo}
                  alt={`${company} logo`}
                  width={40}
                  height={40}
                  className="rounded-md object-contain max-w-full max-h-full"
                  priority={priority}
                />
              </div>
            )}
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-xl font-extrabold tracking-tight text-text-primary">{company}</h3>
                {current && (
                  <span className="text-xs px-2 py-1 rounded-md bg-accent-secondary text-white font-semibold uppercase tracking-wider">
                    Current
                  </span>
                )}
              </div>
              <p className="text-sm text-text-secondary font-medium">{role}</p>
            </div>
          </div>
          <span className="text-xs text-text-muted uppercase tracking-wider font-semibold">{duration}</span>
        </div>

        <p className="text-sm font-semibold text-accent-primary mb-3 uppercase tracking-wider">{metric}</p>

        {children && (
          <>
            <button
              onClick={() => setExpanded(!expanded)}
              className="h-10 px-4 rounded-md bg-bg-muted text-text-primary hover:bg-gray-200 transition-all duration-200 hover:scale-105 text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-2"
            >
              {expanded ? <ChevronUp size={16} strokeWidth={2.5} /> : <ChevronDown size={16} strokeWidth={2.5} />}
              {expanded ? 'Hide Details' : 'View Details'}
            </button>
            {expanded && <div className="mt-4 pt-4 border-t-2 border-border-default prose prose-sm max-w-none">{children}</div>}
          </>
        )}
      </div>
    </div>
  );
}
