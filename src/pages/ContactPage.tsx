import React, { useEffect, useState } from 'react';
import { Mail, Github, Linkedin, FileText, Copy, Check, Eye, Download, ExternalLink } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data';

export const ContactPage: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [istTime, setIstTime] = useState<string>('--:--:-- IST');

  useEffect(() => {
    const updateClock = () => {
      try {
        const formatted = new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }).format(new Date());
        setIstTime(`${formatted} IST`);
      } catch {
        setIstTime('14:32:07 IST');
      }
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = async () => {
    const emailToCopy = PORTFOLIO_DATA.profile.email;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(emailToCopy);
      } else {
        throw new Error('Clipboard API unavailable');
      }
    } catch {
      // Fallback selection for browsers/environments with restricted clipboard permissions
      const textArea = document.createElement('textarea');
      textArea.value = emailToCopy;
      textArea.style.position = 'fixed';
      textArea.style.left = '-9999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
      } catch {
        // Fallback silently
      }
      document.body.removeChild(textArea);
    }

    setCopied(true);
    setShowToast(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);

    setTimeout(() => {
      setShowToast(false);
    }, 2000);
  };

  return (
    <div className="mx-auto max-w-[1440px] border-x border-[var(--hairline)]">
      {/* (01) Header Section */}
      <section className="border-b border-[var(--hairline)] px-4 py-7 md:px-8 md:py-10">
        <div className="font-mono-tech text-xs uppercase tracking-widest text-[#55554F] mb-4">
          (01) CONTACT // DIRECT CHANNEL
        </div>

        <h1
          className="font-display font-bold tracking-tighter leading-[0.92] text-[var(--fg)]"
          style={{ fontSize: 'clamp(3.2rem, 7.5vw, 6.75rem)' }}
        >
          LET&apos;S BUILD SOMETHING.
        </h1>

        <div className="mt-8 flex items-center gap-2.5 font-mono-tech text-xs text-[var(--fg)]">
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-75 motion-reduce:animate-none" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[var(--accent)]" />
          </span>
          <span>Open to work · Open to relocate · Mangaluru, India</span>
        </div>
      </section>

      {/* (02) Email Block */}
      <section className="border-b border-[var(--hairline)] px-4 py-7 md:px-8 md:py-10">
        <div className="flex items-center gap-2 font-mono-tech text-xs uppercase tracking-widest text-[#55554F] mb-6">
          <Mail className="w-4 h-4 text-[#55554F]" aria-hidden="true" />
          <span>(02) ELECTRONIC MAIL // CLICK TO COPY</span>
        </div>

        <div className="my-2">
          <button
            type="button"
            onClick={handleCopyEmail}
            className="group relative inline-flex items-center gap-4 text-left font-display font-bold tracking-tighter leading-[1.05] text-[var(--fg)] max-w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
            style={{ fontSize: 'clamp(1.5rem, 5vw, 4rem)' }}
            aria-label="Copy email address"
          >
            <span
              className="break-all flex items-center gap-3 sm:gap-4"
              style={{ fontSize: 'clamp(1.5rem, 5vw, 4rem)', wordBreak: 'break-word' }}
            >
              <Mail className="w-7 h-7 sm:w-10 sm:h-10 shrink-0 text-[var(--fg)] opacity-90 group-hover:scale-105 transition-transform" aria-hidden="true" />
              <span>{copied ? 'COPIED ✓' : PORTFOLIO_DATA.profile.email}</span>
            </span>
            <span
              className="absolute bottom-0 left-0 h-[2px] w-full bg-[var(--fg)] scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100 motion-reduce:transition-none"
              aria-hidden="true"
            />
          </button>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-4 font-mono-tech text-xs">
          <button
            type="button"
            onClick={handleCopyEmail}
            className="inline-flex items-center gap-2 border border-[var(--fg)] bg-[var(--fg)] px-5 py-2.5 uppercase tracking-widest text-[var(--bg)] hover:opacity-85 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
          >
            {copied ? <Check className="w-4 h-4" aria-hidden="true" /> : <Copy className="w-4 h-4" aria-hidden="true" />}
            <span>{copied ? 'COPIED ✓' : 'COPY EMAIL'}</span>
          </button>
          <a
            href={`mailto:${PORTFOLIO_DATA.profile.email}`}
            className="inline-flex items-center gap-2 border border-[var(--hairline)] px-5 py-2.5 uppercase tracking-widest text-[var(--fg)] hover:border-[var(--fg)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
          >
            <Mail className="w-4 h-4" aria-hidden="true" />
            <span>OPEN MAIL CLIENT ↗</span>
          </a>
        </div>
      </section>

      {/* Link Tiles: 3-column grid (stacked on mobile) */}
      <section className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[var(--hairline)] border-b border-[var(--hairline)]">
        {/* (03) GITHUB */}
        <a
          href={PORTFOLIO_DATA.profile.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex min-h-[220px] flex-col justify-between p-6 md:p-8 bg-[var(--bg)] text-[var(--fg)] hover:bg-[var(--fg)] hover:text-[var(--bg)] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
        >
          <div className="flex items-start justify-between gap-4 font-mono-tech text-xs">
            <span className="flex items-center gap-2 uppercase tracking-widest text-[#55554F] group-hover:text-inherit opacity-90 transition-colors">
              <Github className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>(03) GITHUB</span>
            </span>
            <span
              className="text-base font-bold transition-transform duration-200 motion-reduce:transition-none group-hover:translate-x-[4px] group-hover:-translate-y-[4px]"
              aria-hidden="true"
            >
              ↗
            </span>
          </div>

          <div className="my-6 flex items-center gap-3">
            <Github className="w-7 h-7 shrink-0 text-[var(--fg)] group-hover:text-[var(--bg)] transition-colors" aria-hidden="true" />
            <span className="font-display text-xl sm:text-2xl font-bold tracking-tight break-all">
              {PORTFOLIO_DATA.profile.github}
            </span>
          </div>

          <div className="font-mono-tech text-xs uppercase tracking-widest text-[#55554F] group-hover:text-inherit opacity-90 transition-colors">
            REPOSITORIES
          </div>
        </a>

        {/* (04) LINKEDIN */}
        <a
          href={PORTFOLIO_DATA.profile.linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex min-h-[220px] flex-col justify-between p-6 md:p-8 bg-[var(--bg)] text-[var(--fg)] hover:bg-[var(--fg)] hover:text-[var(--bg)] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
        >
          <div className="flex items-start justify-between gap-4 font-mono-tech text-xs">
            <span className="flex items-center gap-2 uppercase tracking-widest text-[#55554F] group-hover:text-inherit opacity-90 transition-colors">
              <Linkedin className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>(04) LINKEDIN</span>
            </span>
            <span
              className="text-base font-bold transition-transform duration-200 motion-reduce:transition-none group-hover:translate-x-[4px] group-hover:-translate-y-[4px]"
              aria-hidden="true"
            >
              ↗
            </span>
          </div>

          <div className="my-6 flex items-center gap-3">
            <Linkedin className="w-7 h-7 shrink-0 text-[var(--fg)] group-hover:text-[var(--bg)] transition-colors" aria-hidden="true" />
            <span className="font-display text-xl sm:text-2xl font-bold tracking-tight break-all">
              {PORTFOLIO_DATA.profile.linkedin}
            </span>
          </div>

          <div className="font-mono-tech text-xs uppercase tracking-widest text-[#55554F] group-hover:text-inherit opacity-90 transition-colors">
            NETWORK
          </div>
        </a>

        {/* (05) RESUME */}
        <div className="flex min-h-[220px] flex-col justify-between p-6 md:p-8 bg-[var(--bg)] text-[var(--fg)]">
          <div className="flex items-start justify-between gap-4 font-mono-tech text-xs">
            <span className="flex items-center gap-2 uppercase tracking-widest text-[#55554F]">
              <FileText className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>(05) RESUME // CV</span>
            </span>
            <span className="font-mono-tech text-[10px] text-[#55554F] uppercase tracking-wider">
              1 PAGE · PDF
            </span>
          </div>

          <div className="my-5">
            <div className="flex items-center gap-3">
              <FileText className="w-7 h-7 shrink-0 text-[var(--fg)]" aria-hidden="true" />
              <span className="font-display text-xl sm:text-2xl font-bold tracking-tight">
                Curriculum Vitae
              </span>
            </div>
            <p className="mt-1 font-mono-tech text-xs text-[#55554F]">
              Kripakara M. N. · Oct 2026
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-2">
            <a
              href={PORTFOLIO_DATA.profile.resumePdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View Kripakara M. N. Resume PDF in a new tab"
              className="flex-1 inline-flex items-center justify-center gap-1.5 border border-[var(--hairline)] px-3 py-2 font-mono-tech text-xs uppercase tracking-wider text-[var(--fg)] hover:border-[var(--fg)] hover:bg-[var(--fg)] hover:text-[var(--bg)] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              <Eye className="w-3.5 h-3.5" aria-hidden="true" />
              <span>VIEW ↗</span>
            </a>
            <a
              href={PORTFOLIO_DATA.profile.resumePdfUrl}
              download="KRIPAKARA_M_N_Resume.pdf"
              aria-label="Download Kripakara M. N. Resume PDF"
              className="flex-1 inline-flex items-center justify-center gap-1.5 border border-[var(--fg)] bg-[var(--fg)] text-[var(--bg)] px-3 py-2 font-mono-tech text-xs uppercase tracking-wider hover:opacity-85 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              <Download className="w-3.5 h-3.5" aria-hidden="true" />
              <span>DOWNLOAD ↓</span>
            </a>
          </div>
        </div>
      </section>


      {/* Small mono toast */}
      {showToast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 border border-[var(--fg)] bg-[var(--fg)] px-4 py-2 font-mono-tech text-xs uppercase tracking-widest text-[var(--bg)] shadow-md"
        >
          COPIED // {PORTFOLIO_DATA.profile.email}
        </div>
      )}
    </div>
  );
};
