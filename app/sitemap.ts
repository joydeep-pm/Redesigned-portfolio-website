import type { MetadataRoute } from 'next';
import { getAllCaseStudies, getAllProjects } from '@/lib/content';
import { SITE_URL } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['', '/work', '/case-studies', '/projects', '/threads'].map((path) => ({
    url: `${SITE_URL}${path}`,
  }));

  const caseStudies = getAllCaseStudies().map((cs) => ({
    url: `${SITE_URL}/case-studies/${cs.slug}`,
    ...(cs.publishedAt && !Number.isNaN(Date.parse(cs.publishedAt))
      ? { lastModified: new Date(cs.publishedAt) }
      : {}),
  }));

  const projects = getAllProjects().map((p) => ({
    url: `${SITE_URL}/projects/${p.slug}`,
  }));

  return [...staticRoutes, ...caseStudies, ...projects];
}
