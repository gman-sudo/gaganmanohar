"use client";

import { motion, type Variants } from "framer-motion";

interface Skill {
  id: number;
  name: string;
  category?: string | null;
  level?: string | null;
}

interface HomeSkillsProps {
  skills: Skill[];
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

export default function HomeSkills({ skills }: HomeSkillsProps) {
  const skillCategories = Array.from(
    new Set(
      skills
        .map((skill) => skill.category)
        .filter(
          (category): category is string => Boolean(category)
        )
    )
  );

  return (
    <section
      id="skills"
      className="relative z-10 mx-auto max-w-7xl scroll-mt-24 px-5 py-28 sm:px-8"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.2,
        }}
        variants={stagger}
      >
        {/* Header */}
        <motion.div variants={fadeUp}>
          <div className="text-xs uppercase tracking-[0.25em] text-cyan-400/70">
            Skills &amp; Tools
          </div>

          <h2 className="mt-5 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
            The tools behind
            <br />

            <span className="text-white/35">
              the systems.
            </span>
          </h2>

          <p className="mt-6 max-w-2xl text-sm leading-7 text-white/40 sm:text-base">
            A combination of enterprise automation experience,
            software engineering, data analysis and AI-focused
            development.
          </p>
        </motion.div>

        {/* Skills */}
        {skillCategories.length > 0 ? (
          <div className="mt-16 grid gap-5 md:grid-cols-2">
            {skillCategories.map((category) => {
              const categorySkills = skills.filter(
                (skill) => skill.category === category
              );

              return (
                <motion.div
                  key={category}
                  variants={fadeUp}
                  className="group rounded-[28px] border border-white/10 bg-white/[0.025] p-7 transition duration-500 hover:border-white/[0.18] hover:bg-white/[0.045] sm:p-8"
                >
                  <div className="flex items-center justify-between">
                    <div className="text-xs uppercase tracking-[0.2em] text-white/30">
                      {category}
                    </div>

                    <div className="h-1.5 w-1.5 rounded-full bg-cyan-400/50 transition duration-300 group-hover:bg-cyan-400 group-hover:shadow-[0_0_12px_rgba(34,211,238,0.8)]" />
                  </div>

                  <div className="mt-7 flex flex-wrap gap-2.5">
                    {categorySkills.map((skill) => (
                      <span
                        key={skill.id}
                        className="rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 text-sm text-white/65 transition duration-300 hover:border-white/25 hover:bg-white/[0.08] hover:text-white"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <motion.div
            variants={fadeUp}
            className="mt-16 rounded-[28px] border border-white/10 bg-white/[0.025] p-10 text-sm text-white/40"
          >
            Skills will appear here once they are added from the
            admin dashboard.
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}