import React from 'react';
import { ExternalLink, Github } from 'lucide-react';

const ProjectCard = ({ project }) => (
  <div className="bg-white border border-gray-200 rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
    <div className="grid md:grid-cols-2">
      {/* Left: Media Preview */}
      <div className="relative bg-gray-100">
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
          <div className="w-full h-full bg-gray-200 animate-pulse flex items-center justify-center">
            <div className="w-16 h-16 bg-gray-300 rounded-full blur-sm"></div>
          </div>
        )}
      </div>

      {/* Right: Content */}
      <div className="p-8 flex flex-col justify-between">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{project.title}</h3>
          <p className="text-gray-500 text-sm mb-4">{project.period}</p>
          <p className="text-gray-700 leading-relaxed mb-6">{project.description}</p>

          <div className="flex items-center gap-4 mb-6">
            <div className="text-xl font-semibold text-cyan-600">{project.impact}</div>
            <div className="h-5 w-px bg-gray-300"></div>
            <span className="text-sm text-gray-500">Impact Metric</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm border border-gray-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="flex gap-4 mt-6">
          {project.github && (
            <a href={project.github} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
              <Github className="w-5 h-5" /> Code
            </a>
          )}
          {project.demo && (
            <a href={project.demo} className="flex items-center gap-2 text-cyan-600 hover:text-cyan-800 transition-colors">
              <ExternalLink className="w-5 h-5" /> Demo
            </a>
          )}
        </div>
      </div>
    </div>
  </div>
);

export default ProjectCard;
