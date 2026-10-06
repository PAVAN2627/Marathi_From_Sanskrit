import type { SemanticAnalysis } from '@/lib/types';

export const mockSemanticAnalyses: SemanticAnalysis[] = [
  {
    sourceWord: 'धर्म',
    sourceMeaning: 'law, duty, righteousness',
    targetWord: 'धर्म',
    targetMeaning: 'religion, duty, moral order',
    similarity: 0.91,
    categories: [
      { label: 'Meaning Preservation', value: 92 },
      { label: 'Contextual Shift', value: 24 },
      { label: 'Usage Shift', value: 18 },
      { label: 'Lexical Stability', value: 87 },
    ],
  },
  {
    sourceWord: 'कर्म',
    sourceMeaning: 'action, deed, ritual act',
    targetWord: 'कर्म',
    targetMeaning: 'action, deed, work, destiny',
    similarity: 0.88,
    categories: [
      { label: 'Meaning Preservation', value: 88 },
      { label: 'Contextual Shift', value: 30 },
      { label: 'Usage Shift', value: 22 },
      { label: 'Lexical Stability', value: 84 },
    ],
  },
  {
    sourceWord: 'पात्र',
    sourceMeaning: 'ritual vessel, container',
    targetWord: 'पात्र',
    targetMeaning: 'theatrical character, role',
    similarity: 0.62,
    categories: [
      { label: 'Meaning Preservation', value: 55 },
      { label: 'Contextual Shift', value: 68 },
      { label: 'Usage Shift', value: 72 },
      { label: 'Lexical Stability', value: 90 },
    ],
  },
  {
    sourceWord: 'अग्नि',
    sourceMeaning: 'fire, sacrificial fire',
    targetWord: 'आग',
    targetMeaning: 'fire (general)',
    similarity: 0.74,
    categories: [
      { label: 'Meaning Preservation', value: 70 },
      { label: 'Contextual Shift', value: 45 },
      { label: 'Usage Shift', value: 38 },
      { label: 'Lexical Stability', value: 60 },
    ],
  },
];

export const mockSemanticDriftDistribution = [
  { similarity: '0.5-0.6', count: 142 },
  { similarity: '0.6-0.7', count: 298 },
  { similarity: '0.7-0.8', count: 567 },
  { similarity: '0.8-0.9', count: 891 },
  { similarity: '0.9-1.0', count: 1342 },
];

export const mockSemanticShiftCategories = [
  { name: 'Preserved', value: 1842, color: 'hsl(142, 71%, 45%)' },
  { name: 'Partially Shifted', value: 892, color: 'hsl(38, 92%, 50%)' },
  { name: 'Major Shift', value: 384, color: 'hsl(0, 84%, 60%)' },
  { name: 'Unknown', value: 122, color: 'hsl(0, 0%, 64%)' },
];
