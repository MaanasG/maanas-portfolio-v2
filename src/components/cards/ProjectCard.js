import React from "react";
import { ExternalLink, Github } from "lucide-react";

const ProjectCard = ({ project }) => {
  const hasMedia = Boolean(project.video || project.image);

  return (
    <article
      className="group py-4 sm:py-5"
      style={{
        borderColor: "var(--border)",
      }}
    >
      <div className="flex items-start gap-4">
        {hasMedia && (
          <div className="hidden sm:block w-[96px] shrink-0">
            <div
              className="overflow-hidden rounded-xl border"
              style={{ borderColor: "var(--border)", background: "rgba(0,0,0,0.03)" }}
            >
              {project.video ? (
                <video
                  src={project.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-[72px] object-cover"
                />
              ) : (
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-[72px] object-cover"
                  loading="lazy"
                />
              )}
            </div>
          </div>
        )}

        <div className="min-w-0 flex-1">
          <div
            className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1.5"
            style={{ fontFamily: "var(--font-geist-sans)" }}
          >
            <h3 className="section-heading text-base sm:text-lg font-semibold leading-snug">
              {project.title}
            </h3>
            <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>
              {project.period}
            </div>
          </div>

          {project.description && (
            <p className="mt-2 text-[15px] leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
              {project.description}
            </p>
          )}

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
            {project.impact && (
              <div className="text-sm" style={{ fontFamily: "var(--font-geist-sans)", color: "var(--muted-foreground)" }}>
                <span style={{ color: "var(--foreground)" }}>Impact</span> {project.impact}
              </div>
            )}

            {Array.isArray(project.tech) && project.tech.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {project.tech.slice(0, 4).map((tech, idx) => (
                  <span
                    key={idx}
                    className="text-xs"
                    style={{
                      fontFamily: "var(--font-geist-sans)",
                      color: "var(--muted-foreground)",
                      borderBottom: "1px solid rgba(0,0,0,0.10)",
                    }}
                  >
                    {tech}
                  </span>
                ))}
                {project.tech.length > 4 && (
                  <span
                    className="text-xs"
                    style={{ fontFamily: "var(--font-geist-sans)", color: "var(--muted-foreground)" }}
                  >
                    +{project.tech.length - 4}
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="mt-3 flex gap-4 items-center" style={{ fontFamily: "var(--font-geist-sans)" }}>
            {project.github && project.github !== "#" && (
              <a href={project.github} className="inline-flex items-center gap-2 text-sm">
                <Github className="w-4 h-4" /> Code
              </a>
            )}
            {project.demo && project.demo !== "#" && (
              <a href={project.demo} className="inline-flex items-center gap-2 text-sm">
                <ExternalLink className="w-4 h-4" /> Live
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
