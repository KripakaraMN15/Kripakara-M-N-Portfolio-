import type { IconType } from 'react-icons';
import React from 'react';
import {
  SiPython,
  SiJavascript,
  SiTypescript,
  SiOpenjdk,
  SiPytorch,
  SiHuggingface,
  SiLangchain,
  SiLanggraph,
  SiCss,
  SiCursor,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiFastapi,
  SiHtml5,
  SiMongodb,
  SiPostgresql,
  SiFirebase,
  SiGit,
  SiDocker,
  SiPostman,
} from 'react-icons/si';
import { FaAws } from 'react-icons/fa';

export const SiLangsmith: IconType = (props) =>
  React.createElement(
    'svg',
    {
      stroke: 'currentColor',
      fill: 'currentColor',
      strokeWidth: '0',
      viewBox: '0 0 24 24',
      height: '1em',
      width: '1em',
      xmlns: 'http://www.w3.org/2000/svg',
      ...props,
    },
    React.createElement('path', {
      d: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14h-2v-2h2v2zm0-4h-2V8h2v5zm4 4h-2v-5h2v5zm0-7h-2V8h2v2z',
    })
  );

export interface SkillItem {
  name: string;
  icon?: IconType;
}

export interface MetricItem {
  id: string;
  rawValue: number;
  prefix?: string;
  suffix: string;
  decimals: number;
  formatted: string;
  label: string;
  context: string;
  source: string;
  link: string;
}

export interface TraceStep {
  step: string;
  node: string;
  type?: 'INGEST' | 'RETRIEVE' | 'EVALUATE' | 'ROUTE' | 'SYNTHESIZE' | 'DISPATCH' | 'GUARD' | 'VERIFY' | 'FAULT';
  durationMs?: number;
  detail: string;
  io?: {
    input: string;
    output: string;
  };
}

export interface ProjectBadge {
  label: string;
  context: string;
  period: string;
  formatted: string;
}

export interface ProjectCaseStudy {
  order: number;
  index: string;
  slug: string;
  name: string;
  shortTitle: string;
  tagline: string;
  listDescription: string;
  year?: string;
  date?: string;
  recognition?: string;
  badge?: ProjectBadge;
  context?: string;
  tags?: string[];
  stack: string[];
  bullets: string[];
  overview: string;
  problem: string;
  approach: string[];
  traceTotalMs?: string;
  traceNote?: string;
  trace: TraceStep[];
  comparisonTable?: {
    title: string;
    headers: [string, string];
    rows: {
      metric: string;
      left: string;
      right: string;
    }[];
  };
  designDecisions?: {
    title: string;
    detail: string;
  }[];
  results: {
    value: string;
    label: string;
    detail: string;
  }[];
  resultsNote?: string;
  limitations?: string[];
  publicDemoNote?: string;
  liveUrl?: string;
  repoUrl: string;
  liveUrlHint?: string;
  linksNote?: string;
  links: {
    liveDemo?: string;
    repository: string;
    screenshots: string[];
  };
  previewType: 'contractbreaker' | 'vera' | 'billara' | 'livedataviz' | 'tripbuddy';
  screenshot?: string;
  screenshotAlt?: string;
  screenshotLink?: string;
  featured?: boolean;
}

export interface ExperienceCommit {
  hash: string;
  shortHash: string;
  role: string;
  organization: string;
  location: string;
  period: string;
  branch: string;
  commitMessage: string;
  filesChanged: string;
  stack: string[];
  diffLines: string[];
  homeHighlight?: string;
  highlights?: string[];
}

export interface PortfolioData {
  profile: {
    name: string;
    wordmark: string;
    heroDisplay: string;
    subtitle: string;
    email: string;
    phone?: string;
    linkedin: string;
    linkedinUrl: string;
    github: string;
    githubUrl: string;
    location: string;
    status: string;
    resumePdfUrl: string;
    summary: string;
    heroSummary: string;
  };
  specSheet: {
    label: string;
    value: string;
  }[];
  metrics: MetricItem[];
  skills: {
    category: string;
    codeKey: string;
    items: SkillItem[];
  }[];
  experience: ExperienceCommit[];
  projects: ProjectCaseStudy[];
  education: {
    degree: string;
    institution: string;
    location: string;
    period: string;
    cgpa: string;
  };
  certifications: {
    title: string;
    issuer: string;
    date: string;
  }[];
  currently: string[];
}

export const PORTFOLIO_DATA: PortfolioData = {
  profile: {
    name: 'Kripakara M. N.',
    wordmark: 'KRIPAKARA M. N.',
    heroDisplay: 'KRIPAKARA',
    subtitle: 'Software Engineer | AI Agents, LLMs & Backend Systems',
    email: 'kripakaramn@gmail.com',
    phone: '+91 8884707671',
    linkedin: 'linkedin.com/in/kripakaramn',
    linkedinUrl: 'https://linkedin.com/in/kripakaramn',
    github: 'github.com/KripakaraMN15',
    githubUrl: 'https://github.com/KripakaraMN15',
    location: 'Mangaluru, India (open to relocate)',
    status: 'Open to work ',
    resumePdfUrl: '/assets/aistudio/KRIPAKARAMN_RESUME_c6946890.pdf',
    summary:
      'AI engineer with NLP and GenAI experience, including internships at Samsung R&D and CodeIO. Built a 3-model NLP ensemble reaching 98.48% accuracy for voice-command detection and multi-agent LLM systems (LangGraph, MCP, RAG). Skilled in Python, PyTorch, and Hugging Face, with a focus on secure, privacy-first, production-ready systems.',
    heroSummary:
      'AI engineer building multi-agent LLM systems and production NLP. Previously at Samsung R&D. Focused on secure, Full-Stack systems.',
  },

  specSheet: [
    { label: 'LOCATION', value: 'Mangaluru, India (Open to relocate)' },
    { label: 'FOCUS', value: 'NLP, Multi-Agent LLM Systems (LangGraph, MCP, RAG), Full-Stack Systems' },
    { label: 'SPOKEN LANGUAGES', value: 'English, Hindi, Kannada, Tulu' },
    { label: 'STATUS', value: 'Open to work ' },
  ],

  metrics: [
    {
      id: 'samsung-acc',
      rawValue: 98.48,
      suffix: '%',
      decimals: 2,
      formatted: '98.48%',
      label: 'Voice-command accuracy',
      context: 'Samsung R&D · 3-model NLP ensemble (98.46% F1)',
      source: 'SAMSUNG R&D',
      link: '/experience',
    },
    {
      id: 'samsung-lat',
      rawValue: 56,
      suffix: 'ms',
      decimals: 0,
      formatted: '56ms',
      label: 'Inference latency',
      context: 'Detection (24ms segmentation) · 46MB ALBERT ensemble',
      source: 'SAMSUNG R&D',
      link: '/experience',
    },
    {
      id: 'codeio-students',
      rawValue: 5500,
      suffix: '+',
      decimals: 0,
      formatted: '5,500+',
      label: 'Students served',
      context: 'CodeIO full-stack exam management platform',
      source: 'CODEIO',
      link: '/experience',
    },
    {
      id: 'livedataviz-speed',
      rawValue: 80,
      prefix: '~',
      suffix: '%',
      decimals: 0,
      formatted: '~80%',
      label: 'Faster chart creation',
      context: 'LiveDataViz NL2Code Vega-Lite + Hybrid RAG engine',
      source: 'LIVEDATAVIZ',
      link: '/work/live-data-viz',
    },
  ],

  skills: [
    {
      category: 'Languages',
      codeKey: 'languages',
      items: [
        { name: 'Python', icon: SiPython },
        { name: 'Java', icon: SiOpenjdk },
        { name: 'JavaScript (ES6+)', icon: SiJavascript },
        { name: 'TypeScript', icon: SiTypescript },
        { name: 'SQL' },
      ],
    },
    {
      category: 'AI / ML',
      codeKey: 'ai_ml',
      items: [
        { name: 'LLM Integration' },
        { name: 'RAG' },
        { name: 'Multi-Agent Systems' },
        { name: 'LangGraph', icon: SiLanggraph },
        { name: 'PyTorch', icon: SiPytorch },
        { name: 'Hugging Face', icon: SiHuggingface },
        { name: 'LangSmith', icon: SiLangsmith },
        { name: 'NLP' },
      ],
    },
    {
      category: 'Web',
      codeKey: 'web',
      items: [
        { name: 'React.js', icon: SiReact },
        { name: 'Node.js', icon: SiNodedotjs },
        { name: 'Express.js', icon: SiExpress },
        { name: 'REST APIs' },
        { name: 'FastAPI', icon: SiFastapi },
        { name: 'HTML5', icon: SiHtml5 },
        { name: 'CSS3', icon: SiCss },
      ],
    },
    {
      category: 'Databases',
      codeKey: 'databases',
      items: [
        { name: 'MongoDB', icon: SiMongodb },
        { name: 'PostgreSQL', icon: SiPostgresql },
        { name: 'Firebase (Auth, Firestore)', icon: SiFirebase },
      ],
    },
    {
      category: 'Tools / Cloud',
      codeKey: 'tools_cloud',
      items: [
        { name: 'Git', icon: SiGit },
        { name: 'Docker', icon: SiDocker },
        { name: 'AWS', icon: FaAws },
        { name: 'Postman', icon: SiPostman },
        { name: 'Cursor', icon: SiCursor },
      ],
    },
  ],

  experience: [
    {
      hash: 'e94a71c0b8f392d14e6a2b5c89f01d3a7c44b210',
      shortHash: 'e94a71c',
      role: 'Software Development Intern',
      organization: 'CodeIO',
      location: 'Bengaluru',
      period: 'Mar 2024 – May 2024',
      branch: 'HEAD -> main, tag: codeio-2024',
      commitMessage: 'feat(exam-platform): ship full-stack exam management & automated seating for 5,500+ students',
      filesChanged: '3 modules changed · React.js, Node.js, MongoDB, PDFKit, Nodemailer',
      stack: ['React.js', 'Node.js', 'MongoDB', 'PDFKit', 'Nodemailer', 'RBAC'],
      diffLines: [
        'Developed a full-stack exam management platform (React.js, Node.js, MongoDB) serving 5,500+ students.',
        'Automated exam scheduling, seating allocation, and hall-ticket generation (PDFKit, Nodemailer) with a capacity and batch-aware allocation algorithm, cutting administrative effort by ~60%.',
        'Implemented role-based access control (RBAC) for admins, invigilators, and students.',
      ],
      homeHighlight: 'Exam platform for 5,500+ students; ~60% less admin effort.',
      highlights: ['5,500+', '~60%'],
    },
    {
      hash: '7b3d90f4a12e88c510d6f44a29b1c77e3019a5d8',
      shortHash: '7b3d90f',
      role: 'Samsung Research Intern',
      organization: 'Samsung R&D Institute India',
      location: 'Bengaluru',
      period: 'Nov 2022 – Aug 2023',
      branch: 'tag: srib-nlp-ensemble',
      commitMessage: 'perf(nlp-ensemble): reach 98.48% voice-command accuracy at 56ms latency with 46MB ALBERT ensemble',
      filesChanged: '3 modules changed · PyTorch, ALBERT, scikit-learn, Pandas, Gradio',
      stack: ['Python', 'PyTorch', 'ALBERT', 'scikit-learn', 'Pandas', 'Gradio', 'NLP'],
      diffLines: [
        'Improved voice-command detection accuracy to 98.48% (98.46% F1) with a 3-model NLP ensemble (ALBERT, scikit-learn Naive Bayes, rule-based classifier) using PyTorch, outperforming standalone BERT by ~2.5% pts.',
        'Optimised inference latency to 56ms (detection) and 24ms (segmentation) by curating targeted datasets with Pandas and building a lightweight 46MB ALBERT-based ensemble.',
        'Built a Gradio interface for real-time validation and testing of the model.',
      ],
      homeHighlight: '3-model NLP ensemble: 98.48% accuracy at 56ms latency.',
      highlights: ['98.48%', '98.46%', '~2.5% pts', '56ms', '24ms', '46MB'],
    },
  ],

  projects: [
    {
      order: 1,
      index: '01',
      slug: 'contract-breaker',
      name: 'ContractBreaker',
      shortTitle: 'ContractBreaker',
      tagline:
        "Proves when a client's retry commits a payment twice, with a deterministic verdict and the event trace behind it.",
      listDescription:
        'Deterministic reliability tester for Python HTTP clients, with causal-trace verdicts.',
      year: '2026',
      date: 'Oct 2026',
      context: 'Alan AI OpenFire Hackathon',
      recognition: 'Finalist, Alan AI OpenFire Hackathon, Oct 2026',
      badge: {
        label: 'FINALIST',
        context: 'Alan AI OpenFire Hackathon',
        period: 'Oct 2026',
        formatted: '★ FINALIST, ALAN AI OPENFIRE HACKATHON, OCT 2026',
      },
      tags: ['Python', 'Reliability'],
      stack: [
        'Python',
        'Flask',
        'requests',
        'AST analysis',
        'pytest',
        'GitHub Actions',
        'Optional: OpenAI extraction fallback (off by default)',
      ],
      bullets: [
        'Deterministic reliability tester proving when client retries commit duplicate payment side effects.',
        'AST-extracted retry/timeout hypotheses with strict in-process fault injection and subprocess isolation.',
        'Causal event verifier producing cryptographically bound plans and reproducible event traces.',
      ],
      overview:
        'ContractBreaker is a focused reliability-testing tool for Python HTTP clients. It reads one client file, forms a testable retry/timeout hypothesis, injects a controlled failure into a local in-process service, runs the real client in a subprocess, and lets a deterministic causal verifier decide whether a duplicate side effect actually happened. Every verdict ships with the event trace that produced it. It is not a linter or a general bug scanner. Built for the Alan AI OpenFire Hackathon (Finalist, Oct 2026).',
      problem:
        'Two components can each be correct and still fail together. A client times out, assumes the request failed, and retries, but the server had already committed the first one. Types, schemas and unit tests can all pass while this happens. What is missing is a test of the interaction under a failure the client is expected to retry.',
      approach: [
        'ANALYZE: A conservative AST extractor reads retry, timeout and idempotency facts from one file, with per-fact provenance.',
        'HYPOTHESIZE: Facts become a scenario with explicit blockers. The result is runnable, or blocked with reasons, never a guess.',
        'APPROVE: A plan artifact binds the source hash, scenario and options. Altered or stale plans are rejected.',
        'EXECUTE: The client runs in a subprocess against an in-process Flask service with sockets blocked.',
        'VERIFY: The causal verifier checks event ordering, correlation and the side-effect ledger.',
        'EXPLAIN: A deterministic explanation lists evidence, blockers and limitations, with no model opinion.',
      ],
      traceNote:
        'Causal event timeline demonstrating duplicate payment side-effect reproduction under a dropped response failure.',
      trace: [
        {
          step: '01',
          node: 'request_sent',
          type: 'INGEST',
          detail: '(attempt 1)',
        },
        {
          step: '02',
          node: 'side_effect_committed',
          type: 'SYNTHESIZE',
          detail: '(effect-1)',
        },
        {
          step: '03',
          node: 'response_dropped',
          type: 'FAULT',
          detail: 'in-process socket drop injected before client receive',
        },
        {
          step: '04',
          node: 'request_sent',
          type: 'INGEST',
          detail: '(attempt 2, same operation)',
        },
        {
          step: '05',
          node: 'side_effect_committed',
          type: 'SYNTHESIZE',
          detail: '(effect-2)',
        },
        {
          step: '06',
          node: 'verdict',
          type: 'VERIFY',
          detail: 'confirmed, 2 side effects for one logical operation',
        },
      ],
      comparisonTable: {
        title: 'UNSAFE CLIENT vs SAFE CLIENT',
        headers: ['UNSAFE CLIENT', 'SAFE CLIENT'],
        rows: [
          {
            metric: 'Idempotency key',
            left: 'none',
            right: 'one stable key created once',
          },
          {
            metric: 'Attempt 2',
            left: 'commits effect-2',
            right: 'idempotent_replay, no new commit',
          },
          {
            metric: 'Observed side effects',
            left: '2',
            right: '1',
          },
          {
            metric: 'Verdict',
            left: 'confirmed',
            right: 'not_reproduced',
          },
        ],
      },
      designDecisions: [
        {
          title: 'The model never decides.',
          detail:
            'The optional LLM fallback only proposes facts that must match exact source evidence, it is off by default, and it cannot set a verdict.',
        },
        {
          title: 'Uncertainty stays uncertain.',
          detail:
            'Missing, reordered or contradictory evidence is inconclusive, never confirmed.',
        },
        {
          title: 'Approval is bound to state.',
          detail:
            'A plan is tied to the source hash, scenario and options, and the runtime re-checks the hash before executing.',
        },
      ],
      results: [
        {
          value: '319',
          label: 'TESTS PASSING',
          detail: '2 skipped by default',
        },
        {
          value: '42',
          label: 'LABELED BENCHMARK CASES',
          detail: '20 development, 10 held-out, 12 independently authored',
        },
        {
          value: '7',
          label: 'EVIDENCE-INTEGRITY TRACES',
          detail: 'Corrupt traces must stay inconclusive',
        },
        {
          value: '3',
          label: 'FAULT SCENARIOS',
          detail: 'lost-response, retryable-error, client-timeout',
        },
        {
          value: 'Finalist',
          label: 'Alan AI OpenFire Hackathon',
          detail: 'Recognized as a Finalist, Oct 2026.',
        },
      ],
      resultsNote:
        'Benchmark is synthetic and self-authored: regression evidence, not a claim about general accuracy.',
      limitations: [
        'Failures are simulated in-process, not injected at the network level.',
        'Executable clients must match a narrow contract (one module-level requests call, POST /payments, allowlisted imports).',
        'Subprocess isolation is not a hardened security sandbox.',
        'A not_reproduced verdict is evidence about one scenario, not proof of production safety.',
      ],
      publicDemoNote:
        'No public demo. Local CLI and dashboard; source and write-up on GitHub.',
      linksNote:
        'Packaged as an Alan Skill that drives the local CLI with plan-bound approval. There is no Alan API client or MCP server.',
      repoUrl: 'https://github.com/KripakaraMN15/ContractBreaker',
      links: {
        repository: 'https://github.com/KripakaraMN15/ContractBreaker',
        screenshots: [
          'Deterministic causal verifier ledger & outcome matrix',
          'AST scenario extraction & cryptographically bound plan artifact',
        ],
      },
      previewType: 'contractbreaker',
      screenshotLink: 'https://github.com/KripakaraMN15/ContractBreaker',
      featured: true,
    },
    {
      order: 2,
      index: '02',
      slug: 'vera',
      name: 'Vera: Merchant Engagement Engine',
      shortTitle: 'Vera Engine',
      tagline:
        'Deterministic merchant engagement engine with a scored 20-actions-per-tick policy and <500ms bilingual intent handling.',
      listDescription: 'Deterministic merchant engagement engine',
      year: '2026',
      date: 'Jun 2026',
      context: 'Magicpin Vera AI Challenge',
      recognition: 'Finalist, Magicpin Vera AI Challenge, Jun 2026',
      badge: {
        label: 'FINALIST',
        context: 'Magicpin Vera AI Challenge',
        period: 'Jun 2026',
        formatted: '★ FINALIST, MAGICPIN VERA AI CHALLENGE, JUN 2026',
      },
      tags: ['Python', 'FastAPI'],
      stack: ['Python', 'FastAPI'],
      bullets: [
        'Deterministic engine that decides when to engage a merchant, picks the highest-signal fact, and composes a category-specific, single-CTA message.',
        'Versioned, idempotent context store and a scored 20-actions-per-tick policy.',
        'Auto-reply, opt-out, and intent handling with Hindi-English language detection; responses under 500 ms.',
      ],
      overview:
        'Vera is a deterministic merchant engagement engine built in Python and FastAPI, selected as a Finalist in the Magicpin Vera AI Challenge (Jun 2026). It evaluates merchant state to decide when to engage, isolates the highest-signal fact, and composes a category-specific, single-CTA message while handling inbound merchant replies under 500 ms.',
      problem:
        'Merchant communication systems must decide accurately when to reach out without spamming, avoid duplicate state mutations across ticks, select the single most actionable insight for a specific merchant category, and handle inbound merchant responses (including opt-outs and Hindi-English queries) with sub-second turnaround.',
      approach: [
        'Engineered a deterministic decision pipeline in Python and FastAPI that evaluates merchant eligibility, picks the highest-signal fact, and composes a category-specific message containing a single clear CTA.',
        'Designed a versioned, idempotent context store paired with a scored 20-actions-per-tick policy so high-priority merchant actions are executed predictably without duplicate dispatches.',
        'Implemented automated reply generation, explicit opt-out enforcement, and intent classification with Hindi-English language detection delivering responses in under 500 ms.',
      ],
      traceTotalMs: '442ms (< 500ms budget)',
      traceNote: 'Simulated LangSmith-style execution timeline illustrating the deterministic tick & reply pipeline.',
      trace: [
        {
          step: '01',
          node: 'context_store.load_versioned',
          type: 'INGEST',
          durationMs: 38,
          detail: 'Loads merchant context snapshot with idempotency key verification and opt-out check.',
          io: {
            input: 'merchant_id, tick_id, version_hash',
            output: 'verified_context_state (idempotent=true)',
          },
        },
        {
          step: '02',
          node: 'policy_scorer.rank_20_per_tick',
          type: 'EVALUATE',
          durationMs: 84,
          detail: 'Scores candidate engagement opportunities and filters within the 20-actions-per-tick policy budget.',
          io: {
            input: 'candidate_facts[], tick_budget=20',
            output: 'highest_signal_fact, action_slot_allocated',
          },
        },
        {
          step: '03',
          node: 'lang_router.detect_hi_en_intent',
          type: 'ROUTE',
          durationMs: 96,
          detail: 'Runs Hindi-English language detection, intent classification, and opt-out guard.',
          io: {
            input: 'inbound_payload, merchant_category',
            output: 'lang="hi-en", intent="ENGAGE_OR_AUTOREPLY"',
          },
        },
        {
          step: '04',
          node: 'composer.category_single_cta',
          type: 'SYNTHESIZE',
          durationMs: 224,
          detail: 'Composes category-specific message with a single CTA and commits new version to context store.',
          io: {
            input: 'highest_signal_fact, category_template',
            output: 'single_cta_message (latency: 442ms < 500ms)',
          },
        },
      ],
      results: [
        {
          value: '< 500ms',
          label: 'Response Latency',
          detail: 'Auto-reply, opt-out, and intent handling with Hindi-English language detection.',
        },
        {
          value: '20 / tick',
          label: 'Scored Action Policy',
          detail: 'Deterministic 20-actions-per-tick policy backed by a versioned, idempotent context store.',
        },
        {
          value: 'Finalist',
          label: 'Magicpin Vera AI Challenge',
          detail: 'Recognized as Finalist in the Magicpin Vera AI Challenge, Jun 2026.',
        },
      ],
      repoUrl: 'https://github.com/KripakaraMN15/MAGICPIN-VERA-AI-CHALLENGE',
      links: {
        repository: 'https://github.com/KripakaraMN15/MAGICPIN-VERA-AI-CHALLENGE',
        screenshots: [
          'Vera 20-actions-per-tick policy inspector',
          'Hindi-English intent & single-CTA message trace',
        ],
      },
      previewType: 'vera',
      featured: true,
    },
    {
      order: 3,
      index: '03',
      slug: 'billara-ai',
      name: 'BillaraAI Smart Invoice Generator',
      shortTitle: 'BillaraAI',
      tagline:
        'Full-stack AI invoicing platform converting text and audio briefs into structured invoices, cutting creation time by ~65%.',
      listDescription: 'AI invoicing from text and audio briefs',
      year: '2025',
      tags: ['React', 'TypeScript', 'Gemini'],
      stack: ['React', 'TypeScript', 'Firebase (Auth & Firestore)', 'Resend API', 'Gemini'],
      bullets: [
        'Full-stack AI invoicing platform converting text and audio briefs into structured invoices in seconds, cutting creation time by ~65%.',
        'Secure backend with server-side API proxying, Firestore RBAC rules, and rate limiting.',
        'Real-time dashboard with penalty calculation, email dispatch, and PDF export.',
      ],
      overview:
        'BillaraAI is a full-stack AI invoicing platform built with React, TypeScript, Firebase (Auth & Firestore), Resend API, and Gemini. It converts unstructured text and audio briefs into structured invoices in seconds, cutting invoice creation time by ~65%.',
      problem:
        'Manual invoice drafting from client notes or voice briefs is repetitive and slow, while client-side AI integrations risk exposing API credentials or bypassing access rules when managing billing records, overdue penalties, and transactional email delivery.',
      approach: [
        'Built a multimodal extraction workflow powered by Gemini that parses raw text and audio briefs into structured invoice line items, taxes, and client metadata in seconds.',
        'Hardened the backend architecture with server-side API proxying, strict Firestore RBAC security rules, and request rate limiting.',
        'Implemented a real-time dashboard supporting automated penalty calculation, transactional email dispatch via Resend API, and formatted PDF export.',
      ],
      traceTotalMs: '1,180ms (simulated pipeline trace)',
      traceNote: 'Simulated LangSmith-style execution timeline illustrating the brief-to-invoice pipeline.',
      trace: [
        {
          step: '01',
          node: 'edge_proxy.rate_limit_and_rbac',
          type: 'GUARD',
          durationMs: 42,
          detail: 'Verifies Firebase Auth session, Firestore RBAC permissions, and per-user rate limit.',
          io: {
            input: 'auth_token, brief_payload (text | audio)',
            output: 'session_verified=true, quota_ok=true',
          },
        },
        {
          step: '02',
          node: 'gemini_extractor.parse_brief',
          type: 'SYNTHESIZE',
          durationMs: 890,
          detail: 'Server-side Gemini call converting text/audio brief into structured JSON invoice schema.',
          io: {
            input: 'raw_brief_content',
            output: 'structured_invoice { client, items[], tax, due_date }',
          },
        },
        {
          step: '03',
          node: 'firestore_ledger.compute_penalties',
          type: 'EVALUATE',
          durationMs: 118,
          detail: 'Persists invoice document under Firestore RBAC rules and evaluates real-time penalty rules.',
          io: {
            input: 'structured_invoice, penalty_policy',
            output: 'ledger_doc_id, computed_totals',
          },
        },
        {
          step: '04',
          node: 'dispatch.pdf_and_resend_email',
          type: 'DISPATCH',
          durationMs: 130,
          detail: 'Generates downloadable PDF export and dispatches invoice notification via Resend API.',
          io: {
            input: 'ledger_doc_id, recipient_email',
            output: 'pdf_ready=true, email_dispatched=true',
          },
        },
      ],
      results: [
        {
          value: '~65%',
          label: 'Faster Invoice Creation',
          detail: 'Converts text and audio briefs into structured invoices in seconds.',
        },
        {
          value: 'RBAC',
          label: 'Zero Client Key Exposure',
          detail: 'Secured via server-side API proxying, Firestore RBAC rules, and rate limiting.',
        },
        {
          value: 'Real-Time',
          label: 'Billing Operations',
          detail: 'Integrated penalty calculation, Resend API email dispatch, and PDF export.',
        },
      ],
      liveUrl: 'https://billaraai-166180432228.asia-southeast1.run.app/',
      repoUrl: 'https://github.com/KripakaraMN15/BillaraAI',
      links: {
        liveDemo: 'https://billaraai-166180432228.asia-southeast1.run.app/',
        repository: 'https://github.com/KripakaraMN15/BillaraAI',
        screenshots: [
          'Text & audio brief to structured invoice view',
          'Real-time dashboard with penalty calculation & PDF export',
        ],
      },
      previewType: 'billara',
      screenshot: '/projects/billaraai.png',
      screenshotAlt: 'BillaraAI dashboard showing a generated invoice',
      screenshotLink: 'https://billaraai-166180432228.asia-southeast1.run.app/',
      featured: false,
    },
    {
      order: 4,
      index: '04',
      slug: 'live-data-viz',
      name: 'LiveDataViz — Conversational Data Visualization',
      shortTitle: 'LiveDataViz',
      tagline:
        'NL2Code engine translating user queries into Vega-Lite schemas with Hybrid RAG and zero-data-retention TTL cleanup.',
      listDescription: 'Natural-language to Vega-Lite charts with hybrid RAG',
      year: '2025',
      tags: ['React', 'RAG', 'Vega-Lite'],
      stack: ['React.js', 'JavaScript', 'RAG', 'BM25', 'Gemini Embeddings', 'Vega-Lite'],
      bullets: [
        'NL2Code engine translating user queries into Vega-Lite schemas, reducing chart creation time by ~80%.',
        'Hybrid RAG (Gemini Embeddings + BM25) retrieving dataset statistics, categorical values, and sample records to ground LLM-generated charts.',
        'Vector store with automatic 30-minute TTL cleanup and explicit session deletion (zero-data-retention architecture).',
      ],
      overview:
        'LiveDataViz is a conversational data visualization system built with React.js, JavaScript, Hybrid RAG (Gemini Embeddings + BM25), and Vega-Lite. Its NL2Code engine translates natural-language queries into executable Vega-Lite chart specifications, reducing chart creation time by ~80% while enforcing a zero-data-retention architecture.',
      problem:
        'Generating data visualizations via LLMs often fails when the model hallucinates column names, misjudges data distributions, or retains sensitive user datasets indefinitely in vector storage.',
      approach: [
        'Built an NL2Code translation pipeline that converts natural-language analytical queries directly into declarative Vega-Lite schemas rendered in React.js.',
        'Implemented Hybrid RAG combining dense Gemini Embeddings with sparse BM25 lexical retrieval to pull dataset statistics, exact categorical values, and sample records into the prompt context.',
        'Engineered a zero-data-retention vector store featuring automatic 30-minute TTL cleanup and explicit one-click session deletion.',
      ],
      traceTotalMs: '670ms (simulated pipeline trace)',
      traceNote: 'Simulated LangSmith-style execution timeline illustrating the Hybrid RAG to Vega-Lite flow.',
      trace: [
        {
          step: '01',
          node: 'session_store.index_ephemeral_ttl',
          type: 'INGEST',
          durationMs: 95,
          detail: 'Indexes dataset schema, statistics, and categorical values with a 30-minute TTL timer.',
          io: {
            input: 'dataset_frame, ttl_minutes=30',
            output: 'ephemeral_session_id, schema_stats_index',
          },
        },
        {
          step: '02',
          node: 'hybrid_rag.retrieve_bm25_dense',
          type: 'RETRIEVE',
          durationMs: 145,
          detail: 'Executes hybrid retrieval (Gemini Embeddings + BM25) for column stats and sample records.',
          io: {
            input: 'user_nl_query, ephemeral_session_id',
            output: 'grounded_columns[], categorical_values[], sample_rows[]',
          },
        },
        {
          step: '03',
          node: 'nl2code.synthesize_vega_lite',
          type: 'SYNTHESIZE',
          durationMs: 390,
          detail: 'Translates natural-language intent and grounded dataset context into a valid Vega-Lite spec.',
          io: {
            input: 'user_nl_query, grounded_context',
            output: 'vega_lite_spec.json',
          },
        },
        {
          step: '04',
          node: 'ttl_reaper.zero_retention_guard',
          type: 'GUARD',
          durationMs: 40,
          detail: 'Schedules automatic 30-minute TTL purge or processes explicit session deletion.',
          io: {
            input: 'ephemeral_session_id',
            output: 'retention_policy="ZERO_RETENTION_30M_TTL"',
          },
        },
      ],
      results: [
        {
          value: '~80%',
          label: 'Faster Chart Creation',
          detail: 'NL2Code engine translating user queries directly into Vega-Lite schemas.',
        },
        {
          value: '30m TTL',
          label: 'Zero-Data-Retention',
          detail: 'Vector store with automatic 30-minute TTL cleanup and explicit session deletion.',
        },
        {
          value: 'Hybrid RAG',
          label: 'Grounded Schemas',
          detail: 'Combines Gemini Embeddings + BM25 to retrieve stats, categories, and sample rows.',
        },
      ],
      liveUrl: 'https://dataliveviz-1050064655758.asia-southeast1.run.app/',
      repoUrl: 'https://github.com/KripakaraMN15/LiveDataViz',
      links: {
        liveDemo: 'https://dataliveviz-1050064655758.asia-southeast1.run.app/',
        repository: 'https://github.com/KripakaraMN15/LiveDataViz',
        screenshots: [
          'Conversational NL2Code prompt to Vega-Lite chart canvas',
          'Hybrid RAG grounding context & 30-minute TTL session monitor',
        ],
      },
      previewType: 'livedataviz',
      screenshot: '/projects/livedataviz.png',
      screenshotAlt: 'LiveDataViz dashboard showing real-time interactive charts and analytics',
      screenshotLink: 'https://dataliveviz-1050064655758.asia-southeast1.run.app/',
      featured: false,
    },
    {
      order: 5,
      index: '05',
      slug: 'tripbuddy-ai',
      name: 'TripBuddy AI — Multi-Agent Travel Planner',
      shortTitle: 'TripBuddy AI',
      tagline:
        '5-agent LangGraph system across 9 workflow nodes with 3 live MCP providers and human-in-the-loop booking approval.',
      listDescription: '5-agent LangGraph travel planner',
      year: '2025',
      tags: ['Python', 'LangGraph', 'Multi-Agent'],
      stack: ['Python', 'Next.js', 'LangGraph', 'LangSmith', 'MCP', 'FastAPI', 'PostgreSQL', 'Docker'],
      bullets: [
        '5-agent LangGraph system across 9 workflow nodes (flight, hotel, weather, budgeting, itinerary) with supervisor-based routing.',
        '3 live data providers via Model Context Protocol (MCP) over remote HTTP and local stdio, plus a human-in-the-loop approval step for critical bookings.',
        'Multi-stage Docker build (non-root user, health check) and deployed.',
      ],
      overview:
        'TripBuddy AI is a multi-agent travel planning platform built with Python, Next.js, LangGraph, LangSmith, FastAPI, PostgreSQL, and Docker. It orchestrates a 5-agent LangGraph system across 9 workflow nodes with supervisor-based routing, 3 live Model Context Protocol (MCP) data providers, and human-in-the-loop approval for critical bookings.',
      problem:
        'End-to-end travel planning requires coordinating interdependent constraints—flights, hotels, live weather, budgeting, and daily itineraries—while interfacing with heterogeneous external data sources and preventing autonomous agents from executing unapproved financial bookings.',
      approach: [
        'Architected a 5-agent LangGraph state graph spanning 9 specialized workflow nodes (flight, hotel, weather, budgeting, itinerary) coordinated by supervisor-based routing and traced in LangSmith.',
        'Connected 3 live data providers using the Model Context Protocol (MCP) over both remote HTTP and local stdio transports, and gated critical booking actions behind a human-in-the-loop interrupt/approval node.',
        'Containerized and deployed the service using a production multi-stage Docker build hardened with a non-root runtime user and container health checks.',
      ],
      traceTotalMs: '1,420ms + HITL Gate (simulated LangSmith trace)',
      traceNote: 'Simulated LangSmith-style execution timeline across the 9 workflow nodes and 3 MCP providers.',
      trace: [
        {
          step: '01',
          node: 'supervisor.route_state_graph',
          type: 'ROUTE',
          durationMs: 110,
          detail: 'Supervisor evaluates user constraints and dispatches tasks across the 5-agent, 9-node LangGraph workflow.',
          io: {
            input: 'origin, destination, dates, budget_cap',
            output: 'active_nodes: [flight, hotel, weather, budgeting, itinerary]',
          },
        },
        {
          step: '02',
          node: 'mcp_bridge.fetch_3_live_providers',
          type: 'RETRIEVE',
          durationMs: 640,
          detail: 'Queries 3 live data providers via MCP over remote HTTP and local stdio for flights, hotels, and weather.',
          io: {
            input: 'mcp_transports: ["http_remote", "stdio_local"]',
            output: 'live_flights[], live_hotels[], weather_forecast[]',
          },
        },
        {
          step: '03',
          node: 'budget_and_itinerary.reconcile',
          type: 'EVALUATE',
          durationMs: 480,
          detail: 'Budgeting and itinerary agents reconcile costs and assemble day-by-day schedule in PostgreSQL.',
          io: {
            input: 'provider_options, budget_cap',
            output: 'validated_itinerary_graph',
          },
        },
        {
          step: '04',
          node: 'hitl_gate.require_booking_approval',
          type: 'GUARD',
          durationMs: 190,
          detail: 'Pauses graph execution at human-in-the-loop approval checkpoint before executing critical bookings.',
          io: {
            input: 'pending_booking_payload',
            output: 'status="AWAITING_HUMAN_APPROVAL" (LangSmith trace logged)',
          },
        },
      ],
      results: [
        {
          value: '5 Agents / 9 Nodes',
          label: 'LangGraph Topology',
          detail: 'Supervisor-routed flight, hotel, weather, budgeting, and itinerary workflow nodes.',
        },
        {
          value: '3 MCP Providers',
          label: 'Live Tooling (HTTP + stdio)',
          detail: 'Connected via Model Context Protocol with a human-in-the-loop booking approval gate.',
        },
        {
          value: 'Multi-Stage',
          label: 'Hardened Docker Deploy',
          detail: 'Production container build running as non-root user with automated health check.',
        },
      ],
      liveUrl: 'https://tripbuddy-multiagent-travel-planner-1.onrender.com/',
      repoUrl: 'https://github.com/KripakaraMN15/TripBuddy-MultiAgent-Travel-Planner',
      liveUrlHint: 'First load may take ~30–60s (free-tier cold start).',
      links: {
        liveDemo: 'https://tripbuddy-multiagent-travel-planner-1.onrender.com/',
        repository: 'https://github.com/KripakaraMN15/TripBuddy-MultiAgent-Travel-Planner',
        screenshots: [
          '5-agent / 9-node LangGraph supervisor trace in LangSmith',
          'Human-in-the-loop booking approval modal & itinerary view',
        ],
      },
      previewType: 'tripbuddy',
      screenshot: '/projects/tripbuddy.png',
      screenshotAlt: 'TripBuddy AI itinerary planner showing interactive travel map and itinerary',
      screenshotLink: 'https://tripbuddy-multiagent-travel-planner-1.onrender.com/',
      featured: false,
    },
  ],

  education: {
    degree: 'B.E. Computer Science and Engineering',
    institution: 'B.M.S College of Engineering',
    location: 'Bengaluru',
    period: 'Dec 2020 – Jun 2024',
    cgpa: '8.2/10',
  },

  certifications: [
    {
      title: 'Claude with the Anthropic API',
      issuer: 'Anthropic',
      date: 'Mar 2026',
    },
    {
      title: 'AI Fluency: Framework & Foundations',
      issuer: 'Anthropic',
      date: 'Mar 2026',
    },
    {
      title: 'GitHub Foundations',
      issuer: 'DataCamp',
      date: 'Jan 2026',
    },
    {
      title: 'AWS Training and Certification',
      issuer: 'AWS',
      date: 'Dec 2025',
    },
  ],

  currently: [
    'Open to full-time AI / ML / Full-Stack Engineering roles.',
    'Building multi-agent LLM systems with LangGraph and Model Context Protocol (MCP).',
  ],
};
