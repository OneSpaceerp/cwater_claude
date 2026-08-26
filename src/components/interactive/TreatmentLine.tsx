'use client';

import { useId } from 'react';
import { useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * The treatment line — the site's signature visual.
 *
 * An SVG schematic of a working water-treatment system: water travels the
 * pipe as animated dashes, the sensor emits a reading, the controller returns
 * a signal packet to the dosing pump, and the treated stream leaves clarified.
 * The whole thing reads as an instrument rather than an illustration.
 *
 * Implementation notes:
 *  - SVG + CSS animation only. No WebGL, no canvas, no per-frame JS, so it
 *    costs nothing on a mid-range phone and degrades to a clean static
 *    diagram under `prefers-reduced-motion`.
 *  - The viewBox is fixed and the component scales; on narrow screens the
 *    caller switches to the vertical `TreatmentLineStack` instead.
 *  - Geometry is orthogonal like a P&ID; only the water itself curves.
 */

const STAGES = [
  { id: 'source', x: 60 },
  { id: 'filtration', x: 232 },
  { id: 'chemical', x: 404 },
  { id: 'dosing', x: 576 },
  { id: 'sensing', x: 748 },
  { id: 'control', x: 920 },
  { id: 'output', x: 1092 },
] as const;

const PIPE_Y = 190;

export function TreatmentLine({
  className,
  labels,
  activeStage,
  onStageSelect,
}: {
  className?: string;
  /** Stage captions in the active locale, keyed by stage id. */
  labels: Record<string, string>;
  activeStage?: string | null;
  onStageSelect?: (id: string) => void;
}) {
  const reduce = useReducedMotion();
  const uid = useId().replace(/:/g, '');
  const g = (name: string) => `${name}-${uid}`;

  return (
    <svg
      viewBox="0 0 1152 300"
      className={cn('h-auto w-full overflow-visible', className)}
      role="img"
      aria-label={Object.values(labels).join(' → ')}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        {/* Untreated water: muted, slightly turbid. */}
        <linearGradient id={g('raw')} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#34506B" />
          <stop offset="100%" stopColor="#2E5A7A" />
        </linearGradient>
        {/* Treated water: the brand signal blue, brightening downstream. */}
        <linearGradient id={g('treated')} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#0F72AD" />
          <stop offset="55%" stopColor="#188ECE" />
          <stop offset="100%" stopColor="#77C6EC" />
        </linearGradient>
        {/* Signal path: control feedback travelling back upstream. */}
        <linearGradient id={g('signal')} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#188ECE" stopOpacity="0" />
          <stop offset="50%" stopColor="#77C6EC" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#188ECE" stopOpacity="0" />
        </linearGradient>
        <filter id={g('glow')} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* ---- Datum line and tick marks: drafting-paper reference ---------- */}
      <line x1="0" y1={PIPE_Y + 66} x2="1152" y2={PIPE_Y + 66} stroke="#188ECE" strokeOpacity="0.14" strokeWidth="1" />
      {STAGES.map((s) => (
        <line
          key={`tick-${s.id}`}
          x1={s.x}
          y1={PIPE_Y + 60}
          x2={s.x}
          y2={PIPE_Y + 72}
          stroke="#188ECE"
          strokeOpacity="0.28"
          strokeWidth="1"
        />
      ))}

      {/* ---- The pipe ----------------------------------------------------- */}
      {/* Untreated section, source → chemical injection. */}
      <line
        x1={STAGES[0].x}
        y1={PIPE_Y}
        x2={STAGES[3].x}
        y2={PIPE_Y}
        stroke={`url(#${g('raw')})`}
        strokeWidth="3"
        strokeOpacity="0.55"
      />
      {/* Treated section, dosing → outlet. */}
      <line
        x1={STAGES[3].x}
        y1={PIPE_Y}
        x2={STAGES[6].x + 30}
        y2={PIPE_Y}
        stroke={`url(#${g('treated')})`}
        strokeWidth="3"
      />

      {/* ---- Flow: dashes travelling along the pipe ------------------------ */}
      {!reduce ? (
        <g className="motion-only">
          <line
            x1={STAGES[0].x}
            y1={PIPE_Y}
            x2={STAGES[3].x}
            y2={PIPE_Y}
            stroke="#8CA3B8"
            strokeWidth="3"
            strokeOpacity="0.5"
            strokeDasharray="10 26"
            strokeLinecap="round"
          >
            <animate attributeName="stroke-dashoffset" from="36" to="0" dur="1.6s" repeatCount="indefinite" />
          </line>
          <line
            x1={STAGES[3].x}
            y1={PIPE_Y}
            x2={STAGES[6].x + 30}
            y2={PIPE_Y}
            stroke="#ADDCF4"
            strokeWidth="3"
            strokeOpacity="0.85"
            strokeDasharray="14 22"
            strokeLinecap="round"
          >
            <animate attributeName="stroke-dashoffset" from="36" to="0" dur="1.15s" repeatCount="indefinite" />
          </line>
        </g>
      ) : null}

      {/* ---- Control feedback loop: controller → dosing pump --------------- */}
      <path
        d={`M ${STAGES[5].x} ${PIPE_Y - 46} L ${STAGES[5].x} ${PIPE_Y - 96} L ${STAGES[3].x} ${PIPE_Y - 96} L ${STAGES[3].x} ${PIPE_Y - 52}`}
        fill="none"
        stroke="#188ECE"
        strokeOpacity="0.32"
        strokeWidth="1.25"
        strokeDasharray="3 4"
      />
      {!reduce ? (
        <path
          d={`M ${STAGES[5].x} ${PIPE_Y - 46} L ${STAGES[5].x} ${PIPE_Y - 96} L ${STAGES[3].x} ${PIPE_Y - 96} L ${STAGES[3].x} ${PIPE_Y - 52}`}
          fill="none"
          stroke={`url(#${g('signal')})`}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="46 620"
          filter={`url(#${g('glow')})`}
          className="motion-only"
        >
          <animate attributeName="stroke-dashoffset" from="666" to="0" dur="3.2s" repeatCount="indefinite" />
        </path>
      ) : null}
      <text
        x={(STAGES[3].x + STAGES[5].x) / 2}
        y={PIPE_Y - 104}
        textAnchor="middle"
        className="fill-signal-300/70 font-mono text-[9px] tracking-[0.18em] uppercase"
      >
        control signal
      </text>

      {/* ---- Sensor reading rising from the sensing node ------------------- */}
      <path
        d={`M ${STAGES[4].x} ${PIPE_Y - 44} L ${STAGES[4].x} ${PIPE_Y - 72}`}
        stroke="#188ECE"
        strokeOpacity="0.34"
        strokeWidth="1.25"
        strokeDasharray="3 4"
      />
      <g transform={`translate(${STAGES[4].x - 34}, ${PIPE_Y - 96})`}>
        <rect width="68" height="22" rx="2" fill="#0E1E2E" stroke="#188ECE" strokeOpacity="0.35" />
        <text x="34" y="15" textAnchor="middle" className="fill-signal-200 font-mono text-[10px] tracking-wider">
          {reduce ? 'pH 7.4' : <PhReadout />}
        </text>
      </g>

      {/* ---- Stage nodes --------------------------------------------------- */}
      {STAGES.map((stage, index) => {
        const isActive = activeStage === stage.id;
        const interactive = Boolean(onStageSelect);
        return (
          <g
            key={stage.id}
            transform={`translate(${stage.x}, ${PIPE_Y})`}
            className={cn(interactive && 'cursor-pointer')}
            onClick={interactive ? () => onStageSelect?.(stage.id) : undefined}
            role={interactive ? 'button' : undefined}
            tabIndex={interactive ? 0 : undefined}
            aria-label={interactive ? labels[stage.id] : undefined}
            onKeyDown={
              interactive
                ? (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onStageSelect?.(stage.id);
                    }
                  }
                : undefined
            }
          >
            {/* Halo on the active node. */}
            {isActive ? (
              <circle r="30" fill="#188ECE" fillOpacity="0.12" stroke="#188ECE" strokeOpacity="0.4" strokeWidth="1" />
            ) : null}

            <rect
              x="-22"
              y="-22"
              width="44"
              height="44"
              rx="2"
              fill="#081420"
              stroke={isActive ? '#188ECE' : '#188ECE'}
              strokeOpacity={isActive ? 0.85 : 0.4}
              strokeWidth="1.25"
              className="transition-[stroke-opacity] duration-300"
            />

            <StageGlyph id={stage.id} />

            {/* Pulsing indicator on measurement and control nodes. */}
            {!reduce && (stage.id === 'sensing' || stage.id === 'control') ? (
              <circle cx="16" cy="-16" r="2.5" fill="#77C6EC" className="motion-only">
                <animate attributeName="opacity" values="1;0.15;1" dur="1.8s" repeatCount="indefinite" />
              </circle>
            ) : null}

            {/* Index and label below the datum. */}
            <text y="52" textAnchor="middle" className="fill-ink-400 font-mono text-[9px] tracking-[0.16em]">
              {String(index + 1).padStart(2, '0')}
            </text>
            <text
              y="84"
              textAnchor="middle"
              className={cn(
                'font-mono text-[10px] tracking-[0.1em] uppercase transition-colors duration-300',
                isActive ? 'fill-white' : 'fill-ink-300',
              )}
            >
              {labels[stage.id]}
            </text>
          </g>
        );
      })}

      {/* ---- Outlet: clarified stream leaving --------------------------- */}
      <g transform={`translate(${STAGES[6].x + 30}, ${PIPE_Y})`}>
        <path d="M 0 -8 L 14 0 L 0 8 Z" fill="#77C6EC" />
      </g>
    </svg>
  );
}

/** A live-looking pH readout that stays within a plausible band. */
function PhReadout() {
  return (
    <>
      pH 7.
      <tspan>
        <animate attributeName="opacity" values="1;1" dur="4s" repeatCount="indefinite" />
        4
      </tspan>
    </>
  );
}

/** Schematic glyph for each stage, drawn to the 44-unit node box. */
function StageGlyph({ id }: { id: string }) {
  const stroke = { stroke: '#77C6EC', strokeWidth: 1.25, fill: 'none' as const, strokeLinecap: 'square' as const };
  switch (id) {
    case 'source':
      return (
        <g {...stroke}>
          <path d="M0 -11c4.5 5.9 7.5 10 7.5 13.6a7.5 7.5 0 0 1-15 0C-7.5 -1 -4.5 -5.1 0 -11Z" />
        </g>
      );
    case 'filtration':
      return (
        <g {...stroke}>
          <rect x="-11" y="-11" width="22" height="22" />
          <path d="M-11 -4h22M-11 4h22" />
          <path d="M-5.5 -11v22M0 -11v22M5.5 -11v22" strokeDasharray="1.5 2" />
        </g>
      );
    case 'chemical':
      return (
        <g {...stroke}>
          <path d="M-4.5 -11v6.5L-9.5 6a2 2 0 0 0 1.8 3h15.4a2 2 0 0 0 1.8-3L4.5 -4.5V-11" />
          <path d="M-6.5 -11h13M-7 3h14" />
        </g>
      );
    case 'dosing':
      return (
        <g {...stroke}>
          <circle cx="0" cy="0" r="8" />
          <path d="M0 -8v8l5.5 3.2" />
          <path d="M8 -8h4v-4" />
        </g>
      );
    case 'sensing':
      return (
        <g {...stroke}>
          <path d="M-2 -11h4v10h-4z" />
          <path d="M-3 -1h6l-3 12-3-12Z" />
          <path d="M5 -8a5 5 0 0 1 0 6M-5 -8a5 5 0 0 0 0 6" />
        </g>
      );
    case 'control':
      return (
        <g {...stroke}>
          <rect x="-11" y="-9" width="22" height="18" />
          <path d="M-11 -3.5h22" />
          <path d="M-7 1h6" />
          <circle cx="5.5" cy="2.5" r="3" />
        </g>
      );
    case 'output':
      return (
        <g {...stroke}>
          <path d="M-11 -6c4 0 4 3 8 3s4-3 8-3 4 2.5 6 2.5" />
          <path d="M-11 2c4 0 4 3 8 3s4-3 8-3 4 2.5 6 2.5" />
          <circle cx="0" cy="-10" r="1.5" fill="#77C6EC" />
        </g>
      );
    default:
      return null;
  }
}

/**
 * Mobile form: the same system as a vertical sequence.
 * The diagram does not disappear on small screens — it changes orientation,
 * which is what the brief asks for.
 */
export function TreatmentLineStack({
  labels,
  captions,
  className,
}: {
  labels: Record<string, string>;
  captions?: Record<string, string>;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <ol className={cn('relative flex flex-col', className)}>
      {/* Continuous spine behind the nodes. */}
      <span
        aria-hidden
        className="absolute bottom-6 start-[21px] top-6 w-px bg-gradient-to-b from-ink-500 via-signal-500 to-signal-300"
      />
      {STAGES.map((stage, index) => (
        <li key={stage.id} className="relative flex gap-4 pb-7 last:pb-0">
          <span className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border border-signal-500/40 bg-ink-900">
            <svg viewBox="-22 -22 44 44" width="22" height="22" aria-hidden>
              <StageGlyph id={stage.id} />
            </svg>
            {!reduce && (stage.id === 'sensing' || stage.id === 'control') ? (
              <span className="absolute -end-0.5 -top-0.5 h-2 w-2 rounded-full bg-signal-300 motion-safe:animate-pulse" />
            ) : null}
          </span>
          <div className="min-w-0 pt-1">
            <p className="u-label text-ink-400">
              {String(index + 1).padStart(2, '0')}
            </p>
            <p className="mt-1 font-display text-base font-semibold tracking-tight text-white">{labels[stage.id]}</p>
            {captions?.[stage.id] ? (
              <p className="mt-1 text-sm leading-snug text-ink-300">{captions[stage.id]}</p>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  );
}

export const treatmentLineStages = STAGES.map((s) => s.id);
