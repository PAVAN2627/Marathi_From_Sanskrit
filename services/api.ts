import type {
  ReconstructionResult,
  LexicalEntry,
  TransformationRule,
  SemanticAnalysis,
  HistoricalStageInfo,
  ModelEvaluation,
  AnalyticsMetric,
} from '@/lib/types';
import { mockReconstructionResults, mockHistoricalStages } from '@/data/mockReconstruction';
import { mockLexicalData } from '@/data/mockLexicalData';
import { mockRules } from '@/data/mockRules';
import { mockSemanticAnalyses } from '@/data/mockSemanticData';
import { mockAnalyticsMetrics } from '@/data/mockAnalytics';
import { mockModels } from '@/data/mockModels';

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function reconstructWord(
  word: string,
  _mode: 'forward' | 'reverse' = 'forward'
): Promise<ReconstructionResult | null> {
  await delay(2400);
  const key = word.trim();
  return mockReconstructionResults[key] ?? null;
}

export async function getLexicalEntries(): Promise<LexicalEntry[]> {
  await delay(400);
  return mockLexicalData;
}

export async function getTransformationRules(): Promise<TransformationRule[]> {
  await delay(400);
  return mockRules;
}

export async function getSemanticAnalyses(): Promise<SemanticAnalysis[]> {
  await delay(400);
  return mockSemanticAnalyses;
}

export async function getHistoricalStages(): Promise<HistoricalStageInfo[]> {
  await delay(300);
  return mockHistoricalStages;
}

export async function getModelMetrics(): Promise<ModelEvaluation[]> {
  await delay(400);
  return mockModels;
}

export async function getAnalyticsMetrics(): Promise<AnalyticsMetric[]> {
  await delay(300);
  return mockAnalyticsMetrics;
}

export const api = {
  reconstructWord,
  getLexicalEntries,
  getTransformationRules,
  getSemanticAnalyses,
  getHistoricalStages,
  getModelMetrics,
  getAnalyticsMetrics,
};
