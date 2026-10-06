import type { ModelEvaluation } from '@/lib/types';

export const mockModels: ModelEvaluation[] = [
  {
    name: 'Rule-Based Baseline',
    top1Accuracy: 71.2,
    phonemeErrorRate: 18.4,
    cer: 22.1,
    explainability: 'Full',
    trainingType: 'No training',
  },
  {
    name: 'BiLSTM Baseline',
    top1Accuracy: 76.8,
    phonemeErrorRate: 14.2,
    cer: 17.6,
    explainability: 'Low',
    trainingType: 'Supervised',
  },
  {
    name: 'Vanilla Transformer',
    top1Accuracy: 80.4,
    phonemeErrorRate: 11.8,
    cer: 14.9,
    explainability: 'Low',
    trainingType: 'Supervised',
  },
  {
    name: 'IPA Transformer',
    top1Accuracy: 82.1,
    phonemeErrorRate: 10.5,
    cer: 13.4,
    explainability: 'Medium',
    trainingType: 'Supervised + IPA',
  },
  {
    name: 'Rule-Aware Transformer',
    top1Accuracy: 83.5,
    phonemeErrorRate: 10.1,
    cer: 12.8,
    explainability: 'Medium-High',
    trainingType: 'Rule-injected',
  },
  {
    name: 'Proposed Hybrid Model',
    top1Accuracy: 84.6,
    phonemeErrorRate: 9.7,
    cer: 12.4,
    explainability: 'High',
    trainingType: 'Hybrid (Rule + Neural + Semantic)',
  },
];
