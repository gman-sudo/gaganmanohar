"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

interface SiteSettings {
  id: number;
  name: string;
  hero_title: string;
  hero_description: string;
  location: string;
  years_experience: number;
  profile_image_url: string | null;
  github_url: string | null;
  linkedin_url: string | null;
  resume_url: string | null;
}

export default function SiteSettingsPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [heroTitle, setHeroTitle] = useState("");
  const [heroDescription, setHeroDescription] = useState("");
  const [location, setLocation] = useState("");
  const [yearsExperience, setYearsExperience] = useState(0);

  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/api/site`, {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Failed to load site settings.");
      }

      const data: SiteSettings = await response.json();

      setName(data.name || "");
      setHeroTitle(data.hero_title || "");
      setHeroDescription(data.hero_description || "");
      setLocation(data.location || "");
      setYearsExperience(data.years_experience || 0);

      setProfileImageUrl(data.profile_image_url || "");
      setGithubUrl(data.github_url || "");
      setLinkedinUrl(data.linkedin_url || "");
      setResumeUrl(data.resume_url || "");
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

  async function handleProfileImageUpload(
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
      formData.append("folder", "profile");

      const response = await fetch(`${API_URL}/api/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || "Profile image upload failed.",
        );
      }

      setProfileImageUrl(data.url);
      setMessage("Profile image uploaded successfully.");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Profile image upload failed.",
      );
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  }

  async function handleResumeUpload(
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
      formData.append("folder", "resume");

      const response = await fetch(
        `${API_URL}/api/upload/resume`,
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || "Resume upload failed.",
        );
      }

      setResumeUrl(data.url);
      setMessage("Resume uploaded successfully.");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Resume upload failed.",
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
      const response = await fetch(`${API_URL}/api/site`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          hero_title: heroTitle,
          hero_description: heroDescription,
          location,
          years_experience: Number(yearsExperience),
          profile_image_url: profileImageUrl || null,
          github_url: githubUrl || null,
          linkedin_url: linkedinUrl || null,
          resume_url: resumeUrl || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || "Failed to save site settings.",
        );
      }

      setMessage("Site settings saved successfully.");

      setTimeout(() => {
        router.refresh();
      }, 500);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to save site settings.",
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
            Loading site settings...
          </p>
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
            onClick={() => router.push("/admin")}
            className="mb-6 text-sm text-[#999991] transition hover:text-[#f5f5f0]"
          >
            ← Dashboard
          </button>

          <p className="mb-2 text-xs uppercase tracking-[0.25em] text-[#9fb7a3]">
            Content Management
          </p>

          <h1 className="text-3xl font-medium tracking-tight sm:text-4xl">
            Site Settings
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#777]">
            Control the identity, hero section, profile image,
            social links and resume used across your portfolio.
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

          {/* Identity */}

          <section className="border border-[#252525] bg-[#101010] p-6 sm:p-8">
            <div className="mb-7">
              <p className="text-xs uppercase tracking-[0.2em] text-[#9fb7a3]">
                01
              </p>

              <h2 className="mt-2 text-xl font-medium">
                Identity
              </h2>

              <p className="mt-2 text-sm text-[#777]">
                Basic information about you.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">

              <div>
                <label className="mb-2 block text-sm text-[#ccc]">
                  Name
                </label>

                <input
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  required
                  placeholder="Gaganmanohar"
                  className="w-full border border-[#303030] bg-[#0b0b0b] px-4 py-3 text-sm outline-none placeholder:text-[#555] focus:border-[#777]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-[#ccc]">
                  Location
                </label>

                <input
                  value={location}
                  onChange={(e) =>
                    setLocation(e.target.value)
                  }
                  placeholder="Dubai, UAE"
                  className="w-full border border-[#303030] bg-[#0b0b0b] px-4 py-3 text-sm outline-none placeholder:text-[#555] focus:border-[#777]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-[#ccc]">
                  Years of experience
                </label>

                <input
                  type="number"
                  min="0"
                  max="50"
                  value={yearsExperience}
                  onChange={(e) =>
                    setYearsExperience(
                      Number(e.target.value),
                    )
                  }
                  className="w-full border border-[#303030] bg-[#0b0b0b] px-4 py-3 text-sm outline-none focus:border-[#777]"
                />
              </div>
            </div>
          </section>

          {/* Hero */}

          <section className="border border-[#252525] bg-[#101010] p-6 sm:p-8">
            <div className="mb-7">
              <p className="text-xs uppercase tracking-[0.2em] text-[#9fb7a3]">
                02
              </p>

              <h2 className="mt-2 text-xl font-medium">
                Hero Section
              </h2>

              <p className="mt-2 text-sm text-[#777]">
                This content appears at the top of your
                portfolio.
              </p>
            </div>

            <div className="space-y-6">

              <div>
                <label className="mb-2 block text-sm text-[#ccc]">
                  Hero title
                </label>

                <input
                  value={heroTitle}
                  onChange={(e) =>
                    setHeroTitle(e.target.value)
                  }
                  required
                  placeholder="AI / ML Engineer"
                  className="w-full border border-[#303030] bg-[#0b0b0b] px-4 py-3 text-sm outline-none placeholder:text-[#555] focus:border-[#777]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-[#ccc]">
                  Hero description
                </label>

                <textarea
                  value={heroDescription}
                  onChange={(e) =>
                    setHeroDescription(e.target.value)
                  }
                  required
                  rows={5}
                  placeholder="Describe your professional focus..."
                  className="w-full resize-y border border-[#303030] bg-[#0b0b0b] px-4 py-3 text-sm leading-6 outline-none placeholder:text-[#555] focus:border-[#777]"
                />

                <p className="mt-2 text-xs text-[#555]">
                  {heroDescription.length} characters
                </p>
              </div>
            </div>
          </section>

          {/* Profile Image */}

          <section className="border border-[#252525] bg-[#101010] p-6 sm:p-8">
            <div className="mb-7">
              <p className="text-xs uppercase tracking-[0.2em] text-[#9fb7a3]">
                03
              </p>

              <h2 className="mt-2 text-xl font-medium">
                Profile Image
              </h2>

              <p className="mt-2 text-sm text-[#777]">
                Upload the profile photograph used on the
                homepage.
              </p>
            </div>

            <div className="flex flex-col gap-8 md:flex-row md:items-start">

              {/* Preview */}

              <div className="shrink-0">
                {profileImageUrl ? (
                  <img
                    src={profileImageUrl}
                    alt={name || "Profile"}
                    className="h-48 w-48 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-48 w-48 items-center justify-center rounded-full bg-[#171717] text-xs uppercase tracking-widest text-[#555]">
                    No image
                  </div>
                )}
              </div>

              {/* Upload */}

              <div className="flex-1">
                <div className="border border-dashed border-[#383838] p-6">
                  <label className="inline-flex cursor-pointer border border-[#444] px-5 py-3 text-sm transition hover:border-[#777]">
                    {uploading
                      ? "Uploading..."
                      : profileImageUrl
                        ? "Replace image"
                        : "Upload image"}

                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={
                        handleProfileImageUpload
                      }
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
                    value={profileImageUrl}
                    onChange={(e) =>
                      setProfileImageUrl(
                        e.target.value,
                      )
                    }
                    placeholder="https://..."
                    className="w-full border border-[#303030] bg-[#0b0b0b] px-4 py-3 text-sm outline-none placeholder:text-[#555] focus:border-[#777]"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Social Links */}

          <section className="border border-[#252525] bg-[#101010] p-6 sm:p-8">
            <div className="mb-7">
              <p className="text-xs uppercase tracking-[0.2em] text-[#9fb7a3]">
                04
              </p>

              <h2 className="mt-2 text-xl font-medium">
                Social Links
              </h2>

              <p className="mt-2 text-sm text-[#777]">
                These links are used by the public portfolio.
              </p>
            </div>

            <div className="space-y-6">

              <div>
                <label className="mb-2 block text-sm text-[#ccc]">
                  GitHub
                </label>

                <input
                  type="url"
                  value={githubUrl}
                  onChange={(e) =>
                    setGithubUrl(e.target.value)
                  }
                  placeholder="https://github.com/username"
                  className="w-full border border-[#303030] bg-[#0b0b0b] px-4 py-3 text-sm outline-none placeholder:text-[#555] focus:border-[#777]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-[#ccc]">
                  LinkedIn
                </label>

                <input
                  type="url"
                  value={linkedinUrl}
                  onChange={(e) =>
                    setLinkedinUrl(e.target.value)
                  }
                  placeholder="https://www.linkedin.com/in/username"
                  className="w-full border border-[#303030] bg-[#0b0b0b] px-4 py-3 text-sm outline-none placeholder:text-[#555] focus:border-[#777]"
                />
              </div>
            </div>
          </section>

          {/* Resume */}

          <section className="border border-[#252525] bg-[#101010] p-6 sm:p-8">
            <div className="mb-7">
              <p className="text-xs uppercase tracking-[0.2em] text-[#9fb7a3]">
                05
              </p>

              <h2 className="mt-2 text-xl font-medium">
                Resume
              </h2>

              <p className="mt-2 text-sm text-[#777]">
                Manage the resume linked from your portfolio.
              </p>
            </div>

            {resumeUrl && (
              <div className="mb-6 flex flex-col gap-4 border border-[#2b2b2b] bg-[#151515] p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-[#ccc]">
                    Current resume
                  </p>

                  <p className="mt-1 max-w-lg truncate text-xs text-[#555]">
                    {resumeUrl}
                  </p>
                </div>

                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-fit border border-[#444] px-4 py-2.5 text-xs transition hover:border-[#777]"
                >
                  Open Resume ↗
                </a>
              </div>
            )}

            <div className="border border-dashed border-[#383838] p-6">
              <label className="inline-flex cursor-pointer border border-[#444] px-5 py-3 text-sm transition hover:border-[#777]">
                {uploading
                  ? "Uploading..."
                  : "Upload new resume"}

                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleResumeUpload}
                  disabled={uploading}
                  className="hidden"
                />
              </label>

              <p className="mt-3 text-xs text-[#555]">
                PDF only
              </p>
            </div>

            <div className="mt-6">
              <label className="mb-2 block text-sm text-[#ccc]">
                Resume URL
              </label>

              <input
                type="url"
                value={resumeUrl}
                onChange={(e) =>
                  setResumeUrl(e.target.value)
                }
                placeholder="https://..."
                className="w-full border border-[#303030] bg-[#0b0b0b] px-4 py-3 text-sm outline-none placeholder:text-[#555] focus:border-[#777]"
              />
            </div>
          </section>

          {/* Save */}

          <div className="flex flex-col-reverse gap-3 border-t border-[#252525] pt-8 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => router.push("/admin")}
              className="border border-[#303030] px-6 py-3 text-sm transition hover:border-[#666]"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving || uploading}
              className="bg-[#f5f5f0] px-6 py-3 text-sm font-medium text-[#0b0b0b] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving
                ? "Saving..."
                : "Save Site Settings"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}