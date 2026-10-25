import { getAllWork } from '@/lib/content';
import { TimelineEntry } from '@/components';
import { MDXRemote } from 'next-mdx-remote/rsc';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Work',
  description: 'Product leadership across lending, payments and card infrastructure.',
  alternates: { canonical: '/work' },
};

export default function WorkPage() {
  const works = getAllWork();

  return (
    <>
      <section className="max-w-6xl mx-auto px-5 pt-12 pb-4">
        <p className="eyebrow mb-3">Career timeline</p>
        <h1 className="page-title text-5xl md:text-7xl mb-4">Proof of work</h1>
        <p className="text-lg md:text-xl max-w-3xl text-text-secondary">14+ years across banking, lending operations, and fintech product infrastructure.</p>
      </section>

      <section className="px-5 py-8">
        <div className="max-w-4xl mx-auto">
          {works.map((work, i) => (
            <TimelineEntry
              key={work.slug}
              company={work.title}
              role={work.role}
              duration={work.duration}
              metric={work.metric}
              current={work.current}
              isLast={i === works.length - 1}
              logo={work.logo}
              priority={i < 4}
              defaultExpanded={i < 2}
            >
              <MDXRemote source={work.content} />
            </TimelineEntry>
          ))}
        </div>
      </section>
    </>
  );
}
