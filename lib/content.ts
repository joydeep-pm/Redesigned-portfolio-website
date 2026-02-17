import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content');

export interface WorkItem {
  slug: string;
  title: string;
  role: string;
  duration: string;
  startDate: string;
  metric: string;
  tags: string[];
  order: number;
  featured: boolean;
  current: boolean;
  logo?: string;
  content: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  company: string;
  problem: string;
  tags: string[];
  thumbnail?: string;
  thumbnailBg?: string;
  gradient?: string;
  featured: boolean;
  publishedAt: string;
  readingTime?: number;
  content: string;
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  status: 'active' | 'completed' | 'experimental' | 'archived';
  tech: string[];
  demoUrl?: string;
  repoUrl?: string;
  thumbnail?: string;
  featured: boolean;
  order: number;
  content: string;
}

export interface Thread {
  slug: string;
  title: string;
  excerpt?: string;
  tags: string[];
  publishedAt: string;
  readingTime?: number;
  featured: boolean;
  draft: boolean;
  externalUrl?: string;
  content: string;
}

function getFiles(dir: string): string[] {
  const fullPath = path.join(contentDirectory, dir);
  if (!fs.existsSync(fullPath)) return [];
  return fs.readdirSync(fullPath).filter(file => file.endsWith('.mdx') || file.endsWith('.md'));
}

export function getAllWork(): WorkItem[] {
  const files = getFiles('work');
  const items = files.map(filename => {
    const filePath = path.join(contentDirectory, 'work', filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug: filename.replace(/\.mdx?$/, ''),
      title: data.title || '',
      role: data.role || '',
      duration: data.duration || '',
      startDate: data.startDate || '',
      metric: data.metric || '',
      tags: data.tags || [],
      order: data.order || 99,
      featured: data.featured || false,
      current: data.current || false,
      logo: data.logo,
      content,
    };
  });

  return items.sort((a, b) => a.order - b.order);
}

export function getAllCaseStudies(): CaseStudy[] {
  const files = getFiles('case-studies');
  const items = files.map(filename => {
    const filePath = path.join(contentDirectory, 'case-studies', filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug: filename.replace(/\.mdx?$/, ''),
      title: data.title || '',
      company: data.company || '',
      problem: data.problem || '',
      tags: data.tags || [],
      thumbnail: data.thumbnail,
      thumbnailBg: data.thumbnailBg,
      gradient: data.gradient || 'blue',
      featured: data.featured || false,
      publishedAt: data.publishedAt || '',
      readingTime: data.readingTime,
      content,
    };
  });

  return items;
}

export function getCaseStudyBySlug(slug: string): CaseStudy | null {
  const items = getAllCaseStudies();
  return items.find(item => item.slug === slug) || null;
}

export function getAllProjects(): Project[] {
  const files = getFiles('projects');
  const items = files.map(filename => {
    const filePath = path.join(contentDirectory, 'projects', filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug: filename.replace(/\.mdx?$/, ''),
      title: data.title || '',
      description: data.description || '',
      status: data.status || 'completed',
      tech: data.tech || [],
      demoUrl: data.demoUrl,
      repoUrl: data.repoUrl,
      thumbnail: data.thumbnail,
      featured: data.featured || false,
      order: data.order || 99,
      content,
    };
  });

  return items.sort((a, b) => a.order - b.order);
}

export function getProjectBySlug(slug: string): Project | null {
  const items = getAllProjects();
  return items.find(item => item.slug === slug) || null;
}

export function getAllThreads(): Thread[] {
  const files = getFiles('threads');
  const items = files.map(filename => {
    const filePath = path.join(contentDirectory, 'threads', filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug: filename.replace(/\.mdx?$/, ''),
      title: data.title || '',
      excerpt: data.excerpt,
      tags: data.tags || [],
      publishedAt: data.publishedAt || '',
      readingTime: data.readingTime,
      featured: data.featured || false,
      draft: data.draft || false,
      externalUrl: data.externalUrl,
      content,
    };
  });

  return items.filter(t => !t.draft);
}

export function getThreadBySlug(slug: string): Thread | null {
  const files = getFiles('threads');
  const items = files.map(filename => {
    const filePath = path.join(contentDirectory, 'threads', filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug: filename.replace(/\.mdx?$/, ''),
      title: data.title || '',
      excerpt: data.excerpt,
      tags: data.tags || [],
      publishedAt: data.publishedAt || '',
      readingTime: data.readingTime,
      featured: data.featured || false,
      draft: data.draft || false,
      externalUrl: data.externalUrl,
      content,
    };
  });
  return items.find(item => item.slug === slug) || null;
}
