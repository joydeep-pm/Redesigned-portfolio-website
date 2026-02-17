'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ExternalLink, Github, X, Maximize2 } from 'lucide-react';

interface ProjectCardProps {
  slug: string;
  title: string;
  description: string;
  status: string;
  tech: string[];
  demoUrl?: string;
  repoUrl?: string;
}

export function ProjectCard({ slug, title, description, status, tech, demoUrl, repoUrl }: ProjectCardProps) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = () => {
    router.push(`/projects/${slug}`);
  };

  const handleDemoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  const handleRepoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (repoUrl) window.open(repoUrl, '_blank');
  };

  return (
    <>
      <div
        onClick={handleCardClick}
        className="block bg-white rounded-lg p-8 border-2 border-border-default hover:scale-[1.02] transition-all duration-200 cursor-pointer"
      >
        <div className="flex items-start justify-between mb-5">
          <span className="text-3xl">{status === 'active' ? '🚀' : '✅'}</span>
          <span
            className={`text-xs px-3 py-1 rounded-full font-semibold uppercase tracking-wider ${
              status === 'active' ? 'bg-accent-secondary text-white' : 'bg-bg-muted text-text-muted'
            }`}
          >
            {status}
          </span>
        </div>
        <h3 className="text-2xl font-extrabold tracking-tight text-text-primary mb-3">{title}</h3>
        <p className="text-text-secondary mb-5 leading-relaxed">{description}</p>
        {tech && tech.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-5">
            {tech.map((t) => (
              <span key={t} className="text-xs px-3 py-1 bg-bg-muted text-text-muted rounded-full uppercase tracking-wider font-semibold">
                {t}
              </span>
            ))}
          </div>
        )}
        {(demoUrl || repoUrl) && (
          <div className="flex gap-4 pt-4 border-t-2 border-border-default">
            {demoUrl && (
              <button
                onClick={handleDemoClick}
                className="h-11 px-4 rounded-md bg-accent-primary text-white hover:bg-blue-600 transition-all duration-200 hover:scale-105 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider"
              >
                <Maximize2 size={16} strokeWidth={2.5} /> Live Demo
              </button>
            )}
            {repoUrl && (
              <button
                onClick={handleRepoClick}
                className="h-11 px-4 rounded-md border-4 border-text-primary text-text-primary hover:bg-text-primary hover:text-white transition-all duration-200 hover:scale-105 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider"
              >
                <Github size={16} strokeWidth={2.5} /> Code
              </button>
            )}
          </div>
        )}
      </div>

      {isModalOpen && demoUrl && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-text-primary/80" onClick={() => setIsModalOpen(false)} />
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
                  onClick={() => setIsModalOpen(false)}
                  className="h-10 w-10 rounded-md bg-white text-text-muted hover:text-text-primary transition-colors inline-flex items-center justify-center"
                >
                  <X size={18} strokeWidth={2.5} />
                </button>
              </div>
            </div>
            <div className="flex-1 bg-bg-primary">
              <iframe
                src={demoUrl}
                className="w-full h-full border-0"
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
