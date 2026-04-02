import React from "react";
import ProjectCard from "../cards/ProjectCard";

const ProjectsSection = ({ projects: projectsList }) => (
  <section id="projects" className="py-8 px-4 sm:px-6 bg-[var(--almost-black)]">
    <div className="max-w-4xl mx-auto">
      <h2 className="custom-font text-xl sm:text-2xl font-bold mb-5 text-center text-[var(--off-white)]">
        Featured <span className="text-amber-500">Projects</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {projectsList.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </div>
  </section>
);

export default ProjectsSection;
