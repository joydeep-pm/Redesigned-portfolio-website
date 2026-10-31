import { getAllCaseStudies, getCaseStudyBySlug } from '@/lib/content';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import remarkGfm from 'remark-gfm';
import { SubShell } from '@/components/site/SubShell';

const mdxComponents = {
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) =>
    typeof props.src === 'string' ? (
      <Image
        src={props.src}
        alt={props.alt || ''}
        width={1600}
        height={900}
        sizes="(min-width: 896px) 820px, 100vw"
        className="w-full h-auto object-contain my-6"
      />
    ) : null,
};

export async function generateStaticParams() {
  const caseStudies = getAllCaseStudies();
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudyBySlug(slug);
  if (!cs) return {};
  const title = `${cs.title} | ${cs.company}`;
  return {
    title,
    description: cs.problem,
    alternates: { canonical: `/case-studies/${slug}` },
    openGraph: { title, description: cs.problem, type: 'article', url: `/case-studies/${slug}` },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);
  if (!caseStudy) notFound();

  return (
    <SubShell>
      <section className="phero sun">
        <div className="wrap">
          <Link href="/case-studies" className="back">
            &larr; All teardowns
          </Link>
          <p className="eyebrow">Independent product teardown &middot; {caseStudy.company}</p>
          <h1 style={{ letterSpacing: '-.05em' }}>{caseStudy.title}</h1>
          <p className="lead">{caseStudy.problem}</p>
          <div className="chips">
            {caseStudy.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="psec" style={{ paddingTop: 70 }}>
        <div className="wrap">
          <div className="prose prose-wrap">
            <MDXRemote
              source={caseStudy.content}
              components={mdxComponents}
              options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
            />
          </div>
          <Link href="/case-studies" className="more">
            More teardowns &rarr;
          </Link>
        </div>
      </section>
    </SubShell>
  );
}
