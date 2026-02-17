import { getAllThreads } from '@/lib/content';
import { ExternalLink, Clock } from 'lucide-react';

export default function ThreadsPage() {
  const threads = getAllThreads();

  return (
    <>
      <section className="bg-bg-dark text-white px-6 py-14 md:py-20">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-wider text-white/70 mb-3">Writing</p>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[0.95] mb-4">Threads</h1>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl">Thoughts on product strategy, fintech regulation, and technical learnings.</p>
        </div>
      </section>

      <section className="bg-bg-muted px-6 py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          {threads.length === 0 ? (
            <div className="rounded-lg bg-white p-10 border-2 border-border-default text-center">
              <p className="text-lg text-text-secondary mb-2">I&apos;m preparing new pieces on digital lending regulation and co-lending orchestration.</p>
              <p className="text-text-muted">More writing will be published soon.</p>
            </div>
          ) : (
            <div className="space-y-5">
              {threads.map((thread) => (
                <article key={thread.slug} className="rounded-lg bg-white p-7 border-2 border-border-default transition-all duration-200 hover:scale-[1.01]">
                  <div className="flex gap-2 mb-4 flex-wrap">
                    {thread.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-3 py-1 bg-bg-muted text-text-muted rounded-full uppercase tracking-wider font-semibold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-2xl font-extrabold tracking-tight text-text-primary mb-2">{thread.title}</h2>
                  {thread.excerpt && <p className="text-text-secondary mb-4 leading-relaxed">{thread.excerpt}</p>}
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div className="flex items-center gap-4 text-xs text-text-muted uppercase tracking-wider font-semibold">
                      <span>
                        {new Date(thread.publishedAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                      {thread.readingTime && (
                        <span className="inline-flex items-center gap-1">
                          <Clock size={14} strokeWidth={2.5} /> {thread.readingTime} min
                        </span>
                      )}
                    </div>
                    {thread.externalUrl && (
                      <a
                        href={thread.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="h-11 px-4 rounded-md bg-accent-primary text-white hover:bg-blue-600 transition-all duration-200 hover:scale-105 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider"
                      >
                        Read on LinkedIn <ExternalLink size={14} strokeWidth={2.5} />
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
