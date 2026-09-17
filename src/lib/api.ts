const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export interface SiteSettings {
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

export interface Project {
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

export interface Experience {
  id: number;
  company: string;
  role: string;
  start_date: string;
  end_date: string | null;
  description: string;
  display_order: number;
}

export interface Education {
  id: number;
  institution: string;
  degree: string;
  start_year: number;
  end_year: number | null;
  description: string | null;
  display_order: number;
}

export interface Skill {
  id: number;
  category: string;
  name: string;
  display_order: number;
}

async function fetchAPI<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(
      `API request failed: ${response.status} ${response.statusText}`,
    );
  }

  return response.json();
}

export function getSiteSettings(): Promise<SiteSettings> {
  return fetchAPI<SiteSettings>("/api/site");
}

export function getProjects(): Promise<Project[]> {
  return fetchAPI<Project[]>("/api/projects");
}

export function getExperience(): Promise<Experience[]> {
  return fetchAPI<Experience[]>("/api/experience");
}

export function getEducation(): Promise<Education[]> {
  return fetchAPI<Education[]>("/api/education");
}

export function getSkills(): Promise<Skill[]> {
  return fetchAPI<Skill[]>("/api/skills");
}