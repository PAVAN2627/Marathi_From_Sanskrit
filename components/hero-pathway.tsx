'use client';

import { cn } from '@/lib/utils';
import type { HistoricalStage } from '@/lib/types';

const stages: { name: HistoricalStage; form: string; ipa: string; colorClass: string; dotClass: string }[] = [
  { name: 'Sanskrit', form: 'धर्म', ipa: '/dʱarma/', colorClass: 'stage-sanskrit', dotClass: 'stage-dot-sanskrit' },
  { name: 'Prakrit', form: 'धम्म', ipa: '/dʱamma/', colorClass: 'stage-prakrit', dotClass: 'stage-dot-prakrit' },
  { name: 'Apabhramsha', form: 'धम्म', ipa: '/dʱamma/', colorClass: 'stage-apabhramsha', dotClass: 'stage-dot-apabhramsha' },
  { name: 'Old Marathi', form: 'धरम', ipa: '/dʱarama/', colorClass: 'stage-old-marathi', dotClass: 'stage-dot-old-marathi' },
  { name: 'Modern Marathi', form: 'धर्म', ipa: '/dʱarma/', colorClass: 'stage-modern-marathi', dotClass: 'stage-dot-modern-marathi' },
];

export function HeroPathway() {
  return (
    <div className="flex flex-col items-center gap-0 py-2">
      {stages.map((stage, i) => (
        <div key={stage.name} className="flex flex-col items-center">
          <div
            className="group relative flex items-center gap-4 rounded-2xl border border-border bg-card/60 backdrop-blur-sm px-6 py-3 transition-all hover:border-primary/30 hover:shadow-md animate-fade-in-up"
            style={{ animationDelay: `${i * 120}ms` }}
          >
            <div className={cn('h-3 w-3 rounded-full', stage.dotClass)} />
            <div className="text-left">
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">{stage.name}</div>
              <div className={cn('devanagari text-2xl font-semibold', stage.colorClass)}>{stage.form}</div>
              <div className="mono text-xs text-muted-foreground">{stage.ipa}</div>
            </div>
          </div>
          {i < stages.length - 1 && (
            <div className="h-8 w-px bg-gradient-to-b from-border to-border/30 relative">
              <div className="absolute -right-2 top-1/2 -translate-y-1/2 text-[9px] text-muted-foreground/60 whitespace-nowrap font-mono">
                {['R-014', 'R-027', 'R-041', 'R-052'][i]}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export function CompactPathway() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {stages.map((stage, i) => (
        <div key={stage.name} className="flex items-center gap-2">
          <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2">
            <div className={cn('h-2 w-2 rounded-full', stage.dotClass)} />
            <div className="text-left">
              <div className="text-[9px] uppercase tracking-wide text-muted-foreground">{stage.name}</div>
              <div className={cn('devanagari text-base font-semibold', stage.colorClass)}>{stage.form}</div>
            </div>
          </div>
          {i < stages.length - 1 && (
            <div className="text-muted-foreground/40 text-sm">→</div>
          )}
        </div>
      ))}
    </div>
  );
}
