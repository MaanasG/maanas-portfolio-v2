import React from "react";
import { experiences } from "../../data/experiences";
import ExperienceCard from "../cards/ExperienceCard";

const ExperienceSection = () => (
  <section id="experience" className="py-24 px-6 bg-gray-50">
    <div className="max-w-4xl mx-auto">
      <h2 className="custom-font text-3xl font-bold mb-12 text-center text-gray-900">
        Work Experience
      </h2>

      <div className="space-y-8">
        {experiences.map((exp, index) => (
          <ExperienceCard key={index} experience={exp} />
        ))}
      </div>
    </div>
  </section>
);

export default ExperienceSection;
