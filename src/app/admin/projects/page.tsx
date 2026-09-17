"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

interface Project {
  id: number;
  title: string;
  slug: string;
  short_description: string;
  description: string | null;
  technologies: string | null;
  github_url: string | null;
  live_url: string | null;
  image_url: string | null;
  published: boolean;
  display_order: number;
}

export default function AdminProjectsPage() {
  const router = useRouter();

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadProjects() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_URL}/api/projects/admin/all`,
        {
          cache: "no-store",
        },
      );

      if (!response.ok) {
        throw new Error("Failed to load projects.");
      }

      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error("Invalid project data received.");
      }

      setProjects(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong.",
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProjects();
  }, []);

  async function deleteProject(project: Project) {
    const confirmed = window.confirm(
      `Delete "${project.title}"?\n\nThis action cannot be undone.`,
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/api/projects/${project.id}`,
        {
          method: "DELETE",
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || "Failed to delete project.",
        );
      }

      setProjects((current) =>
        current.filter(
          (item) => item.id !== project.id,
        ),
      );
    } catch (err) {
      window.alert(
        err instanceof Error
          ? err.message
          : "Failed to delete project.",
      );
    }
  }

  return (
    <main className="min-h-screen bg-[#0b0b0b] px-6 py-10 text-[#f5f5f0]">
      <div className="mx-auto max-w-6xl">

        {/* Header */}

        <header className="mb-10 border-b border-[#252525] pb-8">
          <button
            onClick={() => router.push("/admin")}
            className="mb-6 text-sm text-[#999991] transition hover:text-[#f5f5f0]"
          >
            ← Dashboard
          </button>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-2 text-xs uppercase tracking-[0.25em] text-[#9fb7a3]">
                Content Management
              </p>

              <h1 className="text-3xl font-medium tracking-tight sm:text-4xl">
                Projects
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-[#777]">
                Manage the projects displayed across your
                portfolio and their presentation order.
              </p>
            </div>

            <button
              onClick={() =>
                router.push("/admin/projects/new")
              }
              className="w-fit bg-[#f5f5f0] px-5 py-3 text-sm font-medium text-[#0b0b0b] transition hover:bg-white"
            >
              + New Project
            </button>
          </div>
        </header>

        {/* Error */}

        {error && (
          <div className="mb-8 border border-red-900/50 bg-red-950/20 p-5 text-sm text-red-300">
            {error}
          </div>
        )}

        {/* Loading */}

        {loading ? (
          <div className="border border-[#252525] bg-[#101010] p-10 text-center">
            <p className="text-sm text-[#777]">
              Loading projects...
            </p>
          </div>
        ) : projects.length === 0 ? (
          <div className="border border-dashed border-[#333] bg-[#101010] p-12 text-center">
            <p className="text-lg">
              No projects yet.
            </p>

            <p className="mt-2 text-sm text-[#666]">
              Create your first project to start building
              your portfolio.
            </p>

            <button
              onClick={() =>
                router.push("/admin/projects/new")
              }
              className="mt-6 border border-[#444] px-5 py-3 text-sm transition hover:border-[#777]"
            >
              Create Project
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {projects.map((project) => (
              <article
                key={project.id}
                className="group border border-[#252525] bg-[#101010] transition hover:border-[#383838]"
              >
                <div className="flex flex-col lg:flex-row">

                  {/* Image */}

                  <div className="w-full shrink-0 lg:w-64">
                    {project.image_url ? (
                      <img
                        src={project.image_url}
                        alt={project.title}
                        className="aspect-video h-full w-full object-cover lg:aspect-auto"
                      />
                    ) : (
                      <div className="flex aspect-video h-full items-center justify-center bg-[#151515] lg:aspect-auto">
                        <span className="text-xs uppercase tracking-[0.2em] text-[#555]">
                          No image
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}

                  <div className="flex flex-1 flex-col justify-between p-6">

                    <div>
                      <div className="mb-4 flex flex-wrap items-center gap-3">
                        <span className="text-xs text-[#555]">
                          #{project.display_order}
                        </span>

                        <span
                          className={`border px-2.5 py-1 text-[11px] uppercase tracking-wider ${
                            project.published
                              ? "border-[#34463a] bg-[#18221b] text-[#9fb7a3]"
                              : "border-[#333] bg-[#171717] text-[#777]"
                          }`}
                        >
                          {project.published
                            ? "Published"
                            : "Draft"}
                        </span>
                      </div>

                      <h2 className="text-xl font-medium">
                        {project.title}
                      </h2>

                      <p className="mt-2 max-w-2xl text-sm leading-6 text-[#888]">
                        {project.short_description}
                      </p>

                      {/* Technologies */}

                      {project.technologies && (
                        <div className="mt-5 flex flex-wrap gap-2">
                          {project.technologies
                            .split(",")
                            .map((technology) =>
                              technology.trim(),
                            )
                            .filter(Boolean)
                            .slice(0, 8)
                            .map((technology) => (
                              <span
                                key={technology}
                                className="border border-[#2b2b2b] bg-[#151515] px-2.5 py-1 text-[11px] text-[#777]"
                              >
                                {technology}
                              </span>
                            ))}
                        </div>
                      )}
                    </div>

                    {/* Actions */}

                    <div className="mt-7 flex flex-wrap items-center gap-3 border-t border-[#202020] pt-5">

                      <button
                        onClick={() =>
                          router.push(
                            `/admin/projects/${project.id}`,
                          )
                        }
                        className="border border-[#444] px-4 py-2.5 text-xs transition hover:border-[#777]"
                      >
                        Edit
                      </button>

                      <a
                        href={`/projects/${project.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="border border-[#303030] px-4 py-2.5 text-xs text-[#aaa] transition hover:border-[#555] hover:text-[#f5f5f0]"
                      >
                        View ↗
                      </a>

                      {project.github_url && (
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noreferrer"
                          className="border border-[#303030] px-4 py-2.5 text-xs text-[#aaa] transition hover:border-[#555] hover:text-[#f5f5f0]"
                        >
                          GitHub ↗
                        </a>
                      )}

                      {project.live_url && (
                        <a
                          href={project.live_url}
                          target="_blank"
                          rel="noreferrer"
                          className="border border-[#303030] px-4 py-2.5 text-xs text-[#aaa] transition hover:border-[#555] hover:text-[#f5f5f0]"
                        >
                          Live ↗
                        </a>
                      )}

                      <button
                        onClick={() =>
                          deleteProject(project)
                        }
                        className="ml-auto px-3 py-2.5 text-xs text-[#666] transition hover:text-red-400"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Footer info */}

        {!loading && projects.length > 0 && (
          <div className="mt-8 flex items-center justify-between border-t border-[#252525] pt-5 text-xs text-[#555]">
            <span>
              {projects.length}{" "}
              {projects.length === 1
                ? "project"
                : "projects"}
            </span>

            <button
              onClick={loadProjects}
              className="transition hover:text-[#aaa]"
            >
              Refresh
            </button>
          </div>
        )}
      </div>
    </main>
  );
}