import { getAllWork } from '@/lib/content';
import { TimelineEntry } from '@/components';
import { SubShell } from '@/components/site/SubShell';
import { PageHero } from '@/components/site/PageHero';
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
    <SubShell>
      <PageHero
        eyebrow="Career timeline"
        title={['Proof of ', { mark: 'work' }, '.']}
        lead="15+ years across banking, lending operations, and fintech product infrastructure."
      />
      <section className="psec">
        <div className="wrap">
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
    </SubShell>
  );
}
