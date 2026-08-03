import React, { useMemo, useState } from "react";
import { Calendar, MapPin } from "lucide-react";

function accentFromGradientToken(token) {
  if (!token) return "rgba(0,0,0,0.22)";
  if (token.includes("amber-")) return "rgba(245, 158, 11, 0.55)";
  if (token.includes("yellow-")) return "rgba(234, 179, 8, 0.55)";
  return "rgba(0,0,0,0.22)";
}

function getExperienceStatus(experience) {
  if (experience.incoming) return "incoming";
  if (experience.current) return "current";
  return null;
}

const STATUS_META = {
  current: {
    label: "Now",
    shellClass: "experience-shell-current",
    logoClass: "experience-logo-current",
    badgeClass: "experience-badge-current",
    accentBar: "linear-gradient(180deg, rgba(16, 185, 129, 0.85), rgba(52, 211, 153, 0.45))",
    marker: "rgba(16, 185, 129, 0.85)",
  },
  incoming: {
    label: "Up next",
    shellClass: "experience-shell-incoming",
    logoClass: "experience-logo-incoming",
    badgeClass: "experience-badge-incoming",
    accentBar: "linear-gradient(180deg, rgba(15, 91, 255, 0.55), rgba(15, 91, 255, 0.18))",
    marker: "rgba(15, 91, 255, 0.55)",
  },
};

const StatusBadge = ({ status }) => {
  const config = STATUS_META[status];
  if (!config) return null;

  return (
    <span
      className={`text-[10px] sm:text-xs uppercase tracking-wide px-1.5 py-0.5 rounded ${config.badgeClass}`}
      style={{
        fontFamily: "var(--font-geist-sans)",
        fontWeight: 600,
        letterSpacing: "0.08em",
      }}
    >
      {config.label}
    </span>
  );
};

const TimelineMarker = ({ status, accent }) => {
  if (status === "current") {
    return (
      <div
        className="experience-marker-current w-2.5 h-2.5 rounded-full"
        style={{ background: STATUS_META.current.marker }}
        aria-hidden="true"
      />
    );
  }

  if (status === "incoming") {
    return (
      <div
        className="w-2.5 h-2.5 rounded-full border-2 border-dashed"
        style={{
          borderColor: "rgba(15, 91, 255, 0.45)",
          background: "var(--surface)",
          boxShadow: "0 0 0 6px rgba(15, 91, 255, 0.06)",
        }}
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      className="w-2.5 h-2.5 rounded-full"
      style={{ background: accent, boxShadow: "0 0 0 6px var(--control-bg)" }}
      aria-hidden="true"
    />
  );
};

const ExperienceCard = ({ experience }) => {
  const [expanded, setExpanded] = useState(false);
  const accent = useMemo(() => accentFromGradientToken(experience.color), [experience.color]);
  const status = getExperienceStatus(experience);
  const statusConfig = status ? STATUS_META[status] : null;

  const highlights = Array.isArray(experience.highlights) ? experience.highlights : [];
  const visibleHighlights = expanded ? highlights : highlights.slice(0, 2);
  const canExpand = highlights.length > 2;

  const tech = Array.isArray(experience.tech) ? experience.tech : [];

  const cardBody = (
    <>
      {experience.logo && (
        <div
          className={`hidden sm:flex items-center justify-center w-12 h-12 rounded-xl border shrink-0 ${
            statusConfig ? statusConfig.logoClass : ""
          }`}
          style={
            statusConfig
              ? undefined
              : { borderColor: "var(--border)", background: "var(--control-bg)" }
          }
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
            <div className="flex items-center gap-2 justify-end flex-wrap">
              <Calendar className="w-4 h-4 shrink-0" />
              <span>{experience.period}</span>
              {status && <StatusBadge status={status} />}
            </div>
            {experience.location && (
              <div className="mt-1 flex items-center gap-2 justify-end italic">
                <MapPin className="w-4 h-4 shrink-0" />
                <span>{experience.location}</span>
              </div>
            )}
          </div>
        </div>

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
              style={{
                fontFamily: "var(--font-geist-sans)",
                color: "var(--muted-foreground)",
                textUnderlineOffset: 3,
              }}
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
                    borderBottom: "1px solid var(--hairline)",
                  }}
                >
                  {t}
                </span>
              ))}
              {tech.length > 4 && (
                <span
                  className="text-xs"
                  style={{ fontFamily: "var(--font-geist-sans)", color: "var(--muted-foreground)" }}
                >
                  +{tech.length - 4}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );

  return (
    <article className={`group ${status ? "py-4 sm:py-5" : "py-3 sm:py-4"}`}>
      <div className="flex items-start gap-4">
        <div className="pt-1 shrink-0">
          <TimelineMarker status={status} accent={accent} />
        </div>

        {statusConfig ? (
          <div
            className={`relative min-w-0 flex-1 flex items-start gap-4 rounded-2xl px-3 py-3 sm:px-4 sm:py-4 overflow-hidden ${statusConfig.shellClass}`}
          >
            <div
              className="absolute left-0 top-3 bottom-3 w-1 rounded-full"
              style={{ background: statusConfig.accentBar }}
              aria-hidden="true"
            />
            <div className="flex items-start gap-4 min-w-0 flex-1 pl-2">{cardBody}</div>
          </div>
        ) : (
          <div className="min-w-0 flex-1 flex items-start gap-4">{cardBody}</div>
        )}
      </div>
    </article>
  );
};

export default ExperienceCard;
