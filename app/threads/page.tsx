import { getAllThreads } from '@/lib/content';
import { ExternalLink, Clock } from 'lucide-react';
import type { Metadata } from 'next';
import { SITE_NAME, SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Threads',
  description: 'Writing on Indian lending, co-lending and fintech product.',
  alternates: { canonical: '/threads' },
};

export default function ThreadsPage() {
  const threads = getAllThreads();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: threads.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Article',
        headline: t.title,
        description: t.excerpt,
        datePublished: t.publishedAt,
        url: t.externalUrl,
        author: { '@type': 'Person', name: SITE_NAME, url: SITE_URL },
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <section className="max-w-6xl mx-auto px-5 pt-12 pb-4">
        <p className="eyebrow mb-3">Writing</p>
        <h1 className="page-title text-5xl md:text-7xl mb-4">Things I wrote</h1>
        <p className="text-lg md:text-xl max-w-3xl text-text-secondary">Thoughts on product strategy, fintech regulation, and technical learnings.</p>
      </section>

      <section className="px-5 py-8">
        <div className="max-w-4xl mx-auto">
          {threads.length === 0 ? (
            <div className="pop-card p-10 text-center">
              <p className="text-lg text-text-secondary mb-2">I&apos;m preparing new pieces on digital lending regulation and co-lending orchestration.</p>
              <p className="text-text-muted">More writing will be published soon.</p>
            </div>
          ) : (
            <div className="space-y-5">
              {threads.map((thread) => (
                <article key={thread.slug} className="pop-card p-7 transition-transform duration-150 hover:-translate-y-1">
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
                        className="h-11 px-4 rounded-md bg-accent-primary text-white hover:bg-sun hover:text-ink transition-all duration-200 hover:scale-105 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider"
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
