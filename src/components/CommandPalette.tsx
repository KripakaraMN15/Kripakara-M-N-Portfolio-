import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PORTFOLIO_DATA } from '../data';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onTriggerSudo: () => void;
}

interface CommandItem {
  id: string;
  group: string;
  label: string;
  hint: string;
  action: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onTriggerSudo,
}) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 20);
    }
  }, [isOpen]);

  const commands: CommandItem[] = useMemo(
    () => [
      {
        id: 'nav-home',
        group: 'PAGES',
        label: 'Go to Home',
        hint: '/',
        action: () => {
          navigate('/');
          onClose();
        },
      },
      {
        id: 'nav-work',
        group: 'PAGES',
        label: 'Go to Selected Work',
        hint: '/work',
        action: () => {
          navigate('/work');
          onClose();
        },
      },
      {
        id: 'nav-experience',
        group: 'PAGES',
        label: 'Go to Experience (git log)',
        hint: '/experience',
        action: () => {
          navigate('/experience');
          onClose();
        },
      },
      {
        id: 'nav-about',
        group: 'PAGES',
        label: 'Go to About (README.md)',
        hint: '/about',
        action: () => {
          navigate('/about');
          onClose();
        },
      },
      {
        id: 'nav-contact',
        group: 'PAGES',
        label: 'Go to Contact',
        hint: '/contact',
        action: () => {
          navigate('/contact');
          onClose();
        },
      },
      ...PORTFOLIO_DATA.projects.map((p) => ({
        id: `proj-${p.slug}`,
        group: 'PROJECTS',
        label: `(${p.index}) ${p.name}`,
        hint: `/work/${p.slug}`,
        action: () => {
          navigate(`/work/${p.slug}`);
          onClose();
        },
      })),
      {
        id: 'action-view-resume',
        group: 'ACTIONS',
        label: 'View Resume PDF in New Tab',
        hint: 'PDF ↗',
        action: () => {
          window.open(PORTFOLIO_DATA.profile.resumePdfUrl, '_blank', 'noopener,noreferrer');
          onClose();
        },
      },
      {
        id: 'action-download-resume',
        group: 'ACTIONS',
        label: 'Download Resume (KRIPAKARAMN_RESUME.pdf)',
        hint: 'DOWNLOAD ↓',
        action: () => {
          const a = document.createElement('a');
          a.href = PORTFOLIO_DATA.profile.resumePdfUrl;
          a.download = 'KRIPAKARAMN_RESUME.pdf';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          onClose();
        },
      },
      {
        id: 'action-copy-email',
        group: 'ACTIONS',
        label: copiedEmail
          ? `COPIED: ${PORTFOLIO_DATA.profile.email}`
          : `Copy Email (${PORTFOLIO_DATA.profile.email})`,
        hint: 'CLIPBOARD',
        action: () => {
          navigator.clipboard?.writeText(PORTFOLIO_DATA.profile.email);
          setCopiedEmail(true);
          setTimeout(() => setCopiedEmail(false), 1800);
        },
      },
      {
        id: 'ext-github',
        group: 'EXTERNAL',
        label: 'Open GitHub Profile',
        hint: `${PORTFOLIO_DATA.profile.github} ↗`,
        action: () => {
          window.open(PORTFOLIO_DATA.profile.githubUrl, '_blank', 'noopener,noreferrer');
          onClose();
        },
      },
      {
        id: 'ext-linkedin',
        group: 'EXTERNAL',
        label: 'Open LinkedIn Profile',
        hint: `${PORTFOLIO_DATA.profile.linkedin} ↗`,
        action: () => {
          window.open(PORTFOLIO_DATA.profile.linkedinUrl, '_blank', 'noopener,noreferrer');
          onClose();
        },
      },
      {
        id: 'easter-sudo',
        group: 'SYSTEM',
        label: 'Execute sudo (Root Terminal Override)',
        hint: 'SUDO',
        action: () => {
          onClose();
          onTriggerSudo();
        },
      },
    ],
    [copiedEmail, navigate, onClose, onTriggerSudo]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter(
      (c) =>
        c.label.toLowerCase().includes(q) ||
        c.group.toLowerCase().includes(q) ||
        c.hint.toLowerCase().includes(q)
    );
  }, [commands, query]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (filtered.length ? (prev + 1) % filtered.length : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) =>
          filtered.length ? (prev - 1 + filtered.length) % filtered.length : 0
        );
      } else if (e.key === 'Enter' && filtered[selectedIndex]) {
        e.preventDefault();
        filtered[selectedIndex].action();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [filtered, isOpen, onClose, selectedIndex]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 backdrop-blur-[2px] px-4 pt-[12vh] font-mono-tech"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl border border-[var(--fg)] bg-[var(--bg)] text-[var(--fg)] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[var(--hairline)] px-4 py-2.5 text-[11px] uppercase tracking-widest text-[#55554F]">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
            <span>COMMAND PALETTE // QUICK NAVIGATION</span>
          </div>
          <span>ESC TO CLOSE</span>
        </div>

        <div className="border-b border-[var(--hairline)] px-4 py-3">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command, route, project, or action..."
            className="w-full bg-transparent text-sm text-[var(--fg)] placeholder-[#55554F] focus:outline-none"
          />
        </div>

        <div className="max-h-[380px] overflow-y-auto divide-y divide-[var(--hairline)]">
          {filtered.length === 0 ? (
            <div className="px-4 py-8 text-center text-xs text-[#55554F]">
              No matching commands found.
            </div>
          ) : (
            filtered.map((item, idx) => {
              const active = idx === selectedIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  onMouseEnter={() => setSelectedIndex(idx)}
                  onClick={item.action}
                  className={`flex w-full items-center justify-between px-4 py-3 text-left text-xs transition-colors ${
                    active
                      ? 'bg-[var(--fg)] text-[var(--bg)]'
                      : 'bg-[var(--bg)] text-[var(--fg)]'
                  }`}
                >
                  <div className="flex items-center gap-3 truncate pr-4">
                    <span
                      className={`text-[10px] uppercase tracking-widest ${
                        active ? 'text-[var(--bg)]/70' : 'text-[#55554F]'
                      }`}
                    >
                      [{item.group}]
                    </span>
                    <span className="truncate">{item.label}</span>
                  </div>
                  <span
                    className={`shrink-0 text-[11px] ${
                      active ? 'text-[var(--bg)]/80' : 'text-[#55554F]'
                    }`}
                  >
                    {item.hint}
                  </span>
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
