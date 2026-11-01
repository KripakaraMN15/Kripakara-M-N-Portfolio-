import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { PORTFOLIO_DATA } from '../data';

interface TopBarProps {
  onOpenCommandPalette: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onOpenCommandPalette }) => {
  const location = useLocation();
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [isCompact, setIsCompact] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isMac, setIsMac] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { label: 'WORK', path: '/work' },
    { label: 'EXPERIENCE', path: '/experience' },
    { label: 'ABOUT', path: '/about' },
    { label: 'CONTACT', path: '/contact' },
  ];

  useEffect(() => {
    if (typeof navigator !== 'undefined') {
      setIsMac(/Mac|iPod|iPhone|iPad/.test(navigator.userAgent));
    }
    if (typeof window !== 'undefined') {
      setPrefersReducedMotion(
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      );
    }
  }, []);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress =
        scrollHeight > 0 ? Math.min(1, Math.max(0, currentScrollY / scrollHeight)) : 0;

      setScrollProgress(progress);
      setIsCompact(currentScrollY > 40);

      if (currentScrollY < 80) {
        setIsNavVisible(true);
      } else if (Math.abs(currentScrollY - lastScrollY) >= 8) {
        if (currentScrollY > lastScrollY) {
          setIsNavVisible(false);
        } else {
          setIsNavVisible(true);
        }
      }
      lastScrollY = currentScrollY;
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const isActiveRoute = (path: string) => {
    if (path === '/work') {
      return location.pathname === '/work' || location.pathname.startsWith('/work/');
    }
    return location.pathname === path;
  };

  const activeIndex = navItems.findIndex((item) => isActiveRoute(item.path));

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PORTFOLIO_DATA.profile.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <>
      {/* Accessibility Skip-to-content Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2.5 focus:bg-[var(--text)] focus:text-[#F5F5F0] focus:border focus:border-[var(--text)] font-mono-tech text-xs uppercase tracking-wider font-semibold rounded-none"
      >
        SKIP TO CONTENT
      </a>

      {/* DESKTOP & MOBILE Floating Header Bar */}
      <header
        className="fixed top-4 left-1/2 z-50 w-[min(960px,calc(100%-48px))] transition-transform duration-200 ease-out"
        style={{
          transform: isNavVisible
            ? 'translateX(-50%) translateY(0)'
            : 'translateX(-50%) translateY(-120%)',
        }}
      >
        <div
          className={`relative flex items-center justify-between px-3 sm:px-4 border border-[var(--text)] bg-[rgba(245,245,240,0.85)] backdrop-blur-md rounded-none shadow-none transition-all duration-200 ${
            isCompact ? 'h-[48px]' : 'h-[56px]'
          }`}
          style={{
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
          }}
        >
          {/* Left: K Square + KRIPAKARA */}
          <Link
            to="/"
            className="flex items-center gap-3 shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--text)] rounded-none"
          >
            <span className="w-8 h-8 bg-[var(--text)] text-[#F5F5F0] flex items-center justify-center font-display font-bold text-[18px] leading-none shrink-0 rounded-none">
              K
            </span>
            <span className="font-mono-tech text-[13px] font-semibold tracking-[0.1em] text-[var(--text)] uppercase whitespace-nowrap">
              KRIPAKARA
            </span>
          </Link>

          {/* Center Navigation Links (min-width: 900px) */}
          <nav
            aria-label="Main Navigation"
            className="relative hidden min-[900px]:flex items-center gap-1"
          >
            {navItems.map((item, idx) => {
              const active = isActiveRoute(item.path);
              const isHighlighted =
                (hoveredIndex !== null ? hoveredIndex : activeIndex) === idx;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  aria-current={active ? 'page' : undefined}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`relative px-4 ${
                    isCompact ? 'h-[34px]' : 'h-[40px]'
                  } flex items-center justify-center font-mono-tech text-[13px] font-medium tracking-[0.1em] uppercase whitespace-nowrap transition-colors duration-150 rounded-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--text)] ${
                    isHighlighted
                      ? 'text-[#F5F5F0] font-semibold'
                      : 'text-[#55554F] hover:text-[var(--text)]'
                  }`}
                >
                  {isHighlighted && (
                    <motion.span
                      layoutId="navIndicatorBlock"
                      className="absolute inset-0 bg-[var(--text)] rounded-none -z-10"
                      transition={
                        prefersReducedMotion
                          ? { duration: 0 }
                          : { duration: 0.18, ease: 'easeOut' }
                      }
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* Right Actions (min-width: 900px) */}
          <div className="hidden min-[900px]:flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onOpenCommandPalette}
              className="h-[36px] px-3 border border-[var(--text)] bg-transparent font-mono-tech text-[12px] font-medium text-[var(--text)] hover:bg-[var(--text)] hover:text-[#F5F5F0] transition-colors rounded-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--text)] whitespace-nowrap"
            >
              SEARCH {isMac ? '⌘K' : 'CTRL K'}
            </button>

            <Link
              to="/contact"
              className="h-[40px] px-4 bg-[var(--text)] text-[#F5F5F0] font-mono-tech text-[13px] font-semibold flex items-center justify-center hover:opacity-90 transition-opacity rounded-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--text)] whitespace-nowrap"
            >
              LET'S TALK ↗
            </Link>
          </div>

          {/* Mobile MENU Button (< 900px) */}
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileMenuOpen}
            className="min-[900px]:hidden h-[44px] px-4 border border-[var(--text)] bg-transparent font-mono-tech text-[13px] font-medium text-[var(--text)] hover:bg-[var(--text)] hover:text-[#F5F5F0] transition-colors rounded-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--text)] whitespace-nowrap shrink-0"
          >
            MENU
          </button>

          {/* Scroll Progress Line (1px var(--accent) scaleX at bottom edge) */}
          {!prefersReducedMotion && (
            <div
              className="absolute bottom-0 left-0 right-0 h-[1px] bg-[var(--accent)] origin-left pointer-events-none"
              style={{ transform: `scaleX(${scrollProgress})` }}
            />
          )}
        </div>
      </header>

      {/* MOBILE FULL-SCREEN OVERLAY (< 900px) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            ref={overlayRef}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation Menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={
              prefersReducedMotion ? { duration: 0 } : { duration: 0.2, ease: 'easeOut' }
            }
            className="fixed inset-0 z-[100] bg-[#F5F5F0] text-[var(--text)] flex flex-col justify-between p-6 sm:p-8 overflow-y-auto min-h-screen"
          >
            {/* Top Row */}
            <div className="flex items-center justify-between pb-6 border-b border-[var(--hairline)] font-mono-tech shrink-0">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--text)]"
              >
                <span className="w-8 h-8 bg-[var(--text)] text-[#F5F5F0] flex items-center justify-center font-display font-bold text-[18px] leading-none rounded-none">
                  K
                </span>
                <span className="text-[13px] font-semibold tracking-[0.1em] text-[var(--text)] uppercase">
                  KRIPAKARA
                </span>
              </Link>

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  menuButtonRef.current?.focus();
                }}
                aria-label="Close menu"
                className="h-[44px] px-4 border border-[var(--text)] bg-transparent font-mono-tech text-[13px] font-medium text-[var(--text)] hover:bg-[var(--text)] hover:text-[#F5F5F0] transition-colors rounded-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--text)] shrink-0"
              >
                CLOSE ×
              </button>
            </div>

            {/* Stacked Large Links */}
            <nav className="my-auto py-8 divide-y divide-[var(--hairline)] border-y border-[var(--hairline)]">
              {navItems.map((item, idx) => {
                const active = isActiveRoute(item.path);
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="group flex items-baseline justify-between py-5 min-h-[44px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--text)]"
                  >
                    <div className="flex items-baseline gap-4 sm:gap-6">
                      <span className="font-mono-tech text-sm text-[var(--muted)]">
                        0{idx + 1} /
                      </span>
                      <span
                        className={`font-display text-[clamp(2.5rem,12vw,4rem)] font-semibold leading-none tracking-tight transition-colors ${
                          active
                            ? 'text-[var(--text)] underline underline-offset-8'
                            : 'text-[var(--text)] group-hover:text-[var(--accent)]'
                        }`}
                      >
                        {item.label}
                      </span>
                    </div>
                    <span className="font-mono-tech text-lg text-[var(--muted)] group-hover:text-[var(--text)] transition-colors">
                      ↗
                    </span>
                  </NavLink>
                );
              })}
            </nav>

            {/* Bottom Section */}
            <div className="pt-6 border-t border-[var(--hairline)] flex flex-col gap-4 font-mono-tech text-xs shrink-0">
              <div className="flex items-center gap-2.5 text-[var(--text)] font-semibold tracking-wider uppercase">
                <span className="h-3 w-3 rounded-full bg-[var(--accent)] inline-block shrink-0" />
                <span>OPEN TO WORK · OPEN TO RELOCATE</span>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  aria-label="Copy email address"
                  className="text-[#55554F] hover:text-[var(--text)] transition-colors underline underline-offset-4 font-mono-tech min-h-[44px] flex items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--text)]"
                >
                  {copiedEmail ? 'EMAIL COPIED! ✓' : PORTFOLIO_DATA.profile.email}
                </button>

                <div className="flex items-center gap-6">
                  <a
                    href={PORTFOLIO_DATA.profile.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--text)] hover:text-[var(--accent)] transition-colors font-mono-tech min-h-[44px] flex items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--text)]"
                  >
                    GITHUB ↗
                  </a>
                  <a
                    href={PORTFOLIO_DATA.profile.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--text)] hover:text-[var(--accent)] transition-colors font-mono-tech min-h-[44px] flex items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--text)]"
                  >
                    LINKEDIN ↗
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
