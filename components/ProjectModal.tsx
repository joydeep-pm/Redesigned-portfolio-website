'use client';

import { useState } from 'react';
import { X, ExternalLink, Maximize2 } from 'lucide-react';

interface ProjectModalProps {
  title: string;
  description: string;
  demoUrl: string;
  children: React.ReactNode;
}

export function ProjectModal({ title, description, demoUrl, children }: ProjectModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="h-11 px-4 rounded-md bg-accent-primary text-white hover:bg-blue-600 transition-all duration-200 hover:scale-105 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider"
      >
        <Maximize2 size={16} strokeWidth={2.5} /> Live Demo
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-text-primary/80" onClick={() => setIsOpen(false)} />

          <div className="absolute inset-4 md:inset-8 lg:inset-12 bg-white border-2 border-border-default rounded-lg overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b-2 border-border-default bg-bg-muted">
              <div>
                <h2 className="text-lg font-extrabold tracking-tight text-text-primary">{title}</h2>
                <p className="text-sm text-text-muted">{description}</p>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 px-4 rounded-md bg-white text-text-primary hover:bg-accent-primary hover:text-white transition-all duration-200 hover:scale-105 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider"
                >
                  <ExternalLink size={14} strokeWidth={2.5} /> Open Tab
                </a>
                <button
                  onClick={() => setIsOpen(false)}
                  className="h-10 w-10 rounded-md bg-white text-text-muted hover:text-text-primary transition-colors inline-flex items-center justify-center"
                >
                  <X size={18} strokeWidth={2.5} />
                </button>
              </div>
            </div>

            <div className="flex-1 bg-bg-primary">{children}</div>
          </div>
        </div>
      )}
    </>
  );
}
