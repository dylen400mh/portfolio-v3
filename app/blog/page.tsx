import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, formatDate } from "@/lib/posts";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog",
  description: "Technical writing by Dylen Belanger.",
  alternates: { canonical: "/blog" },
};

export default async function BlogIndex() {
  const posts = await getAllPosts();

  return (
    <main className="relative mx-auto max-w-2xl px-6 py-16 sm:py-24">
      <Link
        href="/"
        className="text-muted hover:text-foreground inline-flex items-center gap-1.5 font-mono text-xs tracking-[0.15em] uppercase transition-colors"
      >
        ← {site.name}
      </Link>

      <header className="border-border mt-8 border-b pb-8">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Writing
        </h1>
        <p className="text-muted mt-2">
          Notes on what I build.
        </p>
      </header>

      {posts.length === 0 ? (
        <p className="text-muted mt-12">No posts yet.</p>
      ) : (
        <ul className="mt-4">
          {posts.map((post, i) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group border-border hover:bg-accent/[0.04] -mx-2 block border-b px-2 py-6 transition-colors"
              >
                <div className="text-muted flex items-center gap-3 font-mono text-xs">
                  <span className="tabular-nums">
                    {String(posts.length - i).padStart(2, "0")}
                  </span>
                  <span className="bg-border h-px flex-1" />
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                </div>
                <h2 className="group-hover:text-accent mt-3 text-xl font-medium tracking-tight transition-colors">
                  {post.title}
                </h2>
                <p className="text-muted mt-1.5">{post.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
