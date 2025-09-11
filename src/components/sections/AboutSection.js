import React from "react";

const AboutSection = () => {
  return (
    <section id="about" className="w-screen overflow-x-hidden bg-white">
      <div className="flex flex-col md:flex-row w-screen min-h-0">
        <div className="box-border md:w-[50vw] w-full px-12 py-16 min-h-0 flex items-center">
          <div>
            <h2 className="custom-font text-5xl font-bold mb-6">
              <span className="text-gray-900">About</span>
              <span className="text-cyan-600"> Me</span>
            </h2>

            <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
              <p>
                Whats up!
              </p>
              <p>
                I'm a Computer Science student at the University of Maryland,
                passionate about building scalable software solutions and exploring
                the intersection of technology and creativity.
              </p>
              <p>
                My experience spans fintech at Enfusion, sports analytics, and
                education technology. I love bridging technical excellence with
                creative innovation.
              </p>
              <p>
                Outside of coding, I produce music that has reached millions of
                listeners worldwide — blending logic and creativity in everything
                I do.
              </p>
            </div>
          </div>
        </div>

        <div className="md:w-[50vw] w-full h-full overflow-hidden min-h-0">
          <img
            src="/logos/about-me.jpg" // <-- replace with your image path
            alt="About me"
            className="block md:w-[50vw] w-full h-auto object-center"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
