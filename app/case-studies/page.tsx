import { getAllCaseStudies } from '@/lib/content';
import Link from 'next/link';
import Image from 'next/image';

const colorClasses: Record<string, string> = {
  blue: 'bg-blue-100',
  purple: 'bg-violet-100',
  green: 'bg-emerald-100',
  orange: 'bg-amber-100',
  pink: 'bg-rose-100',
  mint: 'bg-teal-100',
};

export default function CaseStudiesPage() {
  const caseStudies = getAllCaseStudies();

  return (
    <>
      <section className="relative overflow-hidden bg-accent-amber px-6 py-14 md:py-20">
        <div className="poster-shape-circle h-56 w-56 bg-white top-[-70px] left-[-70px]" />
        <div className="poster-shape-square h-44 w-44 bg-white bottom-8 right-[10%]" />
        <div className="max-w-7xl mx-auto relative">
          <p className="text-xs font-semibold uppercase tracking-wider text-text-primary/75 mb-3">Deep Dives</p>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[0.95] text-text-primary mb-4">Case Studies</h1>
          <p className="text-lg md:text-xl text-text-primary/85 max-w-3xl">Execution stories from lending, payments, neobank products, and conversion-led growth work.</p>
        </div>
      </section>

      <section className="bg-white px-6 py-12 md:py-16">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6">
          {caseStudies.map((cs, index) => (
            <article key={cs.slug} className="rounded-lg bg-bg-muted p-5 transition-all duration-200 hover:scale-[1.02]">
              <div
                className={`relative aspect-[16/10] rounded-lg overflow-hidden mb-5 ${
                  cs.thumbnail ? '' : colorClasses[cs.gradient || 'blue'] || colorClasses.blue
                }`}
                style={cs.thumbnailBg ? { backgroundColor: cs.thumbnailBg } : undefined}
              >
                {cs.thumbnail ? (
                  <Image
                    src={cs.thumbnail}
                    alt={cs.title}
                    fill
                    className="object-contain"
                    priority={index < 2}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl md:text-4xl font-extrabold tracking-tight text-text-primary/40 text-center px-4">{cs.company}</span>
                  </div>
                )}
              </div>

              <div className="flex gap-2 mb-3 flex-wrap">
                {cs.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1 rounded-full bg-white text-text-muted uppercase tracking-wider font-semibold"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h2 className="text-2xl font-extrabold tracking-tight text-text-primary mb-2">{cs.title}</h2>
              <p className="text-text-secondary leading-relaxed mb-5">{cs.problem}</p>

              <Link
                href={`/case-studies/${cs.slug}`}
                className="h-12 px-5 rounded-md bg-accent-primary text-white hover:bg-blue-600 transition-all duration-200 hover:scale-105 inline-flex items-center text-xs font-semibold uppercase tracking-wider"
              >
                Read Case Study
              </Link>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
