import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import Image from 'next/image';
import { CHAT_ENABLED, SAME_AS } from '@/lib/site';
import { HomeNav } from '@/components/home/HomeNav';
import { HomeAsk } from '@/components/home/HomeAsk';
import { HomeEffects } from '@/components/home/HomeEffects';
import { Split } from '@/components/home/Split';
import { ContactBand } from '@/components/site/ContactBand';
import { getAllCaseStudies, getAllProjects, getAllThreads } from '@/lib/content';
import './home.css';

const numbers = [
  { prefix: '$', value: 200, suffix: 'M+', label: 'Loan against securities portfolio', context: 'M2P Fintech', viz: null },
  { prefix: '', value: 40, suffix: '+', label: 'Institutions on the platform', context: 'M2P Fintech', viz: 'squares' },
  { prefix: '$', value: 50, suffix: 'M+', label: 'Co-lending volume across 5 enterprise accounts', context: 'M2P Fintech', viz: 'dots' },
  { prefix: '', value: 4, suffix: 'x', label: 'Loan disbursals, year on year', context: 'Paytm', viz: 'bars4' },
  { prefix: '', value: 3, suffix: 'x', label: 'ARR growth', context: 'Finvolv', viz: 'bars3' },
] as const;

const jobs = [
  {
    years: '2024 to now',
    company: 'M2P Fintech',
    role: 'Senior Director, Core Lending Suite',
    line: 'Co-lending orchestration and loan against securities on an API-first lending platform.',
  },
  {
    years: '2022 to 2024',
    company: 'Paytm',
    role: 'Director, Product, Lending',
    line: '4x loan disbursals, 10.1M active loans and 5 lending partners. UPI Autopay cut churn 10%.',
  },
  {
    years: '2021 to 2022',
    company: 'Finvolv',
    role: 'Lead Product Manager',
    line: 'An API-first lending stack deployed at 12+ institutions. ARR 3x. Real-time underwriting engine, approvals up 45%.',
  },
];

const FLAGSHIPS = ['voice-journal', 'milestone-perk-tracker'];
const BUILD_META: Record<string, { kind: string; title: string }> = {
  'voice-journal': { kind: 'AI product', title: 'Voice Journal' },
  'milestone-perk-tracker': { kind: 'Fintech app', title: 'Milestone & Perk Tracker' },
};
const TEARDOWN_NOTES: Record<string, string> = {
  'juspay-bnpl': 'A target plan, not reported results.',
};

const resumeHref = fs.existsSync(path.join(process.cwd(), 'public', 'resume.pdf')) ? '/resume.pdf' : SAME_AS[0];

const firstSentences = (text: string, count: number) => {
  const out = (text.match(/[^.!?]+[.!?]+(\s|$)/g) ?? [text]).slice(0, count).join('').trim();
  return out.length > 240 && out.includes(';') ? `${out.slice(0, out.indexOf(';'))}.` : out;
};

const SQUARES =Array.from({ length: 40 }, (_, i) => i);

function Viz({ kind }: { kind: (typeof numbers)[number]['viz'] }) {
  if (kind === 'squares') {
    return (
      <div className="vz sq">
        {SQUARES.map((i) => (
          <i key={i} style={{ transitionDelay: `${i * 25}ms` }} />
        ))}
      </div>
    );
  }
  if (kind === 'dots') {
    return (
      <div className="vz dot">
        <i />
        <i />
        <i />
        <i />
        <i />
      </div>
    );
  }
  if (kind === 'bars4') {
    return (
      <div className="vz bars">
        <i />
        <i />
        <i />
        <i />
      </div>
    );
  }
  if (kind === 'bars3') {
    return (
      <div className="vz bars bars3">
        <i />
        <i />
        <i />
      </div>
    );
  }
  return <div />;
}

export default function Home() {
  const projects = getAllProjects();
  const builds = FLAGSHIPS.map((slug) => projects.find((p) => p.slug === slug)).filter(
    (p): p is NonNullable<typeof p> => Boolean(p)
  );
  const teardowns = getAllCaseStudies()
    .filter((cs) => cs.featured)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 4);
  const threads = getAllThreads()
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 2);

  return (
    <div className="oh" id="top">
      <HomeEffects />
      <a className="skip" href="#main">
        Skip to content
      </a>
      <HomeNav />

      <main id="main">
      <section className="hero">
        <div className="wrap">
          <p className="eyebrow fade" style={{ animationDelay: '.1s' }}>
            Senior Director, Core Lending Suite &middot; M2P Fintech
          </p>
          <h1>
            <span className="l">
              <i style={{ animationDelay: '.2s' }}>Joydeep</i>
            </span>
            <span className="l">
              <i style={{ animationDelay: '.34s' }}>Sarkar.</i>
            </span>
          </h1>
          <p className="role fade" style={{ animationDelay: '.9s' }}>
            I turn hard problems into <mark>products</mark> that scale.
          </p>
          <p className="sub fade" style={{ animationDelay: '1s' }}>
            Product leader, earlier at Paytm and Finvolv. Bengaluru.
          </p>
          <div className="row fade" style={{ animationDelay: '1.1s' }}>
            <a className="btn solid" href="#numbers">
              See the numbers <i>&darr;</i>
            </a>
            <a className="btn" href={resumeHref}>
              Resume
            </a>
          </div>
          {CHAT_ENABLED && <HomeAsk />}
        </div>
        <div className="cut">
          <Image src="/images/joydeep-cutout.webp" alt="Joydeep Sarkar" width={720} height={780} priority sizes="(min-width: 900px) 40vw, 86vw" />
        </div>
      </section>

      <section className="slide dark" id="numbers">
        <div className="wrap">
          <p className="eyebrow">By the numbers</p>
          <Split parts={['Products I took to ', { mark: 'scale' }, '.']} lightMark />
          <div style={{ marginTop: 44 }}>
            {numbers.map((n) => (
              <div className="nrow in" key={n.label}>
                <div className="n" data-p={n.prefix} data-v={n.value} data-s={n.suffix}>
                  {n.prefix}
                  {n.value}
                  <em>{n.suffix}</em>
                </div>
                <div className="t">
                  {n.label}
                  <small>{n.context}</small>
                </div>
                <Viz kind={n.viz} />
              </div>
            ))}
          </div>
          <div className="tl in">
            <p className="cap">Last three roles, Dec 2021 to now</p>
            <div className="tlbar">
              <div>
                Finvolv<small>Lead PM</small>
              </div>
              <div>
                Paytm<small>Director, Product, Lending</small>
              </div>
              <div>
                M2P Fintech<small>Senior Director, Core Lending Suite</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="slide paper" id="work">
        <div className="wrap">
          <p className="eyebrow">Work</p>
          <Split parts={['Where it ', { mark: 'happened' }, '.']} />
          <div style={{ marginTop: 44 }}>
            {jobs.map((job) => (
              <div className="rrow in" key={job.company}>
                <span className="y">{job.years}</span>
                <h3>
                  {job.company}
                  <small>{job.role}</small>
                </h3>
                <p>{job.line}</p>
              </div>
            ))}
          </div>
          <Link href="/work" className="more">
            Full timeline &rarr;
          </Link>
        </div>
      </section>

      {builds.length > 0 && (
        <section className="slide sunbg" id="builds">
          <div className="wrap">
            <p className="eyebrow">Builds</p>
            <Split parts={['Things I built ', { mark: 'myself' }, '.']} />
            <div className="bgrid">
              {builds.map((p) => {
                const meta = BUILD_META[p.slug] ?? { kind: 'Project', title: p.title };
                return (
                  <article className="bcard in" key={p.slug} data-cursor="Open">
                    <div className="bimg">
                      {p.thumbnail && (
                        <Image src={p.thumbnail} alt={meta.title} fill sizes="(min-width: 860px) 560px, 100vw" />
                      )}
                    </div>
                    <div className="bbody">
                      <span className="k">{meta.kind}</span>
                      <h3>{meta.title}</h3>
                      <p>{p.description}</p>
                      {p.learned && (
                        <p className="lrn">
                          <b>What I learned</b>
                          {firstSentences(p.learned, 2)}
                        </p>
                      )}
                      <div className="chips">
                        {p.tech.slice(0, 5).map((t) => (
                          <span key={t}>{t}</span>
                        ))}
                      </div>
                      {(p.demoUrl || p.repoUrl) && (
                        <div className="links">
                          {p.demoUrl && (
                            <a href={p.demoUrl} target="_blank" rel="noopener noreferrer">
                              Live site
                            </a>
                          )}
                          {p.repoUrl && (
                            <a href={p.repoUrl} target="_blank" rel="noopener noreferrer">
                              Code
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
            <Link href="/projects" className="more">
              All builds &rarr;
            </Link>
          </div>
        </section>
      )}

      {teardowns.length > 0 && (
        <section className="hs dark" id="teardowns">
          <div className="stick">
            <div className="wrap" style={{ width: '100%' }}>
              <p className="eyebrow">Independent product teardowns</p>
              <Split
                parts={['How I think about ', { mark: "other people's" }, ' products.']}
                style={{ fontSize: 'clamp(34px,5vw,72px)' }}
                lightMark
              />
            </div>
            <div className="track" id="track">
              {teardowns.map((cs, i) => (
                <Link
                  key={cs.slug}
                  href={`/case-studies/${cs.slug}`}
                  className={`tcard${i === 1 ? ' sun' : ''}`}
                  data-cursor="Open"
                >
                  <span className="no">{String(i + 1).padStart(2, '0')}</span>
                  <span className="co">{cs.company}</span>
                  <h3>{cs.title}</h3>
                  <p>
                    {cs.problem}.{TEARDOWN_NOTES[cs.slug] ? ` ${TEARDOWN_NOTES[cs.slug]}` : ''}
                  </p>
                  <div className="chips">
                    {cs.tags.slice(0, 3).map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {threads.length > 0 && (
        <section className="slide paper2" id="writing">
          <div className="wrap">
            <p className="eyebrow">Writing</p>
            <Split parts={['Notes I ', { mark: 'published' }, '.']} />
            <div style={{ marginTop: 44 }}>
              {threads.map((t) => (
                <a
                  key={t.slug}
                  className="wrow in"
                  data-cursor="Read"
                  href={t.externalUrl || '/threads'}
                  {...(t.externalUrl ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  <span className="y">
                    {new Date(t.publishedAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' })}
                    {t.readingTime ? ` · ${t.readingTime} min` : ''}
                  </span>
                  <h3>{t.title}</h3>
                  <p>{t.excerpt}</p>
                  <i>↗</i>
                </a>
              ))}
            </div>
            <Link href="/threads" className="more">
              All writing &rarr;
            </Link>
          </div>
        </section>
      )}

      </main>
      <ContactBand />
    </div>
  );
}
