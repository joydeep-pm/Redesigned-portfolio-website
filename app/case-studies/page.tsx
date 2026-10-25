import { getAllCaseStudies } from '@/lib/content';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Case Studies',
  description: 'Independent fintech product teardowns: problem and approach.',
  alternates: { canonical: '/case-studies' },
};

const colorClasses: Record<string, string> = {
  blue: 'bg-sky',
  purple: 'bg-lilac',
  green: 'bg-mint',
  orange: 'bg-sun',
  pink: 'bg-pink',
  mint: 'bg-mint',
};

export default function CaseStudiesPage() {
  const caseStudies = getAllCaseStudies();

  return (
    <>
      <section className="max-w-6xl mx-auto px-5 pt-12 pb-4">
        <p className="eyebrow mb-3">Independent teardowns</p>
        <h1 className="page-title text-5xl md:text-7xl mb-4">Product teardowns</h1>
        <p className="text-lg md:text-xl max-w-3xl text-text-secondary">Product teardowns across lending, payments, neobanking, and conversion-led growth.</p>
      </section>

      <section className="px-5 py-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6">
          {caseStudies.map((cs, index) => (
            <article key={cs.slug} className="pop-card p-5 transition-transform duration-150 hover:-translate-y-1">
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

              <p className="text-xs font-semibold uppercase tracking-wider text-accent-primary mb-3">Independent product teardown</p>
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
                className="h-12 px-5 rounded-md bg-accent-primary text-white hover:bg-sun hover:text-ink transition-all duration-200 hover:scale-105 inline-flex items-center text-xs font-semibold uppercase tracking-wider"
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
