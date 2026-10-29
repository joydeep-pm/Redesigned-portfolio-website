import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ExternalLink, FileDown, Linkedin } from 'lucide-react';
import { SAME_AS } from '@/lib/site';
import { MetricCard, CaseStudyCard } from '@/components';
import { HeroPortrait } from '@/components/HeroPortrait';
import { HeroAsk } from '@/components/HeroAsk';
import { LifecycleStrip } from '@/components/LifecycleStrip';
import { getAllCaseStudies, getAllProjects, getAllThreads } from '@/lib/content';

const metrics = [
  { number: '$200M+', label: 'loan against securities portfolio', context: 'M2P Fintech' },
  { number: '4x', label: 'loan disbursals, year on year', context: 'Paytm' },
  { number: '15+', label: 'institutions on the platform', context: 'M2P Fintech' },
  { number: '$50M+', label: 'co-lending volume, 5 enterprise accounts', context: 'M2P Fintech' },
];

const jobs = [
  {
    years: '2024 to now',
    company: 'M2P Fintech',
    role: 'Senior Director, Core Lending Suite',
    line: 'Co-lending orchestration and loan against securities on an API-first lending platform.',
    tone: 'bg-mint',
  },
  {
    years: '2022 to 2024',
    company: 'Paytm',
    role: 'Director, Product, Lending',
    line: '4x loan disbursals, 500K+ active borrowers and 5 lending partners.',
    tone: 'bg-pink',
  },
  {
    years: '2021 to 2022',
    company: 'Finvolv',
    role: 'Lead Product Manager',
    line: 'An API-first lending stack deployed at 12+ institutions. ARR 3x.',
    tone: 'bg-sky',
  },
];

const FLAGSHIPS = ['voice-journal', 'milestone-perk-tracker'];

const resumeAvailable = fs.existsSync(path.join(process.cwd(), 'public', 'resume.pdf'));

export default function Home() {
  const projects = getAllProjects();
  const builds = FLAGSHIPS.map((slug) => projects.find((p) => p.slug === slug)).filter(
    (p): p is NonNullable<typeof p> => Boolean(p)
  );
  const teardowns = getAllCaseStudies()
    .filter((cs) => cs.featured)
    .sort((a, b) => String(b.publishedAt).localeCompare(String(a.publishedAt)))
    .slice(0, 3);
  const threads = getAllThreads().slice(0, 2);

  return (
    <div className="max-w-6xl mx-auto px-5">
      <section className="grid lg:grid-cols-[1.4fr_1fr] gap-10 items-center py-12 md:py-16">
        <div>
          <p className="eyebrow mb-4">Senior Director, Core Lending Suite · M2P Fintech</p>
          <h1 className="page-title text-5xl md:text-7xl">
            I build the{' '}
            <mark className="bg-sun rounded-xl px-2 text-ink">lending tech</mark> banks run on.
          </h1>
          <p className="mt-6 text-lg md:text-xl max-w-xl text-text-secondary">
            API-first lending platforms for banks, NBFCs and fintechs: $50M+ co-lending volume, 15+ institutions, and 4x YoY disbursal
            growth. Based in Bengaluru.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/work" className="pop-btn-solid">
              See my work <ArrowRight size={16} strokeWidth={2.5} />
            </Link>
            <a
              href={resumeAvailable ? '/resume.pdf' : SAME_AS[0]}
              {...(resumeAvailable ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
              className="pop-btn"
            >
              {resumeAvailable ? (
                <>
                  Resume <FileDown size={16} strokeWidth={2.5} />
                </>
              ) : (
                <>
                  LinkedIn <Linkedin size={16} strokeWidth={2.5} />
                </>
              )}
            </a>
          </div>
          {process.env.OPENAI_API_KEY && <HeroAsk />}
        </div>
        <HeroPortrait />
      </section>

      <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 pb-4">
        {metrics.map((m, index) => (
          <MetricCard key={m.label} number={m.number} label={m.label} context={m.context} index={index} />
        ))}
      </section>

      <section className="pt-16">
        <h2 className="page-title text-4xl md:text-5xl mb-2">Built across the loan lifecycle</h2>
        <p className="text-text-secondary mb-8 max-w-2xl">Where the work happened, and what it moved.</p>
        <LifecycleStrip />
      </section>

      <section className="pt-16">
        <div className="flex items-end justify-between flex-wrap gap-3 mb-8">
          <h2 className="page-title text-4xl md:text-5xl">Where I&apos;ve worked</h2>
          <Link href="/work" className="font-bold underline underline-offset-4 inline-flex items-center gap-1">
            Full timeline <ArrowRight size={16} strokeWidth={2.5} />
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {jobs.map((job) => (
            <Link
              key={job.company}
              href="/work"
              className={`block pop-card p-6 ${job.tone} transition-transform duration-150 hover:-translate-y-1`}
            >
              <span className="eyebrow">{job.years}</span>
              <h3 className="font-display text-2xl font-extrabold tracking-tight mt-2">{job.company}</h3>
              <p className="text-sm font-bold mt-1">{job.role}</p>
              <p className="mt-3">{job.line}</p>
            </Link>
          ))}
        </div>
      </section>

      {builds.length > 0 && (
        <section className="pt-16">
          <div className="flex items-end justify-between flex-wrap gap-3 mb-8">
            <h2 className="page-title text-4xl md:text-5xl">Things I made</h2>
            <Link href="/projects" className="font-bold underline underline-offset-4 inline-flex items-center gap-1">
              All builds <ArrowRight size={16} strokeWidth={2.5} />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {builds.map((p) => (
              <Link
                key={p.slug}
                href="/projects"
                className="block pop-card overflow-hidden transition-transform duration-150 hover:-translate-y-1"
              >
                <div className="relative aspect-[16/9] bg-cream border-b-[3px] border-ink">
                  {p.thumbnail && (
                    <Image src={p.thumbnail} alt={p.title} fill sizes="(min-width: 768px) 560px, 100vw" className="object-contain" />
                  )}
                </div>
                <div className="p-6">
                  <h3 className="font-display text-2xl font-extrabold tracking-tight">{p.title}</h3>
                  <p className="mt-2 text-text-secondary">{p.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {teardowns.length > 0 && (
        <section className="pt-16">
          <div className="flex items-end justify-between flex-wrap gap-3 mb-8">
            <h2 className="page-title text-4xl md:text-5xl">Product teardowns</h2>
            <Link href="/case-studies" className="font-bold underline underline-offset-4 inline-flex items-center gap-1">
              All teardowns <ArrowRight size={16} strokeWidth={2.5} />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {teardowns.map((cs) => (
              <CaseStudyCard
                key={cs.slug}
                slug={cs.slug}
                title={cs.title}
                company={cs.company}
                problem={cs.problem}
                tags={cs.tags}
                gradient={cs.gradient}
              />
            ))}
          </div>
        </section>
      )}

      {threads.length > 0 && (
        <section className="pt-16">
          <h2 className="page-title text-4xl md:text-5xl mb-8">Things I wrote</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {threads.map((t) => (
              <a
                key={t.slug}
                href={t.externalUrl || '/threads'}
                {...(t.externalUrl ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="block rounded-lg border-[3px] border-dashed border-ink bg-white p-6 transition-colors duration-150 hover:bg-sun"
              >
                <h3 className="font-display text-xl font-extrabold tracking-tight">{t.title}</h3>
                <p className="mt-2 text-sm text-text-secondary inline-flex items-center gap-2">
                  {new Date(t.publishedAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  {t.readingTime ? ` · ${t.readingTime} min` : ''}
                  {t.externalUrl && <ExternalLink size={14} strokeWidth={2.5} />}
                </p>
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
