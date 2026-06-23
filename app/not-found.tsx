import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative mx-auto flex min-h-dvh max-w-xl flex-col justify-center px-6 py-20">
      <p className="text-muted font-mono text-xs tracking-[0.2em] uppercase">
        Error 404
      </p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
        Page not found
      </h1>
      <p className="text-muted mt-3 text-lg">
        That page doesn&apos;t exist — it may have moved or never been published.
      </p>
      <div className="border-border mt-10 border-t pt-8">
        <Link
          href="/"
          className="text-muted hover:text-accent inline-flex items-center gap-1.5 font-mono text-xs tracking-[0.15em] uppercase transition-colors"
        >
          ← Home
        </Link>
      </div>
    </main>
  );
}
