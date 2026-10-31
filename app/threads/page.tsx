import { getAllThreads } from '@/lib/content';
import type { Metadata } from 'next';
import { SITE_NAME, SITE_URL } from '@/lib/site';
import { SubShell } from '@/components/site/SubShell';
import { PageHero } from '@/components/site/PageHero';

export const metadata: Metadata = {
  title: 'Threads',
  description: 'Writing on Indian lending, co-lending and fintech product.',
  alternates: { canonical: '/threads' },
};

export default function ThreadsPage() {
  const threads = getAllThreads().sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

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
    <SubShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <PageHero
        eyebrow="Writing"
        title={['Notes I ', { mark: 'published' }, '.']}
        lead="Thoughts on product strategy, fintech regulation, and technical learnings."
      />
      <section className="psec">
        <div className="wrap">
          {threads.length === 0 ? (
            <div className="empty">
              <p>I&apos;m preparing new pieces on digital lending regulation and co-lending orchestration. More writing will be published soon.</p>
            </div>
          ) : (
            <div>
              {threads.map((thread) => (
                <a
                  key={thread.slug}
                  className="wrow in"
                  data-cursor="Read"
                  href={thread.externalUrl || '/threads'}
                  {...(thread.externalUrl ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  <span className="y">
                    {new Date(thread.publishedAt).toLocaleDateString('en-US', {
                      month: 'short',
                      year: 'numeric',
                      timeZone: 'UTC',
                    })}
                    {thread.readingTime ? ` · ${thread.readingTime} min` : ''}
                  </span>
                  <h3>{thread.title}</h3>
                  <p>{thread.excerpt}</p>
                  <i>↗</i>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>
    </SubShell>
  );
}
