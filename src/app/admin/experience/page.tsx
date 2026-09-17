"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

interface Experience {
  id: number;
  company: string;
  role: string;
  start_date: string;
  end_date: string | null;
  description: string;
  display_order: number;
}

export default function AdminExperiencePage() {
  const router = useRouter();

  const [experiences, setExperiences] = useState<Experience[]>(
    [],
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadExperience() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_URL}/api/experience`,
        {
          cache: "no-store",
        },
      );

      if (!response.ok) {
        throw new Error("Failed to load experience.");
      }

      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error("Invalid experience data received.");
      }

      setExperiences(data);
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
    loadExperience();
  }, []);

  async function deleteExperience(
    experience: Experience,
  ) {
    const confirmed = window.confirm(
      `Delete "${experience.role}" at "${experience.company}"?\n\nThis action cannot be undone.`,
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/api/experience/${experience.id}`,
        {
          method: "DELETE",
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || "Failed to delete experience.",
        );
      }

      setExperiences((current) =>
        current.filter(
          (item) => item.id !== experience.id,
        ),
      );
    } catch (err) {
      window.alert(
        err instanceof Error
          ? err.message
          : "Failed to delete experience.",
      );
    }
  }

  function formatDate(value: string | null) {
    if (!value) {
      return "Present";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return value;
    }

    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  }

  return (
    <main className="min-h-screen bg-[#0b0b0b] px-6 py-10 text-[#f5f5f0]">
      <div className="mx-auto max-w-6xl">

        {/* Header */}

        <header className="mb-10 border-b border-[#252525] pb-8">
          <button
            type="button"
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
                Experience
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-[#777]">
                Manage your professional experience and
                control the order in which it appears.
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                router.push("/admin/experience/new")
              }
              className="w-fit bg-[#f5f5f0] px-5 py-3 text-sm font-medium text-[#0b0b0b] transition hover:bg-white"
            >
              + Add Experience
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
              Loading experience...
            </p>
          </div>
        ) : experiences.length === 0 ? (
          <div className="border border-dashed border-[#333] bg-[#101010] p-12 text-center">
            <p className="text-lg">
              No experience entries yet.
            </p>

            <p className="mt-2 text-sm text-[#666]">
              Add your first professional experience.
            </p>

            <button
              type="button"
              onClick={() =>
                router.push("/admin/experience/new")
              }
              className="mt-6 border border-[#444] px-5 py-3 text-sm transition hover:border-[#777]"
            >
              Add Experience
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {experiences.map((experience) => (
              <article
                key={experience.id}
                className="border border-[#252525] bg-[#101010] transition hover:border-[#383838]"
              >
                <div className="p-6 sm:p-8">

                  {/* Top row */}

                  <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">

                    <div>
                      <div className="mb-3 flex items-center gap-3">
                        <span className="text-xs text-[#555]">
                          #{experience.display_order}
                        </span>

                        <span className="border border-[#303030] bg-[#171717] px-2.5 py-1 text-[11px] uppercase tracking-wider text-[#777]">
                          Experience
                        </span>
                      </div>

                      <h2 className="text-xl font-medium">
                        {experience.role}
                      </h2>

                      <p className="mt-1 text-sm text-[#9fb7a3]">
                        {experience.company}
                      </p>
                    </div>

                    <div className="shrink-0 text-left sm:text-right">
                      <p className="text-sm text-[#aaa]">
                        {formatDate(
                          experience.start_date,
                        )}{" "}
                        —{" "}
                        {formatDate(
                          experience.end_date,
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Description */}

                  <div className="mt-6 border-t border-[#202020] pt-6">
                    <p className="max-w-4xl whitespace-pre-line text-sm leading-7 text-[#777]">
                      {experience.description}
                    </p>
                  </div>

                  {/* Actions */}

                  <div className="mt-7 flex flex-wrap items-center gap-3 border-t border-[#202020] pt-5">

                    <button
                      type="button"
                      onClick={() =>
                        router.push(
                          `/admin/experience/${experience.id}`,
                        )
                      }
                      className="border border-[#444] px-4 py-2.5 text-xs transition hover:border-[#777]"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        deleteExperience(experience)
                      }
                      className="ml-auto px-3 py-2.5 text-xs text-[#666] transition hover:text-red-400"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Footer */}

        {!loading && experiences.length > 0 && (
          <div className="mt-8 flex items-center justify-between border-t border-[#252525] pt-5 text-xs text-[#555]">
            <span>
              {experiences.length}{" "}
              {experiences.length === 1
                ? "experience"
                : "experiences"}
            </span>

            <button
              type="button"
              onClick={loadExperience}
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