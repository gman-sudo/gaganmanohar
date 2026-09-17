"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

interface Skill {
  id: number;
  name: string;
  category: string;
  proficiency: number | null;
  display_order: number;
}

export default function SkillsAdminPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    loadSkills();
  }, []);

  async function loadSkills() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/api/skills`, {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Failed to load skills.");
      }

      const data: Skill[] = await response.json();

      setSkills(data);
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

  async function handleDelete(skillId: number) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this skill?",
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(skillId);
      setError("");

      const response = await fetch(
        `${API_URL}/api/skills/${skillId}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        let message = "Failed to delete skill.";

        try {
          const data = await response.json();

          if (data.detail) {
            message = data.detail;
          }
        } catch {
          // Ignore invalid JSON response.
        }

        throw new Error(message);
      }

      setSkills((currentSkills) =>
        currentSkills.filter(
          (skill) => skill.id !== skillId,
        ),
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to delete skill.",
      );
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <main className="min-h-screen bg-[#0b0b0b] px-6 py-10 text-[#f5f5f0]">
      <div className="mx-auto max-w-6xl">

        {/* Header */}

        <header className="mb-10 border-b border-[#252525] pb-8">
          <Link
            href="/admin"
            className="mb-6 inline-block text-sm !text-[#999991] transition hover:!text-[#f5f5f0]"
          >
            ← Back to dashboard
          </Link>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-2 text-xs uppercase tracking-[0.25em] !text-[#9fb7a3]">
                Skills CMS
              </p>

              <h1 className="text-3xl font-medium tracking-tight !text-[#f5f5f0] sm:text-4xl">
                Skills
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 !text-[#777]">
                Manage the technical skills displayed on your
                portfolio without editing the website code.
              </p>
            </div>

            <Link
              href="/admin/skills/new"
              className="inline-flex w-fit items-center justify-center bg-[#f5f5f0] px-5 py-3 text-sm font-medium !text-[#0b0b0b] transition hover:bg-white hover:!text-[#0b0b0b]"
            >
              + Add Skill
            </Link>
          </div>
        </header>

        {/* Error */}

        {error && (
          <div className="mb-8 border border-red-900/50 bg-red-950/20 p-4 text-sm !text-red-300">
            {error}
          </div>
        )}

        {/* Loading */}

        {loading && (
          <div className="border border-[#252525] bg-[#101010] p-8">
            <p className="text-sm !text-[#777]">
              Loading skills...
            </p>
          </div>
        )}

        {/* Empty State */}

        {!loading && skills.length === 0 && !error && (
          <div className="border border-[#252525] bg-[#101010] p-10 text-center">
            <p className="text-lg !text-[#ccc]">
              No skills yet.
            </p>

            <p className="mt-2 text-sm !text-[#666]">
              Add your first skill to start building your
              technical skills section.
            </p>

            <Link
              href="/admin/skills/new"
              className="mt-6 inline-block border border-[#303030] px-5 py-3 text-sm !text-[#f5f5f0] transition hover:border-[#666] hover:!text-white"
            >
              Add your first skill
            </Link>
          </div>
        )}

        {/* Skills Table */}

        {!loading && skills.length > 0 && (
          <section className="border border-[#252525] bg-[#101010]">

            {/* Table Header */}

            <div className="hidden grid-cols-[80px_1fr_1fr_140px_100px] gap-6 border-b border-[#252525] px-6 py-4 text-xs uppercase tracking-[0.15em] !text-[#666] md:grid">
              <div>Order</div>
              <div>Skill</div>
              <div>Category</div>
              <div>Proficiency</div>
              <div>Actions</div>
            </div>

            {/* Rows */}

            <div className="divide-y divide-[#252525]">
              {skills.map((skill) => (
                <div
                  key={skill.id}
                  className="grid gap-5 px-6 py-6 md:grid-cols-[80px_1fr_1fr_140px_100px] md:items-center md:gap-6"
                >

                  {/* Order */}

                  <div>
                    <p className="mb-1 text-xs uppercase tracking-[0.15em] !text-[#555] md:hidden">
                      Order
                    </p>

                    <span className="text-sm !text-[#999]">
                      {skill.display_order}
                    </span>
                  </div>

                  {/* Skill */}

                  <div>
                    <p className="mb-1 text-xs uppercase tracking-[0.15em] !text-[#555] md:hidden">
                      Skill
                    </p>

                    <p className="text-base !text-[#f5f5f0]">
                      {skill.name}
                    </p>
                  </div>

                  {/* Category */}

                  <div>
                    <p className="mb-1 text-xs uppercase tracking-[0.15em] !text-[#555] md:hidden">
                      Category
                    </p>

                    <span className="inline-block border border-[#303030] px-3 py-1 text-xs !text-[#aaa]">
                      {skill.category}
                    </span>
                  </div>

                  {/* Proficiency */}

                  <div>
                    <p className="mb-1 text-xs uppercase tracking-[0.15em] !text-[#555] md:hidden">
                      Proficiency
                    </p>

                    {skill.proficiency !== null &&
                    skill.proficiency !== undefined ? (
                      <div>
                        <div className="mb-2 flex items-center justify-between text-xs">
                          <span className="!text-[#888]">
                            Level
                          </span>

                          <span className="!text-[#ccc]">
                            {skill.proficiency}%
                          </span>
                        </div>

                        <div className="h-1.5 w-full bg-[#252525]">
                          <div
                            className="h-full bg-[#9fb7a3]"
                            style={{
                              width: `${Math.min(
                                100,
                                Math.max(
                                  0,
                                  skill.proficiency,
                                ),
                              )}%`,
                            }}
                          />
                        </div>
                      </div>
                    ) : (
                      <span className="text-sm !text-[#555]">
                        —
                      </span>
                    )}
                  </div>

                  {/* Actions */}

                  <div className="flex gap-4 md:flex-col md:gap-2">
                    <Link
                      href={`/admin/skills/${skill.id}`}
                      className="text-sm !text-[#aaa] transition hover:!text-[#f5f5f0]"
                    >
                      Edit
                    </Link>

                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(skill.id)
                      }
                      disabled={
                        deletingId === skill.id
                      }
                      className="text-left text-sm !text-red-400 transition hover:!text-red-300 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {deletingId === skill.id
                        ? "Deleting..."
                        : "Delete"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Footer */}

        {!loading && skills.length > 0 && (
          <div className="mt-6 flex items-center justify-between text-xs !text-[#555]">
            <span>
              {skills.length}{" "}
              {skills.length === 1 ? "skill" : "skills"}
            </span>

            <button
              type="button"
              onClick={loadSkills}
              className="!text-[#555] transition hover:!text-[#aaa]"
            >
              Refresh
            </button>
          </div>
        )}
      </div>
    </main>
  );
}