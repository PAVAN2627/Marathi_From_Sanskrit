import type { AnalyticsMetric } from '@/lib/types';

export const mockAnalyticsMetrics: AnalyticsMetric[] = [
  { label: 'Character Error Rate', value: 12.4, unit: '%', description: 'Mock evaluation on held-out test set' },
  { label: 'Phoneme Error Rate', value: 9.7, unit: '%', description: 'Mock phoneme-level error measurement' },
  { label: 'Phonetic Edit Distance', value: 0.18, unit: '', description: 'Mock average edit distance per word' },
  { label: 'Top-1 Accuracy', value: 84.6, unit: '%', description: 'Mock top-1 reconstruction accuracy' },
  { label: 'Top-3 Accuracy', value: 93.2, unit: '%', description: 'Mock top-3 reconstruction accuracy' },
  { label: 'Expert Agreement', value: 88, unit: '%', description: 'Mock inter-annotator agreement' },
];

export const mockModelPerformanceData = [
  { stage: 'Sanskrit→Prakrit', accuracy: 89.2, error: 8.1 },
  { stage: 'Prakrit→Apabh.', accuracy: 87.5, error: 9.3 },
  { stage: 'Apabh.→Old Mar.', accuracy: 84.1, error: 11.2 },
  { stage: 'Old Mar.→Mod. Mar.', accuracy: 86.8, error: 10.4 },
  { stage: 'Full Path', accuracy: 84.6, error: 12.4 },
];

export const mockErrorDistribution = [
  { type: 'Vowel Change', count: 342 },
  { type: 'Consonant Change', count: 287 },
  { type: 'Cluster Error', count: 198 },
  { type: 'Schwa Error', count: 156 },
  { type: 'Semantic Error', count: 97 },
  { type: 'Other', count: 54 },
];

export const mockRuleContribution = [
  { rule: 'R-014', contribution: 23.4 },
  { rule: 'R-027', contribution: 19.8 },
  { rule: 'R-041', contribution: 17.2 },
  { rule: 'R-052', contribution: 14.6 },
  { rule: 'R-003', contribution: 12.1 },
  { rule: 'R-019', contribution: 8.4 },
  { rule: 'R-033', contribution: 4.5 },
];

export const mockSemanticSimilarityData = [
  { range: '0.5-0.6', count: 142 },
  { range: '0.6-0.7', count: 298 },
  { range: '0.7-0.8', count: 567 },
  { range: '0.8-0.9', count: 891 },
  { range: '0.9-1.0', count: 1342 },
];
