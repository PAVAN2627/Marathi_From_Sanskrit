'use client';

import React, { useState, useEffect } from 'react';
import { ScrollText, Search, Filter } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { getTransformationRules } from '@/services/api';
import type { TransformationRule } from '@/lib/types';

export default function TransformationRulesPage() {
  const [rules, setRules] = useState<TransformationRule[]>([]);
  const [filtered, setFiltered] = useState<TransformationRule[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [stageFilter, setStageFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedRule, setSelectedRule] = useState<TransformationRule | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  useEffect(() => {
    getTransformationRules().then((data) => {
      setRules(data);
      setFiltered(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    let result = rules;
    if (search) {
      result = result.filter(
        (r) =>
          r.id.toLowerCase().includes(search.toLowerCase()) ||
          r.category.toLowerCase().includes(search.toLowerCase()) ||
          r.example.includes(search)
      );
    }
    if (stageFilter !== 'all') {
      result = result.filter(
        (r) => r.sourceStage === stageFilter || r.targetStage === stageFilter
      );
    }
    if (categoryFilter !== 'all') {
      result = result.filter((r) => r.category === categoryFilter);
    }
    if (statusFilter !== 'all') {
      result = result.filter((r) => r.status === statusFilter);
    }
    setFiltered(result);
  }, [search, stageFilter, categoryFilter, statusFilter, rules]);

  const categories = Array.from(new Set(rules.map((r) => r.category)));
  const stages = ['Sanskrit', 'Prakrit', 'Apabhramsha', 'Old Marathi', 'Modern Marathi'];

  const openRule = (rule: TransformationRule) => {
    setSelectedRule(rule);
    setSheetOpen(true);
  };

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
          <ScrollText className="h-5 w-5 text-primary" />
          <h1 className="text-2xl font-bold tracking-tight">Historical Transformation Rules</h1>
        </div>
        <p className="text-sm text-muted-foreground">
          Browse and inspect the mock sound-change rules applied across historical stages.
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-5">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="flex items-center gap-2 rounded-lg border border-border px-3">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search rules..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border-0 focus-visible:ring-0 px-0"
              />
            </div>
            <Select value={stageFilter} onValueChange={setStageFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by stage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stages</SelectItem>
                {stages.map((s) => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Verified">Verified</SelectItem>
                <SelectItem value="Proposed">Proposed</SelectItem>
                <SelectItem value="Simulated">Simulated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="pt-2">
          <div className="flex items-center justify-between mb-3 px-1">
            <span className="text-sm text-muted-foreground">
              {filtered.length} rule{filtered.length !== 1 ? 's' : ''} found
            </span>
            <span className="mock-badge">Mock Rules</span>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Rule ID</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Source Stage</TableHead>
                  <TableHead>Target Stage</TableHead>
                  <TableHead>Example</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Confidence</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      <Filter className="h-6 w-6 mx-auto mb-2 opacity-40" />
                      No rules match the current filters.
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((rule) => (
                    <TableRow
                      key={rule.id}
                      onClick={() => openRule(rule)}
                      className="cursor-pointer hover:bg-muted/50"
                    >
                      <TableCell className="mono text-xs font-medium">{rule.id}</TableCell>
                      <TableCell className="text-sm">{rule.category}</TableCell>
                      <TableCell className="text-sm">{rule.sourceStage}</TableCell>
                      <TableCell className="text-sm">{rule.targetStage}</TableCell>
                      <TableCell className="devanagari text-sm">{rule.example}</TableCell>
                      <TableCell>
                        <Badge
                          variant={rule.status === 'Verified' ? 'default' : 'outline'}
                          className="text-[10px]"
                        >
                          {rule.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="mono text-sm font-medium">{rule.confidence.toFixed(2)}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

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
              <Badge className="bg-amber-100 text-amber-800 border-amber-200 mt-1">Mock Rule</Badge>
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
