import React from 'react';
import { Mail, Linkedin, Github } from 'lucide-react';

const cardClass =
  "rounded-xl border p-3 transition-colors hover:bg-[var(--control-bg)]";

const ContactCard = ({ href, label, value, external, icon: Icon }) => (
  <a
    href={href}
    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    className={cardClass}
    style={{ background: "var(--card)", borderColor: "var(--border)" }}
  >
    <div className="flex items-start gap-2.5">
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
        style={{ background: "var(--control-bg)" }}
      >
        <Icon className="w-4 h-4" />
      </div>
      <div className="min-w-0 flex-1">
        <div
          className="text-[10px] font-medium uppercase tracking-wide"
          style={{ color: "var(--muted-foreground)" }}
        >
          {label}
        </div>
        <div
          className="text-xs leading-snug mt-0.5 break-all"
          style={{ color: "var(--foreground)" }}
        >
          {value}
        </div>
      </div>
    </div>
  </a>
);

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
        Email is best — school or personal, either works. I&apos;m always down to talk music + tools + interesting problems.
      </p>

      <div className="grid sm:grid-cols-2 gap-2" style={{ fontFamily: "var(--font-geist-sans)" }}>
        <ContactCard
          href="mailto:mgopi@terpmail.umd.edu"
          label="School email"
          value="mgopi@terpmail.umd.edu"
          icon={Mail}
        />
        <ContactCard
          href="mailto:maanasgopi1404@gmail.com"
          label="Personal email"
          value="maanasgopi1404@gmail.com"
          icon={Mail}
        />
        <ContactCard
          href="https://linkedin.com/in/maanas-gopi"
          label="LinkedIn"
          value="linkedin.com/in/maanas-gopi"
          icon={Linkedin}
          external
        />
        <ContactCard
          href="https://github.com/maanasgopi"
          label="GitHub"
          value="github.com/maanasgopi"
          icon={Github}
          external
        />
      </div>
    </div>
  </section>
);

export default ContactSection;
