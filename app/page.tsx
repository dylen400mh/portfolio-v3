import Link from "next/link";
import { site } from "@/lib/site";

const links = [
  { label: "Resume", href: site.resumeUrl, external: true },
  { label: "GitHub", href: site.githubUrl, external: true },
  { label: "LinkedIn", href: site.linkedinUrl, external: true },
  { label: "Email", href: `mailto:${site.email}`, external: true },
  { label: "Blog", href: "/blog", external: false },
];

function ArrowUpRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-4" aria-hidden>
      <path
        d="M7 17 17 7M9 7h8v8"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-4" aria-hidden>
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Home() {
  const initials = site.name
    .split(" ")
    .map((w) => w[0])
    .join("");

  return (
    <main className="relative mx-auto flex min-h-dvh max-w-xl flex-col justify-center px-6 py-20">
      {/* monogram mark */}
      <div className="flex items-center justify-between">
        <span className="border-border text-foreground inline-flex size-9 items-center justify-center rounded-md border font-mono text-sm font-medium">
          {initials}
        </span>
        <span className="text-muted font-mono text-xs tracking-[0.2em] uppercase">
          Portfolio
        </span>
      </div>

      <div className="mt-12">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          {site.name}
        </h1>
        <p className="text-muted mt-3 text-lg">{site.tagline}</p>
      </div>

      <nav className="border-border mt-12 border-t">
        <ul>
          {links.map((link, i) => {
            const inner = (
              <>
                <span className="text-muted w-6 shrink-0 font-mono text-xs tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="group-hover:text-accent text-base font-medium transition-colors">
                  {link.label}
                </span>
                <span className="text-muted group-hover:text-accent ml-auto transition-all duration-200 group-hover:translate-x-0.5">
                  {link.external ? <ArrowUpRight /> : <ArrowRight />}
                </span>
              </>
            );
            const className =
              "group border-border hover:bg-accent/[0.04] flex items-center gap-4 border-b px-2 py-4 transition-colors";
            return (
              <li key={link.label}>
                {link.external ? (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={className}
                  >
                    {inner}
                  </a>
                ) : (
                  <Link href={link.href} className={className}>
                    {inner}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      <footer className="text-muted mt-12 font-mono text-xs">
        © {new Date().getFullYear()} {site.name}
      </footer>
    </main>
  );
}
