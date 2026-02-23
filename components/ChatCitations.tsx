import Link from 'next/link';
import type { ChatCitation } from '@/lib/rag/types';
import { ExternalLink } from 'lucide-react';

export function ChatCitations({ citations }: { citations: ChatCitation[] }) {
  if (!citations.length) return null;

  return (
    <div className="mt-3 space-y-2">
      <p className="text-[10px] uppercase tracking-[0.18em] text-text-muted font-semibold">Sources</p>
      <div className="space-y-1.5">
        {citations.slice(0, 4).map((citation, idx) => {
          const isExternal = citation.href.startsWith('http');
          const label = `${citation.title}`;

          if (isExternal) {
            return (
              <a
                key={`${citation.href}-${idx}`}
                href={citation.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-md bg-bg-muted px-3 py-2 hover:bg-gray-200 transition-colors"
              >
                <span className="text-xs font-semibold text-text-primary inline-flex items-center gap-1">
                  {label} <ExternalLink size={12} strokeWidth={2.5} />
                </span>
                <span className="block text-[11px] text-text-muted mt-0.5">{citation.sourceType}</span>
              </a>
            );
          }

          return (
            <Link
              key={`${citation.href}-${idx}`}
              href={citation.href}
              className="block rounded-md bg-bg-muted px-3 py-2 hover:bg-gray-200 transition-colors"
            >
              <span className="text-xs font-semibold text-text-primary">{label}</span>
              <span className="block text-[11px] text-text-muted mt-0.5">{citation.sourceType}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
