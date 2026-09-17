"use client";

import { motion, type Variants } from "framer-motion";

interface Site {
  email?: string | null;
  linkedin_url?: string | null;
  github_url?: string | null;
}

interface HomeContactProps {
  site: Site | null;
}

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

const stagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function HomeContact({
  site,
}: HomeContactProps) {
  return (
    <section
      id="contact"
      className="relative z-10 mx-auto max-w-7xl scroll-mt-24 px-5 py-32 sm:px-8"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.25,
        }}
        variants={stagger}
        className="relative overflow-hidden rounded-[35px] border border-white/10 bg-gradient-to-br from-white/[0.055] to-white/[0.02] p-8 shadow-[0_30px_100px_rgba(0,0,0,0.25)] sm:p-12 lg:p-16"
      >
        {/* Background glow */}

        <div className="pointer-events-none absolute right-[-100px] top-[-100px] h-[350px] w-[350px] rounded-full bg-cyan-400/10 blur-[100px]" />

        <div className="pointer-events-none absolute bottom-[-160px] left-[-100px] h-[300px] w-[300px] rounded-full bg-violet-500/[0.06] blur-[100px]" />

        <div className="relative">
          {/* Label */}

          <motion.div variants={fadeUp}>
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-cyan-400/70">
              <span className="h-px w-8 bg-cyan-400/50" />
              Contact
            </div>

            <h2 className="mt-5 max-w-3xl text-5xl font-semibold tracking-[-0.05em] sm:text-7xl">
              Let&apos;s build
              <br />
              <span className="text-white/35">
                something meaningful.
              </span>
            </h2>
          </motion.div>

          {/* Description */}

          <motion.p
            variants={fadeUp}
            className="mt-7 max-w-2xl text-base leading-7 text-white/40 sm:text-lg"
          >
            Open to opportunities and conversations around data science,
            artificial intelligence, machine learning, intelligent automation
            and software engineering.
          </motion.p>

          {/* Focus */}

          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-wrap gap-2"
          >
            {[
              "Data Science",
              "AI / ML",
              "Intelligent Automation",
              "Software Engineering",
            ].map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-2 text-xs text-white/45"
              >
                {item}
              </span>
            ))}
          </motion.div>

          {/* Actions */}

          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-wrap gap-3"
          >
            {site?.email && (
              <a
                href={`mailto:${site.email}`}
                style={{ color: "#000000" }}
                className="group inline-flex items-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-semibold transition duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:bg-white/90"
              >
                Email Me
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            )}

            {site?.linkedin_url && (
              <a
                href={site.linkedin_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-6 py-3.5 text-sm text-white/60 transition duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.05] hover:text-white"
              >
                LinkedIn
                <span className="text-white/30">↗</span>
              </a>
            )}

            {site?.github_url && (
              <a
                href={site.github_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-6 py-3.5 text-sm text-white/60 transition duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.05] hover:text-white"
              >
                GitHub
                <span className="text-white/30">↗</span>
              </a>
            )}
          </motion.div>

          {/* Bottom line */}

          <motion.div
            variants={fadeUp}
            className="mt-14 border-t border-white/10 pt-7"
          >
            <div className="flex flex-col gap-3 text-xs text-white/25 sm:flex-row sm:items-center sm:justify-between">
              <span>
                Building at the intersection of automation, data and AI.
              </span>

              <span className="font-mono uppercase tracking-[0.18em]">
                Available for opportunities
              </span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
