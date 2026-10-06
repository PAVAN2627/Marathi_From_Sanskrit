'use client';

import React, { useState } from 'react';
import { Cpu, ChevronDown, ChevronRight, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const architectureNodes = [
  { id: 'user', label: 'User Input', desc: 'The researcher enters a Sanskrit or historical word form for reconstruction.', icon: '👤' },
  { id: 'frontend', label: 'React Frontend', desc: 'The web interface sends the input to the FastAPI backend via REST API calls.', icon: '🖥️' },
  { id: 'backend', label: 'FastAPI Backend', desc: 'The API server orchestrates the reconstruction pipeline components.', icon: '⚙️' },
  { id: 'norm', label: 'Input Normalization', desc: 'Unicode NFC normalization, script validation, and tokenization of the input word.', icon: '📝' },
  { id: 'dataset', label: 'Historical Dataset', desc: 'Diachronic lexical database with attested forms across all historical stages.', icon: '📚' },
  { id: 'cognate', label: 'Cognate Retrieval', desc: 'Retrieves cognate sets and related Indo-Aryan forms from the lexical database.', icon: '🔗' },
  { id: 'rules', label: 'Rule Engine', desc: 'Applies historical sound-change rules to generate transformation pathways.', icon: '📋' },
  { id: 'transformer', label: 'Phoneme Transformer', desc: 'Neural model refines candidate scores using phoneme-level embeddings.', icon: '🧠' },
  { id: 'ranking', label: 'Candidate Ranking', desc: 'Combines rule and neural scores to rank reconstruction candidates.', icon: '📊' },
  { id: 'semantic', label: 'Semantic Drift Model', desc: 'Verifies meaning compatibility between source and target forms.', icon: '🌐' },
  { id: 'explain', label: 'Explainability Engine', desc: 'Builds traceable evidence traces for every prediction step.', icon: '💡' },
  { id: 'output', label: 'Marathi Reconstruction', desc: 'The final predicted Marathi form with confidence, pathway, and evidence.', icon: '🎯' },
];

export default function ArchitecturePage() {
  const [selected, setSelected] = useState<string | null>(null);
  const selectedNode = architectureNodes.find((n) => n.id === selected);

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Cpu className="h-5 w-5 text-primary" />
          <h1 className="text-2xl font-bold tracking-tight">System Architecture</h1>
        </div>
        <p className="text-sm text-muted-foreground">
          Interactive architecture diagram of the proposed MAR-EVO-XAI framework. Click any component to learn more.
        </p>
      </div>

      <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 flex items-start gap-3">
        <Info className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
        <p className="text-sm text-amber-700">
          This is a UI architecture representation only. Backend connections are not implemented yet.
        </p>
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-6">
        {/* Architecture Flow */}
        <Card>
          <CardHeader>
            <CardTitle>Reconstruction Pipeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center gap-0 py-2">
              {architectureNodes.map((node, i) => (
                <div key={node.id} className="flex flex-col items-center">
                  <button
                    onClick={() => setSelected(selected === node.id ? null : node.id)}
                    className={cn(
                      'flex items-center gap-3 rounded-xl border px-5 py-3 transition-all w-full max-w-md text-left',
                      selected === node.id
                        ? 'border-primary bg-primary/5 shadow-md'
                        : 'border-border bg-card hover:border-primary/30 hover:shadow-sm'
                    )}
                  >
                    <span className="text-xl">{node.icon}</span>
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-foreground">{node.label}</div>
                    </div>
                    {selected === node.id ? (
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    )}
                  </button>
                  {i < architectureNodes.length - 1 && (
                    <div className="h-6 w-px bg-gradient-to-b from-border to-border/30" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Detail Panel */}
        <Card className="lg:sticky lg:top-20 h-fit">
          <CardHeader>
            <CardTitle className="text-base">Component Details</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedNode ? (
              <div className="space-y-3 animate-fade-in-up">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{selectedNode.icon}</span>
                  <div>
                    <div className="text-sm font-semibold">{selectedNode.label}</div>
                    <Badge variant="outline" className="text-[10px] mt-1">{selectedNode.id}</Badge>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{selectedNode.desc}</p>
                <div className="rounded-lg bg-amber-50 border border-amber-200 px-3 py-2 mt-3">
                  <p className="text-xs text-amber-700">
                    Architecture component — not yet implemented. This is a prototype UI representation.
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Cpu className="h-8 w-8 mx-auto mb-2 opacity-30" />
                <p className="text-sm">Click a component in the pipeline to view its details.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
