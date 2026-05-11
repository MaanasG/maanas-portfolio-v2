import React from 'react';
import { Mail, Linkedin, Github } from 'lucide-react';

const cardClass =
  "rounded-xl border p-3 transition-colors hover:bg-black/[0.02]";

const ContactSection = () => (
  <section id="contact" className="px-4 sm:px-6 py-7 sm:py-8">
    <div className="reading-container">
      <div className="section-title-block mb-2">
        <div className="kicker mb-1.5">Say hi</div>
        <h2 className="section-heading section-heading-masthead text-xl sm:text-2xl">
          Let&apos;s connect
        </h2>
      </div>
      <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--muted-foreground)" }}>
        Email is best. I&apos;m always down to talk music + tools + interesting problems.
      </p>
      
      <div className="grid sm:grid-cols-3 gap-2" style={{ fontFamily: "var(--font-geist-sans)" }}>
        <a 
          href="mailto:mgopi@terpmail.umd.edu"
          className={cardClass}
          style={{ background: "var(--card)", borderColor: "var(--border)" }}
        >
          <div className="flex items-start gap-2.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: "rgba(0,0,0,0.04)" }}>
              <Mail className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[10px] font-medium uppercase tracking-wide" style={{ color: "var(--muted-foreground)" }}>Email</div>
              <div className="text-xs leading-snug mt-0.5 break-all" style={{ color: "var(--foreground)" }}>mgopi@terpmail.umd.edu</div>
            </div>
          </div>
        </a>
        
        <a 
          href="https://linkedin.com/in/maanas-gopi"
          target="_blank"
          rel="noopener noreferrer"
          className={cardClass}
          style={{ background: "var(--card)", borderColor: "var(--border)" }}
        >
          <div className="flex items-start gap-2.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: "rgba(0,0,0,0.04)" }}>
              <Linkedin className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[10px] font-medium uppercase tracking-wide" style={{ color: "var(--muted-foreground)" }}>LinkedIn</div>
              <div className="text-xs leading-snug mt-0.5 break-all" style={{ color: "var(--foreground)" }}>linkedin.com/in/maanas-gopi</div>
            </div>
          </div>
        </a>
        
        <a 
          href="https://github.com/maanasgopi"
          target="_blank"
          rel="noopener noreferrer"
          className={cardClass}
          style={{ background: "var(--card)", borderColor: "var(--border)" }}
        >
          <div className="flex items-start gap-2.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: "rgba(0,0,0,0.04)" }}>
              <Github className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[10px] font-medium uppercase tracking-wide" style={{ color: "var(--muted-foreground)" }}>GitHub</div>
              <div className="text-xs leading-snug mt-0.5 break-all" style={{ color: "var(--foreground)" }}>github.com/maanasgopi</div>
            </div>
          </div>
        </a>
      </div>
    </div>
  </section>
);

export default ContactSection;
