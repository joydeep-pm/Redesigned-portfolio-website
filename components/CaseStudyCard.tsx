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
  blue: 'bg-sky',
  purple: 'bg-lilac',
  green: 'bg-mint',
  orange: 'bg-sun',
  pink: 'bg-pink',
  mint: 'bg-mint',
};

export function CaseStudyCard({ title, company, problem, tags, slug, gradient = 'blue' }: Props) {
  return (
    <Link href={`/case-studies/${slug}`} className="group block pop-card p-5 transition-transform duration-150 hover:-translate-y-1">
      <div className={`${colorClasses[gradient] || colorClasses.blue} aspect-[16/9] rounded-md border-2 border-ink mb-5 flex items-center justify-center`}>
        <span className="font-display text-3xl font-extrabold tracking-tight text-ink/60 text-center px-4">{company}</span>
      </div>

      <p className="eyebrow text-text-muted mb-2">Independent product teardown</p>
      <div className="flex gap-2 mb-3 flex-wrap">
        {tags.slice(0, 2).map((tag) => (
          <span key={tag} className="text-xs px-3 py-1 rounded-full border-2 border-ink font-bold">
            {tag}
          </span>
        ))}
      </div>
      <h3 className="font-display text-2xl font-extrabold tracking-tight mb-2 group-hover:underline">{title}</h3>
      <p className="text-text-secondary leading-relaxed">{problem}</p>
    </Link>
  );
}
