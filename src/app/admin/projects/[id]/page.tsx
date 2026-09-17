"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

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

export default function EditProjectPage() {
  const params = useParams();
  const router = useRouter();

  const projectId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [published, setPublished] = useState(false);
  const [displayOrder, setDisplayOrder] = useState(0);

  useEffect(() => {
    loadProject();
  }, [projectId]);

  async function loadProject() {
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

      const projects: Project[] = await response.json();

      const project = projects.find(
        (item) => item.id === Number(projectId),
      );

      if (!project) {
        throw new Error("Project not found.");
      }

      setTitle(project.title);
      setSlug(project.slug);
      setShortDescription(project.short_description);
      setDescription(project.description || "");
      setTechnologies(project.technologies || "");
      setGithubUrl(project.github_url || "");
      setLiveUrl(project.live_url || "");
      setImageUrl(project.image_url || "");
      setPublished(project.published);
      setDisplayOrder(project.display_order);
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

  async function handleImageUpload(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setUploading(true);
    setMessage("");
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "projects");

      const response = await fetch(
        `${API_URL}/api/upload`,
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || "Image upload failed.",
        );
      }

      setImageUrl(data.url);
      setMessage("Image uploaded successfully.");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Image upload failed.",
      );
    } finally {
      setUploading(false);
      event.target.value = "";
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
        `${API_URL}/api/projects/${projectId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            slug,
            short_description: shortDescription,
            description: description || null,
            technologies: technologies || null,
            github_url: githubUrl || null,
            live_url: liveUrl || null,
            image_url: imageUrl || null,
            published,
            display_order: Number(displayOrder),
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || "Failed to save project.",
        );
      }

      setMessage("Project saved successfully.");

      setTimeout(() => {
        router.push("/admin/projects");
        router.refresh();
      }, 700);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to save project.",
      );
    } finally {
      setSaving(false);
    }
  }

  function generateSlug() {
    const generated = title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    setSlug(generated);
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#0b0b0b] px-6 py-12 text-[#f5f5f0]">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm text-[#999991]">
            Loading project...
          </p>
        </div>
      </main>
    );
  }

  if (error && !title) {
    return (
      <main className="min-h-screen bg-[#0b0b0b] px-6 py-12 text-[#f5f5f0]">
        <div className="mx-auto max-w-5xl">
          <button
            onClick={() => router.push("/admin/projects")}
            className="mb-8 text-sm text-[#999991] transition hover:text-[#f5f5f0]"
          >
            ← Back to projects
          </button>

          <div className="border border-red-900/50 bg-red-950/20 p-6">
            <p className="text-sm text-red-300">
              {error}
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0b0b0b] px-6 py-10 text-[#f5f5f0]">
      <div className="mx-auto max-w-5xl">

        {/* Header */}

        <div className="mb-10 flex flex-col gap-5 border-b border-[#252525] pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <button
              onClick={() =>
                router.push("/admin/projects")
              }
              className="mb-5 text-sm text-[#999991] transition hover:text-[#f5f5f0]"
            >
              ← Back to projects
            </button>

            <p className="mb-2 text-xs uppercase tracking-[0.25em] text-[#9fb7a3]">
              Project CMS
            </p>

            <h1 className="text-3xl font-medium tracking-tight sm:text-4xl">
              Edit Project
            </h1>

            <p className="mt-3 text-sm text-[#999991]">
              Update how this project appears on your
              portfolio.
            </p>
          </div>

          <a
            href={`/projects/${slug}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-fit items-center border border-[#333] px-4 py-2.5 text-sm transition hover:border-[#666]"
          >
            View project ↗
          </a>
        </div>

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

          {/* Basic Information */}

          <section className="border border-[#252525] bg-[#101010] p-6 sm:p-8">
            <div className="mb-7">
              <p className="text-xs uppercase tracking-[0.2em] text-[#9fb7a3]">
                01
              </p>

              <h2 className="mt-2 text-xl font-medium">
                Basic Information
              </h2>

              <p className="mt-2 text-sm text-[#777]">
                The core information visitors see first.
              </p>
            </div>

            <div className="space-y-6">

              <div>
                <label className="mb-2 block text-sm text-[#ccc]">
                  Project title
                </label>

                <input
                  value={title}
                  onChange={(e) =>
                    setTitle(e.target.value)
                  }
                  required
                  placeholder="GraphVex"
                  className="w-full border border-[#303030] bg-[#0b0b0b] px-4 py-3 text-sm outline-none transition placeholder:text-[#555] focus:border-[#777]"
                />
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="block text-sm text-[#ccc]">
                    URL slug
                  </label>

                  <button
                    type="button"
                    onClick={generateSlug}
                    className="text-xs text-[#9fb7a3] hover:underline"
                  >
                    Generate from title
                  </button>
                </div>

                <div className="flex items-center">
                  <span className="border border-r-0 border-[#303030] bg-[#171717] px-3 py-3 text-sm text-[#666]">
                    /projects/
                  </span>

                  <input
                    value={slug}
                    onChange={(e) =>
                      setSlug(
                        e.target.value
                          .toLowerCase()
                          .replace(/\s+/g, "-"),
                      )
                    }
                    required
                    className="min-w-0 flex-1 border border-[#303030] bg-[#0b0b0b] px-4 py-3 text-sm outline-none focus:border-[#777]"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm text-[#ccc]">
                  Short description
                </label>

                <textarea
                  value={shortDescription}
                  onChange={(e) =>
                    setShortDescription(e.target.value)
                  }
                  required
                  rows={3}
                  placeholder="A concise explanation of the project."
                  className="w-full resize-y border border-[#303030] bg-[#0b0b0b] px-4 py-3 text-sm leading-6 outline-none placeholder:text-[#555] focus:border-[#777]"
                />

                <p className="mt-2 text-xs text-[#555]">
                  {shortDescription.length} characters
                </p>
              </div>

              <div>
                <label className="mb-2 block text-sm text-[#ccc]">
                  Full description
                </label>

                <textarea
                  value={description}
                  onChange={(e) =>
                    setDescription(e.target.value)
                  }
                  rows={10}
                  placeholder="Describe the problem, approach, architecture, technologies and outcome."
                  className="w-full resize-y border border-[#303030] bg-[#0b0b0b] px-4 py-3 text-sm leading-6 outline-none placeholder:text-[#555] focus:border-[#777]"
                />

                <p className="mt-2 text-xs text-[#555]">
                  This is used on the project case study
                  page.
                </p>
              </div>
            </div>
          </section>

          {/* Technology */}

          <section className="border border-[#252525] bg-[#101010] p-6 sm:p-8">
            <div className="mb-7">
              <p className="text-xs uppercase tracking-[0.2em] text-[#9fb7a3]">
                02
              </p>

              <h2 className="mt-2 text-xl font-medium">
                Technology
              </h2>

              <p className="mt-2 text-sm text-[#777]">
                Separate technologies with commas.
              </p>
            </div>

            <textarea
              value={technologies}
              onChange={(e) =>
                setTechnologies(e.target.value)
              }
              rows={4}
              placeholder="Python, FastAPI, PostgreSQL, Pandas"
              className="w-full resize-y border border-[#303030] bg-[#0b0b0b] px-4 py-3 text-sm leading-6 outline-none placeholder:text-[#555] focus:border-[#777]"
            />

            <div className="mt-4 flex flex-wrap gap-2">
              {technologies
                .split(",")
                .map((tech) => tech.trim())
                .filter(Boolean)
                .map((tech) => (
                  <span
                    key={tech}
                    className="border border-[#303030] bg-[#171717] px-3 py-1.5 text-xs text-[#aaa]"
                  >
                    {tech}
                  </span>
                ))}
            </div>
          </section>

          {/* Image */}

          <section className="border border-[#252525] bg-[#101010] p-6 sm:p-8">
            <div className="mb-7">
              <p className="text-xs uppercase tracking-[0.2em] text-[#9fb7a3]">
                03
              </p>

              <h2 className="mt-2 text-xl font-medium">
                Project Image
              </h2>

              <p className="mt-2 text-sm text-[#777]">
                Upload the visual used on your portfolio.
              </p>
            </div>

            {imageUrl && (
              <div className="mb-6 overflow-hidden border border-[#303030] bg-[#0b0b0b]">
                <img
                  src={imageUrl}
                  alt={title || "Project preview"}
                  className="aspect-video w-full object-cover"
                />
              </div>
            )}

            <div className="border border-dashed border-[#383838] p-6 text-center">
              <label className="inline-flex cursor-pointer items-center border border-[#444] px-5 py-3 text-sm transition hover:border-[#777]">
                {uploading
                  ? "Uploading..."
                  : imageUrl
                    ? "Replace image"
                    : "Upload image"}

                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleImageUpload}
                  disabled={uploading}
                  className="hidden"
                />
              </label>

              <p className="mt-3 text-xs text-[#555]">
                JPG, PNG or WebP
              </p>
            </div>

            <div className="mt-6">
              <label className="mb-2 block text-sm text-[#ccc]">
                Image URL
              </label>

              <input
                value={imageUrl}
                onChange={(e) =>
                  setImageUrl(e.target.value)
                }
                placeholder="https://..."
                className="w-full border border-[#303030] bg-[#0b0b0b] px-4 py-3 text-sm outline-none placeholder:text-[#555] focus:border-[#777]"
              />
            </div>
          </section>

          {/* Links */}

          <section className="border border-[#252525] bg-[#101010] p-6 sm:p-8">
            <div className="mb-7">
              <p className="text-xs uppercase tracking-[0.2em] text-[#9fb7a3]">
                04
              </p>

              <h2 className="mt-2 text-xl font-medium">
                Links
              </h2>

              <p className="mt-2 text-sm text-[#777]">
                Optional links to source code and live
                deployments.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm text-[#ccc]">
                  GitHub URL
                </label>

                <input
                  value={githubUrl}
                  onChange={(e) =>
                    setGithubUrl(e.target.value)
                  }
                  type="url"
                  placeholder="https://github.com/..."
                  className="w-full border border-[#303030] bg-[#0b0b0b] px-4 py-3 text-sm outline-none placeholder:text-[#555] focus:border-[#777]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-[#ccc]">
                  Live URL
                </label>

                <input
                  value={liveUrl}
                  onChange={(e) =>
                    setLiveUrl(e.target.value)
                  }
                  type="url"
                  placeholder="https://..."
                  className="w-full border border-[#303030] bg-[#0b0b0b] px-4 py-3 text-sm outline-none placeholder:text-[#555] focus:border-[#777]"
                />
              </div>
            </div>
          </section>

          {/* Publishing */}

          <section className="border border-[#252525] bg-[#101010] p-6 sm:p-8">
            <div className="mb-7">
              <p className="text-xs uppercase tracking-[0.2em] text-[#9fb7a3]">
                05
              </p>

              <h2 className="mt-2 text-xl font-medium">
                Publishing
              </h2>
            </div>

            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

              <div>
                <p className="text-sm text-[#ccc]">
                  Publish project
                </p>

                <p className="mt-1 text-xs text-[#666]">
                  Published projects appear on the public
                  portfolio.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setPublished(!published)
                }
                className={`relative h-7 w-12 rounded-full transition ${
                  published
                    ? "bg-[#9fb7a3]"
                    : "bg-[#333]"
                }`}
                aria-label="Toggle project publishing"
              >
                <span
                  className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
                    published
                      ? "left-6"
                      : "left-1"
                  }`}
                />
              </button>
            </div>

            <div className="mt-8 max-w-xs">
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
                router.push("/admin/projects")
              }
              className="border border-[#303030] px-6 py-3 text-sm transition hover:border-[#666]"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving || uploading}
              className="bg-[#f5f5f0] px-6 py-3 text-sm font-medium text-[#0b0b0b] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Project"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}