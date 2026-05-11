import React from "react";
import ProjectCard from "../cards/ProjectCard";

const ProjectsSection = ({ projects: projectsList }) => (
  <section id="projects" className="px-4 sm:px-6 py-7 sm:py-8">
    <div className="reading-container">
      <div className="section-title-block mb-4">
        <div className="kicker mb-2">Selected work</div>
        <h2 className="section-heading section-heading-masthead text-2xl sm:text-3xl">
          Projects
        </h2>
      </div>

      <div
        className="divide-y"
        style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}
      >
        {projectsList.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </div>
  </section>
);

export default ProjectsSection;
