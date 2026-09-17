"use client";

import { FormEvent, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

interface Education {
  id: number;
  institution: string;
  degree: string;
  start_year: number;
  end_year: number | null;
  description: string | null;
  display_order: number;
}

export default function EditEducationPage() {
  const params = useParams();
  const router = useRouter();

  const educationId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [institution, setInstitution] = useState("");
  const [degree, setDegree] = useState("");
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");
  const [description, setDescription] = useState("");
  const [displayOrder, setDisplayOrder] = useState(0);

  useEffect(() => {
    loadEducation();
  }, [educationId]);

  async function loadEducation() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_URL}/api/education/${educationId}`,
        {
          cache: "no-store",
        },
      );

      if (!response.ok) {
        throw new Error("Failed to load education.");
      }

      const data: Education = await response.json();

      setInstitution(data.institution || "");
      setDegree(data.degree || "");
      setStartYear(
        data.start_year
          ? String(data.start_year)
          : "",
      );
      setEndYear(
        data.end_year
          ? String(data.end_year)
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

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setSaving(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch(
        `${API_URL}/api/education/${educationId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            institution,
            degree,
            start_year: Number(startYear),
            end_year: endYear
              ? Number(endYear)
              : null,
            description: description || null,
            display_order: Number(displayOrder),
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || "Failed to save education.",
        );
      }

      setMessage(
        "Education saved successfully.",
      );

      setTimeout(() => {
        router.push("/admin/education");
        router.refresh();
      }, 700);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to save education.",
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
            Loading education...
          </p>
        </div>
      </main>
    );
  }

  if (error && !institution) {
    return (
      <main className="min-h-screen bg-[#0b0b0b] px-6 py-12 text-[#f5f5f0]">
        <div className="mx-auto max-w-5xl">
          <button
            type="button"
            onClick={() =>
              router.push("/admin/education")
            }
            className="mb-8 text-sm text-[#999991] transition hover:text-[#f5f5f0]"
          >
            ← Back to education
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
              router.push("/admin/education")
            }
            className="mb-6 text-sm text-[#999991] transition hover:text-[#f5f5f0]"
          >
            ← Back to education
          </button>

          <p className="mb-2 text-xs uppercase tracking-[0.25em] text-[#9fb7a3]">
            Education CMS
          </p>

          <h1 className="text-3xl font-medium tracking-tight sm:text-4xl">
            Edit Education
          </h1>

          <p className="mt-3 text-sm leading-6 text-[#777]">
            Update your academic background without editing
            the website code.
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

          {/* Academic Information */}

          <section className="border border-[#252525] bg-[#101010] p-6 sm:p-8">
            <div className="mb-7">
              <p className="text-xs uppercase tracking-[0.2em] text-[#9fb7a3]">
                01
              </p>

              <h2 className="mt-2 text-xl font-medium">
                Academic Information
              </h2>

              <p className="mt-2 text-sm text-[#777]">
                Your institution and qualification.
              </p>
            </div>

            <div className="space-y-6">

              <div>
                <label className="mb-2 block text-sm text-[#ccc]">
                  Institution
                </label>

                <input
                  value={institution}
                  onChange={(e) =>
                    setInstitution(e.target.value)
                  }
                  required
                  placeholder="Middlesex University Dubai"
                  className="w-full border border-[#303030] bg-[#0b0b0b] px-4 py-3 text-sm outline-none placeholder:text-[#555] focus:border-[#777]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-[#ccc]">
                  Degree / Qualification
                </label>

                <input
                  value={degree}
                  onChange={(e) =>
                    setDegree(e.target.value)
                  }
                  required
                  placeholder="MSc Data Science & Artificial Intelligence"
                  className="w-full border border-[#303030] bg-[#0b0b0b] px-4 py-3 text-sm outline-none placeholder:text-[#555] focus:border-[#777]"
                />
              </div>
            </div>
          </section>

          {/* Timeline */}

          <section className="border border-[#252525] bg-[#101010] p-6 sm:p-8">
            <div className="mb-7">
              <p className="text-xs uppercase tracking-[0.2em] text-[#9fb7a3]">
                02
              </p>

              <h2 className="mt-2 text-xl font-medium">
                Timeline
              </h2>

              <p className="mt-2 text-sm text-[#777]">
                Define the academic period.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">

              <div>
                <label className="mb-2 block text-sm text-[#ccc]">
                  Start year
                </label>

                <input
                  type="number"
                  min="1900"
                  max="2100"
                  value={startYear}
                  onChange={(e) =>
                    setStartYear(e.target.value)
                  }
                  required
                  placeholder="2026"
                  className="w-full border border-[#303030] bg-[#0b0b0b] px-4 py-3 text-sm outline-none placeholder:text-[#555] focus:border-[#777]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-[#ccc]">
                  End year
                </label>

                <input
                  type="number"
                  min="1900"
                  max="2100"
                  value={endYear}
                  onChange={(e) =>
                    setEndYear(e.target.value)
                  }
                  placeholder="2027"
                  className="w-full border border-[#303030] bg-[#0b0b0b] px-4 py-3 text-sm outline-none placeholder:text-[#555] focus:border-[#777]"
                />

                <p className="mt-2 text-xs text-[#555]">
                  Leave empty if currently studying.
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
                Optional additional information about this
                qualification.
              </p>
            </div>

            <textarea
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              rows={8}
              placeholder="Relevant coursework, focus areas, achievements..."
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
                Control the ordering of education entries.
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
                router.push("/admin/education")
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
                : "Save Education"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}