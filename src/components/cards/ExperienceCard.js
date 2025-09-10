import React from "react";
import { Calendar, MapPin, ChevronRight } from "lucide-react";

const ExperienceCard = ({ experience }) => (
  <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition flex">
    {/* Left column: logo block */}
    <div className="w-32 bg-gray-50 flex items-center justify-center border-r border-gray-200 rounded-l-xl">
      {experience.logo ? (
        <img
          src={experience.logo}
          alt={experience.company}
          className="w-20 h-20 object-contain"
        />
      ) : (
        <span className="text-gray-400 text-sm">No Logo</span>
      )}
    </div>

    {/* Right column: details */}
    <div className="flex-1 p-6 flex flex-col">
      {/* Title + company */}
      <div className="mb-2">
        <h3 className="text-lg font-semibold text-gray-900">{experience.title}</h3>
        <p className="text-sm text-gray-600">{experience.company}</p>
      </div>

      {/* Dates + location */}
      <div className="flex flex-wrap gap-6 text-sm text-gray-500 mb-4">
        <span className="flex items-center gap-1">
          <Calendar className="w-4 h-4" /> {experience.period}
        </span>
        <span className="flex items-center gap-1">
          <MapPin className="w-4 h-4" /> {experience.location}
        </span>
      </div>

      {/* Highlights */}
      <ul className="space-y-2 mb-4 text-sm text-gray-700">
        {experience.highlights.map((point, idx) => (
          <li key={idx} className="flex items-start">
            <ChevronRight className="w-4 h-4 text-gray-400 mr-2 mt-0.5 shrink-0" />
            <span>{point}</span>
          </li>
        ))}
      </ul>

      {/* Tech stack badges */}
      <div className="flex flex-wrap gap-2 mt-auto">
        {experience.tech.map((tech, idx) => (
          <span
            key={idx}
            className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  </div>
);

export default ExperienceCard;
