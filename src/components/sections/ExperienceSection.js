import React from "react";
import { experiences } from "../../data/experiences";
import ExperienceCard from "../cards/ExperienceCard";

const ExperienceSection = () => (
  <section id="experience" className="py-8 px-4 sm:px-6 bg-[var(--almost-black)]">
    <div className="max-w-4xl mx-auto">
      <h2 className="custom-font text-xl sm:text-2xl font-bold mb-5 text-center text-[var(--off-white)]">
        Work Experience
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {experiences.map((exp, index) => (
          <ExperienceCard key={index} experience={exp} />
        ))}
      </div>
    </div>
  </section>
);

export default ExperienceSection;
