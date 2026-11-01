import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { MetricItem, PORTFOLIO_DATA, ProjectCaseStudy } from '../data';
import { ProjectSchematicPreview } from '../components/ProjectSchematicPreview';

const CountUpMetric: React.FC<{ item: MetricItem; index: number }> = ({ item, index }) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [displayValue, setDisplayValue] = useState<string>(item.formatted);

  useEffect(() => {
    if (!isInView) return;
    const duration = 1200;
    const startTime = performance.now();
    const startVal = 0;
    const endVal = item.rawValue;

    const update = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = startVal + (endVal - startVal) * eased;

      const formattedNum =
        item.decimals > 0
          ? current.toFixed(item.decimals)
          : Math.round(current).toLocaleString();

      setDisplayValue(`${item.prefix || ''}${formattedNum}${item.suffix}`);

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        setDisplayValue(item.formatted);
      }
    };

    const animId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animId);
  }, [isInView, item]);

  return (
    <Link
      to={item.link}
      ref={ref}
      aria-label={`${item.label}: ${item.formatted}`}
      className={`col-span-12 sm:col-span-6 lg:col-span-3 p-6 md:p-8 flex flex-col justify-between border-b lg:border-b-0 border-[var(--hairline)] ${
        index < 3 ? 'lg:border-r' : ''
      } ${index % 2 === 0 ? 'sm:border-r lg:border-r' : ''} hover:bg-[var(--fg)] hover:text-[var(--bg)] transition-colors duration-150 group`}
    >
      <div>
        <div className="flex items-center justify-between font-mono-tech text-[10px] uppercase tracking-widest text-[#55554F] group-hover:text-[var(--bg)]/70 mb-3">
          <span>0{index + 1} // {item.source}</span>
          <span className="opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
        </div>
        <div className="font-display text-4xl sm:text-5xl font-bold tracking-tight">
          {displayValue}
        </div>
        <div className="mt-2 font-display text-base font-semibold">
          {item.label}
        </div>
      </div>
      <p className="mt-4 font-mono-tech text-xs text-[#55554F] group-hover:text-[var(--bg)]/70 leading-relaxed">
        {item.context}
      </p>
    </Link>
  );
};

const ProjectCardPreview: React.FC<{ project: ProjectCaseStudy; className?: string }> = ({
  project,
  className = 'h-[210px] w-full',
}) => {
  const [imgFailed, setImgFailed] = useState(false);

  useEffect(() => {
    setImgFailed(false);
  }, [project.slug]);

  if (project.screenshot && !imgFailed) {
    return (
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-[var(--bg)]">
        <img
          src={project.screenshot}
          alt={project.screenshotAlt || project.name}
          loading="lazy"
          width={1200}
          height={750}
          onError={() => setImgFailed(true)}
          className="w-full h-auto block aspect-[16/10] object-cover object-top"
        />
      </div>
    );
  }

  return <ProjectSchematicPreview type={project.previewType} className={className} />;
};

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  // Schematic preview hover state for compact selected work rows
  const [hoveredProject, setHoveredProject] = useState<ProjectCaseStudy | null>(null);
  const [hoveredFeaturedSlug, setHoveredFeaturedSlug] = useState<string | null>(null);

  const previewMouseX = useMotionValue(0);
  const previewMouseY = useMotionValue(0);
  const previewX = useSpring(previewMouseX, { stiffness: 140, damping: 22, mass: 0.6 });
  const previewY = useSpring(previewMouseY, { stiffness: 140, damping: 22, mass: 0.6 });

  const handleWorkMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const previewWidth = 360;
    const previewHeight = 220;
    const padding = 16;

    let targetX = e.clientX + 24;
    if (targetX + previewWidth > window.innerWidth - padding) {
      targetX = Math.max(padding, window.innerWidth - previewWidth - padding);
    }

    let targetY = e.clientY - previewHeight / 2;
    targetY = Math.max(padding, Math.min(window.innerHeight - previewHeight - padding, targetY));

    previewMouseX.set(targetX);
    previewMouseY.set(targetY);
  };

  return (
    <div className="mx-auto max-w-[1440px] border-x border-[var(--hairline)]">
      <section
        className="relative overflow-hidden border-b border-[var(--hairline)] bg-[#F5F5F0] px-4 py-10 sm:py-14 lg:py-20 md:px-8"
      >
        <div className="grid grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Details & Copy */}
          <div className="col-span-12 lg:col-span-7 flex flex-col items-start gap-6 sm:gap-8">
            {/* Availability Badge */}
            <div className="inline-flex items-center gap-2.5 border border-[var(--hairline)] bg-[var(--bg)] px-3.5 py-1.5 font-mono-tech text-xs uppercase tracking-wider text-[var(--fg)]">
              <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
              <span>OPEN TO WORK · OPEN TO RELOCATE</span>
            </div>
          {/* Main Headline */}
          <h1 className="font-display font-bold text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] tracking-tight text-[var(--fg)] leading-[1.06]">
            Software Engineer
            <br />
            <span
              className="font-normal"
              style={{
                WebkitTextStroke: '1.5px var(--fg)',
                color: 'transparent',
              }}
            >
              AI Agents, LLMs &
            </span>
            <br />
            Backend Systems
            <span className="inline-flex items-center justify-center w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[var(--fg)] ml-3 align-middle" />
          </h1>

            {/* Subtitle / Description */}
            <p className="font-display text-base sm:text-lg md:text-xl text-[var(--fg)]/80 max-w-xl leading-relaxed">
Hi, I'm Kripakara, an Software engineer building multi-agent LLM systems and AI solutions. Previously at Samsung R&D, I focus on engineering full-stack systems.            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-1 font-mono-tech text-xs uppercase tracking-wider">
              <Link
                to="/work"
                className="inline-flex items-center justify-center gap-2 bg-[var(--fg)] text-[var(--bg)] px-6 py-3.5 hover:opacity-90 transition-opacity font-semibold"
              >
                <span>VIEW MY WORK</span>
                <span className="text-sm">↗</span>
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 border border-[var(--fg)] bg-transparent text-[var(--fg)] px-6 py-3.5 hover:bg-[var(--fg)] hover:text-[var(--bg)] transition-colors font-semibold"
              >
                <span>CONTACT</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Hero Portrait */}
          <div className="col-span-12 lg:col-span-5 flex justify-center lg:justify-end items-end pt-4 lg:pt-0">
            <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg">
              <img
                src="/Hero-portrait.png"
                alt="Kripakara M. N. - Portrait"
                className="w-full h-auto object-cover select-none pointer-events-none"
                style={{
                  mixBlendMode: 'multiply',
                  filter: 'brightness(1.12) contrast(1.05)',
                  maskImage:
                    'linear-gradient(to right, transparent 0%, black 20%), linear-gradient(to bottom, transparent 0%, black 20%, black 82%, transparent 100%)',
                  WebkitMaskImage:
                    'linear-gradient(to right, transparent 0%, black 20%), linear-gradient(to bottom, transparent 0%, black 20%, black 82%, transparent 100%)',
                  maskComposite: 'intersect',
                  WebkitMaskComposite: 'destination-in',
                }}
              />
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Key Engineering Metrics" className="border-b border-[var(--hairline)]">
        <div className="border-b border-[var(--hairline)] px-4 py-2.5 md:px-8 font-mono-tech text-[11px] uppercase tracking-widest text-[#55554F] flex items-center justify-between">
          <span>(01) BENCHMARKS &amp; PRODUCTION IMPACT</span>
          <span>SCROLL-TRIGGERED TELEMETRY</span>
        </div>
        <div className="grid grid-cols-12">
          {PORTFOLIO_DATA.metrics.map((metric, idx) => (
            <CountUpMetric key={metric.id} item={metric} index={idx} />
          ))}
        </div>
      </section>

      <section aria-label="Recognition" className="border-b border-[var(--hairline)]">
        <div className="flex flex-col md:flex-row items-stretch min-h-[56px] font-mono-tech text-xs">
          <div className="px-4 py-3.5 md:px-8 flex items-center text-[11px] uppercase tracking-widest text-[#55554F] border-b md:border-b-0 md:border-r border-[var(--hairline)] shrink-0">
            RECOGNITION
          </div>
          <div className="flex-1 flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-[var(--hairline)]">
            {PORTFOLIO_DATA.projects
              .filter((p) => p.badge)
              .map((project) => (
                <Link
                  key={project.slug}
                  to={`/work/${project.slug}`}
                  className="flex-1 px-4 py-3.5 md:px-6 flex items-center justify-between gap-3 text-[11px] md:text-xs tracking-wider uppercase text-[var(--fg)] hover:bg-[var(--fg)] hover:text-[var(--bg)] transition-colors duration-150 group"
                >
                  <span className="truncate">
                    ★ {project.badge!.label} · {project.badge!.context.toUpperCase()} · {project.badge!.period.toUpperCase()}
                  </span>
                  <span className="shrink-0 transition-transform duration-150 group-hover:translate-x-0.5">
                    →
                  </span>
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* (02) SELECTED WORK */}
      <section aria-label="Selected Work" className="border-b border-[var(--hairline)]">
        <div className="flex items-center justify-between px-4 py-4 md:px-8 border-b border-[var(--hairline)]">
          <div className="font-mono-tech text-xs uppercase tracking-widest text-[#55554F]">
            (02) SELECTED WORK // 05 CASE STUDIES
          </div>
          <Link
            to="/work"
            className="font-mono-tech text-xs uppercase tracking-widest text-[var(--fg)] hover:underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            VIEW ALL ARCHIVE →
          </Link>
        </div>

        {/* Tier 1: FEATURED (ContractBreaker & Vera) */}
        <div className="grid grid-cols-12 border-b border-[var(--hairline)]">
          {PORTFOLIO_DATA.projects
            .filter((p) => p.featured)
            .map((project) => {
              const isFeaturedHovered = hoveredFeaturedSlug === project.slug;
              return (
                <Link
                  key={project.slug}
                  to={`/work/${project.slug}`}
                  onMouseEnter={() => setHoveredFeaturedSlug(project.slug)}
                  onMouseLeave={() => setHoveredFeaturedSlug(null)}
                  onFocus={() => setHoveredFeaturedSlug(project.slug)}
                  onBlur={() => setHoveredFeaturedSlug(null)}
                  aria-label={`Open case study for ${project.name}`}
                  className="col-span-12 lg:col-span-6 border-b lg:border-b-0 lg:border-r last:border-r-0 border-[var(--hairline)] p-4 sm:p-5 flex flex-col justify-between group bg-[var(--bg)] transition-colors duration-150 rounded-none cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] relative"
                  style={{
                    backgroundColor: isFeaturedHovered ? 'rgba(10, 10, 10, 0.03)' : 'var(--bg)',
                    boxShadow: isFeaturedHovered ? 'inset 0 0 0 2px #0A0A0A' : 'none',
                  }}
                >
                  <div>
                    {/* Top Row: Index */}
                    <div className="flex items-center justify-between font-mono-tech text-[11px] uppercase tracking-wider mb-1.5 text-[#55554F]">
                      <span>({project.index})</span>
                    </div>

                    {/* Schematic SVG: Expanded to look prominently visible at top */}
                    <div className="mb-3 w-full h-[180px] sm:h-[195px] md:h-[210px] flex items-center justify-center bg-transparent">
                      <ProjectSchematicPreview
                        type={project.previewType}
                        className="w-full h-full"
                        isHovered={isFeaturedHovered}
                      />
                    </div>

                    {/* Title + FINALIST Tag */}
                    <div className="flex items-center flex-wrap gap-2 sm:gap-2.5">
                      <h3
                        className="font-display text-[20px] md:text-[22px] font-semibold tracking-[-0.02em] leading-snug text-[#0A0A0A]"
                        style={{
                          textDecorationLine: isFeaturedHovered ? 'underline' : 'none',
                          textDecorationThickness: '2px',
                          textUnderlineOffset: '3px',
                        }}
                      >
                        {project.name}
                      </h3>
                      <span className="font-mono-tech text-[10.5px] font-medium border border-[#0A0A0A] px-1.5 py-0.5 uppercase rounded-none shrink-0 text-[#0A0A0A] tracking-wider leading-none">
                        ★ FINALIST
                      </span>
                    </div>

                    {/* Description */}
                    <p className="mt-1 text-[13px] md:text-[13.5px] text-[#55554F] leading-normal line-clamp-2">
                      {project.tagline}
                    </p>
                  </div>

                  {/* Bottom Row: Stack Tags + Arrow */}
                  <div className="mt-3.5 sm:mt-4 pt-2.5 border-t border-[var(--hairline)] flex items-center justify-between font-mono-tech text-[11px] md:text-[12px]">
                    <span className="text-[#55554F] truncate pr-4">
                      {project.stack.slice(0, 3).join(' · ')}
                    </span>
                    <span
                      className="text-[18px] text-[#0A0A0A] shrink-0 transition-transform duration-150 motion-reduce:transform-none"
                      style={{
                        transform: isFeaturedHovered ? 'translate(3px, -3px)' : 'translate(0, 0)',
                      }}
                    >
                      ↗
                    </span>
                  </div>
                </Link>
              );
            })}
        </div>

        {/* Tier 2: COMPACT ROWS (BillaraAI, LiveDataViz, TripBuddy AI) */}
        <div
          onMouseMove={handleWorkMouseMove}
          onMouseLeave={() => setHoveredProject(null)}
          className="relative divide-y divide-[var(--hairline)]"
        >
          {PORTFOLIO_DATA.projects
            .filter((p) => !p.featured)
            .map((project) => {
              const isHovered = hoveredProject?.slug === project.slug;
              return (
                <div
                  key={project.slug}
                  role="link"
                  tabIndex={0}
                  data-invert="true"
                  onClick={() => navigate(`/work/${project.slug}`)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      navigate(`/work/${project.slug}`);
                    }
                  }}
                  onMouseEnter={() => setHoveredProject(project)}
                  onFocus={() => setHoveredProject(project)}
                  onBlur={() => setHoveredProject(null)}
                  aria-label={`View case study for ${project.name}`}
                  className={`group flex items-center justify-between px-4 md:px-8 h-[72px] cursor-pointer transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] ${
                    isHovered
                      ? 'bg-[var(--fg)] text-[var(--bg)]'
                      : 'bg-[var(--bg)] text-[var(--fg)]'
                  }`}
                >
                  <div className="flex items-center gap-4 md:gap-6 min-w-0 flex-1 pr-4">
                    {/* Index */}
                    <span
                      className={`font-mono-tech text-xs uppercase tracking-widest shrink-0 w-10 ${
                        isHovered ? 'text-[var(--bg)]/80' : 'text-[#55554F]'
                      }`}
                    >
                      ({project.index})
                    </span>

                    {/* Project Name */}
                    <h3 className="font-display text-[22px] font-medium tracking-tight whitespace-nowrap shrink-0">
                      {project.shortTitle || project.name}
                    </h3>

                    {/* Description */}
                    <span
                      className={`font-mono-tech text-[14px] truncate flex-1 min-w-0 transition-colors hidden sm:inline ${
                        isHovered ? 'text-[var(--bg)]/80' : 'text-[#55554F]'
                      }`}
                    >
                      — {project.listDescription || project.tagline}
                    </span>
                  </div>

                  {/* Right Group: LIVE ↗ chip + 20px Arrow */}
                  <div className="flex items-center gap-3 shrink-0 ml-auto font-mono-tech">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        aria-label={`Open ${project.name} live demo in a new tab`}
                        className={`text-[12px] font-medium border px-2.5 py-1 uppercase rounded-none transition-colors whitespace-nowrap ${
                          isHovered
                            ? 'border-[var(--bg)] text-[var(--bg)] hover:bg-[var(--bg)] hover:text-[var(--fg)]'
                            : 'border-[var(--fg)] text-[var(--fg)] hover:bg-[var(--fg)] hover:text-[var(--bg)]'
                        }`}
                      >
                        LIVE ↗
                      </a>
                    )}

                    <span
                      className={`text-[20px] transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none ${
                        isHovered ? 'text-[var(--bg)]' : 'text-[var(--fg)]'
                      }`}
                    >
                      ↗
                    </span>
                  </div>
                </div>
              );
            })}

          {/* Hover Floating Card */}
          <motion.div
            aria-hidden="true"
            style={{
              x: previewX,
              y: previewY,
            }}
            animate={{
              opacity: hoveredProject ? 1 : 0,
              scale: hoveredProject ? 1 : 0.94,
            }}
            transition={{ duration: 0.16 }}
            className="pointer-events-none fixed top-0 left-0 z-30 hidden w-[360px] lg:block"
          >
            {hoveredProject && (
              <div className="border border-[var(--fg)] bg-[var(--bg)] p-1 shadow-2xl overflow-hidden">
                <ProjectCardPreview project={hoveredProject} />
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* (03) EXPERIENCE */}
      <section aria-label="Experience" className="border-b border-[var(--hairline)]">
        <div className="flex items-center justify-between px-4 py-4 md:px-8 border-b border-[var(--hairline)]">
          <div className="font-mono-tech text-xs uppercase tracking-widest text-[#55554F]">
            (03) EXPERIENCE
          </div>
          <Link
            to="/experience"
            className="font-mono-tech text-xs uppercase tracking-widest text-[var(--fg)] hover:underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            VIEW GIT LOG →
          </Link>
        </div>

        <div className="divide-y divide-[var(--hairline)]">
          {PORTFOLIO_DATA.experience.map((exp) => (
            <Link
              key={exp.hash}
              to="/experience"
              data-invert="true"
              aria-label={`View experience details for ${exp.role} at ${exp.organization}`}
              className="group block min-h-[96px] py-4 px-4 sm:px-6 md:px-8 bg-[var(--bg)] hover:bg-[var(--fg)] text-[var(--fg)] hover:text-[var(--bg)] transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px]"
            >
              <div className="grid grid-cols-12 items-center gap-3 sm:gap-4 h-full">
                {/* Left: Dates */}
                <div className="col-span-12 sm:col-span-4 md:col-span-3 lg:w-[180px] font-mono-tech text-[13px] font-medium uppercase text-[#55554F] group-hover:text-[var(--bg)]/80 transition-colors">
                  {exp.period}
                </div>

                {/* Middle: Role & Company/City */}
                <div className="col-span-12 sm:col-span-8 md:col-span-5 flex-1">
                  <h3 className="font-display text-[22px] font-medium tracking-tight leading-snug">
                    {exp.role}
                  </h3>
                  <p className="font-mono-tech text-[13px] text-[#55554F] group-hover:text-[var(--bg)]/80 transition-colors mt-0.5">
                    {exp.organization} · {exp.location}
                  </p>
                </div>

                {/* Right: Outcome Line + Arrow */}
                <div className="col-span-12 md:col-span-4 flex items-center justify-between md:justify-end gap-4 mt-1 md:mt-0">
                  <p className="text-[14px] text-[var(--fg)] group-hover:text-[var(--bg)] leading-snug md:text-right flex-1 transition-colors">
                    {exp.homeHighlight || exp.commitMessage}
                  </p>
                  <span className="font-mono-tech text-[20px] transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none shrink-0">
                    ↗
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="px-4 py-16 md:px-8 md:py-24">
        <div className="grid grid-cols-12 items-end gap-8">
          <div className="col-span-12 lg:col-span-9">
            <div className="font-mono-tech text-xs uppercase tracking-widest text-[#55554F] mb-4">
              (04) INITIATE TRANSMISSION
            </div>
            <Link
              to="/contact"
              className="group inline-block font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter leading-[0.95] hover:opacity-80 transition-opacity"
            >
              Let&apos;s build something.
              <span className="ml-3 inline-block font-mono-tech font-normal transition-transform duration-150 group-hover:translate-x-2">
                ↗
              </span>
            </Link>
          </div>
          <div className="col-span-12 lg:col-span-3 flex flex-col items-start lg:items-end justify-end font-mono-tech text-xs text-[#55554F] gap-2">
            <div className="flex items-center gap-2 text-[var(--fg)]">
              <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
              <span>{PORTFOLIO_DATA.profile.status} · Open to relocate </span>
            </div>
            <div>{PORTFOLIO_DATA.profile.email}</div>
          </div>
        </div>
      </section>
    </div>
  );
};
