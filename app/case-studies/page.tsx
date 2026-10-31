import { getAllCaseStudies } from '@/lib/content';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { SubShell } from '@/components/site/SubShell';
import { PageHero } from '@/components/site/PageHero';

export const metadata: Metadata = {
  title: 'Case Studies',
  description: 'Independent fintech product teardowns: problem and approach.',
  alternates: { canonical: '/case-studies' },
};

export default function CaseStudiesPage() {
  const caseStudies = getAllCaseStudies();

  return (
    <SubShell>
      <PageHero
        eyebrow="Independent teardowns"
        title={['Product ', { mark: 'teardowns' }, '.']}
        lead="Product teardowns across lending, payments, neobanking, and conversion-led growth. Independent analysis, not delivered work."
      />
      <section className="psec">
        <div className="wrap">
          <div className="bgrid" style={{ marginTop: 0 }}>
            {caseStudies.map((cs, index) => (
              <article className="bcard in" key={cs.slug} data-cursor="Open">
                <div
                  className={`bimg${cs.thumbnail ? '' : ' ph'}`}
                  style={cs.thumbnailBg ? { backgroundColor: cs.thumbnailBg } : undefined}
                >
                  {cs.thumbnail ? (
                    <Image
                      src={cs.thumbnail}
                      alt={cs.title}
                      fill
                      sizes="(min-width: 860px) 560px, 100vw"
                      priority={index < 2}
                    />
                  ) : (
                    cs.company
                  )}
                </div>
                <div className="bbody">
                  <span className="k">{cs.company}</span>
                  <h3>
                    <Link href={`/case-studies/${cs.slug}`}>{cs.title}</Link>
                  </h3>
                  <p>{cs.problem}</p>
                  <div className="chips">
                    {cs.tags.slice(0, 3).map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <Link href={`/case-studies/${cs.slug}`} className="go">
                    Read the teardown &rarr;
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </SubShell>
  );
}
