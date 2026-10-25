import { getAllCaseStudies, getCaseStudyBySlug } from '@/lib/content';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';

const mdxComponents = {
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) =>
    typeof props.src === 'string' ? (
      <Image
        src={props.src}
        alt={props.alt || ''}
        width={1600}
        height={900}
        sizes="(min-width: 896px) 896px, 100vw"
        className="w-full h-auto object-contain rounded-lg my-6"
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
    <>
      <section className="bg-accent-amber px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-text-primary/80 hover:text-text-primary mb-6"
          >
            <ArrowLeft size={14} strokeWidth={2.5} /> Back to Case Studies
          </Link>

          <div className="flex gap-2 mb-4 flex-wrap">
            {caseStudy.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 rounded-full bg-white text-text-muted uppercase tracking-wider font-semibold"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-[0.95] text-text-primary mb-3">{caseStudy.title}</h1>
          <p className="text-lg md:text-xl text-text-primary/80 font-medium">{caseStudy.company}</p>
        </div>
      </section>

      <section className="bg-white px-6 py-12 md:py-16">
        <div className="max-w-4xl mx-auto prose prose-lg max-w-none prose-headings:font-extrabold prose-headings:tracking-tight prose-headings:text-text-primary prose-p:text-text-secondary prose-strong:text-text-primary prose-a:text-accent-primary">
          <MDXRemote source={caseStudy.content} components={mdxComponents} />
        </div>
      </section>
    </>
  );
}
