import Image from 'next/image';
import Link from 'next/link';
import { Building2, HandCoins, TrendingUp, Bot, ArrowRight, FileDown } from 'lucide-react';
import { MetricCard, SkillCard } from '@/components';

const metrics = [
  { number: '$200M+', label: 'Portfolio Processed' },
  { number: '4x', label: 'YoY Growth' },
  { number: '15+', label: 'Institutions' },
  { number: '2M+', label: 'Borrowers' },
];

const skills = [
  {
    icon: <Building2 size={26} strokeWidth={2.5} />,
    title: 'Lending Infrastructure',
    description: (
      <>
        Architecting systems from origination to collections, processing <span className="font-semibold text-text-primary">$200M+ portfolios</span> with strict RBI
        alignment.
      </>
    ),
  },
  {
    icon: <HandCoins size={26} strokeWidth={2.5} />,
    title: 'Co-Lending & Partnerships',
    description: (
      <>
        Built orchestration modules for Banks and NBFCs, supporting <span className="font-semibold text-text-primary">₹1500Cr+ monthly disbursals</span>.
      </>
    ),
  },
  {
    icon: <TrendingUp size={26} strokeWidth={2.5} />,
    title: 'Product Strategy & Growth',
    description: (
      <>
        Drove <span className="font-semibold text-text-primary">4x YoY growth</span> through funnel optimization and revenue products reducing overhead by 60%.
      </>
    ),
  },
  {
    icon: <Bot size={26} strokeWidth={2.5} />,
    title: 'AI & Automation',
    description: (
      <>
        Built LLM workflows for PRD generation and reconciliation automation, cutting manual work by <span className="font-semibold text-text-primary">75%</span>.
      </>
    ),
  },
];

const sections = [
  {
    title: 'Proof of Work',
    href: '/work',
    desc: '12+ years across SBI, Paytm, Finvolv, and M2P building lending systems at scale.',
    tone: 'bg-blue-50 hover:bg-blue-100',
  },
  {
    title: 'Case Studies',
    href: '/case-studies',
    desc: 'Product teardown and execution narratives for neobank, BNPL, collections, and growth work.',
    tone: 'bg-emerald-50 hover:bg-emerald-100',
  },
  {
    title: 'Projects & Experiments',
    href: '/projects',
    desc: 'Hands-on product builds across AI tooling, web apps, and internal systems.',
    tone: 'bg-amber-50 hover:bg-amber-100',
  },
];

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden bg-accent-primary text-white px-6 py-16 md:py-24">
        <div className="poster-shape-circle h-60 w-60 bg-white top-[-80px] left-[-70px]" />
        <div className="poster-shape-square h-44 w-44 bg-white top-12 right-[8%]" />
        <div className="poster-shape-circle h-72 w-72 bg-white bottom-[-120px] right-[-80px]" />

        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-10 items-center relative">
          <div className="lg:col-span-7">
            <p className="text-xs md:text-sm font-semibold uppercase tracking-wider text-white/85 mb-4">Fintech Product Leader</p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[0.95] tracking-[-0.02em] mb-6">
              Joydeep Sarkar
              <span className="block text-white/90">Lending Infrastructure Specialist</span>
            </h1>
            <p className="text-lg md:text-2xl leading-relaxed text-white/90 max-w-2xl mb-8">
              Building scalable financial products that bridge traditional banking and modern technology.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/work"
                className="h-14 md:h-16 px-8 rounded-md bg-white text-accent-primary hover:bg-gray-100 transition-all duration-200 hover:scale-105 inline-flex items-center gap-2 font-semibold uppercase tracking-wider text-sm"
              >
                See My Work <ArrowRight size={18} strokeWidth={2.5} />
              </Link>
              <a
                href="/resume.pdf"
                className="h-14 md:h-16 px-8 rounded-md border-4 border-white text-white hover:bg-white hover:text-accent-primary transition-all duration-200 hover:scale-105 inline-flex items-center gap-2 font-semibold uppercase tracking-wider text-sm"
              >
                Download Resume <FileDown size={18} strokeWidth={2.5} />
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-lg overflow-hidden bg-white p-3 max-w-md lg:ml-auto">
              <Image
                src="/images/joydeep.png"
                alt="Joydeep Sarkar"
                width={520}
                height={640}
                className="w-full h-auto rounded-md object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-bg-muted px-6 py-10 md:py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map((m, index) => (
              <MetricCard key={m.label} number={m.number} label={m.label} index={index} />
            ))}
          </div>
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
              With 12+ years spanning traditional banking (SBI) to high-growth fintech, I translate complex RBI regulation into clear product strategy and scalable delivery.
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

      <section className="bg-bg-muted px-6 py-16 md:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-accent-primary mb-2">Explore</p>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">Portfolio Sections</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {sections.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className={`group rounded-lg p-7 ${item.tone} transition-all duration-200 hover:scale-[1.02]`}
              >
                <h3 className="text-2xl font-extrabold tracking-tight text-text-primary mb-3">{item.title}</h3>
                <p className="text-text-secondary leading-relaxed mb-5">{item.desc}</p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-accent-primary">
                  Open <ArrowRight size={16} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform duration-200" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-accent-amber px-6 py-14">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-6">
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-text-primary">Available for product leadership and advisory roles.</h2>
          <a
            href="mailto:joytdh@gmail.com"
            className="h-14 px-7 rounded-md bg-text-primary text-white hover:bg-black transition-all duration-200 hover:scale-105 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider"
          >
            Start a Conversation <ArrowRight size={16} strokeWidth={2.5} />
          </a>
        </div>
      </section>
    </>
  );
}
