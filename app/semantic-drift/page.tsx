'use client';

import React, { useState, useEffect } from 'react';
import { Languages, ArrowDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { getSemanticAnalyses } from '@/services/api';
import {
  mockSemanticDriftDistribution,
  mockSemanticShiftCategories,
} from '@/data/mockSemanticData';
import type { SemanticAnalysis } from '@/lib/types';

export default function SemanticDriftPage() {
  const [analyses, setAnalyses] = useState<SemanticAnalysis[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSemanticAnalyses().then((data) => {
      setAnalyses(data);
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
          <Languages className="h-5 w-5 text-primary" />
          <h1 className="text-2xl font-bold tracking-tight">Semantic Drift Analysis</h1>
        </div>
        <p className="text-sm text-muted-foreground">
          Analyze how word meanings shift across historical stages from Sanskrit to Modern Marathi.
        </p>
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Semantic Similarity Distribution</CardTitle>
              <span className="mock-badge">Mock Data</span>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={mockSemanticDriftDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="similarity" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
                <YAxis tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
                <Tooltip
                  contentStyle={{
                    background: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="count" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Semantic Shift Categories</CardTitle>
              <span className="mock-badge">Mock Data</span>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={mockSemanticShiftCategories}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  innerRadius={50}
                  label={(entry) => `${entry.name}: ${entry.value}`}
                  labelLine={false}
                  style={{ fontSize: 11 }}
                >
                  {mockSemanticShiftCategories.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Legend wrapperStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Meaning Comparison Chain */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Meaning Evolution Chain</CardTitle>
            <span className="mock-badge">Mock Semantic Analysis</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {analyses.map((a, i) => (
              <div key={i} className="rounded-xl border border-border bg-card/50 p-4">
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex-1 min-w-[200px]">
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wide mb-1">Sanskrit Meaning</div>
                    <div className="devanagari text-lg font-semibold">{a.sourceWord}</div>
                    <p className="text-sm text-muted-foreground italic mt-1">"{a.sourceMeaning}"</p>
                  </div>
                  <ArrowDown className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1 min-w-[200px]">
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wide mb-1">Modern Marathi Meaning</div>
                    <div className="devanagari text-lg font-semibold">{a.targetWord}</div>
                    <p className="text-sm text-muted-foreground italic mt-1">"{a.targetMeaning}"</p>
                  </div>
                  <div className="text-center">
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wide mb-1">Similarity</div>
                    <Badge className="text-base font-bold">{a.similarity.toFixed(2)}</Badge>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {a.categories.map((cat, j) => (
                    <div key={j} className="rounded-lg bg-secondary/40 px-3 py-2">
                      <div className="text-[10px] text-muted-foreground">{cat.label}</div>
                      <div className="text-sm font-semibold">{cat.value}%</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
