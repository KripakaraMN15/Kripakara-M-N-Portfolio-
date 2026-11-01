import React from 'react';
import { PORTFOLIO_DATA } from '../data';

const ProfilePhotoCard: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`border border-[var(--hairline)] p-3 font-mono-tech bg-[var(--bg)] ${className}`}>
      <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-[var(--hairline)] text-[10px] uppercase tracking-widest text-[#55554F]">
        <span>ID // PHOTO.RAW</span>
        <span className="h-2 w-2 rounded-full bg-[var(--accent)]" aria-hidden="true" />
      </div>

      <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#F5F5F0] border border-[var(--hairline)]">
        <img
          src="/Profile.png"
          alt="Portrait of Kripakara M. N."
          width={400}
          height={500}
          loading="eager"
          decoding="async"
          className="w-full h-full object-cover object-[center_25%] mix-blend-multiply transition-[filter] duration-[400ms] ease-in-out motion-reduce:transition-none grayscale contrast-[1.08] brightness-[0.97] [@media(hover:hover)]:hover:grayscale-0 [@media(hover:hover)]:hover:contrast-100 [@media(hover:hover)]:hover:brightness-100"
        />
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03] bg-repeat"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
          aria-hidden="true"
        />
      </div>

      <div className="flex items-center justify-between pt-2.5 text-[10px] uppercase tracking-widest text-[#55554F]">
        <span>FIG // PROFILE</span>
        <span>MANGALURU, IN</span>
      </div>

      <div className="mt-2 pt-2 border-t border-[var(--hairline)] text-xs font-semibold tracking-wider text-[var(--fg)] uppercase">
        KRIPAKARA M. N.
      </div>
    </div>
  );
};

export const AboutPage: React.FC = () => {
  return (
    <div className="mx-auto max-w-[1440px] border-x border-[var(--hairline)]">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--hairline)] px-4 py-3.5 md:px-8 font-mono-tech text-xs text-[#55554F]">
        <div>FILE // README.md (UTF-8)</div>
        <div>AUTHOR // {PORTFOLIO_DATA.profile.name}</div>
      </div>

      <div className="grid grid-cols-12">
        <div className="col-span-12 lg:col-span-8 border-b lg:border-b-0 lg:border-r border-[var(--hairline)] p-6 md:p-12 space-y-12">
          {/* Mobile Profile Photo Card */}
          <div className="block lg:hidden max-w-[280px] mx-auto">
            <ProfilePhotoCard />
          </div>

          <section>
            <div className="font-mono-tech text-xs uppercase tracking-widest text-[#55554F] mb-3">
              # README.md
            </div>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter">
              {PORTFOLIO_DATA.profile.name}
            </h1>
            <p className="mt-2 font-mono-tech text-sm text-[#55554F]">
              &gt; {PORTFOLIO_DATA.profile.subtitle}
            </p>
            <p className="mt-6 text-base md:text-lg leading-relaxed text-[var(--fg)]">
              {PORTFOLIO_DATA.profile.summary}
            </p>
          </section>

          <section className="border-t border-[var(--hairline)] pt-8">
            <h2 className="font-mono-tech text-sm font-semibold uppercase tracking-widest text-[var(--fg)] mb-6">
              ## Stack
            </h2>
            <div className="divide-y divide-[var(--hairline)] border border-[var(--hairline)] font-mono-tech">
              {PORTFOLIO_DATA.skills.map((group) => (
                <div key={group.category} className="grid grid-cols-12 p-4 text-xs gap-4 items-baseline">
                  <div className="col-span-12 sm:col-span-4 uppercase tracking-wider text-[#55554F]">
                    {group.category}
                  </div>
                  <div className="col-span-12 sm:col-span-8 text-[var(--fg)] leading-relaxed flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
                    {group.items.map((skill, idx) => (
                      <React.Fragment key={skill.name}>
                        <span className="inline-flex items-center gap-1.5 text-[var(--fg)] group transition-opacity duration-150 motion-reduce:transition-none hover:opacity-75">
                          {skill.icon && (
                            <skill.icon
                              className="h-3.5 w-3.5 shrink-0 text-current"
                              aria-hidden="true"
                            />
                          )}
                          <span>{skill.name}</span>
                        </span>
                        {idx < group.items.length - 1 && (
                          <span className="text-[#55554F] select-none" aria-hidden="true">
                            ·
                          </span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="border-t border-[var(--hairline)] pt-8">
            <h2 className="font-mono-tech text-sm font-semibold uppercase tracking-widest text-[var(--fg)] mb-6">
              ## Education
            </h2>
            <div className="border border-[var(--hairline)] p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2 font-mono-tech text-xs text-[#55554F]">
                <span>{PORTFOLIO_DATA.education.period}</span>
                <span>CGPA: {PORTFOLIO_DATA.education.cgpa}</span>
              </div>
              <h3 className="mt-2 font-display text-2xl font-semibold text-[var(--fg)]">
                {PORTFOLIO_DATA.education.degree}
              </h3>
              <p className="mt-1 font-mono-tech text-xs text-[#55554F]">
                {PORTFOLIO_DATA.education.institution}, {PORTFOLIO_DATA.education.location}
              </p>
            </div>
          </section>

          <section className="border-t border-[var(--hairline)] pt-8">
            <h2 className="font-mono-tech text-sm font-semibold uppercase tracking-widest text-[var(--fg)] mb-6">
              ## Certifications
            </h2>
            <div className="divide-y divide-[var(--hairline)] border border-[var(--hairline)] font-mono-tech text-xs">
              {PORTFOLIO_DATA.certifications.map((cert, idx) => (
                <div
                  key={cert.title}
                  className="flex flex-wrap items-center justify-between gap-4 p-4"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[#55554F]">0{idx + 1}.</span>
                    <span className="text-[var(--fg)]">{cert.title}</span>
                  </div>
                  <div className="text-[#55554F]">
                    {cert.issuer} · {cert.date}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="border-t border-[var(--hairline)] pt-8">
            <h2 className="font-mono-tech text-sm font-semibold uppercase tracking-widest text-[var(--fg)] mb-6">
              ## Currently
            </h2>
            <ul className="space-y-3 font-mono-tech text-xs leading-relaxed text-[var(--fg)]">
              {PORTFOLIO_DATA.currently.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="text-[#55554F]">-</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="col-span-12 lg:col-span-4 p-6 md:p-10 font-mono-tech lg:sticky lg:top-[80px] lg:self-start space-y-6">
          <ProfilePhotoCard className="hidden lg:block" />

          <div className="border border-[var(--fg)] p-6">
            <div className="flex items-center justify-between border-b border-[var(--hairline)] pb-3 text-xs uppercase tracking-widest text-[#55554F]">
              <span>SPEC SHEET // SYS.INFO</span>
              <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
            </div>

            <div className="divide-y divide-[var(--hairline)]">
              {PORTFOLIO_DATA.specSheet.map((row) => (
                <div key={row.label} className="py-4">
                  <div className="text-[10px] uppercase tracking-widest text-[#55554F]">
                    {row.label}
                  </div>
                  <div className="mt-1.5 text-xs leading-relaxed text-[var(--fg)]">
                    {row.label === 'STATUS' ? (
                      <span className="inline-flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
                        <span>{row.value}</span>
                      </span>
                    ) : (
                      row.value
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 border-t border-[var(--hairline)] pt-4 text-[11px] text-[#55554F] space-y-1">
              <div>EMAIL: {PORTFOLIO_DATA.profile.email}</div>
              <div>GITHUB: {PORTFOLIO_DATA.profile.github}</div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
