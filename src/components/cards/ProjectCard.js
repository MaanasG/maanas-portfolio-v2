import React from "react";
import { ExternalLink, Github } from "lucide-react";

const ProjectCard = ({ project }) => (
  <article className="bg-gray-900/40 border border-gray-800/60 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col h-full">
    <div className="relative bg-gray-900/30 aspect-video">
      {project.video ? (
        <video
          src={project.video}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />
      ) : project.image ? (
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      ) : (
        <div className="w-full h-full bg-gray-800/60 flex items-center justify-center">
          <div className="w-12 h-12 bg-gray-800 rounded-full blur-sm" />
        </div>
      )}
    </div>

    <div className="p-3 flex flex-col flex-1">
      <h3 className="text-base font-bold text-[var(--off-white)] leading-snug line-clamp-2">{project.title}</h3>
      <p className="text-gray-300 text-xs mt-1">{project.period}</p>

      <div className="flex flex-wrap gap-1 mt-3">
        {project.tech.map((tech, idx) => (
          <span
            key={idx}
            className="px-2 py-0.5 bg-amber-500/10 text-amber-200 rounded text-[10px] border border-amber-500/20"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="flex gap-3 mt-4 pt-2 border-t border-gray-800/60">
        {project.github && project.github !== "#" && (
          <a
            href={project.github}
            className="flex items-center gap-1.5 text-gray-400 hover:text-[var(--off-white)] transition-colors text-xs"
          >
            <Github className="w-4 h-4" /> Code
          </a>
        )}
        {project.demo && project.demo !== "#" && (
          <a
            href={project.demo}
            className="flex items-center gap-1.5 text-amber-400 hover:text-amber-500 transition-colors text-xs"
          >
            <ExternalLink className="w-4 h-4" /> Demo
          </a>
        )}
      </div>
    </div>
  </article>
);

export default ProjectCard;
