import React, { useEffect, useState } from 'react';
import { PORTFOLIO_DATA } from '../data';

interface SudoEasterEggProps {
  isOpen: boolean;
  onTrigger: () => void;
  onClose: () => void;
}

const KONAMI_SEQUENCE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
];

export const SudoEasterEgg: React.FC<SudoEasterEggProps> = ({
  isOpen,
  onTrigger,
  onClose,
}) => {
  const [commandInput, setCommandInput] = useState('');
  const [logs, setLogs] = useState<string[]>([
    'root@kripakara-mn-node:~# sudo su -',
    '[sudo] password for visitor: **********',
    'ACCESS GRANTED // KERNEL: AI-ENG-PRIVACY-FIRST-v2026',
    'Loaded ensemble weights: ALBERT-46MB (98.48% acc @ 56ms)',
    'Loaded LangGraph supervisor: 5 agents / 9 nodes / 3 MCP transports',
    'WARNING: Coffee reservoir at 14%. Hallucination guardrails locked at 0.00%.',
    "Type 'help', 'hire', 'metrics', or 'exit' below.",
  ]);

  useEffect(() => {
    let sudoBuffer = '';
    let konamiIndex = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isInput =
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable);

      if (e.key === 'Escape' && isOpen) {
        onClose();
        return;
      }

      if (isInput || isOpen) return;

      const expectedKey = KONAMI_SEQUENCE[konamiIndex];
      if (
        e.key === expectedKey ||
        e.key.toLowerCase() === expectedKey.toLowerCase()
      ) {
        konamiIndex += 1;
        if (konamiIndex === KONAMI_SEQUENCE.length) {
          konamiIndex = 0;
          onTrigger();
          return;
        }
      } else {
        konamiIndex = 0;
      }

      if (e.key.length === 1) {
        sudoBuffer = (sudoBuffer + e.key.toLowerCase()).slice(-4);
        if (sudoBuffer === 'sudo') {
          sudoBuffer = '';
          onTrigger();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onTrigger]);

  const handleTerminalCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = commandInput.trim().toLowerCase();
    if (!cmd) return;
    setCommandInput('');

    if (cmd === 'exit' || cmd === 'quit' || cmd === 'q') {
      onClose();
      return;
    }

    if (cmd === 'clear') {
      setLogs([]);
      return;
    }

    let reply = `bash: ${cmd}: command not found. Try 'help', 'hire', 'metrics', or 'exit'.`;
    if (cmd === 'help') {
      reply =
        'Available root commands: hire | metrics | stack | whoami | clear | exit';
    } else if (cmd === 'hire') {
      reply = `DISPATCHING OFFER PACKET -> ${PORTFOLIO_DATA.profile.email} (${PORTFOLIO_DATA.profile.phone}) // Status: ${PORTFOLIO_DATA.profile.status}`;
    } else if (cmd === 'metrics') {
      reply =
        '98.48% Voice Acc (Samsung) | 56ms Detection / 24ms Seg | 5,500+ Students (CodeIO) | ~80% Faster Charts (LiveDataViz)';
    } else if (cmd === 'stack') {
      reply = PORTFOLIO_DATA.skills
        .map((s) => `${s.category}: ${s.items.map((i) => i.name).join(', ')}`)
        .join(' // ');
    } else if (cmd === 'whoami') {
      reply = `${PORTFOLIO_DATA.profile.name} — ${PORTFOLIO_DATA.profile.subtitle}`;
    }

    setLogs((prev) => [...prev, `root@kripakara-mn-node:~# ${cmd}`, reply]);
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Root Terminal Easter Egg"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-[2px] p-4 font-mono-tech"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl border border-[var(--fg)] bg-[var(--bg)] p-6 text-[var(--fg)] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between border-b border-[var(--hairline)] pb-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
            <span className="uppercase tracking-widest text-[var(--fg)]">
              SUDO // ROOT TERMINAL OVERRIDE
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="border border-[var(--hairline)] px-2 py-0.5 text-[11px] uppercase text-[var(--fg)] hover:bg-[var(--fg)] hover:text-[var(--bg)] transition-colors"
          >
            ESC
          </button>
        </div>

        <div className="mb-4 max-h-[280px] overflow-y-auto space-y-2 text-xs leading-relaxed">
          {logs.map((line, i) => (
            <div
              key={i}
              className={
                line.startsWith('root@') ? 'text-[#55554F]' : 'text-[var(--fg)]'
              }
            >
              {line}
            </div>
          ))}
        </div>

        <form onSubmit={handleTerminalCommand} className="flex items-center gap-2 border-t border-[var(--hairline)] pt-3">
          <span className="text-xs font-semibold text-[var(--fg)]">root@kripakara:~#</span>
          <input
            type="text"
            autoFocus
            value={commandInput}
            onChange={(e) => setCommandInput(e.target.value)}
            placeholder="type 'hire', 'metrics', or 'exit'..."
            className="flex-1 bg-transparent text-xs text-[var(--fg)] placeholder-[#55554F] focus:outline-none"
          />
        </form>
      </div>
    </div>
  );
};
