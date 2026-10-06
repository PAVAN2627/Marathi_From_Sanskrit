'use client';

import React, { useState, useEffect } from 'react';
import { Database, Search, Download, Filter } from 'lucide-react';
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
import { getLexicalEntries } from '@/services/api';
import type { LexicalEntry } from '@/lib/types';

export default function LexicalDatasetPage() {
  const [entries, setEntries] = useState<LexicalEntry[]>([]);
  const [filtered, setFiltered] = useState<LexicalEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [validationFilter, setValidationFilter] = useState('all');

  useEffect(() => {
    getLexicalEntries().then((data) => {
      setEntries(data);
      setFiltered(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    let result = entries;
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (e) =>
          e.sanskrit.includes(search) ||
          e.modernMarathi.includes(search) ||
          e.meaning.toLowerCase().includes(q) ||
          e.id.toLowerCase().includes(q)
      );
    }
    if (sourceFilter !== 'all') {
      result = result.filter((e) => e.source === sourceFilter);
    }
    if (validationFilter !== 'all') {
      result = result.filter((e) => e.validation === validationFilter);
    }
    setFiltered(result);
  }, [search, sourceFilter, validationFilter, entries]);

  const handleExport = () => {
    const headers = ['ID', 'Sanskrit', 'Prakrit', 'Apabhramsha', 'Old Marathi', 'Modern Marathi', 'IPA', 'Meaning', 'Source', 'Validation'];
    const rows = filtered.map((e) =>
      [e.id, e.sanskrit, e.prakrit, e.apabhramsha, e.oldMarathi, e.modernMarathi, e.ipa, e.meaning, e.source, e.validation]
        .map((v) => `"${v}"`)
        .join(',')
    );
    const csv = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mock_lexical_dataset.csv';
    a.click();
    URL.revokeObjectURL(url);
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
          <Database className="h-5 w-5 text-primary" />
          <h1 className="text-2xl font-bold tracking-tight">Diachronic Lexical Dataset</h1>
        </div>
        <p className="text-sm text-muted-foreground">
          Explore the mock diachronic lexical dataset tracing words across historical stages.
        </p>
      </div>

      {/* Prototype Banner */}
      <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 flex items-start gap-3">
        <Database className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
        <p className="text-sm text-amber-700">
          <span className="font-semibold">Mock Dataset</span> — Real curated linguistic data will be integrated during research.
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-5">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="flex items-center gap-2 rounded-lg border border-border px-3">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search entries..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border-0 focus-visible:ring-0 px-0"
              />
            </div>
            <Select value={sourceFilter} onValueChange={setSourceFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sources</SelectItem>
                <SelectItem value="Mock Historical Dictionary">Mock Historical Dictionary</SelectItem>
                <SelectItem value="Mock Cognate Corpus">Mock Cognate Corpus</SelectItem>
              </SelectContent>
            </Select>
            <Select value={validationFilter} onValueChange={setValidationFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by validation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Validation</SelectItem>
                <SelectItem value="Verified">Verified</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Simulated">Simulated</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleExport} variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="pt-2">
          <div className="flex items-center justify-between mb-3 px-1">
            <span className="text-sm text-muted-foreground">
              {filtered.length} of {entries.length} entries
            </span>
            <span className="mock-badge">Mock Data</span>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Sanskrit</TableHead>
                  <TableHead>Prakrit</TableHead>
                  <TableHead>Apabhramsha</TableHead>
                  <TableHead>Old Marathi</TableHead>
                  <TableHead>Modern Marathi</TableHead>
                  <TableHead>IPA</TableHead>
                  <TableHead>Meaning</TableHead>
                  <TableHead>Validation</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                      <Filter className="h-6 w-6 mx-auto mb-2 opacity-40" />
                      No entries match the current filters.
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((entry) => (
                    <TableRow key={entry.id} className="hover:bg-muted/50">
                      <TableCell className="mono text-xs">{entry.id}</TableCell>
                      <TableCell className="devanagari font-medium">{entry.sanskrit}</TableCell>
                      <TableCell className="devanagari text-muted-foreground">{entry.prakrit}</TableCell>
                      <TableCell className="devanagari text-muted-foreground">{entry.apabhramsha}</TableCell>
                      <TableCell className="devanagari text-muted-foreground">{entry.oldMarathi}</TableCell>
                      <TableCell className="devanagari font-medium">{entry.modernMarathi}</TableCell>
                      <TableCell className="mono text-xs text-muted-foreground">{entry.ipa}</TableCell>
                      <TableCell className="text-xs">{entry.meaning}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            entry.validation === 'Verified' ? 'default' :
                            entry.validation === 'Pending' ? 'outline' : 'secondary'
                          }
                          className="text-[10px]"
                        >
                          {entry.validation}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
