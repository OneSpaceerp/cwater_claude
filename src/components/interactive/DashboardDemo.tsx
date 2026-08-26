'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { Icon } from '@/components/ui/Icon';
import { dictionary as D } from '@/content/dictionary';
import { t, type Locale } from '@/lib/i18n';
import { cn } from '@/lib/utils';

/**
 * Signature interaction 04 — the conceptual monitoring dashboard.
 *
 * Presents water treatment as something measurable: parameters drift within
 * plausible bands, the trend line builds, dosing state responds.
 *
 * HONESTY: every value here is generated in the browser. The panel carries a
 * permanent "simulated data" label — not a footnote — because presenting
 * invented plant readings as real would be exactly the kind of fabrication the
 * rest of this site avoids. It represents no customer installation.
 */

interface Param {
  id: string;
  label: string;
  unit: string;
  base: number;
  drift: number;
  decimals: number;
}

const PARAMS: Param[] = [
  { id: 'ph', label: 'pH', unit: '', base: 7.42, drift: 0.06, decimals: 2 },
  { id: 'cond', label: 'Conductivity', unit: 'µS/cm', base: 1840, drift: 55, decimals: 0 },
  { id: 'orp', label: 'ORP', unit: 'mV', base: 312, drift: 14, decimals: 0 },
  { id: 'flow', label: 'Flow', unit: 'm³/h', base: 120, drift: 4, decimals: 1 },
];

const TREND_POINTS = 48;

export function DashboardDemo({ locale, className }: { locale: Locale; className?: string }) {
  const reduce = useReducedMotion();
  const [running, setRunning] = useState(!reduce);
  const [values, setValues] = useState<number[]>(PARAMS.map((p) => p.base));
  const [trend, setTrend] = useState<number[]>(() =>
    Array.from({ length: TREND_POINTS }, (_, i) => 0.5 + Math.sin(i / 5.5) * 0.22 + Math.sin(i / 2.3) * 0.06),
  );
  const phase = useRef(0);

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => {
      phase.current += 1;
      const p = phase.current;

      setValues(
        PARAMS.map((param, i) => {
          // Smooth, bounded wander — two out-of-phase sinusoids plus a small
          // deterministic jitter, so it reads as a live process rather than noise.
          const wander = Math.sin(p / (7 + i * 2.5)) * 0.6 + Math.sin(p / (3.1 + i)) * 0.4;
          return param.base + wander * param.drift;
        }),
      );

      setTrend((prev) => {
        const next = prev.slice(1);
        const v = 0.5 + Math.sin(p / 5.5) * 0.22 + Math.sin(p / 2.3) * 0.06;
        next.push(Math.min(0.94, Math.max(0.06, v)));
        return next;
      });
    }, 1400);
    return () => window.clearInterval(id);
  }, [running]);

  const path = trend
    .map((v, i) => `${i === 0 ? 'M' : 'L'} ${(i / (TREND_POINTS - 1)) * 320} ${64 - v * 56}`)
    .join(' ');
  const area = `${path} L 320 64 L 0 64 Z`;

  return (
    <div className={cn('relative border border-white/12 bg-ink-950', className)}>
      <span aria-hidden className="absolute -top-px start-0 h-0.5 w-16 bg-signal-400" />

      {/* ---- Header: status and the simulation label ---- */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-3.5">
        <div className="flex items-center gap-2.5">
          <span
            className={cn('h-1.5 w-1.5 rounded-full bg-ok-500', running && !reduce && 'motion-safe:animate-pulse')}
            aria-hidden
          />
          <span className="u-label text-ink-300">{t(D.dashboard.systemStatus, locale)}</span>
          <span className="font-mono text-[0.6875rem] tracking-[0.16em] text-ok-500 uppercase">
            {t(D.dashboard.healthy, locale)}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 rounded-sm border border-warn-500/35 bg-warn-500/10 px-2 py-1 font-mono text-[0.625rem] tracking-[0.12em] text-warn-500 uppercase">
            <Icon name="clipboard" size={11} />
            {t(D.dashboard.simulated, locale)}
          </span>
          {!reduce ? (
            <button
              type="button"
              onClick={() => setRunning((r) => !r)}
              className="rounded-sm px-2 py-1 font-mono text-[0.625rem] tracking-[0.12em] text-ink-400 uppercase transition-colors hover:text-white"
            >
              {running ? t(D.dashboard.pause, locale) : t(D.dashboard.play, locale)}
            </button>
          ) : null}
        </div>
      </div>

      {/* ---- Parameter tiles ---- */}
      <div className="grid grid-cols-2 divide-x divide-y divide-white/10 sm:grid-cols-4 sm:divide-y-0 rtl:divide-x-reverse">
        {PARAMS.map((param, i) => (
          <div key={param.id} className="px-5 py-4">
            <p className="u-label text-ink-400">{param.label}</p>
            <p className="mt-1.5 flex items-baseline gap-1.5">
              <span className="tnum font-mono text-xl text-white tabular-nums sm:text-2xl">
                {values[i].toFixed(param.decimals)}
              </span>
              {param.unit ? <span className="font-mono text-[0.6875rem] text-ink-400">{param.unit}</span> : null}
            </p>
          </div>
        ))}
      </div>

      {/* ---- Trend ---- */}
      <div className="border-t border-white/10 px-5 py-4">
        <p className="u-label mb-3 text-ink-400">{t(D.dashboard.trend, locale)}</p>
        <svg viewBox="0 0 320 64" className="h-16 w-full" preserveAspectRatio="none" aria-hidden>
          <defs>
            <linearGradient id="dash-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#188ECE" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#188ECE" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Reference gridlines. */}
          {[16, 32, 48].map((y) => (
            <line key={y} x1="0" y1={y} x2="320" y2={y} stroke="#188ECE" strokeOpacity="0.1" strokeWidth="0.5" />
          ))}
          <path d={area} fill="url(#dash-fill)" />
          <path d={path} fill="none" stroke="#3FACDF" strokeWidth="1.5" strokeLinejoin="round" />
          {/* Leading point. */}
          <circle cx="320" cy={64 - trend[trend.length - 1] * 56} r="2.5" fill="#77C6EC" />
        </svg>
      </div>

      {/* ---- State row ---- */}
      <div className="grid grid-cols-2 divide-x divide-y divide-white/10 border-t border-white/10 sm:grid-cols-4 sm:divide-y-0 rtl:divide-x-reverse">
        <StateCell label={t(D.dashboard.dosing, locale)} value={t(D.dashboard.active, locale)} tone="ok" />
        <StateCell label={t(D.dashboard.sensor, locale)} value={t(D.dashboard.normal, locale)} tone="ok" />
        <StateCell label={t(D.dashboard.alarm, locale)} value={t(D.dashboard.none, locale)} tone="muted" />
        <StateCell label={t(D.dashboard.data, locale)} value={t(D.dashboard.live, locale)} tone="signal" />
      </div>

      <p className="border-t border-white/10 px-5 py-3 text-[0.75rem] leading-relaxed text-ink-400">
        {t(D.dashboard.simulatedNote, locale)}
      </p>
    </div>
  );
}

function StateCell({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: 'ok' | 'signal' | 'muted';
}) {
  const tones = {
    ok: 'text-ok-500',
    signal: 'text-signal-300',
    muted: 'text-ink-400',
  } as const;
  return (
    <div className="px-5 py-3.5">
      <p className="u-label text-ink-400">{label}</p>
      <p className={cn('mt-1 font-mono text-[0.6875rem] tracking-[0.14em] uppercase', tones[tone])}>{value}</p>
    </div>
  );
}
