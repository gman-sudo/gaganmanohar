import {
  getEducation,
  getExperience,
  getProjects,
  getSiteSettings,
  getSkills,
} from "@/lib/api";

import HomeExperience from "@/components/home/HomeExperience";
import HomeSkills from "@/components/home/HomeSkills";


export const dynamic = "force-dynamic";

export default async function Home() {
  const [site, projects, experience, education, skills] = await Promise.all([
    getSiteSettings(),
    getProjects(),
    getExperience(),
    getEducation(),
    getSkills(),
  ]);

  return (
    
      <HomeExperience
        site={site}
        projects={projects}
        experience={experience}
        education={education}
        skills={skills}
      />
    
  );
}