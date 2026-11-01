import React from 'react';
import { Link } from 'react-router-dom';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="mx-auto max-w-[1440px] border-x border-[var(--hairline)] min-h-[calc(100vh-140px)] flex flex-col justify-between p-6 sm:p-10 md:p-16">
      <div className="font-mono-tech text-xs uppercase tracking-widest text-[#55554F] border-b border-[var(--hairline)] pb-4 flex items-center justify-between">
        <span>(404) ERROR // ROUTE_NOT_FOUND</span>
        <span>HTTP STATUS: 404</span>
      </div>

      <div className="my-12 sm:my-20 max-w-2xl">
        <div className="inline-flex items-center gap-2 border border-[var(--hairline)] px-3 py-1 font-mono-tech text-xs uppercase tracking-wider text-[var(--accent-text)] mb-6">
          <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
          <span>UNRESOLVED ENDPOINT</span>
        </div>

        <h1 className="font-display font-bold text-5xl sm:text-7xl md:text-8xl tracking-tight text-[var(--fg)] mb-6 leading-none">
          404
        </h1>

        <p className="font-display text-lg sm:text-xl md:text-2xl text-[var(--fg)]/80 mb-8 leading-relaxed">
          The specified path or resource does not exist on this server instance.
        </p>

        <div className="flex flex-wrap items-center gap-4 font-mono-tech text-xs uppercase tracking-wider">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-[var(--fg)] text-[var(--bg)] px-6 py-3.5 hover:opacity-90 transition-opacity font-semibold"
          >
            <span>RETURN TO HOMEPAGE</span>
            <span>↗</span>
          </Link>
          <Link
            to="/work"
            className="inline-flex items-center gap-2 border border-[var(--hairline)] bg-[var(--bg)] text-[var(--fg)] px-6 py-3.5 hover:border-[var(--fg)] transition-colors font-semibold"
          >
            <span>VIEW WORK</span>
          </Link>
        </div>
      </div>

      <div className="border-t border-[var(--hairline)] pt-4 font-mono-tech text-xs text-[#55554F] flex flex-wrap items-center justify-between gap-4">
        <span>AVAILABLE PATHS: / · /work · /experience · /about · /contact</span>
        <div className="flex items-center gap-4">
          <Link to="/experience" className="hover:text-[var(--fg)] transition-colors">
            EXPERIENCE
          </Link>
          <span>·</span>
          <Link to="/about" className="hover:text-[var(--fg)] transition-colors">
            ABOUT
          </Link>
          <span>·</span>
          <Link to="/contact" className="hover:text-[var(--fg)] transition-colors">
            CONTACT
          </Link>
        </div>
      </div>
    </div>
  );
};
