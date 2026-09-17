"use client";

import { FormEvent, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

interface Skill {
  id: number;
  name: string;
  category: string;
  proficiency: number | null;
  display_order: number;
}

export default function EditSkillPage() {
  const params = useParams();
  const router = useRouter();

  const skillId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [proficiency, setProficiency] = useState("");
  const [displayOrder, setDisplayOrder] = useState(0);

  useEffect(() => {
    if (skillId) {
      loadSkill();
    }
  }, [skillId]);

  async function loadSkill() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_URL}/api/skills/${skillId}`,
        {
          cache: "no-store",
        },
      );

      if (!response.ok) {
        throw new Error("Failed to load skill.");
      }

      const data: Skill = await response.json();

      setName(data.name || "");
      setCategory(data.category || "");

      setProficiency(
        data.proficiency !== null &&
          data.proficiency !== undefined
          ? String(data.proficiency)
          : "",
      );

      setDisplayOrder(data.display_order ?? 0);
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

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setSaving(true);
    setMessage("");
    setError("");

    if (!name.trim()) {
      setError("Skill name is required.");
      setSaving(false);
      return;
    }

    if (!category.trim()) {
      setError("Category is required.");
      setSaving(false);
      return;
    }

    if (
      proficiency &&
      (Number(proficiency) < 0 ||
        Number(proficiency) > 100)
    ) {
      setError("Proficiency must be between 0 and 100.");
      setSaving(false);
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/api/skills/${skillId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name.trim(),
            category: category.trim(),
            proficiency: proficiency
              ? Number(proficiency)
              : null,
            display_order: Number(displayOrder),
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || "Failed to save skill.",
        );
      }

      setMessage("Skill saved successfully.");

      setTimeout(() => {
        router.push("/admin/skills");
        router.refresh();
      }, 700);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to save skill.",
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#0b0b0b] px-6 py-12 !text-[#f5f5f0]">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm !text-[#777]">
            Loading skill...
          </p>
        </div>
      </main>
    );
  }

  if (error && !name) {
    return (
      <main className="min-h-screen bg-[#0b0b0b] px-6 py-12 !text-[#f5f5f0]">
        <div className="mx-auto max-w-5xl">

          <button
            type="button"
            onClick={() =>
              router.push("/admin/skills")
            }
            className="mb-8 text-sm !text-[#999991] transition hover:!text-[#f5f5f0]"
          >
            ← Back to skills
          </button>

          <div className="border border-red-900/50 bg-red-950/20 p-6 text-sm !text-red-300">
            {error}
          </div>

        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0b0b0b] px-6 py-10 !text-[#f5f5f0]">
      <div className="mx-auto max-w-5xl">

        {/* Header */}

        <header className="mb-10 border-b border-[#252525] pb-8">

          <button
            type="button"
            onClick={() =>
              router.push("/admin/skills")
            }
            className="mb-6 text-sm !text-[#999991] transition hover:!text-[#f5f5f0]"
          >
            ← Back to skills
          </button>

          <p className="mb-2 text-xs uppercase tracking-[0.25em] !text-[#9fb7a3]">
            Skills CMS
          </p>

          <h1 className="text-3xl font-medium tracking-tight !text-[#f5f5f0] sm:text-4xl">
            Edit Skill
          </h1>

          <p className="mt-3 text-sm leading-6 !text-[#777]">
            Update this technical skill without editing
            the website code.
          </p>

        </header>

        {/* Notifications */}

        {(message || error) && (
          <div
            className={`mb-8 border p-4 text-sm ${
              error
                ? "border-red-900/50 bg-red-950/20 !text-red-300"
                : "border-[#34463a] bg-[#18221b] !text-[#b8cbbd]"
            }`}
          >
            {error || message}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-8"
        >

          {/* Skill Information */}

          <section className="border border-[#252525] bg-[#101010] p-6 sm:p-8">

            <div className="mb-7">

              <p className="text-xs uppercase tracking-[0.2em] !text-[#9fb7a3]">
                01
              </p>

              <h2 className="mt-2 text-xl font-medium !text-[#f5f5f0]">
                Skill Information
              </h2>

              <p className="mt-2 text-sm !text-[#777]">
                Update the skill and its category.
              </p>

            </div>

            <div className="space-y-6">

              {/* Name */}

              <div>
                <label className="mb-2 block text-sm !text-[#ccc]">
                  Skill name
                </label>

                <input
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  required
                  placeholder="Python"
                  className="w-full border border-[#303030] bg-[#0b0b0b] px-4 py-3 text-sm !text-[#f5f5f0] outline-none placeholder:!text-[#555] focus:border-[#777]"
                />
              </div>

              {/* Category */}

              <div>
                <label className="mb-2 block text-sm !text-[#ccc]">
                  Category
                </label>

                <input
                  value={category}
                  onChange={(e) =>
                    setCategory(e.target.value)
                  }
                  required
                  placeholder="Programming"
                  className="w-full border border-[#303030] bg-[#0b0b0b] px-4 py-3 text-sm !text-[#f5f5f0] outline-none placeholder:!text-[#555] focus:border-[#777]"
                />

                <p className="mt-2 text-xs !text-[#555]">
                  Examples: Programming, Data Science,
                  Machine Learning, Backend, Cloud.
                </p>
              </div>

            </div>
          </section>

          {/* Proficiency */}

          <section className="border border-[#252525] bg-[#101010] p-6 sm:p-8">

            <div className="mb-7">

              <p className="text-xs uppercase tracking-[0.2em] !text-[#9fb7a3]">
                02
              </p>

              <h2 className="mt-2 text-xl font-medium !text-[#f5f5f0]">
                Proficiency
              </h2>

              <p className="mt-2 text-sm !text-[#777]">
                Update the proficiency level.
              </p>

            </div>

            <div className="max-w-sm">

              <label className="mb-2 block text-sm !text-[#ccc]">
                Proficiency
              </label>

              <div className="relative">

                <input
                  type="number"
                  min="0"
                  max="100"
                  value={proficiency}
                  onChange={(e) =>
                    setProficiency(e.target.value)
                  }
                  placeholder="85"
                  className="w-full border border-[#303030] bg-[#0b0b0b] px-4 py-3 pr-12 text-sm !text-[#f5f5f0] outline-none placeholder:!text-[#555] focus:border-[#777]"
                />

                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm !text-[#555]">
                  %
                </span>

              </div>

              <p className="mt-2 text-xs !text-[#555]">
                Enter a value between 0 and 100. Leave empty
                if you do not want to display proficiency.
              </p>

            </div>
          </section>

          {/* Display */}

          <section className="border border-[#252525] bg-[#101010] p-6 sm:p-8">

            <div className="mb-7">

              <p className="text-xs uppercase tracking-[0.2em] !text-[#9fb7a3]">
                03
              </p>

              <h2 className="mt-2 text-xl font-medium !text-[#f5f5f0]">
                Display
              </h2>

              <p className="mt-2 text-sm !text-[#777]">
                Control the ordering of this skill.
              </p>

            </div>

            <div className="max-w-sm">

              <label className="mb-2 block text-sm !text-[#ccc]">
                Display order
              </label>

              <input
                type="number"
                min="0"
                value={displayOrder}
                onChange={(e) =>
                  setDisplayOrder(
                    Number(e.target.value),
                  )
                }
                className="w-full border border-[#303030] bg-[#0b0b0b] px-4 py-3 text-sm !text-[#f5f5f0] outline-none focus:border-[#777]"
              />

              <p className="mt-2 text-xs !text-[#555]">
                Lower numbers appear first.
              </p>

            </div>
          </section>

          {/* Actions */}

          <div className="flex flex-col-reverse gap-3 border-t border-[#252525] pt-8 sm:flex-row sm:justify-end">

            <button
              type="button"
              onClick={() =>
                router.push("/admin/skills")
              }
              className="border border-[#303030] px-6 py-3 text-sm !text-[#f5f5f0] transition hover:border-[#666] hover:!text-white"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="bg-[#f5f5f0] px-6 py-3 text-sm font-medium !text-[#0b0b0b] transition hover:bg-white hover:!text-[#0b0b0b] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving
                ? "Saving..."
                : "Save Skill"}
            </button>

          </div>

        </form>
      </div>
    </main>
  );
}