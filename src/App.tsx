import React, { useEffect, useState } from 'react';
import {
  BrowserRouter,
  HashRouter,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { TopBar } from './components/TopBar';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { FilmGrainOverlay } from './components/FilmGrainOverlay';
import { CommandPalette } from './components/CommandPalette';
import { SudoEasterEgg } from './components/SudoEasterEgg';
import { BootSequence } from './components/BootSequence';
import { HomePage } from './pages/HomePage';
import { WorkPage } from './pages/WorkPage';
import { CaseStudyPage } from './pages/CaseStudyPage';
import { ExperiencePage } from './pages/ExperiencePage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { OgCardPage } from './pages/OgCardPage';
import { PORTFOLIO_DATA } from './data';
import { USE_HASH_ROUTER } from './config';

const ScrollToTop: React.FC = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
};

const LegacyHashRedirect: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!USE_HASH_ROUTER && typeof window !== 'undefined') {
      const hash = window.location.hash;
      if (hash && hash.startsWith('#/')) {
        const cleanPath = hash.replace(/^#/, '');
        navigate(cleanPath, { replace: true });
      }
    }
  }, [navigate]);

  return null;
};

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    if (path === '/') {
      document.title = 'Kripakara M. N. — Software Engineer';
    } else if (path === '/work') {
      document.title = 'Work — Kripakara M. N.';
    } else if (path.startsWith('/work/')) {
      const slug = path.replace('/work/', '');
      const project = PORTFOLIO_DATA.projects.find((p) => p.slug === slug);
      if (project) {
        document.title = `${project.name} — Kripakara M. N.`;
      } else {
        document.title = 'Work — Kripakara M. N.';
      }
    } else if (path === '/experience') {
      document.title = 'Experience — Kripakara M. N.';
    } else if (path === '/about') {
      document.title = 'About — Kripakara M. N.';
    } else if (path === '/contact') {
      document.title = 'Contact — Kripakara M. N.';
    } else if (path === '/og') {
      document.title = 'OG Preview Card (1200x630) — Kripakara M. N.';
    } else {
      document.title = 'Page Not Found — Kripakara M. N.';
    }
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      <motion.main
        id="main-content"
        tabIndex={-1}
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
        className="min-h-[calc(100vh-120px)] pt-20 sm:pt-24 focus:outline-none"
      >
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/work/:slug" element={<CaseStudyPage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/og" element={<OgCardPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </motion.main>
    </AnimatePresence>
  );
};

const AppContent: React.FC = () => {
  const location = useLocation();
  const isOgPage = location.pathname === '/og';

  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [sudoOpen, setSudoOpen] = useState(false);
  const [bootComplete, setBootComplete] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    const hasSeenBoot = Boolean(sessionStorage.getItem('kripakara_boot_done'));
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return hasSeenBoot || prefersReducedMotion;
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (isOgPage) {
    return (
      <Routes>
        <Route path="/og" element={<OgCardPage />} />
      </Routes>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)] selection:bg-[var(--accent)] selection:text-[#F5F5F0]">
      {!bootComplete && (
        <BootSequence onComplete={() => setBootComplete(true)} />
      )}
      <CustomCursor />
      <FilmGrainOverlay />

      <TopBar
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
      />

      <AnimatedRoutes />

      <Footer />

      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onTriggerSudo={() => setSudoOpen(true)}
      />

      <SudoEasterEgg
        isOpen={sudoOpen}
        onTrigger={() => setSudoOpen(true)}
        onClose={() => setSudoOpen(false)}
      />
    </div>
  );
};

export default function App() {
  const Router = USE_HASH_ROUTER ? HashRouter : BrowserRouter;

  return (
    <Router basename="/">
      <ScrollToTop />
      <LegacyHashRedirect />
      <AppContent />
    </Router>
  );
}
