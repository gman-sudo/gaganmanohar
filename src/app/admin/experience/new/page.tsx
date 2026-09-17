"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export default function NewExperiencePage() {
  const router = useRouter();

  const [form, setForm] = useState({
    company: "",
    role: "",
    start_date: "",
    end_date: "",
    description: "",
    display_order: 0,
  });

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  function updateField(field: string, value: string | number) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSaving(true);
    setMessage("");

    try {
      const response = await fetch(`${API_URL}/api/experience`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          company: form.company,
          role: form.role,
          start_date: form.start_date,
          end_date: form.end_date || null,
          description: form.description,
          display_order: form.display_order,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || "Failed to create experience.",
        );
      }

      router.push("/admin/experience");
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong.",
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="min-h-screen bg-[var(--background)] px-6 py-12 text-[var(--foreground)] md:px-12">
      <div className="mx-auto max-w-4xl">

        {/* Header */}

        <div className="mb-12 flex items-end justify-between border-b border-[var(--border)] pb-6">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
              Admin / Experience
            </p>

            <h1 className="text-4xl font-semibold tracking-[-0.04em]">
              Add Experience
            </h1>
          </div>

          <button
            type="button"
            onClick={() => router.push("/admin/experience")}
            className="text-xs uppercase tracking-[0.15em] text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
          >
            ← Back
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">

          {/* Company */}

          <div>
            <label className="mb-2 block text-xs uppercase tracking-[0.15em] text-[var(--muted)]">
              Company
            </label>

            <input
              required
              value={form.company}
              onChange={(e) =>
                updateField("company", e.target.value)
              }
              className="w-full border border-[var(--border)] bg-transparent px-4 py-4 outline-none focus:border-[var(--foreground)]"
              placeholder="Deloitte USI"
            />
          </div>

          {/* Role */}

          <div>
            <label className="mb-2 block text-xs uppercase tracking-[0.15em] text-[var(--muted)]">
              Role
            </label>

            <input
              required
              value={form.role}
              onChange={(e) =>
                updateField("role", e.target.value)
              }
              className="w-full border border-[var(--border)] bg-transparent px-4 py-4 outline-none focus:border-[var(--foreground)]"
              placeholder="Consultant — Intelligent Automation"
            />
          </div>

          {/* Dates */}

          <div className="grid gap-8 md:grid-cols-2">

            <div>
              <label className="mb-2 block text-xs uppercase tracking-[0.15em] text-[var(--muted)]">
                Start Date
              </label>

              <input
                required
                type="date"
                value={form.start_date}
                onChange={(e) =>
                  updateField("start_date", e.target.value)
                }
                className="w-full border border-[var(--border)] bg-transparent px-4 py-4 outline-none focus:border-[var(--foreground)]"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs uppercase tracking-[0.15em] text-[var(--muted)]">
                End Date
              </label>

              <input
                type="date"
                value={form.end_date}
                onChange={(e) =>
                  updateField("end_date", e.target.value)
                }
                className="w-full border border-[var(--border)] bg-transparent px-4 py-4 outline-none focus:border-[var(--foreground)]"
              />

              <p className="mt-2 text-xs text-[var(--muted)]">
                Leave empty if this is your current position.
              </p>
            </div>

          </div>

          {/* Description */}

          <div>
            <label className="mb-2 block text-xs uppercase tracking-[0.15em] text-[var(--muted)]">
              Description
            </label>

            <textarea
              required
              rows={8}
              value={form.description}
              onChange={(e) =>
                updateField("description", e.target.value)
              }
              className="w-full resize-none border border-[var(--border)] bg-transparent px-4 py-4 outline-none focus:border-[var(--foreground)]"
              placeholder="Describe your responsibilities, work, technologies and impact."
            />
          </div>

          {/* Display order */}

          <div>
            <label className="mb-2 block text-xs uppercase tracking-[0.15em] text-[var(--muted)]">
              Display Order
            </label>

            <input
              required
              type="number"
              value={form.display_order}
              onChange={(e) =>
                updateField(
                  "display_order",
                  Number(e.target.value),
                )
              }
              className="w-full border border-[var(--border)] bg-transparent px-4 py-4 outline-none focus:border-[var(--foreground)]"
            />

            <p className="mt-2 text-xs text-[var(--muted)]">
              Lower numbers appear first.
            </p>
          </div>

          {/* Error */}

          {message && (
            <div className="border border-red-900 px-4 py-3 text-sm text-red-400">
              {message}
            </div>
          )}

          {/* Submit */}

          <button
            type="submit"
            disabled={saving}
            className="w-full bg-[var(--foreground)] px-6 py-4 text-sm font-medium text-[var(--background)] transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving ? "Creating..." : "Create Experience"}
          </button>

        </form>
      </div>
    </main>
  );
}