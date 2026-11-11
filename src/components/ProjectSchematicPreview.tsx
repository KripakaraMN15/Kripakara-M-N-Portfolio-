import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

interface ProjectSchematicPreviewProps {
  type: 'contractbreaker' | 'vera' | 'veridian' | 'billara' | 'livedataviz' | 'tripbuddy';
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
    case 'veridian':
      return 'VERIDIAN_PIPELINE';
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
  isHovered,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.1 });
  const [activeStep, setActiveStep] = useState(type === 'contractbreaker' ? 4 : 0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Default highlighted box when motion is reduced (VERIFY = 4 for contractbreaker, LANGGRAPH = 2 for veridian, else 0)
  const defaultStep = type === 'contractbreaker' ? 4 : type === 'veridian' ? 2 : 0;

  // Sequential highlight moving across pipeline boxes continuously (live)
  useEffect(() => {
    if (prefersReducedMotion) {
      setActiveStep(defaultStep);
      return;
    }
    const maxSteps = type === 'tripbuddy' ? 7 : type === 'contractbreaker' ? 5 : type === 'veridian' ? 5 : 4;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % maxSteps);
    }, 450);
    return () => clearInterval(interval);
  }, [prefersReducedMotion, type, defaultStep]);

  // Fixed colors as specified
  const baseStroke = '#0A0A0A';
  const mutedStroke = '#55554F';
  const signalGreen = '#008F3A';
  const panelBg = '#F5F5F0';

  const isAnimated = !prefersReducedMotion;

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden border border-[rgba(10,10,10,0.18)] bg-[${panelBg}] p-2 sm:p-2.5 font-mono-tech flex flex-col ${className}`}
      style={{ backgroundColor: panelBg }}
    >
      <div className="mb-1 flex shrink-0 items-center justify-between border-b border-[rgba(10,10,10,0.18)] pb-1 text-[10px] uppercase tracking-widest text-[#55554F]">
        <div className="flex items-center gap-2">
          <span>FIG // {getSchematicTitle(type)}</span>
        </div>
      </div>

      {type === 'contractbreaker' && (
        <svg
          viewBox="0 0 360 195"
          className="w-full flex-1 min-h-0"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background grid lines */}
          <line x1="0" y1="50" x2="360" y2="50" stroke={mutedStroke} strokeOpacity="0.15" strokeDasharray="2 2" />
          <line x1="0" y1="100" x2="360" y2="100" stroke={mutedStroke} strokeOpacity="0.15" strokeDasharray="2 2" />

          {/* 1. ANALYZE */}
          <rect
            x="6"
            y="30"
            width="56"
            height="38"
            stroke={activeStep === 0 ? signalGreen : baseStroke}
            strokeWidth={activeStep === 0 ? '1.8' : '1.2'}
            fill={activeStep === 0 ? 'rgba(0, 143, 58, 0.10)' : 'none'}
          />
          <text
            x="34"
            y="54"
            textAnchor="middle"
            fill={baseStroke}
            fontSize="8.5"
            fontFamily="'JetBrains Mono', monospace"
          >
            ANALYZE
          </text>

          {/* Arrow 1 */}
          <line x1="62" y1="49" x2="74" y2="49" stroke={baseStroke} strokeWidth="1.2" />
          <polygon points="74,49 69,46 69,52" fill={baseStroke} />
          {isAnimated && (
            <circle r="1.8" fill={signalGreen}>
              <animate attributeName="cx" from="62" to="74" dur="1.6s" repeatCount="indefinite" />
              <animate attributeName="cy" from="49" to="49" dur="1.6s" repeatCount="indefinite" />
            </circle>
          )}

          {/* 2. HYPOTHESIZE */}
          <rect
            x="76"
            y="30"
            width="74"
            height="38"
            stroke={activeStep === 1 ? signalGreen : baseStroke}
            strokeWidth={activeStep === 1 ? '1.8' : '1.2'}
            fill={activeStep === 1 ? 'rgba(0, 143, 58, 0.10)' : 'none'}
          />
          <text
            x="113"
            y="54"
            textAnchor="middle"
            fill={baseStroke}
            fontSize="8"
            fontFamily="'JetBrains Mono', monospace"
          >
            HYPOTHESIZE
          </text>

          {/* Arrow 2 */}
          <line x1="150" y1="49" x2="160" y2="49" stroke={baseStroke} strokeWidth="1.2" />
          <polygon points="160,49 155,46 155,52" fill={baseStroke} />
          {isAnimated && (
            <circle r="1.8" fill={signalGreen}>
              <animate attributeName="cx" from="150" to="160" dur="1.6s" repeatCount="indefinite" />
              <animate attributeName="cy" from="49" to="49" dur="1.6s" repeatCount="indefinite" />
            </circle>
          )}

          {/* 3. APPROVE */}
          <rect
            x="162"
            y="30"
            width="56"
            height="38"
            stroke={activeStep === 2 ? signalGreen : baseStroke}
            strokeWidth={activeStep === 2 ? '1.8' : '1.2'}
            fill={activeStep === 2 ? 'rgba(0, 143, 58, 0.10)' : 'none'}
          />
          <text
            x="190"
            y="54"
            textAnchor="middle"
            fill={baseStroke}
            fontSize="8.5"
            fontFamily="'JetBrains Mono', monospace"
          >
            APPROVE
          </text>

          {/* Arrow 3 */}
          <line x1="218" y1="49" x2="228" y2="49" stroke={baseStroke} strokeWidth="1.2" />
          <polygon points="228,49 223,46 223,52" fill={baseStroke} />
          {isAnimated && (
            <circle r="1.8" fill={signalGreen}>
              <animate attributeName="cx" from="218" to="228" dur="1.6s" repeatCount="indefinite" />
              <animate attributeName="cy" from="49" to="49" dur="1.6s" repeatCount="indefinite" />
            </circle>
          )}

          {/* 4. EXECUTE */}
          <rect
            x="230"
            y="30"
            width="56"
            height="38"
            stroke={activeStep === 3 ? signalGreen : baseStroke}
            strokeWidth={activeStep === 3 ? '1.8' : '1.2'}
            fill={activeStep === 3 ? 'rgba(0, 143, 58, 0.10)' : 'none'}
          />
          <text
            x="258"
            y="54"
            textAnchor="middle"
            fill={baseStroke}
            fontSize="8.5"
            fontFamily="'JetBrains Mono', monospace"
          >
            EXECUTE
          </text>

          {/* Line down to Fault Tag */}
          <line x1="258" y1="68" x2="258" y2="84" stroke={baseStroke} strokeWidth="1.2" />
          <polygon points="258,84 255,80 261,80" fill={baseStroke} />

          {/* Fault Tag under EXECUTE */}
          <rect
            x="180"
            y="86"
            width="156"
            height="22"
            stroke={mutedStroke}
            strokeWidth="1.2"
            strokeDasharray="2 2"
            fill="none"
          />
          <text
            x="258"
            y="101"
            textAnchor="middle"
            fill={baseStroke}
            fontSize="8"
            fontFamily="'JetBrains Mono', monospace"
          >
            FAULT: RESPONSE DROPPED
          </text>

          {/* Arrow 4 */}
          <line x1="286" y1="49" x2="296" y2="49" stroke={baseStroke} strokeWidth="1.2" />
          <polygon points="296,49 291,46 291,52" fill={baseStroke} />
          {isAnimated && (
            <circle r="1.8" fill={signalGreen}>
              <animate attributeName="cx" from="286" to="296" dur="1.6s" repeatCount="indefinite" />
              <animate attributeName="cy" from="49" to="49" dur="1.6s" repeatCount="indefinite" />
            </circle>
          )}

          {/* 5. VERIFY */}
          <rect
            x="298"
            y="30"
            width="56"
            height="38"
            stroke={activeStep === 4 ? signalGreen : baseStroke}
            strokeWidth={activeStep === 4 ? '1.8' : '1.2'}
            fill={activeStep === 4 ? 'rgba(0, 143, 58, 0.10)' : 'none'}
          />
          <text
            x="326"
            y="54"
            textAnchor="middle"
            fill={baseStroke}
            fontSize="8.5"
            fontFamily="'JetBrains Mono', monospace"
          >
            VERIFY
          </text>

          {/* Line down to Outcomes */}
          <line x1="326" y1="68" x2="326" y2="84" stroke={baseStroke} strokeWidth="1.2" />
          <polygon points="326,84 323,80 329,80" fill={baseStroke} />

          {/* Outcomes box under VERIFY */}
          <g transform="translate(226, 116)">
            <rect
              x="0"
              y="0"
              width="128"
              height="46"
              stroke={activeStep === 4 ? signalGreen : baseStroke}
              strokeWidth="1.2"
              fill={activeStep === 4 ? 'rgba(0, 143, 58, 0.08)' : 'none'}
            />
            <text x="8" y="14" fill={baseStroke} fontSize="8" fontFamily="'JetBrains Mono', monospace">
              • CONFIRMED
            </text>
            <text x="8" y="27" fill={mutedStroke} fontSize="8" fontFamily="'JetBrains Mono', monospace">
              • NOT_REPRODUCED
            </text>
            <text x="8" y="40" fill={mutedStroke} fontSize="8" fontFamily="'JetBrains Mono', monospace">
              • INCONCLUSIVE
            </text>
          </g>

          {/* Footer note */}
          <text x="6" y="180" fill={mutedStroke} fontSize="8" fontFamily="'JetBrains Mono', monospace">
            DETERMINISTIC CAUSAL VERIFIER // AST EXTRACTOR &amp; REPLAY
          </text>
        </svg>
      )}

      {type === 'vera' && (
        <svg
          viewBox="0 0 360 195"
          className="w-full flex-1 min-h-0"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line x1="0" y1="45" x2="360" y2="45" stroke={mutedStroke} strokeOpacity="0.2" strokeDasharray="2 2" />
          <line x1="0" y1="90" x2="360" y2="90" stroke={mutedStroke} strokeOpacity="0.2" strokeDasharray="2 2" />
          <line x1="0" y1="135" x2="360" y2="135" stroke={mutedStroke} strokeOpacity="0.2" strokeDasharray="2 2" />

          {/* Context Store Box */}
          <rect
            x="10"
            y="26"
            width="86"
            height="54"
            stroke={activeStep === 0 ? signalGreen : baseStroke}
            strokeWidth={activeStep === 0 ? '1.8' : '1.2'}
            fill={activeStep === 0 ? 'rgba(0, 143, 58, 0.10)' : 'none'}
          />
          <text x="18" y="46" fill={baseStroke} fontSize="8.5" fontFamily="'JetBrains Mono', monospace">
            CTX_STORE
          </text>
          <text x="18" y="62" fill={mutedStroke} fontSize="7.5" fontFamily="'JetBrains Mono', monospace">
            IDEMPOTENT
          </text>

          {/* Arrow 1 */}
          <line x1="96" y1="53" x2="128" y2="53" stroke={baseStroke} strokeWidth="1.2" />
          <polygon points="128,53 122,49 122,57" fill={baseStroke} />
          {isAnimated && (
            <circle r="2" fill={signalGreen}>
              <animate attributeName="cx" from="96" to="126" dur="1.6s" repeatCount="indefinite" />
              <animate attributeName="cy" from="53" to="53" dur="1.6s" repeatCount="indefinite" />
            </circle>
          )}

          {/* Policy Scorer */}
          <rect
            x="128"
            y="18"
            width="112"
            height="70"
            stroke={activeStep === 1 ? signalGreen : baseStroke}
            strokeWidth={activeStep === 1 ? '1.8' : '1.2'}
            fill={activeStep === 1 ? 'rgba(0, 143, 58, 0.10)' : 'none'}
          />
          <text x="136" y="34" fill={baseStroke} fontSize="8" fontFamily="'JetBrains Mono', monospace">
            POLICY: 20/TICK
          </text>
          {Array.from({ length: 10 }).map((_, idx) => (
            <rect
              key={idx}
              x={136 + (idx % 5) * 18}
              y={42 + Math.floor(idx / 5) * 16}
              width="12"
              height="12"
              stroke={activeStep === 1 ? signalGreen : baseStroke}
              fill={idx === 2 ? signalGreen : 'none'}
              strokeWidth="1"
            />
          ))}

          {/* Arrow 2 */}
          <line x1="240" y1="53" x2="268" y2="53" stroke={baseStroke} strokeWidth="1.2" />
          <polygon points="268,53 262,49 262,57" fill={baseStroke} />
          {isAnimated && (
            <circle r="2" fill={signalGreen}>
              <animate attributeName="cx" from="240" to="266" dur="1.6s" repeatCount="indefinite" />
              <animate attributeName="cy" from="53" to="53" dur="1.6s" repeatCount="indefinite" />
            </circle>
          )}

          {/* Single CTA Box */}
          <rect
            x="268"
            y="26"
            width="82"
            height="54"
            stroke={activeStep === 2 ? signalGreen : baseStroke}
            strokeWidth={activeStep === 2 ? '1.8' : '1.2'}
            fill={activeStep === 2 ? 'rgba(0, 143, 58, 0.10)' : 'none'}
          />
          <text x="274" y="46" fill={baseStroke} fontSize="8.5" fontFamily="'JetBrains Mono', monospace">
            SINGLE_CTA
          </text>
          <text x="274" y="62" fill={mutedStroke} fontSize="7.5" fontFamily="'JetBrains Mono', monospace">
            HI/EN &lt;500ms
          </text>

          {/* Deterministic Signal Waveform */}
          <polyline
            points="10,144 45,144 58,116 72,152 88,110 104,144 160,144 175,120 190,144 250,144 265,112 280,144 350,144"
            stroke={activeStep === 3 ? signalGreen : baseStroke}
            strokeWidth={activeStep === 3 ? '1.8' : '1.2'}
          />
          <text x="10" y="178" fill={mutedStroke} fontSize="8" fontFamily="'JetBrains Mono', monospace">
            DETERMINISTIC FACT SELECTION // MAGICPIN FINALIST
          </text>
        </svg>
      )}

      {type === 'veridian' && (
        <svg
          viewBox="0 0 540 250"
          className="w-full flex-1 min-h-0"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Top Row: Pipeline */}
          {/* 1. UPLOAD (S3) */}
          <rect
            x="12"
            y="20"
            width="88"
            height="38"
            stroke={activeStep === 0 ? signalGreen : baseStroke}
            strokeWidth={activeStep === 0 ? '1.8' : '1.2'}
            fill={activeStep === 0 ? 'rgba(0, 143, 58, 0.10)' : 'none'}
          />
          <text x="18" y="44" fill={baseStroke} fontSize="10.5" fontFamily="'JetBrains Mono', monospace" fontWeight="600">
            UPLOAD (S3)
          </text>

          {/* Arrow 1 */}
          <line x1="100" y1="39" x2="118" y2="39" stroke={mutedStroke} strokeWidth="1.2" />
          <polygon points="118,36 124,39 118,42" fill={mutedStroke} />
          {isAnimated && (
            <circle r="2.2" fill={signalGreen}>
              <animate attributeName="cx" from="100" to="122" dur="1.8s" repeatCount="indefinite" />
              <animate attributeName="cy" from="39" to="39" dur="1.8s" repeatCount="indefinite" />
            </circle>
          )}

          {/* 2. INGEST */}
          <rect
            x="124"
            y="20"
            width="72"
            height="38"
            stroke={activeStep === 1 ? signalGreen : baseStroke}
            strokeWidth={activeStep === 1 ? '1.8' : '1.2'}
            fill={activeStep === 1 ? 'rgba(0, 143, 58, 0.10)' : 'none'}
          />
          <text x="138" y="44" fill={baseStroke} fontSize="10.5" fontFamily="'JetBrains Mono', monospace" fontWeight="600">
            INGEST
          </text>

          {/* Arrow 2 */}
          <line x1="196" y1="39" x2="214" y2="39" stroke={mutedStroke} strokeWidth="1.2" />
          <polygon points="214,36 220,39 214,42" fill={mutedStroke} />
          {isAnimated && (
            <circle r="2.2" fill={signalGreen}>
              <animate attributeName="cx" from="196" to="218" dur="1.8s" begin="0.3s" repeatCount="indefinite" />
              <animate attributeName="cy" from="39" to="39" dur="1.8s" begin="0.3s" repeatCount="indefinite" />
            </circle>
          )}

          {/* 3. LANGGRAPH [HIGHLIGHTED] */}
          <rect
            x="220"
            y="18"
            width="104"
            height="42"
            stroke={signalGreen}
            strokeWidth="2"
            fill="rgba(0, 143, 58, 0.14)"
          />
          <text x="230" y="44" fill={signalGreen} fontSize="11" fontFamily="'JetBrains Mono', monospace" fontWeight="700">
            LANGGRAPH
          </text>

          {/* Arrow 3 */}
          <line x1="324" y1="39" x2="342" y2="39" stroke={mutedStroke} strokeWidth="1.2" />
          <polygon points="342,36 348,39 342,42" fill={mutedStroke} />
          {isAnimated && (
            <circle r="2.2" fill={signalGreen}>
              <animate attributeName="cx" from="324" to="346" dur="1.8s" begin="0.6s" repeatCount="indefinite" />
              <animate attributeName="cy" from="39" to="39" dur="1.8s" begin="0.6s" repeatCount="indefinite" />
            </circle>
          )}

          {/* 4. GUARDRAILS */}
          <rect
            x="348"
            y="20"
            width="90"
            height="38"
            stroke={activeStep === 3 ? signalGreen : baseStroke}
            strokeWidth={activeStep === 3 ? '1.8' : '1.2'}
            fill={activeStep === 3 ? 'rgba(0, 143, 58, 0.10)' : 'none'}
          />
          <text x="354" y="44" fill={baseStroke} fontSize="10" fontFamily="'JetBrains Mono', monospace" fontWeight="600">
            GUARDRAILS
          </text>

          {/* Arrow 4 */}
          <line x1="438" y1="39" x2="452" y2="39" stroke={mutedStroke} strokeWidth="1.2" />
          <polygon points="452,36 458,39 452,42" fill={mutedStroke} />
          {isAnimated && (
            <circle r="2.2" fill={signalGreen}>
              <animate attributeName="cx" from="438" to="456" dur="1.8s" begin="0.9s" repeatCount="indefinite" />
              <animate attributeName="cy" from="39" to="39" dur="1.8s" begin="0.9s" repeatCount="indefinite" />
            </circle>
          )}

          {/* 5. ANSWER + SOURCES */}
          <rect
            x="458"
            y="18"
            width="70"
            height="42"
            stroke={activeStep === 4 ? signalGreen : baseStroke}
            strokeWidth={activeStep === 4 ? '1.8' : '1.2'}
            fill={activeStep === 4 ? 'rgba(0, 143, 58, 0.10)' : 'none'}
          />
          <text x="466" y="34" fill={baseStroke} fontSize="10" fontFamily="'JetBrains Mono', monospace" fontWeight="600">
            ANSWER
          </text>
          <text x="464" y="50" fill={mutedStroke} fontSize="10" fontFamily="'JetBrains Mono', monospace" fontWeight="500">
            + SOURCES
          </text>

          {/* Under LangGraph: Connector & Postgres box */}
          <line x1="272" y1="60" x2="272" y2="78" stroke={signalGreen} strokeWidth="1.5" strokeDasharray="3 2" />
          <polygon points="269,78 272,83 275,78" fill={signalGreen} />
          {isAnimated && (
            <circle r="2" fill={signalGreen}>
              <animate attributeName="cx" from="272" to="272" dur="1.4s" repeatCount="indefinite" />
              <animate attributeName="cy" from="60" to="80" dur="1.4s" repeatCount="indefinite" />
            </circle>
          )}

          <rect
            x="130"
            y="84"
            width="284"
            height="30"
            stroke={baseStroke}
            strokeWidth="1.2"
            fill="none"
          />
          <text x="140" y="103" fill={baseStroke} fontSize="10" fontFamily="'JetBrains Mono', monospace" fontWeight="600">
            POSTGRES: MEMORY · AUDIT · APPROVALS
          </text>

          {/* Bottom row: DELIVERY (CI / CD PIPELINE) */}
          <rect
            x="12"
            y="132"
            width="516"
            height="102"
            stroke={mutedStroke}
            strokeWidth="1"
            strokeDasharray="4 4"
            strokeOpacity="0.6"
            fill="none"
          />
          <text x="22" y="150" fill={mutedStroke} fontSize="10" fontFamily="'JetBrains Mono', monospace" fontWeight="600" letterSpacing="0.05em">
            DELIVERY // CI / CD PIPELINE
          </text>

          {/* Delivery stages: PUSH -> ACTIONS (OIDC) -> ECR -> EC2 */}
          {/* PUSH */}
          <rect
            x="24"
            y="166"
            width="68"
            height="40"
            stroke={baseStroke}
            strokeWidth="1.2"
            fill="none"
          />
          <text x="40" y="191" fill={baseStroke} fontSize="10.5" fontFamily="'JetBrains Mono', monospace" fontWeight="600">
            PUSH
          </text>

          {/* Arrow to ACTIONS */}
          <line x1="92" y1="186" x2="120" y2="186" stroke={mutedStroke} strokeWidth="1.2" />
          <polygon points="120,183 126,186 120,189" fill={mutedStroke} />
          {isAnimated && (
            <circle r="2.2" fill={signalGreen}>
              <animate attributeName="cx" from="92" to="124" dur="2s" repeatCount="indefinite" />
              <animate attributeName="cy" from="186" to="186" dur="2s" repeatCount="indefinite" />
            </circle>
          )}

          {/* ACTIONS (OIDC) */}
          <rect
            x="126"
            y="166"
            width="132"
            height="40"
            stroke={baseStroke}
            strokeWidth="1.2"
            fill="none"
          />
          <text x="136" y="191" fill={baseStroke} fontSize="10.5" fontFamily="'JetBrains Mono', monospace" fontWeight="600">
            ACTIONS (OIDC)
          </text>

          {/* Arrow to ECR */}
          <line x1="258" y1="186" x2="286" y2="186" stroke={mutedStroke} strokeWidth="1.2" />
          <polygon points="286,183 292,186 286,189" fill={mutedStroke} />
          {isAnimated && (
            <circle r="2.2" fill={signalGreen}>
              <animate attributeName="cx" from="258" to="290" dur="2s" begin="0.5s" repeatCount="indefinite" />
              <animate attributeName="cy" from="186" to="186" dur="2s" begin="0.5s" repeatCount="indefinite" />
            </circle>
          )}

          {/* ECR */}
          <rect
            x="292"
            y="166"
            width="86"
            height="40"
            stroke={baseStroke}
            strokeWidth="1.2"
            fill="none"
          />
          <text x="316" y="191" fill={baseStroke} fontSize="10.5" fontFamily="'JetBrains Mono', monospace" fontWeight="600">
            ECR
          </text>

          {/* Arrow to EC2 */}
          <line x1="378" y1="186" x2="406" y2="186" stroke={mutedStroke} strokeWidth="1.2" />
          <polygon points="406,183 412,186 406,189" fill={mutedStroke} />
          {isAnimated && (
            <circle r="2.2" fill={signalGreen}>
              <animate attributeName="cx" from="378" to="410" dur="2s" begin="1s" repeatCount="indefinite" />
              <animate attributeName="cy" from="186" to="186" dur="2s" begin="1s" repeatCount="indefinite" />
            </circle>
          )}

          {/* EC2 */}
          <rect
            x="412"
            y="166"
            width="100"
            height="40"
            stroke={baseStroke}
            strokeWidth="1.2"
            fill="none"
          />
          <text x="430" y="191" fill={baseStroke} fontSize="10.5" fontFamily="'JetBrains Mono', monospace" fontWeight="600">
            RUNNER EC2
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
