import React from 'react';

export const FilmGrainOverlay: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[90] opacity-[0.04]"
    >
      <svg className="h-full w-full">
        <filter id="editorial-film-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.82"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#editorial-film-grain)" />
      </svg>
    </div>
  );
};
