import React from "react";

const techs = [
  { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg" },
  { name: "TensorFlow", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
  { name: "Spring", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "FastAPI", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
];

/** Compact tool strip for the editorial layout (replaces dark-theme marquee). */
const TechSkillsMarquee = () => (
  <div className="mt-5 pt-5" style={{ borderTop: "1px solid var(--border)" }}>
    <div className="section-title-block mb-3">
      <div className="kicker">Stack</div>
    </div>
    <div className="flex flex-wrap gap-2" style={{ fontFamily: "var(--font-geist-sans)" }}>
      {techs.map((tech) => (
        <span
          key={tech.name}
          className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs"
          style={{
            borderColor: "var(--border)",
            background: "rgba(0,0,0,0.03)",
            color: "var(--muted-foreground)",
          }}
          title={tech.name}
        >
          <img src={tech.icon} alt="" className="w-3.5 h-3.5 object-contain shrink-0" aria-hidden />
          {tech.name}
        </span>
      ))}
    </div>
  </div>
);

export default TechSkillsMarquee;
