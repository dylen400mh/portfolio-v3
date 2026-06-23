import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostSlugs, getPostMeta, formatDate, type PostMeta } from "@/lib/posts";

export const dynamicParams = false;

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!getPostSlugs().includes(slug)) {
    return {};
  }
  const meta = await getPostMeta(slug);
  return {
    title: meta.title,
    description: meta.description,
    // Self-referencing canonical. Combined with metadataBase this renders
    // <link rel="canonical" href="https://dylenbelanger.com/blog/<slug>">,
    // so syndicated copies (dev.to/Medium) can point canonical_url back here.
    alternates: { canonical: `/blog/${slug}` },
  };
}

export default async function Post({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Guard against unknown/stale slugs (e.g. a deleted post still open in a tab):
  // 404 instead of attempting to import a file that doesn't exist.
  if (!getPostSlugs().includes(slug)) {
    notFound();
  }

  const mod = await import(`@/content/${slug}.mdx`);
  const Content = mod.default as React.ComponentType;
  const meta = mod.metadata as PostMeta;

  return (
    <main className="relative mx-auto max-w-2xl px-6 py-16 sm:py-24">
      <Link
        href="/blog"
        className="text-muted hover:text-foreground inline-flex items-center gap-1.5 font-mono text-xs tracking-[0.15em] uppercase transition-colors"
      >
        ← Writing
      </Link>

      <header className="border-border mt-8 border-b pb-8">
        <p className="text-muted font-mono text-xs tracking-[0.15em] uppercase">
          <time dateTime={meta.date}>{formatDate(meta.date)}</time>
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          {meta.title}
        </h1>
        {meta.description ? (
          <p className="text-muted mt-3 text-lg">{meta.description}</p>
        ) : null}
      </header>

      <article className="prose prose-invert mt-10 max-w-none">
        <Content />
      </article>

      <footer className="border-border mt-16 border-t pt-8">
        <Link
          href="/blog"
          className="text-muted hover:text-accent inline-flex items-center gap-1.5 font-mono text-xs tracking-[0.15em] uppercase transition-colors"
        >
          ← All writing
        </Link>
      </footer>
    </main>
  );
}
