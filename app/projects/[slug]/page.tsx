import { getAllProjects, getProjectBySlug } from '@/lib/content';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import remarkGfm from 'remark-gfm';

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <>
      <section className="bg-accent-primary text-white px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/85 hover:text-white mb-6"
          >
            <ArrowLeft size={14} strokeWidth={2.5} /> Back to Projects
          </Link>
          <div className="grid md:grid-cols-2 gap-10 items-end">
            <div>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[0.95]">{project.title}</h1>
            </div>
            <div>
              <p className="text-lg text-white/90 leading-relaxed mb-6">{project.description}</p>
              <div className="flex flex-wrap gap-3">
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-12 px-5 rounded-md bg-white text-accent-primary hover:bg-gray-100 transition-all duration-200 hover:scale-105 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider"
                  >
                    <ExternalLink size={14} strokeWidth={2.5} /> Live Demo
                  </a>
                )}
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-12 px-5 rounded-md border-4 border-white text-white hover:bg-white hover:text-accent-primary transition-all duration-200 hover:scale-105 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider"
                  >
                    <Github size={14} strokeWidth={2.5} /> View Code
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {project.tech && project.tech.length > 0 && (
        <section className="bg-bg-muted px-6 py-12">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-text-primary mb-6">Deliverables / Skills Utilized</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {project.tech.map((t) => (
                <div key={t} className="h-16 rounded-lg bg-white border-2 border-border-default flex items-center justify-center px-3">
                  <span className="text-sm font-semibold uppercase tracking-wider text-text-primary text-center">{t}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-white px-6 py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none prose-headings:font-extrabold prose-headings:tracking-tight prose-headings:text-text-primary prose-p:text-text-secondary prose-strong:text-text-primary prose-a:text-accent-primary">
            <MDXRemote source={project.content} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
          </div>
        </div>
      </section>
    </>
  );
}
