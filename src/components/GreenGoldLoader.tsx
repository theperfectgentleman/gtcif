import React from 'react';

type GreenGoldLoaderProps = {
  title?: string;
  subtitle?: string;
};

export default function GreenGoldLoader({
  title = "GHANA'S GREEN GOLD",
  subtitle = 'Loading…',
}: GreenGoldLoaderProps) {
  return (
    <div className="fixed inset-0 z-[9999] grid place-items-center bg-brand-black text-brand-gold">
      <div className="flex flex-col items-center gap-4 px-6">
        <svg
          width="820"
          height="220"
          viewBox="0 0 820 220"
          role="img"
          aria-label={`${title} loading`}
          className="max-w-[92vw]"
        >
          <defs>
            {/*
              Mask logic:
              - White parts reveal the filled text.
              - We animate a rising block + a subtle wave edge.
            */}
            <mask id="waterMask">
              <rect x="0" y="0" width="820" height="220" fill="black" />

              {/* Rising fill level */}
              <rect
                className="gg-waterLevel"
                x="0"
                y="220"
                width="820"
                height="260"
                fill="white"
              />

              {/* Wave edge */}
              <path
                className="gg-wave"
                d="M 0 140
                   C 70 132, 140 148, 210 140
                   C 280 132, 350 148, 420 140
                   C 490 132, 560 148, 630 140
                   C 700 132, 770 148, 820 140
                   L 820 260 L 0 260 Z"
                fill="white"
              />
            </mask>

            {/* Softens the edge so it feels like liquid, not a hard cut */}
            <filter id="gg-soften">
              <feGaussianBlur stdDeviation="0.9" />
            </filter>

            {/* Subtle shimmer band that moves horizontally */}
            <linearGradient id="gg-shimmer" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
              <stop offset="45%" stopColor="currentColor" stopOpacity="0.20" />
              <stop offset="55%" stopColor="currentColor" stopOpacity="0.20" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
            </linearGradient>

            {/* Slight text glow for richness (kept restrained) */}
            <filter id="gg-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* OUTLINE */}
          <text
            x="50%"
            y="54%"
            textAnchor="middle"
            dominantBaseline="middle"
            fontFamily="var(--font-loader, ui-serif, Georgia, 'Times New Roman', serif)"
            fontSize="64"
            letterSpacing="2"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinejoin="round"
            opacity="0.95"
          >
            {title}
          </text>

          {/* FILLED (MASKED) */}
          <g mask="url(#waterMask)" filter="url(#gg-soften)">
            <text
              x="50%"
              y="54%"
              textAnchor="middle"
              dominantBaseline="middle"
              fontFamily="var(--font-loader, ui-serif, Georgia, 'Times New Roman', serif)"
              fontSize="64"
              letterSpacing="2"
              fill="currentColor"
              filter="url(#gg-glow)"
            >
              {title}
            </text>

            {/* Shimmer sweep across the filled area */}
            <rect
              className="gg-shimmer"
              x="-240"
              y="0"
              width="240"
              height="220"
              fill="url(#gg-shimmer)"
              opacity="0.9"
            />
          </g>

          <style>{`
            .gg-waterLevel {
              animation: gg-rise 2.6s cubic-bezier(0.2, 0.7, 0.1, 1) infinite;
              transform-origin: 0 0;
            }

            .gg-wave {
              animation: gg-waveMove 1.35s ease-in-out infinite;
              opacity: 0.72;
            }

            .gg-shimmer {
              animation: gg-shimmerMove 1.9s ease-in-out infinite;
              mix-blend-mode: screen;
            }

            @keyframes gg-rise {
              0% {
                transform: translateY(0px);
              }
              100% {
                transform: translateY(-220px);
              }
            }

            @keyframes gg-waveMove {
              0% {
                transform: translateX(0px) translateY(0px);
              }
              50% {
                transform: translateX(-22px) translateY(-2px);
              }
              100% {
                transform: translateX(0px) translateY(0px);
              }
            }

            @keyframes gg-shimmerMove {
              0% {
                transform: translateX(0px);
                opacity: 0.0;
              }
              20% {
                opacity: 0.55;
              }
              50% {
                opacity: 0.3;
              }
              100% {
                transform: translateX(1120px);
                opacity: 0.0;
              }
            }

            @media (prefers-reduced-motion: reduce) {
              .gg-waterLevel,
              .gg-wave,
              .gg-shimmer {
                animation: none;
              }
            }
          `}</style>
        </svg>

        <div className="text-center">
          <div
            className="text-xs uppercase"
            style={{ letterSpacing: '0.35em', color: 'rgba(176, 141, 42, 0.8)' }}
          >
            {subtitle}
          </div>
          <div
            className="mt-2 h-px w-56"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(176, 141, 42, 0.55), transparent)' }}
          />
          <div className="mt-2 text-[11px] tracking-wide" style={{ color: 'rgba(29, 107, 45, 0.72)' }}>
            Tree Crops Development Authority
          </div>
        </div>
      </div>
    </div>
  );
}
