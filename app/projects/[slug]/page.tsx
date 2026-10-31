import { getAllProjects, getProjectBySlug } from '@/lib/content';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import remarkGfm from 'remark-gfm';
import type { Metadata } from 'next';
import { SubShell } from '@/components/site/SubShell';

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: { title: project.title, description: project.description, url: `/projects/${slug}` },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <SubShell>
      <section className="phero sun">
        <div className="wrap">
          <Link href="/projects" className="back">
            &larr; All builds
          </Link>
          <p className="eyebrow">Build &middot; {project.status}</p>
          <h1 style={{ letterSpacing: '-.05em' }}>{project.title}</h1>
          <p className="lead">{project.description}</p>
          {(project.demoUrl || project.repoUrl) && (
            <div className="row">
              {project.demoUrl && (
                <a className="btn solid" href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                  Live demo <i>↗</i>
                </a>
              )}
              {project.repoUrl && (
                <a className="btn" href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                  View code
                </a>
              )}
            </div>
          )}
        </div>
      </section>

      <section className="psec" style={{ paddingTop: 70 }}>
        <div className="wrap">
          {project.tech && project.tech.length > 0 && (
            <div style={{ marginBottom: 56 }}>
              <p className="sublabel" style={{ marginTop: 0 }}>
                Built with
              </p>
              <div className="techgrid">
                {project.tech.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </div>
          )}
          <div className="prose prose-wrap">
            <MDXRemote source={project.content} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
          </div>
          <Link href="/projects" className="more">
            More builds &rarr;
          </Link>
        </div>
      </section>
    </SubShell>
  );
}
