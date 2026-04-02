import React from 'react';

// Tech Skills Marquee Component
const TechSkillsMarquee = () => {
  const techs = [
    { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
    { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
    { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
    { name: 'AWS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg' },
    { name: 'TensorFlow', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg' },
    { name: 'Spring', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg' },
    { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
    { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
    { name: 'FastAPI', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg' },
    { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
    { name: 'C++', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
  ];

  return (
    <div className="mb-2">
      <h3 className="custom-font text-xl font-bold mb-4 text-center">
        <span className="text-[var(--off-white)]">Tech</span>
        <span className="text-amber-500"> Stack</span>
      </h3>

      <div className="relative overflow-hidden">
        <div className="flex animate-marquee space-x-5 py-2">
          {techs.map((tech, index) => (
            <div
              key={index}
              className="flex-shrink-0 bg-gray-900/30 border border-gray-800/60 px-4 py-2 rounded-xl shadow-sm hover:shadow-md transition"
            >
              <img
                src={tech.icon}
                alt={tech.name}
                className="w-8 h-8 object-contain"
                title={tech.name}
              />
            </div>
          ))}
          {/* Duplicate for seamless loop */}
          {techs.map((tech, index) => (
            <div
              key={`dup-${index}`}
              className="flex-shrink-0 bg-gray-900/30 border border-gray-800/60 px-6 py-3 rounded-2xl shadow-sm hover:shadow-md transition"
            >
              <img
                src={tech.icon}
                alt={tech.name}
                className="w-10 h-10 object-contain"
                title={tech.name}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechSkillsMarquee;
