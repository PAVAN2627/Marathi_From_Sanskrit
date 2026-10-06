'use client';

import Link from 'next/link';
import { ArrowRight, Database, ScrollText, Languages, CheckCircle2, Gauge, Beaker } from 'lucide-react';
import { HeroPathway } from '@/components/hero-pathway';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const stats = [
  { label: 'Lexical Entries', value: '12,480', sub: 'Mock Dataset', icon: Database },
  { label: 'Historical Rules', value: '48', sub: 'Prototype Rules', icon: ScrollText },
  { label: 'Cognate Sets', value: '3,240', sub: 'Mock Records', icon: Languages },
  { label: 'Validated Examples', value: '1,180', sub: 'Simulated', icon: CheckCircle2 },
  { label: 'Model Accuracy', value: '84.6%', sub: 'Mock Evaluation', icon: Gauge },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-card via-card to-secondary/40">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="relative grid lg:grid-cols-2 gap-8 p-6 lg:p-10">
          <div className="flex flex-col justify-center space-y-5">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium tracking-widest text-muted-foreground uppercase">
              Computational Historical Linguistics
            </span>
            <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground leading-tight">
              Reconstruct the Historical<br />Evolution of Marathi
            </h1>
            <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
              Explore how Sanskrit and Old Indo-Aryan lexical forms may transform across historical stages toward Marathi using linguistically grounded rules, phoneme-level modelling, semantic analysis and explainable AI.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="/reconstruction"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Start Reconstruction
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/historical-explorer"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground hover:bg-secondary transition-colors"
              >
                Explore Historical Data
              </Link>
            </div>
            <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
              <div className="flex items-center gap-2 mb-1">
                <Beaker className="h-4 w-4 text-amber-600" />
                <span className="text-sm font-semibold text-amber-800">Prototype Environment</span>
              </div>
              <p className="text-xs text-amber-700 leading-relaxed">
                All results shown in this demonstration use mock research data. Real linguistic datasets and ML models will be integrated in the research implementation.
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <HeroPathway />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="section-heading">Research Metrics</h2>
          <span className="mock-badge">All values are mock data</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="relative hover:shadow-md transition-shadow">
                <CardContent className="pt-5 pb-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary text-muted-foreground">
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="mock-badge">Mock</span>
                  </div>
                  <div className="text-2xl font-bold tracking-tight text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground mt-0.5">{stat.label}</div>
                  <div className="text-[10px] text-muted-foreground/70 mt-1">{stat.sub}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Quick Access */}
      <section className="grid md:grid-cols-3 gap-4">
        {[
          { title: 'Transformation Rules', desc: 'Browse 48 mock historical sound-change rules across all stages.', href: '/transformation-rules', icon: ScrollText },
          { title: 'Lexical Dataset', desc: 'Explore the mock diachronic lexical dataset with 12,480 entries.', href: '/lexical-dataset', icon: Database },
          { title: 'Research Analytics', desc: 'View mock evaluation metrics and model performance charts.', href: '/research-analytics', icon: Gauge },
        ].map((card) => {
          const Icon = card.icon;
          return (
            <Link key={card.href} href={card.href}>
              <Card className="h-full hover:shadow-md hover:border-primary/30 transition-all cursor-pointer group">
                <CardContent className="pt-5 pb-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="font-semibold text-foreground">{card.title}</span>
                    <ArrowRight className="h-4 w-4 ml-auto text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{card.desc}</p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </section>
    </div>
  );
}
