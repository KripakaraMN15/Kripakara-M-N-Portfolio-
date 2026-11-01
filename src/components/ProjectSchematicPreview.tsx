import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

interface ProjectSchematicPreviewProps {
  type: 'contractbreaker' | 'vera' | 'billara' | 'livedataviz' | 'tripbuddy';
  inverted?: boolean;
  className?: string;
  isHovered?: boolean;
}

const getSchematicTitle = (t: ProjectSchematicPreviewProps['type']) => {
  switch (t) {
    case 'contractbreaker':
      return 'CONTRACTBREAKER_PIPELINE';
    case 'vera':
      return 'VERA_TOPOLOGY';
    case 'billara':
      return 'BILLARAAI_TOPOLOGY';
    case 'livedataviz':
      return 'LIVEDATAVIZ_TOPOLOGY';
    case 'tripbuddy':
      return 'TRIPBUDDY_TOPOLOGY';
  }
};

export const ProjectSchematicPreview: React.FC<ProjectSchematicPreviewProps> = ({
  type,
  inverted = false,
  className = '',
  isHovered = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.25 });
  const [activeStep, setActiveStep] = useState(type === 'contractbreaker' ? 4 : 0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Default highlighted box when not hovered (VERVIY = 4 for contractbreaker, else 0)
  const defaultStep = type === 'contractbreaker' ? 4 : 0;

  // Sequential highlight moving across pipeline boxes every 400ms when hovered
  useEffect(() => {
    if (prefersReducedMotion) return;
    const shouldAnimate = isHovered !== undefined ? isHovered : isInView;
    if (shouldAnimate) {
      const maxSteps = type === 'tripbuddy' ? 7 : type === 'contractbreaker' ? 5 : 4;
      const interval = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % maxSteps);
      }, 400);
      return () => clearInterval(interval);
    } else {
      setActiveStep(defaultStep);
    }
  }, [isHovered, isInView, prefersReducedMotion, type, defaultStep]);

  // Fixed colors as specified
  const baseStroke = '#0A0A0A';
  const mutedStroke = '#55554F';
  const signalGreen = '#008F3A';
  const panelBg = '#F5F5F0';

  const isAnimated = !prefersReducedMotion && (isHovered !== undefined ? isHovered : isInView);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden border border-[rgba(10,10,10,0.18)] bg-[${panelBg}] p-4 font-mono-tech ${className}`}
      style={{ backgroundColor: panelBg }}
    >
      <div className="mb-2 flex items-center justify-between border-b border-[rgba(10,10,10,0.18)] pb-1.5 text-[10px] uppercase tracking-widest text-[#55554F]">
        <div className="flex items-center gap-2">
          <span>FIG // {getSchematicTitle(type)}</span>
        </div>
      </div>

      {type === 'contractbreaker' && (
        <svg
          viewBox="0 0 360 195"
          className="h-full w-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background grid lines */}
          <line x1="0" y1="52" x2="360" y2="52" stroke={mutedStroke} strokeOpacity="0.15" strokeDasharray="2 2" />
          <line x1="0" y1="102" x2="360" y2="102" stroke={mutedStroke} strokeOpacity="0.15" strokeDasharray="2 2" />

          {/* 1. ANALYZE */}
          <rect
            x="6"
            y="32"
            width="58"
            height="40"
            stroke={activeStep === 0 ? signalGreen : baseStroke}
            strokeWidth={activeStep === 0 ? '1.8' : '1.2'}
            fill={activeStep === 0 ? 'rgba(0, 143, 58, 0.10)' : 'none'}
          />
          <text
            x="35"
            y="57"
            textAnchor="middle"
            fill={baseStroke}
            fontSize="10"
            fontFamily="JetBrains Mono"
          >
            ANALYZE
          </text>

          {/* Arrow 1 */}
          <line x1="64" y1="52" x2="72" y2="52" stroke={baseStroke} strokeWidth="1.2" />
          <polygon points="72,52 68,49 68,55" fill={baseStroke} />
          {isAnimated && (
            <circle r="1.8" fill={signalGreen}>
              <animate attributeName="cx" from="64" to="72" dur="1.6s" repeatCount="indefinite" />
              <animate attributeName="cy" from="52" to="52" dur="1.6s" repeatCount="indefinite" />
            </circle>
          )}

          {/* 2. HYPOTHESIZE */}
          <rect
            x="74"
            y="32"
            width="74"
            height="40"
            stroke={activeStep === 1 ? signalGreen : baseStroke}
            strokeWidth={activeStep === 1 ? '1.8' : '1.2'}
            fill={activeStep === 1 ? 'rgba(0, 143, 58, 0.10)' : 'none'}
          />
          <text
            x="111"
            y="57"
            textAnchor="middle"
            fill={baseStroke}
            fontSize="10"
            fontFamily="JetBrains Mono"
          >
            HYPOTHESIZE
          </text>

          {/* Arrow 2 */}
          <line x1="148" y1="52" x2="156" y2="52" stroke={baseStroke} strokeWidth="1.2" />
          <polygon points="156,52 152,49 152,55" fill={baseStroke} />
          {isAnimated && (
            <circle r="1.8" fill={signalGreen}>
              <animate attributeName="cx" from="148" to="156" dur="1.6s" repeatCount="indefinite" />
              <animate attributeName="cy" from="52" to="52" dur="1.6s" repeatCount="indefinite" />
            </circle>
          )}

          {/* 3. APPROVE */}
          <rect
            x="158"
            y="32"
            width="58"
            height="40"
            stroke={activeStep === 2 ? signalGreen : baseStroke}
            strokeWidth={activeStep === 2 ? '1.8' : '1.2'}
            fill={activeStep === 2 ? 'rgba(0, 143, 58, 0.10)' : 'none'}
          />
          <text
            x="187"
            y="57"
            textAnchor="middle"
            fill={baseStroke}
            fontSize="10"
            fontFamily="JetBrains Mono"
          >
            APPROVE
          </text>

          {/* Arrow 3 */}
          <line x1="216" y1="52" x2="224" y2="52" stroke={baseStroke} strokeWidth="1.2" />
          <polygon points="224,52 220,49 220,55" fill={baseStroke} />
          {isAnimated && (
            <circle r="1.8" fill={signalGreen}>
              <animate attributeName="cx" from="216" to="224" dur="1.6s" repeatCount="indefinite" />
              <animate attributeName="cy" from="52" to="52" dur="1.6s" repeatCount="indefinite" />
            </circle>
          )}

          {/* 4. EXECUTE */}
          <rect
            x="226"
            y="32"
            width="58"
            height="40"
            stroke={activeStep === 3 ? signalGreen : baseStroke}
            strokeWidth={activeStep === 3 ? '1.8' : '1.2'}
            fill={activeStep === 3 ? 'rgba(0, 143, 58, 0.10)' : 'none'}
          />
          <text
            x="255"
            y="57"
            textAnchor="middle"
            fill={baseStroke}
            fontSize="10"
            fontFamily="JetBrains Mono"
          >
            EXECUTE
          </text>

          {/* Line down to Fault Tag */}
          <line x1="255" y1="72" x2="255" y2="88" stroke={baseStroke} strokeWidth="1.2" />
          <polygon points="255,88 252,84 258,84" fill={baseStroke} />

          {/* Fault Tag under EXECUTE */}
          <rect
            x="186"
            y="90"
            width="138"
            height="24"
            stroke={mutedStroke}
            strokeWidth="1.2"
            strokeDasharray="2 2"
            fill="none"
          />
          <text
            x="255"
            y="106"
            textAnchor="middle"
            fill={baseStroke}
            fontSize="10"
            fontFamily="JetBrains Mono"
          >
            FAULT: RESPONSE DROPPED
          </text>

          {/* Arrow 4 */}
          <line x1="284" y1="52" x2="294" y2="52" stroke={baseStroke} strokeWidth="1.2" />
          <polygon points="294,52 290,49 290,55" fill={baseStroke} />
          {isAnimated && (
            <circle r="1.8" fill={signalGreen}>
              <animate attributeName="cx" from="284" to="294" dur="1.6s" repeatCount="indefinite" />
              <animate attributeName="cy" from="52" to="52" dur="1.6s" repeatCount="indefinite" />
            </circle>
          )}

          {/* 5. VERIFY */}
          <rect
            x="296"
            y="32"
            width="58"
            height="40"
            stroke={activeStep === 4 ? signalGreen : baseStroke}
            strokeWidth={activeStep === 4 ? '1.8' : '1.2'}
            fill={activeStep === 4 ? 'rgba(0, 143, 58, 0.10)' : 'none'}
          />
          <text
            x="325"
            y="57"
            textAnchor="middle"
            fill={baseStroke}
            fontSize="10"
            fontFamily="JetBrains Mono"
          >
            VERIFY
          </text>

          {/* Line down to Outcomes */}
          <line x1="325" y1="72" x2="325" y2="88" stroke={baseStroke} strokeWidth="1.2" />
          <polygon points="325,88 322,84 328,84" fill={baseStroke} />

          {/* Outcomes box under VERIFY */}
          <g transform="translate(230, 122)">
            <rect
              x="0"
              y="0"
              width="124"
              height="44"
              stroke={activeStep === 4 ? signalGreen : baseStroke}
              strokeWidth="1.2"
              fill={activeStep === 4 ? 'rgba(0, 143, 58, 0.08)' : 'none'}
            />
            <text x="8" y="14" fill={baseStroke} fontSize="10" fontFamily="JetBrains Mono">
              • CONFIRMED
            </text>
            <text x="8" y="27" fill={mutedStroke} fontSize="10" fontFamily="JetBrains Mono">
              • NOT_REPRODUCED
            </text>
            <text x="8" y="40" fill={mutedStroke} fontSize="10" fontFamily="JetBrains Mono">
              • INCONCLUSIVE
            </text>
          </g>

          {/* Footer note */}
          <text x="6" y="182" fill={mutedStroke} fontSize="10" fontFamily="JetBrains Mono">
            DETERMINISTIC CAUSAL VERIFIER // AST EXTRACTOR &amp; REPLAY
          </text>
        </svg>
      )}

      {type === 'vera' && (
        <svg
          viewBox="0 0 360 195"
          className="h-full w-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line x1="0" y1="45" x2="360" y2="45" stroke={mutedStroke} strokeOpacity="0.2" strokeDasharray="2 2" />
          <line x1="0" y1="90" x2="360" y2="90" stroke={mutedStroke} strokeOpacity="0.2" strokeDasharray="2 2" />
          <line x1="0" y1="135" x2="360" y2="135" stroke={mutedStroke} strokeOpacity="0.2" strokeDasharray="2 2" />

          {/* Context Store Box */}
          <rect
            x="12"
            y="28"
            width="84"
            height="52"
            stroke={activeStep === 0 ? signalGreen : baseStroke}
            strokeWidth={activeStep === 0 ? '1.8' : '1.2'}
            fill={activeStep === 0 ? 'rgba(0, 143, 58, 0.10)' : 'none'}
          />
          <text x="20" y="48" fill={baseStroke} fontSize="10" fontFamily="JetBrains Mono">
            CTX_STORE
          </text>
          <text x="20" y="65" fill={mutedStroke} fontSize="10" fontFamily="JetBrains Mono">
            IDEMPOTENT
          </text>

          {/* Arrow 1 */}
          <line x1="96" y1="54" x2="130" y2="54" stroke={baseStroke} strokeWidth="1.2" />
          <polygon points="130,54 124,50 124,58" fill={baseStroke} />
          {isAnimated && (
            <circle r="2" fill={signalGreen}>
              <animate attributeName="cx" from="96" to="128" dur="1.6s" repeatCount="indefinite" />
              <animate attributeName="cy" from="54" to="54" dur="1.6s" repeatCount="indefinite" />
            </circle>
          )}

          {/* Policy Scorer */}
          <rect
            x="132"
            y="20"
            width="96"
            height="68"
            stroke={activeStep === 1 ? signalGreen : baseStroke}
            strokeWidth={activeStep === 1 ? '1.8' : '1.2'}
            fill={activeStep === 1 ? 'rgba(0, 143, 58, 0.10)' : 'none'}
          />
          <text x="140" y="36" fill={baseStroke} fontSize="10" fontFamily="JetBrains Mono">
            POLICY: 20/TICK
          </text>
          {Array.from({ length: 10 }).map((_, idx) => (
            <rect
              key={idx}
              x={140 + (idx % 5) * 16}
              y={44 + Math.floor(idx / 5) * 16}
              width="11"
              height="11"
              stroke={activeStep === 1 ? signalGreen : baseStroke}
              fill={idx === 2 ? signalGreen : 'none'}
              strokeWidth="1"
            />
          ))}

          {/* Arrow 2 */}
          <line x1="228" y1="54" x2="260" y2="54" stroke={baseStroke} strokeWidth="1.2" />
          <polygon points="260,54 254,50 254,58" fill={baseStroke} />
          {isAnimated && (
            <circle r="2" fill={signalGreen}>
              <animate attributeName="cx" from="228" to="258" dur="1.6s" repeatCount="indefinite" />
              <animate attributeName="cy" from="54" to="54" dur="1.6s" repeatCount="indefinite" />
            </circle>
          )}

          {/* Single CTA Box */}
          <rect
            x="262"
            y="28"
            width="86"
            height="52"
            stroke={activeStep === 2 ? signalGreen : baseStroke}
            strokeWidth={activeStep === 2 ? '1.8' : '1.2'}
            fill={activeStep === 2 ? 'rgba(0, 143, 58, 0.10)' : 'none'}
          />
          <text x="270" y="48" fill={baseStroke} fontSize="10" fontFamily="JetBrains Mono">
            SINGLE_CTA
          </text>
          <text x="270" y="65" fill={mutedStroke} fontSize="10" fontFamily="JetBrains Mono">
            HI/EN &lt;500ms
          </text>

          {/* Deterministic Signal Waveform */}
          <polyline
            points="12,148 45,148 58,118 72,155 88,112 104,148 160,148 175,122 190,148 250,148 265,114 280,148 348,148"
            stroke={activeStep === 3 ? signalGreen : baseStroke}
            strokeWidth={activeStep === 3 ? '1.8' : '1.2'}
          />
          <text x="12" y="180" fill={mutedStroke} fontSize="10" fontFamily="JetBrains Mono">
            DETERMINISTIC FACT SELECTION // MAGICPIN FINALIST
          </text>
        </svg>
      )}

      {type === 'billara' && (
        <svg
          viewBox="0 0 360 195"
          className="h-full w-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Brief Input */}
          <rect
            x="14"
            y="24"
            width="92"
            height="120"
            stroke={activeStep === 0 ? signalGreen : baseStroke}
            strokeWidth={activeStep === 0 ? '1.8' : '1.2'}
            fill={activeStep === 0 ? 'rgba(0, 143, 58, 0.10)' : 'none'}
          />
          <text x="22" y="40" fill={baseStroke} fontSize="8.5" fontFamily="JetBrains Mono">
            AUDIO / TEXT
          </text>
          {[18, 34, 24, 46, 38, 16, 42, 28, 14].map((h, i) => (
            <line
              key={i}
              x1={26 + i * 8}
              y1={85 - h / 2}
              x2={26 + i * 8}
              y2={85 + h / 2}
              stroke={activeStep === 0 ? signalGreen : baseStroke}
              strokeWidth="2"
            />
          ))}
          <text x="22" y="130" fill={mutedStroke} fontSize="8" fontFamily="JetBrains Mono">
            BRIEF INPUT
          </text>

          {/* Traveling dot from Input to Proxy */}
          <line x1="106" y1="84" x2="146" y2="84" stroke={baseStroke} strokeWidth="1.2" />
          {isAnimated && (
            <circle r="2" fill={signalGreen}>
              <animate attributeName="cx" from="106" to="144" dur="1.6s" repeatCount="indefinite" />
              <animate attributeName="cy" from="84" to="84" dur="1.6s" repeatCount="indefinite" />
            </circle>
          )}

          {/* API Proxy */}
          <rect
            x="146"
            y="52"
            width="68"
            height="64"
            stroke={activeStep === 1 ? signalGreen : baseStroke}
            strokeWidth={activeStep === 1 ? '1.8' : '1.2'}
            strokeDasharray="3 3"
            fill={activeStep === 1 ? 'rgba(0, 143, 58, 0.10)' : 'none'}
          />
          <text x="154" y="76" fill={baseStroke} fontSize="8.5" fontFamily="JetBrains Mono">
            API PROXY
          </text>
          <text x="154" y="90" fill={mutedStroke} fontSize="7.5" fontFamily="JetBrains Mono">
            RBAC + RATE
          </text>
          <text x="154" y="102" fill={mutedStroke} fontSize="7.5" fontFamily="JetBrains Mono">
            GEMINI PARSE
          </text>

          {/* Traveling dot from Proxy to Invoice */}
          <line x1="214" y1="84" x2="246" y2="84" stroke={baseStroke} strokeWidth="1.2" />
          <polygon points="246,84 240,80 240,88" fill={baseStroke} />
          {isAnimated && (
            <circle r="2" fill={signalGreen}>
              <animate attributeName="cx" from="214" to="244" dur="1.6s" repeatCount="indefinite" />
              <animate attributeName="cy" from="84" to="84" dur="1.6s" repeatCount="indefinite" />
            </circle>
          )}

          {/* Invoice Schema */}
          <rect
            x="248"
            y="20"
            width="100"
            height="128"
            stroke={activeStep === 2 ? signalGreen : baseStroke}
            strokeWidth={activeStep === 2 ? '1.8' : '1.2'}
            fill={activeStep === 2 ? 'rgba(0, 143, 58, 0.10)' : 'none'}
          />
          <text x="256" y="36" fill={baseStroke} fontSize="8.5" fontFamily="JetBrains Mono">
            INVOICE_SCHEMA
          </text>
          <line x1="256" y1="44" x2="340" y2="44" stroke={baseStroke} strokeWidth="1" />
          <line x1="256" y1="60" x2="320" y2="60" stroke={mutedStroke} strokeWidth="1" />
          <line x1="256" y1="74" x2="330" y2="74" stroke={mutedStroke} strokeWidth="1" />
          <line x1="256" y1="88" x2="310" y2="88" stroke={mutedStroke} strokeWidth="1" />
          <rect
            x="252"
            y="104"
            width="92"
            height="30"
            stroke={signalGreen}
            strokeWidth="1"
            fill="rgba(0, 143, 58, 0.12)"
          />
          <text x="298" y="123" textAnchor="middle" fill={baseStroke} fontSize="7.5" fontFamily="JetBrains Mono">
            -65% TIME / PDF
          </text>

          <text x="14" y="180" fill={mutedStroke} fontSize="7.5" fontFamily="JetBrains Mono">
            FIRESTORE RBAC // RESEND DISPATCH // PENALTY ENGINE
          </text>
        </svg>
      )}

      {type === 'livedataviz' && (
        <svg
          viewBox="0 0 360 195"
          className="h-full w-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Sparse BM25 */}
          <rect
            x="14"
            y="22"
            width="94"
            height="44"
            stroke={activeStep === 0 ? signalGreen : baseStroke}
            strokeWidth={activeStep === 0 ? '1.8' : '1.2'}
            fill={activeStep === 0 ? 'rgba(0, 143, 58, 0.10)' : 'none'}
          />
          <text x="22" y="42" fill={baseStroke} fontSize="8.5" fontFamily="JetBrains Mono">
            SPARSE: BM25
          </text>
          <text x="22" y="56" fill={mutedStroke} fontSize="7.5" fontFamily="JetBrains Mono">
            LEXICAL STATS
          </text>

          {/* Dense Embed */}
          <rect
            x="14"
            y="84"
            width="94"
            height="44"
            stroke={activeStep === 1 ? signalGreen : baseStroke}
            strokeWidth={activeStep === 1 ? '1.8' : '1.2'}
            fill={activeStep === 1 ? 'rgba(0, 143, 58, 0.10)' : 'none'}
          />
          <text x="22" y="104" fill={baseStroke} fontSize="8.5" fontFamily="JetBrains Mono">
            DENSE: EMBED
          </text>
          <text x="22" y="118" fill={mutedStroke} fontSize="7.5" fontFamily="JetBrains Mono">
            30M TTL VECTOR
          </text>

          {/* Traveling dots to NL2Code */}
          <path d="M108 44 L144 75 M108 106 L144 75" stroke={baseStroke} strokeWidth="1.2" />
          {isAnimated && (
            <>
              <circle r="2" fill={signalGreen}>
                <animate attributeName="cx" from="108" to="142" dur="1.6s" repeatCount="indefinite" />
                <animate attributeName="cy" from="44" to="73" dur="1.6s" repeatCount="indefinite" />
              </circle>
              <circle r="2" fill={signalGreen}>
                <animate attributeName="cx" from="108" to="142" dur="1.6s" repeatCount="indefinite" />
                <animate attributeName="cy" from="106" to="77" dur="1.6s" repeatCount="indefinite" />
              </circle>
            </>
          )}

          {/* NL2Code */}
          <rect
            x="144"
            y="53"
            width="74"
            height="44"
            stroke={activeStep === 2 ? signalGreen : baseStroke}
            strokeWidth={activeStep === 2 ? '1.8' : '1.2'}
            fill={activeStep === 2 ? 'rgba(0, 143, 58, 0.10)' : 'none'}
          />
          <text x="152" y="73" fill={baseStroke} fontSize="8.5" fontFamily="JetBrains Mono">
            NL2CODE_RAG
          </text>
          <text x="152" y="87" fill={mutedStroke} fontSize="7.5" fontFamily="JetBrains Mono">
            VEGA-LITE AST
          </text>

          {/* Arrow to Chart */}
          <line x1="218" y1="75" x2="246" y2="75" stroke={baseStroke} strokeWidth="1.2" />
          {isAnimated && (
            <circle r="2" fill={signalGreen}>
              <animate attributeName="cx" from="218" to="244" dur="1.6s" repeatCount="indefinite" />
              <animate attributeName="cy" from="75" to="75" dur="1.6s" repeatCount="indefinite" />
            </circle>
          )}

          {/* Chart Frame */}
          <rect
            x="246"
            y="22"
            width="100"
            height="106"
            stroke={activeStep === 3 ? signalGreen : baseStroke}
            strokeWidth={activeStep === 3 ? '1.8' : '1.2'}
            fill={activeStep === 3 ? 'rgba(0, 143, 58, 0.10)' : 'none'}
          />
          <rect x="260" y="86" width="12" height="30" fill={baseStroke} />
          <rect x="278" y="64" width="12" height="52" fill={baseStroke} />
          <rect x="296" y="42" width="12" height="74" fill={baseStroke} />
          <rect x="314" y="54" width="12" height="62" stroke={baseStroke} strokeWidth="1.2" />

          <text x="14" y="180" fill={mutedStroke} fontSize="7.5" fontFamily="JetBrains Mono">
            ZERO-DATA-RETENTION (30M TTL) // ~80% FASTER CHARTS
          </text>
        </svg>
      )}

      {type === 'tripbuddy' && (
        <svg
          viewBox="0 0 360 195"
          className="h-full w-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Supervisor Top Node */}
          <rect
            x="130"
            y="14"
            width="100"
            height="30"
            stroke={activeStep === 0 ? signalGreen : baseStroke}
            strokeWidth={activeStep === 0 ? '1.8' : '1.2'}
            fill={activeStep === 0 ? 'rgba(0, 143, 58, 0.10)' : 'none'}
          />
          <text x="142" y="33" fill={baseStroke} fontSize="8.5" fontFamily="JetBrains Mono">
            SUPERVISOR_NODE
          </text>

          {/* 5 Agents */}
          {['FLIGHT', 'HOTEL', 'WEATHER', 'BUDGET', 'ITINERARY'].map((agent, idx) => {
            const x = 12 + idx * 69;
            const centerX = x + 30;
            const agentStep = idx + 1;
            const isAgentActive = activeStep === agentStep;

            return (
              <g key={agent}>
                <line x1="180" y1="44" x2={centerX} y2="74" stroke={isAgentActive ? signalGreen : baseStroke} strokeWidth="1" />
                
                {isAnimated && (
                  <circle r="1.8" fill={signalGreen}>
                    <animate attributeName="cx" from="180" to={centerX} dur="1.6s" begin={`${idx * 0.28}s`} repeatCount="indefinite" />
                    <animate attributeName="cy" from="44" to="74" dur="1.6s" begin={`${idx * 0.28}s`} repeatCount="indefinite" />
                  </circle>
                )}

                <rect
                  x={x}
                  y="74"
                  width="60"
                  height="32"
                  stroke={isAgentActive ? signalGreen : baseStroke}
                  strokeWidth={isAgentActive ? '1.8' : '1.2'}
                  fill={isAgentActive ? 'rgba(0, 143, 58, 0.12)' : 'none'}
                />
                <text x={x + 6} y="93" fill={baseStroke} fontSize="7.5" fontFamily="JetBrains Mono">
                  {agent}
                </text>
                <line x1={centerX} y1="106" x2="180" y2="126" stroke={mutedStroke} strokeWidth="0.9" strokeDasharray="2 2" />
              </g>
            );
          })}

          {/* HITL & 3 MCP Providers bar */}
          <rect
            x="64"
            y="126"
            width="232"
            height="24"
            stroke={activeStep === 6 ? signalGreen : baseStroke}
            strokeWidth={activeStep === 6 ? '1.8' : '1.2'}
            fill={activeStep === 6 ? 'rgba(0, 143, 58, 0.10)' : 'none'}
          />
          <text x="76" y="141" fill={baseStroke} fontSize="8.5" fontFamily="JetBrains Mono">
            3 MCP PROVIDERS (HTTP/STDIO) + HITL GATE
          </text>

          <text x="12" y="180" fill={mutedStroke} fontSize="7.5" fontFamily="JetBrains Mono">
            5-AGENT / 9-NODE LANGGRAPH // MULTI-STAGE DOCKER
          </text>
        </svg>
      )}
    </div>
  );
};
