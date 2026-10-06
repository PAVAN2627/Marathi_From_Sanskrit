'use client';

import React, { useState } from 'react';
import {
  Search,
  Loader2,
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Volume2,
  BookOpen,
  GitBranch,
  Brain,
  ShieldCheck,
  Lightbulb,
  Info,
  Languages,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from 'recharts';
import { reconstructWord, getTransformationRules } from '@/services/api';
import dynamic from 'next/dynamic';
import type { ReconstructionResult, TransformationRule } from '@/lib/types';
import { cn } from '@/lib/utils';

const TransformationGraph = dynamic(
  () => import('@/components/transformation-graph').then((m) => m.TransformationGraph),
  { ssr: false, loading: () => <div className="h-[520px] rounded-xl border border-border bg-card/30 animate-pulse" /> }
);

const loadingMessages = [
  'Analyzing historical evidence...',
  'Applying linguistic rules...',
  'Generating candidate pathways...',
  'Calculating semantic similarity...',
  'Building explanation trace...',
];

export default function ReconstructionPage() {
  const [inputWord, setInputWord] = useState('धर्म');
  const [sourceLang, setSourceLang] = useState('Sanskrit');
  const [targetLang, setTargetLang] = useState('Modern Marathi');
  const [mode, setMode] = useState<'forward' | 'reverse'>('forward');
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [result, setResult] = useState<ReconstructionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [rules, setRules] = useState<TransformationRule[]>([]);
  const [selectedRule, setSelectedRule] = useState<TransformationRule | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [expandedSteps, setExpandedSteps] = useState<Set<number>>(new Set([1]));

  React.useEffect(() => {
    getTransformationRules().then(setRules);
  }, []);

  React.useEffect(() => {
    if (!loading) return;
    setLoadingStep(0);
    const interval = setInterval(() => {
      setLoadingStep((prev) => (prev + 1) % loadingMessages.length);
    }, 480);
    return () => clearInterval(interval);
  }, [loading]);

  const handleAnalyze = async () => {
    if (!inputWord.trim()) {
      setError('Please enter a Sanskrit or historical word form.');
      return;
    }
    setError(null);
    setResult(null);
    setLoading(true);
    try {
      const res = await reconstructWord(inputWord, mode);
      if (res) {
        setResult(res);
      } else {
        setError('No sufficiently strong historical evidence found for this input. Try "धर्म" or "कर्म" as example inputs.');
      }
    } catch {
      setError('An error occurred during reconstruction analysis.');
    } finally {
      setLoading(false);
    }
  };

  const handleRuleClick = (ruleId: string) => {
    const rule = rules.find((r) => r.id === ruleId);
    if (rule) {
      setSelectedRule(rule);
      setSheetOpen(true);
    }
  };

  const toggleStep = (step: number) => {
    setExpandedSteps((prev) => {
      const next = new Set(prev);
      if (next.has(step)) next.delete(step);
      else next.add(step);
      return next;
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <GitBranch className="h-5 w-5 text-primary" />
          <h1 className="text-2xl font-bold tracking-tight">Historical Reconstruction</h1>
        </div>
        <p className="text-sm text-muted-foreground">
          Explore a possible transformation pathway from Sanskrit to Marathi.
        </p>
      </div>

      {/* Input Panel */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_auto_auto_auto_auto] gap-3 items-end">
            <div className="space-y-2 sm:col-span-2 lg:col-span-1">
              <label className="text-sm font-medium text-foreground">Enter Sanskrit / Historical Form</label>
              <Input
                value={inputWord}
                onChange={(e) => setInputWord(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
                placeholder="धर्म"
                className="devanagari text-lg h-11"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Input</label>
              <Select value={sourceLang} onValueChange={setSourceLang}>
                <SelectTrigger className="w-full sm:w-[140px] h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Sanskrit">Sanskrit</SelectItem>
                  <SelectItem value="Prakrit">Prakrit</SelectItem>
                  <SelectItem value="Apabhramsha">Apabhramsha</SelectItem>
                  <SelectItem value="Old Marathi">Old Marathi</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Target</label>
              <Select value={targetLang} onValueChange={setTargetLang}>
                <SelectTrigger className="w-full sm:w-[150px] h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Modern Marathi">Modern Marathi</SelectItem>
                  <SelectItem value="Old Marathi">Old Marathi</SelectItem>
                  <SelectItem value="Apabhramsha">Apabhramsha</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Mode</label>
              <Select value={mode} onValueChange={(v) => setMode(v as 'forward' | 'reverse')}>
                <SelectTrigger className="w-full sm:w-[180px] h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="forward">Forward Reconstruction</SelectItem>
                  <SelectItem value="reverse">Reverse Historical Analysis</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              onClick={handleAnalyze}
              disabled={loading}
              className="h-11 px-6 sm:col-span-2 lg:col-span-1"
              size="lg"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Search className="h-4 w-4" />
              )}
              Analyze Evolution
            </Button>
          </div>
          <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
            <Info className="h-3.5 w-3.5" />
            Try: <code className="devanagari cursor-pointer hover:text-primary" onClick={() => setInputWord('धर्म')}>धर्म</code>,{' '}
            <code className="devanagari cursor-pointer hover:text-primary" onClick={() => setInputWord('कर्म')}>कर्म</code>
          </div>
        </CardContent>
      </Card>

      {/* Loading State */}
      {loading && (
        <Card className="border-primary/20">
          <CardContent className="py-12">
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <div className="h-16 w-16 rounded-full border-2 border-primary/20" />
                <div className="absolute inset-0 h-16 w-16 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                <Brain className="absolute inset-0 m-auto h-7 w-7 text-primary" />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-foreground animate-pulse">
                  {loadingMessages[loadingStep]}
                </p>
                <p className="text-xs text-muted-foreground mt-1">Simulated processing for prototype demonstration</p>
              </div>
              <div className="w-full max-w-md">
                <Progress value={(loadingStep + 1) * 20} className="h-1" />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Error State */}
      {error && !loading && (
        <Card className="border-destructive/30">
          <CardContent className="py-10">
            <div className="flex flex-col items-center gap-3 text-center">
              <AlertCircle className="h-10 w-10 text-destructive/60" />
              <p className="text-sm font-medium text-foreground">{error}</p>
              <p className="text-xs text-muted-foreground max-w-md">
                This is a prototype using mock data. Only a limited set of example words have simulated reconstruction results.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results */}
      {result && !loading && !error && (
        <div className="space-y-6 animate-fade-in-up">
          {/* Result Header */}
          <Card className="border-primary/20 bg-gradient-to-br from-card to-secondary/20">
            <CardHeader>
              <div className="flex items-center justify-between flex-wrap gap-2">
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  Reconstruction Result
                </CardTitle>
                <Badge className="bg-amber-100 text-amber-800 border-amber-200">Mock Research Result</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Input</div>
                  <div className="devanagari text-2xl font-semibold text-foreground">{result.input}</div>
                </div>
                <div className="flex items-center justify-center">
                  <ArrowRight className="h-6 w-6 text-muted-foreground" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Predicted Marathi Candidate</div>
                  <div className="devanagari text-2xl font-semibold text-primary">{result.predictedForm}</div>
                </div>
              </div>
              <Separator />
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Confidence</span>
                  <span className="text-lg font-bold text-primary">{Math.round(result.confidence * 100)}%</span>
                </div>
                <Progress value={result.confidence * 100} className="h-2" />
                <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1.5">
                  <Info className="h-3 w-3" />
                  Simulated confidence — not a validated scientific probability.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Candidate Cards */}
          <div>
            <h3 className="section-heading mb-3">Reconstruction Candidates</h3>
            <div className="grid sm:grid-cols-3 gap-4">
              {result.candidates.map((c, i) => (
                <Card key={i} className={cn(i === 0 && 'border-primary/30 ring-1 ring-primary/10')}>
                  <CardContent className="pt-5">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-medium text-muted-foreground">Candidate {i + 1}</span>
                      {i === 0 && <Badge className="bg-primary text-primary-foreground">Top</Badge>}
                    </div>
                    <div className="devanagari text-3xl font-bold text-foreground mb-1">{c.form}</div>
                    <div className="mono text-xs text-muted-foreground mb-3">{c.ipa}</div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Compatibility Score</span>
                        <span className="font-semibold">{c.compatibilityScore.toFixed(2)}</span>
                      </div>
                      <Progress value={c.compatibilityScore * 100} className="h-1.5" />
                    </div>
                    <p className="text-[11px] text-muted-foreground mt-2">{c.notes}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Transformation Graph — PRIMARY VISUAL */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <GitBranch className="h-5 w-5 text-primary" />
                    Historical Transformation Path
                  </CardTitle>
                  <p className="text-xs text-muted-foreground mt-1">
                    Click any rule node to inspect the transformation rule and evidence.
                  </p>
                </div>
                <span className="mock-badge">Mock Pathway</span>
              </div>
            </CardHeader>
            <CardContent>
              <TransformationGraph result={result} rules={rules} onRuleClick={handleRuleClick} />
              <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <div className="h-3 w-3 rounded-full border-2 border-[hsl(215,45%,28%)]" /> Language Stage
                </span>
                <span className="flex items-center gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-[hsl(38,80%,55%)]" /> Transformation Rule (clickable)
                </span>
                <span className="flex items-center gap-1.5">
                  <div className="h-3 w-3 rounded bg-muted border border-border" /> IPA Notation
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Two-column: Trace + Phonology */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Transformation Trace */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-primary" />
                  Step-by-Step Transformation Trace
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  {result.trace.map((step, i) => (
                    <div key={step.step} className="border-l-2 border-border ml-2">
                      <button
                        onClick={() => toggleStep(step.step)}
                        className="flex items-center gap-2 w-full py-2.5 pl-3 text-left hover:bg-secondary/50 rounded-r-md transition-colors"
                      >
                        <span className="mono text-xs text-muted-foreground/60 w-6">
                          {String(step.step).padStart(2, '0')}
                        </span>
                        {expandedSteps.has(step.step) ? (
                          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                        ) : (
                          <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                        )}
                        <span className="text-sm font-medium flex-1">{step.title}</span>
                        {step.status === 'Completed' ? (
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                        ) : (
                          <Badge variant="outline" className="text-[10px]">Simulated</Badge>
                        )}
                      </button>
                      {expandedSteps.has(step.step) && (
                        <div className="pl-11 pr-3 pb-3 text-xs text-muted-foreground leading-relaxed animate-fade-in-up">
                          {step.detail}
                        </div>
                      )}
                      {i < result.trace.length - 1 && <div className="h-1 ml-3 border-l-2 border-border/50" />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Phonological Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Volume2 className="h-4 w-4 text-primary" />
                  Phonological Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg bg-secondary/50 p-3">
                    <div className="text-xs text-muted-foreground mb-2">Input Phonemes</div>
                    <div className="flex flex-wrap gap-1.5">
                      {result.phonology.inputPhonemes.map((p, i) => (
                        <span key={i} className="mono text-sm bg-card border border-border rounded px-2 py-0.5">{p}</span>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-lg bg-secondary/50 p-3">
                    <div className="text-xs text-muted-foreground mb-2">Output Phonemes</div>
                    <div className="flex flex-wrap gap-1.5">
                      {result.phonology.outputPhonemes.map((p, i) => (
                        <span key={i} className="mono text-sm bg-card border border-border rounded px-2 py-0.5">{p}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-border px-4 py-2.5">
                  <span className="text-sm font-medium">Phonetic Edit Distance</span>
                  <span className="text-lg font-bold text-primary mono">{result.phonology.editDistance.toFixed(2)}</span>
                </div>
                <div className="space-y-2">
                  {result.phonology.featureChanges.map((fc, i) => (
                    <div key={i} className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{fc.feature}</span>
                      <span className="font-medium text-foreground">{fc.change}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground border-t border-border pt-3">
                  These values are mock demonstration data.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Semantic Drift */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Languages className="h-4 w-4 text-primary" />
                  Semantic Drift Analysis
                </CardTitle>
                <span className="mock-badge">Mock Semantic Analysis</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid lg:grid-cols-3 gap-6 items-center">
                <div className="space-y-4">
                  <div className="rounded-xl border border-border bg-secondary/30 p-4">
                    <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Sanskrit Meaning</div>
                    <div className="devanagari text-xl font-semibold text-foreground mb-1">{result.semantic.sourceWord}</div>
                    <p className="text-sm text-muted-foreground italic">"{result.semantic.sourceMeaning}"</p>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="text-center">
                      <ArrowRight className="h-5 w-5 text-muted-foreground mx-auto mb-1 rotate-90 lg:rotate-0" />
                      <div className="text-xs text-muted-foreground">Semantic Similarity</div>
                      <div className="text-2xl font-bold text-primary">{result.semantic.similarity.toFixed(2)}</div>
                    </div>
                  </div>
                  <div className="rounded-xl border border-border bg-secondary/30 p-4">
                    <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Marathi Meaning</div>
                    <div className="devanagari text-xl font-semibold text-foreground mb-1">{result.semantic.targetWord}</div>
                    <p className="text-sm text-muted-foreground italic">"{result.semantic.targetMeaning}"</p>
                  </div>
                </div>
                <div className="lg:col-span-2 h-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={result.semantic.categories}>
                      <PolarGrid stroke="hsl(var(--border))" />
                      <PolarAngleAxis dataKey="label" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
                      <Radar
                        name="Semantic"
                        dataKey="value"
                        stroke="hsl(var(--accent))"
                        fill="hsl(var(--accent))"
                        fillOpacity={0.25}
                        strokeWidth={2}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Evidence & Explainability */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-4 w-4 text-primary" />
                    Why does the model suggest this reconstruction?
                  </CardTitle>
                  <p className="text-xs text-muted-foreground mt-1">Evidence trace and explainability summary</p>
                </div>
                <span className="mock-badge">Mock Evidence</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {result.evidence.map((ev) => (
                  <div key={ev.id} className="rounded-xl border border-border bg-card p-4 hover:shadow-sm transition-shadow">
                    <div className="flex items-start gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                        <span className="mono text-xs font-bold">{String(ev.id).padStart(2, '0')}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-foreground">{ev.type}</div>
                        <div className="text-xs text-muted-foreground mt-1 space-y-0.5">
                          <div><span className="font-medium">Source:</span> {ev.source}</div>
                          <div><span className="font-medium">Relevance:</span> {ev.relevance}</div>
                        </div>
                        <p className="text-[11px] text-muted-foreground/80 mt-2 leading-relaxed">{ev.detail}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-lg bg-amber-50 border border-amber-200 px-4 py-3 flex items-start gap-2">
                <ShieldCheck className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
                <p className="text-xs text-amber-700 leading-relaxed">
                  These results are simulated for interface demonstration and do not represent validated linguistic conclusions.
                  All evidence records are mock data for prototype purposes.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Rule Detail Sheet */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="overflow-y-auto sm:max-w-md">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              {selectedRule && (
                <>
                  <Badge variant="outline" className="mono">{selectedRule.id}</Badge>
                  <span className="text-base">{selectedRule.category}</span>
                </>
              )}
            </SheetTitle>
            <SheetDescription>
              {selectedRule && (
                <Badge className="bg-amber-100 text-amber-800 border-amber-200 mt-1">Mock Rule</Badge>
              )}
            </SheetDescription>
          </SheetHeader>
          {selectedRule && (
            <div className="space-y-4 mt-6">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-secondary/50 p-3">
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wide mb-1">Historical Stage</div>
                  <div className="text-sm font-medium">{selectedRule.sourceStage} → {selectedRule.targetStage}</div>
                </div>
                <div className="rounded-lg bg-secondary/50 p-3">
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wide mb-1">Confidence</div>
                  <div className="text-sm font-bold text-primary">{selectedRule.confidence.toFixed(2)}</div>
                </div>
              </div>
              <div className="rounded-lg bg-secondary/50 p-3">
                <div className="text-[10px] text-muted-foreground uppercase tracking-wide mb-1">Input</div>
                <div className="devanagari text-base font-medium">{selectedRule.input}</div>
              </div>
              <div className="rounded-lg bg-secondary/50 p-3">
                <div className="text-[10px] text-muted-foreground uppercase tracking-wide mb-1">Output</div>
                <div className="devanagari text-base font-medium">{selectedRule.output}</div>
              </div>
              <div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-wide mb-1">Description</div>
                <p className="text-sm text-foreground leading-relaxed">{selectedRule.description}</p>
              </div>
              <div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-wide mb-1">Evidence</div>
                <p className="text-sm text-muted-foreground italic">{selectedRule.evidence}</p>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border px-4 py-2.5">
                <span className="text-sm text-muted-foreground">Status</span>
                <Badge variant={selectedRule.status === 'Verified' ? 'default' : 'outline'}>
                  {selectedRule.status}
                </Badge>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
