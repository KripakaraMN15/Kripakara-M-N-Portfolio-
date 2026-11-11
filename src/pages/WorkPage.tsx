import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PORTFOLIO_DATA, ProjectCaseStudy } from '../data';
import { ProjectListRows } from '../components/ProjectListRows';
import { ProjectSchematicPreview } from '../components/ProjectSchematicPreview';

const ProjectCardPreview: React.FC<{ project: ProjectCaseStudy; className?: string }> = ({
  project,
  className = 'h-[220px] w-full border-0',
}) => {
  const [imgFailed, setImgFailed] = useState(false);

  useEffect(() => {
    setImgFailed(false);
  }, [project.slug]);

  if (project.screenshot && !imgFailed) {
    return (
      <div className="border border-[var(--hairline)] overflow-hidden aspect-[16/10] bg-[var(--bg)]">
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

const FILTER_CHIPS = ['ALL', 'Python', 'FastAPI', 'RAG / NLP', 'AWS'] as const;
type FilterChip = (typeof FILTER_CHIPS)[number];

export const WorkPage: React.FC = () => {
  const [selectedTag, setSelectedTag] = useState<FilterChip>('ALL');

  const filteredProjects = PORTFOLIO_DATA.projects.filter((project) => {
    if (selectedTag === 'ALL') return true;
    if (selectedTag === 'AWS') {
      return (
        project.tags?.includes('AWS') ||
        project.slug === 'veridian'
      );
    }
    if (selectedTag === 'Python') {
      return (
        project.tags?.includes('Python') ||
        project.stack.some((s) => s.toLowerCase().includes('python'))
      );
    }
    if (selectedTag === 'FastAPI') {
      return (
        project.tags?.includes('FastAPI') ||
        project.stack.some((s) => s.toLowerCase().includes('fastapi'))
      );
    }
    if (selectedTag === 'RAG / NLP') {
      return (
        project.tags?.some((t) => t.includes('RAG') || t.includes('NLP')) ||
        project.stack.some((s) => s.includes('RAG') || s.includes('Embeddings'))
      );
    }
    return true;
  });

  return (
    <div className="mx-auto max-w-[1440px] border-x border-[var(--hairline)]">
      <section className="border-b border-[var(--hairline)] px-4 py-12 md:px-8 md:py-16">
        <div className="grid grid-cols-12 items-end gap-6">
          <div className="col-span-12 lg:col-span-8">
            <div className="font-mono-tech text-xs uppercase tracking-widest text-[#55554F] mb-3">
              (01) SELECTED WORK // ENGINEERING ARCHIVE
            </div>
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold tracking-tighter leading-none">
              SYSTEMS &amp; CASE STUDIES
            </h1>
          </div>
          <div className="col-span-12 lg:col-span-4 font-mono-tech text-xs text-[#55554F] leading-relaxed">
            Hover over any row to invert and inspect its abstract system schematic. Click a row to open the architecture notes, results, and links.
          </div>
        </div>
      </section>

      {/* Filter Chips Bar */}
      <section className="border-b border-[var(--hairline)] px-4 py-3 md:px-8 bg-[var(--surface-hover)]">
        <div className="flex flex-wrap items-center gap-2 font-mono-tech text-xs">
          <span className="text-[#55554F] uppercase tracking-wider mr-2">FILTER:</span>
          {FILTER_CHIPS.map((chip) => {
            const isSelected = selectedTag === chip;
            return (
              <button
                key={chip}
                onClick={() => setSelectedTag(chip)}
                className={`px-3 py-1 text-xs uppercase tracking-wider border transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                  isSelected
                    ? 'border-[var(--fg)] bg-[var(--fg)] text-[var(--bg)] font-medium'
                    : 'border-[var(--hairline)] bg-[var(--bg)] text-[#55554F] hover:text-[var(--fg)] hover:border-[var(--fg)]'
                }`}
              >
                {chip}
              </button>
            );
          })}
        </div>
      </section>

      <section aria-label="Project Index">
        <ProjectListRows projects={filteredProjects} />
      </section>

      <section className="px-4 py-12 md:px-8">
        <div className="mb-6 font-mono-tech text-xs uppercase tracking-widest text-[#55554F]">
          (02) ARCHITECTURAL SCHEMATICS // B&amp;W VECTOR PREVIEWS
        </div>
        <div className="grid grid-cols-12 gap-6">
          {filteredProjects.map((project, idx, arr) => {
            const isLastOdd = idx === arr.length - 1 && arr.length % 2 !== 0;
            return (
              <div
                key={project.slug}
                className={`col-span-12 ${
                  isLastOdd ? 'md:col-span-12' : 'md:col-span-6'
                } border border-[var(--hairline)] hover:border-[var(--fg)] transition-colors p-4 flex flex-col justify-between`}
              >
                <Link
                  to={`/work/${project.slug}`}
                  aria-label={`Open case study schematic for ${project.shortTitle}`}
                  className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  <div className={isLastOdd ? 'max-w-3xl mx-auto w-full' : 'w-full'}>
                    <ProjectCardPreview project={project} className="h-[220px] w-full border-0" />
                  </div>
                </Link>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--hairline)] pt-3 font-mono-tech text-xs">
                  <Link
                    to={`/work/${project.slug}`}
                    className="text-[var(--fg)] hover:underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                  >
                    ({project.index}) {project.shortTitle}
                  </Link>
                  <div className="flex items-center gap-3">
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open ${project.shortTitle} repository on GitHub in a new tab`}
                      className="border border-[var(--hairline)] px-2 py-0.5 text-[10px] uppercase tracking-wider text-[var(--fg)] hover:border-[var(--fg)] hover:bg-[var(--fg)] hover:text-[var(--bg)] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                    >
                      REPO ↗
                    </a>
                    <Link
                      to={`/work/${project.slug}`}
                      className="text-[#55554F] hover:text-[var(--fg)] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                    >
                      READ CASE STUDY →
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
