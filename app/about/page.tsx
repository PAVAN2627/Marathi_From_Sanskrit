'use client';

import { Info, BookOpen, Target, AlertTriangle, Cpu, FlaskConical, CheckCircle2, Layers, Wrench, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const sections = [
  {
    icon: BookOpen,
    title: 'Research Problem',
    content: `The historical evolution of Marathi from Sanskrit through Prakrit, Apabhramsha, and Old Marathi involves complex phonological, morphological, and semantic transformations. Existing computational approaches lack the linguistic grounding and explainability needed for rigorous historical reconstruction. There is no comprehensive system that combines rule-based historical phonology with neural sequence models while providing transparent, traceable explanations for each prediction.`,
  },
  {
    icon: Target,
    title: 'Research Objectives',
    list: [
      'Develop a hybrid AI framework combining rule-based historical phonology with phoneme-level neural modelling.',
      'Integrate semantic drift analysis to track meaning changes across historical stages.',
      'Provide explainable, traceable reconstruction pathways with evidence at every step.',
      'Build a curated diachronic lexical dataset for Marathi evolution research.',
      'Evaluate the proposed framework against rule-based and neural baselines.',
    ],
  },
  {
    icon: AlertTriangle,
    title: 'Research Gaps',
    list: [
      'Lack of computationally accessible diachronic lexical resources for Indo-Aryan languages.',
      'Existing neural models treat historical transformation as generic translation, ignoring linguistic constraints.',
      'Limited work on explainability in historical linguistics reconstruction.',
      'No integrated semantic drift modelling for Marathi evolution.',
      'Absence of standardized evaluation metrics for historical reconstruction tasks.',
    ],
  },
  {
    icon: Cpu,
    title: 'Proposed Architecture',
    content: `The proposed hybrid framework integrates four components: (1) a rule-based historical phonology engine encoding attested sound-change rules, (2) a phoneme-level neural transformer for candidate generation and scoring, (3) a semantic drift model for meaning compatibility verification, and (4) an explainability engine that produces traceable reconstruction pathways with evidence at each transformation step.`,
  },
  {
    icon: FlaskConical,
    title: 'Research Methodology',
    list: [
      'Curate diachronic lexical dataset from historical dictionaries and inscription corpora.',
      'Formalize historical sound-change rules from Prakrit grammars and Apabhramsha studies.',
      'Train phoneme-level transformer on aligned Sanskrit–Marathi word pairs.',
      'Integrate rule constraints into neural decoding via rule-aware attention.',
      'Model semantic drift using distributional embeddings across historical stages.',
      'Build explanation traces by logging all rule applications and neural decisions.',
    ],
  },
  {
    icon: CheckCircle2,
    title: 'Expected Outcomes',
    list: [
      'A working hybrid reconstruction system with >84% top-1 accuracy (mock evaluation).',
      'Transparent, traceable explanation for every reconstruction prediction.',
      'A curated diachronic dataset of 12,000+ lexical entries (target).',
      'Formalized rule set of 48+ historical sound-change rules.',
      'Open-source research platform for Indo-Aryan historical linguistics.',
    ],
  },
  {
    icon: Layers,
    title: 'Technology Stack',
    content: `Frontend: React, TypeScript, Tailwind CSS. Backend (planned): FastAPI, Python. ML Framework: PyTorch, HuggingFace Transformers. Data: PostgreSQL, Supabase. Visualization: Recharts, React Flow. The frontend architecture is designed so the real FastAPI/ML backend can be connected without rebuilding the UI.`,
  },
  {
    icon: Wrench,
    title: 'Research Limitations',
    list: [
      'Current prototype uses mock data — no real linguistic datasets are connected.',
      'Historical rules are simplified representations of complex phonological processes.',
      'Neural reconstruction is simulated, not trained on real data.',
      'Semantic drift model is conceptual, not implemented.',
      'Expert validation has not been conducted.',
    ],
  },
  {
    icon: Clock,
    title: 'Future Work',
    list: [
      'Integrate real diachronic lexical datasets from historical sources.',
      'Train and evaluate the phoneme-level transformer on curated data.',
      'Implement the semantic drift model using contextual embeddings.',
      'Conduct expert validation with historical linguists.',
      'Extend the framework to other Indo-Aryan languages.',
    ],
  },
];

export default function AboutPage() {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Info className="h-5 w-5 text-primary" />
          <h1 className="text-2xl font-bold tracking-tight">About Research</h1>
        </div>
        <p className="text-sm text-muted-foreground">
          Understanding the MAR-EVO-XAI research concept and proposed hybrid framework.
        </p>
      </div>

      <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
        <p className="text-sm text-amber-700">
          <span className="font-semibold">Prototype Notice:</span> This is a UI prototype for research demonstration. All data is simulated. No real ML models, datasets, or APIs are connected.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {sections.map((section, i) => {
          const Icon = section.icon;
          return (
            <Card key={i}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-4 w-4" />
                  </div>
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {section.content && (
                  <p className="text-sm text-muted-foreground leading-relaxed">{section.content}</p>
                )}
                {section.list && (
                  <ul className="space-y-2">
                    {section.list.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary/40 mt-2 shrink-0" />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="bg-gradient-to-br from-card to-secondary/20">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3 mb-4">
            <FlaskConical className="h-6 w-6 text-primary" />
            <h2 className="text-lg font-semibold">The Hybrid Framework</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: 'Rule-Based Historical Phonology', desc: 'Encoding attested sound-change rules from Prakrit grammars and Apabhramsha studies.' },
              { title: 'Phoneme-Level Neural Modelling', desc: 'Transformer-based candidate generation with IPA-level phoneme representations.' },
              { title: 'Semantic Drift Modelling', desc: 'Distributional embeddings tracking meaning changes across historical stages.' },
              { title: 'Explainability & Traceability', desc: 'Full evidence traces for every reconstruction prediction with rule-level granularity.' },
            ].map((item, i) => (
              <div key={i} className="rounded-xl border border-border bg-card p-4">
                <Badge variant="outline" className="text-[10px] mb-2">Component {i + 1}</Badge>
                <div className="text-sm font-semibold text-foreground mb-1">{item.title}</div>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
