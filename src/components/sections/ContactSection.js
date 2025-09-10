import React from 'react';
import { Mail, Linkedin, Github } from 'lucide-react';
import TechSkillsMarquee from '../ui/TechSkillsMarquee';

const ContactSection = () => (
  <section id="contact" className="py-32 px-6 bg-white">
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="custom-font text-5xl font-bold mb-8">
        <span className="text-gray-900">Let's</span>
        <span className="text-cyan-600"> Connect</span>
      </h2>
      <p className="coolvetica-font text-xl text-gray-600 mb-16 max-w-2xl mx-auto">
        Reach out anywhere below!
      </p>
      
      <div className="coolvetica-font grid md:grid-cols-3 gap-8 mb-16">
        <a 
          href="mailto:mgopi@terpmail.umd.edu"
          className="group bg-white border border-gray-200 rounded-3xl p-8 hover:border-cyan-400 transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-md"
        >
          <div className="w-16 h-16 bg-cyan-100 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:bg-cyan-200 transition-colors">
            <Mail className="w-8 h-8 text-cyan-600" />
          </div>
          <h3 className="text-xl mb-2 text-gray-900">Email</h3>
          <p className="text-gray-600 text-sm">mgopi@terpmail.umd.edu</p>
        </a>
        
        <a 
          href="https://linkedin.com/in/maanas-gopi"
          className="group bg-white border border-gray-200 rounded-3xl p-8 hover:border-blue-400 transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-md"
        >
          <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:bg-blue-200 transition-colors">
            <Linkedin className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-xl mb-2 text-gray-900">LinkedIn</h3>
          <p className="text-gray-600 text-sm">Connect with me!</p>
        </a>
        
        <a 
          href="https://github.com/maanasgopi"
          className="group bg-white border border-gray-200 rounded-3xl p-8 hover:border-purple-400 transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-md"
        >
          <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:bg-purple-200 transition-colors">
            <Github className="w-8 h-8 text-purple-600" />
          </div>
          <h3 className="text-xl mb-2 text-gray-900">GitHub</h3>
          <p className="text-gray-600 text-sm">All my projects + experiments!</p>
        </a>
      </div>

      <TechSkillsMarquee />
    </div>
  </section>
);

export default ContactSection;
