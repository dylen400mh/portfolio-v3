import type { MDXComponents } from "mdx/types";

// Required by @next/mdx in the App Router. Prose styling is handled by the
// Tailwind `prose` wrapper around the rendered post, so this stays minimal.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
  };
}
