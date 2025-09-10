import React from 'react';
import { Mail, Linkedin, Github } from 'lucide-react';

// Footer Component
const Footer = () => (
  <footer className="py-12 px-6 border-t border-gray-800">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <div className="text-2xl font-bold mb-2 custom-font">
            <span className="text-white">Maanas</span>
            <span className="text-cyan-400"> Gopi</span>
          </div>
          <p className="text-gray-400 text-sm">
            Developer, Student, Producer • Raritan, NJ • US Citizen
          </p>
        </div>
        
        <div className="flex items-center space-x-6">
          <a href="mailto:mgopi@terpmail.umd.edu" className="text-gray-400 hover:text-white transition-colors">
            <Mail className="w-5 h-5" />
          </a>
          <a href="https://linkedin.com/in/maanas-gopi" className="text-gray-400 hover:text-white transition-colors">
            <Linkedin className="w-5 h-5" />
          </a>
          <a href="https://github.com/maanasgopi" className="text-gray-400 hover:text-white transition-colors">
            <Github className="w-5 h-5" />
          </a>
        </div>
      </div>
      
      <div className="mt-8 pt-8 border-t border-gray-800 text-center">
        <p className="text-gray-500 text-sm">
          © 2025 Designed + Developed by Maanas Gopi
        </p>
        <p className="text-gray-600 text-xs mt-2">
          Built with Next.js + TailwindCSS ⚡
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;