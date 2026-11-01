import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ProjectCaseStudy } from '../data';
import { ProjectSchematicPreview } from './ProjectSchematicPreview';

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

interface ProjectListRowsProps {
  projects: ProjectCaseStudy[];
}

export const ProjectListRows: React.FC<ProjectListRowsProps> = ({ projects }) => {
  const navigate = useNavigate();
  const [hoveredProject, setHoveredProject] = useState<ProjectCaseStudy | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const previewX = useSpring(mouseX, { stiffness: 140, damping: 22, mass: 0.6 });
  const previewY = useSpring(mouseY, { stiffness: 140, damping: 22, mass: 0.6 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Keep preview to the right of the cursor and anchored in the right viewport zone so it never covers row text
    const previewWidth = 360;
    const rightBoundary = window.innerWidth - previewWidth - 24;
    const targetX = Math.min(
      Math.max(e.clientX + 32, window.innerWidth * 0.64),
      Math.max(rightBoundary, e.clientX + 16)
    );
    const targetY = Math.min(
      Math.max(e.clientY - 110, 80),
      window.innerHeight - 230
    );

    mouseX.set(targetX);
    mouseY.set(targetY);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setHoveredProject(null)}
      className="relative border-t border-[var(--hairline)]"
    >
      <div className="hidden md:grid md:grid-cols-12 border-b border-[var(--hairline)] py-2.5 px-4 md:px-8 font-mono-tech text-[11px] uppercase tracking-widest text-[#55554F]">
        <div className="col-span-1">IDX</div>
        <div className="col-span-4">PROJECT</div>
        <div className="col-span-3">ARCHITECTURE &amp; IMPACT</div>
        <div className="col-span-2">STACK</div>
        <div className="col-span-2 text-right">YEAR // LINKS</div>
      </div>

      {projects.map((project) => {
        const isHovered = hoveredProject?.slug === project.slug;
        return (
          <div
            key={project.slug}
            role="link"
            tabIndex={0}
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
            className={`group block cursor-pointer border-b border-[var(--hairline)] transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] ${
              isHovered
                ? 'bg-[var(--fg)] text-[var(--bg)]'
                : 'bg-[var(--bg)] text-[var(--fg)]'
            }`}
          >
            <div className="grid grid-cols-12 items-baseline gap-y-3 py-7 px-4 md:px-8">
              <div
                className={`col-span-2 md:col-span-1 font-mono-tech text-xs uppercase tracking-widest ${
                  isHovered ? 'text-[var(--bg)]/70' : 'text-[#55554F]'
                }`}
              >
                ({project.index})
              </div>

              <div className="col-span-10 md:col-span-4 pr-4">
                <h3 className="font-display text-xl md:text-2xl font-semibold tracking-tight">
                  {project.name}
                </h3>
                {(project.badge || project.recognition) && (
                  <p
                    className={`mt-1 font-mono-tech text-[11px] uppercase tracking-wider ${
                      isHovered ? 'text-[var(--bg)]/80' : 'text-[#55554F]'
                    }`}
                  >
                    {project.badge ? project.badge.formatted : `★ ${project.recognition}`}
                  </p>
                )}
              </div>

              <div
                className={`col-span-12 md:col-span-3 pr-6 text-sm leading-relaxed ${
                  isHovered ? 'text-[var(--bg)]/90' : 'text-[#55554F]'
                }`}
              >
                {project.tagline}
              </div>

              <div
                className={`col-span-12 sm:col-span-7 md:col-span-2 font-mono-tech text-xs leading-relaxed ${
                  isHovered ? 'text-[var(--bg)]/80' : 'text-[#55554F]'
                }`}
              >
                {project.stack.join(' · ')}
              </div>

              <div className="col-span-12 sm:col-span-5 md:col-span-2 flex flex-wrap items-center justify-start md:justify-end gap-2 font-mono-tech text-xs">
                {project.year && project.year !== 'TODO' && (
                  <span
                    className={isHovered ? 'text-[var(--bg)]/80' : 'text-[#55554F]'}
                  >
                    {project.year}
                  </span>
                )}

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    aria-label={`Open ${project.name} live demo in a new tab`}
                    className={`border px-2 py-0.5 font-mono-tech text-[10px] md:text-[11px] uppercase tracking-wider transition-colors whitespace-nowrap focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                      isHovered
                        ? 'border-[var(--bg)] text-[var(--bg)] hover:bg-[var(--bg)] hover:text-[var(--fg)]'
                        : 'border-[var(--hairline)] text-[var(--fg)] hover:border-[var(--fg)] hover:bg-[var(--fg)] hover:text-[var(--bg)]'
                    }`}
                  >
                    LIVE ↗
                  </a>
                )}

                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  aria-label={`Open ${project.name} repository on GitHub in a new tab`}
                  className={`border px-2 py-0.5 font-mono-tech text-[10px] md:text-[11px] uppercase tracking-wider transition-colors whitespace-nowrap focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                    isHovered
                      ? 'border-[var(--bg)] text-[var(--bg)] hover:bg-[var(--bg)] hover:text-[var(--fg)]'
                      : 'border-[var(--hairline)] text-[var(--fg)] hover:border-[var(--fg)] hover:bg-[var(--fg)] hover:text-[var(--bg)]'
                  }`}
                >
                  REPO ↗
                </a>
              </div>
            </div>
          </div>
        );
      })}

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
          <div className="border border-[var(--fg)] bg-[var(--bg)] p-1 overflow-hidden">
            <ProjectCardPreview project={hoveredProject} />
          </div>
        )}
      </motion.div>
    </div>
  );
};
