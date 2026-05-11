import React from "react";
import { ExternalLink, FileText } from "lucide-react";
import TechSkillsMarquee from "../ui/TechSkillsMarquee";

const IntroBlurbSection = () => (
  <section id="intro" className="px-4 sm:px-6 py-10 sm:py-12">
    <div className="reading-container">
      <article
        className="rounded-2xl border overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-500 ease-out motion-reduce:transition-none motion-reduce:hover:shadow-sm"
        style={{
          borderColor: "var(--border)",
          background: "var(--card)",
        }}
      >
        {/* Top strip: full-bleed image on the left, big typographic name on the right */}
        <div className="grid sm:grid-cols-[280px_1fr] min-h-[320px]">
          {/* Photo — bleeds to all edges of its cell */}
          <div className="relative hidden sm:block">
            <img
              src="/logos/blurb.jpg"
              alt="Maanas Gopi"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
          </div>

          {/* Right panel */}
          <div className="flex flex-col p-6 sm:p-8 gap-5">
            {/* Kicker + headline */}
            <div className="section-title-block">
              <p className="kicker mb-3">About me</p>
              <h2
                className="section-heading section-heading-accent font-bold leading-[1.05] tracking-tight flex items-baseline gap-3 flex-wrap"
                style={{ fontSize: "clamp(1.75rem, 4vw, 2.6rem)", color: "var(--foreground)" }}
              >
                <span>hey there</span>
                <span className="wave-emoji" role="img" aria-label="waving hand">
                  &#128075;
                </span>
              </h2>
            </div>

            {/* Stat/detail row */}
            <div
              className="grid grid-cols-2 gap-x-6 gap-y-5 border-t pt-6"
              style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}
            >
              <div>
                <p className="kicker mb-2">Based</p>
                <p
                  style={{ color: "var(--foreground)", fontWeight: 500 }}
                  className="text-base sm:text-lg leading-tight"
                >
                  College Park, MD
                </p>
              </div>
              <div>
                <p className="kicker mb-2">School</p>
                <div className="flex items-center gap-2">
                  <img
                    src="/logos/umdlogo.svg"
                    alt="University of Maryland"
                    className="w-7 h-7 object-contain shrink-0"
                  />
                  <p
                    style={{ color: "var(--foreground)", fontWeight: 500 }}
                    className="text-base sm:text-lg leading-tight"
                  >
                    UMD &rsquo;27
                  </p>
                </div>
              </div>
              <div>
                <p className="kicker mb-2">Focus</p>
                <p
                  style={{ color: "var(--foreground)", fontWeight: 500 }}
                  className="text-base sm:text-lg leading-tight"
                >
                  CS, Econ, Philosophy, Sound Design
                </p>
              </div>
              <div>
                <p className="kicker mb-2">Status</p>
                <p
                  style={{ color: "var(--foreground)", fontWeight: 500 }}
                  className="text-base sm:text-lg leading-tight"
                >
                  Open to internships + co-ops!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile-only image strip */}
        <div
          className="sm:hidden w-full h-[220px] overflow-hidden"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          <img
            src="/logos/blurb.jpg"
            alt="Maanas Gopi"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Bottom panel: bio copy + links */}
        <div
          className="border-t px-6 sm:px-8 py-6 sm:py-7 grid sm:grid-cols-[1fr_auto] gap-6 items-center"
          style={{ borderColor: "var(--border)" }}
        >
          <p
            className="text-[15px] sm:text-base leading-relaxed max-w-xl"
            style={{ color: "var(--muted-foreground)" }}
          >
            Welcome! I'm a junior @ UMD studying CS + Econ + Philosophy. As a CS major, my interests
            lie in developer infra, backend eng, machine learning, and fintech applications. When I'm not coding, 
            you might catch me making music or reading Hieronymi/Kant!
          </p>

          <div className="flex flex-col gap-2 shrink-0 w-full sm:w-40">
            <a
              href="./Maanas_Gopi_Resume.pdf"
              className="inline-flex items-center justify-center gap-2 text-sm rounded-full border px-3 py-2 transition-colors hover:bg-black/5"
              style={{
                fontFamily: "var(--font-geist-sans)",
                color: "var(--foreground)",
                textDecoration: "none",
                borderColor: "var(--border)",
              }}
            >
              <FileText className="w-4 h-4" />
              Resume
            </a>
            <a
              href="https://linkedin.com/in/maanas-gopi"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 text-sm rounded-full border px-3 py-2 transition-colors hover:bg-black/5"
              style={{
                fontFamily: "var(--font-geist-sans)",
                color: "var(--foreground)",
                textDecoration: "none",
                borderColor: "var(--border)",
              }}
            >
              <ExternalLink className="w-4 h-4" />
              LinkedIn
            </a>
          </div>
        </div>
      </article>

      <TechSkillsMarquee />
    </div>
  </section>
);

export default IntroBlurbSection;
