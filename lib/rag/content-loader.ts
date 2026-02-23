import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { RagRawDocument, RagSourceType } from './types';

const contentRoot = path.join(process.cwd(), 'content');

function stripMdx(input: string): string {
  return input
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/!\[[^\]]*\]\([^\)]*\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^\)]*\)/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/^>\s?/gm, '')
    .replace(/^[-*+]\s+/gm, '')
    .replace(/^\d+\.\s+/gm, '')
    .replace(/\{[^\}]*\}/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function readMdxDocuments(dirName: string, sourceType: RagSourceType): RagRawDocument[] {
  const dirPath = path.join(contentRoot, dirName);
  if (!fs.existsSync(dirPath)) return [];

  return fs
    .readdirSync(dirPath)
    .filter((name) => name.endsWith('.md') || name.endsWith('.mdx'))
    .map((filename) => {
      const filePath = path.join(dirPath, filename);
      const raw = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(raw);
      const slug = filename.replace(/\.mdx?$/, '');

      const baseTitle =
        String(data.title || data.company || slug)
          .replace(/-/g, ' ')
          .trim() || slug;

      let href = `/${dirName}/${slug}`;
      if (sourceType === 'work') href = '/work';
      if (sourceType === 'thread' && data.externalUrl) href = String(data.externalUrl);

      const prefaceParts: string[] = [];
      if (data.role) prefaceParts.push(`Role: ${data.role}`);
      if (data.duration) prefaceParts.push(`Duration: ${data.duration}`);
      if (data.metric) prefaceParts.push(`Metric: ${data.metric}`);
      if (data.problem) prefaceParts.push(`Problem: ${data.problem}`);
      if (data.description) prefaceParts.push(`Description: ${data.description}`);
      if (Array.isArray(data.tags) && data.tags.length) prefaceParts.push(`Tags: ${data.tags.join(', ')}`);
      if (Array.isArray(data.tech) && data.tech.length) prefaceParts.push(`Tech: ${data.tech.join(', ')}`);
      if (data.excerpt) prefaceParts.push(`Excerpt: ${data.excerpt}`);

      return {
        id: `${sourceType}:${slug}`,
        sourceType,
        slug,
        title: baseTitle,
        href,
        tags: Array.isArray(data.tags) ? data.tags.map(String) : Array.isArray(data.tech) ? data.tech.map(String) : [],
        text: stripMdx(`${baseTitle}. ${prefaceParts.join('. ')}. ${content}`),
      } satisfies RagRawDocument;
    });
}

function buildProfileDocument(): RagRawDocument {
  const text = stripMdx(`
    Joydeep Sarkar is a fintech product leader and lending infrastructure specialist.
    He builds scalable financial products bridging traditional banking and modern technology.
    Key metrics include: $200M+ portfolio processed, 4x YoY growth, 15+ institutions, and 2M+ borrowers.
    He has 12+ years of experience spanning SBI, Paytm, Finvolv, and M2P.
    Core strengths include lending infrastructure, co-lending partnerships, product strategy and growth, and AI automation.
    He has built co-lending and lending systems supporting ₹1500Cr+ monthly disbursals and used AI automation to reduce manual effort by 75%.
    He is open to product leadership roles, advisory engagements, and fintech operating discussions.
    Contact channels include email, LinkedIn, GitHub, and Twitter/X via the website footer.
  `);

  return {
    id: 'profile:joydeep-sarkar',
    sourceType: 'profile',
    slug: 'joydeep-sarkar',
    title: 'Joydeep Sarkar Profile Overview',
    href: '/',
    tags: ['profile', 'leadership', 'fintech', 'lending'],
    text,
  };
}

export function loadRagDocuments(): RagRawDocument[] {
  const docs = [
    buildProfileDocument(),
    ...readMdxDocuments('work', 'work'),
    ...readMdxDocuments('projects', 'project'),
    ...readMdxDocuments('case-studies', 'case-study'),
    ...readMdxDocuments('threads', 'thread'),
  ];

  return docs.filter((doc) => doc.text.length > 0);
}
