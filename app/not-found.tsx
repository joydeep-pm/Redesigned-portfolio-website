import Link from 'next/link';
import { SubShell } from '@/components/site/SubShell';

export default function NotFound() {
  return (
    <SubShell>
      <section className="nf">
        <div className="wrap">
          <p className="eyebrow">Page not found</p>
          <h1>
            4<mark>0</mark>4.
          </h1>
          <p>That page does not exist. It may have moved. Try the teardowns or builds instead.</p>
          <div className="row">
            <Link className="btn solid" href="/">
              Home <i>&rarr;</i>
            </Link>
            <Link className="btn" href="/case-studies">
              Teardowns
            </Link>
            <Link className="btn" href="/projects">
              Builds
            </Link>
          </div>
        </div>
      </section>
    </SubShell>
  );
}
