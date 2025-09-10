import React from 'react';
import { projects } from '../../data/projects';
import ProjectCard from '../cards/ProjectCard';
import { ExternalLink, Download, Github } from 'lucide-react';


// Projects Section Component
const ProjectsSection = ({ projects }) => (
  <section id="projects" className="py-24 px-6 bg-white">
    <div className="max-w-6xl mx-auto">
      <h2 className="custom-font text-4xl font-bold mb-16 text-center text-gray-900">
        Featured <span className="text-cyan-600">Projects</span>
      </h2>

      <div className="space-y-12">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </div>
  </section>
);

export default ProjectsSection;