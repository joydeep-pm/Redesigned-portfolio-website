import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="px-6 py-24 md:py-32">
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-4">404</p>
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-text-primary mb-4">
          That page does not exist
        </h1>
        <p className="text-lg text-text-secondary mb-8">
          It may have moved. Try the case studies or projects instead.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/" className="text-accent-primary font-semibold hover:underline">
            Home
          </Link>
          <Link href="/case-studies" className="text-accent-primary font-semibold hover:underline">
            Case studies
          </Link>
          <Link href="/projects" className="text-accent-primary font-semibold hover:underline">
            Projects
          </Link>
        </div>
      </div>
    </section>
  );
}
