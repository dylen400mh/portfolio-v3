import fs from "node:fs";
import path from "node:path";

const CONTENT_DIR = path.join(process.cwd(), "content");

export type PostMeta = {
  title: string;
  date: string; // ISO date, e.g. "2026-06-22"
  description: string;
};

export type PostListing = PostMeta & { slug: string };

/**
 * Slugs for every post in /content (filename without the .mdx extension).
 * Files starting with "_" (e.g. _template.mdx) are reference/drafts and are
 * excluded from the published site.
 */
export function getPostSlugs(): string[] {
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".mdx") && !file.startsWith("_"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

/** Read a single post's exported `metadata` object. */
export async function getPostMeta(slug: string): Promise<PostMeta> {
  const mod = await import(`@/content/${slug}.mdx`);
  return mod.metadata as PostMeta;
}

/** All posts with metadata, newest first. */
export async function getAllPosts(): Promise<PostListing[]> {
  const posts = await Promise.all(
    getPostSlugs().map(async (slug) => ({ slug, ...(await getPostMeta(slug)) })),
  );
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

/** Render a date string for display, e.g. "June 22, 2026". */
export function formatDate(date: string): string {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
