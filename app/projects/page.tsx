import { getAllProjects } from '@/lib/content';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Side projects and experiments in AI and fintech tooling.',
  alternates: { canonical: '/projects' },
};

const statusTone: Record<string, string> = {
  active: 'bg-emerald-500 text-white',
  completed: 'bg-blue-500 text-white',
  experimental: 'bg-amber-500 text-white',
  archived: 'bg-gray-500 text-white',
};

const FLAGSHIP_SLUGS = ['voice-journal', 'milestone-perk-tracker'];

function problemSummary(content: string): string {
  const match = content.match(/##[^\n]*The Problem\s*\n+([\s\S]*?)(?=\n##|$)/);
  if (!match) return '';
  return match[1]
    .split(/\n{2,}/)
    .slice(0, 2)
    .join(' ')
    .replace(/\*\*/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export default function ProjectsPage() {
  const all = getAllProjects();
  const flagships = FLAGSHIP_SLUGS.map((slug) => all.find((p) => p.slug === slug)).filter(
    (p): p is NonNullable<typeof p> => Boolean(p)
  );
  const projects = all.filter((p) => !FLAGSHIP_SLUGS.includes(p.slug));

  return (
    <>
      <section className="relative overflow-hidden bg-accent-secondary text-white px-6 py-14 md:py-20">
        <div className="poster-shape-circle h-56 w-56 bg-white top-[-70px] right-[-60px]" />
        <div className="poster-shape-square h-40 w-40 bg-white bottom-8 left-[8%]" />
        <div className="max-w-7xl mx-auto relative">
          <p className="text-xs font-semibold uppercase tracking-wider text-white/80 mb-3">Selected Builds</p>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[0.95] mb-4">Projects</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl">Product and engineering experiments across AI, developer tooling, and consumer UX.</p>
        </div>
      </section>

      {flagships.length > 0 && (
        <section className="bg-white px-6 py-12 md:py-16">
          <div className="max-w-7xl mx-auto">
            <p className="text-xs font-semibold uppercase tracking-wider text-accent-primary mb-2">Flagship builds</p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8">Two things I built end to end</h2>
            <div className="grid lg:grid-cols-2 gap-8">
              {flagships.map((project) => (
                <article key={project.slug} className="rounded-lg bg-bg-muted p-6">
                  <div className="relative mb-6 rounded-lg overflow-hidden bg-white aspect-[16/10]">
                    {project.thumbnail && (
                      <Image
                        src={project.thumbnail}
                        alt={project.title}
                        fill
                        sizes="(min-width: 1024px) 560px, 100vw"
                        className="object-contain"
                        priority
                      />
                    )}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-text-primary mb-3">{project.title}</h3>
                  <p className="text-text-secondary mb-4">{project.description}</p>
                  <p className="text-xs font-semibold uppercase tracking-wider text-accent-primary mb-2">Why I built it</p>
                  <p className="text-text-secondary leading-relaxed mb-5">{problemSummary(project.content)}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.slice(0, 5).map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-3 py-1 rounded-full bg-white text-text-muted uppercase tracking-wider font-semibold"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="h-12 px-5 rounded-md bg-accent-primary text-white hover:bg-blue-600 transition-all duration-200 hover:scale-105 inline-flex items-center text-xs font-semibold uppercase tracking-wider"
                  >
                    Read the build
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-bg-muted px-6 py-12 md:py-16">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-6">More builds</p>
        </div>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <article key={project.slug} className="rounded-lg bg-white p-5 border-2 border-border-default transition-all duration-200 hover:scale-[1.02]">
              <div className="relative mb-5 rounded-lg overflow-hidden bg-bg-muted aspect-[16/10]">
                {project.thumbnail ? (
                  <Image
                    src={project.thumbnail}
                    alt={project.title}
                    fill
                    className="object-contain"
                    priority={index < 2}
                  />
                ) : (
                  <div className="absolute inset-0 grid grid-cols-2 gap-3 p-4">
                    <div className="rounded-md bg-white" />
                    <div className="rounded-md bg-blue-100" />
                    <div className="rounded-md bg-emerald-100" />
                    <div className="rounded-md bg-amber-100" />
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between gap-4 mb-3">
                <h2 className="text-2xl font-extrabold tracking-tight text-text-primary">{project.title}</h2>
                <span
                  className={`text-xs px-3 py-1 rounded-full uppercase tracking-wider font-semibold ${
                    statusTone[project.status] || 'bg-gray-500 text-white'
                  }`}
                >
                  {project.status}
                </span>
              </div>

              <p className="text-text-secondary leading-relaxed mb-4">{project.description}</p>

              <div className="flex flex-wrap gap-2 mb-5">
                {project.tech.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-3 py-1 rounded-full bg-bg-muted text-text-muted uppercase tracking-wider font-semibold"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <Link
                href={`/projects/${project.slug}`}
                className="h-12 px-5 rounded-md border-4 border-accent-primary text-accent-primary hover:bg-accent-primary hover:text-white transition-all duration-200 hover:scale-105 inline-flex items-center text-xs font-semibold uppercase tracking-wider"
              >
                View Project
              </Link>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
