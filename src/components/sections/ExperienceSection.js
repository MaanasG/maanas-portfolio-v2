import React from "react";
import { experiences } from "../../data/experiences";
import ExperienceCard from "../cards/ExperienceCard";

const ExperienceSection = () => (
  <section id="experience" className="px-4 sm:px-6 py-7 sm:py-8">
    <div className="reading-container">
      <div className="section-title-block mb-4">
        <div className="kicker mb-2">Where I’ve been</div>
        <h2 className="section-heading section-heading-masthead text-2xl sm:text-3xl">
          Experience
        </h2>
      </div>

      <div
        className="divide-y divide-black/[0.07]"
        style={{
          borderTop: "1px solid rgba(0,0,0,0.07)",
          borderBottom: "1px solid rgba(0,0,0,0.07)",
        }}
      >
        {experiences.map((exp, index) => (
          <ExperienceCard key={index} experience={exp} />
        ))}
      </div>
    </div>
  </section>
);

export default ExperienceSection;
