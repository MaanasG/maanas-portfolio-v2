import React from 'react';
import { Mail, Linkedin, Github } from 'lucide-react';
import TechSkillsMarquee from '../ui/TechSkillsMarquee';

const ContactSection = () => (
  <section id="contact" className="py-12 px-4 sm:px-6 bg-[var(--almost-black)]">
    <div className="max-w-3xl mx-auto text-center">
      <h2 className="custom-font text-3xl sm:text-4xl font-bold mb-3">
        <span className="text-[var(--off-white)]">Let&apos;s</span>
        <span className="text-amber-500"> Connect</span>
      </h2>
      <p className="coolvetica-font text-base sm:text-lg text-gray-300 mb-8 max-w-xl mx-auto">
        Reach out anywhere below!
      </p>
      
      <div className="coolvetica-font grid md:grid-cols-3 gap-4 mb-10">
        <a 
          href="mailto:mgopi@terpmail.umd.edu"
          className="group bg-gray-900/30 border border-gray-800/60 rounded-2xl p-5 hover:border-amber-400 transition-all duration-300 transform hover:scale-[1.02] shadow-sm hover:shadow-md"
        >
          <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:bg-amber-500/20 transition-colors">
            <Mail className="w-6 h-6 text-amber-300" />
          </div>
          <h3 className="text-base font-semibold mb-1 text-[var(--off-white)]">Email</h3>
          <p className="text-gray-300 text-sm">mgopi@terpmail.umd.edu</p>
        </a>
        
        <a 
          href="https://linkedin.com/in/maanas-gopi"
          className="group bg-gray-900/30 border border-gray-800/60 rounded-2xl p-5 hover:border-amber-400 transition-all duration-300 transform hover:scale-[1.02] shadow-sm hover:shadow-md"
        >
          <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:bg-amber-500/20 transition-colors">
            <Linkedin className="w-6 h-6 text-amber-300" />
          </div>
          <h3 className="text-base font-semibold mb-1 text-[var(--off-white)]">LinkedIn</h3>
          <p className="text-gray-300 text-sm">Connect with me!</p>
        </a>
        
        <a 
          href="https://github.com/maanasgopi"
          className="group bg-gray-900/30 border border-gray-800/60 rounded-2xl p-5 hover:border-amber-400 transition-all duration-300 transform hover:scale-[1.02] shadow-sm hover:shadow-md"
        >
          <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:bg-amber-500/20 transition-colors">
            <Github className="w-6 h-6 text-amber-300" />
          </div>
          <h3 className="text-base font-semibold mb-1 text-[var(--off-white)]">GitHub</h3>
          <p className="text-gray-300 text-sm">All my projects + experiments!</p>
        </a>
      </div>

      <TechSkillsMarquee />
    </div>
  </section>
);

export default ContactSection;
