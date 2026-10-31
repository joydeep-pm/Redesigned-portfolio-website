import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import type { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { SubShell } from '@/components/site/SubShell';
import { PageHero } from '@/components/site/PageHero';

const DESCRIPTION =
  'A logistics-native BNPL built with Finvolv for Aramex: the loan is created when the parcel is delivered, not at checkout. Launched across Saudi Arabia, the UAE and Nigeria.';

export const metadata: Metadata = {
  title: 'Aramex SMART',
  description: DESCRIPTION,
  alternates: { canonical: '/work/aramex-smart' },
  openGraph: { title: 'Aramex SMART | Joydeep Sarkar', description: DESCRIPTION, type: 'article', url: '/work/aramex-smart' },
};

const stats = [
  { n: '500K+', l: 'users across 3 markets' },
  { n: '5mn SAR', l: 'live portfolio' },
  { n: '35+', l: 'merchants onboarded' },
  { n: '+45%', l: 'approval rate lift' },
  { n: '6 months', l: 'inception to go-live' },
];

export default function AramexSmartPage() {
  const source = fs.readFileSync(path.join(process.cwd(), 'content', 'pages', 'aramex-smart.mdx'), 'utf8');

  return (
    <SubShell>
      <PageHero
        tone="sun"
        eyebrow="Finvolv for Aramex · KSA, UAE, Nigeria"
        title={['Aramex ', { mark: 'SMART' }, '.']}
        lead={DESCRIPTION}
      >
        <Link href="/work" className="back">
          &larr; All work
        </Link>
      </PageHero>

      <section className="psec" style={{ paddingTop: 50 }}>
        <div className="wrap">
          <dl className="astats">
            {stats.map((s) => (
              <div key={s.l}>
                <dt>{s.n}</dt>
                <dd>{s.l}</dd>
              </div>
            ))}
          </dl>
          <div className="prose prose-wrap">
            <MDXRemote source={source} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
          </div>
          <Link href="/work" className="more">
            Back to all work &rarr;
          </Link>
        </div>
      </section>
    </SubShell>
  );
}
