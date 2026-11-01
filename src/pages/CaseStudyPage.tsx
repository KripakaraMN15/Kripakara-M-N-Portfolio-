import React, { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { PORTFOLIO_DATA } from '../data';
import { ProjectSchematicPreview } from '../components/ProjectSchematicPreview';

const getDisplayDomain = (url?: string) => {
  if (!url) return '';
  try {
    const parsed = new URL(url);
    if (parsed.hostname === 'github.com') {
      return `github.com${parsed.pathname.replace(/\/$/, '')}`;
    }
    return parsed.hostname;
  } catch {
    return url.replace(/^https?:\/\//, '').replace(/\/$/, '');
  }
};

export const CaseStudyPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const projectIndex = PORTFOLIO_DATA.projects.findIndex((p) => p.slug === slug);
  const project = PORTFOLIO_DATA.projects[projectIndex];
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    setImgError(false);
  }, [slug]);

  if (!project) {
    return <Navigate to="/work" replace />;
  }

  const prevProject =
    PORTFOLIO_DATA.projects[
      (projectIndex - 1 + PORTFOLIO_DATA.projects.length) % PORTFOLIO_DATA.projects.length
    ];
  const nextProject =
    PORTFOLIO_DATA.projects[(projectIndex + 1) % PORTFOLIO_DATA.projects.length];

  const hasScreenshot = Boolean(project.screenshot) && !imgError;
  const screenshotTarget = project.screenshotLink || project.liveUrl || project.repoUrl;
  const isLiveDemo =
    Boolean(project.liveUrl) ||
    screenshotTarget.includes('run.app') ||
    screenshotTarget.includes('onrender.com');

  return (
    <article className="mx-auto max-w-[1440px] border-x border-[var(--hairline)]">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--hairline)] px-4 py-3.5 md:px-8 font-mono-tech text-xs text-[#55554F]">
        <div className="flex items-center gap-2">
          <Link to="/work" className="hover:text-[var(--fg)] transition-colors">
            ← BACK TO WORK
          </Link>
          <span>/</span>
          <span className="text-[var(--fg)]">
            ({project.index}) {project.slug.toUpperCase()}
          </span>
        </div>
        {project.year && <div>YEAR // {project.date || project.year}</div>}
      </div>

      <header className="border-b border-[var(--hairline)] px-4 py-10 md:px-8 md:py-16">
        <div className="grid grid-cols-12 gap-8 items-end">
          <div className={`col-span-12 ${hasScreenshot ? 'lg:col-span-7' : 'lg:col-span-8'}`}>
            <div className="font-mono-tech text-xs uppercase tracking-widest text-[#55554F] mb-3">
              CASE STUDY ({project.index}) {project.badge ? `· ${project.badge.formatted}` : project.recognition ? `· ★ ${project.recognition}` : ''}
            </div>
            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tighter leading-[0.95]">
              {project.name}
            </h1>
            <p className="mt-6 max-w-3xl font-display text-xl md:text-2xl text-[#55554F] leading-relaxed">
              {project.tagline}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              {project.liveUrl && (
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${project.name} live demo in a new tab`}
                    className="border border-[var(--fg)] bg-[var(--fg)] text-[var(--bg)] px-5 py-2.5 font-mono-tech text-xs uppercase tracking-widest hover:opacity-85 transition-opacity inline-flex items-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                  >
                    VIEW LIVE DEMO ↗
                  </a>
                  {project.liveUrlHint && (
                    <span className="font-mono-tech text-[11px] text-[#55554F]">
                      {project.liveUrlHint}
                    </span>
                  )}
                </div>
              )}

              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${project.name} source code on GitHub in a new tab`}
                className="border border-[var(--hairline)] px-5 py-2.5 font-mono-tech text-xs uppercase tracking-widest text-[var(--fg)] hover:border-[var(--fg)] transition-colors inline-flex items-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                VIEW SOURCE ON GITHUB ↗
              </a>
            </div>

            {project.publicDemoNote && (
              <div className="mt-4 font-mono-tech text-xs text-[#55554F]">
                {project.publicDemoNote}
              </div>
            )}
          </div>

          <div className={`col-span-12 ${hasScreenshot ? 'lg:col-span-5' : 'lg:col-span-4'}`}>
            {hasScreenshot ? (
              <div className="w-full">
                <a
                  href={screenshotTarget}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={isLiveDemo ? `Open ${project.name} live site in a new tab` : `Open ${project.name} repository on GitHub`}
                  className="group block border border-[var(--fg)] rounded-none shadow-none bg-[var(--bg)] overflow-hidden relative focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  {/* Top Bar */}
                  <div className="h-[32px] px-3 border-b border-[var(--hairline)] flex items-center justify-between font-mono-tech text-xs uppercase bg-[var(--bg)] text-[var(--fg)] group-hover:bg-[var(--fg)] group-hover:text-[var(--bg)] transition-colors duration-150 motion-reduce:transition-none">
                    <span className="truncate font-medium">{getDisplayDomain(screenshotTarget)}</span>
                    <span className="shrink-0 ml-2 font-mono-tech">↗</span>
                  </div>

                  {/* Product Screenshot */}
                  <div className="relative w-full aspect-[16/10] overflow-hidden bg-[var(--bg)]">
                    <img
                      src={project.screenshot}
                      alt={project.screenshotAlt || project.name}
                      loading="eager"
                      width={1200}
                      height={750}
                      onError={() => setImgError(true)}
                      className="w-full h-auto block aspect-[16/10] object-cover object-top"
                    />
                    <div className="absolute bottom-3 right-3 font-mono-tech text-xs px-2.5 py-1 bg-[#F5F5F0] text-[var(--fg)] border border-[var(--fg)] font-medium rounded-none opacity-0 group-hover:opacity-100 transition-opacity duration-150 motion-reduce:transition-none shadow-sm pointer-events-none">
                      {isLiveDemo ? 'VISIT LIVE ↗' : 'VIEW SOURCE ↗'}
                    </div>
                  </div>
                </a>

                {/* TripBuddy note */}
                {project.slug === 'tripbuddy-ai' && (
                  <div className="mt-2 font-mono-tech text-xs text-[#55554F]">
                    Hosted on a free tier: first load may take ~30-60s.
                  </div>
                )}
              </div>
            ) : (
              <ProjectSchematicPreview
                type={project.previewType}
                className="h-[220px] w-full"
              />
            )}
          </div>
        </div>
      </header>

      <section className="grid grid-cols-12 border-b border-[var(--hairline)]">
        <div className="col-span-12 lg:col-span-6 border-b lg:border-b-0 lg:border-r border-[var(--hairline)] p-6 md:p-10">
          <div className="font-mono-tech text-xs uppercase tracking-widest text-[#55554F] mb-4">
            (01) OVERVIEW
          </div>
          <p className="text-base md:text-lg leading-relaxed text-[var(--fg)]">
            {project.overview}
          </p>
        </div>

        <div className="col-span-12 lg:col-span-6 p-6 md:p-10">
          <div className="font-mono-tech text-xs uppercase tracking-widest text-[#55554F] mb-4">
            (02) PROBLEM
          </div>
          <p className="text-base md:text-lg leading-relaxed text-[var(--fg)]">
            {project.problem}
          </p>
        </div>
      </section>

      <section className="border-b border-[var(--hairline)] p-6 md:p-10">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-3">
            <div className="font-mono-tech text-xs uppercase tracking-widest text-[#55554F]">
              (03) APPROACH &amp; ARCHITECTURE
            </div>
            <p className="mt-2 font-mono-tech text-xs text-[#55554F]">
              Key implementation decisions grounded strictly in project specs.
            </p>
          </div>

          <div className="col-span-12 lg:col-span-9 space-y-6">
            {hasScreenshot && (
              <div className="border border-[var(--hairline)] p-2 bg-[var(--bg)]">
                <div className="mb-2 font-mono-tech text-xs uppercase tracking-widest text-[#55554F] px-2 pt-1">
                  SYSTEM SCHEMATIC // ARCHITECTURAL FLOW
                </div>
                <ProjectSchematicPreview
                  type={project.previewType}
                  className="h-[220px] sm:h-[260px] w-full border-0"
                />
              </div>
            )}

            <div className="divide-y divide-[var(--hairline)] border border-[var(--hairline)]">
              {project.approach.map((point, idx) => {
                const colonIndex = point.indexOf(':');
                const hasLabel = colonIndex > 0 && colonIndex < 20;
                const label = hasLabel ? point.slice(0, colonIndex) : null;
                const body = hasLabel ? point.slice(colonIndex + 1).trim() : point;

                return (
                  <div key={idx} className="grid grid-cols-12 gap-4 p-5 md:p-6">
                    <div className="col-span-2 sm:col-span-1 font-mono-tech text-xs text-[#55554F]">
                      0{idx + 1}.
                    </div>
                    <div className="col-span-10 sm:col-span-11 text-base leading-relaxed text-[var(--fg)]">
                      {label ? (
                        <div>
                          <span className="font-mono-tech text-xs font-semibold uppercase tracking-wider text-[var(--fg)] mr-2">
                            [{label}]
                          </span>
                          <span>{body}</span>
                        </div>
                      ) : (
                        point
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* (04) Trace & Verification Timeline */}
      {project.trace && project.trace.length > 0 && (
        <section className="border-b border-[var(--hairline)] p-6 md:p-10">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-3">
              <div className="font-mono-tech text-xs uppercase tracking-widest text-[#55554F]">
                (04) EVENT TRACE &amp; TIMELINE
              </div>
              {project.traceTotalMs && (
                <div className="mt-2 font-mono-tech text-xs text-[var(--fg)]">
                  TOTAL: {project.traceTotalMs}
                </div>
              )}
              {project.traceNote && (
                <p className="mt-2 font-mono-tech text-xs text-[#55554F] leading-relaxed">
                  {project.traceNote}
                </p>
              )}
            </div>

            <div className="col-span-12 lg:col-span-9 space-y-8">
              {/* Vertical Trace Sequence */}
              <div className="border border-[var(--hairline)] divide-y divide-[var(--hairline)] font-mono-tech text-xs">
                {project.trace.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[var(--surface-hover)] transition-colors"
                  >
                    <div className="flex items-start sm:items-center gap-3">
                      <span className="text-[#55554F] shrink-0">
                        {step.step || `0${idx + 1}`}
                      </span>
                      {step.type && (
                        <span className="border border-[var(--hairline)] px-1.5 py-0.5 text-[10px] uppercase text-[#55554F] shrink-0">
                          {step.type}
                        </span>
                      )}
                      <span className="font-semibold text-[var(--fg)]">
                        {step.node}
                      </span>
                      {step.detail && (
                        <span className="text-[#55554F]">
                          {step.detail}
                        </span>
                      )}
                    </div>
                    {step.durationMs !== undefined && step.durationMs > 0 && (
                      <span className="text-[#55554F] shrink-0 sm:text-right">
                        {step.durationMs}ms
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* Comparison Table */}
              {project.comparisonTable && (
                <div>
                  <div className="font-mono-tech text-xs uppercase tracking-widest text-[#55554F] mb-3">
                    TABLE // {project.comparisonTable.title}
                  </div>
                  <div className="border border-[var(--hairline)] overflow-x-auto font-mono-tech text-xs">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-[var(--hairline)] bg-[var(--surface-hover)]">
                          <th className="p-3.5 text-[#55554F] uppercase tracking-wider font-normal">
                            METRIC / PROPERTY
                          </th>
                          <th className="p-3.5 text-[var(--fg)] uppercase tracking-wider font-semibold border-l border-[var(--hairline)]">
                            {project.comparisonTable.headers[0]}
                          </th>
                          <th className="p-3.5 text-[var(--fg)] uppercase tracking-wider font-semibold border-l border-[var(--hairline)]">
                            {project.comparisonTable.headers[1]}
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[var(--hairline)]">
                        {project.comparisonTable.rows.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-[var(--surface-hover)] transition-colors">
                            <td className="p-3.5 text-[#55554F]">
                              {row.metric}
                            </td>
                            <td className="p-3.5 text-[var(--fg)] border-l border-[var(--hairline)]">
                              {row.left}
                            </td>
                            <td className="p-3.5 text-[var(--fg)] border-l border-[var(--hairline)] font-medium">
                              {row.right}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* (05) Design Decisions */}
      {project.designDecisions && project.designDecisions.length > 0 && (
        <section className="border-b border-[var(--hairline)] p-6 md:p-10">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-3">
              <div className="font-mono-tech text-xs uppercase tracking-widest text-[#55554F]">
                (05) DESIGN DECISIONS
              </div>
              <p className="mt-2 font-mono-tech text-xs text-[#55554F] leading-relaxed">
                Core design rules and architectural boundaries.
              </p>
            </div>

            <div className="col-span-12 lg:col-span-9 divide-y divide-[var(--hairline)] border border-[var(--hairline)]">
              {project.designDecisions.map((dec, idx) => (
                <div key={idx} className="p-6 space-y-2">
                  <div className="font-mono-tech text-xs font-semibold uppercase tracking-wider text-[var(--fg)]">
                    &ldquo;{dec.title}&rdquo;
                  </div>
                  <p className="text-sm md:text-base leading-relaxed text-[#55554F]">
                    {dec.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Results & Metrics */}
      <section className="border-b border-[var(--hairline)]">
        <div className="border-b border-[var(--hairline)] px-6 py-4 md:px-10 font-mono-tech text-xs uppercase tracking-widest text-[#55554F]">
          (06) RESULTS &amp; BENCHMARKS
        </div>
        <div className="overflow-hidden">
          <div
            className={`-mr-px -mb-px grid grid-cols-1 sm:grid-cols-2 ${
              project.results.length === 5
                ? 'lg:grid-cols-5'
                : project.results.length === 4
                ? 'lg:grid-cols-4'
                : 'lg:grid-cols-3'
            }`}
          >
            {project.results.map((res, idx) => (
              <div
                key={idx}
                className="border-r border-b border-[var(--hairline)] p-6 md:p-8 flex flex-col justify-between"
              >
                <div>
                  <div className="font-mono-tech text-xs text-[#55554F] mb-3">
                    0{idx + 1} // OUTCOME
                  </div>
                  <div className="font-display text-4xl md:text-5xl font-bold tracking-tight font-mono-tech">
                    {res.value}
                  </div>
                  <div className="mt-3 font-display text-base md:text-lg font-medium text-[var(--fg)]">
                    {res.label}
                  </div>
                </div>
                <p className="mt-2 font-mono-tech text-xs text-[#55554F] leading-relaxed">
                  {res.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
        {project.resultsNote && (
          <div className="border-t border-[var(--hairline)] px-6 py-3.5 md:px-10 font-mono-tech text-xs text-[#55554F]">
            NOTE // {project.resultsNote}
          </div>
        )}
      </section>

      {/* (07) Known Limitations */}
      {project.limitations && project.limitations.length > 0 && (
        <section className="border-b border-[var(--hairline)] p-6 md:p-10">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-3">
              <div className="font-mono-tech text-xs uppercase tracking-widest text-[#55554F]">
                (07) KNOWN LIMITATIONS
              </div>
              <p className="mt-2 font-mono-tech text-xs text-[#55554F] leading-relaxed">
                Explicit boundary constraints and non-goals.
              </p>
            </div>

            <div className="col-span-12 lg:col-span-9 divide-y divide-[var(--hairline)] border border-[var(--hairline)] font-mono-tech text-xs">
              {project.limitations.map((lim, idx) => (
                <div key={idx} className="p-4 sm:p-5 flex items-start gap-3 text-[var(--fg)]">
                  <span className="text-[#55554F] shrink-0">—</span>
                  <span className="leading-relaxed">{lim}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="grid grid-cols-12 border-b border-[var(--hairline)]">
        <div className="col-span-12 lg:col-span-5 border-b lg:border-b-0 lg:border-r border-[var(--hairline)] p-6 md:p-10">
          <div className="font-mono-tech text-xs uppercase tracking-widest text-[#55554F] mb-4">
            (08) TECHNICAL STACK
          </div>
          <div className="font-mono-tech text-sm leading-loose text-[var(--fg)]">
            {project.stack.map((tech, idx) => (
              <span key={tech}>
                {tech}
                {idx < project.stack.length - 1 ? '  ·  ' : ''}
              </span>
            ))}
          </div>
        </div>

        <div className="col-span-12 lg:col-span-7 p-6 md:p-10 font-mono-tech text-xs">
          <div className="uppercase tracking-widest text-[#55554F] mb-4">
            (09) LINKS &amp; SOURCE REPOSITORIES
          </div>
          <div className="space-y-4">
            {project.liveUrl && (
              <div className="flex flex-wrap items-center justify-between gap-3 border border-[var(--hairline)] p-4">
                <div className="pr-4">
                  <div className="text-[#55554F] text-[11px] uppercase tracking-wider mb-1">
                    LIVE DEMO URL
                  </div>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${project.name} live demo in a new tab`}
                    className="text-[var(--fg)] hover:underline break-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                  >
                    {project.liveUrl} ↗
                  </a>
                  {project.liveUrlHint && (
                    <div className="mt-1.5 text-[11px] text-[#55554F]">
                      {project.liveUrlHint}
                    </div>
                  )}
                </div>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${project.name} live demo in a new tab`}
                  className="border border-[var(--fg)] bg-[var(--fg)] text-[var(--bg)] px-4 py-2 uppercase tracking-widest hover:opacity-85 transition-opacity whitespace-nowrap focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  VIEW LIVE DEMO ↗
                </a>
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-3 border border-[var(--hairline)] p-4">
              <div className="pr-4">
                <div className="text-[#55554F] text-[11px] uppercase tracking-wider mb-1">
                  REPOSITORY URL
                </div>
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${project.name} repository on GitHub in a new tab`}
                  className="text-[var(--fg)] hover:underline break-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  {project.repoUrl} ↗
                </a>
              </div>
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${project.name} source code on GitHub in a new tab`}
                className="border border-[var(--hairline)] text-[var(--fg)] px-4 py-2 uppercase tracking-widest hover:border-[var(--fg)] transition-colors whitespace-nowrap focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                VIEW SOURCE ON GITHUB ↗
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {project.links.screenshots.map((shot, idx) => (
                <div
                  key={idx}
                  className="border border-dashed border-[var(--hairline)] p-4 text-[#55554F]"
                >
                  {shot}
                </div>
              ))}
            </div>

            {project.linksNote && (
              <div className="border border-[var(--hairline)] p-4 text-[#55554F] text-xs font-mono-tech leading-relaxed">
                NOTE // {project.linksNote}
              </div>
            )}
          </div>
        </div>
      </section>

      <nav aria-label="Adjacent Case Studies" className="grid grid-cols-12">
        <Link
          to={`/work/${prevProject.slug}`}
          className="col-span-12 sm:col-span-6 border-b sm:border-b-0 sm:border-r border-[var(--hairline)] p-6 md:p-10 hover:bg-[var(--fg)] hover:text-[var(--bg)] transition-colors group"
        >
          <div className="font-mono-tech text-xs uppercase tracking-widest text-[#55554F] group-hover:text-[var(--bg)]/70">
            ← PREVIOUS PROJECT ({prevProject.index})
          </div>
          <div className="mt-2 font-display text-2xl md:text-3xl font-semibold tracking-tight">
            {prevProject.name}
          </div>
        </Link>

        <Link
          to={`/work/${nextProject.slug}`}
          className="col-span-12 sm:col-span-6 p-6 md:p-10 text-left sm:text-right hover:bg-[var(--fg)] hover:text-[var(--bg)] transition-colors group"
        >
          <div className="font-mono-tech text-xs uppercase tracking-widest text-[#55554F] group-hover:text-[var(--bg)]/70">
            NEXT PROJECT ({nextProject.index}) →
          </div>
          <div className="mt-2 font-display text-2xl md:text-3xl font-semibold tracking-tight">
            {nextProject.name}
          </div>
        </Link>
      </nav>
    </article>
  );
};
