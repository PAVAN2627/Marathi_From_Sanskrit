'use client';

import React, { useCallback } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  type Node,
  type Edge,
  type NodeMouseHandler,
  BackgroundVariant,
} from 'reactflow';
import 'reactflow/dist/style.css';
import type { ReconstructionResult, TransformationRule } from '@/lib/types';

interface Props {
  result: ReconstructionResult;
  rules: TransformationRule[];
  onRuleClick: (ruleId: string) => void;
}

const stageColors: Record<string, string> = {
  Sanskrit: 'hsl(215, 45%, 28%)',
  Prakrit: 'hsl(180, 50%, 32%)',
  Apabhramsha: 'hsl(142, 55%, 35%)',
  'Old Marathi': 'hsl(38, 72%, 40%)',
  'Modern Marathi': 'hsl(199, 76%, 42%)',
};

export function TransformationGraph({ result, rules, onRuleClick }: Props) {
  const onNodeClick: NodeMouseHandler = useCallback(
    (_evt, node) => {
      if (node.data?.ruleId) {
        onRuleClick(node.data.ruleId as string);
      }
    },
    [onRuleClick]
  );

  const nodes: Node[] = [];
  const edges: Edge[] = [];

  result.pathway.forEach((step, i) => {
    const y = i * 140;
    const color = stageColors[step.stage] ?? 'hsl(0, 0%, 50%)';

    // Language stage node
    nodes.push({
      id: `stage-${i}`,
      position: { x: 80, y },
      data: { label: step.stage },
      type: 'default',
      style: {
        background: 'hsl(0, 0%, 100%)',
        border: `2px solid ${color}`,
        borderRadius: '12px',
        padding: '12px 20px',
        width: 200,
        fontSize: '12px',
      },
    });

    // Form display node
    nodes.push({
      id: `form-${i}`,
      position: { x: 320, y },
      data: { label: step.form },
      type: 'default',
      style: {
        background: color,
        color: 'white',
        border: 'none',
        borderRadius: '12px',
        padding: '12px 24px',
        fontFamily: 'Noto Sans Devanagari, sans-serif',
        fontSize: '22px',
        fontWeight: 600,
        width: 140,
        textAlign: 'center' as const,
      },
    });

    // IPA node
    nodes.push({
      id: `ipa-${i}`,
      position: { x: 500, y },
      data: { label: step.ipa },
      type: 'default',
      style: {
        background: 'hsl(210, 16%, 96%)',
        border: '1px solid hsl(215, 16%, 90%)',
        borderRadius: '8px',
        padding: '8px 16px',
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: '12px',
        color: 'hsl(215, 12%, 47%)',
        width: 120,
      },
    });

    // Edge from stage to form
    edges.push({
      id: `e-stage-form-${i}`,
      source: `stage-${i}`,
      target: `form-${i}`,
      type: 'smoothstep',
      style: { stroke: color, strokeWidth: 1.5 },
    });

    // Edge from form to ipa
    edges.push({
      id: `e-form-ipa-${i}`,
      source: `form-${i}`,
      target: `ipa-${i}`,
      type: 'smoothstep',
      style: { stroke: 'hsl(215, 16%, 80%)', strokeWidth: 1 },
    });

    // Rule node between stages
    if (step.ruleId) {
      const ruleY = y + 70;
      const rule = rules.find((r) => r.id === step.ruleId);
      nodes.push({
        id: `rule-${i}`,
        position: { x: 180, y: ruleY },
        data: {
          label: step.ruleId,
          ruleId: step.ruleId,
          ruleCategory: step.ruleCategory,
        },
        type: 'default',
        style: {
          background: 'hsl(38, 92%, 95%)',
          border: '1.5px solid hsl(38, 80%, 55%)',
          borderRadius: '20px',
          padding: '6px 16px',
          fontSize: '11px',
          fontWeight: 600,
          color: 'hsl(38, 60%, 35%)',
          cursor: 'pointer',
          width: 100,
          textAlign: 'center' as const,
        },
      });

      // Edge from rule to next stage
      edges.push({
        id: `e-rule-${i}`,
        source: `rule-${i}`,
        target: `stage-${i + 1}`,
        type: 'smoothstep',
        style: { stroke: 'hsl(38, 80%, 55%)', strokeWidth: 1.5, strokeDasharray: '4 3' },
        animated: true,
      });

      // Edge from current form down to rule
      edges.push({
        id: `e-form-rule-${i}`,
        source: `form-${i}`,
        target: `rule-${i}`,
        type: 'smoothstep',
        style: { stroke: 'hsl(38, 80%, 55%)', strokeWidth: 1, opacity: 0.5 },
      });

      if (rule) {
        void rule;
      }
    }
  });

  return (
    <div style={{ width: '100%', height: 520 }} className="rounded-xl border border-border overflow-hidden bg-card/30">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodeClick={onNodeClick}
        fitView
        fitViewOptions={{ padding: 0.15 }}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={true}
        panOnScroll
        zoomOnScroll={false}
        proOptions={{ hideAttribution: true }}
      >
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="hsl(var(--border))" />
        <Controls showInteractive={false} className="!border-border !bg-card !rounded-lg" />
        <MiniMap
          className="!bg-card !border-border !rounded-lg"
          maskColor="hsl(var(--muted)/0.5)"
          nodeColor={(node) => {
            const id = node.id as string;
            if (id.startsWith('rule')) return 'hsl(38, 80%, 55%)';
            const idx = parseInt(id.split('-')[1] ?? '0');
            return stageColors[result.pathway[idx]?.stage ?? ''] ?? 'hsl(0,0%,50%)';
          }}
        />
      </ReactFlow>
    </div>
  );
}
