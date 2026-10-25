import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { Building2, HandCoins, TrendingUp, Bot, ArrowRight, FileDown, Linkedin } from 'lucide-react';
import { SAME_AS } from '@/lib/site';
import { MetricCard, SkillCard, CaseStudyCard } from '@/components';
import { HeroPortrait } from '@/components/HeroPortrait';
import { HeroAsk } from '@/components/HeroAsk';
import { LifecycleStrip } from '@/components/LifecycleStrip';
import { getAllCaseStudies } from '@/lib/content';

const metrics = [
  { number: '$200M+', label: 'Portfolio Processed', context: 'M2P Fintech' },
  { number: '4x', label: 'YoY Loan Disbursal Growth', context: 'Paytm' },
  { number: '15+', label: 'Institutions', context: 'M2P Fintech' },
  { number: '$50M+', label: 'Co-Lending Volume', context: 'M2P Fintech, 5 enterprise accounts' },
];

const resumeAvailable = fs.existsSync(path.join(process.cwd(), 'public', 'resume.pdf'));

const skills = [
  {
    icon: <Building2 size={26} strokeWidth={2.5} />,
    title: 'Lending Infrastructure',
    source: 'M2P Fintech',
    href: '/work',
    description: (
      <>
        Leading an API-first, low-code LOS/LMS from origination to collections, with a{' '}
        <span className="font-semibold text-text-primary">$200M+ loan-against-securities portfolio</span> on top.
      </>
    ),
  },
  {
    icon: <HandCoins size={26} strokeWidth={2.5} />,
    title: 'Co-Lending & Partnerships',
    source: 'M2P Fintech · Paytm',
    href: '/work',
    description: (
      <>
        Shipped multi-lender co-lending at M2P (<span className="font-semibold text-text-primary">$50M+ volume</span>), and integrated 5 lending partners
        securing <span className="font-semibold text-text-primary">₹1500Cr+ monthly disbursal capital</span> at Paytm.
      </>
    ),
  },
  {
    icon: <TrendingUp size={26} strokeWidth={2.5} />,
    title: 'Product Strategy & Growth',
    source: 'Paytm · M2P Fintech',
    href: '/work',
    description: (
      <>
        Drove <span className="font-semibold text-text-primary">4x YoY loan disbursal growth</span> at Paytm, then cut operational overhead by 60% at M2P
        through workflow automation.
      </>
    ),
  },
  {
    icon: <Bot size={26} strokeWidth={2.5} />,
    title: 'AI & Automation',
    source: 'Personal builds',
    href: '/projects',
    description: (
      <>
        Built LLM workflows for PRD generation and reconciliation automation, plus an MCP server, a voice journal and a portfolio concierge.
      </>
    ),
  },
];

export default function Home() {
  const featuredCaseStudies = getAllCaseStudies()
    .filter((cs) => cs.featured)
    .sort((a, b) => String(b.publishedAt).localeCompare(String(a.publishedAt)))
    .slice(0, 3);

  return (
    <>
      <section className="relative overflow-hidden bg-accent-primary text-white px-6 py-16 md:py-24">
        <div className="poster-shape-circle h-60 w-60 bg-white top-[-80px] left-[-70px]" />
        <div className="poster-shape-square h-44 w-44 bg-white top-12 right-[8%]" />
        <div className="poster-shape-circle h-72 w-72 bg-white bottom-[-120px] right-[-80px]" />

        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-10 items-center relative">
          <div className="lg:col-span-7">
            <p className="text-xs md:text-sm font-semibold uppercase tracking-wider text-white/85 mb-4">
              Senior Director, Core Lending Suite · M2P Fintech
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[0.95] tracking-[-0.02em] mb-6">
              Joydeep Sarkar
              <span className="block text-white/90">Lending Infrastructure Specialist</span>
            </h1>
            <p className="text-lg md:text-2xl leading-relaxed text-white/90 max-w-2xl mb-8">
              API-first lending platforms for banks, NBFCs and fintechs: $50M+ co-lending volume, 15+ institutions, and 4x YoY disbursal
              growth.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/work"
                className="h-14 md:h-16 px-8 rounded-md bg-white text-accent-primary hover:bg-gray-100 transition-all duration-200 hover:scale-105 inline-flex items-center gap-2 font-semibold uppercase tracking-wider text-sm"
              >
                See My Work <ArrowRight size={18} strokeWidth={2.5} />
              </Link>
              <a
                href={resumeAvailable ? '/resume.pdf' : SAME_AS[0]}
                {...(resumeAvailable ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
                className="h-14 md:h-16 px-8 rounded-md border-4 border-white text-white hover:bg-white hover:text-accent-primary transition-all duration-200 hover:scale-105 inline-flex items-center gap-2 font-semibold uppercase tracking-wider text-sm"
              >
                {resumeAvailable ? (
                  <>
                    Download Resume <FileDown size={18} strokeWidth={2.5} />
                  </>
                ) : (
                  <>
                    View LinkedIn <Linkedin size={18} strokeWidth={2.5} />
                  </>
                )}
              </a>
            </div>
            <HeroAsk />
          </div>

          <div className="lg:col-span-5">
            <HeroPortrait />
          </div>
        </div>
      </section>

      <section className="bg-bg-muted px-6 py-10 md:py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map((m, index) => (
              <MetricCard key={m.label} number={m.number} label={m.label} context={m.context} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16 md:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-accent-primary mb-2">Case Studies</p>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">Start with the proof</h2>
            </div>
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-accent-primary hover:underline"
            >
              All case studies <ArrowRight size={16} strokeWidth={2.5} />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {featuredCaseStudies.map((cs) => (
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
        </div>
      </section>

      <section className="bg-white px-6 pb-16 md:pb-20">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-wider text-accent-primary mb-2">Domain depth</p>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8">Built across the loan lifecycle</h2>
          <LifecycleStrip />
        </div>
      </section>

      <section className="bg-white px-6 py-16 md:py-24">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-accent-primary mb-3">Mission</p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
              Making Indian lending infrastructure world-class.
            </h2>
          </div>
          <div className="lg:col-span-8 space-y-6 text-lg leading-relaxed text-text-secondary">
            <p>
              With 14+ years spanning traditional banking (SBI) to high-growth fintech, I translate complex RBI regulation into clear product strategy and scalable delivery.
            </p>
            <p>
              I specialize in API-first lending systems, co-lending frameworks, and portfolio operations that manage high disbursal volume while improving inclusion outcomes.
            </p>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-accent-secondary px-6 py-16 md:py-20">
        <div className="poster-shape-square h-44 w-44 bg-white top-10 left-10" />
        <div className="poster-shape-circle h-56 w-56 bg-white bottom-[-80px] right-[-40px]" />

        <div className="max-w-7xl mx-auto relative">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-white/80 mb-2">Core Capabilities</p>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">How I Build</h2>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {skills.map((skill) => (
              <SkillCard key={skill.title} {...skill} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-accent-amber px-6 py-14">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-6">
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-text-primary">Open to advisory work and select leadership conversations.</h2>
          <div className="flex flex-wrap gap-3">
          <a
            href="mailto:joytdh@gmail.com"
            className="h-14 px-7 rounded-md bg-text-primary text-white hover:bg-black transition-all duration-200 hover:scale-105 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider"
          >
            Start a Conversation <ArrowRight size={16} strokeWidth={2.5} />
          </a>
          <a
            href={SAME_AS[0]}
            target="_blank"
            rel="noopener noreferrer"
            className="h-14 px-7 rounded-md border-4 border-text-primary text-text-primary hover:bg-text-primary hover:text-white transition-all duration-200 hover:scale-105 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider"
          >
            LinkedIn <Linkedin size={16} strokeWidth={2.5} />
          </a>
          </div>
        </div>
      </section>
    </>
  );
}
