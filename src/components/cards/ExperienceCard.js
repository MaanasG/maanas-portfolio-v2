import React from "react";
import { Calendar, MapPin } from "lucide-react";

const ExperienceCard = ({ experience }) => (
  <div className="bg-gray-900/40 rounded-lg border border-gray-800/60 shadow-sm hover:shadow-md transition flex flex-col h-full">
    <div className="h-20 bg-gray-900/30 flex items-center justify-center border-b border-gray-800/60 rounded-t-lg">
      {experience.logo ? (
        <img
          src={experience.logo}
          alt={experience.company}
          className="max-h-14 max-w-[120px] w-auto h-auto object-contain"
        />
      ) : (
        <span className="text-gray-400 text-xs">No Logo</span>
      )}
    </div>

    <div className="p-3 flex flex-col flex-1">
      <h3 className="text-sm font-semibold text-[var(--off-white)] leading-snug line-clamp-2">
        {experience.title}
      </h3>
      <p className="text-xs text-gray-300 mt-1">{experience.company}</p>

      <div className="mt-3 space-y-1.5 text-[11px] text-gray-400">
        <span className="flex items-center gap-1">
          <Calendar className="w-3 h-3 shrink-0" /> {experience.period}
        </span>
        <span className="flex items-center gap-1">
          <MapPin className="w-3 h-3 shrink-0" /> {experience.location}
        </span>
      </div>

      <div className="flex flex-wrap gap-1 mt-3 mt-auto pt-2">
        {experience.tech.map((tech, idx) => (
          <span
            key={idx}
            className="bg-amber-500/10 text-amber-200 border border-amber-500/20 px-1.5 py-0.5 rounded text-[10px]"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  </div>
);

export default ExperienceCard;
