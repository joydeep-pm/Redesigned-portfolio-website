import Link from 'next/link';

interface Props {
  title: string;
  company: string;
  problem: string;
  tags: string[];
  slug: string;
  gradient?: string;
}

const colorClasses: Record<string, string> = {
  blue: 'bg-blue-100',
  purple: 'bg-violet-100',
  green: 'bg-emerald-100',
  orange: 'bg-amber-100',
  pink: 'bg-rose-100',
  mint: 'bg-teal-100',
};

export function CaseStudyCard({ title, company, problem, tags, slug, gradient = 'blue' }: Props) {
  return (
    <Link href={`/case-studies/${slug}`} className="group block rounded-lg bg-white p-5 transition-all duration-200 hover:scale-[1.02]">
      <div className={`${colorClasses[gradient] || colorClasses.blue} aspect-[16/9] rounded-lg mb-5 flex items-center justify-center`}>
        <span className="text-3xl font-extrabold tracking-tight text-text-primary/40 text-center px-4">{company}</span>
      </div>

      <div className="flex gap-2 mb-3 flex-wrap">
        {tags.slice(0, 2).map((tag) => (
          <span key={tag} className="text-xs px-3 py-1 bg-bg-muted text-text-muted rounded-full uppercase tracking-wider font-semibold">
            {tag}
          </span>
        ))}
      </div>
      <h3 className="text-2xl font-extrabold tracking-tight text-text-primary mb-2 group-hover:text-accent-primary transition-colors duration-200">
        {title}
      </h3>
      <p className="text-text-secondary leading-relaxed">{problem}</p>
    </Link>
  );
}
