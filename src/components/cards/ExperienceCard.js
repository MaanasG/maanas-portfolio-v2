import React, { useMemo, useState } from "react";
import { Calendar, MapPin } from "lucide-react";

function accentFromGradientToken(token) {
  if (!token) return "rgba(0,0,0,0.22)";
  if (token.includes("amber-")) return "rgba(245, 158, 11, 0.55)";
  if (token.includes("yellow-")) return "rgba(234, 179, 8, 0.55)";
  return "rgba(0,0,0,0.22)";
}

const ExperienceCard = ({ experience }) => {
  const [expanded, setExpanded] = useState(false);
  const accent = useMemo(() => accentFromGradientToken(experience.color), [experience.color]);

  const highlights = Array.isArray(experience.highlights) ? experience.highlights : [];
  const visibleHighlights = expanded ? highlights : highlights.slice(0, 2);
  const canExpand = highlights.length > 2;

  const tech = Array.isArray(experience.tech) ? experience.tech : [];

  return (
    <article className="group py-4 sm:py-5">
      <div className="flex items-start gap-4">
        {/* timeline marker */}
        <div className="pt-1">
          <div
            className="w-2.5 h-2.5 rounded-full"
            style={{ background: accent, boxShadow: "0 0 0 6px rgba(0,0,0,0.03)" }}
            aria-hidden="true"
          />
        </div>

        {experience.logo && (
          <div
            className="hidden sm:flex items-center justify-center w-12 h-12 rounded-xl border shrink-0"
            style={{ borderColor: "var(--border)", background: "rgba(0,0,0,0.03)" }}
          >
            <img
              src={experience.logo}
              alt={experience.company}
              className="max-h-8 max-w-[40px] w-auto h-auto object-contain"
            />
          </div>
        )}

        <div className="min-w-0 flex-1">
          <div
            className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1.5"
            style={{ fontFamily: "var(--font-geist-sans)" }}
          >
            <div className="min-w-0">
              <h3 className="section-heading text-base sm:text-lg font-semibold leading-snug">
                {experience.title}
              </h3>
              <div className="text-sm" style={{ color: "var(--muted-foreground)" }}>
                {experience.company}
              </div>
            </div>

            <div
              className="text-xs sm:text-sm flex flex-col items-end text-right"
              style={{ color: "var(--muted-foreground)" }}
            >
              <div className="flex items-center gap-2 justify-end">
                <Calendar className="w-4 h-4 shrink-0" />
                <span>{experience.period}</span>
              </div>
              {experience.location && (
                <div className="mt-1 flex items-center gap-2 justify-end italic">
                  <MapPin className="w-4 h-4 shrink-0" />
                  <span>{experience.location}</span>
                </div>
              )}
            </div>
          </div>

          {/* highlights (compact, expandable) */}
          {highlights.length > 0 && (
            <ul className="mt-2 space-y-1.5 text-[15px] leading-relaxed">
              {visibleHighlights.map((h, idx) => (
                <li key={idx} style={{ color: "var(--muted-foreground)" }}>
                  {h}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
            {canExpand && (
              <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                className="text-sm underline"
                style={{ fontFamily: "var(--font-geist-sans)", color: "var(--muted-foreground)", textUnderlineOffset: 3 }}
              >
                {expanded ? "Show less" : `Show ${highlights.length - 2} more`}
              </button>
            )}

            {tech.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tech.slice(0, 4).map((t, idx) => (
                  <span
                    key={idx}
                    className="text-xs"
                    style={{
                      fontFamily: "var(--font-geist-sans)",
                      color: "var(--muted-foreground)",
                      borderBottom: "1px solid rgba(0,0,0,0.10)",
                    }}
                  >
                    {t}
                  </span>
                ))}
                {tech.length > 4 && (
                  <span className="text-xs" style={{ fontFamily: "var(--font-geist-sans)", color: "var(--muted-foreground)" }}>
                    +{tech.length - 4}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default ExperienceCard;
