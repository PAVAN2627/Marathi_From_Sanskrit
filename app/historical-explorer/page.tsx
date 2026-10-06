'use client';

import React, { useState, useEffect } from 'react';
import { Clock, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getHistoricalStages } from '@/services/api';
import type { HistoricalStageInfo } from '@/lib/types';
import { cn } from '@/lib/utils';

const stageColors: Record<string, string> = {
  Sanskrit: 'hsl(215, 45%, 28%)',
  'Maharashtri Prakrit': 'hsl(180, 50%, 32%)',
  Apabhramsha: 'hsl(142, 55%, 35%)',
  'Old Marathi': 'hsl(38, 72%, 40%)',
  'Middle Marathi': 'hsl(280, 50%, 45%)',
  'Modern Marathi': 'hsl(199, 76%, 42%)',
};

export default function HistoricalExplorerPage() {
  const [stages, setStages] = useState<HistoricalStageInfo[]>([]);
  const [selected, setSelected] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getHistoricalStages().then((data) => {
      setStages(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Clock className="h-5 w-5 text-primary" />
          <h1 className="text-2xl font-bold tracking-tight">Historical Explorer</h1>
        </div>
        <p className="text-sm text-muted-foreground">
          Interactive timeline of Marathi's evolution across six historical language stages.
        </p>
      </div>

      {/* Timeline */}
      <div className="flex lg:flex-col flex-row gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
        {stages.map((stage, i) => {
          const color = stageColors[stage.stage] ?? 'hsl(0,0%,50%)';
          const active = selected === i;
          return (
            <div key={i} className="flex lg:flex-row flex-col items-center shrink-0 lg:shrink">
              <button
                onClick={() => setSelected(i)}
                className={cn(
                  'flex items-center gap-3 rounded-xl border px-4 py-3 transition-all text-left min-w-[200px] lg:w-full',
                  active
                    ? 'border-primary/30 bg-card shadow-md'
                    : 'border-border bg-card/50 hover:bg-card hover:border-border/80'
                )}
              >
                <div className="h-3 w-3 rounded-full shrink-0" style={{ background: color }} />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-foreground">{stage.stage}</div>
                  <div className="text-[10px] text-muted-foreground">{stage.period}</div>
                </div>
                {active && <ChevronRight className="h-4 w-4 text-primary hidden lg:block" />}
              </button>
              {i < stages.length - 1 && (
                <div className="hidden lg:block h-6 w-px bg-border mx-auto" />
              )}
            </div>
          );
        })}
      </div>

      {/* Stage Detail */}
      {stages[selected] && (
        <div className="grid lg:grid-cols-3 gap-6 animate-fade-in-up">
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-3">
                  <div className="h-4 w-4 rounded-full" style={{ background: stageColors[stages[selected].stage] }} />
                  {stages[selected].stage}
                </CardTitle>
                <Badge variant="outline">{stages[selected].period}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-5">
              <div>
                <div className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Example Words</div>
                <div className="flex flex-wrap gap-2">
                  {stages[selected].exampleWords.map((w, i) => (
                    <span key={i} className="devanagari text-lg font-medium rounded-lg bg-secondary/50 border border-border px-3 py-1.5">
                      {w}
                    </span>
                  ))}
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="rounded-lg bg-secondary/30 p-4">
                  <div className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Phonological Characteristics</div>
                  <p className="text-sm text-foreground leading-relaxed">{stages[selected].phonological}</p>
                </div>
                <div className="rounded-lg bg-secondary/30 p-4">
                  <div className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Morphological Characteristics</div>
                  <p className="text-sm text-foreground leading-relaxed">{stages[selected].morphological}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Mock Sources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="rounded-lg border border-border p-3">
                <div className="text-xs text-muted-foreground mb-1">Primary Source</div>
                <p className="text-sm font-medium">{stages[selected].source}</p>
              </div>
              <div className="rounded-lg bg-amber-50 border border-amber-200 px-3 py-2.5">
                <p className="text-xs text-amber-700">
                  All historical data in this explorer is simulated for prototype demonstration.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
