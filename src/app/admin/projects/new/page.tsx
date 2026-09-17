"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export default function NewProjectPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    slug: "",
    short_description: "",
    description: "",
    technologies: "",
    github_url: "",
    live_url: "",
    image_url: "",
    published: false,
    display_order: 0,
  });

  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  function updateField(
    field: string,
    value: string | boolean | number,
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function generateSlug(title: string) {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function handleTitleChange(value: string) {
    setForm((current) => ({
      ...current,
      title: value,
      slug: current.slug || generateSlug(value),
    }));
  }

  async function handleImageUpload(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setUploading(true);
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(`${API_URL}/api/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Image upload failed.");
      }

      setForm((current) => ({
        ...current,
        image_url: data.url,
      }));
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Image upload failed.",
      );
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSaving(true);
    setMessage("");

    try {
      const response = await fetch(`${API_URL}/api/projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Failed to create project.");
      }

      router.push(`/admin/projects/${data.id}`);
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
              Admin / Projects
            </p>

            <h1 className="text-4xl font-semibold tracking-[-0.04em]">
              New Project
            </h1>
          </div>

          <button
            type="button"
            onClick={() => router.push("/admin/projects")}
            className="text-xs uppercase tracking-[0.15em] text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
          >
            ← Back
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">

          {/* Title */}

          <div>
            <label className="mb-2 block text-xs uppercase tracking-[0.15em] text-[var(--muted)]">
              Title
            </label>

            <input
              required
              value={form.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full border border-[var(--border)] bg-transparent px-4 py-4 outline-none focus:border-[var(--foreground)]"
              placeholder="GraphVex"
            />
          </div>

          {/* Slug */}

          <div>
            <label className="mb-2 block text-xs uppercase tracking-[0.15em] text-[var(--muted)]">
              Slug
            </label>

            <input
              required
              value={form.slug}
              onChange={(e) =>
                updateField("slug", e.target.value)
              }
              className="w-full border border-[var(--border)] bg-transparent px-4 py-4 outline-none focus:border-[var(--foreground)]"
              placeholder="graphvex"
            />

            <p className="mt-2 text-xs text-[var(--muted)]">
              Used in the project URL.
            </p>
          </div>

          {/* Short description */}

          <div>
            <label className="mb-2 block text-xs uppercase tracking-[0.15em] text-[var(--muted)]">
              Short Description
            </label>

            <textarea
              required
              rows={3}
              value={form.short_description}
              onChange={(e) =>
                updateField(
                  "short_description",
                  e.target.value,
                )
              }
              className="w-full resize-none border border-[var(--border)] bg-transparent px-4 py-4 outline-none focus:border-[var(--foreground)]"
              placeholder="Short description shown on the homepage."
            />
          </div>

          {/* Full description */}

          <div>
            <label className="mb-2 block text-xs uppercase tracking-[0.15em] text-[var(--muted)]">
              Full Description
            </label>

            <textarea
              rows={8}
              value={form.description}
              onChange={(e) =>
                updateField("description", e.target.value)
              }
              className="w-full resize-none border border-[var(--border)] bg-transparent px-4 py-4 outline-none focus:border-[var(--foreground)]"
              placeholder="Detailed project description."
            />
          </div>

          {/* Technologies */}

          <div>
            <label className="mb-2 block text-xs uppercase tracking-[0.15em] text-[var(--muted)]">
              Technologies
            </label>

            <textarea
              rows={3}
              value={form.technologies}
              onChange={(e) =>
                updateField(
                  "technologies",
                  e.target.value,
                )
              }
              className="w-full resize-none border border-[var(--border)] bg-transparent px-4 py-4 outline-none focus:border-[var(--foreground)]"
              placeholder="Python, FastAPI, PostgreSQL, Pandas..."
            />
          </div>

          {/* URLs */}

          <div className="grid gap-8 md:grid-cols-2">

            <div>
              <label className="mb-2 block text-xs uppercase tracking-[0.15em] text-[var(--muted)]">
                GitHub URL
              </label>

              <input
                type="url"
                value={form.github_url}
                onChange={(e) =>
                  updateField(
                    "github_url",
                    e.target.value,
                  )
                }
                className="w-full border border-[var(--border)] bg-transparent px-4 py-4 outline-none focus:border-[var(--foreground)]"
                placeholder="https://github.com/..."
              />
            </div>

            <div>
              <label className="mb-2 block text-xs uppercase tracking-[0.15em] text-[var(--muted)]">
                Live URL
              </label>

              <input
                type="url"
                value={form.live_url}
                onChange={(e) =>
                  updateField(
                    "live_url",
                    e.target.value,
                  )
                }
                className="w-full border border-[var(--border)] bg-transparent px-4 py-4 outline-none focus:border-[var(--foreground)]"
                placeholder="https://..."
              />
            </div>

          </div>

          {/* Image upload */}

          <div>
            <label className="mb-3 block text-xs uppercase tracking-[0.15em] text-[var(--muted)]">
              Project Image
            </label>

            <div className="border border-dashed border-[var(--border)] p-6">

              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleImageUpload}
                disabled={uploading}
                className="block w-full text-sm text-[var(--muted)] file:mr-4 file:border-0 file:bg-[var(--foreground)] file:px-4 file:py-2 file:text-xs file:uppercase file:tracking-[0.1em] file:text-[var(--background)]"
              />

              <p className="mt-3 text-xs text-[var(--muted)]">
                JPG, PNG or WebP. Maximum 10 MB.
              </p>

              {uploading && (
                <p className="mt-4 text-sm">
                  Uploading image...
                </p>
              )}

              {form.image_url && (
                <div className="mt-6">
                  <img
                    src={form.image_url}
                    alt="Project preview"
                    className="max-h-80 w-full object-cover"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      updateField("image_url", "")
                    }
                    className="mt-3 text-xs uppercase tracking-[0.15em] text-[var(--muted)] hover:text-[var(--foreground)]"
                  >
                    Remove image
                  </button>
                </div>
              )}

            </div>
          </div>

          {/* Display order */}

          <div>
            <label className="mb-2 block text-xs uppercase tracking-[0.15em] text-[var(--muted)]">
              Display Order
            </label>

            <input
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
          </div>

          {/* Published */}

          <label className="flex items-center gap-3 text-sm">
            <input
              type="checkbox"
              checked={form.published}
              onChange={(e) =>
                updateField(
                  "published",
                  e.target.checked,
                )
              }
            />

            Publish project
          </label>

          {/* Error */}

          {message && (
            <p className="border border-red-900 px-4 py-3 text-sm text-red-400">
              {message}
            </p>
          )}

          {/* Submit */}

          <button
            type="submit"
            disabled={saving || uploading}
            className="w-full bg-[var(--foreground)] px-6 py-4 text-sm font-medium text-[var(--background)] transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving
              ? "Creating..."
              : uploading
                ? "Finish image upload first"
                : "Create Project"}
          </button>

        </form>
      </div>
    </main>
  );
}