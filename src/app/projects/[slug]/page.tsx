import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjects } from "@/lib/api";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProjectPage({
  params,
}: ProjectPageProps) {
  const { slug } = await params;

  const projects = await getProjects();
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  const technologies = project.technologies
    ? project.technologies
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
    : [];

  const isGraphVex = project.slug === "graphvex";
  const isDubaiRealEstate =
    project.slug === "dubai-real-estate-intelligence";
  const isMovieSearch =
    project.slug === "movie-search-react";

  return (
    <main className="min-h-screen">
      {/* NAV */}
      <header className="border-b border-[var(--border)]">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-6 md:px-12">
          <Link
            href="/"
            className="text-sm font-semibold tracking-[0.22em]"
          >
            GAGANMANOHAR
          </Link>

          <Link
            href="/#work"
            className="text-xs uppercase tracking-[0.15em] text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
          >
            ← Back to work
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section className="px-6 py-24 md:px-12 md:py-40">
        <div className="mx-auto max-w-[1600px]">
          <div className="max-w-6xl">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
              Project {String(project.display_order).padStart(2, "0")}
            </p>

            <h1 className="mt-8 text-6xl font-semibold leading-[0.88] tracking-[-0.065em] md:text-9xl">
              {project.title}
            </h1>

            <p className="mt-10 max-w-3xl text-xl leading-9 text-[var(--muted)] md:text-2xl">
              {project.short_description}
            </p>

            <div className="mt-12 flex flex-wrap gap-4">
              {project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noreferrer"
                  className="border border-[var(--foreground)] px-6 py-3 text-xs uppercase tracking-[0.15em] transition-colors hover:bg-[var(--foreground)] hover:text-[var(--background)]"
                >
                  View Source →
                </a>
              )}

              {project.live_url && (
                <a
                  href={project.live_url}
                  target="_blank"
                  rel="noreferrer"
                  className="border border-[var(--border)] px-6 py-3 text-xs uppercase tracking-[0.15em] text-[var(--muted)] transition-colors hover:border-[var(--foreground)] hover:text-[var(--foreground)]"
                >
                  Live Demo →
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* PROJECT VISUAL */}
      <section className="border-y border-[var(--border)] px-6 py-12 md:px-12 md:py-20">
        <div className="mx-auto max-w-[1600px]">
          <div className="overflow-hidden border border-[var(--border)] bg-[#101010]">
            {project.image_url ? (
              <img
                src={project.image_url}
                alt={project.title}
                className="h-auto w-full object-cover"
              />
            ) : (
              <div className="flex aspect-[16/7] items-center justify-center">
                <div className="text-center">
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
                    {project.title}
                  </p>

                  <p className="mt-3 text-sm text-[var(--muted)]">
                    Project visual coming soon
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* OVERVIEW */}
      <section className="px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto grid max-w-[1600px] gap-16 md:grid-cols-[1fr_360px]">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
              01 / Overview
            </p>

            <h2 className="mt-6 max-w-4xl text-4xl font-semibold leading-tight tracking-[-0.04em] md:text-6xl">
              {isGraphVex
                ? "Turning transaction data into interpretable risk signals."
                : isDubaiRealEstate
                  ? "Turning property transaction data into actionable intelligence."
                  : isMovieSearch
                    ? "A focused React application for discovering movies through an external API."
                    : "A practical software project built around a real problem."}
            </h2>

            <p className="mt-8 max-w-3xl text-lg leading-8 text-[var(--muted)]">
              {project.description}
            </p>
          </div>

          <aside className="border-t border-[var(--border)] pt-6">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
              Focus
            </p>

            <div className="mt-6 space-y-4">
              {isGraphVex ? (
                <>
                  <p className="text-sm text-[var(--muted)]">
                    Anomaly Detection
                  </p>
                  <p className="text-sm text-[var(--muted)]">
                    Graph Analytics
                  </p>
                  <p className="text-sm text-[var(--muted)]">
                    Temporal Analysis
                  </p>
                  <p className="text-sm text-[var(--muted)]">
                    Risk Scoring
                  </p>
                  <p className="text-sm text-[var(--muted)]">
                    Explainability
                  </p>
                </>
              ) : isDubaiRealEstate ? (
                <>
                  <p className="text-sm text-[var(--muted)]">
                    Data Analysis
                  </p>
                  <p className="text-sm text-[var(--muted)]">
                    Real Estate Intelligence
                  </p>
                  <p className="text-sm text-[var(--muted)]">
                    Data Engineering
                  </p>
                  <p className="text-sm text-[var(--muted)]">
                    Statistical Analysis
                  </p>
                  <p className="text-sm text-[var(--muted)]">
                    Visualization
                  </p>
                </>
              ) : isMovieSearch ? (
                <>
                  <p className="text-sm text-[var(--muted)]">
                    React
                  </p>
                  <p className="text-sm text-[var(--muted)]">
                    API Integration
                  </p>
                  <p className="text-sm text-[var(--muted)]">
                    Frontend Development
                  </p>
                  <p className="text-sm text-[var(--muted)]">
                    Responsive UI
                  </p>
                </>
              ) : (
                technologies.slice(0, 5).map((technology) => (
                  <p
                    key={technology}
                    className="text-sm text-[var(--muted)]"
                  >
                    {technology}
                  </p>
                ))
              )}
            </div>
          </aside>
        </div>
      </section>

      {/* GRAPHVEX SYSTEM */}
      {isGraphVex && (
        <section className="border-t border-[var(--border)] px-6 py-24 md:px-12 md:py-32">
          <div className="mx-auto max-w-[1600px]">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
              02 / System
            </p>

            <h2 className="mt-6 text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
              From transactions to risk.
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)]">
              GraphVex combines multiple analytical layers rather than
              relying on a single anomaly signal.
            </p>

            <div className="mt-16 grid border border-[var(--border)] md:grid-cols-5">
              {[
                [
                  "01",
                  "Transactions",
                  "Raw financial transaction data",
                ],
                [
                  "02",
                  "Features",
                  "Behavioral and temporal signals",
                ],
                [
                  "03",
                  "Anomalies",
                  "Identify unusual behavior",
                ],
                [
                  "04",
                  "Graph",
                  "Discover relationships and networks",
                ],
                [
                  "05",
                  "Risk",
                  "Combine signals into interpretable risk",
                ],
              ].map(([number, title, description]) => (
                <div
                  key={number}
                  className="border-b border-[var(--border)] p-7 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0"
                >
                  <span className="text-xs text-[var(--accent)]">
                    {number}
                  </span>

                  <h3 className="mt-10 text-xl font-semibold">
                    {title}
                  </h3>

                  <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* DUBAI REAL ESTATE APPROACH */}
      {isDubaiRealEstate && (
        <section className="border-t border-[var(--border)] px-6 py-24 md:px-12 md:py-32">
          <div className="mx-auto max-w-[1600px]">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
              02 / Analytical Approach
            </p>

            <h2 className="mt-6 max-w-4xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
              Working with real-world property transaction data.
            </h2>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--muted)]">
              The project uses Dubai real estate transaction data to
              explore property activity, transaction characteristics,
              and patterns that can be derived from structured market
              data.
            </p>

            <div className="mt-16 grid gap-px border border-[var(--border)] md:grid-cols-3">
              {[
                [
                  "01",
                  "Data",
                  "Ingest and inspect structured property transaction data.",
                ],
                [
                  "02",
                  "Analysis",
                  "Transform transaction records into useful analytical signals.",
                ],
                [
                  "03",
                  "Intelligence",
                  "Present patterns and findings in a form that supports further analysis.",
                ],
              ].map(([number, title, description]) => (
                <article
                  key={number}
                  className="p-8 md:p-12"
                >
                  <span className="text-xs text-[var(--accent)]">
                    {number}
                  </span>

                  <h3 className="mt-8 text-2xl font-semibold">
                    {title}
                  </h3>

                  <p className="mt-5 leading-7 text-[var(--muted)]">
                    {description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* MOVIE SEARCH APPROACH */}
      {isMovieSearch && (
        <section className="border-t border-[var(--border)] px-6 py-24 md:px-12 md:py-32">
          <div className="mx-auto max-w-[1600px]">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
              02 / Implementation
            </p>

            <h2 className="mt-6 max-w-4xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
              A focused frontend application built around API-driven search.
            </h2>

            <div className="mt-16 grid gap-px border border-[var(--border)] md:grid-cols-3">
              {[
                [
                  "01",
                  "Search",
                  "Allow users to discover movies through a simple search interface.",
                ],
                [
                  "02",
                  "API",
                  "Connect the frontend to an external movie data source.",
                ],
                [
                  "03",
                  "Interface",
                  "Present search results through a responsive React interface.",
                ],
              ].map(([number, title, description]) => (
                <article
                  key={number}
                  className="p-8 md:p-12"
                >
                  <span className="text-xs text-[var(--accent)]">
                    {number}
                  </span>

                  <h3 className="mt-8 text-2xl font-semibold">
                    {title}
                  </h3>

                  <p className="mt-5 leading-7 text-[var(--muted)]">
                    {description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* GRAPHVEX TECHNICAL AREAS */}
      {isGraphVex && (
        <section className="border-t border-[var(--border)] px-6 py-24 md:px-12 md:py-32">
          <div className="mx-auto max-w-[1600px]">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
              03 / Technical Approach
            </p>

            <h2 className="mt-6 max-w-4xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
              Multiple signals, one interpretable risk model.
            </h2>

            <div className="mt-16 grid gap-px border border-[var(--border)] md:grid-cols-2">
              <article className="p-8 md:p-12">
                <span className="text-xs text-[var(--accent)]">
                  01
                </span>

                <h3 className="mt-8 text-2xl font-semibold">
                  Anomaly Detection
                </h3>

                <p className="mt-5 leading-7 text-[var(--muted)]">
                  Detect transaction behavior that deviates from
                  expected patterns and surface it as a risk signal
                  for further analysis.
                </p>
              </article>

              <article className="p-8 md:p-12">
                <span className="text-xs text-[var(--accent)]">
                  02
                </span>

                <h3 className="mt-8 text-2xl font-semibold">
                  Graph Analytics
                </h3>

                <p className="mt-5 leading-7 text-[var(--muted)]">
                  Represent transactional relationships as networks
                  to investigate connections between entities and
                  identify potentially suspicious structures.
                </p>
              </article>

              <article className="border-t border-[var(--border)] p-8 md:p-12">
                <span className="text-xs text-[var(--accent)]">
                  03
                </span>

                <h3 className="mt-8 text-2xl font-semibold">
                  Temporal Analysis
                </h3>

                <p className="mt-5 leading-7 text-[var(--muted)]">
                  Analyze transaction behavior over time to capture
                  patterns that cannot be represented by isolated
                  transactions.
                </p>
              </article>

              <article className="border-t border-[var(--border)] p-8 md:p-12">
                <span className="text-xs text-[var(--accent)]">
                  04
                </span>

                <h3 className="mt-8 text-2xl font-semibold">
                  Explainability
                </h3>

                <p className="mt-5 leading-7 text-[var(--muted)]">
                  Surface the underlying signals contributing to risk
                  so that results can be investigated rather than
                  treated as opaque predictions.
                </p>
              </article>
            </div>
          </div>
        </section>
      )}

      {/* TECHNOLOGIES */}
      <section className="border-t border-[var(--border)] px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-[1600px]">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
            {isGraphVex ? "04" : "03"} / Technology
          </p>

          <h2 className="mt-6 text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
            Built with
          </h2>

          <div className="mt-12 flex flex-wrap gap-3">
            {technologies.length > 0 ? (
              technologies.map((technology) => (
                <span
                  key={technology}
                  className="border border-[var(--border)] px-5 py-3 text-sm text-[var(--muted)]"
                >
                  {technology}
                </span>
              ))
            ) : (
              <span className="text-sm text-[var(--muted)]">
                Technology details coming soon.
              </span>
            )}
          </div>
        </div>
      </section>

      {/* PROJECT LINKS */}
      {(project.github_url || project.live_url) && (
        <section className="border-t border-[var(--border)] px-6 py-24 md:px-12 md:py-32">
          <div className="mx-auto max-w-[1600px]">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
              {isGraphVex ? "05" : "04"} / Explore
            </p>

            <h2 className="mt-6 max-w-4xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
              Explore the project.
            </h2>

            <div className="mt-12 flex flex-wrap gap-4">
              {project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noreferrer"
                  className="border border-[var(--foreground)] px-6 py-4 text-xs uppercase tracking-[0.15em] transition-colors hover:bg-[var(--foreground)] hover:text-[var(--background)]"
                >
                  GitHub Repository →
                </a>
              )}

              {project.live_url && (
                <a
                  href={project.live_url}
                  target="_blank"
                  rel="noreferrer"
                  className="border border-[var(--border)] px-6 py-4 text-xs uppercase tracking-[0.15em] text-[var(--muted)] transition-colors hover:border-[var(--foreground)] hover:text-[var(--foreground)]"
                >
                  Live Project →
                </a>
              )}
            </div>
          </div>
        </section>
      )}

      {/* NEXT PROJECT */}
      <section className="border-t border-[var(--border)] px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-[1600px]">
          <Link
            href="/#work"
            className="group block"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
              Continue exploring
            </p>

            <div className="mt-8 flex items-end justify-between gap-8">
              <h2 className="text-5xl font-semibold tracking-[-0.05em] transition-transform duration-300 group-hover:translate-x-2 md:text-8xl">
                All Projects
              </h2>

              <span className="hidden text-sm text-[var(--muted)] md:block">
                ←
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[var(--border)] px-6 py-8 md:px-12">
        <div className="mx-auto flex max-w-[1600px] justify-between text-xs uppercase tracking-[0.12em] text-[var(--muted)]">
          <span>GAGANMANOHAR</span>
          <span>{project.title}</span>
        </div>
      </footer>
    </main>
  );
}