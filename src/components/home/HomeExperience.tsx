"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import HomeSkills from "@/components/home/HomeSkills";
import HomeContact from "@/components/home/HomeContact";
import HomeFooter from "@/components/home/HomeFooter";
import HomeNavbar from "@/components/home/HomeNavbar";

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

interface Site {
  name?: string | null;
  title?: string | null;
  tagline?: string | null;
  bio?: string | null;
  email?: string | null;
  location?: string | null;
  resume_url?: string | null;
  github_url?: string | null;
  linkedin_url?: string | null;
  profile_image?: string | null;
}

interface Project {
  id: number;
  title: string;
  slug: string;
  description?: string | null;
  image_url?: string | null;
  technologies?: string | null;
  github_url?: string | null;
  live_url?: string | null;
  featured?: boolean | null;
}

interface Experience {
  id: number;
  company: string;
  role: string;
  location?: string | null;
  start_date?: string | null;
  end_date?: string | null;
  description?: string | null;
  technologies?: string | null;
}

interface Education {
  id: number;
  institution: string;
  degree: string;
  field?: string | null;
  location?: string | null;
  start_date?: string | null;
  end_date?: string | null;
  description?: string | null;
}

interface Skill {
  id: number;
  name: string;
  category?: string | null;
  level?: string | null;
}

interface HomeExperienceProps {
  site: Site | null;
  projects: Project[];
  experience: Experience[];
  education: Education[];
  skills: Skill[];
}

/* -------------------------------------------------------------------------- */
/*                               MOTION VARIANTS                              */
/* -------------------------------------------------------------------------- */

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const fadeIn: Variants = {
  hidden: {
    opacity: 0,
  },

  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const stagger: Variants = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

/* -------------------------------------------------------------------------- */
/*                                  HELPERS                                   */
/* -------------------------------------------------------------------------- */

function parseList(value?: string | null): string[] {
  if (!value) {
    return [];
  }

  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function formatDate(value?: string | null): string {
  if (!value) {
    return "";
  }

  try {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return value;
    }

    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  } catch {
    return value;
  }
}

/* -------------------------------------------------------------------------- */
/*                              MAIN COMPONENT                                */
/* -------------------------------------------------------------------------- */

export default function HomeExperience({
  site,
  projects,
  experience,
  education,
  skills,
}: HomeExperienceProps) {
  const displayName = site?.name || "Gaganmanohar";

  const displayTagline =
    site?.tagline ||
    "Building intelligent systems that turn data into meaningful outcomes.";

  const displayBio =
    site?.bio ||
    "I build intelligent automation, data and AI systems with a focus on solving practical problems.";



  return (
    <main className="min-h-screen overflow-x-hidden bg-[#050505] text-white">

      {/* ================================================================== */}
      {/* GLOBAL BACKGROUND                                                  */}
      {/* ================================================================== */}

      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#050505]">

        <div className="absolute left-[-15%] top-[-10%] h-[520px] w-[520px] rounded-full bg-cyan-400/[0.07] blur-[150px]" />

        <div className="absolute right-[-10%] top-[18%] h-[620px] w-[620px] rounded-full bg-violet-500/[0.07] blur-[170px]" />

        <div className="absolute bottom-[-20%] left-[30%] h-[500px] w-[500px] rounded-full bg-blue-500/5 blur-[150px]" />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        />
      </div>

      {/* ================================================================== */}
      {/* ================================================================== */}
      {/* ================================================================== */}
      {/* NAVIGATION                                                         */}
      {/* ================================================================== */}

      <HomeNavbar />

      {/* HERO                                                               */}
      {/* ================================================================== */}

      <section className="relative z-10 mx-auto flex min-h-[820px] max-w-7xl items-center px-5 pb-16 pt-28 sm:px-8 lg:min-h-screen lg:pb-20 lg:pt-32">

        <div className="grid w-full items-center gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-4">

          {/* ---------------------------------------------------------------- */}
          {/* HERO LEFT                                                       */}
          {/* ---------------------------------------------------------------- */}

          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="relative z-20"
          >

            <motion.div
              variants={fadeUp}
              className="mb-7 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/60 backdrop-blur"
            >

              <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-400" />

              Automation

              <span className="text-white/20">
                →
              </span>

              Data

              <span className="text-white/20">
                →
              </span>

              AI

            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="max-w-4xl text-[3.25rem] font-semibold leading-[0.92] tracking-[-0.055em] sm:text-6xl lg:text-[7.4rem]"
            >

              Building
              <br />

              <span className="bg-gradient-to-r from-white via-white to-white/40 bg-clip-text text-transparent">
                intelligent
              </span>

              <br />

              <span className="text-white/40">
                systems.
              </span>

            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-8 max-w-xl text-[15px] leading-7 text-white/55 sm:text-lg"
            >
              {displayTagline}
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="mt-4 max-w-xl text-sm leading-6 text-white/35"
            >
              {displayBio}
            </motion.p>

            {/* BUTTONS */}

            <motion.div
              variants={fadeUp}
              className="mt-9 flex flex-wrap gap-4"
            >

              <a
                href="#work"
                style={{ color: "#000000" }}
                className="group inline-flex items-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-semibold transition duration-300 hover:-translate-y-0.5 hover:scale-[1.02]"
              >
                View My Work

                <span
                  style={{ color: "#000000" }}
                  className="transition-transform group-hover:translate-x-1"
                >
                  →
                </span>
              </a>

              {site?.resume_url && (
                <a
                  href={site.resume_url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-6 py-3.5 text-sm font-medium text-white/80 backdrop-blur transition hover:bg-white/[0.08] hover:text-white"
                >
                  Download Resume
                </a>
              )}

            </motion.div>

            {/* STATS */}

            <motion.div
              variants={fadeUp}
              className="mt-12 grid max-w-lg grid-cols-3 border-y border-white/10 py-6 sm:mt-14"
            >

              <div>
                <div className="text-2xl font-semibold sm:text-3xl">
                  4+
                </div>

                <div className="mt-1 text-[11px] uppercase tracking-[0.18em] text-white/35">
                  Years Experience
                </div>
              </div>

              <div className="border-l border-white/10 pl-5">
                <div className="text-2xl font-semibold sm:text-3xl">
                  {projects.length}
                </div>

                <div className="mt-1 text-[11px] uppercase tracking-[0.18em] text-white/35">
                  Projects
                </div>
              </div>

              <div className="border-l border-white/10 pl-5">
                <div className="text-2xl font-semibold sm:text-3xl">
                  AI
                </div>

                <div className="mt-1 text-[11px] uppercase tracking-[0.18em] text-white/35">
                  Current Focus
                </div>
              </div>

            </motion.div>

          </motion.div>

          {/* ---------------------------------------------------------------- */}
          {/* HERO RIGHT / AVATAR                                             */}
          {/* ---------------------------------------------------------------- */}

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="relative flex min-h-[500px] items-center justify-center lg:min-h-[650px]"
          >

            {/* Orbit 1 */}

            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 35,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute h-[340px] w-[340px] rounded-full border border-white/[0.055] sm:h-[470px] sm:w-[470px] lg:h-[560px] lg:w-[560px]"
            />

            {/* Orbit 2 */}

            <motion.div
              animate={{
                rotate: -360,
              }}
              transition={{
                duration: 50,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute h-[270px] w-[270px] rounded-full border border-dashed border-white/[0.05] sm:h-[380px] sm:w-[380px] lg:h-[460px] lg:w-[460px]"
            />

            {/* Glow */}

            <div className="absolute h-[280px] w-[280px] rounded-full bg-cyan-400/[0.08] blur-[110px]" />

            {/* Floating Automation */}

            <motion.div
              animate={{
                y: [0, -12, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute left-0 top-[18%] z-20 hidden rounded-2xl border border-white/10 bg-black/50 px-4 py-3 backdrop-blur-xl sm:block"
            >

              <div className="text-[10px] uppercase tracking-[0.2em] text-white/30">
                Focus
              </div>

              <div className="mt-1 text-sm font-medium">
                Automation
              </div>

            </motion.div>

            {/* Floating Data */}

            <motion.div
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute right-0 top-[34%] z-20 hidden rounded-2xl border border-white/10 bg-black/50 px-4 py-3 backdrop-blur-xl sm:block"
            >

              <div className="text-[10px] uppercase tracking-[0.2em] text-white/30">
                Domain
              </div>

              <div className="mt-1 text-sm font-medium">
                Data Science
              </div>

            </motion.div>

            {/* Floating AI */}

            <motion.div
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute bottom-[15%] left-[5%] z-20 hidden rounded-2xl border border-white/10 bg-black/50 px-4 py-3 backdrop-blur-xl sm:block"
            >

              <div className="text-[10px] uppercase tracking-[0.2em] text-white/30">
                Building
              </div>

              <div className="mt-1 text-sm font-medium">
                AI Systems
              </div>

            </motion.div>

            {/* AVATAR */}

            <div className="group relative z-10 h-[420px] w-[315px] sm:h-[520px] sm:w-[390px] lg:h-[610px] lg:w-[470px]">

              <div className="absolute inset-[8%] rounded-[50%] bg-gradient-to-b from-cyan-400/[0.09] via-transparent to-violet-500/[0.08] blur-3xl" />

              <Image
                src="/images/hero-avatar.png"
                alt={displayName}
                fill
                priority
                className="object-contain drop-shadow-[0_35px_90px_rgba(0,0,0,0.75)] transition duration-700 group-hover:scale-[1.015]"
                sizes="(max-width: 768px) 320px, 470px"
              />

            </div>

            {/* Caption */}

            <div className="absolute bottom-3 right-0 hidden max-w-[220px] text-right lg:block">

              <div className="text-[10px] uppercase tracking-[0.2em] text-white/25">
                Currently
              </div>

              <div className="mt-2 text-sm leading-5 text-white/60">
                MSc Data Science &amp; AI
                <br />
                Dubai
              </div>

            </div>

          </motion.div>

        </div>
      </section>

      {/* ================================================================== */}
      {/* WORK                                                               */}
      {/* ================================================================== */}

      <section
        id="work"
        className="relative z-10 mx-auto max-w-7xl scroll-mt-24 px-5 py-28 sm:px-8"
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.15,
          }}
          variants={stagger}
        >
          <motion.div
            variants={fadeUp}
            className="mb-14"
          >
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-cyan-400/70">
              <span className="h-px w-8 bg-cyan-400/50" />
              Selected Work
            </div>

            <div className="mt-4 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <h2 className="max-w-3xl text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">
                Systems built
                <br />
                <span className="text-white/30">
                  to solve real problems.
                </span>
              </h2>

              <p className="max-w-sm text-sm leading-6 text-white/40">
                A selection of projects across automation, data science,
                machine learning and software engineering.
              </p>
            </div>
          </motion.div>

          {projects.length > 0 ? (
            (() => {
              const featuredProject =
                projects.find((project) => project.featured) ?? projects[0];

              const supportingProjects = projects
                .filter((project) => project.id !== featuredProject.id)
                .slice(0, 2);

              const featuredTechnologies = parseList(
                featuredProject.technologies
              );

              return (
                <div className="space-y-5">
                  {/* FEATURED PROJECT */}

                  <motion.article
                    variants={fadeUp}
                    className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.035] shadow-[0_30px_100px_rgba(0,0,0,0.25)] transition duration-500 hover:-translate-y-1 hover:border-white/[0.2] hover:bg-white/[0.045]"
                  >
                    <div className="relative min-h-[520px] overflow-hidden sm:min-h-[590px] lg:min-h-[610px]">
                      {featuredProject.image_url ? (
                        <Image
                          src={featuredProject.image_url}
                          alt={featuredProject.title}
                          fill
                          className="object-cover opacity-55 transition duration-1000 ease-out group-hover:scale-[1.035] group-hover:opacity-75"
                          sizes="(max-width: 1024px) 100vw, 1200px"
                          priority
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-cyan-400/[0.08] via-transparent to-violet-500/[0.08]">
                          <div className="text-[12rem] font-semibold tracking-[-0.12em] text-white/[0.045]">
                            01
                          </div>
                        </div>
                      )}

                      {/* Cinematic overlays */}

                      <div className="absolute inset-0 bg-gradient-to-r from-[#070707] via-[#070707]/55 to-transparent" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-[#070707]/15 to-transparent" />

                      {/* Project number */}

                      <div className="absolute right-6 top-6 text-6xl font-semibold tracking-[-0.08em] text-white/[0.08] sm:right-8 sm:top-8 sm:text-8xl">
                        01
                      </div>

                      {/* Featured label */}

                      <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-white/60 backdrop-blur-xl sm:left-7 sm:top-7">
                        <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.8)]" />
                        Featured Project
                      </div>

                      {/* Content */}

                      <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 lg:p-10">
                        <div className="max-w-3xl">
                          <div className="mb-4 text-[10px] uppercase tracking-[0.25em] text-cyan-300/65">
                            Case Study / 01
                          </div>

                          <h3 className="max-w-3xl text-3xl font-semibold tracking-[-0.045em] sm:text-5xl lg:text-6xl">
                            {featuredProject.title}
                          </h3>

                          <p className="mt-5 max-w-2xl text-sm leading-6 text-white/55 sm:text-base">
                            {featuredProject.description ||
                              "A technical project focused on solving a practical problem using modern engineering and data technologies."}
                          </p>

                          {featuredTechnologies.length > 0 && (
                            <div className="mt-6 flex flex-wrap gap-2">
                              {featuredTechnologies
                                .slice(0, 7)
                                .map((technology) => (
                                  <span
                                    key={technology}
                                    className="rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-[11px] text-white/60 backdrop-blur-md"
                                  >
                                    {technology}
                                  </span>
                                ))}
                            </div>
                          )}

                          <div className="mt-7 flex flex-wrap items-center gap-5 text-xs">
                            <Link
                              href={`/projects/${featuredProject.slug}`}
                              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-semibold text-black transition duration-300 hover:-translate-y-0.5 hover:bg-white/90"
                            >
                              View Case Study
                              <span className="transition-transform group-hover:translate-x-1">
                                →
                              </span>
                            </Link>

                            {featuredProject.github_url && (
                              <a
                                href={featuredProject.github_url}
                                target="_blank"
                                rel="noreferrer"
                                className="text-white/45 transition hover:text-white"
                              >
                                GitHub ↗
                              </a>
                            )}

                            {featuredProject.live_url && (
                              <a
                                href={featuredProject.live_url}
                                target="_blank"
                                rel="noreferrer"
                                className="text-white/45 transition hover:text-white"
                              >
                                Live Demo ↗
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.article>

                  {/* SUPPORTING PROJECTS */}

                  {supportingProjects.length > 0 && (
                    <div className="grid gap-5 md:grid-cols-2">
                      {supportingProjects.map((project, index) => {
                        const technologies = parseList(project.technologies);
                        const number = String(index + 2).padStart(2, "0");

                        return (
                          <motion.article
                            key={project.id}
                            variants={fadeUp}
                            className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.035] shadow-[0_20px_80px_rgba(0,0,0,0.18)] transition duration-500 hover:-translate-y-1 hover:border-white/[0.18] hover:bg-white/[0.05]"
                          >
                            <div className="relative aspect-[16/10] overflow-hidden">
                              {project.image_url ? (
                                <Image
                                  src={project.image_url}
                                  alt={project.title}
                                  fill
                                  className="object-cover opacity-55 transition duration-700 ease-out group-hover:scale-[1.045] group-hover:opacity-80"
                                  sizes="(max-width: 768px) 100vw, 50vw"
                                />
                              ) : (
                                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-white/[0.06] to-transparent">
                                  <div className="text-8xl font-semibold tracking-[-0.1em] text-white/[0.05]">
                                    {number}
                                  </div>
                                </div>
                              )}

                              <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent" />

                              <div className="absolute left-5 top-5 rounded-full border border-white/10 bg-black/40 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-white/55 backdrop-blur-xl">
                                Project {number}
                              </div>

                              <Link
                                href={`/projects/${project.slug}`}
                                className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/30 text-white/55 backdrop-blur-xl transition duration-300 hover:border-white/30 hover:bg-black/50 hover:text-white"
                                aria-label={`View ${project.title}`}
                              >
                                ↗
                              </Link>
                            </div>

                            <div className="p-6 sm:p-7">
                              <h3 className="text-xl font-semibold tracking-[-0.025em] sm:text-2xl">
                                {project.title}
                              </h3>

                              <p className="mt-3 max-w-xl text-sm leading-6 text-white/40">
                                {project.description ||
                                  "A technical project focused on solving a practical problem using modern engineering and data technologies."}
                              </p>

                              {technologies.length > 0 && (
                                <div className="mt-5 flex flex-wrap gap-2">
                                  {technologies.slice(0, 5).map((technology) => (
                                    <span
                                      key={technology}
                                      className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[11px] text-white/45"
                                    >
                                      {technology}
                                    </span>
                                  ))}
                                </div>
                              )}

                              <div className="mt-6 flex flex-wrap items-center gap-4 text-xs">
                                <Link
                                  href={`/projects/${project.slug}`}
                                  className="font-medium text-white transition hover:text-cyan-300"
                                >
                                  Case Study →
                                </Link>

                                {project.github_url && (
                                  <a
                                    href={project.github_url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-white/40 transition hover:text-white"
                                  >
                                    GitHub ↗
                                  </a>
                                )}

                                {project.live_url && (
                                  <a
                                    href={project.live_url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-white/40 transition hover:text-white"
                                  >
                                    Live Demo ↗
                                  </a>
                                )}
                              </div>
                            </div>
                          </motion.article>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })()
          ) : (
            <motion.div
              variants={fadeUp}
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-12 text-center text-white/40"
            >
              Projects will appear here once they are published from the
              admin dashboard.
            </motion.div>
          )}
        </motion.div>
      </section>

      {/* ================================================================== */}
      {/* ABOUT                                                              */}
      {/* ================================================================== */}

      <section
        id="about"
        className="relative z-10 border-y border-white/10 bg-white/[0.015]"
      >

        <div className="mx-auto max-w-7xl scroll-mt-24 px-5 py-28 sm:px-8">

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.2,
            }}
            variants={stagger}
            className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr]"
          >

            <motion.div variants={fadeUp}>

              <div className="text-xs uppercase tracking-[0.25em] text-cyan-400/70">
                About
              </div>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
                From automation
                <br />

                to intelligence.
              </h2>

            </motion.div>

            <motion.div
              variants={fadeUp}
              className="max-w-3xl"
            >

              <p className="text-xl leading-9 text-white/70 sm:text-2xl">
                I started my career building automation systems and
                enterprise workflows. Today, I&apos;m expanding that
                foundation into data science and AI.
              </p>

              <p className="mt-7 text-base leading-8 text-white/40">
                My goal is to combine software engineering, automation,
                analytics and machine learning to build systems that are
                useful beyond a prototype — systems that can process data,
                identify patterns and support real-world decisions.
              </p>

              <div className="mt-10 grid gap-6 sm:grid-cols-3">

                <div className="border-l border-white/10 pl-5">

                  <div className="text-sm font-medium">
                    Automation
                  </div>

                  <div className="mt-2 text-xs leading-5 text-white/35">
                    Enterprise workflows and intelligent process automation.
                  </div>

                </div>

                <div className="border-l border-white/10 pl-5">

                  <div className="text-sm font-medium">
                    Data
                  </div>

                  <div className="mt-2 text-xs leading-5 text-white/35">
                    Data pipelines, analysis, statistical thinking and
                    applied analytics.
                  </div>

                </div>

                <div className="border-l border-white/10 pl-5">

                  <div className="text-sm font-medium">
                    AI
                  </div>

                  <div className="mt-2 text-xs leading-5 text-white/35">
                    Machine learning and intelligent systems for practical
                    problems.
                  </div>

                </div>

              </div>

            </motion.div>

          </motion.div>

        </div>

      </section>

      {/* ================================================================== */}
      {/* EXPERIENCE                                                         */}
      {/* ================================================================== */}

      <section
        id="experience"
        className="relative z-10 mx-auto max-w-7xl scroll-mt-24 px-5 py-28 sm:px-8"
      >

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.15,
          }}
          variants={stagger}
        >

          <motion.div variants={fadeUp}>

            <div className="text-xs uppercase tracking-[0.25em] text-cyan-400/70">
              Experience
            </div>

            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
              Where I&apos;ve
              <br />

              <span className="text-white/35">
                built experience.
              </span>
            </h2>

          </motion.div>

          <div className="mt-16">

            {experience.length > 0 ? (

              experience.map((item) => (

                <motion.div
                  key={item.id}
                  variants={fadeUp}
                  className="group grid gap-6 border-t border-white/10 py-9 md:grid-cols-[180px_1fr_220px]"
                >

                  {/* DATE */}

                  <div className="text-xs uppercase tracking-[0.15em] text-white/30">

                    {formatDate(item.start_date)}

                    {item.start_date && " — "}

                    {item.end_date
                      ? formatDate(item.end_date)
                      : "Present"}

                  </div>

                  {/* DETAILS */}

                  <div>

                    <h3 className="text-xl font-medium">
                      {item.role}
                    </h3>

                    <div className="mt-1 text-sm text-white/45">
                      {item.company}
                    </div>

                    {item.description && (

                      <p className="mt-5 max-w-2xl text-sm leading-7 text-white/40">
                        {item.description}
                      </p>

                    )}

                    {parseList(item.technologies).length > 0 && (

                      <div className="mt-5 flex flex-wrap gap-2">

                        {parseList(item.technologies)
                          .slice(0, 8)
                          .map((technology) => (

                            <span
                              key={technology}
                              className="rounded-full border border-white/10 px-3 py-1 text-[10px] text-white/35"
                            >
                              {technology}
                            </span>

                          ))}

                      </div>

                    )}

                  </div>

                  {/* LOCATION */}

                  <div className="text-xs text-white/25 md:text-right">
                    {item.location || "—"}
                  </div>

                </motion.div>

              ))

            ) : (

              <motion.div
                variants={fadeUp}
                className="border-t border-white/10 py-10 text-sm text-white/40"
              >
                Experience information will appear here.
              </motion.div>

            )}

          </div>

        </motion.div>

      </section>

      {/* ================================================================== */}
      {/* EDUCATION                                                          */}
      {/* ================================================================== */}

      <section className="relative z-10 border-y border-white/10 bg-white/[0.015]">

        <div className="mx-auto max-w-7xl px-5 py-28 sm:px-8">

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.2,
            }}
            variants={stagger}
          >

            <motion.div variants={fadeUp}>

              <div className="text-xs uppercase tracking-[0.25em] text-cyan-400/70">
                Education
              </div>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
                Learning never
                <br />

                <span className="text-white/35">
                  really stops.
                </span>
              </h2>

            </motion.div>

            {education.length > 0 ? (

              <div className="mt-16 grid gap-5 md:grid-cols-2">

                {education.map((item) => (

                  <motion.div
                    key={item.id}
                    variants={fadeUp}
                    className="rounded-[28px] border border-white/10 bg-white/[0.025] p-7 transition hover:bg-white/[0.045]"
                  >

                    <div className="flex items-start justify-between gap-5">

                      <div>

                        <h3 className="text-xl font-medium">
                          {item.degree}
                        </h3>

                        {item.field && (

                          <div className="mt-2 text-sm text-white/45">
                            {item.field}
                          </div>

                        )}

                      </div>

                      <div className="text-right text-xs text-white/30">

                        {formatDate(item.start_date)}

                        {item.start_date && " — "}

                        {item.end_date
                          ? formatDate(item.end_date)
                          : "Present"}

                      </div>

                    </div>

                    <div className="mt-8 text-sm text-white/55">
                      {item.institution}
                    </div>

                    {item.location && (

                      <div className="mt-2 text-xs text-white/30">
                        {item.location}
                      </div>

                    )}

                    {item.description && (

                      <p className="mt-6 text-sm leading-6 text-white/35">
                        {item.description}
                      </p>

                    )}

                  </motion.div>

                ))}

              </div>

            ) : (

              <motion.div
                variants={fadeUp}
                className="mt-16 rounded-[28px] border border-white/10 bg-white/[0.025] p-10 text-sm text-white/40"
              >
                Education information will appear here.
              </motion.div>

            )}

          </motion.div>

        </div>

      </section>

      {/* ================================================================== */}
      {/* SKILLS                                                             */}
      {/* ================================================================== */}

      <HomeSkills skills={skills} />

      {/* ================================================================== */}
      {/* BIG QUOTE                                                          */}
      {/* ================================================================== */}

      <section className="relative z-10 border-y border-white/10 bg-white/[0.015]">

        <div className="mx-auto max-w-7xl px-5 py-32 sm:px-8">

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.3,
            }}
            variants={fadeUp}
            className="max-w-5xl"
          >

            <div className="text-5xl leading-none text-white/15">
              “
            </div>

            <blockquote className="mt-4 text-3xl font-medium leading-tight tracking-[-0.03em] text-white/80 sm:text-5xl lg:text-6xl">
              I&apos;m interested in building systems that don&apos;t just
              automate work — they make better use of information.
            </blockquote>

            <div className="mt-8 text-xs uppercase tracking-[0.25em] text-white/25">
              Automation × Data × AI
            </div>

          </motion.div>

        </div>

      </section>

      {/* ================================================================== */}
      {/* CONTACT                                                            */}
      {/* ================================================================== */}

      <HomeContact site={site} />

      {/* ================================================================== */}
      {/* ================================================================== */}
      {/* FOOTER                                                             */}
      {/* ================================================================== */}

      <HomeFooter site={site} />

    </main>
  );
}