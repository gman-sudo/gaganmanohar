const navItems = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <header className="fixed left-0 top-0 z-50 w-full">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
          <a
            href="/"
            className="text-sm font-medium tracking-[0.2em] text-white"
          >
            GAGANMANOHAR
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm text-neutral-400 transition-colors hover:text-white"
              >
                {item.label}
              </a>
            ))}

            <a
              href="#contact"
              className="rounded-full border border-neutral-700 px-5 py-2 text-sm text-white transition-all hover:border-neutral-400"
            >
              Contact
            </a>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative flex min-h-screen items-end overflow-hidden px-6 pb-16 pt-32 lg:px-10 lg:pb-20">
        {/* Subtle background glow */}
        <div className="pointer-events-none absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-emerald-950/20 blur-[140px]" />

        <div className="relative mx-auto w-full max-w-7xl">
          <div className="mb-8 flex items-center gap-3 text-sm text-neutral-500">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span>Based in Dubai, UAE</span>
          </div>

          <h1 className="max-w-6xl text-[clamp(3.5rem,10vw,9rem)] font-medium leading-[0.85] tracking-[-0.06em] text-white">
            DATA SCIENCE
            <br />
            <span className="text-neutral-500">&amp; AI.</span>
          </h1>

          <div className="mt-12 flex flex-col justify-between gap-10 md:flex-row md:items-end">
            <p className="max-w-xl text-lg leading-relaxed text-neutral-400 md:text-xl">
              Building intelligent systems at the intersection of data,
              machine learning, backend engineering and automation.
            </p>

            <div className="flex gap-3">
              <a
                href="#work"
                className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-transform hover:scale-105"
              >
                Explore work
              </a>

              <a
                href="https://github.com/gman-sudo"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-neutral-700 px-6 py-3 text-sm font-medium text-white transition-colors hover:border-neutral-400"
              >
                GitHub ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Placeholder for upcoming sections */}
      <section id="work" className="min-h-screen px-6 py-32 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm uppercase tracking-[0.2em] text-neutral-500">
            Selected work
          </p>

          <h2 className="mt-6 text-5xl font-medium tracking-tight text-white md:text-7xl">
            Projects coming next.
          </h2>
        </div>
      </section>
    </main>
  );
}