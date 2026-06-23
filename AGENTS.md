<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Authoring blog posts

Posts are local MDX files in `content/`. The filename (minus `.mdx`) is the slug:
`content/my-post.mdx` → `/blog/my-post`. Use a lowercase, hyphenated filename.
Copy [content/_template.mdx](content/_template.mdx) as a starting point.

Each post **must** start with a `metadata` export — there is no YAML frontmatter.
The blog index ([app/blog/page.tsx](app/blog/page.tsx)) and per-post `<title>` /
description / canonical tag all read from it via [lib/posts.ts](lib/posts.ts).

```mdx
export const metadata = {
  title: "Post title",
  date: "2026-06-22",        // ISO YYYY-MM-DD; used for sorting (newest first) and display
  description: "One-line summary shown on the blog index and in <meta>/OG.",
};

Write the post body in Markdown / MDX below the export.

## Headings, lists, links, tables, etc. all work

Fenced code blocks are highlighted by Shiki (single `github-dark` theme). Add an
optional title bar with the `title` attribute:

```ts title="example.ts"
export const x = 42;
```
```

Notes:
- That's the only wiring needed — drop the file in `content/` and it appears on the
  index automatically (no imports, no registration).
- Files whose name starts with `_` (e.g. `_template.mdx`) are excluded from the index
  and get no route. Keep at least one `.mdx` file in `content/` so the build's dynamic
  import resolves — `_template.mdx` serves that purpose when there are no real posts yet.
- Don't add a top-level `# H1` in the body; the title from `metadata` is already
  rendered as the page heading.
- Every post is the canonical original. The self-referencing `<link rel="canonical">`
  is generated automatically from `SITE_URL` in [lib/site.ts](lib/site.ts) — when
  syndicating to dev.to/Medium, set their `canonical_url` to this post's URL.
