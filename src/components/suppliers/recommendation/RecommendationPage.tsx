import React, { useMemo, useState } from 'react';
import { computeScores } from './scoring';
import { SupplierCard } from './SupplierCard';
import { MatrixTable } from './MatrixTable';
import { HeatmapGrid } from './HeatmapGrid';

type Tab = 'overview' | 'matrix' | 'heatmap';

export const RecommendationPage: React.FC<{ startTab?: Tab }> = ({ startTab = 'overview' }) => {
  const [tab, setTab] = useState<Tab>(startTab);
  const scores = useMemo(() => computeScores(), []);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Supplier Recommendation</h2>
          <p className="text-slate-600 text-sm">Read-only analysis for up to 5 suppliers</p>
        </div>
        <div className="flex items-center gap-2">
          {([
            { id: 'overview', label: 'Overview' },
            { id: 'matrix', label: 'Matrix' },
            { id: 'heatmap', label: 'Heatmap' },
          ] as const).map((t) => (
            <button key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-3 py-1.5 rounded-lg text-sm border ${tab === t.id ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-700 hover:bg-slate-50'}`}
            >{t.label}</button>
          ))}
        </div>
      </div>

      {tab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {scores.map((s, idx) => (
            <SupplierCard key={s.supplierId} score={s} rank={idx + 1} of={scores.length} />
          ))}
        </div>
      )}

      {tab === 'matrix' && (
        <MatrixTable scores={scores.map(s => ({ supplierId: s.supplierId, total: s.total, max: s.max }))} />
      )}

      {tab === 'heatmap' && (
        <HeatmapGrid />
      )}
    </div>
  );
};

