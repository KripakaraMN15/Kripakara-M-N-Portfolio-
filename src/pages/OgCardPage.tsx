import React, { useEffect } from 'react';

export const OgCardPage: React.FC = () => {
  useEffect(() => {
    document.title = 'OG Preview Card (1200x630) — Kripakara M. N.';
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#141413] flex items-center justify-center p-4 overflow-hidden select-none">
      {/* Fixed 1200x630 Social Preview Card */}
      <div
        id="og-card"
        className="relative w-[1200px] h-[630px] bg-[#F5F5F0] text-[#0A0A0A] overflow-hidden shrink-0 shadow-2xl"
        style={{ width: '1200px', height: '630px' }}
      >
        {/* Inset 24px Hairline Border */}
        <div
          className="absolute inset-[24px] border border-[rgba(10,10,10,0.18)] pointer-events-none z-20"
          aria-hidden="true"
        />

        {/* Faint 3% Film-Grain Overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-30 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.12'/%3E%3C/svg%3E")`,
          }}
          aria-hidden="true"
        />

        {/* Right Side Portrait Image */}
        <div className="absolute bottom-0 right-0 w-[520px] h-[600px] pointer-events-none z-0 overflow-hidden">
          <img
            src="/hero-portrait.webp"
            onError={(e) => {
              // Fallback to PNG if webp fails
              (e.currentTarget as HTMLImageElement).src = '/Hero-portrait.png';
            }}
            alt="Kripakara M. N. - Portrait"
            className="w-full h-full object-cover object-bottom"
            style={{
              mixBlendMode: 'multiply',
              filter: 'brightness(1.05) contrast(1.04)',
              maskImage:
                'linear-gradient(to right, transparent 0%, black 35%), linear-gradient(to bottom, transparent 0%, black 15%, black 88%, transparent 96%)',
              WebkitMaskImage:
                'linear-gradient(to right, transparent 0%, black 35%), linear-gradient(to bottom, transparent 0%, black 15%, black 88%, transparent 96%)',
              maskComposite: 'intersect',
              WebkitMaskComposite: 'destination-in',
            }}
          />
        </div>

        {/* Centered Safe Area Container (1000x500px) */}
        <div className="absolute inset-0 m-auto w-[1000px] h-[500px] flex flex-col justify-between z-10 pointer-events-none">
          {/* Top Row: Mono Label */}
          <div className="flex items-center justify-between">
            <span className="font-mono-tech text-[16px] font-semibold tracking-[0.1em] text-[#0A0A0A] uppercase">
              KRIPAKARA M. N.
            </span>
          </div>

          {/* Left Column (Max-width 600px): Headline & Subtitle */}
          <div className="max-w-[600px] my-auto">
            <h1
              className="font-display font-semibold text-[76px] leading-[0.95] tracking-[-0.04em] text-[#0A0A0A]"
              style={{ fontSize: '76px', lineHeight: '0.95', letterSpacing: '-0.04em' }}
            >
              I build AI agents{' '}
              <br />
              that{' '}
              <span
                className="font-normal"
                style={{
                  WebkitTextStroke: '2px #0A0A0A',
                  color: 'transparent',
                }}
              >
                ship.
              </span>
            </h1>

            <p className="mt-6 font-display text-[20px] font-normal text-[#55554F] leading-snug">
              Software Engineer · AI Agents, LLMs &amp; Backend Systems
            </p>
          </div>

          {/* Bottom Row: Green Dot + OPEN TO WORK + Domain */}
          <div className="flex items-center gap-6 font-mono-tech text-[14px] uppercase tracking-wider text-[#0A0A0A]">
            <div className="flex items-center gap-2.5">
              <span className="h-3 w-3 rounded-full bg-[#008F3A] inline-block shrink-0" />
              <span className="font-semibold text-[#0A0A0A]">OPEN TO WORK</span>
            </div>
            <span className="text-[#55554F]/40">•</span>
            <span className="text-[#55554F] font-normal tracking-[0.05em] lowercase">
              kripakara-mn.ai.studio
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
