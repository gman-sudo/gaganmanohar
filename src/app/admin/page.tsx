"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

interface SiteSettings {
  name: string;
  hero_title: string;
  location: string;
  profile_image_url: string | null;
  resume_url: string | null;
  github_url: string | null;
  linkedin_url: string | null;
}

interface Project {
  id: number;
  title: string;
  published: boolean;
}

interface Experience {
  id: number;
  company: string;
  role: string;
}

interface Education {
  id: number;
  institution: string;
  degree: string;
}

interface Skill {
  id: number;
  category: string;
  name: string;
}

export default function AdminDashboard() {
  const [site, setSite] = useState<SiteSettings | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [experience, setExperience] = useState<Experience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const [
          siteResponse,
          projectsResponse,
          experienceResponse,
          educationResponse,
          skillsResponse,
        ] = await Promise.all([
          fetch(`${API_URL}/api/site`, {
            cache: "no-store",
          }),
          fetch(`${API_URL}/api/projects`, {
            cache: "no-store",
          }),
          fetch(`${API_URL}/api/experience`, {
            cache: "no-store",
          }),
          fetch(`${API_URL}/api/education`, {
            cache: "no-store",
          }),
          fetch(`${API_URL}/api/skills`, {
            cache: "no-store",
          }),
        ]);

        if (!siteResponse.ok) {
          throw new Error("Failed to load site settings.");
        }

        if (!projectsResponse.ok) {
          throw new Error("Failed to load projects.");
        }

        if (!experienceResponse.ok) {
          throw new Error("Failed to load experience.");
        }

        if (!educationResponse.ok) {
          throw new Error("Failed to load education.");
        }

        if (!skillsResponse.ok) {
          throw new Error("Failed to load skills.");
        }

        const siteData = await siteResponse.json();
        const projectsData = await projectsResponse.json();
        const experienceData = await experienceResponse.json();
        const educationData = await educationResponse.json();
        const skillsData = await skillsResponse.json();

        setSite(siteData);
        setProjects(
          Array.isArray(projectsData)
            ? projectsData
            : [],
        );
        setExperience(
          Array.isArray(experienceData)
            ? experienceData
            : [],
        );
        setEducation(
          Array.isArray(educationData)
            ? educationData
            : [],
        );
        setSkills(
          Array.isArray(skillsData)
            ? skillsData
            : [],
        );
      } catch (error) {
        console.error(
          "Failed to load dashboard:",
          error,
        );
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  const publishedProjects = projects.filter(
    (project) => project.published,
  ).length;

  if (loading) {
    return (
      <main className="min-h-screen bg-[#0b0b0b] px-6 py-12 text-[#f5f5f0]">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm text-[#999991]">
            Loading dashboard...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0b0b0b] text-[#f5f5f0]">
      <div className="mx-auto max-w-6xl px-6 py-10 lg:px-10">

        {/* Header */}
        <header className="flex flex-col gap-6 border-b border-[#252525] pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.25em] text-[#9fb7a3]">
              GAGANMANOHAR CMS
            </p>

            <h1 className="text-4xl font-medium tracking-tight sm:text-5xl">
              Dashboard
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-[#999991]">
              Manage the content that powers your public
              portfolio.
            </p>
          </div>

          <Link
            href="/"
            target="_blank"
            className="inline-flex w-fit items-center border border-[#333] px-5 py-3 text-sm transition hover:border-[#777]"
          >
            View Portfolio ↗
          </Link>
        </header>

        {/* Stats */}
        <section className="grid grid-cols-2 border-b border-[#252525] sm:grid-cols-4">
          <Stat
            label="Projects"
            value={projects.length}
          />

          <Stat
            label="Published"
            value={publishedProjects}
          />

          <Stat
            label="Experience"
            value={experience.length}
          />

          <Stat
            label="Skills"
            value={skills.length}
          />
        </section>

        {/* Quick Actions */}
        <section className="py-10">
          <div className="mb-6">
            <p className="text-xs uppercase tracking-[0.2em] text-[#777]">
              Quick Actions
            </p>
          </div>

          <div className="grid gap-px overflow-hidden border border-[#252525] bg-[#252525] sm:grid-cols-2 lg:grid-cols-4">

            <ActionCard
              href="/admin/site"
              title="Site Settings"
              description="Hero, profile, links and resume"
            />

            <ActionCard
              href="/admin/projects/new"
              title="Add Project"
              description="Create a new portfolio case study"
            />

            <ActionCard
              href="/admin/experience/new"
              title="Add Experience"
              description="Update your professional history"
            />

            <ActionCard
              href="/admin/skills/new"
              title="Add Skill"
              description="Add technologies and capabilities"
            />

          </div>
        </section>

        {/* Content */}
        <section className="pb-10">
          <div className="mb-6">
            <p className="text-xs uppercase tracking-[0.2em] text-[#777]">
              Content
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">

            <ManagementCard
              title="Projects"
              count={projects.length}
              description="Manage portfolio projects, visibility and case studies."
              href="/admin/projects"
              items={projects
                .slice(0, 3)
                .map((project) => ({
                  title: project.title,
                  meta: project.published
                    ? "Published"
                    : "Draft",
                }))}
            />

            <ManagementCard
              title="Experience"
              count={experience.length}
              description="Manage your professional experience and roles."
              href="/admin/experience"
              items={experience
                .slice(0, 3)
                .map((item) => ({
                  title: item.role,
                  meta: item.company,
                }))}
            />

            <ManagementCard
              title="Education"
              count={education.length}
              description="Manage your academic background."
              href="/admin/education"
              items={education
                .slice(0, 3)
                .map((item) => ({
                  title: item.degree,
                  meta: item.institution,
                }))}
            />

            <ManagementCard
              title="Skills"
              count={skills.length}
              description="Manage the technologies and capabilities displayed publicly."
              href="/admin/skills"
              items={skills
                .slice(0, 3)
                .map((item) => ({
                  title: item.name,
                  meta: item.category,
                }))}
            />

          </div>
        </section>

        {/* Site Status */}
        <section className="border-t border-[#252525] py-10">
          <div className="mb-6">
            <p className="text-xs uppercase tracking-[0.2em] text-[#777]">
              Site Status
            </p>
          </div>

          <div className="grid gap-px overflow-hidden border border-[#252525] bg-[#252525] sm:grid-cols-2 lg:grid-cols-4">

            <StatusCard
              label="Profile Image"
              active={Boolean(
                site?.profile_image_url,
              )}
            />

            <StatusCard
              label="Resume"
              active={Boolean(site?.resume_url)}
            />

            <StatusCard
              label="GitHub"
              active={Boolean(site?.github_url)}
            />

            <StatusCard
              label="LinkedIn"
              active={Boolean(
                site?.linkedin_url,
              )}
            />

          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-[#252525] pt-6 text-xs text-[#666]">
          GAGANMANOHAR CMS · Local development
        </footer>
      </div>
    </main>
  );
}


function Stat({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="border-r border-[#252525] px-5 py-7 first:pl-0">
      <p className="text-3xl font-medium">
        {value}
      </p>

      <p className="mt-2 text-xs uppercase tracking-[0.15em] text-[#777]">
        {label}
      </p>
    </div>
  );
}


function ActionCard({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="group bg-[#0b0b0b] p-6 transition hover:bg-[#111]"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-base">
          {title}
        </h2>

        <span className="text-[#666] transition group-hover:translate-x-1 group-hover:text-[#f5f5f0]">
          →
        </span>
      </div>

      <p className="mt-3 text-sm leading-6 text-[#777]">
        {description}
      </p>
    </Link>
  );
}


function ManagementCard({
  title,
  count,
  description,
  href,
  items,
}: {
  title: string;
  count: number;
  description: string;
  href: string;
  items: {
    title: string;
    meta: string;
  }[];
}) {
  return (
    <div className="border border-[#252525] p-6">

      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl">
            {title}
          </h2>

          <p className="mt-2 text-sm leading-6 text-[#777]">
            {description}
          </p>
        </div>

        <span className="text-sm text-[#666]">
          {count}
        </span>
      </div>

      <div className="mt-6 border-t border-[#252525]">
        {items.length === 0 ? (
          <p className="py-4 text-sm text-[#666]">
            No entries yet.
          </p>
        ) : (
          items.map((item) => (
            <div
              key={`${item.title}-${item.meta}`}
              className="flex items-center justify-between border-b border-[#252525] py-3"
            >
              <span className="text-sm">
                {item.title}
              </span>

              <span className="text-xs text-[#666]">
                {item.meta}
              </span>
            </div>
          ))
        )}
      </div>

      <Link
        href={href}
        className="mt-5 inline-block text-sm text-[#9fb7a3] transition hover:text-[#c4d4c7]"
      >
        Manage {title} →
      </Link>
    </div>
  );
}


function StatusCard({
  label,
  active,
}: {
  label: string;
  active: boolean;
}) {
  return (
    <div className="bg-[#0b0b0b] p-5">

      <div className="flex items-center gap-3">
        <span
          className={`h-2 w-2 rounded-full ${
            active
              ? "bg-[#9fb7a3]"
              : "bg-[#444]"
          }`}
        />

        <span className="text-sm">
          {label}
        </span>
      </div>

      <p className="mt-2 pl-5 text-xs text-[#666]">
        {active
          ? "Configured"
          : "Not configured"}
      </p>
    </div>
  );
}