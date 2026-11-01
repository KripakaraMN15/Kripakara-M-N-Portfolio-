import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { PORTFOLIO_DATA } from '../data';

const renderBulletWithHighlights = (bullet: string, highlights: string[] = []) => {
  if (!highlights || highlights.length === 0) return bullet;

  const escaped = highlights
    .slice()
    .sort((a, b) => b.length - a.length)
    .map((h) => h.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&'));

  const regex = new RegExp(`(${escaped.join('|')})`, 'g');
  const parts = bullet.split(regex);

  return parts.map((part, i) => {
    if (highlights.includes(part)) {
      return (
        <strong key={i} className="font-semibold text-[var(--text)]">
          {part}
        </strong>
      );
    }
    return part;
  });
};

export const ExperiencePage: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  const [expandedHashes, setExpandedHashes] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    PORTFOLIO_DATA.experience.forEach((e) => {
      init[e.hash] = true;
    });
    return init;
  });

  const allExpanded = PORTFOLIO_DATA.experience.every((e) => Boolean(expandedHashes[e.hash]));

  const toggleCommit = (hash: string) => {
    setExpandedHashes((prev) => ({
      ...prev,
      [hash]: !prev[hash],
    }));
  };

  const toggleAll = () => {
    const nextState = !allExpanded;
    const next: Record<string, boolean> = {};
    PORTFOLIO_DATA.experience.forEach((e) => {
      next[e.hash] = nextState;
    });
    setExpandedHashes(next);
  };

  return (
    <div className="mx-auto max-w-[880px] -mt-20 sm:-mt-24 pt-[112px] px-6 md:px-8 pb-24">
      {/* Header */}
      <section className="border-b border-[var(--hairline)] pb-8 mb-12">
        <div className="font-mono-tech text-[12px] font-medium uppercase tracking-widest text-[var(--muted)] mb-3">
          (01) EXPERIENCE // GIT LOG
        </div>

        <div className="flex flex-wrap sm:flex-nowrap items-end justify-between gap-4">
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold tracking-tighter leading-none text-[var(--text)]">
            COMMIT HISTORY
          </h1>
          <button
            type="button"
            onClick={toggleAll}
            aria-expanded={allExpanded}
            className="h-10 min-h-[44px] md:min-h-[40px] px-4 border border-[var(--hairline)] hover:border-[var(--text)] font-mono-tech text-[12px] font-medium uppercase tracking-wider text-[var(--text)] hover:bg-[var(--text)] hover:text-[#F5F5F0] transition-colors whitespace-nowrap shrink-0 flex items-center justify-center rounded-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            {allExpanded ? 'COLLAPSE ALL [-]' : 'EXPAND ALL [+]'}
          </button>
        </div>

        <div className="mt-6 md:mt-8 border border-[var(--hairline)] p-4 font-mono-tech text-[14px] text-[var(--muted)] bg-[rgba(10,10,10,0.02)]">
          <span className="text-[var(--text)] font-medium">$ git log --graph --stat -p main</span> · Showing {PORTFOLIO_DATA.experience.length} engineering internships
        </div>
      </section>

      {/* Timeline Section */}
      <section aria-label="Internship Timeline">
        <div>
          {PORTFOLIO_DATA.experience.map((commit, idx) => {
            const isFirst = idx === 0;
            const isLast = idx === PORTFOLIO_DATA.experience.length - 1;
            const isExpanded = Boolean(expandedHashes[commit.hash]);

            return (
              <div key={commit.hash}>
                <article className="flex items-start">
                  {/* Left Gutter: Git-graph line & 14px solid dot */}
                  <div className="w-[28px] md:w-[48px] shrink-0 relative self-stretch">
                    {/* Vertical Line */}
                    {isFirst ? (
                      // First entry: line starts from center of dot (10px) to bottom
                      <div className="absolute left-[13px] md:left-[23px] top-[10px] bottom-0 w-[2px] bg-[var(--text)]" />
                    ) : (
                      // Last entry: line comes from top and stops at center of dot (10px)
                      <div className="absolute left-[13px] md:left-[23px] top-0 h-[10px] w-[2px] bg-[var(--text)]" />
                    )}

                    {/* 14px Solid Dot (accent fill for newest, text fill for others) */}
                    <div
                      className={`w-[14px] h-[14px] rounded-full absolute left-[7px] md:left-[17px] top-[3px] z-10 ${
                        isFirst ? 'bg-[var(--accent)]' : 'bg-[var(--text)]'
                      }`}
                      aria-hidden="true"
                    />
                  </div>

                  {/* Right Content */}
                  <div className="flex-1 min-w-0">
                    {/* 1. Meta row: Dates, Location, and 7-char Commit Hash Tag */}
                    <div className="flex flex-wrap items-center gap-2.5 font-mono-tech text-[13px] font-medium text-[var(--muted)] leading-none min-h-[20px]">
                      <span>
                        {commit.period.toUpperCase()} · {commit.location.toUpperCase()}
                      </span>
                      <span className="inline-flex items-center font-mono-tech text-[12px] font-medium border border-[var(--hairline)] px-1.5 py-0.5 text-[var(--muted)] bg-[rgba(10,10,10,0.03)] rounded-none">
                        {commit.hash.slice(0, 7)}
                      </span>
                    </div>

                    {/* 2. Role and Organization */}
                    <h2 className="font-display text-[28px] md:text-[34px] font-semibold tracking-[-0.02em] leading-[1.1] text-[var(--text)] mt-3">
                      {commit.role}
                    </h2>
                    <p className="font-display text-[20px] md:text-[22px] font-medium text-[var(--muted)] mt-1">
                      {commit.organization}
                    </p>

                    {/* 3. Commit message line */}
                    <div className="font-mono-tech text-[14px] md:text-[15px] text-[var(--text)] flex items-start gap-2 leading-relaxed mt-4">
                      <span className="text-[var(--muted)] select-none">›</span>
                      <span>{commit.commitMessage}</span>
                    </div>

                    {/* 4. Stack Tags */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {commit.stack.map((tech) => (
                        <span
                          key={tech}
                          className="font-mono-tech text-[13px] font-medium border border-[var(--hairline)] px-[10px] py-[6px] text-[var(--text)] bg-[var(--bg)] rounded-none"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* 5. Details panel (expanded by default) */}
                    <div className="mt-6 border border-[var(--hairline)] bg-[rgba(10,10,10,0.03)] p-6 rounded-none">
                      <div className="flex items-center justify-between">
                        <span className="font-mono-tech text-[12px] font-medium uppercase tracking-wider text-[var(--muted)]">
                          CHANGES
                        </span>
                        <button
                          type="button"
                          onClick={() => toggleCommit(commit.hash)}
                          aria-expanded={isExpanded}
                          className="min-h-[44px] md:min-h-[36px] px-3 py-1 font-mono-tech text-[12px] font-medium border border-[var(--hairline)] hover:border-[var(--text)] text-[var(--text)] hover:bg-[var(--text)] hover:text-[#F5F5F0] transition-colors rounded-none flex items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                        >
                          {isExpanded ? 'HIDE [-]' : 'SHOW [+]'}
                        </button>
                      </div>

                      <motion.div
                        initial={false}
                        animate={{
                          height: isExpanded ? 'auto' : 0,
                          opacity: isExpanded ? 1 : 0,
                          marginTop: isExpanded ? 18 : 0,
                        }}
                        transition={{
                          duration: prefersReducedMotion ? 0 : 0.18,
                          ease: 'easeOut',
                        }}
                        className="overflow-hidden"
                      >
                        <div className="flex flex-col gap-[14px]">
                          {commit.diffLines.map((line, lineIdx) => (
                            <div key={lineIdx} className="flex items-start gap-3">
                              <span
                                className="font-mono-tech font-bold text-[#00702E] select-none text-[16px] md:text-[18px] leading-[1.55] shrink-0"
                                aria-hidden="true"
                              >
                                +
                              </span>
                              <p className="font-display text-[17px] md:text-[18px] font-normal leading-[1.55] text-[var(--text)]">
                                {renderBulletWithHighlights(line, commit.highlights)}
                              </p>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </article>

                {/* 56px Space and 1px Hairline Separator Between Entries */}
                {!isLast && (
                  <div className="relative h-[56px] flex items-center" aria-hidden="true">
                    {/* Git-graph line continuing through the gap */}
                    <div className="absolute left-[13px] md:left-[23px] top-0 bottom-0 w-[2px] bg-[var(--text)]" />
                    {/* Hairline across content area */}
                    <div className="w-full border-b border-[var(--hairline)] ml-[28px] md:ml-[48px]" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
