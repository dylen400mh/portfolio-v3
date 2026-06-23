import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  // Let .md/.mdx files be treated as modules/pages by Next.
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
};

const withMDX = createMDX({
  options: {
    // Plugins are passed as string names so the config stays serializable
    // for Turbopack (Next 16 default). Options objects must be JSON-serializable.
    remarkPlugins: ["remark-gfm"],
    rehypePlugins: [
      [
        "rehype-pretty-code",
        {
          theme: "github-dark",
          // We style the code block container ourselves (globals.css), so don't
          // let Shiki bake in its own background.
          keepBackground: false,
        },
      ],
    ],
  },
});

export default withMDX(nextConfig);
