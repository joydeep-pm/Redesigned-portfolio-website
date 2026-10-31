'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Props {
  company: string;
  role: string;
  duration: string;
  metric: string;
  current?: boolean;
  isLast?: boolean;
  logo?: string;
  priority?: boolean;
  defaultExpanded?: boolean;
  children?: React.ReactNode;
}

export function TimelineEntry({
  company,
  role,
  duration,
  metric,
  current,
  logo,
  priority,
  defaultExpanded = false,
  children,
}: Props) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <article className="wk in">
      <div className="wk-head">
        <span className="y">{duration}</span>
        <div className="wk-co">
          {logo && (
            <div className="lg">
              <Image
                src={logo}
                alt={`${company} logo`}
                width={40}
                height={40}
                className="object-contain max-w-full max-h-full"
                priority={priority}
              />
            </div>
          )}
          <div>
            <h3>
              {company}
              {current && <span className="cur-chip">Current</span>}
            </h3>
            <small>{role}</small>
          </div>
        </div>
        <p className="wk-metric">{metric}</p>
        {children && (
          <button type="button" className="wk-tg" aria-expanded={expanded} onClick={() => setExpanded(!expanded)}>
            {expanded ? 'Hide details' : 'View details'}
          </button>
        )}
      </div>
      {children && expanded && <div className="wk-body prose">{children}</div>}
    </article>
  );
}
