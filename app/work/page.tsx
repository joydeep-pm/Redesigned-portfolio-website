import { getAllWork } from '@/lib/content';
import { TimelineEntry } from '@/components';
import { MDXRemote } from 'next-mdx-remote/rsc';

export default function WorkPage() {
  const works = getAllWork();

  return (
    <>
      <section className="relative overflow-hidden bg-accent-primary text-white px-6 py-14 md:py-20">
        <div className="poster-shape-circle h-48 w-48 bg-white top-[-60px] left-[-50px]" />
        <div className="poster-shape-square h-40 w-40 bg-white bottom-8 right-[10%]" />
        <div className="max-w-7xl mx-auto relative">
          <p className="text-xs font-semibold uppercase tracking-wider text-white/85 mb-3">Career Timeline</p>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[0.95] mb-4">Proof of Work</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl">12+ years across banking, lending operations, and fintech product infrastructure.</p>
        </div>
      </section>

      <section className="bg-bg-muted px-6 py-12 md:py-16">
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
            >
              <MDXRemote source={work.content} />
            </TimelineEntry>
          ))}
        </div>
      </section>
    </>
  );
}
