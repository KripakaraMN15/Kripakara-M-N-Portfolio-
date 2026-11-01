import React from 'react';
import { Mail, Github, Linkedin } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[var(--hairline)] bg-[var(--bg)] font-mono-tech text-xs">
      <div className="mx-auto grid max-w-[1440px] grid-cols-12 items-center gap-6 px-4 py-8 md:px-8">
        <div className="col-span-12 flex flex-wrap items-center gap-x-6 gap-y-2 md:col-span-6">
          <a
            href={`mailto:${PORTFOLIO_DATA.profile.email}`}
            className="group inline-flex items-center gap-2 text-[var(--fg)] hover:underline underline-offset-4 whitespace-nowrap"
          >
            <Mail className="w-3.5 h-3.5 text-[#55554F] group-hover:text-[var(--fg)] transition-colors" aria-hidden="true" />
            <span>{PORTFOLIO_DATA.profile.email}</span>
          </a>
          <span className="text-[#55554F]">/</span>
          <a
            href={PORTFOLIO_DATA.profile.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 text-[#55554F] hover:text-[var(--fg)] transition-colors whitespace-nowrap"
          >
            <Github className="w-3.5 h-3.5 text-[#55554F] group-hover:text-[var(--fg)] transition-colors" aria-hidden="true" />
            <span>GITHUB ↗</span>
          </a>
          <span className="text-[#55554F]">/</span>
          <a
            href={PORTFOLIO_DATA.profile.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 text-[#55554F] hover:text-[var(--fg)] transition-colors whitespace-nowrap"
          >
            <Linkedin className="w-3.5 h-3.5 text-[#55554F] group-hover:text-[var(--fg)] transition-colors" aria-hidden="true" />
            <span>LINKEDIN ↗</span>
          </a>
        </div>

        <div className="col-span-12 flex flex-wrap items-center justify-between gap-4 md:col-span-6 md:justify-end">
          <div className="flex items-center gap-2 text-[#55554F] whitespace-nowrap">
            <span className="inline-block h-2 w-2 rounded-full bg-[var(--accent)]" />
            <span>© 2026 Kripakara M. N. </span>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="border border-[var(--hairline)] px-3 py-1.5 text-[11px] uppercase tracking-widest text-[var(--fg)] hover:bg-[var(--fg)] hover:text-[var(--bg)] transition-colors whitespace-nowrap"
          >
            BACK TO TOP ↑
          </button>
        </div>
      </div>
    </footer>
  );
};
