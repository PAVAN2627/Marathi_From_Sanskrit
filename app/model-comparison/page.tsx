'use client';

import React, { useState, useEffect } from 'react';
import { GitCompare, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';
import { getModelMetrics } from '@/services/api';
import type { ModelEvaluation } from '@/lib/types';

export default function ModelComparisonPage() {
  const [models, setModels] = useState<ModelEvaluation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getModelMetrics().then((data) => {
      setModels(data);
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

  const radarData = ['Top-1 Accuracy', 'Top-3 Accuracy', 'Explainability', 'Phoneme Error', 'CER'].map((metric) => {
    const row: Record<string, string | number> = { metric };
    models.forEach((m) => {
      if (metric === 'Top-1 Accuracy') row[m.name] = m.top1Accuracy;
      else if (metric === 'Top-3 Accuracy') row[m.name] = Math.min(m.top1Accuracy + 8.6, 100);
      else if (metric === 'Explainability') {
        const map: Record<string, number> = { 'Full': 100, 'High': 90, 'Medium-High': 80, 'Medium': 65, 'Low': 35 };
        row[m.name] = map[m.explainability] ?? 50;
      } else if (metric === 'Phoneme Error') row[m.name] = 100 - m.phonemeErrorRate;
      else if (metric === 'CER') row[m.name] = 100 - m.cer;
    });
    return row;
  });

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <GitCompare className="h-5 w-5 text-primary" />
          <h1 className="text-2xl font-bold tracking-tight">Prototype Model Comparison</h1>
        </div>
        <p className="text-sm text-muted-foreground">
          Comparing different reconstruction approaches using mock evaluation data.
        </p>
      </div>

      <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 flex items-start gap-3">
        <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
        <p className="text-sm text-amber-700">
          <span className="font-semibold">Illustrative values for UI demonstration only.</span> No model is scientifically superior — these are simulated metrics.
        </p>
      </div>

      {/* Comparison Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Model Performance Comparison</CardTitle>
            <span className="mock-badge">Mock Data</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Model</TableHead>
                  <TableHead>Top-1 Accuracy</TableHead>
                  <TableHead>Phoneme Error Rate</TableHead>
                  <TableHead>CER</TableHead>
                  <TableHead>Explainability</TableHead>
                  <TableHead>Training Type</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {models.map((m, i) => (
                  <TableRow key={m.name} className={i === models.length - 1 ? 'bg-primary/5' : ''}>
                    <TableCell className="font-medium">
                      {m.name}
                      {i === models.length - 1 && <Badge className="ml-2 text-[10px]">Proposed</Badge>}
                    </TableCell>
                    <TableCell className="mono">{m.top1Accuracy}%</TableCell>
                    <TableCell className="mono">{m.phonemeErrorRate}%</TableCell>
                    <TableCell className="mono">{m.cer}%</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-[10px]">{m.explainability}</Badge>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">{m.trainingType}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Radar Chart */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Multi-Dimensional Comparison</CardTitle>
            <span className="mock-badge">Mock Data</span>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={450}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="hsl(var(--border))" />
              <PolarAngleAxis dataKey="metric" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 9, fill: 'hsl(var(--muted-foreground))' }} />
              {models.map((m, i) => (
                <Radar
                  key={m.name}
                  name={m.name}
                  dataKey={m.name}
                  stroke={`hsl(${200 + i * 30}, 60%, 50%)`}
                  fill={`hsl(${200 + i * 30}, 60%, 50%)`}
                  fillOpacity={0.08}
                  strokeWidth={1.5}
                />
              ))}
            </RadarChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-3 justify-center mt-4">
            {models.map((m, i) => (
              <div key={m.name} className="flex items-center gap-2 text-xs">
                <div className="h-3 w-3 rounded-full" style={{ background: `hsl(${200 + i * 30}, 60%, 50%)` }} />
                <span className="text-muted-foreground">{m.name}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
