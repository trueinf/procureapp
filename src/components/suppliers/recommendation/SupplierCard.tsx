import React from 'react';
import { RadarChart } from './RadarChart';
import { SupplierScore, categoryRadarData } from './scoring';

export const SupplierCard: React.FC<{ score: SupplierScore; rank: number; of: number }> = ({ score, rank, of }) => {
  const pct = Math.round(score.percent * 100);
  const radar = categoryRadarData(score);
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm hover:shadow-md transition">
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="text-lg font-semibold text-slate-800">{score.supplierName}</div>
          <div className="text-xs text-slate-500">Rank {rank} of {of}</div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 rounded-full text-xs text-white ${score.segment.color}`}>{score.segment.name}</span>
          <span className="px-2 py-1 rounded-md text-xs bg-slate-100 text-slate-700">{pct}%</span>
        </div>
      </div>

      <RadarChart data={radar} />

      <div className="mt-3 grid grid-cols-2 gap-3">
        <div>
          <div className="text-xs font-semibold text-slate-700 mb-1">Top Drivers</div>
          <ul className="text-xs text-slate-600 space-y-1">
            {score.driversTop.map((d, i) => (
              <li key={i}>• {d.label}</li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-xs font-semibold text-slate-700 mb-1">Weakest Areas</div>
          <ul className="text-xs text-slate-600 space-y-1">
            {score.driversWeak.map((d, i) => (
              <li key={i}>• {d.label}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

