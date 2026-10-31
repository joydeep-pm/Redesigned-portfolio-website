import { getAllProjects } from '@/lib/content';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { SubShell } from '@/components/site/SubShell';
import { PageHero } from '@/components/site/PageHero';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Side projects and experiments in AI and fintech tooling.',
  alternates: { canonical: '/projects' },
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
    <SubShell>
      <PageHero
        eyebrow="Selected builds"
        title={['Things I built ', { mark: 'myself' }, '.']}
        lead="Product and engineering experiments across AI, developer tooling, and consumer UX."
      />

      {flagships.length > 0 && (
        <section className="psec tight">
          <div className="wrap">
            <p className="sublabel" style={{ marginTop: 0 }}>
              Flagship builds
            </p>
            <div className="bgrid" style={{ marginTop: 18 }}>
              {flagships.map((project) => (
                <article className="bcard in" key={project.slug} data-cursor="Open">
                  <div className="bimg">
                    {project.thumbnail && (
                      <Image
                        src={project.thumbnail}
                        alt={project.title}
                        fill
                        sizes="(min-width: 860px) 560px, 100vw"
                        priority
                      />
                    )}
                  </div>
                  <div className="bbody">
                    <span className="k">Why I built it</span>
                    <h3>
                      <Link href={`/projects/${project.slug}`}>{project.title}</Link>
                    </h3>
                    <p>{project.description}</p>
                    <p>{problemSummary(project.content)}</p>
                    {project.learned && (
                      <p className="lrn">
                        <b>What I learned</b>
                        {project.learned}
                      </p>
                    )}
                    <div className="chips">
                      {project.tech.slice(0, 5).map((tech) => (
                        <span key={tech}>{tech}</span>
                      ))}
                    </div>
                    <Link href={`/projects/${project.slug}`} className="go">
                      Read the build &rarr;
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="psec">
        <div className="wrap">
          <p className="sublabel" style={{ marginTop: 0 }}>
            More builds
          </p>
          <div className="bgrid" style={{ marginTop: 18 }}>
            {projects.map((project, index) => (
              <article className="bcard in" key={project.slug} data-cursor="Open">
                <div className={`bimg${project.thumbnail ? '' : ' ph'}`}>
                  {project.thumbnail ? (
                    <Image
                      src={project.thumbnail}
                      alt={project.title}
                      fill
                      sizes="(min-width: 860px) 560px, 100vw"
                      priority={index < 2}
                    />
                  ) : (
                    project.title
                  )}
                </div>
                <div className="bbody">
                  <div className="bhead">
                    <h3>
                      <Link href={`/projects/${project.slug}`}>{project.title}</Link>
                    </h3>
                    <span className="status">{project.status}</span>
                  </div>
                  <p>{project.description}</p>
                  <div className="chips">
                    {project.tech.slice(0, 4).map((tech) => (
                      <span key={tech}>{tech}</span>
                    ))}
                  </div>
                  <Link href={`/projects/${project.slug}`} className="go">
                    View project &rarr;
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </SubShell>
  );
}
