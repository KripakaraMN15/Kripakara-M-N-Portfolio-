import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const BOOT_LINES = [
  'loading profile...',
  'mounting projects [4/4]',
  'initializing system...',
  'ready',
];

interface BootSequenceProps {
  onComplete: () => void;
}

export const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [isWiping, setIsWiping] = useState(false);

  useEffect(() => {
    // Respect prefers-reduced-motion or already seen session flag
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasSeenBoot = Boolean(sessionStorage.getItem('kripakara_boot_done'));

    if (prefersReducedMotion || hasSeenBoot) {
      onComplete();
      return;
    }

    let isCancelled = false;

    const skip = () => {
      if (isCancelled) return;
      isCancelled = true;
      sessionStorage.setItem('kripakara_boot_done', 'true');
      setIsWiping(true);
      setTimeout(onComplete, 260);
    };

    const timers = [
      setTimeout(() => !isCancelled && setVisibleLines([BOOT_LINES[0]]), 250),
      setTimeout(() => !isCancelled && setVisibleLines([BOOT_LINES[0], BOOT_LINES[1]]), 950),
      setTimeout(() => !isCancelled && setVisibleLines([BOOT_LINES[0], BOOT_LINES[1], BOOT_LINES[2]]), 1700),
      setTimeout(() => !isCancelled && setVisibleLines([...BOOT_LINES]), 2400),
      setTimeout(() => {
        if (!isCancelled) skip();
      }, 3000),
    ];

    const handleKeyDown = () => skip();
    const handleClick = () => skip();

    window.addEventListener('keydown', handleKeyDown, { once: true });
    window.addEventListener('pointerdown', handleClick, { once: true });

    return () => {
      isCancelled = true;
      timers.forEach(clearTimeout);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('pointerdown', handleClick);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isWiping && (
        <motion.div
          key="boot-curtain"
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[120] flex flex-col justify-between bg-[var(--bg)] text-[var(--fg)] p-6 md:p-12 font-mono-tech text-xs select-none"
        >
          <div className="flex items-center justify-between text-[#55554F] text-[11px] uppercase tracking-widest border-b border-[var(--hairline)] pb-3">
            <span>SYS.BOOT // KRIPAKARA-ENGINE</span>
            <span className="inline-flex items-center gap-1.5 font-semibold text-[var(--fg)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
              INIT
            </span>
          </div>

          <div className="space-y-3.5 my-auto max-w-xl">
            {visibleLines.map((line, idx) => {
              const isLast = idx === visibleLines.length - 1;
              const isReady = line === 'ready';
              return (
                <div key={idx} className="flex items-center gap-3">
                  <span className="text-[#55554F] text-[10px]">[{idx + 1}/4]</span>
                  <span className={isReady ? 'font-semibold uppercase tracking-wider text-[var(--fg)]' : 'text-[var(--fg)]'}>
                    {line}
                  </span>
                  {isLast && !isReady && (
                    <span className="inline-block h-3.5 w-1.5 bg-[var(--fg)] animate-pulse" />
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-[#55554F] text-[10px] uppercase tracking-widest border-t border-[var(--hairline)] pt-3">
            <span>PRESS ANY KEY OR CLICK TO SKIP</span>
            <span>3.0s</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
