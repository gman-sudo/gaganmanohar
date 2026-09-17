"use client";

import { FormEvent, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

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

export default function EditExperiencePage() {
  const params = useParams();
  const router = useRouter();

  const experienceId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");
  const [displayOrder, setDisplayOrder] = useState(0);

  useEffect(() => {
    loadExperience();
  }, [experienceId]);

  async function loadExperience() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_URL}/api/experience/${experienceId}`,
        {
          cache: "no-store",
        },
      );

      if (!response.ok) {
        throw new Error("Failed to load experience.");
      }

      const data: Experience = await response.json();

      setCompany(data.company || "");
      setRole(data.role || "");
      setStartDate(formatDateForInput(data.start_date));
      setEndDate(
        data.end_date
          ? formatDateForInput(data.end_date)
          : "",
      );
      setDescription(data.description || "");
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

  function formatDateForInput(value: string) {
    if (!value) {
      return "";
    }

    return value.slice(0, 10);
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setSaving(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch(
        `${API_URL}/api/experience/${experienceId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            company,
            role,
            start_date: startDate,
            end_date: endDate || null,
            description,
            display_order: Number(displayOrder),
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || "Failed to save experience.",
        );
      }

      setMessage(
        "Experience saved successfully.",
      );

      setTimeout(() => {
        router.push("/admin/experience");
        router.refresh();
      }, 700);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to save experience.",
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#0b0b0b] px-6 py-12 text-[#f5f5f0]">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm text-[#777]">
            Loading experience...
          </p>
        </div>
      </main>
    );
  }

  if (error && !company) {
    return (
      <main className="min-h-screen bg-[#0b0b0b] px-6 py-12 text-[#f5f5f0]">
        <div className="mx-auto max-w-5xl">
          <button
            type="button"
            onClick={() =>
              router.push("/admin/experience")
            }
            className="mb-8 text-sm text-[#999991] transition hover:text-[#f5f5f0]"
          >
            ← Back to experience
          </button>

          <div className="border border-red-900/50 bg-red-950/20 p-6 text-sm text-red-300">
            {error}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0b0b0b] px-6 py-10 text-[#f5f5f0]">
      <div className="mx-auto max-w-5xl">

        {/* Header */}

        <header className="mb-10 border-b border-[#252525] pb-8">
          <button
            type="button"
            onClick={() =>
              router.push("/admin/experience")
            }
            className="mb-6 text-sm text-[#999991] transition hover:text-[#f5f5f0]"
          >
            ← Back to experience
          </button>

          <p className="mb-2 text-xs uppercase tracking-[0.25em] text-[#9fb7a3]">
            Experience CMS
          </p>

          <h1 className="text-3xl font-medium tracking-tight sm:text-4xl">
            Edit Experience
          </h1>

          <p className="mt-3 text-sm leading-6 text-[#777]">
            Update your professional experience without
            editing the website code.
          </p>
        </header>

        {/* Notifications */}

        {(message || error) && (
          <div
            className={`mb-8 border p-4 text-sm ${
              error
                ? "border-red-900/50 bg-red-950/20 text-red-300"
                : "border-[#34463a] bg-[#18221b] text-[#b8cbbd]"
            }`}
          >
            {error || message}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-8"
        >

          {/* Position */}

          <section className="border border-[#252525] bg-[#101010] p-6 sm:p-8">
            <div className="mb-7">
              <p className="text-xs uppercase tracking-[0.2em] text-[#9fb7a3]">
                01
              </p>

              <h2 className="mt-2 text-xl font-medium">
                Position
              </h2>

              <p className="mt-2 text-sm text-[#777]">
                Your role and organization.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">

              <div>
                <label className="mb-2 block text-sm text-[#ccc]">
                  Company
                </label>

                <input
                  value={company}
                  onChange={(e) =>
                    setCompany(e.target.value)
                  }
                  required
                  placeholder="Deloitte USI"
                  className="w-full border border-[#303030] bg-[#0b0b0b] px-4 py-3 text-sm outline-none placeholder:text-[#555] focus:border-[#777]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-[#ccc]">
                  Role
                </label>

                <input
                  value={role}
                  onChange={(e) =>
                    setRole(e.target.value)
                  }
                  required
                  placeholder="Consultant — Intelligent Automation"
                  className="w-full border border-[#303030] bg-[#0b0b0b] px-4 py-3 text-sm outline-none placeholder:text-[#555] focus:border-[#777]"
                />
              </div>
            </div>
          </section>

          {/* Dates */}

          <section className="border border-[#252525] bg-[#101010] p-6 sm:p-8">
            <div className="mb-7">
              <p className="text-xs uppercase tracking-[0.2em] text-[#9fb7a3]">
                02
              </p>

              <h2 className="mt-2 text-xl font-medium">
                Timeline
              </h2>

              <p className="mt-2 text-sm text-[#777]">
                Define when this role started and ended.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">

              <div>
                <label className="mb-2 block text-sm text-[#ccc]">
                  Start date
                </label>

                <input
                  type="date"
                  value={startDate}
                  onChange={(e) =>
                    setStartDate(e.target.value)
                  }
                  required
                  className="w-full border border-[#303030] bg-[#0b0b0b] px-4 py-3 text-sm text-[#f5f5f0] outline-none focus:border-[#777]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-[#ccc]">
                  End date
                </label>

                <input
                  type="date"
                  value={endDate}
                  onChange={(e) =>
                    setEndDate(e.target.value)
                  }
                  className="w-full border border-[#303030] bg-[#0b0b0b] px-4 py-3 text-sm text-[#f5f5f0] outline-none focus:border-[#777]"
                />

                <p className="mt-2 text-xs text-[#555]">
                  Leave empty if this is your current role.
                </p>
              </div>
            </div>
          </section>

          {/* Description */}

          <section className="border border-[#252525] bg-[#101010] p-6 sm:p-8">
            <div className="mb-7">
              <p className="text-xs uppercase tracking-[0.2em] text-[#9fb7a3]">
                03
              </p>

              <h2 className="mt-2 text-xl font-medium">
                Description
              </h2>

              <p className="mt-2 text-sm text-[#777]">
                Describe the work, responsibilities and
                technologies used.
              </p>
            </div>

            <textarea
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              required
              rows={12}
              placeholder="Describe your responsibilities, projects, impact and technologies..."
              className="w-full resize-y border border-[#303030] bg-[#0b0b0b] px-4 py-3 text-sm leading-7 outline-none placeholder:text-[#555] focus:border-[#777]"
            />

            <p className="mt-2 text-xs text-[#555]">
              {description.length} characters
            </p>
          </section>

          {/* Display */}

          <section className="border border-[#252525] bg-[#101010] p-6 sm:p-8">
            <div className="mb-7">
              <p className="text-xs uppercase tracking-[0.2em] text-[#9fb7a3]">
                04
              </p>

              <h2 className="mt-2 text-xl font-medium">
                Display
              </h2>

              <p className="mt-2 text-sm text-[#777]">
                Control the ordering of your experience
                entries.
              </p>
            </div>

            <div className="max-w-xs">
              <label className="mb-2 block text-sm text-[#ccc]">
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
                className="w-full border border-[#303030] bg-[#0b0b0b] px-4 py-3 text-sm outline-none focus:border-[#777]"
              />

              <p className="mt-2 text-xs text-[#555]">
                Lower numbers appear first.
              </p>
            </div>
          </section>

          {/* Actions */}

          <div className="flex flex-col-reverse gap-3 border-t border-[#252525] pt-8 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() =>
                router.push("/admin/experience")
              }
              className="border border-[#303030] px-6 py-3 text-sm transition hover:border-[#666]"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="bg-[#f5f5f0] px-6 py-3 text-sm font-medium text-[#0b0b0b] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving
                ? "Saving..."
                : "Save Experience"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}